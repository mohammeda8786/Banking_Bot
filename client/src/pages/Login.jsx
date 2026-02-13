import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("demo.user1@mail.com");
  const [password, setPassword] = useState("Demo@123");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "30px auto" }}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </form>
      {err && <p style={{ color: "tomato" }}>{err}</p>}
    </div>
  );
}
