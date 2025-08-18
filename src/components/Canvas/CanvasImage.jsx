import React from 'react';
import CanvasEditingOverlay from './CanvasEditingOverlay';

const CanvasImage = ({
  isLoading,
  error,
  currentImage,
  zoom,
  isDragging,
  canvasPosition,
  imageRotation,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  isEditing,
  editMode,
  cropArea,
  onCropMouseDown,
  onCropMouseMove,
  onCropMouseUp,
  onCancelEdit,
  onCrop,
  onRotate,
  onStyleChange
}) => {
  return (
    <div style={{
      flex: 1,
      position: 'relative',
      overflow: 'visible',
      background: 'var(--bg-primary)',
      cursor: isDragging ? 'grabbing' : zoom > 100 ? 'grab' : 'default'
    }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {isLoading ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column',
          gap: 16
        }}>
          <div style={{
            width: 48,
            height: 48,
            border: '3px solid var(--border-color)',
            borderTop: '3px solid var(--accent-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 16
          }}>
            Generating your image...
          </p>
        </div>
      ) : error ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column',
          gap: 16,
          padding: 24,
          textAlign: 'center'
        }}>
          <div style={{
            width: 64,
            height: 64,
            background: 'rgba(255, 68, 68, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: 24, color: '#ff4444' }}>⚠️</span>
          </div>
          <div>
            <h3 style={{
              color: 'var(--text-primary)',
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 8
            }}>
              Generation Failed
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 14,
              lineHeight: 1.5
            }}>
              {error}
            </p>
          </div>
        </div>
      ) : currentImage ? (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          overflow: 'visible'
        }}>
                     <img
             src={currentImage}
             alt="Generated"
             style={{
               width: 'auto',
               height: 'auto',
               objectFit: 'contain',
               transform: `rotate(${imageRotation}deg)`,
               transition: 'transform 0.3s ease',
               userSelect: 'none',
               pointerEvents: 'none',
               display: 'block',
               position: 'relative',
               maxWidth: '60%',
               maxHeight: '60%'
             }}
           />
          
          {/* Editing Overlay */}
          {isEditing && (
            <CanvasEditingOverlay
              editMode={editMode}
              cropArea={cropArea}
              onCropMouseDown={onCropMouseDown}
              onCropMouseMove={onCropMouseMove}
              onCropMouseUp={onCropMouseUp}
              onCancelEdit={onCancelEdit}
              onCrop={onCrop}
              onRotate={onRotate}
              onStyleChange={onStyleChange}
            />
          )}
        </div>
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          flexDirection: 'column',
          gap: 16,
          color: 'var(--text-secondary)'
        }}>
          <div style={{
            width: 64,
            height: 64,
            background: 'var(--bg-tertiary)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ fontSize: 24 }}>🎨</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              color: 'var(--text-primary)',
              fontSize: 18,
              fontWeight: 600,
              marginBottom: 8
            }}>
              Ready to Create
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 14
            }}>
              Enter a prompt and generate your first image
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasImage; 