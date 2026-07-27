import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { get_card_products,delete_card_product,messageClear,quantity_inc,quantity_dec } from '../store/reducers/cardReducer';
import toast from 'react-hot-toast';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa6';

const Card = () => {

    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth) 
    const {card_products,successMessage,errorMessage,price,buy_product_item,shipping_fee,outofstock_products} = useSelector(state => state.card) 

    const navigate = useNavigate()  

    useEffect(() => {
        dispatch(get_card_products(userInfo.id))
    },[])

    const redirect = () => {
        navigate('/shipping',{
            state: {
                products : card_products,
                price: price,
                shipping_fee : shipping_fee,
                items: buy_product_item
            }
        })
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
            dispatch(get_card_products(userInfo.id))
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        } 
        
    },[successMessage,errorMessage])

    const inc = (quantity, stock, card_id) => {
        const temp = quantity + 1;
        if (temp <= stock) {
            dispatch(quantity_inc(card_id))
        }
    }

    const dec = (quantity, card_id) => {
        const temp = quantity - 1;
        if (temp !== 0) {
            dispatch(quantity_dec(card_id))
        }
    }

    return (
        <div>
           <Header/>
           <PageHeader title='Shopping Cart' crumbs={[{ label: 'Cart' }]} />

    <section className=''>
    <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>

        {
            card_products.length > 0 || outofstock_products.length > 0 ? <div className='flex flex-wrap gap-y-6'>
                <div className='w-[67%] md-lg:w-full'>
                    <div className='pr-3 md-lg:pr-0'>
                        <div className='flex flex-col gap-4'>
                            <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-4'>
                    <h2 className='text-sm text-green-600 font-bold'>In Stock Products ({card_products.length})</h2>
                            </div>

                {
                   card_products.map((p,i) => <div key={i} className='flex bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex-col gap-3'>
                   <div className='flex justify-start items-center pb-2 border-b border-slate-100'>
                 <h2 className='text-sm text-slate-700 font-bold'>{p.shopName}</h2>
                   </div>

                   {
                       p.products.map((pt,i) => <div key={i} className='w-full flex flex-wrap items-center gap-3 py-2'>
                       <div className='flex sm:w-full gap-3 w-7/12'>
                           <div className='flex gap-3 justify-start items-center'>
                       <img className='w-[80px] h-[80px] rounded-lg object-cover border border-slate-100' src={pt.productInfo.images[0]} alt="" />
                       <div className='pr-4 text-slate-600'>
                       <h2 className='text-sm font-semibold text-slate-700'>{pt.productInfo.name} </h2>
                       <span className='text-xs text-slate-500'>Brand: {pt.productInfo.brand}</span>
                       </div>
                           </div>
                       </div>

   <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
       <div className='pl-4 sm:pl-0'>
           <h2 className='text-base font-bold text-slate-800'>₹{pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100)}</h2>
           <p className='line-through text-xs text-slate-400'>₹{pt.productInfo.price}</p>
           <p className='text-xs text-red-500 font-semibold'>-{pt.productInfo.discount}%</p>
       </div>
       <div className='flex gap-2 flex-col items-end'>
           <div className='flex bg-slate-100 rounded-lg h-[34px] justify-center items-center text-sm overflow-hidden'>
               <div title="Decrease quantity" onClick={() => dec(pt.quantity, pt._id )} className='px-3 h-full flex items-center cursor-pointer hover:bg-slate-200 transition-colors text-slate-600'><FaMinus size={10}/></div> 
               <div className='px-3 font-semibold text-slate-700'>{pt.quantity }</div> 
               <div title="Increase quantity" onClick={() => inc(pt.quantity,pt.productInfo.stock, pt._id )} className='px-3 h-full flex items-center cursor-pointer hover:bg-slate-200 transition-colors text-slate-600'><FaPlus size={10}/></div> 
           </div>
           <button title="Delete" onClick={() => dispatch(delete_card_product(pt._id)) } className='flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold rounded-lg transition-colors'><FaTrash size={10}/> Delete</button>
       </div>
   </div>

                   </div>)
                   }

               </div>) 
                } 

                {
                    outofstock_products.length > 0 && <div className='flex flex-col gap-4'>
                         <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-4'>
                    <h2 className='text-sm text-red-500 font-bold'>Out of Stock ({outofstock_products.length})</h2>
                            </div>

                  <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col gap-3 divide-y divide-slate-100'>
                  {
                       outofstock_products.map((p,i) => <div key={i} className='w-full flex flex-wrap items-center gap-3 pt-3 first:pt-0'>
                       <div className='flex sm:w-full gap-3 w-7/12'>
                           <div className='flex gap-3 justify-start items-center'>
                       <img className='w-[80px] h-[80px] rounded-lg object-cover border border-slate-100 opacity-60' src={ p.products[0].images[0] } alt="" />
                       <div className='pr-4 text-slate-600'>
                       <h2 className='text-sm font-semibold text-slate-700'>{p.products[0].name} </h2>
                       <span className='text-xs text-slate-500'>Brand: {p.products[0].brand}</span>
                       </div>
                           </div>
                       </div>

   <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
       <div className='pl-4 sm:pl-0'>
           <h2 className='text-base font-bold text-slate-800'>₹{p.products[0].price - Math.floor((p.products[0].price * p.products[0].discount) / 100 )}</h2>
           <p className='line-through text-xs text-slate-400'>₹{p.products[0].price}</p>
           <p className='text-xs text-red-500 font-semibold'>-{p.products[0].discount}%</p>
       </div>
       <div className='flex gap-2 flex-col items-end'>
           <div className='flex bg-slate-100 rounded-lg h-[34px] justify-center items-center text-sm overflow-hidden opacity-50'>
               <div title="Decrease quantity" onClick={() => dec(p.quantity, p._id )}  className='px-3 h-full flex items-center cursor-pointer'><FaMinus size={10}/></div> 
               <div className='px-3 font-semibold text-slate-700'>{p.quantity}</div> 
               <div title="Increase quantity" className='px-3 h-full flex items-center cursor-pointer'><FaPlus size={10}/></div> 
           </div>
           <button title="Delete" onClick={() => dispatch(delete_card_product(p._id)) }  className='flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold rounded-lg transition-colors'><FaTrash size={10}/> Delete</button>
       </div>
   </div>

                   </div>)
                   }
                  </div>           

                    </div>
                }            
 
                        </div> 
                    </div>
                </div>

<div className='w-[33%] md-lg:w-full'>
    <div className='pl-3 md-lg:pl-0'>
        {
            card_products.length > 0 && <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-slate-600 flex flex-col gap-4 sticky top-24'>
                <h2 className='text-lg font-bold text-slate-800 pb-3 border-b border-slate-100'>Order Summary</h2>
                <div className='flex justify-between items-center text-sm'>
                    <span>{buy_product_item} Items </span>
                    <span className='font-medium text-slate-700'>₹{price} </span>
                </div>
                <div className='flex justify-between items-center text-sm'>
                    <span>Shipping Fee </span>
                    <span className='font-medium text-slate-700'>₹{shipping_fee} </span>
                </div>
                <div className='flex gap-2'>
                <input className='w-full px-3 py-2.5 border border-slate-300 outline-0 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 rounded-lg text-sm transition-all' type="text" placeholder='Coupon Code' />
                <button className='px-5 bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors text-white rounded-lg uppercase text-xs font-semibold'>Apply</button>
                </div>

                <div className='flex justify-between items-center pt-3 border-t border-slate-100'>
                    <span className='font-semibold text-slate-700'>Total</span>
                    <span className='text-xl font-bold text-[#2563EB]'>₹{price + shipping_fee} </span>
                </div>
                <button onClick={redirect} className='px-5 py-3 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors text-sm font-semibold text-white uppercase'>
                    Proceed to Checkout ({buy_product_item})
                </button>

            </div>
        }

    </div>

</div>

            </div> 
            
            : <div className='py-10 text-center'>
                <p className='text-slate-500 mb-4'>Your cart is empty.</p>
                <Link className='px-6 py-3 inline-block bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors text-white rounded-lg font-semibold text-sm' to='/shops' > Shop Now</Link>
            </div>
        }

    </div>

    </section>

           <Footer/>
        </div>
    );
};

export default Card;