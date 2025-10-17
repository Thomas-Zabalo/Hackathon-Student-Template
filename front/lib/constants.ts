import { HeroContainerStyleType, PrimaryColorType, SurfaceColorType } from './types';
export const COLOR_DEGREES = ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

export const BG_GRADIENT_COLORS: Record<PrimaryColorType, { from: string; to: string }> = {
    emerald: {
        from: '#1EAF81',
        to: '#1BE1A2'
    },
    green: {
        from: '#1EAF53',
        to: '#1BE164'
    },
    lime: {
        from: '#73AF1E',
        to: '#8EE11B'
    },
    red: {
        from: '#AF1E1E',
        to: '#E11B1B'
    },
    orange: {
        from: '#AF511E',
        to: '#E1601B'
    },
    amber: {
        from: '#AF6B1E',
        to: '#E1851B'
    },
    yellow: {
        from: '#AF811E',
        to: '#E1A21B'
    },
    teal: {
        from: '#1EAFA3',
        to: '#1BE1D0'
    },
    cyan: {
        from: '#1E92AF',
        to: '#1BB9E1'
    },
    sky: {
        from: '#1E7FAF',
        to: '#1B9FE1'
    },
    blue: {
        from: '#1E27AF',
        to: '#1B59E1'
    },
    indigo: {
        from: '#251EAF',
        to: '#251BE1'
    },
    violet: {
        from: '#531EAF ',
        to: '#641BE1'
    },
    purple: {
        from: '#531EAF',
        to: '#641BE1'
    },
    fuchsia: {
        from: '#9E1EAF',
        to: '#CA1BE1'
    },
    pink: {
        from: '#AF1E5F',
        to: '#E11B74'
    },
    rose: {
        from: '#AF1E3D',
        to: '#E11B46'
    }
};

export const primaryColors: PrimaryColorType[] = ['amber', 'blue', 'cyan', 'emerald', 'fuchsia', 'green', 'indigo', 'lime', 'orange', 'pink', 'purple', 'red', 'rose', 'sky', 'teal', 'violet', 'yellow'];

export const surfaceColors: SurfaceColorType[] = ['gray', 'neutral', 'slate', 'stone', 'zinc'];

export const heroContainerStyleType: HeroContainerStyleType[] = ['compact', 'wide'];
