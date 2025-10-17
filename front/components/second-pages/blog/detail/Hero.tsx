'use client';
import AnimatedContainer from '@/components/AnimatedContainer';
import CirclePattern from '@/components/CirclePattern';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';

const BlogDetailHero = () => {
    const { heroContainerType } = useTheme();
    const isWide = heroContainerType === 'wide';
    return (
        <AnimatedContainer visibleClass="!slide-in-from-top-0" className={`${isWide ? 'relative' : 'pt-6'}`}>
            {isWide ? <div className="bg-main-gradient h-[51.5rem] absolute top-0 inset-x-0"></div> : null}
            <div className="container relative">
                <div className={` h-[51.5rem] absolute top-0 left-4 right-4 ${isWide ? '' : 'bg-main-gradient rounded-3xl lg:rounded-4xl'}`}>
                    <div className="absolute inset-0 overflow-hidden lg:block hidden">
                        <CirclePattern className="absolute w-[82rem] -bottom-full translate-y-24 left-1/2 -translate-x-1/2" />
                    </div>
                </div>
                <div className="relative z-20">
                    <Navbar />
                    <h1 className="max-w-[calc(100%-3rem)] lg:max-w-5xl mx-auto title lg:text-6xl text-4xl text-center mt-18">SaaS Solutions for Small Businesses: What to Expect in 2024</h1>
                    <p className="mt-6 max-w-[calc(100%-3rem)] lg:max-w-4xl text-lg lg:text-xl text-white/64 text-center mx-auto">
                        Discover SaaS solutions that help small businesses automate processes, reduce costs, and improve customer relationships. Learn about the top SaaS trends for small businesses in 2024.
                    </p>
                </div>
                <div className="relative z-10 h-[35rem] max-w-[calc(100%-3rem)] lg:max-w-[calc(100%-12rem)] mt-16 lg:mt-40 mx-auto rounded-4xl shadow-black-card overflow-hidden">
                    <Image fill sizes="auto" className="object-cover" src={'/pages/blog/blog-hero.jpg'} alt="Blog Hero Image" />
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default BlogDetailHero;
