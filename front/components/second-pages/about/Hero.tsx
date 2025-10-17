'use client';
import AnimatedContainer from '@/components/AnimatedContainer';
import CirclePattern from '@/components/CirclePattern';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

const AboutHero = () => {
    const { heroContainerType } = useTheme();
    const isWide = heroContainerType === 'wide';
    return (
        <AnimatedContainer visibleClass="!slide-in-from-top-0" className={`${isWide ? 'relative' : 'pt-6'}`}> 
            <div className="container relative">
                        <CirclePattern className="absolute w-[82rem] -bottom-full translate-y-24 left-1/2 -translate-x-1/2" />
                </div>
                <div className="relative z-20">
                    <Navbar />
                    <h1 className="max-w-[calc(100%-3rem)] md:max-w-5xl mx-auto font-bold text-black dark:text-white lg:text-7xl text-4xl text-center mt-18">Dashboard Administrateur</h1>
                    <p className="mt-6 max-w-[calc(100%-3rem)] md:max-w-2xl text-lg lg:text-xl text-black/64 dark:text-white/64 text-center mx-auto">
                        Bienvenue sur le tableau de bord administrateur. Gérez les utilisateurs, et les différents babyfoot en toute simplicité.
                    </p>
                </div>

        </AnimatedContainer>
    );
};

export default AboutHero;
