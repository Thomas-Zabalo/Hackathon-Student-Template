import Footer from '@/components/Footer';
import AboutHero from '@/components/second-pages/about/Hero';
import Compare from '@/components/second-pages/pricing/Compare';

import React from 'react';

const DashboardPage = () => {
    return (
        <section>
            <AboutHero />
            <Compare />
            <Footer />
        </section>
    );
};

export default DashboardPage;
