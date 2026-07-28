import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { get_banners } from '../store/reducers/homeReducer';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

// Palette Colors In Use:
// #F26627 (Vibrant Orange)
// #F9A26C (Soft Orange)
// #325D79 (Original Deep Greenish Palette Color)
// #46799B (Lighter Shade of #325D79)
// #9BD7D1 (Teal - Arrow Button Background)
// #EFEEEE (Off-White for Cards)

const slideThemes = [
    {
        // 1. Vibrant Orange Banner
        bg: 'bg-[#F26627]',
        btnBg: 'bg-white hover:bg-gray-100 text-black',
    },
    {
        // 2. Original Dark Greenish Banner (#325D79)
        bg: 'bg-[#325D79]',
        btnBg: 'bg-white hover:bg-gray-100 text-black',
    },
    {
        // 3. Soft Orange Banner
        bg: 'bg-[#F9A26C]',
        btnBg: 'bg-white hover:bg-gray-100 text-black',
    },
    {
        // 4. Lighter Shade of Greenish (#46799B)
        bg: 'bg-[#46799B]',
        btnBg: 'bg-white hover:bg-gray-100 text-black',
    }
];

const CustomRightArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        aria-label='Next banner'
        title='Next'
        className='absolute right-4 md-lg:right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md-lg:w-10 md-lg:h-10 flex items-center justify-center rounded-full bg-[#9BD7D1] hover:bg-[#7bbbb4] text-black shadow-lg transition-all duration-300 hover:scale-110 active:scale-95'
    >
        <MdArrowForwardIos size={22} className='text-black' />
    </button>
);

const CustomLeftArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        aria-label='Previous banner'
        title='Previous'
        className='absolute left-4 md-lg:left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md-lg:w-10 md-lg:h-10 flex items-center justify-center rounded-full bg-[#9BD7D1] hover:bg-[#7bbbb4] text-black shadow-lg transition-all duration-300 hover:scale-110 active:scale-95'
    >
        <MdArrowBackIos size={22} className='ml-1 text-black' />
    </button>
);

