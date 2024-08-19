import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'; // Adjust the path as necessary
import AddPizzaForm from '../Components/AddPizzaForm'; // Import the AddPizzaForm component
import '/resources/css/HomePage.css';

const HomePage = ({ pizzas }) => {
        // Ensure handleAddPizza is defined
    const handleAddPizza = (newPizza) => {
        setPizzas(prevPizzas => [...prevPizzas, newPizza]);
    };
    return (
        <div
            className="relative bg-cover bg-center h-screen text-black dark:bg-black dark:text-yellow-50"
            style={{
                backgroundImage: "url('https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Navigation Bar */}
            <Navbar />

            {/* Dark Overlay */}
            <div
                className="absolute inset-0 bg-black opacity-50 h-full"
                style={{
                    pointerEvents: 'none', // Ensures the overlay doesn't block interactions with content
                }}
            ></div>

            {/* Header Section */}
            <header className="relative z-10 text-yellow-50 py-20 text-center h-5/6">
                <div className="container mx-auto my-48">
                    <h1 className="text-4xl font-bold mb-4">Delicious Italian Cuisine</h1>
                    <p className="text-lg mb-8">
                        Enjoy the most delicious pizza made with the finest ingredients
                    </p>
                    <a
                        href="/order"
                        className="bg-yellow-500 text-black py-2 px-4 rounded-full font-semibold hover:bg-yellow-400 transition duration-300"
                    >
                        Order Now
                    </a>
                </div>
            </header>

            {/* Welcome Section */}
            <section>
                <div className="container bg-black mx-auto mt-32 mb-1 grid grid-cols-2 flex justify-between">
                    <div className="bg-black">
                        <img
                            src="https://images.pexels.com/photos/7447295/pexels-photo-7447295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Italian Pizza"
                            className="w-full h-full object-cover mb-4"
                        />
                    </div>
                    <div className="bg-black h-screen flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">Welcome to Pizza Palace</h1>
                            <p className="text-xl">The best pizza in town, crafted with love and the finest ingredients.</p>
                            <p className="text-xl mt-4">Order now and enjoy our delicious offerings!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-yellow-100 dark:bg-black">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-black p-6 rounded-lg shadow-lg text-center">
                            <img
                                src="https://cdn.pixabay.com/photo/2016/07/27/09/30/sage-1544883_960_720.jpg"
                                alt="Healthy Foods"
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-2xl font-semibold mb-2">Healthy Foods</h3>
                            <p>Delicious and healthy pizza with fresh ingredients.</p>
                        </div>

                        <div className="bg-black p-6 rounded-lg shadow-lg text-center">
                            <img
                                src="https://images.pexels.com/photos/4061560/pexels-photo-4061560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Fastest Delivery"
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-2xl font-semibold mb-2">Fastest Delivery</h3>
                            <p>Get your pizza delivered hot and fresh to your door.</p>
                        </div>
                        <div className="bg-black p-6 rounded-lg shadow-lg text-center">
                            <img
                                src="https://images.pexels.com/photos/5908195/pexels-photo-5908195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Original Recipes"
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-2xl font-semibold mb-2">Original Recipes</h3>
                            <p>Authentic Italian recipes passed down through generations.</p>
                        </div>
                    </div>
                </div>
            </section>

               <section className="py-16 bg-yellow-100 dark:bg-black">
                <function onAddPizza={handleAddPizza} /> {/* Add the form here */}
            </section>

            {/* Pizza List Section */}
            <section className="py-16 bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Hot Pizza Meals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pizzas.map((pizza) => (
                            <div key={pizza.id} className="bg-yellow-500 p-6 rounded-lg shadow-lg text-center">
                                <img
                                    src={pizza.image_url || 'https://via.placeholder.com/300'}
                                    alt={pizza.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h4 className="text-xl font-semibold mb-2">{pizza.name}</h4>
                                <p className="text-lg font-bold mb-4">${pizza.price.toFixed(2)}</p>
                                <a
                                    href={`/order?pizzaId=${pizza.id}`}
                                    className="bg-black text-yellow-50 py-2 px-4 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
                                >
                                    Order Now
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-16 bg-yellow-100 dark:bg-black">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Welcome to Pizza Palace</h2>
                    <p className="text-lg">
                        We offer the most delicious pizzas made with the finest ingredients.
                        Our pizzas are made to order and delivered fresh to your door.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
