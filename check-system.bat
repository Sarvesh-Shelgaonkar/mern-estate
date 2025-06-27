@echo off
echo 🔍 MERN Estate - System Check
echo ================================
echo.

echo 📋 Checking Node.js...
node --version 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is NOT installed
    echo 📥 Please download from: https://nodejs.org/
    echo.
) else (
    echo ✅ Node.js is installed
)

echo.
echo 📋 Checking npm...
npm --version 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is NOT installed
) else (
    echo ✅ npm is installed
)

echo.
echo 📋 Checking project files...
if exist package.json (
    echo ✅ Backend package.json found
) else (
    echo ❌ Backend package.json missing
)

if exist client\package.json (
    echo ✅ Frontend package.json found
) else (
    echo ❌ Frontend package.json missing
)

if exist .env (
    echo ✅ Environment file found
) else (
    echo ⚠️  .env file missing - you need to create this
)

echo.
echo 📋 Checking dependencies...
if exist node_modules (
    echo ✅ Backend dependencies installed
) else (
    echo ❌ Backend dependencies missing - run: npm install
)

if exist client\node_modules (
    echo ✅ Frontend dependencies installed
) else (
    echo ❌ Frontend dependencies missing - run: cd client && npm install
)

echo.
echo 🎯 Next Steps:
echo 1. Install Node.js if missing: https://nodejs.org/
echo 2. Create .env file with MongoDB connection
echo 3. Run: npm install
echo 4. Run: cd client && npm install
echo 5. Start backend: npm run dev
echo 6. Start frontend: cd client && npm run dev
echo.
pause