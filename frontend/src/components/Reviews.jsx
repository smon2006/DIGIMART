import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import RatingReact from 'react-rating'
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { customer_review, get_reviews, messageClear, product_details } from '../store/reducers/homeReducer';
import toast from 'react-hot-toast';

const Reviews = ({product}) => {

    const dispatch = useDispatch()
    const [parPage, setParPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)
    
    const {userInfo } = useSelector(state => state.auth)
    const {successMessage,reviews,rating_review,totalReview } = useSelector(state => state.home)

    const [rat, setRat] = useState('')
    const [re, setRe] = useState('')

    const review_submit = (e) => {
        e.preventDefault()
        const obj = {
            name: userInfo.name,
            review: re,
            rating : rat,
            productId: product._id
        }
        dispatch(customer_review(obj))
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage) 
            dispatch(get_reviews({
                productId: product._id,
                pageNumber
            }))
            dispatch(product_details(product.slug))
            setRat('')
            setRe('')
            dispatch(messageClear())
        }  
    },[successMessage])

    useEffect(() => {
        if (product._id) {
            dispatch(get_reviews({
                productId: product._id,
                pageNumber
            }))
        }
    },[pageNumber,product])

    return (
<div className='mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-4'>
    <div className='flex gap-10 md-lg:flex-col'>
        <div className='flex flex-col gap-2 justify-center items-center py-4 px-6 border-r md-lg:border-r-0 md-lg:border-b border-slate-100 md-lg:pb-6'>
            <div>
                <span className='text-6xl font-bold text-slate-800'>{product.rating}</span>
                <span className='text-3xl font-semibold text-slate-400'>/5</span>
            </div>
            <div className='flex text-2xl'>
            <Rating ratings={product.rating} />
            </div>
            <p className='text-sm text-slate-500'>({totalReview}) Reviews</p>
        </div>

        <div className='flex gap-2 flex-col py-4 flex-1'>
            <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
             <RatingTemp rating={5} />
            </div>
            <div className='w-full max-w-[220px] h-[10px] rounded-full bg-slate-100 relative overflow-hidden'>
                <div style={{ width: `${Math.floor(( 100 * (rating_review[0]?.sum || 0)) / totalReview )}%` }}  className='h-full rounded-full bg-[#EDBB0E]'> 
                </div> 
            </div>
            <p className='text-sm text-slate-500'>{rating_review[0]?.sum }</p>
            </div>

            <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
             <RatingTemp rating={4} />
            </div>
            <div className='w-full max-w-[220px] h-[10px] rounded-full bg-slate-100 relative overflow-hidden'>
                <div style={{ width: `${Math.floor(( 100 * (rating_review[1]?.sum || 0)) / totalReview )}%` }}  className='h-full rounded-full bg-[#EDBB0E]'> 
                </div> 
            </div>
            <p className='text-sm text-slate-500'>{rating_review[1]?.sum }</p>
            </div>

            <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
             <RatingTemp rating={3} />
            </div>
            <div className='w-full max-w-[220px] h-[10px] rounded-full bg-slate-100 relative overflow-hidden'>
                <div style={{ width: `${Math.floor(( 100 * (rating_review[2]?.sum || 0)) / totalReview )}%` }}  className='h-full rounded-full bg-[#EDBB0E]'> 
                </div> 
            </div>
            <p className='text-sm text-slate-500'>{rating_review[2]?.sum }</p>
            </div>

            <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
             <RatingTemp rating={2} />
            </div>
            <div className='w-full max-w-[220px] h-[10px] rounded-full bg-slate-100 relative overflow-hidden'>
                <div style={{ width: `${Math.floor(( 100 * (rating_review[3]?.sum || 0)) / totalReview )}%` }}   className='h-full rounded-full bg-[#EDBB0E]'> 
                </div> 
            </div>
            <p className='text-sm text-slate-500'>{rating_review[3]?.sum }</p>
            </div>

            <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
             <RatingTemp rating={1} />
            </div>
            <div className='w-full max-w-[220px] h-[10px] rounded-full bg-slate-100 relative overflow-hidden'>
                <div  style={{ width: `${Math.floor(( 100 * (rating_review[4]?.sum || 0)) / totalReview )}%` }}   className='h-full rounded-full bg-[#EDBB0E]'> 
                </div> 
            </div>
            <p className='text-sm text-slate-500'>{rating_review[4]?.sum }</p>
            </div>

            <div className='flex justify-start items-center gap-5'>
            <div className='text-md flex gap-1 w-[93px]'>
             <RatingTemp rating={0} />
            </div>
            <div className='w-full max-w-[220px] h-[10px] rounded-full bg-slate-100 relative overflow-hidden'>
                <div className='h-full rounded-full bg-[#EDBB0E] w-[0%]'> 
                </div> 
            </div>
            <p className='text-sm text-slate-500'>0</p>
            </div>
 
        </div> 
    </div> 

    <h2 className='text-slate-700 text-xl font-bold py-5 border-t border-slate-100 mt-2'>Product Review ({totalReview})</h2>

    <div className='flex flex-col gap-5 pb-8 pt-2'>
        {
            reviews.map((r,i) => <div key={i} className='flex flex-col gap-1 p-4 rounded-xl bg-slate-50 border border-slate-100'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-1 text-lg'>
                        <RatingTemp rating={r.rating} />
                    </div>
                    <span className='text-slate-400 text-sm'>{r.date}</span>
                </div>
                <span className='text-slate-700 text-sm font-semibold'>{r.name}</span>
                <p className='text-slate-600 text-sm'>{r.review}</p>
            </div>
            )
        }
        <div className='flex justify-end'>
            {
               totalReview > 5 && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber}  totalItem={totalReview} parPage={parPage} showItem={Math.floor(totalReview / 3)} />
            }
        </div> 
    </div>

    <div> 
        {
            userInfo ? <div className='flex flex-col gap-3 border-t border-slate-100 pt-6'>
                <div className='flex gap-1'>
                    <RatingReact 
                    onChange={(e) => setRat(e)}
                    initialRating={rat}
                    emptySymbol={<span className='text-slate-300 text-3xl'><CiStar/></span>}
                    fullSymbol={<span className='text-[#EDBB0E] text-3xl'><FaStar/></span>} 
                    /> 
                 </div> 
                 <form onSubmit={review_submit}>
                    <textarea value={re} onChange={(e) => setRe(e.target.value)} required className='border border-slate-300 rounded-lg outline-0 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 p-3 w-full text-sm transition-all' placeholder='Share your thoughts about this product...' name="" id="" cols="30" rows="5"></textarea>
                <div className='mt-3'>
            <button className='py-2 px-6 bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors text-white rounded-full text-sm font-semibold'>Submit Review</button>
                </div> 
                 
                 </form>

            </div> : <div className='border-t border-slate-100 pt-6'>
                <Link to='/login' className='inline-block py-2 px-6 bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors text-white rounded-full text-sm font-semibold'> Login to Write a Review </Link>
            </div>
        }
    </div>

</div>
    );
};

export default Reviews;
