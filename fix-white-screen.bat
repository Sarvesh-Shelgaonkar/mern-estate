@echo off
echo 🔧 MERN Estate - White Screen Fix
echo ================================
echo.

echo 📋 Step 1: Backup original files...
cd client\src
copy main.jsx main-original.jsx
copy App.jsx App-original.jsx

echo 📋 Step 2: Using debug versions...
copy main-debug.jsx main.jsx
copy App-debug.jsx App.jsx

echo 📋 Step 3: Restarting frontend...
cd ..
echo.
echo 🚀 Now run: npm run dev
echo 📱 Then open: http://localhost:5173
echo.
echo 🎯 You should see a debug page with colored text
echo 📞 If you still see white screen, check browser console (F12)
echo.
echo 🔄 To restore original files later:
echo    cd client\src
echo    copy main-original.jsx main.jsx
echo    copy App-original.jsx App.jsx
echo.
pause