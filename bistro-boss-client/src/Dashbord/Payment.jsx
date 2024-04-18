import React from 'react';
import Checkout from './Checkout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../Hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_PUB_KEY);

const Payment = () => {
    let [cart] = useCart();
    let total3 = cart.reduce((sum, item) => item.price + sum, 0)
    let total = parseFloat(total3.toFixed(2))
    return (
        <div>
            <h1>send mony</h1>
            <h4>{total}</h4>
            <div className='mx-24'>
                <Elements stripe={stripePromise}>
                    <Checkout cart={cart} price={total}></Checkout>
                </Elements>

            </div>

        </div>
    );
};

export default Payment;