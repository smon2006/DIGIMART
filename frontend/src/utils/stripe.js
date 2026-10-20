import { loadStripe } from '@stripe/stripe-js'

const publishableKey =
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
    'pk_test_51Oml5cGAwoXiNtjJgPPyQngDj9WTjawya4zCsqTn3LPFhl4VvLZZJIh9fW9wqVweFYC5f0YEb9zjUqRpXbkEKT7T00eU1xQvjp'

export const stripePromise = loadStripe(publishableKey)