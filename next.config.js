/** @type {import('next').NextConfig} */
const nextConfig = {
  // 关闭严格模式以避免 Three.js 重复渲染
  reactStrictMode: false,
  // 优化生产构建
  swcMinify: true,
  // 图片配置（如果后续需要外部图片）
  images: {
    domains: [],
  },
}

module.exports = nextConfig
