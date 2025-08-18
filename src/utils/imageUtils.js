// Image processing utilities

/**
 * Crop an image using HTML5 Canvas
 * @param {string} imageUrl - The URL of the image to crop
 * @param {Object} cropArea - The crop area {x, y, width, height} in percentages
 * @returns {Promise<string>} - Promise that resolves to the cropped image URL
 */
export const cropImage = (imageUrl, cropArea) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size to crop area
      const cropWidth = img.width * (cropArea.width / 100);
      const cropHeight = img.height * (cropArea.height / 100);
      const cropX = img.width * (cropArea.x / 100);
      const cropY = img.height * (cropArea.y / 100);
      
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      
      // Draw the cropped portion
      ctx.drawImage(
        img,
        cropX, cropY, cropWidth, cropHeight,
        0, 0, cropWidth, cropHeight
      );
      
      // Convert to blob and create new URL
      canvas.toBlob((blob) => {
        const croppedUrl = URL.createObjectURL(blob);
        resolve(croppedUrl);
      }, 'image/png');
    };
    
    img.onerror = reject;
    img.src = imageUrl;
  });
};

/**
 * Rotate an image using HTML5 Canvas
 * @param {string} imageUrl - The URL of the image to rotate
 * @param {number} rotation - Rotation angle in degrees
 * @returns {Promise<string>} - Promise that resolves to the rotated image URL
 */
export const rotateImage = (imageUrl, rotation) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculate new canvas size for rotation
      const radians = (rotation * Math.PI) / 180;
      const cos = Math.abs(Math.cos(radians));
      const sin = Math.abs(Math.sin(radians));
      
      const newWidth = img.width * cos + img.height * sin;
      const newHeight = img.width * sin + img.height * cos;
      
      canvas.width = newWidth;
      canvas.height = newHeight;
      
      // Move to center and rotate
      ctx.translate(newWidth / 2, newHeight / 2);
      ctx.rotate(radians);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      
      // Convert to blob and create new URL
      canvas.toBlob((blob) => {
        const rotatedUrl = URL.createObjectURL(blob);
        resolve(rotatedUrl);
      }, 'image/png');
    };
    
    img.onerror = reject;
    img.src = imageUrl;
  });
};

/**
 * Download an image from URL
 * @param {string} imageUrl - The URL of the image to download
 * @param {string} filename - Optional filename for the download
 */
export const downloadImage = (imageUrl, filename = null) => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename || `generated-image-${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Share an image using Web Share API or fallback to clipboard
 * @param {string} imageUrl - The URL of the image to share
 * @param {string} title - Optional title for sharing
 * @param {string} text - Optional text for sharing
 */
export const shareImage = async (imageUrl, title = 'Generated Image', text = 'Check out this AI-generated image!') => {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url: imageUrl
      });
    } catch (error) {
      console.log('Share cancelled or failed:', error);
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(imageUrl);
      alert('Image URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }
};

/**
 * Create a blob URL from canvas data
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {string} type - MIME type (default: 'image/png')
 * @param {number} quality - Quality for JPEG (0-1)
 * @returns {Promise<string>} - Promise that resolves to the blob URL
 */
export const canvasToBlobUrl = (canvas, type = 'image/png', quality = 1) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        resolve(url);
      } else {
        reject(new Error('Failed to create blob from canvas'));
      }
    }, type, quality);
  });
};

/**
 * Load an image and return a promise
 * @param {string} src - Image source URL
 * @returns {Promise<HTMLImageElement>} - Promise that resolves to the loaded image
 */
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Get image dimensions from URL
 * @param {string} imageUrl - The URL of the image
 * @returns {Promise<{width: number, height: number}>} - Promise that resolves to image dimensions
 */
export const getImageDimensions = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
};

/**
 * Create a thumbnail from an image
 * @param {string} imageUrl - The URL of the image
 * @param {number} maxWidth - Maximum width for thumbnail
 * @param {number} maxHeight - Maximum height for thumbnail
 * @returns {Promise<string>} - Promise that resolves to the thumbnail URL
 */
export const createThumbnail = (imageUrl, maxWidth = 200, maxHeight = 200) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Calculate thumbnail dimensions
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = img.width * ratio;
      const height = img.height * ratio;
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw the thumbnail
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to blob and create URL
      canvas.toBlob((blob) => {
        const thumbnailUrl = URL.createObjectURL(blob);
        resolve(thumbnailUrl);
      }, 'image/jpeg', 0.8);
    };
    
    img.onerror = reject;
    img.src = imageUrl;
  });
}; 