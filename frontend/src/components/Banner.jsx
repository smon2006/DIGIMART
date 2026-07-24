import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { get_banners } from '../store/reducers/homeReducer';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

const CustomRightArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        aria-label='Next banner'
        title='Next'
        className='absolute right-5 md-lg:right-3 top-1/2 -translate-y-1/2 z-30 w-14 h-14 md-lg:w-11 md-lg:h-11 flex items-center justify-center rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-xl transition-all duration-300 hover:scale-110'
    >
        <MdArrowForwardIos size={28} />
    </button>
)

const CustomLeftArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        aria-label='Previous banner'
        title='Previous'
        className='absolute left-5 md-lg:left-3 top-1/2 -translate-y-1/2 z-30 w-14 h-14 md-lg:w-11 md-lg:h-11 flex items-center justify-center rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-xl transition-all duration-300 hover:scale-110'
    >
        <MdArrowBackIos size={28} className='ml-1.5' />
    </button>
)

const Banner = () => {

    const dispatch = useDispatch()
    const {banners} = useSelector(state => state.home)

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
    }

    const fallbackTemplates = [
        (c) => `Discover ${c} chosen for quality and everyday value.`,
        (c) => `Fresh picks in ${c}, curated to match what you're looking for.`,
        (c) => `Quality ${c}, hand-picked to fit your everyday needs.`,
        (c) => `Explore our ${c} range, built around style and value.`,
        (c) => `Find your next favorite in ${c} — carefully selected, fairly priced.`,
    ]
    const defaultDescription = 'Discover quality products at prices that make sense, hand-picked just for you.'
    const getDescription = (category) => {
        if (!category) return defaultDescription
        const key = category.toLowerCase()
        if (categoryDescriptions[key]) return categoryDescriptions[key]
        
        let hash = 0
        for (let i = 0; i < key.length; i++) hash = (hash + key.charCodeAt(i)) % fallbackTemplates.length
        return fallbackTemplates[hash](category.toLowerCase())
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        },
    }

    useEffect(() => {
        dispatch(get_banners())
    },[])

    return (
        <div className='w-full'>
            <div className='w-full overflow-hidden'>
                {
                   banners.length > 0 &&
                <Carousel
                    autoPlay={true}
                    autoPlaySpeed={4500}
                    infinite={true}
                    arrows={true}
                    showDots={true}
                    customRightArrow={<CustomRightArrow />}
                    customLeftArrow={<CustomLeftArrow />}
                    responsive={responsive}
                >
                {
                   banners.map((b, i) => {
                       
                       const to = b.category
                           ? `/products?category=${b.category}`
                           : `/product/details/${b.link}`
                       return (
                        <Link key={i} to={to}>
                        <div className='relative w-full h-[480px] lg:h-[380px] md-lg:h-[300px] sm:h-[240px] overflow-hidden bg-slate-100'>
                            <img className='w-full h-full object-contain object-center' src={b.banner} alt={b.category || 'Shop banner'} />
                            {}
                            <div className='absolute inset-0 bg-gradient-to-r from-slate-700/45 via-slate-700/15 to-transparent' />

                            <div className='absolute inset-0 flex flex-col justify-center pl-24 pr-12 md-lg:pl-20 md-lg:pr-8 sm:pl-16 sm:pr-5 max-w-[560px]'>
                                {
                                    b.category && <>
                                        <span className='text-white/75 text-xs sm:text-[11px] font-semibold uppercase tracking-[0.25em] mb-3'>Shop by Category</span>
                                        <h2 className='text-white text-4xl lg:text-3xl sm:text-2xl font-extrabold mb-6 leading-tight capitalize drop-shadow-lg text-balance'>{b.category}</h2>
                                    </>
                                }
                                {}
                                {
                                    b.category
                                    ? <span className='inline-flex w-fit items-center gap-3 bg-white/15 backdrop-blur-md border border-white/40 hover:bg-white hover:text-slate-900 transition-all duration-300 text-white text-lg sm:text-sm font-bold px-8 py-3.5 rounded-full shadow-xl hover:scale-[1.04] capitalize'>
                                        Shop {b.category}
                                        <MdArrowForwardIos size={20} />
                                      </span>
                                    : <span className='inline-flex w-fit items-center gap-3 bg-[#2563EB] hover:bg-[#1d4ed8] transition-all duration-300 text-white text-lg sm:text-sm font-bold px-8 py-3.5 rounded-full shadow-xl hover:scale-[1.04]'>
                                        Shop Now
                                        <MdArrowForwardIos size={20} />
                                      </span>
                                }
                            </div>

                            {}
                            <div className='flex md-lg:hidden absolute inset-y-0 right-0 w-[36%] flex-col justify-center items-start pl-7 pr-20'>
                                <div className='border-2 border-slate-900/15 rounded-xl px-6 py-5'>
                                    <p className='text-slate-700 text-base font-semibold italic leading-relaxed'>{getDescription(b.category)}</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                       )
                   })
                }
                </Carousel>
                }
            </div>
        </div>
    );
};

export default Banner;