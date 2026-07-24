import React, { useState } from 'react';
import { PaymentElement,LinkAuthenticationElement,useStripe,useElements } from '@stripe/react-stripe-js' 

const CheckoutForm = ({orderId}) => {

    localStorage.setItem('orderId',orderId)
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const paymentElementOptions = {
        loyout: 'tabs'
    }

    const submit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/order/confirm'
            } 
        })
        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message)
        } else {
            setMessage('An Unexpected error occured')
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={submit} id='payment-form' className='flex flex-col gap-4'>
            <LinkAuthenticationElement id='link-authentication-element'/>
            <PaymentElement id='payment-element' options={paymentElementOptions} />

            <button disabled={isLoading || !stripe || !elements} id='submit' className='px-10 py-3 rounded-lg transition-colors hover:bg-[#1d4ed8] disabled:opacity-60 disabled:cursor-not-allowed bg-[#2563EB] text-white font-semibold text-sm'>
                <span id='button-text'>
                    {
                        isLoading ? <div>Loading...</div> : "Pay Now"
                    }
                </span> 
            </button>
               {message && <div className='text-sm text-red-500 font-medium'>{message}</div>}
        </form>
    );
};

export default CheckoutForm;
