# Architecture & Database Schema

## System Overview
This document describes the complete system architecture of the AI Banking Bot, including:
1. **ER Diagram** - Database schema and relationships
2. **System Flowchart** - User to Frontend to Backend to AI to Database interaction
3. **Component Interactions** - Data flow and communication patterns

---

## 1. Entity Relationship (ER) Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATABASE SCHEMA (MongoDB)                         │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│       USERS          │
├──────────────────────┤
│ _id: ObjectId (PK)   │◄─────────────────┐
│ name: String         │                  │
│ email: String (UK)   │                  │
│ password: String     │                  │
│ role: String         │                  │
│ createdAt: Date      │                  │
│ updatedAt: Date      │                  │
└──────────────────────┘                  │
         │                                 │
         │ (1:N) owns                      │
         │                                 │
         ▼                                 │
┌──────────────────────┐         ┌─────────────────────────┐
│     ACCOUNTS         │         │  Chat Messages/History  │
├──────────────────────┤         ├─────────────────────────┤
│ _id: ObjectId (PK)   │         │ _id: ObjectId (PK)      │
│ userId: ObjectId(FK) │◄────────│ userId: ObjectId (FK)   │
│ accountType: String  │         │ message: String         │
│ balance: Number      │         │ reply: String           │
│ accountNumber: String│         │ timestamp: Date         │
│ status: String       │         │ sessionId: String       │
│ createdAt: Date      │         │ confidence: Number      │
│ updatedAt: Date      │         │ context: Array[String]  │
└──────────────────────┘         └─────────────────────────┘
         │
         │ (1:N) contains
         │
         ▼
┌──────────────────────┐
│   TRANSACTIONS       │
├──────────────────────┤
│ _id: ObjectId (PK)   │
│ accountId: ObjectId  │
│ (FK)                 │
│ type: String         │
│ (credit/debit)       │
│ amount: Number       │
│ description: String  │
│ timestamp: Date      │
│ status: String       │
└──────────────────────┘

Legend:
PK  = Primary Key
FK  = Foreign Key
UK  = Unique Key
1:N = One-to-Many relationship
```

### Detailed Schema Definitions

#### USERS Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,           // Unique
  password: String,        // Hashed with bcrypt
  role: enum["customer", "admin", "support"],
  kycStatus: String,       // "pending", "verified", "rejected"
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date,
  isActive: Boolean
}
```

#### ACCOUNTS Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,        // Reference to Users._id
  accountType: enum["savings", "checking", "investment"],
  accountNumber: String,   // Unique, masked in responses
  balance: Number,         // In cents/paise
  currency: String,        // "INR", "USD", etc.
  status: enum["active", "frozen", "closed"],
  interestRate: Number,    // e.g., 3.5
  createdAt: Date,
  updatedAt: Date,
  lastTransactionAt: Date
}
```

#### TRANSACTIONS Collection
```javascript
{
  _id: ObjectId,
  accountId: ObjectId,     // Reference to Accounts._id
  type: enum["credit", "debit", "transfer"],
  amount: Number,
  description: String,
  referenceId: String,     // External transaction ID
  status: enum["pending", "completed", "failed", "reversed"],
  metadata: {
    source: String,        // "online", "atm", "check", "transfer"
    category: String       // "salary", "utilities", "shopping", etc.
  },
  timestamp: Date,
  processedAt: Date
}
```

#### CHAT_MESSAGES Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,        // Reference to Users._id
  sessionId: String,       // Session identifier
  userMessage: String,
  aiReply: String,
  
  // RAG Context
  context: [
    {
      source: String,      // "bank_policy.txt", "faq.md", etc.
      text: String,
      similarity: Number    // 0-1, from ChromaDB
    }
  ],
  
  // AI Metadata
  model: String,           // "mistral", "llama2", etc.
  tokens: {
    input: Number,
    output: Number,
    total: Number
  },
  confidence: Number,      // 0-1
  
  // Safety
  sensitiveDetected: Boolean,
  piiMasked: Boolean,
  
  // Audit
  timestamp: Date,
  ipAddress: String,
  userAgent: String
}
```

