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

        // Get user info to retrieve restaurant_id
        const userInfoResponse = await fetch('/api/auth/me', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });

        let restaurantId = null;
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          restaurantId = userInfo.restaurant_id;
        }

        // If no restaurant_id, use default settings
        if (!restaurantId) {
          console.warn('No restaurant_id found, using default settings');
          return;
        }

        // Fetch restaurant settings with restaurantId
        const response = await fetch(`/api/store/settings?restaurantId=${restaurantId}`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            // Map restaurant data to store settings format
            const storeData: StoreSettings = {
              name: result.data.name || defaultStoreSettings.name,
              businessRegistration: result.data.id?.toString() || defaultStoreSettings.businessRegistration,
              phone: result.data.phone || defaultStoreSettings.phone,
              email: result.data.email || defaultStoreSettings.email,
              address: result.data.address || defaultStoreSettings.address,
              city: result.data.city || defaultStoreSettings.city,
              state: result.data.state || defaultStoreSettings.state,
              postalCode: result.data.postal_code || defaultStoreSettings.postalCode,
              gstRegNo: result.data.operation_settings?.gstRegNo || defaultStoreSettings.gstRegNo
            };

            setStoreSettings(storeData);

            // Set operation settings if available
            if (result.data.operation_settings) {
              setOperationSettings({
                ...defaultOperationSettings,
                ...result.data.operation_settings
              });
            }
          }
        }
      } catch (error) {
        console.error('Error loading store settings:', error);
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

  const getStoreInfo = () => storeSettings;

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