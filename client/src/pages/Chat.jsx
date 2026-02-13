import { useState } from "react";
import http from "../api/http";
import { useAuth } from "../auth/AuthContext";
import "../styles/Chat.css";

export default function Chat() {
  const { token } = useAuth();
  const [message, setMessage] = useState("What are the security rules customers should follow?");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msgs, setMsgs] = useState([]);

  const send = async () => {
    // Authentication disabled for development
    // if (!token) return setErr("Please login first");
    if (!message.trim()) return;

    setErr("");
    const userMsg = { from: "user", text: message };
    setMsgs((m) => [...m, userMsg]);
    setLoading(true);

    try {
      const res = await http.post("/api/chat", { message });
      const reply = res.data?.reply ?? "(no reply)";
      setMsgs((m) => [...m, { from: "bot", text: reply }]);
      setMessage("");
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Chat failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        <div className="chat-header">
          <div className="header-content">
            <div className="header-icon">💬</div>
            <div>
              <h1>Banking Assistant</h1>
              <p>AI-Powered Support</p>
            </div>
          </div>
        </div>

        <div className="messages-container">
          {msgs.length === 0 && !err && (
            <div className="empty-state">
              <div className="empty-icon">🤖</div>
              <p>Start a conversation with our banking assistant</p>
              <p className="empty-hint">Ask about policies, security, or any banking questions</p>
            </div>
          )}
          
          {msgs.map((m, i) => (
            <div key={i} className={`message-wrapper ${m.from === "user" ? "user-msg" : "bot-msg"}`}>
              <div className={`message ${m.from === "user" ? "user" : "bot"}`}>
                <p>{m.text}</p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="message-wrapper bot-msg">
              <div className="message bot loading-msg">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {err && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{err}</span>
          </div>
        )}

        <div className="input-container">
          <div className="input-wrapper">
            <input
              type="text"
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && send()}
              disabled={loading}
            />
            <button 
              className={`send-button ${loading ? "disabled" : ""}`}
              onClick={send}
              disabled={loading}
            >
              <span>Send</span>
              <span className="send-icon">➤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
