import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import QRCode from 'qrcode';

import { getAuthToken } from '../utils/auth';
interface StoreSettings {
  name: string;
  branchName: string;
  businessRegistration: string;
  phone: string;          // Mobile phone (POS notifications) — NOT printed on bills.
  telephone: string;      // Store landline — printed on bills if provided.
  email: string;
  address: string;
  address_line_2?: string;
  delivery_address?: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  gstRegNo: string;
  logo?: string;
  // Legal entity fields — surfaced for getStoreInfo so bill header can show legal name when it differs from store name.
  tradeName?: string;
  legalName?: string;
}

interface OperationSettings {
  openingTime: string;
  closingTime: string;
  timeZone: string;
  orderNumberReset: 'daily' | 'weekly' | 'monthly' | 'never';
  defaultPreparationTime: number;
  prepTimeTracking: boolean;
  defaultPreparationTimePerItem: number;
  prepUrgentThreshold: number;
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
    pricingType: 'per-item' | 'per-category' | 'per-item-individual';
    perItemCharge: number;
    defaultPerItemCharge: number;
    categoryCharges: {
      food: number;
      beverage: number;
      dessert: number;
      other: number;
    };
  };
  mobileOrderAlerts: {
    bannerEnabled: boolean;
    soundEnabled: boolean;
    soundType: 'bell' | 'beep' | 'triple' | 'urgent' | 'melody' | 'deep';
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
  getTakeawayCharge: (menuItem?: { category?: string; takeaway_charge?: number | string | null } | string) => number;
}

const defaultStoreSettings: StoreSettings = {
  name: '',
  branchName: '',
  businessRegistration: '',
  phone: '',
  telephone: '',
  email: '',
  address: '',
  address_line_2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  gstRegNo: '',
  logo: '',
  tradeName: '',
  legalName: ''
};

