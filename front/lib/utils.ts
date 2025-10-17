import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import colors from 'tailwindcss/colors';
import { BG_GRADIENT_COLORS, COLOR_DEGREES } from './constants';
import { PrimaryColorType, SurfaceColorType } from './types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const convertHexToRGBA = (hexCode: string, opacity: number = 1) => {
    let hex = hexCode.replace('#', '');

    if (hex.length === 3) {
        hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    if (opacity > 1 && opacity <= 100) {
        opacity = opacity / 100;
    }

    return { r, g, b, opacity };
};

type ThemeConfig = { type: 'primary'; color: PrimaryColorType } | { type: 'surface'; color: SurfaceColorType };
export const applyTheme = (config: ThemeConfig) => {
    const { type, color } = config;
    const styles: Record<string, string> = {};
    const isClient = typeof window !== 'undefined';

    COLOR_DEGREES.forEach((degree: string) => {
        const root: HTMLElement | undefined = isClient ? document.documentElement : undefined;
        if (type === 'primary') {
            styles['--bg-gradient-from'] = BG_GRADIENT_COLORS[color].from;
            styles['--bg-gradient-to'] = BG_GRADIENT_COLORS[color].to;
            root?.style.setProperty('--bg-gradient-from', BG_GRADIENT_COLORS[color].from);
            root?.style.setProperty('--bg-gradient-to', BG_GRADIENT_COLORS[color].to);
        }
        const { r, g, b } = convertHexToRGBA(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            degree === '0' ? colors.white : colors[color][degree]
        );
        styles[`--${type}-${degree}`] = `${r} ${g} ${b}`;
        root?.style.setProperty(`--${type}-${degree}`, `${r} ${g} ${b}`);
    });

    return styles;
};
