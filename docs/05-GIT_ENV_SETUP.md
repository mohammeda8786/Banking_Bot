# Git Repository & Environment Setup

## Overview

This guide provides:
1. **Git Configuration** - Repository initialization and best practices
2. **Environment Variables** - Secure configuration for dev/test/prod
3. **Folder Structure** - Clean, scalable architecture
4. **.gitignore Rules** - Prevent accidental commits of sensitive data
5. **Secret Management** - Handling API keys and credentials securely

---

## 1. Git Repository Initialization

### 1.1 Initialize Repository

```bash
# Navigate to project root
cd c:\ai-banking-bot

# Initialize git (if not already done)
git init

# Verify git is initialized
git status
```

### 1.2 Configure Git User (Local)

```bash
# Set your identity for commits
git config user.name "Your Name"
git config user.email "your.email@company.com"

# Verify configuration
git config --list
```

### 1.3 Create Initial Commit

```bash
# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: AI Banking Bot project structure

- Frontend: React + Vite
- Backend: Express.js + MongoDB
- AI: Ollama (local LLM) + ChromaDB (RAG)
- Features: Authentication, RAG chat, banking operations
- Security: JWT, PII masking, audit logging"

# Check commit history
git log --oneline
```

---

## 2. Environment Variables - Complete Guide

### 2.1 Directory Structure for Configs

```
ai-banking-bot/
├── server/
│   ├── .env.example          ← Template (commit to git)
│   ├── .env                  ← Local (DON'T commit - .gitignore)
│   ├── .env.development      ← Dev override (optional)
│   ├── .env.production       ← Prod override (DON'T commit)
│   └── .env.test             ← Testing (DON'T commit)
├── client/
│   ├── .env.example          ← Template (commit to git)
│   ├── .env                  ← Local (DON'T commit)
│   └── .env.production       ← Prod override (DON'T commit)
└── docs/
    └── ENV_SETUP.md          ← This file
```

### 2.2 Backend Environment Variables

**File:** `server/.env`

```
# ============================================
# DATABASE
# ============================================
# MongoDB connection string
# Format: mongodb://[user:password@]host:port/database
# 
# Local development: localhost with no auth
MONGODB_URI=mongodb://localhost:27017/ai-banking-bot

# Optional: MongoDB Atlas cloud
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-banking-bot

MONGODB_USER=
MONGODB_PASSWORD=

# ============================================
# SERVER
# ============================================
NODE_ENV=development
PORT=5000

# CORS configuration (allows requests from)
CORS_ORIGIN=http://localhost:5173

# ============================================
# SECURITY & AUTHENTICATION
# ============================================
# JWT: JSON Web Token secret for signing tokens
# SECURITY: Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_jwt_secret_key_change_in_production_12345

# JWT token expiration (format: "7d", "24h", "3600s")
JWT_EXPIRE=7d

# Bcrypt rounds for password hashing (10-12 recommended)
BCRYPT_ROUNDS=10

# ============================================
# AI & LLM (OLLAMA)
# ============================================
# Ollama API endpoint (local inference)
OLLAMA_BASE=http://localhost:11434

# Model to use: mistral, llama2, neural-chat, orca-mini
OLLAMA_MODEL=mistral

# Request timeout in seconds
OLLAMA_TIMEOUT=120

# ============================================
# VECTOR DATABASE (CHROMA)
# ============================================
# ChromaDB connection
CHROMA_HOST=localhost
CHROMA_PORT=8000

# Collection name for indexing documents
CHROMA_COLLECTION=banking_docs

# ============================================
# FILE UPLOADS
# ============================================
# Directory to store uploaded files
UPLOAD_DIR=./uploads

# Max file size in bytes (10MB = 10485760)
MAX_FILE_SIZE=10485760

# Allowed file types (comma-separated)
ALLOWED_FILE_TYPES=pdf,txt,docx

# ============================================
# API RATE LIMITING
# ============================================
# Max requests per window
RATE_LIMIT_MAX_REQUESTS=20

# Time window in milliseconds (15 min = 900000)
RATE_LIMIT_WINDOW_MS=900000

# ============================================
# LOGGING & AUDIT
# ============================================
# Log level: error, warn, info, debug, trace
LOG_LEVEL=debug

# Enable audit trail for compliance
AUDIT_LOG_ENABLED=true

# Audit log directory
AUDIT_LOG_DIR=./logs

# ============================================
# OPTIONAL: Cloud LLM Services
# ============================================
# Uncomment to use cloud providers instead of local Ollama

# OpenAI
# OPENAI_API_KEY=sk-...
# OPENAI_MODEL=gpt-4

# Hugging Face
# HUGGINGFACE_API_KEY=hf_...

# ============================================
# DEVELOPMENT ONLY
# ============================================
# Enable debug output
DEBUG=ai-banking-bot:*

# Seed database on startup
SEED_DB=true

# Allow test data
TEST_MODE=false
```

