'use client';
import AnimatedContainer from '@/components/AnimatedContainer';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';


const MatchesHero = () => {
    const { heroContainerType } = useTheme();
    const isWide = heroContainerType === 'wide';
    return (
        <AnimatedContainer visibleClass="!slide-in-from-top-0" className={`${isWide ? 'relative' : 'pt-6'}`}>
            <div className="container">
                <div className={`relative ${isWide ? '' : 'shadow-black-card overflow-hidden rounded-3xl lg:rounded-4xl '}`}>
                    <Navbar />
                    <div className="lg:my-16 mt-10 px-6 lg:px-0 flex flex-col items-center">
                        <h1 className="font-bold text-4xl lg:text-8xl font-bold leading-tight text-black dark:text-white">
                            Les Matchs du Souk
                        </h1>
                        <p className="mt-6 description text-black/72 dark:text-white/72 text-lg lg:text-2xl max-w-lg">
                            Suis les scores en direct !
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default MatchesHero;