const Banner = () => {
    const dispatch = useDispatch();
    const { banners } = useSelector(state => state.home);

    const categoryDescriptions = {
        'electronics': 'Explore the latest gadgets and devices, built to keep you connected and ahead of the curve.',
        'mobile phones': 'Top brands, the newest releases, and unbeatable prices on smartphones for every budget.',
        'laptops': 'Powerful laptops for work, study, and play — find the perfect fit for your everyday needs.',
        'furniture': 'Stylish, comfortable furniture that transforms any room into a space you love coming home to.',
        'fashion': 'Trend-forward styles for every season, curated to help you look and feel your best.',
        'womens dresses': 'Elegant, comfortable, and effortlessly stylish — dresses for every occasion.',
        'footwear': 'From everyday comfort to statement style, step out in shoes made for every occasion.',
        'accessories': 'Finishing touches that complete any outfit, from everyday essentials to standout pieces.',
        'home & kitchen': 'Everything you need to make your home more functional, comfortable, and beautiful.',
        'beauty': 'Skincare, haircare, and beauty essentials to help you look and feel your best every day.',
        'fragrances': 'Signature scents for every mood — find the fragrance that feels unmistakably you.',
        'perfume': 'Signature scents for every mood — find the fragrance that feels unmistakably you.',
        'sports': 'Gear up for your next workout, match, or adventure with quality sports essentials.',
        'toys': 'Fun, safe, and imaginative toys that bring smiles to kids of every age.',
        'stationery': 'Everyday stationery essentials for school, office, and everything in between.',
        'jewellery': 'Timeless pieces to elevate any look, from everyday wear to special occasions.',
        'jewelry': 'Timeless pieces to elevate any look, from everyday wear to special occasions.',
        'watches': 'Precision and style on your wrist — timepieces built to match every occasion.',
        'bags': 'Durable, functional bags designed to carry everything you need in style.',
        'groceries': 'Fresh picks and pantry staples, delivered with quality you can count on.',
        'books': 'Stories and knowledge worth getting lost in, for readers of every taste.',
    };

    const fallbackTemplates = [
        (c) => `Discover ${c} chosen for quality and everyday value.`,
        (c) => `Fresh picks in ${c}, curated to match what you're looking for.`,
        (c) => `Quality ${c}, hand-picked to fit your everyday needs.`,
        (c) => `Explore our ${c} range, built around style and value.`,
        (c) => `Find your next favorite in ${c} — carefully selected, fairly priced.`,
    ];
    const defaultDescription = 'Discover quality products at prices that make sense, hand-picked just for you.';

    const getDescription = (category) => {
        if (!category) return defaultDescription;
        const key = category.toLowerCase();
        if (categoryDescriptions[key]) return categoryDescriptions[key];

        let hash = 0;
        for (let i = 0; i < key.length; i++) hash = (hash + key.charCodeAt(i)) % fallbackTemplates.length;
        return fallbackTemplates[hash](category.toLowerCase());
    };

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    useEffect(() => {
        dispatch(get_banners());
    }, [dispatch]);

    return (
        <div className='w-full'>
            <div className='w-full overflow-hidden'>
                {banners.length > 0 && (
                    <Carousel
                        autoPlay={true}
                        autoPlaySpeed={4500}
                        infinite={true}
                        arrows={true}
                        showDots={false}
                        customRightArrow={<CustomRightArrow />}
                        customLeftArrow={<CustomLeftArrow />}
                        responsive={responsive}
                    >
                        {banners.map((b, i) => {
                            const theme = slideThemes[i % slideThemes.length];
                            const to = b.category
                                ? `/products?category=${b.category}`
                                : `/product/details/${b.link}`;

                            return (
                                <Link key={i} to={to}>
                                    <div className={`relative w-full h-[460px] lg:h-[380px] md-lg:h-[300px] sm:h-[240px] overflow-hidden ${theme.bg} flex items-center justify-center transition-colors duration-500`}>
                                        
                                        {/* Product Image */}
                                        <img
                                            className='w-full h-full object-contain object-center z-10 relative py-4'
                                            src={b.banner}
                                            alt={b.category || 'Shop banner'}
                                        />

                                        {/* Left Side Call To Action */}
                                        <div className='absolute inset-0 z-30 flex flex-col justify-center pl-20 pr-8 md-lg:pl-14 sm:pl-10 max-w-[540px]'>
                                            {b.category && (
                                                <>
                                                    <span className='text-xs sm:text-[10px] font-bold uppercase tracking-[0.25em] mb-2 text-white drop-shadow-sm'>
                                                        Shop by Category
                                                    </span>
                                                    <h2 className='text-4xl lg:text-3xl sm:text-2xl font-black mb-6 leading-tight capitalize text-white drop-shadow-md'>
                                                        {b.category}
                                                    </h2>
                                                </>
                                            )}

                                            <span className={`inline-flex w-fit items-center gap-2.5 ${theme.btnBg} transition-all duration-300 text-base sm:text-xs font-bold px-8 py-3.5 rounded-full shadow-md hover:scale-105 capitalize`}>
                                                {b.category ? `Shop ${b.category}` : 'Shop Now'}
                                                <MdArrowForwardIos size={16} className='text-black' />
                                            </span>
                                        </div>

                                        {/* Right Side Description Box */}
                                        <div className='flex md-lg:hidden absolute inset-y-0 right-0 z-30 w-[38%] flex-col justify-center items-start pl-4 pr-16'>
                                            <div className='bg-[#EFEEEE] border-2 border-white rounded-2xl p-6 shadow-lg max-w-sm'>
                                                <p className='text-[#111827] text-sm font-semibold italic leading-relaxed'>
                                                    {getDescription(b.category)}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            );
                        })}
                    </Carousel>
                )}
            </div>
        </div>
    );
};

export default Banner;