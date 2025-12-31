# Career Advisor 功能分析

## 当前已有功能

### 1. **身份验证系统** ✅
- 路径: `app/(auth-pages)/`
- 功能: 
  - 用户注册 (sign-up)
  - 用户登录 (sign-in)
  - 密码忘记和重置 (forgot-password, reset-password)
  - OAuth 集成 (Google, GitHub 等)
- 基于 Supabase

### 2. **用户管理系统** ✅
- 路径: `app/profile/`, `app/dashboard/`
- 功能:
  - 用户资料管理
  - 订阅状态显示
  - 积分余额显示
  - 生成历史记录
  - 收藏名字管理
  - 订阅门户

### 3. **支付与订阅系统** ✅
- 基于 Creem.io 集成
- 功能:
  - 多级订阅方案
  - 积分系统管理
  - 支付处理

### 4. **中文名字生成器** ⭐ (待替换)
- 路径: `app/page.tsx` (主页), `app/product/`, `app/results/`, `app/name-detail/`
- API: `app/api/chinese-names/`
- 功能:
  - 基于 OpenAI/OpenRouter 的 AI 名字生成
  - 个性化分析
  - 文化匹配度显示
  - 字符解释
  - 流行名字展示
  - 随机生成器
  - 名字详情页面
  - 批量生成管理
  - 生成历史记录
  - 名字收藏功能

### 5. **通用功能** ✅
- 页面:
  - 首页 (Home)
  - 关于我们 (About)
  - 隐私政策 (Privacy)
  - 服务条款 (Terms)
- 组件:
  - Header/Navigation
  - Footer
  - 主题切换 (Light/Dark)
  - Toast 通知
  - 响应式设计

---

## 待替换功能

### 中文名字生成器 → 职业生涯建议系统

需要替换的核心模块:

1. **主表单** (`app/page.tsx`, `NameGeneratorForm`)
   - 从: 英文名、性别、出生年份、性格特质、名字偏好
   - 改为: 职位、行业、技能、经验年限、职业目标

2. **生成 API** (`app/api/chinese-names/generate`)
   - 从: 中文名字生成
   - 改为: 职业建议生成（薪资、发展路径、技能要求等）

3. **结果页面** (`app/results/page.tsx`, 结果展示)
   - 从: 显示中文名字及其含义
   - 改为: 显示职业建议、发展路径、技能建议

4. **数据库表** (`supabase/migrations/`)
   - 调整字段以支持职业数据存储

5. **其他相关页面**:
   - 名字详情页 → 职业详情页
   - 流行名字页 → 热门职位页
   - 随机生成器 → 职位推荐器

---

## 保留的功能

- ✅ 身份认证系统 (未改动)
- ✅ 用户管理系统 (未改动)
- ✅ 支付与订阅系统 (未改动)
- ✅ 通用 UI 组件 (未改动)
- ✅ 数据库连接 (更新表结构)

