import React, { useState } from 'react';

const MenuItems = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const menuData = [
    {
      id: 1,
      name: 'Burger',
      price: 10.99,
      options: [
        { id: 1, name: 'Regular', price: 0 },
        { id: 2, name: 'Cheese', price: 1.0 },
        { id: 3, name: 'Bacon', price: 1.5 }
      ]
    },
    {
      id: 2,
      name: 'Fries',
      price: 4.99,
      options: [
        { id: 1, name: 'Regular', price: 0 },
        { id: 2, name: 'Curly', price: 1.0 },
        { id: 3, name: 'Loaded', price: 2.0 }
      ]
    },
    // Add more menu items as needed
  ];

  const handleAddToCart = (item) => {
    // Add the item to the cart
    console.log('Added to cart:', item);
  };

  const handleOpenModal = (item) => {
    setSelectedOptions({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionSelect = (itemId, optionId) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [itemId]: optionId
    }));
  };

  const calculateTotalPrice = (item) => {
    const selectedOption = item.options.find(
      (option) => option.id === selectedOptions[item.id]
    );
    return item.price + (selectedOption?.price || 0);
  };

  return (
    <div>
      {menuData.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price.toFixed(2)}</p>
          <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          <button onClick={() => handleOpenModal(item)}>Options</button>
          {isModalOpen && (
            <Modal
              item={item}
              selectedOptions={selectedOptions[item.id]}
              onOptionSelect={handleOptionSelect}
              onClose={handleCloseModal}
              totalPrice={calculateTotalPrice(item)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const Modal = ({
  item,
  selectedOptions,
  onOptionSelect,
  onClose,
  totalPrice
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{item.name}</h2>
        <p>Price: ${item.price.toFixed(2)}</p>
        <h3>Options:</h3>
        {item.options.map((option) => (
          <div key={option.id}>
            <input
              type="radio"
              checked={selectedOptions === option.id}
              onChange={() => onOptionSelect(item.id, option.id)}
            />
            {option.name} (+${option.price.toFixed(2)})
          </div>
        ))}
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default MenuItems;