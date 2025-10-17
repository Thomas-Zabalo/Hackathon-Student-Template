'use client';
import AnimatedContainer from '@/components/AnimatedContainer';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

const TeamHero = () => {
    const { heroContainerType } = useTheme();
    const isWide = heroContainerType === 'wide';

    return (
        <AnimatedContainer
            visibleClass="!slide-in-from-top-0"
            className={`${isWide ? 'relative' : 'pt-6'}`}
        >
            <div className="container">
                <div
                    className={`relative ${
                        isWide
                            ? ''
                            : 'shadow-black-card overflow-hidden rounded-3xl lg:rounded-4xl'
                    }`}
                >
                    <Navbar />
                    <div className="lg:my-16 mt-10 px-6 lg:px-0 flex flex-col items-center text-center">
                        <h1 className="font-bold text-4xl lg:text-8xl font-bold leading-tight text-black dark:text-white">
                            Les Équipes
                        </h1>
                        <p className="mt-6 description text-black/72 dark:text-white/72 text-lg lg:text-2xl max-w-xl">
                            Découvre toutes les équipes de babyfoot et crée la tienne pour
                            affronter les autres !
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default TeamHero;
