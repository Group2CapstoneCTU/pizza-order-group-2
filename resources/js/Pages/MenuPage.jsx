   // resources/js/Pages/MenuPage.jsx
   import React, { useState, useEffect } from 'react';
   import axios from 'axios';

   const MenuPage = () => {
       const [pizzas, setPizzas] = useState([]);

       useEffect(() => {
           axios.get('/api/pizzas').then(response => {
               setPizzas(response.data);
           });
       }, []);

       return (
           <div className="menu-section">
               <h2>Our Menu</h2>
               <div className="menu-grid">
                   {pizzas.map(pizza => (
                       <div key={pizza.id} className="menu-item">
                           <img src={pizza.image_path} alt={pizza.name} />
                           <h4>{pizza.name}</h4>
                           <p>${pizza.price}</p>
                           <a href={`/order/${pizza.id}`} className="menu-button">Order Now</a>
                       </div>
                   ))}
               </div>
           </div>
       );
   };

   export default MenuPage;
