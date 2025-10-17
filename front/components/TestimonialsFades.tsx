import React from 'react';
import { Avatar } from './ui/avatar';
import { cn } from '@/lib/utils';

const TestimonialsFades: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    return (
        <div className={cn('relative flex items-start gap-6 grid-6', className)} {...props}>
            <div className="absolute top-0 left-0 w-full h-64 z-10 rotate-180 bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(255,255,255,0.92)_46.38%,#FFF_88.21%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgb(var(--surface-950))_80.21%)]"></div>
            <div className="absolute bottom-0 left-0 w-full h-64 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgba(255,255,255,0.92)_46.38%,#FFF_88.21%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_0%,rgb(var(--surface-950))_80.21%)]"></div>
            {testimonialsFadesData.map((rootItem, rootIndex) => (
                <div key={rootIndex} className={cn('flex-1 flex flex-col gap-6', rootIndex === 2 ? 'lg:flex hidden' : '', rootIndex === 0 ? 'sm:flex hidden' : '')}>
                    {rootItem.map((item, index) => (
                        <div key={index} className="p-6 rounded-4xl border border-surface-200 dark:border-surface-800">
                            <svg className="fill-surface-400" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M10.7287 26.6513C9.44125 25.2838 8.75 23.7501 8.75 21.2638C8.75 16.8888 11.8212 12.9676 16.2875 11.0288L17.4037 12.7513C13.235 15.0063 12.42 17.9326 12.095 19.7776C12.7662 19.4301 13.645 19.3088 14.5062 19.3888C16.7612 19.5976 18.5387 21.4488 18.5387 23.7501C18.5387 24.9104 18.0778 26.0232 17.2573 26.8437C16.4369 27.6641 15.3241 28.1251 14.1637 28.1251C12.8225 28.1251 11.54 27.5126 10.7287 26.6513ZM23.2287 26.6513C21.9412 25.2838 21.25 23.7501 21.25 21.2638C21.25 16.8888 24.3212 12.9676 28.7875 11.0288L29.9037 12.7513C25.735 15.0063 24.92 17.9326 24.595 19.7776C25.2662 19.4301 26.145 19.3088 27.0062 19.3888C29.2612 19.5976 31.0387 21.4488 31.0387 23.7501C31.0387 24.9104 30.5778 26.0232 29.7573 26.8437C28.9369 27.6641 27.8241 28.1251 26.6637 28.1251C25.3225 28.1251 24.04 27.5126 23.2287 26.6513Z" />
                            </svg>
                            <p className="text-lg text-surface-600 dark:text-surface-500 mt-2">{item.description}</p>
                            <div className="mt-8 flex items-center gap-4">
                                <Avatar image={item.avatar} className="w-16 h-16" />
                                <div className="flex flex-col gap-2">
                                    <span className="text-xl font-semibold text-surface-950 dark:text-surface-0">{item.name}</span>
                                    <span className="text-lg text-surface-600">{item.job}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TestimonialsFades;

const testimonialsFadesData = [
    [
        {
            description:
                'Magna eget est lorem ipsum dolor. Malesuada fames ac turpis egestas maecenas pharetra convallis. Leo vel fringilla est ullamcorper eget nulla facilisi. Ultrices eros in cursus turpis massa tincidunt dui ut. Ultricies mi eget mauris.',
            avatar: '/avatars/female-1.jpg',
            name: 'Olivia Holt',
            job: 'CHRO'
        },
        {
            description: 'Sapien eget mi proin sed. Ultrices gravida dictum fusce ut placerat. Adipiscing tristique risus nec feugiat in fermentum. Nunc sed blandit libero volutpat. Praesent tristique magna sit amet purus gravida quis.',
            avatar: '/avatars/male-1.jpg',
            name: 'Robert Fox',
            job: 'CFO'
        },
        {
            description:
                'Nulla pharetra diam sit amet nisl suscipit adipiscing. Gravida quis blandit turpis cursus. Aliquet sagittis id consectetur purus ut faucibus. Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Elit duis tristique.',
            avatar: '/avatars/male-2.jpg',
            name: 'Jacob Jones',
            job: 'CHRO'
        }
    ],
    [
        {
            description: 'Ut faucibus pulvinar elementum integer eniman sed adipiscing diam donec adipiscing tristique. Ac placerat vestibulum lectus mauris ultrices eros.',
            avatar: '/avatars/female-5.jpg',
            name: 'Bessie Cooper',
            job: 'CIO'
        },
        {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,  elementum integer. Neque volutpat ac tincidunt vitae semper quis.',
            avatar: '/avatars/female-6.jpg',
            name: 'Eleanor Pena',
            job: 'CEO '
        },
        {
            description: 'Risus feugiat in ante metus dictum. Placerat in egestas erat imperdiet. Diam sit amet nisl suscipit adipiscing bibendum est ultricies. Cras sed felis eget velit aliquet sagittis id consectetur purus.',
            avatar: '/avatars/male-3.jpg',
            name: 'Darrell Steward',
            job: 'CTO'
        }
    ],
    [
        {
            description:
                'Magna eget est lorem ipsum dolor. Malesuada fames ac turpis egestas maecenas pharetra convallis. Leo vel fringilla est ullamcorper eget nulla facilisi. Ultrices eros in cursus turpis massa tincidunt dui ut. Ultricies mi eget mauris pharetra et ultrices.',
            avatar: '/avatars/male-4.jpg',
            name: 'Cole Bemis',
            job: 'CEO '
        },
        {
            description:
                'Lorem mollis aliquam ut porttitor leo a diam. Fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus. At augue eget arcu dictum varius duis.Et magnis dis parturient montes nascetur. Nunc consequat interdum varius sit amet mattis vulputate.',
            avatar: '/avatars/female-8.jpg',
            name: 'Emma Stone',
            job: 'CEO '
        },
        {
            description: 'Praesent semper feugiat nibh sed. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Amet nisl purus in mollis nunc sed id. Nascetur ridiculus mus mauris vitae ultricies leo integer.',
            avatar: '/avatars/male-5.jpg',
            name: 'Kyra Assaad',
            job: 'Product Manager '
        }
    ]
];
