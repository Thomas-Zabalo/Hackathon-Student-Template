import AnimatedContainer from '@/components/AnimatedContainer';
import CaliforniaIcon from '@/components/icons/shapes/california.svg';
import FloridaIcon from '@/components/icons/shapes/florida.svg';
import NewYorkIcon from '@/components/icons/shapes/new-york.svg';
import Image from 'next/image';
const ContactAddress = () => {
    return (
        <div className="container mt-40 flex items-center lg:flex-row flex-col-reverse gap-6">
            <div className="flex-1 flex flex-col w-full gap-8">
                {contactData.map((item, index) => (
                    <AnimatedContainer
                        key={index}
                        delay={index * 200}
                        visibleClass="!slide-in-from-top-0 slide-in-from-left-24"
                        className="p-4 lg:p-8 rounded-3xl lg:rounded-4xl shadow-stroke flex items-start gap-6 dark:shadow-none border-0 dark:border border-white/12"
                    >
                        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-main-gradient overflow-hidden backdrop-blur-[7px] shadow-[0px_-12px_24px_0px_rgba(159,114,255,0.20)_inset]">
                            <item.icon />
                        </div>
                        <div>
                            <div className="mt-1 text-2xl font-semibold text-surface-950 dark:text-surface-0">{item.title}</div>
                            <p className="mt-4 flex flex-col gap-1 text-lg text-surface-600 dark:text-white/64">
                                {item.content.map((c, j) => (
                                    <span key={j}>{c}</span>
                                ))}
                            </p>
                        </div>
                    </AnimatedContainer>
                ))}
            </div>
            <AnimatedContainer visibleClass="!slide-in-from-top-0 slide-in-from-right-24" className="w-full lg:flex-1 relative h-[38rem] rounded-3xl lg:rounded-4xl shadow-blue-card overflow-hidden">
                <Image fill sizes="auto" className="object-cover " src="/pages/contact/map-image.jpg" alt="Contact Map" />
            </AnimatedContainer>
        </div>
    );
};

export default ContactAddress;

const contactData = [
    {
        icon: FloridaIcon,
        title: 'Florida',
        content: ['1234 Apple St, Faketown, NY, 00000.', '(400) 000 - 0000']
    },
    {
        icon: CaliforniaIcon,
        title: 'California',
        content: ['3456 Lime Dr, Feigncity, FL, 33333', '(400) 000 - 0000']
    },
    {
        icon: NewYorkIcon,
        title: 'New York',
        content: ['0123 Peach Pl, Deceitdale, IL, 77777', '(400) 000 - 0000']
    }
];
