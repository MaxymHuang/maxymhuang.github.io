# Skeleton Components

This directory contains skeleton screen components for improved perceived performance and user experience.

## Overview

Skeleton screens are UI placeholders that show the structure of content while it's loading. They help reduce perceived loading time and provide visual feedback to users.

## Components

### Base Components

- **`Skeleton`** - Base skeleton component with shimmer animation
- **`PageSkeleton`** - Full page skeleton with navbar and sections

### Section-Specific Skeletons

- **`HeroSkeleton`** - Hero section with name, title, and CTA buttons
- **`AboutSkeleton`** - About section with profile image and content blocks  
- **`TimelineSkeleton`** - Timeline/experience section with timeline items
- **`ProjectsSkeleton`** - Projects section with cards and pagination
- **`ContactSkeleton`** - Contact section with form and social links

## Usage

### Basic Skeleton

```tsx
import { Skeleton } from './skeletons';

<Skeleton width="200px" height="24px" />
<Skeleton variant="circular" width="64px" height="64px" />
<Skeleton variant="text" lines={3} />
```

### With Suspense

```tsx
import { TimelineSkeleton } from './skeletons';

<Suspense fallback={<TimelineSkeleton showHeader={false} />}>
  <Timeline />
</Suspense>
```

### Full Page Loading

```tsx
import { PageSkeleton } from './skeletons';

<Suspense fallback={<PageSkeleton />}>
  <ProjectDetails />
</Suspense>
```

## Props

### Skeleton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | '' | Additional CSS classes |
| `variant` | 'text' \| 'rectangular' \| 'circular' | 'rectangular' | Shape variant |
| `width` | string \| number | - | Width of skeleton |
| `height` | string \| number | - | Height of skeleton |
| `lines` | number | 1 | Number of text lines (text variant only) |

### Section Skeleton Props

Most section skeletons accept these common props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showHeader` | boolean | true | Show section header skeleton |
| `itemCount` | number | varies | Number of skeleton items |

## Design Principles

1. **Match Structure** - Skeletons mirror the actual component layout
2. **Consistent Animations** - All skeletons use the same shimmer effect
3. **Responsive Design** - Skeletons adapt to different screen sizes
4. **Accessibility** - Respect `prefers-reduced-motion` settings
5. **Performance** - Lightweight with minimal DOM elements

## Animation

The skeleton components use a shimmer animation powered by:

- **CSS Gradient** - Moving gradient background
- **Tailwind Animation** - `animate-shimmer` class
- **Keyframes** - Defined in `tailwind.config.ts`

## Theme Integration

Skeletons use the existing design tokens:

- `bg-subtle` - Base skeleton color
- `bg-border` - Subtle variations
- Dark theme compatible
- Matches existing component spacing

## Best Practices

1. **Use with Suspense** - Combine with React Suspense boundaries
2. **Match Real Content** - Size skeletons to match actual content
3. **Don't Over-Animate** - Subtle shimmer effect only
4. **Consider Loading Time** - Use `useMinimumLoadingTime` hook for very fast loads
5. **Accessibility First** - Always include `animate-pulse` fallback

## Performance

- **Minimal JS** - Pure CSS animations
- **No Re-renders** - Static components
- **GPU Acceleration** - Hardware-accelerated transforms
- **Tree Shaking** - Import only what you need

## Browser Support

- **Modern Browsers** - Full shimmer animation
- **Older Browsers** - Graceful degradation to static placeholders  
- **Reduced Motion** - Respects accessibility preferences
