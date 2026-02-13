import fs from "fs";
import { createRequire } from "module";
import { v4 as uuid } from "uuid";
import { chunkText } from "./chunker.js";
import { embedText } from "./embedder.js";
import { getCollection } from "./chromaStore.js";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

export async function extractTextFromFile(filepath, mimetype) {
  if (mimetype === "application/pdf" || filepath.toLowerCase().endsWith(".pdf")) {
    const buffer = fs.readFileSync(filepath);
    const parsed = await pdf(buffer);
    return parsed.text || "";
  }
  return fs.readFileSync(filepath, "utf-8");
}


export async function ingestDocument({ filepath, filename, access = "public" }) {
  const col = await getCollection();

  const rawText = await extractTextFromFile(filepath);

  // Safety limits (prevents runaway memory)
  if (!rawText || rawText.trim().length === 0) {
    throw new Error("No text extracted from file");
  }
  if (rawText.length > 1_000_000) {
    throw new Error("Document too large for demo (max 1,000,000 chars)");
  }

  const chunks = chunkText(rawText);

  if (chunks.length === 0) throw new Error("Chunker produced 0 chunks");
  if (chunks.length > 500) {
    throw new Error(`Too many chunks (${chunks.length}). Reduce file size or fix chunker.`);
  }

  console.log("INGEST:", { textLen: rawText.length, chunks: chunks.length });

  const BATCH = 25;
  let ids = [];
  let documents = [];
  let embeddings = [];
  let metadatas = [];

  for (let idx = 0; idx < chunks.length; idx++) {
    const id = uuid();
    const chunk = chunks[idx];

    const emb = await embedText(chunk);

    // sanity check: embedding must be an array of numbers, not huge
    if (!Array.isArray(emb) || emb.length < 10 || emb.length > 10000) {
      throw new Error(`Bad embedding length: ${Array.isArray(emb) ? emb.length : typeof emb}`);
    }

    ids.push(id);
    documents.push(chunk);
    embeddings.push(emb);
    metadatas.push({ source: filename, chunkIndex: idx, access });

    if (ids.length >= BATCH) {
      await col.add({ ids, documents, embeddings, metadatas });
      ids = [];
      documents = [];
      embeddings = [];
      metadatas = [];
    }
  }

  if (ids.length) {
    await col.add({ ids, documents, embeddings, metadatas });
  }

  return { chunks: chunks.length, source: filename, access };
}
