import React from "react";
import { COLOR_PALETTES } from "../../constants/artStyles";
import "./CanvasEditingOverlay.css";

const CanvasEditingOverlay = ({
  editMode,
  cropArea,
  onCropMouseDown,
  onCropMouseMove,
  onCropMouseUp,
  onCancelEdit,
  onCrop,
  onRotate,
  onStyleChange,
}) => {
  if (editMode === "crop") {
    return (
      <div className="overlay">
        <div className="crop-container">
          <div
            className="crop-box"
            style={{
              top: `${cropArea.y}%`,
              left: `${cropArea.x}%`,
              width: `${cropArea.width}%`,
              height: `${cropArea.height}%`,
            }}
            onMouseDown={onCropMouseDown}
            onMouseMove={onCropMouseMove}
            onMouseUp={onCropMouseUp}
          />
          <div className="crop-dialog">
            <h3 className="dialog-title">Crop Area Selected</h3>
            <p className="dialog-subtitle">
              Drag the border to adjust, then click Crop
            </p>
            <div className="dialog-buttons">
              <button className="btn cancel" onClick={onCancelEdit}>
                Cancel
              </button>
              <button className="btn primary" onClick={onCrop}>
                Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (editMode === "style") {
    return (
      <div className="overlay">
        <div className="style-dialog">
          <h3 className="dialog-title">Choose Color Palette</h3>
          <p className="dialog-subtitle">
            Select a color palette to apply to your image
          </p>

          <div className="palette-grid">
            {COLOR_PALETTES.map((palette) => (
              <button
                key={palette.id}
                className="palette-option"
                onClick={() => onStyleChange?.(palette)}
              >
                <div className="palette-header">
                  <div className="palette-colors">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="palette-color"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  <span className="palette-name">{palette.name}</span>
                </div>
                <p className="palette-description">{palette.description}</p>
              </button>
            ))}
          </div>

          <div className="dialog-buttons">
            <button className="btn cancel" onClick={onCancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (editMode === "rotate") {
    return (
      <div className="overlay">
        <div className="rotate-dialog">
          <h3 className="dialog-title">Rotate Image</h3>
          <p className="dialog-subtitle">Click to rotate the image</p>
          <div className="dialog-buttons">
            <button className="btn cancel" onClick={onCancelEdit}>
              Cancel
            </button>
            <button className="btn primary" onClick={onRotate}>
              Rotate
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CanvasEditingOverlay;
