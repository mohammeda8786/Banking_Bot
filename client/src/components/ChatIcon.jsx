import { useState } from "react";
import Chat from "../pages/Chat";
import "../styles/ChatIcon.css";

export default function ChatIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Full screen gradient background */}
      <div className="fullscreen-gradient"></div>

      {/* Chatbot Icon */}
      <button
        className="chat-icon-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Open Chatbot"
      >
        💬
      </button>

      {/* Chat Modal/Popup */}
      {isOpen && (
        <div className="chat-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setIsOpen(false)}
              title="Close"
            >
              ✕
            </button>
            <Chat onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
