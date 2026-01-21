import { recipe } from '@vanilla-extract/recipes';
import { style, keyframes, styleVariants } from '@vanilla-extract/css';

// Animation duration for loading skeleton
const SHIMMER_DURATION = '1.5s'; // Smooth loading animation speed

// Keyframes for loading skeleton
const shimmer = keyframes({
  '0%': {
    backgroundPosition: '200% 0',
  },
  '100%': {
    backgroundPosition: '-200% 0',
  },
});

// Radius mapping
export const radiusMap = {
  none: '0',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  full: 'var(--radius-full)',
} as const;

export const imageWrapper = recipe({
  base: {
    margin: 0,
    position: 'relative',
    display: 'inline-block',
    maxWidth: '100%',
  },

  variants: {
    hasAspectRatio: {
      true: {
        width: '100%',
      },
      false: {},
    },

    captionPosition: {
      bottom: {},
      overlay: {
        selectors: {
          '&::after': {
            content: '',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%', // Cover bottom half for caption readability
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)', // Dark to transparent gradient
            pointerEvents: 'none',
            borderRadius: 'inherit',
          },
        },
      },
    },
  },

  defaultVariants: {
    hasAspectRatio: false,
    captionPosition: 'bottom',
  },
});

export const image = recipe({
  base: {
    display: 'block',
    width: '100%',
    height: '100%',
    transition: 'var(--transition-base)',
  },

  variants: {
    fit: {
      cover: {
        objectFit: 'cover',
      },
      contain: {
        objectFit: 'contain',
      },
      fill: {
        objectFit: 'fill',
      },
      none: {
        objectFit: 'none',
      },
      'scale-down': {
        objectFit: 'scale-down',
      },
    },

    radius: {
      none: {
        borderRadius: radiusMap.none,
      },
      sm: {
        borderRadius: radiusMap.sm,
      },
      md: {
        borderRadius: radiusMap.md,
      },
      lg: {
        borderRadius: radiusMap.lg,
      },
      full: {
        borderRadius: radiusMap.full,
      },
    },

    bordered: {
      true: {
        border: 'var(--border-width-1) solid var(--color-border)',
      },
      false: {},
    },

    shadow: {
      true: {
        boxShadow: 'var(--shadow-md)',
      },
      false: {},
    },

    isLoading: {
      true: {
        opacity: 0,
      },
      false: {},
    },

    hasError: {
      true: {
        opacity: 0,
      },
      false: {},
    },
  },

  defaultVariants: {
    fit: 'cover',
    radius: 'none',
    bordered: false,
    shadow: false,
    isLoading: false,
    hasError: false,
  },
});

export const loadingSkeleton = style({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(
    90deg,
    var(--color-background-secondary) 0%,
    var(--color-background-tertiary) 50%,
    var(--color-background-secondary) 100%
  )`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} ${SHIMMER_DURATION} infinite`,
});

export const loadingSkeletonRadius = styleVariants(radiusMap, (radius) => ({
  borderRadius: radius,
}));

export const errorContainer = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--color-background-secondary)',
  color: 'var(--color-secondary-foreground)',
  padding: 'var(--spacing-4)',
  textAlign: 'center',
  fontSize: 'var(--font-size-sm)',
  gap: 'var(--spacing-2)',
});

export const errorContainerRadius = styleVariants(radiusMap, (radius) => ({
  borderRadius: radius,
}));

export const caption = recipe({
  base: {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-secondary-foreground)',
    lineHeight: 'var(--line-height-normal)',
  },

  variants: {
    position: {
      bottom: {
        marginTop: 'var(--spacing-2)',
        padding: '0 var(--spacing-1)',
      },
      overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 'var(--spacing-3)',
        color: 'white',
        zIndex: 1, // Above gradient overlay
      },
    },

    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },
  },

  defaultVariants: {
    position: 'bottom',
    align: 'center',
  },
});
