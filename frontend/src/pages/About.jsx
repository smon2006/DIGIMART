import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { FaShippingFast, FaLock, FaHeadset, FaTags } from 'react-icons/fa';

const About = () => {
    const stats = [
        { value: '10K+', label: 'Happy Customers' },
        { value: '5K+', label: 'Products' },
        { value: '500+', label: 'Verified Sellers' },
        { value: '50+', label: 'Categories' },
    ];

    const features = [
        { icon: <FaShippingFast />, title: 'Fast Delivery', desc: 'Quick and reliable shipping right to your doorstep across the country.' },
        { icon: <FaLock />, title: 'Secure Payments', desc: 'Your transactions are protected with industry-standard encryption.' },
        { icon: <FaHeadset />, title: '24/7 Support', desc: 'Our dedicated team is always here to help you with any questions.' },
        { icon: <FaTags />, title: 'Best Prices', desc: 'Enjoy competitive pricing and exclusive deals from trusted sellers.' },
    ];

    return (
        <div className='w-full'>
            <Header />
            <PageHeader title='About Us' crumbs={[{ label: 'About Us' }]} />

            <div className='w-[85%] lg:w-[90%] mx-auto py-16 md-lg:py-10'>
                <div className='flex flex-wrap items-center gap-y-8'>
                    <div className='w-6/12 md-lg:w-full md-lg:pr-0 pr-10'>
                        <h2 className='text-3xl md-lg:text-2xl font-bold text-slate-800 mb-4 text-pretty'>
                            Your Trusted Online Marketplace
                        </h2>
                        <p className='text-slate-600 leading-relaxed mb-4'>
                            DigiMart is a modern multi-vendor marketplace built to connect thousands of
                            sellers with millions of shoppers. We make it simple to discover quality
                            products, compare prices, and shop with confidence.
                        </p>
                        <p className='text-slate-600 leading-relaxed'>
                            From electronics to fashion, home essentials to accessories, our mission is to
                            deliver an effortless shopping experience backed by secure payments, fast
                            delivery, and responsive customer care.
                        </p>
                    </div>
                    <div className='w-6/12 md-lg:w-full'>
                        <img
                            className='w-full h-[340px] md-lg:h-[260px] object-cover rounded-lg shadow-sm'
                            src='/images/banner/shop.png'
                            alt='About DigiMart marketplace'
                        />
                    </div>
                </div>

                <div className='grid grid-cols-4 md-lg:grid-cols-2 gap-6 mt-16'>
                    {stats.map((s, i) => (
                        <div key={i} className='bg-slate-50 border border-slate-200 rounded-lg py-8 flex flex-col items-center justify-center'>
                            <span className='text-3xl font-bold text-[#2563EB]'>{s.value}</span>
                            <span className='text-slate-600 text-sm mt-2'>{s.label}</span>
                        </div>
                    ))}
                </div>

                <div className='mt-16'>
                    <h2 className='text-2xl font-bold text-slate-800 text-center mb-10'>Why Shop With Us</h2>
                    <div className='grid grid-cols-4 md-lg:grid-cols-2 sm:grid-cols-1 gap-6'>
                        {features.map((f, i) => (
                            <div key={i} className='bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow'>
                                <div className='w-12 h-12 flex items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB] text-xl mb-4'>
                                    {f.icon}
                                </div>
                                <h3 className='font-semibold text-slate-800 mb-2'>{f.title}</h3>
                                <p className='text-slate-600 text-sm leading-relaxed'>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
