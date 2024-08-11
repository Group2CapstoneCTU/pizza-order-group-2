import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { router } from '@inertiajs/react';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
        } else {
            // Send paymentMethod.id to your server to finalize the payment
            router.post('/process-payment', {
                paymentMethodId: paymentMethod.id,
            }, {
                onSuccess: () => {
                    router.visit('/order/confirmed');
                }
            });
        }
    };
    const confirmOrder = () => {
        router.post('/order/confirm', { cart, address }, {
            onSuccess: () => {
                router.visit('/order/confirmed');
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />  
            <button type="submit" onClick={confirmOrder} disabled={!stripe}>Pay</button>     
            </form>
    );
};

export default CheckoutForm;
