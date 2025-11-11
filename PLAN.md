# 3D星系 Dapps 浏览器 - 项目实施计划

## 📋 项目概述

### 项目目标
创建一个沉浸式的3D星系浏览器，用于展示和探索Dapps项目。采用双层星系结构，第一层展示项目分类，第二层展示具体项目。

### 技术栈
- **前端框架**: Next.js 14 (App Router)
- **3D引擎**: Three.js
- **React集成**: React Three Fiber (@react-three/fiber)
- **3D工具库**: Drei (@react-three/drei)
- **动画库**: GSAP
- **语言**: TypeScript
- **样式**: Tailwind CSS + CSS Modules
- **包管理**: npm/pnpm

---

## 🎨 设计方案

### 视觉设计

#### 第一层：星系云层级
- **视觉元素**: 螺旋星系（粒子系统）
- **排列方式**: 立体球形阵列（均匀分布）
- **代表含义**: 每个星系 = 一个Dapps类型（钱包、DEX、LST、借贷、NFT等）
- **视觉效果**:
  - 旋转的粒子螺旋结构
  - 星系整体发光效果
  - 不同颜色区分不同类型
  - 悬停时放大和增强光晕

#### 第二层：项目星球层级
- **视觉元素**: 发光水晶球
- **排列方式**: 立体球形阵列（均匀分布）
- **代表含义**: 每个星球 = 一个具体项目
- **视觉效果**:
  - 半透明材质（MeshPhysicalMaterial）
  - 内部发光效果
  - 不同颜色代表不同项目
  - 悬停时放大和脉动效果

#### 背景环境
- **星空背景**: 数千个小粒子模拟星星
- **缓慢漂移**: 星星缓慢移动营造深度感
- **渐变背景**: 深蓝到黑色的渐变

### 交互设计

#### 交互功能列表
1. **自动旋转**: 场景在无操作时缓慢自动旋转
2. **鼠标拖拽**: 按住鼠标拖拽旋转整个球形阵列
3. **滚轮缩放**: 滚动鼠标滚轮放大/缩小视图
4. **悬停高亮**: 鼠标悬停时对象放大并高亮
5. **点击切换**:
   - 第一层：点击星系进入第二层
   - 第二层：点击星球弹出详情模态窗口
6. **平滑过渡**: 层级切换时相机平滑过渡动画
7. **面包屑导航**: 顶部显示当前位置，可点击返回

#### 交互流程
```
用户进入
  → 第一层（星系云）
    → 拖拽浏览
    → 悬停查看分类名称
    → 点击某个星系
      → 相机动画过渡
        → 第二层（项目星球）
          → 拖拽浏览
          → 悬停查看项目名称
          → 点击某个星球
            → 弹出模态窗口
              → 显示项目详情（名称、描述、官网、TVL等）
              → 关闭模态窗口继续浏览
          → 点击面包屑返回第一层
```

---

## 📁 项目结构