### 2.3 Frontend Environment Variables

**File:** `client/.env`

```
# ============================================
# API CONFIGURATION
# ============================================
# Backend API base URL
VITE_API_BASE_URL=http://localhost:5000/api

# Request timeout in milliseconds
VITE_API_TIMEOUT=30000

# ============================================
# APPLICATION ENVIRONMENT
# ============================================
VITE_APP_ENV=development
VITE_APP_NAME=AI Banking Bot

# ============================================
# FEATURES (Feature Flags)
# ============================================
# Enable/disable features for A/B testing
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_CHAT=true
VITE_ENABLE_ACCOUNTS=true
VITE_ENABLE_TRANSACTIONS=true
VITE_ENABLE_ADMIN=false

# ============================================
# LOGGING & DEBUGGING
# ============================================
VITE_LOG_LEVEL=debug
VITE_BROWSER_DEBUG=true

# ============================================
# UI/UX
# ============================================
# Session timeout (milliseconds)
VITE_SESSION_TIMEOUT=3600000

# Auto-save chat history
VITE_AUTO_SAVE_CHAT=true
VITE_CHAT_HISTORY_LIMIT=100

# ============================================
# OPTIONAL: Analytics & Monitoring
# ============================================
# Sentry for error tracking
# VITE_SENTRY_DSN=https://...
# VITE_SENTRY_ENV=development

# Google Analytics
# VITE_GTAG_ID=G-XXXXXXXXXX

# Hotjar for user behavior
# VITE_HOTJAR_ID=...
```

---

## 3. Secure Environment Variable Handling

### 3.1 Development Environment Setup

```bash
# Step 1: Copy templates
cp server/.env.example server/.env
cp client/.env.example client/.env

# Step 2: Generate secure JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Output: abc123def456ghi789...

# Step 3: Edit .env files and fill in values
# Use your favorite editor:
# - VSCode: code server/.env
# - Nano: nano server/.env

# Step 4: Verify .env files are in .gitignore
cat server/.gitignore | grep "\.env"
cat client/.gitignore | grep "\.env"

# Step 5: Test configuration
npm run test:ai    # Tests all connections
```

### 3.2 Environment by Stage

```
┌──────────────────────────────────────────────────┐
│ DEVELOPMENT                                      │
├──────────────────────────────────────────────────┤
│ NODE_ENV=development                             │
│ MongoDB=local (no auth)                          │
│ Ollama=localhost                                 │
│ ChromaDB=localhost                               │
│ Logging=debug                                    │
│ CORS=localhost:5173                              │
│ Rate Limit=20 req/15min (relaxed)                │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ TESTING                                          │
├──────────────────────────────────────────────────┤
│ NODE_ENV=test                                    │
│ MongoDB=test database (separate)                 │
│ Ollama=mock/stub                                 │
│ Logging=warn (less verbose)                      │
│ CORS=*                                           │
│ Rate Limit=disabled                              │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ PRODUCTION                                       │
├──────────────────────────────────────────────────┤
│ NODE_ENV=production                              │
│ MongoDB=cloud (auth required)                    │
│ Ollama=private cluster                           │
│ Logging=warn/error only                          │
│ CORS=specific domains only                       │
│ Rate Limit=strict (20 req/15min)                 │
│ HTTPS=enabled                                    │
│ Secrets=in K8s/container orchestration           │
└──────────────────────────────────────────────────┘
```

### 3.3 Loading Environments by Stage

```bash
# Development (default)
npm run dev
# Uses: server/.env (local overrides)

# Test
NODE_ENV=test npm run test:ai
# Uses: server/.env.test (testing config)

# Production (Docker/K8s)
NODE_ENV=production npm start
# Uses: server/.env.production (prod secrets injected by orchestration)
```

---

## 4. .gitignore Security Checklist

### What to NEVER commit:

