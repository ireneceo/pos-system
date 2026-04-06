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
  floor_plan?: any;
  table_settings?: {
    qrCodeBaseUrl?: string;
    totalTables?: number;
    [key: string]: any;
  };
  operation_settings?: {
    timeZone?: string;
    openingTime?: string;
    closingTime?: string;
    orderTypes?: Record<string, boolean>;
    [key: string]: any;
  };
  payment_settings?: Record<string, any>;
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
          const [companyRes, settingsRes, menuRes, kitchenStationsRes, notificationRes] = await Promise.all([
            fetch(`/api/restaurants/${restaurantId}/company-info`, { headers }),
            fetch(`/api/restaurants/${restaurantId}`, { headers }),
            fetch(`/api/menu?restaurant_id=${restaurantId}&excludeImage=true`, { headers }),
            fetch(`/api/kitchen-stations?restaurant_id=${restaurantId}`, { headers }),
            fetch(`/api/notification-settings/preferences`, { headers })
          ]);

          let companyData: CompanyData | null = null;
          let settingsData: RestaurantSettingsData | null = null;
          let menuItemCount = 0;
          let kitchenStationCount = 0;
          let hasNotificationSettings = false;

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
          if (kitchenStationsRes.ok) {
            const result = await kitchenStationsRes.json();
            const stations = result.data || [];
            kitchenStationCount = Array.isArray(stations) ? stations.length : 0;
          }
          if (notificationRes.ok) {
            const result = await notificationRes.json();
            hasNotificationSettings = !!(result.data?.preferences);
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

          // 6. Kitchen Stations: at least 1 exists
          const hasKitchenStations = kitchenStationCount > 0;

          // 7. Floor Plan: floor_plan data has at least 1 table/element
          const floorPlan = settingsData?.floor_plan;
          const hasFloorPlan = !!(floorPlan && Array.isArray(floorPlan) && floorPlan.length > 0) ||
            !!(floorPlan && typeof floorPlan === 'object' && !Array.isArray(floorPlan) &&
              (Array.isArray((floorPlan as any).tables) ? (floorPlan as any).tables.length > 0 :
               Array.isArray((floorPlan as any).elements) ? (floorPlan as any).elements.length > 0 : false));

          // 8. Mobile Order: any order type enabled in operation_settings
          const orderTypes = opSettings?.orderTypes;
          const hasMobileOrder = !!(orderTypes && typeof orderTypes === 'object' &&
            Object.values(orderTypes).some((v: any) => v === true));

          // 9. Notification Settings: preferences exist
          const hasNotifications = hasNotificationSettings;

          // 10. QR Codes: qrCodeBaseUrl configured in table_settings
          const tableSettings = settingsData?.table_settings;
          const hasQRCodes = !!(tableSettings?.qrCodeBaseUrl);

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
            },
            {
              key: 'kitchen_stations',
              label: 'Set up Kitchen Stations',
              description: 'Configure kitchen stations to route orders to the right preparation area',
              path: `/restaurant/${restaurantId}/settings?tab=kitchenStations`,
              completed: hasKitchenStations
            },
            {
              key: 'floor_plan',
              label: 'Configure Floor Plan',
              description: 'Set up your restaurant floor plan with tables for dine-in orders',
              path: `/restaurant/${restaurantId}/floor-plan-editor`,
              completed: hasFloorPlan
            },
            {
              key: 'mobile_order',
              label: 'Configure Mobile Order',
              description: 'Enable order types (dine-in, takeaway, delivery) for your restaurant',
              path: `/restaurant/${restaurantId}/settings?tab=mobileOrder`,
              completed: hasMobileOrder
            },
            {
              key: 'notifications',
              label: 'Set up Notifications',
              description: 'Configure notification preferences to stay informed about your restaurant',
              path: `/restaurant/${restaurantId}/notification-settings`,
              completed: hasNotifications
            },
            {
              key: 'qr_codes',
              label: 'Set up QR Codes',
              description: 'Generate QR codes for tables to enable mobile ordering',
              path: `/restaurant/${restaurantId}/settings?tab=operations`,
              completed: hasQRCodes
            }
          ];
          setItems(setupItems);

        } else if ((role === 'Brand General' || role === 'Brand Manager') && brandId) {
          const [companyRes, brandProductsRes, recipesRes, ingredientsRes] = await Promise.all([
            fetch('/api/brands/company-info', { headers }),
            fetch('/api/brand-products?limit=1', { headers }),
            fetch('/api/product-recipes?limit=1', { headers }),
            fetch('/api/product-ingredients?limit=1', { headers })
          ]);

          let companyData: CompanyData | null = null;
          let hasBrandProducts = false;
          let hasRecipes = false;
          let hasIngredients = false;

          if (companyRes.ok) {
            const result = await companyRes.json();
            companyData = result.data || result;
          }
          if (brandProductsRes.ok) {
            const result = await brandProductsRes.json();
            const products = result.data || [];
            hasBrandProducts = Array.isArray(products) ? products.length > 0 : false;
          }
          if (recipesRes.ok) {
            const result = await recipesRes.json();
            const recipes = result.data || [];
            hasRecipes = Array.isArray(recipes) ? recipes.length > 0 : false;
          }
          if (ingredientsRes.ok) {
            const result = await ingredientsRes.json();
            const ingredients = result.data || [];
            hasIngredients = Array.isArray(ingredients) ? ingredients.length > 0 : false;
          }

          setItems([
            {
              key: 'company_info',
              label: 'Complete Company Information',
              description: 'Add business registration, tax ID, and contact details for invoicing',
              path: '/pos/brand/company-info',
              completed: isCompanyInfoComplete(companyData)
            },
            {
              key: 'brand_products',
              label: 'Add Brand Products',
              description: 'Register your brand products to share across restaurant locations',
              path: '/pos/brand-products',
              completed: hasBrandProducts
            },
            {
              key: 'product_recipes',
              label: 'Set up Product Recipes',
              description: 'Define recipes for your brand products to track ingredient usage',
              path: '/pos/brand-product-recipes',
              completed: hasRecipes
            },
            {
              key: 'brand_ingredients',
              label: 'Add Brand Ingredients',
              description: 'Add ingredients used in your brand product recipes',
              path: '/pos/brand-ingredients',
              completed: hasIngredients
            }
          ]);

        } else if ((role === 'Foodcourt General' || role === 'Foodcourt Manager') && foodcourtId) {
          const [companyRes, restaurantsRes] = await Promise.all([
            fetch('/api/foodcourts/company-info', { headers }),
            fetch(`/api/foodcourts/${foodcourtId}/restaurants`, { headers })
          ]);

          let companyData: CompanyData | null = null;
          let hasTenantRestaurants = false;

          if (companyRes.ok) {
            const result = await companyRes.json();
            companyData = result.data || result;
          }
          if (restaurantsRes.ok) {
            const result = await restaurantsRes.json();
            const restaurants = result.data || [];
            hasTenantRestaurants = Array.isArray(restaurants) ? restaurants.length > 0 : false;
          }

          setItems([
            {
              key: 'company_info',
              label: 'Complete Company Information',
              description: 'Add business registration, tax ID, and contact details for invoicing',
              path: '/pos/foodcourt/company-info',
              completed: isCompanyInfoComplete(companyData)
            },
            {
              key: 'tenant_restaurants',
              label: 'Add Tenant Restaurants',
              description: 'Link restaurants to your foodcourt to manage them together',
              path: '/pos/foodcourt/general/management',
              completed: hasTenantRestaurants
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
