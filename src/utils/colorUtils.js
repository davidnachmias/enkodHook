// Color manipulation utilities for image processing

// 1. HSV Color Space Conversion (better for color manipulation)
export const rgbToHsv = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const sum = max + min;
  
  let h = 0;
  const s = max === 0 ? 0 : diff / max;
  const v = max;
  
  if (diff !== 0) {
    switch (max) {
      case r: h = (g - b) / diff + (g < b ? 6 : 0); break;
      case g: h = (b - r) / diff + 2; break;
      case b: h = (r - g) / diff + 4; break;
    }
    h /= 6;
  }
  
  return [h * 360, s * 100, v * 100];
};

export const hsvToRgb = (h, s, v) => {
  h /= 360;
  s /= 100;
  v /= 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = v;
  } else {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
  }
  
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

// 2. Luminance calculation (preserves perceived brightness)
export const calculateLuminance = (r, g, b) => {
  return 0.299 * r + 0.587 * g + 0.114 * b;
};

// 3. Color distance calculation
export const colorDistance = (color1, color2) => {
  const [r1, g1, b1] = color1;
  const [r2, g2, b2] = color2;
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
};

// 4. Edge detection (Sobel operator)
export const detectEdges = (imageData, width, height) => {
  const data = imageData.data;
  const edges = new Uint8ClampedArray(data.length);
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      
      // Get surrounding pixels
      const top = (y - 1) * width + x;
      const bottom = (y + 1) * width + x;
      const left = y * width + (x - 1);
      const right = y * width + (x + 1);
      
      // Calculate gradients
      const gx = data[right * 4] - data[left * 4];
      const gy = data[bottom * 4] - data[top * 4];
      
      // Edge magnitude
      const magnitude = Math.sqrt(gx * gx + gy * gy);
      const edgeStrength = Math.min(magnitude / 10, 1); // Normalize
      
      edges[idx] = edgeStrength;
      edges[idx + 1] = edgeStrength;
      edges[idx + 2] = edgeStrength;
      edges[idx + 3] = data[idx + 3]; // Keep alpha
    }
  }
  
  return edges;
};

// 5. Intelligent color mapping with palette matching
export const findClosestPaletteColor = (hue, palette) => {
  let closestColor = palette[0];
  let minDistance = Infinity;
  
  for (const color of palette) {
    const paletteHue = rgbToHsv(color.r, color.g, color.b)[0];
    const distance = Math.abs(hue - paletteHue);
    
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  }
  
  return closestColor;
};

// 6. Gradual color blending
export const blendColors = (originalColor, targetColor, blendFactor, edgeStrength = 0) => {
  const [r1, g1, b1] = originalColor;
  const [r2, g2, b2] = targetColor;
  
  // Reduce blending near edges to preserve boundaries
  const adjustedBlendFactor = blendFactor * (1 - edgeStrength * 0.5);
  
  return [
    Math.round(r1 * (1 - adjustedBlendFactor) + r2 * adjustedBlendFactor),
    Math.round(g1 * (1 - adjustedBlendFactor) + g2 * adjustedBlendFactor),
    Math.round(b1 * (1 - adjustedBlendFactor) + b2 * adjustedBlendFactor)
  ];
};

