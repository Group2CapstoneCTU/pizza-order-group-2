// resources/js/Pages/HomePage.jsx
import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'; // Adjust the path as necessary



const HomePage = () => {
    return (
        <div 
          className="relative bg-cover bg-center h-screen text-black dark:bg-black dark:text-yellow-50"
          style={{
            backgroundImage: "url('https://cdn.pixabay.com/photo/2024/04/18/10/41/ai-generated-8704064_1280.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
            {/* Navigation Bar */}
            <Navbar />


          {/* Dark Overlay */}
          <div 
            className="absolute inset-0 bg-black opacity-50 h-5/6"
            style={{
              pointerEvents: 'none', // Ensures the overlay doesn't block interactions with content
            }}
          ></div>
          
            

            {/* Content */}
            <header className="relative z-10 text-yellow-50 py-20 text-center h-5/6">
                <div className="container mx-auto my-36">
                    <h1 className="text-4xl font-bold mb-4">Delicious Italian Cuisine</h1>
                    <p className="text-lg mb-8">
                        Enjoy the most delicious pizza made with the finest ingredients
                    </p>
                    <a
                        href="/menu"
                        className="bg-yellow-500 text-black py-2 px-4 rounded-full font-semibold hover:bg-yellow-400 transition duration-300"
                    >
                        Order Now
                    </a>
                </div>
            </header>

            <section className="py-16 bg-yellow-100 dark:bg-black">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-yellow-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-2xl font-semibold mb-2">Healthy Foods</h3>
                            <p>Delicious and healthy pizza with fresh ingredients.</p>
                        </div>
                        <div className="bg-yellow-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-2xl font-semibold mb-2">Fastest Delivery</h3>
                            <p>Get your pizza delivered hot and fresh to your door.</p>
                        </div>
                        <div className="bg-yellow-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <h3 className="text-2xl font-semibold mb-2">Original Recipes</h3>
                            <p>Authentic Italian recipes passed down through generations.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-yellow-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Hot Pizza Meals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-yellow-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <img
                                src="https://cdn.pixabay.com/photo/2024/03/15/16/25/pizza-8635314_960_720.jpg"
                                alt="Italian Pizza"
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h4 className="text-xl font-semibold mb-2">Italian Pizza</h4>
                            <p className="text-lg font-bold mb-4">$12.99</p>
                            <a
                                href="/order"
                                className="bg-black text-yellow-50 py-2 px-4 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
                            >
                                Order Now
                            </a>
                        </div>
                        <div className="bg-yellow-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <img
                                src="https://cdn.pixabay.com/photo/2017/09/30/15/10/plate-2802332_1280.jpg"
                                alt="Greek Pizza"
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h4 className="text-xl font-semibold mb-2">Greek Pizza</h4>
                            <p className="text-lg font-bold mb-4">$14.99</p>
                            <a
                                href="/order"
                                className="bg-black text-yellow-50 py-2 px-4 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
                            >
                                Order Now
                            </a>
                        </div>
                        <div className="bg-yellow-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                            <img
                                src="https://cdn.pixabay.com/photo/2024/04/18/10/41/ai-generated-8704060_1280.jpg"
                                alt="Greek Pizza"
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h4 className="text-xl font-semibold mb-2">New York Pizza</h4>
                            <p className="text-lg font-bold mb-4">$14.99</p>
                            <a
                                href="/order"
                                className="bg-black text-yellow-50 py-2 px-4 rounded-full font-semibold hover:bg-gray-800 transition duration-300"
                            >
                                Order Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>

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