```
mission9_planet/
├── PLAN.md                          # 本文件：项目实施计划
├── README.md                        # 项目说明文档
├── package.json                     # 项目依赖
├── tsconfig.json                    # TypeScript配置
├── tailwind.config.ts               # Tailwind CSS配置
├── next.config.js                   # Next.js配置
├── app/
│   ├── layout.tsx                   # 根布局
│   ├── page.tsx                     # 主页面
│   ├── globals.css                  # 全局样式
│   └── favicon.ico                  # 网站图标
├── components/
│   ├── Galaxy/                      # 第一层：星系相关组件
│   │   ├── GalaxyScene.tsx          #   - 星系场景容器
│   │   ├── SpiralGalaxy.tsx         #   - 单个螺旋星系组件
│   │   └── GalaxyCluster.tsx        #   - 星系集群（球形排列）
│   ├── Planet/                      # 第二层：星球相关组件
│   │   ├── PlanetScene.tsx          #   - 星球场景容器
│   │   ├── CrystalPlanet.tsx        #   - 单个水晶球组件
│   │   └── PlanetCluster.tsx        #   - 星球集群（球形排列）
│   ├── UI/                          # UI组件
│   │   ├── ProjectModal.tsx         #   - 项目详情模态窗口
│   │   ├── Breadcrumb.tsx           #   - 面包屑导航
│   │   ├── LoadingScreen.tsx        #   - 加载屏幕
│   │   └── Tooltip.tsx              #   - 悬停提示
│   ├── Effects/                     # 特效组件
│   │   ├── StarField.tsx            #   - 背景星空
│   │   ├── CameraTransition.tsx     #   - 相机过渡动画
│   │   └── AutoRotate.tsx           #   - 自动旋转控制器
│   └── Canvas3D.tsx                 # 3D画布包装器
├── lib/
│   ├── mockData.ts                  # Mock数据（初期使用）
│   ├── sphereLayout.ts              # 球形布局算法
│   ├── types.ts                     # TypeScript类型定义
│   └── constants.ts                 # 常量配置
├── hooks/
│   ├── useSceneState.ts             # 场景状态管理Hook
│   └── useHover.ts                  # 悬停检测Hook
└── public/
    └── data/                        # 静态数据文件（后期使用）
        ├── categories.json          #   - 分类数据
        ├── projects.json            #   - 项目数据
        └── images/                  #   - 项目图片
```

---

## 🚀 实施步骤

### 阶段 1: 项目初始化与配置（预计 15 分钟）

#### 步骤 1.1: 创建项目文档
- [x] 创建 `PLAN.md` - 实施计划（本文件）
- [ ] 创建 `README.md` - 使用说明

