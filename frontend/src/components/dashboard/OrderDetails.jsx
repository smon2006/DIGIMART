import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { get_order_details } from '../../store/reducers/orderReducer';

const OrderDetails = () => {

    const {orderId} = useParams()
    const dispatch = useDispatch()

    const {userInfo} = useSelector(state => state.auth)
    const {myOrder} = useSelector(state => state.order)

    useEffect(() => {
        dispatch(get_order_details(orderId))
    },[orderId])

    return (
    <div className='bg-white p-5 rounded-2xl border border-slate-200 shadow-sm'>
        <h2 className='text-slate-700 font-semibold pb-4 border-b border-slate-100 mb-4'>Order #{myOrder._id} <span className='pl-2 text-slate-400 font-normal text-sm'>{myOrder.date}</span> </h2>
        <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-6'>
            <div className='flex flex-col gap-1.5 text-sm'>
        <h2 className='text-slate-700 font-semibold'>
        Deliver To : <span className='font-normal text-slate-600'>{myOrder.shippingInfo?.name}</span> </h2>
        <p className='flex flex-wrap items-center gap-2'>
            <span className='bg-blue-50 text-[#F26627] text-xs font-semibold px-2.5 py-1 rounded-full'>Home</span>
            <span className='text-slate-600'>{myOrder.shippingInfo?.address} {myOrder.shippingInfo?.province} {myOrder.shippingInfo?.city}</span>
        </p>
        <p className='text-slate-500'>
            Email : {userInfo.email }
        </p>
            </div>

        <div className='text-slate-600 text-sm flex flex-col gap-2'>
        <h2 className='font-semibold text-slate-700'>Price : <span className='font-normal'>₹{myOrder.price} (Includes Shipping)</span></h2>
        <p> Payment Status : <span className={`py-1 text-xs px-3 font-semibold ${myOrder.payment_status === 'paid' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500' } rounded-full`}> {myOrder.payment_status} </span> </p>

        <p> Order Status : <span className={`py-1 text-xs px-3 font-semibold ${myOrder.delivery_status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600' } rounded-full capitalize`}> {myOrder.delivery_status} </span> </p> 
        </div>   
        </div>

    <div className='mt-6 pt-4 border-t border-slate-100'>
        <h2 className='text-slate-700 text-base font-bold pb-3'>Order Products </h2>
        <div className='flex gap-4 flex-col'>
            {
                myOrder.products?.map((p,i) => <div key={i} className='flex flex-wrap gap-4 justify-between items-center text-slate-600 bg-slate-50 rounded-xl p-3'>
                <div className='flex gap-3'>
       <img className='w-[64px] h-[64px] rounded-lg object-cover border border-slate-100' src={p.images[0]} alt="" />
       <div className='flex text-sm flex-col justify-center gap-0.5'>
                <Link className='font-semibold text-slate-700'> {p.name} </Link>
                <p className='text-slate-500'>Brand : {p.brand}</p>
                <p className='text-slate-500'>Quantity : {p.quantity}</p>
       </div>
            </div>
        
        <div className='flex flex-col items-end'>
                <h2 className='text-base font-bold text-slate-800'>₹{p.price - Math.floor((p.price * p.discount) / 100)}</h2>
                <p className='line-through text-xs text-slate-400'>₹{p.price}</p>
                <p className='text-xs text-red-500 font-semibold'>-{p.discount}%</p>
        </div>

                </div>
                
                )
            }
        </div>

    </div>

    </div>
    );
};

export default OrderDetails;
