import { useState, useEffect } from 'react';
import { SetupItem } from '../components/Common/SetupGuide';

interface UseSetupStatusParams {
  role: string;
  restaurantId?: string | number | null;
  brandId?: number | null;
  foodcourtId?: number | null;
}

interface CompanyData {
  address?: string;
  phone?: string;
  business_registration?: string;
  registration_no?: string;
  tax_id?: string;
  tax_no?: string;
  [key: string]: any;
}

interface RestaurantSettingsData {
  currency?: string;
  table_count?: number;
  [key: string]: any;
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('auth_token');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

function isCompanyInfoComplete(data: CompanyData | null): boolean {
  if (!data) return false;
  const regNo = data.business_registration || data.registration_no;
  const taxNo = data.tax_id || data.tax_no;
  return !!(data.address && data.phone && (regNo || taxNo));
}

export function useSetupStatus(params: UseSetupStatusParams) {
  const [items, setItems] = useState<SetupItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { role, restaurantId, brandId, foodcourtId } = params;

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        const headers = getAuthHeaders();

        if ((role === 'Restaurant Admin' || role === 'Staff') && restaurantId) {
          const [companyRes, settingsRes, menuRes] = await Promise.all([
            fetch(`/api/restaurants/${restaurantId}/company-info`, { headers }),
            fetch(`/api/restaurants/${restaurantId}`, { headers }),
            fetch(`/api/menu?restaurant_id=${restaurantId}&excludeImage=true`, { headers })
          ]);

          let companyData: CompanyData | null = null;
          let settingsData: RestaurantSettingsData | null = null;
          let menuItemCount = 0;

          if (companyRes.ok) {
            const result = await companyRes.json();
            companyData = result.data || result;
          }
          if (settingsRes.ok) {
            const result = await settingsRes.json();
            settingsData = result.data || result;
          }
          if (menuRes.ok) {
            const result = await menuRes.json();
            const items = result.data?.items || result.data || [];
            menuItemCount = Array.isArray(items) ? items.length : 0;
          }

          // 1. Company Information
          const companyComplete = isCompanyInfoComplete(companyData);

          // 2. Store Settings: currency + timezone
          const hasCurrency = !!(settingsData?.currency);
          const opSettings = settingsData?.operation_settings;
          const hasTimezone = !!(opSettings?.timeZone);
          const storeComplete = hasCurrency && hasTimezone;

          // 3. Operating Hours: explicitly set (not empty)
          const hasHours = !!(opSettings?.openingTime && opSettings?.closingTime);

          // 4. Menu Items: at least 1
          const hasMenu = menuItemCount > 0;

          // 5. Payment Methods: at least 1 POS payment method enabled
          const paySettings = settingsData?.payment_settings;
          let hasPayment = false;
          if (paySettings && typeof paySettings === 'object') {
            hasPayment = Object.entries(paySettings).some(([key, val]: [string, any]) => {
              if (key === '_order' || !val || typeof val !== 'object') return false;
              return val.enabled && Array.isArray(val.availableIn) && val.availableIn.includes('pos');
            });
          }

          const setupItems: SetupItem[] = [
            {
              key: 'company_info',
              label: 'Complete Company Information',
              description: 'Add business registration, tax ID, and contact details for invoicing',
              path: `/restaurant/${restaurantId}/company-information`,
              completed: companyComplete
            },
            {
              key: 'store_settings',
              label: 'Set Currency & Timezone',
              description: 'Configure your currency and timezone for accurate transactions',
              path: `/restaurant/${restaurantId}/settings?tab=store`,
              completed: storeComplete
            },
            {
              key: 'operating_hours',
              label: 'Set Operating Hours',
              description: 'Configure opening/closing times for your restaurant',
              path: `/restaurant/${restaurantId}/settings?tab=operations`,
              completed: hasHours
            },
            {
              key: 'menu_items',
              label: 'Add Menu Items',
              description: 'Register at least one menu item to start taking orders',
              path: `/restaurant/${restaurantId}/menu`,
              completed: hasMenu
            },
            {
              key: 'payment_methods',
              label: 'Configure Payment Methods',
              description: 'Enable at least one payment method for POS transactions',
              path: `/restaurant/${restaurantId}/settings?tab=payment`,
              completed: hasPayment
            }
          ];
          setItems(setupItems);

        } else if ((role === 'Brand General' || role === 'Brand Manager') && brandId) {
          const res = await fetch('/api/brands/company-info', { headers });
          let companyData: CompanyData | null = null;
          if (res.ok) {
            const result = await res.json();
            companyData = result.data || result;
          }

          setItems([
            {
              key: 'company_info',
              label: 'Complete Company Information',
              description: 'Add business registration, tax ID, and contact details for invoicing',
              path: '/pos/brand/company-info',
              completed: isCompanyInfoComplete(companyData)
            }
          ]);

        } else if ((role === 'Foodcourt General' || role === 'Foodcourt Manager') && foodcourtId) {
          const res = await fetch('/api/foodcourts/company-info', { headers });
          let companyData: CompanyData | null = null;
          if (res.ok) {
            const result = await res.json();
            companyData = result.data || result;
          }

          setItems([
            {
              key: 'company_info',
              label: 'Complete Company Information',
              description: 'Add business registration, tax ID, and contact details for invoicing',
              path: '/pos/foodcourt/company-info',
              completed: isCompanyInfoComplete(companyData)
            }
          ]);

        } else {
          setItems([]);
        }
      } catch (err) {
        console.error('useSetupStatus Error:', err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [role, restaurantId, brandId, foodcourtId]);

  return { items, loading };
}
