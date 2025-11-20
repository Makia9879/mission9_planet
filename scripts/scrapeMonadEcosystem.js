/**
 * Monad Ecosystem Data Scraper
 *
 * 此脚本从 Monad 生态系统网站抓取项目数据并保存为 JSON 格式
 * 使用方法: node scripts/scrapeMonadEcosystem.js
 */

const fs = require('fs');
const path = require('path');

// 从浏览器抓取到的原始数据
const rawProjects = [
  {
    "name": "0x",
    "description": "0x allows you to embed swaps in any onchain app. Tap into aggregated liquidity from 130+ sources, best prices & optimal trade execution.",
    "projectType": "Infra",
    "tags": ["Dev Tooling", "Other Infra"],
    "website": "https://0x.org/",
    "twitter": "https://x.com/0xProject"
  },
  {
    "name": "AUSD",
    "description": "Agora is a stablecoin issuer of AUSD, backed 1:1 by cash and cash equivalent reserves managed by VanEck and custodied by State Street.",
    "projectType": "App/Infra",
    "tags": ["DeFi", "RWA", "Payments"],
    "website": "https://agora.finance/",
    "twitter": "https://x.com/withAUSD"
  },
  {
    "name": "AZEx",
    "description": "Your A-Z DeFi Hub in One Click. Trade any asset as margin with 100x leverage. Multi-Chain Protocol. AI-Powered Copytrading.",
    "projectType": "App",
    "tags": ["DeFi"],
    "website": "https://azex.io/home",
    "twitter": "https://x.com/azex_io"
  },
  {
    "name": "Aarna",
    "description": "Next-generation DeFi asset management platform via crypto structured products, merging AI and tokenization.",
    "projectType": "App",
    "tags": ["DeFi", "AI"],
    "website": "https://www.aarna.ai/",
    "twitter": "https://x.com/aarnasays"
  },
  {
    "name": "Accountable",
    "description": "YieldApp is the first yield marketplace backed by live, cryptographically verifiable data users can trust.",
    "projectType": "App",
    "tags": ["DeFi", "RWA"],
    "website": "https://yield.accountable.capital/",
    "twitter": "https://x.com/AccountableData"
  },
  {
    "name": "Across Protocol",
    "description": "Across is the first intent-based crosschain bridge protocol. It's fast, cheap, and secure. Powering $30B+ in volume for 4M+ users.",
    "projectType": "Infra",
    "tags": ["Cross-Chain"],
    "website": "https://across.to/",
    "twitter": "https://x.com/AcrossProtocol"
  },
  {
    "name": "Ambient",
    "description": "Spot AMM with combining multiple liquidity types with modular hooks, dynamic fees and MEV protection.",
    "projectType": "App",
    "tags": ["DeFi"],
    "website": "https://monad.ambient.finance/",
    "twitter": "https://x.com/ambient_finance"
  },
  {
    "name": "Balancer",
    "description": "Balancer is a decentralized automated market maker (AMM) protocol built on Ethereum.",
    "projectType": "App",
    "tags": ["DeFi"],
    "website": "https://balancer.fi/",
    "twitter": "https://x.com/Balancer"
  },
  {
    "name": "Bebop",
    "description": "Seamless and efficient crypto trading for everyone. Web3 trading app and API that finds the best route for all your trades.",
    "projectType": "App",
    "tags": ["DeFi"],
    "website": "https://bebop.xyz/",
    "twitter": "https://x.com/bebop_dex/"
  },
  {
    "name": "Birdeye",
    "description": "The all-in-one trading data tool for alpha traders: real-time charts, smart money flows, gems & historical data across 300+ exchanges.",
    "projectType": "App",
    "tags": ["DeFi"],
    "website": "https://birdeye.so/",
    "twitter": "https://x.com/birdeye_so"
  },
  {
    "name": "Ambire Wallet",
    "description": "Еasy and secure self-custody for smart accounts, EOAs, and hardware wallets. EIP-7702 ready wallet.",
    "projectType": "Infra",
    "tags": ["Wallet"],
    "website": "https://www.ambire.com/",
    "twitter": "https://x.com/ambirewallet"
  },
  {
    "name": "Backpack Wallet",
    "description": "Backpack is a next-level wallet and exchange. Buy tokens, trade futures, and explore on-chain apps—seamlessly and securely.",
    "projectType": "Infra",
    "tags": ["Wallet"],
    "website": "https://backpack.app/",
    "twitter": "https://x.com/Backpack"
  },
  {
    "name": "Atomic Wallet",
    "description": "Manage, exchange, and stake 1000+ assets securely on desktop & mobile.",
    "projectType": "Infra",
    "tags": ["Wallet"],
    "website": "https://atomicwallet.io/",
    "twitter": "https://x.com/atomicwallet"
  },
  {
    "name": "Bitget Wallet",
    "description": "Bitget Wallet is a non-custodial wallet with advanced multi-chain capabilities and a powerful swap function.",
    "projectType": "Infra",
    "tags": ["Wallet"],
    "website": "https://web3.bitget.com/en?source=bitget",
    "twitter": ""
  },
  {
    "name": "Coin98 AI Wallet",
    "description": "Crypto Messenger & AI Wallet. Everyone's Gateway to The Open Internet.",
    "projectType": "Infra",
    "tags": ["AI", "Wallet"],
    "website": "https://coin98.com/",
    "twitter": "https://x.com/coin98_wallet"
  },
  {
    "name": "Bybit Web3 Wallet",
    "description": "Bybit Web3 is your gateway to Web3. Explore DeFi offerings, and trade thousands of tokens across various networks.",
    "projectType": "Infra",
    "tags": ["Wallet"],
    "website": "https://www.bybit.com/en/web3",
    "twitter": "https://x.com/Bybit_Web3"
  },
  {
    "name": "FoxWallet",
    "description": "Leading multi-chain mobile and extension wallet solution that seamlessly integrates with major blockchains.",
    "projectType": "Infra",
    "tags": ["Wallet"],
    "website": "https://twitter.com/FoxWallet",
    "twitter": ""
  },
  {
    "name": "Apriori",
    "description": "aPriori is an MEV infrastructure and liquid staking protocol, designed for the parallel execution era and natively built on Monad.",
    "projectType": "App",
    "tags": ["DeFi"],
    "website": "http://testnet-staking.apr.io/",
    "twitter": "https://x.com/apriori"
  },
  {
    "name": "Bima",
    "description": "BIMA is a DeFi platform that lets you earn yield on your BTC across multiple chains by using USBD, a Bitcoin-backed stablecoin.",
    "projectType": "App",
    "tags": ["DeFi"],
    "website": "https://bima.money/",
    "twitter": "https://x.com/bimabtc"
  },
  {
    "name": "Covenant",
    "description": "Lever up your favorite token, or earn yield, through liquid, tradeable debt markets.",
    "projectType": "App",
    "tags": ["DeFi"],
    "website": "https://covenant.finance/",
    "twitter": "https://x.com/covenantFi"
  },
  {
    "name": "CoNFT",
    "description": "coNFT.app-NFT aggregator where users can create/trade NFT and register web3 domains.120k MAU. 1M+ mints. 70k+ web3 registrations.",
    "projectType": "App",
    "tags": ["NFT"],
    "website": "https://conft.app/",
    "twitter": "https://x.com/ConftApp"
  },
  {
    "name": "Blocklive",
    "description": "Blocklive is a platform for end-to-end onchain event management and ticketing, using proof of history to target and reward fans.",
    "projectType": "App",
    "tags": ["NFT", "RWA", "Social"],
    "website": "https://blocklive.io/",
    "twitter": "https://x.com/blocklive_/"
  },
  {
    "name": "Cult Markets",
    "description": "Gamified omnichain NFT marketplace powering dynamic drops, collectibles, and interactive shard-based campaigns.",
    "projectType": "App",
    "tags": ["NFT", "Social", "Gaming"],
    "website": "https://testnet.cultmarkets.com/",
    "twitter": "https://x.com/cultmarkets"
  },
  {
    "name": "Demask Finance",
    "description": "Demask Finance is an on-chain AMM protocol that enables trading between NFT collectibles and native tokens.",
    "projectType": "App",
    "tags": ["NFT", "DeFi"],
    "website": "https://demask.finance/",
    "twitter": "https://x.com/demaskfinance"
  },
  {
    "name": "Gifted.art",
    "description": "Gifted.art is a email delivery platform.",
    "projectType": "App",
    "tags": ["NFT", "RWA", "Social"],
    "website": "https://gifted.art/",
    "twitter": "https://x.com/gifteddotart"
  },
  {
    "name": "Band Protocol",
    "description": "Band Protocol is a cross-chain data oracle platform that aggregates and connects real-world data and APIs to smart contracts.",
    "projectType": "Infra",
    "tags": ["Oracle"],
    "website": "https://www.bandprotocol.com/",
    "twitter": "https://x.com/BandProtocol"
  },
  {
    "name": "Chainlink",
    "description": "Chainlink is the standard for onchain finance, verifiable data, and cross-chain interoperability.",
    "projectType": "Infra",
    "tags": ["Cross-Chain", "Oracle"],
    "website": "https://chain.link/",
    "twitter": "https://x.com/chainlink"
  },
  {
    "name": "Chronicle",
    "description": "Decentralized, verifiable oracles. Chronicle connects product builders to realtime data & custom verification.",
    "projectType": "Infra",
    "tags": ["Oracle", "Dev Tooling"],
    "website": "https://chroniclelabs.org/",
    "twitter": "https://x.com/ChronicleLabs"
  },
  {
    "name": "EOracle",
    "description": "eOracle provides decentralized price feeds through a cryptoeconomically secure oracle network.",
    "projectType": "Infra",
    "tags": ["Oracle"],
    "website": "https://www.eoracle.io/",
    "twitter": "https://x.com/eoracle_network"
  },
  {
    "name": "Chainsight",
    "description": "Chainsight redefines oracles with no-code tools, lowering costs, reducing single-operator risks, and driving scalable, open innovation.",
    "projectType": "Infra",
    "tags": ["Indexer", "Oracle", "Analytics"],
    "website": "https://chainsight.network/",
    "twitter": "https://x.com/Chainsight_"
  },
  {
    "name": "Breath of Estova",
    "description": "Breath of Estova is a play-to-earn 2D action-based MMORPG where classic nostalgia meets a vast open world.",
    "projectType": "App",
    "tags": ["Gaming"],
    "website": "https://www.breathofestova.com/",
    "twitter": "https://x.com/BreathOfEstova"
  },
  {
    "name": "Catton AI",
    "description": "Catton AI, backed by Forj & Ape Accelerator, leads AI NPC gaming on Telegram with 900K users and 300k holders.",
    "projectType": "App",
    "tags": ["AI", "Gaming"],
    "website": "https://catton.ai/",
    "twitter": "https://x.com/Cattontw"
  },
  {
    "name": "DRKVRS",
    "description": "DRKVRS is a Web3 Multiplayer Action RPG game with innovative mechanics, set in a dystopian and brutalist world.",
    "projectType": "App",
    "tags": ["Gaming", "AI", "NFT"],
    "website": "https://www.drkvrs.io/",
    "twitter": "https://x.com/drkvrs"
  },
  {
    "name": "Alchemy",
    "description": "Alchemy's end-to-end platform gives devs everything to build and scale web3 apps - from APIs to monitoring, across multiple chains.",
    "projectType": "Infra",
    "tags": ["Dev Tooling", "RPC", "Indexer"],
    "website": "https://alchemy.com/",
    "twitter": "https://x.com/Alchemy"
  },
  {
    "name": "Gelato",
    "description": "Gelato Web3 Services bring enhanced UX to Monad's high-speed L1, enabling devs build automated apps with gasless transactions & VRF.",
    "projectType": "Infra",
    "tags": ["Account Abstraction", "RPC"],
    "website": "https://www.gelato.network/",
    "twitter": "https://x.com/gelatonetwork"
  },
  {
    "name": "Dune",
    "description": "Dune is the leading data platform for onchain data, empowering users to query, visualize, and build across 90+ blockchains.",
    "projectType": "Infra",
    "tags": ["Analytics", "Dev Tooling"],
    "website": "http://dune.com/home",
    "twitter": "https://x.com/Dune"
  },
  {
    "name": "Envio",
    "description": "Envio is a modern, multi-chain EVM blockchain indexer for querying real-time and historical data.",
    "projectType": "Infra",
    "tags": ["Indexer", "Dev Tooling", "Analytics"],
    "website": "https://envio.dev/",
    "twitter": "https://x.com/envio_indexer"
  },
  {
    "name": "Codex",
    "description": "The Codex API provides fast and accurate enriched data, meticulously structured to easily plug straight into your application.",
    "projectType": "Infra",
    "tags": ["Indexer", "Dev Tooling", "Analytics"],
    "website": "https://www.codex.io/",
    "twitter": "https://x.com/trycodex"
  },
  {
    "name": "Allium",
    "description": "Allium delivers blockchain data for analytics, applications, and accounting use cases via dashboards, APIs, datashares, and data streams.",
    "projectType": "Infra",
    "tags": ["Analytics", "Indexer", "Dev Tooling"],
    "website": "https://www.allium.so/",
    "twitter": "https://x.com/AlliumLabs"
  },
  {
    "name": "Birdeye Data Services",
    "description": "High-performance onchain data provider with real-time, accurate data across tokens, wallets & protocols.",
    "projectType": "Infra",
    "tags": ["Indexer", "Analytics", "Cross-Chain"],
    "website": "https://bds.birdeye.so/",
    "twitter": "https://x.com/birdeye_data"
  }
];

