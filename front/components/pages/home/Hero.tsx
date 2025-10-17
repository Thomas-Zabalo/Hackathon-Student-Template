'use client';
import AnimatedContainer from '@/components/AnimatedContainer';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RealEstateHero = () => {
    const localLoader = ({ src }: { src: string }) => src;
    const { heroContainerType } = useTheme();
    const isWide = heroContainerType === 'wide';

    const handleSmoothScroll = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const target = document.querySelector('#babyfoot');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <AnimatedContainer visibleClass="!slide-in-from-top-0" className={`${isWide ? 'relative h-[56rem] lg:h-[50rem]' : 'pt-6'}`}>
            {isWide ? (
                <div className="absolute w-full h-[calc(100%-6rem)] top-0 left-0">
                    <Image className="w-full h-full object-cover absolute inset-0 -z-2 opacity-30" loader={localLoader} src="/pages/home/ynov-campus-toulouse.jpg" alt="Logistic Hero Background Image" fill sizes="auto" loading="eager" />
                    <div className="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]" />
                </div>
            ) : null}

            <div className="container">
                <div className={`h-[50rem] lg:h-[44rem] relative ${isWide ? '' : 'shadow-black-card overflow-hidden rounded-3xl lg:rounded-4xl'}`}>
                    {!isWide && (
                        <>
                            <Image className="w-full h-full object-cover absolute inset-0 -z-2" src="/pages/home/ynov-campus-toulouse.jpg" alt="Logistic Hero Background Image" fill sizes="auto" loading="eager" />
                            <div className="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.12)_100%)]" />
                        </>
                    )}

                    <Navbar />

                    <div className="lg:mt-16 lg:ml-24 mt-10 px-6 lg:px-0">
                        <h1
                            className="font-bold text-4xl lg:text-8xl leading-tight max-w-5xl
              text-black dark:text-transparent
              dark:bg-gradient-to-b dark:from-white/85 dark:to-white
              dark:bg-clip-text dark:-webkit-background-clip-text
              dark:-webkit-text-fill-color-transparent"
                        >
                            Pause Café ! Pause babyfoot
                        </h1>

                        <p className="mt-6 description text-black/72 dark:text-white/72 max-w-lg">Réserve une table, défie tes amis et suis les scores en direct. Le babyfoot à Ynov passe à l’ère du digital.</p>

                        <div className="mt-8 flex items-center gap-3">
                            {/* TODO: Si connecté → rediriger vers la page match sinon vers login */}
                            <Link href={''} className="button-regular">
                                Créer un match
                            </Link>

                            <Link
                                href="#babyfoot"
                                onClick={handleSmoothScroll}
                                style={{ cursor: 'pointer', scrollBehavior: 'smooth' }}
                                className="min-w-28 px-5 py-2 rounded-full flex items-center justify-center gap-2 font-medium
                text-surface-950 dark:text-surface-0
                bg-surface-0 dark:bg-transparent
                hover:opacity-80 shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),
                0px_2px_2px_-1.5px_rgba(18,18,23,0.02),
                0px_1px_1px_-0.5px_rgba(18,18,23,0.02),
                0px_0px_0px_1px_rgba(18,18,23,0.02)]
                dark:backdrop-blur-lg border dark:border-white/24 dark:hover:opacity-80
                transition-all"
                            >
                                Découvrir le projet
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default RealEstateHero;
