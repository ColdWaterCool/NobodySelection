# NobodySelection

开源的外教资格评定与匹配框架。

**统一标准，向所有人开放** · One standard. Open to all.

---

## 项目简介

外教选择常遇到三类问题：资格标准不统一、线上档案与线下实际脱节、学生学习评价难以反哺教师资质。

NobodySelection 提供一套可自托管的协作骨架，覆盖学生、家长、外教与管理端，把**资格评定、线下核验联动、以及与学生评价相关联的可验证记录**放在同一套流程里。

名称中的 Nobody 强调不绑定单一品牌；Selection 强调基于共同标准的选择。规则可复用、可扩展，便于机构自托管落地。

---

## 主要能力

1. **外教资格评定** — 用可复用的分级与认证信号描述教学资质，而不是只靠宣传材料。  
2. **线下联动** — 线上档案对接机构现场核验与多角色协作（学生 / 家长 / 外教 / 管理）。  
3. **可验证凭证与学生评定** — 教师资格记录与学习评价可互相关联，便于后续扩展签发与核验。  
4. **可选站点图片** — Logo / 头像可自行放置；未放置时界面显示占位。

可选图片路径：

- `nobody-selection-web/public/images/logo.png`
- `nobody-selection-web/public/images/founder/portrait.png`

说明见 `nobody-selection-web/public/images/README.md`。

---

## 谁适合使用

| 对象 | 用途 |
|------|------|
| 学校 / 培训机构 | 自托管外教资格与匹配管理底座 |
| 外教与教务 | 沉淀可核验的资质与协作流程 |
| 学生 / 家长 | 基于标准与评价做选择 |
| 开发者 / 研究者 | 二次开发或作为教育数字化案例参考 |

---

## 技术栈

| 部分 | 技术 |
|------|------|
| 前端 | Vue 3 · Vite · TypeScript |
| 后端 | NestJS · JWT |
| 数据库 | MySQL（配置见 `.env.example`，示例数据见 `scripts/seed`） |

```text
NobodySelection/
├── nobody-selection-web/       # 前端（四端界面）
├── nobody-selection-server/    # 后端 API
├── docs/                       # API 与数据结构说明
├── scripts/                    # 启动与初始化脚本
├── LICENSE
└── README.md
```

---

## 快速开始

需要：Node.js 20 LTS。MySQL 可选（后端不可用时，前端仍可进入演示模式）。

```powershell
cd nobody-selection-web
npm install
npm run dev
```

浏览器打开 http://localhost:5173 ，进入 `/auth` 选择角色登录。

```powershell
cd nobody-selection-server
copy .env.example .env
npm install
npm run start:dev
```

也可使用根目录 `start.bat` 或 `scripts/start-project.bat`。

更多技术说明见 `docs/`。

---

## 许可与安全

- 采用 MIT 许可（见 `LICENSE`）。  
- 请勿将真实密钥提交到仓库；本地使用 `.env.example` 复制为 `.env` 后修改。  

---

## 后续方向

- 资格凭证的签发与核验演示  
- 更完整的线下核验工作流  
- 目录与模块的持续整理  

欢迎 Issue 与 PR。
