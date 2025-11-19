import type { Position3D } from './types'

/**
 * 使用改进的 Fibonacci 球面分布算法在球面上均匀分布点
 *
 * @param count 点的数量
 * @param radius 球体半径
 * @returns 点的3D坐标数组
 *
 * 算法原理：
 * 1. 使用黄金角度（Golden Angle）约137.5度确保角度均匀
 * 2. 使用改进的纬度分布公式，确保点在球面上的面积密度均匀
 * 3. 添加偏移量避免极点聚集
 * 这种方法是目前最优的球面均匀分布算法之一
 */
export function getFibonacciSpherePoints(
  count: number,
  radius: number
): Position3D[] {
  const points: Position3D[] = []

  // 处理特殊情况
  if (count <= 0) return points
  if (count === 1) {
    return [[0, radius, 0]]
  }

  // 黄金角度（弧度）≈ 2.39996323
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))

  // 添加偏移量以改善均匀性
  const offset = 2.0 / count

  for (let i = 0; i < count; i++) {
    // 改进的纬度分布：使用更均匀的间距
    // 从 -1 + offset/2 到 1 - offset/2，避免极点过度聚集
    const y = ((i * offset) - 1) + (offset / 2)

    // 计算该高度处的圆半径
    const radiusAtY = Math.sqrt(1 - y * y)

    // 使用黄金角度计算经度角度
    const theta = goldenAngle * i

    // 计算 x 和 z 坐标（球面坐标转换）
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

/**
 * 计算一组点的最小距离（用于验证均匀性）
 * 距离越接近，分布越均匀
 */
export function getMinimumDistance(points: Position3D[]): number {
  if (points.length < 2) return Infinity

  let minDistance = Infinity

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dist = distance3D(points[i], points[j])
      if (dist < minDistance) {
        minDistance = dist
      }
    }
  }

  return minDistance
}

/**
 * 计算一组点的平均最近邻距离（用于验证均匀性）
 */
export function getAverageNearestNeighborDistance(points: Position3D[]): number {
  if (points.length < 2) return 0

  let totalDistance = 0

  for (let i = 0; i < points.length; i++) {
    let nearestDistance = Infinity

    for (let j = 0; j < points.length; j++) {
      if (i === j) continue
      const dist = distance3D(points[i], points[j])
      if (dist < nearestDistance) {
        nearestDistance = dist
      }
    }

    totalDistance += nearestDistance
  }

  return totalDistance / points.length
}

/**
 * 使用 Thomson 问题优化球面点分布（可选的更高级算法）
 * 通过模拟电荷排斥来获得最均匀的分布
 * 注意：这个算法计算量较大，适合少量点（< 100）
 *
 * @param initialPoints 初始点位置
 * @param iterations 迭代次数
 * @param stepSize 步长
 * @returns 优化后的点位置
 */
export function optimizeSphereDistribution(
  initialPoints: Position3D[],
  iterations: number = 100,
  stepSize: number = 0.1
): Position3D[] {
  const points = initialPoints.map(p => [...p] as Position3D)
  const count = points.length

  if (count <= 1) return points

  for (let iter = 0; iter < iterations; iter++) {
    // 对每个点计算受到的排斥力
    for (let i = 0; i < count; i++) {
      let forceX = 0
      let forceY = 0
      let forceZ = 0

      // 计算其他点对当前点的排斥力
      for (let j = 0; j < count; j++) {
        if (i === j) continue

        const dx = points[i][0] - points[j][0]
        const dy = points[i][1] - points[j][1]
        const dz = points[i][2] - points[j][2]
        const distSq = dx * dx + dy * dy + dz * dz
        const dist = Math.sqrt(distSq)

        if (dist > 0) {
          // 库仑力：F = k / r^2
          const force = 1.0 / distSq
          forceX += (dx / dist) * force
          forceY += (dy / dist) * force
          forceZ += (dz / dist) * force
        }
      }

      // 应用力并移动点
      points[i][0] += forceX * stepSize
      points[i][1] += forceY * stepSize
      points[i][2] += forceZ * stepSize

      // 重新投影到球面上
      const [nx, ny, nz] = normalize3D(points[i])
      const radius = Math.sqrt(
        initialPoints[i][0] ** 2 +
        initialPoints[i][1] ** 2 +
        initialPoints[i][2] ** 2
      )
      points[i][0] = nx * radius
      points[i][1] = ny * radius
      points[i][2] = nz * radius
    }

    // 逐渐减小步长
    stepSize *= 0.99
  }

  return points
}
