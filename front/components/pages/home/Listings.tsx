import AnimatedContainer from '@/components/AnimatedContainer';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const RealEstateListings: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    return (
        <AnimatedContainer className={cn('container max-w-6xl flex lg:flex-row flex-col gap-12 mt-24 lg:mt-64', className)} {...props}>
            <div className="w-full lg:flex-1 h-[31rem] rounded-3xl overflow-hidden shadow-blue-card relative">
                <Image fill sizes="auto" className="object-cover" src="/pages/real-estate/listings-image.jpg" alt="Real Estate Listings Image" />
                <div className="absolute inset-0 -z-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.07)_0%,rgba(0,0,0,0.07)_100%)]" />
            </div>
            <div className="flex-1">
                <span className="badge">Ynov Campus</span>
                <h3 className="text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 !leading-tight mt-4">Explore une nouvelle façon de jouer</h3>
                <p className="text-lg text-surface-500 dark:text-white/64 mt-6">
                    Réserve un créneau en un clic, rejoins ton équipe, lance une partie et suis tes statistiques.
                </p>
                <p className="text-lg text-surface-500 dark:text-white/64 mt-8">
                    Plus besoin d’attendre ou de se demander qui a gagné : tout est enregistré, tout est connecté.
                </p>
            </div>
        </AnimatedContainer>
    );
};

export default RealEstateListings;
