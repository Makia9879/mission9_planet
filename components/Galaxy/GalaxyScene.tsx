'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { categories } from '@/lib/mockData'
import { getFibonacciSpherePoints, optimizeSphereDistribution } from '@/lib/sphereLayout'
import { LAYOUT, CONTROLS, ANIMATION, LIGHTING } from '@/lib/constants'
import StarField from '../Effects/StarField'
import SpiralGalaxy from './SpiralGalaxy'

interface GalaxySceneProps {
  onSelectCategory: (categoryId: string) => void
  hideLabels?: boolean
}

/**
 * 第一层场景：星系云层级
 * 展示所有 Dapp 分类，每个分类用螺旋星系表示
 */
export default function GalaxyScene({
  onSelectCategory,
  hideLabels = false,
}: GalaxySceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const controlsRef = useRef<any>(null)
  const autoRotateRef = useRef(true)

  // 计算星系位置（球面均匀分布 + Thomson 优化）
  const galaxyPositions = useMemo(() => {
    const initialPoints = getFibonacciSpherePoints(categories.length, LAYOUT.sphereRadius)
    // 使用 Thomson 问题优化，迭代50次获得更均匀的分布
    return optimizeSphereDistribution(initialPoints, 50, 0.1)
  }, [])

  // 自动旋转逻辑
  useFrame((state, delta) => {
    if (groupRef.current && autoRotateRef.current) {
      groupRef.current.rotation.y += delta * ANIMATION.autoRotateSpeed
    }
  })

  // 检测用户交互，暂停自动旋转
  const handleControlsChange = () => {
    if (controlsRef.current) {
      autoRotateRef.current = false
      // 2秒后恢复自动旋转
      setTimeout(() => {
        autoRotateRef.current = true
      }, 2000)
    }
  }

  return (
    <>
      {/* 光照 */}
      <ambientLight
        intensity={LIGHTING.ambientLightIntensity}
        color={LIGHTING.ambientLightColor}
      />
      <directionalLight
        position={LIGHTING.directionalLightPosition}
        intensity={LIGHTING.directionalLightIntensity}
      />

      {/* 背景星空 */}
      <StarField />

      {/* 星系集群 */}
      <group ref={groupRef}>
        {categories.map((category, index) => (
          <SpiralGalaxy
            key={category.id}
            position={galaxyPositions[index]}
            color={category.color}
            categoryName={category.name}
            scale={LAYOUT.galaxySize}
            onClick={() => onSelectCategory(category.id)}
            hideLabel={hideLabels}
          />
        ))}
      </group>

      {/* 轨道控制器 */}
      <OrbitControls
        ref={controlsRef}
        enableDamping={CONTROLS.enableDamping}
        dampingFactor={CONTROLS.dampingFactor}
        rotateSpeed={CONTROLS.rotateSpeed}
        zoomSpeed={CONTROLS.zoomSpeed}
        minDistance={CONTROLS.minDistance}
        maxDistance={CONTROLS.maxDistance}
        enablePan={CONTROLS.enablePan}
        onChange={handleControlsChange}
      />
    </>
  )
}
