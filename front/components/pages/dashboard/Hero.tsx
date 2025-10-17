'use client';
import AnimatedContainer from '@/components/AnimatedContainer';
import Navbar from '@/components/Navbar';
import StaticCustomers from '@/components/StaticCustomers';
import { useTheme } from '@/context/ThemeContext';
import React, { useState } from 'react';

const PricingHero = () => {
    const [isYearly, setIsYearly] = useState(false);
    const toggleIsYearly = () => {
        setIsYearly((prev) => !prev);
    };
    const { heroContainerType } = useTheme();
    const isWide = heroContainerType === 'wide';
    return (
        <div>
            <div className={isWide ? 'bg-main-gradient shadow-black-card' : 'pt-6'}>
                <div className="container">
                    <div className={isWide ? '' : 'rounded-3xl lg:rounded-4xl bg-main-gradient shadow-black-card'}>
                        <Navbar />
                        <div className="mt-18 pb-16 max-w-[calc(100%-3rem)] mx-auto lg:max-w-none">
                            <h1 className="title text-4xl lg:text-6xl text-center mx-auto !leading-tight">
                                Comprehensive
                                <br />
                                Pricing and Fee Structures
                            </h1>
                            <p className="description max-w-2xl text-center mx-auto mt-6">Our comprehensive pricing and fee structures offer a detailed breakdown of costs, ensuring transparency and clarity for our customers.</p>
                            <div className="flex items-center justify-center gap-6 w-fit mx-auto mt-10 select-none">
                                <span className="text-xl font-medium text-white/64">Monthly</span>
                                <div
                                    onClick={toggleIsYearly}
                                    className="cursor-pointer relative w-16 h-8 rounded-full bg-white/16 backdrop-blur-[48px] transition-all border border-white/8 shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]"
                                >
                                    <div
                                        className={`
              ${isYearly ? 'left-full -translate-x-[calc(100%+0.25rem)]' : 'left-1'}
                absolute top-1/2 -translate-y-1/2 left-1 aspect-square h-[calc(100%-0.5rem)] bg-white rounded-full shadow-black-card transition-all ease-in-out
                `}
                                    />
                                </div>
                                <span className="text-xl font-medium text-white/64">Yearly</span>
                            </div>
                            <div className="mt-24 lg:mt-16 flex lg:flex-row flex-col max-w-xl lg:max-w-[calc(100%-12rem)] mx-auto lg:gap-0 gap-16 lg:divide-x divide-white/12 divide-dashed">
                                {pricingData.map((item, index) => (
                                    <AnimatedContainer delay={index * 100} visibleClass="!slide-in-from-top-0" key={index} className="lg:p-6 flex-1">
                                        <div className="flex flex-col gap-8 pb-8 border-b border-white/12 border-dashed">
                                            <div className="w-fit min-w-8 py-1 px-4 bg-white/16 backdrop-blur-[48px] border border-white/8 rounded-full flex items-center justify-center shadow-[0px-2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
                                                <span className="title text-base font-medium">{item.badge}</span>
                                            </div>
                                            <div className="inline-flex items-end gap-3">
                                                <span className="title text-6xl font-semibold">{item.price[isYearly ? 'yearly' : 'monthly']}</span>
                                                <span className="py-2 text-2xl text-white/64">/ {isYearly ? 'Yearly' : 'Monthly'}</span>
                                            </div>
                                            <p className="text-lg text-white/64">{item.description}</p>
                                            <button className="button-regular">Get Started</button>
                                        </div>
                                        <div className="mt-8 flex flex-col gap-3">
                                            {item.includes.map((inc, j) => (
                                                <div key={j} className="flex items-center gap-3 text-white/64">
                                                    <i className="pi pi-check text-base"></i>
                                                    <span className="text-lg ">{inc}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </AnimatedContainer>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <StaticCustomers className="mt-16" />
            </div>
        </div>
    );
};

export default PricingHero;

const pricingData = [
    {
        badge: 'Pro',
        price: {
            monthly: '$64',
            yearly: '$128'
        },
        description: 'Elevate your experience with our Pro package, unlocking advanced features and enhanced performance',
        includes: ['Simple Budget Management', 'Fund Transfers', 'Limited Support', 'Real-Time Alerts']
    },
    {
        badge: 'Premium',
        price: {
            monthly: '$130',
            yearly: '$260'
        },
        description: 'Experience ultimate luxury and exclusivity with our Premium package, offering unmatched benefits.',
        includes: ['Simple Budget Management', 'Fund Transfers', 'All Pro Features', 'Higher Transaction Limits', 'Advanced Investment Tools', 'Rewards Program']
    },
    {
        badge: 'Team',
        price: {
            monthly: '$320',
            yearly: '$640'
        },
        description: 'It features advanced tools, user accounts and collaborative planning for secure, efficient financial management.',
        includes: ['Simple Budget Management', 'Fund Transfers', 'All Premium Features', 'Multiple User Accounts', 'Team Management Tools', 'Advanced Security Features', 'Dedicated Support Team', 'Custom Account Settings']
    }
];
