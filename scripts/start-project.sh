#!/bin/bash

echo "启动NobodySelection系统..."

# 启动后端服务器
echo "启动后端服务器..."
cd nobody-selection-server
npm run start:dev &
cd ..

# 等待后端服务器启动
sleep 3

# 启动前端开发服务器
echo "启动前端开发服务器..."
cd nobody-selection-web
npm run dev &
cd ..

echo "系统启动完成！"
echo "前端访问地址: http://localhost:5173"
echo "后端API地址: http://localhost:3000/api"
echo ""
echo "按Ctrl+C停止所有服务"

# 等待用户中断
wait