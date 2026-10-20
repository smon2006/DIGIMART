import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js'
import api from '../api/api';
import CheckoutForm from './CheckoutForm';
import { stripePromise } from '../utils/stripe';

const Stripe = ({ price, orderId }) => {
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const options = {
        appearance: { theme: 'stripe' },
        clientSecret
    }

    const create_payment = async () => {
        setError('')
        setLoading(true)
        try {
            const { data } = await api.post('/order/create-payment', { price })
            if (!data?.clientSecret) {
                setError('Could not start the payment. Please try again.')
                return
            }
            setClientSecret(data.clientSecret)
        } catch (err) {
            console.log(err.response?.data || err.message)
            setError(
                err.response?.data?.message ||
                (err.response
                    ? 'Could not start the payment. Please try again.'
                    : 'Cannot reach the server. Please check your connection and try again.')
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-4'>
            {
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                ) : (
                    <>
                        <button
                            onClick={create_payment}
                            disabled={loading}
                            className='px-10 py-2.5 rounded-lg hover:shadow-[#F5B301]/30 hover:shadow-lg bg-[#F5B301] hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-slate-900 font-semibold text-sm'
                        >
                            {loading ? 'Starting...' : 'Start Payment'}
                        </button>
                        {error && <div className='mt-3 text-sm text-red-500 font-medium'>{error}</div>}
                    </>
                )
            }
        </div>
    );
};

export default Stripe;