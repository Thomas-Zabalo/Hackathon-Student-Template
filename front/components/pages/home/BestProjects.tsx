import { cn } from '@/lib/utils';
import React from 'react';
import { FaChartLine, FaHistory, FaTrophy } from 'react-icons/fa';

const babyfootStatsData = [
    { icon: FaChartLine, title: 'Statistiques par équipe', description: 'Suis les performances de ton équipe à chaque partie.' },
    { icon: FaHistory, title: 'Historique des parties', description: 'Retrouve tous tes anciens matchs et leurs résultats.' },
    { icon: FaTrophy, title: 'Évolution dans campus', description: 'Visualise les match chaque semaine.' },
];

type RealEstateBestProjectItemProps = {
    icon: React.ElementType;
    title: string;
    description: string;
};

type RealEstateBestProjectsProps = {
    items?: RealEstateBestProjectItemProps[];
};

const HomeBestProjects: React.FC<React.HTMLAttributes<HTMLDivElement> & RealEstateBestProjectsProps> = ({ className, items, ...props }) => {
    return (
        <div className={cn('mt-24 lg:mt-64 container', className)} {...props}>
            <div className="w-full flex flex-wrap items-start justify-between gap-6">
                <h1 className="max-w-[36rem] text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 leading-tight">
                    Toutes Tes Parties, Tous Tes Scores, En Un Seul Endroit
                </h1>
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(items ?? babyfootStatsData).map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-start gap-4 p-6 rounded-3xl border border-white/12 bg-white dark:bg-surface-950 shadow-lg hover:shadow-2xl transition-all"
                        >
                            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-main-gradient/20 dark:bg-main-gradient/30 transition-all duration-300 group-hover:scale-105">
                                <Icon className="text-3xl text-main-gradient" />
                            </div>
                            <h5 className="text-lg font-semibold text-center text-surface-950 dark:text-surface-0 mt-2">{item.title}</h5>
                            <p className="text-center text-surface-500 dark:text-white/64">{item.description}</p>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default HomeBestProjects;
