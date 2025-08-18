import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(({ 
  value, 
  onChange, 
  options = [], 
  placeholder = 'Select...',
  style = {},
  disabled = false,
  ...props 
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (newValue) => {
    setSelectedValue(newValue);
    onChange?.(newValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div ref={ref} className="select-container" style={style} {...props}>
      <button
        type="button"
        className="select-trigger-button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        disabled={disabled}
      >
        <div className="select-trigger-content">
          {selectedOption?.colors && (
            <div className="select-color-preview">
              {selectedOption.colors.map((color, index) => (
                <div
                  key={index}
                  className="select-color-item"
                  style={{ background: color }}
                />
              ))}
            </div>
          )}
          <span>{selectedOption?.label || placeholder}</span>
        </div>
        <ChevronDown className={`select-chevron ${isOpen ? 'open' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="select-dropdown-content">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select-dropdown-item ${selectedValue === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.colors && (
                <div className="select-color-preview">
                  {option.colors.map((color, index) => (
                    <div
                      key={index}
                      className="select-color-item"
                      style={{ background: color }}
                    />
                  ))}
                </div>
              )}
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
