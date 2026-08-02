@echo off
chcp 65001 >nul
setlocal

call "%~dp0start-mysql.bat"

set HEIDI=%LOCALAPPDATA%\Programs\HeidiSQL\heidisql.exe
if not exist "%HEIDI%" (
  echo HeidiSQL 未安装。请运行: winget install HeidiSQL.HeidiSQL
  exit /b 1
)

echo.
echo ========================================
echo   HeidiSQL - CredMatch 数据库
echo ========================================
echo   主机:     127.0.0.1
echo   端口:     3306
echo   用户:     root
echo   密码:     AaronSelection@2026
echo   数据库:   cred_match
echo ========================================
echo.
echo 首次打开请在「新建会话」中填写以上信息，保存后可长期使用。
echo.

start "" "%HEIDI%"
