import React from 'react';

const Button = React.forwardRef(({ 
  children, 
  variant = 'default', 
  size = 'default', 
  disabled = false, 
  loading = false,
  className = '',
  style = {},
  ...props 
}, ref) => {
  // Map variant names to CSS classes
  const variantClassMap = {
    default: 'btn-primary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    secondary: 'btn-secondary',
    destructive: 'btn-destructive',
    gradient: 'btn-gradient'
  };

  // Map size names to CSS classes
  const sizeClassMap = {
    sm: 'btn-sm',
    small: 'btn-small',
    default: 'btn-default-size',
    lg: 'btn-lg',
    icon: 'btn-icon'
  };

  const buttonClasses = [
    'btn',
    variantClassMap[variant] || 'btn-primary',
    sizeClassMap[size] || 'btn-default-size',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || loading}
      style={style}
      {...props}
    >
      {loading && <div className="btn-loading" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
