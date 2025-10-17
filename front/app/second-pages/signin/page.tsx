'use client';
import Navbar from '@/components/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import CirclePattern from '@/components/CirclePattern';
import AnimatedContainer from '@/components/AnimatedContainer';
import { useRouter } from 'next/navigation';

const SigninPage = () => {
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [textWidth, setTextWidth] = useState(0);

    const measureRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if (measureRef.current) {
            setTextWidth(measureRef.current.offsetWidth);
        }
    }, [identifier]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!identifier.trim()) {
            setError('Veuillez saisir votre identifiant Ynov');
            return;
        }

        setError('');
        const email = `${identifier}@ynov.com`;

        try {
            const response = await axios.post('http://localhost:8080/auth/login', {
                email: email,
                password: password,
            });

            setIdentifier('');
            setPassword('');

            const token = response.data.token;
            console.log("Token JWT :", token);

            localStorage.setItem('token', token);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('nom', response.data.username);
            localStorage.setItem('equipe', response.data.team_id?.id ?? '');
            localStorage.setItem('is_admin', response.data.is_admin);
            localStorage.setItem('id', response.data.id);

            router.push('/pages/home')

        } catch (err: any) {
            console.error(err);
            if (err.response) {
                setError(err.response.data || 'Erreur lors de la création du compte');
            } else {
                setError('Impossible de contacter le serveur');
            }
        }
    };


    return (
        <AnimatedContainer className='shadow-black-card pt-6'>
            <div className="container">
                <div className='relative overflow-hidden rounded-xl lg:rounded-2xl dark:shadow-black-card'>
                    <CirclePattern className="w-[82rem] lg:block hidden absolute -bottom-1/2 translate-y-24 left-1/2 -translate-x-1/2" />
                    <div className="relative z-20 px-6">
                        <Navbar />
                        <div className="pb-6 pt-10 lg:py-24 max-w-[48rem] mx-auto">
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white/5 px-6 md:px-8 pt-14 pb-10 border border-white/10 backdrop-blur-[24px] rounded-xl lg:rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]"
                            >
                                <div className="flex items-center justify-center border dark:border-white/10 border-black/60 w-[5rem] h-[5rem] mx-auto rounded-lg dark:bg-white/10 bg-black/5 shadow-inner">
                                    <svg
                                        width="34"
                                        height="34"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="text-black dark:text-white"
                                    >
                                        <path
                                            d="M12.6598 0C19.4042 0.000123562 24.8724 5.46749 24.8727 12.2119H19.8727C19.8724 8.22892 16.6428 5.00012 12.6598 5C8.67687 5.00024 5.44812 8.22899 5.44788 12.2119C5.44788 16.1304 8.57268 19.3163 12.4664 19.4189V24.4219L12.3453 24.4209C5.74617 24.2539 0.447876 18.8513 0.447876 12.2119C0.448121 5.46757 5.91545 0.00024481 12.6598 0Z"
                                            className="fill-current"
                                        />
                                        <circle cx="20.3171" cy="19.8694" r="4.55541" className="fill-current" />
                                    </svg>
                                </div>


                                <h1 className="text-3xl lg:text-5xl font-semibold dark:text-white text-black text-surface-0 text-center mt-8 tracking-tight">Connexion</h1>
                                <p className="text-lg dark:text-white/70 text-black/70 text-center mt-4 max-w-sm mx-auto leading-relaxed">Entrez votre identifiant Ynov et votre mot de passe pour accéder à votre compte.</p>

                                <div className="flex flex-col gap-8 mt-14">
                                    {/* ---- Champ Email ---- */}
                                    <div className="flex flex-col gap-2 relative">
                                        <label htmlFor="signin_email" className="text-sm font-medium dark:text-white/70 text-black/70">
                                            Adresse Email
                                        </label>

                                        <div className="relative w-full">
                                            <input
                                                id="signin_email"
                                                type="text"
                                                value={identifier}
                                                onChange={(e) => setIdentifier(e.target.value.replace(/@.*/, ''))}
                                                placeholder=""
                                                className={`w-full px-3 py-2 rounded-md border dark:border-white/20 border-black/20 bg-white/10 dark:text-white/70 text-black/70 placeholder-black/40 dark:placeholder-white/40 focus:ring-2  transition-all ${
                                                    error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-white/30'
                                                }`}
                                            />

                                            {/* Élément invisible servant à mesurer la largeur réelle du texte */}
                                            <span ref={measureRef} className="dark:text-white/70 text-black/70 absolute opacity-0 pointer-events-none whitespace-pre text-base font-normal px-3" style={{ fontFamily: 'inherit' }}>
                                                {identifier}
                                            </span>

                                            {/* Domaine fixé dynamiquement juste à la fin du texte */}
                                            <span
                                                className="dark:text-white/70 text-black font-bold absolute top-1/2 -translate-y-1/2 pointer-events-none select-none"
                                                style={{
                                                    left: `calc(${textWidth}px - 0.6rem)`
                                                }}
                                            >
                                                @ynov.com
                                            </span>
                                        </div>

                                        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                                    </div>

                                    {/* ---- Mot de passe ---- */}
                                    <div className="flex flex-col gap-2 ">
                                        <label htmlFor="signin_password" className="text-sm font-medium dark:text-white/70 text-black/70">
                                            Mot de passe
                                        </label>
                                        <Input
                                            id="signin_password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="rounded-md dark:border-white/20 border-black/20 bg-white/10 dark:text-white/70 text-black/70 focus:ring-2 focus:ring-white/30 transition-all"
                                        />
                                    </div>

                                    {/* ---- Bouton ---- */}
                                    <button type="submit" className="button-regular w-full py-3 rounded-md bg-black/5 dark:bg-white/5 dark:hover:bg-black/10 dark:text-white hover:bg-black/10 font-medium tracking-wide transition-all duration-300 hover:opacity-90">
                                        Se connecter
                                    </button>

                                    {/* ---- Lien création ---- */}
                                    <div className="text-center mt-4">
                                        <span className="dark:text-white/70 text-black/70">Nouveau ici ? </span>
                                        <Link href={'signup'} className="dark:text-white/70 text-black/70 font-semibold hover:opacity-90 transition-opacity">
                                            Créer un compte
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default SigninPage;
