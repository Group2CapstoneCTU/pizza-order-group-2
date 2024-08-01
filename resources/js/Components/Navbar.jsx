import React from 'react';

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full bg-black text-yellow-50 py-4 px-6 z-20">
      <div className="container mx-auto flex items-center justify-between">
        <a href="#" className="text-2xl font-bold">Pizza Palace</a>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Menu</a></li>
          <li><a href="#" className="hover:underline">About Us</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
