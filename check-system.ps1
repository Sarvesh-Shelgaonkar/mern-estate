Write-Host "🔍 MERN Estate - System Check" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📋 Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Node.js is NOT installed" -ForegroundColor Red
        Write-Host "📥 Please download from: https://nodejs.org/" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Node.js is NOT installed" -ForegroundColor Red
    Write-Host "📥 Please download from: https://nodejs.org/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "✅ npm is installed: $npmVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ npm is NOT installed" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ npm is NOT installed" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 Checking project files..." -ForegroundColor Yellow

if (Test-Path "package.json") {
    Write-Host "✅ Backend package.json found" -ForegroundColor Green
} else {
    Write-Host "❌ Backend package.json missing" -ForegroundColor Red
}

if (Test-Path "client\package.json") {
    Write-Host "✅ Frontend package.json found" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend package.json missing" -ForegroundColor Red
}

if (Test-Path ".env") {
    Write-Host "✅ Environment file found" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env file missing - you need to create this" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Checking dependencies..." -ForegroundColor Yellow

if (Test-Path "node_modules") {
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Backend dependencies missing - run: npm install" -ForegroundColor Red
}

if (Test-Path "client\node_modules") {
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend dependencies missing - run: cd client && npm install" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Install Node.js if missing: https://nodejs.org/" -ForegroundColor White
Write-Host "2. Create .env file with MongoDB connection" -ForegroundColor White
Write-Host "3. Run: npm install" -ForegroundColor White
Write-Host "4. Run: cd client && npm install" -ForegroundColor White
Write-Host "5. Start backend: npm run dev" -ForegroundColor White
Write-Host "6. Start frontend: cd client && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌟 Your beautiful MERN Estate app will be ready! 🏠✨" -ForegroundColor Green