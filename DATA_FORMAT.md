# 数据格式规范文档

本文档描述如何为星系可视化项目准备外部 JSON 数据。

## 目录
- [概述](#概述)
- [数据结构](#数据结构)
- [分类数据 (Category)](#分类数据-category)
- [项目数据 (Project)](#项目数据-project)
- [完整示例](#完整示例)
- [导入使用](#导入使用)
- [最佳实践](#最佳实践)

## 概述

项目使用两层数据结构：
- **第一层**：分类 (Category) - 以星系形式呈现
- **第二层**：项目 (Project) - 以星球形式呈现在对应分类下

每个分类可以包含多个项目。用户可以从星系视图点击进入查看该分类下的所有项目星球。

## 数据结构

### 分类数据 (Category)

分类代表 DApps 的类别，在 3D 场景中以星系形式展示。

#### 必需字段

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| `id` | string | 唯一标识符，建议使用小写英文 | `"dex"` |
| `name` | string | 显示名称，支持中英文 | `"DEX"` 或 `"去中心化交易所"` |
| `description` | string | 分类描述 | `"去中心化交易所"` |
| `color` | string | 十六进制颜色代码，用于星系和标签 | `"#FF6B6B"` |

#### 可选字段

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| `icon` | string | 图标 URL 或图标名称 | `"exchange-icon"` |

#### JSON 示例

```json
{
  "id": "dex",
  "name": "DEX",
  "description": "去中心化交易所",
  "color": "#FF6B6B",
  "icon": "exchange"
}
```

### 项目数据 (Project)

项目代表具体的 DApp，在 3D 场景中以水晶星球形式展示。

#### 必需字段

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| `id` | string | 唯一标识符 | `"uniswap"` |
| `categoryId` | string | 所属分类的 ID，必须匹配某个 Category 的 id | `"dex"` |
| `name` | string | 项目名称 | `"Uniswap"` |
| `description` | string | 项目描述 | `"以太坊上最大的去中心化交易所"` |
| `website` | string | 项目官网 URL | `"https://uniswap.org"` |
| `tvl` | string | 总锁仓量，支持格式化字符串 | `"$4.8B"` |

#### 可选字段

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| `logo` | string | 项目 Logo URL | `"https://example.com/logo.png"` |
| `color` | string | 项目自定义颜色（如不指定则继承分类颜色） | `"#FF007A"` |
| `tags` | string[] | 标签数组 | `["AMM", "Ethereum"]` |

#### JSON 示例

```json
{
  "id": "uniswap",
  "categoryId": "dex",
  "name": "Uniswap",
  "description": "以太坊上最大的去中心化交易所",
  "website": "https://uniswap.org",
  "tvl": "$4.8B",
  "tags": ["AMM", "Ethereum"],
  "logo": "https://uniswap.org/logo.png",
  "color": "#FF007A"
}
```

## 完整示例

### 完整的 JSON 数据文件

创建一个 JSON 文件（例如 `data.json`），包含 categories 和 projects 两个数组：

```json
{
  "categories": [
    {
      "id": "dex",
      "name": "DEX",
      "description": "去中心化交易所",
      "color": "#FF6B6B"
    },
    {
      "id": "lending",
      "name": "借贷",
      "description": "DeFi 借贷与收益协议",
      "color": "#FFE66D"
    },
    {
      "id": "nft",
      "name": "NFT",
      "description": "NFT 市场与平台",
      "color": "#A8E6CF"
    }
  ],
  "projects": [
    {
      "id": "uniswap",
      "categoryId": "dex",
      "name": "Uniswap",
      "description": "以太坊上最大的去中心化交易所",
      "website": "https://uniswap.org",
      "tvl": "$4.8B",
      "tags": ["AMM", "Ethereum"]
    },
    {
      "id": "aave",
      "categoryId": "lending",
      "name": "Aave",
      "description": "领先的去中心化借贷协议",
      "website": "https://aave.com",
      "tvl": "$6.5B",
      "tags": ["Lending", "Multi-chain"]
    },
    {
      "id": "opensea",
      "categoryId": "nft",
      "name": "OpenSea",
      "description": "最大的 NFT 交易市场",
      "website": "https://opensea.io",
      "tvl": "$3.5B",
      "tags": ["Marketplace", "Multi-chain"]
    }
  ]
}
```

### TypeScript 类型定义

如果���使用 TypeScript，可以使用以下类型：

```typescript
// 分类类型
interface Category {
  id: string
  name: string
  description: string
  color: string
  icon?: string
}

// 项目类型
interface Project {
  id: string
  categoryId: string
  name: string
  description: string
  website: string
  tvl: string
  logo?: string
  color?: string
  tags?: string[]
}

// 完整数据结构
interface AppData {
  categories: Category[]
  projects: Project[]
}
```

## 导入使用

### 方式 1：直接替换 mockData.ts

将你的数据按照格式准备好，替换 `lib/mockData.ts` 文件中的 `categories` 和 `projects` 数组。

```typescript
// lib/mockData.ts
import type { Category, Project } from './types'
import { COLORS } from './constants'

export const categories: Category[] = [
  // 你的分类数据
]

export const projects: Project[] = [
  // 你的项目数据
]
```

### 方式 2：从外部 JSON 文件加载

1. 将 JSON 文件放在 `public/data/` 目录下
2. 在组件中使用 fetch 加载数据

```typescript
// 示例：在组件中加载外部数据
const [categories, setCategories] = useState<Category[]>([])
const [projects, setProjects] = useState<Project[]>([])

useEffect(() => {
  fetch('/data/your-data.json')
    .then(res => res.json())
    .then(data => {
      setCategories(data.categories)
      setProjects(data.projects)
    })
}, [])
```

### 方式 3：从 API 获取

```typescript
// 从 API 获取数据
const fetchData = async () => {
  const response = await fetch('https://your-api.com/data')
  const data = await response.json()
  return data
}
```

## 最佳实践

### 1. ID 命名规范

- 使用小写字母和连字符
- 保持简洁且具有描述性
- 避免使用特殊字符

```
✅ 推荐: "uniswap", "pancake-swap", "aave-v3"
❌ 避免: "Uniswap", "PancakeSwap!", "aave@v3"
```

### 2. 颜色选择

- 使用十六进制颜色代码（6位）
- 确保颜色在深色背景下可见
- 同一分类下的项目会继承分类颜色

```json
✅ 推荐: "#FF6B6B", "#4ECDC4"
❌ 避免: "red", "#F00", "rgb(255,0,0)"
```

### 3. TVL 格式

- 使用易读的格式化字符串
- 支持 K（千）、M（百万）、B（十亿）单位

```
✅ 推荐: "$4.8B", "$125M", "$5.2K"
❌ 避免: "4800000000", "4.8B USD"
```

### 4. 描述文本

- 保持简洁（建议 50-100 字符）
- 突出项目核心特点
- 使用统一的语言风格

### 5. 标签使用

- 每个项目建议 2-5 个标签
- 使用简短、清晰的关键词
- 保持标签风格一致

```json
✅ 推荐: ["AMM", "Ethereum", "V3"]
❌ 避免: ["这是一个自动做市商", "Ethereum区块链", "第三版"]
```

### 6. 数据验证

在使用数据前，建议进行以下验证：

- 所有 ID 唯一
- 所有 categoryId 都能找到对应的 Category
- 必需字段都已填写
- URL 格式正确
- 颜色代码有效

### 7. 推荐的分类数量

- 建议 3-8 个分类
- 每个分类 3-10 个项目
- 总项目数建议不超过 50 个（性能考虑）

## 数据示例模板

这里提供一个可直接使用的空模板：

```json
{
  "categories": [
    {
      "id": "category-id",
      "name": "分类名称",
      "description": "分类描述",
      "color": "#HEXCOLOR"
    }
  ],
  "projects": [
    {
      "id": "project-id",
      "categoryId": "category-id",
      "name": "项目名称",
      "description": "项目描述",
      "website": "https://example.com",
      "tvl": "$XXX",
      "tags": ["标签1", "标签2"]
    }
  ]
}
```

## 常见问题

### Q: 可以动态添加/删除数据吗？

A: 可以。如果使用外部 JSON 或 API，只需更新数据源，页面���新后会加载新数据。

### Q: 支持多语言吗？

A: 目前所有文本字段都支持中英文，可以根据需要填写。如需完整的多语言支持，需要额外实现 i18n 机制。

### Q: 一个项目可以属于多个分类吗？

A: 当前架构下，一个项目只能属于一个分类（通过 categoryId 关联）。如需支持多分类，需要修改数据结构。

### Q: 如何更新现有数据？

A: 直接修改 `lib/mockData.ts` 文件，或替换外部 JSON 文件即可。开发环境下会自动热更新。

### Q: Logo 图片应该放在哪里？

A: 可以选择：
1. 使用外部 CDN URL
2. 放在 `public/images/` 目录下，使用 `/images/your-logo.png` 引用
3. 使用 Base64 编码（不推荐，会增加数据大小）

## 技术支持

如有问题，请参考：
- 项目类型定义：`lib/types.ts`
- 示例数据：`lib/mockData.ts`
- 颜色配置：`lib/constants.ts`

---

**文档版本**: 1.0
**最后更新**: 2025-11-20