#### VECTOR_DB (ChromaDB) Structure
```
Collection: "banking_docs"
├── Documents: [
│   {
│     id: "doc_1",
│     content: "ICICI Savings Account Opening...",
│     metadata: {
│       source: "bank_policy.txt",
│       type: "procedure",
│       date: "2024-01-15"
│     },
│     embedding: [0.234, -0.123, ...4096 dims]  // Vector
│   },
│   {
│     id: "doc_2",
│     content: "KYC Requirements...",
│     metadata: { source: "faq.md", type: "requirements" },
│     embedding: [0.156, -0.089, ...4096 dims]
│   }
│   ...
└── ]
```

---

## 2. System Flowchart: User to Database Interaction

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    COMPLETE SYSTEM ARCHITECTURE                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   FRONTEND       │
│  (React + Vite)  │
└────────┬─────────┘
         │
         │ HTTP/REST API
         │ (axios)
         ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    BACKEND (Express.js)                              │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 1. AUTHENTICATION & AUTHORIZATION                          │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ • JWT Token Verification (requireAuth middleware)          │   │
│  │ • Role-based Access Control (admin/customer/support)       │   │
│  │ • Rate Limiting (20 requests per 15 min)                   │   │
│  │ • Audit Logging (user action tracking)                     │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                           │                                         │
│                           ▼                                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 2. REQUEST PARSING & VALIDATION                            │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ • Body parser (JSON)                                        │   │
│  │ • Input validation & sanitization                          │   │
│  │ • PII/Sensitive data detection                             │   │
│  │ • Request logging                                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                           │                                         │
│                           ▼                                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 3. ROUTING & HANDLER SELECTION                             │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ • POST /api/chat              → chatController             │   │
│  │ • GET /api/bank/accounts      → bankController             │   │
│  │ • POST /api/auth/login        → authController             │   │
│  │ • POST /api/admin/docs/upload → docsController             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                           │                                         │
│                           ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ 4. CHAT HANDLER (chatRoutes.js)                              ││
│  ├─────────────────────────────────────────────────────────────────┤│
│  │  Step 4a: Validate Input                                      ││
│  │  ├─ Check message ≠ null                                      ││
│  │  └─ Verify user is authenticated                              ││
│  │                                                              ││
│  │  Step 4b: Security Gates                                      ││
│  │  ├─ containsSensitiveAsk() → Block PII questions              ││
│  │  │  (OTP, PIN, CVV, Aadhaar, PAN, Password)                 ││
│  │  ├─ Returns: "I can't help with PII details"                 ││
│  │  └─ Audit Log: CHAT_BLOCKED_SENSITIVE                        ││
│  │                                                              ││
│  │  Step 4c: Input Sanitization                                  ││
│  │  ├─ safeUserQuestion() removes malicious instructions        ││
│  │  └─ Anti-prompt-injection measures                           ││
│  │                                                              ││
│  │  Step 4d: RAG Context Retrieval                               ││
│  │  ├─ Call: retrieveContext(question, userRole)                ││
│  │  ├─ Calls ChromaDB retriever.js                              ││
│  │  ├─ Gets top-4 most similar documents                        ││
│  │  └─ Returns: [{ text, source, similarity }]                  ││
│  │                                                              ││
│  │  Step 4e: Prompt Construction                                 ││
│  │  ├─ System Rules                                             ││
│  │  ├─ RAG Context                                              ││
│  │  ├─ User Question                                            ││
│  │  └─ Output Instructions                                      ││
│  │                                                              ││
│  │  Step 4f: LLM Inference                                       ││
│  │  ├─ Call: callOllama(prompt)                                 ││
│  │  ├─ Ollama API: POST /api/generate                           ││
│  │  ├─ Model: mistral (7B params)                               ││
│  │  └─ Output: AI Response                                      ││
│  │                                                              ││
│  │  Step 4g: Post-Processing                                     ││
│  │  ├─ maskAccountLike() removes account numbers                ││
│  │  └─ Ensure response compliance                               ││
│  │                                                              ││
│  │  Step 4h: Audit & Response                                    ││
│  │  ├─ Log: CHAT_OK { userId, timestamp }                       ││
│  │  └─ Return: { reply: answer }                                ││
│  └─────────────────────────────────────────────────────────────────┘│
│                           │                                         │
│                           ▼                                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 5. DATABASE OPERATIONS (MongoDB)                            │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ • Save chat message & AI response                           │   │
│  │ • Update user interaction history                           │   │
│  │ • Fetch account/transaction data (if needed)                │   │
│  │ • Insert audit logs                                         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                           ▼                                         │
└──────────────────────────────────────────────────────────────────────┘
         │
         │ Response (JSON)
         │
         ▼
