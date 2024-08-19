import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import '/resources/css/modal.css'; // Adjust the path based on your project structure

const OrderPage = ({ pizzas }) => {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState('');

    const addToCart = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const pizzaId = formData.get('pizza_id');
        const pizzaName = event.target.querySelector(`option[value="${pizzaId}"]`).textContent;
        const quantity = parseInt(formData.get('quantity'));

        const newItem = { pizzaId: pizzaId, pizzaName: pizzaName, quantity: quantity };
        setCart([...cart, newItem]);
    };

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    const placeOrder = () => {
        router.post('/order', { cart, address }, {
            onSuccess: () => {
                router.visit('/order/review');
            },
            onError: (errors) => {
                console.error(errors);
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                {/* Navigation Bar */}
                <Navbar />
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Order Your Pizza</h2>
                <form onSubmit={addToCart}>
                    <div className="mb-4">
                        <label htmlFor="pizza" className="block text-gray-700 font-medium mb-2">Choose your pizza:</label>
                        <select id="pizza_id" name="pizza_id" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500">
                            {pizzas.map(pizza => (
                                <option key={pizza.id} value={pizza.id}>
                                    {pizza.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            defaultValue="1"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Delivery Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-full mr-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Add to Cart
                        </button>
                    </div>
                </form>

                <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Cart</h3>
                    <ul className="mb-4">
                        {cart.map((item, index) => (
                            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2">
                                <span>Pizza: {item.pizzaName}, Quantity: {item.quantity}, Price: {item.price}</span>
                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="ml-4 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={placeOrder}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;