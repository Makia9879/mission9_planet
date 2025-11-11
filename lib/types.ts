// 3D 坐标类型
export type Position3D = [number, number, number]

// 场景层级
export type SceneLayer = 'layer1' | 'layer2'

// Dapps 分类
export interface Category {
  id: string
  name: string
  description: string
  color: string
  icon?: string
}

// Dapps 项目
export interface Project {
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

// 星系数据（用于第一层）
export interface GalaxyData extends Category {
  position: Position3D
  scale: number
}

// 星球数据（用于第二层）
export interface PlanetData extends Project {
  position: Position3D
  scale: number
}

// 相机配置
export interface CameraConfig {
  position: Position3D
  fov: number
  near: number
  far: number
}

// 动画配置
export interface AnimationConfig {
  duration: number
  ease: string
}
