import React, { useState } from 'react';

const MenuItems = ({ menu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionClick = (option) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(option)) {
        return prevOptions.filter((opt) => opt !== option);
      } else {
        return [...prevOptions, option];
      }
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOptions([]);
  };

  const handleEscClose = (e) => {
    if (e.key === 'Escape') {
      handleModalClose();
    }
  };

  return (
    <div className="menu-item">
      <img src={menu.image} alt={menu.name} />
      <h3>{menu.name}</h3>
      <p>{menu.description}</p>
      <p className="price">{menu.price}</p>
      <button className="options-btn" onClick={handleModalOpen}>
        Options
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onKeyDown={handleEscClose}>
          <div className="modal">
            <h3>Select Options</h3>
            {menu.options.map((option) => (
              <div key={option.id} className="option-item">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.name)}
                  onChange={() => handleOptionClick(option.name)}
                />
                <label>{option.name}</label>
              </div>
            ))}
            <div className="modal-actions">
              <button className="btn-close" onClick={handleModalClose}>
                Close
              </button>
              <button className="btn-save">Add to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItems;