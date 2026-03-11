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
          const [companyRes, settingsRes] = await Promise.all([
            fetch(`/api/restaurants/${restaurantId}/company-info`, { headers }),
            fetch(`/api/restaurants/${restaurantId}`, { headers })
          ]);

          let companyData: CompanyData | null = null;
          let settingsData: RestaurantSettingsData | null = null;

          if (companyRes.ok) {
            const result = await companyRes.json();
            companyData = result.data || result;
          }
          if (settingsRes.ok) {
            const result = await settingsRes.json();
            settingsData = result.data || result;
          }

          const companyComplete = isCompanyInfoComplete(companyData);
          // Store settings: check if user has explicitly set currency (not the default empty state)
          const hasCurrency = !!(settingsData?.currency);
          const hasOperationSettings = !!(settingsData?.operation_settings);
          const settingsComplete = hasCurrency && hasOperationSettings;

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
              label: 'Review Store Settings',
              description: 'Verify your currency, operating hours, and payment preferences',
              path: `/restaurant/${restaurantId}/settings`,
              completed: settingsComplete
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
