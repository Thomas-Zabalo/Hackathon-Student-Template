'use client';
import Navbar from '@/components/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import CirclePattern from '@/components/CirclePattern';
import AnimatedContainer from '@/components/AnimatedContainer';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [emailIdentifier, setEmailIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [textWidth, setTextWidth] = useState(0);

    const measureRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if (measureRef.current) {
            setTextWidth(measureRef.current.offsetWidth);
        }
    }, [emailIdentifier]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim() || !emailIdentifier.trim() || !password.trim()) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        const email = `${emailIdentifier}@ynov.com`;

        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Erreur lors de l'inscription");
                return;
            }

            // Stockage du token JWT
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);

            router.push('/second-pages/signin');

            setUsername('');
            setEmailIdentifier('');
            setPassword('');

        } catch (err) {
            console.error(err);
            alert("Impossible de contacter le serveur");
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

                                <h1 className="text-3xl lg:text-5xl font-semibold dark:text-white text-black text-center mt-8 tracking-tight">S&#39;inscrire</h1>
                                <p className="text-lg text-white/70 text-center mt-4 max-w-sm mx-auto leading-relaxed">Entrez vos informations afin de créer un compte.</p>

                                <div className="flex flex-col gap-8 mt-14">
                                    {/* ---- Username ---- */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="signup_username" className="dark:text-white text-black  text-sm font-medium">
                                            Nom d&#39;utilisateur
                                        </label>
                                        <Input id="signup_username" value={username} onChange={(e) => setUsername(e.target.value)} className="rounded-md dark:border-white/20 border-black/20 bg-white/10 dark:text-white text-black focus:ring-2 focus:ring-white/30 transition-all" />
                                    </div>

                                    {/* ---- Email ---- */}
                                    <div className="flex flex-col gap-2 relative">
                                        <label htmlFor="signup_email" className="dark:text-white text-black  text-sm font-medium">
                                            Adresse Email
                                        </label>
                                        <div className="relative w-full">
                                            <input
                                                id="signup_email"
                                                type="text"
                                                value={emailIdentifier}
                                                onChange={(e) => setEmailIdentifier(e.target.value.replace(/@.*/, ''))}
                                                placeholder=""
                                                className="w-full px-3 py-2 rounded-md border dark:border-white/20 border-black/20 bg-white/10 dark:text-white text-black  placeholder-white/40 focus:ring-2 focus:ring-white/30 transition-all"
                                            />
                                            <span ref={measureRef} className="absolute opacity-0 pointer-events-none whitespace-pre text-base font-normal px-3">
                                                {emailIdentifier}
                                            </span>
                                            <span className="absolute top-1/2 -translate-y-1/2 text-black/60 dark:text-white/60 pointer-events-none select-none" style={{ left: `calc(${textWidth}px - 0.6rem)` }}>
                                                @ynov.com
                                            </span>
                                        </div>
                                    </div>

                                    {/* ---- Password ---- */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="signup_password" className="dark:text-white text-black  text-sm font-medium">
                                            Mot de passe
                                        </label>
                                        <Input
                                            id="signup_password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="rounded-md dark:border-white/20 border-black/20 bg-white/10 dark:text-white text-black  focus:ring-2 focus:ring-white/30 transition-all"
                                        />
                                    </div>

                                    {/* ---- Bouton Register ---- */}
                                    <button type="submit" className="button-regular w-full py-3 rounded-md bg-black/5 dark:bg-white/5 dark:hover:bg-black/10 dark:text-white hover:bg-black/10 font-medium tracking-wide transition-all duration-300 hover:opacity-90">
                                        S'inscrire
                                    </button>

                                    {/* ---- Lien vers Signin ---- */}
                                    <div className="text-center mt-4">
                                        <span className="dark:text-white text-black ">Vous possédez déjà un compte ici ? </span>
                                        <Link href={'signin'} className="dark:text-white text-black  font-semibold hover:opacity-90 transition-opacity">
                                            Se connecter
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

export default SignupPage;
