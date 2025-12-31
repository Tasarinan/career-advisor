# 🚀 快速开始

## 三步启动项目

### 1️⃣ 安装依赖
```bash
npm install
```

### 2️⃣ 配置环境
复制 `.env.example` 并创建 `.env.local`:
```bash
cp .env.example .env.local
```

编辑 `.env.local`，添加你的 API 密钥：
```env
NEXT_PUBLIC_URL=http://localhost:3000
OPENROUTER_API_KEY=sk_...（从 https://openrouter.ai 获取）
OPENROUTER_CHECK_MODEL=google/gemini-flash-1.5-8b
OPENROUTER_ROADMAP_MODEL=openai/o3-mini-high
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
RATE_LIMIT_REQUESTS_PER_MINUTE=5
```

### 3️⃣ 运行开发服务器
```bash
npm run dev
```

打开浏览器访问: **http://localhost:3000**

## 测试职位示例

尝试这些职位标题来测试应用：

- ✨ Full Stack Developer
- 🎯 Product Manager
- 📊 Data Scientist
- 🔧 DevOps Engineer
- 🎨 UI/UX Designer
- 🤖 Machine Learning Engineer
- ☁️ Cloud Solutions Architect
- 🔐 Cybersecurity Specialist
- 🚀 Growth Marketing Manager
- ⚙️ DevOps Engineer

## 功能演示流程

1. **输入职位** → SearchInput 组件会验证你的输入
2. **加载动画** → 10阶段加载过程，显示进度条
3. **生成路线图** → API 调用 OpenRouter AI，生成学习路径
4. **显示可视化** → ReactFlow 图形展示技能树
5. **导出图片** → 下载 PNG 格式的路线图

## 环境变量说明

| 变量 | 说明 | 获取方式 |
|------|------|--------|
| NEXT_PUBLIC_URL | 应用地址 | 本地: http://localhost:3000 |
| OPENROUTER_API_KEY | OpenRouter API密钥 | https://openrouter.ai → 仪表板 |
| OPENROUTER_CHECK_MODEL | 验证模型 | google/gemini-flash-1.5-8b |
| OPENROUTER_ROADMAP_MODEL | 生成模型 | openai/o3-mini-high |
| UPSTASH_REDIS_REST_URL | Redis URL | https://upstash.com |
| UPSTASH_REDIS_REST_TOKEN | Redis Token | https://upstash.com |
| RATE_LIMIT_REQUESTS_PER_MINUTE | 速率限制 | 推荐值: 5-10 |

## 获取 API 密钥

### OpenRouter API
1. 访问 https://openrouter.ai
2. 注册账号
3. 进入 Dashboard → 查看 API 密钥
4. 复制密钥到 .env.local

### Upstash Redis
1. 访问 https://upstash.com
2. 注册账号
3. 创建 Redis 数据库
4. 获取 REST URL 和 Token
5. 复制到 .env.local

## 命令行参考

```bash
# 开发模式（带 Turbopack）
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start

# 代码检查（如果配置了 ESLint）
npm run lint
```

## 故障排除

### 依赖安装失败
```bash
# 清除缓存
npm cache clean --force

# 重新安装
npm install
```

### 环境变量未生效
```bash
# 确保 .env.local 在项目根目录
# 重启开发服务器

npm run dev
```

### API 请求失败
- ✅ 检查 OPENROUTER_API_KEY 是否正确
- ✅ 检查 UPSTASH_REDIS 配置是否完整
- ✅ 检查网络连接
- ✅ 查看浏览器控制台错误信息

### 页面加载缓慢
```bash
# 使用 Turbopack（已默认启用）
npm run dev

# 如果仍然缓慢，清除 .next 目录
rm -rf .next
npm run dev
```

## 项目结构

```
career-advisor/
├── app/                      # Next.js App Router
│   ├── api/roadmap/         # API 端点
│   ├── page.tsx             # 主页面
│   ├── layout.tsx           # 根布局
│   └── globals.css          # 全局样式
├── components/              # React 组件
│   ├── SearchInput.tsx      # 搜索输入
│   ├── LoadingAnimation.tsx # 加载动画
│   ├── RoadmapVisualizer.tsx# 图形可视化
│   ├── Header.tsx           # 导航头
│   ├── Footer.tsx           # 页脚
│   └── Features.tsx         # 功能展示
├── schemas/                 # Zod 验证 schema
├── types/                   # TypeScript 类型
├── utils/                   # 工具函数
├── public/                  # 静态资源
├── package.json             # 依赖配置
├── tsconfig.json            # TypeScript 配置
├── tailwind.config.js       # Tailwind 配置
├── next.config.ts           # Next.js 配置
└── .env.example             # 环境变量示例
```

## 技术栈

- **框架**: Next.js 15.2.4
- **UI**: React 19 + Tailwind CSS 4.0
- **图表**: @xyflow/react (ReactFlow)
- **验证**: Zod
- **HTTP**: Axios
- **动画**: Lottie React
- **速率限制**: Upstash
- **AI**: OpenRouter (Google + OpenAI 模型)

## 学习资源

- 📖 [Next.js 文档](https://nextjs.org)
- 🎨 [Tailwind CSS 文档](https://tailwindcss.com)
- 🔄 [ReactFlow 文档](https://xyflow.com)
- 🤖 [OpenRouter 文档](https://openrouter.ai/docs)
- ✔️ [Zod 文档](https://zod.dev)

## 需要帮助？

1. 📖 查看项目根目录的 MIGRATION.md
2. 🔍 查看环境变量配置说明
3. 💬 检查浏览器控制台错误信息
4. 🐛 查看服务器日志输出

---

**祝你使用愉快！** 🎉
