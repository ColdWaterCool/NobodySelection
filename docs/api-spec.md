# API 概要

后端为 NestJS，接口前缀默认 `/api`。本地开发时前端 Vite 会将 `/api` 代理到后端。

主要模块：

| 模块 | 说明 |
|------|------|
| `/api/auth` | 登录、开发环境快速登录、JWT |
| `/api/users` | 用户资料 |
| `/api/teachers` | 外教档案与列表 |
| `/api/students` / `/api/parents` | 学生 / 家长相关 |
| `/api/orders` | 订单与课时 |
| `/api/admin` | 管理端能力 |

具体路由与 DTO 以 `cred-match-server/src` 下各模块为准。数据库表结构见 `database-schema.md`。
