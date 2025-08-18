import { useState, useCallback } from 'react';
import { GenerateImage } from '../integrations/Core';
import { ART_STYLES } from '../constants/artStyles';

export const useImageGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [generationHistory, setGenerationHistory] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const generateImage = useCallback(async (prompt, config, selectedStyles = []) => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Enhance prompt with selected styles
    let enhancedPrompt = prompt;
    let selectedStyle = null;
    if (selectedStyles.length > 0) {
      selectedStyle = ART_STYLES.find(style => style.id === selectedStyles[0]);
      if (selectedStyle) {
        enhancedPrompt = `${prompt}, ${selectedStyle.description}`;
      }
    }
    
    console.log('🚀 Starting image generation...');
    console.log('📝 Original Prompt:', prompt);
    console.log('🎨 Enhanced Prompt:', enhancedPrompt);
    console.log('⚙️ Config:', config);

    try {
      const result = await GenerateImage({
        prompt: enhancedPrompt,
        ...config
      });

      console.log('✅ Generation successful:', result);

      const newImage = {
        id: Date.now(),
        url: result.url,
        prompt: enhancedPrompt,
        originalPrompt: prompt,
        styles: selectedStyles,
        selectedStyle: selectedStyle,
        config: config,
        timestamp: new Date().toISOString()
      };
      
      setGeneratedImages(prev => [newImage, ...prev]);
      setCurrentImage(newImage.url);
      setCurrentImageIndex(0);
      setGenerationHistory(prev => [newImage, ...prev]);
      
      return newImage;
    } catch (err) {
      console.error('❌ Generation failed:', err);
      setError(err.message || 'Failed to generate image. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const retryGeneration = useCallback((prompt, config, selectedStyles) => {
    if (prompt.trim()) {
      return generateImage(prompt, config, selectedStyles);
    }
  }, [generateImage]);

  const navigateImages = useCallback((direction) => {
    if (generatedImages.length <= 1) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = currentImageIndex === generatedImages.length - 1 ? 0 : currentImageIndex + 1;
    } else {
      newIndex = currentImageIndex === 0 ? generatedImages.length - 1 : currentImageIndex - 1;
    }
    
    setCurrentImageIndex(newIndex);
    setCurrentImage(generatedImages[newIndex].url);
  }, [generatedImages, currentImageIndex]);

  const setImage = useCallback((imageUrl, index = 0) => {
    setCurrentImage(imageUrl);
    setCurrentImageIndex(index);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearImages = useCallback(() => {
    setGeneratedImages([]);
    setCurrentImage(null);
    setCurrentImageIndex(0);
  }, []);

  return {
    // State
    isLoading,
    error,
    generatedImages,
    generationHistory,
    currentImage,
    currentImageIndex,
    
    // Actions
    generateImage,
    retryGeneration,
    navigateImages,
    setImage,
    clearError,
    clearImages,
    
    // Setters for external state management
    setGeneratedImages,
    setGenerationHistory,
    setCurrentImage,
    setCurrentImageIndex
  };
}; 