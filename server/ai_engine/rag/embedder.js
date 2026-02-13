import axios from "axios";

const OLLAMA = "http://localhost:11434";

export async function embedText(text) {
  const { data } = await axios.post(`${OLLAMA}/api/embeddings`, {
    model: "nomic-embed-text",
    prompt: text,
  });

  // data.embedding is an array of floats
  return data.embedding;
}
