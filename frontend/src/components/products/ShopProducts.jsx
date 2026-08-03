import React, { useEffect } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_card, add_to_wishlist, messageClear } from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';

const ShopProducts = ({styles,products}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { errorMessage, successMessage } = useSelector(state => state.card)

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage])

    const add_card = (id) => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity: 1,
                productId: id
            }))
        } else {
            navigate('/login')
        }
    }

    const add_wishlist = (pro) => {
        if (userInfo) {
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
        } else {
            navigate('/login')
        }
    }

    return (
        <div className={`w-full grid ${styles === 'grid' ? 'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2' : 'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2'} gap-5 `}>
            {
                products.map((p, i)=> <Link to={`/product/details/${p.slug}`} key={p._id || i} className={`group flex transition-all duration-300 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 ${styles === 'grid' ? 'flex-col justify-start items-start' : 'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'} w-full gap-4 overflow-hidden`}>

        <div className={styles === 'grid' ? 'w-full relative overflow-hidden h-[210px] md:h-[270px] xs:h-[170px] bg-slate-50' : 'md-lg:w-full relative overflow-hidden h-[210px] md:h-[270px] w-[240px] shrink-0 bg-slate-50'}>
            <img className='h-full rounded-none w-full object-cover group-hover:scale-110 transition-transform duration-500' src={ p.images[0] } alt="" />

          <ul className='flex transition-all duration-500 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
            <li title="Add to Wishlist" onClick={(e) => { e.preventDefault(); e.stopPropagation(); add_wishlist(p) }} className='w-[36px] h-[36px] cursor-pointer bg-white shadow-md flex justify-center items-center rounded-full hover:bg-[#F26627] hover:text-white transition-all duration-300'>
            <FaRegHeart size={14} />
            </li>
            <li title="Add to Cart" onClick={(e) => { e.preventDefault(); e.stopPropagation(); add_card(p._id) }} className='w-[36px] h-[36px] cursor-pointer bg-white shadow-md flex justify-center items-center rounded-full hover:bg-[#F26627] hover:text-white transition-all duration-300'>
            <RiShoppingCartLine size={15} />
            </li>
        </ul>    
     </div>

     <div className='flex justify-start items-start flex-col gap-1 px-3 pb-3 w-full'>
            <h2 className='font-semibold text-slate-700 truncate w-full'>{ p.name }</h2>
            <div className='flex justify-start items-center gap-3'>
                {
                    p.discount > 0 ? (
                        <span className='text-base font-bold text-slate-800'>
                            ₹{p.price - Math.floor((p.price * p.discount) / 100)}{' '}
                            <span className='text-base font-medium text-slate-400 line-through'>₹{p.price}</span>{' '}
                            <span className='text-base font-semibold text-red-500'>({p.discount}% off)</span>
                        </span>
                    ) : (
                        <span className='text-base font-bold text-slate-800'>₹{ p.price }</span>
                    )
                }
                <div className='flex'>
                    <Rating ratings={p.rating} />
                </div>

            </div>
        </div>    

                </Link>
                
                )
            }
             
        </div>
    );
};

export default ShopProducts;