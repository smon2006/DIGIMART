import React, { useEffect } from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { add_to_card,add_to_wishlist,messageClear } from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';

const FeatureProducts = ({products}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userInfo } = useSelector(state => state.auth)
    const {errorMessage,successMessage } = useSelector(state => state.card)

    const add_card = (id) => {
        if (userInfo) {
           dispatch(add_to_card({
            userId: userInfo.id,
            quantity : 1,
            productId : id
           }))
        } else {
            navigate('/login')
        }
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        } 
        
    },[successMessage,errorMessage])

    const add_wishlist = (pro) => {
        dispatch(add_to_wishlist({
            userId: userInfo.id,
            productId: pro._id,
            name: pro.name,
            price: pro.price,
            image: pro.images[0],
            discount: pro.discount,
            rating: pro.rating,
            slug: pro.slug
        }))
    }

    return ( 
        <div className='w-[85%] flex flex-wrap mx-auto'>
            <div className='w-full'>
            <div className='text-center flex justify-center items-center flex-col text-3xl text-slate-700 font-bold relative pb-[40px]'>
                <h2>Feature Products</h2>
                <div className='w-[70px] h-[3px] rounded-full bg-[#2563EB] mt-4'></div>
            </div>
            </div>

        <div className='w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6'>
    {
        products.map((p,i) => <div key={i} className='group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden'>
            <div className='relative overflow-hidden'>
            
        {
            p.discount ? <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 z-10 shadow-md'>{p.discount}% </div> : ''
        }

        <div className='w-full h-[240px] overflow-hidden bg-slate-50'>
        <img className='sm:w-full w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' src={p.images[0]} alt="" />  
        </div>

        <ul className='flex transition-all duration-500 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
            <li title="Add to Wishlist" onClick={() => add_wishlist(p)} className='w-[36px] h-[36px] cursor-pointer bg-white shadow-md flex justify-center items-center rounded-full hover:bg-[#2563EB] hover:text-white transition-all duration-300'>
            <FaRegHeart size={14} />
            </li>
            <Link title="Quick View" to={`/product/details/${p.slug}`} className='w-[36px] h-[36px] cursor-pointer bg-white shadow-md flex justify-center items-center rounded-full hover:bg-[#2563EB] hover:text-white transition-all duration-300'>
            <FaEye size={14} />
            </Link> 
            <li title="Add to Cart" onClick={() => add_card(p._id)} className='w-[36px] h-[36px] cursor-pointer bg-white shadow-md flex justify-center items-center rounded-full hover:bg-[#2563EB] hover:text-white transition-all duration-300'>
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

        </div>
        )
    }

        </div>

        </div>
    );
};

export default FeatureProducts;