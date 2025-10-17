'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
const AccountNavbar = () => {
    const pathname = usePathname();
    return (
        <div className="w-full flex md:flex-row flex-col items-center gap-2 p-2 max-w-[calc(100%-3rem)] lg:max-w-none mx-auto rounded-3xl md:rounded-full bg-white/16 backdrop-blur-[48px] shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
            {accountNavData.map((item, index) => (
                <Link
                    key={index}
                    href={item.to}
                    className={cn(
                        'md:flex-1 w-full h-10 flex items-center justify-center rounded-full backdrop-blur-[48px] transition-all select-none',
                        pathname === item.to ? 'bg-white/16  text-white shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]' : 'text-white/64 hover:bg-white/10'
                    )}
                >
                    <span className="font-medium">{item.label}</span>
                </Link>
            ))}
        </div>
    );
};

export default AccountNavbar;

const accountNavData = [
    {
        label: 'Account',
        to: '/second-pages/account'
    },
    {
        label: 'Privacy & Security',
        to: '/second-pages/account/privacy-security'
    },
    {
        label: 'Subscription & Billing',
        to: '/second-pages/account/subscription-billing'
    },
    {
        label: 'Support',
        to: '/second-pages/account/support'
    }
];
