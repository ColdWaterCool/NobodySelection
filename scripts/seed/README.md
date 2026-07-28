# 演示数据种子脚本

全部为虚构测试账号，可安全提交 GitHub。

## 导入前提

1. MySQL 已启动，库 `nobody_selection` 已存在  
2. 后端已至少启动过一次（`users`、`teachers` 表已创建）

## 导入命令（Windows）

```bat
"C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" -u root -p -h 127.0.0.1 nobody_selection < demo-users.sql
```

## 测试账号

| 手机号 | 角色 | 密码 |
|--------|------|------|
| 13800000001 | student | Test123456 |
| 13800000002 | parent | Test123456 |
| 13800000003 | teacher | Test123456 |
| 13800000004 | admin | Test123456 |

开发环境也可使用 `POST /api/auth/dev-login`，无需密码。
