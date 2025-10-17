import type { Config } from 'tailwindcss';
const config: Config = {
    darkMode: 'class',
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    corePlugins: {
        container: false
    },
    theme: {
        extend: {
            backgroundImage: {
                'main-gradient': 'var(--gradient-background)',
                'main-gradient-to-top': 'var(--gradient-background-to-top)',
                'main-gradient-to-left': 'var(--gradient-background-to-left)'
            },
            colors: {
                /*Primary Colors*/
                'primary-0': 'rgb(var(--primary-0))',
                'primary-100': 'rgb(var(--primary-100))',
                'primary-200': 'rgb(var(--primary-200))',
                'primary-300': 'rgb(var(--primary-300))',
                'primary-400': 'rgb(var(--primary-400))',
                'primary-500': 'rgb(var(--primary-500))',
                'primary-600': 'rgb(var(--primary-600))',
                'primary-700': 'rgb(var(--primary-700))',
                'primary-800': 'rgb(var(--primary-800))',
                'primary-900': 'rgb(var(--primary-900))',
                'primary-950': 'rgb(var(--primary-950))',
                /*Surface Colors*/
                'surface-0': 'rgb(var(--surface-0))',
                'surface-100': 'rgb(var(--surface-100))',
                'surface-200': 'rgb(var(--surface-200))',
                'surface-300': 'rgb(var(--surface-300))',
                'surface-400': 'rgb(var(--surface-400))',
                'surface-500': 'rgb(var(--surface-500))',
                'surface-600': 'rgb(var(--surface-600))',
                'surface-700': 'rgb(var(--surface-700))',
                'surface-800': 'rgb(var(--surface-800))',
                'surface-900': 'rgb(var(--surface-900))',
                'surface-950': 'rgb(var(--surface-950))'
            },
            borderRadius: {
                '4xl': '2rem',
                '2.5xl': '1.25rem'
            },
            boxShadow: {
                card: 'var(--card-shadow)',
                'black-card': 'var(--black-card-shadow)',
                'blue-card': 'var(--blue-card-shadow)',
                stroke: 'var(--stroke-shadow)'
            },
            opacity: {
                1: '0.01',
                4: '0.04',
                6: '0.06',
                8: '0.08',
                12: '0.12',
                16: '0.16',
                24: '0.24',
                32: '0.32',
                56: '0.56',
                64: '0.64',
                72: '0.72',
                88: '0.88'
            },
            zIndex: {
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                6: '6',
                7: '7',
                8: '8',
                9: '9'
            },
            fontSize: {
                '8xl': '6rem'
            },
            gap: {
                18: '4.5rem'
            },
            width: {
                18: '4.5rem'
            },
            height: {
                18: '4.5rem'
            },
            margin: {
                18: '4.5rem'
            },
            animation: {
                'infinite-scroll': 'infinite-scroll 40s linear infinite',
                'cloud-idle': 'cloud-idle 60s infinite alternate'
            },
            animationDuration: {
                '600': '600ms'
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' }
                },
                'cloud-idle': {
                    '25%': { transform: 'translate3d(80px, 0, 0)' },
                    '50%': { transform: 'translate3d(75px, -20px, 0)' },
                    '75%': { transform: 'translate3d(55px, 25px, 0) ' },
                    '100%': { transform: 'translate3d(35px, -15px, 0) ' }
                }
            }
        }
    },
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('tailwindcss-animation-delay'),
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require('tailwindcss-animate')
    ]
};
export default config;
