import React from 'react';
import { useForm } from '@inertiajs/react';

const AddPizzaForm = () => {
    const { data, setData, post, errors } = useForm({
        name: '',
        price: '',
        image_url: '',
        description: '',
        managerCode: '' // Ensure this is included
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pizzas.store'));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Pizza Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Pizza Name"
                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Pizza Price</label>
                <input
                    type="text"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    placeholder="Pizza Price"
                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_url">Image URL</label>
                <input
                    type="text"
                    value={data.image_url}
                    onChange={(e) => setData('image_url', e.target.value)}
                    placeholder="Image URL"
                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors.image_url && <div className="text-red-500 text-sm mt-1">{errors.image_url}</div>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Description"
                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
            </div>

            {/* Manager Code */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="managerCode">Manager Code</label>
                <input
                    type="password"
                    value={data.managerCode}
                    onChange={(e) => setData('managerCode', e.target.value)}
                    placeholder="Enter Manager Code"
                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors.managerCode && <div className="text-red-500 text-sm mt-1">{errors.managerCode}</div>}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Add Pizza
            </button>
        </form>
    );
};

export default AddPizzaForm;
