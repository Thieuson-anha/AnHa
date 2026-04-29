@echo off
echo === Khoi dong website An Ha ===
cd /d "%~dp0website"

if not exist ".env.local" (
    copy .env.example .env.local
    echo Da tao file .env.local
)

echo Dang cai dependencies...
call npm install

echo Dang khoi dong website...
echo Mo trinh duyet tai: http://localhost:3000
start http://localhost:3000
call npm run dev
