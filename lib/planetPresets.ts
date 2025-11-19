/**
 * 星球渲染预设配置
 * 定义了多种不同风格的星球外观
 */

export interface PlanetPreset {
  type: string
  name: string
  // 主色调
  primaryColor: string
  // 次色调（用于光晕等）
  secondaryColor?: string
  // 材质参数
  material: {
    transmission: number        // 透明度传输
    thickness: number           // 厚度
    roughness: number           // 粗糙度
    metalness?: number          // 金属度
    ior: number                 // 折射率
    clearcoat?: number          // 清漆层
    clearcoatRoughness?: number // 清漆粗糙度
  }
  // 发光参数
  emissive: {
    intensity: number           // 发光强度
    hoverIntensity: number      // 悬停时发光强度
  }
  // 光晕参数
  glow: {
    opacity: number             // 光晕透明度
    hoverOpacity: number        // 悬停时光晕透明度
    scale: number               // 光晕缩放
  }
  // 点光源参数
  pointLight: {
    intensity: number           // 光源强度
    hoverIntensity: number      // 悬停时光源强度
    distance: number            // 光源距离
  }
}

/**
 * 预设星球类型
 */
export const PLANET_PRESETS: PlanetPreset[] = [
  // 1. 水晶型 - 透明发光，科技感
  {
    type: 'crystal',
    name: '水晶星球',
    primaryColor: '#4ECDC4',
    secondaryColor: '#6EE7DE',
    material: {
      transmission: 0.9,
      thickness: 0.5,
      roughness: 0.1,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    },
    emissive: {
      intensity: 0.5,
      hoverIntensity: 1.2,
    },
    glow: {
      opacity: 0.12,
      hoverOpacity: 0.25,
      scale: 1.3,
    },
    pointLight: {
      intensity: 1.5,
      hoverIntensity: 3,
      distance: 5,
    },
  },

  // 2. 熔岩型 - 炽热火红，能量感
  {
    type: 'lava',
    name: '熔岩星球',
    primaryColor: '#FF4500',
    secondaryColor: '#FFD700',
    material: {
      transmission: 0.3,
      thickness: 1.2,
      roughness: 0.4,
      metalness: 0.2,
      ior: 2.0,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
    },
    emissive: {
      intensity: 1.2,
      hoverIntensity: 2.0,
    },
    glow: {
      opacity: 0.25,
      hoverOpacity: 0.4,
      scale: 1.4,
    },
    pointLight: {
      intensity: 3,
      hoverIntensity: 5,
      distance: 6,
    },
  },

  // 3. 冰冻型 - 冰蓝透彻，寒冷感
  {
    type: 'ice',
    name: '冰冻星球',
    primaryColor: '#00CED1',
    secondaryColor: '#B0E0E6',
    material: {
      transmission: 0.85,
      thickness: 0.3,
      roughness: 0.05,
      ior: 1.31,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    },
    emissive: {
      intensity: 0.3,
      hoverIntensity: 0.8,
    },
    glow: {
      opacity: 0.15,
      hoverOpacity: 0.3,
      scale: 1.25,
    },
    pointLight: {
      intensity: 2,
      hoverIntensity: 4,
      distance: 5,
    },
  },

  // 4. 能量型 - 紫色电光，神秘感
  {
    type: 'energy',
    name: '能量星球',
    primaryColor: '#9D4EDD',
    secondaryColor: '#E0AAFF',
    material: {
      transmission: 0.6,
      thickness: 0.8,
      roughness: 0.2,
      metalness: 0.1,
      ior: 1.8,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
    },
    emissive: {
      intensity: 0.9,
      hoverIntensity: 1.8,
    },
    glow: {
      opacity: 0.2,
      hoverOpacity: 0.35,
      scale: 1.35,
    },
    pointLight: {
      intensity: 2.5,
      hoverIntensity: 4.5,
      distance: 5.5,
    },
  },

  // 5. 气态型 - 梦幻粉紫，飘渺感
  {
    type: 'gas',
    name: '气态星球',
    primaryColor: '#FF6B9D',
    secondaryColor: '#FFC6D9',
    material: {
      transmission: 0.95,
      thickness: 0.2,
      roughness: 0.3,
      ior: 1.2,
      clearcoat: 0.3,
      clearcoatRoughness: 0.4,
    },
    emissive: {
      intensity: 0.4,
      hoverIntensity: 1.0,
    },
    glow: {
      opacity: 0.18,
      hoverOpacity: 0.32,
      scale: 1.5,
    },
    pointLight: {
      intensity: 1.2,
      hoverIntensity: 2.5,
      distance: 6,
    },
  },

  // 6. 金属型 - 金银色泽，科幻感
  {
    type: 'metal',
    name: '金属星球',
    primaryColor: '#C0C0C0',
    secondaryColor: '#FFD700',
    material: {
      transmission: 0.1,
      thickness: 2.0,
      roughness: 0.2,
      metalness: 0.9,
      ior: 2.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    },
    emissive: {
      intensity: 0.6,
      hoverIntensity: 1.4,
    },
    glow: {
      opacity: 0.1,
      hoverOpacity: 0.22,
      scale: 1.2,
    },
    pointLight: {
      intensity: 1.8,
      hoverIntensity: 3.5,
      distance: 5,
    },
  },

  // 7. 翡翠型 - 翠绿宝石，生机感
  {
    type: 'jade',
    name: '翡翠星球',
    primaryColor: '#50C878',
    secondaryColor: '#90EE90',
    material: {
      transmission: 0.7,
      thickness: 0.6,
      roughness: 0.15,
      ior: 1.6,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
    },
    emissive: {
      intensity: 0.5,
      hoverIntensity: 1.1,
    },
    glow: {
      opacity: 0.14,
      hoverOpacity: 0.28,
      scale: 1.28,
    },
    pointLight: {
      intensity: 1.6,
      hoverIntensity: 3.2,
      distance: 5,
    },
  },

  // 8. 琥珀型 - 温暖橙黄，古典感
  {
    type: 'amber',
    name: '琥珀星球',
    primaryColor: '#FFBF00',
    secondaryColor: '#FFD700',
    material: {
      transmission: 0.8,
      thickness: 0.7,
      roughness: 0.12,
      ior: 1.55,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12,
    },
    emissive: {
      intensity: 0.7,
      hoverIntensity: 1.3,
    },
    glow: {
      opacity: 0.16,
      hoverOpacity: 0.3,
      scale: 1.32,
    },
    pointLight: {
      intensity: 2,
      hoverIntensity: 3.8,
      distance: 5.2,
    },
  },

  // 9. 深海型 - 深蓝神秘，海洋感
  {
    type: 'ocean',
    name: '深海星球',
    primaryColor: '#003366',
    secondaryColor: '#0077BE',
    material: {
      transmission: 0.88,
      thickness: 0.4,
      roughness: 0.08,
      ior: 1.33,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    },
    emissive: {
      intensity: 0.4,
      hoverIntensity: 0.9,
    },
    glow: {
      opacity: 0.13,
      hoverOpacity: 0.26,
      scale: 1.27,
    },
    pointLight: {
      intensity: 1.4,
      hoverIntensity: 2.8,
      distance: 5,
    },
  },

  // 10. 星云型 - 多彩渐变，梦幻感
  {
    type: 'nebula',
    name: '星云星球',
    primaryColor: '#FF69B4',
    secondaryColor: '#9370DB',
    material: {
      transmission: 0.92,
      thickness: 0.25,
      roughness: 0.25,
      ior: 1.4,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
    },
    emissive: {
      intensity: 0.8,
      hoverIntensity: 1.6,
    },
    glow: {
      opacity: 0.22,
      hoverOpacity: 0.38,
      scale: 1.45,
    },
    pointLight: {
      intensity: 2.2,
      hoverIntensity: 4.2,
      distance: 5.8,
    },
  },
]

