import React from 'react';
import Footer from '@/components/Footer';
import TeamHero from '@/components/pages/Team/Hero';
import TeamList from '@/components/pages/Team/TeamList';

const MatchesPage = () => {
    return (
        <section>
            <TeamHero />
            <TeamList />
            <Footer />
        </section>
    );
};

export default MatchesPage;
