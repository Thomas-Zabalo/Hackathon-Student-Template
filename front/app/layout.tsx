import { ThemeProvider } from '@/context/ThemeContext';
import { HeroContainerStyleType, PrimaryColorType, SurfaceColorType } from '@/lib/types';
import { applyTheme } from '@/lib/utils';
import type { Metadata } from 'next';
import './fonts/fonts.css';
import './globals.css';

export const metadata: Metadata = {
    title: 'Lagitech | BabyFoot',
    description: 'LagitechFoot transforme vos pauses babyfoot en expérience connectée : réserve une table, défie tes amis et suis les scores en direct.',
    openGraph: {
        title: 'Lagitech | BabyFoot Connecté',
        description: 'LagitechFoot : le babyfoot connecté du campus Ynov. Organise des matchs, rejoins des tournois et suis tes statistiques en temps réel.',
        images: ''
    }
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const themeProps:{
        primary:PrimaryColorType;
        surface:SurfaceColorType;
        heroContainerType:HeroContainerStyleType;
    } = {
        primary: 'blue',
        surface: 'slate',
        heroContainerType: 'wide'
    };

    const primaryVariables = applyTheme({ type: 'primary', color: themeProps.primary });
    const surfaceVariables = applyTheme({ type: 'surface', color: themeProps.surface });

    return (
        <html lang="en" style={{ ...primaryVariables, ...surfaceVariables }} suppressHydrationWarning>
            <body className={`antialiased pb-6 relative`} suppressHydrationWarning>
                <ThemeProvider {...themeProps}>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
