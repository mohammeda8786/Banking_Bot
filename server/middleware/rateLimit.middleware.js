const hits = new Map(); // key: userId or ip -> { count, resetAt }

export const rateLimit = ({ windowMs = 60_000, max = 30 } = {}) => {
  return (req, res, next) => {
    const key = req.user?.id || req.ip;
    const now = Date.now();

    const entry = hits.get(key) || { count: 0, resetAt: now + windowMs };
    if (now > entry.resetAt) {
      entry.count = 0;
      entry.resetAt = now + windowMs;
    }

    entry.count += 1;
    hits.set(key, entry);

    if (entry.count > max) {
      return res.status(429).json({ error: "Too many requests, slow down." });
    }
    next();
  };
};
