import React, { useState, useRef } from 'react';
import Layout from '../layouts/Layout';
import ControlPanel from '../components/ControlPanel';
import PreviewArea from '../components/PreviewArea';

// Import constants
import { SECTIONS, DEFAULT_CONFIG } from '../constants/artStyles';

// Import hooks
import { useImageGeneration } from '../hooks/useImageGeneration';
import { useCanvasInteraction } from '../hooks/useCanvasInteraction';
import { useImageEditing } from '../hooks/useImageEditing';

// Import utilities
import { downloadImage, shareImage } from '../utils/imageUtils';

export default function GeneratorPage() {
  // Core state
  const [currentSection, setCurrentSection] = useState(SECTIONS.GENERATOR);
  const [prompt, setPrompt] = useState('');
  
  // Configuration state
  const [config, setConfig] = useState({
    ...DEFAULT_CONFIG,
    uiType: 'Menu',
    style: 'Cartoon',
    mode: 'In-Game Overlay',
    interaction: 'Static',
    showPlaceholder: false,
    wireframe: false,
    quantity: 1,
    resolution: '600x606',
    aspectRatio: '1:1 (Square)'
  });
  
  // Library state
  const [editingImage, setEditingImage] = useState(null);
  
  // Style selection state
  const [selectedStyles, setSelectedStyles] = useState([]);
  
  // Delete confirmation state
  const [deleteConfirmation, setDeleteConfirmation] = useState({ 
    show: false, 
    imageId: null, 
    imageName: '' 
  });

  // Refs
  const canvasRef = useRef(null);

  // Custom hooks
  const {
    isLoading,
    error,
    generatedImages,
    generationHistory,
    currentImage,
    currentImageIndex,
    generateImage,
    retryGeneration,
    navigateImages,
    setImage,
    clearError,
    clearImages,
    setGeneratedImages,
    setGenerationHistory,
    setCurrentImage,
    setCurrentImageIndex
  } = useImageGeneration();

  const {
    zoom,
    isDragging,
    dragOffset,
    canvasPosition,
    zoomIn,
    zoomOut,
    setZoomLevel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetCanvas
  } = useCanvasInteraction();

  const {
    isEditing,
    editMode,
    imageRotation,
    cropArea,
    startEditing,
    cancelEditing,
    rotateImageHandler,
    cropImageHandler,
    rotateImageHandlerAsync,
    changeImageStyle,
    setCropArea
  } = useImageEditing();

  // Handle section navigation
  const handleSectionChange = (section) => {
    setCurrentSection(section);
    // Reset states when changing sections
    if (section !== SECTIONS.GENERATOR) {
      setCurrentImage(null);
      clearError();
    }
    // Reset editing states
    setEditingImage(null);
    cancelEditing();
  };

  // Handle image generation
  const handleGenerate = async (providedConfig = null) => {
    if (!prompt.trim()) return;
    
    const finalConfig = providedConfig || config;
    await generateImage(prompt, finalConfig);
  };

  // Handle retry generation
  const handleRetry = () => {
    if (currentImage) {
      retryGeneration();
    }
  };

  // Handle navigation
  const handlePreviousImage = () => {
    navigateImages(-1);
  };

  const handleNextImage = () => {
    navigateImages(1);
  };

  // Handle download
  const handleDownload = () => {
    if (currentImage) {
      downloadImage(currentImage, 'generated-ui.png');
    }
  };

  // Handle share
  const handleShare = () => {
    if (currentImage) {
      shareImage(currentImage);
    }
  };

  // Handle like/dislike
  const handleLike = () => {
    // TODO: Implement like functionality
  };

  const handleDislike = () => {
    // TODO: Implement dislike functionality
  };

  // Handle tool change from bottom bar
  const handleToolChange = (tool) => {
    // TODO: Implement tool functionality
  };

  // Handle zoom change from floating controls
  const handleZoomChange = (newZoom) => {
    setZoomLevel(newZoom);
  };

  // Handle aspect ratio change from floating controls
  const handleAspectRatioChange = (ratio) => {
    setConfig(prev => ({
      ...prev,
      aspectRatio: ratio
    }));
  };

  // Define sections for navigation
  const sections = ['Home', 'Generator', 'Library', 'Projects', 'Docs'];

  return (
    <Layout 
      activeSection={currentSection} 
      onSectionChange={handleSectionChange}
      sections={sections}
    >
      <div className="main-content">
        {/* Control Panel */}
        <ControlPanel
          prompt={prompt}
          setPrompt={setPrompt}
          config={config}
          setConfig={setConfig}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          credits={12}
        />
        
        {/* Preview Area */}
        <PreviewArea
          currentImage={currentImage}
          isLoading={isLoading}
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onResetZoom={() => setZoomLevel(100)}
          zoom={zoom}
          onDownload={handleDownload}
          onShare={handleShare}
          onLike={handleLike}
          onDislike={handleDislike}
          onZoomChange={handleZoomChange}
          onAspectRatioChange={handleAspectRatioChange}
          onToolChange={handleToolChange}
        />
      </div>
    </Layout>
  );
}
