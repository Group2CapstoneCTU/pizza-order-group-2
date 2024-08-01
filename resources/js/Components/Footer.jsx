import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-yellow-50 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <p>Email: info@pizzapalace.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <p>Facebook | Twitter | Instagram</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul>
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Menu</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Subscribe</h3>
          <p>Sign up for our newsletter:</p>
          <form>
            <input
              type="email"
              placeholder="Your email"
              className="p-2 mb-2 w-full border border-gray-700 bg-gray-800 text-yellow-50"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-black p-2 w-full hover:bg-yellow-400"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
