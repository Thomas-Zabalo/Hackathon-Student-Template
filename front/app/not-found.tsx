'use client';
import CirclePattern from '@/components/CirclePattern';
import Navbar from '@/components/Navbar';
import React from 'react';
import GenesisLogo from '@/components/icons/shapes/genesis-logo.svg';
import Link from 'next/link';
import AnimatedContainer from '@/components/AnimatedContainer';
import { useTheme } from '@/context/ThemeContext';
const NotFoundPage = () => {
    const { heroContainerType } = useTheme();
    const isWide = heroContainerType === 'wide';
    return (
        <AnimatedContainer className={isWide ? 'shadow-black-card bg-main-gradient' : 'pt-6'}>
            <div className="container">
                <div className={` min-h-[47rem] lg:h-[84rem] relative ${isWide ? '' : 'rounded-3xl lg:rounded-4xl shadow-black-card bg-main-gradient'}`}>
                    <div className="relative z-20 ">
                        <Navbar />
                        <div className="mt-8 lg:mt-24 flex flex-col items-center pb-20 px-4">
                            <GenesisLogo className="w-1/2 sm:w-1/4 lg:w-[396px]" />
                            <h1 className="mt-4 lg:mt-16 text-4xl lg:text-6xl font-semibold title !leading-normal text-center">Something gone wrong!</h1>
                            <p className="mt-4 text-base lg:text-xl text-white/64 text-center">The page you were looking for doesn’t exist.</p>
                            <Link href="/" className="button-regular mt-8 px-8">
                                Go to home{' '}
                            </Link>
                        </div>
                    </div>
                    <div className="absolute inset-0 overflow-hidden">
                        <CirclePattern className="w-full lg:w-[82rem] absolute left-1/2 -translate-x-1/2 top-[36rem] lg:top-[calc(100%-30rem)]" />
                    </div>
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default NotFoundPage;
