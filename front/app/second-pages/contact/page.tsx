import FooterWithCTA from '@/components/FooterWithCTA';
import ContactAddress from '@/components/second-pages/contact/Address';
import ContactHero from '@/components/second-pages/contact/Hero';
import FAQ from '@/components/second-pages/FAQ';
import React from 'react';

const ContactPage = () => {
    return (
        <section>
            <ContactHero />
            <ContactAddress />
            <FAQ className="mt-64" />
            <FooterWithCTA className="mt-64" />
        </section>
    );
};

export default ContactPage;
