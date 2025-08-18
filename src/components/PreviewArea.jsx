import React, { useState } from 'react';
import { 
  RotateCcw, 
  RotateCw,
  ChevronDown,
  Square,
  Move,
  Circle,
  Link,
  Hand,
  MessageCircle,
  MousePointer
} from 'lucide-react';

export default function PreviewArea({
  currentImage,
  isLoading,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  zoom = 100,
  onDownload,
  onShare,
  onLike,
  onDislike,
  onZoomChange,
  onAspectRatioChange,
  onToolChange
}) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showZoomDropdown, setShowZoomDropdown] = useState(false);
  const [showAspectRatioDropdown, setShowAspectRatioDropdown] = useState(false);
  const [activeTool, setActiveTool] = useState('move');

  const zoomLevels = [25, 50, 75, 100, 125, 150, 175, 200];
  const aspectRatios = ['1:1 (Square)', '16:9 (Widescreen)', '4:3 (Standard)', '3:2 (Photo)', 'Free Form'];

  // Mock generated UI asset for demonstration
  const mockGeneratedUI = {
    power: 9,
    maxPower: 11,
    health: 5400,
    attack: 1908,
    super: "SCRAPPY!"
  };

  React.useEffect(() => {
    if (currentImage) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentImage]);

  const handleZoomSelect = (newZoom) => {
    if (onZoomChange) {
      onZoomChange(newZoom);
    }
    setShowZoomDropdown(false);
  };

  const handleAspectRatioSelect = (ratio) => {
    if (onAspectRatioChange) {
      onAspectRatioChange(ratio);
    }
    setShowAspectRatioDropdown(false);
  };

  const handleToolSelect = (tool) => {
    setActiveTool(tool);
    if (onToolChange) {
      onToolChange(tool);
    }
  };

  return (
    <div className="preview-area">

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          <span>UI Asset was generated successfully</span>
          <button
            onClick={() => setShowSuccessMessage(false)}
            className="success-close"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Preview Area */}
      <div className="preview-container">
        {isLoading ? (
          <div className="preview-loading">
            <div className="loading-spinner" />
            <span>Generating UI Asset...</span>
          </div>
        ) : currentImage ? (
          <img
            src={currentImage}
            alt="Generated UI"
            className="preview-image"
          />
        ) : (
          // Mock Generated UI Asset
          <div className="mock-ui-asset">
            {/* Power Section */}
            <div className="power-section">
              <div className="power-icon">
                {mockGeneratedUI.power}
              </div>
              <div className="power-info">
                <div className="power-title">
                  POWER
                </div>
                <div className="power-bar-container">
                  <div className="power-bar">
                    <div 
                      className="power-bar-fill"
                      style={{
                        width: `${(mockGeneratedUI.power / mockGeneratedUI.maxPower) * 100}%`
                      }}
                    />
                  </div>
                  <span className="power-max">
                    MAX {mockGeneratedUI.maxPower}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
              <div className="stat-item">
                <div className="stat-icon health">
                  ♥
                </div>
                <span className="stat-label">HEALTH</span>
                <span className="stat-value">{mockGeneratedUI.health}</span>
              </div>

              <div className="stat-item">
                <div className="stat-icon attack">
                  ⚡
                </div>
                <span className="stat-label">ATTACK</span>
                <span className="stat-value">{mockGeneratedUI.attack}</span>
              </div>

              <div className="stat-item">
                <div className="stat-icon super">
                  💀
                </div>
                <span className="stat-label">SUPER</span>
                <span className="stat-value">{mockGeneratedUI.super}</span>
              </div>
            </div>

            {/* Upgrade Button */}
            <div className="upgrade-section">
              <div className="upgrade-title">
                UPGRADE
              </div>
              <button className="upgrade-button">
                <span className="diamond-icon">💎</span>
                <span>80</span>
                <span>+</span>
                <span className="coin-icon">🪙</span>
                <span>140</span>
              </button>
            </div>
          </div>
        )}
      </div>

             {/* Floating Rotate Buttons - Top Left */}
       <div className="floating-controls top-left-controls">
         <button className="rotate-button">
           <RotateCcw size={16} color="#cccccc" />
         </button>
         <button className="rotate-button">
           <RotateCw size={16} color="#cccccc" />
         </button>
       </div>

      {/* Floating Bottom Controls - Separated into two groups */}
      
      {/* Bottom Left Controls - Opacity and Color Picker */}
      <div className="floating-controls bottom-left-controls">
        {/* Opacity Control */}
        <div className="control-item">
          <span className="control-text">100%</span>
          <ChevronDown size={12} color="#cccccc" />
        </div>
        
        {/* Color Picker */}
        <div className="control-item">
          <div className="color-preview"></div>
          <ChevronDown size={12} color="#cccccc" />
        </div>
      </div>
      


      {/* Center Group - Tool Icons */}
      <div className="tool-bar">
        {[
          {icon: Hand, key: 'hand', title: 'Hand Tool'}, 
          {icon: MessageCircle, key: 'comment', title: 'Comment Tool'}, 
          {icon: MousePointer, key: 'select', title: 'Select Tool'}
        ].map(({icon: Icon, key, title}) => (
          <button
            key={key}
            onClick={() => handleToolSelect(key)}
            className={`tool-button ${activeTool === key ? 'active' : ''}`}
            title={title}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
} 