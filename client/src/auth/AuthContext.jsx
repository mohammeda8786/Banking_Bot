import { createContext, useContext, useState } from "react";
import http from "../api/http";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  // Authentication disabled - always give default token for development
  const [token, setToken] = useState("dev-token-disabled-auth");
  const [role, setRole] = useState("user");

  const login = async (email, password) => {
    const res = await http.post("/api/auth/login", { email, password });
    const t = res.data?.token;
    const r = res.data?.role || "user"; // make backend return role (recommended)
    if (!t) throw new Error("No token returned");

    localStorage.setItem("token", t);
    localStorage.setItem("role", r);
    setToken(t);
    setRole(r);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken("");
    setRole("user");
  };

  return (
    <AuthCtx.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
