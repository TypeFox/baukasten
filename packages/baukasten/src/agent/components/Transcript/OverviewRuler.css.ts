import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

/**
 * The strip itself.
 *
 * Narrow, but the marks inside overflow it to reach a usable hit target — a
 * 6px-wide button is legal and untappable. The strip does not capture pointer
 * events of its own so the transcript's scrollbar beside it stays reachable.
 */
export const ruler = style({
    position: 'relative',
    flexShrink: 0,
    width: 'var(--bk-spacing-2)',
    alignSelf: 'stretch',
    pointerEvents: 'none',
});

export const mark = recipe({
    base: {
        position: 'absolute',
        left: '50%',
        // Reaches beyond the strip for a real hit target, then pulls the visual
        // back with a border-box inset.
        width: 'var(--bk-spacing-4)',
        height: 'var(--bk-spacing-3)',
        transform: 'translate(-50%, -50%)',
        padding: 0,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        pointerEvents: 'auto',

        selectors: {
            '&::after': {
                content: '""',
                position: 'absolute',
                inset: '40% 25%',
                borderRadius: 'var(--bk-radius-sm)',
                backgroundColor: 'currentColor',
            },
            '&:hover::after': { inset: '30% 15%' },
            '&:focus-visible': {
                outline: 'var(--bk-border-width-2) solid var(--bk-color-focus)',
                outlineOffset: '-2px',
                borderRadius: 'var(--bk-radius-sm)',
            },
        },
    },

    variants: {
        kind: {
            failure: { color: 'var(--bk-color-warning)' },
            // The one that stopped the run reads differently from the ones the
            // agent routed around.
            'protocol-failure': { color: 'var(--bk-color-danger)' },
            blocked: { color: 'var(--bk-color-info)' },
            approval: { color: 'var(--bk-color-info)' },
            edit: { color: 'var(--bk-color-success)' },
        },
        active: {
            true: {
                selectors: {
                    '&::after': { inset: '25% 10%' },
                },
            },
            false: {},
        },
    },

    defaultVariants: { kind: 'failure', active: false },
});