```
❌ .env files (any variant)
❌ Private keys / certificates
❌ API keys
❌ Database passwords
❌ node_modules/ (use package-lock.json)
❌ dist/ (regenerated from source)
❌ logs/ (contains user data)
❌ uploads/ (user files)
❌ .DS_Store / Thumbs.db (OS files)
❌ IDE config with secrets

✅ DO commit:
✅ .env.example (template)
✅ .gitignore (rules)
✅ .github/workflows (CI/CD)
✅ Source code (.js, .jsx, .ts, .tsx)
✅ Configuration (package.json, vite.config.js)
✅ Documentation (README.md, docs/)
✅ Tests and test fixtures
```

### Verify nothing sensitive is committed:

```bash
# Check git staging area
git diff --cached

# Check last 5 commits for .env
git log -p -S ".env" -- . | head -50

# Use git-secrets (optional)
npm install -g git-secrets
git secrets --install
git secrets --register-aws
```

---

## 5. Secret Management Strategies

### 5.1 Development (Local Machine)

```
File: server/.env (local, never committed)

Approach:
- Store secrets in local .env file
- Load via dotenv package
- Keep file in .gitignore

Security:
- File permissions: chmod 600 .env
- IDE: Don't display in search results
- Backup: Include in secure backup only
```

### 5.2 GitHub/GitLab (CI/CD)

```
Store in: Repository Settings → Secrets

Steps:
1. Go to Settings → Secrets and variables → Actions
2. Add new secrets:
   - Name: MONGODB_URI
   - Value: mongodb+srv://user:pass@...
3. Use in GitHub Actions:
   
   env:
     MONGODB_URI: ${{ secrets.MONGODB_URI }}
```

### 5.3 Docker/Container

```
Use: Docker secrets or environment variables

Docker run:
docker run -e MONGODB_URI=... -e JWT_SECRET=... app

Docker compose:
services:
  server:
    environment:
      MONGODB_URI: mongodb://mongo:27017/db
      JWT_SECRET: ${JWT_SECRET}  # From .env file
```

### 5.4 Kubernetes (Production)

```
Use: Kubernetes Secrets

Create secret:
kubectl create secret generic ai-banking-secrets \
  --from-literal=MONGODB_URI=mongodb+srv://... \
  --from-literal=JWT_SECRET=abc123...

Reference in deployment:
env:
  - name: MONGODB_URI
    valueFrom:
      secretKeyRef:
        name: ai-banking-secrets
        key: MONGODB_URI
```

### 5.5 AWS/Cloud (Best Practice)

```
Services:
- AWS Secrets Manager
- Azure Key Vault
- GCP Secret Manager

Code example (AWS):
const secretsManager = new AWS.SecretsManager();
const secret = await secretsManager.getSecretValue({
  SecretId: 'ai-banking-prod-secrets'
}).promise();
const credentials = JSON.parse(secret.SecretString);
```

---

## 6. Environment Variable Validation

### 6.1 Runtime Validation

**File:** `server/config/validateEnv.js`

```javascript
import dotenv from 'dotenv';

dotenv.config();

const requiredVars = {
  // Database
  MONGODB_URI: String,
  
  // Server
  PORT: Number,
  JWT_SECRET: String,
  
  // AI
  OLLAMA_BASE: String,
  OLLAMA_MODEL: String,
  
  // Vector DB
  CHROMA_HOST: String,
  CHROMA_PORT: Number
};

function validateEnvironment() {
  const errors = [];
  
  for (const [key, type] of Object.entries(requiredVars)) {
    const value = process.env[key];
    
    if (!value) {
      errors.push(`❌ Missing required variable: ${key}`);
      continue;
    }
    
    if (type === Number && isNaN(Number(value))) {
      errors.push(`❌ ${key} must be a number, got: ${value}`);
    }
    
    if (key === 'JWT_SECRET' && value.length < 32) {
      errors.push(`⚠️  JWT_SECRET too short (min 32 chars): ${value.length}`);
    }
  }
  
  if (errors.length > 0) {
    console.error('\n' + errors.join('\n') + '\n');
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated successfully');
}

export default validateEnvironment;
```

**Usage in index.js:**

```javascript
import validateEnvironment from './config/validateEnv.js';

validateEnvironment();

// Continue with app initialization
```

---

## 7. Git Workflow Best Practices

### 7.1 Branch Strategy

```
main (production)
  ↑
  └─ develop (integration)
      ↑
      ├─ feature/ai-chat
      ├─ feature/bank-accounts
      ├─ bugfix/pii-masking
      └─ docs/architecture
```

### 7.2 Commit Message Format

