import FooterWithCTA from '@/components/FooterWithCTA';
import BlogHero from '@/components/second-pages/blog/Hero';
import BlogList from '@/components/second-pages/blog/List';
import React from 'react';

const BlogPage = () => {
    return (
        <section>
            <BlogHero />
            <BlogList />
            <FooterWithCTA className="mt-64" />
        </section>
    );
};

export default BlogPage;
