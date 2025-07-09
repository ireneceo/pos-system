// handleItemSelect 함수 수정
const handleItemSelect = (item) => {
  // 옵션이 있는 아이템인지 확인
  const hasOptions = item.selectedOptions && Object.keys(item.selectedOptions).length > 0;
  
  if (hasOptions) {
    // 옵션이 있으면 항상 새로운 아이템으로 추가 (cartId 기준)
    setCartItems([...cartItems, { 
      ...item, 
      quantity: 1,
      displayPrice: item.finalPrice || item.price
    }]);
  } else {
    // 옵션이 없으면 기존 로직 (수량 증가)
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
