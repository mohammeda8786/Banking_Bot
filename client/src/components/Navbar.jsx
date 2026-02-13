import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  // Authentication disabled for development
  // const { token, role, logout } = useAuth();

  return (
    <div style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #333" }}>
      <Link to="/">Chat</Link>
      {/* Admin Upload disabled */}
      {/* {role === "admin" && <Link to="/admin">Admin Upload</Link>} */}
      {/* Login/Logout disabled */}
      {/* <div style={{ marginLeft: "auto" }}>
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div> */}
    </div>
  );
}
