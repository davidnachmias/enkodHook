// Art style genres and game art styles - 12 diverse options
export const ART_STYLES = [
  { 
    id: 'realistic', 
    name: 'Photorealistic', 
    description: 'Highly detailed, lifelike images with realistic lighting and textures'
  },
  { 
    id: 'impressionist', 
    name: 'Impressionist', 
    description: 'Soft, dreamy brushstrokes with emphasis on light and color over detail'
  },
  { 
    id: 'cyberpunk', 
    name: 'Cyberpunk', 
    description: 'Futuristic neon-lit cityscapes with high-tech, low-life aesthetics'
  },
  { 
    id: 'fantasy', 
    name: 'Fantasy Art', 
    description: 'Magical worlds with mythical creatures, enchanted forests, and epic landscapes'
  },
  { 
    id: 'anime', 
    name: 'Anime/Manga', 
    description: 'Japanese animation style with distinctive character designs and vibrant colors'
  },
  { 
    id: 'steampunk', 
    name: 'Steampunk', 
    description: 'Victorian-era aesthetics with brass, copper, and steam-powered machinery'
  },
  { 
    id: 'abstract', 
    name: 'Abstract', 
    description: 'Non-representational art focusing on shapes, colors, and emotional expression'
  },
  { 
    id: 'pixel-art', 
    name: 'Pixel Art', 
    description: 'Retro gaming style with blocky, pixelated graphics and limited color palettes'
  },
  { 
    id: 'watercolor', 
    name: 'Watercolor', 
    description: 'Soft, flowing paint effects with transparent washes and organic blending'
  },
  { 
    id: 'low-poly', 
    name: 'Low Poly', 
    description: 'Geometric 3D style with flat-shaded polygons and minimalist design'
  },
  { 
    id: 'vintage', 
    name: 'Vintage/Retro', 
    description: 'Classic 1950s-1970s aesthetics with warm tones and nostalgic elements'
  },
  { 
    id: 'gothic', 
    name: 'Gothic', 
    description: 'Dark, dramatic style with ornate details, shadows, and medieval influences'
  }
];

// Color palettes for style changes
export const COLOR_PALETTES = [
  { 
    id: 'warm', 
    name: 'Warm Sunset', 
    description: 'Warm oranges, reds, and yellows',
    colors: ['#FF6B6B', '#FF8E53', '#FFE66D', '#FFB347', '#FFA07A']
  },
  { 
    id: 'cool', 
    name: 'Ocean Breeze', 
    description: 'Cool blues, teals, and purples',
    colors: ['#4ECDC4', '#45B7D1', '#96CEB4', '#1E3A8A', '#0EA5E9']
  },
  { 
    id: 'monochrome', 
    name: 'Classic Mono', 
    description: 'Elegant black, white, and grays',
    colors: ['#2C3E50', '#7F8C8D', '#BDC3C7', '#ECF0F1', '#95A5A6']
  },
  { 
    id: 'pastel', 
    name: 'Soft Pastels', 
    description: 'Gentle, light pastel colors',
    colors: ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFE4E1', '#E6E6FA']
  },
  { 
    id: 'vibrant', 
    name: 'Bold Vibrant', 
    description: 'Bright, energetic colors',
    colors: ['#FF1744', '#00E676', '#2196F3', '#FF9800', '#9C27B0']
  }
];

// Available sections/pages for Text to Game UI
export const SECTIONS = {
  HOME: 'Home',
  GENERATOR: 'Generator',
  LIBRARY: 'Library',
  PROJECTS: 'Projects',
  DOCS: 'Docs'
};

// Default configuration for UI generation
export const DEFAULT_CONFIG = {
  // AI Provider settings
  provider: 'openai',
  model: 'dall-e-3',
  size: '1024x1024',
  quality: 'standard',
  style: 'vivid',
  negative_prompt: '',
  
  // UI Generation settings
  uiType: 'Menu',
  mode: 'In-Game Overlay',
  interaction: 'Static',
  showPlaceholder: false,
  wireframe: false,
  quantity: 1,
  resolution: '600x606',
  aspectRatio: '1:1 (Square)',
  
  // Generation parameters
  variants: 'Variants',
  
  // Credits
  credits: 12
};

// AI Providers configuration
export const AI_PROVIDERS = {
  openai: {
    name: 'OpenAI',
    models: ['dall-e-3', 'dall-e-2'],
    sizes: {
      'dall-e-3': ['1024x1024', '1792x1024', '1024x1792'],
      'dall-e-2': ['256x256', '512x512', '1024x1024']
    },
    quality: ['standard', 'hd'],
    styles: ['vivid', 'natural']
  },
  huggingface: {
    name: 'Hugging Face',
    models: ['stabilityai/stable-diffusion-2-1', 'runwayml/stable-diffusion-v1-5'],
    sizes: ['512x512', '768x768', '1024x1024'],
    quality: ['standard'],
    styles: ['vivid']
  },
  stability: {
    name: 'Stability AI',
    models: ['stable-diffusion-xl-1024-v1-0'],
    sizes: ['1024x1024', '1152x896', '896x1152'],
    quality: ['standard'],
    styles: ['vivid']
  }
};

// UI Types for game interface generation
export const UI_TYPES = [
  { value: 'Menu', label: 'Menu' },
  { value: 'Character Stats Panel', label: 'Character Stats Panel' },
  { value: 'Inventory', label: 'Inventory' },
  { value: 'Settings', label: 'Settings' },
  { value: 'HUD', label: 'HUD' },
  { value: 'Dialog Box', label: 'Dialog Box' },
  { value: 'Loading Screen', label: 'Loading Screen' },
  { value: 'Achievement', label: 'Achievement' }
];

// UI Styles for generation
export const UI_STYLES = [
  { value: 'Cartoon', label: 'Cartoon' },
  { value: 'Realistic', label: 'Realistic' },
  { value: 'Pixel Art', label: 'Pixel Art' },
  { value: 'Minimal', label: 'Minimal' },
  { value: 'Sci-Fi', label: 'Sci-Fi' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Retro', label: 'Retro' },
  { value: 'Modern', label: 'Modern' }
];

// UI Modes for generation
export const UI_MODES = [
  { value: 'In-Game Overlay', label: 'In-Game Overlay' },
  { value: 'Full Screen', label: 'Full Screen' },
  { value: 'Modal', label: 'Modal' },
  { value: 'Side Panel', label: 'Side Panel' },
  { value: 'Pop-up', label: 'Pop-up' }
];

// UI Interaction types
export const UI_INTERACTIONS = [
  { value: 'Static', label: 'Static' },
  { value: 'Interactive', label: 'Interactive' },
  { value: 'Animated', label: 'Animated' },
  { value: 'Responsive', label: 'Responsive' }
];

// Aspect ratios for UI generation
export const ASPECT_RATIOS = [
  { value: '1:1 (Square)', label: '1:1 (Square)' },
  { value: '16:9 (Widescreen)', label: '16:9 (Widescreen)' },
  { value: '9:16 (Mobile)', label: '9:16 (Mobile)' },
  { value: '4:3 (Standard)', label: '4:3 (Standard)' },
  { value: '3:2 (Photo)', label: '3:2 (Photo)' },
  { value: '21:9 (Ultrawide)', label: '21:9 (Ultrawide)' }
]; 