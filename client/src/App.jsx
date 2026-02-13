import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./auth/AuthContext";
import ChatIcon from "./components/ChatIcon";
// Authentication disabled - Login route removed
// import Login from "./pages/Login";
// Admin features disabled
// import AdminUpload from "./pages/AdminUpload";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatIcon />} />
          {/* Authentication routes disabled for development */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/admin" element={<AdminUpload />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
