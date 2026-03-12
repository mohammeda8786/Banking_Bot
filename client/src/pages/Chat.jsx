import { useState, useEffect, useRef } from "react";
import http from "../api/http";
import { useAuth } from "../auth/AuthContext";
import "../styles/Chat.css";

export default function Chat() {
  const { token } = useAuth();
  const [message, setMessage] = useState("What are the security rules customers should follow?");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [msgs, loading]);

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

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
      // Speak the bot's reply
      speakText(reply);
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Chat failed");
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setErr("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      setErr("Speech recognition error: " + event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const speakText = (text) => {
    if (!synthRef.current) return;

    // Stop any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        <div className="chat-header">
          <div className="header-content">
            <div className="header-icon">💬</div>
            <div>
              <h1>ICICI Banking Assistant</h1>
              <p>AI-Powered Support</p>
            </div>
          </div>
        </div>

        <div className="messages-container">
          {msgs.length === 0 && !err ? (
            <div className="empty-state">
              <div className="empty-icon">✨</div>
              <h2>How can I help you today?</h2>
              <p>Ask about policies, security, or any banking related questions.</p>
            </div>
          ) : (
            <>
              {msgs.map((m, i) => (
                <div key={i} className={`message-wrapper ${m.from === "user" ? "user-msg" : "bot-msg"}`}>
                  {m.from === "bot" && <div className="bot-avatar">🤖</div>}
                  <div className={`message ${m.from === "user" ? "user" : "bot"}`}>
                    <p>{m.text}</p>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="message-wrapper bot-msg">
                  <div className="bot-avatar">🤖</div>
                  <div className="message bot">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}

              {err && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  <span>{err}</span>
                </div>
              )}
              <div ref={bottomRef} />
            </>
          )}
        </div>

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
              className="send-button"
              onClick={send}
              disabled={loading || !message.trim()}
            >
              <span className="send-icon">➤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