#### 步骤 1.2: 初始化 Next.js 项目
```bash
npx create-next-app@latest mission9_planet --typescript --tailwind --app
```
配置选项：
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Import alias: Yes (@/*)

#### 步骤 1.3: 安装依赖包
```bash
npm install three @react-three/fiber @react-three/drei gsap
npm install -D @types/three
```

依赖说明：
- `three`: Three.js 核心库
- `@react-three/fiber`: React Three.js 渲染器
- `@react-three/drei`: Three.js 实用工具集
- `gsap`: 专业动画库（用于相机过渡）
- `@types/three`: Three.js TypeScript类型

#### 步骤 1.4: 创建目录结构
```bash
mkdir -p components/{Galaxy,Planet,UI,Effects}
mkdir -p lib hooks public/data
```

---

### 阶段 2: 核心算法与工具函数（预计 15 分钟）

#### 步骤 2.1: 球形布局算法 (`lib/sphereLayout.ts`)
**功能**: 在球面上均匀分布多个点
**算法**: Fibonacci球面分布或黄金螺旋算法
```typescript
// 输入：对象数量、球体半径
// 输出：每个对象的3D坐标 [x, y, z]
export function getFibonacciSpherePoints(count: number, radius: number)
```

#### 步骤 2.2: TypeScript类型定义 (`lib/types.ts`)
定义核心数据类型：
- `Category`: Dapps分类
- `Project`: 具体项目
- `SceneLayer`: 场景层级（Layer1 | Layer2）
- `Position3D`: 3D坐标

#### 步骤 2.3: 常量配置 (`lib/constants.ts`)
定义配置常量：
- 球体半径
- 对象大小
- 动画速度
- 颜色方案

#### 步骤 2.4: Mock数据 (`lib/mockData.ts`)
创建示例数据：
- 5个分类（钱包、DEX、LST、借贷、NFT）
- 每个分类3-5个项目
- 包含名称、描述、官网、TVL等信息

---

### 阶段 3: 3D组件开发（预计 40 分钟）

#### 步骤 3.1: 背景星空 (`components/Effects/StarField.tsx`)
**功能**: 创建背景星空效果
**实现**:
- 使用 `Points` + `PointsMaterial`
- 随机生成5000-10000个点
- 缓慢随机移动营造深度感
```typescript
<Points positions={starPositions}>
  <PointsMaterial size={0.05} color="white" />
</Points>
```

#### 步骤 3.2: 螺旋星系 (`components/Galaxy/SpiralGalaxy.tsx`)
**功能**: 单个旋转的螺旋星系
**实现**:
- 使用粒子系统绘制螺旋臂
- 螺旋方程: `r = a + b * θ`
- 持续旋转动画
- 接收 props: position, color, scale, onClick, onHover
```typescript
interface SpiralGalaxyProps {
  position: [number, number, number]
  color: string
  scale: number
  categoryName: string
  onClick: () => void
  onPointerOver: () => void
  onPointerOut: () => void
}
```

#### 步骤 3.3: 发光水晶球 (`components/Planet/CrystalPlanet.tsx`)
**功能**: 半透明发光的星球
**实现**:
- 使用 `Sphere` + `MeshPhysicalMaterial`
- 属性配置:
  - `transmission`: 0.9 (透明度)
  - `thickness`: 0.5 (厚度)
  - `roughness`: 0.1 (粗糙度)
  - `emissive`: color (自发光)
  - `emissiveIntensity`: 0.5
- 接收 props: position, color, scale, onClick, onHover
```typescript
<Sphere args={[1, 32, 32]} scale={scale}>
  <meshPhysicalMaterial
    color={color}
    transmission={0.9}
    thickness={0.5}
    emissive={color}
    emissiveIntensity={0.5}
  />
</Sphere>
```

#### 步骤 3.4: 星系集群 (`components/Galaxy/GalaxyCluster.tsx`)
**功能**: 管理多个星系的球形排列
**实现**:
- 使用球形布局算法计算每个星系的位置
- 遍历分类数据创建多个 `SpiralGalaxy`
- 管理悬停状态（放大高亮）
- 处理点击事件（切换到第二层）
```typescript
categories.map((category, index) => {
  const position = spherePositions[index]
  return <SpiralGalaxy key={category.id} position={position} {...category} />
})
```

#### 步骤 3.5: 星球集群 (`components/Planet/PlanetCluster.tsx`)
**功能**: 管理多个星球的球形排列
**实现**:
- 类似 `GalaxyCluster`
- 创建多个 `CrystalPlanet`
- 处理点击事件（显示项目详情模态窗口）

#### 步骤 3.6: 第一层场景 (`components/Galaxy/GalaxyScene.tsx`)
**功能**: 第一层场景容器
**实现**:
- 包含 `StarField` + `GalaxyCluster`
- 配置相机、光照
- 集成 `OrbitControls`（拖拽旋转）
- 自动旋转逻辑

#### 步骤 3.7: 第二层场景 (`components/Planet/PlanetScene.tsx`)
**功能**: 第二层场景容器
**实现**:
- 包含 `StarField` + `PlanetCluster`
- 相同的控制器配置

---

### 阶段 4: 交互功能实现（预计 20 分钟）

#### 步骤 4.1: 轨道控制器
**实现**: 使用 `@react-three/drei` 的 `OrbitControls`
```typescript
<OrbitControls
  enableDamping
  dampingFactor={0.05}
  rotateSpeed={0.5}
  zoomSpeed={0.5}
  minDistance={5}
  maxDistance={30}
/>
```

#### 步骤 4.2: 自动旋转
**实现**: 使用 `useFrame` hook
```typescript
useFrame((state, delta) => {
  if (!isInteracting) {
    groupRef.current.rotation.y += delta * 0.1
  }
})
```

#### 步骤 4.3: 悬停检测
**实现**: 使用 Three.js 的 `onPointerOver` / `onPointerOut`
- 悬停时: `scale = 1.2`, `emissiveIntensity = 1.0`
- 离开时: 恢复原始值
- 添加 `<Html>` 显示名称提示

#### 步骤 4.4: 点击事件
**第一层**:
- 点击星系 → 触发层级切换
- 调用相机过渡动画
- 切换到第二层场景

**第二层**:
- 点击星球 → 显示模态窗口
- 传递项目数据到模态组件

#### 步骤 4.5: 相机过渡动画 (`components/Effects/CameraTransition.tsx`)
**实现**: 使用 GSAP 实现平滑过渡
```typescript
gsap.to(camera.position, {
  x: targetPosition.x,
  y: targetPosition.y,
  z: targetPosition.z,
  duration: 1.5,
  ease: "power2.inOut"
})
```

---

### 阶段 5: UI组件开发（预计 15 分钟）

#### 步骤 5.1: 项目详情模态窗口 (`components/UI/ProjectModal.tsx`)
**功能**: 显示项目详细信息
**内容**:
- 项目名称
- 项目描述
- 官网链接
- TVL（锁仓量）
- 关闭按钮

**样式**: 半透明背景 + 玻璃态效果（glassmorphism）

#### 步骤 5.2: 面包屑导航 (`components/UI/Breadcrumb.tsx`)
**功能**: 显示当前位置并支持返回
**示例**:
- 第一层: `首页`
- 第二层: `首页 > 钱包类Dapps`

#### 步骤 5.3: 加载屏幕 (`components/UI/LoadingScreen.tsx`)
**功能**: 资源加载时显示加载动画
**实现**: 使用 `@react-three/drei` 的 `useProgress`

---

### 阶段 6: 主页面整合（预计 10 分钟）

#### 步骤 6.1: 状态管理
创建 `useSceneState` Hook 管理:
- 当前层级（Layer1 / Layer2）
- 当前选中的分类
- 模态窗口状态
- 选中的项目

#### 步骤 6.2: 主页面 (`app/page.tsx`)
**实现**:
```typescript
export default function Home() {
  const [layer, setLayer] = useState<'layer1' | 'layer2'>('layer1')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <main className="w-full h-screen">
      <Breadcrumb layer={layer} category={selectedCategory} />
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        {layer === 'layer1' ? (
          <GalaxyScene onSelectCategory={...} />
        ) : (
          <PlanetScene categoryId={selectedCategory} onSelectProject={...} />
        )}
      </Canvas>
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={...} />
      )}
    </main>
  )
}
```

#### 步骤 6.3: 全局样式 (`app/globals.css`)
- 重置默认样式
- 设置全屏布局
- 隐藏滚动条
- 玻璃态UI样式

---

### 阶段 7: 优化与测试（预计 15 分钟）

#### 步骤 7.1: 性能优化
- 使用 `useMemo` 缓存布局计算
- 使用 `React.memo` 防止不必要的重渲染
- 粒子系统使用 `InstancedMesh`（如果对象数量>100）
- 限制动画帧率（如果性能不足）

#### 步骤 7.2: 响应式适配
- 移动端: 减少粒子数量
- 移动端: 支持触摸拖拽
- 调整相机 FOV 适配不同屏幕

#### 步骤 7.3: 错误处理
- 添加错误边界（Error Boundary）
- WebGL不支持时显示降级提示
- 资源加载失败处理

#### 步骤 7.4: 测试清单
- [ ] 第一层加载正常
- [ ] 星系拖拽旋转流畅
- [ ] 悬停高亮效果正常
- [ ] 点击星系进入第二层，相机过渡平滑
- [ ] 第二层星球显示正常
- [ ] 点击星球弹出模态窗口
- [ ] 模态窗口数据正确
- [ ] 面包屑导航可以返回第一层
- [ ] 自动旋转功能正常
- [ ] 移动端触摸操作正常

---

## 📊 数据结构设计

### 分类数据结构 (Category)
```typescript
interface Category {
  id: string              // 唯一标识
  name: string            // 分类名称（钱包、DEX等）
  description: string     // 分类描述
  color: string           // 主题颜色（hex格式）
  icon?: string           // 图标URL（可选）
}
```

### 项目数据结构 (Project)
```typescript
interface Project {
  id: string              // 唯一标识
  categoryId: string      // 所属分类ID
  name: string            // 项目名称
  description: string     // 项目描述
  website: string         // 官网链接
  tvl: string             // 锁仓量（如 "$5.2B"）
  logo?: string           // 项目Logo URL（可选）
  color?: string          // 自定义颜色（可选）
}
```

### Mock数据示例
```typescript
export const categories: Category[] = [
  {
    id: 'wallet',
    name: '钱包',
    description: 'Web3钱包类应用',
    color: '#4ECDC4'
  },
  {
    id: 'dex',
    name: 'DEX',
    description: '去中心化交易所',
    color: '#FF6B6B'
  },
  {
    id: 'lst',
    name: 'LST',
    description: '流动性质押代币',
    color: '#95E1D3'
  },
  {
    id: 'lending',
    name: '借贷',
    description: 'DeFi借贷协议',
    color: '#FFE66D'
  },
  {
    id: 'nft',
    name: 'NFT',
    description: 'NFT市场与平台',
    color: '#A8E6CF'
  }
]

export const projects: Project[] = [
  // 钱包类
  {
    id: 'metamask',
    categoryId: 'wallet',
    name: 'MetaMask',
    description: '全球最受欢迎的Web3钱包',
    website: 'https://metamask.io',
    tvl: '$5.2B'
  },
  // ... 更多项目
]
```

---

## 🎯 核心技术实现细节

### 1. 球形布局算法（Fibonacci Sphere）

**原理**: 使用黄金角度在球面上均匀分布点
```typescript
export function getFibonacciSpherePoints(
  count: number,
  radius: number
): [number, number, number][] {
  const points: [number, number, number][] = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)) // ~2.4 radians

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2  // y从1到-1
    const radiusAtY = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i

    const x = Math.cos(theta) * radiusAtY * radius
    const z = Math.sin(theta) * radiusAtY * radius

    points.push([x, y * radius, z])
  }

  return points
}
```

### 2. 螺旋星系粒子生成

**原理**: 对数螺旋 + 垂直分布
```typescript
function generateSpiralParticles(particleCount: number, arms: number) {
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    const radius = Math.random() * 3
    const spinAngle = radius * 5
    const branchAngle = ((i % arms) / arms) * Math.PI * 2

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius
    positions[i3 + 1] = (Math.random() - 0.5) * 0.5
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius
  }

  return positions
}
```

### 3. 悬停检测与高亮

**实现思路**:
- 使用 R3F 的指针事件系统
- 维护 `isHovered` 状态
- 通过 `useSpring` 实现平滑缩放动画

```typescript
const [hovered, setHovered] = useState(false)
const { scale } = useSpring({
  scale: hovered ? 1.2 : 1,
  config: { tension: 300, friction: 20 }
})

return (
  <group
    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}
    scale={scale}
  >
    {/* 3D对象 */}
  </group>
)
```

### 4. 相机过渡动画

**实现**: GSAP + React Three Fiber
```typescript
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'

