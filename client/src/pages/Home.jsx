import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../pages/Chat";
import "../styles/Home.css";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Background Gradient */}
      <div className="home-gradient-bg"></div>

      {/* Top-Right Auth Icon */}
      <div className="auth-icons-top-right">
        <button
          className="auth-icon-btn login-btn"
          onClick={() => navigate("/login")}
          title="Sign In"
        >
          <span className="auth-icon-text">🔐</span>
          <span className="auth-icon-label">Sign In</span>
        </button>
        <button
          className="auth-icon-btn register-btn"
          onClick={() => navigate("/register")}
          title="Create Account"
        >
          <span className="auth-icon-text">✍️</span>
          <span className="auth-icon-label">Register</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="home-content">
        <div className="hero-section">
          {/* Logo/Title */}
          <div className="hero-header">
            <h1 className="hero-title">ICICI BANK</h1>
            <p className="hero-description">
              Your intelligent banking assistant powered by local AI
            </p>
          </div>

          {/* Feature Grid */}
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Assistant</h3>
              <p>
                Smart chatbot that answers banking questions in real-time using
                local AI
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Secure & Private</h3>
              <p>
                All data stays on-premise. No cloud API calls. Bank-grade
                security.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Account Management</h3>
              <p>
                View accounts, transactions, and manage your banking operations
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Reliable</h3>
              <p>
                Sub-second response times with advanced retrieval-augmented
                generation
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-time Analytics</h3>
              <p>
                Monitor your account activity with detailed transaction history
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Compliance Ready</h3>
              <p>
                PII masking, audit logging, and policy enforcement built-in
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <button
              className="cta-button cta-primary"
              onClick={() => setIsChatOpen(true)}
            >
              💬 Try AI Chat Now
            </button>
            <button
              className="cta-button cta-secondary"
              onClick={() => navigate("/login")}
            >
              🔐 Sign In
            </button>
          </div>

          {/* Info Section */}
          <div className="info-section">
            <h2>How It Works</h2>
            <div className="info-steps">
              <div className="step">
                <div className="step-number">1</div>
                <h4>Ask a Question</h4>
                <p>Chat with our AI assistant about banking services</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h4>AI Retrieves Context</h4>
                <p>AI searches banking policies and your account data</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h4>Smart Response</h4>
                <p>Get accurate, context-aware answers instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {isChatOpen && (
        <div
          className="chat-modal-overlay"
          onClick={() => setIsChatOpen(false)}
        >
          <div className="chat-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setIsChatOpen(false)}
              title="Close"
            >
              ✕
            </button>
            <Chat onClose={() => setIsChatOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
