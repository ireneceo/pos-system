import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { TabContainer, Tab, OrderControls } from '../../components/UI';
import { Modal as CommonModal } from '../../components/UI/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { useMenu } from '../../contexts/MenuContext';
import { useBrandTheme } from '../../contexts/BrandThemeContext';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import PhoneInput from '../../components/Common/PhoneInput';
import PageHeader from '../../components/Common/PageHeader';
import { useTabParam } from '../../hooks/useTabParam';
import { getPrinterMode, setPrinterMode, connectQZTray, disconnectQZTray, isQZTrayConnected, getQZTrayPrinters, qzTrayTestPrint } from '../../utils/billPrint';
import { getCurrencySymbol } from '../../utils/currency';

// 스타일 컴포넌트
const SettingsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;

  input::placeholder, textarea::placeholder, select::placeholder {
    color: #C7D2E0;
  }
`;


const SaveButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  background: #635BFF;
  color: white;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #635BFF;
    color: white;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: #635BFF;
  color: white;
  
  &:hover {
    background: #5A51E6;
  }
  
  &:disabled {
    background: #E6EBF1;
    color: #8898AA;
    cursor: not-allowed;
  }
`;

const Content = styled.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

// TabContainer and Tab components now imported from ../../components/UI

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  box-sizing: border-box;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #C7D2FE;
  }

  &::placeholder {
    color: #C7D2E0;
  }

  &:disabled {
    background: #F6F9FC;
    color: #8898AA;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  transition: all 0.15s;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #C7D2FE;
  }
`;

const Toggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E6EBF1;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  ${ToggleInput}:checked + & {
    background-color: #635BFF;
  }

  ${ToggleInput}:focus + & {
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  ${ToggleInput}:checked + &:before {
    transform: translateX(24px);
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #F6F9FC;
  margin: 20px 0;
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
`;

const StatusMessage = styled.div<{ type: 'success' | 'error' }>`
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 12px;

  ${props => props.type === 'success' ? `
    background: #ECFDF5;
    color: #059669;
    border: 1px solid #A7F3D0;
  ` : `
    background: #FEF2F2;
    color: #DC2626;
    border: 1px solid #FECACA;
  `}
`;

// Unused styled component - kept for reference
// const TabContentWrapper = styled.div`
//   position: relative;
//   min-height: 500px;
// `;

const SaveButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
`;

const PaymentMethodCard = styled.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

const FeeInput = styled(Input)`
  width: 100px;
  display: inline-block;
  margin-right: 8px;

  @media (max-width: 480px) {
    width: 80px;
    margin-right: 4px;
  }
`;

const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 20px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
`;

const TableItem = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: all 0.15s;
  
  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const TableNumber = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const QRContainer = styled.div`
  margin: 12px 0;
  display: flex;
  justify-content: center;
`;