// 7. Extract background colors from image (excluding outlines, text, shadows)
export const extractDominantGradientColors = (data, width, height) => {
  const colorMap = new Map();
  const sampleStep = Math.max(1, Math.floor(width * height / 15000)); // Sample every Nth pixel
  
  // Sample pixels and analyze for background characteristics
  for (let i = 0; i < data.length; i += 4 * sampleStep) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Skip pure black/white pixels (likely text or outlines)
    if ((r < 10 && g < 10 && b < 10) || (r > 245 && g > 245 && b > 245)) {
      continue;
    }
    
    // Calculate color characteristics
    const luminance = calculateLuminance(r, g, b);
    const [hue, saturation, value] = rgbToHsv(r, g, b);
    
    // Skip very dark colors (likely shadows or outlines)
    if (luminance < 20) continue;
    
    // Skip very bright colors (likely highlights or text)
    if (luminance > 230) continue;
    
    // Skip very saturated colors (likely UI elements, text, or accents)
    if (saturation > 80) continue;
    
    // Skip very low saturation colors (likely grays that could be text)
    if (saturation < 15 && luminance > 100) continue;
    
    // Check for edge-like characteristics (high contrast with neighbors)
    const pixelIndex = i / 4;
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);
    
    if (x > 0 && x < width - 1 && y > 0 && y < height - 1) {
      // Check if this pixel has high contrast with neighbors (likely an edge/outline)
      const neighbors = [
        data[((y - 1) * width + x) * 4],     // top
        data[((y + 1) * width + x) * 4],     // bottom
        data[(y * width + (x - 1)) * 4],     // left
        data[(y * width + (x + 1)) * 4]      // right
      ];
      
      const avgNeighbor = neighbors.reduce((sum, val) => sum + val, 0) / neighbors.length;
      const contrast = Math.abs(r - avgNeighbor);
      
      // Skip pixels with high contrast (likely edges, text, or outlines)
      if (contrast > 50) continue;
    }
    
    // Quantize colors to reduce noise (group similar colors)
    const quantizedR = Math.floor(r / 24) * 24; // Smaller quantization for more precision
    const quantizedG = Math.floor(g / 24) * 24;
    const quantizedB = Math.floor(b / 24) * 24;
    const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;
    
    if (colorMap.has(colorKey)) {
      colorMap.set(colorKey, colorMap.get(colorKey) + 1);
    } else {
      colorMap.set(colorKey, 1);
    }
  }
  
  // Convert to array and sort by frequency
  const colorEntries = Array.from(colorMap.entries())
    .map(([key, count]) => {
      const [r, g, b] = key.split(',').map(Number);
      return { rgb: [r, g, b], count, id: key };
    })
    .sort((a, b) => b.count - a.count);
  
  // Return top 4-6 background colors with good distribution
  return colorEntries
    .filter(color => {
      const [r, g, b] = color.rgb;
      const luminance = calculateLuminance(r, g, b);
      const [hue, saturation, value] = rgbToHsv(r, g, b);
      
      // Additional filtering for background-like colors
      return (
        luminance >= 30 && luminance <= 220 && // Reasonable brightness range
        saturation >= 10 && saturation <= 70 && // Moderate saturation (not pure grays, not neon)
        value >= 0.2 && value <= 0.9 // Reasonable value range
      );
    })
    .slice(0, 5); // Return top 5 background colors
};

// 8. Map gradient colors to palette colors
export const mapGradientToPalette = (dominantColors, paletteColors) => {
  const mapping = {};
  
  dominantColors.forEach((dominantColor, index) => {
    const [r, g, b] = dominantColor.rgb;
    const [hue] = rgbToHsv(r, g, b);
    
    // Find the closest palette color by hue
    let closestPaletteColor = paletteColors[0];
    let minDistance = Infinity;
    
    for (const paletteColor of paletteColors) {
      const paletteHue = rgbToHsv(paletteColor.r, paletteColor.g, paletteColor.b)[0];
      const distance = Math.abs(hue - paletteHue);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestPaletteColor = paletteColor;
      }
    }
    
    mapping[dominantColor.id] = closestPaletteColor;
  });
  
  return mapping;
};

// 9. Find closest color in a list
export const findClosestColor = (targetColor, colorList) => {
  let closestColor = colorList[0];
  let minDistance = Infinity;
  
  for (const color of colorList) {
    const distance = colorDistance(targetColor, color.rgb);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = color;
    }
  }
  
  return closestColor;
};

// 10. Calculate color similarity (0-1)
export const calculateColorSimilarity = (color1, color2) => {
  const distance = colorDistance(color1, color2);
  const maxDistance = Math.sqrt(255 * 255 * 3); // Maximum possible distance
  return Math.max(0, 1 - distance / maxDistance);
};

// Legacy HSL functions (kept for compatibility)
export const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return [h * 360, s * 100, l * 100];
};

export const hslToRgb = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}; 