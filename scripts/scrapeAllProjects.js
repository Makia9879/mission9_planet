/**
 * 完整的 Monad 生态系统数据爬虫
 * 使用 puppeteer 抓取所有 252+ 项目
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 颜色映射
const categoryColors = {
  'DeFi': '#FF6B6B',
  'Wallet': '#4ECDC4',
  'NFT': '#A8E6CF',
  'Oracle': '#FFE66D',
  'Gaming': '#95E1D3',
  'Infra': '#6C5CE7',
  'Analytics': '#FD79A8',
  'Cross-Chain': '#FDCB6E',
  'AI': '#A29BFE',
  'Social': '#FF7675',
  'Payments': '#00B894',
  'RWA': '#FDCB6E',
};

// 分类映射规则
function categorizeProject(project) {
  const { tags, projectType } = project;

  // 优先级顺序
  if (tags.includes('Wallet')) return 'Wallet';
  if (tags.includes('NFT')) return 'NFT';
  if (tags.includes('Oracle')) return 'Oracle';
  if (tags.includes('Gaming')) return 'Gaming';
  if (tags.includes('AI') && !tags.includes('DeFi')) return 'AI';
  if (tags.includes('Social') && !tags.includes('DeFi') && !tags.includes('NFT')) return 'Social';
  if (tags.includes('Payments')) return 'Payments';
  if (tags.includes('RWA') && !tags.includes('DeFi')) return 'RWA';
  if (tags.includes('Analytics') || tags.includes('Indexer')) return 'Analytics';
  if (tags.includes('Cross-Chain') && !tags.includes('Oracle')) return 'Cross-Chain';
  if (tags.includes('DeFi')) return 'DeFi';
  if (projectType === 'Infra' || projectType === 'App/Infra' || tags.some(t => t.includes('Infra'))) return 'Infra';

  return 'DeFi'; // 默认
}

async function scrapeAllProjects() {
  console.log('🚀 启动 Puppeteer 浏览器...');

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--proxy-server=http://127.0.0.1:7890',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('🌐 访问 Monad 生态系统页面...');
  await page.goto('https://www.monad.xyz/ecosystem', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  console.log('📜 滚动加载所有内容...');

  // 持续滚动直到没有新内容
  await page.evaluate(async () => {
    return new Promise((resolve) => {
      let lastHeight = document.body.scrollHeight;
      let attempts = 0;
      const maxAttempts = 30;

      const scrollInterval = setInterval(() => {
        window.scrollTo(0, document.body.scrollHeight);
        attempts++;

        setTimeout(() => {
          const newHeight = document.body.scrollHeight;
          if (newHeight === lastHeight || attempts >= maxAttempts) {
            clearInterval(scrollInterval);
            window.scrollTo(0, 0);
            setTimeout(() => resolve(), 1000);
          } else {
            lastHeight = newHeight;
          }
        }, 1000);
      }, 1500);
    });
  });

  console.log('📊 提取项目数据...');

  // 提取所有项目数据
  const rawProjects = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.ecosystem_directory-item.w-dyn-item'));

    return cards.map(card => {
      try {
        const nameEl = card.querySelector('.u-text-medium.u-line-clamp-1.u-weight-medium');
        const name = nameEl ? nameEl.textContent.trim() : '';

        const descEl = card.querySelector('.u-text-small.u-color-secondary.u-line-clamp-3');
        const description = descEl ? descEl.textContent.trim() : '';

        const typeEl = card.querySelector('.ecosystem_item-project-type');
        const projectType = typeEl ? typeEl.textContent.trim() : '';

        const tagEls = card.querySelectorAll('.ecosystem_item-tag .u-text-xsmall');
        const tags = Array.from(tagEls).map(el => el.textContent.trim());

        const websiteEl = card.querySelector('a[href*="http"]:not([href*="x.com"])');
        const website = websiteEl ? websiteEl.href : '';

        const twitterEl = card.querySelector('a[href*="x.com"]');
        const twitter = twitterEl ? twitterEl.href : '';

        return {
          name,
          description,
          projectType,
          tags,
          website,
          twitter
        };
      } catch (e) {
        return null;
      }
    }).filter(p => p && p.name);
  });

  await browser.close();

  console.log(`✅ 成功提取 ${rawProjects.length} 个项目`);

  return rawProjects;
}

function processData(rawProjects) {
  console.log('\n🔄 处理和分类数据...');

  // 按分类分组
  const grouped = {};
  rawProjects.forEach(project => {
    const category = categorizeProject(project);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(project);
  });

  console.log('\n📈 分类统计:');
  Object.entries(grouped).forEach(([category, projects]) => {
    console.log(`  ${category}: ${projects.length} 个项目`);
  });

  // 转换为目标格式
  const categories = [];
  const projects = [];

  Object.entries(grouped).forEach(([categoryName, categoryProjects]) => {
    const categoryId = categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-');

    // 添加分类
    categories.push({
      id: categoryId,
      name: categoryName,
      description: `${categoryName} projects on Monad`,
      color: categoryColors[categoryName] || '#95E1D3'
    });

    // 添加所有项目（不限制数量）
    categoryProjects.forEach(project => {
      projects.push({
        id: project.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        categoryId: categoryId,
        name: project.name,
        description: project.description,
        website: project.website,
        tvl: 'N/A',
        tags: project.tags,
      });
    });
  });

  return { categories, projects };
}

async function main() {
  try {
    console.log('=' .repeat(60));
    console.log('🌟 Monad 生态系统完整数据爬虫');
    console.log('=' .repeat(60));

    // 抓取数据
    const rawProjects = await scrapeAllProjects();

    // 处理数据
    const { categories, projects } = processData(rawProjects);

    console.log(`\n📦 最终输出:`);
    console.log(`  分类数: ${categories.length}`);
    console.log(`  项目数: ${projects.length}`);

    // 保存数据
    const outputDir = path.join(__dirname, '../public/data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, 'monad-ecosystem.json');
    fs.writeFileSync(
      outputPath,
      JSON.stringify({ categories, projects }, null, 2),
      'utf-8'
    );

    console.log(`\n✅ 数据已保存到: ${outputPath}`);

    // 保存统计信息
    const statsPath = path.join(outputDir, 'monad-stats.json');
    const stats = {
      totalCategories: categories.length,
      totalProjects: projects.length,
      categoriesBreakdown: categories.map(cat => ({
        category: cat.name,
        id: cat.id,
        count: projects.filter(p => p.categoryId === cat.id).length
      })),
      generatedAt: new Date().toISOString()
    };

    fs.writeFileSync(
      statsPath,
      JSON.stringify(stats, null, 2),
      'utf-8'
    );

    console.log(`📊 统计数据已保存到: ${statsPath}`);

    console.log('\n' + '=' .repeat(60));
    console.log('🎉 数据抓取完成！');
    console.log('=' .repeat(60));

  } catch (error) {
    console.error('❌ 错误:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { scrapeAllProjects, processData };
