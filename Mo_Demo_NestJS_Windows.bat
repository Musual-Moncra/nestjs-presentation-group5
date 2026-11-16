@echo off
chcp 65001 >nul
cd /d "%~dp0demo-nestjs"

echo ==================================================
echo   KHOI DONG DEMO NESTJS - NHOM 5 (WINDOWS)
echo ==================================================

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LOI] May nay chua cai Node.js!
    echo Vui long cai Node.js tai https://nodejs.org roi chay lai file nay.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo [1/2] Lan dau chay: dang cai thu vien (npm install)...
    call npm.cmd install
    if %errorlevel% neq 0 (
        echo [LOI] Cai thu vien that bai. Hay kiem tra ket noi mang!
        pause
        exit /b 1
    )
)

echo [2/2] Dang mo server NestJS tai http://localhost:3000 ...
echo (Sau vai giay trinh duyet se tu mo. KHONG TAT CUA SO DEN NAY!)
start "" cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:3000"
call npm.cmd run start:dev
pause
