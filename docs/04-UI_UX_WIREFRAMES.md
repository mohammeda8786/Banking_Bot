# UI/UX Wireframes & Design Specifications

## Overview
This document contains detailed wireframes for the AI Banking Bot application, showing:
1. **Main Chat Interface** - AI interaction with loading and processing states
2. **Authentication Screens** - Login and registration
3. **Dashboard** - Account overview and transactions
4. **Account Details** - Individual account view
5. **Loading & Processing States** - Visual feedback for AI operations
6. **Error & Success States** - User notifications

All designs are mobile-first responsive and follow modern banking UI/UX conventions.

---

## 1. Main Chat Interface (Core AI Feature)

### 1.1 Chat Idle State (Ready for input)

```
┌─────────────────────────────────────────────────────────┐
│ AI Banking Bot                    ☰  Profile   Logout   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Conversation History (Scrollable)                     │
│  ┌─────────────────────────────────────────────────┐  │
│  │                                                 │  │
│  │  10:30 AM                                       │  │
│  │  ╔═════════════════════════╗                    │  │
│  │  ║ How do I open an        ║  User Message      │  │
│  │  ║ account with ICICI?     ║  (Right-aligned,   │  │
│  │  ╚═════════════════════════╝  Blue background)  │  │
│  │                                                 │  │
│  │  10:31 AM                                       │  │
│  │  ┌─────────────────────────┐                    │  │
│  │  │ You can open a savings   │  AI Response       │  │
│  │  │ account by visiting      │  (Left-aligned,    │  │
│  │  │ ICICI's website or       │  Gray background)  │  │
│  │  │ visiting a branch...     │                    │  │
│  │  └─────────────────────────┘                    │  │
│  │                                                 │  │
│  │                                                 │  │
│  │                                                 │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  Input Section:                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │  Type your question here...                  ▶ │  │  Send button
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  💡 Quick Tips:                                        │
│  • "How do I reset my password?"                      │
│  • "What are the account fees?"                       │
│  • "How to transfer money?"                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**UI Elements:**
- **Header**: App name + user menu (profile, logout)
- **Chat Area**: Messages in chronological order
  - User messages: Blue, right-aligned, rounded
  - AI responses: Gray, left-aligned, rounded
- **Input Bar**: Text field + Send button
- **Quick Tips**: Suggested questions (clickable)
- **Metadata**: Timestamps, message status

---

### 1.2 Chat Loading State (AI Processing)

```
┌─────────────────────────────────────────────────────────┐
│ AI Banking Bot                    ☰  Profile   Logout   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Conversation History                                 │
│  ┌─────────────────────────────────────────────────┐  │
│  │  10:32 AM                                       │  │
│  │  ╔═════════════════════════╗                    │  │
│  │  ║ How to transfer money    ║                   │  │
│  │  ║ internationally?         ║                   │  │
│  │  ╚═════════════════════════╝                    │  │
│  │                                                 │  │
│  │  Processing...                                  │  │
│  │  ┌─────────────────────────────────────────┐   │  │
│  │  │ 🔄 Analyzing your question...          │   │  │
│  │  │                                         │   │  │
│  │  │ [████░░░░░] Retrieving banking docs...  │   │  │
│  │  │ [████████░░] Generating response...     │   │  │
│  │  │                                         │   │  │
│  │  │ Est. time: 2-3 seconds                 │   │  │
│  │  └─────────────────────────────────────────┘   │  │
│  │                                                 │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  Input Section (Disabled):                             │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Type your question here... (faded, disabled)    │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  ℹ️  AI is thinking. Please wait...                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Loading Indicators:**
- **Progress Bar**: Visual indication of processing stages
- **Spinner Icon**: Animated rotation (🔄)
- **Status Text**: Real-time updates on what's happening
- **Estimated Time**: User expectation setting
- **Disabled Input**: Prevents double-submission
- **Message**: "AI is thinking. Please wait..."

