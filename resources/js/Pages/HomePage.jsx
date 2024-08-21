import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer'; // Adjust the path as necessary
import ScrollToTop from '../Components/ScrollToTop';
import AddPizzaForm from '../Components/AddPizzaForm'; // Import the AddPizzaForm component
import '/resources/css/HomePage.css';


const HomePage = ({ pizzas }) => {
    const handleAddPizza = (newPizza) => {
        setPizzas(prevPizzas => [...prevPizzas, newPizza]);
    };

    return (
        <div className="relative bg-cover bg-center h-screen text-black dark:bg-black dark:text-yellow-50"
            style={{
                backgroundImage: "url('https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Navigation Bar */}
            <Navbar />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-70 h-full"></div>

            {/* Header Section */}
            <header className="relative z-10 text-yellow-50 py-20 text-center flex flex-col items-center justify-center h-full">
                <h1 className="text-7xl font-extrabold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Pizza Perfection</h1>
                <p className="text-2xl mb-12 max-w-xl" style={{ fontFamily: "'Open Sans', sans-serif" }}>Indulge in the finest pizzas crafted with love and the freshest ingredients. Your perfect pizza experience awaits.</p>
                <a href="/order"
                    className="bg-yellow-500 text-black py-3 px-6 rounded-full font-semibold hover:bg-yellow-400 transition duration-300">
                    Order Now
                </a>
            </header>

            {/* Welcome Section */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <img src="https://images.pexels.com/photos/7447295/pexels-photo-7447295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Italian Pizza"
                            className="w-full h-80 object-cover rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105" />
                        <div>
                            <h2 className="text-5xl font-bold mb-6 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>Welcome to Pizza Palace</h2>
                            <p className="text-xl mb-4 text-gray-700" style={{ fontFamily: "'Open Sans', sans-serif" }}>Discover the art of pizza making with our traditional Italian recipes, crafted to perfection with every bite.</p>
                            <p className="text-xl text-gray-700" style={{ fontFamily: "'Open Sans', sans-serif" }}>Order now and taste the difference quality makes!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-yellow-100">
                <div className="container mx-auto px-8">
                    <h2 className="text-4xl font-bold text-center mb-16 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                            <img src="https://cdn.pixabay.com/photo/2016/07/27/09/30/sage-1544883_960_720.jpg"
                                alt="Healthy Foods"
                                className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-semibold mb-2 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>Fresh Ingredients</h3>
                            <p className="text-lg text-gray-700" style={{ fontFamily: "'Open Sans', sans-serif" }}>We use only the freshest ingredients for a taste that's truly unforgettable.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                            <img src="https://images.pexels.com/photos/4061560/pexels-photo-4061560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Fastest Delivery"
                                className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-semibold mb-2 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Delivery</h3>
                            <p className="text-lg text-gray-700" style={{ fontFamily: "'Open Sans', sans-serif" }}>Get your pizza hot and fresh, delivered to your door in record time.</p>
                        </div>
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
                            <img src="https://images.pexels.com/photos/5908195/pexels-photo-5908195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Original Recipes"
                                className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-2xl font-semibold mb-2 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>Authentic Recipes</h3>
                            <p className="text-lg text-gray-700" style={{ fontFamily: "'Open Sans', sans-serif" }}>Enjoy pizzas made from recipes passed down through generations.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="menu" className="py-24 bg-black text-white">
    <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Pizza Selection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pizzas.map((pizza) => (
                <div 
                    key={pizza.id} 
                    className="bg-yellow-500 p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300"
                >
                    <img 
                        src={pizza.image_url || 'https://via.placeholder.com/300'}
                        alt={pizza.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h4 className="text-2xl font-semibold mb-2 text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {pizza.name}
                    </h4>
                    <p className="text-lg mb-2 text-black" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        {pizza.description}
                    </p>
                    <p className="text-xl font-bold mb-4 text-black" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        ${pizza.price.toFixed(2)}
                    </p>
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


            <section id="about" className="py-16 bg-yellow-100">
    <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold mb-8 text-black text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            About Pizza Palace
        </h2>
        <div className="flex flex-col items-center md:flex-row md:items-center justify-center text-center md:text-left">
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
                <img 
                    src="https://images.pexels.com/photos/6605226/pexels-photo-6605226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="About Pizza Palace"
                    className="max-w-md object-cover rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
                />
            </div>
            <div className="w-full md:w-1/2 md:pl-4"> {/* Reduced padding-left */}
                <p className="text-lg text-gray-800 leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    Established in 1980, Pizza Palace has been serving the community with the best pizza experience. Our secret lies in the perfect blend of spices and the freshest ingredients, ensuring every slice is a masterpiece. Join us and savor the tradition!
                </p>
            </div>
        </div>
    </div>
</section>




            {/* Footer */}
            <Footer />

            {/* Scroll to Top Button */}
            <ScrollToTop />
        </div>
    );
}

export default HomePage;
