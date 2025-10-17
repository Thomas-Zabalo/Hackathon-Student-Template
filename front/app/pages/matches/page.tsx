import React from 'react';
import MatchesHero from '@/components/pages/matches/Hero';
import Footer from '@/components/Footer';
import MatchesList from '@/components/pages/matches/MatchesList';

const MatchesPage = () => {
    return (
        <section>
            <MatchesHero />
            <MatchesList />
            <Footer />
        </section>
    );
};

export default MatchesPage;
