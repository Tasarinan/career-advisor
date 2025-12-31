# 🚀 Career Advisor - 快速开始指南

## 项目概览

Career Advisor 是一个 AI 驱动的职业建议平台，帮助专业人士做出更好的职业决策。

**状态**: 🟡 开发中 (主要功能已完成，部分页面待完善)
**完成度**: 40% → 下一步优化

---

## 📦 安装和运行

### 1. 克隆项目
```bash
git clone https://github.com/your-repo/career-advisor.git
cd career-advisor
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境变量配置

创建 `.env.local` 文件：
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# OpenAI / OpenRouter
OPENROUTER_API_KEY=your-openrouter-key
# 或使用 OpenAI
OPENAI_API_KEY=your-openai-key
OPENAI_BASE_URL=https://openrouter.ai/api/v1

# Creem.io
CREEM_API_KEY=your-creem-api-key
```

### 4. 数据库设置

运行 Supabase 迁移：
```bash
# 通过 Supabase CLI
supabase migration up

# 或手动执行 supabase/migrations 中的 SQL 文件
```

### 5. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

---

## 🎯 核心功能

### 1. 用户认证
- **位置**: `app/(auth-pages)/`
- **功能**: 注册、登录、密码重置
- **OAuth**: Google, GitHub

### 2. 职业建议生成
- **位置**: `app/page.tsx` (首页)
- **表单**: `components/product/generator/career-advisor-form.tsx`
- **API**: `app/api/career-advice/generate`
- **功能**: 
  - 输入职位、行业、技能、经验、目标
  - AI 生成个性化建议
  - 显示薪资预测和职业路径

### 3. 结果展示
- **位置**: `app/results/page.tsx` (🔄 开发中)
- **功能**:
  - 显示推荐职位
  - 薪资范围
  - 必需技能
  - 职业发展路径

### 4. 热门职位
- **位置**: `app/product/popular-names/` → `popular-careers/`
- **功能**: 展示市场热门职位和薪资信息

### 5. 定价和订阅
- **位置**: `app/page.tsx` (定价部分)
- **组件**: `components/product/pricing/career-advisor-pricing.tsx`
- **方案**:
  - 免费试用: 1次分析
  - 积分包: $9.99 (10积分)
  - 月度: $19.99 (无限)
  - 年度: $179.99 (最优)

### 6. 用户仪表板
- **位置**: `app/dashboard/`, `app/profile/`
- **功能**:
  - 查看订阅状态
  - 管理积分
  - 查看分析历史

---

## 📁 项目结构

```
career-advisor/
├── app/                          # Next.js App Router
│   ├── (auth-pages)/            # 认证相关页面
│   ├── api/
│   │   ├── career-advice/       # ✅ 职业建议 API
│   │   ├── chinese-names/       # ❌ 已淘汰
│   │   └── ...
│   ├── page.tsx                 # ✅ 首页（已更新）
│   ├── results/                 # 🔄 结果页面（开发中）
│   ├── dashboard/               # 用户仪表板
│   ├── profile/                 # 用户资料
│   └── ...
├── components/
│   ├── product/
│   │   ├── generator/
│   │   │   ├── career-advisor-form.tsx    # ✅ 新表单
│   │   │   └── name-generator-form.tsx    # ❌ 已淘汰
│   │   ├── pricing/
│   │   │   ├── career-advisor-pricing.tsx # ✅ 新定价
│   │   │   └── chinese-name-pricing.tsx   # ❌ 已淘汰
│   │   └── popular/
│   │       ├── popular-careers.tsx        # ✅ 新热门
│   │       └── popular-names.tsx          # ❌ 已淘汰
│   └── ui/                      # shadcn/ui 组件
├── supabase/
│   ├── migrations/
│   │   ├── 20250101000000_create_career_advice_tables.sql  # ✅ 新迁移
│   │   └── ...
│   └── scripts/
├── types/                       # TypeScript 类型定义
├── hooks/                       # React hooks
├── lib/                         # 工具函数
├── utils/                       # 工具函数
└── public/                      # 静态文件

✅ = 已完成
🔄 = 开发中
❌ = 已淘汰
```

