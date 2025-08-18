import React from "react";
import { RotateCw, Crop, Palette } from "lucide-react";
import "./CanvasBottomToolbar.css";

const CanvasBottomToolbar = ({
  onStartCrop,
  onStartRotate,
  onStartStyleChange,
}) => {
  return (
    <div className="canvas-bottom-toolbar">
      <button onClick={onStartCrop} className="canvas-button">
        <Crop size={16} />
        Crop
      </button>

      <button onClick={onStartRotate} className="canvas-button">
        <RotateCw size={16} />
        Rotate
      </button>

      <button
        onClick={onStartStyleChange}
        className="canvas-button"
        title="Change image style/colors"
      >
        <Palette size={16} />
        Style
      </button>
    </div>
  );
};

export default CanvasBottomToolbar;
