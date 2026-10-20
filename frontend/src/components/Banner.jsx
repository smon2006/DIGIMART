import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { get_banners } from '../store/reducers/homeReducer';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

// Slide looks. They rotate by position. Dark backgrounds sit well next to the navy
// header/footer, and each has a soft glow behind the product.
const themes = [
    { bg: 'linear-gradient(110deg, #0f172a 0%, #1e293b 55%, #334155 100%)', glow: 'rgba(245,179,1,0.28)' },
    { bg: 'linear-gradient(110deg, #18181b 0%, #27272a 55%, #3f3f46 100%)', glow: 'rgba(245,158,11,0.26)' },
    { bg: 'linear-gradient(110deg, #0b1a33 0%, #1e3a5f 55%, #2c5282 100%)', glow: 'rgba(56,189,248,0.24)' },
];

const arrowClass = 'md:hidden absolute top-1/2 -translate-y-1/2 z-30 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white border border-white/20 transition-all duration-300';

const CustomRightArrow = ({ onClick }) => (
    <button onClick={onClick} aria-label='Next banner' title='Next' className={`${arrowClass} right-4`}>
        <MdArrowForwardIos size={18} />
    </button>
);

const CustomLeftArrow = ({ onClick }) => (
    <button onClick={onClick} aria-label='Previous banner' title='Previous' className={`${arrowClass} left-4`}>
        <MdArrowBackIos size={18} className='ml-1' />
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

    const hiddenCategories = ['books', 'stationery','electronics','jewelry','accessories','bags','fragrances','womens dresses','womens watches','womens jewellery','tops','motorcycle','tablets'];

    const visibleBanners = banners.filter(
        b => !hiddenCategories.includes((b.category || '').toLowerCase())
    );

    return (
        <div className='w-full'>
            <div className='w-full overflow-hidden'>
                {visibleBanners.length > 0 && (
                    <Carousel
                        autoPlay={true}
                        autoPlaySpeed={5000}
                        infinite={true}
                        arrows={true}
                        showDots={false}
                        customRightArrow={<CustomRightArrow />}
                        customLeftArrow={<CustomLeftArrow />}
                        responsive={responsive}
                    >
                        {visibleBanners.map((b, i) => {
                            const theme = themes[i % themes.length];
                            const to = b.category
                                ? `/products?category=${b.category}`
                                : `/product/details/${b.link}`;

                            return (
                                <Link key={i} to={to} className='block'>
                                    <div
                                        className='relative w-full h-[400px] xl:h-[360px] lg:h-[320px] md-lg:h-[280px] md:h-[230px] xs:h-[210px] overflow-hidden'
                                        style={{ background: theme.bg }}
                                    >
                                        {/* Soft glow behind the product */}
                                        <div
                                            className='absolute inset-0 pointer-events-none'
                                            style={{ background: `radial-gradient(circle at 76% 50%, ${theme.glow}, transparent 55%)` }}
                                        />

                                        <div className='relative h-full w-[85%] lg:w-[90%] md:w-[88%] mx-auto flex items-center justify-between gap-8 md:gap-4'>

                                            {/* Text */}
                                            <div className='min-w-0 flex-1 flex flex-col items-start'>
                                                {b.category && (
                                                    <h2 className='text-[clamp(1.5rem,3.6vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight capitalize text-white break-words'>
                                                        {b.category}
                                                    </h2>
                                                )}
                                                <p className='md:hidden mt-4 text-[clamp(0.95rem,1.2vw,1.2rem)] leading-relaxed text-slate-300 max-w-[34ch]'>
                                                    {getDescription(b.category)}
                                                </p>
                                                <span className='mt-7 md:mt-4 inline-flex items-center rounded-full bg-[#F5B301] hover:brightness-95 transition-colors text-white font-semibold whitespace-nowrap px-8 py-3.5 text-base md:px-5 md:py-2 md:text-sm shadow-lg'>
                                                    Shop now
                                                </span>
                                            </div>

                                            {/* Product on a white disc with a faint halo.
                                                multiply hides a white photo background inside the disc */}
                                            <div className='relative shrink-0 h-[84%] md:h-[76%] aspect-square'>
                                                <div className='absolute -inset-[7%] rounded-full border border-white/15' />
                                                <div className='absolute -inset-[14%] rounded-full border border-white/[0.07] md:hidden' />
                                                <div className='absolute inset-0 rounded-full bg-white overflow-hidden shadow-2xl'>
                                                    <img
                                                        className='w-full h-full object-contain mix-blend-multiply p-[9%]'
                                                        src={b.banner}
                                                        alt={b.category || 'Featured product'}
                                                        loading={i === 0 ? 'eager' : 'lazy'}
                                                        decoding='async'
                                                    />
                                                </div>
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