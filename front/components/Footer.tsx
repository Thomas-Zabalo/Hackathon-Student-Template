import { cn } from '@/lib/utils';
import React from 'react';
import AnimatedContainer from './AnimatedContainer';

type FooterProps = {
    image?: string;
    transparent?: boolean;
    noContainer?: boolean;
};

const Footer: React.FC<React.HTMLAttributes<HTMLElement> & FooterProps> = ({ children }) => {
    return (
        <AnimatedContainer>
            <footer className='container mt-2'>
                <div className={cn('w-full px-5 pt-0.5 lg:pt-[0.5rem] pb-10 overflow-hidden relative shadow-none' )}>
                    {children}
                    <div className="w-full lg:w-[calc(100%-5rem)] lg:mt-12 pt-10 flex items-center justify-center text-surface-0 border-t border-dashed border-black/10 dark:border-white/10 text-black dark:text-white">© {new Date().getFullYear()} Ynov Toulouse — Projet Hackathon Babyfoot Connecté</div>
                </div>
            </footer>
        </AnimatedContainer>
    );
};

export default Footer;