'use client'

import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CAMERA, PERFORMANCE } from '@/lib/constants'
import type { SceneLayer, Project } from '@/lib/types'
import GalaxyScene from '@/components/Galaxy/GalaxyScene'
import PlanetScene from '@/components/Planet/PlanetScene'
import ProjectModal from '@/components/UI/ProjectModal'
import Breadcrumb from '@/components/UI/Breadcrumb'

/**
 * 主页面组件
 * 管理双层场景切换和状态
 */
export default function Home() {
  // 当前场景层级
  const [layer, setLayer] = useState<SceneLayer>('layer1')

  // 当前选中的分类ID
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  )

  // 当前选中的项目（用于模态窗口）
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // 处理分类选择（从第一层进入第二层）
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    setLayer('layer2')
  }

  // 处理返回首页（从第二层回到第一层）
  const handleNavigateHome = () => {
    if (layer === 'layer2') {
      setLayer('layer1')
      setSelectedCategoryId(null)
    }
  }

  // 处理项目选择（显示模态窗口）
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project)
  }

  // 关闭模态窗口
  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  return (
    <main className="w-full h-screen overflow-hidden bg-gradient-space">
      {/* 面包屑导航 */}
      <Breadcrumb
        layer={layer}
        categoryId={selectedCategoryId}
        onNavigateHome={handleNavigateHome}
      />

      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: CAMERA.defaultPosition,
          fov: CAMERA.fov,
          near: CAMERA.near,
          far: CAMERA.far,
        }}
        dpr={[1, Math.min(PERFORMANCE.maxPixelRatio, window.devicePixelRatio)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {layer === 'layer1' ? (
            <GalaxyScene onSelectCategory={handleSelectCategory} />
          ) : (
            selectedCategoryId && (
              <PlanetScene
                categoryId={selectedCategoryId}
                onSelectProject={handleSelectProject}
              />
            )
          )}
        </Suspense>
      </Canvas>

      {/* 项目详情模态窗口 */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleCloseModal} />
      )}

      {/* 加载提示 */}
      <div className="fixed bottom-6 right-6 text-gray-500 text-xs pointer-events-none">
        <div className="glass-effect px-3 py-2 rounded-lg">
          <p>拖拽旋转 · 滚轮缩放</p>
        </div>
      </div>
    </main>
  )
}