┌──────────────────┐
│   FRONTEND       │
│  Display Result  │
│  • Chat bubble   │
│  • Loading state │
│  • Error msg     │
└──────────────────┘
```

---

## 3. Detailed AI Chat Flow Sequence Diagram

```
Frontend User          Express Server          ChromaDB             Ollama LLM
   │                       │                      │                    │
   │─ POST /api/chat ──────>│                      │                    │
   │  { message: "..." }    │                      │                    │
   │                        │                      │                    │
   │                        │── Validate Auth ────>│                    │
   │                        │<────────────────────│                    │
   │                        │                      │                    │
   │                        │ Check: containsSensitive?                │
   │                        │ ├─ YES: Block & return error             │
   │                        │ └─ NO: Continue                          │
   │                        │                      │                    │
   │                        │── Sanitize Input ───>│                    │
   │                        │  safeUserQuestion()  │                    │
   │                        │                      │                    │
   │                        │── Query ────────────>│                    │
   │                        │ search_similar       │                    │
   │                        │ (embeddings)         │                    │
   │                        │<─── Top-K Results ──│                    │
   │                        │ [{text, source}]    │                    │
   │                        │                      │                    │
   │                        │ Build RAG Prompt    │                    │
   │                        │ {                   │                    │
   │                        │   system_rules,     │                    │
   │                        │   context,          │                    │
   │                        │   user_question     │                    │
   │                        │ }                   │                    │
   │                        │                      │                    │
   │                        │─── POST /api/generate ─────────────────>│
   │                        │    { prompt, model  │                    │
   │                        │      stream: false} │                    │
   │                        │                      │                    │
   │                        │                      │     Process LLM   │
   │                        │                      │     (GPU/CPU)     │
   │                        │                      │                    │
   │                        │<─────────────────────── { response } ────│
   │                        │                      │                    │
   │                        │ Post-Process        │                    │
   │                        │ maskAccountLike()   │                    │
   │                        │                      │                    │
   │                        │ Save to MongoDB    │                    │
   │                        │ • chat_messages    │                    │
   │                        │ • audit_logs       │                    │
   │                        │                      │                    │
   │<─ {reply: "..."} ─────│                      │                    │
   │                        │                      │                    │
   Display in UI            │                      │                    │
```

---

## 4. Component Interactions & Data Flow

### 4.1 Authentication Flow
```
User Input (email, password)
         │
         ▼
├─ POST /api/auth/register
│   └─ Hash password (bcryptjs)
│   └─ Insert User document
│   └─ Return: { token, user }
│
└─ POST /api/auth/login
   ├─ Find user by email
   ├─ Compare password hash
   ├─ Generate JWT token
   └─ Return: { token, user }

JWT Token → Stored in localStorage
On each request → Authorization: Bearer {token}
Verified by middleware → requireAuth()
```

### 4.2 Banking Data Flow
```
GET /api/bank/accounts
└─ Fetch all accounts for userId
   ├─ Query: db.accounts.find({ userId })
   └─ Return: [{ accountNumber (masked), balance, type, ... }]

GET /api/bank/transactions/:accountId
└─ Fetch transaction history
   ├─ Query: db.transactions.find({ accountId })
   ├─ Sort by timestamp DESC
   └─ Return: [{ amount, type, description, timestamp, ... }]
```

### 4.3 Document Ingestion Flow
```
Admin uploads PDF/TXT
         │
         ▼
