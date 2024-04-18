import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { ContextAuth } from '../Authentication/Authprovider';

const Checkout = ({ cart, price }) => {
  let stripe = useStripe();
  const elements = useElements();
  let [Err, setErr] = useState('')
  let [axiosSecure] = useAxiosSecure()
  let [clientSecret, setclientSecret] = useState('')
  let [process, setprocess] = useState(false)
  let [tid, setTid] = useState('')
  let { user } = useContext(ContextAuth)
  useEffect(() => {
    if (price > 0) {
      axiosSecure.post('/create-payment-intent', { price })
        .then(res => {
          console.log(res.data.clientSecret);
          setclientSecret(res.data.clientSecret)
        })
    }

  }, [price])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {

      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }


    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setErr(error.message)
    } else {
      setErr()
      console.log('[PaymentMethod]', paymentMethod);
    }
    setprocess(true)

    const { paymentIntent, error: eror } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'unknown',
            name: user?.displayName || 'anonymous',
          },
        },
      },
    );
    if (eror) {
      console.log(eror);
    }
    setprocess(false)

    if (paymentIntent.status === 'succeeded') {
      setTid(paymentIntent.id)

      let pay = {
        email: user.email,
        price,
        Tid: paymentIntent.id,
        date: new Date(),
        quantity: cart.length,
        itemName: cart.map(it => it.name),
        cartitemid: cart.map(it => it._id),
        menuitemid: cart.map(it => it.menuid),

      }

      axiosSecure.post('/pay', pay)
        .then(res => {
          console.log(res.data);
        })
    }

  }





  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: 'white',
                '::placeholder': {
                  color: 'white',
                },
              },
              invalid: {
                color: 'red',
              },
            },
          }}
        />
        <button className='btn btn-success mt-7 w-full' type="submit" disabled={!stripe || !clientSecret || process}>
          Pay
        </button>
      </form>
      {Err && <p>{Err}</p>}
      {tid && <p>{tid}</p>}

    </>
  );
};

export default Checkout;