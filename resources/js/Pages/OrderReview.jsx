import React, { useState } from 'react';
import { router } from '@inertiajs/react';

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
        <div>
            <h2>Review Your Order</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        Pizza ID: {item.pizza}, 
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
            <button onClick={confirmOrder}>Confirm Order</button>
        </div>
    );
};

export default OrderReview;