// 颜色映射 - 根据分类分配颜色
const categoryColors = {
  'DeFi': '#FF6B6B',
  'Wallet': '#4ECDC4',
  'NFT': '#A8E6CF',
  'Oracle': '#FFE66D',
  'Gaming': '#95E1D3',
  'Infra': '#6C5CE7',
  'Analytics': '#FD79A8',
  'Cross-Chain': '#FDCB6E'
};

// 分类映射规则
function categorizeProject(project) {
  // 基于标签和项目类型确定主分类
  if (project.tags.includes('Wallet')) return 'Wallet';
  if (project.tags.includes('NFT')) return 'NFT';
  if (project.tags.includes('Oracle')) return 'Oracle';
  if (project.tags.includes('Gaming')) return 'Gaming';
  if (project.tags.includes('Analytics') || project.tags.includes('Indexer')) return 'Analytics';
  if (project.tags.includes('Cross-Chain')) return 'Cross-Chain';
  if (project.tags.includes('DeFi')) return 'DeFi';
  if (project.projectType === 'Infra' || project.projectType === 'App/Infra') return 'Infra';

  return 'DeFi'; // 默认分类
}

// 按分类分组项目
function groupProjectsByCategory(projects) {
  const grouped = {};

  projects.forEach(project => {
    const category = categorizeProject(project);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(project);
  });

  return grouped;
}

