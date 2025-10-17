'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown';

const Navbar: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) => {
    const [connected, setConnected] = useState<string | null>(null);

    useEffect(() => {
        // Récupération depuis le localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) setConnected(storedToken);
    }, []);

    return (
        <nav className={cn('flex items-center relative z-[99999] justify-between py-6 w-[calc(100%-3rem)] max-h-[75px] mx-auto border-b border-black/10 dark:border-white/10 border-dashed', className)} {...props}>
            <Link href="/">
                <Logo />
            </Link>
            <ul className="hidden lg:flex items-center gap-3">
                <li className="inline-flex items-center gap-2 rounded-full py-1 pr-2 pl-3 select-none transition-all cursor-pointer dark:text-white text-black hover:text-black hover:bg-black/8 dark:hover:text-white dark:hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)] group-data-[open=true]:!bg-white/16 group-data-[open=true]:!text-white group-data-[open=true]:!backdrop-blur-2xl border border-white/0 group-data-[open=true]:!border-white/4 group-data-[open=true]:!shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
                    <Link href="/pages/home" className="w-full">
                        Lagitech
                    </Link>
                </li>
                <li className="inline-flex items-center gap-2 rounded-full py-1 pr-2 pl-3 select-none transition-all cursor-pointer dark:text-white text-black hover:text-black hover:bg-black/8 dark:hover:text-white dark:hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)] group-data-[open=true]:!bg-white/16 group-data-[open=true]:!text-white group-data-[open=true]:!backdrop-blur-2xl border border-white/0 group-data-[open=true]:!border-white/4 group-data-[open=true]:!shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
                    <Link href="/pages/matches" className="w-full">
                        Matchs
                    </Link>
                </li>
                <li className="inline-flex items-center gap-2 rounded-full py-1 pr-2 pl-3 select-none transition-all cursor-pointer dark:text-white text-black hover:text-black hover:bg-black/8 dark:hover:text-white dark:hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)] group-data-[open=true]:!bg-white/16 group-data-[open=true]:!text-white group-data-[open=true]:!backdrop-blur-2xl border border-white/0 group-data-[open=true]:!border-white/4 group-data-[open=true]:!shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
                    <Link href="/pages/team" className="w-full">
                        Equipes
                    </Link>
                </li>
                <li className="inline-flex items-center gap-2 rounded-full py-1 pr-2 pl-3 select-none transition-all cursor-pointer dark:text-white text-black hover:text-black hover:bg-black/8 dark:hover:text-white dark:hover:bg-white/8 hover:shadow-[0px_10px_10px_-8px_rgba(18,18,23,0.02),0px_2px_2px_-1.5px_rgba(18,18,23,0.02),0px_1px_1px_-0.5px_rgba(18,18,23,0.02),0px_0px_0px_1px_rgba(18,18,23,0.02)] group-data-[open=true]:!bg-white/16 group-data-[open=true]:!text-white group-data-[open=true]:!backdrop-blur-2xl border border-white/0 group-data-[open=true]:!border-white/4 group-data-[open=true]:!shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
                    <Link href="/pages/dashboard" className="w-full">
                        Dashboard
                    </Link>
                </li>

            </ul>
            <ul className="hidden lg:flex items-center gap-3">
                {connected ? (
                    <>
                        <li>
                            <button
                                className="button-regular"
                                onClick={() => {
                                    localStorage.clear(); // ou removeItem('token') si tu veux juste déconnecter
                                    window.location.href = '/second-pages/signin';
                                }}
                            >
                                Déconnexion
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link href="/second-pages/signin" className="button-regular">
                            Se connecter
                        </Link>
                    </li>
                )}
            </ul>
            <DropdownMenu unstyled className="lg:hidden block">
                <DropdownMenuTrigger className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-surface-0 text-surface-950">
                    <i className="pi pi-bars"></i>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="top-[calc(100%+0.5rem)] max-h-96 overflow-auto left-auto !right-0 w-60 p-2 rounded-2xl shadow-blue-card flex flex-col bg-surface-0">
                    <div className="flex flex-col ">
                        <Link href="/pages/home" className="py-2 px-3 rounded-lg hover:bg-surface-200 font-medium text-surface-500 hover:text-surface-950">
                            Lagitech
                        </Link>
                        <Link href="/pages/matches" className="py-2 px-3 rounded-lg hover:bg-surface-200 font-medium text-surface-500 hover:text-surface-950">
                            Matchs
                        </Link>
                       <Link href="/pages/team" className="py-2 px-3 rounded-lg hover:bg-surface-200 font-medium text-surface-500 hover:text-surface-950">
                           Equipes
                       </Link>
                        <Link href="/pages/dashboard" className="py-2 px-3 rounded-lg hover:bg-surface-200 font-medium text-surface-500 hover:text-surface-950">
                            Dashboard
                        </Link>
                        <Link href="/second-pages/signin" className="py-2 px-3 rounded-lg hover:bg-surface-200 font-medium text-surface-500 hover:text-surface-950">
                            Se connecter
                        </Link>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
};

export default Navbar;
