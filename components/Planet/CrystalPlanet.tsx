'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { ANIMATION } from '@/lib/constants'
import type { Position3D } from '@/lib/types'
import type { PlanetPreset } from '@/lib/planetPresets'

interface CrystalPlanetProps {
  position: Position3D
  projectName: string
  scale?: number
  onClick: () => void
  preset: PlanetPreset
  hideLabel?: boolean
}

/**
 * 水晶球组件
 * 半透明发光的星球，代表具体的 Dapp 项目
 * 支持多种预设渲染风格
 */
export default function CrystalPlanet({
  position,
  projectName,
  scale = 1,
  onClick,
  preset,
  hideLabel = false,
}: CrystalPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // 动画：缓慢旋转 + 悬停脉动
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
      meshRef.current.rotation.x += delta * 0.1

      // 悬停时的脉动效果
      if (hovered) {
        const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05
        meshRef.current.scale.setScalar(pulseScale)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }

    // 光晕脉动
    if (glowRef.current) {
      const glowPulse = hovered
        ? 1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1
        : 1
      glowRef.current.scale.setScalar(glowPulse)
    }
  })

  const currentScale = hovered ? scale * ANIMATION.hoverScale : scale
  const emissiveIntensity = hovered
    ? preset.emissive.hoverIntensity
    : preset.emissive.intensity
  const glowOpacity = hovered ? preset.glow.hoverOpacity : preset.glow.opacity
  const pointLightIntensity = hovered
    ? preset.pointLight.hoverIntensity
    : preset.pointLight.intensity

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
      {/* 主水晶球 */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color={preset.primaryColor}
          transmission={preset.material.transmission}
          thickness={preset.material.thickness}
          roughness={preset.material.roughness}
          metalness={preset.material.metalness || 0}
          ior={preset.material.ior}
          emissive={preset.primaryColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={0.95}
          envMapIntensity={1}
          clearcoat={preset.material.clearcoat || 1}
          clearcoatRoughness={preset.material.clearcoatRoughness || 0.1}
        />
      </mesh>

      {/* 外层光晕 */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[preset.glow.scale, 24, 24]} />
        <meshBasicMaterial
          color={preset.secondaryColor || preset.primaryColor}
          transparent
          opacity={glowOpacity}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 内核光点 */}
      <pointLight
        color={preset.secondaryColor || preset.primaryColor}
        intensity={pointLightIntensity}
        distance={preset.pointLight.distance}
        decay={2}
      />

      {/* 常驻显示项目名称 */}
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
          <p
            className={`font-bold whitespace-nowrap tracking-wide transition-all duration-300 ${
              hovered ? 'text-white' : 'text-white/90'
            }`}
            style={{
              fontSize: '16px',
              lineHeight: '1.2',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            }}
          >
            {projectName}
          </p>
        </Html>
      )}
    </group>
  )
}
