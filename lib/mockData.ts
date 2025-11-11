import type { Category, Project } from './types'
import { COLORS } from './constants'

// Dapps 分类数据
export const categories: Category[] = [
  {
    id: 'wallet',
    name: '钱包',
    description: 'Web3 数字钱包与资产管理工具',
    color: COLORS.categories.wallet,
  },
  {
    id: 'dex',
    name: 'DEX',
    description: '去中心化交易所',
    color: COLORS.categories.dex,
  },
  {
    id: 'lst',
    name: 'LST',
    description: '流动性质押代币协议',
    color: COLORS.categories.lst,
  },
  {
    id: 'lending',
    name: '借贷',
    description: 'DeFi 借贷与收益协议',
    color: COLORS.categories.lending,
  },
  {
    id: 'nft',
    name: 'NFT',
    description: 'NFT 市场与平台',
    color: COLORS.categories.nft,
  },
]

// Dapps 项目数据
export const projects: Project[] = [
  // 钱包类
  {
    id: 'metamask',
    categoryId: 'wallet',
    name: 'MetaMask',
    description: '全球最受欢迎的 Web3 钱包，支持以太坊及兼容链',
    website: 'https://metamask.io',
    tvl: '$5.2B',
    tags: ['Browser Extension', 'Mobile'],
  },
  {
    id: 'phantom',
    categoryId: 'wallet',
    name: 'Phantom',
    description: 'Solana 生态领先的加密钱包',
    website: 'https://phantom.app',
    tvl: '$2.8B',
    tags: ['Browser Extension', 'Mobile', 'Solana'],
  },
  {
    id: 'trustwallet',
    categoryId: 'wallet',
    name: 'Trust Wallet',
    description: '币安官方多链钱包',
    website: 'https://trustwallet.com',
    tvl: '$3.5B',
    tags: ['Mobile', 'Multi-chain'],
  },
  {
    id: 'rabby',
    categoryId: 'wallet',
    name: 'Rabby Wallet',
    description: '为 DeFi 用户设计的多链钱包',
    website: 'https://rabby.io',
    tvl: '$1.2B',
    tags: ['Browser Extension', 'DeFi'],
  },

  // DEX 类
  {
    id: 'uniswap',
    categoryId: 'dex',
    name: 'Uniswap',
    description: '以太坊上最大的去中心化交易所',
    website: 'https://uniswap.org',
    tvl: '$4.8B',
    tags: ['AMM', 'Ethereum'],
  },
  {
    id: 'pancakeswap',
    categoryId: 'dex',
    name: 'PancakeSwap',
    description: 'BNB Chain 最大的 DEX',
    website: 'https://pancakeswap.finance',
    tvl: '$2.1B',
    tags: ['AMM', 'BSC'],
  },
  {
    id: 'curve',
    categoryId: 'dex',
    name: 'Curve Finance',
    description: '稳定币交易专用的 DEX',
    website: 'https://curve.fi',
    tvl: '$3.2B',
    tags: ['Stablecoins', 'Low Slippage'],
  },
  {
    id: 'sushiswap',
    categoryId: 'dex',
    name: 'SushiSwap',
    description: '社区驱动的多链 DEX',
    website: 'https://sushi.com',
    tvl: '$1.5B',
    tags: ['AMM', 'Multi-chain'],
  },
  {
    id: 'balancer',
    categoryId: 'dex',
    name: 'Balancer',
    description: '自动化做市商和资产管理协议',
    website: 'https://balancer.fi',
    tvl: '$1.8B',
    tags: ['AMM', 'Portfolio Management'],
  },

  // LST 类
  {
    id: 'lido',
    categoryId: 'lst',
    name: 'Lido',
    description: '最大的流动性质押协议',
    website: 'https://lido.fi',
    tvl: '$24.5B',
    tags: ['Ethereum', 'Staking'],
  },
  {
    id: 'rocketpool',
    categoryId: 'lst',
    name: 'Rocket Pool',
    description: '去中心化的以太坊质押协议',
    website: 'https://rocketpool.net',
    tvl: '$3.8B',
    tags: ['Ethereum', 'Decentralized'],
  },
  {
    id: 'frax',
    categoryId: 'lst',
    name: 'Frax Finance',
    description: '部分抵押的稳定币和质押协议',
    website: 'https://frax.finance',
    tvl: '$1.2B',
    tags: ['Stablecoin', 'Staking'],
  },

  // 借贷类
  {
    id: 'aave',
    categoryId: 'lending',
    name: 'Aave',
    description: '领先的去中心化借贷协议',
    website: 'https://aave.com',
    tvl: '$6.5B',
    tags: ['Lending', 'Multi-chain'],
  },
  {
    id: 'compound',
    categoryId: 'lending',
    name: 'Compound',
    description: '自主运行的货币市场协议',
    website: 'https://compound.finance',
    tvl: '$2.8B',
    tags: ['Lending', 'Ethereum'],
  },
  {
    id: 'makerdao',
    categoryId: 'lending',
    name: 'MakerDAO',
    description: 'DAI 稳定币的发行者',
    website: 'https://makerdao.com',
    tvl: '$5.3B',
    tags: ['Stablecoin', 'Collateral'],
  },
  {
    id: 'justlend',
    categoryId: 'lending',
    name: 'JustLend',
    description: 'TRON 生态的借贷协议',
    website: 'https://justlend.org',
    tvl: '$1.9B',
    tags: ['TRON', 'Lending'],
  },

  // NFT 类
  {
    id: 'opensea',
    categoryId: 'nft',
    name: 'OpenSea',
    description: '最大的 NFT 交易市场',
    website: 'https://opensea.io',
    tvl: '$3.5B',
    tags: ['Marketplace', 'Multi-chain'],
  },
  {
    id: 'blur',
    categoryId: 'nft',
    name: 'Blur',
    description: '专业 NFT 交易者平台',
    website: 'https://blur.io',
    tvl: '$2.1B',
    tags: ['Marketplace', 'Pro Trading'],
  },
  {
    id: 'magiceden',
    categoryId: 'nft',
    name: 'Magic Eden',
    description: 'Solana 领先的 NFT 市场',
    website: 'https://magiceden.io',
    tvl: '$1.6B',
    tags: ['Marketplace', 'Solana'],
  },
  {
    id: 'rarible',
    categoryId: 'nft',
    name: 'Rarible',
    description: '社区治理的 NFT 市场',
    website: 'https://rarible.com',
    tvl: '$890M',
    tags: ['Marketplace', 'DAO'],
  },
]

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
