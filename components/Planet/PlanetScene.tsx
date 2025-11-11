'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { getProjectsByCategory } from '@/lib/mockData'
import { getFibonacciSpherePoints } from '@/lib/sphereLayout'
import { LAYOUT, CONTROLS, ANIMATION, LIGHTING } from '@/lib/constants'
import type { Project } from '@/lib/types'
import StarField from '../Effects/StarField'
import CrystalPlanet from './CrystalPlanet'

interface PlanetSceneProps {
  categoryId: string
  onSelectProject: (project: Project) => void
}

/**
 * 第二层场景：项目星球层级
 * 展示某个分类下的所有项目，每个项目用水晶球表示
 */
export default function PlanetScene({
  categoryId,
  onSelectProject,
}: PlanetSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const controlsRef = useRef<any>(null)
  const autoRotateRef = useRef(true)

  // 获取该分类下的所有项目
  const projects = useMemo(
    () => getProjectsByCategory(categoryId),
    [categoryId]
  )

  // 计算星球位置（球面均匀分布）
  const planetPositions = useMemo(() => {
    return getFibonacciSpherePoints(projects.length, LAYOUT.sphereRadius * 0.8)
  }, [projects.length])

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

      {/* 星球集群 */}
      <group ref={groupRef}>
        {projects.map((project, index) => (
          <CrystalPlanet
            key={project.id}
            position={planetPositions[index]}
            color={project.color || '#4ECDC4'}
            projectName={project.name}
            scale={LAYOUT.planetSize}
            onClick={() => onSelectProject(project)}
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
