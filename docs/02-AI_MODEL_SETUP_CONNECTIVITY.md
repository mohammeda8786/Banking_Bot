# AI Model Setup & Connectivity Guide

## Overview
This AI Banking Bot uses **Ollama** for local LLM inference and **ChromaDB** for RAG (Retrieval Augmented Generation). This setup ensures:
- ✅ Data privacy (no cloud API calls)
- ✅ Cost-effective (no API charges)
- ✅ Compliance-friendly (on-premise deployment)
- ✅ Low latency (local inference)

---

## Prerequisites

### System Requirements
- **RAM**: Minimum 8GB (16GB recommended for 13B models)
- **Disk Space**: 10GB+ for models
- **GPU** (Optional): NVIDIA GPU speeds up inference 5-10x
  - NVIDIA CUDA 11.8+ (if using GPU)
  - 4GB+ VRAM for quantized models

### Installed Software
- Node.js 18+
- MongoDB 5.0+
- Docker (optional, but recommended)

---

## Step 1: Install & Run Ollama

### Option A: Direct Installation

1. **Download Ollama**
   ```bash
   # macOS/Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Windows
   # Download from https://ollama.ai/download
   ```

2. **Pull a Model**
   ```bash
   # Mistral 7B (Recommended - fastest, good quality)
   ollama pull mistral
   
   # Alternative: Llama 2 7B (More trained, slower)
   ollama pull llama2
   
   # Alternative: Neural Chat (Optimized for chat)
   ollama pull neural-chat
   ```

3. **Start Ollama Server**
   ```bash
   ollama serve
   # Server runs on http://localhost:11434
   ```

### Option B: Docker Setup (Recommended)

```bash
# Start Ollama in Docker with GPU support
docker run -d \
  --gpus all \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  --name ollama \
  ollama/ollama

# Pull model
docker exec ollama ollama pull mistral

# Verify
curl http://localhost:11434/api/tags
```

### Verify Installation
```bash
# Test endpoint
curl http://localhost:11434/api/tags

# Expected output:
# {"models":[{"name":"mistral:latest","modified_at":"..."}]}
```

---

## Step 2: Install & Run ChromaDB

### Option A: Python Package (Quick)
```bash
# Install ChromaDB
pip install chromadb

# Start as server
chroma run --host localhost --port 8000
```

### Option B: Docker Setup (Recommended)

```bash
# Start ChromaDB in Docker
docker run -d \
  -p 8000:8000 \
  --name chroma \
  ghcr.io/chroma-core/chroma:latest

# Verify
curl http://localhost:8000/api/v1/collections
```

### Verify Installation
```bash
# Check ChromaDB is responding
curl http://localhost:8000/api/v1/heartbeat
# Expected: 200 OK
```

---

## Step 3: Configure Environment Variables

1. **Copy template to .env**
   ```bash
   cd server
   cp .env.example .env
   ```

2. **Edit `.env` with your values**
   ```bash
   # Most important settings:
   MONGODB_URI=mongodb://localhost:27017/ai-banking-bot
   JWT_SECRET=your_secure_random_key_here
   OLLAMA_BASE=http://localhost:11434
   OLLAMA_MODEL=mistral
   CHROMA_HOST=localhost
   CHROMA_PORT=8000
   ```

3. **Generate JWT Secret (securely)**
   ```bash
   # Generate 32-byte random key
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Use output as JWT_SECRET in .env
   ```

---

## Step 4: Install Server Dependencies

```bash
cd server
npm install
```

---

## Step 5: Run Connectivity Tests

```bash
# Test all AI components
npm run test:ai
# or
node test-ai-connectivity.js
```

**Expected Output:**
```
✓ PASS | Ollama Server Health
✓ PASS | Ollama Text Generation
✓ PASS | ChromaDB Connection
✓ PASS | RAG Pipeline
✓ PASS | Safety Gates & PII
✓ PASS | Database Connection
✓ PASS | Environment Variables

Passed: 7 | Failed: 0
SUCCESS: All tests passed! AI system is ready.
```

---

## Step 6: Seed Demo Data

```bash
# Populate MongoDB and ChromaDB with sample banking policy
npm run seed

# This:
# 1. Creates demo users (admin, customer)
# 2. Ingests bank_policy.txt to ChromaDB
# 3. Creates sample accounts and transactions
```

