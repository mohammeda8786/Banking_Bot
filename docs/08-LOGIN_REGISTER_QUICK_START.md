# Login & Register - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start Backend
```bash
cd server
npm run dev
```
Runs on http://localhost:5000

### Step 2: Start Frontend
```bash
cd client
npm run dev
```
Runs on http://localhost:5173

### Step 3: Open Browser
Visit: **http://localhost:5173**

---

## 📱 User Interface Overview

### Home / Intro Page
```
┌─────────────────────────────────────────┐
│  🔐 Sign In    ✍️ Register   [Top Right] │
├─────────────────────────────────────────┤
│                                         │
│       AI Banking Bot                    │
│  Your intelligent banking assistant     │
│                                         │
│  [🤖] [🔐] [💳]  [⚡] [📊] [🛡️]         │
│   Features Grid (6 cards)               │
│                                         │
│  [💬 Try AI Chat]  [🔐 Sign In]         │
│         CTA Buttons                     │
│                                         │
│  How It Works                           │
│  1️⃣  2️⃣  3️⃣  (3 step process)           │
│                                         │
└─────────────────────────────────────────┘
```

### Login Page
```
┌─────────────────────────────────────┐
│                                     │
│       Welcome Back                  │
│  Sign in to your banking account    │
│                                     │
│  Email: [demo@mail.com...........]  │
│  Password: [••••••••..............]  │
│                                     │
│         [ SIGN IN ]                 │
│                                     │
│  Don't have account? Create one     │
│                                     │
│  Demo: demo.user1@mail.com / Demo@123
│                                     │
└─────────────────────────────────────┘
```

### Register Page
```
┌─────────────────────────────────────┐
│                                     │
│       Create Account                │
│    Join AI Banking Bot today        │
│                                     │
│  Full Name: [........................] │
│  Email: [............................] │
│  Password: [.........................] │
│  Confirm: [..........................] │
│                                     │
│    [ CREATE ACCOUNT ]               │
│                                     │
│  Already have account? Sign In      │
│                                     │
│  By registering, you agree to...    │
│                                     │
└─────────────────────────────────────┘
```

---

## 🧪 Test the System

### Using Demo Account
1. Click **🔐 Sign In** (top-right)
2. Email: `demo.user1@mail.com`
3. Password: `Demo@123`
4. Click "Sign In"
5. ✅ Redirected to chat dashboard

### Create New Account
1. Click **✍️ Register** (top-right)
2. Fill all fields:
   - Name: Your name
   - Email: unique@email.com
   - Password: min 6 chars
   - Confirm: same password
3. Click "Create Account"
4. ✅ Auto-logged in, redirected to dashboard

### Try Chat (No Login Required)
1. Click **💬 Try AI Chat Now**
2. Asks questions about banking
3. Modal opens with chatbot
4. No authentication needed for demo

---

## 🔗 URL Routes

| URL | Page | Requires Auth |
|-----|------|---------------|
| `/` | Home | ❌ No |
| `/login` | Login | ❌ No |
| `/register` | Register | ❌ No |
| `/chat` | Chat Dashboard | ✅ Yes* |
| `/dashboard` | Chat Dashboard (alias) | ✅ Yes* |
| `/admin` | Admin Upload | ✅ Yes (admin role) |

*Can demo without auth in modal

---

## 🎨 Features

### Home Page
- ✅ Beautiful hero section
- ✅ 6 feature cards describing benefits
- ✅ Call-to-action buttons (chat + sign in)
- ✅ "How it works" section
- ✅ Auth icon buttons (top-right, sticky)
- ✅ Responsive gradient background

### Login Page
- ✅ Email & password inputs
- ✅ Demo credentials pre-filled
- ✅ Loading state during submission
- ✅ Error message display
- ✅ Link to register page
- ✅ Professional gradient background

### Register Page
- ✅ Full name, email, password fields
- ✅ Password confirmation validation
- ✅ Form validation before submit
- ✅ Strong password requirement (6+ chars)
- ✅ Email format validation
- ✅ Auto-login after successful registration
- ✅ Link to login page

---

## 🔐 Authentication Flow

```
1. User clicks Register/Login button
   ↓
2. Fills form with credentials
   ↓
3. Frontend validates form
   ↓
4. Sends HTTP POST to backend
   POST /api/auth/register OR /api/auth/login
   ↓
5. Backend validates & queries MongoDB
   ↓
6. Generates JWT token
   ↓
7. Returns token + user object
   ↓
8. Frontend stores token in localStorage
   ↓
9. Updates AuthContext with user info
   ↓
10. Redirects to /dashboard
   ↓
11. All subsequent requests include token
   in Authorization: Bearer <token> header
```