function transitionCamera(
  camera: THREE.Camera,
  targetPosition: THREE.Vector3,
  targetLookAt: THREE.Vector3
) {
  gsap.to(camera.position, {
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    duration: 1.5,
    ease: 'power2.inOut',
    onUpdate: () => {
      camera.lookAt(targetLookAt)
    }
  })
}
```

---

## 🔧 配置文件

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 如果使用外部图片，配置域名
  images: {
    domains: ['example.com'],
  },
  // 关闭严格模式避免 Three.js 重复渲染
  reactStrictMode: false,
}

module.exports = nextConfig
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'galaxy-blue': '#1e3a8a',
        'galaxy-purple': '#7c3aed',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 📈 性能优化策略

### 1. 粒子系统优化
- 使用 `InstancedMesh` 替代多个单独的 Mesh
- 限制粒子数量（桌面10000，移动5000）
- 使用 LOD（Level of Detail）根据距离调整粒子密度

### 2. 渲染优化
- 启用 `useFrame` 的条件渲染
- 使用 `useMemo` 缓存计算密集型数据
- 非活动对象使用 `frustumCulled` 剔除

### 3. 内存管理
- 及时 dispose 不再使用的几何体和材质
- 使用 `useEffect` 清理函数

```typescript
useEffect(() => {
  return () => {
    geometry.dispose()
    material.dispose()
  }
}, [])
```

---

## 🚢 部署建议

### 开发环境
```bash
npm run dev
```

### 生产构建
```bash
npm run build
npm run start
```

### 部署平台
- **推荐**: Vercel（Next.js 原生支持）
- 备选: Netlify、Cloudflare Pages
- 自托管: Docker + Nginx

---

## 📝 后期迭代计划

### Phase 2 功能
- [ ] 从JSON文件读取数据
- [ ] 支持自定义项目图片/Logo
- [ ] 搜索功能（搜索项目名称）
- [ ] 过滤功能（按TVL、分类过滤）

### Phase 3 功能
- [ ] 集成真实API（DeFi Llama等）
- [ ] 实时TVL数据更新
- [ ] 项目对比功能
- [ ] 收藏夹功能

### Phase 4 功能
- [ ] VR/AR 支持
- [ ] 多语言支持
- [ ] 深色/浅色主题切换
- [ ] 分享功能（生成链接直达某个项目）

---

## 🐛 常见问题排查

### 问题1: Three.js 对象不显示
- 检查相机位置和朝向
- 检查光照是否充足
- 检查对象是否在视锥体内

### 问题2: 性能卡顿
- 减少粒子数量
- 降低材质质量（如减少segments）
- 检查是否有不必要的重渲染

### 问题3: 点击事件无响应
- 确保对象有 `onPointerDown` 事件
- 检查是否被其他对象遮挡
- 确认 OrbitControls 没有阻止事件冒泡

---

## 📚 参考资源

- [React Three Fiber 文档](https://docs.pmnd.rs/react-three-fiber)
- [Drei 组件库](https://github.com/pmndrs/drei)
- [Three.js 官方文档](https://threejs.org/docs/)
- [GSAP 动画库](https://greensock.com/gsap/)
- [Fibonacci Sphere 算法](https://en.wikipedia.org/wiki/Fibonacci_lattice)

---

## ✅ 实施检查清单

### 项目初始化
- [ ] Next.js 项目创建完成
- [ ] 所有依赖安装成功
- [ ] 目录结构创建完成
- [ ] TypeScript 配置正确

### 核心组件
- [ ] 球形布局算法实现
- [ ] 背景星空组件
- [ ] 螺旋星系组件
- [ ] 水晶球组件
- [ ] 星系场景
- [ ] 星球场景

### 交互功能
- [ ] OrbitControls 集成
- [ ] 自动旋转
- [ ] 悬停高亮
- [ ] 点击事件
- [ ] 相机过渡动画

### UI组件
- [ ] 项目详情模态窗口
- [ ] 面包屑导航
- [ ] 加载屏幕

### 数据与状态
- [ ] Mock 数据创建
- [ ] 状态管理实现
- [ ] 数据集成完成

### 测试与优化
- [ ] 所有功能测试通过
- [ ] 性能优化完成
- [ ] 响应式适配完成
- [ ] 错误处理完善

### 文档
- [ ] README 编写完成
- [ ] 代码注释充分
- [ ] PLAN 文档更新

---

**最后更新时间**: 2025-11-11
**预计总开发时间**: 90-100 分钟
**当前状态**: 🚧 进行中
