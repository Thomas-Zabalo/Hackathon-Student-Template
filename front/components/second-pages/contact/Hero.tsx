'use client';
import AnimatedContainer from '@/components/AnimatedContainer';
import CirclePattern from '@/components/CirclePattern';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/context/ThemeContext';
import React from 'react';
const ContactHero = () => {
    const { heroContainerType } = useTheme();
    const isWide = heroContainerType === 'wide';
    return (
        <AnimatedContainer visibleClass="!slide-in-from-top-0" className={`${isWide ? 'relative bg-main-gradient ' : 'pt-6'}`}>
            <div className="container">
                <div className={` relative lg:pb-20 pb-6 ${isWide ? '' : 'bg-main-gradient rounded-3xl lg:rounded-4xl'}`}>
                    <div className="relative z-20">
                        <Navbar />
                        <h1 className="max-w-[calc(100%-3rem)] lg:max-w-5xl mx-auto title lg:text-7xl text-4xl text-center mt-18">Get in Touch with Us</h1>
                        <p className="text-base lg:text-xl text-white/64 max-w-[calc(100%-3rem)] lg:max-w-[44rem] mx-auto text-center mt-8">We’re here to assist you with any questions or concerns—reach out to our dedicated support team anytime.</p>
                        <form className="mt-16 max-w-[calc(100%-3rem)] lg:max-w-[42rem] mx-auto p-8 rounded-2xl lg:rounded-4xl bg-white/4 backdrop-blur-[48px] border border-white/8 shadow-[0px_2px_5px_0px_rgba(255,255,255,0.06)_inset,0px_12px_20px_0px_rgba(0,0,0,0.06)]">
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-wrap gap-8">
                                    <div className="flex-1 flex flex-col gap-2">
                                        <label className="font-medium text-surface-0" htmlFor="contact_first_name">
                                            First Name{' '}
                                        </label>
                                        <Input id="contact_first_name" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-2">
                                        <label className="font-medium text-surface-0" htmlFor="contact_last_name">
                                            Last Name{' '}
                                        </label>
                                        <Input id="contact_last_name" />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <label className="font-medium text-surface-0" htmlFor="contact_email">
                                        Email Address{' '}
                                    </label>
                                    <Input id="contact_email" />
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <label className="font-medium text-surface-0" htmlFor="contact_phone">
                                        Phone Number{' '}
                                    </label>
                                    <Input id="contact_phone" />
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <label className="font-medium text-surface-0" htmlFor="contact_message">
                                        Message{' '}
                                    </label>
                                    <Textarea id="contact_message" />
                                </div>
                            </div>
                            <button className="button-regular mt-16 w-full">Submit</button>
                        </form>
                    </div>
                    <div className="absolute inset-0 overflow-hidden hidden lg:block">
                        <CirclePattern className="absolute w-[86rem] -bottom-full -translate-y-[32%] left-1/2 -translate-x-1/2" />
                    </div>
                </div>
            </div>
        </AnimatedContainer>
    );
};

export default ContactHero;