---

## 💾 Database Connection

### MongoDB Collections
```
ai-banking-bot
└── users
    ├── _id (ObjectId)
    ├── name (String)
    ├── email (String, unique)
    ├── password (String, hashed)
    ├── role (String: "customer" or "admin")
    ├── createdAt (Date)
    └── updatedAt (Date)
```

### API Communication
```
Frontend (React)
     ↓
HTTP Client (axios)
     ↓
Express Server (5000)
     ↓
MongoDB
```

---

## 🛡️ Security

- ✅ Passwords hashed with bcryptjs (10 rounds)
- ✅ JWT tokens signed with secret
- ✅ Tokens auto-inject in API headers
- ✅ 401 errors auto-redirect to login
- ✅ Form validation (client + server)
- ✅ All auth events logged to MongoDB
- ✅ Email uniqueness enforced

---

## 🐛 Troubleshooting

### Problem: Login fails
**Solution**: 
- Ensure MongoDB is running: `mongod`
- Check backend is running: `npm run dev` (server/)
- Verify email exists in database

### Problem: Can't create account
**Solution**:
- Email already registered? Use different email
- Log in with existing account
- Delete user from DB if testing

### Problem: Token expired
**Solution**:
- Auto-redirects to login
- Clear localStorage if stuck: `localStorage.clear()`
- Refresh page and log in again

### Problem: CORS errors
**Solution**:
- Backend CORS enabled in index.js
- Check VITE_API_BASE_URL in client/.env
- Should be: `http://localhost:5000`

### Problem: Buttons don't work
**Solution**:
- Check browser console for errors
- Ensure APIs are accessible: `curl http://localhost:5000`
- Check network tab in DevTools

---

## 📝 Demo Accounts

### Pre-seeded Account
```
Email: demo.user1@mail.com
Password: Demo@123
```

Or create your own:
1. Click Register
2. Fill form
3. Submit
4. Auto-logged in!

---

## 🎯 Next Features

1. **Profile Page**
   - View/edit user info
   - Change password
   - Account settings

2. **Password Reset**
   - Forgot password flow
   - Email verification
   - New password confirmation

3. **Email Verification**
   - Confirmation on registration
   - Resend email link

4. **Social Login**
   - Google OAuth
   - GitHub account linking

---

## 📂 File Locations

```
client/src/
├── pages/
│   ├── Home.jsx              ← Intro with auth icons
│   ├── Login.jsx             ← Login form
│   ├── Register.jsx          ← Register form
│   └── Chat.jsx              ← Dashboard (after login)
├── auth/
│   └── AuthContext.jsx       ← Auth state management
├── api/
│   └── http.jsx              ← API client with JWT
├── styles/
│   ├── Home.css              ← Home page styles
│   └── AuthPages.css         ← Login/Register styles
└── App.jsx                   ← Route configuration
```

---

## ✅ Checklist

After setup, verify:
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB running and accessible
- [ ] Can see home page with auth icons
- [ ] Can click "Sign In" button
- [ ] Can login with demo account
- [ ] Can register new account
- [ ] Token stored in localStorage
- [ ] Chat dashboard loads after auth
- [ ] Can chat with AI without login
- [ ] No errors in browser console
- [ ] No errors in terminal

---

## 🚀 Deployment

### Before production:
- [ ] Change JWT_SECRET (strong, random 32+ bytes)
- [ ] Enable HTTPS/TLS
- [ ] Configure proper CORS origins
- [ ] MongoDB authentication enabled
- [ ] Backup strategy in place
- [ ] Error monitoring setup (Sentry)
- [ ] Rate limiting on auth endpoints
- [ ] Email verification implementation

---

## 📞 Support

**Files to review:**
- [07-LOGIN_REGISTER_IMPLEMENTATION.md](07-LOGIN_REGISTER_IMPLEMENTATION.md) - Full documentation
- [02-AI_MODEL_SETUP_CONNECTIVITY.md](02-AI_MODEL_SETUP_CONNECTIVITY.md) - Backend setup
- [05-GIT_ENV_SETUP.md](05-GIT_ENV_SETUP.md) - Environment variables

**Commands:**
- Start backend: `cd server && npm run dev`
- Start frontend: `cd client && npm run dev`
- Test connectivity: `cd server && npm run test:ai`
- Seed database: `cd server && npm run seed`

---

**Status**: ✅ Ready to use!

**Version**: 1.0.0

**Last Updated**: February 14, 2026

