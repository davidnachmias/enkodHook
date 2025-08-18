import React from 'react';

const Textarea = React.forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'default',
  style = {},
  disabled = false,
  ...props 
}, ref) => {
  // Map variant names to CSS classes
  const variantClassMap = {
    default: '',
    error: 'textarea-error',
    success: 'textarea-success'
  };

  // Map size names to CSS classes
  const sizeClassMap = {
    sm: 'textarea-sm',
    default: '',
    lg: 'textarea-lg'
  };

  const textareaClasses = [
    'textarea',
    variantClassMap[variant],
    sizeClassMap[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <textarea
      ref={ref}
      className={textareaClasses}
      style={style}
      disabled={disabled}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
