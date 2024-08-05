import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import '/resources/css/modal.css'; // Adjust the path based on your project structure

const OrderPage = ({ message }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (message) {
            setShowModal(true);
        }
    }, [message]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        router.post('/order', formData);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h2>Order Your Pizza</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="pizza">Choose your pizza:</label>
                    <select id="pizza_id" name="pizza_id">
                        <option value="1">Margherita</option>
                        <option value="2">Pepperoni</option>
                        <option value="3">Veggie</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div>
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
                </div>
                <div>
                    <label htmlFor="address">Delivery Address:</label>
                    <input type="text" id="address" name="delivery_address" />
                </div>
                <button type="submit">Place Order</button>
            </form>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h2>Order Confirmation</h2>
                        <p>{message}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderPage;
