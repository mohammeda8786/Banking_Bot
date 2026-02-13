import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import adminDocsRoutes from "./routes/admin.docs.routes.js";
// import adminDocsRoutes from "./routes/admin.docs.routes.js";
import authRoutes from "./routes/auth.routes.js";
import bankRoutes from "./routes/bank.routes.js";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend running"));
// app.get("/health/ollama", async (req, res) => {
//   try {
//     const r = await fetch("http://localhost:11434/api/tags");
//     res.json({ ok: true, status: r.status });
//   } catch (e) {
//     res.status(500).json({ ok: false, error: e.message });
//   }
// });
// db.users.updateOne({ email: "demo.user1@mail.com" }, { $set: { role: "admin" } })

app.use("/api/admin/docs", adminDocsRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