// 转换为目标格式
function convertToTargetFormat(groupedProjects, maxPerCategory = 10) {
  const categories = [];
  const projects = [];

  let categoryIndex = 0;

  Object.entries(groupedProjects).forEach(([categoryName, categoryProjects]) => {
    const categoryId = categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-');

    // 添加分类
    categories.push({
      id: categoryId,
      name: categoryName,
      description: `${categoryName} projects on Monad`,
      color: categoryColors[categoryName] || '#95E1D3'
    });

    // 只取每个分类的前N个项目
    const selectedProjects = categoryProjects.slice(0, maxPerCategory);

    selectedProjects.forEach((project, index) => {
      projects.push({
        id: project.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        categoryId: categoryId,
        name: project.name,
        description: project.description,
        website: project.website,
        tvl: 'N/A', // Monad 生态系统数据中没有 TVL
        tags: project.tags,
        logo: undefined,
        color: undefined
      });
    });

    categoryIndex++;
  });

  return { categories, projects };
}

// 主函数
function main() {
  console.log('开始处理 Monad 生态系统数据...');
  console.log(`原始项目总数: ${rawProjects.length}`);

  // 分组
  const grouped = groupProjectsByCategory(rawProjects);

  console.log('\n按分类统计:');
  Object.entries(grouped).forEach(([category, projects]) => {
    console.log(`  ${category}: ${projects.length} 个项目`);
  });

  // 转换格式
  const result = convertToTargetFormat(grouped, 10);

  console.log(`\n最终输出:`);
  console.log(`  分类数: ${result.categories.length}`);
  console.log(`  项目数: ${result.projects.length}`);

  // 保存到文件
  const outputPath = path.join(__dirname, '../public/data/monad-ecosystem.json');
  const outputDir = path.dirname(outputPath);

  // 确保目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    outputPath,
    JSON.stringify(result, null, 2),
    'utf-8'
  );

  console.log(`\n✅ 数据已保存到: ${outputPath}`);

  // 同时保存详细统计
  const statsPath = path.join(__dirname, '../public/data/monad-stats.json');
  const stats = {
    totalCategories: result.categories.length,
    totalProjects: result.projects.length,
    categoriesBreakdown: Object.entries(grouped).map(([category, projects]) => ({
      category,
      count: projects.length,
      selected: Math.min(projects.length, 10)
    })),
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    statsPath,
    JSON.stringify(stats, null, 2),
    'utf-8'
  );

  console.log(`📊 统计数据已保存到: ${statsPath}`);
}

// 运行
if (require.main === module) {
  main();
}

module.exports = { categorizeProject, groupProjectsByCategory, convertToTargetFormat };