```
Format: <type>: <subject>

Types:
- feat:    New feature
- fix:     Bug fix
- docs:    Documentation
- style:   Code style (no logic change)
- refactor: Code restructure
- perf:    Performance improvement
- test:    Test addition/modification
- chore:   Build, dependencies, tooling

Examples:
feat: add RAG context retrieval to chat endpoint
fix: mask account numbers in AI responses
docs: add architecture documentation
chore: update dependencies
```

### 7.3 PR Template

**File:** `.github/pull_request_template.md`

```markdown
## Description
Brief description of changes

## Changes Made
- Change 1
- Change 2

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] All tests pass
- [ ] Added new tests

## Checklist
- [ ] No .env files committed
- [ ] No API keys in code
- [ ] Documentation updated
- [ ] Code follows project style
```

---

## 8. File Structure Summary

```
ai-banking-bot/                      (Root)
├── .git/                            (Git history)
├── .gitignore                       (Git rules)
├── .github/
│   └── workflows/                   (CI/CD pipelines)
│
├── server/                          (Backend)
│   ├── .env.example                 ✅ COMMIT
│   ├── .env                         ❌ DON'T COMMIT
│   ├── .gitignore                   ✅ COMMIT
│   ├── package.json                 ✅ COMMIT
│   ├── package-lock.json            ✅ COMMIT (or yarn.lock)
│   ├── index.js                     ✅ COMMIT
│   ├── config/
│   │   ├── db.js
│   │   └── validateEnv.js
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── ai_engine/
│   ├── uploads/                     ❌ User files
│   ├── logs/                        ❌ Sensitive logs
│   ├── test-ai-connectivity.js      ✅ COMMIT
│   └── README.md                    ✅ COMMIT
│
├── client/                          (Frontend)
│   ├── .env.example                 ✅ COMMIT
│   ├── .env                         ❌ DON'T COMMIT
│   ├── .gitignore                   ✅ COMMIT
│   ├── package.json                 ✅ COMMIT
│   ├── package-lock.json            ✅ COMMIT
│   ├── vite.config.js               ✅ COMMIT
│   ├── src/
│   ├── public/
│   ├── dist/                        ❌ Build output
│   └── README.md                    ✅ COMMIT
│
├── docs/                            (Documentation)
│   ├── 01-LITERATURE_REPO_ANALYSIS.md
│   ├── 02-AI_MODEL_SETUP_CONNECTIVITY.md
│   ├── 03-ARCHITECTURE_DB_SCHEMA.md
│   ├── 04-UI_UX_WIREFRAMES.md
│   ├── 05-GIT_ENV_SETUP.md          (This file)
│   └── README.md
│
└── README.md                        (Root documentation)
```

---

## 9. Quick Start Checklist

```bash
# 1. Clone/setup repository
[ ] git init
[ ] git config user.name/email

# 2. Setup environment
[ ] cp server/.env.example server/.env
[ ] cp client/.env.example client/.env
[ ] Generate JWT_SECRET
[ ] Update .env with local values

# 3. Install dependencies
[ ] npm install (in server/)
[ ] npm install (in client/)

# 4. Start services
[ ] ollama serve (in another terminal)
[ ] chroma run --host localhost --port 8000 (in another terminal)
[ ] mongod (in another terminal)

# 5. Verify setup
[ ] npm run test:ai (in server/)
[ ] npm run seed (in server/) - optional

# 6. Start development
[ ] npm run dev (in server/)
[ ] npm run dev (in client/)

# 7. Verify .gitignore
[ ] Check .env not in git: git status
[ ] Check no secrets in code: git grep -i "secret\|password\|key"

# 8. First commit
[ ] git add .
[ ] git commit -m "Initial commit: AI Banking Bot..."
[ ] git log --oneline
```

---

## Summary

**Environment Management Checklist:**
- ✅ Never commit `.env` files (use `.env.example`)
- ✅ Generate strong JWT secrets (32+ bytes)
- ✅ Use `.gitignore` to exclude sensitive files
- ✅ Validate environment variables at startup
- ✅ Use different configs for dev/test/prod
- ✅ Store secrets in secure vaults (K8s, AWS, etc.)
- ✅ Document all required variables
- ✅ Regular security audits of committed code

**See also:**
- [02-AI_MODEL_SETUP_CONNECTIVITY.md](./02-AI_MODEL_SETUP_CONNECTIVITY.md) - How to configure AI services
- [03-ARCHITECTURE_DB_SCHEMA.md](./03-ARCHITECTURE_DB_SCHEMA.md) - Database design
- [../README.md](../README.md) - Main project documentation