---

### 1.3 Chat Error State (Fallback & Safety)

```
┌─────────────────────────────────────────────────────────┐
│ AI Banking Bot                    ☰  Profile   Logout   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Conversation History                                 │
│  ┌─────────────────────────────────────────────────┐  │
│  │  10:33 AM                                       │  │
│  │  ╔═════════════════════════╗                    │  │
│  │  ║ What is my account PIN?  ║                   │  │
│  │  ╚═════════════════════════╝                    │  │
│  │                                                 │  │
│  │  10:33 AM                                       │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │ ⚠️  I can't help with that               │  │  │
│  │  │                                          │  │  │
│  │  │ I cannot provide or discuss sensitive   │  │  │
│  │  │ information like:                        │  │  │
│  │  │ • PIN codes                             │  │  │
│  │  │ • OTP (One-Time Password)               │  │  │
│  │  │ • CVV numbers                           │  │  │
│  │  │ • Account passwords                     │  │  │
│  │  │ • Aadhaar/PAN details                   │  │  │
│  │  │                                          │  │  │
│  │  │ For account security help:              │  │  │
│  │  │ 📞 Call 1800-274-4425 (24/7)            │  │  │
│  │  │ 🏢 Visit nearest ICICI branch            │  │  │
│  │  │ 💬 Chat with support agent (escalate)   │  │  │
│  │  │                                          │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  │                                                 │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  Input Section:                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Type your question here...                  ▶ │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Safety/Error Handling:**
- **Warning Icon**: ⚠️ draws attention
- **Clear Message**: What cannot be discussed + why
- **Bullet List**: Specific sensitive topics
- **Alternatives**: Support channels (phone, branch, escalation)
- **Phone Number**: 24/7 helpline
- **Escalation Option**: "Chat with support agent" button

---

### 1.4 Chat With Context Sources (Transparency)

```
┌─────────────────────────────────────────────────────────┐
│ AI Banking Bot                    ☰  Profile   Logout   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Conversation History                                 │
│  ┌─────────────────────────────────────────────────┐  │
│  │  10:34 AM                                       │  │
│  │  ╔═════════════════════════╗                    │  │
│  │  ║ Account opening process? ║                   │  │
│  │  ╚═════════════════════════╝                    │  │
│  │                                                 │  │
│  │  10:35 AM                                       │  │
│  │  ┌─────────────────────────────────────────┐   │  │
│  │  │ Here's how to open an ICICI account:   │   │  │
│  │  │                                         │   │  │
│  │  │ 1. Visit ICICI website or app          │   │  │
│  │  │ 2. Enter mobile number & PAN           │   │  │
│  │  │ 3. Complete e-KYC verification         │   │  │
│  │  │ 4. Submit documents                    │   │  │
│  │  │ 5. Account activated in 24 hours       │   │  │
│  │  │                                        │   │  │
│  │  │ ℹ Show Sources  ✓ Confidence: 95%      │   │  │
│  │  │                                        │   │  │
│  │  └────────────────────────────────────────┘   │  │
│  │                                               │  │
│  │  [Show Sources v]                             │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │ ✓ bank_policy.txt (Match: 94%)          │  │  │
│  │  │   - ICICI Savings Account Opening...    │  │  │
│  │  │                                         │  │  │
│  │  │ ✓ FAQ.md (Match: 87%)                   │  │  │
│  │  │   - Account opening requirements...     │  │  │
│  │  │                                         │  │  │
│  │  │ ✓ procedures_kyc.txt (Match: 82%)       │   │ │
│  │  │   - KYC verification process...         │   │  │
│  │  │                                         │   │  │
│  │  └─────────────────────────────────────────┘   │  │
│  │                                                 │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Source Transparency:**
- **Confidence Score**: 0-100% for answer quality
- **Show Sources Button**: Expandable section
- **Source List**: Document names + match percentages
- **Highlights**: Most relevant documents first
- **Version**: Date of last update

