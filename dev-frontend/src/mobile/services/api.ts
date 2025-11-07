const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

class MobileApiService {
  // localStorage 제거 - 쿠키 기반 인증 사용

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    console.log('API Request:', { url, endpoint, method: options.method || 'GET' });

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    };

    // 토큰 헤더 제거 - httpOnly 쿠키로 자동 전송

    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include', // 쿠키를 포함하여 요청
        headers
      });

      console.log('API Response:', { status: response.status, ok: response.ok });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        try {
          const error = JSON.parse(errorText);
          throw new Error(error.message || `Request failed: ${response.status}`);
        } catch {
          throw new Error(`Request failed: ${response.status}`);
        }
      }

      const responseText = await response.text();
      console.log('API Response Body:', responseText);

      if (responseText) {
        try {
          return JSON.parse(responseText);
        } catch {
          return { success: true };
        }
      }

      return { success: true };
    } catch (error) {
      console.error('❌ API request failed:', error);
      throw error;
    }
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('/mobile/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async register(data: { email: string; password: string; name: string; phone: string }) {
    return this.request('/mobile/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async guestToken() {
    return this.request('/mobile/auth/guest', {
      method: 'POST'
    });
  }

  async guestCheckout() {
    return this.request('/mobile/auth/guest', {
      method: 'POST'
    });
  }

  async getStoreByQRCode(qrCode: string) {
    return this.request(`/mobile/store/qr/${qrCode}`);
  }

  // Menu
  async getMenu(storeId: string) {
    return this.request(`/mobile/menu/${storeId}`);
  }

  async getItemDetails(itemId: string) {
    return this.request(`/mobile/menu/item/${itemId}`);
  }

  // Cart & Order
  async validateCart(items: any[], storeId: string) {
    return this.request('/mobile/cart/validate', {
      method: 'POST',
      body: JSON.stringify({ items, storeId })
    });
  }

  async createOrder(orderData: {
    items: any[];
    storeId: string;
    paymentMethod: string;
    orderType: 'dine-in' | 'takeaway';
    customerInfo?: any;
    tableNumber?: string;
  }) {
    return this.request('/mobile/order', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  async getOrder(orderId: string) {
    return this.request(`/mobile/order/${orderId}`);
  }

  async cancelOrder(orderId: string) {
    return this.request(`/mobile/order/${orderId}/cancel`, {
      method: 'POST'
    });
  }

  // Payment
  async createPaymentIntent(amount: number, currency: string = 'MYR') {
    return this.request('/mobile/payment/intent', {
      method: 'POST',
      body: JSON.stringify({ amount, currency })
    });
  }

  async confirmPayment(paymentIntentId: string, orderId: string) {
    return this.request('/mobile/payment/confirm', {
      method: 'POST',
      body: JSON.stringify({ paymentIntentId, orderId })
    });
  }

  // Orders
  async getOrders() {
    return this.request('/mobile/orders');
  }
}

export default new MobileApiService();
