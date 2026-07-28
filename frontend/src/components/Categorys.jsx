import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

const CustomRightArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        aria-label='Next'
        title='Next'
        className='absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-[#F26627] text-white shadow-xl transition-all duration-300 hover:scale-110'
    >
        <MdArrowForwardIos size={22} />
    </button>
)

const CustomLeftArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        aria-label='Previous'
        title='Previous'
        className='absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full bg-[#F26627] text-white shadow-xl transition-all duration-300 hover:scale-110'
    >
        <MdArrowBackIos size={22} className='ml-1.5' />
    </button>
)

const Categorys = () => {

    const {categorys} = useSelector(state => state.home)

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1
        },
    }

    return (
        <div className='w-full pt-6 pb-10 bg-[#9BD7D1]'>
            <div className='w-[87%] mx-auto relative'>
                <div className='w-full'>
                    {/* Reduced bottom padding from pb-[40px] to pb-3 */}
                    <div className='text-center flex justify-center items-center flex-col text-3xl text-slate-900 font-bold relative pb-3'>
                        <h2>Top Category</h2>
                        <div className='w-[70px] h-[3px] rounded-full bg-[#F26627] mt-3'></div>
                    </div>
                </div>

                <Carousel
                    autoPlay={true}
                    infinite={true}
                    arrows={true}
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}
                    responsive={responsive}
                    transitionDuration={500}
                    itemClass='px-2 py-4'
                >
                    {
                        categorys.map((c, i) => (
                            <Link 
                                className='group block rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300' 
                                key={c._id || i} 
                                to={`/products?category=${c.name}`}
                            >
                                <div className='w-full h-[170px] overflow-hidden bg-slate-100 rounded-t-2xl'>
                                    <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 animate-fadeIn' src={c.image} alt={c.name} />
                                </div>
                                <div className='px-4 py-3 flex items-center justify-between border-t border-slate-100 rounded-b-2xl'>
                                    <span className='font-semibold text-slate-700 capitalize truncate'>{c.name}</span>
                                    <span className='w-7 h-7 shrink-0 rounded-full bg-slate-100 group-hover:bg-[#F26627] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors duration-300'>
                                        <FaArrowRight size={11} />
                                    </span>
                                </div>
                            </Link> 
                        ))
                    }
                </Carousel>        
            </div>
        </div>
    );
};

export default Categorys;