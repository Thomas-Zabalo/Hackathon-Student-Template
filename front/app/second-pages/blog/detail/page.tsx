import FooterWithCTA from '@/components/FooterWithCTA';
import BlogDetailHero from '@/components/second-pages/blog/detail/Hero';
import BlogDetailContent from '@/components/second-pages/blog/detail/Content';
import React from 'react';

const BlogDetailPage = () => {
    return (
        <section>
            <BlogDetailHero />
            <BlogDetailContent />
            <FooterWithCTA className="mt-64" />
        </section>
    );
};

export default BlogDetailPage;
