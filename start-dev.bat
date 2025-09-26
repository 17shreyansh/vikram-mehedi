@echo off
echo Restarting development servers...

echo Stopping any running processes...
taskkill /f /im node.exe 2>nul

echo Starting backend server...
cd backend
start "Backend Server" cmd /k "npm run dev"

echo Starting frontend server...
cd ..\frontend
start "Frontend Server" cmd /k "npm run dev"

echo Development servers started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo Admin: http://localhost:3000/admin