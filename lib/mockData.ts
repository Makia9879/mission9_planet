import type { Category, Project } from './types'
import ecosystemData from '../public/data/monad-ecosystem.json'

// 从 JSON 文件导入 Monad 生态系统数据
export const categories: Category[] = ecosystemData.categories as Category[]
export const projects: Project[] = ecosystemData.projects as Project[]

// 根据分类ID获取项目列表
export function getProjectsByCategory(categoryId: string): Project[] {
  return projects.filter((project) => project.categoryId === categoryId)
}

// 根据ID获取分类
export function getCategoryById(categoryId: string): Category | undefined {
  return categories.find((cat) => cat.id === categoryId)
}

// 根据ID获取项目
export function getProjectById(projectId: string): Project | undefined {
  return projects.find((proj) => proj.id === projectId)
}

// 获取所有分类的统计信息
export function getCategoryStats() {
  return categories.map((category) => ({
    ...category,
    projectCount: projects.filter((p) => p.categoryId === category.id).length,
  }))
}
