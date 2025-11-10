import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface StoreSettings {
  name: string;
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
}

interface StoreContextType {
  storeSettings: StoreSettings;
  operationSettings: OperationSettings;
  updateSettings: (settings: Partial<{ store: StoreSettings; operations: OperationSettings }>) => void;
  getStoreInfo: () => StoreSettings;
  getTakeawayCharge: (category?: string) => number;
}

const defaultStoreSettings: StoreSettings = {
  name: 'FOODCOURT CENTRAL',
  businessRegistration: '000123456789',
  phone: '+60 3-1234-5678',
  email: 'contact@foodcourt.com',
  address: '123 Main Street, City Center',
  city: 'Kuala Lumpur',
  state: 'Wilayah Persekutuan',
  postalCode: '50000',
  gstRegNo: '000123456789'
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
  }
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
  // localStorage 제거 - 기본 설정 사용 또는 DB에서 로드
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(defaultStoreSettings);
  const [operationSettings, setOperationSettings] = useState<OperationSettings>(defaultOperationSettings);

  // DB에서 설정 로드
  useEffect(() => {
    const loadSettingsFromDB = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        console.log('🔑 StoreContext: Auth token exists:', !!token);

        // Try to get restaurant_id from URL first
        const urlMatch = window.location.pathname.match(/\/restaurant\/(\d+)/);
        let restaurantId = urlMatch ? parseInt(urlMatch[1]) : null;
        console.log('🌐 StoreContext: Restaurant ID from URL:', restaurantId);

        // If not in URL, get from user info
        if (!restaurantId) {
          console.log('🔍 StoreContext: Fetching user info from /api/auth/me');
          const userInfoResponse = await fetch('/api/auth/me', {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
          });

          console.log('📡 StoreContext: /api/auth/me response status:', userInfoResponse.status);
          if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();
            console.log('👤 StoreContext: User info:', userInfo);
            restaurantId = userInfo.restaurant_id;
          } else {
            console.error('❌ StoreContext: Failed to get user info');
            const errorText = await userInfoResponse.text();
            console.error('Error details:', errorText);
          }
        }

        // If no restaurant_id, use default settings
        if (!restaurantId) {
          console.warn('⚠️ StoreContext: No restaurant_id found, using default settings');
          return;
        }

        console.log('🎯 StoreContext: Using restaurant_id:', restaurantId);

        // Fetch restaurant settings with restaurantId
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime();
        console.log('📞 StoreContext: Fetching settings from /api/store/settings?restaurantId=' + restaurantId);
        const response = await fetch(`/api/store/settings?restaurantId=${restaurantId}&_t=${timestamp}`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });

        console.log('📡 StoreContext: /api/store/settings response status:', response.status);
        if (response.ok) {
          const result = await response.json();
          console.log('🏪 StoreContext: API response:', result);
          if (result.success && result.data) {
            // Map restaurant data to store settings format
            const storeData: StoreSettings = {
              name: result.data.name || '',
              businessRegistration: result.data.business_registration || '',
              phone: result.data.phone || '',
              email: result.data.email || '',
              address: result.data.address || '',
              city: result.data.city || '',
              state: result.data.state || '',
              postalCode: result.data.postal_code || '',
              gstRegNo: result.data.tax_id || ''
            };

            console.log('🏪 StoreContext: Loaded store data:', storeData);
            setStoreSettings(storeData);

            // Set operation settings if available
            if (result.data.operation_settings) {
              const parsedOperationSettings = typeof result.data.operation_settings === 'string'
                ? JSON.parse(result.data.operation_settings)
                : result.data.operation_settings;

              setOperationSettings({
                ...defaultOperationSettings,
                ...parsedOperationSettings
              });
            }
          }
        } else {
          console.error('❌ StoreContext: Failed to fetch store settings');
          const errorText = await response.text();
          console.error('Error details:', errorText);
        }
      } catch (error) {
        console.error('❌ StoreContext: Error loading store settings:', error);
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      }
    };

    loadSettingsFromDB();
  }, []);

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
    console.log('🏪 StoreContext: getStoreInfo() called, returning:', storeSettings);
    return storeSettings;
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