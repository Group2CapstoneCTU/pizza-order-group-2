import React from 'react';

const OrderConfirm = ({ message }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Order Confirmation</h2>
                <p>{message}</p>
                <button onClick={() => window.location.href = '/'}>Close</button>
            </div>
        </div>
    );
};

export default OrderConfirm;
