import React, { useEffect, useState } from 'react';
import error from '../assets/error.png'
import success from '../assets/success.png'
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import api from '../api/api';
import { stripePromise } from '../utils/stripe';

const ConfirmOrder = () => {

    const [loader, setLoader] = useState(true)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
        if (!clientSecret) {
            setMessage('failed')
            return
        }
        stripePromise.then(stripe => {
            if (!stripe) {
                setMessage('failed')
                return
            }
            return stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
                if (!paymentIntent) {
                    setMessage('failed')
                    return
                }
                switch (paymentIntent.status) {
                    case 'succeeded':
                        setMessage('succeeded')
                        break
                    case 'processing':
                        setMessage('processing')
                        break
                    default:
                        setMessage('failed')
                }
            })
        }).catch(() => setMessage('failed'))
    }, [])

    const update_payment = async () => {
        const orderId = localStorage.getItem('orderId')
        if (!orderId) {
            setLoader(false)
            return
        }
        try {
            await api.get(`/order/confirm/${orderId}`)
            localStorage.removeItem('orderId')
        } catch (err) {
            console.log(err.response?.data || err.message)
            setMessage('update_failed')
        }
        setLoader(false)
    }

    useEffect(() => {
        if (message === 'succeeded') {
            update_payment()
        }
    }, [message])

    const card = (img, title, text) => (
        <div className='bg-white rounded-2xl border border-slate-200 shadow-lg p-10 flex flex-col items-center gap-4 max-w-[420px] w-full'>
            <img className='w-[110px]' src={img} alt="" />
            <h2 className='text-slate-700 font-semibold text-lg text-center'>{title}</h2>
            {text && <p className='text-slate-500 text-sm text-center'>{text}</p>}
            <Link className='px-6 py-3 bg-[#F5B301] hover:brightness-95 transition-colors rounded-lg text-slate-900 font-semibold text-sm' to="/dashboard/my-orders">Back to Dashboard </Link>
        </div>
    )

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col gap-5 bg-[#8A8A8A] px-4'>
            {
                message === null ? <FadeLoader color='#F5B301' />
                : message === 'processing' ? card(error, 'Your payment is processing')
                : message === 'failed' ? card(error, 'Payment failed')
                : message === 'update_failed' ? card(error, 'Payment received', "We couldn't update your order automatically. Please check My Orders or contact support.")
                : loader ? <FadeLoader color='#F5B301' />
                : card(success, 'Your order was placed successfully')
            }
        </div>
    );
};

export default ConfirmOrder;