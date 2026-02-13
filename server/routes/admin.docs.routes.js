import express from "express";
import multer from "multer";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import { ingestDocument } from "../ai_engine/rag/ingest.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST /api/admin/docs/upload
router.post(
   "/upload",
  requireAuth,
  requireRole("admin"),
  upload.single("file"),
  async (req, res) => {
    try {
      const access = req.body?.access || "public";
      const f = req.file;

      console.log("✅ /api/admin/docs/upload HIT");
      console.log("CONTENT-TYPE:", req.headers["content-type"]);
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      if (!f) return res.status(400).json({ error: "File missing" });

      const out = await ingestDocument({
        filepath: f.path,
        filename: f.originalname,
        access,
      });

      return res.json({ message: "Ingested", ...out });
    } catch (e) {
      console.error("UPLOAD FAILED:", e);
      return res.status(500).json({ error: "Ingest failed", details: e.message });
    }
  }
);

export default router;
