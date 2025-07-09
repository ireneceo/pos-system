import React from 'react';

const MenuItems = ({ menu }) => {
  return (
    <div className="menu-items">
      {menu.map((item, index) => (
        <div key={index} className="menu-item">
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p className="price">${item.price.toFixed(2)}</p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;