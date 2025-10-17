'use client';
import AnimatedContainer from '@/components/AnimatedContainer';
import ScaleCarousel, { ScaleCarouselItem } from '@/components/carousels/ScaleCarousel';
import BubbleMessageIcon from '@/components/icons/bubble-message.svg';
import { Avatar } from '@/components/ui/avatar';
import useIsMobile from '@/lib/hooks/use-is-mobile';
import Image from 'next/image';
const AboutTestimonials = () => {
    const isMobile = useIsMobile();
    return (
        <div className="mt-24 lg:mt-64">
            <div className="icon-box">
                <BubbleMessageIcon />
            </div>
            <h1 className="px-6 mt-10 text-3xl lg:text-5xl font-semibold max-w-md mx-auto text-center text-surface-950 dark:text-surface-0 leading-tight">
                What Our
                <br />
                Happy Clients Say
            </h1>
            <p className="px-6 mt-6 max-w-xl mx-auto text-center text-lg lg:text-xl text-surface-500 dark:text-white/64">
                Our clients’ satisfaction is our top priority. Hear from those who have experienced our exceptional logistics services firsthand. Their feedback drives us to continuously improve and innovate.
            </p>
            <div className="mt-20 relative">
                <ScaleCarousel options={{ align: 'center', loop: true }} height={isMobile ? '40rem' : '23rem'} size="85%" spacing="0">
                    {aboutTestimonialsData.map((item, index) => (
                        <ScaleCarouselItem key={index} className="w-full lg:min-w-[36rem] max-w-[48rem]">
                            <AnimatedContainer
                                delay={index * 100}
                                className="h-full w-full flex lg:flex-row flex-col-reverse items-center border border-surface-200 dark:border-white/12 rounded-3xl lg:rounded-4xl shadow-blue-card dark:shadow-none overflow-hidden"
                            >
                                <div className="lg:flex-1 w-full p-6 lg:p-10 lg:h-full">
                                    <svg className="fill-surface-300 dark:fill-white/40" xmlns="http://www.w3.org/2000/svg" width="38" height="30" viewBox="0 0 38 30" fill="none">
                                        <path d="M4.24586 26.7823C2.12182 24.5239 0.981445 21.9909 0.981445 17.8848C0.981445 10.6595 6.04819 4.18354 13.4163 0.981689L15.2578 3.8264C8.38051 7.55054 7.03597 12.3833 6.49981 15.4303C7.60719 14.8564 9.0569 14.6561 10.4777 14.7883C14.1979 15.133 17.1303 18.1904 17.1303 21.9909C17.1303 23.9071 16.3699 25.7449 15.0163 27.1C13.6627 28.455 11.8269 29.2162 9.91269 29.2162C7.69999 29.2162 5.58421 28.2047 4.24586 26.7823ZM24.8675 26.7823C22.7435 24.5239 21.6031 21.9909 21.6031 17.8848C21.6031 10.6595 26.6699 4.18354 34.038 0.981689L35.8795 3.8264C29.0022 7.55054 27.6577 12.3833 27.1215 15.4303C28.2289 14.8564 29.6786 14.6561 31.0994 14.7883C34.8196 15.133 37.752 18.1904 37.752 21.9909C37.752 23.9071 36.9915 25.7449 35.638 27.1C34.2844 28.455 32.4486 29.2162 30.5344 29.2162C28.3217 29.2162 26.2059 28.2047 24.8675 26.7823Z" />
                                    </svg>
                                    <h5 className="text-base lg:text-xl font-semibold text-surface-950 dark:text-surface-0 mt-4 lg:mt-8">{item.title}</h5>
                                    <p className="text-sm lg:text-base mt-3.5 lg:mt-4 text-surface-500">{item.description}</p>
                                    <div className="mt-4 lg:mt-6 flex items-center gap-3">
                                        <Avatar image={item.avatar} className="w-12 h-12" />
                                        <div>
                                            <div className="font-semibold text-surface-950 dark:text-surface-0">{item.name}</div>
                                            <div className="text-sm text-surface-500 dark:text-white/64 mt-1">{item.job}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-80 w-full h-full relative overflow-hidden">
                                    <div className="w-full h-20 z-1 absolute lg:hidden bottom-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_23.7%,#FFF_88.88%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.00)_23.7%,rgb(var(--surface-950))_88.88%)]"></div>
                                    <Image fill sizes="auto" className="object-cover" src={item.image} alt="About Testimonial Image" />
                                </div>
                            </AnimatedContainer>
                        </ScaleCarouselItem>
                    ))}
                </ScaleCarousel>
            </div>
        </div>
    );
};

export default AboutTestimonials;

const aboutTestimonialsData = [
    {
        title: 'Innovative Product Development',
        description: 'Their agile development approach and cutting-edge tech stack have streamlined our product iterations. The integrated analytics dashboard has been a game-changer for us.',
        name: 'Mark Johnson',
        job: 'Founder, FinTech Disrupt',
        avatar: '/avatars/male-1.jpg',
        image: '/pages/about/testimonial-1.jpg'
    },
    {
        title: 'Efficient and Scalable Startup Solutions',
        description: 'Using their startup acceleration services has greatly improved our growth trajectory. The mentorship program and automated scaling tools have been transformative for our operations.',
        name: 'Emily Johnson',
        job: 'CEO, GrowthRocket',
        avatar: '/avatars/female-8.jpg',
        image: '/pages/about/testimonial-2.jpg'
    },
    {
        title: 'Exceptional Smart Investor Relations',
        description: 'Their investor matching algorithm is truly exceptional. We’ve seamlessly connected with perfect-fit VCs, streamlining our funding rounds with remarkable speed and efficiency.',
        name: 'Amy Elsner',
        job: 'CTO, TechNova Startup',
        avatar: '/avatars/female-9.jpg',
        image: '/pages/about/testimonial-3.jpg'
    },
    {
        title: 'Outstanding Technical Expertise',
        description: 'Their development team has delivered outstanding technical solutions. The speed at which they addressed challenges and optimized our infrastructure has been truly impressive.',
        name: 'John Doe',
        job: 'COO, Innovatech Solutions',
        avatar: '/avatars/male-3.jpg',
        image: '/pages/about/testimonial-2.jpg'
    }
];
