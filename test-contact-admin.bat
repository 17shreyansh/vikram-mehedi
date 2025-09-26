@echo off
echo Testing Admin Pages Home functionality...

echo.
echo 1. Starting development servers...
cd backend
start "Backend" cmd /k "npm run dev"
timeout /t 3

cd ..\frontend  
start "Frontend" cmd /k "npm run dev"
timeout /t 5

echo.
echo 2. Opening test URLs...
start http://localhost:3000/admin/login
timeout /t 2
start http://localhost:3000/admin/pages/home
timeout /t 2
start http://localhost:3000

echo.
echo Test URLs opened:
echo - Admin Login: http://localhost:3000/admin/login
echo - Home Editor: http://localhost:3000/admin/pages/home  
echo - Homepage: http://localhost:3000
echo.
echo Instructions:
echo 1. Login to admin panel
echo 2. Go to Home Editor
echo 3. Edit Contact Section Settings
echo 4. Update phone, email, address, social links
echo 5. Save changes
echo 6. Check homepage for updated contact info
echo.
pause