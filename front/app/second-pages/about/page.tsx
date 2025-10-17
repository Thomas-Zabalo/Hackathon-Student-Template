import FooterWithCTA from '@/components/FooterWithCTA';
import AboutHero from '@/components/second-pages/about/Hero';
import AboutSolutions from '@/components/second-pages/about/Solutions';
import AboutTeam from '@/components/second-pages/about/Team';
import AboutTestimonials from '@/components/second-pages/about/Testimonials';
import AboutVisionMission from '@/components/second-pages/about/VisionMission';
import FAQ from '@/components/second-pages/FAQ';
import React from 'react';

const AboutPage = () => {
    return (
        <section>
            <AboutHero />
            <AboutVisionMission />
            <AboutTestimonials />
            <AboutTeam />
            <AboutSolutions />
            <FAQ className="mt-64" />
            <FooterWithCTA className="mt-64" />
        </section>
    );
};

export default AboutPage;
