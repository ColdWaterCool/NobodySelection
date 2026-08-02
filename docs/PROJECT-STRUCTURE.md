# CredMatch 项目结构文档

## 项目概述
CredMatch 是一个外教资格评定与匹配系统，采用前后端分离架构。

---

## 📁 前端项目 (cred-match-web)

### 核心配置文件
```
cred-match-web/
├── index.html                    # 入口HTML文件
├── package.json                  # 前端依赖配置
├── vite.config.ts                # Vite构建配置（含API代理）
├── tsconfig.json                 # TypeScript配置
└── src/
    ├── main.ts                   # Vue应用入口
    ├── App.vue                   # 根组件
    └── env.d.ts                  # 环境类型声明
```

### 目录结构详解

#### 1. 路由配置 (router/)
```
src/router/
└── index.ts                      # 路由定义和守卫
```

**路由结构：**
| 路径 | 组件 | 权限 | 说明 |
|------|------|------|------|
| `/` | home/index.vue | 公开 | 首页 |
| `/auth` | auth/index.vue | 公开(guest) | 登录页面 |
| `/teachers` | teacher/list.vue | 公开 | 教师列表 |
| `/teachers/:id` | teacher/detail.vue | 公开 | 教师详情 |
| `/student` | student/index.vue | student | 学生中心 |
| `/student/homework` | student/homework.vue | student | 作业中心 |
| `/student/homework/:id` | student/homework-detail.vue | student | 作业详情 |
| `/student/records` | student/records.vue | student | 学习记录 |
| `/parent` | parent/index.vue | parent | 家长中心 |
| `/parent/consumption` | parent/consumption.vue | parent | 课时消费 |
| `/parent/statistics` | parent/statistics.vue | parent | 学时统计 |
| `/teacher` | teacher/dashboard.vue | teacher | 教师中心 |
| `/teacher/profile` | teacher/edit-profile.vue | teacher | 编辑资料 |
| `/teacher/schedule` | teacher/schedule.vue | teacher | 排课管理 |
| `/teacher/homework` | teacher/homework.vue | teacher | 作业管理 |
| `/teacher/income` | teacher/income.vue | teacher | 收入统计 |
| `/purchase` | purchase/index.vue | auth | 购买课时 |
| `/orders` | purchase/orders.vue | auth | 我的订单 |
| `/settings` | settings/index.vue | auth | 个人设置 |
| `/admin` | admin/layout.vue | admin | 后台管理(布局) |
| `/admin/users` | admin/users.vue | admin | 用户管理 |
| `/admin/teachers` | admin/teachers.vue | admin | 教师审核 |
| `/admin/orders` | admin/orders.vue | admin | 订单管理 |
| `/admin/finance` | admin/finance.vue | admin | 财务报表 |
| `/admin/cms` | admin/cms.vue | admin | 内容管理 |
| `/admin/settings` | admin/settings.vue | admin | 系统设置 |

**路由守卫逻辑：**
- 设置页面标题
- 验证token有效性
- 需要登录的页面：无token时跳转到`/auth`
- 需要特定角色：角色不匹配跳转到首页
- 已登录用户访问`/auth`：跳转到首页

---

#### 2. 视图组件 (views/)

```
views/
├── auth/                         # 认证模块
│   ├── index.vue                 # 登录页面（含开发快速登录）
│   ├── index-new.vue             # 新版登录页面
│   └── DEV-LOGIN-GUIDE.md       # 开发登录指南
│
├── home/                         # 首页模块
│   └── index.vue                 # 首页
│
├── student/                      # 学生端模块
│   ├── index.vue                 # 学生中心首页
│   ├── homework.vue              # 作业列表
│   ├── homework-detail.vue       # 作业详情
│   └── records.vue               # 学习记录
│
├── parent/                       # 家长端模块
│   ├── index.vue                 # 家长中心首页
│   ├── consumption.vue           # 课时消费
│   └── statistics.vue            # 学时统计
│
├── teacher/                      # 教师端模块
│   ├── dashboard.vue             # 教师中心首页
│   ├── edit-profile.vue          # 编辑资料
│   ├── schedule.vue              # 排课管理
│   ├── homework.vue              # 作业管理
│   ├── income.vue                # 收入统计
│   ├── list.vue                  # 教师列表（公开）
│   └── detail.vue                # 教师详情（公开）
│
├── admin/                        # 管理后台模块
│   ├── layout.vue                # 后台布局（含侧边栏）
│   ├── dashboard.vue             # 数据看板
│   ├── users.vue                 # 用户管理
│   ├── teachers.vue              # 教师审核
│   ├── orders.vue                # 订单管理
│   ├── finance.vue               # 财务报表
│   ├── cms.vue                   # 内容管理
│   └── settings.vue              # 系统设置
│
├── purchase/                     # 购买模块
│   ├── index.vue                 # 购买课时
│   └── orders.vue                # 我的订单
│
├── settings/                     # 设置模块
│   └── index.vue                 # 个人设置
│
└── error/                        # 错误页面
    └── 404.vue                   # 404页面
```

