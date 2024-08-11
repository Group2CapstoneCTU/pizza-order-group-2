import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const OrderReview = ({ initialCart, initialAddress }) => {
    const [cart, setCart] = useState(initialCart);
    const [address, setAddress] = useState(initialAddress);

    const updateQuantity = (index, newQuantity) => {
        const updatedCart = cart.map((item, i) => {
            if (i === index) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    const calculateSubtotal = (cart) => {
        return cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
    };

    const calculateTax = (subtotal, taxRate = 0.08) => {
        return (subtotal * taxRate).toFixed(2);
    };

    const calculateTotal = (subtotal, tax, discount = 0) => {
        return (parseFloat(subtotal) + parseFloat(tax) - discount).toFixed(2);
    };

    const subtotal = calculateSubtotal(cart);
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal, tax);

    const confirmOrder = async (paymentMethodId) => {
        try {
            // Process order and payment
            await router.post('/order/confirm', { cart, address, paymentMethodId }, {
                onSuccess: () => {
                    router.visit('/order/confirmed');
                },
                onError: (errors) => {
                    console.error(errors);
                }
            });
        } catch (error) {
            console.error("Error confirming order:", error);
        }
    };

    const stripePromise = loadStripe('pk_test_51Pmf8kRpUe0LHuzU3J3Y0AGwCAuhw3ivc0S7SrdDZxvBKcSOBrVQDVpo9U0agvgW58GBLIAleDRMjBGB5XEfDK3n00XpP80kR9');

    return (
        <div>
            <h2>Review Your Order</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        Pizza: {item.pizzaName}, 
                        Quantity: 
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                            min="1"
                        />
                        <button onClick={() => removeFromCart(index)}>Remove</button>
                    </li>
                ))}
            </ul>

            <h3>Subtotal: ${subtotal}</h3>
            <h3>Tax: ${tax}</h3>
            <h3>Total: ${total}</h3>
            <div>
                <label htmlFor="address">Delivery Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <Elements stripe={stripePromise}>
                <CheckoutForm confirmOrder={confirmOrder} />
            </Elements>
        </div>
    );
};

const CheckoutForm = ({ confirmOrder }) => {
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
            // Directly confirm the order after successful payment method creation
            confirmOrder(paymentMethod.id);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />  
            <button type="submit" disabled={!stripe}>Pay</button>                 
        </form>
    );
};

export default OrderReview;
