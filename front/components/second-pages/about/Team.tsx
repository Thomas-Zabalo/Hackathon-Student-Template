import AnimatedContainer from '@/components/AnimatedContainer';
import UsersIcon from '@/components/icons/users.svg';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AboutTeam: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    return (
        <div className={cn('container mt-64', className)} {...props}>
            <div className="icon-box">
                <UsersIcon />
            </div>
            <h1 className="mt-10 text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 leading-tight text-center">
                Meet Our
                <br />
                Leadership Team
            </h1>
            <p className="mt-7 text-lg lg:text-xl text-surface-500 dark:text-white/64 max-w-[40rem] text-center mx-auto">
                Our success is driven by a dedicated team of professionals who bring their expertise and passion to every project. Get to know the leaders who are guiding our company to new heights.
            </p>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-4xl overflow-hidden">
                {teamData.map((item, index) => (
                    <AnimatedContainer key={index} delay={index * 100} className="relative h-[34rem] group">
                        <div className="absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.40)_64.82%)] group-hover:bg-[rgba(37,99,235,0.10)] transition-all" />
                        <Image className="select-none object-cover -z-2 group-hover:grayscale transition-all" fill sizes="auto" src={item.image} alt="Logistic Team Person Image" />
                        <div className="absolute left-8 right-8 bottom-6">
                            <ul className="flex items-start justify-start group-hover:opacity-100 opacity-0 transition-all">
                                {item.socials.map((soc, j) => (
                                    <li key={j} className="">
                                        <Link href={soc.link} className="flex items-center justify-center h-8 px-4 bg-surface-0 rounded-full hover:opacity-80 transition-all">
                                            <i className={soc.icon + ' text-sm bg-main-gradient bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]'}></i>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="title text-2xl mt-4">{item.name}</div>
                            <div className="mt-2 text-white/72 text-lg">{item.job}</div>
                        </div>
                    </AnimatedContainer>
                ))}
            </div>
        </div>
    );
};

export default AboutTeam;

const teamData = [
    {
        name: 'Alex Smith',
        job: 'CEO',
        image: '/pages/logistic/team-person-1.jpg',
        socials: [
            {
                link: '',
                icon: 'pi pi-twitter'
            }
        ]
    },
    {
        name: 'Maya Johnson',
        job: 'Chief Operating Officer',
        image: '/pages/logistic/team-person-2.jpg',
        socials: [
            {
                link: '',
                icon: 'pi pi-twitter'
            }
        ]
    },
    {
        name: 'David Brown',
        job: 'Chief Financial Officer',
        image: '/pages/logistic/team-person-3.jpg',
        socials: [
            {
                link: '',
                icon: 'pi pi-twitter'
            }
        ]
    },
    {
        name: 'Sarah Williams',
        job: 'Chief Marketing Officer',
        image: '/pages/logistic/team-person-4.jpg',
        socials: [
            {
                link: '',
                icon: 'pi pi-twitter'
            }
        ]
    }
];
