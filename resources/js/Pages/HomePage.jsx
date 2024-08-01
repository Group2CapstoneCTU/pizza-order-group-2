// resources/js/Pages/HomePage.jsx
import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div>
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Delicious Italian Cuisine</h1>
                    <p>Enjoy the most delicious pizza made with the finest ingredients</p>
                    <a href="/menu" className="cta-button">Order Now</a>
                </div>
            </header>

            <section className="services-section">
                <div className="service-item">
                    <h3>Healthy Foods</h3>
                    <p>Delicious and healthy pizza with fresh ingredients.</p>
                </div>
                <div className="service-item">
                    <h3>Fastest Delivery</h3>
                    <p>Get your pizza delivered hot and fresh to your door.</p>
                </div>
                <div className="service-item">
                    <h3>Original Recipes</h3>
                    <p>Authentic Italian recipes passed down through generations.</p>
                </div>
            </section>

            <section className="menu-section">
                <h2>Hot Pizza Meals</h2>
                <div className="menu-grid">
                    <div className="menu-item">
                        <img src="/images/pizza1.jpg" alt="Pizza Name" />
                        <h4>Italian Pizza</h4>
                        <p>$12.99</p>
                        <a href="/order" className="menu-button">Order Now</a>
                    </div>
                    <div className="menu-item">
                        <img src="/images/pizza2.jpg" alt="Pizza Name" />
                        <h4>Greek Pizza</h4>
                        <p>$14.99</p>
                        <a href="/order" className="menu-button">Order Now</a>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <h2>Welcome to Pizza Palace</h2>
                <p>We offer the most delicious pizzas made with the finest ingredients. Our pizzas are made to order and delivered fresh to your door.</p>
            </section>

            <footer className="footer-section">
                <div className="contact-info">
                    <h3>Contact Us</h3>
                    <p>Email: info@pizzapalace.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
                <div className="social-media">
                    <h3>Follow Us</h3>
                    <p>Facebook | Twitter | Instagram</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

