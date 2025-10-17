import AnimatedContainer from '@/components/AnimatedContainer';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const ReversedRealEstateListings: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    return (
        <AnimatedContainer className={cn('container max-w-6xl flex lg:flex-row flex-col gap-12 mt-24 lg:mt-64', className)} {...props}>
            <div className="flex-1">
                <span className="badge">Nouveau</span>
                <h3 className="text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 !leading-tight mt-4"> Transforme tes pauses en expérience connectée</h3>
                <p className="text-lg text-surface-500 dark:text-white/64 mt-6">
                    Peu importe ton profil, <strong>Lagitech</strong> est ton terrain de jeu digital.
                </p>
                <p className="text-lg text-surface-500 dark:text-white/64 mt-8">
                    Rejoins la communauté, crée des matchs, participe aux tournois et découvre une nouvelle façon de vivre le Souk !
                </p>
                <button
                    className="mt-6
                    px-5 py-2 rounded-full flex items-center justify-center gap-2 font-medium cursor-pointer
                    text-surface-950 bg-transparent border border-black/24
                    hover:bg-black/10 hover:opacity-80 transition-all duration-300
                    dark:bg-white dark:text-black dark:border-0 dark:shadow-blue-card
                    ">
                    Commencer Maintenant
                </button>
            </div>
            <div className="w-full lg:flex-1 h-[31rem] rounded-3xl overflow-hidden shadow-blue-card relative">
                <Image fill sizes="auto" className="object-cover" src="/pages/real-estate/listings-image.jpg" alt="Real Estate Listings Image" />
                <div className="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.07)_0%,rgba(0,0,0,0.07)_100%)]" />
            </div>

        </AnimatedContainer>
    );
};

export default ReversedRealEstateListings;
