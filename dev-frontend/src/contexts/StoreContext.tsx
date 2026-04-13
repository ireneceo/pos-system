import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import QRCode from 'qrcode';

import { getAuthToken } from '../utils/auth';
interface StoreSettings {
  name: string;
  branchName: string;
  businessRegistration: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  gstRegNo: string;
}

interface OperationSettings {
  openingTime: string;
  closingTime: string;
  timeZone: string;
  orderNumberReset: 'daily' | 'weekly' | 'monthly' | 'never';
  defaultPreparationTime: number;
  taxEnabled: boolean;
  taxRate: number;
  serviceChargeEnabled: boolean;
  serviceChargeRate: number;
  currency: string; // Currency code (RM, USD, SGD, JPY, THB)
  cashRounding: number; // Cash rounding precision (0.05, 0.10, 0.50, 1.00)
  roundingApplyTo: 'cash_only' | 'all'; // Apply rounding to cash only or all payments
  pagerSystem: {
    enabled: boolean;
    totalPagers: number;
  };
  takeawayPricing: {
    enabled: boolean;
    pricingType: 'per-item' | 'per-category';
    perItemCharge: number;
    categoryCharges: {
      food: number;
      beverage: number;
      dessert: number;
      other: number;
    };
  };
  deliveryPricing: {
    enabled: boolean;
    minimumOrder: number;
    freeAbove: number;
    zones: Array<{
      id: string;
      name: string;
      fee: number;
      description: string;
    }>;
  };
  allowQuickOrder: boolean;
}

interface StoreContextType {
  storeSettings: StoreSettings;
  operationSettings: OperationSettings;
  paymentSettings: Record<string, any> | null;
  siteTimezone: string;
  updateSettings: (settings: Partial<{ store: StoreSettings; operations: OperationSettings }>) => void;
  getStoreInfo: () => Record<string, any>;
  getTakeawayCharge: (category?: string) => number;
}

const defaultStoreSettings: StoreSettings = {
  name: '',
  branchName: '',
  businessRegistration: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  gstRegNo: ''
};

