import React, { useState } from 'react';
import { Info, RefreshCw, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import Button from './ui/Button';
import Textarea from './ui/Textarea';
import Select from './ui/Select';

export default function ControlPanel({
  prompt,
  setPrompt,
  config,
  setConfig,
  onGenerate,
  isLoading,
  credits = 12
}) {
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);

  const handleInspireMe = () => {
    const inspirationPrompts = [
      "Main menu for a retro pixel RPG with start, settings, and exit buttons in 9:16 mobile format",
      "Upgrade screen for a mobile action game in cartoon style, showing power level, health, attack, and super ability with bold icons, progress bar, and colorful button to confirm upgrade with resources",
      "Character stats panel with health bar, mana bar, and experience progress in fantasy RPG style",
      "Inventory grid layout with item slots, tooltips, and category filters for mobile game",
      "Settings menu with sound controls, graphics options, and account settings in modern UI style"
    ];
    const randomPrompt = inspirationPrompts[Math.floor(Math.random() * inspirationPrompts.length)];
    setPrompt(randomPrompt);
  };

  return (
    <div className="control-panel">
      {/* Prompt Section */}
      <div className="prompt-section">
        <div className="prompt-header">
          <div className="prompt-label">
            <span className="prompt-title">
              Prompt
            </span>
            <span className="prompt-required">
              (Required)
            </span>
            <Info size={14} color="#6B6C6D" />
          </div>
          <Button
            onClick={handleInspireMe}
            variant="secondary"
            size="small"
            className="inspire-button"
            disabled={isLoading}
          >
            Inspire me
          </Button>
        </div>
        
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Main menu for a retro pixel RPG with start, settings, and exit buttons in 9:16 mobile format..."
          rows={4}
          disabled={isLoading}
          className="prompt-textarea"
        />
        
        <div className="prompt-hints">
          <span className="hints-label">
            Hints
          </span>
          <Button variant="ghost" size="small" disabled={isLoading}>
            Lorem Ipsum
          </Button>
          <Button variant="ghost" size="small" disabled={isLoading}>
            Lorem Ipsum
          </Button>
          <Button
            variant="ghost"
            size="small"
            onClick={() => setPrompt('')}
            disabled={isLoading}
            className="clear-button"
          >
            <RefreshCw size={16} />
          </Button>
        </div>
      </div>

      {/* Advanced Options Section */}
      <div className="advanced-options-section">
        <button
          onClick={() => setAdvancedOptionsOpen(!advancedOptionsOpen)}
          className={`advanced-toggle ${advancedOptionsOpen ? 'open' : ''}`}
        >
          Advanced Options
          {advancedOptionsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {advancedOptionsOpen && (
          <div className="advanced-content">
            <div className="options-grid">
              <div>
                <label className="option-label">
                  UI Type
                </label>
                <Select
                  value={config.uiType || 'Menu'}
                  onChange={(value) => setConfig({ ...config, uiType: value })}
                  options={[
                    { value: 'Menu', label: 'Menu' },
                    { value: 'Character Stats Panel', label: 'Character Stats Panel' },
                    { value: 'Inventory', label: 'Inventory' },
                    { value: 'Settings', label: 'Settings' }
                  ]}
                />
              </div>
              <div>
                <label className="option-label">
                  Style
                </label>
                <Select
                  value={config.style || 'Cartoon'}
                  onChange={(value) => setConfig({ ...config, style: value })}
                  options={[
                    { value: 'Cartoon', label: 'Cartoon' },
                    { value: 'Realistic', label: 'Realistic' },
                    { value: 'Pixel Art', label: 'Pixel Art' },
                    { value: 'Minimal', label: 'Minimal' }
                  ]}
                />
              </div>
            </div>
            
            <div className="options-grid">
              <div>
                <label className="option-label">
                  Mode
                </label>
                <Select
                  value={config.mode || 'In-Game Overlay'}
                  onChange={(value) => setConfig({ ...config, mode: value })}
                  options={[
                    { value: 'In-Game Overlay', label: 'In-Game Overlay' },
                    { value: 'Full Screen', label: 'Full Screen' },
                    { value: 'Modal', label: 'Modal' }
                  ]}
                />
              </div>
              <div>
                <label className="option-label">
                  Interaction
                </label>
                <Select
                  value={config.interaction || 'Static'}
                  onChange={(value) => setConfig({ ...config, interaction: value })}
                  options={[
                    { value: 'Static', label: 'Static' },
                    { value: 'Interactive', label: 'Interactive' },
                    { value: 'Animated', label: 'Animated' }
                  ]}
                />
              </div>
            </div>
            
            <div className="option-group">
              <div className="checkbox-row">
                <span className="checkbox-label">
                  Show Placeholder Text
                </span>
                <input
                  type="checkbox"
                  checked={config.showPlaceholder || false}
                  onChange={(e) => setConfig({ ...config, showPlaceholder: e.target.checked })}
                  className="checkbox-input"
                />
              </div>
              <div className="checkbox-row">
                <span className="checkbox-label">
                  Generate as wireframe only
                </span>
                <input
                  type="checkbox"
                  checked={config.wireframe || false}
                  onChange={(e) => setConfig({ ...config, wireframe: e.target.checked })}
                  className="checkbox-input"
                />
              </div>
            </div>
            
            <div className="options-grid-3">
              <div>
                <label className="option-label">
                  Quantity
                </label>
                <input
                  type="number"
                  value={config.quantity || 1}
                  onChange={(e) => setConfig({ ...config, quantity: parseInt(e.target.value) })}
                  min="1"
                  max="10"
                  className="number-input"
                />
              </div>
              <div>
                <label className="option-label">
                  Resolution
                </label>
                <input
                  type="text"
                  value={config.resolution || '600x606'}
                  onChange={(e) => setConfig({ ...config, resolution: e.target.value })}
                  className="text-input"
                />
              </div>
              <div>
                <label className="option-label">
                  Aspect Ratio
                </label>
                <Select
                  value={config.aspectRatio || '1:1 (Square)'}
                  onChange={(value) => setConfig({ ...config, aspectRatio: value })}
                  options={[
                    { value: '1:1 (Square)', label: '1:1 (Square)' },
                    { value: '16:9 (Widescreen)', label: '16:9 (Widescreen)' },
                    { value: '9:16 (Mobile)', label: '9:16 (Mobile)' },
                    { value: '4:3 (Standard)', label: '4:3 (Standard)' }
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Generation Controls */}
      <div className="generation-controls">
        <div className="credits-info">
          <div className="credits-display">
            <Zap size={16} color="var(--warning-color)" />
            <span className="credits-text">
              {credits} credit Remaining
            </span>
          </div>
        </div>
        
        <Button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="generate-button"
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </Button>
      </div>
    </div>
  );
}
