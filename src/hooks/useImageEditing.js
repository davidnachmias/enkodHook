import { useState, useCallback } from 'react';
import { cropImage, rotateImage } from '../utils/imageUtils';
import { 
  extractDominantGradientColors, 
  mapGradientToPalette, 
  findClosestColor, 
  calculateColorSimilarity,
  calculateLuminance,
  rgbToHsv
} from '../utils/colorUtils';

export const useImageEditing = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(null); // 'crop', 'rotate', 'style'
  const [imageRotation, setImageRotation] = useState(0);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });

  const startEditing = useCallback((mode) => {
    console.log('handleStartEditing called with mode:', mode);
    setIsEditing(true);
    setEditMode(mode);
    
    if (mode === 'style') {
      console.log('Starting style editing mode');
    }
  }, []);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    setEditMode(null);
    setImageRotation(0);
    setCropArea({ x: 0, y: 0, width: 100, height: 100 });
  }, []);

  const rotateImageHandler = useCallback(() => {
    setImageRotation(prev => (prev + 90) % 360);
  }, []);

  const cropImageHandler = useCallback(async (imageUrl, providedCropArea = null) => {
    if (!imageUrl) return null;
    
    const areaToUse = providedCropArea || cropArea;
    
    try {
      const croppedUrl = await cropImage(imageUrl, areaToUse);
      setIsEditing(false);
      setEditMode(null);
      return croppedUrl;
    } catch (error) {
      console.error('Failed to crop image:', error);
      return null;
    }
  }, [cropArea]);

  const rotateImageHandlerAsync = useCallback(async (imageUrl, rotation) => {
    if (!imageUrl) return null;
    
    try {
      const rotatedUrl = await rotateImage(imageUrl, rotation);
      setIsEditing(false);
      setEditMode(null);
      return rotatedUrl;
    } catch (error) {
      console.error('Failed to rotate image:', error);
      return null;
    }
  }, []);

  const changeImageStyle = useCallback(async (imageUrl, selectedPalette) => {
    if (!imageUrl || !selectedPalette) return null;
    
    try {
      // Create a canvas to apply gradient-aware color transformation
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      return new Promise((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw the original image
          ctx.drawImage(img, 0, 0);
          
          // Get image data for processing
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Parse the palette colors
          const paletteColors = selectedPalette.colors.map(color => {
            const hex = color.replace('#', '');
            return {
              r: parseInt(hex.substr(0, 2), 16),
              g: parseInt(hex.substr(2, 2), 16),
              b: parseInt(hex.substr(4, 2), 16)
            };
          });
          
          // 1. Extract dominant gradient colors from the image
          const dominantColors = extractDominantGradientColors(data, canvas.width, canvas.height);
          console.log('🎨 Found dominant gradient colors:', dominantColors);
          
          // 2. Map gradient colors to palette colors
          const colorMapping = mapGradientToPalette(dominantColors, paletteColors);
          console.log('🎨 Color mapping:', colorMapping);
          
          // 3. Apply background-aware color replacement
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Skip pure black/white pixels (text, outlines)
            if ((r < 15 && g < 15 && b < 15) || (r > 240 && g > 240 && b > 240)) {
              continue;
            }
            
            // Calculate pixel characteristics
            const luminance = calculateLuminance(r, g, b);
            const [hue, saturation, value] = rgbToHsv(r, g, b);
            
            // Skip very dark pixels (shadows, outlines)
            if (luminance < 25) continue;
            
            // Skip very bright pixels (highlights, text)
            if (luminance > 235) continue;
            
            // Skip very saturated pixels (UI elements, text, accents)
            if (saturation > 75) continue;
            
            // Skip very low saturation bright pixels (likely text)
            if (saturation < 20 && luminance > 120) continue;
            
            // Check for edge characteristics
            const pixelIndex = i / 4;
            const x = pixelIndex % canvas.width;
            const y = Math.floor(pixelIndex / canvas.width);
            
            if (x > 0 && x < canvas.width - 1 && y > 0 && y < canvas.height - 1) {
              // Check contrast with neighbors
              const neighbors = [
                data[((y - 1) * canvas.width + x) * 4],     // top
                data[((y + 1) * canvas.width + x) * 4],     // bottom
                data[(y * canvas.width + (x - 1)) * 4],     // left
                data[(y * canvas.width + (x + 1)) * 4]      // right
              ];
              
              const avgNeighbor = neighbors.reduce((sum, val) => sum + val, 0) / neighbors.length;
              const contrast = Math.abs(r - avgNeighbor);
              
              // Skip high contrast pixels (edges, text, outlines)
              if (contrast > 45) continue;
            }
            
            // Find the closest original background color
            const closestOriginalColor = findClosestColor([r, g, b], dominantColors);
            
            // Get the mapped palette color
            const mappedColor = colorMapping[closestOriginalColor.id];
            
            if (mappedColor) {
              // Calculate how much this pixel matches the original background color
              const colorSimilarity = calculateColorSimilarity([r, g, b], closestOriginalColor.rgb);
              
              // Only replace if it's a good match (likely a background pixel)
              if (colorSimilarity > 0.3) {
                // Apply the new color while preserving structure
                const blendFactor = Math.min(colorSimilarity * 0.7, 0.8); // Max 80% replacement, more conservative
                
                data[i] = Math.round(r * (1 - blendFactor) + mappedColor.r * blendFactor);
                data[i + 1] = Math.round(g * (1 - blendFactor) + mappedColor.g * blendFactor);
                data[i + 2] = Math.round(b * (1 - blendFactor) + mappedColor.b * blendFactor);
              }
            }
            // Keep alpha channel unchanged
          }
          
          // Put the modified image data back
          ctx.putImageData(imageData, 0, 0);
          
          // Convert canvas to blob and update the image
          canvas.toBlob((blob) => {
            const newUrl = URL.createObjectURL(blob);
            setIsEditing(false);
            setEditMode(null);
            resolve(newUrl);
          }, 'image/png');
        };
        
        img.onerror = reject;
        img.src = imageUrl;
      });
    } catch (error) {
      console.error('Failed to change image style:', error);
      return null;
    }
  }, []);

  return {
    // State
    isEditing,
    editMode,
    imageRotation,
    cropArea,
    
    // Actions
    startEditing,
    cancelEditing,
    rotateImageHandler,
    cropImageHandler,
    rotateImageHandlerAsync,
    changeImageStyle,
    
    // Setters
    setCropArea
  };
}; 