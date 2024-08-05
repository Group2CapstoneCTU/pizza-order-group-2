import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import '/resources/css/modal.css'; // Adjust the path based on your project structure

const OrderPage = () => {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState('');

    const addToCart = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const pizzaId = formData.get('pizza_id');
        const quantity = parseInt(formData.get('quantity'));

        const newItem = { pizza: pizzaId, quantity: quantity };
        setCart([...cart, newItem]);
    };

    const placeOrder = () => {
        router.post('/order', { cart, address }, {
            onSuccess: () => {
                Inertia.visit('/order/review');
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    return (
        <div>
            <h2>Order Your Pizza</h2>
            <form onSubmit={addToCart}>
                <div>
                    <label htmlFor="pizza">Choose your pizza:</label>
                    <select id="pizza_id" name="pizza_id">
                        <option value="1">Margherita</option>
                        <option value="2">Pepperoni</option>
                        <option value="3">BBQ Chicken</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
                </div>
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
                <button type="submit">Add to Cart</button>
            </form>

            <div>
                <h3>Cart</h3>
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            Pizza ID: {item.pizza}, Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>
                <button onClick={placeOrder}>Place Order</button>
            </div>
        </div>
    );
};

export default OrderPage;