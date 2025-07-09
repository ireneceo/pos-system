import React, { useState } from 'react';
import MenuCategories from './Menu/MenuCategories';
import MenuItems from './Menu/MenuItems';
import CustomerSearch from './Customer/CustomerSearch';
import './POSTerminal.css';

const POSTerminal = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({ id: 1, name: 'Walk-in Customer', type: 'walk-in' });
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  
  // 더미 데이터
  const mockCategories = [
    { id: 1, name: 'Korean Food' },
    { id: 2, name: 'Japanese' },
    { id: 3, name: 'Western' },
    { id: 4, name: 'Beverages' },
    { id: 5, name: 'Desserts' }
  ];

  const mockMenuItems = {
    1: [
      { id: 1, name: 'Bulgogi Rice Bowl', description: 'Marinated beef with steamed rice and vegetables', price: 18.50 },
      { id: 2, name: 'Kimchi Fried Rice', description: 'Spicy fermented cabbage fried rice with egg', price: 15.90 },
      { id: 3, name: 'Korean BBQ Set', description: 'Grilled pork belly with banchan and rice', price: 25.90 }
    ],
    2: [
      { id: 5, name: 'Chicken Teriyaki', description: 'Grilled chicken with teriyaki sauce and rice', price: 19.90 },
      { id: 6, name: 'Sushi Combo', description: 'Fresh sushi selection with miso soup', price: 28.90 },
      { id: 7, name: 'Ramen Bowl', description: 'Rich tonkotsu broth with chashu pork', price: 22.50 }
    ],
    3: [
      { id: 9, name: 'Fish & Chips', description: 'Beer battered fish with crispy fries', price: 24.90 },
      { id: 10, name: 'Beef Burger', description: 'Juicy beef patty with cheese and fries', price: 19.90 },
      { id: 11, name: 'Grilled Chicken', description: 'Herb seasoned chicken breast with vegetables', price: 22.50 }
    ],
    4: [
      { id: 13, name: 'Iced Coffee', description: 'Cold brew coffee with milk', price: 6.50 },
      { id: 14, name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: 8.90 },
      { id: 15, name: 'Green Tea Latte', description: 'Matcha latte with steamed milk', price: 7.90 }
    ],
    5: [
      { id: 17, name: 'Chocolate Cake', description: 'Rich chocolate cake with ganache', price: 12.90 },
      { id: 18, name: 'Ice Cream Sundae', description: 'Vanilla ice cream with toppings', price: 8.50 },
      { id: 19, name: 'Fruit Tart', description: 'Fresh seasonal fruits on pastry', price: 10.90 }
    ]
  };

  const compareOptions = (options1, options2) => {
    if (!options1 && !options2) return true;
    if (!options1 || !options2) return false;
    
    const keys1 = Object.keys(options1).sort();
    const keys2 = Object.keys(options2).sort();
    
    if (keys1.length !== keys2.length) return false;
    
    for (let key of keys1) {
      if (!keys2.includes(key)) return false;
      
      const val1 = options1[key];
      const val2 = options2[key];
      
      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (val1.length !== val2.length) return false;
        if (!val1.every(v => val2.includes(v))) return false;
      } else {
        if (val1 !== val2) return false;
      }
    }
    return true;
  };

  const compareOptions = (options1, options2) => {
    if (!options1 && !options2) return true;
    if (!options1 || !options2) return false;
    
    const keys1 = Object.keys(options1).sort();
    const keys2 = Object.keys(options2).sort();
    
    if (keys1.length !== keys2.length) return false;
    
    for (let key of keys1) {
      if (!keys2.includes(key)) return false;
      
      const val1 = options1[key];
      const val2 = options2[key];
      
      if (Array.isArray(val1) && Array.isArray(val2)) {
        if (val1.length !== val2.length) return false;
        if (!val1.every(v => val2.includes(v))) return false;
      } else {
        if (val1 !== val2) return false;
      }
    }
    return true;
  };

  const handleItemSelect = (item) => {
    const hasOptions = item.selectedOptions && Object.keys(item.selectedOptions).length > 0;
    
    if (hasOptions) {
      setCartItems([...cartItems, { 
        ...item, 
        quantity: 1,
        displayPrice: item.finalPrice || item.price
      }]);
    } else {
      const existingItem = cartItems.find(cartItem => cartItem.id === item.id && !cartItem.selectedOptions);
      if (existingItem) {
        setCartItems(cartItems.map(cartItem =>
          cartItem.id === item.id && !cartItem.selectedOptions
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ));
      } else {
        setCartItems([...cartItems, { ...item, quantity: 1, displayPrice: item.price }]);
      }
    }
  };

  const handleCoupon = () => {
    if (!appliedCoupon) {
      setAppliedCoupon({ name: '10% OFF', value: 10 });
      setDiscount(10);
    } else {
      setAppliedCoupon(null);
      setDiscount(0);
    }
  };

  const handleDiscount = () => {
    const newDiscount = discount === 0 ? 15 : 0;
    setDiscount(newDiscount);
  };

  const handlePayment = (method) => {
    const total = calculateTotal().total;
    const pickupNumber = String(Math.floor(Math.random() * 100) + 1).padStart(3, '0');
    alert(`Processing ${method} payment: RM ${total.toFixed(2)}\n\nPickup Number: #${pickupNumber}\nCustomer: ${selectedCustomer.name}`);
    setCartItems([]);
    setDiscount(0);
    setAppliedCoupon(null);
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discountAmount = (subtotal * discount) / 100;
    const tax = (subtotal - discountAmount) * 0.06;
    return { 
      subtotal, 
      discount: discountAmount,
      tax, 
      total: subtotal - discountAmount + tax 
    };
  };

  const { subtotal, discount: discountAmount, tax, total } = calculateTotal();

  return (
    <div className="pos-terminal">
      <header className="pos-header">
        <h1>POS Terminal</h1>
        <div className="pos-info">
          <span>Order #001</span>
          <span>Table 5</span>
        </div>
      </header>
      
      <div className="pos-main">
        <div className="pos-menu-section">
          <MenuCategories 
            categories={mockCategories}
            onCategorySelect={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <MenuItems 
            items={mockMenuItems[selectedCategory] || []}
            onItemSelect={handleItemSelect}
          />
        </div>
        
        <div className="pos-cart-section">
          <div className="cart-header">
            <h2>Current Order</h2>
            <CustomerSearch 
              selectedCustomer={selectedCustomer}
              onCustomerSelect={setSelectedCustomer}
            />
          </div>
          
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p className="empty-cart">No items selected</p>
            ) : (
              cartItems.map(item => (
                <div key={item.cartId || item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                      <div className="cart-item-options">
                        {Object.entries(item.selectedOptions).map(([optionType, selectedValue]) => {
                          if (Array.isArray(selectedValue)) {
                            return selectedValue.map(valueId => (
                              <span key={valueId} className="option-tag">{valueId}</span>
                            ));
                          } else {
                            return <span key={optionType} className="option-tag">{selectedValue}</span>;
                          }
                        }).flat()}
                      </div>
                    )}
                    <span className="cart-item-qty">x{item.quantity}</span>
                  </div>
                  <span className="cart-item-price">RM {((item.displayPrice || item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
          
          <div className="cart-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>RM {subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="total-row discount">
                <span>Discount ({discount}%):</span>
                <span>-RM {discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="total-row">
              <span>Tax (6%):</span>
              <span>RM {tax.toFixed(2)}</span>
            </div>
            <div className="total-row final-total">
              <span>Total:</span>
              <span>RM {total.toFixed(2)}</span>
            </div>
          </div>

          <div className="pos-actions">
            <div className="action-buttons">
              <button 
                className={`action-btn ${appliedCoupon ? 'active' : ''}`}
                onClick={handleCoupon}
              >
                Coupon
              </button>
              <button 
                className={`action-btn ${discount > 0 && !appliedCoupon ? 'active' : ''}`}
                onClick={handleDiscount}
              >
                Discount
              </button>
              <button className="action-btn">
                Customer
              </button>
            </div>

            <div className="payment-buttons">
              <button 
                className="payment-btn cash"
                onClick={() => handlePayment('Cash')}
                disabled={cartItems.length === 0}
              >
                Cash
              </button>
              <button 
                className="payment-btn card"
                onClick={() => handlePayment('Card')}
                disabled={cartItems.length === 0}
              >
                Card
              </button>
            </div>

            <button 
              className="clear-btn"
              onClick={() => setCartItems([])}
              disabled={cartItems.length === 0}
            >
              Clear Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSTerminal;