const defaultOperationSettings: OperationSettings = {
  openingTime: '09:00',
  closingTime: '22:00',
  timeZone: 'Asia/Kuala_Lumpur',
  orderNumberReset: 'daily',
  defaultPreparationTime: 15,
  prepTimeTracking: false,
  defaultPreparationTimePerItem: 10,
  prepUrgentThreshold: 80,
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
    defaultPerItemCharge: 0.50,
    categoryCharges: {
      food: 1.00,
      beverage: 0.50,
      dessert: 0.50,
      other: 0.50
    }
  },
  mobileOrderAlerts: {
    bannerEnabled: true,
    soundEnabled: true,
    soundType: 'bell'
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
            telephone: result.data.telephone || '',
            email: result.data.email || '',
            address: result.data.address || '',
            address_line_2: result.data.address_line_2 || '',
            city: result.data.city || '',
            state: result.data.state || '',
            postalCode: result.data.postal_code || '',
            country: result.data.country || '',
            gstRegNo: result.data.tax_id || '',
            logo: result.data.logo_url || '',
            tradeName: result.data.trade_name || '',
            legalName: result.data.legal_name || ''
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

          // Sync printer settings to localStorage for billPrint.js (non-React module).
          // workstations[] is included so multi-POS routing can resolve this device's
          // active workstation against the shared list.
          if (result.data.printer_settings) {
            const ps = typeof result.data.printer_settings === 'string'
              ? JSON.parse(result.data.printer_settings)
              : result.data.printer_settings;
            if (ps.printerMode) localStorage.setItem('printerMode', ps.printerMode);
            localStorage.setItem('printerSettings', JSON.stringify({
              billPrinter: ps.billPrinter || { enabled: false, name: '', autoPrint: false },
              kitchenPrinter: ps.kitchenPrinter || { enabled: false, name: '', autoPrint: false, printPerItem: false },
              ...(ps.kitchenStationPrinters ? { kitchenStationPrinters: ps.kitchenStationPrinters } : {}),
              ...(Array.isArray(ps.workstations) ? { workstations: ps.workstations } : {}),
              // include receiptSettings so POS/LiveOrders/FloorPlan can read
              // copiesAfterPayment / autoOpenDrawer from one consistent source
              // (was previously only in localStorage['receiptSettings'], which
              // led to stale reads when settings hadn't been re-saved).
              ...(ps.receiptSettings ? { receiptSettings: ps.receiptSettings } : {})
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
              // Convert receiptLogo + customQrImage URLs to base64 data URLs so the
              // QZ Tray pixel/html print mode can render them. QZ Tray's renderer
              // does not (or cannot reliably) fetch external HTTP resources at
              // render time — embedding base64 makes the receipt self-contained
              // and ensures logo / custom QR show up on every print path.
              // Convert any image URL (incl. SVG) into a base64 *PNG* data URL.
              // SVG kept as-is breaks on QZ Tray's pixel/html renderer (no SVG
              // support and no external @font-face fetch), so we rasterize through
              // a hidden canvas — guaranteed renderable everywhere (browser,
              // QZ Tray, RawBT, OS print dialog).
              const fetchAsDataUrl = async (url: string | undefined | null): Promise<string> => {
                if (!url) return '';
                if (url.startsWith('data:image/png')) return url;
                const absoluteUrl = url.startsWith('data:')
                  ? url
                  : (url.startsWith('http') ? url : window.location.origin + url);
                try {
                  // Use an Image to let the browser decode SVG/PNG/JPG uniformly,
                  // then redraw to a canvas so output is always PNG (raster).
                  const img = new Image();
                  img.crossOrigin = 'anonymous';
                  await new Promise<void>((resolve, reject) => {
                    img.onload = () => resolve();
                    img.onerror = () => reject(new Error('image load failed'));
                    img.src = absoluteUrl;
                  });
                  // Cap dimensions so a huge upload doesn't blow up base64 size;
                  // 480x160 is enough for an 80mm thermal-printer header.
                  const maxW = 480, maxH = 160;
                  const ratio = Math.min(maxW / (img.naturalWidth || maxW), maxH / (img.naturalHeight || maxH), 1);
                  const w = Math.max(1, Math.round((img.naturalWidth || maxW) * ratio));
                  const h = Math.max(1, Math.round((img.naturalHeight || maxH) * ratio));
                  const canvas = document.createElement('canvas');
                  canvas.width = w; canvas.height = h;
                  const ctx = canvas.getContext('2d');
                  if (!ctx) return '';
                  // White background for thermal print clarity
                  ctx.fillStyle = '#ffffff';
                  ctx.fillRect(0, 0, w, h);
                  ctx.drawImage(img, 0, 0, w, h);
                  return canvas.toDataURL('image/png');
                } catch {
                  // Last-resort fallback — return the raw base64 of the response.
                  try {
                    const resp = await fetch(absoluteUrl);
                    if (!resp.ok) return '';
                    const blob = await resp.blob();
                    return await new Promise<string>((resolve) => {
                      const reader = new FileReader();
                      reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : '');
                      reader.onerror = () => resolve('');
                      reader.readAsDataURL(blob);
                    });
                  } catch { return ''; }
                }
              };
              // Prefer the server-side PNG raster endpoint for the receipt logo —
              // sharp converts SVG/JPG/PNG to a thermal-printer-friendly raster
              // regardless of the upload format. Client-side canvas conversion is
              // kept as a fallback (older builds / no-id paths).
              const logoServerUrl = (ps.receiptSettings.receiptLogo)
                ? `${window.location.origin}/api/restaurants/${restaurantId}/receipt-logo?v=${Date.now()}`
                : '';
              const [receiptLogoDataUrl, customQrDataUrl] = await Promise.all([
                logoServerUrl
                  ? fetchAsDataUrl(logoServerUrl).then((d) => d || fetchAsDataUrl(ps.receiptSettings.receiptLogo))
                  : fetchAsDataUrl(ps.receiptSettings.receiptLogo),
                fetchAsDataUrl(ps.receiptSettings.customQrImage)
              ]);
              const fullReceiptInfo = {
                ...ps.receiptSettings,
                membershipQrDataUrl,
                slug,
                // Keep the original URLs for the Settings UI preview, but add the
                // base64 variants the print path will use.
                receiptLogoDataUrl,
                customQrImageDataUrl: customQrDataUrl
              };
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

  const getTakeawayCharge = (
    menuItem?: { category?: string; takeaway_charge?: number | string | null } | string
  ): number => {
    if (!operationSettings.takeawayPricing.enabled) {
      return 0;
    }

    // Normalize: legacy callers pass a category string; new callers pass the menu item object.
    const itemObj = typeof menuItem === 'string' ? { category: menuItem } : (menuItem || {});
    const pricingType = operationSettings.takeawayPricing.pricingType;

    if (pricingType === 'per-item') {
      return operationSettings.takeawayPricing.perItemCharge;
    }

    if (pricingType === 'per-item-individual') {
      // null/undefined = no override → fall back to defaultPerItemCharge.
      // A numeric value (including 0) = explicit per-item override.
      const override = itemObj.takeaway_charge;
      if (override === null || override === undefined || override === '') {
        return Number(operationSettings.takeawayPricing.defaultPerItemCharge) || 0;
      }
      const n = Number(override);
      return Number.isFinite(n) ? n : 0;
    }

    // Per-category pricing
    if (itemObj.category) {
      const categoryLower = itemObj.category.toLowerCase();
      if (categoryLower in operationSettings.takeawayPricing.categoryCharges) {
        return operationSettings.takeawayPricing.categoryCharges[categoryLower as keyof typeof operationSettings.takeawayPricing.categoryCharges];
      }
    }
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