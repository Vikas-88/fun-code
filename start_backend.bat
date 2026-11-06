@echo off
title FUN CODE - Backend Server
echo ========================================================
echo  Launching Intelligent Code Evaluation Backend Server
echo ========================================================
cd /d "%~dp0\backend"

echo.
echo [Starting] Backend Server on http://localhost:8000 ...
echo Endpoints: /api/analyze, /api/repair, /api/comic, /api/presets
echo.
python run_backend.py
pause
