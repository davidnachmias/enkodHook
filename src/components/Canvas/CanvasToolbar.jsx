import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share2, 
  Heart, 
  ZoomIn, 
  ZoomOut
} from 'lucide-react';

const CanvasToolbar = ({
  zoom,
  onZoomIn,
  onZoomOut,
  totalImages,
  currentImageIndex,
  onPrevious,
  onNext,
  currentImage,
  onDownload,
  onShare,
  onLike
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      borderBottom: '1px solid var(--border-color)',
      background: 'var(--bg-secondary)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }}>
        {/* Zoom Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <button
            onClick={onZoomOut}
            disabled={zoom <= 25}
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              color: zoom <= 25 ? 'var(--text-tertiary)' : 'var(--text-primary)',
              cursor: zoom <= 25 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (zoom > 25) {
                e.target.style.background = 'var(--border-color)';
              }
            }}
            onMouseLeave={(e) => {
              if (zoom > 25) {
                e.target.style.background = 'var(--bg-tertiary)';
              }
            }}
          >
            <ZoomOut size={16} />
          </button>
          
          <span style={{
            fontSize: 14,
            color: 'var(--text-primary)',
            minWidth: 40,
            textAlign: 'center'
          }}>
            {zoom}%
          </span>
          
          <button
            onClick={onZoomIn}
            disabled={zoom >= 300}
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 6,
              color: zoom >= 300 ? 'var(--text-tertiary)' : 'var(--text-primary)',
              cursor: zoom >= 300 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (zoom < 300) {
                e.target.style.background = 'var(--border-color)';
              }
            }}
            onMouseLeave={(e) => {
              if (zoom < 300) {
                e.target.style.background = 'var(--bg-tertiary)';
              }
            }}
          >
            <ZoomIn size={16} />
          </button>
        </div>

        {/* Image Navigation */}
        {totalImages > 1 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <button
              onClick={onPrevious}
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--border-color)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--bg-tertiary)'}
            >
              <ChevronLeft size={16} />
            </button>
            
            <span style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              minWidth: 40,
              textAlign: 'center'
            }}>
              {currentImageIndex + 1} / {totalImages}
            </span>
            
            <button
              onClick={onNext}
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--border-color)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--bg-tertiary)'}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        {/* Image Actions */}
        {currentImage && (
          <>
            <button
              onClick={onDownload}
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--border-color)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--bg-tertiary)'}
              title="Download"
            >
              <Download size={16} />
            </button>
            
            <button
              onClick={onShare}
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--border-color)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--bg-tertiary)'}
              title="Share"
            >
              <Share2 size={16} />
            </button>
            
            <button
              onClick={onLike}
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: 6,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--border-color)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--bg-tertiary)'}
              title="Like"
            >
              <Heart size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CanvasToolbar; 