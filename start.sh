#!/bin/bash

echo "🚀 Starting MERN Estate Application..."
echo ""

echo "📦 Installing dependencies..."
npm install
cd client
npm install
cd ..

echo ""
echo "🌟 Starting the application..."
echo "📍 Backend will run on: http://localhost:3000"
echo "📍 Frontend will run on: http://localhost:5173"
echo ""

echo "🔧 Starting Backend Server..."
npm run dev &

echo "⏳ Waiting 3 seconds for backend to start..."
sleep 3

echo "🎨 Starting Frontend Server..."
cd client
npm run dev &

echo ""
echo "✅ Both servers are starting!"
echo "🌐 Your beautiful MERN Estate app will be available at http://localhost:5173"
echo ""

wait