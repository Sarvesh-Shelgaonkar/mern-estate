@echo off
echo 🚀 Starting MERN Estate Application...
echo.

echo 📦 Installing dependencies...
call npm install
cd client
call npm install
cd ..

echo.
echo 🌟 Starting the application...
echo 📍 Backend will run on: http://localhost:3000
echo 📍 Frontend will run on: http://localhost:5173
echo.

echo Opening two terminals...
start cmd /k "echo 🔧 Backend Server && npm run dev"
timeout /t 3 /nobreak > nul
start cmd /k "echo 🎨 Frontend Server && cd client && npm run dev"

echo.
echo ✅ Both servers are starting!
echo 🌐 Your beautiful MERN Estate app will be available at http://localhost:5173
echo.
pause