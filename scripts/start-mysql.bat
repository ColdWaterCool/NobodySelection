@echo off
setlocal
set MYSQL_BASE=C:\Program Files\MySQL\MySQL Server 8.4
set MYSQL_INI=C:\ProgramData\MySQL\MySQL Server 8.4\my.ini

tasklist /FI "IMAGENAME eq mysqld.exe" 2>nul | find /I "mysqld.exe" >nul
if %errorlevel%==0 (
  echo MySQL is already running.
  exit /b 0
)

echo Starting MySQL Server 8.4...
start "" /B "%MYSQL_BASE%\bin\mysqld.exe" --defaults-file="%MYSQL_INI%"
timeout /t 3 /nobreak >nul
echo MySQL started. Data directory: C:\ProgramData\MySQL\MySQL Server 8.4\Data
