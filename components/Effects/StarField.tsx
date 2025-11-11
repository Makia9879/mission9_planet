'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { generateStarFieldPositions } from '@/lib/sphereLayout'
import { getParticleCount, COLORS } from '@/lib/constants'

/**
 * 背景星空组件
 * 创建大量小粒子模拟星空背景，带有缓慢漂移动画
 */
export default function StarField() {
  const pointsRef = useRef<THREE.Points>(null)

  // 生成星星位置（仅生成一次）
  const { positions, colors } = useMemo(() => {
    const count = getParticleCount('starField')
    const positions = generateStarFieldPositions(count, 50)

    // 为每个星星生成随机颜色（白色到淡蓝色）
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // 90% 白色，10% 淡蓝色
      if (Math.random() > 0.9) {
        colors[i3] = 0.8
        colors[i3 + 1] = 0.9
        colors[i3 + 2] = 1.0
      } else {
        colors[i3] = 1.0
        colors[i3 + 1] = 1.0
        colors[i3 + 2] = 1.0
      }
    }

    return { positions, colors }
  }, [])

  // 缓慢旋转星空营造深度感
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.01
      pointsRef.current.rotation.x += delta * 0.005
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  )
}
