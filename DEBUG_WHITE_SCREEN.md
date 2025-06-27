# 🚨 White Screen Debug Guide

## Step 1: Check Browser Console
1. Open your browser (Chrome/Firefox)
2. Go to http://localhost:5173
3. Press F12 or Right-click → Inspect
4. Go to "Console" tab
5. Look for RED error messages
6. Take screenshot and share the errors

## Step 2: Check Terminal Output
Look at your frontend terminal for errors like:
- Module not found
- Syntax errors
- Import/export errors
- Missing dependencies

## Step 3: Common Fixes

### Fix 1: Clear Cache
```bash
cd client
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

### Fix 2: Check Vite Config
Make sure client/vite.config.js exists and is correct

### Fix 3: Check Main Files
- client/index.html should exist
- client/src/main.jsx should exist
- client/src/App.jsx should exist

### Fix 4: Check Dependencies
```bash
cd client
npm list react react-dom
```

## Step 4: Emergency Reset
If nothing works, let's reset the frontend:
```bash
cd client
npm install react@latest react-dom@latest
npm install @vitejs/plugin-react-swc@latest
npm run dev
```