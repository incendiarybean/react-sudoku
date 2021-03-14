module.exports = {
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
    purge: {
        content: [
        ".public/index.html",
        "./src/components/*.jsx",
        "./src/components/*/*.jsx",
        "./src/components/*/*/*.jsx",
        "./src/components/*/*/*/*.jsx",
        "./src/components/*/*/*/*/*.jsx",
        "./src/JS/*.jsx",
        ],
        options: {
            safelist: [/^bg-/, /^text-/, /^hover:/],
        }
    },
    theme: {
        extend: {
            screens: {
                light: { raw: "(prefers-color-scheme: light)" },
                dark: { raw: "(prefers-color-scheme: dark)" },
                'xs': {'min': '200xp', 'max': '400px'},
            },
            transitionProperty: {
                'width': 'width',
                'height': 'height'
            },
            colors: {
                'primary':'var(--bg-preset-primary)',
                'secondary':'var(--bg-preset-secondary)',
                'accent':'var(--bg-preset-accent)',
                'hover': 'var(--bg-preset-hover)',
                'title': 'var(--bg-preset-title)',
                'default': 'var(--bg-preset-text)',
                'paragraph': 'var(--bg-preset-paragraph)',
                'field': 'var(--bg-preset-field)',
                'other': 'var(--bg-preset-other)',
                'hint': 'var(--bg-preset-hint)',
                'accent': 'var(--bg-accent)',
                'accent-light': 'var(--bg-accent-light)',
            },
            width:{
                'xl': '34rem',
            },
        },
        cursor: {
            auto: 'auto',
            default: 'default',
            pointer: 'pointer',
            wait: 'wait',
            text: 'text',
            move: 'move',
            'not-allowed': 'not-allowed',
            crosshair: 'crosshair',
            'zoom-in': 'zoom-in',
            grabbing: 'grabbing',
            grab: 'grab'
        },
        maxHeight: {
            '0': '0',
            '1/4': '25%',
            '1/3': '33%',
            '2/5': '40%',
            '1/2': '50%',
            '3/4': '75%',
            '4/5': '80%',
            '85': '85%',
            '90': '90%',
            'full': '100%',
        },
        maxWidth: {
            '96': '24rem',
        },
        minWidth: {
            '0': '0',
            '56': '14rem',
            'xl': '28rem',
            '1/5': '20%',
            '1/4': '25%',
            '1/3': '33%',
            '2/5': '40%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        }
    },
    variants: {
        rotate: ['active', 'group-hover'],
        display: ['responsive', 'hover', 'focus', 'group-hover'],
        width: ['responsive', 'hover', 'focus', 'group-hover'],
        transitionDuration: ['responsive', 'hover', 'focus', 'group-hover'],
        transitionProperty: ['responsive', 'hover', 'focus', 'group-hover'],
        textAlign: ['responsive', 'hover', 'focus'],
        borderWidth: ['responsive', 'hover', 'focus'],
        cursor: ['responsive', 'hover', 'focus', 'active'],
        fill: ['responsive', 'hover', 'focus', 'active'],
        backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
        animation: ['hover', 'focus'],
        zIndex: ['hover', 'active', 'focus', 'group-focus', 'focus-within'],
    }
}
