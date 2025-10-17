import { cn } from '@/lib/utils';
import React from 'react';
import { Accordion, AccordionItem } from '../ui/accordion';
import QuestionsCommentsIcon from '@/components/icons/questions-comments.svg';
import AnimatedContainer from '../AnimatedContainer';
const FAQ: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
    return (
        <div className={cn('max-w-[58rem] px-4 mx-auto', className)} {...props}>
            <div className="icon-box">
                <QuestionsCommentsIcon />
            </div>
            <h1 className="mt-10 text-center text-3xl lg:text-5xl font-semibold text-surface-950 dark:text-surface-0 leading-tight">
                Frequently <br /> Asked Questions
            </h1>
            <p className="text-xl text-center text-surface-500 dark:text-white/64 mt-6">Find quick answers to common questions about our SaaS platform.</p>
            <Accordion className="mt-14">
                {faqData.map((item, index) => (
                    <AnimatedContainer key={index} delay={150 * index} visibleClass="!slide-in-from-top-20">
                        <AccordionItem {...item} />
                    </AnimatedContainer>
                ))}
            </Accordion>
        </div>
    );
};

export default FAQ;

const faqData = [
    {
        title: 'What features does your SaaS platform offer?',
        content: 'Our platform offers a wide range of features including real-time collaboration, comprehensive dashboards, automated workflows, and robust security measures.'
    },
    {
        title: 'How secure is my data on your platform?',
        content: 'We prioritize data security by implementing end-to-end encryption, regular security audits, and strict access controls. Your data is stored in secure, compliant data centers.'
    },
    {
        title: 'Can I integrate your platform with other tools we use?',
        content: 'Yes, our platform supports integrations with various third-party applications through APIs and native connectors, allowing you to streamline your workflows and enhance productivity.'
    },
    {
        title: 'Do you offer customer support?',
        content: 'Absolutely! We provide 24/7 customer support through multiple channels, including live chat, email, and phone. Our dedicated support team is here to assist you whenever you need help.'
    }
];
