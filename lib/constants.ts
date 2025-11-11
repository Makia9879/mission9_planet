// 布局配置
export const LAYOUT = {
  // 球形阵列半径
  sphereRadius: 12,
  // 星系大小
  galaxySize: 1.5,
  // 星球大小
  planetSize: 1,
  // 对象间距系数
  spacingFactor: 1.2,
}

// 动画配置
export const ANIMATION = {
  // 自动旋转速度
  autoRotateSpeed: 0.1,
  // 悬停放大倍数
  hoverScale: 1.3,
  // 层级切换动画时长（秒）
  transitionDuration: 1.8,
  // 动画缓动函数
  transitionEase: 'power2.inOut',
  // 粒子旋转速度
  particleRotateSpeed: 0.05,
}

// 相机配置
export const CAMERA = {
  // 默认位置
  defaultPosition: [0, 0, 20] as [number, number, number],
  // 视场角
  fov: 60,
  // 近裁剪面
  near: 0.1,
  // 远裁剪面
  far: 1000,
  // 第二层相机位置
  layer2Position: [0, 0, 15] as [number, number, number],
}

// 控制器配置
export const CONTROLS = {
  // 启用阻尼
  enableDamping: true,
  // 阻尼系数
  dampingFactor: 0.05,
  // 旋转速度
  rotateSpeed: 0.5,
  // 缩放速度
  zoomSpeed: 0.8,
  // 最小距离
  minDistance: 8,
  // 最大距离
  maxDistance: 40,
  // 启用平移
  enablePan: false,
}

// 性能配置
export const PERFORMANCE = {
  // 桌面端粒子数量
  desktopParticleCount: 10000,
  // 移动端粒子数量
  mobileParticleCount: 5000,
  // 星系粒子数量
  galaxyParticleCount: 3000,
  // 星空背景粒子数量
  starFieldParticleCount: 8000,
  // 启用阴影
  enableShadows: false,
  // 像素比限制
  maxPixelRatio: 2,
}

// 颜色配置
export const COLORS = {
  // 分类颜色
  categories: {
    wallet: '#4ECDC4',    // 青色 - 钱包
    dex: '#FF6B6B',       // 红色 - DEX
    lst: '#95E1D3',       // 薄荷绿 - LST
    lending: '#FFE66D',   // 黄色 - 借贷
    nft: '#A8E6CF',       // 浅绿 - NFT
  },
  // 背景颜色
  background: '#0a0e27',
  // 星星颜色
  star: '#ffffff',
  // 发光颜色
  glow: '#ffffff',
}

// UI 配置
export const UI = {
  // 模态窗口动画时长
  modalAnimationDuration: 300,
  // Tooltip 延迟
  tooltipDelay: 200,
  // 面包屑高度
  breadcrumbHeight: 60,
}

// 光照配置
export const LIGHTING = {
  // 环境光强度
  ambientLightIntensity: 0.4,
  // 环境光颜色
  ambientLightColor: '#ffffff',
  // 方向光强度
  directionalLightIntensity: 0.8,
  // 方向光位置
  directionalLightPosition: [10, 10, 5] as [number, number, number],
  // 点光源强度
  pointLightIntensity: 1.5,
  // 点光源颜色
  pointLightColor: '#ffffff',
}

// 材质配置
export const MATERIAL = {
  // 水晶球透明度
  crystalTransmission: 0.9,
  // 水晶球厚度
  crystalThickness: 0.5,
  // 水晶球粗糙度
  crystalRoughness: 0.1,
  // 水晶球折射率
  crystalIOR: 1.5,
  // 发光强度
  emissiveIntensity: 0.5,
  // 悬停时发光强度
  hoverEmissiveIntensity: 1.2,
}

// 检测是否为移动设备
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

// 获取粒子数量（根据设备）
export const getParticleCount = (type: 'starField' | 'galaxy'): number => {
  const mobile = isMobile()
  if (type === 'starField') {
    return mobile
      ? Math.floor(PERFORMANCE.starFieldParticleCount / 2)
      : PERFORMANCE.starFieldParticleCount
  }
  return mobile
    ? Math.floor(PERFORMANCE.galaxyParticleCount / 2)
    : PERFORMANCE.galaxyParticleCount
}
