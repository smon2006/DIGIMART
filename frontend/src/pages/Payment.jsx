import React, { useState } from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
import { useLocation } from 'react-router-dom';
import Stripe from '../components/Stripe';
import PageHeader from '../components/PageHeader';

const Payment = () => {

    const { state: {price,items,orderId}} = useLocation()
    const [paymentMethod, setPaymentMethod] = useState('stripe')

    return (
        <div>
           <Header/>
           <PageHeader title='Payment' crumbs={[{ label: 'Payment' }]} />
    <section className=''>
        <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
            <div className='flex flex-wrap md:flex-col-reverse gap-y-6'>
                <div className='w-7/12 md:w-full'>
                    <div className='pr-2 md:pr-0'>
                        <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
                        <div className='flex flex-wrap'>
        <div onClick={() => setPaymentMethod('stripe')} className={`w-[160px] border-r border-slate-100 cursor-pointer py-6 px-8 transition-colors ${paymentMethod === 'stripe' ? 'bg-blue-50 border-b-2 border-b-[#2563EB]':'bg-white hover:bg-slate-50'} `} >
            <div className='flex flex-col gap-[3px] justify-center items-center'>
            <img className='h-6 object-contain' src="/images/payment/stripe.png" alt="" />
            </div>
            <span className='text-slate-600 text-sm font-medium block text-center mt-2'>Stripe</span> 
        </div>  

        <div onClick={() => setPaymentMethod('cod')} className={`w-[160px] border-r border-slate-100 cursor-pointer py-6 px-8 transition-colors ${paymentMethod === 'cod' ? 'bg-blue-50 border-b-2 border-b-[#2563EB]':'bg-white hover:bg-slate-50'} `} >
            <div className='flex flex-col gap-[3px] justify-center items-center'>
            <img className='h-6 object-contain' src="/images/payment/cod.jpg" alt="" />
            </div>
            <span className='text-slate-600 text-sm font-medium block text-center mt-2'>COD</span> 
        </div> 
        </div> 
          
           {
            paymentMethod === 'stripe' && <div className='p-5'>
                <Stripe orderId={orderId} price={price} /> 
            </div>
           }
        {
            paymentMethod === 'cod' && <div className='w-full px-5 py-8'>
                <button className='px-10 py-3 rounded-lg transition-colors hover:bg-[#1d4ed8] bg-[#2563EB] text-white font-semibold text-sm'>Pay Now</button>
            </div>
        }
            
                </div> 
                </div> 
            </div> 

        <div className='w-5/12 md:w-full'>
            <div className='pl-2 md:pl-0 md:mb-0'>
                <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-slate-600 flex flex-col gap-3'>
        <h2 className='font-bold text-lg text-slate-800 pb-3 border-b border-slate-100'>Order Summary </h2>
        <div className='flex justify-between items-center text-sm'>
            <span>{items} Items and Shipping Fee Included </span>
            <span className='font-medium text-slate-700'>₹{price} </span>
        </div>
        <div className='flex justify-between items-center font-semibold pt-3 border-t border-slate-100'>
            <span className='text-slate-700'>Total Amount </span>
            <span className='text-xl font-bold text-[#2563EB]'>₹{price}</span>
        </div>

                </div>
            </div>
        </div>

        </div> 
        </div>

    </section>

           <Footer/>
        </div>
    );
};

export default Payment;