---

## 2. Authentication Screens

### 2.1 Login Screen

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                     AI BANKING BOT                      │
│                  Your Smart Support                     │
│                                                         │
│                                                         │
│              ┌──────────────────────────┐              │
│              │    Login to Account       │              │
│              └──────────────────────────┘              │
│                                                         │
│              Email Address                             │
│              ┌──────────────────────────┐              │
│              │ user@example.com      ✓ │              │
│              └──────────────────────────┘              │
│                                                         │
│              Password                                  │
│              ┌──────────────────────────┐              │
│              │ ••••••••••           👁 │              │
│              └──────────────────────────┘              │
│                                                         │
│              ··· Remember me    □  Forgot Password?    │
│                                                         │
│              ┌──────────────────────────┐              │
│              │        LOGIN              │              │
│              └──────────────────────────┘              │
│                                                         │
│              Don't have account? SIGN UP                │
│                                                         │
│                                                         │
│              Secure · Encrypted · 24/7 Support         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Elements:**
- **Branding**: Logo, app name, tagline
- **Form Fields**: Email, password with validation
- **Security Features**: Show/hide password, remember me
- **Actions**: Login button, forgot password, sign up link
- **Trust Indicators**: Security badges

---

### 2.2 Registration Screen

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                  CREATE ACCOUNT                         │
│                  Join AI Banking Bot                    │
│                                                         │
│              ┌──────────────────────────┐              │
│              │  Step 1/3: Account Info  │              │
│              └──────────────────────────┘              │
│                                                         │
│              Full Name                                 │
│              ┌──────────────────────────┐              │
│              │ John Doe                  │              │
│              └──────────────────────────┘              │
│                                                         │
│              Email Address                             │
│              ┌──────────────────────────┐              │
│              │ john@example.com          │              │
│              └──────────────────────────┘              │
│                                                         │
│              Phone Number                              │
│              ┌──────────────────────────┐              │
│              │ +91 98765 43210       ✓ │              │
│              └──────────────────────────┘              │
│                                                         │
│              Password                                  │
│              ┌──────────────────────────┐              │
│              │ ••••••••••                │              │
│              └──────────────────────────┘              │
│              Password strength: ████████░░ Strong      │
│                                                         │
│              ┌──────────────────────────┐              │
│              │    NEXT                   │              │
│              └──────────────────────────┘              │
│                                                         │
│              Already have account? LOGIN                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Design Elements:**
- **Multi-step Form**: Progress indicator (Step 1/3)
- **Field Validation**: Real-time feedback (✓)
- **Password Strength**: Visual indicator
- **Terms & Conditions**: Checkbox for agreement
- **Navigation**: Next/Previous buttons

---

## 3. Dashboard Screen

