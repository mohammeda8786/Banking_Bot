import { createContext, useContext, useState, useEffect } from "react";
import http from "../api/http";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("customer");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);
      setRole(storedRole || "customer");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse stored user");
        }
      }
    }
    setLoading(false);
  }, []);

  // Database Connection: Login
  const login = async (email, password) => {
    try {
      const res = await http.post("/api/auth/login", { email, password });
      const t = res.data?.token;
      const r = res.data?.role || "customer";
      const u = res.data?.user;

      if (!t) throw new Error("No token returned from server");

      // Store in localStorage
      localStorage.setItem("token", t);
      localStorage.setItem("role", r);
      if (u) {
        localStorage.setItem("user", JSON.stringify(u));
      }

      // Update state
      setToken(t);
      setRole(r);
      setUser(u || null);

      return { token: t, role: r, user: u };
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // Database Connection: Register
  const register = async (name, email, password) => {
    try {
      const res = await http.post("/api/auth/register", {
        name,
        email,
        password,
      });

      const t = res.data?.token;
      const r = res.data?.role || "customer";
      const u = res.data?.user;

      if (!t) throw new Error("No token returned from server");

      // Store in localStorage
      localStorage.setItem("token", t);
      localStorage.setItem("role", r);
      if (u) {
        localStorage.setItem("user", JSON.stringify(u));
      }

      // Update state
      setToken(t);
      setRole(r);
      setUser(u || null);

      return { token: t, role: r, user: u };
    } catch (err) {
      console.error("Registration error:", err);
      throw err;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setToken("");
    setRole("customer");
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = !!token && token !== "dev-token-disabled-auth";

  return (
    <AuthCtx.Provider
      value={{
        token,
        role,
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}
