// resources/js/Pages/Admin/AddMenuItem.jsx
import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

const AddMenuItem = () => {
    const { post, errors } = useForm({
        name: '',
        price: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.menu.store'));
    };

    return (
        <div>
            <h2>Add New Menu Item</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Pizza Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <div>{errors.name}</div>}

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    step="0.01"
                />
                {errors.price && <div>{errors.price}</div>}

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                ></textarea>

                <button type="submit">Add Menu Item</button>
            </form>
        </div>
    );
};

export default AddMenuItem;
