@echo off
echo 启动CredMatch系统...

:: 启动 MySQL（若未运行）
call "%~dp0start-mysql.bat"

:: 启动后端服务器
echo 启动后端服务器...
cd cred-match-server
start npm run start:dev
cd ..

:: 等待后端服务器启动
timeout /t 3 /nobreak >nul

:: 启动前端开发服务器
echo 启动前端开发服务器...
cd cred-match-web
start npm run dev
cd ..

echo 系统启动完成！
echo 前端访问地址: http://localhost:5173
echo 后端API地址: http://localhost:3000/api
echo.
echo 关闭此窗口不会停止服务，请手动关闭启动的命令行窗口
pause