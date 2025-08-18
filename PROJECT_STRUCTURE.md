# enKod Hook - Project Structure

## Overview
This document outlines the organized and optimized structure of the enKod Hook AI image generation application.

## Directory Structure

```
src/
├── components/           # React components
│   ├── Canvas/          # Canvas-related components (organized)
│   │   ├── Canvas.jsx
│   │   ├── CanvasToolbar.jsx
│   │   ├── CanvasImage.jsx
│   │   ├── CanvasEditingOverlay.jsx
│   │   ├── CanvasBottomToolbar.jsx
│   │   └── index.js
│   ├── ControlPanel.jsx
│   ├── Sidebar.jsx
│   └── ui/              # Reusable UI components
│       ├── Button.jsx
│       ├── Textarea.jsx
│       └── Select.jsx
├── constants/           # Application constants
│   └── artStyles.js    # Art styles, color palettes, AI providers config
├── hooks/              # Custom React hooks
│   ├── useImageGeneration.js
│   ├── useCanvasInteraction.js
│   └── useImageEditing.js
├── integrations/       # External API integrations
│   └── Core.js
├── layouts/           # Layout components
│   ├── Layout.jsx
│   └── Header.jsx
├── pages/             # Page components
│   └── GeneratorPage.jsx
├── utils/             # Utility functions
│   ├── colorUtils.js  # Color manipulation and processing
│   └── imageUtils.js  # Image processing utilities
├── App.jsx
└── main.jsx
```

## Key Improvements

### 1. **Separation of Concerns**
- **GeneratorPage.jsx**: Reduced from 1316 lines to ~400 lines
- **Canvas.jsx**: Split into 5 focused components
- **ControlPanel.jsx**: Cleaner with constants imported

### 2. **Custom Hooks**
- **useImageGeneration**: Handles all image generation logic
- **useCanvasInteraction**: Manages zoom, drag, and canvas interactions
- **useImageEditing**: Handles crop, rotate, and style editing

### 3. **Utility Functions**
- **colorUtils.js**: All color manipulation algorithms (HSV, RGB, blending, etc.)
- **imageUtils.js**: Image processing functions (crop, rotate, download, etc.)

### 4. **Constants**
- **artStyles.js**: Centralized configuration for art styles, color palettes, and AI providers

### 5. **Component Organization**
- **Canvas/**: Modular canvas components for better maintainability
- **ui/**: Reusable UI components
- **layouts/**: Layout and navigation components

## Component Architecture

### Canvas Components
```
Canvas/
├── Canvas.jsx              # Main canvas container
├── CanvasToolbar.jsx       # Top toolbar (zoom, navigation, actions)
├── CanvasImage.jsx         # Image display and states
├── CanvasEditingOverlay.jsx # Editing overlays (crop, style, rotate)
├── CanvasBottomToolbar.jsx # Bottom toolbar (edit buttons)
└── index.js               # Clean exports
```

### Custom Hooks
- **useImageGeneration**: State management for image generation, history, and navigation
- **useCanvasInteraction**: Zoom, drag, and canvas positioning logic
- **useImageEditing**: Image editing operations and state management

### Utility Functions
- **colorUtils.js**: Advanced color processing algorithms
  - HSV/RGB conversion
  - Luminance calculation
  - Color distance and similarity
  - Background color extraction
  - Gradient-aware color mapping
  - Edge detection and blending

- **imageUtils.js**: Image processing utilities
  - Crop, rotate, download, share
  - Canvas operations
  - Blob URL management
  - Thumbnail generation

## Benefits of New Structure

### 1. **Maintainability**
- Smaller, focused components
- Clear separation of concerns
- Easy to locate and modify specific functionality

### 2. **Reusability**
- Custom hooks can be reused across components
- Utility functions are modular and testable
- Constants are centralized and consistent

### 3. **Performance**
- Optimized re-renders with custom hooks
- Efficient state management
- Reduced bundle size through better organization

### 4. **Scalability**
- Easy to add new features
- Clear patterns for new components
- Backend integration ready

### 5. **Developer Experience**
- Better code navigation
- Clearer component responsibilities
- Easier debugging and testing

## Usage Examples

### Using Custom Hooks
```javascript
import { useImageGeneration } from '../hooks/useImageGeneration';

function MyComponent() {
  const {
    isLoading,
    currentImage,
    generateImage,
    navigateImages
  } = useImageGeneration();
  
  // Component logic
}
```

### Using Utility Functions
```javascript
import { cropImage, downloadImage } from '../utils/imageUtils';
import { extractDominantGradientColors } from '../utils/colorUtils';

// Image processing
const croppedUrl = await cropImage(imageUrl, cropArea);
downloadImage(imageUrl, 'my-image.png');

// Color processing
const dominantColors = extractDominantGradientColors(imageData, width, height);
```

### Using Constants
```javascript
import { ART_STYLES, COLOR_PALETTES, AI_PROVIDERS } from '../constants/artStyles';

// Access predefined configurations
const availableStyles = ART_STYLES;
const colorOptions = COLOR_PALETTES;
const providerConfig = AI_PROVIDERS.openai;
```

## Future Enhancements

### 1. **Backend Integration**
- User authentication
- Image storage and management
- Credit system
- Generation queue

### 2. **Additional Features**
- Batch image generation
- Advanced editing tools
- Image filters and effects
- Export options

### 3. **Performance Optimizations**
- Image lazy loading
- Virtual scrolling for large libraries
- Web Workers for heavy processing
- Caching strategies

## Migration Notes

### From Old Structure
- `GeneratorPage.jsx` functions moved to custom hooks
- Canvas logic split into focused components
- Color processing moved to `colorUtils.js`
- Constants centralized in `artStyles.js`

### Breaking Changes
- Canvas component import path changed
- Some function signatures updated for better organization
- Constants now imported from dedicated files

## Contributing

When adding new features:
1. Use existing custom hooks when possible
2. Add utility functions to appropriate utility files
3. Follow the established component patterns
4. Update constants in dedicated files
5. Maintain separation of concerns

This structure provides a solid foundation for continued development and easy maintenance of the enKod Hook application. 