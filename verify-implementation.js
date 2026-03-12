#!/usr/bin/env node

/**
 * 🏦 AI BANKING BOT - IMPLEMENTATION VERIFICATION CHECKLIST
 * 
 * This script verifies that all files and components have been created
 * and are in the correct locations.
 * 
 * Run with: node verify-implementation.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI Colors
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  const exists = fs.existsSync(fullPath);
  const status = exists ? '✅' : '❌';
  const color = exists ? 'green' : 'red';
  
  log(`${status} ${description}`, color);
  
  if (exists) {
    try {
      const stats = fs.statSync(fullPath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      log(`   └─ ${sizeKB} KB`, 'cyan');
    } catch (e) {
      // Ignore
    }
  }
  
  return exists;
}

function checkDirectory(dirPath, description) {
  const fullPath = path.join(__dirname, dirPath);
  const exists = fs.existsSync(fullPath);
  const isDir = exists && fs.statSync(fullPath).isDirectory();
  const status = isDir ? '✅' : '❌';
  const color = isDir ? 'green' : 'red';
  
  log(`${status} ${description}`, color);
  
  return isDir;
}

function checkFileContent(filePath, searchString, description) {
  try {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) return false;
    
    const content = fs.readFileSync(fullPath, 'utf8');
    const found = content.includes(searchString);
    const status = found ? '✅' : '❌';
    const color = found ? 'green' : 'red';
    
    log(`   ${status} ${description}`, color);
    
    return found;
  } catch (e) {
    log(`   ❌ ${description} (Error: ${e.message})`, 'red');
    return false;
  }
}

// ============================================================================
// MAIN VERIFICATION
// ============================================================================

log('\n╔════════════════════════════════════════════════════════════════╗', 'blue');
log('║  🏦 AI BANKING BOT - IMPLEMENTATION VERIFICATION CHECKLIST      ║', 'blue');
log('╚════════════════════════════════════════════════════════════════╝\n', 'blue');

let totalChecks = 0;
let passedChecks = 0;

// Frontend Pages
log('📄 FRONTEND PAGES', 'yellow');
log('─'.repeat(60), 'yellow');
[
  ['client/src/pages/Home.jsx', 'Home Page (Landing with auth icons)'],
  ['client/src/pages/Login.jsx', 'Login Page (Professional form)'],
  ['client/src/pages/Register.jsx', 'Register Page (Full signup)'],
].forEach(([file, desc]) => {
  totalChecks++;
  if (checkFile(file, desc)) passedChecks++;
});

// Frontend Styles
log('\n🎨 FRONTEND STYLES', 'yellow');
log('─'.repeat(60), 'yellow');
[
  ['client/src/styles/Home.css', 'Home Page Styling (600+ lines)'],
  ['client/src/styles/AuthPages.css', 'Auth Forms Styling (400+ lines)'],
].forEach(([file, desc]) => {
  totalChecks++;
  if (checkFile(file, desc)) passedChecks++;
});

// Frontend Logic
log('\n⚙️ FRONTEND LOGIC & CONFIG', 'yellow');
log('─'.repeat(60), 'yellow');
[
  ['client/src/auth/AuthContext.jsx', 'Authentication Context (120+ lines)'],
  ['client/src/api/http.jsx', 'HTTP Client Config (30+ lines)'],
  ['client/src/App.jsx', 'App Routing'],
].forEach(([file, desc]) => {
  totalChecks++;
  if (checkFile(file, desc)) passedChecks++;
});

// Backend Routes
log('\n🔌 BACKEND ROUTES', 'yellow');
log('─'.repeat(60), 'yellow');
[
  ['server/routes/auth.routes.js', 'Authentication Endpoints'],
].forEach(([file, desc]) => {
  totalChecks++;
  if (checkFile(file, desc)) passedChecks++;
});

// Backend Models
log('\n🗄️ BACKEND MODELS', 'yellow');
log('─'.repeat(60), 'yellow');
[
  ['server/models/User.js', 'User Model (MongoDB Schema)'],
].forEach(([file, desc]) => {
  totalChecks++;
  if (checkFile(file, desc)) passedChecks++;
});

// Documentation
log('\n📚 DOCUMENTATION', 'yellow');
log('─'.repeat(60), 'yellow');
[
  ['docs/00-VISUAL_COMPONENT_MAP.txt', 'Visual Component Map (ASCII)'],
  ['docs/01-LITERATURE_REPO_ANALYSIS.md', 'Literature & Repository Analysis'],
  ['docs/02-AI_MODEL_SETUP_CONNECTIVITY.md', 'AI Model Setup & Connectivity'],
  ['docs/03-ARCHITECTURE_DB_SCHEMA.md', 'Architecture & Database Schema'],
  ['docs/04-UI_UX_WIREFRAMES.md', 'UI/UX Wireframes'],
  ['docs/05-GIT_ENV_SETUP.md', 'Git & Environment Setup'],
  ['docs/06-QUICK_REFERENCE.md', 'Quick Reference Guide'],
  ['docs/07-LOGIN_REGISTER_IMPLEMENTATION.md', 'Login/Register Implementation Guide'],
  ['docs/08-LOGIN_REGISTER_QUICK_START.md', 'Quick Start Guide'],
  ['docs/09-FILE_STRUCTURE_REFERENCE.md', 'File Structure Reference'],
].forEach(([file, desc]) => {
  totalChecks++;
  if (checkFile(file, desc)) passedChecks++;
});

// Root Documentation
log('\n📋 ROOT DOCUMENTATION', 'yellow');
log('─'.repeat(60), 'yellow');
[
  ['GETTING_STARTED.md', 'Getting Started Guide'],
  ['README-DOCUMENTATION-INDEX.md', 'Documentation Index'],
].forEach(([file, desc]) => {
  totalChecks++;
  if (checkFile(file, desc)) passedChecks++;
});

// Verify Key Content
log('\n🔍 CONTENT VERIFICATION', 'yellow');
log('─'.repeat(60), 'yellow');

const contentChecks = [
  ['client/src/pages/Home.jsx', 'auth-icon', 'Home page has auth icons'],
  ['client/src/pages/Home.jsx', 'navigate("/login")', 'Home page navigates to login'],
  ['client/src/pages/Login.jsx', 'handleSubmit', 'Login page has form handling'],
  ['client/src/pages/Register.jsx', 'validateForm', 'Register page has validation'],
  ['client/src/auth/AuthContext.jsx', 'login', 'AuthContext has login method'],
  ['client/src/auth/AuthContext.jsx', 'register', 'AuthContext has register method'],
  ['client/src/api/http.jsx', 'Authorization', 'HTTP client injects auth header'],
  ['server/routes/auth.routes.js', '/api/auth/login', 'Backend has login endpoint'],
  ['server/routes/auth.routes.js', '/api/auth/register', 'Backend has register endpoint'],
];

contentChecks.forEach(([file, search, desc]) => {
  totalChecks++;
  if (checkFileContent(file, search, desc)) passedChecks++;
});

// Directories
log('\n📁 DIRECTORY STRUCTURE', 'yellow');
log('─'.repeat(60), 'yellow');
[
  ['client/src/pages', 'Pages Directory'],
  ['client/src/styles', 'Styles Directory'],
  ['client/src/auth', 'Auth Directory'],
  ['client/src/api', 'API Directory'],
  ['server/routes', 'Routes Directory'],
  ['server/models', 'Models Directory'],
  ['server/middleware', 'Middleware Directory'],
  ['docs', 'Documentation Directory'],
].forEach(([dir, desc]) => {
  totalChecks++;
  if (checkDirectory(dir, desc)) passedChecks++;
});

// ============================================================================
// SUMMARY
// ============================================================================

log('\n╔════════════════════════════════════════════════════════════════╗', 'blue');
log('║                       VERIFICATION SUMMARY                      ║', 'blue');
log('╚════════════════════════════════════════════════════════════════╝\n', 'blue');

const percentage = Math.round((passedChecks / totalChecks) * 100);
const statusColor = percentage === 100 ? 'green' : percentage >= 80 ? 'yellow' : 'red';

log(`Checks Passed: ${passedChecks}/${totalChecks}`, 'cyan');
log(`Completion: ${percentage}%`, statusColor);

if (percentage === 100) {
  log('\n✅ ALL CHECKS PASSED!', 'green');
  log('Your AI Banking Bot authentication system is ready to use!', 'green');
} else if (percentage >= 80) {
  log(`\n⚠️  ${totalChecks - passedChecks} checks failed`, 'yellow');
  log('Please review the files marked with ❌ above', 'yellow');
} else {
  log(`\n❌ ${totalChecks - passedChecks} checks failed`, 'red');
  log('Please review the missing files marked with ❌ above', 'red');
}

// ============================================================================
// NEXT STEPS
// ============================================================================

log('\n📌 NEXT STEPS', 'blue');
log('─'.repeat(60), 'blue');

if (percentage === 100) {
  log('1. Read GETTING_STARTED.md for quick start instructions', 'cyan');
  log('2. Review docs/08-LOGIN_REGISTER_QUICK_START.md', 'cyan');
  log('3. Configure .env files in client/ and server/', 'cyan');
  log('4. Run: npm run dev (in both server/ and client/)', 'cyan');
  log('5. Visit: http://localhost:5173', 'cyan');
  log('6. Login with: demo.user1@mail.com / Demo@123', 'cyan');
} else {
  log('1. Review all files marked with ❌', 'cyan');
  log('2. Create missing files or fix existing ones', 'cyan');
  log('3. Run this verification script again', 'cyan');
}

log('\n📚 DOCUMENTATION', 'blue');
log('─'.repeat(60), 'blue');
log('Main Index: README-DOCUMENTATION-INDEX.md', 'cyan');
log('Quick Start: docs/08-LOGIN_REGISTER_QUICK_START.md', 'cyan');
log('File Locations: docs/09-FILE_STRUCTURE_REFERENCE.md', 'cyan');
log('Visual Maps: docs/00-VISUAL_COMPONENT_MAP.txt', 'cyan');

log('\n✨ Implementation verification complete!\n', 'cyan');

// Exit with appropriate code
process.exit(percentage === 100 ? 0 : 1);
