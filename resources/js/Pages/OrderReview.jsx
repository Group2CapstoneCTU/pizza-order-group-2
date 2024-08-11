import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../Components/CheckoutForm';

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

    const stripePromise = loadStripe('your-publishable-key-here');

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
            <CheckoutForm />
            </Elements>
            <button onClick={confirmOrder}>Pay & Confirm</button>
        </div>
    );
};

export default OrderReview;
