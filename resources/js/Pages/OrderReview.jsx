import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const OrderReview = ({ initialCart, initialAddress }) => {
    const [cart, setCart] = useState(initialCart);
    const [address, setAddress] = useState(initialAddress);
    const [email, setEmail] = useState('');

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
            await router.post('/order/confirm', { cart, address, paymentMethodId, email }, {
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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-yellow-900 text-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
                <ul className="mb-6 space-y-4">
                    {cart.map((item, index) => (
                        <li key={index} className="flex justify-between items-center bg-yellow-800 p-4 rounded-lg shadow-md">
                            <span className="font-semibold">Pizza: {item.pizzaName}</span>
                            <span className="flex items-center">
                                Quantity: 
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                    min="1"
                                    className="ml-2 px-2 py-1 border border-yellow-500 rounded text-black"
                                />
                                <button 
                                    onClick={() => removeFromCart(index)}
                                    className="ml-4 bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded"
                                >
                                    Remove
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold">Subtotal: ${subtotal}</h3>
                    <h3 className="text-lg font-semibold">Tax: ${tax}</h3>
                    <h3 className="text-lg font-semibold">Total: ${total}</h3>
                </div>

                <div className="mb-6">
                    <label htmlFor="address" className="block mb-1">Delivery Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 border border-yellow-500 rounded bg-yellow-100 text-black"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block mb-1">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-yellow-500 rounded bg-yellow-100 text-black"
                    />
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm confirmOrder={confirmOrder} />
                </Elements>
            </div>
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
            confirmOrder(paymentMethod.id);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <CardElement className="p-2 border border-yellow-500 rounded mb-4 bg-yellow-100 text-black" />
            <button 
                type="submit" 
                disabled={!stripe} 
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
            >
                Pay
            </button>
        </form>
    );
};

export default OrderReview;
