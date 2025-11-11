import type { Position3D } from './types'

/**
 * 使用 Fibonacci 球面分布算法在球面上均匀分布点
 *
 * @param count 点的数量
 * @param radius 球体半径
 * @returns 点的3D坐标数组
 *
 * 算法原理：
 * 使用黄金角度（Golden Angle）约137.5度来确保点在球面上的均匀分布
 * 这种方法比传统的经纬度网格分布更加均匀
 */
export function getFibonacciSpherePoints(
  count: number,
  radius: number
): Position3D[] {
  const points: Position3D[] = []

  // 黄金角度（弧度）≈ 2.39996323
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    // y 坐标从 1 到 -1 线性分布
    const y = 1 - (i / (count - 1)) * 2

    // 计算该高度处的圆半径
    const radiusAtY = Math.sqrt(1 - y * y)

    // 使用黄金角度计算角度
    const theta = goldenAngle * i

    // 计算 x 和 z 坐标
    const x = Math.cos(theta) * radiusAtY
    const z = Math.sin(theta) * radiusAtY

    // 缩放到指定半径并添加到数组
    points.push([x * radius, y * radius, z * radius])
  }

  return points
}

/**
 * 在球面上随机分布点（可选方法）
 *
 * @param count 点的数量
 * @param radius 球体半径
 * @returns 点的3D坐标数组
 */
export function getRandomSpherePoints(
  count: number,
  radius: number
): Position3D[] {
  const points: Position3D[] = []

  for (let i = 0; i < count; i++) {
    // 使用球面坐标生成随机点
    const theta = Math.random() * Math.PI * 2 // 方位角 [0, 2π]
    const phi = Math.acos(2 * Math.random() - 1) // 极角 [0, π]

    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)

    points.push([x, y, z])
  }

  return points
}

/**
 * 生成螺旋星系的粒子位置
 *
 * @param particleCount 粒子数量
 * @param arms 螺旋臂数量
 * @param spread 扩散程度
 * @returns 粒子位置数组
 */
export function generateSpiralGalaxyPositions(
  particleCount: number,
  arms: number = 3,
  spread: number = 1
): Float32Array {
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3

    // 半径：从中心向外逐渐增大
    const radius = Math.random() * 4 * spread

    // 螺旋角度：半径越大，旋转越多
    const spinAngle = radius * 3

    // 分支角度：均匀分布在各个螺旋臂上
    const branchAngle = ((i % arms) / arms) * Math.PI * 2

    // 随机偏移（让粒子不完全在螺旋线上，更自然）
    const randomX = (Math.random() - 0.5) * 0.5 * spread
    const randomY = (Math.random() - 0.5) * 0.3 * spread
    const randomZ = (Math.random() - 0.5) * 0.5 * spread

    // 计算最终位置
    positions[i3] =
      Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = randomY
    positions[i3 + 2] =
      Math.sin(branchAngle + spinAngle) * radius + randomZ
  }

  return positions
}

/**
 * 生成星空背景的粒子位置
 *
 * @param particleCount 粒子数量
 * @param radius 分布范围半径
 * @returns 粒子位置数组
 */
export function generateStarFieldPositions(
  particleCount: number,
  radius: number = 50
): Float32Array {
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3

    // 在一个大球体内随机分布星星
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = radius * (0.5 + Math.random() * 0.5) // 50%-100% 的半径范围

    positions[i3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = r * Math.cos(phi)
  }

  return positions
}

/**
 * 计算两个3D点之间的距离
 */
export function distance3D(p1: Position3D, p2: Position3D): number {
  const dx = p1[0] - p2[0]
  const dy = p1[1] - p2[1]
  const dz = p1[2] - p2[2]
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

/**
 * 归一化3D向量
 */
export function normalize3D(v: Position3D): Position3D {
  const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
  if (length === 0) return [0, 0, 0]
  return [v[0] / length, v[1] / length, v[2] / length]
}
