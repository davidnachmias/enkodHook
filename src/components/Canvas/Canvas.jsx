import React, { useState, forwardRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share2, 
  Heart, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Crop, 
  Palette,
  X,
  RotateCcw,
  Hand,
  MessageCircle,
  MousePointer,
  ChevronDown,
  ArrowLeftRight
} from 'lucide-react';
import CanvasToolbar from './CanvasToolbar';
import CanvasImage from './CanvasImage';
import CanvasEditingOverlay from './CanvasEditingOverlay';
import CanvasBottomToolbar from './CanvasBottomToolbar';

const Canvas = forwardRef(({ 
  generatedImages, 
  currentImage, 
  isLoading, 
  error,
  onPrevious,
  onNext,
  onDownload,
  onShare,
  onLike,
  currentImageIndex = 0,
  totalImages = 0,
  zoom = 100,
  onZoomIn,
  onZoomOut,
  isDragging = false,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  canvasPosition = { x: 0, y: 0 },
  isEditing = false,
  editMode = null,
  onStartEditing,
  onCancelEditing,
  imageRotation = 0,
  onRotateImage,
  onCropImage,
  onStyleChange
}, ref) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 10, y: 10, width: 80, height: 80 });
  const [isDraggingCrop, setIsDraggingCrop] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Add window resize listener to recenter image when window size changes
  useEffect(() => {
    const handleResize = () => {
      // Reset canvas position when window is resized to keep image centered
      if (onCancelEditing) {
        onCancelEditing();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [onCancelEditing]);

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    }
  };

  const handleLike = () => {
    if (onLike) {
      onLike();
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Canvas interaction handlers
  const handleCanvasMouseDown = (e) => {
    if (onMouseDown) {
      onMouseDown(e);
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (onMouseMove) {
      onMouseMove(e);
    }
  };

  const handleCanvasMouseUp = () => {
    if (onMouseUp) {
      onMouseUp();
    }
  };

  // Image editing handlers
  const handleStartCrop = () => {
    if (onStartEditing) {
      onStartEditing('crop');
    }
  };

  const handleStartRotate = () => {
    if (onStartEditing) {
      onStartEditing('rotate');
    }
  };

  const handleStartStyleChange = () => {
    console.log('Style button clicked!');
    if (onStartEditing) {
      console.log('Calling onStartEditing with style mode');
      onStartEditing('style');
    } else {
      console.log('onStartEditing is not available');
    }
  };

  const handleCancelEdit = () => {
    if (onCancelEditing) {
      onCancelEditing();
    }
  };

  const handleRotate = () => {
    if (onRotateImage) {
      onRotateImage();
    }
  };

  const handleCrop = () => {
    if (onCropImage) {
      onCropImage(cropArea);
    }
  };

  const handleStyleChange = () => {
    if (onStyleChange) {
      onStyleChange();
    }
  };

  // Crop area dragging handlers
  const handleCropMouseDown = (e) => {
    e.stopPropagation();
    setIsDraggingCrop(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleCropMouseMove = (e) => {
    if (!isDraggingCrop) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const deltaX = e.clientX - rect.left - dragStart.x;
    const deltaY = e.clientY - rect.top - dragStart.y;
    
    setCropArea(prev => ({
      x: Math.max(0, Math.min(90, prev.x + (deltaX / rect.width) * 100)),
      y: Math.max(0, Math.min(90, prev.y + (deltaY / rect.height) * 100)),
      width: prev.width,
      height: prev.height
    }));
  };

  const handleCropMouseUp = () => {
    setIsDraggingCrop(false);
  };

  return (
    <div
      ref={ref}
      style={{
        width: 1440,
        height: 750,
        transform: 'rotate(0deg)',
        opacity: 1,
        background: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `
          radial-gradient(circle, #404040 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0'
      }}
    >
      {/* Top Toolbar */}
      <CanvasToolbar
        zoom={zoom}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        totalImages={totalImages}
        currentImageIndex={currentImageIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
        currentImage={currentImage}
        onDownload={handleDownload}
        onShare={handleShare}
        onLike={handleLike}
      />

      {/* Main Canvas Area */}
      <div style={{
        flex: 1,
        position: 'relative',
        overflow: 'visible',
        background: 'var(--bg-primary)'
      }}>
        <CanvasImage
          isLoading={isLoading}
          error={error}
          currentImage={currentImage}
          zoom={zoom}
          isDragging={isDragging}
          canvasPosition={canvasPosition}
          imageRotation={imageRotation}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          isEditing={isEditing}
          editMode={editMode}
          cropArea={cropArea}
          onCropMouseDown={handleCropMouseDown}
          onCropMouseMove={handleCropMouseMove}
          onCropMouseUp={handleCropMouseUp}
          onCancelEdit={handleCancelEdit}
          onCrop={handleCrop}
          onRotate={handleRotate}
          onStyleChange={onStyleChange}
        />
      </div>

      {/* Floating Rotate Buttons - Top Left */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        gap: '8px'
      }}>
        <button style={{
          width: '60px',
          height: '32px',
          background: '#cccccc',
          border: '1px solid #999999',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}>
          <RotateCcw size={16} color="#666666" />
          <RotateCw size={16} color="#666666" />
        </button>
      </div>

      {/* Floating Bottom Right Controls */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        display: 'flex',
        gap: '12px'
      }}>
        {/* Opacity Control */}
        <div style={{
          background: '#333333',
          border: '1px solid #404040',
          borderRadius: '6px',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}>
          <span style={{ color: '#cccccc', fontSize: '14px' }}>100%</span>
          <ArrowLeftRight size={12} color="#cccccc" />
        </div>
        
        {/* Color Picker */}
        <div style={{
          background: '#333333',
          border: '1px solid #404040',
          borderRadius: '6px',
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{
            width: '16px',
            height: '16px',
            background: '#333333',
            border: '1px solid #cccccc',
            borderRadius: '2px'
          }}></div>
          <ArrowLeftRight size={12} color="#cccccc" />
        </div>
      </div>

      {/* Floating Tool Buttons - Bottom Center */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#333333',
        border: '1px solid #404040',
        borderRadius: '8px',
        padding: '4px',
        display: 'flex',
        gap: '2px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
      }}>
        <button style={{
          width: '32px',
          height: '32px',
          background: '#404040',
          border: 'none',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <Hand size={16} color="#ffffff" />
        </button>
        <button style={{
          width: '32px',
          height: '32px',
          background: 'transparent',
          border: 'none',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <MessageCircle size={16} color="#ffffff" />
        </button>
        <button style={{
          width: '32px',
          height: '32px',
          background: 'transparent',
          border: 'none',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <MousePointer size={16} color="#ffffff" />
        </button>
      </div>

      {/* Bottom Toolbar - Image Editing */}
      {currentImage && (
        <CanvasBottomToolbar
          onStartCrop={handleStartCrop}
          onStartRotate={handleStartRotate}
          onStartStyleChange={handleStartStyleChange}
        />
      )}
    </div>
  );
});

Canvas.displayName = 'Canvas';

export default Canvas; 