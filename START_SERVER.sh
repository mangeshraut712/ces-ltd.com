#!/bin/bash

# CES Ltd. Prototype - Server Startup Script
# This script ensures a clean start of the server

echo "🚀 Starting CES Ltd. Prototype Server..."
echo ""

# Kill any existing processes on port 3000
echo "🔍 Checking for processes on port 3000..."
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️  Found existing process on port 3000. Killing it..."
    lsof -ti:3000 | xargs kill -9
    sleep 2
    echo "✅ Port 3000 cleared"
else
    echo "✅ Port 3000 is available"
fi

echo ""
echo "📦 Project: ces-ltd-prototype"
echo "📂 Location: $(pwd)"
echo ""

# Start the server
echo "🌐 Starting production server on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================================================"
echo ""

npm run start
