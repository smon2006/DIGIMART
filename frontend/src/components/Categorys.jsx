import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';

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
        <div className='w-full py-14 bg-[#c8d8f0]'>
        <div className='w-[87%] mx-auto relative'>
            <div className='w-full'>
            <div className='text-center flex justify-center items-center flex-col text-3xl text-slate-700 font-bold relative pb-[40px]'>
                <h2>Top Category</h2>
                <div className='w-[70px] h-[3px] rounded-full bg-[#2563EB] mt-4'></div>
            </div>
            </div>

                <Carousel
                    autoPlay={true}
                    infinite={true}
                    arrows={true} 
                    responsive={responsive}
                    transitionDuration={500}
                    itemClass='px-2'
                >
                {
                    categorys.map((c, i) => <Link className='group block rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300' key={i} to={`/products?category=${c.name}`}>
                        <div className='w-full h-[170px] overflow-hidden bg-slate-100'>
                            <img className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={c.image} alt={c.name} />
                        </div>
                        <div className='px-4 py-3 flex items-center justify-between border-t border-slate-100'>
                            <span className='font-semibold text-slate-700 capitalize truncate'>{c.name}</span>
                            <span className='w-7 h-7 shrink-0 rounded-full bg-slate-100 group-hover:bg-[#2563EB] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors duration-300'>
                                <FaArrowRight size={11} />
                            </span>
                        </div>
                    </Link> )
                }
                </Carousel>        
         </div>
         </div>
             
    );
};

export default Categorys;