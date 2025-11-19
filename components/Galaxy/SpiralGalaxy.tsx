'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { generateSpiralGalaxyPositions } from '@/lib/sphereLayout'
import { getParticleCount, ANIMATION, MATERIAL } from '@/lib/constants'
import type { Position3D } from '@/lib/types'

interface SpiralGalaxyProps {
  position: Position3D
  color: string
  categoryName: string
  scale?: number
  onClick: () => void
  hideLabel?: boolean
}

/**
 * 螺旋星系组件
 * 使用粒子系统创建旋转的螺旋星系效果
 */
export default function SpiralGalaxy({
  position,
  color,
  categoryName,
  scale = 1,
  onClick,
  hideLabel = false,
}: SpiralGalaxyProps) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const [hovered, setHovered] = useState(false)

  // 生成螺旋星系粒子位置
  const positions = useMemo(() => {
    const count = getParticleCount('galaxy')
    return generateSpiralGalaxyPositions(count, 3, 1)
  }, [])

  // 动画：持续旋转星系（绕Y轴旋转，保持黄道面横着）
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * ANIMATION.particleRotateSpeed
    }

    // 悬停时粒子闪烁效果
    if (pointsRef.current && hovered) {
      const material = pointsRef.current.material as THREE.PointsMaterial
      material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 3) * 0.2
    }
  })

  // 当前缩放（悬停时放大）
  const currentScale = hovered ? scale * ANIMATION.hoverScale : scale

  return (
    <group
      position={position}
      scale={currentScale}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <group ref={groupRef}>
        {/* 粒子系统 */}
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            color={color}
            sizeAttenuation
            transparent
            opacity={0.8}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* 中心发光球体 */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* 外层光晕 */}
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered ? 0.3 : 0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 常驻显示标签 */}
      {!hideLabel && (
        <Html
          center
          transform={false}
          sprite
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            className={`backdrop-blur-md rounded-lg border shadow-xl transition-all duration-300 ${
              hovered
                ? 'bg-black/95 border-white/50'
                : 'bg-black/70 border-white/20'
            }`}
            style={{
              padding: '8px 12px',
            }}
          >
            <p
              className="text-white font-bold whitespace-nowrap tracking-wide"
              style={{
                fontSize: '16px',
                lineHeight: '1.2',
              }}
            >
              {categoryName}
            </p>
          </div>
        </Html>
      )}
    </group>
  )
}
