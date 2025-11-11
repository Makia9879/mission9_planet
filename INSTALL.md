# 安装指南

## 前置要求

- Node.js 18.x 或更高版本
- npm (随 Node.js 一起安装)

## 安装步骤

### 1. 修复 npm 缓存权限问题

由于项目初始化时遇到了 npm 缓存权限问题，你需要先修复权限：

```bash
sudo chown -R $(id -u):$(id -g) "$HOME/.npm"
```

或者使用具体的用户ID（根据错误信息）：

```bash
sudo chown -R 501:20 "/Users/makia/.npm"
```

### 2. 清理 npm 缓存（可选）

如果权限修复后仍有问题，可以清理缓存：

```bash
npm cache clean --force
```

### 3. 安装依赖

在项目根目录运行：

```bash
npm install
```

这将安装所有必要的依赖包：
- next (14.2.15)
- react (18.3.1)
- react-dom (18.3.1)
- three (0.169.0)
- @react-three/fiber (8.17.10)
- @react-three/drei (9.114.3)
- gsap (3.12.5)
- TypeScript 和相关类型定义
- Tailwind CSS

### 4. 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

### 5. 在浏览器中打开

打开浏览器访问：http://localhost:3000

## 故障排除

### 问题1: npm 权限错误

**错误信息**: `EACCES: permission denied` 或 `Your cache folder contains root-owned files`

**解决方案**:
```bash
sudo chown -R $(id -u):$(id -g) "$HOME/.npm"
npm cache clean --force
npm install
```

### 问题2: 端口已被占用

**错误信息**: `Port 3000 is already in use`

**解决方案**:
- 方案1: 停止占用3000端口的进程
- 方案2: 使用其他端口
  ```bash
  npm run dev -- -p 3001
  ```

### 问题3: Three.js 或 React Three Fiber 错误

**错误信息**: `Cannot find module 'three'` 或相关错误

**解决方案**:
确保所有依赖都正确安装：
```bash
rm -rf node_modules package-lock.json
npm install
```

### 问题4: TypeScript 错误

**错误信息**: `Cannot find name...` 或类型错误

**解决方案**:
确保 TypeScript 配置正确：
```bash
npm install --save-dev typescript @types/react @types/node @types/three
```

### 问题5: 浏览器显示空白页面

**原因**: WebGL 不支持或被禁用

**解决方案**:
1. 检查浏览器是否支持 WebGL: https://get.webgl.org/
2. 更新显卡驱动
3. 尝试使用 Chrome 或 Firefox 浏览器
4. 检查浏览器控制台是否有错误信息

### 问题6: 性能卡顿

**解决方案**:
1. 检查是否有其他占用GPU的应用
2. 降低粒子数量（编辑 `lib/constants.ts`）：
   ```typescript
   export const PERFORMANCE = {
     desktopParticleCount: 5000,  // 降低数量
     mobileParticleCount: 2500,
     // ...
   }
   ```
3. 降低浏览器窗口大小
4. 关闭浏览器开发者工具

## 生产构建

### 构建项目

```bash
npm run build
```

### 启动生产服务器

```bash
npm run start
```

### 验证构建

生产构建后，访问 http://localhost:3000 确保一切正常。

## 使用 pnpm 或 yarn（可选）

如果你更喜欢使用 pnpm 或 yarn:

### 使用 pnpm

```bash
# 安装 pnpm
npm install -g pnpm

# 安装依赖
pnpm install

# 运行开发服务器
pnpm dev
```

### 使用 yarn

```bash
# 安装 yarn
npm install -g yarn

# 安装依赖
yarn install

# 运行开发服务器
yarn dev
```

## 环境变量（可选）

如果需要配置环境变量，创建 `.env.local` 文件：

```env
# 自定义端口（可选）
PORT=3000

# Node 环境
NODE_ENV=development
```

## 开发提示

1. **热重载**: 修改代码后会自动刷新浏览器
2. **TypeScript 检查**: 运行 `npm run lint` 检查代码
3. **格式化代码**: 建议安装 Prettier 扩展
4. **浏览器兼容性**: 建议使用最新版本的 Chrome、Firefox 或 Safari

## 下一步

项目启动成功后，你可以：

1. 查看 `PLAN.md` 了解项目架构
2. 查看 `README.md` 了解使用指南
3. 编辑 `lib/mockData.ts` 修改数据
4. 编辑 `lib/constants.ts` 调整视觉效果

## 技术支持

如果遇到问题：
1. 检查 Node.js 版本: `node -v` (应该 >= 18.0.0)
2. 检查 npm 版本: `npm -v` (应该 >= 9.0.0)
3. 查看浏览器控制台错误信息
4. 查看终端错误信息

祝你使用愉快！🚀
