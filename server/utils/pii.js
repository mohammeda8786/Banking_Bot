export const maskAccountLike = (text = "") => {
  // masks 10-16 digit sequences (demo-safe)
  return text.replace(/\b(\d{6,12})(\d{4})\b/g, "********$2");
};

export const containsSensitiveAsk = (text = "") => {
  const q = text.toLowerCase();
  return (
    q.includes("aadhaar") ||
    q.includes("aadhar") ||
    q.includes("pan") ||
    q.includes("cvv") ||
    q.includes("otp") ||
    q.includes("password") ||
    q.includes("pin") ||
    q.includes("full account number")
  );
};

export const safeUserQuestion = (q) => maskAccountLike(q);