---

#### 3. 工具函数 (utils/)

```
utils/
└── auth.ts                       # 认证相关工具函数
```

**auth.ts 提供的功能：**
| 函数名 | 功能 | 返回值 |
|--------|------|--------|
| `getToken()` | 获取token | string \| null |
| `setToken(token)` | 设置token | void |
| `removeToken()` | 删除token | void |
| `getRefreshToken()` | 获取refresh token | string \| null |
| `setRefreshToken(token)` | 设置refresh token | void |
| `getUserRole()` | 获取用户角色 | string \| null |
| `setUserRole(role)` | 设置用户角色 | void |
| `getUserInfo()` | 获取用户信息 | any |
| `setUserInfo(info)` | 设置用户信息 | void |
| `clearAuth()` | 清除所有认证信息 | void |
| `isAuthenticated()` | 检查是否已登录 | boolean |
| `hasRole(role)` | 检查是否有指定角色 | boolean |

---

#### 4. 组件 (components/)

```
components/
└── LogoutButton.vue              # 退出登录按钮组件
```

---

#### 5. API接口 (api/)

```
api/                              # API接口定义目录
```

---

#### 6. 状态管理 (stores/)

```
stores/                           # Pinia状态管理
```

---

#### 7. 样式 (styles/)

```
styles/                           # 全局样式
```

---

## 📁 后端项目 (cred-match-server)

### 核心配置文件
```
cred-match-server/
├── package.json                  # 后端依赖配置
├── tsconfig.json                 # TypeScript配置
├── tsconfig.build.json           # 构建配置
├── nest-cli.json                 # NestJS CLI配置
└── src/
    ├── main.ts                   # NestJS应用入口
    ├── app.module.ts             # 根模块
    └── env.d.ts                  # 环境类型声明
```

### 目录结构详解

#### 1. 主入口 (main.ts)
- 创建NestJS应用
- 设置全局前缀 `/api`
- 配置CORS
- 设置全局管道（ValidationPipe）
- 注册全局过滤器和拦截器
- 启用Swagger文档

#### 2. 根模块 (app.module.ts)
```typescript
@Module({
  imports: [
    ConfigModule,       // 配置模块（全局）
    TypeOrmModule,      // 数据库模块
    ThrottlerModule,    // 限流模块
    CommonModule,       // 通用模块
    AuthModule,         // 认证模块
    UserModule,         // 用户模块
    TeacherModule,      # 教师模块
  ]
})
```

---

#### 3. 模块结构 (modules/)

```
modules/
├── auth/                         # 认证模块
│   ├── auth.module.ts            # 认证模块定义
│   ├── auth.controller.ts        # 认证控制器
│   ├── auth.service.ts           # 认证服务
│   ├── dto/                      # 数据传输对象
│   │   ├── index.ts
│   │   ├── dev-login.dto.ts      # 开发登录DTO
│   │   ├── sms-login.dto.ts      # 短信登录DTO
│   │   ├── password-login.dto.ts # 密码登录DTO
│   │   ├── send-sms.dto.ts       # 发送短信DTO
│   │   ├── refresh-token.dto.ts  # 刷新Token DTO
│   │   └── auth-response.dto.ts  # 认证响应DTO
│   ├── guards/                   # 守卫
│   │   └── jwt-auth.guard.ts     # JWT认证守卫
│   └── strategies/               # 策略
│       └── jwt.strategy.ts       # JWT策略
│
├── user/                         # 用户模块
│   ├── user.module.ts            # 用户模块定义
│   ├── user.service.ts           # 用户服务
│   ├── index.ts                  # 导出入口
│   ├── dto/                      # 数据传输对象
│   │   ├── index.ts
│   │   ├── create-user.dto.ts    # 创建用户DTO
│   │   └── update-user.dto.ts    # 更新用户DTO
│   └── entities/                 # 实体定义
│       └── user.entity.ts        # 用户实体
│
└── teacher/                      # 教师模块
    └── entities/
        └── teacher.entity.ts     # 教师实体
```

