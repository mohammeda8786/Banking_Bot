import { ChromaClient } from "chromadb";

const client = new ChromaClient({ path: "http://localhost:8000" });
const COLLECTION = "bank_docs";

export async function getCollection() {
  // create or get
  return await client.getOrCreateCollection({ name: COLLECTION });
}