/**
 * 根据索引获取预设（循环使用）
 */
export const getPresetByIndex = (index: number): PlanetPreset => {
  return PLANET_PRESETS[index % PLANET_PRESETS.length]
}

/**
 * 随机获取一个预设
 */
export const getRandomPreset = (): PlanetPreset => {
  return PLANET_PRESETS[Math.floor(Math.random() * PLANET_PRESETS.length)]
}

/**
 * 根据类型获取预设
 */
export const getPresetByType = (type: string): PlanetPreset | undefined => {
  return PLANET_PRESETS.find((preset) => preset.type === type)
}

/**
 * 为一组项目分配预设（确保相邻的星球类型不同）
 */
export const assignPresetsToProjects = (count: number): PlanetPreset[] => {
  const result: PlanetPreset[] = []
  const availablePresets = [...PLANET_PRESETS]

  for (let i = 0; i < count; i++) {
    // 如果用完了所有预设，重新填充可用列表
    if (availablePresets.length === 0) {
      availablePresets.push(...PLANET_PRESETS)
    }

    // 随机选择一个预设
    const randomIndex = Math.floor(Math.random() * availablePresets.length)
    const selectedPreset = availablePresets[randomIndex]

    // 从可用列表中移除，避免连续重复
    availablePresets.splice(randomIndex, 1)

    result.push(selectedPreset)
  }

  return result
}
