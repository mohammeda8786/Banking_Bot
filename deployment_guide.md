# Deployment Guide - AI Banking Bot

This guide outlines the steps to deploy the AI Banking Bot across different environments.

## 🛠 Prerequisites

Ensure the following are installed and running:
- **Node.js 18+**
- **MongoDB 5.0+**
- **Ollama** (for AI inference)
- **ChromaDB** (for banking knowledge storage)

---

## 🌐 How It Works for the End User

When you deploy this application, the **end-user does NOT need to install Ollama or ChromaDB**. 

The architecture shifts from "Local" to "Hosted":
- **Your Server (Backend)**: You host the Node.js API, Ollama, and ChromaDB on a server you control.
- **The User (Client)**: They just visit your website (the React app) in a browser. Their browser talks to *your* backend, which handles the AI processing behind the scenes.

---

## 1. Cloud Infrastructure (Developer Hosted)

Best for testing and further development.

### Backend Setup
1. Navigate to `/server`.
2. Install dependencies: `npm install`.
3. Configure `.env`: Use `.env.example` as a template.
4. Download the model: `ollama pull mistral`.
5. Run the server: `npm run dev` (starts on port 5000).

### Frontend Setup
1. Navigate to `/client`.
2. Install dependencies: `npm install`.
3. Configure `.env`: Point `VITE_API_BASE_URL` to your backend.
4. Run the app: `npm run dev` (starts on port 5173).

---

## 2. Docker Deployment (Recommended)

Docker Compose is the best way to package everything (Backend, Frontend, MongoDB, ChromaDB) into a single deployment.

### Ollama in Docker
To include Ollama in your deployment without requiring a local install:
- Use the official Ollama Docker image in your `docker-compose.yml`.
- **Note**: For production, you will need a server with a **GPU** for fast AI responses, as running AI on a standard CPU can be slow.

---

## 3. Production Deployment (Cloud/VPS)

For large-scale, production-ready deployments.

1. **Push Images**: Upload your Docker images to a registry (e.g., Docker Hub, GCR).
2. **Apply Configurations**: Deploy the manifests located in the `k8s/` directory (if available).
   ```bash
   kubectl apply -f k8s/
   ```
3. **Services Included**:
   - **Express Server**: Scalable pods.
   - **Ollama**: DaemonSet for GPU nodes.
   - **Database**: StatefulSets for MongoDB and ChromaDB.

---

## 🔒 Security Best Practices for Deployment
- **HTTPS**: Always use TLS/SSL for production endpoints.
- **Environment Secrets**: Never commit `.env` files. Use secret management tools.
- **Database Auth**: Enable authentication for MongoDB and restrict access to the server IP.
- **Rate Limiting**: Ensure the built-in rate limiter is active to prevent DDoS.
