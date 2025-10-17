'use client';
import { HeroContainerStyleType, PrimaryColorType, SurfaceColorType } from '@/lib/types';
import { applyTheme } from '@/lib/utils';
import { ThemeProvider as NextThemesProvider, useTheme as useNextThemes } from 'next-themes';
import { type ThemeProviderProps as NextThemesProviderProps } from 'next-themes/dist/types';
import React, { useState } from 'react';

interface ThemeContext {
    primary: PrimaryColorType;
    surface: SurfaceColorType;
    heroContainerType: HeroContainerStyleType;
    changePrimary: (color: PrimaryColorType) => void;
    changeSurface: (color: SurfaceColorType) => void;
    changeHeroContainerType: (type: HeroContainerStyleType) => void;
    isOpenConfig: boolean;
    handleOpenConfig: (val?: boolean) => void;
}

const ThemeContext = React.createContext<ThemeContext | undefined>(undefined);

interface ThemeProviderProps {
    primary?: PrimaryColorType;
    surface?: SurfaceColorType;
    heroContainerType?: HeroContainerStyleType;
    children?: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps & NextThemesProviderProps> = ({ children, ...props }) => {
    const [isOpenConfig, setIsOpenConfig] = useState<boolean>(false);
    const [heroContainerType, setHeroContainerType] = useState<ThemeContext['heroContainerType']>(props.heroContainerType ?? 'wide');
    const [primary, setPrimary] = React.useState<ThemeContext['primary']>(props.primary ?? 'blue');
    const [surface, setSurface] = React.useState<ThemeContext['surface']>(props.surface ?? 'slate');

    const changeHeroContainerType = (type: ThemeContext['heroContainerType']) => {
        setHeroContainerType(type);
    };

    const changePrimary = (color: ThemeContext['primary']) => {
        setPrimary(color);
        applyTheme({ type: 'primary', color });
    };

    const changeSurface = (color: ThemeContext['surface']) => {
        setSurface(color);
        applyTheme({ type: 'surface', color });
    };

    const handleOpenConfig = (val?: boolean) => {
        if (typeof val === 'boolean') {
            setIsOpenConfig(val);
        } else {
            setIsOpenConfig((prev) => !prev);
        }
    };
    const value = React.useMemo(
        () => ({
            primary,
            changePrimary,
            surface,
            changeSurface,
            isOpenConfig,
            handleOpenConfig,
            heroContainerType,
            changeHeroContainerType
        }),
        [heroContainerType, isOpenConfig, primary, surface]
    );

    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
            <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
        </NextThemesProvider>
    );
};

export const useTheme = (): ThemeContext & ReturnType<typeof useNextThemes> => {
    const nextThemeContext = useNextThemes();
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return { ...context, ...nextThemeContext };
};
