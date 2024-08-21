import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import Navbar from '../Components/Navbar';

const AddPizzaForm = () => {
    const { data, setData, post, errors } = useForm({
        name: '',
        price: '',
        image_url: '',
        description: '',
        managerCode: ''
    });

    const [pizzas, setPizzas] = useState([]);

    // Fetch pizzas on component mount
    useEffect(() => {
        fetchPizzas();
    }, []);

    const fetchPizzas = async () => {
        try {
            const response = await fetch(route('pizzas.index'), {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const pizzaData = await response.json();
            setPizzas(pizzaData);
        } catch (error) {
            console.error('Error fetching pizzas:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pizzas.store'), {
            onSuccess: () => fetchPizzas()  // Refresh the pizza list after adding
        });
    };

    const { delete: destroy } = useForm();

    const handleDelete = (pizzaId) => {
        if (window.confirm('Are you sure you want to delete this pizza?')) {
            const managerCode = prompt('Enter manager code:');
            if (managerCode) {
                destroy(route('pizzas.destroy', pizzaId), {
                    data: { managerCode },
                    onSuccess: () => {
                        fetchPizzas(); // Refresh the pizza list after deletion
                    },
                    onError: (errors) => {
                        if (errors.managerCode) {
                            alert('Incorrect manager code. Deletion failed.');
                        } else {
                            console.log('Failed to delete pizza:', errors);
                        }
                    },
                });
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <Navbar />

            <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-6 mt-8">
                {/* Add Pizza Form */}
                <form onSubmit={handleSubmit} className="mb-6">
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
            </div>

            {/* Pizza List */}
            <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-6 mt-8">
                <h2 className="text-2xl font-bold mb-4">Pizza List</h2>
                {pizzas.length > 0 ? (
                    <ul>
                        {pizzas.map(pizza => (
                            <li key={pizza.id} className="mb-4 p-4 border rounded-md">
                                <h3 className="text-xl font-semibold">{pizza.name}</h3>
                                <p>{pizza.description}</p>
                                <p>Price: ${pizza.price}</p>
                                <img src={pizza.image_url} alt={pizza.name} className="w-32 h-32 object-cover mt-2" />
                                <button
                                    onClick={() => handleDelete(pizza.id)}
                                    className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                >
                                    Delete Pizza
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No pizzas available.</p>
                )}
            </div>
        </div>
    );
};

export default AddPizzaForm;