---

#### 4. 通用模块 (common/)

```
common/
├── common.module.ts              # 通用模块定义
├── index.ts                      # 导出入口
│
├── decorators/                   # 自定义装饰器
│   ├── index.ts
│   ├── current-user.decorator.ts # 获取当前用户装饰器
│   ├── public.decorator.ts       # 公开接口装饰器
│   └── roles.decorator.ts        # 角色装饰器
│
├── dto/                          # 通用DTO
│   ├── index.ts
│   └── pagination.dto.ts         # 分页DTO
│
├── filters/                      # 过滤器
│   └── http-exception.filter.ts  # HTTP异常过滤器
│
├── guards/                       # 守卫
│   ├── index.ts
│   ├── jwt-auth.guard.ts         # JWT认证守卫
│   └── roles.guard.ts            # 角色守卫
│
├── interceptors/                 # 拦截器
│   ├── index.ts
│   ├── logging.interceptor.ts    # 日志拦截器
│   └── transform.interceptor.ts  # 响应转换拦截器
│
└── interfaces/                   # 接口定义
    ├── index.ts
    ├── api-response.interface.ts # API响应接口
    └── jwt-payload.interface.ts  # JWT Payload接口
```

---

## 🔐 认证流程

### 开发模式登录流程
```
1. 用户点击角色按钮
   ↓
2. 前端生成模拟数据
   ↓
3. 保存到localStorage:
   - token: 'mock-token-{role}'
   - refreshToken: 'mock-refresh'
   - userRole: '{role}'
   - userInfo: JSON对象
   ↓
4. 路由跳转到对应角色首页
```

### 生产模式登录流程
```
1. 用户输入手机号
   ↓
2. 前端发送验证码请求 → POST /api/auth/send-sms
   ↓
3. 用户输入验证码
   ↓
4. 前端发送登录请求 → POST /api/auth/sms-login
   ↓
5. 后端验证并返回JWT Token
   ↓
6. 前端保存Token并跳转
```

---

## 📊 API接口列表

### 认证模块 (/api/auth)

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| POST | /api/auth/send-sms | 发送短信验证码 | 公开 |
| POST | /api/auth/sms-login | 短信验证码登录 | 公开 |
| POST | /api/auth/password-login | 密码登录 | 公开 |
| GET | /api/auth/wechat | 获取微信授权URL | 公开 |
| GET | /api/auth/wechat/callback | 微信回调处理 | 公开 |
| POST | /api/auth/refresh | 刷新Token | 公开 |
| POST | /api/auth/logout | 退出登录 | 需认证 |
| GET | /api/auth/me | 获取当前用户信息 | 需认证 |
| POST | /api/auth/dev-login | 开发模式登录 | 仅开发环境 |

---

## 🛠️ 开发环境配置

### 前端开发服务器
- **地址**: http://localhost:5173
- **API代理**: `/api` → http://localhost:3000

### 后端开发服务器
- **地址**: http://localhost:3000
- **API前缀**: `/api`
- **Swagger文档**: http://localhost:3000/docs

### 环境变量 (.env)
```env
# 应用配置
APP_PORT=3000
APP_PREFIX=/api

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=cred_match

# JWT配置
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

---

## 📝 使用说明

### 首次启动
```bash
# 前端
cd cred-match-web
npm install
npm run dev

# 后端
cd cred-match-server
npm install
npm run start:dev
```

### 开发登录测试
1. 访问 http://localhost:5173/auth
2. 点击任意角色按钮
3. 自动登录并跳转到对应页面

### 退出登录
1. 进入个人设置页面
2. 点击"退出登录"
3. 返回登录页面