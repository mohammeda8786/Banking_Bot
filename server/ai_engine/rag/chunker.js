export function chunkText(text, chunkSize = 800, overlap = 100) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (!clean) return [];

  if (overlap >= chunkSize) overlap = Math.floor(chunkSize / 4);

  const chunks = [];
  let start = 0;

  while (start < clean.length) {
    const end = Math.min(start + chunkSize, clean.length);
    chunks.push(clean.slice(start, end));
    if (end === clean.length) break;

    const nextStart = end - overlap;
    if (nextStart <= start) break; // prevents infinite loop
    start = nextStart;
  }

  return chunks;
}
