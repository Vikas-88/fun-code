@echo off
echo ========================================================
echo  Launching FUN CODE Full Platform (Backend + Frontend)
echo ========================================================

start "FUN CODE - Backend (Port 8000)" cmd /k "cd /d %~dp0\backend && python run_backend.py"
timeout /t 2 >nul
start "FUN CODE - Frontend (Port 3000)" cmd /k "cd /d %~dp0\frontend && npm run dev"

echo.
echo Both servers are launching in separate windows!
echo - Backend:  http://localhost:8000
echo - Frontend: http://localhost:3000
echo.
pause

