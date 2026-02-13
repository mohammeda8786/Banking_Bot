import { useState } from "react";
import http from "../api/http";
import { useAuth } from "../auth/AuthContext";

export default function AdminUpload() {
  const { role } = useAuth();
  const [file, setFile] = useState(null);
  const [access, setAccess] = useState("public");
  const [out, setOut] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (role !== "admin") return setErr("Admin only");
    if (!file) return setErr("Choose a file first");
    setErr("");
    setOut("");
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("access", access);

      const res = await http.post("/api/admin/docs/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setOut(JSON.stringify(res.data, null, 2));
    } catch (e) {
      setErr(e?.response?.data?.details || e?.response?.data?.error || e.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", padding: 12 }}>
      <h2>Admin: Upload Knowledge</h2>

      <div style={{ display: "grid", gap: 10 }}>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <select value={access} onChange={(e) => setAccess(e.target.value)}>
          <option value="public">public</option>
          <option value="admin">admin</option>
        </select>
        <button onClick={upload} disabled={loading}>{loading ? "Uploading..." : "Upload & Ingest"}</button>
      </div>

      {err && <p style={{ color: "tomato" }}>{err}</p>}
      {out && <pre style={{ marginTop: 12, padding: 12, border: "1px solid #333" }}>{out}</pre>}
    </div>
  );
}
