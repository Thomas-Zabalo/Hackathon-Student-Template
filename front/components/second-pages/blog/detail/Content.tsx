import AnimatedContainer from '@/components/AnimatedContainer';
import QuatationIcon from '@/components/icons/quatation.svg';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
const BlogDetailContent = () => {
    return (
        <div className="container mt-6 lg:mt-24 max-w-[56rem] px-4">
            <div>
                <p className="text-xl text-surface-500 dark:text-white/64">
                    2024 is set to be a year full of significant changes and innovations in SaaS solutions for small businesses. In this blog post, we will explore SaaS solutions that will help small businesses automate their processes, reduce costs,
                    and improve customer relationships. Keep reading to learn about the top SaaS trends for small businesses in 2024.
                </p>
                <div className="mt-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <Avatar className="w-16 h-16 border border-surface-200" image="/avatars/female-7.jpg" />
                        <div className="flex flex-col ga">
                            <span className="text-xl font-medium text-surface-950 dark:text-surface-0">Olivia Holt</span>
                            <span className="text-surface-500 dark:text-white/64 text-lg">February 9, 2024</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <Link href={''} className="h-8 px-4 flex items-center justify-center shadow-stroke rounded-full hover:bg-surface-100 transition-all dark:shadow-none border-0 dark:border border-white/12 dark:hover:bg-white/8">
                            <i className="pi pi-twitter text-surface-950 dark:text-surface-0 text-base leading-none"></i>
                        </Link>
                        <Link href={''} className="h-8 px-4 flex items-center justify-center shadow-stroke rounded-full hover:bg-surface-100 transition-all dark:shadow-none border-0 dark:border border-white/12 dark:hover:bg-white/8">
                            <i className="pi pi-youtube text-surface-950 dark:text-surface-0 text-base leading-none"></i>
                        </Link>
                        <Link href={''} className="h-8 px-4 flex items-center justify-center shadow-stroke rounded-full hover:bg-surface-100 transition-all dark:shadow-none border-0 dark:border border-white/12 dark:hover:bg-white/8">
                            <i className="pi pi-discord text-surface-950 dark:text-surface-0 text-base leading-none"></i>
                        </Link>
                    </div>
                </div>
                <div className="mt-20">
                    <h5 className="text-4xl font-semibold text-surface-950  dark:text-surface-0 leading-tight">Automation and Efficiency</h5>
                    <p className="text-xl text-surface-500 dark:text-white/64 mt-7">
                        Automation will be at the heart of SaaS solutions in 2024. Small businesses will be able to save time and resources with software that automates repetitive tasks. These solutions will particularly enhance efficiency in areas
                        such as customer service, invoice management, and inventory tracking.
                    </p>
                    <p className="text-xl text-surface-500 dark:text-white/64 mt-7">
                        Thanks to automation, businesses will be able to redirect their employees to more strategic and creative tasks. For example, chatbots and automated email responders will make customer service more efficient, while ERP
                        (Enterprise Resource Planning) systems will optimize supply chain and manufacturing processes. Such solutions will reduce operational costs while simultaneously increasing customer satisfaction.
                    </p>
                    <div className="flex md:flex-row flex-col items-center gap-6 mt-24">
                        <div className="w-full md:flex-1 relative aspect-square min-h-20 max-h-80 rounded-3xl overflow-hidden bg-surface-400">
                            <Image fill sizes="auto" className="object-cover" src={'/pages/blog/blog-cover-1.jpg'} alt="Blog Cover Image" />
                        </div>
                        <div className="w-full md:flex-1 relative aspect-square min-h-40 max-h-80 rounded-3xl overflow-hidden bg-surface-400">
                            <Image fill sizes="auto" className="object-cover object-right" src={'/pages/blog/blog-cover-2.jpg'} alt="Blog Cover Image" />
                        </div>
                    </div>
                </div>
                <div className="mt-24">
                    <h5 className="text-4xl font-semibold text-surface-950 dark:text-surface-0 leading-tight">Cost Minimisation</h5>
                    <p className="text-xl text-surface-500 dark:text-white/64 mt-7">
                        Cost reduction is always a priority for small businesses. In 2024, SaaS solutions will be cost-effective and scalable, allowing small businesses to pay only for the services they need. Cloud-based solutions will eliminate the
                        need for expensive hardware investments, enabling businesses to spend less on technology.
                    </p>
                    <p className="text-xl text-surface-500 dark:text-white/64 mt-7">
                        Cloud computing technology will significantly reduce data storage and processing costs. Instead of investing in large data centers, small businesses will gain flexibility by renting the resources they need. Additionally, these
                        solutions will be easily scalable in line with business growth, providing cost efficiency in the long term.
                    </p>
                    <ul className="mt-16 list-disc list-inside space-y-10">
                        <li className="text-xl text-surface-500 dark:text-white/64">
                            Join us and discover the revolution automation brings to small businesses. In our blog series, we will explore how automated processes help your business operate more efficiently and increase your competitive edge.
                        </li>
                        <li className="text-xl text-surface-500 dark:text-white/64">
                            Meet the flexibility and efficiency provided by automation. With our articles on optimizing your business processes to save time and cost, take a step ahead in the business world.
                        </li>
                        <li className="text-xl text-surface-500 dark:text-white/64">
                            Discover the opportunities automation offers your business as part of digital transformation. Learn how technology transforms your business processes and directs your workforce to more strategic tasks.
                        </li>
                    </ul>
                </div>
                <div className="mt-16">
                    <h5 className="text-4xl font-semibold text-surface-950 dark:text-surface-0 leading-tight">
                        Beyond Automation: Unleashing the Full
                        <br />
                        Potential of SaaS Solutions
                    </h5>
                    <p className="text-xl text-surface-500 dark:text-white/64 mt-7">
                        Discover how SaaS solutions go beyond automation, offering limitless potential for small businesses. These powerful tools seamlessly integrate into your business processes, providing a comprehensive approach that enhances
                        operational efficiency, reduces costs, and improves customer relationships.
                    </p>
                </div>
                <AnimatedContainer className="mt-18 rounded-4xl bg-main-gradient p-10">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                            <Avatar className="w-16 h-16 border border-surface-200" image="/avatars/female-7.jpg" />
                            <div className="flex flex-col ga">
                                <span className="text-xl font-medium text-surface-0">Olivia Holt</span>
                                <span className="text-white/64 text-lg">
                                    Product Designer <span className="text-surface-0">@Genesis</span>
                                </span>
                            </div>
                        </div>
                        <QuatationIcon className="rotate-180 -scale-x-100 !fill-white/64" />
                    </div>
                    <p className="mt-7 text-2xl text-white/80 leading-snug">
                        Explore the limitless possibilities of SaaS solutions in our blog series, ‘Beyond Automation.’ Discover how these solutions redefine your business operations, offering a comprehensive approach that goes far beyond mere
                        automation. With advanced features and innovative tools, SaaS solutions are set to revolutionize the way small businesses operate in 2024 and beyond.
                    </p>
                </AnimatedContainer>
            </div>
        </div>
    );
};

export default BlogDetailContent;
