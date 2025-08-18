# Styles Organization

This directory contains all the CSS styles for the enKod Hook application, organized into separate files for better maintainability and modularity.

## File Structure

```
src/styles/
├── index.css          # Main entry point that imports all styles
├── globals.css        # Global styles, CSS variables, and base styles
├── layout.css         # Layout components (Header, Sidebar, Layout)
├── components.css     # Reusable UI components (buttons, inputs, etc.)
├── preview.css        # Preview area and canvas-related styles
├── control-panel.css  # Control panel specific styles
└── README.md         # This documentation file
```

## CSS Variables

All design tokens are defined in `globals.css` using CSS custom properties:

### Colors
- `--bg-primary`: Main background color
- `--bg-secondary`: Secondary background color
- `--bg-tertiary`: Tertiary background color
- `--text-primary`: Primary text color
- `--text-secondary`: Secondary text color
- `--text-tertiary`: Tertiary text color
- `--accent-primary`: Primary accent color
- `--accent-secondary`: Secondary accent color
- `--success-color`: Success state color
- `--warning-color`: Warning state color
- `--error-color`: Error state color

### Spacing
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 12px
- `--spacing-lg`: 16px
- `--spacing-xl`: 20px
- `--spacing-2xl`: 24px
- `--spacing-3xl`: 32px

### Border Radius
- `--radius-sm`: 4px
- `--radius-md`: 6px
- `--radius-lg`: 8px
- `--radius-xl`: 12px
- `--radius-2xl`: 16px
- `--radius-3xl`: 20px

### Shadows
- `--shadow-sm`: Small shadow
- `--shadow-md`: Medium shadow
- `--shadow-lg`: Large shadow
- `--shadow-xl`: Extra large shadow

### Transitions
- `--transition-fast`: 0.15s ease
- `--transition-normal`: 0.2s ease
- `--transition-slow`: 0.3s ease

## Usage

### Importing Styles
All styles are imported through `src/styles/index.css` in the main entry point:

```javascript
import './styles/index.css';
```

### Using CSS Classes
Instead of inline styles, use the provided CSS classes:

```jsx
// Before (inline styles)
<div style={{ 
  backgroundColor: 'var(--bg-primary)', 
  padding: 'var(--spacing-lg)' 
}}>

// After (CSS classes)
<div className="card">
```

### Component-Specific Styles
Each component type has its own CSS file:

- **Layout components**: Use classes from `layout.css`
- **UI components**: Use classes from `components.css`
- **Preview area**: Use classes from `preview.css`
- **Control panel**: Use classes from `control-panel.css`

## Responsive Design

The styles include responsive breakpoints:

- **Desktop**: Default styles
- **Tablet**: `@media (max-width: 1200px)`
- **Mobile**: `@media (max-width: 768px)`

## Best Practices

1. **Use CSS Variables**: Always use CSS custom properties for colors, spacing, and other design tokens
2. **Semantic Class Names**: Use descriptive class names that reflect the component's purpose
3. **Modular Organization**: Keep related styles together in the same file
4. **Responsive First**: Design for mobile first, then enhance for larger screens
5. **Consistent Naming**: Follow BEM-like naming conventions for complex components

## Adding New Styles

When adding new styles:

1. **Determine the category**: Choose the appropriate CSS file based on the component type
2. **Use existing variables**: Leverage existing CSS variables for consistency
3. **Follow naming conventions**: Use consistent class naming patterns
4. **Add responsive styles**: Include responsive breakpoints when needed
5. **Document changes**: Update this README if adding new design tokens or patterns

## Migration from Inline Styles

The application has been migrated from inline styles to CSS classes. When updating components:

1. Replace inline `style` props with appropriate CSS classes
2. Use the design system variables instead of hardcoded values
3. Leverage the responsive utilities for mobile-friendly layouts
4. Test across different screen sizes to ensure proper responsive behavior 