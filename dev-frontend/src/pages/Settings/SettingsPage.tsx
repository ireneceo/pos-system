import React, { useState, useEffect, useRef } from 'react';
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
import AutoSaveField, { AutoSaveHandle } from '../../components/Common/AutoSaveField';
import ReservationSettingsTab from '../../components/Settings/ReservationSettingsTab';
import AddressFields from '../../components/Form/AddressFields';
import ConfirmModal from '../../components/ConfirmModal';
import { useTabParam } from '../../hooks/useTabParam';
import { getPrinterMode, setPrinterMode, connectQZTray, disconnectQZTray, isQZTrayConnected, getQZTrayPrinters, qzTrayTestPrint } from '../../utils/billPrint';
import { getCurrencySymbol } from '../../utils/currency';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { openCustomerDisplay, isAutoOpenEnabled, setAutoOpenEnabled } from '../../utils/customerDisplay';
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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
type TabType = 'store' | 'operations' | 'payment' | 'printer' | 'kitchenStations' | 'mobileOrder' | 'reservation' | 'company' | 'brands' | 'billing' | 'managers' | 'membership';

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
  address_line_2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  gstRegNo: string;
  logo: string;
  delivery_address: string;  // empty = use store address
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
  // Informational settings shown to mobile customers when they select Pickup/Takeaway.
  // Independent of takeawayPricing (which controls per-item packaging fees, not used in UI yet).
  pickupSettings: {
    prepMinutes: number;
    locationNote: string;
    confirmationRequired: boolean;
  };
  takeawaySettings: {
    prepMinutes: number;
    packagingNote: string;
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
  const { t } = useTranslation('settings');
  const { user } = useAuth();
  const { updateSettings } = useStore();
  const { categories } = useMenu();
  const { setTheme, resetTheme, isDefaultTheme } = useBrandTheme();

  // Use custom hook for tab URL parameter management
  const defaultTab: TabType = (['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager'].includes(user?.role || '') ? 'company' : 'store') as TabType;
  const [activeTab, handleTabChange] = useTabParam<TabType>(defaultTab);

  const [hasChanges, setHasChanges] = useState(false);
  const [, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  // Debounce timer for AddressFields onChange — avoids hammering /api on every keystroke.
  const addressSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveCallbackRef = useRef<(() => Promise<void>) | null>(null);

  const markChanged = () => {
    setHasChanges(true);
    setAutoSaveStatus('idle');
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      setAutoSaveStatus('saving');
      if (saveCallbackRef.current) saveCallbackRef.current();
    }, 2000);
  };

  // Operations tab AutoSave refs (toggles & list)
  const breakTimesRef = useRef<AutoSaveHandle>(null);
  const taxToggleRef = useRef<AutoSaveHandle>(null);
  const serviceChargeToggleRef = useRef<AutoSaveHandle>(null);
  const takeawayChargesToggleRef = useRef<AutoSaveHandle>(null);
  const pagerSystemToggleRef = useRef<AutoSaveHandle>(null);
  const enableTableNumbersToggleRef = useRef<AutoSaveHandle>(null);
  const tableNumberRequiredToggleRef = useRef<AutoSaveHandle>(null);

  // Mobile Order tab AutoSave refs (toggles & lists)
  const mobileOrderDineInRef = useRef<AutoSaveHandle>(null);
  const mobileOrderTakeawayRef = useRef<AutoSaveHandle>(null);
  const mobileOrderPickupRef = useRef<AutoSaveHandle>(null);
  const mobileOrderDeliveryRef = useRef<AutoSaveHandle>(null);
  const mobileOrderQuickOrderRef = useRef<AutoSaveHandle>(null);
  const mobileOrderShowFeaturedRef = useRef<AutoSaveHandle>(null);
  const mobileOrderShowPopularRef = useRef<AutoSaveHandle>(null);
  const mobileOrderCategorySchedulesRef = useRef<AutoSaveHandle>(null);
  const mobileOrderDeliveryEnabledRef = useRef<AutoSaveHandle>(null);
  const mobileOrderReservationRef = useRef<AutoSaveHandle>(null);
  const mobileOrderPickupPrepRef = useRef<AutoSaveHandle>(null);
  const mobileOrderPickupLocationRef = useRef<AutoSaveHandle>(null);
  const mobileOrderPickupConfirmRef = useRef<AutoSaveHandle>(null);
  const mobileOrderTakeawayPrepRef = useRef<AutoSaveHandle>(null);
  const mobileOrderTakeawayPackagingRef = useRef<AutoSaveHandle>(null);
  const mobileOrderPauseRef = useRef<AutoSaveHandle>(null);
  const mobileOrderPauseMessageRef = useRef<AutoSaveHandle>(null);
  // Reservation 활성 토글은 reservation_settings.enabled 와 동일한 필드 (Reservation 탭과 sync).
  // mobileOrder Order Types 섹션에서 빠르게 on/off 할 수 있도록 노출.
  // 새로고침 시 false → true 깜빡임 방지를 위해 restaurant 별 localStorage 캐시에서 초기값 복원.
  const reservationCacheKey = `mobile_reservation_enabled_${user?.restaurantId || 'unknown'}`;
  const [reservationEnabled, setReservationEnabled] = useState<boolean>(() => {
    try { return localStorage.getItem(reservationCacheKey) === 'true'; }
    catch { return false; }
  });

  // Payment / Printer / KitchenStations / Membership / Company tab AutoSave refs
  // Payment tab: dynamic refs for each payment method's toggles/fields
  const paymentRefsMap = useRef<Map<string, AutoSaveHandle>>(new Map());
  // Printer tab: printer mode radio refs (per option)
  const printerModeRefs = useRef<Map<string, AutoSaveHandle>>(new Map());
  const billPrinterToggleRef = useRef<AutoSaveHandle>(null);
  const billPrinterAutoPrintRef = useRef<AutoSaveHandle>(null);
  const kitchenPrinterAutoPrintRef = useRef<AutoSaveHandle>(null);
  const kitchenPrinterToggleRef = useRef<AutoSaveHandle>(null);
  const printPerItemToggleRef = useRef<AutoSaveHandle>(null);
  const receiptMembershipToggleRef = useRef<AutoSaveHandle>(null);
  const membershipActiveToggleRef = useRef<AutoSaveHandle>(null);
  const qrPositionRef = useRef<AutoSaveHandle>(null);
  const qrModeRef = useRef<AutoSaveHandle>(null);
  const qrModeSessionRef = useRef<AutoSaveHandle>(null);
  const receiptLogoRef = useRef<AutoSaveHandle>(null);
  const customQrImageRef = useRef<AutoSaveHandle>(null);
  const ewalletQrRef = useRef<AutoSaveHandle>(null);
  const companyLogoRef = useRef<AutoSaveHandle>(null);
  const storeLogoRef = useRef<AutoSaveHandle>(null);
  const kitchenAssignmentRefs = useRef<Map<string, AutoSaveHandle>>(new Map());
  const [deleteStationConfirm, setDeleteStationConfirm] = useState<{ isOpen: boolean; stationId: number | null; stationName: string }>({ isOpen: false, stationId: null, stationName: '' });

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
    kitchenStationPrinters: {} as Record<string, { name: string; autoPrint: boolean; address?: string }>
  });

  // Receipt customization state
  const [receiptSettings, setReceiptSettings] = useState({
    receiptLogo: '' as string,
    footerMessage: 'Thank you for dining with us!',
    showMembership: false,
    customQrImage: '' as string,
    customQrText: '' as string,
    customQrPosition: 'back' as 'front' | 'back'
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
  const [qzScenario, setQzScenario] = useState<'migration' | 'fresh'>('migration');
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });

  // Kitchen Stations state
  const [kitchenStations, setKitchenStations] = useState<any[]>([]);
  const [kitchenAssignmentMode, setKitchenAssignmentMode] = useState<'category' | 'menu_item'>('category');
  const [itemMergeTimeLimit, setItemMergeTimeLimit] = useState<number>(0);
  const [itemMergeMaxCount, setItemMergeMaxCount] = useState<number>(0);
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
        address_line_2: '',
        city: 'Kuala Lumpur',
        state: 'Wilayah Persekutuan',
        postalCode: '50000',
        country: 'MY',
        gstRegNo: '000123456789',
        logo: '',
        delivery_address: ''
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
        pickupSettings: {
          prepMinutes: 30,
          locationNote: '',
          confirmationRequired: true
        },
        takeawaySettings: {
          prepMinutes: 15,
          packagingNote: ''
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
            pickupSettings: {
              ...defaultSettings.operations.pickupSettings,
              ...((parsed.operations && parsed.operations.pickupSettings) || {})
            },
            takeawaySettings: {
              ...defaultSettings.operations.takeawaySettings,
              ...((parsed.operations && parsed.operations.takeawaySettings) || {})
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
    pause_ordering: boolean;
    pause_message: string;
  }>({ show_featured: true, show_popular: true, popular_excluded_category_ids: [], category_schedules: [], pause_ordering: false, pause_message: '' });
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
    qrExpirationMinutes: 180,
    externalQRs: [] as Array<string | { name: string; coupon_id?: number }>
  });
  const [newExternalQR, setNewExternalQR] = useState('');
  const [activeCoupons, setActiveCoupons] = useState<Array<{ id: number; code: string; name?: string; type: string; value: number }>>([]);
  
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
        const token = getAuthToken();
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
              address_line_2: restaurant.address_line_2 || '',
              city: restaurant.city || '',
              state: restaurant.state || '',
              postalCode: restaurant.postal_code || '',
              country: (restaurant.country || 'MY').toString().toUpperCase(),
              gstRegNo: restaurant.tax_id || '',
              logo: restaurant.logo_url || '',
              delivery_address: restaurant.delivery_address || ''
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
              pickupSettings: {
                ...defaultOps.pickupSettings,
                ...(restaurant.operation_settings.pickupSettings || {})
              },
              takeawaySettings: {
                ...defaultOps.takeawaySettings,
                ...(restaurant.operation_settings.takeawaySettings || {})
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
                qrExpirationMinutes: restaurant.table_settings.qrExpirationMinutes || 180,
                externalQRs: Array.isArray(restaurant.table_settings.externalQRs) ? restaurant.table_settings.externalQRs : []
              });
            }

            // Reservation enabled 토글 — Reservation 탭의 enabled 와 동일 source
            // localStorage 캐시도 동기화하여 다음 새로고침 시 깜빡임 0
            {
              const enabled = !!(restaurant.reservation_settings && restaurant.reservation_settings.enabled);
              setReservationEnabled(enabled);
              try { localStorage.setItem(reservationCacheKey, String(enabled)); } catch (_) {}
            }

            // Load mobile settings from DB
            if (restaurant.mobile_settings) {
              setMobileSettings({
                show_featured: restaurant.mobile_settings.show_featured ?? true,
                show_popular: restaurant.mobile_settings.show_popular ?? true,
                popular_excluded_category_ids: Array.isArray(restaurant.mobile_settings.popular_excluded_category_ids) ? restaurant.mobile_settings.popular_excluded_category_ids : [],
                category_schedules: Array.isArray(restaurant.mobile_settings.category_schedules) ? restaurant.mobile_settings.category_schedules : [],
                pause_ordering: !!restaurant.mobile_settings.pause_ordering,
                pause_message: restaurant.mobile_settings.pause_message || ''
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
        const token = getAuthToken();
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
            // Load receipt customization settings (migrate legacy showQrCode/showPointsInfo → showMembership)
            if (dbSettings.receiptSettings) {
              const rs = dbSettings.receiptSettings;
              const migrated = { ...rs } as any;
              if ('showQrCode' in rs || 'showPointsInfo' in rs) {
                migrated.showMembership = rs.showQrCode !== false || rs.showPointsInfo !== false;
                delete migrated.showQrCode;
                delete migrated.showPointsInfo;
              }
              setReceiptSettings(prev => ({ ...prev, ...migrated }));
            }
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

  // Load active coupons for External QR partner-discount linking
  useEffect(() => {
    const rid = user?.restaurantId;
    if (!rid) return;
    (async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`/api/coupons?restaurantId=${rid}&active=true`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return;
        const data = await res.json();
        const list = Array.isArray(data?.coupons) ? data.coupons
                   : Array.isArray(data?.data?.coupons) ? data.data.coupons
                   : Array.isArray(data?.data) ? data.data
                   : Array.isArray(data) ? data : [];
        setActiveCoupons(list.map((c: any) => ({
          id: c.id, code: c.code, name: c.name,
          type: c.type, value: Number(c.value)
        })));
      } catch { /* ignore */ }
    })();
  }, [user?.restaurantId]);

  // Printer settings changes are now handled by AutoSaveField refs (billPrinterToggleRef etc.)
  // No useEffect-based markChanged needed for printer tab

  // Load kitchen stations
  const loadKitchenStations = async () => {
    if (!user?.restaurantId) return;
    setKitchenStationsLoading(true);
    try {
      const token = getAuthToken();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.restaurantId]);

  // Load membership settings
  useEffect(() => {
    const loadMembershipSettings = async () => {
      if (!user?.restaurantId) return;

      setLoadingMembership(true);
      try {
        const token = getAuthToken();
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
      // Merge with current defaults so newly-added fields (e.g. externalQRs) are
      // not lost when loading legacy localStorage payloads that pre-date them.
      setTableSettings(prev => ({
        ...prev,
        ...parsedSettings,
        externalQRs: Array.isArray(parsedSettings.externalQRs) ? parsedSettings.externalQRs : [],
      }));
    }
  }, []);

  // Generate/update tables when restaurantSlug is available
  useEffect(() => {
    if (!restaurantSlug) return;

    // Generate tables with correct slug-based URLs.
    // Table QRs are physically attached to tables → always dine-in.
    const newTables: Table[] = [];
    for (let i = 1; i <= tableSettings.totalTables; i++) {
      const tableNumber = `${tableSettings.tablePrefix}${String(i).padStart(3, '0')}`;
      const qrData = `${tableSettings.qrCodeBaseUrl}/mobile/${restaurantSlug}?table=${tableNumber}&order_type=dine-in`;
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
      const qrData = `${tableSettings.qrCodeBaseUrl}/mobile/${restaurantSlug}?table=${tableNumber}&order_type=dine-in`;
      newTables.push({
        id: `table-${i}`,
        number: i,
        qrCode: qrData,
        isActive: true
      });
    }
    setTables(newTables);
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

  // ─── External QR (custom-named QR codes for partner shops, hotel lobbies, etc.) ───
  // Stored as `tableSettings.externalQRs: Array<{name, coupon_id?}>`.
  // Legacy string[] is auto-normalized below for backward compatibility.
  // The name is sent as `?table={name}`, identical to internal table numbers —
  // orders record it as `order.table_number` exactly the same way.
  // When coupon_id is set, mobile order entry auto-applies that coupon (partner discount).
  const externalQRRef = useRef<AutoSaveHandle>(null);
  // 'reservation' is a special-case pin — it doesn't take the menu path, it routes
  // to /reservation directly. The partner name still saves to DB for operator labeling
  // but is not passed in the URL (no order is created).
  const VALID_EXT_ORDER_TYPES = ['dine-in', 'takeaway', 'pickup', 'delivery', 'reservation'] as const;
  type ExtOrderType = typeof VALID_EXT_ORDER_TYPES[number];
  const externalQRUrl = (name: string, orderType?: string | null) => {
    if (orderType === 'reservation') {
      return `${tableSettings.qrCodeBaseUrl}/mobile/${restaurantSlug}/reservation`;
    }
    const base = `${tableSettings.qrCodeBaseUrl}/mobile/${restaurantSlug}?table=${encodeURIComponent(name)}`;
    return orderType ? `${base}&order_type=${orderType}` : base;
  };

  // Normalize: string → {name}; pass-through {name, coupon_id?, order_type?}
  const normalizeQREntries = (raw: any): Array<{ name: string; coupon_id?: number; order_type?: ExtOrderType }> => {
    if (!Array.isArray(raw)) return [];
    return raw
      .map((e: any) => {
        if (typeof e === 'string') return { name: e };
        if (e && typeof e === 'object' && typeof e.name === 'string') {
          const out: { name: string; coupon_id?: number; order_type?: ExtOrderType } = { name: e.name };
          if (e.coupon_id != null && Number.isInteger(Number(e.coupon_id))) {
            out.coupon_id = Number(e.coupon_id);
          }
          if (typeof e.order_type === 'string' && (VALID_EXT_ORDER_TYPES as readonly string[]).includes(e.order_type)) {
            out.order_type = e.order_type as ExtOrderType;
          }
          return out;
        }
        return null;
      })
      .filter((e: any): e is { name: string; coupon_id?: number; order_type?: ExtOrderType } => e !== null);
  };

  const handleAddExternalQR = () => {
    const name = newExternalQR.trim();
    if (!name) return;
    if (name.length > 20) {
      setInfoModal({ open: true, title: t('settings:settingsPage.externalQRInvalidTitle', 'Invalid Name'), message: t('settings:settingsPage.externalQRTooLong', 'Name must be 20 characters or less.') });
      return;
    }
    const current = normalizeQREntries(tableSettings.externalQRs);
    if (current.some(e => e.name === name)) {
      setInfoModal({ open: true, title: t('settings:settingsPage.externalQRDuplicateTitle', 'Duplicate Name'), message: t('settings:settingsPage.externalQRDuplicate', 'This name already exists.') });
      return;
    }
    const newEntry: { name: string; coupon_id?: number } = { name };
    setTableSettings({ ...tableSettings, externalQRs: [...current, newEntry] });
    setNewExternalQR('');
    externalQRRef.current?.triggerSave();
  };

  const handleRemoveExternalQR = (name: string) => {
    const current = normalizeQREntries(tableSettings.externalQRs);
    setTableSettings({
      ...tableSettings,
      externalQRs: current.filter(e => e.name !== name)
    });
    externalQRRef.current?.triggerSave();
  };

  const handleChangeExternalQRCoupon = (name: string, couponId: number | null) => {
    const current = normalizeQREntries(tableSettings.externalQRs);
    const next = current.map(e => {
      if (e.name !== name) return e;
      if (couponId == null) {
        const { coupon_id, ...rest } = e;
        return rest;
      }
      return { ...e, coupon_id: couponId };
    });
    setTableSettings({ ...tableSettings, externalQRs: next });
    externalQRRef.current?.triggerSave();
  };

  const handleChangeExternalQROrderType = (name: string, orderType: ExtOrderType | null) => {
    const current = normalizeQREntries(tableSettings.externalQRs);
    const next = current.map(e => {
      if (e.name !== name) return e;
      if (orderType == null) {
        const { order_type, ...rest } = e;
        return rest;
      }
      return { ...e, order_type: orderType };
    });
    setTableSettings({ ...tableSettings, externalQRs: next });
    externalQRRef.current?.triggerSave();
  };

  const handleDownloadExternalPNG = (name: string, idx: number) => {
    const qrCanvas = document.getElementById(`qr-ext-${idx}`) as HTMLCanvasElement;
    if (!qrCanvas) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const padding = 20;
    const labelHeight = 50;
    const qrSize = qrCanvas.width || 100;
    canvas.width = qrSize + padding * 2;
    canvas.height = qrSize + padding * 2 + labelHeight;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0A2540';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, canvas.width / 2, padding + labelHeight / 2);
    ctx.drawImage(qrCanvas, padding, padding + labelHeight);
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${name}-qr.png`;
    link.href = url;
    link.click();
  };

  const handleDownloadExternalSVG = (name: string, idx: number) => {
    const storeName = storeSettings.name || 'Restaurant';
    const svgElement = document.getElementById(`qr-svg-ext-${idx}`);
    if (!svgElement) return;
    const clonedSvg = svgElement.cloneNode(true) as SVGElement;
    const svgWrapper = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgWrapper.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgWrapper.setAttribute('width', '300');
    svgWrapper.setAttribute('height', '350');
    svgWrapper.setAttribute('viewBox', '0 0 300 350');
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '300');
    bg.setAttribute('height', '350');
    bg.setAttribute('fill', 'white');
    svgWrapper.appendChild(bg);
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
    const nameText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    nameText.setAttribute('x', '150');
    nameText.setAttribute('y', '60');
    nameText.setAttribute('text-anchor', 'middle');
    nameText.setAttribute('font-family', 'Arial, sans-serif');
    nameText.setAttribute('font-size', '24');
    nameText.setAttribute('font-weight', 'bold');
    nameText.setAttribute('fill', '#0A2540');
    nameText.textContent = name;
    svgWrapper.appendChild(nameText);
    const qrGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    qrGroup.setAttribute('transform', 'translate(50, 80)');
    clonedSvg.setAttribute('width', '200');
    clonedSvg.setAttribute('height', '200');
    qrGroup.appendChild(clonedSvg);
    svgWrapper.appendChild(qrGroup);
    const svgData = new XMLSerializer().serializeToString(svgWrapper);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${name}-qr.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintExternalQR = (name: string, idx: number) => {
    const storeName = storeSettings.name || 'Restaurant';
    const svgElement = document.getElementById(`qr-svg-ext-${idx}`);
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Print QR - ${name}</title>
        <style>
          body { margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: Arial, sans-serif; }
          .store-name { font-size: 18px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }
          .ext-name { font-size: 28px; font-weight: bold; color: #0A2540; margin-bottom: 16px; }
          .qr-container { padding: 20px; background: white; }
          .qr-container svg { width: 200px; height: 200px; }
          @media print { body { padding: 0; } .qr-container svg { width: 250px; height: 250px; } }
        </style>
      </head>
      <body>
        <div class="store-name">${storeName}</div>
        <div class="ext-name">${name}</div>
        <div class="qr-container">${svgData}</div>
        <script>
          window.onload = function() { window.print(); window.onafterprint = function() { window.close(); }; };
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handlePaymentToggle = (methodKey: string, platform: 'pos' | 'mobile', enabled: boolean, refKey?: string) => {
    setPaymentMethods((prev: any) => {
      const currentMethod = prev[methodKey];
      let newAvailableIn = [...(currentMethod.availableIn || [])];

      if (enabled) {
        if (!newAvailableIn.includes(platform)) {
          newAvailableIn.push(platform);
        }
      } else {
        newAvailableIn = newAvailableIn.filter((p: string) => p !== platform);
      }

      return {
        ...prev,
        [methodKey]: {
          ...currentMethod,
          availableIn: newAvailableIn,
          enabled: newAvailableIn.length > 0
        }
      };
    });
    if (refKey) paymentRefsMap.current.get(refKey)?.triggerSave();
  };

  const handlePaymentSettingChange = (methodKey: string, field: string, value: any) => {
    setPaymentMethods((prev: any) => ({
      ...prev,
      [methodKey]: { ...prev[methodKey], [field]: value }
    }));
  };

  // Per-order-type allow toggle on a payment method. `null` allowed_order_types ≡ all allowed;
  // we materialize the full list on first toggle so unchecking one creates a meaningful restriction.
  // 'reservation' is treated as a virtual order-type for deposit eligibility configuration.
  const handlePaymentOrderTypeToggle = (methodKey: string, orderType: 'dine-in' | 'takeaway' | 'pickup' | 'delivery' | 'reservation', refKey?: string) => {
    setPaymentMethods((prev: any) => {
      const m = prev[methodKey] || {};
      const allTypes = ['dine-in', 'takeaway', 'pickup', 'delivery', 'reservation'];
      const current: string[] = Array.isArray(m.allowed_order_types) && m.allowed_order_types.length > 0
        ? [...m.allowed_order_types]
        : [...allTypes];
      const idx = current.indexOf(orderType);
      let next;
      if (idx >= 0) {
        next = current.filter(t => t !== orderType);
      } else {
        next = [...current, orderType];
      }
      // Empty array would block all order types — disallow. Treat as "no restriction" (delete field).
      const update = { ...m };
      if (next.length === 0 || next.length === allTypes.length) {
        delete update.allowed_order_types;
      } else {
        update.allowed_order_types = next;
      }
      return { ...prev, [methodKey]: update };
    });
    if (refKey) paymentRefsMap.current.get(refKey)?.triggerSave();
  };

  const isOrderTypeAllowed = (method: any, orderType: string): boolean => {
    if (!Array.isArray(method?.allowed_order_types) || method.allowed_order_types.length === 0) return true;
    return method.allowed_order_types.includes(orderType);
  };

  const handlePaymentConfigChange = (methodKey: string, configField: string, value: any) => {
    setPaymentMethods((prev: any) => ({
      ...prev,
      [methodKey]: {
        ...prev[methodKey],
        config: { ...prev[methodKey].config, [configField]: value }
      }
    }));
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
          address_line_2: storeSettings.address_line_2,
          delivery_address: storeSettings.delivery_address.trim() || null,
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
          kitchen_item_merge: { time_limit: itemMergeTimeLimit, max_count: itemMergeMaxCount },
          printer_settings: {
            printerMode: printerMode,
            billPrinter: printerSettings.billPrinter,
            kitchenPrinter: printerSettings.kitchenPrinter,
            kitchenStationPrinters: printerSettings.kitchenStationPrinters,
            receiptSettings: receiptSettings
          }
        };

        console.log('📦 Request body (first 500 chars):', JSON.stringify(requestBody).substring(0, 500));
        console.log('💳 Payment settings being saved:', JSON.stringify(paymentMethods).substring(0, 300));
        console.log('⚙️ Operation settings being saved:', JSON.stringify(operationSettings));
        console.log('💰 Currency settings being saved:', {
          currency: currencySettings.currency,
          cashRounding: currencySettings.cashRounding,
          roundingApplyTo: currencySettings.roundingApplyTo
        });

        const token = getAuthToken();
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

      // Sync printer settings to localStorage for billPrint.js
      localStorage.setItem('printerMode', printerMode);
      localStorage.setItem('printerSettings', JSON.stringify(printerSettings));
      localStorage.setItem('receiptSettings', JSON.stringify(receiptSettings));

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
      const token = getAuthToken();
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
      setAutoSaveStatus('error');
      setTimeout(() => setAutoSaveStatus('idle'), 5000);
    }
  };

  // Page header title — defaults to "Store Settings" for the 3 core RA tabs (and the BG/FG branch).
  // Sub-pages (Payment / Printer / KitchenStations / MobileOrder / Reservation / Membership) get
  // their own title so the standalone landing reads as a dedicated page, not as a tab.
  const PAGE_TITLE_BY_TAB: Partial<Record<TabType, string>> = {
    payment: 'Payment Methods',
    printer: 'Printer',
    kitchenStations: 'Kitchen Stations',
    mobileOrder: 'Mobile Order',
    reservation: 'Reservation',
    membership: 'Membership'
  };
  const pageTitle = PAGE_TITLE_BY_TAB[activeTab] || 'Store Settings';

  return (
    <>
      <SettingsContainer>
        <PageHeader title={pageTitle} />

        <Content>

          {/* Tab bar shows only the 3 core tabs for Restaurant Admin (Store Info / Operations / Managers).
              Other sections (Payment, Printer, KitchenStations, MobileOrder, Reservation, Membership)
              are accessed via dedicated sidebar entries — when those URLs are active, the tab bar hides
              entirely so each section looks like a standalone page. */}
          {(() => {
            const isMgrRole = ['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager'].includes(user?.role || '');
            const CORE_RA_TABS: TabType[] = ['store', 'operations', 'managers'];
            const showTabs = isMgrRole || CORE_RA_TABS.includes(activeTab);
            if (!showTabs) return null;
            return (
              <TabContainer>
                {isMgrRole ? (
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
                    <Tab active={activeTab === 'managers'} onClick={() => handleTabChange('managers')}>
                      Managers
                    </Tab>
                  </>
                )}
              </TabContainer>
            );
          })()}


          {activeTab === 'payment' && (
            <>
            <SettingsCard>
              <CardTitle>{t('settings:settingsPage.paymentMethods')}</CardTitle>
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
                        <AutoSaveField ref={(h: AutoSaveHandle | null) => { if (h) paymentRefsMap.current.set(`${key}-order`, h); }} onSave={handleSave} type="list">
                          <OrderControls
                            onMoveUp={() => { movePaymentMethod(key, 'up'); paymentRefsMap.current.get(`${key}-order`)?.triggerSave(); }}
                            onMoveDown={() => { movePaymentMethod(key, 'down'); paymentRefsMap.current.get(`${key}-order`)?.triggerSave(); }}
                            disableUp={index === 0}
                            disableDown={index === paymentOrder.length - 1}
                          />
                        </AutoSaveField>
                        <ToggleLabel>{method.label}</ToggleLabel>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        {/* POS Terminal Toggle */}
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
                          <AutoSaveField ref={(h: AutoSaveHandle | null) => { if (h) paymentRefsMap.current.set(`${key}-pos`, h); }} onSave={handleSave} type="toggle">
                          <ToggleSwitch>
                            <ToggleInput
                              type="checkbox"
                              checked={method.availableIn?.includes('pos') || false}
                              onChange={(e) => handlePaymentToggle(key, 'pos', e.target.checked, `${key}-pos`)}
                            />
                            <ToggleSlider />
                          </ToggleSwitch>
                          </AutoSaveField>
                        </div>
                        )}

                        {/* Mobile Orders Toggle */}
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
                          <AutoSaveField ref={(h: AutoSaveHandle | null) => { if (h) paymentRefsMap.current.set(`${key}-mobile`, h); }} onSave={handleSave} type="toggle">
                          <ToggleSwitch>
                            <ToggleInput
                              type="checkbox"
                              checked={method.availableIn?.includes('mobile') || false}
                              onChange={(e) => handlePaymentToggle(key, 'mobile', e.target.checked, `${key}-mobile`)}
                            />
                            <ToggleSlider />
                          </ToggleSwitch>
                          </AutoSaveField>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Per-order-type filter for mobile-enabled methods.
                      Progressive disclosure: only renders when Mobile = ON. Chips hidden for order types
                      the restaurant has disabled (operation_settings.orderTypes), so operators don't see
                      orphan options. All-on (or all-off) = no restriction stored (back-compat). */}
                  {method.availableIn?.includes('mobile') && !['cash', 'card', 'staffMeal'].includes(key) && (() => {
                    // Order types + reservation (deposit). Reservation appears when reservationEnabled —
                    // currently informational (deposit flow not yet wired) but operator can pre-configure
                    // which payment methods will be eligible once deposit lands.
                    type ChipKey = 'dine-in' | 'takeaway' | 'pickup' | 'delivery' | 'reservation';
                    const orderTypeChips: Array<{ key: ChipKey; label: string; enabled: boolean }> = [
                      { key: 'dine-in',     label: 'Dine In',     enabled: !!operationSettings.orderTypes?.dineIn },
                      { key: 'takeaway',    label: 'Takeaway',    enabled: !!operationSettings.orderTypes?.takeaway },
                      { key: 'pickup',      label: 'Pickup',      enabled: !!operationSettings.orderTypes?.pickup },
                      { key: 'delivery',    label: 'Delivery',    enabled: !!operationSettings.orderTypes?.delivery },
                      { key: 'reservation', label: 'Reservation', enabled: !!reservationEnabled }
                    ].filter(c => c.enabled);
                    if (orderTypeChips.length === 0) return null;
                    return (
                      <div style={{
                        borderTop: '1px solid #E6EBF1',
                        paddingTop: '14px',
                        marginTop: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        <div style={{ fontSize: '12px', color: '#6B7C93', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                          Available order types
                          <span
                            style={{ marginLeft: '6px', color: '#9CA3AF', fontWeight: 400, textTransform: 'none', letterSpacing: 0, cursor: 'help' }}
                            title="Leave all selected to allow this method for every mobile order type. External QR scans inherit the pinned order type's settings — no separate config. Reservation deposits are not yet collected by this system."
                          >ⓘ</span>
                        </div>
                        <AutoSaveField ref={(h: AutoSaveHandle | null) => { if (h) paymentRefsMap.current.set(`${key}-ot`, h); }} onSave={handleSave} type="toggle">
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {orderTypeChips.map(c => {
                              const active = isOrderTypeAllowed(method, c.key);
                              return (
                                <button
                                  key={c.key}
                                  type="button"
                                  onClick={() => handlePaymentOrderTypeToggle(key, c.key, `${key}-ot`)}
                                  aria-pressed={active}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 12px',
                                    borderRadius: '999px',
                                    border: '1px solid ' + (active ? '#635BFF' : '#E6EBF1'),
                                    background: active ? '#F0EFFF' : '#FAFBFC',
                                    color: active ? '#635BFF' : '#6B7C93',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    transition: 'all 0.15s'
                                  }}
                                >
                                  {active ? '✓' : ''} {c.label}
                                </button>
                              );
                            })}
                          </div>
                        </AutoSaveField>
                      </div>
                    );
                  })()}

                  {/* Card - POS only, no PG config needed (online payments use Online Payment method) */}

                  {/* E-Wallet Settings - QR Code Image */}
                  {key === 'ewallet' && method.enabled && (
                    <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px' }}>
                      <AutoSaveField ref={ewalletQrRef} onSave={handleSave} type="image">
                        <ImageUploadDropzone
                          value={method.qrImage || ''}
                          onChange={(base64) => { handlePaymentSettingChange(key, 'qrImage', base64); ewalletQrRef.current?.triggerSave(); }}
                          label="E-Wallet QR Code"
                          helpText="Upload your e-wallet QR code image for customers to scan and make payment (TNG, GrabPay, Boost, etc.)"
                          changeButtonText="Change QR Code"
                          removeButtonText="Remove QR Code"
                          imageAltText="E-Wallet QR Code"
                        />
                      </AutoSaveField>
                    </div>
                  )}

                  {/* Bank Transfer Settings */}
                  {key === 'bankTransfer' && method.enabled && (
                    <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px' }}>
                      <FormGroup>
                        <Label>{t('settings:settingsPage.bankName')}</Label>
                        <AutoSaveField onSave={handleSave}>
                          <Input type="text" placeholder="e.g., Maybank, CIMB, Public Bank"
                            value={method.bankName || ''}
                            onChange={(e) => handlePaymentSettingChange(key, 'bankName', e.target.value)} />
                        </AutoSaveField>
                      </FormGroup>
                      <FormGroup>
                        <Label>{t('settings:settingsPage.accountNumber')}</Label>
                        <AutoSaveField onSave={handleSave}>
                          <Input type="text" placeholder="Enter Bank Account Number"
                            value={method.accountNumber || ''}
                            onChange={(e) => handlePaymentSettingChange(key, 'accountNumber', e.target.value)} />
                        </AutoSaveField>
                      </FormGroup>
                      <FormGroup>
                        <Label>{t('settings:settingsPage.accountName')}</Label>
                        <AutoSaveField onSave={handleSave}>
                          <Input type="text" placeholder="Enter Account Holder Name"
                            value={method.accountName || ''}
                            onChange={(e) => handlePaymentSettingChange(key, 'accountName', e.target.value)} />
                        </AutoSaveField>
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
                        <Label>{t('settings:settingsPage.paymentProvider')}</Label>
                        <AutoSaveField onSave={handleSave} type="select">
                          <Select value={method.provider || 'stripe'}
                            onChange={(e) => handlePaymentSettingChange(key, 'provider', e.target.value)}>
                            <option value="stripe">{t('settings:settingsPage.stripe')}</option>
                            <option value="paypal">{t('settings:settingsPage.paypal')}</option>
                            <option value="both">{t('settings:settingsPage.bothStripePaypal')}</option>
                          </Select>
                        </AutoSaveField>
                      </FormGroup>

                      {(method.provider === 'stripe' || method.provider === 'both') && (
                        <>
                          <FormGroup>
                            <Label>{t('settings:settingsPage.stripePublicKey')}</Label>
                            <AutoSaveField onSave={handleSave}>
                              <Input type="text" placeholder="pk_live_..."
                                value={method.config?.stripePublicKey || ''}
                                onChange={(e) => handlePaymentConfigChange(key, 'stripePublicKey', e.target.value)} />
                            </AutoSaveField>
                          </FormGroup>
                          <FormGroup>
                            <Label>{t('settings:settingsPage.stripeSecretKey')}</Label>
                            <AutoSaveField onSave={handleSave}>
                              <Input type="password" placeholder="sk_live_..."
                                value={method.config?.stripeSecretKey || ''}
                                onChange={(e) => handlePaymentConfigChange(key, 'stripeSecretKey', e.target.value)} />
                            </AutoSaveField>
                          </FormGroup>
                        </>
                      )}

                      {(method.provider === 'paypal' || method.provider === 'both') && (
                        <>
                          <FormGroup>
                            <Label>{t('settings:settingsPage.paypalClientId')}</Label>
                            <AutoSaveField onSave={handleSave}>
                              <Input type="text" placeholder="Enter PayPal Client ID"
                                value={method.config?.paypalClientId || ''}
                                onChange={(e) => handlePaymentConfigChange(key, 'paypalClientId', e.target.value)} />
                            </AutoSaveField>
                          </FormGroup>
                          <FormGroup>
                            <Label>{t('settings:settingsPage.paypalClientSecret')}</Label>
                            <AutoSaveField onSave={handleSave}>
                              <Input type="password" placeholder="Enter PayPal Client Secret"
                                value={method.config?.paypalClientSecret || ''}
                                onChange={(e) => handlePaymentConfigChange(key, 'paypalClientSecret', e.target.value)} />
                            </AutoSaveField>
                          </FormGroup>
                        </>
                      )}
                    </div>
                  )}

                  {/* FPX removed - absorbed into Online Payment */}
                </PaymentMethodCard>
                );
              })}

            </SettingsCard>
            </>
          )}

          {activeTab === 'company' && (
            <>
              <SettingsGrid>
                <SettingsCard>
                <CardTitle>{t('settings:settingsPage.companyInformation')}</CardTitle>
                <FormGroup>
                  <Label>{t('settings:settingsPage.companyName')}</Label>
                  <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Food Court Management Corp"
                  />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.businessRegistration')}</Label>
                  <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companySettings.businessRegistration}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, businessRegistration: e.target.value }))}
                    placeholder="202301234567"
                  />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.taxId')}</Label>
                  <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companySettings.taxId}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, taxId: e.target.value }))}
                    placeholder="90-1234567"
                  />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.industry')}</Label>
                  <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companySettings.industry}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, industry: e.target.value }))}
                    placeholder="Food Service Management"
                  />
                  </AutoSaveField>
                </FormGroup>

                <AutoSaveField ref={companyLogoRef} onSave={handleSave} type="image">
                <ImageUploadDropzone
                  value={companySettings.logo}
                  onChange={(base64) => { setCompanySettings(prev => ({ ...prev, logo: base64 })); companyLogoRef.current?.triggerSave(); }}
                  label="Company Logo"
                  helpText="Upload your company logo for branding and official documents"
                  changeButtonText="Change Logo"
                  removeButtonText="Remove Logo"
                  imageAltText="Company Logo"
                />
                </AutoSaveField>
              </SettingsCard>
              <SettingsCard>
                <CardTitle>{t('settings:settingsPage.contactInformation')}</CardTitle>
                <FormGroup>
                  <Label>{t('settings:settingsPage.phoneNumber')}</Label>
                  <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companySettings.phone}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+60 3-2123-4567"
                  />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.emailAddress')}</Label>
                  <AutoSaveField onSave={handleSave}>
                  <Input
                    type="email"
                    value={companySettings.email}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="admin@foodcourtmanagement.com"
                  />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.website')}</Label>
                  <AutoSaveField onSave={handleSave}>
                  <Input
                    type="url"
                    value={companySettings.website}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="www.foodcourtmanagement.com"
                  />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.address')}</Label>
                  <AutoSaveField onSave={handleSave}>
                  <Input
                    type="text"
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Business District"
                  />
                  </AutoSaveField>
                </FormGroup>
              </SettingsCard>
              </SettingsGrid>
            </>
          )}
          {activeTab === 'brands' && (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#0A2540' }}>{t('settings:settingsPage.brandManagement')}</h3>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {!isDefaultTheme && user?.role === 'Restaurant Admin' && (
                      <ThemedButton variant="outline" size="small" onClick={resetTheme}>
                        Reset Theme
                      </ThemedButton>
                    )}
                    {user?.role === 'Restaurant Admin' ? (
                      <ThemedButton onClick={() => setInfoModal({ open: true, title: t('settings:settingsPage.featureInDevelopmentTitle', 'Coming Soon'), message: t('settings:settingsPage.addBrandComingSoon', 'Add Brand functionality is currently in development and will be available in an upcoming release.') })}>
                        Add Brand
                      </ThemedButton>
                    ) : (
                      <Button onClick={() => setInfoModal({ open: true, title: t('settings:settingsPage.featureInDevelopmentTitle', 'Coming Soon'), message: t('settings:settingsPage.addBrandComingSoon', 'Add Brand functionality is currently in development and will be available in an upcoming release.') })}>
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
                          <ThemedButton size="small">{t('settings:settingsPage.edit')}</ThemedButton>
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
                          <Button>{t('settings:settingsPage.edit')}</Button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <p style={{ color: '#6B7280', marginBottom: '20px', fontSize: '14px' }}>{brand.description}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <FormGroup>
                      <Label>{t('settings:settingsPage.primaryColor')}</Label>
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
                      <Label>{t('settings:settingsPage.secondaryColor')}</Label>
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
                      <Label>{t('settings:settingsPage.accentColor')}</Label>
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
                        <p style={{ color: '#6B7280', textAlign: 'center', margin: '20px 0' }}>{t('settings:settingsPage.noRestaurantsConnectedToThisBrand')}</p>
                      )}
                    </div>
                  </div>
                </SettingsCard>
              ))}
            </div>
          )}
          {activeTab === 'billing' && (
            <>
              <SettingsGrid>
                <SettingsCard>
                <CardTitle>{t('settings:settingsPage.subscriptionOverview')}</CardTitle>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '500' }}>{t('settings:settingsPage.currentPlan')}</span>
                    <span style={{ 
                      padding: '4px 12px', 
                      background: '#ECFDF5', 
                      color: '#059669', 
                      borderRadius: '6px', 
                      fontSize: '14px', 
                      fontWeight: '600'
                    }}>{t('settings:settingsPage.enterprise')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#6B7280' }}>{t('settings:settingsPage.monthlyFee')}</span>
                    <span style={{ fontWeight: '600' }}>{t('settings:settingsPage.rm29900')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#6B7280' }}>{t('settings:settingsPage.nextBillingDate')}</span>
                    <span>{t('settings:settingsPage.january152025')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6B7280' }}>{t('settings:settingsPage.activeRestaurants')}</span>
                    <span>12 / 15</span>
                  </div>
                </div>
                <Button onClick={() => setInfoModal({ open: true, title: t('settings:settingsPage.featureInDevelopmentTitle', 'Coming Soon'), message: t('settings:settingsPage.billingComingSoon', 'Billing management is currently in development and will be available in an upcoming release.') })}>{t('settings:settingsPage.manageBilling')}</Button>
              </SettingsCard>
              <SettingsCard>
                <CardTitle>{t('settings:settingsPage.usageStatistics')}</CardTitle>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ color: '#6B7280' }}>{t('settings:settingsPage.totalOrdersThisMonth')}</span>
                    <span style={{ fontWeight: '600', fontSize: '18px' }}>8,945</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ color: '#6B7280' }}>{t('settings:settingsPage.totalRevenueThisMonth')}</span>
                    <span style={{ fontWeight: '600', fontSize: '18px' }}>{t('settings:settingsPage.rm145230')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ color: '#6B7280' }}>{t('settings:settingsPage.activeStaffMembers')}</span>
                    <span style={{ fontWeight: '600' }}>87</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#6B7280' }}>{t('settings:settingsPage.storageUsed')}</span>
                    <span style={{ fontWeight: '600' }}>2.4 GB / 10 GB</span>
                  </div>
                </div>
              </SettingsCard>
              </SettingsGrid>

            </>
          )}
          {activeTab === 'store' && (
            <>
              <SettingsGrid>
                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.basicInformation')}</CardTitle>
                <FormGroup>
                  <Label>{t('settings:settingsPage.storeName')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <Input type="text" value={storeSettings.name}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="FOODCOURT CENTRAL" />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.businessRegistration')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <Input type="text" value={storeSettings.businessRegistration}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, businessRegistration: e.target.value }))}
                      placeholder="123456789" />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.taxNo')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <Input type="text" value={storeSettings.gstRegNo}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, gstRegNo: e.target.value }))}
                      placeholder="Enter tax registration number (optional)" />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.phoneNumber')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <PhoneInput value={storeSettings.phone}
                      onChange={(value) => setStoreSettings(prev => ({ ...prev, phone: value }))}
                      defaultCountry={storeSettings.country} />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.email')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <Input type="email" value={storeSettings.email}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="contact@foodcourt.com" />
                  </AutoSaveField>
                </FormGroup>

                <AutoSaveField ref={storeLogoRef} onSave={handleSave} type="image">
                  <ImageUploadDropzone value={storeSettings.logo}
                    onChange={(base64) => { setStoreSettings(prev => ({ ...prev, logo: base64 })); storeLogoRef.current?.triggerSave(); }}
                    label="Brand Logo"
                    helpText="Upload your restaurant's brand logo for use in mobile orders and customer displays"
                    changeButtonText="Change Logo" removeButtonText="Remove Logo" imageAltText="Brand Logo" />
                </AutoSaveField>
              </SettingsCard>

              <SettingsCard>
                <CardTitle>{t('settings:settingsPage.location')}</CardTitle>
                {/*
                  Unified address input — same `<AddressFields>` component used
                  across Admin/Manager/Brand/Foodcourt/Suppliers pages, so the
                  6 canonical fields (line1, line2, city, state, postal, ISO
                  country) stay 1:1 with the DB columns. Edits are persisted
                  via the existing handleSave with a 600 ms debounce so each
                  keystroke does not hammer the API.
                */}
                <AddressFields
                  value={{
                    address: storeSettings.address,
                    address_line_2: storeSettings.address_line_2,
                    city: storeSettings.city,
                    state: storeSettings.state,
                    postal_code: storeSettings.postalCode,
                    country: storeSettings.country
                  }}
                  onChange={(addr) => {
                    const newCountry = (addr.country || '').toUpperCase();
                    const next: StoreSettings = {
                      ...storeSettings,
                      address: addr.address || '',
                      address_line_2: addr.address_line_2 || '',
                      city: addr.city || '',
                      state: addr.state || '',
                      postalCode: addr.postal_code || '',
                      country: newCountry
                    };
                    setStoreSettings(next);
                    setHasChanges(true);
                    if (newCountry !== storeSettings.country) {
                      const countryInfo = COUNTRIES.find(c => c.code === newCountry);
                      if (countryInfo) setOperationSettings(prev => ({ ...prev, timeZone: countryInfo.timezone }));
                    }
                    if (addressSaveTimerRef.current) clearTimeout(addressSaveTimerRef.current);
                    addressSaveTimerRef.current = setTimeout(() => { handleSave(); }, 600);
                  }}
                  defaultCountry={storeSettings.country || 'MY'}
                />

                {/* 발주 배송지 — 매장 주소와 같으면 NULL, 다르면 별도 textarea */}
                <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid #F1F5F9' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#0A2540' }}>
                    <input
                      type="checkbox"
                      checked={!storeSettings.delivery_address || !storeSettings.delivery_address.trim()}
                      onChange={(e) => {
                        const useStore = e.target.checked;
                        setStoreSettings(prev => ({ ...prev, delivery_address: useStore ? '' : (prev.delivery_address || prev.address || '') }));
                        setHasChanges(true);
                        if (addressSaveTimerRef.current) clearTimeout(addressSaveTimerRef.current);
                        addressSaveTimerRef.current = setTimeout(() => { handleSave(); }, 600);
                      }}
                      style={{ width: 16, height: 16, accentColor: '#635BFF' }}
                    />
                    {t('settings:settingsPage.deliveryUseStore', 'Use store address as delivery address')}
                  </label>

                  {storeSettings.delivery_address && storeSettings.delivery_address.trim() && (
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7C93', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }}>
                        {t('settings:settingsPage.deliveryAddress', 'Delivery address')}
                      </div>
                      <textarea
                        value={storeSettings.delivery_address}
                        onChange={(e) => {
                          setStoreSettings(prev => ({ ...prev, delivery_address: e.target.value }));
                          setHasChanges(true);
                          if (addressSaveTimerRef.current) clearTimeout(addressSaveTimerRef.current);
                          addressSaveTimerRef.current = setTimeout(() => { handleSave(); }, 600);
                        }}
                        placeholder={t('settings:settingsPage.deliveryAddressPlaceholder', 'Warehouse / branch address (only if different from store)') as string}
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #E6EBF1',
                          borderRadius: 8,
                          fontSize: 13,
                          fontFamily: 'inherit',
                          resize: 'vertical',
                          outline: 'none'
                        }}
                      />
                    </div>
                  )}
                </div>
              </SettingsCard>
              </SettingsGrid>

              {/* Brand (read-only) */}
              {brandInfo.brand_id && (
                <SettingsCard style={{ marginTop: '24px' }}>
                  <CardTitle>{t('settings:settingsPage.brand')}</CardTitle>
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

            </>
          )}

          {activeTab === 'operations' && (
            <>
              <SettingsGrid>
                <SettingsCard>
                <CardTitle>{t('settings:settingsPage.operatingHours')}</CardTitle>
                <FormGroup>
                  <Label>{t('settings:settingsPage.openingTime')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <Input
                      type="time"
                      value={operationSettings.openingTime}
                      onChange={(e) => {
                        setOperationSettings(prev => ({ ...prev, openingTime: e.target.value }));
                      }}
                    />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.closingTime')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <Input
                      type="time"
                      value={operationSettings.closingTime}
                      onChange={(e) => {
                        setOperationSettings(prev => ({ ...prev, closingTime: e.target.value }));
                      }}
                    />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.timeZone')}</Label>
                  <AutoSaveField onSave={handleSave} type="select">
                    <Select
                      value={operationSettings.timeZone}
                      onChange={(e) => {
                        setOperationSettings(prev => ({ ...prev, timeZone: e.target.value }));
                      }}
                    >
                      <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur (GMT+8)</option>
                      <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                      <option value="Asia/Jakarta">Asia/Jakarta (GMT+7)</option>
                    </Select>
                  </AutoSaveField>
                </FormGroup>
              </SettingsCard>

              <SettingsCard>
                <CardTitle>{t('settings:settingsPage.breakTimes')}</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                  Set break times when orders cannot be picked up
                </p>
                <AutoSaveField ref={breakTimesRef} onSave={handleSave} type="list">
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
                          breakTimesRef.current?.triggerSave();
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
                          breakTimesRef.current?.triggerSave();
                        }}
                        style={{ flex: 1 }}
                      />
                      <button
                        onClick={() => {
                          const newBreakTimes = operationSettings.breakTimes.filter((_, i) => i !== index);
                          setOperationSettings(prev => ({ ...prev, breakTimes: newBreakTimes }));
                          breakTimesRef.current?.triggerSave();
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
                      breakTimesRef.current?.triggerSave();
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
                </AutoSaveField>
              </SettingsCard>

              <SettingsCard>
                <CardTitle>{t('settings:settingsPage.orderSettings')}</CardTitle>
                <FormGroup>
                  <Label>{t('settings:settingsPage.orderNumberReset')}</Label>
                  <AutoSaveField onSave={handleSave} type="select">
                    <Select
                      value={operationSettings.orderNumberReset}
                      onChange={(e) => {
                        setOperationSettings(prev => ({ ...prev, orderNumberReset: e.target.value as any }));
                      }}
                    >
                      <option value="daily">{t('settings:settingsPage.daily')}</option>
                      <option value="weekly">{t('settings:settingsPage.weekly')}</option>
                      <option value="monthly">{t('settings:settingsPage.monthly')}</option>
                      <option value="never">{t('settings:settingsPage.never')}</option>
                    </Select>
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.defaultPreparationTime')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <FeeInput
                      type="number"
                      value={operationSettings.defaultPreparationTime}
                      onChange={(e) => {
                        setOperationSettings(prev => ({ ...prev, defaultPreparationTime: Number(e.target.value) }));
                      }}
                    />
                  </AutoSaveField>
                  <span style={{ color: '#6B7C93', fontSize: '14px' }}>minutes</span>
                </FormGroup>
              </SettingsCard>

              <SettingsCard>
                <CardTitle>{t('settings:settingsPage.taxServiceCharge')}</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                  Configure tax and service charge applied to orders
                </p>
                <Toggle>
                    <ToggleLabel>{t('settings:settingsPage.tax')}</ToggleLabel>
                    <AutoSaveField ref={taxToggleRef} onSave={handleSave} type="toggle">
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={operationSettings.taxEnabled}
                        onChange={(e) => {
                          setOperationSettings(prev => ({
                            ...prev,
                            taxEnabled: e.target.checked
                          }));
                          taxToggleRef.current?.triggerSave();
                        }}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                    </AutoSaveField>
                  </Toggle>

                {operationSettings.taxEnabled && (
                  <FormGroup style={{ marginLeft: '16px', marginTop: '8px' }}>
                    <Label>Tax Rate (%)</Label>
                    <AutoSaveField onSave={handleSave}>
                      <FeeInput
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={operationSettings.taxRate}
                        onChange={(e) => {
                          setOperationSettings(prev => ({ ...prev, taxRate: Number(e.target.value) }));
                        }}
                      />
                    </AutoSaveField>
                    <span style={{ color: '#6B7C93', fontSize: '14px' }}>%</span>
                  </FormGroup>
                )}

                <Divider />

                <Toggle>
                    <ToggleLabel>{t('settings:settingsPage.serviceCharge')}</ToggleLabel>
                    <AutoSaveField ref={serviceChargeToggleRef} onSave={handleSave} type="toggle">
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={operationSettings.serviceChargeEnabled}
                        onChange={(e) => {
                          setOperationSettings(prev => ({
                            ...prev,
                            serviceChargeEnabled: e.target.checked
                          }));
                          serviceChargeToggleRef.current?.triggerSave();
                        }}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                    </AutoSaveField>
                  </Toggle>

                {operationSettings.serviceChargeEnabled && (
                  <FormGroup style={{ marginLeft: '16px', marginTop: '8px' }}>
                    <Label>Service Charge Rate (%)</Label>
                    <AutoSaveField onSave={handleSave}>
                      <FeeInput
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={operationSettings.serviceChargeRate}
                        onChange={(e) => {
                          setOperationSettings(prev => ({ ...prev, serviceChargeRate: Number(e.target.value) }));
                        }}
                      />
                    </AutoSaveField>
                    <span style={{ color: '#6B7C93', fontSize: '14px' }}>%</span>
                  </FormGroup>
                )}
              </SettingsCard>

              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>{t('settings:settingsPage.currencyRoundingSettings')}</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '24px', fontSize: '14px' }}>
                  Configure currency and cash rounding for payments
                </p>

                <FormGroup>
                  <Label>{t('settings:settingsPage.currency')}</Label>
                  <AutoSaveField onSave={handleSave} type="select">
                    <Select
                      value={currencySettings.currency}
                      onChange={(e) => {
                        setCurrencySettings(prev => ({ ...prev, currency: e.target.value }));
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
                  </AutoSaveField>
                </FormGroup>

                <FormGroup>
                  <Label>{t('settings:settingsPage.cashRounding')}</Label>
                  <AutoSaveField onSave={handleSave} type="select">
                    <Select
                      value={currencySettings.cashRounding !== null ? currencySettings.cashRounding.toFixed(2) : ''}
                      onChange={(e) => {
                        const value = e.target.value ? parseFloat(e.target.value) : null;
                        setCurrencySettings(prev => ({ ...prev, cashRounding: value }));
                      }}
                    >
                      <option value="">{t('settings:settingsPage.disabledNoRounding')}</option>
                      <option value="0.05">0.05 (5 sen/cent)</option>
                      <option value="0.10">0.10 (10 sen/cent)</option>
                      <option value="0.50">0.50 (50 sen/cent)</option>
                      <option value="1.00">1.00 (1 dollar/ringgit)</option>
                    </Select>
                  </AutoSaveField>
                  <HelpText>Round total amount to nearest value (e.g., RM 12.52 → RM 12.50 with 0.05 rounding)</HelpText>
                </FormGroup>

                <FormGroup>
                  <Label>{t('settings:settingsPage.applyRoundingTo')}</Label>
                  <AutoSaveField onSave={handleSave} type="select">
                    <Select
                      value={currencySettings.roundingApplyTo}
                      onChange={(e) => {
                        setCurrencySettings(prev => ({ ...prev, roundingApplyTo: e.target.value as 'cash_only' | 'all' }));
                      }}
                      disabled={!currencySettings.cashRounding}
                    >
                      <option value="cash_only">{t('settings:settingsPage.cashPaymentsOnly')}</option>
                      <option value="all">{t('settings:settingsPage.allPayments')}</option>
                    </Select>
                  </AutoSaveField>
                  <HelpText>{t('settings:settingsPage.chooseWhetherToApplyRoundingToCashOnlyOrAllPaymentMethods')}</HelpText>
                </FormGroup>
              </SettingsCard>

              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>{t('settings:settingsPage.takeawayPricingSettings')}</CardTitle>
                <Toggle>
                    <ToggleLabel>{t('settings:settingsPage.enableTakeawayCharges')}</ToggleLabel>
                    <AutoSaveField ref={takeawayChargesToggleRef} onSave={handleSave} type="toggle">
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={operationSettings.takeawayPricing.enabled}
                        onChange={(e) => {
                          setOperationSettings(prev => ({
                            ...prev,
                            takeawayPricing: { ...prev.takeawayPricing, enabled: e.target.checked }
                          }));
                          takeawayChargesToggleRef.current?.triggerSave();
                        }}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                    </AutoSaveField>
                  </Toggle>
                
                {operationSettings.takeawayPricing.enabled && (
                  <>
                    <Divider />
                    <FormGroup>
                      <Label>{t('settings:settingsPage.pricingType')}</Label>
                      <AutoSaveField onSave={handleSave} type="select">
                        <Select
                          value={operationSettings.takeawayPricing.pricingType}
                          onChange={(e) => {
                            setOperationSettings(prev => ({
                              ...prev,
                              takeawayPricing: { ...prev.takeawayPricing, pricingType: e.target.value as any }
                            }));
                          }}
                        >
                          <option value="per-item">{t('settings:settingsPage.perItemFixedChargePerItem')}</option>
                          <option value="per-category">{t('settings:settingsPage.perCategoryDifferentChargesByCategory')}</option>
                        </Select>
                      </AutoSaveField>
                    </FormGroup>
                    
                    {operationSettings.takeawayPricing.pricingType === 'per-item' ? (
                      <FormGroup>
                        <Label>{t('settings:settingsPage.chargePerItem')}</Label>
                        <AutoSaveField onSave={handleSave}>
                          <FeeInput
                            type="number"
                            step="0.10"
                            value={operationSettings.takeawayPricing.perItemCharge}
                            onChange={(e) => {
                              setOperationSettings(prev => ({
                                ...prev,
                                takeawayPricing: { ...prev.takeawayPricing, perItemCharge: Number(e.target.value) }
                              }));
                            }}
                          />
                        </AutoSaveField>
                        <span style={{ color: '#6B7C93', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                        <HelpText>{t('settings:settingsPage.thisAmountWillBeAddedToEachItemForTakeawayOrders')}</HelpText>
                      </FormGroup>
                    ) : (
                      <>
                        <Label style={{ marginBottom: '16px' }}>{t('settings:settingsPage.categoryCharges')}</Label>
                        <SettingsGrid>
                          {categories.map(category => (
                            <FormGroup key={category.id}>
                              <Label>{category.emoji} {category.name}</Label>
                              <AutoSaveField onSave={handleSave}>
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
                                  }}
                                />
                              </AutoSaveField>
                              <span style={{ color: '#6B7C93', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                            </FormGroup>
                          ))}
                        </SettingsGrid>
                        <HelpText>{t('settings:settingsPage.theseAmountsWillBeAddedToItemsBasedOnTheirCategoryForTakeawayOrders')}</HelpText>
                      </>
                    )}
                  </>
                )}
              </SettingsCard>

              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>{t('settings:settingsPage.pagerSystemSettings')}</CardTitle>
                <Toggle>
                    <ToggleLabel>{t('settings:settingsPage.enablePagerSystem')}</ToggleLabel>
                    <AutoSaveField ref={pagerSystemToggleRef} onSave={handleSave} type="toggle">
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
                          pagerSystemToggleRef.current?.triggerSave();
                        }}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                    </AutoSaveField>
                  </Toggle>

                {operationSettings?.pagerSystem?.enabled && (
                  <>
                    <Divider />
                    <FormGroup>
                      <Label>{t('settings:settingsPage.totalNumberOfPagers')}</Label>
                      <AutoSaveField onSave={handleSave}>
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
                          }}
                        />
                      </AutoSaveField>
                    </FormGroup>
                    <HelpText>
                      Set the total number of pager devices available in your restaurant.
                      The POS Terminal will allow staff to assign pager numbers to orders.
                    </HelpText>
                  </>
                )}
              </SettingsCard>

              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>{t('settings:settingsPage.tableManagement')}</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                  Configure table numbers, QR codes, and customer seating options for your restaurant.
                </p>
                <SettingsGrid>
                  <div>
                    <FormGroup>
                        <Toggle>
                          <ToggleLabel>{t('settings:settingsPage.enableTableNumbers')}</ToggleLabel>
                          <AutoSaveField ref={enableTableNumbersToggleRef} onSave={handleSave} type="toggle">
                          <ToggleSwitch>
                            <ToggleInput type="checkbox" checked={tableSettings.enableTableNumbers}
                              onChange={(e) => { setTableSettings({...tableSettings, enableTableNumbers: e.target.checked}); enableTableNumbersToggleRef.current?.triggerSave(); }} />
                            <ToggleSlider />
                          </ToggleSwitch>
                          </AutoSaveField>
                        </Toggle>
                      <HelpText>{t('settings:settingsPage.allowCustomersToSelectTableNumbersWhenOrdering')}</HelpText>
                    </FormGroup>
                    <FormGroup>
                        <Toggle>
                          <ToggleLabel>{t('settings:settingsPage.tableNumberRequired')}</ToggleLabel>
                          <AutoSaveField ref={tableNumberRequiredToggleRef} onSave={handleSave} type="toggle">
                          <ToggleSwitch>
                            <ToggleInput type="checkbox" checked={tableSettings.tableNumberRequired}
                              onChange={(e) => { setTableSettings({...tableSettings, tableNumberRequired: e.target.checked}); tableNumberRequiredToggleRef.current?.triggerSave(); }}
                              disabled={!tableSettings.enableTableNumbers} />
                            <ToggleSlider />
                          </ToggleSwitch>
                          </AutoSaveField>
                        </Toggle>
                      <HelpText>{t('settings:settingsPage.makeTableNumberSelectionMandatoryForDineinOrders')}</HelpText>
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup>
                      <Label>{t('settings:settingsPage.tablePrefix')}</Label>
                      <AutoSaveField onSave={handleSave}>
                        <Input type="text" value={tableSettings.tablePrefix}
                          onChange={(e) => { setTableSettings({...tableSettings, tablePrefix: e.target.value}); }}
                          placeholder="e.g., T, TABLE" />
                      </AutoSaveField>
                      <HelpText>{t('settings:settingsPage.prefixForTableNumbersEgT001Table001')}</HelpText>
                    </FormGroup>
                    <FormGroup>
                      <Label>{t('settings:settingsPage.numberOfTables')}</Label>
                      <AutoSaveField onSave={handleSave}>
                        <Input type="number" value={tableSettings.totalTables}
                          onChange={(e) => { setTableSettings({...tableSettings, totalTables: parseInt(e.target.value) || 1}); }}
                          min="1" max="999" />
                      </AutoSaveField>
                    </FormGroup>
                  </div>
                </SettingsGrid>
                <FormGroup>
                  <Label>{t('settings:settingsPage.qrCodeBaseUrl')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <Input type="text" value={tableSettings.qrCodeBaseUrl}
                      onChange={(e) => { setTableSettings({...tableSettings, qrCodeBaseUrl: e.target.value}); }}
                      placeholder="https://yourdomain.com" />
                  </AutoSaveField>
                  <HelpText>{t('settings:settingsPage.baseUrlForQrCodesUsuallyYourDomain')}</HelpText>
                </FormGroup>

                {/* QR Code Mode */}
                <FormGroup>
                  <Label>{t('settings:settingsPage.qrCodeMode')}</Label>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <AutoSaveField ref={qrModeRef} onSave={handleSave} type="toggle" style={{ flex: 1 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid ' + (tableSettings.qrMode === 'static' ? '#635BFF' : '#E6EBF1'), borderRadius: '8px', cursor: 'pointer', background: tableSettings.qrMode === 'static' ? '#F0F0FF' : 'white' }}>
                      <input type="radio" name="qrMode" value="static" checked={tableSettings.qrMode === 'static'} onChange={() => { setTableSettings({...tableSettings, qrMode: 'static'}); qrModeRef.current?.triggerSave(); }} />
                      <div>
                        <div style={{ fontWeight: 500 }}>{t('settings:settingsPage.static')}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>{t('settings:settingsPage.permanentQrNoExpiration')}</div>
                      </div>
                    </label>
                    </AutoSaveField>
                    <AutoSaveField ref={qrModeSessionRef} onSave={handleSave} type="toggle" style={{ flex: 1 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid ' + (tableSettings.qrMode === 'session' ? '#635BFF' : '#E6EBF1'), borderRadius: '8px', cursor: 'pointer', background: tableSettings.qrMode === 'session' ? '#F0F0FF' : 'white' }}>
                      <input type="radio" name="qrMode" value="session" checked={tableSettings.qrMode === 'session'} onChange={() => { setTableSettings({...tableSettings, qrMode: 'session'}); qrModeSessionRef.current?.triggerSave(); }} />
                      <div>
                        <div style={{ fontWeight: 500 }}>{t('settings:settingsPage.session')}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>{t('settings:settingsPage.expiringQrGeneratedPerVisit')}</div>
                      </div>
                    </label>
                    </AutoSaveField>
                  </div>
                </FormGroup>

                {tableSettings.qrMode === 'session' && (
                  <FormGroup>
                    <Label>{t('settings:settingsPage.qrExpirationTimeHours')}</Label>
                    <AutoSaveField onSave={handleSave}>
                      <Input
                        type="number"
                        min="1"
                        max="24"
                        value={Math.round(tableSettings.qrExpirationMinutes / 60)}
                        onChange={(e) => { setTableSettings({...tableSettings, qrExpirationMinutes: parseInt(e.target.value) * 60 || 180}); }}
                      />
                    </AutoSaveField>
                    <HelpText>{t('settings:settingsPage.qrCodesExpireAutomaticallyAfterThisTime')}</HelpText>
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
                  <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540', marginBottom: '16px' }}>{t('settings:settingsPage.tableQrCodes')}</h4>
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
                            <ActionButton onClick={() => handleDownloadSVG(table)} title="Download SVG (recommended for print)">{t('settings:settingsPage.svg')}</ActionButton>
                            <ActionButton onClick={() => handleDownloadQR(table)} title="Download PNG">{t('settings:settingsPage.png')}</ActionButton>
                            <ActionButton onClick={() => handlePrintQR(table)}>{t('settings:settingsPage.print')}</ActionButton>
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
                    Session mode is active. QR codes are generated per visit from the <strong>{t('settings:settingsPage.floorPlan')}</strong> page.
                  </div>
                )}
              </SettingsCard>

              {/* Quick-entry QR codes — direct-deep-link QRs that skip the order-type picker.
                  Independent of table QR (works regardless of qrMode or table usage). Includes:
                  - Dine-in: walk-in customers who haven't picked a specific table yet
                  - Takeaway / Pickup / Delivery: order-type-pinned menu entry
                  - Reservation: direct entry to the booking flow (no menu)
                  Each card auto-hides when its prerequisite setting is off. Empty grid → whole card hidden. */}
              {(() => {
                type EntryCard = { key: string; label: string; description: string; url: string };
                const cards: EntryCard[] = [];
                const baseUrl = `${tableSettings.qrCodeBaseUrl}/mobile/${restaurantSlug}`;

                if (operationSettings.orderTypes?.dineIn) {
                  cards.push({
                    key: 'dine-in',
                    label: 'Dine-in QR',
                    description: 'Walk-in customers — no specific table.',
                    url: `${baseUrl}?order_type=dine-in`
                  });
                }
                if (operationSettings.orderTypes?.takeaway) {
                  cards.push({
                    key: 'takeaway',
                    label: 'Takeaway QR',
                    description: 'Display at the takeaway counter.',
                    url: `${baseUrl}?order_type=takeaway`
                  });
                }
                if (operationSettings.orderTypes?.pickup) {
                  cards.push({
                    key: 'pickup',
                    label: 'Pickup QR',
                    description: 'Display at the pickup shelf.',
                    url: `${baseUrl}?order_type=pickup`
                  });
                }
                if (operationSettings.orderTypes?.delivery) {
                  cards.push({
                    key: 'delivery',
                    label: 'Delivery QR',
                    description: 'Print on flyers or delivery slips.',
                    url: `${baseUrl}?order_type=delivery`
                  });
                }
                if (reservationEnabled) {
                  cards.push({
                    key: 'reservation',
                    label: 'Reservation QR',
                    description: 'Direct entry to the booking flow.',
                    url: `${baseUrl}/reservation`
                  });
                }

                if (cards.length === 0) return null;
                return (
                  <SettingsCard style={{ gridColumn: '1 / -1' }}>
                    <CardTitle>Quick-entry QR codes</CardTitle>
                    <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                      Independent of table QR. Scanning each takes the customer straight to the right flow — order-type-pinned menu, walk-in dine-in, or reservation booking.
                      <br /><span style={{ color: '#9CA3AF' }}>Payment methods available follow the per-order-type settings on the Payment tab. Cards for disabled order types and disabled reservations are hidden automatically.</span>
                    </p>
                    <TablesGrid>
                      {cards.map(card => {
                        const idSafe = `qe-${card.key}`;
                        return (
                          <TableItem key={idSafe}>
                            <TableNumber>{card.label}</TableNumber>
                            <div style={{ fontSize: '11px', color: '#9CA3AF', textAlign: 'center', marginBottom: '6px' }}>{card.description}</div>
                            <QRContainer>
                              <QRCodeCanvas id={`qr-${idSafe}`} value={card.url} size={100} level="H" includeMargin={true} style={{ display: 'none' }} />
                              <QRCodeSVG id={`qr-svg-${idSafe}`} value={card.url} size={100} level="H" includeMargin={true} />
                            </QRContainer>
                            <TableActions>
                              <ActionButton onClick={() => { navigator.clipboard?.writeText(card.url).catch(() => {}); }} title="Copy URL">Copy</ActionButton>
                              <ActionButton
                                onClick={() => {
                                  const svg = document.getElementById(`qr-svg-${idSafe}`);
                                  if (!svg) return;
                                  const svgData = new XMLSerializer().serializeToString(svg);
                                  const blob = new Blob([svgData], { type: 'image/svg+xml' });
                                  const a = document.createElement('a');
                                  a.href = URL.createObjectURL(blob);
                                  a.download = `${card.key}-qr.svg`;
                                  a.click();
                                  URL.revokeObjectURL(a.href);
                                }}
                                title="Download SVG"
                              >SVG</ActionButton>
                              <ActionButton
                                onClick={() => {
                                  const canvas = document.getElementById(`qr-${idSafe}`) as HTMLCanvasElement;
                                  if (!canvas) return;
                                  const a = document.createElement('a');
                                  a.href = canvas.toDataURL('image/png');
                                  a.download = `${card.key}-qr.png`;
                                  a.click();
                                }}
                                title="Download PNG"
                              >PNG</ActionButton>
                            </TableActions>
                          </TableItem>
                        );
                      })}
                    </TablesGrid>
                  </SettingsCard>
                );
              })()}

              {/* External QR — custom-named QR codes for partner shops, hotel lobbies, etc. */}
              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>External QR</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                  Create QR codes with custom names (e.g. "Cafe Maru", "Lobby") for partner locations.
                  Orders will be recorded with this name in place of a table number.
                  <br />
                  <span style={{ color: '#9CA3AF' }}>
                    Optional <strong>order type pin</strong> and <strong>partner discount</strong> are set per row below.
                    Payment methods available follow the pinned order type's settings on the Payment tab — no separate config.
                  </span>
                </p>

                <FormGroup>
                  <Label>Add Custom QR</Label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
                    <AutoSaveField ref={externalQRRef} onSave={handleSave} style={{ flex: 1 }}>
                      <Input
                        type="text"
                        value={newExternalQR}
                        onChange={(e) => setNewExternalQR(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddExternalQR(); } }}
                        placeholder="e.g., Cafe Maru"
                        maxLength={20}
                      />
                    </AutoSaveField>
                    <button
                      type="button"
                      onClick={handleAddExternalQR}
                      style={{ padding: '10px 20px', background: '#635BFF', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      Add
                    </button>
                  </div>
                  <HelpText>
                    Up to 20 characters. After adding, link a partner discount coupon from the list below.
                  </HelpText>
                </FormGroup>

                {normalizeQREntries(tableSettings.externalQRs).length > 0 && (
                  <>
                    <Divider />
                    <div style={{ marginTop: '24px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#0A2540', marginBottom: '16px' }}>
                        External QR Codes ({normalizeQREntries(tableSettings.externalQRs).length})
                      </h4>
                      <TablesGrid>
                        {normalizeQREntries(tableSettings.externalQRs).map((entry, idx) => {
                          const name = entry.name;
                          const qrUrl = externalQRUrl(name, entry.order_type);
                          const hasCoupon = !!entry.coupon_id;
                          const hasOrderTypePin = !!entry.order_type;
                          // Fallback option when the linked coupon is no longer in the active list
                          // (deactivated/expired). Avoids select value-mismatch and avoids a separate
                          // "Coupon unavailable" badge that would flicker while activeCoupons loads.
                          const optionExists = entry.coupon_id
                            ? activeCoupons.some(c => c.id === entry.coupon_id)
                            : true;
                          return (
                            <TableItem key={`ext-${idx}-${name}`} style={{
                              position: 'relative',
                              borderLeft: hasCoupon ? '4px solid #F59E0B' : undefined
                            }}>
                              <button
                                type="button"
                                onClick={() => handleRemoveExternalQR(name)}
                                title="Delete"
                                style={{
                                  position: 'absolute', top: '8px', right: '8px',
                                  width: '24px', height: '24px',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  background: 'transparent', border: 'none', borderRadius: '4px',
                                  color: '#9CA3AF', fontSize: '16px', lineHeight: 1, cursor: 'pointer',
                                  transition: 'all 0.15s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.color = '#DC2626'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9CA3AF'; }}
                              >
                                ✕
                              </button>
                              <TableNumber>{name}</TableNumber>
                              <QRContainer>
                                <QRCodeCanvas id={`qr-ext-${idx}`} value={qrUrl} size={100} level="H" includeMargin={true} style={{ display: 'none' }} />
                                <QRCodeSVG id={`qr-svg-ext-${idx}`} value={qrUrl} size={100} level="H" includeMargin={true} />
                              </QRContainer>
                              <AutoSaveField onSave={handleSave}>
                                <select
                                  value={entry.coupon_id ?? ''}
                                  onChange={(e) => handleChangeExternalQRCoupon(name, e.target.value ? Number(e.target.value) : null)}
                                  style={{
                                    width: '100%', padding: '6px 8px',
                                    border: '1px solid ' + (hasCoupon ? '#F59E0B' : '#E6EBF1'),
                                    background: hasCoupon ? '#FFFBEB' : '#fff',
                                    borderRadius: '4px', fontSize: '12px'
                                  }}
                                  title="Optional partner discount auto-applied when this QR is scanned"
                                >
                                  <option value="">No discount</option>
                                  {activeCoupons.map(c => (
                                    <option key={c.id} value={c.id}>
                                      {c.code} ({c.type === 'percentage' ? `${c.value}%` : c.value})
                                    </option>
                                  ))}
                                  {entry.coupon_id && !optionExists && (
                                    <option value={entry.coupon_id} disabled>
                                      Linked coupon (inactive)
                                    </option>
                                  )}
                                </select>
                              </AutoSaveField>
                              <AutoSaveField onSave={handleSave}>
                                <select
                                  value={entry.order_type ?? ''}
                                  onChange={(e) => handleChangeExternalQROrderType(name, e.target.value ? (e.target.value as ExtOrderType) : null)}
                                  style={{
                                    width: '100%', padding: '6px 8px',
                                    border: '1px solid ' + (hasOrderTypePin ? '#635BFF' : '#E6EBF1'),
                                    background: hasOrderTypePin ? '#F0EFFF' : '#fff',
                                    borderRadius: '4px', fontSize: '12px',
                                    marginTop: '6px'
                                  }}
                                  title="When set, scanning this QR pins the order type — the customer skips the order-type picker."
                                >
                                  <option value="">Customer picks (no pin)</option>
                                  <option value="dine-in" disabled={!operationSettings.orderTypes?.dineIn}>Dine In</option>
                                  <option value="takeaway" disabled={!operationSettings.orderTypes?.takeaway}>Takeaway</option>
                                  <option value="pickup" disabled={!operationSettings.orderTypes?.pickup}>Pickup</option>
                                  <option value="delivery" disabled={!operationSettings.orderTypes?.delivery}>Delivery</option>
                                  <option value="reservation" disabled={!reservationEnabled}>Reservation (booking)</option>
                                </select>
                              </AutoSaveField>
                              <TableActions style={{ marginTop: '12px' }}>
                                <ActionButton onClick={() => handleDownloadExternalSVG(name, idx)} title="Download SVG">SVG</ActionButton>
                                <ActionButton onClick={() => handleDownloadExternalPNG(name, idx)} title="Download PNG">PNG</ActionButton>
                                <ActionButton onClick={() => handlePrintExternalQR(name, idx)}>Print</ActionButton>
                              </TableActions>
                            </TableItem>
                          );
                        })}
                      </TablesGrid>
                    </div>
                  </>
                )}
              </SettingsCard>

              </SettingsGrid>
            </>
          )}

          {activeTab === 'mobileOrder' && (
            <>
              <SettingsGrid>
                {restaurantSlug && (
                  <SettingsCard style={{ gridColumn: '1 / -1' }}>
                    <CardTitle>{t('settings:settingsPage.mobileOrderAccess')}</CardTitle>
                    <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                      {t('settings:settingsPage.mobileOrderAccessHint')}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 280 }}>
                        <Input
                          readOnly
                          value={`${tableSettings.qrCodeBaseUrl}/mobile/${restaurantSlug}`}
                          style={{ fontSize: '13px', fontFamily: 'monospace', background: '#F8F9FC' }}
                        />
                        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                          <button
                            type="button"
                            onClick={() => {
                              const url = `${tableSettings.qrCodeBaseUrl}/mobile/${restaurantSlug}`;
                              navigator.clipboard?.writeText(url).then(() => {
                                setInfoModal({ open: true, title: t('common:done', 'Done'), message: t('settings:settingsPage.urlCopied') });
                              }).catch(() => {});
                            }}
                            style={{ padding: '8px 14px', background: '#635BFF', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
                          >
                            {t('settings:settingsPage.copyUrl')}
                          </button>
                          <button
                            type="button"
                            onClick={() => { window.location.href = `/restaurant/${user?.restaurantId}/settings?tab=store`; }}
                            style={{ padding: '8px 14px', background: '#EEF2FF', color: '#635BFF', border: '1px solid #C7D2FE', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
                          >
                            {t('settings:settingsPage.openQrManager')} →
                          </button>
                        </div>
                      </div>
                      <div style={{ padding: '8px', background: 'white', border: '1px solid #E6EBF1', borderRadius: '8px' }}>
                        <QRCodeSVG value={`${tableSettings.qrCodeBaseUrl}/mobile/${restaurantSlug}`} size={104} level="H" includeMargin={true} />
                      </div>
                    </div>
                  </SettingsCard>
                )}

                <SettingsCard style={{ gridColumn: '1 / -1', borderLeft: mobileSettings.pause_ordering ? '4px solid #DC2626' : undefined }}>
                  <CardTitle>{t('settings:settingsPage.pauseOrdering')}</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                    {t('settings:settingsPage.pauseOrderingHint')}
                  </p>
                  <Toggle>
                    <ToggleLabel>
                      {t('settings:settingsPage.pauseOrderingActive')}
                    </ToggleLabel>
                    <AutoSaveField ref={mobileOrderPauseRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput type="checkbox" checked={mobileSettings.pause_ordering}
                          onChange={(e) => { setMobileSettings(prev => ({ ...prev, pause_ordering: e.target.checked })); mobileOrderPauseRef.current?.triggerSave(); }} />
                        <ToggleSlider />
                      </ToggleSwitch>
                    </AutoSaveField>
                  </Toggle>
                  {mobileSettings.pause_ordering && (
                    <FormGroup style={{ marginTop: '16px' }}>
                      <Label>{t('settings:settingsPage.pauseMessageLabel')}</Label>
                      <AutoSaveField ref={mobileOrderPauseMessageRef} onSave={handleSave}>
                        <Input type="text"
                          placeholder={t('settings:settingsPage.pauseMessagePlaceholder')}
                          value={mobileSettings.pause_message}
                          onChange={(e) => { setMobileSettings(prev => ({ ...prev, pause_message: e.target.value })); }} />
                      </AutoSaveField>
                      <HelpText style={{ marginTop: '6px' }}>{t('settings:settingsPage.pauseMessageDefaultPreview')}</HelpText>
                    </FormGroup>
                  )}
                </SettingsCard>

                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.orderTypes')}</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                    Enable or disable order types for mobile ordering
                  </p>
                  <Toggle>
                      <ToggleLabel>
                        {t('settings:settingsPage.dineIn')}
                        <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 400, marginLeft: 8 }}>
                          ({t('settings:settingsPage.orderTypeHintDineIn')})
                        </span>
                      </ToggleLabel>
                      <AutoSaveField ref={mobileOrderDineInRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput type="checkbox" checked={operationSettings.orderTypes?.dineIn ?? true}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, orderTypes: { ...prev.orderTypes, dineIn: e.target.checked } })); mobileOrderDineInRef.current?.triggerSave(); }} />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>
                  <Toggle>
                      <ToggleLabel>
                        {t('settings:settingsPage.takeaway')}
                        <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 400, marginLeft: 8 }}>
                          ({t('settings:settingsPage.orderTypeHintTakeaway')})
                        </span>
                      </ToggleLabel>
                      <AutoSaveField ref={mobileOrderTakeawayRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput type="checkbox" checked={operationSettings.orderTypes?.takeaway ?? true}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, orderTypes: { ...prev.orderTypes, takeaway: e.target.checked } })); mobileOrderTakeawayRef.current?.triggerSave(); }} />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>
                  <Toggle>
                      <ToggleLabel>
                        {t('settings:settingsPage.preorderPickup')}
                        <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 400, marginLeft: 8 }}>
                          ({t('settings:settingsPage.orderTypeHintPickup')})
                        </span>
                      </ToggleLabel>
                      <AutoSaveField ref={mobileOrderPickupRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput type="checkbox" checked={operationSettings.orderTypes?.pickup ?? false}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, orderTypes: { ...prev.orderTypes, pickup: e.target.checked } })); mobileOrderPickupRef.current?.triggerSave(); }} />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>
                  <Toggle>
                      <ToggleLabel>
                        {t('settings:settingsPage.delivery')}
                        <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 400, marginLeft: 8 }}>
                          ({t('settings:settingsPage.orderTypeHintDelivery')})
                        </span>
                      </ToggleLabel>
                      <AutoSaveField ref={mobileOrderDeliveryRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput type="checkbox" checked={operationSettings.orderTypes?.delivery ?? false}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, orderTypes: { ...prev.orderTypes, delivery: e.target.checked } })); mobileOrderDeliveryRef.current?.triggerSave(); }} />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>
                  <Toggle>
                      <ToggleLabel>
                        Reservation
                        <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 400, marginLeft: 8 }}>
                          (Customers can book a table from mobile order page)
                        </span>
                      </ToggleLabel>
                      <AutoSaveField
                        ref={mobileOrderReservationRef}
                        onSave={async () => {
                          const token = getAuthToken();
                          // 현재 reservation_settings 가져와서 enabled 만 갱신 (다른 필드 보존)
                          const cur = await fetch(`/api/store/settings?restaurantId=${user?.restaurantId}`, {
                            headers: { Authorization: `Bearer ${token}` }
                          }).then(r => r.json()).catch(() => null);
                          const existing = cur?.data?.reservation_settings || {};
                          await fetch(`/api/store/settings?restaurantId=${user?.restaurantId}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                            body: JSON.stringify({
                              reservation_settings: { ...existing, enabled: reservationEnabled }
                            })
                          });
                          try { localStorage.setItem(reservationCacheKey, String(reservationEnabled)); } catch (_) {}
                        }}
                        type="toggle"
                      >
                      <ToggleSwitch>
                        <ToggleInput
                          type="checkbox"
                          checked={reservationEnabled}
                          onChange={(e) => {
                            setReservationEnabled(e.target.checked);
                            try { localStorage.setItem(reservationCacheKey, String(e.target.checked)); } catch (_) {}
                            mobileOrderReservationRef.current?.triggerSave();
                          }}
                        />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>
                  {!(operationSettings.orderTypes?.dineIn ?? true) &&
                    !(operationSettings.orderTypes?.takeaway ?? true) &&
                    !(operationSettings.orderTypes?.pickup ?? false) &&
                    !(operationSettings.orderTypes?.delivery ?? false) && (
                    <div style={{
                      marginTop: '12px',
                      padding: '12px 14px',
                      background: '#FFF4E5',
                      border: '1px solid #FFB74D',
                      borderRadius: '8px',
                      color: '#7A4F0E',
                      fontSize: '13px',
                      lineHeight: 1.5
                    }}>
                      <strong>⚠ Mobile ordering is now disabled.</strong> Customers scanning your QR code will see a "currently unavailable" message instead of the order page. Enable at least one order type to accept mobile orders.
                    </div>
                  )}
                </SettingsCard>

                {operationSettings.orderTypes?.pickup && (
                  <SettingsCard>
                    <CardTitle>{t('settings:settingsPage.pickupSettings')}</CardTitle>
                    <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                      {t('settings:settingsPage.pickupSettingsHint')}
                    </p>
                    <FormGroup>
                      <Label>{t('settings:settingsPage.prepMinutes')}</Label>
                      <AutoSaveField ref={mobileOrderPickupPrepRef} onSave={handleSave}>
                        <Input type="number" min="0" step="5"
                          value={operationSettings.pickupSettings?.prepMinutes ?? 30}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, pickupSettings: { ...prev.pickupSettings, prepMinutes: Number(e.target.value) } })); }} />
                      </AutoSaveField>
                      <span style={{ color: '#6B7C93', fontSize: '14px', marginLeft: '8px' }}>{t('settings:settingsPage.prepMinutesUnit')}</span>
                    </FormGroup>
                    <FormGroup>
                      <Label>{t('settings:settingsPage.pickupLocationNote')}</Label>
                      <AutoSaveField ref={mobileOrderPickupLocationRef} onSave={handleSave}>
                        <Input type="text"
                          placeholder={t('settings:settingsPage.pickupLocationPlaceholder')}
                          value={operationSettings.pickupSettings?.locationNote || ''}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, pickupSettings: { ...prev.pickupSettings, locationNote: e.target.value } })); }} />
                      </AutoSaveField>
                    </FormGroup>
                    <Toggle>
                      <ToggleLabel>
                        {t('settings:settingsPage.confirmationRequired')}
                        <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 400, marginLeft: 8 }}>
                          ({t('settings:settingsPage.confirmationRequiredHint')})
                        </span>
                      </ToggleLabel>
                      <AutoSaveField ref={mobileOrderPickupConfirmRef} onSave={handleSave} type="toggle">
                        <ToggleSwitch>
                          <ToggleInput type="checkbox"
                            checked={operationSettings.pickupSettings?.confirmationRequired ?? true}
                            onChange={(e) => { setOperationSettings(prev => ({ ...prev, pickupSettings: { ...prev.pickupSettings, confirmationRequired: e.target.checked } })); mobileOrderPickupConfirmRef.current?.triggerSave(); }} />
                          <ToggleSlider />
                        </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>
                  </SettingsCard>
                )}

                {operationSettings.orderTypes?.takeaway && (
                  <SettingsCard>
                    <CardTitle>{t('settings:settingsPage.takeawaySettings')}</CardTitle>
                    <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                      {t('settings:settingsPage.takeawaySettingsHint')}
                    </p>
                    <FormGroup>
                      <Label>{t('settings:settingsPage.prepMinutes')}</Label>
                      <AutoSaveField ref={mobileOrderTakeawayPrepRef} onSave={handleSave}>
                        <Input type="number" min="0" step="5"
                          value={operationSettings.takeawaySettings?.prepMinutes ?? 15}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, takeawaySettings: { ...prev.takeawaySettings, prepMinutes: Number(e.target.value) } })); }} />
                      </AutoSaveField>
                      <span style={{ color: '#6B7C93', fontSize: '14px', marginLeft: '8px' }}>{t('settings:settingsPage.prepMinutesUnit')}</span>
                    </FormGroup>
                    <FormGroup>
                      <Label>{t('settings:settingsPage.packagingNote')}</Label>
                      <AutoSaveField ref={mobileOrderTakeawayPackagingRef} onSave={handleSave}>
                        <Input type="text"
                          placeholder={t('settings:settingsPage.packagingPlaceholder')}
                          value={operationSettings.takeawaySettings?.packagingNote || ''}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, takeawaySettings: { ...prev.takeawaySettings, packagingNote: e.target.value } })); }} />
                      </AutoSaveField>
                    </FormGroup>
                  </SettingsCard>
                )}

                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.quickOrder')}</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                    Allow customers to order without providing contact information
                  </p>
                  <Toggle>
                      <ToggleLabel>
                        <span>{t('settings:settingsPage.allowQuickOrder')}</span>
                        <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 400, marginLeft: '8px' }}>(No customer info required)</span>
                      </ToggleLabel>
                      <AutoSaveField ref={mobileOrderQuickOrderRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput type="checkbox" checked={operationSettings.allowQuickOrder !== false}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, allowQuickOrder: e.target.checked })); mobileOrderQuickOrderRef.current?.triggerSave(); }} />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>
                  <p style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '8px' }}>
                    {operationSettings.allowQuickOrder !== false
                      ? 'Customers can place orders without entering their name or phone number'
                      : 'Customers must sign in as Guest or Member to place an order'}
                  </p>
                  {operationSettings.allowQuickOrder !== false && (
                    <div style={{
                      marginTop: '12px',
                      padding: '12px 14px',
                      background: '#EEF2FF',
                      border: '1px solid #C7D2FE',
                      borderRadius: '8px',
                      color: '#3730A3',
                      fontSize: '13px',
                      lineHeight: 1.5
                    }}>
                      {t('settings:settingsPage.quickOrderCallout')}
                    </div>
                  )}
                </SettingsCard>

                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.displayOptions')}</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                    Control which sections appear on the mobile menu
                  </p>
                  <Toggle>
                      <ToggleLabel>{t('settings:settingsPage.showFeaturedMenu')}</ToggleLabel>
                      <AutoSaveField ref={mobileOrderShowFeaturedRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput type="checkbox" checked={mobileSettings.show_featured}
                          onChange={(e) => { setMobileSettings(prev => ({ ...prev, show_featured: e.target.checked })); mobileOrderShowFeaturedRef.current?.triggerSave(); }} />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>
                  <p style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '4px', marginBottom: '12px' }}>
                    Display recommended items in a dedicated tab (set in Menu Management)
                  </p>
                  <Toggle>
                      <ToggleLabel>{t('settings:settingsPage.showPopularMenu')}</ToggleLabel>
                      <AutoSaveField ref={mobileOrderShowPopularRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput type="checkbox" checked={mobileSettings.show_popular}
                          onChange={(e) => { setMobileSettings(prev => ({ ...prev, show_popular: e.target.checked })); mobileOrderShowPopularRef.current?.triggerSave(); }} />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>
                  <p style={{ color: '#9CA3AF', fontSize: '12px', marginTop: '4px' }}>
                    Show best-selling items based on recent order history
                  </p>
                </SettingsCard>

                {mobileSettings.show_popular && categories.length > 0 && (
                  <SettingsCard>
                    <CardTitle>{t('settings:settingsPage.popularMenuCategories')}</CardTitle>
                    <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                      {t('settings:settingsPage.popularMenuCategoriesHint')}
                    </p>
                    {categories.map((cat: any) => {
                      const isExcluded = (mobileSettings.popular_excluded_category_ids || []).includes(cat.id);
                      return (
                        <Toggle key={cat.id}>
                            <ToggleLabel style={{ fontSize: '13px' }}>{cat.emoji || '🍽️'} {cat.name}</ToggleLabel>
                            <AutoSaveField ref={(h: AutoSaveHandle | null) => { if (h) paymentRefsMap.current.set(`popular-${cat.id}`, h); }} onSave={handleSave} type="toggle">
                            <ToggleSwitch>
                              <ToggleInput type="checkbox" checked={!isExcluded}
                                onChange={(e) => {
                                  setMobileSettings(prev => {
                                    const ids = prev.popular_excluded_category_ids.filter(id => id !== cat.id);
                                    if (!e.target.checked) ids.push(cat.id);
                                    return { ...prev, popular_excluded_category_ids: ids };
                                  });
                                  paymentRefsMap.current.get(`popular-${cat.id}`)?.triggerSave();
                                }} />
                              <ToggleSlider />
                            </ToggleSwitch>
                            </AutoSaveField>
                          </Toggle>
                      );
                    })}
                  </SettingsCard>
                )}

                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.categoryTimeRestrictions')}</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '16px', fontSize: '14px' }}>
                    Restrict specific categories to certain hours on mobile order only. Categories without a schedule are always visible.
                  </p>
                  <AutoSaveField ref={mobileOrderCategorySchedulesRef} onSave={handleSave} type="list">
                    <>
                      {(mobileSettings.category_schedules || []).map((sched, index) => {
                        const cat = categories.find((c: any) => c.id === sched.category_id || c.id?.toString() === sched.category_id?.toString());
                        return (
                          <div key={index} style={{ background: '#FAFBFC', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #E6EBF1' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                              <Label style={{ margin: 0 }}>{cat ? `${cat.emoji || '🍽️'} ${cat.name}` : `Category #${sched.category_id}`}</Label>
                              <button onClick={() => {
                                setMobileSettings(prev => ({ ...prev, category_schedules: prev.category_schedules.filter((_, i) => i !== index) }));
                                mobileOrderCategorySchedulesRef.current?.triggerSave();
                              }} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '14px', padding: '4px 8px' }}>{t('settings:settingsPage.remove')}</button>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                              <FormGroup style={{ flex: 1, marginBottom: 0 }}>
                                <Label>{t('settings:settingsPage.availableFrom')}</Label>
                                <Input type="time" value={sched.start_time}
                                  onChange={(e) => {
                                    setMobileSettings(prev => {
                                      const arr = [...prev.category_schedules];
                                      arr[index] = { ...arr[index], start_time: e.target.value };
                                      return { ...prev, category_schedules: arr };
                                    });
                                    mobileOrderCategorySchedulesRef.current?.triggerSave();
                                  }} />
                              </FormGroup>
                              <FormGroup style={{ flex: 1, marginBottom: 0 }}>
                                <Label>{t('settings:settingsPage.availableUntil')}</Label>
                                <Input type="time" value={sched.end_time}
                                  onChange={(e) => {
                                    setMobileSettings(prev => {
                                      const arr = [...prev.category_schedules];
                                      arr[index] = { ...arr[index], end_time: e.target.value };
                                      return { ...prev, category_schedules: arr };
                                    });
                                    mobileOrderCategorySchedulesRef.current?.triggerSave();
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
                          <p style={{ color: '#9CA3AF', fontSize: '13px', textAlign: 'center', padding: '12px' }}>{t('settings:settingsPage.allCategoriesHaveSchedulesAssigned')}</p>
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
                              mobileOrderCategorySchedulesRef.current?.triggerSave();
                            }} style={{ padding: '10px 16px', background: '#F0F4FF', border: '1px dashed #635BFF', borderRadius: '8px', color: '#635BFF', fontSize: '14px', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                              Add Schedule
                            </button>
                          </div>
                        );
                      })()}
                    </>
                  </AutoSaveField>
                </SettingsCard>

                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.deliveryPricingSettings')}</CardTitle>
                  <Toggle>
                      <ToggleLabel>{t('settings:settingsPage.enableDeliveryService')}</ToggleLabel>
                      <AutoSaveField ref={mobileOrderDeliveryEnabledRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput type="checkbox" checked={operationSettings.deliveryPricing?.enabled || false}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, enabled: e.target.checked } })); mobileOrderDeliveryEnabledRef.current?.triggerSave(); }} />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>

                  {operationSettings.deliveryPricing?.enabled && (
                    <>
                      <Divider />
                      <FormGroup>
                        <Label>{t('settings:settingsPage.minimumOrderAmount')}</Label>
                        <AutoSaveField onSave={handleSave}>
                          <FeeInput type="number" step="1.00" value={operationSettings.deliveryPricing.minimumOrder}
                            onChange={(e) => { setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, minimumOrder: Number(e.target.value) } })); }} />
                        </AutoSaveField>
                        <span style={{ color: '#6B7C93', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                        <HelpText>Minimum subtotal required for delivery orders (0 = no minimum)</HelpText>
                      </FormGroup>
                      <FormGroup>
                        <Label>{t('settings:settingsPage.freeDeliveryAbove')}</Label>
                        <AutoSaveField onSave={handleSave}>
                          <FeeInput type="number" step="1.00" value={operationSettings.deliveryPricing.freeAbove}
                            onChange={(e) => { setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, freeAbove: Number(e.target.value) } })); }} />
                        </AutoSaveField>
                        <span style={{ color: '#6B7C93', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                        <HelpText>Waive delivery fee if order subtotal exceeds this amount (999999 = never free)</HelpText>
                      </FormGroup>
                      <Divider />
                      <Label style={{ marginBottom: '16px' }}>{t('settings:settingsPage.deliveryZones')}</Label>
                      <HelpText style={{ marginBottom: '16px' }}>{t('settings:settingsPage.configureDeliveryZonesAndTheirCorrespondingFees')}</HelpText>
                          {(operationSettings.deliveryPricing.zones || []).map((zone: any, index: number) => (
                            <div key={index} style={{ background: '#FAFBFC', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #E6EBF1' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <Label style={{ margin: 0 }}>Zone {index + 1}</Label>
                                <button onClick={() => {
                                  const zones = [...(operationSettings.deliveryPricing.zones || [])]; zones.splice(index, 1);
                                  setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, zones } }));
                                  setTimeout(() => handleSave(), 300);
                                }} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '14px', padding: '4px 8px' }}>{t('settings:settingsPage.remove')}</button>
                              </div>
                              <FormGroup><Label>{t('settings:settingsPage.zoneName')}</Label><AutoSaveField onSave={handleSave}><Input type="text" placeholder="e.g., Zone A (City Center)" value={zone.name}
                                onChange={(e) => { const zones = [...(operationSettings.deliveryPricing.zones || [])]; zones[index] = { ...zones[index], name: e.target.value };
                                  setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, zones } })); }} /></AutoSaveField></FormGroup>
                              <FormGroup><Label>{t('settings:settingsPage.description')}</Label><AutoSaveField onSave={handleSave}><Input type="text" placeholder="e.g., 3km radius" value={zone.description}
                                onChange={(e) => { const zones = [...(operationSettings.deliveryPricing.zones || [])]; zones[index] = { ...zones[index], description: e.target.value };
                                  setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, zones } })); }} /></AutoSaveField></FormGroup>
                              <FormGroup><Label>{t('settings:settingsPage.deliveryFee')}</Label><AutoSaveField onSave={handleSave}><FeeInput type="number" step="0.50" value={zone.fee}
                                onChange={(e) => { const zones = [...(operationSettings.deliveryPricing.zones || [])]; zones[index] = { ...zones[index], fee: Number(e.target.value) };
                                  setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, zones } })); }} /></AutoSaveField>
                                <span style={{ color: '#6B7C93', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span></FormGroup>
                            </div>
                          ))}
                          <button onClick={() => {
                            const zones = [...(operationSettings.deliveryPricing.zones || [])]; zones.push({ id: `zone-${Date.now()}`, name: '', description: '', fee: 0 });
                            setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, zones } }));
                            setTimeout(() => handleSave(), 300);
                          }} style={{ width: '100%', padding: '12px', background: '#F0F4FF', border: '1px dashed #635BFF', borderRadius: '8px', color: '#635BFF', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
                            Add Delivery Zone
                          </button>
                    </>
                  )}
                </SettingsCard>

              </SettingsGrid>
            </>
          )}

          {activeTab === 'reservation' && (
            <ReservationSettingsTab />
          )}

          {activeTab === 'printer' && (
            <>
              {/* Printer Mode Card - Full Width */}
              <SettingsCard style={{ marginBottom: '24px' }}>
                <CardTitle>{t('settings:settingsPage.printerMode')}</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                  Select how to connect to your thermal printer
                </p>

                {printerSettingsLoading ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#6B7C93' }}>
                    Loading printer settings...
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {([
                    { key: 'rawbt', label: 'RawBT (Android)', desc: 'For Android tablets with RawBT app' },
                    { key: 'browser', label: 'Browser Print (PC)', desc: 'For Windows/Mac computers' },
                    { key: 'qztray', label: 'QZ Tray (Network)', desc: 'For LAN network printers' },
                  ] as const).map(opt => (
                    <AutoSaveField key={opt.key} ref={(h: AutoSaveHandle | null) => { if (h) printerModeRefs.current.set(opt.key, h); }} onSave={handleSave} type="toggle" style={{ flex: 1, minWidth: 150 }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 16px',
                      border: printerMode === opt.key ? '2px solid #635BFF' : '1px solid #E2E8F0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: printerMode === opt.key ? '#F5F3FF' : '#fff',
                      minWidth: '150px'
                    }}>
                      <input
                        type="radio"
                        name="printerMode"
                        value={opt.key}
                        checked={printerMode === opt.key}
                        onChange={async () => {
                          setPrinterModeState(opt.key as any);
                          setPrinterMode(opt.key);
                          printerModeRefs.current.get(opt.key)?.triggerSave();
                          if (opt.key === 'qztray') {
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
                          }
                        }}
                        style={{ accentColor: '#635BFF' }}
                      />
                      <div>
                        <div style={{ fontWeight: 500, color: '#1F2937' }}>{opt.label}</div>
                        <div style={{ fontSize: '12px', color: '#6B7C93' }}>{opt.desc}</div>
                      </div>
                    </label>
                    </AutoSaveField>
                  ))}
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
                        <h2 style={{ margin: 0, fontSize: '20px', color: '#1F2937' }}>{t('settings:settingsPage.qzTraySetupGuide')}</h2>
                        <button onClick={() => setShowQzGuide(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#6B7C93', padding: '4px' }}>&times;</button>
                      </div>

                      {/* What is QZ Tray */}
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '15px', color: '#374151', marginBottom: '8px' }}>{t('settings:settingsPage.whatIsQzTray')}</h3>
                        <p style={{ fontSize: '14px', color: '#6B7C93', lineHeight: '1.7', margin: 0 }}>
                          {t('settings:settingsPage.whatIsQzTrayDesc')}
                        </p>
                      </div>

                      {/* Where to install */}
                      <div style={{ marginBottom: '24px', padding: '14px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '15px', color: '#92400E', marginBottom: '8px', marginTop: 0 }}>{t('settings:settingsPage.whereToInstall')}</h3>
                        <p style={{ fontSize: '14px', color: '#92400E', lineHeight: '1.7', margin: 0 }}>
                          {t('settings:settingsPage.whereToInstallDesc1')}
                          <br /><br />
                          {t('settings:settingsPage.whereToInstallDesc2')}
                        </p>
                      </div>

                      {/* Scenario selector */}
                      <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '15px', color: '#374151', marginBottom: '10px' }}>{t('settings:settingsPage.qzChooseScenario')}</h3>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                          {[
                            { key: 'migration' as const, label: t('settings:settingsPage.qzScenarioMigration') },
                            { key: 'fresh' as const, label: t('settings:settingsPage.qzScenarioFresh') },
                          ].map(opt => {
                            const active = qzScenario === opt.key;
                            return (
                              <button
                                key={opt.key}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setQzScenario(opt.key)}
                                style={{
                                  flex: 1, padding: '10px 14px', fontSize: '13px', fontWeight: 600,
                                  border: active ? '2px solid #635BFF' : '1px solid #D1D5DB', borderRadius: '8px',
                                  background: active ? '#EEF2FF' : '#fff', color: active ? '#635BFF' : '#374151',
                                  cursor: 'pointer', textAlign: 'left', lineHeight: 1.4
                                }}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                        <p style={{ fontSize: '13px', color: '#6B7C93', lineHeight: 1.6, margin: 0 }}>
                          {qzScenario === 'migration'
                            ? t('settings:settingsPage.qzScenarioMigrationDesc')
                            : t('settings:settingsPage.qzScenarioFreshDesc')}
                        </p>
                      </div>

                      {/* Step by step */}
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '15px', color: '#374151', marginBottom: '12px' }}>{t('settings:settingsPage.setupSteps')}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {(qzScenario === 'migration'
                            ? [
                                {
                                  title: t('settings:settingsPage.qzMigStep1Title'),
                                  desc: t('settings:settingsPage.qzMigStep1Desc'),
                                  action: (
                                    <>
                                      <button onClick={() => window.open('https://qz.io/download/', '_blank')} style={{ marginTop: '8px', padding: '6px 16px', fontSize: '13px', border: '1px solid #635BFF', borderRadius: '6px', background: '#635BFF', color: '#fff', cursor: 'pointer' }}>{t('settings:settingsPage.downloadQzTray')}</button>
                                      <div style={{ marginTop: '6px', fontSize: '12px', color: '#10B981', fontStyle: 'italic' }}>
                                        {t('settings:settingsPage.qzMigStep1AlreadyInstalledHint')}
                                      </div>
                                    </>
                                  )
                                },
                                { title: t('settings:settingsPage.qzMigStep2Title'), desc: t('settings:settingsPage.qzMigStep2Desc') },
                                { title: t('settings:settingsPage.qzCommonAllowBrowserTitle'), desc: t('settings:settingsPage.qzCommonAllowBrowserDesc') },
                                { title: t('settings:settingsPage.qzMigStep3Title'), desc: t('settings:settingsPage.qzMigStep3Desc') },
                              ]
                            : [
                                { title: t('settings:settingsPage.qzFreshStep1Title'), desc: t('settings:settingsPage.qzFreshStep1Desc') },
                                { title: t('settings:settingsPage.qzFreshStep2Title'), desc: t('settings:settingsPage.qzFreshStep2Desc') },
                                { title: t('settings:settingsPage.qzFreshStep3Title'), desc: t('settings:settingsPage.qzFreshStep3Desc') },
                                {
                                  title: t('settings:settingsPage.qzFreshStep4Title'),
                                  desc: t('settings:settingsPage.qzFreshStep4Desc'),
                                  action: <button onClick={() => window.open('https://qz.io/download/', '_blank')} style={{ marginTop: '8px', padding: '6px 16px', fontSize: '13px', border: '1px solid #635BFF', borderRadius: '6px', background: '#635BFF', color: '#fff', cursor: 'pointer' }}>{t('settings:settingsPage.downloadQzTray')}</button>
                                },
                                { title: t('settings:settingsPage.qzCommonAllowBrowserTitle'), desc: t('settings:settingsPage.qzCommonAllowBrowserDesc') },
                                { title: t('settings:settingsPage.qzFreshStep5Title'), desc: t('settings:settingsPage.qzFreshStep5Desc') },
                              ]
                          ).map(({ title, desc, action }, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '14px' }}>
                              <div style={{
                                width: '28px', height: '28px', borderRadius: '50%', background: '#635BFF', color: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, flexShrink: 0
                              }}>{idx + 1}</div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937', marginBottom: '4px' }}>{title}</div>
                                <div style={{ fontSize: '13px', color: '#6B7C93', lineHeight: '1.6' }}>{desc}</div>
                                {action}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Desktop app note */}
                      <div style={{ marginBottom: '20px', padding: '12px 14px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px' }}>
                        <p style={{ fontSize: '13px', color: '#075985', lineHeight: '1.7', margin: 0 }}>
                          <strong>{t('settings:settingsPage.qzDesktopAppNoteTitle')}</strong>{' '}
                          {t('settings:settingsPage.qzDesktopAppNoteDesc')}
                        </p>
                      </div>

                      {/* Network diagram */}
                      <div style={{ marginBottom: '24px', padding: '16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '15px', color: '#374151', marginBottom: '10px', marginTop: 0 }}>{t('settings:settingsPage.howItWorks')}</h3>
                        <div style={{ fontSize: '13px', color: '#6B7C93', fontFamily: 'monospace', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
{`${t('settings:settingsPage.qzDiagramPos')}
    │
    ▼
${t('settings:settingsPage.qzDiagramBridge')}
    │
    ▼  ${t('settings:settingsPage.qzDiagramVia')}
    │
    ├── 192.168.x.x:9100 → ${t('settings:settingsPage.billPrinter')}
    └── 192.168.x.x:9100 → ${t('settings:settingsPage.kitchenPrinter')}`}
                        </div>
                        <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '10px 0 0 0' }}>
                          {t('settings:settingsPage.qzDiagramFooter')}
                        </p>
                      </div>

                      {/* Troubleshooting */}
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '15px', color: '#374151', marginBottom: '8px' }}>{t('settings:settingsPage.troubleshooting')}</h3>
                        <div style={{ fontSize: '13px', color: '#6B7C93', lineHeight: '1.8' }}>
                          <strong>{t('settings:settingsPage.qzTroubleNotConnectedLabel')}</strong> {t('settings:settingsPage.qzTroubleNotConnectedDesc')}<br />
                          <strong>{t('settings:settingsPage.qzTroubleTestPrintLabel')}</strong> {t('settings:settingsPage.qzTroubleTestPrintDesc')}<br />
                          <strong>{t('settings:settingsPage.qzTroubleNoPrintersLabel')}</strong> {t('settings:settingsPage.qzTroubleNoPrintersDesc')}
                        </div>
                      </div>

                      <button
                        onClick={() => setShowQzGuide(false)}
                        style={{
                          width: '100%', padding: '12px', fontSize: '15px', fontWeight: 600,
                          border: 'none', borderRadius: '8px', background: '#635BFF', color: '#fff', cursor: 'pointer'
                        }}
                      >
                        {t('settings:settingsPage.qzGotIt')}
                      </button>
                    </div>
                  </div>
                )}
              </SettingsCard>

              {!printerSettingsLoading && (
              <SettingsGrid>
                {/* Bill Printer Card */}
                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.billPrinter')}</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                    Configure receipt printer for customer bills
                  </p>

                  <Toggle>
                    <ToggleLabel>{t('settings:settingsPage.enableBillPrinter')}</ToggleLabel>
                    <AutoSaveField ref={billPrinterToggleRef} onSave={handleSave} type="toggle">
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={printerSettings.billPrinter.enabled}
                        onChange={(e) => {
                          setPrinterSettings(prev => ({
                            ...prev,
                            billPrinter: { ...prev.billPrinter, enabled: e.target.checked }
                          }));
                          billPrinterToggleRef.current?.triggerSave();
                        }}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                    </AutoSaveField>
                  </Toggle>

                  {printerSettings.billPrinter.enabled && (
                    <>
                      <div style={{ marginTop: '16px', padding: '10px 12px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', fontSize: '13px', color: '#075985', lineHeight: '1.5' }}>
                        {printerMode === 'qztray' ? (
                          <>{t('settings:settingsPage.sendReceiptsDirectlyToANetworkPrinterViaQzTray')}<br />{t('settings:settingsPage.enterThePrintersNetworkIpAddressBelow')}</>
                        ) : printerMode === 'rawbt' ? (
                          <>{t('settings:settingsPage.printsToRawbtDefaultPrinter')}<br />{t('settings:settingsPage.setYourBillPrinterAsDefaultInRawbtApp')}</>
                        ) : (
                          <>{t('settings:settingsPage.opensBrowserPrintDialogForReceipts')}<br />{t('settings:settingsPage.connectAReceiptPrinterViaUsbOrNetwork')}</>
                        )}
                      </div>

                      {printerMode === 'qztray' && (
                        <div style={{ marginTop: '16px' }}>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}>
                            Printer Address
                          </label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <AutoSaveField onSave={handleSave}>
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
                            </AutoSaveField>
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
                              <AutoSaveField onSave={handleSave} type="select">
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
                              </AutoSaveField>
                            </div>
                          )}
                        </div>
                      )}

                      <AutoSaveField ref={billPrinterAutoPrintRef} onSave={handleSave} type="toggle">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={printerSettings.billPrinter.autoPrint}
                          onChange={(e) => {
                            setPrinterSettings(prev => ({
                              ...prev,
                              billPrinter: { ...prev.billPrinter, autoPrint: e.target.checked }
                            }));
                            billPrinterAutoPrintRef.current?.triggerSave();
                          }}
                          style={{ width: '18px', height: '18px', accentColor: '#635BFF' }}
                        />
                        <span style={{ fontSize: '14px', color: '#374151' }}>{t('settings:settingsPage.autoprintAfterPayment')}</span>
                      </label>
                      </AutoSaveField>
                    </>
                  )}
                </SettingsCard>

                {/* Kitchen Printer Card — Station 유무 관계없이 동일 */}
                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.kitchenPrinter')}</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                    Configure printer for kitchen order tickets
                  </p>

                  <Toggle>
                    <ToggleLabel>{t('settings:settingsPage.enableKitchenPrinter')}</ToggleLabel>
                    <AutoSaveField ref={kitchenPrinterToggleRef} onSave={handleSave} type="toggle">
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={printerSettings.kitchenPrinter.enabled}
                        onChange={(e) => {
                          setPrinterSettings(prev => ({
                            ...prev,
                            kitchenPrinter: { ...prev.kitchenPrinter, enabled: e.target.checked }
                          }));
                          kitchenPrinterToggleRef.current?.triggerSave();
                        }}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                    </AutoSaveField>
                  </Toggle>

                  {printerSettings.kitchenPrinter.enabled && (
                    <>
                      <div style={{ marginTop: '16px', padding: '10px 12px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', fontSize: '13px', color: '#075985', lineHeight: '1.5' }}>
                        {printerMode === 'qztray' ? (
                          <>{t('settings:settingsPage.sendKitchenTicketsDirectlyToANetworkPrinterViaQzTray')}<br />{t('settings:settingsPage.enterTheKitchenPrintersNetworkIpAddressBelow')}</>
                        ) : printerMode === 'browser' ? (
                          <>{t('settings:settingsPage.opensBrowserPrintDialogForKitchenOrderTickets')}</>
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
                                      <AutoSaveField onSave={handleSave}>
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
                                      </AutoSaveField>
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
                                <AutoSaveField onSave={handleSave}>
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
                                </AutoSaveField>
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
                              <AutoSaveField onSave={handleSave} type="select">
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
                              </AutoSaveField>
                            </div>
                          )}
                        </div>
                      )}

                      <AutoSaveField ref={kitchenPrinterAutoPrintRef} onSave={handleSave} type="toggle">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={printerSettings.kitchenPrinter.autoPrint}
                          onChange={(e) => {
                            setPrinterSettings(prev => ({
                              ...prev,
                              kitchenPrinter: { ...prev.kitchenPrinter, autoPrint: e.target.checked }
                            }));
                            kitchenPrinterAutoPrintRef.current?.triggerSave();
                          }}
                          style={{ width: '18px', height: '18px', accentColor: '#635BFF' }}
                        />
                        <span style={{ fontSize: '14px', color: '#374151' }}>{t('settings:settingsPage.autoprintOnNewOrder')}</span>
                      </label>
                      </AutoSaveField>
                    </>
                  )}
                </SettingsCard>
              </SettingsGrid>
              )}

              {/* Kitchen Ticket Options - Always visible regardless of printer mode */}
              {!printerSettingsLoading && (
                <SettingsCard style={{ marginTop: '24px' }}>
                  <CardTitle>{t('settings:settingsPage.kitchenTicketOptions')}</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                    Configure how kitchen order tickets are printed
                  </p>

                  <Toggle>
                    <div style={{ flex: 1 }}>
                      <ToggleLabel style={{ marginBottom: '4px' }}>{t('settings:settingsPage.printSeparateTicketForEachItem')}</ToggleLabel>
                      <p style={{ fontSize: '12px', color: '#6B7C93', margin: 0 }}>
                        When enabled, each menu item will print on a separate ticket instead of one combined ticket per order
                      </p>
                    </div>
                    <AutoSaveField ref={printPerItemToggleRef} onSave={handleSave} type="toggle">
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={printerSettings.kitchenPrinter.printPerItem || false}
                        onChange={(e) => {
                          setPrinterSettings(prev => ({
                            ...prev,
                            kitchenPrinter: { ...prev.kitchenPrinter, printPerItem: e.target.checked }
                          }));
                          printPerItemToggleRef.current?.triggerSave();
                        }}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                    </AutoSaveField>
                  </Toggle>
                </SettingsCard>
              )}

              {/* Receipt Customization */}
              <SettingsCard style={{ marginTop: '24px' }}>
                <CardTitle>{t('settings:settingsPage.receiptCustomization')}</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                  Customize the customer receipt with your logo, message, and promotions
                </p>

                <div className="receipt-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0' }}>
                  {/* Left column: Logo + Footer + Membership */}
                  <div className="receipt-col-left" style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '24px' }}>
                    {/* Receipt Logo */}
                    <AutoSaveField ref={receiptLogoRef} onSave={handleSave} type="image">
                    <ImageUploadDropzone
                      value={receiptSettings.receiptLogo}
                      onChange={(value) => { setReceiptSettings(prev => ({ ...prev, receiptLogo: value })); receiptLogoRef.current?.triggerSave(); }}
                      label="Receipt Logo (B&W)"
                      helpText="Printed at the top of receipt"
                    />
                    </AutoSaveField>

                    {/* Membership Info */}
                    <Toggle>
                      <div style={{ flex: 1 }}>
                        <ToggleLabel style={{ marginBottom: '4px' }}>{t('settings:settingsPage.membershipInfoOnReceipt')}</ToggleLabel>
                        <p style={{ fontSize: '12px', color: '#6B7C93', margin: 0 }}>
                          QR code linking to mobile order page with points earning message
                        </p>
                      </div>
                      <AutoSaveField ref={receiptMembershipToggleRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput type="checkbox" checked={receiptSettings.showMembership} onChange={(e) => {
                          setReceiptSettings(prev => ({ ...prev, showMembership: e.target.checked }));
                          receiptMembershipToggleRef.current?.triggerSave();
                        }} />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>

                    {/* Footer Message */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6B7C93', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{t('settings:settingsPage.footerMessage')}</label>
                      <AutoSaveField onSave={handleSave}>
                      <input type="text" value={receiptSettings.footerMessage} onChange={(e) => setReceiptSettings(prev => ({ ...prev, footerMessage: e.target.value }))} placeholder="Thank you for dining with us!" maxLength={100} style={{ width: '100%', padding: '8px 12px', border: '1px solid #E6EBF1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                      </AutoSaveField>
                    </div>
                  </div>

                  {/* Vertical divider — hidden on mobile */}
                  <div className="receipt-divider" style={{ width: '1px', background: '#E6EBF1', margin: '0' }} />

                  {/* Right column: Custom QR / Promotion */}
                  <div className="receipt-col-right" style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '24px' }}>
                    <AutoSaveField ref={customQrImageRef} onSave={handleSave} type="image">
                    <ImageUploadDropzone
                      value={receiptSettings.customQrImage}
                      onChange={(value) => { setReceiptSettings(prev => ({ ...prev, customQrImage: value })); customQrImageRef.current?.triggerSave(); }}
                      label="Custom QR / Promotion"
                      helpText="Print your own QR or promo image on receipt"
                    />
                    </AutoSaveField>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6B7C93', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{t('settings:settingsPage.guideText')}</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <AutoSaveField onSave={handleSave}>
                        <input type="text" value={receiptSettings.customQrText} onChange={(e) => setReceiptSettings(prev => ({ ...prev, customQrText: e.target.value }))} placeholder="e.g. Follow us on Instagram!" maxLength={100} style={{ flex: 1, padding: '8px 12px', border: '1px solid #E6EBF1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                        </AutoSaveField>
                        <AutoSaveField ref={qrPositionRef} onSave={handleSave} type="toggle">
                        <div style={{ display: 'flex', gap: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '8px 10px', borderRadius: '6px', border: `1px solid ${receiptSettings.customQrPosition === 'front' ? '#635BFF' : '#E6EBF1'}`, background: receiptSettings.customQrPosition === 'front' ? '#F8F7FF' : 'white', fontSize: '12px', whiteSpace: 'nowrap' }}>
                          <input type="radio" name="customQrPosition" checked={receiptSettings.customQrPosition === 'front'} onChange={() => { setReceiptSettings(prev => ({ ...prev, customQrPosition: 'front' })); qrPositionRef.current?.triggerSave(); }} style={{ margin: 0 }} />
                          <span style={{ fontWeight: 500, color: '#0A2540' }}>{t('settings:settingsPage.beforeQr')}</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '8px 10px', borderRadius: '6px', border: `1px solid ${receiptSettings.customQrPosition === 'back' ? '#635BFF' : '#E6EBF1'}`, background: receiptSettings.customQrPosition === 'back' ? '#F8F7FF' : 'white', fontSize: '12px', whiteSpace: 'nowrap' }}>
                          <input type="radio" name="customQrPosition" checked={receiptSettings.customQrPosition === 'back'} onChange={() => { setReceiptSettings(prev => ({ ...prev, customQrPosition: 'back' })); qrPositionRef.current?.triggerSave(); }} style={{ margin: 0 }} />
                          <span style={{ fontWeight: 500, color: '#0A2540' }}>{t('settings:settingsPage.afterQr')}</span>
                        </label>
                        </div>
                        </AutoSaveField>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Responsive: stack columns + hide divider on small screens */}
                <style>{`
                  @media (max-width: 768px) {
                    .receipt-grid { grid-template-columns: 1fr !important; }
                    .receipt-divider { display: none !important; }
                    .receipt-col-left { padding-right: 0 !important; padding-bottom: 20px !important; border-bottom: 1px solid #E6EBF1 !important; }
                    .receipt-col-right { padding-left: 0 !important; padding-top: 20px !important; }
                  }
                `}</style>
              </SettingsCard>

              {/* Customer Display (Dual Monitor) Card */}
              <SettingsCard style={{ marginTop: '24px' }}>
                <CardTitle>{t('settings:settingsPage.customerDisplay.title', 'Customer Display (Dual Monitor)')}</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px', lineHeight: 1.5 }}>
                  {t('settings:settingsPage.customerDisplay.description', 'Show order details on a second monitor facing the customer (POS rear screen). Click Open Now after connecting the secondary monitor — your browser will ask once for permission, then remember it.')}
                </p>

                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={async () => {
                      const ok = await openCustomerDisplay(user?.restaurantId || '');
                      if (!ok) alert(t('settings:settingsPage.customerDisplay.popupBlocked', 'Popup blocked. Allow popups for this site in your browser settings and try again.'));
                    }}
                    style={{
                      padding: '10px 20px', fontSize: '14px', fontWeight: 500,
                      background: '#635BFF', color: 'white', border: 'none',
                      borderRadius: '6px', cursor: 'pointer'
                    }}
                  >
                    {t('settings:settingsPage.customerDisplay.openNow', 'Open Now')}
                  </button>

                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: '#0A2540' }}>
                    <input
                      type="checkbox"
                      defaultChecked={isAutoOpenEnabled()}
                      onChange={(e) => setAutoOpenEnabled(e.target.checked)}
                      style={{ width: 16, height: 16, accentColor: '#635BFF' }}
                    />
                    {t('settings:settingsPage.customerDisplay.autoOpenLabel', 'Auto-reopen when POS Terminal starts (after first click)')}
                  </label>
                </div>

                {/* Phone-input visibility toggle — for membership use only.
                    If a restaurant doesn't run a points/membership program, hide the keypad
                    so the customer screen shows only the order summary. */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 14, color: '#0A2540', padding: '12px 14px', background: '#FAFBFC', border: '1px solid #E6EBF1', borderRadius: 8 }}>
                  <input
                    type="checkbox"
                    defaultChecked={(operationSettings as any)?.checkout_display?.show_phone_input !== false}
                    onChange={async (e) => {
                      const enabled = e.target.checked;
                      const rid = user?.restaurantId;
                      if (!rid) return;
                      try {
                        const token = getAuthToken();
                        const r = await fetch(`/api/restaurants/${rid}`, { headers: { Authorization: `Bearer ${token}` } });
                        const j = await r.json();
                        const cur = (j.data || j)?.operation_settings || {};
                        const nextOp = { ...cur, checkout_display: { ...(cur.checkout_display || {}), show_phone_input: enabled } };
                        await fetch(`/api/restaurants/${rid}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                          body: JSON.stringify({ operation_settings: nextOp })
                        });
                        setOperationSettings(prev => ({ ...prev, ...(nextOp as any) } as any));
                      } catch { /* silent — toggle stays in DOM, retry next change */ }
                    }}
                    style={{ width: 16, height: 16, accentColor: '#635BFF', marginTop: 2 }}
                  />
                  <span>
                    <span style={{ display: 'block', fontWeight: 500 }}>
                      {t('settings:settingsPage.customerDisplay.showPhoneInputLabel', 'Show phone number entry on customer screen (for membership)')}
                    </span>
                    <span style={{ display: 'block', fontSize: 12, color: '#6B7C93', marginTop: 4 }}>
                      {t('settings:settingsPage.customerDisplay.showPhoneInputHelp', 'Off = customer screen shows only order summary. Turn on if you collect customer phone for points/membership.')}
                    </span>
                  </span>
                </label>

                <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '16px', marginTop: 8 }}>
                  <div style={{ fontWeight: 600, color: '#075985', marginBottom: 10, fontSize: 14 }}>
                    {t('settings:settingsPage.customerDisplay.kioskGuideTitle', 'Want it 100% automatic on Windows boot? (Optional setup)')}
                  </div>
                  <div style={{ fontSize: 13, color: '#0C4A6E', lineHeight: 1.7 }}>
                    <div>{t('settings:settingsPage.customerDisplay.kioskStep1', '1. Right-click your desktop → New → Shortcut')}</div>
                    <div style={{ background: 'white', border: '1px solid #BAE6FD', borderRadius: 4, padding: '8px 10px', margin: '6px 0', fontFamily: 'monospace', fontSize: 12, wordBreak: 'break-all' }}>
                      {`"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" --kiosk --new-window --window-position=1920,0 https://purplehere.com/restaurant/${user?.restaurantId || 'YOUR_ID'}/checkout-display`}
                    </div>
                    <div>{t('settings:settingsPage.customerDisplay.kioskStep2', '2. Adjust --window-position=X,Y to your second monitor coordinates (X = primary monitor width, Y = 0 for top-left)')}</div>
                    <div>{t('settings:settingsPage.customerDisplay.kioskStep3', '3. Press Win+R → type shell:startup → drag the shortcut into that folder')}</div>
                    <div>{t('settings:settingsPage.customerDisplay.kioskStep4', '4. Reboot — Chrome will launch the customer display fullscreen on the rear monitor automatically')}</div>
                  </div>
                </div>
              </SettingsCard>

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
                <CardTitle>{t('settings:settingsPage.itemViewMergeSettings')}</CardTitle>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 16px' }}>
                  Control how same-name items are grouped in Kitchen Display Item View. Leave empty or 0 for unlimited merging (default).
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '400px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>{t('settings:settingsPage.timeLimitMinutes')}</label>
                    <AutoSaveField onSave={handleSave}>
                    <input type="number" min="0" value={itemMergeTimeLimit || ''} placeholder="0 = unlimited"
                      onChange={(e) => setItemMergeTimeLimit(parseInt(e.target.value) || 0)}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #E6EBF1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                    </AutoSaveField>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>{t('settings:settingsPage.maxCountPerGroup')}</label>
                    <AutoSaveField onSave={handleSave}>
                    <input type="number" min="0" value={itemMergeMaxCount || ''} placeholder="0 = unlimited"
                      onChange={(e) => setItemMergeMaxCount(parseInt(e.target.value) || 0)}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #E6EBF1', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                    </AutoSaveField>
                  </div>
                </div>
              </SettingsCard>

              {/* Single-station simplified notice — routing mode is irrelevant when only 1 station exists */}
              {!kitchenStationsLoading && kitchenStations.length <= 1 && (
                <SettingsCard style={{ marginBottom: '24px', background: '#F0FDF4', borderColor: '#BBF7D0' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>✓</span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#065F46', fontSize: '14px', marginBottom: '4px' }}>
                        You have 1 kitchen station. All orders will be routed here.
                      </div>
                      <div style={{ color: '#047857', fontSize: '13px' }}>
                        No setup needed. Add more stations below only if you want to split orders by preparation area.
                      </div>
                    </div>
                  </div>
                </SettingsCard>
              )}

              {/* Assignment Mode — only relevant with 2+ stations */}
              {kitchenStations.length > 1 && (
              <SettingsCard style={{ marginBottom: '24px' }}>
                <CardTitle>{t('settings:settingsPage.assignmentMode')}</CardTitle>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {([
                    { key: 'category', label: 'By Category (Recommended)', desc: 'Assign categories to stations. New menu items automatically follow their category.' },
                    { key: 'menu_item', label: 'By Menu Item', desc: 'Assign each menu item individually. More precise but requires manual assignment for new items.' },
                  ] as const).map(opt => (
                    <AutoSaveField key={opt.key} ref={(h: AutoSaveHandle | null) => { if (h) kitchenAssignmentRefs.current.set(opt.key, h); }} onSave={async () => {
                      const token = getAuthToken();
                      const res = await fetch(`/api/restaurants/${user?.restaurantId}`, {
                        method: 'PUT',
                        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ kitchen_assignment_mode: opt.key })
                      });
                      if (!res.ok) throw new Error('Save failed');
                    }} type="toggle" style={{ flex: 1, minWidth: 200 }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', padding: '12px', borderRadius: '8px', border: `1px solid ${kitchenAssignmentMode === opt.key ? '#635BFF' : '#E6EBF1'}`, background: kitchenAssignmentMode === opt.key ? '#F8F7FF' : 'white' }}>
                      <input type="radio" name="assignmentMode" checked={kitchenAssignmentMode === opt.key}
                        onChange={() => { setKitchenAssignmentMode(opt.key); kitchenAssignmentRefs.current.get(opt.key)?.triggerSave(); }}
                        style={{ marginTop: '2px' }} />
                      <div>
                        <div style={{ fontWeight: 600, color: '#0A2540', fontSize: '14px' }}>{opt.label}</div>
                        <div style={{ color: '#6B7C93', fontSize: '13px', marginTop: '4px' }}>{opt.desc}</div>
                      </div>
                    </label>
                    </AutoSaveField>
                  ))}
                </div>
              </SettingsCard>
              )}

              {/* Stations List */}
              <SettingsCard>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <CardTitle style={{ marginBottom: 0 }}>{t('settings:settingsPage.stations')}</CardTitle>
                  <SaveButton onClick={() => {
                    setEditingStation(null);
                    setStationForm({ name: '', category_ids: [], product_ids: [], alert_sound: 'bell' });
                    setShowStationModal(true);
                  }}>
                    Add Station
                  </SaveButton>
                </div>

                {kitchenStationsLoading ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>{t('settings:settingsPage.loading')}</div>
                ) : kitchenStations.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#6B7C93' }}>
                    <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px' }}>{t('settings:settingsPage.noKitchenStationsYet')}</div>
                    <div style={{ fontSize: '14px' }}>{t('settings:settingsPage.addStationsToSplitOrdersByKitchenArea')}</div>
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
                                <span style={{ fontSize: '11px', background: '#FEE2E2', color: '#EF4444', padding: '2px 8px', borderRadius: '10px', fontWeight: 500 }}>{t('settings:settingsPage.inactive')}</span>
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
                                onClick={() => setDeleteStationConfirm({ isOpen: true, stationId: station.id, stationName: station.name })}
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
                              <div style={{ color: '#F59E0B' }}>{t('settings:settingsPage.noItemsAssigned')}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Unassigned Warning — only meaningful when user has 2+ stations to route between */}
                {kitchenStations.length > 1 && (() => {
                  const assignedCatIds = new Set(kitchenStations.flatMap((s: any) => (s.categories || []).map((c: any) => c.id)));
                  const assignedProdIds = new Set(kitchenStations.flatMap((s: any) => (s.products || []).map((p: any) => p.id)));
                  const unassignedCats = allCategories.filter((c: any) => !assignedCatIds.has(c.id));
                  const unassignedProds = allProducts.filter((p: any) => !assignedProdIds.has(p.id));

                  // 카테고리 없는 아이템 찾기 (Uncategorized)
                  // Backend returns menu items with `categoryId` (camelCase) — also accept `category_id` for safety.
                  const validCatIds = new Set(allCategories.map((c: any) => Number(c.id)));
                  const uncategorizedProds = allProducts.filter((p: any) => {
                    const catId = p.categoryId ?? p.category_id;
                    return catId == null || !validCatIds.has(Number(catId));
                  });

                  const warnings: React.ReactElement[] = [];

                  if (kitchenAssignmentMode === 'category' && unassignedCats.length > 0) {
                    warnings.push(
                      <div key="unassigned-cats" style={{ padding: '12px 16px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', fontSize: '13px', color: '#92400E' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '16px' }}>⚠</span>
                          <strong>{unassignedCats.length} unassigned {unassignedCats.length === 1 ? 'category' : 'categories'}</strong>
                        </div>
                        <div>{unassignedCats.map((c: any) => `${c.emoji || ''} ${c.name}`.trim()).join(', ')}</div>
                        <div style={{ marginTop: '6px', color: '#B45309', fontSize: '12px' }}>These categories will show in all stations on Kitchen Display. Edit a station above to assign them.</div>
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
                        <div style={{ marginTop: '6px', color: '#B45309', fontSize: '12px' }}>These items will show in all stations on Kitchen Display. Edit a station above to assign them.</div>
                      </div>
                    );
                  }
                  if (kitchenAssignmentMode === 'category' && uncategorizedProds.length > 0) {
                    warnings.push(
                      <div key="uncategorized" style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '13px', color: '#991B1B' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '16px' }}>⚠</span>
                          <strong>{uncategorizedProds.length} uncategorized menu {uncategorizedProds.length === 1 ? 'item' : 'items'}</strong>
                        </div>
                        <div>{uncategorizedProds.map((p: any) => p.name).join(', ')}</div>
                        <div style={{ marginTop: '6px', color: '#B91C1C', fontSize: '12px' }}>{t('settings:settingsPage.theseItemsHaveNoCategoryAndCannotBeAssignedToAStation')}<a href={`/restaurant/${user?.restaurantId}/menu`} style={{ color: '#B91C1C', textDecoration: 'underline' }}>{t('settings:settingsPage.assignACategoryInMenuManagement')}</a>.</div>
                      </div>
                    );
                  }

                  if (warnings.length === 0) return null;
                  return <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>{warnings}</div>;
                })()}
              </SettingsCard>

              <ConfirmModal
                isOpen={deleteStationConfirm.isOpen}
                title="Delete Station"
                message={`Are you sure you want to delete "${deleteStationConfirm.stationName}"?\nAssigned categories and menu items will be unassigned.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
                onConfirm={async () => {
                  const id = deleteStationConfirm.stationId;
                  setDeleteStationConfirm({ isOpen: false, stationId: null, stationName: '' });
                  if (!id) return;
                  const token = getAuthToken();
                  await fetch(`/api/kitchen-stations/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                  });
                  loadKitchenStations();
                }}
                onCancel={() => setDeleteStationConfirm({ isOpen: false, stationId: null, stationName: '' })}
              />

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
                            const token = getAuthToken();
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
                      <Label>{t('settings:settingsPage.alertSound')}</Label>
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
                        <Label>{t('settings:settingsPage.assignCategories')}</Label>
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
                        <Label>{t('settings:settingsPage.assignMenuItems')}</Label>
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
                        <CardTitle style={{ marginBottom: 0 }}>{t('settings:settingsPage.pointsSettings')}</CardTitle>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <AutoSaveField ref={membershipActiveToggleRef} onSave={handleSaveMembership} type="toggle">
                          <ToggleSwitch>
                            <ToggleInput
                              type="checkbox"
                              checked={membershipSettings.is_active}
                              onChange={(e) => {
                                setMembershipSettings({ ...membershipSettings, is_active: e.target.checked });
                                membershipActiveToggleRef.current?.triggerSave();
                              }}
                            />
                            <ToggleSlider />
                          </ToggleSwitch>
                          </AutoSaveField>
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
                        <AutoSaveField onSave={handleSaveMembership}>
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
                            const pointsPerCurrency = (earnRatePercent * membershipSettings.points_to_currency) / 100;
                            setMembershipSettings({
                              ...membershipSettings,
                              points_per_currency: pointsPerCurrency
                            });
                          }}
                        />
                        </AutoSaveField>
                        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#6B7C93' }}>
                          e.g., {((membershipSettings.points_per_currency / membershipSettings.points_to_currency) * 100).toFixed(1)}% earn rate:
                          {getCurrencySymbol(currencySettings.currency)} 100 spent = {Math.round(100 * membershipSettings.points_per_currency)} points = {getCurrencySymbol(currencySettings.currency)} {(100 * membershipSettings.points_per_currency / membershipSettings.points_to_currency).toFixed(2)} value
                        </p>
                      </FormGroup>

                      <FormGroup>
                        <Label>{t('settings:settingsPage.pointsValue')}</Label>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8898AA' }}>
                          How many points equal {getCurrencySymbol(currencySettings.currency)} 1 when redeeming
                        </p>
                        <AutoSaveField onSave={handleSaveMembership}>
                        <Input
                          type="number"
                          step="1"
                          min="1"
                          value={membershipSettings.points_to_currency}
                          onChange={(e) => setMembershipSettings({ ...membershipSettings, points_to_currency: parseFloat(e.target.value) || 100 })}
                        />
                        </AutoSaveField>
                        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#6B7C93' }}>
                          {membershipSettings.points_to_currency} points = {getCurrencySymbol(currencySettings.currency)} 1
                        </p>
                      </FormGroup>

                      <FormGroup>
                        <Label>{t('settings:settingsPage.minimumPointsToUse')}</Label>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8898AA' }}>
                          Minimum points required before customer can redeem
                        </p>
                        <AutoSaveField onSave={handleSaveMembership}>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          value={membershipSettings.min_points_to_use}
                          onChange={(e) => setMembershipSettings({ ...membershipSettings, min_points_to_use: parseInt(e.target.value) || 0 })}
                        />
                        </AutoSaveField>
                      </FormGroup>

                      <FormGroup>
                        <Label>Max Points Per Order (%)</Label>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8898AA' }}>
                          Maximum percentage of order that can be paid with points
                        </p>
                        <AutoSaveField onSave={handleSaveMembership}>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          max="100"
                          value={membershipSettings.max_points_per_order_percent}
                          onChange={(e) => setMembershipSettings({ ...membershipSettings, max_points_per_order_percent: parseFloat(e.target.value) || 0 })}
                        />
                        </AutoSaveField>
                      </FormGroup>

                      <FormGroup>
                        <Label>{t('settings:settingsPage.pointsExpiryDays')}</Label>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8898AA' }}>
                          Number of days until points expire (0 = never)
                        </p>
                        <AutoSaveField onSave={handleSaveMembership}>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          value={membershipSettings.points_expiry_days}
                          onChange={(e) => setMembershipSettings({ ...membershipSettings, points_expiry_days: parseInt(e.target.value) || 0 })}
                        />
                        </AutoSaveField>
                      </FormGroup>

                      <FormGroup>
                        <Label>{t('settings:settingsPage.welcomePoints')}</Label>
                        <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#8898AA' }}>
                          Points given to new members on registration
                        </p>
                        <AutoSaveField onSave={handleSaveMembership}>
                        <Input
                          type="number"
                          step="1"
                          min="0"
                          value={membershipSettings.welcome_points}
                          onChange={(e) => setMembershipSettings({ ...membershipSettings, welcome_points: parseInt(e.target.value) || 0 })}
                        />
                        </AutoSaveField>
                      </FormGroup>
                    </SettingsCard>

                    {/* Tier Settings */}
                    <SettingsCard>
                      <CardTitle>{t('settings:settingsPage.tierThresholds')}</CardTitle>
                      <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#8898AA' }}>
                        Total spending required to reach each tier
                      </p>

                      <FormGroup>
                        <Label>Silver Threshold ({getCurrencySymbol(currencySettings.currency)})</Label>
                        <AutoSaveField onSave={handleSaveMembership}>
                        <Input
                          type="number"
                          step="100"
                          min="0"
                          value={membershipSettings.silver_threshold}
                          onChange={(e) => setMembershipSettings({ ...membershipSettings, silver_threshold: parseFloat(e.target.value) || 0 })}
                        />
                        </AutoSaveField>
                      </FormGroup>

                      <FormGroup>
                        <Label>Gold Threshold ({getCurrencySymbol(currencySettings.currency)})</Label>
                        <AutoSaveField onSave={handleSaveMembership}>
                        <Input
                          type="number"
                          step="100"
                          min="0"
                          value={membershipSettings.gold_threshold}
                          onChange={(e) => setMembershipSettings({ ...membershipSettings, gold_threshold: parseFloat(e.target.value) || 0 })}
                        />
                        </AutoSaveField>
                      </FormGroup>

                      <FormGroup>
                        <Label>VIP Threshold ({getCurrencySymbol(currencySettings.currency)})</Label>
                        <AutoSaveField onSave={handleSaveMembership}>
                        <Input
                          type="number"
                          step="100"
                          min="0"
                          value={membershipSettings.vip_threshold}
                          onChange={(e) => setMembershipSettings({ ...membershipSettings, vip_threshold: parseFloat(e.target.value) || 0 })}
                        />
                        </AutoSaveField>
                      </FormGroup>

                      <CardTitle style={{ marginTop: '24px' }}>{t('settings:settingsPage.bonusRates')}</CardTitle>
                      <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#8898AA' }}>
                        Point earning multiplier for each tier
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <FormGroup>
                          <Label>{t('settings:settingsPage.bronzeX')}</Label>
                          <AutoSaveField onSave={handleSaveMembership}>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            value={membershipSettings.bronze_bonus_rate}
                            onChange={(e) => setMembershipSettings({ ...membershipSettings, bronze_bonus_rate: parseFloat(e.target.value) || 1 })}
                          />
                          </AutoSaveField>
                        </FormGroup>

                        <FormGroup>
                          <Label>{t('settings:settingsPage.silverX')}</Label>
                          <AutoSaveField onSave={handleSaveMembership}>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            value={membershipSettings.silver_bonus_rate}
                            onChange={(e) => setMembershipSettings({ ...membershipSettings, silver_bonus_rate: parseFloat(e.target.value) || 1 })}
                          />
                          </AutoSaveField>
                        </FormGroup>

                        <FormGroup>
                          <Label>{t('settings:settingsPage.goldX')}</Label>
                          <AutoSaveField onSave={handleSaveMembership}>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            value={membershipSettings.gold_bonus_rate}
                            onChange={(e) => setMembershipSettings({ ...membershipSettings, gold_bonus_rate: parseFloat(e.target.value) || 1 })}
                          />
                          </AutoSaveField>
                        </FormGroup>

                        <FormGroup>
                          <Label>{t('settings:settingsPage.vipX')}</Label>
                          <AutoSaveField onSave={handleSaveMembership}>
                          <Input
                            type="number"
                            step="0.1"
                            min="1"
                            value={membershipSettings.vip_bonus_rate}
                            onChange={(e) => setMembershipSettings({ ...membershipSettings, vip_bonus_rate: parseFloat(e.target.value) || 1 })}
                          />
                          </AutoSaveField>
                        </FormGroup>
                      </div>

                      <CardTitle style={{ marginTop: '24px' }}>Tier Discounts (%)</CardTitle>
                      <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#8898AA' }}>
                        Automatic discount for each tier
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <FormGroup>
                          <Label>Bronze (%)</Label>
                          <AutoSaveField onSave={handleSaveMembership}>
                          <Input
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            value={membershipSettings.bronze_discount_percent}
                            onChange={(e) => setMembershipSettings({ ...membershipSettings, bronze_discount_percent: parseFloat(e.target.value) || 0 })}
                          />
                          </AutoSaveField>
                        </FormGroup>

                        <FormGroup>
                          <Label>Silver (%)</Label>
                          <AutoSaveField onSave={handleSaveMembership}>
                          <Input
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            value={membershipSettings.silver_discount_percent}
                            onChange={(e) => setMembershipSettings({ ...membershipSettings, silver_discount_percent: parseFloat(e.target.value) || 0 })}
                          />
                          </AutoSaveField>
                        </FormGroup>

                        <FormGroup>
                          <Label>Gold (%)</Label>
                          <AutoSaveField onSave={handleSaveMembership}>
                          <Input
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            value={membershipSettings.gold_discount_percent}
                            onChange={(e) => setMembershipSettings({ ...membershipSettings, gold_discount_percent: parseFloat(e.target.value) || 0 })}
                          />
                          </AutoSaveField>
                        </FormGroup>

                        <FormGroup>
                          <Label>VIP (%)</Label>
                          <AutoSaveField onSave={handleSaveMembership}>
                          <Input
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            value={membershipSettings.vip_discount_percent}
                            onChange={(e) => setMembershipSettings({ ...membershipSettings, vip_discount_percent: parseFloat(e.target.value) || 0 })}
                          />
                          </AutoSaveField>
                        </FormGroup>
                      </div>
                    </SettingsCard>
                  </SettingsGrid>

                  {/* Point Policy Reference — info only, below save button */}
                  <SettingsCard style={{ marginTop: '24px', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <CardTitle style={{ fontSize: '14px', color: '#64748B' }}>{t('settings:settingsPage.pointSystemPolicyReference')}</CardTitle>
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
                </>
              )}
            </div>
          )}

        </Content>
      </SettingsContainer>

      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText={t('common:ok', 'OK')}
        type="info"
        singleButton
      />
    </>
  );
};

// ImportDataTab moved to /components/Settings/ImportDataTab.tsx
// Accessed via System Settings > Import Data tab

export default SettingsPage;
