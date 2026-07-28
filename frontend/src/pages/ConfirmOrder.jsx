import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import error from '../assets/error.png'
import success from '../assets/success.png'
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';

const load = async () => {
    return await loadStripe('pk_test_51Oml5cGAwoXiNtjJgPPyQngDj9WTjawya4zCsqTn3LPFhl4VvLZZJIh9fW9wqVweFYC5f0YEb9zjUqRpXbkEKT7T00eU1xQvjp')
}

const ConfirmOrder = () => {

    const [loader, setLoader] = useState(true)
    const [stripe, setStripe] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (!stripe) {
            return
        }
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
        if (!clientSecret) {
            return
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch(paymentIntent.status){
                case "succeeded":
                    setMessage('succeeded')
                    break
                    case "processing":
                    setMessage('processing')
                    break
                    case "requires_payment_method":
                    setMessage('failed')
                    break
                    default:
                    setMessage('failed')

            }
        })
    },[stripe])

    const get_load = async () => {
        const tempStripe = await load()
        setStripe(tempStripe)
    }
    
    useEffect(() => {
        get_load()
    },[])

    const update_payment = async () => {
        const orderId = localStorage.getItem('orderId')
        if (orderId) {
            try {
                await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`)
                localStorage.removeItem('orderId')
                setLoader(false)
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }

    useEffect(() => {
        if (message === 'succeeded') {
            update_payment()
        }
    },[message])

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-5 bg-[#325D79] px-4'>
            {
                (message === 'failed' || message === 'processing') ? <>
                <div className='bg-white rounded-2xl border border-slate-200 shadow-lg p-10 flex flex-col items-center gap-4 max-w-[420px] w-full'>
                <img className='w-[110px]' src={error} alt="" />
                <h2 className='text-slate-700 font-semibold text-lg text-center'>{message === 'processing' ? 'Your payment is processing' : 'Payment failed'}</h2>
                <Link className='px-6 py-3 bg-[#F26627] hover:bg-[#C24A16] transition-colors rounded-lg text-white font-semibold text-sm' to="/dashboard/my-orders">Back to Dashboard </Link>
                </div>
                </> : message === 'succeeded' ? loader ? <FadeLoader color='#F26627' /> : <>
                <div className='bg-white rounded-2xl border border-slate-200 shadow-lg p-10 flex flex-col items-center gap-4 max-w-[420px] w-full'>
                <img className='w-[110px]' src={success} alt="" />
                <h2 className='text-slate-700 font-semibold text-lg text-center'>Your order was placed successfully</h2>
                <Link className='px-6 py-3 bg-[#F26627] hover:bg-[#C24A16] transition-colors rounded-lg text-white font-semibold text-sm' to="/dashboard/my-orders">Back to Dashboard </Link>
                </div>
                </> : <FadeLoader color='#F26627' /> 
            }
            
        </div>
    );
};

export default ConfirmOrder;
