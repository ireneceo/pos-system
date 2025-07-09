// 옵션 비교 함수 추가
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

// handleItemSelect 함수 교체
const handleItemSelect = (item) => {
  const hasOptions = item.selectedOptions && Object.keys(item.selectedOptions).length > 0;
  
  if (hasOptions) {
    // 옵션이 있는 경우: 같은 메뉴 + 같은 옵션 찾기
    const existingItem = cartItems.find(cartItem => 
      cartItem.id === item.id && 
      compareOptions(cartItem.selectedOptions, item.selectedOptions)
    );
    
    if (existingItem) {
      // 같은 옵션이면 수량 증가
      setCartItems(cartItems.map(cartItem =>
        cartItem.cartId === existingItem.cartId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      // 다른 옵션이면 새로 추가
      setCartItems([...cartItems, { 
        ...item, 
        quantity: 1,
        displayPrice: item.finalPrice || item.price
      }]);
    }
  } else {
    // 옵션이 없는 경우: 기존 로직
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
