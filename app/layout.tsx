import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '3D星系 Dapps 浏览器',
  description: '沉浸式3D星系浏览器，探索 Web3 Dapps 生态',
  keywords: ['Web3', 'Dapps', '3D', '星系', 'DeFi', 'NFT'],
  authors: [{ name: 'Mission9 Team' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
