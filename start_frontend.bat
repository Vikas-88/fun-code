@echo off
title FUN CODE - Frontend Web UI
echo ========================================================
echo  Launching FUN CODE Interactive Frontend Web UI
echo ========================================================
cd /d "%~dp0\frontend"

if not exist "node_modules\" (
    echo [Setup] Installing frontend dependencies (one-time setup)...
    call npm install --legacy-peer-deps
)

echo.
echo [Starting] Vite Dev Server...
echo The app will open at: http://localhost:3000
echo.
call npm run dev
pause
