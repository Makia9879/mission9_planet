'use client'

import { useEffect } from 'react'
import type { Project } from '@/lib/types'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

/**
 * 项目详情模态窗口
 * 显示项目的详细信息
 */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // 按 ESC 键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // 阻止点击模态内容时关闭
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-lg w-full mx-4 animate-scale-in"
        onClick={handleContentClick}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 内容 */}
        <div className="p-8">
          {/* 项目名称 */}
          <h2 className="text-3xl font-bold text-white mb-2">{project.name}</h2>

          {/* TVL */}
          <div className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg px-4 py-1 mb-6">
            <span className="text-blue-300 text-sm font-semibold">
              TVL: {project.tvl}
            </span>
          </div>

          {/* 项目描述 */}
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* 标签 */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/10 hover:bg-white/20 transition-colors text-gray-300 text-xs px-3 py-1 rounded-full border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 官网链接 */}
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <span>访问官网</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