const defaultOperationSettings: OperationSettings = {
  openingTime: '09:00',
  closingTime: '22:00',
  timeZone: 'Asia/Kuala_Lumpur',
  orderNumberReset: 'daily',
  defaultPreparationTime: 15,
  taxEnabled: true,
  taxRate: 6,
  serviceChargeEnabled: false,
  serviceChargeRate: 10,
  currency: 'RM', // Default currency
  cashRounding: 0.05, // Default cash rounding
  roundingApplyTo: 'cash_only', // Default rounding application
  pagerSystem: {
    enabled: false,
    totalPagers: 50
  },
  takeawayPricing: {
    enabled: false,
    pricingType: 'per-item',
    perItemCharge: 0.50,
    categoryCharges: {
      food: 1.00,
      beverage: 0.50,
      dessert: 0.50,
      other: 0.50
    }
  },
  deliveryPricing: {
    enabled: false,
    minimumOrder: 0,
    freeAbove: 999999,
    zones: []
  },
  allowQuickOrder: true
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(defaultStoreSettings);
  const [receiptInfo, setReceiptInfo] = useState<Record<string, any>>({});
  const [restaurantSlug, setRestaurantSlug] = useState('');
  const [operationSettings, setOperationSettings] = useState<OperationSettings>(defaultOperationSettings);
  const [paymentSettings, setPaymentSettings] = useState<Record<string, any> | null>(null);
  const [siteTimezone, setSiteTimezone] = useState<string>('Asia/Kuala_Lumpur');

  // Load site timezone from CompanySettings (for admin pages)
  useEffect(() => {
    const loadSiteTimezone = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (response.ok) {
          const data = await response.json();
          if (data.timezone) {
            setSiteTimezone(data.timezone);
          }
        }
      } catch (e) {
        // Keep default
      }
    };
    loadSiteTimezone();
  }, []);

  // DB에서 설정 로드 (auth-ready 이벤트에서도 재호출)
  const loadSettingsFromDB = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      // Try to get restaurant_id from URL first
      const restaurantMatch = window.location.pathname.match(/\/restaurant\/(\d+)/);
      let restaurantId = restaurantMatch ? parseInt(restaurantMatch[1]) : null;

      // If not found and it's a mobile URL, try to get from slug
      if (!restaurantId && window.location.pathname.includes('/mobile/')) {
        const slugMatch = window.location.pathname.match(/\/mobile\/([^/]+)/);
        if (slugMatch) {
          try {
            const slugResponse = await fetch(`/api/restaurants/slug/${slugMatch[1]}`);
            if (slugResponse.ok) {
              const slugData = await slugResponse.json();
              restaurantId = slugData.id || slugData.data?.id;
            }
          } catch (err) { /* ignore */ }
        }
      }

      // If not in URL, get from user info
      if (!restaurantId) {
        const userInfoResponse = await fetch('/api/auth/me', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          restaurantId = userInfo.restaurant_id;
        }
      }

      if (!restaurantId) return;

      // Fetch restaurant settings
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/store/settings?restaurantId=${restaurantId}&_t=${timestamp}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setStoreSettings({
            name: result.data.name || '',
            branchName: result.data.branch_name || '',
            businessRegistration: result.data.business_registration || '',
            phone: result.data.phone || '',
            email: result.data.email || '',
            address: result.data.address || '',
            city: result.data.city || '',
            state: result.data.state || '',
            postalCode: result.data.postal_code || '',
            gstRegNo: result.data.tax_id || ''
          });

          if (result.data.payment_settings) {
            const ps = typeof result.data.payment_settings === 'string'
              ? JSON.parse(result.data.payment_settings)
              : result.data.payment_settings;
            setPaymentSettings(ps);
          }

          const currencyDefaults = {
            currency: result.data.currency || 'MYR',
            cashRounding: result.data.cash_rounding || 0.05,
            roundingApplyTo: result.data.rounding_apply_to || 'cash_only'
          };

          if (result.data.operation_settings) {
            const parsed = typeof result.data.operation_settings === 'string'
              ? JSON.parse(result.data.operation_settings)
              : result.data.operation_settings;
            setOperationSettings({ ...defaultOperationSettings, ...parsed, ...currencyDefaults });
          } else {
            setOperationSettings({ ...defaultOperationSettings, ...currencyDefaults });
          }

          // Sync printer settings to localStorage for billPrint.js
          if (result.data.printer_settings) {
            const ps = typeof result.data.printer_settings === 'string'
              ? JSON.parse(result.data.printer_settings)
              : result.data.printer_settings;
            if (ps.printerMode) localStorage.setItem('printerMode', ps.printerMode);
            localStorage.setItem('printerSettings', JSON.stringify({
              billPrinter: ps.billPrinter || { enabled: false, name: '', autoPrint: false },
              kitchenPrinter: ps.kitchenPrinter || { enabled: false, name: '', autoPrint: false, printPerItem: false },
              ...(ps.kitchenStationPrinters ? { kitchenStationPrinters: ps.kitchenStationPrinters } : {})
            }));
            // receiptSettings + 멤버십 QR을 state + localStorage에 저장
            if (ps.receiptSettings) {
              let membershipQrDataUrl = '';
              let slug = '';
              // slug 가져오기 + 멤버십 QR 로컬 생성
              try {
                const slugRes = await fetch(`/api/restaurants/${restaurantId}`, { headers: { 'Authorization': `Bearer ${token}` } });
                if (slugRes.ok) {
                  const slugData = await slugRes.json();
                  slug = slugData.slug || slugData.data?.slug || '';
                  setRestaurantSlug(slug);
                  if (ps.receiptSettings.showMembership && slug) {
                    membershipQrDataUrl = await QRCode.toDataURL(
                      `https://purplehere.com/mobile/${slug}/account`,
                      { width: 160, margin: 1, color: { dark: '#000', light: '#FFF' } }
                    );
                  }
                }
              } catch {}
              const fullReceiptInfo = { ...ps.receiptSettings, membershipQrDataUrl, slug };
              setReceiptInfo(fullReceiptInfo);
              localStorage.setItem('receiptSettings', JSON.stringify(fullReceiptInfo));
            }
          }
        }
      }
    } catch (error) { /* ignore */ }
  };

  // URL에서 현재 레스토랑 ID 추출 (라우트 변경 감지용)
  const currentRestaurantId = window.location.pathname.match(/\/restaurant\/(\d+)/)?.[1] || '';

  // user 변경 또는 레스토랑 전환 시 설정 재로드
  useEffect(() => {
    loadSettingsFromDB();
  }, [user, currentRestaurantId]);

  // localStorage 동기화 제거 - storage 이벤트 리스너 제거

  const updateSettings = (settings: Partial<{ store: StoreSettings; operations: OperationSettings }>) => {
    if (settings.store) {
      setStoreSettings(settings.store);
    }
    if (settings.operations) {
      setOperationSettings(settings.operations);
    }
  };

  const getStoreInfo = () => {
    return { ...storeSettings, ...receiptInfo, slug: restaurantSlug, restaurantId: user?.restaurantId || '', timeZone: operationSettings.timeZone };
  };

  const getTakeawayCharge = (category?: string): number => {
    if (!operationSettings.takeawayPricing.enabled) {
      return 0;
    }

    if (operationSettings.takeawayPricing.pricingType === 'per-item') {
      return operationSettings.takeawayPricing.perItemCharge;
    }

    // Per category pricing
    if (category) {
      const categoryLower = category.toLowerCase();
      if (categoryLower in operationSettings.takeawayPricing.categoryCharges) {
        return operationSettings.takeawayPricing.categoryCharges[categoryLower as keyof typeof operationSettings.takeawayPricing.categoryCharges];
      }
    }

    // Default to 'other' category if category not found
    return operationSettings.takeawayPricing.categoryCharges.other;
  };

  return (
    <StoreContext.Provider
      value={{
        storeSettings,
        operationSettings,
        paymentSettings,
        siteTimezone,
        updateSettings,
        getStoreInfo,
        getTakeawayCharge
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;