```
┌─────────────────────────────────────────────────────────┐
│  AI Banking Bot                   ☰  Profile   Logout   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Welcome, John Doe!                                    │
│  Last login: Today at 10:30 AM                         │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  💳 ACCOUNTS                      [+ Add Account]  │  │
│  ├──────────────────────────────────────────────────┤  │
│  │                                                  │  │
│  │  Savings Account                        ICICI    │  │
│  │  XXXXXXXXX1234                                   │  │
│  │  ₹ 45,230.50                      Status: Active │  │
│  │                                                  │  │
│  │  Checking Account                       ICICI    │  │
│  │  XXXXXXXXX5678                                   │  │
│  │  ₹ 12,500.00                     Status: Active  │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  📊 RECENT TRANSACTIONS    [See All Transactions] │  │
│  ├──────────────────────────────────────────────────┤  │
│  │                                                  │  │
│  │  Today, 3:45 PM  |  Salary Deposit              │  │
│  │  ₹ +25,000.00    |  From: EMPLOYER CO.          │  │
│  │                                                  │  │
│  │  Yesterday, 2:10 PM | Grocery Shopping          │  │
│  │  ₹ -562.50         |  At: SUPERMARKET            │  │
│  │                                                  │  │
│  │  Feb 12, 11:30 AM  | Utility Payment            │  │
│  │  ₹ -2,450.00       | To: POWER COMPANY          │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  ⚡ QUICK ACTIONS                                │  │
│  ├──────────────────────────────────────────────────┤  │
│  │                                                  │  │
│  │  [💰 Transfer]  [🔒 Passwords]  [📞 Support]    │  │
│  │  [📑 Invoices]  [⚙️ Settings]   [❓ AI Chat]    │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Sections:**
- **Greeting**: Personalized welcome message
- **Accounts**: Card-based layout with balance
- **Transactions**: Recent activity with details
- **Quick Actions**: Shortcuts to common tasks
- **Status Indicators**: Account status badges

---

## 4. Account Details Screen

```
┌─────────────────────────────────────────────────────────┐
│  AI Banking Bot                   ☰  Profile   Logout   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ◀ Savings Account                         [⋯ Menu]     │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Account Balance                                 │  │
│  │  ₹ 45,230.50                                     │  │
│  │  Available: ₹ 45,000.00  |  On Hold: ₹ 230.50   │  │
│  │                                                  │  │
│  │  Account Number (Masked)  XXXXXXXXX1234          │  │
│  │  Account Type             Savings Account        │  │
│  │  Status                    Active                │  │
│  │  Opening Date              Jan 15, 2020          │  │
│  │  Interest Rate             3.5% p.a.             │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  TRANSACTIONS (Last 30 days)           [Filter]  │  │
│  ├─────────────────────────────────────────────────── │  │
│  │ Date            | Desc          | Credit | Debit │  │
│  ├─────────────────────────────────────────────────── │  │
│  │ Feb 14, 3:45 PM | Salary        | ₹25K   |       │  │
│  │ Feb 13, 2:10 PM | Grocery       |        | ₹562  │  │
│  │ Feb 12, 11:30 AM| Electric Bill |        | ₹2.4K │  │
│  │ Feb 11, 9:00 AM | ATM Withdraw  |        | ₹3K   │  │
│  │ Feb 10, 5:20 PM | Interest      | ₹156   |       │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  ACTIONS                                         │  │
│  ├──────────────────────────────────────────────────┤  │
│  │                                                  │  │
│  │  [💰 Transfer Money]  [🔐 Password Reset]        │  │
│  │  [📥 Download Statement]  [❓ Ask AI]            │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 5. AI Chat Loading States - Detailed Variations

### 5.1 Retrieval Stage

```
Processing...
🔄 Retrieving relevant banking documents...
[████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 10%
```

### 5.2 Generation Stage

```
Processing...
🔄 Generating response...
[██████████████░░░░░░░░░░░░░░░░░░░░] 55%
```

### 5.3 Final Stage

```
Processing...
🔄 Formatting response...
[████████████████████████████░░░░░] 90%
```

---

## 6. Mobile Responsive Design

### 6.1 Mobile Chat View

```
┌───────────────────────┐
│ AI Banking Bot    ☰   │ (Compact header)
├───────────────────────┤
│                       │
│ How open account?  ||||  (Smaller messages)
│                       │
│ You can open by... |||| (Smaller responses)
│                       │
│                       │ (Less padding)
│ [Type...]      [Send] │ (Single-line input)
│                       │
│                       │
└───────────────────────┘
```

### 6.2 Mobile Menu (Slideout)

```
┌─────────────────────┐
│  ☰ Menu            ✕ │
├─────────────────────┤
│                     │
│ 👤 Profile          │
│ 🏦 Accounts         │
│ 📊 Transactions     │
│ 💬 Chat History     │
│ ⚙️ Settings         │
│ 🔒 Security         │
│ 🆘 Support          │
│ 🚪 Logout           │
│                     │
└─────────────────────┘
```

---

## 7. Design System & Specifications

