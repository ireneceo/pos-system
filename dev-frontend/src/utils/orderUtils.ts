// 주문번호 생성 유틸리티

// 주문번호 생성 (YYMMDD-XXX 형식) - 데이터베이스 기반으로 중복 방지
export const generateOrderNumber = async (restaurantId?: number | string): Promise<{ orderNumber: string; pickupNumber: string }> => {
  try {
    // restaurantId is required - should be passed from caller
    const finalRestaurantId = restaurantId ? Number(restaurantId) : 1;
    const timeZone = 'Asia/Kuala_Lumpur'; // Default timezone

    // Call API to get next order number (prevents duplicates)
    const response = await fetch(`/api/orders/restaurant/${finalRestaurantId}/next-order-number?timeZone=${encodeURIComponent(timeZone)}`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to generate order number');
    }

    const result = await response.json();

    if (result.success && result.data) {
      return {
        orderNumber: result.data.orderNumber,
        pickupNumber: result.data.pickupNumber
      };
    }

    throw new Error('Invalid response from order number API');
  } catch (error) {
    console.error('Error generating order number:', error);

    // Fallback: generate locally (but this may cause duplicates in multi-device scenarios)
    const now = new Date();
    const localDateStr = now.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' });
    const localDate = new Date(localDateStr);

    const year = localDate.getFullYear().toString().slice(-2);
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const day = localDate.getDate().toString().padStart(2, '0');

    // Use timestamp for fallback to minimize collision risk
    const timestamp = Date.now().toString().slice(-3);
    const orderNumber = `${year}${month}${day}-${timestamp}`;
    const pickupNumber = timestamp;

    return { orderNumber, pickupNumber };
  }
};

// 고객명 통일
export const normalizeCustomerName = (name?: string): string => {
  if (!name || name === 'Guest Customer' || name === 'Mobile Guest') {
    return 'Walk-in Customer';
  }
  return name;
};