import React, { useEffect } from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { get_wishlist_products, remove_wishlist,messageClear } from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';

const Wishlist = () => { 

    const dispatch = useDispatch()
    const {userInfo } = useSelector(state => state.auth)
    const {wishlist,successMessage } = useSelector(state => state.card)
   
    useEffect(() => {
        dispatch(get_wishlist_products(userInfo.id))
    },[])

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        }   
    },[successMessage])

    return (
        <div>
            <h2 className='text-lg font-bold text-slate-700 pb-4'>My Wishlist ({wishlist.length})</h2>
        <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
            {
                wishlist.map((p, i) => <div key={i} className='group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden'>
                <div className='relative overflow-hidden'>
                
                {
                    p.discount !== 0 && <div className='flex justify-center items-center absolute text-white w-[36px] h-[36px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 z-10 shadow-md'>{p.discount}% </div> 
                }
    
            <div className='w-full h-[240px] overflow-hidden bg-slate-50'>
            <img className='sm:w-full w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={p.image} alt="" />  
            </div>
    
            <ul className='flex transition-all duration-500 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                <li onClick={() => dispatch(remove_wishlist(p._id))} className='w-[36px] h-[36px] cursor-pointer bg-white shadow-md flex justify-center items-center rounded-full hover:bg-[#2563EB] hover:text-white transition-all duration-300'>
                <FaRegHeart size={14} />
                </li>
                <Link to={`/product/details/${p.slug}`} className='w-[36px] h-[36px] cursor-pointer bg-white shadow-md flex justify-center items-center rounded-full hover:bg-[#2563EB] hover:text-white transition-all duration-300'>
                <FaEye size={14} />
                </Link>
                <li className='w-[36px] h-[36px] cursor-pointer bg-white shadow-md flex justify-center items-center rounded-full hover:bg-[#2563EB] hover:text-white transition-all duration-300'>
                <RiShoppingCartLine size={15} />
                </li>
            </ul>    
                </div>
    
            <div className='py-3 text-slate-600 px-3'>
                <h2 className='font-semibold text-slate-700 truncate'>{p.name} </h2>
                <div className='flex justify-start items-center gap-3 mt-1'>
                    <span className='text-base font-bold text-slate-800'>₹{p.price}</span>
                    <div className='flex'>
                        <Rating ratings={p.rating} />
                    </div>
                </div>
            </div>    
            </div> )
            }
        </div>
        {
            wishlist.length === 0 && <p className='text-slate-500 text-sm py-6 text-center'>Your wishlist is empty.</p>
        }
        </div>
    );
};

export default Wishlist;