---

## Step 7: Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start

# Server runs on http://localhost:5000
```

---

## Test Endpoints

### 1. Health Check
```bash
curl http://localhost:5000/
# Expected: "Backend running"
```

### 2. Authentication
```bash
# Sign up
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"pass123","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"pass123"}'

# Response: JWT token
```

### 3. Chat with AI
```bash
# Use JWT token from login
curl -X POST http://localhost:5000/api/chat \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message":"How do I open a savings account?"}'

# Expected response:
# {
#   "reply": "You can open a savings account at ICICI Bank online..."
# }
```

### 4. Get Banking Info
```bash
curl -X GET http://localhost:5000/api/bank/accounts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Troubleshooting

### Issue: "Ollama not reachable"
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# If failed:
# 1. Start Ollama: ollama serve
# 2. Check firewall isn't blocking port 11434
```

### Issue: "ChromaDB connection refused"
```bash
# Check if ChromaDB is running
curl http://localhost:8000/api/v1/heartbeat

# If failed:
# 1. Start ChromaDB: chroma run --host localhost --port 8000
# 2. Or: docker run -d -p 8000:8000 ghcr.io/chroma-core/chroma:latest
```

### Issue: "Out of memory" during model loading
```bash
# Use smaller quantized model
ollama pull mistral:q4_K_M  # 4-bit quantized (5GB RAM needed)

# Or use smaller model
ollama pull orca-mini
```

### Issue: Slow inference (>5 seconds)
```bash
# Check GPU is available
curl http://localhost:11434/api/tags

# Add GPU to Ollama (if available)
# Edit Ollama config or restart with GPU flags
```

---

## Performance Optimization

### 1. Model Selection

| Model | Size | Speed | Quality | RAM |
|-------|------|-------|---------|-----|
| **orca-mini** | 2.7B | ⚡⚡⚡ Fast | ⭐⭐ Good | 3GB |
| **mistral** | 7B | ⚡⚡ Fast | ⭐⭐⭐ Great | 8GB |
| **llama2** | 7B/13B | ⚡ Medium | ⭐⭐⭐ Great | 8/16GB |
| **neural-chat** | 7B | ⚡⚡ Fast | ⭐⭐⭐ Good | 8GB |

**Recommendation**: Use `mistral` for balanced performance.

### 2. Quantization
```bash
# Load quantized model (smaller, faster, less accurate)
ollama pull mistral:q4_K_M    # 4-bit, 5GB
ollama pull mistral:q5_K_M    # 5-bit, 6GB
ollama pull mistral:q6_K      # 6-bit, 8GB
```

### 3. GPU Acceleration
- **NVIDIA**: Install CUDA 11.8+, models auto-detect GPU
- **AMD**: Use Docker with ROCm support
- **Apple Silicon**: Auto-detected, native optimization

### 4. Caching
- ChromaDB caches embeddings
- Ollama caches model weights in memory
- Enable Redis for chat history (optional)

---

## Production Deployment

### Kubernetes Setup
```yaml
# See k8s/ollama-deployment.yaml
# Runs Ollama with:
# - GPU pod scheduling
# - HPA (horizontal auto-scaling)
# - PVC for model persistence
```

### Docker Compose (Multi-container)
```bash
docker-compose -f docker-compose.prod.yml up -d

# Runs:
# - MongoDB
# - Ollama (with GPU)
# - ChromaDB
# - Express Server
# - Nginx reverse proxy
```

---

## Security Checklist

- [ ] Change JWT_SECRET to random secure key
- [ ] Set CORS_ORIGIN to frontend domain only
- [ ] Enable HTTPS in production
- [ ] MongoDB authentication enabled
- [ ] Rate limiting configured
- [ ] Audit logs enabled
- [ ] PII masking in chatbot responses
- [ ] Input validation on all endpoints

---

## Next Steps

1. ✅ Start Ollama and ChromaDB servers
2. ✅ Configure .env file
3. ✅ Run npm run test:ai
4. ✅ Run npm run seed
5. ✅ Start server: npm run dev
6. ✅ Test endpoints with provided curl commands

See [01-LITERATURE_REPO_ANALYSIS.md](./01-LITERATURE_REPO_ANALYSIS.md) for research context.

