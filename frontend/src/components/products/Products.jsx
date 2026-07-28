import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css' 
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
  
const Products = ({title,products}) => {
    
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

    const ButtonGroup = ({next,previous}) => {
        return (
            <div className='flex justify-between items-center mb-3'>
                <div className='text-xl font-bold text-slate-700'> {title} </div>
                <div className='flex justify-center items-center gap-2 text-slate-600'>
                    <button title="Previous" onClick={()=>previous()} className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-slate-100 hover:bg-[#F26627] hover:text-white transition-colors'>
                        <IoIosArrowBack size={13} />
                    </button>
                    <button title="Next" onClick={()=>next()} className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-slate-100 hover:bg-[#F26627] hover:text-white transition-colors'>
                    <IoIosArrowForward size={13} /> 

                    </button>
                </div>

            </div>
        )

    }

    return (
        <div className='flex gap-8 flex-col-reverse bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-full'>
            <Carousel
                    autoPlay={false}
                    infinite={false}
                    arrows={false} 
                    responsive={responsive}
                    transitionDuration={500}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup/>}
                >
       {
        products.map((p,i)=> {
            return(
                <div key={i} className='flex flex-col justify-start gap-1'>
               {
                p.map((pl, j) =>  <Link key={j} className='flex justify-start items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors' to={`/product/details/${pl.slug}`}>
                <img className='w-[72px] h-[72px] rounded-lg border border-slate-100 object-cover shrink-0' src={pl.images[0]} alt="" />
                <div className='flex justify-start items-start gap-1 flex-col text-slate-600 min-w-0'>
                    <h2 className='text-base font-medium truncate w-full'>{pl.name} </h2>
                    {
                        pl.discount > 0 ? (
                            <span className='text-lg font-bold text-[#F26627]'>
                                ₹{pl.price - Math.floor((pl.price * pl.discount) / 100)}{' '}
                                <span className='text-sm font-medium text-slate-400 line-through'>₹{pl.price}</span>{' '}
                                <span className='text-sm font-semibold text-red-500'>({pl.discount}% off)</span>
                            </span>
                        ) : (
                            <span className='text-lg font-bold text-[#F26627]'>₹{pl.price}</span>
                        )
                    }
                </div>  
            </Link>
                 )
               }
            </div>   
            )
        })
       }         
                
                </Carousel>   
        </div>
    );
};

export default Products;