### Color Palette
```
Primary Blue:     #1E7BB7 (ICICI branding)
Light Blue:       #E8F4FF (backgrounds)
Success Green:    #4CAF50 (confirmations)
Error Red:        #F44336 (warnings)
Warning Orange:   #FF9800 (alerts)
Neutral Gray:     #757575 (text)
White:            #FFFFFF (backgrounds)
```

### Typography
```
Headers (H1):     24px, Bold, Primary Blue
Headers (H2):     18px, Semi-bold, Dark Gray
Body Text:        14px, Regular, Neutral Gray
Labels:           12px, Medium, Medium Gray
Links:            14px, Regular, Primary Blue (underlined on hover)
```

### Spacing
```
Padding:          8px, 16px, 24px units
Margins:          8px, 16px, 24px unit
Border Radius:    4px (inputs), 8px (cards), 16px (buttons)
Shadow:           0 2px 4px rgba(0,0,0,0.1)
```

### Components
```
Buttons:          48px height (touch-friendly)
Input Fields:     48px height with padding
Card Elements:    White bg, 8px radius, subtle shadow
Icons:            24px or 32px size
Avatars:          40px circular with initials
```

---

## 8. Accessibility Features

- ✅ WCAG 2.1 AA Compliance
- ✅ Keyboard Navigation (Tab, Enter, Escape)
- ✅ Screen Reader Support (ARIA labels)
- ✅ High Contrast Mode (for visually impaired)
- ✅ Loading State Announcements
- ✅ Form Error Messages (clear, actionable)
- ✅ Focus Indicators (blue outline)
- ✅ Mobile Touch Targets (48px minimum)

---

## 9. User Interaction Flows

### Chat Interaction Flow
```
User Types    → User Presses Send
    ↓
Validate Input
    ↓
Show Loading State + Disable Input
    ↓
Fetch AI Response + RAG Context
    ↓
Display Response + Sources
    ↓
Enable Input
    ↓
Save to History
```

### Error Recovery Flow
```
Error Detected
    ↓
Display Error Message (Red box, icon, text)
    ↓
Show Suggested Actions (Retry, Contact Support, Go Home)
    ↓
Log to Analytics
    ↓
User Selects Action
```

---

## 10. Animation & Micro-interactions

### Message Appearance
```
1. New message slides in from bottom
2. Fade-in effect (0.3s ease)
3. Scale-up from 0.8 to 1.0
```

### Loading Indicators
```
1. Spinner rotates continuously
2. Progress bar animates smoothly
3. Pulse effect on status text
```

### Button Feedback
```
1. Hover: Background darkens 10%
2. Active: Scale-down 0.95
3. Loading: Show spinner inside button
4. Success: Show checkmark (1s, then fade)
```

### Error Alerts
```
1. Shake animation (left-right)
2. Background color pulse
3. Red icon with drop-in animation
```

---

## 11. Wireframe-to-Figma Migration

For Figma Design System, import:
- Component Library: [components.figma.com]
- Color Styles: Primary, Secondary, Success, Error, Warning
- Text Styles: H1, H2, Body, Label
- Icons: 24x24 icon set (Material Design Icons)
- Spacing Grid: 8px base unit
- Components (Button, Input, Card, Modal, Toast)

---

## 12. Responsive Breakpoints

```
Mobile:   320px - 767px
Tablet:   768px - 1023px
Desktop:  1024px+

Layout Adjustments:
- Mobile: Single-column, full-width
- Tablet: 2-column grid, centered
- Desktop: 3-column grid, sidebar navigation
```

---

## Summary

This wireframe document provides:
✅ Visual mockups of all key screens
✅ Loading, error, and success states
✅ AI processing feedback
✅ Safety/security messaging
✅ Responsive mobile design
✅ Accessibility specifications
✅ Color, typography, spacing system
✅ Interaction patterns & animations
✅ Figma design system foundation

**Ready for:** Designer hand-off, developer implementation, user testing