const TableActions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
`;

const ActionButton = styled.button`
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  color: #6B7C93;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }
`;

// 타입 정의
type TabType = 'store' | 'operations' | 'payment' | 'printer' | 'kitchenStations' | 'mobileOrder' | 'company' | 'brands' | 'billing' | 'managers' | 'membership';

interface Table {
  id: string;
  number: number;
  qrCode: string;
  isActive: boolean;
}

interface StoreSettings {
  name: string;
  businessRegistration: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  gstRegNo: string;
  logo: string;
}

// 국가 목록 (ISO 코드 기준)
const COUNTRIES = [
  { code: 'MY', name: 'Malaysia', timezone: 'Asia/Kuala_Lumpur' },
  { code: 'SG', name: 'Singapore', timezone: 'Asia/Singapore' },
  { code: 'KR', name: 'South Korea', timezone: 'Asia/Seoul' },
  { code: 'JP', name: 'Japan', timezone: 'Asia/Tokyo' },
  { code: 'CN', name: 'China', timezone: 'Asia/Shanghai' },
  { code: 'TH', name: 'Thailand', timezone: 'Asia/Bangkok' },
  { code: 'VN', name: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh' },
  { code: 'PH', name: 'Philippines', timezone: 'Asia/Manila' },
  { code: 'ID', name: 'Indonesia', timezone: 'Asia/Jakarta' },
  { code: 'IN', name: 'India', timezone: 'Asia/Kolkata' },
  { code: 'AU', name: 'Australia', timezone: 'Australia/Sydney' },
  { code: 'US', name: 'United States', timezone: 'America/New_York' },
  { code: 'GB', name: 'United Kingdom', timezone: 'Europe/London' },
];

interface CompanySettings {
  name: string;
  businessRegistration: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  website: string;
  logo: string;
  taxId: string;
  industry: string;
}

interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  isActive: boolean;
  restaurantCount: number;
  restaurants: Array<{
    id: string;
    name: string;
    branchName: string;
    location: string;
  }>;
}

interface BrandSettings {
  brands: Brand[];
}

interface BreakTime {
  id: string;
  start: string;
  end: string;
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
  loyaltyTiers: {
    enabled: boolean;
    bronze: {
      minOrders: number;
      minSpent: number;
    };
    silver: {
      minOrders: number;
      minSpent: number;
    };
    gold: {
      minOrders: number;
      minSpent: number;
    };
    vip: {
      minOrders: number;
      minSpent: number;
    };
  };
  orderTypes: {
    dineIn: boolean;
    takeaway: boolean;
    pickup: boolean;
    delivery: boolean;
  };
  allowQuickOrder: boolean;
  breakTimes: BreakTime[];
}

// PaymentSettings interface removed - not used

interface Manager {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  phone: string;
  isPrimary: boolean;
}

interface MembershipSettings {
  is_active: boolean;
  points_per_currency: number;
  points_to_currency: number;
  min_points_to_use: number;
  max_points_per_order_percent: number;
  silver_threshold: number;
  gold_threshold: number;
  vip_threshold: number;
  bronze_bonus_rate: number;
  silver_bonus_rate: number;
  gold_bonus_rate: number;
  vip_bonus_rate: number;
  bronze_discount_percent: number;
  silver_discount_percent: number;
  gold_discount_percent: number;
  vip_discount_percent: number;
  points_expiry_days: number;
  welcome_points: number;
}

const defaultMembershipSettings: MembershipSettings = {
  is_active: true,
  points_per_currency: 1,
  points_to_currency: 100,
  min_points_to_use: 100,
  max_points_per_order_percent: 50,
  silver_threshold: 500,
  gold_threshold: 2000,
  vip_threshold: 5000,
  bronze_bonus_rate: 1.0,
  silver_bonus_rate: 1.2,
  gold_bonus_rate: 1.5,
  vip_bonus_rate: 2.0,
  bronze_discount_percent: 0,
  silver_discount_percent: 0,
  gold_discount_percent: 5,
  vip_discount_percent: 10,
  points_expiry_days: 0,
  welcome_points: 0
};

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { updateSettings } = useStore();
  const { categories } = useMenu();
  const { setTheme, resetTheme, isDefaultTheme } = useBrandTheme();

  // Use custom hook for tab URL parameter management
  const defaultTab: TabType = (['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager'].includes(user?.role || '') ? 'company' : 'store') as TabType;
  const [activeTab, handleTabChange] = useTabParam<TabType>(defaultTab);

  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveCallbackRef = useRef<(() => Promise<void>) | null>(null);
  const markChanged = () => {
    setHasChanges(true);
    setAutoSaveStatus('saving');
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      if (saveCallbackRef.current) saveCallbackRef.current();
    }, 2000);
  };
  
  // Payment settings state - start with null, will be loaded from DB
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [paymentOrder, setPaymentOrder] = useState<string[]>([]);

  // Printer settings state
  const [printerSettings, setPrinterSettings] = useState({
    billPrinter: {
      enabled: false,
      name: '',
      autoPrint: false,
      address: ''
    },
    kitchenPrinter: {
      enabled: false,
      name: '',
      autoPrint: false,
      printPerItem: false,
      address: ''
    },
    kitchenStationPrinters: {} as Record<string, { name: string; autoPrint: boolean }>
  });

  // Printer mode state (rawbt, browser, or qztray)
  // Initialize from localStorage to prevent flicker on page load
  const [printerMode, setPrinterModeState] = useState<'rawbt' | 'browser' | 'qztray'>(() => {
    const saved = localStorage.getItem('printerMode');
    if (saved === 'browser' || saved === 'rawbt' || saved === 'qztray') return saved;
    return 'rawbt';
  });
  const [printerSettingsLoading, setPrinterSettingsLoading] = useState(true);
  const [qzTrayStatus, setQzTrayStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [qzTrayPrinters, setQzTrayPrinters] = useState<string[]>([]);
  const [showQzGuide, setShowQzGuide] = useState(false);

  // Kitchen Stations state
  const [kitchenStations, setKitchenStations] = useState<any[]>([]);
  const [kitchenAssignmentMode, setKitchenAssignmentMode] = useState<'category' | 'menu_item'>('category');
  const [itemMergeTimeLimit, setItemMergeTimeLimit] = useState<number>(0);
  const [itemMergeMaxCount, setItemMergeMaxCount] = useState<number>(0);
  const [itemMergeSaving, setItemMergeSaving] = useState(false);
  const [kitchenStationsLoading, setKitchenStationsLoading] = useState(true);
  const [showStationModal, setShowStationModal] = useState(false);
  const [editingStation, setEditingStation] = useState<any>(null);
  const [stationForm, setStationForm] = useState({ name: '', category_ids: [] as number[], product_ids: [] as number[], alert_sound: 'bell' as string });
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [stationSaving, setStationSaving] = useState(false);

  // Load settings from localStorage or use defaults
  const loadSettings = () => {
    // 기본값 정의
    const defaultSettings = {
      store: {
        name: 'FOODCOURT CENTRAL',
        businessRegistration: '000123456789',
        phone: '+60 3-1234-5678',
        email: 'contact@foodcourt.com',
        address: '123 Main Street, City Center',
        city: 'Kuala Lumpur',
        state: 'Wilayah Persekutuan',
        postalCode: '50000',
        country: 'MY',
        gstRegNo: '000123456789',
        logo: ''
      },
      operations: {
        openingTime: '09:00',
        closingTime: '22:00',
        timeZone: 'Asia/Kuala_Lumpur',
        orderNumberReset: 'daily',
        defaultPreparationTime: 15,
        taxEnabled: true,
        taxRate: 6,
        serviceChargeEnabled: false,
        serviceChargeRate: 10,
        currency: 'RM',
        cashRounding: 0.05,
        roundingApplyTo: 'cash_only',
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
        loyaltyTiers: {
          enabled: true,
          bronze: {
            minOrders: 0,
            minSpent: 0
          },
          silver: {
            minOrders: 5,
            minSpent: 500
          },
          gold: {
            minOrders: 15,
            minSpent: 1500
          },
          vip: {
            minOrders: 30,
            minSpent: 3000
          }
        },
        orderTypes: {
          dineIn: true,
          takeaway: true,
          pickup: false,
          delivery: false
        },
        allowQuickOrder: true,
        breakTimes: []
      }
    };

    // localStorage에서 저장된 설정 로드 후 기본값과 안전하게 머지
    const savedSettings = localStorage.getItem('storeSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        return {
          store: { ...defaultSettings.store, ...(parsed.store || {}) },
          operations: {
            ...defaultSettings.operations,
            ...(parsed.operations || {}),
            pagerSystem: {
              ...defaultSettings.operations.pagerSystem,
              ...((parsed.operations && parsed.operations.pagerSystem) || {})
            },
            takeawayPricing: {
              ...defaultSettings.operations.takeawayPricing,
              ...((parsed.operations && parsed.operations.takeawayPricing) || {}),
              categoryCharges: {
                ...defaultSettings.operations.takeawayPricing.categoryCharges,
                ...((parsed.operations?.takeawayPricing?.categoryCharges) || {})
              }
            },
            deliveryPricing: {
              ...defaultSettings.operations.deliveryPricing,
              ...((parsed.operations && parsed.operations.deliveryPricing) || {}),
              zones: parsed.operations?.deliveryPricing?.zones || defaultSettings.operations.deliveryPricing.zones
            },
            loyaltyTiers: {
              ...defaultSettings.operations.loyaltyTiers,
              ...((parsed.operations && parsed.operations.loyaltyTiers) || {}),
              bronze: {
                ...defaultSettings.operations.loyaltyTiers.bronze,
                ...((parsed.operations?.loyaltyTiers?.bronze) || {})
              },
              silver: {
                ...defaultSettings.operations.loyaltyTiers.silver,
                ...((parsed.operations?.loyaltyTiers?.silver) || {})
              },
              gold: {
                ...defaultSettings.operations.loyaltyTiers.gold,
                ...((parsed.operations?.loyaltyTiers?.gold) || {})
              },
              vip: {
                ...defaultSettings.operations.loyaltyTiers.vip,
                ...((parsed.operations?.loyaltyTiers?.vip) || {})
              }
            },
            orderTypes: {
              ...defaultSettings.operations.orderTypes,
              ...((parsed.operations && parsed.operations.orderTypes) || {})
            },
            breakTimes: parsed.operations?.breakTimes || defaultSettings.operations.breakTimes
          }
        };
      } catch (e) {
        console.error('Failed to parse localStorage storeSettings:', e);
      }
    }
    return defaultSettings;
  };

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(loadSettings().store);
  const [operationSettings, setOperationSettings] = useState<OperationSettings>(loadSettings().operations);
  const [mobileSettings, setMobileSettings] = useState<{
    show_featured: boolean;
    show_popular: boolean;
    popular_excluded_category_ids: number[];
    category_schedules: Array<{ category_id: number; start_time: string; end_time: string }>;
  }>({ show_featured: true, show_popular: true, popular_excluded_category_ids: [], category_schedules: [] });
  const [brandInfo, setBrandInfo] = useState<{
    brand_id: number | null;
    brand_name: string | null;
  }>({ brand_id: null, brand_name: null });

  // Initialize currencySettings from operationSettings (will be overridden by DB values in useEffect)
  const defaultOps = loadSettings().operations;
  const [currencySettings, setCurrencySettings] = useState({
    currency: defaultOps.currency || 'MYR',
    cashRounding: defaultOps.cashRounding !== null && defaultOps.cashRounding !== undefined ? defaultOps.cashRounding : null,
    roundingApplyTo: defaultOps.roundingApplyTo || 'cash_only' as 'cash_only' | 'all'
  });
  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: 'Food Court Management Corp',
    businessRegistration: '202301234567',
    phone: '+60 3-2123-4567',
    email: 'admin@foodcourtmanagement.com',
    address: '123 Business District',
    city: 'Kuala Lumpur',
    state: 'Wilayah Persekutuan',
    postalCode: '50450',
    website: 'www.foodcourtmanagement.com',
    logo: '',
    taxId: '90-1234567',
    industry: 'Food Service Management'
  });
  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    brands: [
      {
        id: '1',
        name: 'Local Delights',
        description: 'Traditional Malaysian cuisine',
        logo: '',
        primaryColor: '#635BFF',
        secondaryColor: '#F8FAFC',
        accentColor: '#5A51E6',
        isActive: true,
        restaurantCount: 3,
        restaurants: [
          { id: 'rest-001', name: 'Local Delights', branchName: 'KLCC Branch', location: 'KLCC' },
          { id: 'rest-002', name: 'Local Delights', branchName: 'Pavilion Branch', location: 'Pavilion KL' },
          { id: 'rest-003', name: 'Local Delights', branchName: 'Mid Valley Branch', location: 'Mid Valley' }
        ]
      },
      {
        id: '2',
        name: 'International Fusion',
        description: 'Global flavors and modern cuisine',
        logo: '',
        primaryColor: '#059669',
        secondaryColor: '#ECFDF5',
        accentColor: '#047857',
        isActive: true,
        restaurantCount: 2,
        restaurants: [
          { id: 'rest-004', name: 'International Fusion', branchName: 'Sunway Branch', location: 'Sunway Pyramid' },
          { id: 'rest-005', name: 'International Fusion', branchName: 'IOI Branch', location: 'IOI City Mall' }
        ]
      },
      {
        id: '3',
        name: 'Quick Bites',
        description: 'Fast casual dining experience',
        logo: '',
        primaryColor: '#DC2626',
        secondaryColor: '#FEF2F2',
        accentColor: '#B91C1C',
        isActive: false,
        restaurantCount: 1,
        restaurants: [
          { id: 'rest-006', name: 'Quick Bites', branchName: 'One Utama Branch', location: 'One Utama' }
        ]
      }
    ]
  });
  
  // Table management state
  const [restaurantSlug, setRestaurantSlug] = useState<string>('');
  const [tableSettings, setTableSettings] = useState({
    enableTableNumbers: true,
    tableNumberRequired: false,
    tablePrefix: 'T',
    totalTables: 20,
    qrCodeBaseUrl: window.location.origin,
    qrMode: 'static' as 'static' | 'session',
    qrExpirationMinutes: 180
  });
  
  const [tables, setTables] = useState<Table[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loadingManagers, setLoadingManagers] = useState(false);
  const [membershipSettings, setMembershipSettings] = useState<MembershipSettings>(defaultMembershipSettings);
  const [loadingMembership, setLoadingMembership] = useState(false);
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);

  // Load supported currencies from system settings
  useEffect(() => {
    const fetchSupportedCurrencies = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch('/api/currencies/supported', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.data)) {
            setSupportedCurrencies(data.data.map((c: any) => c.code || c));
          }
        }
      } catch (error) {
        console.error('Failed to fetch supported currencies:', error);
      }
    };
    fetchSupportedCurrencies();
  }, []);

  // Load store data from restaurants API on mount
  useEffect(() => {
    const loadStoreData = async () => {
      if (user?.restaurantId) {
        try {
          const response = await fetch(`/api/restaurants/${user.restaurantId}`);
          if (response.ok) {
            const data = await response.json();
            const restaurant = data.data || data;

            console.log('🔍 RAW API Response for restaurant:', {
              currency: restaurant.currency,
              cash_rounding: restaurant.cash_rounding,
              rounding_apply_to: restaurant.rounding_apply_to,
              raw_cash_rounding_type: typeof restaurant.cash_rounding
            });

            // Update store settings with restaurant data
            setStoreSettings({
              name: restaurant.name || '',
              businessRegistration: restaurant.business_registration || '',
              phone: restaurant.phone || '',
              email: restaurant.email || '',
              address: restaurant.address || '',
              city: restaurant.city || '',
              state: restaurant.state || '',
              postalCode: restaurant.postal_code || '',
              country: restaurant.country || 'MY',
              gstRegNo: restaurant.tax_id || '',
              logo: restaurant.logo_url || ''
            });

            // Update brand info
            setBrandInfo({
              brand_id: restaurant.brand_id || null,
              brand_name: restaurant.brand?.name || null
            });

            // Store restaurant slug for QR code generation
            if (restaurant.slug) {
              setRestaurantSlug(restaurant.slug);
            }

            // Load payment settings - use DB values directly (no merge)
            if (restaurant.payment_settings) {
              console.log('✅ Loading payment settings from DB:', JSON.stringify(restaurant.payment_settings).substring(0, 200));

              // Use DB values directly - no merging with defaults
              setPaymentMethods(restaurant.payment_settings);

              // Load payment order - use saved order or default to current keys
              const savedOrder = restaurant.payment_settings._order;
              const methodKeys = Object.keys(restaurant.payment_settings).filter(k => k !== '_order');
              if (savedOrder && Array.isArray(savedOrder)) {
                // Make sure all keys are in the order array (add any missing at the end)
                const completeOrder = [...savedOrder.filter((k: string) => methodKeys.includes(k))];
                methodKeys.forEach(k => {
                  if (!completeOrder.includes(k)) completeOrder.push(k);
                });
                setPaymentOrder(completeOrder);
              } else {
                setPaymentOrder(methodKeys);
              }

              console.log('✅ Loaded payment methods:', Object.keys(restaurant.payment_settings));
            } else {
              console.log('⚠️  No payment settings found in DB, using default values');
            }

            // Load operation settings from DB
            const defaultOps = loadSettings().operations;

            // Merge operation_settings from DB
            const mergedSettings = restaurant.operation_settings ? {
              ...defaultOps,
              ...restaurant.operation_settings,
              pagerSystem: {
                ...defaultOps.pagerSystem,
                ...(restaurant.operation_settings.pagerSystem || {})
              },
              takeawayPricing: {
                ...defaultOps.takeawayPricing,
                ...(restaurant.operation_settings.takeawayPricing || {}),
                categoryCharges: {
                  ...defaultOps.takeawayPricing.categoryCharges,
                  ...((restaurant.operation_settings.takeawayPricing && restaurant.operation_settings.takeawayPricing.categoryCharges) || {})
                }
              },
              deliveryPricing: {
                ...defaultOps.deliveryPricing,
                ...(restaurant.operation_settings.deliveryPricing || {}),
                zones: restaurant.operation_settings.deliveryPricing?.zones || []
              },
              loyaltyTiers: {
                ...defaultOps.loyaltyTiers,
                ...(restaurant.operation_settings.loyaltyTiers || {}),
                bronze: {
                  ...defaultOps.loyaltyTiers.bronze,
                  ...((restaurant.operation_settings.loyaltyTiers && restaurant.operation_settings.loyaltyTiers.bronze) || {})
                },
                silver: {
                  ...defaultOps.loyaltyTiers.silver,
                  ...((restaurant.operation_settings.loyaltyTiers && restaurant.operation_settings.loyaltyTiers.silver) || {})
                },
                gold: {
                  ...defaultOps.loyaltyTiers.gold,
                  ...((restaurant.operation_settings.loyaltyTiers && restaurant.operation_settings.loyaltyTiers.gold) || {})
                },
                vip: {
                  ...defaultOps.loyaltyTiers.vip,
                  ...((restaurant.operation_settings.loyaltyTiers && restaurant.operation_settings.loyaltyTiers.vip) || {})
                }
              },
              orderTypes: {
                ...defaultOps.orderTypes,
                ...(restaurant.operation_settings.orderTypes || {})
              },
              allowQuickOrder: restaurant.operation_settings.allowQuickOrder !== undefined
                ? restaurant.operation_settings.allowQuickOrder : defaultOps.allowQuickOrder,
              breakTimes: restaurant.operation_settings.breakTimes || defaultOps.breakTimes
            } : defaultOps;

            // Override with currency settings from restaurant table (these take priority)
            // Individual columns (currency, cash_rounding, rounding_apply_to) are the source of truth
            const currencyFromDB = restaurant.currency || 'MYR';
            // null means rounding is disabled - preserve null, don't default to 0.05
            const cashRoundingFromDB = restaurant.cash_rounding !== null && restaurant.cash_rounding !== undefined
              ? parseFloat(restaurant.cash_rounding)
              : null;
            const roundingApplyToFromDB = restaurant.rounding_apply_to || 'cash_only';

            const finalOperationSettings = {
              ...mergedSettings,
              currency: currencyFromDB,
              cashRounding: cashRoundingFromDB,
              roundingApplyTo: roundingApplyToFromDB
            };

            console.log('✅ Loading currency from DB:', {
              currency: currencyFromDB,
              cashRounding: cashRoundingFromDB,
              roundingApplyTo: roundingApplyToFromDB,
              raw_cash_rounding: restaurant.cash_rounding
            });
            console.log('✅ Final operation settings with currency:', finalOperationSettings);
            setOperationSettings(finalOperationSettings);

            // Also update currencySettings state for the UI (same values as operationSettings)
            setCurrencySettings({
              currency: currencyFromDB,
              cashRounding: restaurant.cash_rounding !== null && restaurant.cash_rounding !== undefined ? parseFloat(restaurant.cash_rounding) : null,
              roundingApplyTo: roundingApplyToFromDB
            });

            // Load table settings from DB
            if (restaurant.table_settings) {
              console.log('✅ Loading table settings from DB:', restaurant.table_settings);
              setTableSettings({
                enableTableNumbers: restaurant.table_settings.enableTableNumbers ?? true,
                tableNumberRequired: restaurant.table_settings.tableNumberRequired ?? false,
                tablePrefix: restaurant.table_settings.tablePrefix || 'T',
                totalTables: restaurant.table_settings.totalTables || 20,
                qrCodeBaseUrl: restaurant.table_settings.qrCodeBaseUrl || window.location.origin,
                qrMode: restaurant.table_settings.qrMode || 'static',
                qrExpirationMinutes: restaurant.table_settings.qrExpirationMinutes || 180
              });
            }

            // Load mobile settings from DB
            if (restaurant.mobile_settings) {
              setMobileSettings({
                show_featured: restaurant.mobile_settings.show_featured ?? true,
                show_popular: restaurant.mobile_settings.show_popular ?? true,
                popular_excluded_category_ids: restaurant.mobile_settings.popular_excluded_category_ids || [],
                category_schedules: restaurant.mobile_settings.category_schedules || []
              });
            }
          }
        } catch (error) {
          console.error('Failed to load store data:', error);
        }
      }
    };

    loadStoreData();
  }, [user?.restaurantId]);

  // Load managers from API
  useEffect(() => {
    const loadManagers = async () => {
      if (user?.restaurantId) {
        setLoadingManagers(true);
        try {
          const response = await fetch(`/api/restaurants/${user.restaurantId}`);
          if (response.ok) {
            const data = await response.json();
            const restaurant = data.data || data;
            if (restaurant.managers && Array.isArray(restaurant.managers)) {
              setManagers(restaurant.managers.map((m: any) => ({
                id: m.id.toString(),
                name: m.name || m.full_name || m.username,
                email: m.email,
                role: m.role,
                company: m.company || '',
                phone: m.phone || '',
                isPrimary: m.isPrimary || false
              })));
            }
          }
        } catch (error) {
          console.error('Failed to load managers:', error);
        } finally {
          setLoadingManagers(false);
        }
      }
    };

    if (activeTab === 'managers') {
      loadManagers();
    }
  }, [activeTab, user?.restaurantId]);

  // Load printer settings from DB
  useEffect(() => {
    const loadPrinterSettings = async () => {
      if (!user?.restaurantId) return;

      setPrinterSettingsLoading(true);
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`/api/restaurants/${user.restaurantId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const restaurant = await response.json();
          if (restaurant.printer_settings) {
            const dbSettings = restaurant.printer_settings;
            const rawMode = dbSettings.printerMode || 'rawbt';
            const mode = (rawMode === 'browser' || rawMode === 'qztray') ? rawMode : 'rawbt';
            setPrinterModeState(mode as 'rawbt' | 'browser' | 'qztray');
            setPrinterMode(mode);
            setPrinterSettings({
              billPrinter: {
                enabled: dbSettings.billPrinter?.enabled ?? false,
                name: dbSettings.billPrinter?.name || '',
                autoPrint: dbSettings.billPrinter?.autoPrint ?? false,
                address: dbSettings.billPrinter?.address || ''
              },
              kitchenPrinter: {
                enabled: dbSettings.kitchenPrinter?.enabled ?? false,
                name: dbSettings.kitchenPrinter?.name || '',
                autoPrint: dbSettings.kitchenPrinter?.autoPrint ?? false,
                printPerItem: dbSettings.kitchenPrinter?.printPerItem ?? false,
                address: dbSettings.kitchenPrinter?.address || ''
              },
              kitchenStationPrinters: dbSettings.kitchenStationPrinters || {}
            });
            // Also sync to localStorage for billPrint.js
            localStorage.setItem('printerMode', mode);
            localStorage.setItem('printerSettings', JSON.stringify({
              billPrinter: dbSettings.billPrinter || { enabled: false, name: '', autoPrint: false, address: '' },
              kitchenPrinter: dbSettings.kitchenPrinter || { enabled: false, name: '', autoPrint: false, printPerItem: false, address: '' },
              ...(dbSettings.kitchenStationPrinters ? { kitchenStationPrinters: dbSettings.kitchenStationPrinters } : {})
            }));
          }
        }
      } catch (e) {
        console.error('Failed to load printer settings from DB:', e);
        // Fallback to localStorage
        const savedPrinterSettings = localStorage.getItem('printerSettings');
        if (savedPrinterSettings) {
          try {
            const parsed = JSON.parse(savedPrinterSettings);
            setPrinterSettings(prev => ({
              billPrinter: { ...prev.billPrinter, ...parsed.billPrinter },
              kitchenPrinter: { ...prev.kitchenPrinter, ...parsed.kitchenPrinter },
              kitchenStationPrinters: parsed.kitchenStationPrinters || prev.kitchenStationPrinters
            }));
          } catch (err) {
            console.error('Failed to parse printer settings:', err);
          }
        }
        setPrinterModeState(getPrinterMode());
      } finally {
        setPrinterSettingsLoading(false);
      }
    };

    loadPrinterSettings();
  }, [user?.restaurantId]);

  // Load kitchen stations
  const loadKitchenStations = async () => {
    if (!user?.restaurantId) return;
    setKitchenStationsLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const authHeaders = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

      const [stationsRes, categoriesRes, productsRes, restaurantRes] = await Promise.all([
        fetch(`/api/kitchen-stations?restaurant_id=${user.restaurantId}`, { headers: authHeaders }),
        fetch(`/api/categories?restaurant_id=${user.restaurantId}`, { headers: authHeaders }),
        fetch(`/api/menu?restaurant_id=${user.restaurantId}`, { headers: authHeaders }),
        fetch(`/api/restaurants/${user.restaurantId}`, { headers: authHeaders })
      ]);

      if (stationsRes.ok) {
        const stationsData = await stationsRes.json();
        setKitchenStations(stationsData.data?.stations || []);
        setKitchenAssignmentMode(stationsData.data?.assignment_mode || 'category');
      }
      if (categoriesRes.ok) {
        const catData = await categoriesRes.json();
        setAllCategories(Array.isArray(catData) ? catData : (catData.data || []));
      }
      if (productsRes.ok) {
        const prodData = await productsRes.json();
        const items = prodData.data?.items || prodData.data || [];
        setAllProducts(Array.isArray(items) ? items : []);
      }
      if (restaurantRes.ok) {
        const restData = await restaurantRes.json();
        const restaurant = restData.data || restData;
        if (restaurant.kitchen_item_merge) {
          setItemMergeTimeLimit(restaurant.kitchen_item_merge.time_limit || 0);
          setItemMergeMaxCount(restaurant.kitchen_item_merge.max_count || 0);
        }
      }
    } catch (error) {
      console.error('Failed to load kitchen stations:', error);
    } finally {
      setKitchenStationsLoading(false);
    }
  };

  useEffect(() => {
    loadKitchenStations();
  }, [user?.restaurantId]);

  // Load membership settings
  useEffect(() => {
    const loadMembershipSettings = async () => {
      if (!user?.restaurantId) return;

      setLoadingMembership(true);
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`/api/membership/settings/${user.restaurantId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setMembershipSettings({
              is_active: result.data.is_active ?? true,
              points_per_currency: parseFloat(result.data.points_per_currency) || 1,
              points_to_currency: parseFloat(result.data.points_to_currency) || 100,
              min_points_to_use: result.data.min_points_to_use || 100,
              max_points_per_order_percent: parseFloat(result.data.max_points_per_order_percent) || 50,
              silver_threshold: parseFloat(result.data.silver_threshold) || 500,
              gold_threshold: parseFloat(result.data.gold_threshold) || 2000,
              vip_threshold: parseFloat(result.data.vip_threshold) || 5000,
              bronze_bonus_rate: parseFloat(result.data.bronze_bonus_rate) || 1.0,
              silver_bonus_rate: parseFloat(result.data.silver_bonus_rate) || 1.2,
              gold_bonus_rate: parseFloat(result.data.gold_bonus_rate) || 1.5,
              vip_bonus_rate: parseFloat(result.data.vip_bonus_rate) || 2.0,
              bronze_discount_percent: parseFloat(result.data.bronze_discount_percent) || 0,
              silver_discount_percent: parseFloat(result.data.silver_discount_percent) || 0,
              gold_discount_percent: parseFloat(result.data.gold_discount_percent) || 5,
              vip_discount_percent: parseFloat(result.data.vip_discount_percent) || 10,
              points_expiry_days: result.data.points_expiry_days || 0,
              welcome_points: result.data.welcome_points || 0
            });
          }
        }
      } catch (error) {
        console.error('Failed to load membership settings:', error);
      } finally {
        setLoadingMembership(false);
      }
    };

    if (activeTab === 'membership') {
      loadMembershipSettings();
    }
  }, [activeTab, user?.restaurantId]);

  // Load table settings
  useEffect(() => {
    const savedTableSettings = localStorage.getItem('tableSettings');
    if (savedTableSettings) {
      const parsedSettings = JSON.parse(savedTableSettings);
      setTableSettings(parsedSettings);
    }
  }, []);

  // Generate/update tables when restaurantSlug is available
  useEffect(() => {
    if (!restaurantSlug) return;

    // Generate tables with correct slug-based URLs
    const newTables: Table[] = [];
    for (let i = 1; i <= tableSettings.totalTables; i++) {
      const tableNumber = `${tableSettings.tablePrefix}${String(i).padStart(3, '0')}`;
      const qrData = `${tableSettings.qrCodeBaseUrl}/mobile/${restaurantSlug}?table=${tableNumber}`;
      newTables.push({
        id: `table-${i}`,
        number: i,
        qrCode: qrData,
        isActive: true
      });
    }
    setTables(newTables);
  }, [restaurantSlug, tableSettings.totalTables, tableSettings.tablePrefix, tableSettings.qrCodeBaseUrl]);

  // generateTables function removed - not used
  
  const handleGenerateQRCodes = () => {
    if (!restaurantSlug) {
      console.error('Restaurant slug not available for QR code generation');
      return;
    }
    const newTables: Table[] = [];
    for (let i = 1; i <= tableSettings.totalTables; i++) {
      const tableNumber = `${tableSettings.tablePrefix}${String(i).padStart(3, '0')}`;
      const qrData = `${tableSettings.qrCodeBaseUrl}/mobile/${restaurantSlug}?table=${tableNumber}`;
      newTables.push({
        id: `table-${i}`,
        number: i,
        qrCode: qrData,
        isActive: true
      });
    }
    setTables(newTables);
    markChanged();
  };
  
  const handleDownloadQR = (table: Table) => {
    const tableNumber = `${tableSettings.tablePrefix}${String(table.number).padStart(3, '0')}`;
    const qrCanvas = document.getElementById(`qr-${table.id}`) as HTMLCanvasElement;

    if (qrCanvas) {
      // Create new canvas with table number label + QR code
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const padding = 20;
      const labelHeight = 50;
      const qrSize = qrCanvas.width || 100;

      canvas.width = qrSize + padding * 2;
      canvas.height = qrSize + padding * 2 + labelHeight;

      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw table number label at top
      ctx.fillStyle = '#0A2540';
      ctx.font = 'bold 28px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(tableNumber, canvas.width / 2, padding + labelHeight / 2);

      // Draw QR code below label
      ctx.drawImage(qrCanvas, padding, padding + labelHeight);

      // Download
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${tableNumber}-qr.png`;
      link.href = url;
      link.click();
    }
  };
  
  const handlePrintQR = (table: Table) => {
    const tableNumber = `${tableSettings.tablePrefix}${String(table.number).padStart(3, '0')}`;
    const storeName = storeSettings.name || 'Restaurant';
    const svgElement = document.getElementById(`qr-svg-${table.id}`);

    if (svgElement) {
      // Use SVG for high-quality print
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Print QR - ${tableNumber}</title>
            <style>
              body {
                margin: 0;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                font-family: Arial, sans-serif;
              }
              .store-name {
                font-size: 18px;
                font-weight: 600;
                color: #0A2540;
                margin-bottom: 8px;
              }
              .table-number {
                font-size: 32px;
                font-weight: bold;
                color: #0A2540;
                margin-bottom: 16px;
              }
              .qr-container {
                padding: 20px;
                background: white;
              }
              .qr-container svg {
                width: 200px;
                height: 200px;
              }
              @media print {
                body { padding: 0; }
                .qr-container svg {
                  width: 250px;
                  height: 250px;
                }
              }
            </style>
          </head>
          <body>
            <div class="store-name">${storeName}</div>
            <div class="table-number">${tableNumber}</div>
            <div class="qr-container">${svgData}</div>
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() { window.close(); };
              };
            </script>
          </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  const handleDownloadSVG = (table: Table) => {
    const tableNumber = `${tableSettings.tablePrefix}${String(table.number).padStart(3, '0')}`;
    const storeName = storeSettings.name || 'Restaurant';
    const svgElement = document.getElementById(`qr-svg-${table.id}`);

    if (svgElement) {
      // Clone SVG and add styling
      const clonedSvg = svgElement.cloneNode(true) as SVGElement;

      // Create a new SVG with table number included
      const svgWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgWrapper.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svgWrapper.setAttribute('width', '300');
      svgWrapper.setAttribute('height', '350');
      svgWrapper.setAttribute('viewBox', '0 0 300 350');

      // Add white background
      const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bg.setAttribute('width', '300');
      bg.setAttribute('height', '350');
      bg.setAttribute('fill', 'white');
      svgWrapper.appendChild(bg);

      // Add store name
      const storeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      storeText.setAttribute('x', '150');
      storeText.setAttribute('y', '30');
      storeText.setAttribute('text-anchor', 'middle');
      storeText.setAttribute('font-family', 'Arial, sans-serif');
      storeText.setAttribute('font-size', '16');
      storeText.setAttribute('font-weight', '600');
      storeText.setAttribute('fill', '#0A2540');
      storeText.textContent = storeName;
      svgWrapper.appendChild(storeText);

      // Add table number
      const tableText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tableText.setAttribute('x', '150');
      tableText.setAttribute('y', '60');
      tableText.setAttribute('text-anchor', 'middle');
      tableText.setAttribute('font-family', 'Arial, sans-serif');
      tableText.setAttribute('font-size', '28');
      tableText.setAttribute('font-weight', 'bold');
      tableText.setAttribute('fill', '#0A2540');
      tableText.textContent = tableNumber;
      svgWrapper.appendChild(tableText);

      // Create a group for the QR code and position it
      const qrGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      qrGroup.setAttribute('transform', 'translate(50, 80)');

      // Get inner content of QR SVG
      clonedSvg.setAttribute('width', '200');
      clonedSvg.setAttribute('height', '200');
      qrGroup.appendChild(clonedSvg);
      svgWrapper.appendChild(qrGroup);

      // Convert to blob and download
      const svgData = new XMLSerializer().serializeToString(svgWrapper);
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${tableNumber}-qr.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const handlePaymentToggle = (methodKey: string, platform: 'pos' | 'mobile', enabled: boolean) => {
    setPaymentMethods((prev: any) => {
      const currentMethod = prev[methodKey];
      let newAvailableIn = [...(currentMethod.availableIn || [])];

      if (enabled) {
        // Add platform if not already present
        if (!newAvailableIn.includes(platform)) {
          newAvailableIn.push(platform);
        }
      } else {
        // Remove platform
        newAvailableIn = newAvailableIn.filter((p: string) => p !== platform);
      }

      return {
        ...prev,
        [methodKey]: {
          ...currentMethod,
          availableIn: newAvailableIn,
          enabled: newAvailableIn.length > 0 // Enabled if at least one platform is selected
        }
      };
    });
    markChanged();
  };

  const handlePaymentSettingChange = (methodKey: string, field: string, value: any) => {
    setPaymentMethods((prev: any) => ({
      ...prev,
      [methodKey]: { ...prev[methodKey], [field]: value }
    }));
    markChanged();
  };

  const handlePaymentConfigChange = (methodKey: string, configField: string, value: any) => {
    setPaymentMethods((prev: any) => ({
      ...prev,
      [methodKey]: {
        ...prev[methodKey],
        config: { ...prev[methodKey].config, [configField]: value }
      }
    }));
    markChanged();
  };

  // Payment method ordering functions
  const movePaymentMethod = (methodKey: string, direction: 'up' | 'down') => {
    setPaymentOrder(prev => {
      const currentIndex = prev.indexOf(methodKey);
      if (currentIndex === -1) return prev;

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const newOrder = [...prev];
      [newOrder[currentIndex], newOrder[newIndex]] = [newOrder[newIndex], newOrder[currentIndex]];
      return newOrder;
    });
    markChanged();
  };

  const handleSave = async () => {
    console.log('🔄 handleSave called');
    console.log('📊 user?.restaurantId:', user?.restaurantId);

    try {
      // Save all settings to localStorage for operations
      const allSettings = {
        store: storeSettings,
        operations: operationSettings
      };

      localStorage.setItem('storeSettings', JSON.stringify(allSettings));

      // Save table settings
      localStorage.setItem('tableSettings', JSON.stringify(tableSettings));
      localStorage.setItem('tables', JSON.stringify(tables));

      // Trigger storage event for other tabs/components
      window.dispatchEvent(new Event('storage'));

      console.log('✅ localStorage saved');

      // Save store info and payment settings to restaurants table
      if (user?.restaurantId) {
        console.log('📤 Preparing PUT request to /api/restaurants/' + user.restaurantId);

        // Save payment methods - save ALL methods (enabled and disabled)
        // Don't filter out disabled methods - we need to keep them in DB to preserve their config
        const normalizedPaymentMethods: any = {};
        if (paymentMethods) {
          Object.keys(paymentMethods).forEach((key) => {
            // Skip the _order key when copying payment methods
            if (key === '_order') return;
            // Save all methods with their current state (enabled or disabled)
            normalizedPaymentMethods[key] = paymentMethods[key];
          });
          // Save the payment order
          normalizedPaymentMethods._order = paymentOrder;
        }

        const requestBody = {
          name: storeSettings.name,
          business_registration: storeSettings.businessRegistration,
          phone: storeSettings.phone,
          email: storeSettings.email,
          address: storeSettings.address,
          city: storeSettings.city,
          state: storeSettings.state,
          postal_code: storeSettings.postalCode,
          country: storeSettings.country,
          tax_id: storeSettings.gstRegNo,
          logo_url: storeSettings.logo,
          payment_settings: normalizedPaymentMethods,
          operation_settings: operationSettings,
          table_settings: tableSettings,
          mobile_settings: mobileSettings,
          currency: currencySettings.currency,
          cash_rounding: currencySettings.cashRounding,
          rounding_apply_to: currencySettings.roundingApplyTo,
          kitchen_item_merge: { time_limit: itemMergeTimeLimit, max_count: itemMergeMaxCount }
        };

        console.log('📦 Request body (first 500 chars):', JSON.stringify(requestBody).substring(0, 500));
        console.log('💳 Payment settings being saved:', JSON.stringify(paymentMethods).substring(0, 300));
        console.log('⚙️ Operation settings being saved:', JSON.stringify(operationSettings));
        console.log('💰 Currency settings being saved:', {
          currency: currencySettings.currency,
          cashRounding: currencySettings.cashRounding,
          roundingApplyTo: currencySettings.roundingApplyTo
        });

        const token = localStorage.getItem('auth_token');
        console.log('🔑 Auth token length:', token?.length || 0);
        console.log('👤 User restaurantId:', user.restaurantId);
        console.log('📡 Sending PUT request to:', `/api/store/settings?restaurantId=${user.restaurantId}`);

        const response = await fetch(`/api/store/settings?restaurantId=${user.restaurantId}&_t=${Date.now()}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify(requestBody)
        });

        console.log('📨 Response received:', response.status, response.statusText);
        console.log('📨 Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Failed to save store info to database. Status:', response.status, 'Error:', errorText);
          console.error('❌ Full error response:', errorText);
          setSaveStatus({ type: 'error', message: `Failed to save settings to database (${response.status}: ${response.statusText})` });

          // Auto-clear error message after 8 seconds
          setTimeout(() => {
            setSaveStatus(null);
          }, 8000);
          return;
        }

        const result = await response.json();
        console.log('✅ Database save successful:', result);

        // Update StoreContext with new operation settings (including currency settings)
        console.log('🔄 Updating StoreContext with new operation settings');
        updateSettings({
          store: storeSettings,
          operations: {
            ...operationSettings,
            currency: currencySettings.currency,
            cashRounding: currencySettings.cashRounding || 0.05,
            roundingApplyTo: currencySettings.roundingApplyTo
          }
        });

        // Reload data from DB to verify it was saved correctly
        console.log('🔄 Reloading settings from DB to verify...');
        const verifyResponse = await fetch(`/api/restaurants/${user.restaurantId}`);
        if (verifyResponse.ok) {
          const verifyData = await verifyResponse.json();
          const verifyRestaurant = verifyData.data || verifyData;
          if (verifyRestaurant.payment_settings) {
            console.log('✅ Verified payment settings from DB:', JSON.stringify(verifyRestaurant.payment_settings).substring(0, 200));
            setPaymentMethods(verifyRestaurant.payment_settings);
          } else {
            console.log('⚠️  Payment settings not found in DB after save!');
          }

          // Reload currency settings from DB
          console.log('✅ Verified currency settings from DB:', {
            currency: verifyRestaurant.currency,
            cash_rounding: verifyRestaurant.cash_rounding,
            rounding_apply_to: verifyRestaurant.rounding_apply_to
          });
          setCurrencySettings({
            currency: verifyRestaurant.currency || 'MYR',
            cashRounding: verifyRestaurant.cash_rounding !== null && verifyRestaurant.cash_rounding !== undefined ? parseFloat(verifyRestaurant.cash_rounding) : null,
            roundingApplyTo: verifyRestaurant.rounding_apply_to || 'cash_only'
          });
        }
      } else {
        console.log('⚠️  No restaurantId found, skipping database save');
      }

      // 성공 시 알림 없이 처리 (UI 디자인 가이드 준수)
      setHasChanges(false);
      setSaveStatus(null);
      console.log('✅ Save completed successfully');
    } catch (error) {
      console.error('❌ Error saving settings:', error);
      setSaveStatus({ type: 'error', message: 'Failed to save settings' });

      // Auto-clear error message after 8 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 8000);
    }
  };

  const handleSaveMembership = async () => {
    if (!user?.restaurantId) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/membership/settings/${user.restaurantId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(membershipSettings)
      });

      if (!response.ok) {
        throw new Error('Failed to save membership settings');
      }

      // 성공 시 알림 없이 처리 (UI 디자인 가이드 준수)
      setHasChanges(false);
      setSaveStatus(null);
    } catch (error) {
      console.error('Failed to save membership settings:', error);
      setSaveStatus({ type: 'error', message: 'Failed to save membership settings' });

      setTimeout(() => {
        setSaveStatus(null);
      }, 8000);
    }
  };

  // Keep saveCallbackRef updated with latest save function
  saveCallbackRef.current = async () => {
    try {
      if (activeTab === 'membership') {
        await handleSaveMembership();
      } else {
        await handleSave();
      }
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 3000);
    } catch (e) {
      setAutoSaveStatus('idle');
    }
  };

  return (
    <>
      <SettingsContainer>
        <PageHeader title="Store Settings" />

        <Content>

          <TabContainer>
            {['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager'].includes(user?.role || '') ? (
              <>
                <Tab active={activeTab === 'company'} onClick={() => handleTabChange('company')}>
                  Company Info
                </Tab>
                <Tab active={activeTab === 'brands'} onClick={() => handleTabChange('brands')}>
                  Brand Management
                </Tab>
                <Tab active={activeTab === 'billing'} onClick={() => handleTabChange('billing')}>
                  Billing & Subscriptions
                </Tab>
              </>
            ) : (
              <>
                <Tab active={activeTab === 'store'} onClick={() => handleTabChange('store')}>
                  Store Info
                </Tab>
                <Tab active={activeTab === 'operations'} onClick={() => handleTabChange('operations')}>
                  Operations
                </Tab>
                <Tab active={activeTab === 'payment'} onClick={() => handleTabChange('payment')}>
                  Payment Methods
                </Tab>
                <Tab active={activeTab === 'printer'} onClick={() => handleTabChange('printer')}>
                  Printer
                </Tab>
                <Tab active={activeTab === 'kitchenStations'} onClick={() => handleTabChange('kitchenStations')}>
                  Kitchen Stations
                </Tab>
                <Tab active={activeTab === 'mobileOrder'} onClick={() => handleTabChange('mobileOrder')}>
                  Mobile Order
                </Tab>
                <Tab active={activeTab === 'managers'} onClick={() => handleTabChange('managers')}>
                  Managers
                </Tab>
                <Tab active={activeTab === 'membership'} onClick={() => handleTabChange('membership')}>
                  Membership
                </Tab>
              </>
            )}
          </TabContainer>

          {activeTab !== 'managers' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '-20px 0 16px' }}>
              <SaveButton
                onClick={async () => {
                  if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
                  setAutoSaveStatus('saving');
                  if (saveCallbackRef.current) await saveCallbackRef.current();
                }}
                disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved'}
              >
                {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
              </SaveButton>
            </div>
          )}

          {activeTab === 'payment' && (
            <SettingsCard>
              <CardTitle>Payment Methods</CardTitle>
              <p style={{ color: '#6B7C93', marginBottom: '24px', fontSize: '14px' }}>
                Configure payment methods for POS Terminal and Mobile Order
              </p>

              {!paymentMethods ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                  Loading payment settings...
                </div>
              ) : paymentOrder.map((key, index) => {
                const method = paymentMethods[key];
                if (!method || key === '_order') return null;
                return (
                <PaymentMethodCard key={key}>
                  <div style={{ marginBottom: method.enabled ? '16px' : '0' }}>
                    {/* Header Row: Order buttons + Title on left, Checkboxes on right */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: method.enabled ? '16px' : '0',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <OrderControls
                          onMoveUp={() => movePaymentMethod(key, 'up')}
                          onMoveDown={() => movePaymentMethod(key, 'down')}
                          disableUp={index === 0}
                          disableDown={index === paymentOrder.length - 1}
                        />
                        <ToggleLabel>{method.label}</ToggleLabel>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        {/* POS Terminal Toggle - only for methods that can be used in POS */}
                        {!['counter', 'online'].includes(key) && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            fontSize: '13px',
                            fontWeight: '500',
                            color: method.availableIn?.includes('pos') ? '#0A2540' : '#6B7C93',
                            whiteSpace: 'nowrap'
                          }}>
                            POS
                          </span>
                          <ToggleSwitch>
                            <ToggleInput
                              type="checkbox"
                              checked={method.availableIn?.includes('pos') || false}
                              onChange={(e) => handlePaymentToggle(key, 'pos', e.target.checked)}
                            />
                            <ToggleSlider />
                          </ToggleSwitch>
                        </div>
                        )}

                        {/* Mobile Orders Toggle - only for methods that can be used in Mobile */}
                        {!['cash', 'card', 'staffMeal'].includes(key) && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            fontSize: '13px',
                            fontWeight: '500',
                            color: method.availableIn?.includes('mobile') ? '#0A2540' : '#6B7C93',
                            whiteSpace: 'nowrap'
                          }}>
                            Mobile
                          </span>
                          <ToggleSwitch>
                            <ToggleInput
                              type="checkbox"
                              checked={method.availableIn?.includes('mobile') || false}
                              onChange={(e) => handlePaymentToggle(key, 'mobile', e.target.checked)}
                            />
                            <ToggleSlider />
                          </ToggleSwitch>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card - POS only, no PG config needed (online payments use Online Payment method) */}

                  {/* E-Wallet Settings - QR Code Image */}
                  {key === 'ewallet' && method.enabled && (
                    <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px' }}>
                      <ImageUploadDropzone
                        value={method.qrImage || ''}
                        onChange={(base64) => handlePaymentSettingChange(key, 'qrImage', base64)}
                        label="E-Wallet QR Code"
                        helpText="Upload your e-wallet QR code image for customers to scan and make payment (TNG, GrabPay, Boost, etc.)"
                        changeButtonText="Change QR Code"
                        removeButtonText="Remove QR Code"
                        imageAltText="E-Wallet QR Code"
                      />
                    </div>
                  )}

                  {/* Bank Transfer Settings */}
                  {key === 'bankTransfer' && method.enabled && (
                    <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px' }}>
                      <FormGroup>
                        <Label>Bank Name</Label>
                        <Input
                          type="text"
                          placeholder="e.g., Maybank, CIMB, Public Bank"
                          value={method.bankName || ''}
                          onChange={(e) => handlePaymentSettingChange(key, 'bankName', e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Account Number</Label>
                        <Input
                          type="text"
                          placeholder="Enter Bank Account Number"
                          value={method.accountNumber || ''}
                          onChange={(e) => handlePaymentSettingChange(key, 'accountNumber', e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Account Name</Label>
                        <Input
                          type="text"
                          placeholder="Enter Account Holder Name"
                          value={method.accountName || ''}
                          onChange={(e) => handlePaymentSettingChange(key, 'accountName', e.target.value)}
                        />
                      </FormGroup>
                    </div>
                  )}

                  {/* Staff Meal Info */}
                  {key === 'staffMeal' && method.enabled && (
                    <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px' }}>
                      <div style={{ fontSize: '13px', color: '#6B7C93', lineHeight: '1.5' }}>
                        Staff meals are recorded at full price but excluded from revenue reports.
                        Use this in POS when processing staff meals to keep accurate records.
                      </div>
                    </div>
                  )}

                  {/* Online Payment Settings */}
                  {key === 'online' && method.enabled && (
                    <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px' }}>
                      <FormGroup>
                        <Label>Payment Provider</Label>
                        <Select
                          value={method.provider || 'stripe'}
                          onChange={(e) => handlePaymentSettingChange(key, 'provider', e.target.value)}
                        >
                          <option value="stripe">Stripe</option>
                          <option value="paypal">PayPal</option>
                          <option value="both">Both Stripe & PayPal</option>
                        </Select>
                      </FormGroup>

                      {(method.provider === 'stripe' || method.provider === 'both') && (
                        <>
                          <FormGroup>
                            <Label>Stripe Public Key</Label>
                            <Input
                              type="text"
                              placeholder="pk_live_..."
                              value={method.config?.stripePublicKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'stripePublicKey', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Stripe Secret Key</Label>
                            <Input
                              type="password"
                              placeholder="sk_live_..."
                              value={method.config?.stripeSecretKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'stripeSecretKey', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}

                      {(method.provider === 'paypal' || method.provider === 'both') && (
                        <>
                          <FormGroup>
                            <Label>PayPal Client ID</Label>
                            <Input
                              type="text"
                              placeholder="Enter PayPal Client ID"
                              value={method.config?.paypalClientId || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'paypalClientId', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>PayPal Client Secret</Label>
                            <Input
                              type="password"
                              placeholder="Enter PayPal Client Secret"
                              value={method.config?.paypalClientSecret || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'paypalClientSecret', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}
                    </div>
                  )}

                  {/* FPX removed - absorbed into Online Payment */}
                </PaymentMethodCard>
                );
              })}

              {paymentMethods && (
              <SaveButtonContainer>
                <SaveButton
                  onClick={async () => {
                    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
                    setAutoSaveStatus('saving');
                    if (saveCallbackRef.current) await saveCallbackRef.current();
                  }}
                  disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved'}
                >
                  {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
                </SaveButton>
              </SaveButtonContainer>
              )}
            </SettingsCard>
          )}

          {activeTab === 'company' && (
            <>
              <SettingsGrid>
                <SettingsCard>
                <CardTitle>Company Information</CardTitle>
                <FormGroup>
                  <Label>Company Name</Label>
                  <Input
                    type="text"
                    value={companySettings.name}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, name: e.target.value }));
                      markChanged();
                    }}
                    placeholder="Food Court Management Corp"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Business Registration</Label>
                  <Input
                    type="text"
                    value={companySettings.businessRegistration}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, businessRegistration: e.target.value }));
                      markChanged();
                    }}
                    placeholder="202301234567"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Tax ID</Label>
                  <Input
                    type="text"
                    value={companySettings.taxId}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, taxId: e.target.value }));
                      markChanged();
                    }}
                    placeholder="90-1234567"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Industry</Label>
                  <Input
                    type="text"
                    value={companySettings.industry}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, industry: e.target.value }));
                      markChanged();
                    }}
                    placeholder="Food Service Management"
                  />
                </FormGroup>

                <ImageUploadDropzone
                  value={companySettings.logo}
                  onChange={(base64) => {
                    setCompanySettings(prev => ({ ...prev, logo: base64 }));
                    markChanged();
                  }}
                  label="Company Logo"
                  helpText="Upload your company logo for branding and official documents"
                  changeButtonText="Change Logo"
                  removeButtonText="Remove Logo"
                  imageAltText="Company Logo"
                />
              </SettingsCard>
              <SettingsCard>
                <CardTitle>Contact Information</CardTitle>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    value={companySettings.phone}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, phone: e.target.value }));
                      markChanged();
                    }}
                    placeholder="+60 3-2123-4567"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={companySettings.email}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, email: e.target.value }));
                      markChanged();
                    }}
                    placeholder="admin@foodcourtmanagement.com"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Website</Label>
                  <Input
                    type="url"
                    value={companySettings.website}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, website: e.target.value }));
                      markChanged();
                    }}
                    placeholder="www.foodcourtmanagement.com"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Address</Label>
                  <Input
                    type="text"
                    value={companySettings.address}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, address: e.target.value }));
                      markChanged();
                    }}
                    placeholder="123 Business District"
                  />
                </FormGroup>
              </SettingsCard>
              </SettingsGrid>

              <SaveButtonContainer>
                <SaveButton
                  onClick={async () => {
                    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
                    setAutoSaveStatus('saving');
                    if (saveCallbackRef.current) await saveCallbackRef.current();
                  }}
                  disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved'}
                >
                  {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
                </SaveButton>
              </SaveButtonContainer>
            </>
          )}
          {activeTab === 'brands' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#0A2540' }}>Brand Management</h3>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {!isDefaultTheme && user?.role === 'Restaurant Admin' && (
                      <ThemedButton variant="outline" size="small" onClick={resetTheme}>
                        Reset Theme
                      </ThemedButton>
                    )}
                    {user?.role === 'Restaurant Admin' ? (
                      <ThemedButton onClick={() => alert('Add Brand functionality coming soon')}>
                        Add Brand
                      </ThemedButton>
                    ) : (
                      <Button onClick={() => alert('Add Brand functionality coming soon')}>
                        Add Brand
                      </Button>
                    )}
                  </div>
                </div>
                {!isDefaultTheme && user?.role === 'Restaurant Admin' && (
                  <div style={{
                    background: 'rgba(196, 181, 253, 0.2)',
                    border: '1px solid var(--brand-primary, #8B5CF6)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: 'var(--brand-primary, #8B5CF6)'
                  }}>
                    🎨 Theme preview is active. Changes will apply to restaurant management pages.
                  </div>
                )}
              </div>
              {brandSettings.brands.map(brand => (
                <SettingsCard key={brand.id} style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <CardTitle>{brand.name}</CardTitle>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        background: brand.isActive ? '#ECFDF5' : '#FEF2F2',
                        color: brand.isActive ? '#059669' : '#DC2626'
                      }}>
                        {brand.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        fontWeight: '500',
                        background: '#F3F4F6',
                        color: '#6B7280'
                      }}>
                        {brand.restaurantCount} Restaurant{brand.restaurantCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {user?.role === 'Restaurant Admin' ? (
                        <>
                          <ThemedButton 
                            variant="outline" 
                            size="small"
                            onClick={() => setTheme({
                              primaryColor: brand.primaryColor,
                              secondaryColor: brand.secondaryColor,
                              accentColor: brand.accentColor,
                              logo: brand.logo
                            })}
                          >
                            Preview Theme
                          </ThemedButton>
                          <ThemedButton size="small">Edit</ThemedButton>
                        </>
                      ) : (
                        <>
                          <Button 
                            onClick={() => setTheme({
                              primaryColor: brand.primaryColor,
                              secondaryColor: brand.secondaryColor,
                              accentColor: brand.accentColor,
                              logo: brand.logo
                            })}
                          >
                            Preview Theme
                          </Button>
                          <Button>Edit</Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <p style={{ color: '#6B7280', marginBottom: '20px', fontSize: '14px' }}>{brand.description}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <FormGroup>
                      <Label>Primary Color</Label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="color" 
                          value={brand.primaryColor} 
                          style={{ width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                          onChange={(e) => {
                            const newBrands = brandSettings.brands.map(b => 
                              b.id === brand.id ? { ...b, primaryColor: e.target.value } : b
                            );
                            setBrandSettings({ brands: newBrands });
                            markChanged();
                          }}
                        />
                        <Input value={brand.primaryColor} style={{ width: '100px' }} readOnly />
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label>Secondary Color</Label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="color" 
                          value={brand.secondaryColor} 
                          style={{ width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                          onChange={(e) => {
                            const newBrands = brandSettings.brands.map(b => 
                              b.id === brand.id ? { ...b, secondaryColor: e.target.value } : b
                            );
                            setBrandSettings({ brands: newBrands });
                            markChanged();
                          }}
                        />
                        <Input value={brand.secondaryColor} style={{ width: '100px' }} readOnly />
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Label>Accent Color</Label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="color" 
                          value={brand.accentColor} 
                          style={{ width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                          onChange={(e) => {
                            const newBrands = brandSettings.brands.map(b => 
                              b.id === brand.id ? { ...b, accentColor: e.target.value } : b
                            );
                            setBrandSettings({ brands: newBrands });
                            markChanged();
                          }}
                        />
                        <Input value={brand.accentColor} style={{ width: '100px' }} readOnly />
                      </div>
                    </FormGroup>
                  </div>

                  <ImageUploadDropzone
                    value={brand.logo}
                    onChange={(base64) => {
                      const newBrands = brandSettings.brands.map(b =>
                        b.id === brand.id ? { ...b, logo: base64 } : b
                      );
                      setBrandSettings({ brands: newBrands });
                      markChanged();
                    }}
                    label="Brand Logo"
                    helpText={`Upload logo for ${brand.name} brand`}
                    changeButtonText="Change Brand Logo"
                    removeButtonText="Remove Brand Logo"
                    imageAltText="Brand Logo"
                  />

                  <div>
                    <Label>Connected Restaurants ({brand.restaurants.length})</Label>
                    <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '16px' }}>
                      {brand.restaurants.length > 0 ? (
                        <div style={{ display: 'grid', gap: '8px' }}>
                          {brand.restaurants.map(restaurant => (
                            <div key={restaurant.id} style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between', 
                              alignItems: 'center',
                              padding: '8px 12px',
                              background: 'white',
                              borderRadius: '6px',
                              border: `2px solid ${brand.primaryColor}20`
                            }}>
                              <div>
                                <div style={{ fontWeight: '600', fontSize: '14px', color: '#0A2540' }}>
                                  {restaurant.name}
                                </div>
                                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                                  {restaurant.branchName} • {restaurant.location}
                                </div>
                              </div>
                              <div style={{ 
                                width: '12px', 
                                height: '12px', 
                                borderRadius: '50%', 
                                background: brand.primaryColor 
                              }}></div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: '#6B7280', textAlign: 'center', margin: '20px 0' }}>No restaurants connected to this brand</p>
                      )}
                    </div>
                  </div>
                </SettingsCard>
              ))}

              <SaveButtonContainer>
                <SaveButton
                  onClick={async () => {
                    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
                    setAutoSaveStatus('saving');
                    if (saveCallbackRef.current) await saveCallbackRef.current();
                  }}
                  disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved'}
                >
                  {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
                </SaveButton>
              </SaveButtonContainer>
            </div>
          )}
          {activeTab === 'billing' && (
            <>
              <SettingsGrid>
                <SettingsCard>
                <CardTitle>Subscription Overview</CardTitle>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '500' }}>Current Plan</span>
                    <span style={{ 
                      padding: '4px 12px', 
                      background: '#ECFDF5', 
                      color: '#059669', 
                      borderRadius: '6px', 
                      fontSize: '14px', 
                      fontWeight: '600'
                    }}>Enterprise</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#6B7280' }}>Monthly Fee</span>
                    <span style={{ fontWeight: '600' }}>RM 299.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#6B7280' }}>Next Billing Date</span>
                    <span>January 15, 2025</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6B7280' }}>Active Restaurants</span>
                    <span>12 / 15</span>
                  </div>
                </div>
                <Button onClick={() => alert('Billing management functionality coming soon')}>Manage Billing</Button>
              </SettingsCard>
              <SettingsCard>
                <CardTitle>Usage Statistics</CardTitle>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ color: '#6B7280' }}>Total Orders (This Month)</span>
                    <span style={{ fontWeight: '600', fontSize: '18px' }}>8,945</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ color: '#6B7280' }}>Total Revenue (This Month)</span>
                    <span style={{ fontWeight: '600', fontSize: '18px' }}>RM 145,230</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ color: '#6B7280' }}>Active Staff Members</span>
                    <span style={{ fontWeight: '600' }}>87</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6B7280' }}>Storage Used</span>
                    <span style={{ fontWeight: '600' }}>2.4 GB / 10 GB</span>
                  </div>
                </div>
              </SettingsCard>
              </SettingsGrid>

              <SaveButtonContainer>
                <SaveButton
                  onClick={async () => {
                    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
                    setAutoSaveStatus('saving');
                    if (saveCallbackRef.current) await saveCallbackRef.current();
                  }}
                  disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved'}
                >
                  {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
                </SaveButton>
              </SaveButtonContainer>
            </>
          )}
          {activeTab === 'store' && (
            <>
              <SettingsGrid>
                <SettingsCard>
                  <CardTitle>Basic Information</CardTitle>
                <FormGroup>
                  <Label>Store Name</Label>
                  <Input 
                    type="text" 
                    value={storeSettings.name}
                    onChange={(e) => {
                      setStoreSettings(prev => ({ ...prev, name: e.target.value }));
                      markChanged();
                    }}
                    placeholder="FOODCOURT CENTRAL" 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Business Registration</Label>
                  <Input 
                    type="text" 
                    value={storeSettings.businessRegistration}
                    onChange={(e) => {
                      setStoreSettings(prev => ({ ...prev, businessRegistration: e.target.value }));
                      markChanged();
                    }}
                    placeholder="123456789" 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Tax No</Label>
                  <Input
                    type="text"
                    value={storeSettings.gstRegNo}
                    onChange={(e) => {
                      setStoreSettings(prev => ({ ...prev, gstRegNo: e.target.value }));
                      markChanged();
                    }}
                    placeholder="Enter tax registration number (optional)"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <PhoneInput
                    value={storeSettings.phone}
                    onChange={(value) => {
                      setStoreSettings(prev => ({ ...prev, phone: value }));
                      markChanged();
                    }}
                    defaultCountry={storeSettings.country}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) => {
                      setStoreSettings(prev => ({ ...prev, email: e.target.value }));
                      markChanged();
                    }}
                    placeholder="contact@foodcourt.com"
                  />
                </FormGroup>

                <ImageUploadDropzone
                  value={storeSettings.logo}
                  onChange={(base64) => {
                    setStoreSettings(prev => ({ ...prev, logo: base64 }));
                    markChanged();
                  }}
                  label="Brand Logo"
                  helpText="Upload your restaurant's brand logo for use in mobile orders and customer displays"
                  changeButtonText="Change Logo"
                  removeButtonText="Remove Logo"
                  imageAltText="Brand Logo"
                />
              </SettingsCard>

              <SettingsCard>
                <CardTitle>Location</CardTitle>
                <FormGroup>
                  <Label>Address</Label>
                  <Input 
                    type="text" 
                    value={storeSettings.address}
                    onChange={(e) => {
                      setStoreSettings(prev => ({ ...prev, address: e.target.value }));
                      markChanged();
                    }}
                    placeholder="123 Main Street, City Center" 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>City</Label>
                  <Input 
                    type="text" 
                    value={storeSettings.city}
                    onChange={(e) => {
                      setStoreSettings(prev => ({ ...prev, city: e.target.value }));
                      markChanged();
                    }}
                    placeholder="Kuala Lumpur" 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>State</Label>
                  <Input 
                    type="text" 
                    value={storeSettings.state}
                    onChange={(e) => {
                      setStoreSettings(prev => ({ ...prev, state: e.target.value }));
                      markChanged();
                    }}
                    placeholder="Wilayah Persekutuan" 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Postal Code</Label>
                  <Input
                    type="text"
                    value={storeSettings.postalCode}
                    onChange={(e) => {
                      setStoreSettings(prev => ({ ...prev, postalCode: e.target.value }));
                      markChanged();
                    }}
                    placeholder="50000"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Country</Label>
                  <Select
                    value={storeSettings.country}
                    onChange={(e) => {
                      const newCountry = e.target.value;
                      setStoreSettings(prev => ({ ...prev, country: newCountry }));
                      // 국가 변경 시 타임존도 자동 업데이트
                      const countryInfo = COUNTRIES.find(c => c.code === newCountry);
                      if (countryInfo) {
                        setOperationSettings(prev => ({ ...prev, timeZone: countryInfo.timezone }));
                      }
                      markChanged();
                    }}
                  >
                    {COUNTRIES.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </Select>
                </FormGroup>
              </SettingsCard>
              </SettingsGrid>

              {/* Brand (read-only) */}
              {brandInfo.brand_id && (
                <SettingsCard style={{ marginTop: '24px' }}>
                  <CardTitle>Brand</CardTitle>
                  <FormGroup>
                    <div style={{
                      padding: '10px 12px',
                      background: '#F6F9FC',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#0A2540',
                      border: '1px solid #E6EBF1'
                    }}>
                      {brandInfo.brand_name || '-'}
                    </div>
                  </FormGroup>
                </SettingsCard>
              )}

              <SaveButtonContainer>
                <SaveButton
                  onClick={async () => {
                    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
                    setAutoSaveStatus('saving');
                    if (saveCallbackRef.current) await saveCallbackRef.current();
                  }}
                  disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved'}
                >
                  {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
                </SaveButton>
              </SaveButtonContainer>
            </>
          )}

          {activeTab === 'operations' && (
            <>
              <SettingsGrid>
                <SettingsCard>
                <CardTitle>Operating Hours</CardTitle>
                <FormGroup>
                  <Label>Opening Time</Label>
                  <Input 
                    type="time" 
                    value={operationSettings.openingTime}
                    onChange={(e) => {
                      setOperationSettings(prev => ({ ...prev, openingTime: e.target.value }));
                      markChanged();
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Closing Time</Label>
                  <Input 
                    type="time" 
                    value={operationSettings.closingTime}
                    onChange={(e) => {
                      setOperationSettings(prev => ({ ...prev, closingTime: e.target.value }));
                      markChanged();
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Time Zone</Label>
                  <Select 
                    value={operationSettings.timeZone}
                    onChange={(e) => {
                      setOperationSettings(prev => ({ ...prev, timeZone: e.target.value }));
                      markChanged();
                    }}
                  >
                    <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur (GMT+8)</option>
                    <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                    <option value="Asia/Jakarta">Asia/Jakarta (GMT+7)</option>
                  </Select>
                </FormGroup>
              </SettingsCard>

              <SettingsCard>
                <CardTitle>Break Times</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                  Set break times when orders cannot be picked up
                </p>
                {(operationSettings.breakTimes || []).map((breakTime, index) => (
                  <div key={breakTime.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                    padding: '12px',
                    background: '#F8FAFC',
                    borderRadius: '8px'
                  }}>
                    <Input
                      type="time"
                      value={breakTime.start}
                      onChange={(e) => {
                        const newBreakTimes = [...operationSettings.breakTimes];
                        newBreakTimes[index] = { ...newBreakTimes[index], start: e.target.value };
                        setOperationSettings(prev => ({ ...prev, breakTimes: newBreakTimes }));
                        markChanged();
                      }}
                      style={{ flex: 1 }}
                    />
                    <span style={{ color: '#6B7C93' }}>to</span>
                    <Input
                      type="time"
                      value={breakTime.end}
                      onChange={(e) => {
                        const newBreakTimes = [...operationSettings.breakTimes];
                        newBreakTimes[index] = { ...newBreakTimes[index], end: e.target.value };
                        setOperationSettings(prev => ({ ...prev, breakTimes: newBreakTimes }));
                        markChanged();
                      }}
                      style={{ flex: 1 }}
                    />
                    <button
                      onClick={() => {
                        const newBreakTimes = operationSettings.breakTimes.filter((_, i) => i !== index);
                        setOperationSettings(prev => ({ ...prev, breakTimes: newBreakTimes }));
                        markChanged();
                      }}
                      style={{
                        padding: '8px 12px',
                        background: '#FEE2E2',
                        color: '#DC2626',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newBreakTime: BreakTime = {
                      id: Date.now().toString(),
                      start: '14:00',
                      end: '15:00'
                    };
                    setOperationSettings(prev => ({
                      ...prev,
                      breakTimes: [...(prev.breakTimes || []), newBreakTime]
                    }));
                    markChanged();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    background: 'white',
                    color: '#635BFF',
                    border: '1px dashed #635BFF',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  Add Break Time
                </button>
              </SettingsCard>

              <SettingsCard>
                <CardTitle>Order Settings</CardTitle>
                <FormGroup>
                  <Label>Order Number Reset</Label>
                  <Select 
                    value={operationSettings.orderNumberReset}
                    onChange={(e) => {
                      setOperationSettings(prev => ({ ...prev, orderNumberReset: e.target.value as any }));
                      markChanged();
                    }}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="never">Never</option>
                  </Select>
                </FormGroup>
                <FormGroup>
                  <Label>Default Preparation Time</Label>
                  <FeeInput 
                    type="number" 
                    value={operationSettings.defaultPreparationTime}
                    onChange={(e) => {
                      setOperationSettings(prev => ({ ...prev, defaultPreparationTime: Number(e.target.value) }));
                      markChanged();
                    }}
                  />
                  <span style={{ color: '#6B7C93', fontSize: '14px' }}>minutes</span>
                </FormGroup>
              </SettingsCard>

              <SettingsCard>
                <CardTitle>Tax & Service Charge</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                  Configure tax and service charge applied to orders
                </p>
                <Toggle>
                  <ToggleLabel>Tax</ToggleLabel>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={operationSettings.taxEnabled}
                      onChange={(e) => {
                        setOperationSettings(prev => ({
                          ...prev,
                          taxEnabled: e.target.checked
                        }));
                        markChanged();
                      }}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </Toggle>

                {operationSettings.taxEnabled && (
                  <FormGroup style={{ marginLeft: '16px', marginTop: '8px' }}>
                    <Label>Tax Rate (%)</Label>
                    <FeeInput
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={operationSettings.taxRate}
                      onChange={(e) => {
                        setOperationSettings(prev => ({ ...prev, taxRate: Number(e.target.value) }));
                        markChanged();
                      }}
                    />
                    <span style={{ color: '#6B7C93', fontSize: '14px' }}>%</span>
                  </FormGroup>
                )}

                <Divider />

                <Toggle>
                  <ToggleLabel>Service Charge</ToggleLabel>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={operationSettings.serviceChargeEnabled}
                      onChange={(e) => {
                        setOperationSettings(prev => ({
                          ...prev,
                          serviceChargeEnabled: e.target.checked
                        }));
                        markChanged();
                      }}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </Toggle>

                {operationSettings.serviceChargeEnabled && (
                  <FormGroup style={{ marginLeft: '16px', marginTop: '8px' }}>
                    <Label>Service Charge Rate (%)</Label>
                    <FeeInput
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={operationSettings.serviceChargeRate}
                      onChange={(e) => {
                        setOperationSettings(prev => ({ ...prev, serviceChargeRate: Number(e.target.value) }));
                        markChanged();
                      }}
                    />
                    <span style={{ color: '#6B7C93', fontSize: '14px' }}>%</span>
                  </FormGroup>
                )}
              </SettingsCard>

              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>Currency & Rounding Settings</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '24px', fontSize: '14px' }}>
                  Configure currency and cash rounding for payments
                </p>

                <FormGroup>
                  <Label>Currency</Label>
                  <Select
                    value={currencySettings.currency}
                    onChange={(e) => {
                      setCurrencySettings(prev => ({ ...prev, currency: e.target.value }));
                      markChanged();
                    }}
                  >
                    {(() => {
                      const allCurrencies: Record<string, string> = {
                        'MYR': 'Malaysian Ringgit (RM)',
                        'RM': 'Malaysian Ringgit (RM)',
                        'USD': 'US Dollar ($)',
                        'SGD': 'Singapore Dollar (S$)',
                        'JPY': 'Japanese Yen (¥)',
                        'THB': 'Thai Baht (฿)',
                        'KRW': 'Korean Won (₩)',
                        'EUR': 'Euro (€)',
                        'GBP': 'British Pound (£)',
                        'AUD': 'Australian Dollar (A$)',
                        'CNY': 'Chinese Yuan (¥)',
                        'INR': 'Indian Rupee (₹)',
                        'PHP': 'Philippine Peso (₱)',
                        'VND': 'Vietnamese Dong (₫)',
                        'IDR': 'Indonesian Rupiah (Rp)',
                        'TWD': 'Taiwan Dollar (NT$)',
                        'HKD': 'Hong Kong Dollar (HK$)'
                      };
                      const currencies = supportedCurrencies.length > 0
                        ? supportedCurrencies
                        : Object.keys(allCurrencies);
                      const seen = new Set<string>();
                      return currencies.map(code => {
                        const displayCode = code === 'MYR' ? 'RM' : code;
                        if (seen.has(displayCode)) return null;
                        seen.add(displayCode);
                        return (
                          <option key={displayCode} value={displayCode}>
                            {allCurrencies[code] || code}
                          </option>
                        );
                      });
                    })()}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Cash Rounding</Label>
                  <Select
                    value={currencySettings.cashRounding !== null ? currencySettings.cashRounding.toFixed(2) : ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : null;
                      setCurrencySettings(prev => ({ ...prev, cashRounding: value }));
                      markChanged();
                    }}
                  >
                    <option value="">Disabled (No Rounding)</option>
                    <option value="0.05">0.05 (5 sen/cent)</option>
                    <option value="0.10">0.10 (10 sen/cent)</option>
                    <option value="0.50">0.50 (50 sen/cent)</option>
                    <option value="1.00">1.00 (1 dollar/ringgit)</option>
                  </Select>
                  <HelpText>Round total amount to nearest value (e.g., RM 12.52 → RM 12.50 with 0.05 rounding)</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>Apply Rounding To</Label>
                  <Select
                    value={currencySettings.roundingApplyTo}
                    onChange={(e) => {
                      setCurrencySettings(prev => ({ ...prev, roundingApplyTo: e.target.value as 'cash_only' | 'all' }));
                      markChanged();
                    }}
                    disabled={!currencySettings.cashRounding}
                  >
                    <option value="cash_only">Cash Payments Only</option>
                    <option value="all">All Payments</option>
                  </Select>
                  <HelpText>Choose whether to apply rounding to cash only or all payment methods</HelpText>
                </FormGroup>
              </SettingsCard>

              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>Takeaway Pricing Settings</CardTitle>
                <Toggle>
                  <ToggleLabel>Enable Takeaway Charges</ToggleLabel>
                  <ToggleSwitch>
                    <ToggleInput 
                      type="checkbox" 
                      checked={operationSettings.takeawayPricing.enabled}
                      onChange={(e) => {
                        setOperationSettings(prev => ({
                          ...prev,
                          takeawayPricing: { ...prev.takeawayPricing, enabled: e.target.checked }
                        }));
                        markChanged();
                      }}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </Toggle>
                
                {operationSettings.takeawayPricing.enabled && (
                  <>
                    <Divider />
                    <FormGroup>
                      <Label>Pricing Type</Label>
                      <Select 
                        value={operationSettings.takeawayPricing.pricingType}
                        onChange={(e) => {
                          setOperationSettings(prev => ({
                            ...prev,
                            takeawayPricing: { ...prev.takeawayPricing, pricingType: e.target.value as any }
                          }));
                          markChanged();
                        }}
                      >
                        <option value="per-item">Per Item (Fixed charge per item)</option>
                        <option value="per-category">Per Category (Different charges by category)</option>
                      </Select>
                    </FormGroup>
                    
                    {operationSettings.takeawayPricing.pricingType === 'per-item' ? (
                      <FormGroup>
                        <Label>Charge Per Item</Label>
                        <FeeInput 
                          type="number" 
                          step="0.10"
                          value={operationSettings.takeawayPricing.perItemCharge}
                          onChange={(e) => {
                            setOperationSettings(prev => ({
                              ...prev,
                              takeawayPricing: { ...prev.takeawayPricing, perItemCharge: Number(e.target.value) }
                            }));
                            markChanged();
                          }}
                        />
                        <span style={{ color: '#6B7C93', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                        <HelpText>This amount will be added to each item for takeaway orders</HelpText>
                      </FormGroup>
                    ) : (
                      <>
                        <Label style={{ marginBottom: '16px' }}>Category Charges</Label>
                        <SettingsGrid>
                          {categories.map(category => (
                            <FormGroup key={category.id}>
                              <Label>{category.emoji} {category.name}</Label>
                              <FeeInput
                                type="number"
                                step="0.10"
                                value={operationSettings.takeawayPricing.categoryCharges[category.id.toLowerCase()] || 0}
                                onChange={(e) => {
                                  setOperationSettings(prev => ({
                                    ...prev,
                                    takeawayPricing: {
                                      ...prev.takeawayPricing,
                                      categoryCharges: {
                                        ...prev.takeawayPricing.categoryCharges,
                                        [category.id.toLowerCase()]: Number(e.target.value)
                                      }
                                    }
                                  }));
                                  markChanged();
                                }}
                              />
                              <span style={{ color: '#6B7C93', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                            </FormGroup>
                          ))}
                        </SettingsGrid>
                        <HelpText>These amounts will be added to items based on their category for takeaway orders</HelpText>
                      </>
                    )}
                  </>
                )}
              </SettingsCard>

              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>Pager System Settings</CardTitle>
                <Toggle>
                  <ToggleLabel>Enable Pager System</ToggleLabel>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={operationSettings?.pagerSystem?.enabled || false}
                      onChange={(e) => {
                        setOperationSettings(prev => ({
                          ...prev,
                          pagerSystem: {
                            enabled: e.target.checked,
                            totalPagers: prev?.pagerSystem?.totalPagers || 50
                          }
                        }));
                        markChanged();
                      }}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </Toggle>

                {operationSettings?.pagerSystem?.enabled && (
                  <>
                    <Divider />
                    <FormGroup>
                      <Label>Total Number of Pagers</Label>
                      <Input
                        type="number"
                        min="1"
                        max="999"
                        value={operationSettings?.pagerSystem?.totalPagers || 50}
                        onChange={(e) => {
                          setOperationSettings(prev => ({
                            ...prev,
                            pagerSystem: {
                              enabled: prev?.pagerSystem?.enabled || false,
                              totalPagers: Number(e.target.value)
                            }
                          }));
                          markChanged();
                        }}
                      />
                    </FormGroup>
                    <HelpText>
                      Set the total number of pager devices available in your restaurant.
                      The POS Terminal will allow staff to assign pager numbers to orders.
                    </HelpText>
                  </>
                )}
              </SettingsCard>

              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>Table Management</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                  Configure table numbers, QR codes, and customer seating options for your restaurant.
                </p>
                <SettingsGrid>
                  <div>
                    <FormGroup>
                      <Toggle>
                        <ToggleLabel>Enable Table Numbers</ToggleLabel>
                        <ToggleSwitch>
                          <ToggleInput type="checkbox" checked={tableSettings.enableTableNumbers}
                            onChange={(e) => { setTableSettings({...tableSettings, enableTableNumbers: e.target.checked}); markChanged(); }} />
                          <ToggleSlider />
                        </ToggleSwitch>
                      </Toggle>
                      <HelpText>Allow customers to select table numbers when ordering</HelpText>
                    </FormGroup>
                    <FormGroup>
                      <Toggle>
                        <ToggleLabel>Table Number Required</ToggleLabel>
                        <ToggleSwitch>
                          <ToggleInput type="checkbox" checked={tableSettings.tableNumberRequired}
                            onChange={(e) => { setTableSettings({...tableSettings, tableNumberRequired: e.target.checked}); markChanged(); }}
                            disabled={!tableSettings.enableTableNumbers} />
                          <ToggleSlider />
                        </ToggleSwitch>
                      </Toggle>
                      <HelpText>Make table number selection mandatory for dine-in orders</HelpText>
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup>
                      <Label>Table Prefix</Label>
                      <Input type="text" value={tableSettings.tablePrefix}
                        onChange={(e) => { setTableSettings({...tableSettings, tablePrefix: e.target.value}); markChanged(); }}
                        placeholder="e.g., T, TABLE" />
                      <HelpText>Prefix for table numbers (e.g., T001, TABLE001)</HelpText>
                    </FormGroup>
                    <FormGroup>
                      <Label>Number of Tables</Label>
                      <Input type="number" value={tableSettings.totalTables}
                        onChange={(e) => { setTableSettings({...tableSettings, totalTables: parseInt(e.target.value) || 1}); markChanged(); }}
                        min="1" max="999" />
                    </FormGroup>
                  </div>
                </SettingsGrid>
                <FormGroup>
                  <Label>QR Code Base URL</Label>
                  <Input type="text" value={tableSettings.qrCodeBaseUrl}
                    onChange={(e) => { setTableSettings({...tableSettings, qrCodeBaseUrl: e.target.value}); markChanged(); }}
                    placeholder="https://yourdomain.com" />
                  <HelpText>Base URL for QR codes (usually your domain)</HelpText>
                </FormGroup>

                {/* QR Code Mode */}
                <FormGroup>
                  <Label>QR Code Mode</Label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid ' + (tableSettings.qrMode === 'static' ? '#635BFF' : '#E6EBF1'), borderRadius: '8px', cursor: 'pointer', background: tableSettings.qrMode === 'static' ? '#F0F0FF' : 'white', flex: 1 }}>
                      <input type="radio" name="qrMode" value="static" checked={tableSettings.qrMode === 'static'} onChange={() => { setTableSettings({...tableSettings, qrMode: 'static'}); markChanged(); }} />
                      <div>
                        <div style={{ fontWeight: 500 }}>Static</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>Permanent QR, no expiration</div>
                      </div>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid ' + (tableSettings.qrMode === 'session' ? '#635BFF' : '#E6EBF1'), borderRadius: '8px', cursor: 'pointer', background: tableSettings.qrMode === 'session' ? '#F0F0FF' : 'white', flex: 1 }}>
                      <input type="radio" name="qrMode" value="session" checked={tableSettings.qrMode === 'session'} onChange={() => { setTableSettings({...tableSettings, qrMode: 'session'}); markChanged(); }} />
                      <div>
                        <div style={{ fontWeight: 500 }}>Session</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>Expiring QR, generated per visit</div>
                      </div>
                    </label>
                  </div>
                </FormGroup>

                {tableSettings.qrMode === 'session' && (
                  <FormGroup>
                    <Label>QR Expiration Time (hours)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="24"
                      value={Math.round(tableSettings.qrExpirationMinutes / 60)}
                      onChange={(e) => { setTableSettings({...tableSettings, qrExpirationMinutes: parseInt(e.target.value) * 60 || 180}); markChanged(); }}
                    />
                    <HelpText>QR codes expire automatically after this time</HelpText>
                  </FormGroup>
                )}
                {tableSettings.qrMode === 'static' && (
                <>
                <button onClick={handleGenerateQRCodes}
                  style={{ padding: '10px 20px', background: '#E6EBF1', color: '#0A2540', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s', marginTop: '16px' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#D1D5DB'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#E6EBF1'; }}>
                  Generate QR Codes
                </button>
                <Divider />
                <div style={{ marginTop: '24px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540', marginBottom: '16px' }}>Table QR Codes</h4>
                  <TablesGrid>
                    {tables.map(table => {
                      const tableNumber = `${tableSettings.tablePrefix}${String(table.number).padStart(3, '0')}`;
                      return (
                        <TableItem key={table.id}>
                          <TableNumber>{tableNumber}</TableNumber>
                          <QRContainer>
                            <QRCodeCanvas id={`qr-${table.id}`} value={table.qrCode} size={100} level="H" includeMargin={true} style={{ display: 'none' }} />
                            <QRCodeSVG id={`qr-svg-${table.id}`} value={table.qrCode} size={100} level="H" includeMargin={true} />
                          </QRContainer>
                          <TableActions>
                            <ActionButton onClick={() => handleDownloadSVG(table)} title="Download SVG (recommended for print)">SVG</ActionButton>
                            <ActionButton onClick={() => handleDownloadQR(table)} title="Download PNG">PNG</ActionButton>
                            <ActionButton onClick={() => handlePrintQR(table)}>Print</ActionButton>
                          </TableActions>
                        </TableItem>
                      );
                    })}
                  </TablesGrid>
                </div>
                </>
                )}
                {tableSettings.qrMode === 'session' && (
                  <div style={{ marginTop: '24px', padding: '16px', background: '#F0F0FF', borderRadius: '8px', color: '#635BFF', fontSize: '14px' }}>
                    Session mode is active. QR codes are generated per visit from the <strong>Floor Plan</strong> page.
                  </div>
                )}
              </SettingsCard>

              </SettingsGrid>

              <SaveButtonContainer>
                <SaveButton
                  onClick={async () => {
                    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
                    setAutoSaveStatus('saving');
                    if (saveCallbackRef.current) await saveCallbackRef.current();
                  }}
                  disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved'}
                >
                  {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
                </SaveButton>
              </SaveButtonContainer>
            </>
          )}

          {activeTab === 'mobileOrder' && (
            <>
              <SettingsGrid>
                <SettingsCard>
                  <CardTitle>Order Types</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                    Enable or disable order types for mobile ordering
                  </p>
                  <Toggle>
                    <ToggleLabel>Dine In</ToggleLabel>
                    <ToggleSwitch>
                      <ToggleInput type="checkbox" checked={operationSettings.orderTypes?.dineIn ?? true}
                        onChange={(e) => { setOperationSettings(prev => ({ ...prev, orderTypes: { ...prev.orderTypes, dineIn: e.target.checked } })); markChanged(); }} />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>
                  <Toggle>
                    <ToggleLabel>Takeaway</ToggleLabel>
                    <ToggleSwitch>
                      <ToggleInput type="checkbox" checked={operationSettings.orderTypes?.takeaway ?? true}
                        onChange={(e) => { setOperationSettings(prev => ({ ...prev, orderTypes: { ...prev.orderTypes, takeaway: e.target.checked } })); markChanged(); }} />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>
                  <Toggle>
                    <ToggleLabel>Pre-order Pickup</ToggleLabel>
                    <ToggleSwitch>
                      <ToggleInput type="checkbox" checked={operationSettings.orderTypes?.pickup ?? false}
                        onChange={(e) => { setOperationSettings(prev => ({ ...prev, orderTypes: { ...prev.orderTypes, pickup: e.target.checked } })); markChanged(); }} />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>
                  <Toggle>
                    <ToggleLabel>Delivery</ToggleLabel>
                    <ToggleSwitch>
                      <ToggleInput type="checkbox" checked={operationSettings.orderTypes?.delivery ?? false}
                        onChange={(e) => { setOperationSettings(prev => ({ ...prev, orderTypes: { ...prev.orderTypes, delivery: e.target.checked } })); markChanged(); }} />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>
                </SettingsCard>

                <SettingsCard>
                  <CardTitle>Quick Order</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                    Allow customers to order without providing contact information
                  </p>
                  <Toggle>
                    <ToggleLabel>
                      <span>Allow Quick Order</span>
                      <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 400, marginLeft: '8px' }}>(No customer info required)</span>
                    </ToggleLabel>
                    <ToggleSwitch>
                      <ToggleInput type="checkbox" checked={operationSettings.allowQuickOrder !== false}
                        onChange={(e) => { setOperationSettings(prev => ({ ...prev, allowQuickOrder: e.target.checked })); markChanged(); }} />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>
                  <p style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '8px' }}>
                    {operationSettings.allowQuickOrder !== false
                      ? 'Customers can place orders without entering their name or phone number'
                      : 'Customers must sign in as Guest or Member to place an order'}
                  </p>
                </SettingsCard>

                <SettingsCard>
                  <CardTitle>Display Options</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                    Control which sections appear on the mobile menu
                  </p>
                  <Toggle>
                    <ToggleLabel>Show Featured Menu</ToggleLabel>
                    <ToggleSwitch>
                      <ToggleInput type="checkbox" checked={mobileSettings.show_featured}
                        onChange={(e) => { setMobileSettings(prev => ({ ...prev, show_featured: e.target.checked })); markChanged(); }} />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>
                  <p style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '4px', marginBottom: '12px' }}>
                    Display recommended items in a dedicated tab (set in Menu Management)
                  </p>
                  <Toggle>
                    <ToggleLabel>Show Popular Menu</ToggleLabel>
                    <ToggleSwitch>
                      <ToggleInput type="checkbox" checked={mobileSettings.show_popular}
                        onChange={(e) => { setMobileSettings(prev => ({ ...prev, show_popular: e.target.checked })); markChanged(); }} />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>
                  <p style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '4px' }}>
                    Show best-selling items based on recent order history
                  </p>
                </SettingsCard>

                {mobileSettings.show_popular && categories.length > 0 && (
                  <SettingsCard>
                    <CardTitle>Popular Menu Categories</CardTitle>
                    <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                      Turn off categories you don't want in the Popular section
                    </p>
                    {categories.map((cat: any) => {
                      const isExcluded = mobileSettings.popular_excluded_category_ids.includes(cat.id);
                      return (
                        <Toggle key={cat.id}>
                          <ToggleLabel style={{ fontSize: '13px' }}>{cat.emoji || '🍽️'} {cat.name}</ToggleLabel>
                          <ToggleSwitch>
                            <ToggleInput type="checkbox" checked={!isExcluded}
                              onChange={(e) => {
                                setMobileSettings(prev => {
                                  const ids = prev.popular_excluded_category_ids.filter(id => id !== cat.id);
                                  if (!e.target.checked) ids.push(cat.id);
                                  return { ...prev, popular_excluded_category_ids: ids };
                                });
                                markChanged();
                              }} />
                            <ToggleSlider />
                          </ToggleSwitch>
                        </Toggle>
                      );
                    })}
                  </SettingsCard>
                )}

                <SettingsCard>
                  <CardTitle>Category Time Restrictions</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                    Restrict specific categories to certain hours on mobile order only. Categories without a schedule are always visible.
                  </p>
                  {(mobileSettings.category_schedules || []).map((sched, index) => {
                    const cat = categories.find((c: any) => c.id === sched.category_id || c.id?.toString() === sched.category_id?.toString());
                    return (
                      <div key={index} style={{ background: '#FAFBFC', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #E6EBF1' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <Label style={{ margin: 0 }}>{cat ? `${cat.emoji || '🍽️'} ${cat.name}` : `Category #${sched.category_id}`}</Label>
                          <button onClick={() => {
                            setMobileSettings(prev => ({ ...prev, category_schedules: prev.category_schedules.filter((_, i) => i !== index) }));
                            markChanged();
                          }} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '14px', padding: '4px 8px' }}>Remove</button>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <FormGroup style={{ flex: 1, marginBottom: 0 }}>
                            <Label>Available From</Label>
                            <Input type="time" value={sched.start_time}
                              onChange={(e) => {
                                setMobileSettings(prev => {
                                  const arr = [...prev.category_schedules];
                                  arr[index] = { ...arr[index], start_time: e.target.value };
                                  return { ...prev, category_schedules: arr };
                                });
                                markChanged();
                              }} />
                          </FormGroup>
                          <FormGroup style={{ flex: 1, marginBottom: 0 }}>
                            <Label>Available Until</Label>
                            <Input type="time" value={sched.end_time}
                              onChange={(e) => {
                                setMobileSettings(prev => {
                                  const arr = [...prev.category_schedules];
                                  arr[index] = { ...arr[index], end_time: e.target.value };
                                  return { ...prev, category_schedules: arr };
                                });
                                markChanged();
                              }} />
                          </FormGroup>
                        </div>
                      </div>
                    );
                  })}
                  {(() => {
                    const scheduledIds = new Set((mobileSettings.category_schedules || []).map(s => s.category_id?.toString()));
                    const availableCats = categories.filter((c: any) => !scheduledIds.has(c.id?.toString()));
                    if (availableCats.length === 0) return (
                      <p style={{ color: '#9CA3AF', fontSize: '13px', textAlign: 'center', padding: '12px' }}>All categories have schedules assigned</p>
                    );
                    return (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <select
                          id="add-schedule-cat"
                          style={{ flex: 1, padding: '10px 12px', border: '1px solid #E6EBF1', borderRadius: '8px', fontSize: '14px', background: 'white' }}
                        >
                          {availableCats.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>{cat.emoji || '🍽️'} {cat.name}</option>
                          ))}
                        </select>
                        <button onClick={() => {
                          const sel = document.getElementById('add-schedule-cat') as HTMLSelectElement;
                          if (!sel?.value) return;
                          const catId = parseInt(sel.value);
                          setMobileSettings(prev => ({
                            ...prev,
                            category_schedules: [...prev.category_schedules, { category_id: catId, start_time: '09:00', end_time: '22:00' }]
                          }));
                          markChanged();
                        }} style={{ padding: '10px 16px', background: '#F0F4FF', border: '1px dashed #635BFF', borderRadius: '8px', color: '#635BFF', fontSize: '14px', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          Add Schedule
                        </button>
                      </div>
                    );
                  })()}
                </SettingsCard>

                <SettingsCard>
                  <CardTitle>Delivery Pricing Settings</CardTitle>
                  <Toggle>
                    <ToggleLabel>Enable Delivery Service</ToggleLabel>
                    <ToggleSwitch>
                      <ToggleInput type="checkbox" checked={operationSettings.deliveryPricing?.enabled || false}
                        onChange={(e) => { setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, enabled: e.target.checked } })); markChanged(); }} />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>

                  {operationSettings.deliveryPricing?.enabled && (
                    <>
                      <Divider />
                      <FormGroup>
                        <Label>Minimum Order Amount</Label>
                        <FeeInput type="number" step="1.00" value={operationSettings.deliveryPricing.minimumOrder}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, minimumOrder: Number(e.target.value) } })); markChanged(); }} />
                        <span style={{ color: '#6B7C93', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                        <HelpText>Minimum subtotal required for delivery orders (0 = no minimum)</HelpText>
                      </FormGroup>
                      <FormGroup>
                        <Label>Free Delivery Above</Label>
                        <FeeInput type="number" step="1.00" value={operationSettings.deliveryPricing.freeAbove}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, freeAbove: Number(e.target.value) } })); markChanged(); }} />
                        <span style={{ color: '#6B7C93', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                        <HelpText>Waive delivery fee if order subtotal exceeds this amount (999999 = never free)</HelpText>
                      </FormGroup>
                      <Divider />
                      <Label style={{ marginBottom: '16px' }}>Delivery Zones</Label>
                      <HelpText style={{ marginBottom: '16px' }}>Configure delivery zones and their corresponding fees</HelpText>
                      {(operationSettings.deliveryPricing.zones || []).map((zone: any, index: number) => (
                        <div key={index} style={{ background: '#FAFBFC', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #E6EBF1' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <Label style={{ margin: 0 }}>Zone {index + 1}</Label>
                            <button onClick={() => {
                              const zones = [...(operationSettings.deliveryPricing.zones || [])]; zones.splice(index, 1);
                              setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, zones } })); markChanged();
                            }} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '14px', padding: '4px 8px' }}>Remove</button>
                          </div>
                          <FormGroup><Label>Zone Name</Label><Input type="text" placeholder="e.g., Zone A (City Center)" value={zone.name}
                            onChange={(e) => { const zones = [...(operationSettings.deliveryPricing.zones || [])]; zones[index] = { ...zones[index], name: e.target.value };
                              setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, zones } })); markChanged(); }} /></FormGroup>
                          <FormGroup><Label>Description</Label><Input type="text" placeholder="e.g., 3km radius" value={zone.description}
                            onChange={(e) => { const zones = [...(operationSettings.deliveryPricing.zones || [])]; zones[index] = { ...zones[index], description: e.target.value };
                              setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, zones } })); markChanged(); }} /></FormGroup>
                          <FormGroup><Label>Delivery Fee</Label><FeeInput type="number" step="0.50" value={zone.fee}
                            onChange={(e) => { const zones = [...(operationSettings.deliveryPricing.zones || [])]; zones[index] = { ...zones[index], fee: Number(e.target.value) };
                              setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, zones } })); markChanged(); }} />
                            <span style={{ color: '#6B7C93', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span></FormGroup>
                        </div>
                      ))}
                      <button onClick={() => {
                        const zones = [...(operationSettings.deliveryPricing.zones || [])]; zones.push({ id: `zone-${Date.now()}`, name: '', description: '', fee: 0 });
                        setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, zones } })); markChanged();
                      }} style={{ width: '100%', padding: '12px', background: '#F0F4FF', border: '1px dashed #635BFF', borderRadius: '8px', color: '#635BFF', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
                        Add Delivery Zone
                      </button>
                    </>
                  )}
                </SettingsCard>

              </SettingsGrid>

              <SaveButtonContainer>
                <SaveButton
                  onClick={async () => {
                    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
                    setAutoSaveStatus('saving');
                    if (saveCallbackRef.current) await saveCallbackRef.current();
                  }}
                  disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved'}
                >
                  {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
                </SaveButton>
              </SaveButtonContainer>
            </>
          )}

          {activeTab === 'printer' && (
            <>
              {/* Printer Mode Card - Full Width */}
              <SettingsCard style={{ marginBottom: '24px' }}>
                <CardTitle>Printer Mode</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                  Select how to connect to your thermal printer
                </p>

                {printerSettingsLoading ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#6B7C93' }}>
                    Loading printer settings...
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    border: printerMode === 'rawbt' ? '2px solid #635BFF' : '1px solid #E2E8F0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: printerMode === 'rawbt' ? '#F5F3FF' : '#fff',
                    flex: '1',
                    minWidth: '150px'
                  }}>
                    <input
                      type="radio"
                      name="printerMode"
                      value="rawbt"
                      checked={printerMode === 'rawbt'}
                      onChange={() => {
                        setPrinterModeState('rawbt');
                        setPrinterMode('rawbt');
                      }}
                      style={{ accentColor: '#635BFF' }}
                    />
                    <div>
                      <div style={{ fontWeight: 500, color: '#1F2937' }}>RawBT (Android)</div>
                      <div style={{ fontSize: '12px', color: '#6B7C93' }}>For Android tablets with RawBT app</div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    border: printerMode === 'browser' ? '2px solid #635BFF' : '1px solid #E2E8F0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: printerMode === 'browser' ? '#F5F3FF' : '#fff',
                    flex: '1',
                    minWidth: '150px'
                  }}>
                    <input
                      type="radio"
                      name="printerMode"
                      value="browser"
                      checked={printerMode === 'browser'}
                      onChange={() => {
                        setPrinterModeState('browser');
                        setPrinterMode('browser');
                      }}
                      style={{ accentColor: '#635BFF' }}
                    />
                    <div>
                      <div style={{ fontWeight: 500, color: '#1F2937' }}>Browser Print (PC)</div>
                      <div style={{ fontSize: '12px', color: '#6B7C93' }}>For Windows/Mac computers</div>
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    border: printerMode === 'qztray' ? '2px solid #635BFF' : '1px solid #E2E8F0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: printerMode === 'qztray' ? '#F5F3FF' : '#fff',
                    flex: '1',
                    minWidth: '150px'
                  }}>
                    <input
                      type="radio"
                      name="printerMode"
                      value="qztray"
                      checked={printerMode === 'qztray'}
                      onChange={async () => {
                        setPrinterModeState('qztray');
                        setPrinterMode('qztray');
                        setQzTrayStatus('connecting');
                        try {
                          const ok = await connectQZTray();
                          setQzTrayStatus(ok ? 'connected' : 'disconnected');
                          if (ok) {
                            const printers = await getQZTrayPrinters();
                            setQzTrayPrinters(printers);
                          }
                        } catch {
                          setQzTrayStatus('disconnected');
                        }
                      }}
                      style={{ accentColor: '#635BFF' }}
                    />
                    <div>
                      <div style={{ fontWeight: 500, color: '#1F2937' }}>QZ Tray (Network)</div>
                      <div style={{ fontSize: '12px', color: '#6B7C93' }}>For LAN network printers</div>
                    </div>
                  </label>
                  </div>
                )}

                {/* QZ Tray Connection Status & Guide */}
                {!printerSettingsLoading && printerMode === 'qztray' && (
                  <div style={{ marginTop: '16px', padding: '14px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: qzTrayStatus === 'connected' ? '#10B981' : qzTrayStatus === 'connecting' ? '#F59E0B' : '#EF4444'
                        }} />
                        <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                          {qzTrayStatus === 'connected' ? 'Connected to QZ Tray' : qzTrayStatus === 'connecting' ? 'Connecting...' : 'QZ Tray Not Connected'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => setShowQzGuide(true)}
                          style={{
                            padding: '6px 14px', fontSize: '13px', border: '1px solid #635BFF', borderRadius: '6px',
                            background: '#F5F3FF', color: '#635BFF', cursor: 'pointer', fontWeight: 500
                          }}
                        >
                          Setup Guide
                        </button>
                        <button
                          onClick={async () => {
                            setQzTrayStatus('connecting');
                            try {
                              if (isQZTrayConnected()) await disconnectQZTray();
                              const ok = await connectQZTray();
                              setQzTrayStatus(ok ? 'connected' : 'disconnected');
                              if (ok) {
                                const printers = await getQZTrayPrinters();
                                setQzTrayPrinters(printers);
                              }
                            } catch {
                              setQzTrayStatus('disconnected');
                            }
                          }}
                          style={{
                            padding: '6px 14px', fontSize: '13px', border: '1px solid #D1D5DB', borderRadius: '6px',
                            background: '#fff', color: '#374151', cursor: 'pointer'
                          }}
                        >
                          {qzTrayStatus === 'connecting' ? 'Connecting...' : 'Test Connection'}
                        </button>
                      </div>
                    </div>

                    <div style={{ padding: '10px 12px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', fontSize: '13px', color: '#92400E', lineHeight: '1.6', marginBottom: '10px' }}>
                      <strong>Important:</strong> QZ Tray must be installed on the <strong>main POS device only</strong> (the PC or tablet that runs your POS).
                      Kitchen display tablets or other devices do not need QZ Tray.
                    </div>

                    <div style={{ fontSize: '12px', color: '#6B7C93', lineHeight: '1.6' }}>
                      QZ Tray connects your browser to network printers via LAN.{' '}
                      <span style={{ color: '#635BFF', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => window.open('https://qz.io/download/', '_blank')}>
                        Download QZ Tray
                      </span>
                    </div>
                    {qzTrayPrinters.length > 0 && (
                      <div style={{ marginTop: '10px', fontSize: '12px', color: '#6B7C93' }}>
                        <strong>Detected printers:</strong> {qzTrayPrinters.join(', ')}
                      </div>
                    )}
                  </div>
                )}

                {/* QZ Tray Setup Guide Modal */}
                {showQzGuide && (
                  <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', zIndex: 9999,
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                    padding: '40px 20px', overflowY: 'auto'
                  }} onClick={(e) => { if (e.target === e.currentTarget) setShowQzGuide(false); }}>
                    <div style={{
                      background: '#fff', borderRadius: '12px', maxWidth: '600px', width: '100%',
                      padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', flexShrink: 0
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ margin: 0, fontSize: '20px', color: '#1F2937' }}>QZ Tray Setup Guide</h2>
                        <button onClick={() => setShowQzGuide(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6B7C93', padding: '4px' }}>&times;</button>
                      </div>

                      {/* What is QZ Tray */}
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '15px', color: '#374151', marginBottom: '8px' }}>What is QZ Tray?</h3>
                        <p style={{ fontSize: '14px', color: '#6B7C93', lineHeight: '1.7', margin: 0 }}>
                          QZ Tray is a small program that runs in the background on your POS device. It acts as a bridge between your web browser and your network printers.
                          Without it, browsers cannot send print data directly to LAN printers.
                        </p>
                      </div>

                      {/* Where to install */}
                      <div style={{ marginBottom: '24px', padding: '14px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '15px', color: '#92400E', marginBottom: '8px', marginTop: 0 }}>Where to Install</h3>
                        <p style={{ fontSize: '14px', color: '#92400E', lineHeight: '1.7', margin: 0 }}>
                          Install QZ Tray on your <strong>main POS device only</strong> &mdash; the PC or tablet where you process orders and payments.
                          This device must be connected to the same network (router/WiFi) as your printers.
                          <br /><br />
                          Kitchen display tablets, customer displays, and other secondary devices do <strong>not</strong> need QZ Tray installed.
                        </p>
                      </div>

                      {/* Step by step */}
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '15px', color: '#374151', marginBottom: '12px' }}>Setup Steps</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {[
                            { step: '1', title: 'Download & Install QZ Tray', desc: 'Download from qz.io and install on your POS device. Available for Windows, Mac, and Linux.', action: <button onClick={() => window.open('https://qz.io/download/', '_blank')} style={{ marginTop: '8px', padding: '6px 16px', fontSize: '13px', border: '1px solid #635BFF', borderRadius: '6px', background: '#635BFF', color: '#fff', cursor: 'pointer' }}>Download QZ Tray</button> },
                            { step: '2', title: 'Start QZ Tray', desc: 'After installation, QZ Tray runs automatically in the system tray (bottom-right on Windows, top menu bar on Mac). It starts automatically when your device boots up.' },
                            { step: '3', title: 'Allow Browser Connection', desc: 'When you first connect from this page, QZ Tray will ask for permission. Click "Allow" or "Remember this decision" to avoid being asked again.' },
                            { step: '4', title: 'Find Your Printer IP Addresses', desc: 'Each network printer has an IP address assigned by your router (e.g. 192.168.1.100). You can find it by: printing a network status page from the printer itself, or checking your router\'s connected devices list. The standard print port is 9100.' },
                            { step: '5', title: 'Enter Printer Addresses', desc: 'Enter the IP:Port for each printer in the Bill Printer and Kitchen Printer fields below (e.g. 192.168.1.100:9100). Use "Test Print" to verify each connection.' },
                            { step: '6', title: 'Save & Done', desc: 'Click "Save Printer Settings" at the bottom. Your existing LAN printers will now work with the POS system through your browser.' }
                          ].map(({ step, title, desc, action }) => (
                            <div key={step} style={{ display: 'flex', gap: '14px' }}>
                              <div style={{
                                width: '28px', height: '28px', borderRadius: '50%', background: '#635BFF', color: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, flexShrink: 0
                              }}>{step}</div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937', marginBottom: '4px' }}>{title}</div>
                                <div style={{ fontSize: '13px', color: '#6B7C93', lineHeight: '1.6' }}>{desc}</div>
                                {action}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Network diagram */}
                      <div style={{ marginBottom: '24px', padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '15px', color: '#374151', marginBottom: '10px', marginTop: 0 }}>How It Works</h3>
                        <div style={{ fontSize: '13px', color: '#6B7C93', fontFamily: 'monospace', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
{`Your Browser (POS)
    │
    ▼
QZ Tray (installed on this device)
    │
    ▼  (via your existing LAN network)
    │
    ├── 192.168.x.x:9100 → Bill Printer
    └── 192.168.x.x:9100 → Kitchen Printer`}
                        </div>
                        <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '10px 0 0 0' }}>
                          Your existing LAN cables and network setup remain unchanged. QZ Tray simply enables the browser to send data through the same network.
                        </p>
                      </div>

                      {/* Troubleshooting */}
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '15px', color: '#374151', marginBottom: '8px' }}>Troubleshooting</h3>
                        <div style={{ fontSize: '13px', color: '#6B7C93', lineHeight: '1.8' }}>
                          <strong>"Not Connected" status:</strong> Make sure QZ Tray is running (check system tray icon).<br />
                          <strong>"Test Print" fails:</strong> Verify the printer IP address is correct and the printer is turned on and connected to the network.<br />
                          <strong>No printers detected:</strong> QZ Tray shows OS-registered printers. For network printers, manually enter the IP:Port address.
                        </div>
                      </div>

                      <button
                        onClick={() => setShowQzGuide(false)}
                        style={{
                          width: '100%', padding: '12px', fontSize: '15px', fontWeight: 600,
                          border: 'none', borderRadius: '8px', background: '#635BFF', color: '#fff', cursor: 'pointer'
                        }}
                      >
                        Got it
                      </button>
                    </div>
                  </div>
                )}
              </SettingsCard>

              {!printerSettingsLoading && (
              <SettingsGrid>
                {/* Bill Printer Card */}
                <SettingsCard>
                  <CardTitle>Bill Printer</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                    Configure receipt printer for customer bills
                  </p>

                  <Toggle>
                    <ToggleLabel>Enable Bill Printer</ToggleLabel>
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={printerSettings.billPrinter.enabled}
                        onChange={(e) => setPrinterSettings(prev => ({
                          ...prev,
                          billPrinter: { ...prev.billPrinter, enabled: e.target.checked }
                        }))}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>

                  {printerSettings.billPrinter.enabled && (
                    <>
                      <div style={{ marginTop: '16px', padding: '10px 12px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', fontSize: '13px', color: '#075985', lineHeight: '1.5' }}>
                        {printerMode === 'qztray' ? (
                          <>Send receipts directly to a network printer via QZ Tray.<br />Enter the printer's network IP address below.</>
                        ) : printerMode === 'rawbt' ? (
                          <>Prints to RawBT default printer.<br />Set your bill printer as default in RawBT app.</>
                        ) : (
                          <>Opens browser print dialog for receipts.<br />Connect a receipt printer via USB or network.</>
                        )}
                      </div>

                      {printerMode === 'qztray' && (
                        <div style={{ marginTop: '16px' }}>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                            Printer Address
                          </label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                              type="text"
                              value={printerSettings.billPrinter.address || ''}
                              onChange={(e) => setPrinterSettings(prev => ({
                                ...prev,
                                billPrinter: { ...prev.billPrinter, address: e.target.value }
                              }))}
                              placeholder="192.168.1.100:9100"
                              style={{
                                flex: 1, padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '6px',
                                fontSize: '14px', fontFamily: 'monospace'
                              }}
                            />
                            <button
                              onClick={async () => {
                                const addr = printerSettings.billPrinter.address;
                                if (!addr) return;
                                const ok = await qzTrayTestPrint(addr);
                                if (ok) {
                                  setSaveStatus({ type: 'success', message: 'Test print sent to bill printer!' });
                                } else {
                                  setSaveStatus({ type: 'error', message: 'Failed to send test print. Check QZ Tray connection and printer address.' });
                                }
                                setTimeout(() => setSaveStatus(null), 3000);
                              }}
                              style={{
                                padding: '8px 14px', fontSize: '13px', border: '1px solid #D1D5DB', borderRadius: '6px',
                                background: '#fff', color: '#374151', cursor: 'pointer', whiteSpace: 'nowrap'
                              }}
                            >
                              Test Print
                            </button>
                          </div>
                          <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                            IP:Port (e.g. 192.168.1.100:9100) or OS printer name
                          </div>
                          {qzTrayPrinters.length > 0 && (
                            <div style={{ marginTop: '8px' }}>
                              <label style={{ fontSize: '12px', color: '#6B7C93', marginBottom: '4px', display: 'block' }}>Or select detected printer:</label>
                              <select
                                value={printerSettings.billPrinter.address || ''}
                                onChange={(e) => setPrinterSettings(prev => ({
                                  ...prev,
                                  billPrinter: { ...prev.billPrinter, address: e.target.value }
                                }))}
                                style={{ width: '100%', padding: '6px 10px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '13px' }}
                              >
                                <option value="">-- Select printer --</option>
                                {qzTrayPrinters.map(p => (
                                  <option key={p} value={p}>{p}</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      )}

                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={printerSettings.billPrinter.autoPrint}
                          onChange={(e) => setPrinterSettings(prev => ({
                            ...prev,
                            billPrinter: { ...prev.billPrinter, autoPrint: e.target.checked }
                          }))}
                          style={{ width: '18px', height: '18px', accentColor: '#635BFF' }}
                        />
                        <span style={{ fontSize: '14px', color: '#374151' }}>Auto-print after payment</span>
                      </label>
                    </>
                  )}
                </SettingsCard>

                {/* Kitchen Printer Card — Station 유무 관계없이 동일 */}
                <SettingsCard>
                  <CardTitle>Kitchen Printer</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                    Configure printer for kitchen order tickets
                  </p>

                  <Toggle>
                    <ToggleLabel>Enable Kitchen Printer</ToggleLabel>
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={printerSettings.kitchenPrinter.enabled}
                        onChange={(e) => setPrinterSettings(prev => ({
                          ...prev,
                          kitchenPrinter: { ...prev.kitchenPrinter, enabled: e.target.checked }
                        }))}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>

                  {printerSettings.kitchenPrinter.enabled && (
                    <>
                      <div style={{ marginTop: '16px', padding: '10px 12px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', fontSize: '13px', color: '#075985', lineHeight: '1.5' }}>
                        {printerMode === 'qztray' ? (
                          <>Send kitchen tickets directly to a network printer via QZ Tray.<br />Enter the kitchen printer's network IP address below.</>
                        ) : printerMode === 'browser' ? (
                          <>Opens browser print dialog for kitchen order tickets.</>
                        ) : kitchenStations.length > 0 ? (
                          <>
                            Each station needs a separate device with Kitchen Display open.<br />
                            Set RawBT default printer to the station's printer on each device.<br />
                            Select the station filter on Kitchen Display to match.
                          </>
                        ) : (
                          <>
                            Use a separate device for kitchen printing:<br />
                            1. Open Kitchen Display on a kitchen tablet<br />
                            2. Set RawBT default printer to your kitchen printer on that device<br />
                            3. Order tickets will auto-print when new orders arrive
                          </>
                        )}
                      </div>

                      {printerMode === 'qztray' && (
                        <div style={{ marginTop: '16px' }}>
                          {kitchenStations.length > 0 ? (
                            /* Station별 프린터 IP 설정 */
                            <>
                              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '10px' }}>
                                Station Printer Addresses
                              </label>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {kitchenStations.map((station: any) => (
                                  <div key={station.id} style={{ padding: '10px 12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                                      {station.name}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                      <input
                                        type="text"
                                        value={printerSettings.kitchenStationPrinters?.[station.id]?.address || ''}
                                        onChange={(e) => setPrinterSettings(prev => ({
                                          ...prev,
                                          kitchenStationPrinters: {
                                            ...prev.kitchenStationPrinters,
                                            [station.id]: {
                                              ...(prev.kitchenStationPrinters?.[station.id] || { name: '', autoPrint: true }),
                                              address: e.target.value,
                                              stationName: station.name
                                            }
                                          }
                                        }))}
                                        placeholder="192.168.1.101:9100"
                                        style={{
                                          flex: 1, padding: '7px 10px', border: '1px solid #D1D5DB', borderRadius: '6px',
                                          fontSize: '13px', fontFamily: 'monospace'
                                        }}
                                      />
                                      <button
                                        onClick={async () => {
                                          const addr = printerSettings.kitchenStationPrinters?.[station.id]?.address;
                                          if (!addr) return;
                                          const ok = await qzTrayTestPrint(addr);
                                          if (ok) {
                                            setSaveStatus({ type: 'success', message: `Test print sent to ${station.name}!` });
                                          } else {
                                            setSaveStatus({ type: 'error', message: `Failed to send test print to ${station.name}.` });
                                          }
                                          setTimeout(() => setSaveStatus(null), 3000);
                                        }}
                                        style={{
                                          padding: '7px 12px', fontSize: '12px', border: '1px solid #D1D5DB', borderRadius: '6px',
                                          background: '#fff', color: '#374151', cursor: 'pointer', whiteSpace: 'nowrap'
                                        }}
                                      >
                                        Test
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '6px' }}>
                                Enter the network IP:Port for each station's printer. Orders will be routed to the correct printer based on station assignment.
                              </div>
                            </>
                          ) : (
                            /* Station 없을 때 단일 IP */
                            <>
                              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                                Printer Address
                              </label>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                  type="text"
                                  value={printerSettings.kitchenPrinter.address || ''}
                                  onChange={(e) => setPrinterSettings(prev => ({
                                    ...prev,
                                    kitchenPrinter: { ...prev.kitchenPrinter, address: e.target.value }
                                  }))}
                                  placeholder="192.168.1.101:9100"
                                  style={{
                                    flex: 1, padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '6px',
                                    fontSize: '14px', fontFamily: 'monospace'
                                  }}
                                />
                                <button
                                  onClick={async () => {
                                    const addr = printerSettings.kitchenPrinter.address;
                                    if (!addr) return;
                                    const ok = await qzTrayTestPrint(addr);
                                    if (ok) {
                                      setSaveStatus({ type: 'success', message: 'Test print sent to kitchen printer!' });
                                    } else {
                                      setSaveStatus({ type: 'error', message: 'Failed to send test print. Check QZ Tray connection and printer address.' });
                                    }
                                    setTimeout(() => setSaveStatus(null), 3000);
                                  }}
                                  style={{
                                    padding: '8px 14px', fontSize: '13px', border: '1px solid #D1D5DB', borderRadius: '6px',
                                    background: '#fff', color: '#374151', cursor: 'pointer', whiteSpace: 'nowrap'
                                  }}
                                >
                                  Test Print
                                </button>
                              </div>
                              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                                IP:Port (e.g. 192.168.1.101:9100) or OS printer name
                              </div>
                            </>
                          )}
                          {qzTrayPrinters.length > 0 && kitchenStations.length === 0 && (
                            <div style={{ marginTop: '8px' }}>
                              <label style={{ fontSize: '12px', color: '#6B7C93', marginBottom: '4px', display: 'block' }}>Or select detected printer:</label>
                              <select
                                value={printerSettings.kitchenPrinter.address || ''}
                                onChange={(e) => setPrinterSettings(prev => ({
                                  ...prev,
                                  kitchenPrinter: { ...prev.kitchenPrinter, address: e.target.value }
                                }))}
                                style={{ width: '100%', padding: '6px 10px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '13px' }}
                              >
                                <option value="">-- Select printer --</option>
                                {qzTrayPrinters.map(p => (
                                  <option key={p} value={p}>{p}</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      )}

                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={printerSettings.kitchenPrinter.autoPrint}
                          onChange={(e) => setPrinterSettings(prev => ({
                            ...prev,
                            kitchenPrinter: { ...prev.kitchenPrinter, autoPrint: e.target.checked }
                          }))}
                          style={{ width: '18px', height: '18px', accentColor: '#635BFF' }}
                        />
                        <span style={{ fontSize: '14px', color: '#374151' }}>Auto-print on new order</span>
                      </label>
                    </>
                  )}
                </SettingsCard>
              </SettingsGrid>
              )}

              {/* Kitchen Ticket Options - Always visible regardless of printer mode */}
              {!printerSettingsLoading && (
                <SettingsCard style={{ marginTop: '24px' }}>
                  <CardTitle>Kitchen Ticket Options</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                    Configure how kitchen order tickets are printed
                  </p>

                  <Toggle>
                    <div style={{ flex: 1 }}>
                      <ToggleLabel style={{ marginBottom: '4px' }}>Print separate ticket for each item</ToggleLabel>
                      <p style={{ fontSize: '12px', color: '#6B7C93', margin: 0 }}>
                        When enabled, each menu item will print on a separate ticket instead of one combined ticket per order
                      </p>
                    </div>
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={printerSettings.kitchenPrinter.printPerItem || false}
                        onChange={(e) => setPrinterSettings(prev => ({
                          ...prev,
                          kitchenPrinter: { ...prev.kitchenPrinter, printPerItem: e.target.checked }
                        }))}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>
                </SettingsCard>
              )}

              <SaveButtonContainer style={{ marginTop: '24px' }}>
                <SaveButton
                  onClick={async () => {
                    if (!user?.restaurantId) {
                      setSaveStatus({ type: 'error', message: 'No restaurant ID found' });
                      setTimeout(() => setSaveStatus(null), 3000);
                      return;
                    }

                    try {
                      const token = localStorage.getItem('auth_token');
                      const settingsToSave: any = {
                        printerMode: printerMode,
                        billPrinter: printerSettings.billPrinter,
                        kitchenPrinter: printerSettings.kitchenPrinter
                      };

                      const response = await fetch(`/api/restaurants/${user.restaurantId}`, {
                        method: 'PUT',
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          printer_settings: settingsToSave
                        })
                      });

                      if (response.ok) {
                        // Also sync to localStorage for billPrint.js
                        localStorage.setItem('printerMode', printerMode);
                        localStorage.setItem('printerSettings', JSON.stringify(printerSettings));
                        setSaveStatus({ type: 'success', message: 'Printer settings saved!' });
                      } else {
                        setSaveStatus({ type: 'error', message: 'Failed to save settings' });
                      }
                    } catch (error) {
                      console.error('Failed to save printer settings:', error);
                      setSaveStatus({ type: 'error', message: 'Failed to save settings' });
                    }
                    setTimeout(() => setSaveStatus(null), 3000);
                  }}
                >
                  Save Printer Settings
                </SaveButton>
                {saveStatus && (
                  <StatusMessage type={saveStatus.type}>
                    {saveStatus.message}
                  </StatusMessage>
                )}
              </SaveButtonContainer>
            </>
          )}

          {activeTab === 'kitchenStations' && (
            <>
              {/* Info Banner */}
              <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#075985', lineHeight: '1.5' }}>
                  Register kitchen stations to filter orders by station in Kitchen Display and print separate order tickets per station.
                  If no stations are registered, everything works the same as before. Printer settings are configured in the Printer tab.
                </p>
              </div>

              {/* Item Merge Settings */}
              <SettingsCard style={{ marginBottom: '24px' }}>
                <CardTitle>Item View Merge Settings</CardTitle>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 16px' }}>
                  Control how same-name items are grouped in Kitchen Display Item View. Leave empty or 0 for unlimited merging (default).
                </p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', maxWidth: '400px' }}>
                  <div style={{ flex: '1', minWidth: '160px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Time Limit (minutes)</label>
                    <input type="number" min="0" value={itemMergeTimeLimit || ''} placeholder="0 = unlimited"
                      onChange={(e) => { setItemMergeTimeLimit(parseInt(e.target.value) || 0); markChanged(); }}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #E6EBF1', borderRadius: '6px', fontSize: '14px' }} />
                  </div>
                  <div style={{ flex: '1', minWidth: '160px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Max Count per Group</label>
                    <input type="number" min="0" value={itemMergeMaxCount || ''} placeholder="0 = unlimited"
                      onChange={(e) => { setItemMergeMaxCount(parseInt(e.target.value) || 0); markChanged(); }}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #E6EBF1', borderRadius: '6px', fontSize: '14px' }} />
                  </div>
                </div>
              </SettingsCard>

              {/* Assignment Mode */}
              <SettingsCard style={{ marginBottom: '24px' }}>
                <CardTitle>Assignment Mode</CardTitle>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', flex: 1, minWidth: '200px', padding: '12px', borderRadius: '8px', border: `1px solid ${kitchenAssignmentMode === 'category' ? '#635BFF' : '#E6EBF1'}`, background: kitchenAssignmentMode === 'category' ? '#F8F7FF' : 'white' }}>
                    <input
                      type="radio"
                      name="assignmentMode"
                      checked={kitchenAssignmentMode === 'category'}
                      onChange={async () => {
                        setKitchenAssignmentMode('category');
                        const token = localStorage.getItem('auth_token');
                        await fetch(`/api/restaurants/${user?.restaurantId}`, {
                          method: 'PUT',
                          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify({ kitchen_assignment_mode: 'category' })
                        });
                      }}
                      style={{ marginTop: '2px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: '#0A2540', fontSize: '14px' }}>By Category (Recommended)</div>
                      <div style={{ color: '#6B7C93', fontSize: '13px', marginTop: '4px' }}>Assign categories to stations. New menu items automatically follow their category.</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', flex: 1, minWidth: '200px', padding: '12px', borderRadius: '8px', border: `1px solid ${kitchenAssignmentMode === 'menu_item' ? '#635BFF' : '#E6EBF1'}`, background: kitchenAssignmentMode === 'menu_item' ? '#F8F7FF' : 'white' }}>
                    <input
                      type="radio"
                      name="assignmentMode"
                      checked={kitchenAssignmentMode === 'menu_item'}
                      onChange={async () => {
                        setKitchenAssignmentMode('menu_item');
                        const token = localStorage.getItem('auth_token');
                        await fetch(`/api/restaurants/${user?.restaurantId}`, {
                          method: 'PUT',
                          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                          body: JSON.stringify({ kitchen_assignment_mode: 'menu_item' })
                        });
                      }}
                      style={{ marginTop: '2px' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: '#0A2540', fontSize: '14px' }}>By Menu Item</div>
                      <div style={{ color: '#6B7C93', fontSize: '13px', marginTop: '4px' }}>Assign each menu item individually. More precise but requires manual assignment for new items.</div>
                    </div>
                  </label>
                </div>
              </SettingsCard>

              {/* Stations List */}
              <SettingsCard>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <CardTitle style={{ marginBottom: 0 }}>Stations</CardTitle>
                  <SaveButton onClick={() => {
                    setEditingStation(null);
                    setStationForm({ name: '', category_ids: [], product_ids: [], alert_sound: 'bell' });
                    setShowStationModal(true);
                  }}>
                    Add Station
                  </SaveButton>
                </div>

                {kitchenStationsLoading ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>Loading...</div>
                ) : kitchenStations.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                    <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>No kitchen stations yet</div>
                    <div style={{ fontSize: '14px' }}>Add stations to split orders by kitchen area</div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {kitchenStations.map((station: any) => {
                      const assignedCats = station.categories || [];
                      const assignedProds = station.products || [];
                      const hasAssignment = assignedCats.length > 0 || assignedProds.length > 0;
                      const statusColor = !station.is_active ? '#EF4444' : hasAssignment ? '#10B981' : '#F59E0B';
                      return (
                        <div key={station.id} style={{ background: '#F6F9FC', borderRadius: '8px', padding: '16px', border: '1px solid #E6EBF1' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: statusColor }} />
                              <span style={{ fontWeight: 600, color: '#0A2540', fontSize: '15px' }}>{station.name}</span>
                              <span style={{ fontSize: '11px', background: '#F0F0FF', color: '#635BFF', padding: '2px 8px', borderRadius: '10px', fontWeight: 500 }}>
                                {({ bell: 'Bell', beep: 'Double Beep', triple: 'Triple', urgent: 'Urgent', melody: 'Melody', deep: 'Deep' } as Record<string, string>)[station.alert_sound || 'bell'] || 'Bell'}
                              </span>
                              {!station.is_active && (
                                <span style={{ fontSize: '11px', background: '#FEE2E2', color: '#EF4444', padding: '2px 8px', borderRadius: '10px', fontWeight: 500 }}>Inactive</span>
                              )}
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => {
                                  setEditingStation(station);
                                  setStationForm({
                                    name: station.name,
                                    category_ids: assignedCats.map((c: any) => c.id),
                                    product_ids: assignedProds.map((p: any) => p.id),
                                    alert_sound: station.alert_sound || 'bell'
                                  });
                                  setShowStationModal(true);
                                }}
                                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #E6EBF1', background: 'white', cursor: 'pointer', fontSize: '13px', color: '#6B7C93' }}
                              >
                                Edit
                              </button>
                              <button
                                onClick={async () => {
                                  if (!window.confirm(`Delete "${station.name}"? Assigned categories and menu items will be unassigned.`)) return;
                                  const token = localStorage.getItem('auth_token');
                                  await fetch(`/api/kitchen-stations/${station.id}`, {
                                    method: 'DELETE',
                                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                                  });
                                  loadKitchenStations();
                                }}
                                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #FECACA', background: '#FEF2F2', cursor: 'pointer', fontSize: '13px', color: '#EF4444' }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          {/* Assignment info */}
                          <div style={{ marginTop: '8px', fontSize: '13px', color: '#6B7C93' }}>
                            {assignedCats.length > 0 && (
                              <div>Categories: {assignedCats.map((c: any) => `${c.emoji || ''} ${c.name}`.trim()).join(', ')}</div>
                            )}
                            {assignedProds.length > 0 && (
                              <div>Menu Items: {assignedProds.map((p: any) => p.name).join(', ')}</div>
                            )}
                            {!hasAssignment && (
                              <div style={{ color: '#F59E0B' }}>No items assigned</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Unassigned Warning */}
                {kitchenStations.length > 0 && (() => {
                  const assignedCatIds = new Set(kitchenStations.flatMap((s: any) => (s.categories || []).map((c: any) => c.id)));
                  const assignedProdIds = new Set(kitchenStations.flatMap((s: any) => (s.products || []).map((p: any) => p.id)));
                  const unassignedCats = allCategories.filter((c: any) => !assignedCatIds.has(c.id));
                  const unassignedProds = allProducts.filter((p: any) => !assignedProdIds.has(p.id));

                  // 카테고리 없는 아이템 찾기 (Uncategorized)
                  const validCatIds = new Set(allCategories.map((c: any) => Number(c.id)));
                  const uncategorizedProds = allProducts.filter((p: any) => !p.category || !validCatIds.has(Number(p.category)));

                  const warnings: JSX.Element[] = [];

                  if (kitchenAssignmentMode === 'category' && unassignedCats.length > 0) {
                    warnings.push(
                      <div key="unassigned-cats" style={{ padding: '12px 16px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', fontSize: '13px', color: '#92400E' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '16px' }}>⚠</span>
                          <strong>{unassignedCats.length} unassigned {unassignedCats.length === 1 ? 'category' : 'categories'}</strong>
                        </div>
                        <div>{unassignedCats.map((c: any) => `${c.emoji || ''} ${c.name}`.trim()).join(', ')}</div>
                        <div style={{ marginTop: '6px', color: '#B45309', fontSize: '12px' }}>These items will show in all stations on Kitchen Display. Assign them to a station to filter properly.</div>
                      </div>
                    );
                  }
                  if (kitchenAssignmentMode === 'menu_item' && unassignedProds.length > 0) {
                    warnings.push(
                      <div key="unassigned-prods" style={{ padding: '12px 16px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', fontSize: '13px', color: '#92400E' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '16px' }}>⚠</span>
                          <strong>{unassignedProds.length} unassigned menu {unassignedProds.length === 1 ? 'item' : 'items'}</strong>
                        </div>
                        <div>{unassignedProds.slice(0, 10).map((p: any) => p.name).join(', ')}{unassignedProds.length > 10 ? ` +${unassignedProds.length - 10} more` : ''}</div>
                        <div style={{ marginTop: '6px', color: '#B45309', fontSize: '12px' }}>These items will show in all stations on Kitchen Display. Assign them to a station to filter properly.</div>
                      </div>
                    );
                  }
                  if (uncategorizedProds.length > 0) {
                    warnings.push(
                      <div key="uncategorized" style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '13px', color: '#991B1B' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '16px' }}>⚠</span>
                          <strong>{uncategorizedProds.length} uncategorized menu {uncategorizedProds.length === 1 ? 'item' : 'items'}</strong>
                        </div>
                        <div>{uncategorizedProds.map((p: any) => p.name).join(', ')}</div>
                        <div style={{ marginTop: '6px', color: '#B91C1C', fontSize: '12px' }}>These items have no category and cannot be assigned to a station. Assign a category first in Menu Management.</div>
                      </div>
                    );
                  }

                  if (warnings.length === 0) return null;
                  return <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>{warnings}</div>;
                })()}
              </SettingsCard>

              {/* Station Add/Edit Modal */}
              {showStationModal && (
                <CommonModal
                  isOpen={true}
                  title={editingStation ? `Edit Station: ${editingStation.name}` : 'Add Kitchen Station'}
                  onClose={() => setShowStationModal(false)}
                  maxWidth="520px"
                  footer={
                    <>
                      <button
                        onClick={() => setShowStationModal(false)}
                        style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #E6EBF1', background: 'white', cursor: 'pointer', fontSize: '14px', color: '#6B7C93' }}
                      >
                        Cancel
                      </button>
                      <SaveButton
                        disabled={!stationForm.name.trim() || stationSaving}
                        onClick={async () => {
                          setStationSaving(true);
                          try {
                            const token = localStorage.getItem('auth_token');
                            const authHeaders = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

                            if (editingStation) {
                              await fetch(`/api/kitchen-stations/${editingStation.id}`, {
                                method: 'PUT',
                                headers: authHeaders,
                                body: JSON.stringify({
                                  name: stationForm.name.trim(),
                                  category_ids: stationForm.category_ids,
                                  product_ids: stationForm.product_ids,
                                  alert_sound: stationForm.alert_sound
                                })
                              });
                            } else {
                              await fetch('/api/kitchen-stations', {
                                method: 'POST',
                                headers: authHeaders,
                                body: JSON.stringify({
                                  restaurant_id: user?.restaurantId,
                                  name: stationForm.name.trim(),
                                  category_ids: stationForm.category_ids,
                                  product_ids: stationForm.product_ids,
                                  alert_sound: stationForm.alert_sound
                                })
                              });
                            }

                            setShowStationModal(false);
                            loadKitchenStations();
                          } catch (error) {
                            console.error('Failed to save station:', error);
                          } finally {
                            setStationSaving(false);
                          }
                        }}
                      >
                        {stationSaving ? 'Saving...' : (editingStation ? 'Save Changes' : 'Add Station')}
                      </SaveButton>
                    </>
                  }
                >
                    <FormGroup>
                      <Label>Station Name *</Label>
                      <Input
                        value={stationForm.name}
                        onChange={(e) => setStationForm({ ...stationForm, name: e.target.value })}
                        placeholder="e.g., Grill Station"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Alert Sound</Label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <select
                          value={stationForm.alert_sound}
                          onChange={(e) => setStationForm({ ...stationForm, alert_sound: e.target.value })}
                          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #E6EBF1', fontSize: '14px', color: '#0A2540', background: 'white' }}
                        >
                          {[
                            { value: 'bell', label: 'Bell' },
                            { value: 'beep', label: 'Double Beep' },
                            { value: 'triple', label: 'Triple' },
                            { value: 'urgent', label: 'Urgent' },
                            { value: 'melody', label: 'Melody' },
                            { value: 'deep', label: 'Deep' },
                          ].map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            import('../../utils/notificationSound').then(({ playPresetSound }) => {
                              playPresetSound(stationForm.alert_sound as any);
                            });
                          }}
                          style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #E6EBF1', background: 'white', cursor: 'pointer', fontSize: '13px', color: '#6B7C93', whiteSpace: 'nowrap' }}
                        >
                          ▶ Test
                        </button>
                      </div>
                    </FormGroup>

                    {kitchenAssignmentMode === 'category' ? (
                      <FormGroup>
                        <Label>Assign Categories</Label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                          {allCategories.map((cat: any) => {
                            const isChecked = stationForm.category_ids.includes(cat.id);
                            // Check if assigned to another station
                            const otherStation = kitchenStations.find((s: any) =>
                              s.id !== editingStation?.id && (s.categories || []).some((c: any) => c.id === cat.id)
                            );
                            return (
                              <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '6px', cursor: otherStation ? 'not-allowed' : 'pointer', background: isChecked ? '#F8F7FF' : 'white', border: `1px solid ${isChecked ? '#C7D2FE' : '#E6EBF1'}`, opacity: otherStation ? 0.5 : 1 }}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  disabled={!!otherStation}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setStationForm({ ...stationForm, category_ids: [...stationForm.category_ids, cat.id] });
                                    } else {
                                      setStationForm({ ...stationForm, category_ids: stationForm.category_ids.filter(id => id !== cat.id) });
                                    }
                                  }}
                                />
                                <span style={{ fontSize: '14px', color: '#0A2540' }}>{cat.emoji || ''} {cat.name}</span>
                                {otherStation && <span style={{ fontSize: '11px', color: '#8898AA' }}>({otherStation.name})</span>}
                              </label>
                            );
                          })}
                        </div>
                      </FormGroup>
                    ) : (
                      <FormGroup>
                        <Label>Assign Menu Items</Label>
                        <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {allProducts.map((prod: any) => {
                            const isChecked = stationForm.product_ids.includes(prod.id);
                            const otherStation = kitchenStations.find((s: any) =>
                              s.id !== editingStation?.id && (s.products || []).some((p: any) => p.id === prod.id)
                            );
                            return (
                              <label key={prod.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '6px', cursor: otherStation ? 'not-allowed' : 'pointer', background: isChecked ? '#F8F7FF' : 'white', border: `1px solid ${isChecked ? '#C7D2FE' : '#E6EBF1'}`, opacity: otherStation ? 0.5 : 1 }}>
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  disabled={!!otherStation}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setStationForm({ ...stationForm, product_ids: [...stationForm.product_ids, prod.id] });
                                    } else {
                                      setStationForm({ ...stationForm, product_ids: stationForm.product_ids.filter(id => id !== prod.id) });
                                    }
                                  }}
                                />
                                <span style={{ fontSize: '14px', color: '#0A2540' }}>{prod.name}</span>
                                <span style={{ fontSize: '12px', color: '#8898AA' }}>({prod.category})</span>
                                {otherStation && <span style={{ fontSize: '11px', color: '#8898AA' }}>({otherStation.name})</span>}
                              </label>
                            );
                          })}
                        </div>
                      </FormGroup>
                    )}
                </CommonModal>
              )}
            </>
          )}

          {activeTab === 'managers' && (
            <div>
              <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#075985', lineHeight: '1.5' }}>
                  View all managers connected to this restaurant. Managers can assist with operations, reporting, and business management.
                </p>
              </div>

              {loadingManagers ? (
                <SettingsCard>
                  <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                    Loading managers...
                  </div>
                </SettingsCard>
              ) : managers.length === 0 ? (
                <SettingsCard>
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '8px' }}>
                      No Managers Connected
                    </h3>
                    <p style={{ color: '#6B7C93', fontSize: '14px' }}>
                      No managers are currently assigned to this restaurant.
                    </p>
                  </div>
                </SettingsCard>
              ) : (
                <SettingsGrid>
                  {managers.map((manager) => {
                    const getRoleBadgeColor = (role: string) => {
                      switch (role) {
                        case 'Foodcourt General':
                          return { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' };
                        case 'Brand General':
                          return { bg: '#F0F9FF', color: '#0284C7', border: '#BAE6FD' };
                        case 'Foodcourt Manager':
                          return { bg: '#FEF3C7', color: '#D97706', border: '#FDE68A' };
                        case 'Brand Manager':
                          return { bg: '#FAE8FF', color: '#A855F7', border: '#E9D5FF' };
                        default:
                          return { bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' };
                      }
                    };

                    const badgeColors = getRoleBadgeColor(manager.role);

                    return (
                      <SettingsCard key={manager.id}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                          <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: '600',
                            flexShrink: 0
                          }}>
                            {manager.name.charAt(0).toUpperCase()}
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#0A2540' }}>
                                {manager.name}
                              </h4>
                              {manager.isPrimary && (
                                <span style={{
                                  padding: '2px 8px',
                                  borderRadius: '12px',
                                  fontSize: '11px',
                                  fontWeight: '600',
                                  background: '#FEF3C7',
                                  color: '#D97706',
                                  border: '1px solid #FDE68A'
                                }}>
                                  PRIMARY
                                </span>
                              )}
                            </div>

                            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7C93', wordBreak: 'break-all' }}>
                              {manager.email}
                            </p>

                            {manager.company && (
                              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#6B7C93' }}>
                                {manager.company}
                              </p>
                            )}

                            {manager.phone && (
                              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7C93' }}>
                                {manager.phone}
                              </p>
                            )}

                            <div style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '4px 12px',
                              borderRadius: '6px',
                              fontSize: '13px',
                              fontWeight: '500',
                              background: badgeColors.bg,
                              color: badgeColors.color,
                              border: `1px solid ${badgeColors.border}`
                            }}>
                              {manager.role}
                            </div>
                          </div>
                        </div>
                      </SettingsCard>
                    );
                  })}
                </SettingsGrid>
              )}

              <SaveButtonContainer>
                <SaveButton
                  onClick={async () => {
                    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
                    setAutoSaveStatus('saving');
                    if (saveCallbackRef.current) await saveCallbackRef.current();
                  }}
                  disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved'}
                >
                  {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
                </SaveButton>
              </SaveButtonContainer>
            </div>
          )}

          {activeTab === 'membership' && (
            <div>
              <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#075985', lineHeight: '1.5' }}>
                  Configure membership and loyalty point settings for your customers. Points are earned on purchases and can be redeemed for discounts.
                </p>
              </div>

              {loadingMembership ? (
                <SettingsCard>
                  <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                    Loading membership settings...
                  </div>
                </SettingsCard>
              ) : (
                <>
                  <SettingsGrid>
                    {/* Points Settings */}
                    <SettingsCard>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <CardTitle style={{ marginBottom: 0 }}>Points Settings</CardTitle>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <ToggleSwitch>
                            <ToggleInput
                              type="checkbox"
                              checked={membershipSettings.is_active}
                              onChange={(e) => {
                                setMembershipSettings({ ...membershipSettings, is_active: e.target.checked });
                                markChanged();
                              }}
                            />
                            <ToggleSlider />
                          </ToggleSwitch>
                          <span style={{ fontSize: '14px', fontWeight: '500', color: membershipSettings.is_active ? '#635BFF' : '#6B7C93' }}>
                            {membershipSettings.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>

                      <FormGroup>
                        <Label>Earn Rate (%)</Label>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8898AA' }}>
                          Percentage of order value earned as points value
                        </p>
                        <Input
                          type="number"
                          step="0.1"
                          min="0"
                          max="100"
                          value={membershipSettings.points_per_currency && membershipSettings.points_to_currency
                            ? ((membershipSettings.points_per_currency / membershipSettings.points_to_currency) * 100).toFixed(1)
                            : 1}
                          onChange={(e) => {
                            const earnRatePercent = parseFloat(e.target.value) || 0;
                            // Keep points_to_currency at 100, adjust points_per_currency
                            // earnRate% = (points_per_currency / points_to_currency) * 100
                            // points_per_currency = earnRate% * points_to_currency / 100
                            const pointsPerCurrency = (earnRatePercent * membershipSettings.points_to_currency) / 100;
                            setMembershipSettings({
                              ...membershipSettings,
                              points_per_currency: pointsPerCurrency
                            });
                            markChanged();
                          }}
                        />
                        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#6B7C93' }}>
                          e.g., {((membershipSettings.points_per_currency / membershipSettings.points_to_currency) * 100).toFixed(1)}% earn rate:
                          {getCurrencySymbol(currencySettings.currency)} 100 spent = {Math.round(100 * membershipSettings.points_per_currency)} points = {getCurrencySymbol(currencySettings.currency)} {(100 * membershipSettings.points_per_currency / membershipSettings.points_to_currency).toFixed(2)} value
                        </p>
                      </FormGroup>

                      <FormGroup>
                        <Label>Points Value</Label>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8898AA' }}>
                          How many points equal {getCurrencySymbol(currencySettings.currency)} 1 when redeeming
                        </p>
                        <Input
                          type="number"
                          step="1"
                          min="1"
                          value={membershipSettings.points_to_currency}
                          onChange={(e) => {
                            setMembershipSettings({ ...membershipSettings, points_to_currency: parseFloat(e.target.value) || 100 });
                            markChanged();
                          }}
                        />
                        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#6B7C93' }}>
                          {membershipSettings.points_to_currency} points = {getCurrencySymbol(currencySettings.currency)} 1
                        </p>
                      </FormGroup>

                      <FormGroup>
                        <Label>Minimum Points to Use</Label>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8898AA' }}>
                          Minimum points required before customer can redeem
                        </p>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          value={membershipSettings.min_points_to_use}
                          onChange={(e) => {
                            setMembershipSettings({ ...membershipSettings, min_points_to_use: parseInt(e.target.value) || 0 });
                            markChanged();
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Max Points Per Order (%)</Label>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8898AA' }}>
                          Maximum percentage of order that can be paid with points
                        </p>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          max="100"
                          value={membershipSettings.max_points_per_order_percent}
                          onChange={(e) => {
                            setMembershipSettings({ ...membershipSettings, max_points_per_order_percent: parseFloat(e.target.value) || 0 });
                            markChanged();
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Points Expiry (Days)</Label>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8898AA' }}>
                          Number of days until points expire (0 = never)
                        </p>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          value={membershipSettings.points_expiry_days}
                          onChange={(e) => {
                            setMembershipSettings({ ...membershipSettings, points_expiry_days: parseInt(e.target.value) || 0 });
                            markChanged();
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Welcome Points</Label>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8898AA' }}>
                          Points given to new members on registration
                        </p>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          value={membershipSettings.welcome_points}
                          onChange={(e) => {
                            setMembershipSettings({ ...membershipSettings, welcome_points: parseInt(e.target.value) || 0 });
                            markChanged();
                          }}
                        />
                      </FormGroup>
                    </SettingsCard>

                    {/* Tier Settings */}
                    <SettingsCard>
                      <CardTitle>Tier Thresholds</CardTitle>
                      <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#8898AA' }}>
                        Total spending required to reach each tier
                      </p>

                      <FormGroup>
                        <Label>Silver Threshold ({getCurrencySymbol(currencySettings.currency)})</Label>
                        <Input
                          type="number"
                          step="100"
                          min="0"
                          value={membershipSettings.silver_threshold}
                          onChange={(e) => {
                            setMembershipSettings({ ...membershipSettings, silver_threshold: parseFloat(e.target.value) || 0 });
                            markChanged();
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Gold Threshold ({getCurrencySymbol(currencySettings.currency)})</Label>
                        <Input
                          type="number"
                          step="100"
                          min="0"
                          value={membershipSettings.gold_threshold}
                          onChange={(e) => {
                            setMembershipSettings({ ...membershipSettings, gold_threshold: parseFloat(e.target.value) || 0 });
                            markChanged();
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>VIP Threshold ({getCurrencySymbol(currencySettings.currency)})</Label>
                        <Input
                          type="number"
                          step="100"
                          min="0"
                          value={membershipSettings.vip_threshold}
                          onChange={(e) => {
                            setMembershipSettings({ ...membershipSettings, vip_threshold: parseFloat(e.target.value) || 0 });
                            markChanged();
                          }}
                        />
                      </FormGroup>

                      <CardTitle style={{ marginTop: '24px' }}>Bonus Rates</CardTitle>
                      <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#8898AA' }}>
                        Point earning multiplier for each tier
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <FormGroup>
                          <Label>Bronze (x)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            value={membershipSettings.bronze_bonus_rate}
                            onChange={(e) => {
                              setMembershipSettings({ ...membershipSettings, bronze_bonus_rate: parseFloat(e.target.value) || 1 });
                              markChanged();
                            }}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Silver (x)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            value={membershipSettings.silver_bonus_rate}
                            onChange={(e) => {
                              setMembershipSettings({ ...membershipSettings, silver_bonus_rate: parseFloat(e.target.value) || 1 });
                              markChanged();
                            }}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Gold (x)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            value={membershipSettings.gold_bonus_rate}
                            onChange={(e) => {
                              setMembershipSettings({ ...membershipSettings, gold_bonus_rate: parseFloat(e.target.value) || 1 });
                              markChanged();
                            }}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>VIP (x)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            value={membershipSettings.vip_bonus_rate}
                            onChange={(e) => {
                              setMembershipSettings({ ...membershipSettings, vip_bonus_rate: parseFloat(e.target.value) || 1 });
                              markChanged();
                            }}
                          />
                        </FormGroup>
                      </div>

                      <CardTitle style={{ marginTop: '24px' }}>Tier Discounts (%)</CardTitle>
                      <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#8898AA' }}>
                        Automatic discount for each tier
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <FormGroup>
                          <Label>Bronze (%)</Label>
                          <Input
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            value={membershipSettings.bronze_discount_percent}
                            onChange={(e) => {
                              setMembershipSettings({ ...membershipSettings, bronze_discount_percent: parseFloat(e.target.value) || 0 });
                              markChanged();
                            }}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Silver (%)</Label>
                          <Input
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            value={membershipSettings.silver_discount_percent}
                            onChange={(e) => {
                              setMembershipSettings({ ...membershipSettings, silver_discount_percent: parseFloat(e.target.value) || 0 });
                              markChanged();
                            }}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Gold (%)</Label>
                          <Input
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            value={membershipSettings.gold_discount_percent}
                            onChange={(e) => {
                              setMembershipSettings({ ...membershipSettings, gold_discount_percent: parseFloat(e.target.value) || 0 });
                              markChanged();
                            }}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>VIP (%)</Label>
                          <Input
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            value={membershipSettings.vip_discount_percent}
                            onChange={(e) => {
                              setMembershipSettings({ ...membershipSettings, vip_discount_percent: parseFloat(e.target.value) || 0 });
                              markChanged();
                            }}
                          />
                        </FormGroup>
                      </div>
                    </SettingsCard>
                  </SettingsGrid>

                  {/* Point Policy Reference */}
                  <SettingsCard style={{ marginTop: '24px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <CardTitle style={{ fontSize: '14px', color: '#64748B' }}>Point System Policy Reference</CardTitle>
                    <div style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.8' }}>
                      <p style={{ marginBottom: '12px', fontWeight: '500', color: '#475569' }}>
                        These are the system rules that cannot be changed:
                      </p>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li><strong>Point Earning:</strong> Points are earned when an order status changes to "Completed"</li>
                        <li><strong>Point Calculation:</strong> (Order Amount) × (Earn Rate %) × (Tier Bonus Rate)</li>
                        <li><strong>Setting Changes:</strong> New settings apply to orders placed after the change</li>
                        <li><strong>Existing Points:</strong> Previously earned points are not affected by setting changes</li>
                        <li><strong>Point Redemption:</strong> Points can only be redeemed up to the maximum % of order total</li>
                        <li><strong>Tier Calculation:</strong> Customer tier is based on total spending at your restaurant</li>
                        <li><strong>Point Expiry:</strong> Expired points are automatically deducted (if expiry is set)</li>
                      </ul>
                      <p style={{ marginTop: '12px', fontSize: '12px', color: '#94A3B8' }}>
                        Current setting: {((membershipSettings.points_per_currency / membershipSettings.points_to_currency) * 100).toFixed(1)}% earn rate
                        ({membershipSettings.points_to_currency} points = {getCurrencySymbol(currencySettings.currency)} 1)
                      </p>
                    </div>
                  </SettingsCard>

                  <SaveButtonContainer>
                <SaveButton
                  onClick={async () => {
                    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
                    setAutoSaveStatus('saving');
                    if (saveCallbackRef.current) await saveCallbackRef.current();
                  }}
                  disabled={autoSaveStatus === 'saving' || autoSaveStatus === 'saved'}
                >
                  {autoSaveStatus === 'saving' ? 'Saving...' : autoSaveStatus === 'saved' ? '✓ Saved' : 'Save Changes'}
                </SaveButton>
              </SaveButtonContainer>
                </>
              )}
            </div>
          )}

        </Content>
      </SettingsContainer>
    </>
  );
};

// ImportDataTab moved to /components/Settings/ImportDataTab.tsx
// Accessed via System Settings > Import Data tab

export default SettingsPage;