---

## 🔄 开发工作流

### 添加新功能

1. **创建分支**
```bash
git checkout -b feature/your-feature
```

2. **修改代码**
```bash
# 编辑相关文件
# 更新类型定义（如需要）
# 更新 API 端点
```

3. **测试
```bash
npm run dev
# 在浏览器中测试
```

4. **提交更改**
```bash
git add .
git commit -m "feat: 添加职业建议筛选功能"
git push origin feature/your-feature
```

---

## 🧪 测试

### 运行测试
```bash
npm run test
```

### 手动测试清单
- [ ] 表单验证
- [ ] API 响应
- [ ] 数据库操作
- [ ] 支付流程
- [ ] 用户认证
- [ ] 移动端响应

---

## 🚢 部署

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm run start
```

### 部署到 Vercel
```bash
vercel
```

---

## 📚 API 文档

### 职业建议 API

**端点**: `POST /api/career-advice/generate`

**请求**:
```bash
curl -X POST http://localhost:3000/api/career-advice/generate \
  -H "Content-Type: application/json" \
  -d '{
    "currentPosition": "Software Engineer",
    "industry": "Technology",
    "skills": "Python,React,AWS",
    "experienceYears": 5,
    "careerGoals": "Become a Tech Lead",
    "planType": "1"
  }'
```

**响应**:
```json
{
  "message": "Career advice generated successfully",
  "careers": [
    {
      "position": "Senior Software Engineer",
      "industry": "Technology",
      "salary": {
        "min": 120000,
        "max": 180000,
        "currency": "USD"
      },
      "requiredSkills": ["Leadership", "System Design", "Mentoring"],
      "developmentPath": "Focus on system design and team leadership",
      "growthOpportunities": ["Engineering Manager", "Staff Engineer"],
      "challengeLevel": "Advanced",
      "marketDemand": "High",
      "nextSteps": ["Lead large projects", "Mentor junior engineers", "Learn architecture patterns"]
    }
  ],
  "creditsUsed": 1
}
```

---

## 🔐 安全性

### API 速率限制
- **未认证用户**: 每天 1 次免费分析
- **认证用户**: 根据积分余额

### 数据库安全
- RLS (Row Level Security) 启用
- 用户只能访问自己的数据
- 所有敏感数据加密

### 认证
- Supabase Auth
- JWT token
- 安全 cookie

---

## 🐛 常见问题

### Q: 如何获取 OpenRouter API 密钥？
**A**: 访问 [openrouter.ai](https://openrouter.ai) 注册并获取 API 密钥

### Q: 如何测试免费试用功能？
**A**: 在匿名模式下访问首页，提交表单即可使用免费分析

### Q: 如何增加用户的积分？
**A**: 通过 Creem.io 支付系统购买，或直接在数据库中修改（仅开发用）

### Q: 如何修改定价方案？
**A**: 编辑 `components/product/pricing/career-advisor-pricing.tsx`

---

## 📊 监控和日志

### API 日志
```bash
# 查看 API 调用日志
# 在 app/api/career-advice/generate/route.ts 中已配置日志

# 在浏览器控制台查看
console.log('API 请求');
console.log('API 响应');
```

### 数据库日志
```bash
# Supabase 仪表板 → Logs
# 查看所有数据库操作
```

---

## 🎓 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [Supabase 文档](https://supabase.com/docs)
- [OpenAI API 文档](https://platform.openai.com/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

---

## 🤝 贡献

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

---

## 📄 许可证

MIT

---

## 📞 支持

遇到问题？
- 查看项目文档 (FEATURE_ANALYSIS.md, IMPLEMENTATION_REPORT.md)
- 检查 GitHub Issues
- 联系开发团队

---

**祝您开发愉快！** 🎉

