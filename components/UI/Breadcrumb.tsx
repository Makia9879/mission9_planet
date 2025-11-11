'use client'

import { getCategoryById } from '@/lib/mockData'
import type { SceneLayer } from '@/lib/types'

interface BreadcrumbProps {
  layer: SceneLayer
  categoryId?: string | null
  onNavigateHome: () => void
}

/**
 * 面包屑导航组件
 * 显示当前位置并支持返回
 */
export default function Breadcrumb({
  layer,
  categoryId,
  onNavigateHome,
}: BreadcrumbProps) {
  const category = categoryId ? getCategoryById(categoryId) : null

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm">
          {/* 首页 */}
          <button
            onClick={onNavigateHome}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              layer === 'layer1'
                ? 'text-white bg-white/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="font-medium">星系浏览</span>
          </button>

          {/* 分隔符和当前分类 */}
          {layer === 'layer2' && category && (
            <>
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg text-white">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="font-medium">{category.name}</span>
              </div>
            </>
          )}
        </nav>

        {/* 提示信息 */}
        <div className="mt-2 text-xs text-gray-400">
          {layer === 'layer1'
            ? '点击星系探索 Dapps 项目'
            : '点击星球查看项目详情'}
        </div>
      </div>
    </div>
  )
}
