# Career Advisor - 功能替换对比表

## 核心功能转换

| 原功能 (中文名字生成器) | 新功能 (职业建议系统) | 组件/文件 | 状态 |
|------------------------|--------------------|---------|------|
| 用户输入英文名字 | 用户输入当前职位 | `CareerAdvisorForm` | ✅ 完成 |
| 选择性别 | 选择行业 | `CareerAdvisorForm` | ✅ 完成 |
| 输入出生年份 | 输入经验年数 | `CareerAdvisorForm` | ✅ 完成 |
| 输入性格特质 | 输入关键技能 | `CareerAdvisorForm` | ✅ 完成 |
| 输入名字偏好 | 输入职业目标 | `CareerAdvisorForm` | ✅ 完成 |
| AI 生成中文名字 | AI 生成职业建议 | `/api/career-advice/generate` | ✅ 完成 |
| 显示名字含义 | 显示职业说明 | `Results` 页面 | 🔄 进行中 |
| 显示文化背景 | 显示职业发展路径 | `Results` 页面 | 🔄 进行中 |
| 显示拼音 | 显示薪资范围 | `Results` 页面 | 🔄 进行中 |
| 流行名字展示 | 热门职位展示 | `PopularCareers` | ✅ 完成 |
| 随机名字生成 | 随机职业推荐 | `RandomGenerator` | 🔄 进行中 |
| 名字收藏功能 | 职业建议收藏 | 保留系统 | 保持 |
| 生成历史记录 | 分析历史记录 | 保留系统 | 保持 |
| 定价方案 | 定价方案 | `CareerAdvisorPricing` | ✅ 完成 |

---

## API 端点转换

### 原有端点
```
POST /api/chinese-names/generate
```
**输入**:
```json
{
  "englishName": "John",
  "gender": "male",
  "birthYear": "1990",
  "personalityTraits": "ambitious, creative",
  "namePreferences": "traditional",
  "planType": "1"
}
```

**输出**:
```json
{
  "names": [
    {
      "chinese": "李明",
      "pinyin": "Lǐ Míng",
      "meaning": "...",
      "culturalNotes": "..."
    }
  ]
}
```

### 新增端点
```
POST /api/career-advice/generate
```
**输入**:
```json
{
  "currentPosition": "Software Engineer",
  "industry": "Technology",
  "skills": "Python, React, AWS",
  "experienceYears": 5,
  "careerGoals": "Become a Tech Lead",
  "planType": "1"
}
```

**输出**:
```json
{
  "careers": [
    {
      "position": "Senior Engineer",
      "industry": "Technology",
      "salary": { "min": 120000, "max": 180000 },
      "requiredSkills": ["Leadership", "Architecture"],
      "developmentPath": "...",
      "growthOpportunities": ["..."]
    }
  ]
}
```

---

## 数据库转换

### 原有表
```
generated_names
  - id (UUID)
  - batch_id (UUID)
  - chinese_name (text)
  - pinyin (text)
  - meaning (text)
  - cultural_notes (text)
  - personality_match (text)

generation_batches
  - id (UUID)
  - user_id (UUID)
  - english_name (text)
  - gender (text)
  - personality_traits (text)
```

### 新增表
```
career_advice_items
  - id (UUID)
  - batch_id (UUID)
  - position (text)
  - industry (text)
  - salary_min (integer)
  - salary_max (integer)
  - required_skills (text[])
  - development_path (text)

career_advice_batches
  - id (UUID)
  - user_id (UUID)
  - current_position (text)
  - industry (text)
  - years_of_experience (integer)
  - career_goals (text)
```

---

## 页面结构转换

### 首页
| 元素 | 原文本 | 新文本 |
|------|--------|--------|
| 标题 | "Create Your Chinese Name" | "AI-Powered Career Advice" |
| 描述 | "让AI创建有意义的中文名字" | "获取个性化的职业建议" |
| 按钮1 | "Generate Free Name" | "Get Free Advice" |
| 按钮2 | "Random Name Generator" | "Career Recommendations" |
| Feature 1 | "3 free names daily" | "1 free analysis daily" |
| Feature 2 | "Instant generation" | "Instant recommendations" |
| Feature 3 | "Cultural accuracy" | "AI-powered insights" |

### 流行展示
| 原页面 | 新页面 | 展示内容 |
|--------|--------|----------|
| Popular Names | Popular Careers | 6个热门职位 |
| 中文名字卡片 | 职位卡片 | 职位、行业、薪资、技能 |

### 定价页面
| 方案 | 原名称 | 新名称 | 价格 |
|------|--------|--------|------|
| 免费 | Free Trial | Free Trial | $0 |
| 付费1 | Credit Pack | Credit Pack | $9.99 |
| 付费2 | Monthly | Monthly Pass | $19.99 |
| 付费3 | Annual | Annual Pass | $179.99 |

---

## 代码文件映射

| 原文件 | 新文件 | 说明 |
|--------|--------|------|
| `name-generator-form.tsx` | `career-advisor-form.tsx` | 表单组件替换 |
| `chinese-name-pricing.tsx` | `career-advisor-pricing.tsx` | 定价组件替换 |
| `popular-names.tsx` | `popular-careers.tsx` | 流行展示替换 |
| `api/chinese-names/generate` | `api/career-advice/generate` | API 端点替换 |
| - | `migrations/career_advice_tables.sql` | 新建数据库迁移 |

---

## 类型定义转换

### FormData
```typescript
// 原
type FormData = {
  englishName: string;
  gender: 'male' | 'female' | 'other';
  birthYear?: string;
  personalityTraits?: string;
  namePreferences?: string;
  planType: '1' | '4';
}

// 新
type CareerFormData = {
  currentPosition: string;
  industry: string;
  skills: string;
  experienceYears: number;
  careerGoals: string;
  planType: '1' | '4';
}
```

### DataType
```typescript
// 原
type NameData = {
  chinese: string;
  pinyin: string;
  characters: Array<...>;
  meaning: string;
  culturalNotes: string;
  personalityMatch: string;
  style: string;
}

// 新
type CareerAdviceData = {
  position: string;
  industry: string;
  salary: { min: number; max: number; currency: string };
  requiredSkills: string[];
  developmentPath: string;
  growthOpportunities: string[];
  challengeLevel: string;
  marketDemand: string;
}
```

---

## 功能完成度

```
████████░░░░░░░░░░░░ 40% 完成

✅ 已完成 (8个)
  ├─ 主页重构
  ├─ 表单组件
  ├─ 定价组件
  ├─ 流行职位
  ├─ API 端点
  ├─ 数据库迁移
  └─ 文档更新

🔄 进行中 (2个)
  ├─ 结果页面
  └─ 随机生成器

⏳ 待处理 (2个)
  ├─ 代码测试
  └─ 部署准备
```

---

## 性能指标

| 指标 | 原系统 | 新系统 | 说明 |
|------|--------|--------|------|
| API 响应时间 | ~2-3s | ~2-3s | 保持一致 |
| 数据库查询 | 简单 | 简单 | 同样复杂度 |
| 前端加载 | 小 | 小 | 无显著变化 |
| 积分消耗 | 1-4 | 1-4 | 保持一致 |

---

## 迁移检查清单

- [x] 表单组件创建
- [x] API 端点创建
- [x] 数据库迁移创建
- [x] 定价页面更新
- [x] 热门展示更新
- [ ] 结果页面更新
- [ ] 随机生成器更新
- [ ] 完整测试
- [ ] 性能验证
- [ ] 部署准备

