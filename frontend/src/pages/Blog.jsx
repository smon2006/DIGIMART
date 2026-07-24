import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { FaRegCalendarAlt, FaRegUser } from 'react-icons/fa';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: 'Top 10 Tech Gadgets to Watch This Year',
            excerpt: 'Discover the latest innovations that are reshaping the way we live, work, and play in the digital age.',
            image: '/images/products/1.webp',
            author: 'Admin',
            date: 'May 12, 2024',
            category: 'Technology',
        },
        {
            id: 2,
            title: 'A Beginner Guide to Smart Online Shopping',
            excerpt: 'Learn how to find the best deals, compare sellers, and shop safely on modern marketplaces.',
            image: '/images/products/2.webp',
            author: 'Admin',
            date: 'May 08, 2024',
            category: 'Shopping',
        },
        {
            id: 3,
            title: 'How to Choose the Right Product for You',
            excerpt: 'Cut through the noise with our practical framework for evaluating quality, price, and reviews.',
            image: '/images/products/3.webp',
            author: 'Admin',
            date: 'Apr 29, 2024',
            category: 'Guides',
        },
        {
            id: 4,
            title: 'Sustainable Shopping: Small Changes, Big Impact',
            excerpt: 'Explore easy ways to make more eco-conscious purchasing decisions without breaking the bank.',
            image: '/images/products/4.webp',
            author: 'Admin',
            date: 'Apr 20, 2024',
            category: 'Lifestyle',
        },
        {
            id: 5,
            title: 'Behind the Scenes: How Our Sellers Ship Fast',
            excerpt: 'A look at the logistics network that gets your orders delivered quickly and reliably.',
            image: '/images/products/5.webp',
            author: 'Admin',
            date: 'Apr 11, 2024',
            category: 'Logistics',
        },
        {
            id: 6,
            title: 'Seasonal Sales: When to Buy for the Best Price',
            excerpt: 'Timing is everything. Here is our calendar of the best times to grab a bargain.',
            image: '/images/products/6.webp',
            author: 'Admin',
            date: 'Apr 03, 2024',
            category: 'Deals',
        },
    ];

    return (
        <div className='w-full'>
            <Header />
            <PageHeader title='Blog' crumbs={[{ label: 'Blog' }]} />

            <div className='w-[85%] lg:w-[90%] mx-auto py-16 md-lg:py-10'>
                <div className='grid grid-cols-3 md-lg:grid-cols-2 sm:grid-cols-1 gap-8'>
                    {posts.map((post) => (
                        <article key={post.id} className='bg-white border border-slate-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow'>
                            <div className='overflow-hidden'>
                                <img
                                    className='w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-300'
                                    src={post.image}
                                    alt={post.title}
                                />
                            </div>
                            <div className='p-5'>
                                <span className='inline-block text-xs font-medium text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-1 rounded'>
                                    {post.category}
                                </span>
                                <h3 className='text-lg font-semibold text-slate-800 mt-3 leading-snug text-pretty'>
                                    {post.title}
                                </h3>
                                <p className='text-slate-600 text-sm leading-relaxed mt-2'>{post.excerpt}</p>
                                <div className='flex items-center gap-4 mt-4 text-xs text-slate-500'>
                                    <span className='flex items-center gap-1.5'><FaRegUser /> {post.author}</span>
                                    <span className='flex items-center gap-1.5'><FaRegCalendarAlt /> {post.date}</span>
                                </div>
                                <Link
                                    to='/blog'
                                    className='inline-block mt-4 text-sm font-medium text-[#2563EB] hover:underline'
                                >
                                    Read More
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Blog;
