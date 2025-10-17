import FooterWithCTA from '@/components/FooterWithCTA';
import FAQ from '@/components/second-pages/FAQ';
import PricingCompare from '@/components/second-pages/pricing/Compare';
import PricingHero from '@/components/second-pages/pricing/Hero';
import PricingTestimonials from '@/components/second-pages/pricing/Testimonials';
import React from 'react';

const PricingPage = () => {
    return (
        <div>
            <PricingHero />
            <PricingCompare />
            <PricingTestimonials />
            <FAQ className="mt-64" />
            <FooterWithCTA className="mt-64" />
        </div>
    );
};

export default PricingPage;