POST /api/admin/docs/upload
├─ Multer: Save file to disk
├─ Process file (pdf-parse)
├─ Split into chunks (chunker.js)
├─ Generate embeddings (embedder.js)
├─ Store in ChromaDB
├─ Index in MongoDB (documents collection)
└─ Return: { docId, chunks, status }
```

---

## 5. Data Security & Privacy Measures

```
┌──────────────────────────────────────────────────────────────┐
│              SECURITY LAYERS                                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ 1. TRANSPORT LAYER                                           │
│    └─ HTTPS/TLS (in production)                              │
│    └─ Secure cookies (HttpOnly, Secure flags)                │
│                                                              │
│ 2. AUTHENTICATION & AUTHORIZATION                            │
│    └─ JWT tokens (signed with secret)                        │
│    └─ Role-based access control (RBAC)                       │
│    └─ Middleware: requireAuth, roleCheck                     │
│                                                              │
│ 3. INPUT VALIDATION & SANITIZATION                           │
│    └─ PII pattern detection (regex)                          │
│    └─ Prompt injection prevention                            │
│    └─ XSS protection (escape HTML)                           │
│    └─ SQL injection prevention (Mongoose ORM)                │
│                                                              │
│ 4. DATA MASKING                                              │
│    └─ Account numbers: XXXXXXXXXXXX1234                       │
│    └─ Phone numbers: +91-XXXX-XXX45                          │
│    └─ Passwords: Never stored in plain text                  │
│    └─ PII in responses: Automatically masked                 │
│                                                              │
│ 5. AUDIT LOGGING                                             │
│    └─ User actions: login, logout, chat, queries             │
│    └─ AI operations: prompt, response, confidence            │
│    └─ Security events: failed auth, blocked queries          │
│    └─ Immutable append-only logs                             │
│                                                              │
│ 6. RATE LIMITING                                             │
│    └─ 20 chat requests per 15 minutes (per user)             │
│    └─ 100 auth attempts per hour (per IP)                    │
│    └─ DDoS protection                                        │
│                                                              │
│ 7. POLICY ENFORCEMENT                                        │
│    └─ Safety gates block sensitive topics                     │
│    └─ AI response monitoring                                 │
│    └─ Human escalation for flagged queries                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 6. Database Indexes for Performance

```
// USERS Collection
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ createdAt: -1 })

// ACCOUNTS Collection
db.accounts.createIndex({ userId: 1 })
db.accounts.createIndex({ accountNumber: 1 }, { unique: true })
db.accounts.createIndex({ status: 1 })

// TRANSACTIONS Collection
db.transactions.createIndex({ accountId: 1, timestamp: -1 })
db.transactions.createIndex({ timestamp: -1 })
db.transactions.createIndex({ type: 1 })

// CHAT_MESSAGES Collection
db.chat_messages.createIndex({ userId: 1, timestamp: -1 })
db.chat_messages.createIndex({ sessionId: 1 })
db.chat_messages.createIndex({ createdAt: -1 })
```

---

## 7. Deployment Architecture (Production)

```
┌─────────────────────────────────────────────────────────────┐
│           KUBERNETES CLUSTER (Production)                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Ingress (Nginx)                                      │  │
│  │ - SSL/TLS Termination                                │  │
│  │ - Load Balancing                                     │  │
│  │ - Rate Limiting                                      │  │
│  └───────────────┬──────────────────────────────────────┘  │
│                  │                                          │
│  ┌───────────────┴────────────────────────────────────────┐ │
│  │ Express Server Pods (Horizontal Pod Autoscaler)       │ │
│  │ - Min: 3 replicas                                     │ │
│  │ - Max: 10 replicas                                    │ │
│  │ - Trigger: CPU > 70%                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                  │                                          │
│  ┌───────────────┼──────────────────────────────────────┐  │
│  │               ▼                                       │  │
│  │  MongoDB StatefulSet               Ollama DaemonSet  │  │
│  │  - 3-node replica set              - GPU nodes       │  │
│  │  - Persistent volumes              - Model cache     │  │
│  │  - Backup: daily snapshots         - Scaling: manual │  │
│  │                                                       │  │
│  │  ChromaDB StatefulSet                               │  │
│  │  - Vector persistence                               │  │
│  │  - PVC: 50GB+ for embeddings                         │  │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Summary

This architecture ensures:
- ✅ **Security**: Multi-layer protection with PII masking and audit trails
- ✅ **Scalability**: Stateless services with HPA, modular design
- ✅ **Privacy**: On-premise LLM, no external API calls
- ✅ **Compliance**: Audit logging, policy enforcement, masking
- ✅ **Performance**: Indexed searches, caching, GPU acceleration
- ✅ **Reliability**: Error handling, fallback mechanisms, monitoring

