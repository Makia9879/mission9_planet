# 🌌 3D Galaxy Dapps Browser

An immersive 3D galaxy browser designed for exploring and showcasing Dapps ecosystems. Featuring a dual-layer galaxy architecture, it delivers a unique and interactive 3D experience.

![Demo Screenshot](./docs/screenshot.png)

## ✨ Features

- 🌟 **Dual-layer 3D Galaxy Structure**:  
  Layer 1 displays Dapp categories (galaxy clouds), while Layer 2 shows individual projects (planets)
- 🎨 **Immersive Visual Design**:  
  Spiral galaxies, glowing crystal planets, dynamic starfield backgrounds
- 🖱️ **Rich Interactions**:  
  Drag to rotate, scroll to zoom, hover highlights, auto-rotation
- 🎬 **Smooth Animations**:  
  Camera transitions for seamless depth switching
- 📱 **Responsive Design**:  
  Optimized for both desktop and mobile
- ⚡ **High-performance Rendering**:  
  Powered by Three.js and React Three Fiber

## 🚀 Getting Started

### Requirements

- Node.js 18.x or higher  
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mission9_planet.git
cd mission9_planet

# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev

# Open in browser:
# http://localhost:3000
```

### Build

```bash
# Production build
npm run build

# Start production server
npm run start
```

## 🎮 User Guide

### Layer 1: Galaxy Cloud Level

1. After loading, you will see multiple rotating spiral galaxies arranged in a spherical structure  
2. Each galaxy represents a Dapps category (wallet, DEX, LST, lending, NFT, etc.)
3. **Drag to Rotate**: Hold left mouse button and drag
4. **Scroll to Zoom**: Use the mouse wheel
5. **Hover to Highlight**: Hover to enlarge and reveal category name
6. **Click to Enter**: Click a galaxy to transition into Layer 2

### Layer 2: Planet Level

1. Inside Layer 2, you'll see glowing crystal planets placed in a spherical arrangement  
2. Each planet represents a Dapps project  
3. **Interactions**: Same as Layer 1 (drag, zoom, hover)  
4. **View Details**: Click a planet to open a modal showing:
   - Project name  
   - Description  
   - Website link  
   - TVL (Total Value Locked)  
5. **Go Back**: Use the breadcrumb at the top to return to Layer 1

### Keyboard Shortcuts

- `Esc`: Close modal  
- `Space`: Pause/resume auto-rotation (planned)

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D Engine**: Three.js
- **React Integration**: @react-three/fiber
- **3D Utility Library**: @react-three/drei
- **Animation**: GSAP
- **Language**: TypeScript
- **Styles**: Tailwind CSS

## 📁 Project Structure

```
mission9_planet/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Galaxy/            # Layer 1 components
│   ├── Planet/            # Layer 2 components
│   ├── UI/                # UI components
│   └── Effects/           # Visual effects
├── lib/                   
│   ├── mockData.ts        # Mock data
│   ├── sphereLayout.ts    # Sphere layout algorithm
│   ├── types.ts           # TypeScript types
│   └── constants.ts       # Global configs
├── hooks/                 
├── public/                
│   └── data/              # JSON data files
├── PLAN.md                
└── README.md
```

## 📊 Data Format

### Category Data (categories.json)

```json
{
  "categories": [
    {
      "id": "wallet",
      "name": "Wallet",
      "description": "Web3 wallet applications",
      "color": "#4ECDC4"
    }
  ]
}
```

### Project Data (projects.json)

```json
{
  "projects": [
    {
      "id": "metamask",
      "categoryId": "wallet",
      "name": "MetaMask",
      "description": "The most popular wallet in Web3",
      "website": "https://metamask.io",
      "tvl": "$5.2B",
      "logo": "/images/metamask.png"
    }
  ]
}
```

## 🎨 Customization

### Modify Theme Colors

Edit `lib/constants.ts`:

```typescript
export const COLORS = {
  wallet: '#4ECDC4',
  dex: '#FF6B6B',
  lst: '#95E1D3',
  // ...
}
```

### Animation Speed

```typescript
export const ANIMATION = {
  autoRotateSpeed: 0.1,
  hoverScale: 1.2,
  transitionDuration: 1.5
}
```

### Sphere Radius

```typescript
export const LAYOUT = {
  sphereRadius: 10,
  galaxySize: 1,
  planetSize: 0.8
}
```

## 🔧 Performance Optimization

### Desktop vs Mobile

- **Desktop**: Full particle effects (10,000 particles)  
- **Mobile**: Reduced particle effects (5,000 particles)  

### Manual Tweaks

```typescript
export const PERFORMANCE = {
  particleCount: 5000,
  enableShadows: false,
  pixelRatio: 1
}
```

## 🐛 Troubleshooting

### Issue: Blank Page / No 3D

Solutions:
1. Check WebGL support via https://get.webgl.org/  
2. Update GPU drivers  
3. Try Chrome or Firefox  

### Issue: Lag or Low FPS

Solutions:
1. Reduce particle count  
2. Close apps using GPU  
3. Reduce browser window size  

### Issue: Click Not Working

Solutions:
1. Ensure object is in view  
2. Check browser console  
3. Refresh the page  

## 📈 Roadmap

### v1.0 (Current)

- [x] Dual-layer galaxy system  
- [x] Full interaction support  
- [x] Mock data  

### v1.1 (Upcoming)

- [ ] Load from JSON  
- [ ] Search feature  
- [ ] Project filtering  

### v2.0 (Future)

- [ ] Real API integration (DeFi Llama)  
- [ ] Live data updates  
- [ ] Project comparison  
- [ ] User favorites  

### v3.0 (Vision)

- [ ] VR/AR support  
- [ ] Multi-language  
- [ ] Theme switching  
- [ ] Social sharing  

## 🤝 Contribution

1. Fork the repo  
2. Create a feature branch  
3. Commit changes  
4. Push to branch  
5. Open a Pull Request  

## 📄 License

MIT License — see `LICENSE` file.

## 🙏 Acknowledgments

- React Three Fiber  
- Drei  
- GSAP  
- Next.js  

## 📞 Contact

- Project: https://github.com/your-username/mission9_planet  
- Issues: https://github.com/your-username/mission9_planet/issues  
- Author: Your Name  

---

⭐ If you find this project useful, please give it a star!

