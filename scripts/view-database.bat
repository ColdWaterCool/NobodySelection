@echo off
setlocal EnableExtensions

call "%~dp0start-mysql.bat"

set "MYSQL=C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe"
set "DB=nobody_selection"
set "PW=AaronSelection@2026"

echo.
echo ===== NobodySelection database =====
echo.

"%MYSQL%" -u root -p%PW% --protocol=TCP -h 127.0.0.1 -P 3306 %DB% -e "SELECT id,phone,role,nickname,status FROM users ORDER BY id; SELECT t.id,t.user_id,u.phone,u.nickname,t.audit_status,t.hourly_rate FROM teachers t JOIN users u ON u.id=t.user_id;"

echo.
pause
