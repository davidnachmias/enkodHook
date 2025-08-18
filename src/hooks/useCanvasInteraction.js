import { useState, useCallback } from 'react';

export const useCanvasInteraction = () => {
  const [zoom, setZoom] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });

  const zoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 25, 300));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 25, 25));
  }, []);

  const setZoomLevel = useCallback((level) => {
    setZoom(Math.max(25, Math.min(300, level)));
  }, []);

  const handleMouseDown = useCallback((e) => {
    if (zoom > 100) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - canvasPosition.x,
        y: e.clientY - canvasPosition.y
      });
    }
  }, [zoom, canvasPosition]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && zoom > 100) {
      setCanvasPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  }, [isDragging, zoom, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetCanvas = useCallback(() => {
    setZoom(60);
    setCanvasPosition({ x: 0, y: 0 });
    setIsDragging(false);
  }, []);

  return {
    // State
    zoom,
    isDragging,
    dragOffset,
    canvasPosition,
    
    // Actions
    zoomIn,
    zoomOut,
    setZoomLevel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetCanvas
  };
}; 