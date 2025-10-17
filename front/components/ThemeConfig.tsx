'use client';
import { useTheme } from '@/context/ThemeContext';
import { heroContainerStyleType, primaryColors, surfaceColors } from '@/lib/constants';
import useOutsideClick from '@/lib/hooks/use-outside-click';
import { cn } from '@/lib/utils';
import React from 'react';
import colors from 'tailwindcss/colors';

export const ThemeConfig: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    const themeConfigRef = React.useRef<HTMLDivElement>(null);
    const { isOpenConfig, primary, surface, heroContainerType, changeSurface, changePrimary, changeHeroContainerType, handleOpenConfig, theme, themes, setTheme } = useTheme();
    const [themeState, setThemeState] = React.useState<string | undefined>(undefined);

    useOutsideClick({
        ref: themeConfigRef,
        handler: () => handleOpenConfig(false)
    });

    React.useEffect(() => {
        setThemeState(theme);
    }, [theme]);

    return (
        <div ref={themeConfigRef} className={cn('fixed bottom-6 xl:bottom-auto xl:top-6 right-6 z-[9999999]', className)} {...props}>
            <ThemeConfigButton />
            <div
                className={`flex flex-col gap-4 absolute bottom-[calc(100%+0.5rem)] lg:bottom-auto lg:top-[calc(100%+0.5rem)] right-0 w-60 h-fit p-3 rounded-lg bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700 shadow-sm transition-all ease-in-out
        ${isOpenConfig ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
            >
                <div>
                    <div className="font-medium mb-1.5">Primary Color</div>
                    <div className="grid grid-cols-7 gap-2.5">
                        {primaryColors.map((item) => (
                            <button
                                key={item}
                                title={item}
                                onClick={() => changePrimary(item)}
                                className={`w-5 h-5 rounded-md border border-black/16 dark:border-white/12 outline outline-offset-2 ${primary === item ? 'outline-1' : 'focus:outline-1 outline-0'}`}
                                style={{
                                    backgroundColor: colors[item][500],
                                    outlineColor: colors[item][500]
                                }}
                            ></button>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="font-medium mb-1.5">Surface Color</div>
                    <div className="grid grid-cols-7 gap-2.5">
                        {surfaceColors.map((item) => (
                            <button
                                key={item}
                                title={item}
                                onClick={() => changeSurface(item)}
                                className={`w-5 h-5 rounded-md border border-black/16 dark:border-white/12 outline outline-offset-2 ${surface === item ? 'outline-1' : 'focus:outline-1 outline-0'}`}
                                style={{
                                    backgroundColor: colors[item][500],
                                    outlineColor: colors[item][500]
                                }}
                            ></button>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="font-medium mb-1.5">Hero Container Style</div>
                    <div className="flex items-center divide-x h-9 w-fit rounded-lg border border-surface-200 dark:border-surface-700 divide-surface-200  dark:divide-surface-700 overflow-hidden">
                        {heroContainerStyleType.map((item) => (
                            <button
                                key={item}
                                onClick={() => changeHeroContainerType(item)}
                                className={`h-full px-3  capitalize ${heroContainerType === item ? 'bg-surface-100 dark:bg-surface-800' : 'hover:bg-surface-100 dark:hover:bg-surface-800'}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="font-medium mb-1.5">Theme</div>
                    <div className="flex items-center divide-x h-9 w-fit rounded-lg border border-surface-200 dark:border-surface-700 divide-surface-200  dark:divide-surface-700 overflow-hidden">
                        {themes.map((item) => (
                            <button key={item} onClick={() => setTheme(item)} className={`h-full px-3  capitalize ${themeState === item ? 'bg-surface-100 dark:bg-surface-800' : 'hover:bg-surface-100 dark:hover:bg-surface-800'}`}>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ThemeConfigButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = () => {
    const { handleOpenConfig } = useTheme();
    return (
        <button onClick={() => handleOpenConfig()} className="relative group rounded-lg w-10 h-10 flex items-center justify-center transition-all overflow-hidden">
            <span
                style={{
                    animationDuration: '2s',
                    background: `conic-gradient(from 90deg, #f97316, #f59e0b, #eab308, #84cc16, #22c55e, #10b981, #14b8a6, #06b6d4,#0ea5e9,#3b82f6,#6366f1,#8b5cf6,#a855f7,#d946ef,#ec4899,#f43f5e)`
                }}
                className="absolute -top-5 -left-5 w-20 h-20 animate-spin"
            ></span>
            <span style={{ inset: '1px', borderRadius: '0.42rem' }} className="absolute z-2 bg-surface-0 dark:bg-surface-900 group-hover:bg-surface-100 dark:group-hover:bg-surface-800 transition-all"></span>
            <span className="relative z-10 text-surface-800 dark:text-surface-100 flex">
                <i className="pi pi-palette text-lg leading-none"></i>
            </span>
        </button>
    );
};
