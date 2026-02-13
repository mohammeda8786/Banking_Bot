import { embedText } from "./embedder.js";
import { getCollection } from "./chromaStore.js";

export async function retrieveTopK({ question, topK = 4, role = "customer" }) {
  const col = await getCollection();
  const qEmb = await embedText(question);

  // customers can only see public docs
  const where =
    role === "admin"
      ? { $or: [{ access: { $eq: "public" } }, { access: { $eq: "admin" } }] }
      : { access: "public" };

  const results = await col.query({
    queryEmbeddings: [qEmb],
    nResults: topK,
    where,
  });

  const docs = results?.documents?.[0] || [];
  const metas = results?.metadatas?.[0] || [];

  return docs.map((d, i) => ({
    text: d,
    meta: metas[i] || {},
  }));
}
