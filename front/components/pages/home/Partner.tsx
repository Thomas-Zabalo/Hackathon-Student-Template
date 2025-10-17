import AnimatedContainer from '@/components/AnimatedContainer';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const realEstatePartnerData = [
    {
        image: '/pages/real-estate/partner-image-1.jpg',
        stats: '3+',
        description: 'Babyfoots Connectés',
        delay: 0
    },
    {
        image: '/pages/real-estate/partner-image-2.jpg',
        stats: '500+',
        description: 'Étudiants Concernés',
        delay: 400
    },
    {
        image: '/pages/real-estate/partner-image-3.jpg',
        stats: '50+',
        description: 'Matchs Joués Chaque Semaine',
        delay: 800
    }
];
const HomePartner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    return (
        <div id="babyfoot" className={cn('container mt-24 lg:mt-32 ', className)} {...props}>
            <div className="w-full flex flex-wrap items-start justify-between gap-6">
                <h1 className="max-w-[34rem] text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 leading-tight">Ton Nouvel Outil De Jeu Au Souk</h1>
                <div className="max-w-[34rem] ">
                    <p className="text-lg text-surface-500 dark:text-white/64">
                        Nous simplifions la vie sur le campus et rendons chaque pause plus fun.<br /><br />
                        Le tout dans une appli fluide, intuitive et pensée pour la communauté Ynovien(ne)s, afin que chaque étudiant profite pleinement du babyfoot connecté.
                    </p>
                </div>
            </div>
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {realEstatePartnerData.map((item, index) => (
                    <AnimatedContainer key={index} delay={item.delay} className="relative h-[34rem] rounded-3xl overflow-hidden shadow-blue-card">
                        <Image fill sizes="auto" className="object-cover -z-2" src={item.image} alt="Real Estate Partner Image" />
                        <div className="-z-1 inset-0 absolute bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.48)_64.82%)]" />
                        <div className="absolute z-1 bottom-8 left-8 right-8">
                            <h1 className="text-8xl font-semibold title">{item.stats}</h1>
                            <p className="text-white/88">{item.description}</p>
                        </div>
                    </AnimatedContainer>
                ))}
            </div>
        </div>
    );
};

export default HomePartner;
