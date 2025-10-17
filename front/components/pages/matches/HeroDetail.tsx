'use client';
import AnimatedContainer from '@/components/AnimatedContainer';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';


const MatchDetailHero = () => {
    const { heroContainerType } = useTheme();
    const isWide = heroContainerType === 'wide';
    return (
        <AnimatedContainer visibleClass="!slide-in-from-top-0" className={`${isWide ? 'relative' : 'pt-6'}`}>
            <div className="container">
                <div className={`relative ${isWide ? '' : 'shadow-black-card overflow-hidden rounded-3xl lg:rounded-4xl '}`}>
                    <Navbar />
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default MatchDetailHero;
