import React from 'react';
import Footer from '@/components/Footer';
import MatchDetail from '@/components/pages/matches/MatchDetail';
import MatchDetailHero from '@/components/pages/matches/HeroDetail';

const MatchesDetailPage = () => {
    return (
        <section>
            <MatchDetailHero />
            <MatchDetail />
            <Footer />
        </section>
    );
};

export default MatchesDetailPage;
