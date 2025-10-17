import AnimatedContainer from '@/components/AnimatedContainer';
import EditSmallIcon from '@/components/icons/edit-small.svg';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const solutionsData = [
    {
        title: 'Product Development',
        description: 'Optimize your product development strategies and accelerate innovation.',
        image: '/pages/about/solution-image-1.jpg'
    },
    {
        title: 'Lean Startup Methodology',
        description: 'Discover the lean startup methodology and grow efficiently using resources.',
        image: '/pages/about/solution-image-2.jpg'
    },
    {
        title: 'Future of Tech Startups',
        description: 'Explore the latest technological advancements transforming the startup ecosystem.',
        image: '/pages/about/solution-image-3.jpg'
    }
];

const AboutSolutions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    return (
        <div className={cn('container mt-64', className)} {...props}>
            <div className="icon-box">
                <EditSmallIcon />
            </div>
            <h1 className="mt-10 text-3xl lg:text-6xl font-semibold text-surface-950 dark:text-surface-0 leading-tight text-center">
                Innovative
                <br />
                Startup Solutions
            </h1>
            <p className="mt-7 text-lg lg:text-xl text-surface-500 dark:text-white/64 max-w-[32rem] text-center mx-auto">Explore the latest trends and developments in the startup world with expert insights and practical tips.</p>
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-px rounded-4xl overflow-hidden">
                {solutionsData.map((item, index) => (
                    <AnimatedContainer key={index} delay={index * 100} className="relative h-[34rem] group">
                        <div className="absolute inset-0 -z-1 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.40)_64.82%)] group-hover:bg-[rgba(37,99,235,0.10)] transition-all" />
                        <Image className="select-none object-cover -z-2 group-hover:grayscale transition-all" fill sizes="auto" src={item.image} alt="Logistic Solutions Image" />
                        <div className="absolute left-8 right-8 bottom-8 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-4xl text-white/72 font-semibold">{String(index + 1).padStart(2, '0')}</span>
                                <Link href={''} className="group-hover:opacity-100 opacity-0 button-regular h-8 min-w-0 px-4">
                                    <i className="pi pi-arrow-right bg-main-gradient bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"></i>
                                </Link>
                            </div>
                            <h5 className="text-2xl title">{item.title}</h5>
                            <p className="text-white/72 text-lg">{item.description}</p>
                        </div>
                    </AnimatedContainer>
                ))}
            </div>
        </div>
    );
};

export default AboutSolutions;
