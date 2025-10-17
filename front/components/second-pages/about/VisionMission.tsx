import AnimatedContainer from '@/components/AnimatedContainer';
import Image from 'next/image';

const AboutVisionMission = () => {
    return (
        <div className="container flex flex-col gap-24 lg:gap-40 mt-24">
            {data.map((item, index) => (
                <AnimatedContainer key={index} className="flex lg:flex-row flex-col-reverse items-center gap-10 lg:gap-28 even:flex-col-reverse lg:even:flex-row-reverse">
                    <div className="flex-1">
                        <span className="badge">{item.badge}</span>
                        <h6 className="mt-4 text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0">{item.title}</h6>
                        <p className="mt-6 text-lg lg:text-xl text-surface-500 dark:text-white/64">
                            {item.text.map((p, j) => (
                                <span key={j}>
                                    {p}
                                    {j < item.text.length - 1 && (
                                        <>
                                            <br />
                                            <br />
                                        </>
                                    )}
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className="h-[25rem] w-full lg:flex-1 relative rounded-4xl shadow-blue-card overflow-hidden">
                        <Image className="object-cover" fill sizes="auto" src={item.image} alt="Vision Mission Image" />
                    </div>
                </AnimatedContainer>
            ))}
        </div>
    );
};

export default AboutVisionMission;

const data = [
    {
        badge: 'Vision',
        title: 'Our Vision',
        text: [
            'Our vision is to enhance our clients’ business processes with cutting-edge technologies, increasing their efficiency and competitiveness. We aim to be a leader in providing innovative solutions that drive transformation and achieve sustainable success in the business world. ',
            'By understanding the unique needs of each client, we prioritize offering tailored solutions that help them achieve their business goals.'
        ],
        image: '/pages/about/vision-image.jpg'
    },
    {
        badge: 'Mission',
        title: 'Our Mission',
        text: [
            'Our mission is to deliver the highest quality services to help our clients reach their business objectives. We are dedicated to developing reliable and innovative solutions that simplify our clients’ operations and support their growth. By building long-term relationships based on trust and transparency, we strive to be a constant support for our clients. ',
            'With a commitment to continuous improvement and customer satisfaction, we aim to make a significant impact in the industry.'
        ],
        image: '/pages/about/mission-image.jpg'
    }
];
