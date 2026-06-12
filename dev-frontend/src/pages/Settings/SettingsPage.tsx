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
import DateField from '../../components/Common/DateField';
import ItemScheduleEditor from '../MenuManagement/ItemScheduleEditor';
import ReservationSettingsTab from '../../components/Settings/ReservationSettingsTab';
import AutoPrintPreviewModal from '../../components/Settings/AutoPrintPreviewModal';
import ZonesAndGroupsCard from './components/ZonesAndGroupsCard';
import AddressFields from '../../components/Form/AddressFields';
import ConfirmModal from '../../components/ConfirmModal';
import { useTabParam } from '../../hooks/useTabParam';
import { getPrinterMode, setPrinterMode, connectQZTray, disconnectQZTray, isQZTrayConnected, getQZTrayPrinters, qzTrayTestPrint, getActiveWorkstationId, setActiveWorkstationId, runQZDiagnostic, printHTMLContent } from '../../utils/billPrint';
import { getCurrencySymbol } from '../../utils/currency';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { openCustomerDisplay, isAutoOpenEnabled, setAutoOpenEnabled, resetCustomerDisplayPosition } from '../../utils/customerDisplay';
// 스타일 컴포넌트
const SettingsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #F9FAFB;
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
    background: #C7CED6;
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
  border: 1px solid #C7CED6;
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
  color: #4B5563;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
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
    background: #F4F6F9;
    color: #8898AA;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
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
  background-color: #C7CED6;
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
  border-top: 1px solid #F4F6F9;
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
  border-top: 1px solid #C7CED6;
`;

const PaymentMethodCard = styled.div`
  background: #F4F6F9;
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
  border: 1px solid #C7CED6;
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
  border: 1px solid #C7CED6;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  color: #4B5563;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }
`;

// 타입 정의
type TabType = 'store' | 'operations' | 'tablesQr' | 'payment' | 'printer' | 'kitchenStations' | 'mobileOrder' | 'reservation' | 'company' | 'brands' | 'billing' | 'managers' | 'membership';

interface Table {
  id: string;
  number: number;
  qrCode: string;
  isActive: boolean;
}

interface StoreSettings {
  name: string;
  phone: string;          // Mobile phone (POS notifications only — never printed on bills)
  telephone: string;      // Store landline — printed on bills if provided
  email: string;
  address: string;
  address_line_2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
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
  prepTimeTracking: boolean;
  defaultPreparationTimePerItem: number;
  prepUrgentThreshold: number;
  taxEnabled: boolean;
  taxRate: number;
  serviceChargeEnabled: boolean;
  serviceChargeRate: number;
  serviceChargeExcludeTakeaway: boolean;
  mobileOrderProcessing: {
    requirePaymentBeforeKitchen: boolean;
  };
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
  orderSounds?: {
    newOrder?: { enabled: boolean; type: 'bell' | 'beep' | 'triple' | 'urgent' | 'melody' | 'deep' };
    itemReady?: { enabled: boolean; type: 'bell' | 'beep' | 'triple' | 'urgent' | 'melody' | 'deep' };
    liveOrders?: { enabled: boolean; type: 'bell' | 'beep' | 'triple' | 'urgent' | 'melody' | 'deep' };
    floorPlan?: { enabled: boolean; type: 'bell' | 'beep' | 'triple' | 'urgent' | 'melody' | 'deep' };
    floorPlanReady?: { enabled: boolean; type: 'bell' | 'beep' | 'triple' | 'urgent' | 'melody' | 'deep' };
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
  const prepTrackingToggleRef = useRef<AutoSaveHandle>(null);
  const taxToggleRef = useRef<AutoSaveHandle>(null);
  const serviceChargeToggleRef = useRef<AutoSaveHandle>(null);
  const serviceChargeExcludeTakeawayRef = useRef<AutoSaveHandle>(null);
  const takeawayChargesToggleRef = useRef<AutoSaveHandle>(null);
  const pagerSystemToggleRef = useRef<AutoSaveHandle>(null);
  const enableTableNumbersToggleRef = useRef<AutoSaveHandle>(null);
  const tableNumberRequiredToggleRef = useRef<AutoSaveHandle>(null);
  const clearTableOnPaymentToggleRef = useRef<AutoSaveHandle>(null);

  // Mobile Order tab AutoSave refs (toggles & lists)
  const mobileOrderDineInRef = useRef<AutoSaveHandle>(null);
  const mobileOrderTakeawayRef = useRef<AutoSaveHandle>(null);
  const mobileOrderPickupRef = useRef<AutoSaveHandle>(null);
  const mobileOrderDeliveryRef = useRef<AutoSaveHandle>(null);
  const requirePaymentBeforeKitchenRef = useRef<AutoSaveHandle>(null);
  const requirePinForDiscountRef = useRef<AutoSaveHandle>(null);  // #5 할인 PIN 승인 토글
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
  const checkoutDisplayPhoneRef = useRef<AutoSaveHandle>(null);
  const qrPositionRef = useRef<AutoSaveHandle>(null);
  const qrModeRef = useRef<AutoSaveHandle>(null);
  const qrModeSessionRef = useRef<AutoSaveHandle>(null);
  const receiptLogoRef = useRef<AutoSaveHandle>(null);
  const customQrImageRef = useRef<AutoSaveHandle>(null);
  const ewalletQrRef = useRef<AutoSaveHandle>(null);
  const requireCardTypeRef = useRef<AutoSaveHandle>(null);
  const companyLogoRef = useRef<AutoSaveHandle>(null);
  const storeLogoRef = useRef<AutoSaveHandle>(null);
  const [deleteStationConfirm, setDeleteStationConfirm] = useState<{ isOpen: boolean; stationId: number | null; stationName: string }>({ isOpen: false, stationId: null, stationName: '' });

  // Payment settings state - start with null, will be loaded from DB
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [paymentOrder, setPaymentOrder] = useState<string[]>([]);

  // Printer settings state — each printer has its own `method` (browser/qztray/rawbt).
  // Legacy top-level `printerMode` is still used as a fallback when method is missing
  // (see Restaurant.printer_settings.get on the backend for the migration logic).
  type PrinterMethod = 'browser' | 'qztray' | 'rawbt';
  const [printerSettings, setPrinterSettings] = useState({
    billPrinter: {
      enabled: false,
      name: '',
      autoPrint: false,
      address: '',
      method: 'browser' as PrinterMethod
    },
    kitchenPrinter: {
      enabled: false,
      name: '',
      autoPrint: false,
      printPerItem: false,
      address: '',
      mirrorToBillPrinter: false,           // 키친 ticket 을 카운터(빌) 프린터에도 동시 인쇄
      printCancellationTicket: true,        // 주문 취소 시 키친에 "CANCELLED" ticket 자동 인쇄
      method: 'qztray' as PrinterMethod
    },
    kitchenStationPrinters: {} as Record<string, { name: string; autoPrint: boolean; address?: string; method?: PrinterMethod }>,
    workstations: [] as Array<{ id: string; name: string; billPrinter: { enabled: boolean; name: string; autoPrint: boolean; method: PrinterMethod; address: string } }>,
    // Consolidated Order Ticket — whole order on ONE ticket to a chosen printer
    // (e.g. kitchen main), printed ALONGSIDE per-station kitchen tickets. Fully
    // independent of the existing auto-print path (own poller + print-state).
    consolidatedOrderTicket: {
      enabled: false,
      method: 'qztray' as PrinterMethod,
      address: '',
      autoPrint: false
    },
    // Emergency Routing Mode — single flag, no backup/restore dance. When true,
    // runtime print routing redirects every kitchen ticket to the active bill
    // (counter) printer. Toggle OFF instantly restores original routing because
    // we never mutated the kitchen routing data itself.
    emergencyMode: false,
    emergencyEnabledAt: null as string | null
  });

  // Receipt customization state
  const [receiptSettings, setReceiptSettings] = useState({
    receiptLogo: '' as string,
    footerMessage: 'Thank you for dining with us!',
    showMembership: false,
    customQrImage: '' as string,
    customQrText: '' as string,
    customQrPosition: 'back' as 'front' | 'back',
    // 2026-05-26: F&B standard — counter copy + customer copy. Default 2 (most shops).
    copiesAfterPayment: 2 as number,
    // 2026-05-26: cash drawer pulse after every cash payment (kicks the drawer open).
    autoOpenDrawer: true as boolean
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
  // 2026-05-27: 1-click self-test for the QZ Tray pipeline. Replaces the
  // manual "download cert → find folder → restart → cross fingers" flow with a
  // single button that probes every link in the chain and reports per-step status.
  const [qzDiagSteps, setQzDiagSteps] = useState<Array<{key: string; label: string; status: 'ok'|'failed'; detail?: string}>>([]);
  const [qzDiagSummary, setQzDiagSummary] = useState<any>(null);
  const [qzDiagRunning, setQzDiagRunning] = useState(false);
  const [qzDiagSending, setQzDiagSending] = useState(false);
  const [qzDiagTicket, setQzDiagTicket] = useState<string | null>(null);
  // 2026-05-27: printer-method guide tabs — Browser first (default), QZ Tray last.
  // Replaces the QZ-Tray-only banner that hid the other two methods.
  const [printerGuideTab, setPrinterGuideTab] = useState<'browser' | 'qztray' | 'rawbt'>('browser');
  const [methodMatrixOpen, setMethodMatrixOpen] = useState(false);
  const [emergencyEffectOpen, setEmergencyEffectOpen] = useState(false);
  const [autoPrintPreviewOpen, setAutoPrintPreviewOpen] = useState(false);
  const [showPrinterTroubleshoot, setShowPrinterTroubleshoot] = useState(false);
  const [qzTrayPrinters, setQzTrayPrinters] = useState<string[]>([]);
  const [showQzGuide, setShowQzGuide] = useState(false);
  const [qzScenario, setQzScenario] = useState<'migration' | 'fresh'>('migration');
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });

  // Multi-POS: this device's bound workstation (localStorage-backed). Triggers UI re-render
  // when `setActiveWorkstationId()` fires the 'workstation-changed' event.
  const [activeWorkstationId, _setActiveWorkstationIdState] = useState<string | null>(() => getActiveWorkstationId());
  useEffect(() => {
    const handler = (e: Event) => _setActiveWorkstationIdState(((e as CustomEvent).detail?.id) || null);
    window.addEventListener('workstation-changed', handler);
    return () => window.removeEventListener('workstation-changed', handler);
  }, []);

  // Kitchen Stations state — hybrid mode (v3.44+): category default + per-menu override
  const [kitchenStations, setKitchenStations] = useState<any[]>([]);
  const [itemMergeTimeLimit, setItemMergeTimeLimit] = useState<number>(0);
  const [itemMergeMaxCount, setItemMergeMaxCount] = useState<number>(0);
  const [kitchenStationsLoading, setKitchenStationsLoading] = useState(true);
  const [showStationModal, setShowStationModal] = useState(false);
  const [editingStation, setEditingStation] = useState<any>(null);
  const [stationForm, setStationForm] = useState({ name: '', category_ids: [] as number[], product_ids: [] as number[], alert_sound: 'bell' as string });
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [stationSaving, setStationSaving] = useState(false);
  // Takeaway per-item-individual: combobox + highlight last-added row
  const [showTakeawayAddModal, setShowTakeawayAddModal] = useState(false);
  const [takeawayAddSearch, setTakeawayAddSearch] = useState('');
  const [takeawayJustAddedId, setTakeawayJustAddedId] = useState<number | null>(null);
  const takeawayInputRef = useRef<HTMLInputElement | null>(null);
  // Item Time Restrictions (per-item mobile availability) — mirrors the takeaway override UX.
  const [showItemSchedAdd, setShowItemSchedAdd] = useState(false);
  const [itemSchedAddSearch, setItemSchedAddSearch] = useState('');
  const [itemSchedJustAddedId, setItemSchedJustAddedId] = useState<number | null>(null);
  const itemSchedInputRef = useRef<HTMLInputElement | null>(null);

  // Load settings from localStorage or use defaults
  const loadSettings = () => {
    // 기본값 정의
    const defaultSettings = {
      store: {
        name: 'FOODCOURT CENTRAL',
        phone: '+60 3-1234-5678',
        telephone: '',
        email: 'contact@foodcourt.com',
        address: '123 Main Street, City Center',
        address_line_2: '',
        city: 'Kuala Lumpur',
        state: 'Wilayah Persekutuan',
        postalCode: '50000',
        country: 'MY',
        logo: '',
        delivery_address: ''
      },
      operations: {
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
        serviceChargeExcludeTakeaway: true,
        mobileOrderProcessing: {
          // default OFF — 신규 매장 + 미설정 운영 매장은 기존 동작 그대로 (자동 키친 진입). ON 시 결제 후 키친.
          requirePaymentBeforeKitchen: false
        },
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
        orderSounds: {
          newOrder: { enabled: true, type: 'bell' },
          itemReady: { enabled: true, type: 'triple' }
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
    category_schedules: Array<{ category_id: number; start_time: string; end_time: string; days?: number[]; start_date?: string | null; end_date?: string | null; display?: 'hide' | 'disable' }>;
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
        secondaryColor: '#F1F4F8',
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
    clearTableOnPayment: false,
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
              phone: restaurant.phone || '',
              telephone: restaurant.telephone || '',
              email: restaurant.email || '',
              address: restaurant.address || '',
              address_line_2: restaurant.address_line_2 || '',
              city: restaurant.city || '',
              state: restaurant.state || '',
              postalCode: restaurant.postal_code || '',
              country: (restaurant.country || 'MY').toString().toUpperCase(),
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
              mobileOrderProcessing: {
                ...((defaultOps as any).mobileOrderProcessing || {}),
                ...((restaurant.operation_settings as any).mobileOrderProcessing || {})
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
                clearTableOnPayment: restaurant.table_settings.clearTableOnPayment ?? false,
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
                address: dbSettings.kitchenPrinter?.address || '',
                mirrorToBillPrinter: dbSettings.kitchenPrinter?.mirrorToBillPrinter ?? false,
                printCancellationTicket: dbSettings.kitchenPrinter?.printCancellationTicket ?? true
              },
              kitchenStationPrinters: dbSettings.kitchenStationPrinters || {},
              // 2026-05-27: workstations was missing from this setState — so a refresh
              // after Add/Edit Workstation appeared to wipe the change. Now hydrated
              // from DB, and the next handleSave/PUT round-trips it back intact.
              workstations: Array.isArray(dbSettings.workstations) ? dbSettings.workstations : [],
              consolidatedOrderTicket: {
                enabled: dbSettings.consolidatedOrderTicket?.enabled ?? false,
                method: dbSettings.consolidatedOrderTicket?.method || 'qztray',
                address: dbSettings.consolidatedOrderTicket?.address || '',
                autoPrint: dbSettings.consolidatedOrderTicket?.autoPrint ?? false
              },
              emergencyMode: !!dbSettings.emergencyMode,
              emergencyEnabledAt: dbSettings.emergencyEnabledAt || null
            } as any);
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
              ...(dbSettings.kitchenStationPrinters ? { kitchenStationPrinters: dbSettings.kitchenStationPrinters } : {}),
              // 2026-06-12: workstations 누락이 통합티켓 회귀를 만들던 구멍 — StoreContext 의
              // sync 는 workstations 를 포함하는데 여기서 빼고 덮어써, 설정 페이지를 한 번
              // 방문하면 localStorage 에서 consolidatedTicket/consolidatedStations 가 사라져
              // billPrint 가 레거시(풀오더 mirror) 폴백으로 떨어졌다. StoreContext 와 동일 구성 유지.
              ...(Array.isArray(dbSettings.workstations) ? { workstations: dbSettings.workstations } : {}),
              ...(dbSettings.consolidatedOrderTicket ? { consolidatedOrderTicket: dbSettings.consolidatedOrderTicket } : {})
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

  // 2026-05-28 매장 critical: Auto-seed kitchenStationPrinters entries for every
  // KitchenStation row. Previously an entry was only persisted when the user
  // touched that station's printer form. If they never touched it, the entry
  // was missing — the kitchen ticket router (printKitchenTicketsByStation)
  // saw `stationPrinters[stationId]` as undefined and bucketed all its items
  // into "unmapped" → piled onto the first station's printer. BARPR (3rd
  // station at The Fire) never received anything.
  //
  // Now: as soon as kitchenStations load, every station gets a default entry
  // (autoPrint=ON, address='', method='qztray', stationName mirrored from
  // DB). Sidebar device gets the merged result on next load.
  const stationSeedDoneRef = useRef(false);
  useEffect(() => {
    if (!user?.restaurantId) return;
    if (!Array.isArray(kitchenStations) || kitchenStations.length === 0) return;
    if (stationSeedDoneRef.current) return;
    const current = printerSettings.kitchenStationPrinters || {};
    const missing = kitchenStations.filter((s: any) => !current[s.id]);
    if (missing.length === 0) {
      stationSeedDoneRef.current = true;
      return;
    }
    setPrinterSettings(prev => {
      const next = { ...(prev.kitchenStationPrinters || {}) };
      missing.forEach((s: any) => {
        next[s.id] = {
          name: '',
          autoPrint: true,
          address: '',
          method: 'qztray',
          stationName: s.name
        };
      });
      return { ...prev, kitchenStationPrinters: next };
    });
    stationSeedDoneRef.current = true;
    // Allow setPrinterSettings to flush before handleSave reads the state
    setTimeout(() => { handleSave(); }, 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kitchenStations, user?.restaurantId]);

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
      // Hidden-iframe print (popup-blocker proof — was window.open).
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const html = `<!DOCTYPE html><html><head><title>Print QR - ${tableNumber}</title><style>
        body { margin:0; padding:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; font-family:Arial,sans-serif; }
        .store-name { font-size:18px; font-weight:600; color:#0A2540; margin-bottom:8px; }
        .table-number { font-size:32px; font-weight:bold; color:#0A2540; margin-bottom:16px; }
        .qr-container { padding:20px; background:white; }
        .qr-container svg { width:200px; height:200px; }
        @media print { body { padding:0; } .qr-container svg { width:250px; height:250px; } }
      </style></head><body>
        <div class="store-name">${storeName}</div>
        <div class="table-number">${tableNumber}</div>
        <div class="qr-container">${svgData}</div>
      </body></html>`;
      printHTMLContent(html, `QR ${tableNumber}`);
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
    // Hidden-iframe print (popup-blocker proof — was window.open).
    const html = `<!DOCTYPE html><html><head><title>Print QR - ${name}</title><style>
      body { margin:0; padding:20px; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; font-family:Arial,sans-serif; }
      .store-name { font-size:18px; font-weight:600; color:#0A2540; margin-bottom:8px; }
      .ext-name { font-size:28px; font-weight:bold; color:#0A2540; margin-bottom:16px; }
      .qr-container { padding:20px; background:white; }
      .qr-container svg { width:200px; height:200px; }
      @media print { body { padding:0; } .qr-container svg { width:250px; height:250px; } }
    </style></head><body>
      <div class="store-name">${storeName}</div>
      <div class="ext-name">${name}</div>
      <div class="qr-container">${svgData}</div>
    </body></html>`;
    printHTMLContent(html, `QR ${name}`);
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
          phone: storeSettings.phone,
          telephone: storeSettings.telephone,
          email: storeSettings.email,
          address: storeSettings.address,
          address_line_2: storeSettings.address_line_2,
          delivery_address: storeSettings.delivery_address.trim() || null,
          city: storeSettings.city,
          state: storeSettings.state,
          postal_code: storeSettings.postalCode,
          country: storeSettings.country,
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
            workstations: printerSettings.workstations || [],  // CRITICAL: was missing — every AutoSaveField save wiped workstations from DB
            consolidatedOrderTicket: (printerSettings as any).consolidatedOrderTicket || { enabled: false, method: 'qztray', address: '', autoPrint: false },
            emergencyMode: !!(printerSettings as any).emergencyMode,
            emergencyEnabledAt: (printerSettings as any).emergencyEnabledAt || null,
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
              <p style={{ color: '#4B5563', marginBottom: '24px', fontSize: '14px' }}>
                Configure payment methods for POS Terminal and Mobile Order
              </p>

              {!paymentMethods ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
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
                            color: method.availableIn?.includes('pos') ? '#0A2540' : '#4B5563',
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
                            color: method.availableIn?.includes('mobile') ? '#0A2540' : '#4B5563',
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
                        borderTop: '1px solid #C7CED6',
                        paddingTop: '14px',
                        marginTop: '14px',
                        marginBottom: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        <div style={{ fontSize: '12px', color: '#4B5563', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                          Available order types
                          <span
                            style={{ marginLeft: '6px', color: '#6B7280', fontWeight: 400, textTransform: 'none', letterSpacing: 0, cursor: 'help' }}
                            title="Leave all selected to allow this method for every mobile order type. External QR scans inherit the pinned order type's settings — no separate config. Reservation deposits are not yet collected by this system."
                          >ⓘ</span>
                        </div>
                        <AutoSaveField ref={(h: AutoSaveHandle | null) => { if (h) paymentRefsMap.current.set(`${key}-ot`, h); }} onSave={handleSave} type="toggle">
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {orderTypeChips.map(c => {
                              const active = isOrderTypeAllowed(method, c.key);
                              return (
                                <button type="button"
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
                                    border: '1px solid ' + (active ? '#635BFF' : '#C7CED6'),
                                    background: active ? '#F0EFFF' : '#F9FAFB',
                                    color: active ? '#635BFF' : '#4B5563',
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

                  {/* Card Settings — require card type selection at payment */}
                  {key === 'card' && method.enabled && (
                    <div style={{ borderTop: '1px solid #C7CED6', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540' }}>
                            {t('settings:settingsPage.requireCardType', { defaultValue: 'Require card type selection' })}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6B7C93', marginTop: '2px' }}>
                            {t('settings:settingsPage.requireCardTypeHint', { defaultValue: 'When on, the cashier must pick a card type (Visa / Master / Amex / Other) before completing a card payment.' })}
                          </div>
                        </div>
                        <AutoSaveField ref={requireCardTypeRef} onSave={handleSave} type="toggle">
                          <ToggleSwitch>
                            <ToggleInput
                              type="checkbox"
                              checked={!!method.requireCardType}
                              onChange={(e) => { handlePaymentSettingChange(key, 'requireCardType', e.target.checked); requireCardTypeRef.current?.triggerSave(); }}
                            />
                            <ToggleSlider />
                          </ToggleSwitch>
                        </AutoSaveField>
                      </div>
                    </div>
                  )}

                  {/* E-Wallet Settings - QR Code Image */}
                  {key === 'ewallet' && method.enabled && (
                    <div style={{ borderTop: '1px solid #C7CED6', paddingTop: '16px' }}>
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
                    <div style={{ borderTop: '1px solid #C7CED6', paddingTop: '16px' }}>
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
                    <div style={{ borderTop: '1px solid #C7CED6', paddingTop: '16px' }}>
                      <div style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.5' }}>
                        Staff meals are recorded at full price but excluded from revenue reports.
                        Use this in POS when processing staff meals to keep accurate records.
                      </div>
                    </div>
                  )}

                  {/* Online Payment Settings */}
                  {key === 'online' && method.enabled && (
                    <div style={{ borderTop: '1px solid #C7CED6', paddingTop: '16px' }}>
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
                        background: '#F1F4F8',
                        color: '#4B5563'
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
                  
                  <p style={{ color: '#4B5563', marginBottom: '20px', fontSize: '14px' }}>{brand.description}</p>
                  
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
                    <div style={{ background: '#F1F4F8', borderRadius: '8px', padding: '16px' }}>
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
                                <div style={{ fontSize: '13px', color: '#4B5563' }}>
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
                        <p style={{ color: '#4B5563', textAlign: 'center', margin: '20px 0' }}>{t('settings:settingsPage.noRestaurantsConnectedToThisBrand')}</p>
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
                    <span style={{ color: '#4B5563' }}>{t('settings:settingsPage.monthlyFee')}</span>
                    <span style={{ fontWeight: '600' }}>{t('settings:settingsPage.rm29900')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ color: '#4B5563' }}>{t('settings:settingsPage.nextBillingDate')}</span>
                    <span>{t('settings:settingsPage.january152025')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#4B5563' }}>{t('settings:settingsPage.activeRestaurants')}</span>
                    <span>12 / 15</span>
                  </div>
                </div>
                <Button onClick={() => setInfoModal({ open: true, title: t('settings:settingsPage.featureInDevelopmentTitle', 'Coming Soon'), message: t('settings:settingsPage.billingComingSoon', 'Billing management is currently in development and will be available in an upcoming release.') })}>{t('settings:settingsPage.manageBilling')}</Button>
              </SettingsCard>
              <SettingsCard>
                <CardTitle>{t('settings:settingsPage.usageStatistics')}</CardTitle>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ color: '#4B5563' }}>{t('settings:settingsPage.totalOrdersThisMonth')}</span>
                    <span style={{ fontWeight: '600', fontSize: '18px' }}>8,945</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ color: '#4B5563' }}>{t('settings:settingsPage.totalRevenueThisMonth')}</span>
                    <span style={{ fontWeight: '600', fontSize: '18px' }}>{t('settings:settingsPage.rm145230')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ color: '#4B5563' }}>{t('settings:settingsPage.activeStaffMembers')}</span>
                    <span style={{ fontWeight: '600' }}>87</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#4B5563' }}>{t('settings:settingsPage.storageUsed')}</span>
                    <span style={{ fontWeight: '600' }}>2.4 GB / 10 GB</span>
                  </div>
                </div>
              </SettingsCard>
              </SettingsGrid>

            </>
          )}
          {activeTab === 'store' && (
            <>
              {/* Section banner — explains the Bill vs Invoice split so users know where each field lands. */}
              <div style={{
                background: '#F0F4FF', border: '1px solid #C7D2FE', borderRadius: 8,
                padding: '12px 16px', marginBottom: 16, fontSize: 13, color: '#3730A3'
              }}>
                <strong>{t('settings:settingsPage.storeInfoBannerTitle', 'Store info — printed on customer bills/receipts')}</strong>
                <div style={{ marginTop: 4, color: '#4F46E5' }}>
                  {t('settings:settingsPage.storeInfoBannerDesc', 'Your customer-facing brand. For company/legal info shown on invoices, edit Company Information.')}
                </div>
              </div>
              <SettingsGrid>
                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.basicInformation')}</CardTitle>
                <FormGroup>
                  <Label>{t('settings:settingsPage.storeName', 'Store / Brand Name')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <Input type="text" value={storeSettings.name}
                      onChange={(e) => setStoreSettings(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="K-Dine Korean BBQ" />
                  </AutoSaveField>
                  <HelpText>{t('settings:settingsPage.storeNameHelp', 'The customer-facing brand printed at the top of bills and shown in mobile orders.')}</HelpText>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.telephone', 'Store Telephone (for bills)')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <PhoneInput value={storeSettings.telephone}
                      onChange={(value) => setStoreSettings(prev => ({ ...prev, telephone: value }))}
                      defaultCountry={storeSettings.country} />
                  </AutoSaveField>
                  <HelpText>{t('settings:settingsPage.telephoneHelp', 'Landline shown on bills/receipts. Leave empty to hide.')}</HelpText>
                </FormGroup>
                <FormGroup>
                  <Label>{t('settings:settingsPage.mobilePhone', 'Mobile Phone (for POS notifications)')}</Label>
                  <AutoSaveField onSave={handleSave}>
                    <PhoneInput value={storeSettings.phone}
                      onChange={(value) => setStoreSettings(prev => ({ ...prev, phone: value }))}
                      defaultCountry={storeSettings.country} />
                  </AutoSaveField>
                  <HelpText>{t('settings:settingsPage.mobilePhoneHelp', 'Used for system notifications only. Never printed on bills.')}</HelpText>
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
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.4 }}>
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
                          padding: '12px 16px',
                          border: '1px solid #C7CED6',
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
                      padding: '12px 16px',
                      background: '#F4F6F9',
                      borderRadius: '6px',
                      fontSize: '14px',
                      color: '#0A2540',
                      border: '1px solid #C7CED6'
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
                <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
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
                      background: '#F1F4F8',
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
                      <span style={{ color: '#4B5563' }}>to</span>
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
                      <button type="button"
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
                  <button type="button"
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
                  <span style={{ color: '#4B5563', fontSize: '14px' }}>{t('settings:settingsPage.minutesOrderTotal', { defaultValue: 'minutes (whole order target)' })}</span>
                </FormGroup>

                <Toggle>
                  <ToggleLabel>{t('settings:settingsPage.prepTimeTracking', { defaultValue: 'Preparation Time Tracking' })}</ToggleLabel>
                  <AutoSaveField ref={prepTrackingToggleRef} onSave={handleSave} type="toggle">
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={operationSettings.prepTimeTracking}
                        onChange={(e) => {
                          setOperationSettings(prev => ({ ...prev, prepTimeTracking: e.target.checked }));
                          prepTrackingToggleRef.current?.triggerSave();
                        }}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </AutoSaveField>
                </Toggle>
                <p style={{ color: '#6B7C93', fontSize: '13px', marginTop: '-4px', marginBottom: operationSettings.prepTimeTracking ? '8px' : '0' }}>
                  {t('settings:settingsPage.prepTimeTrackingHint', { defaultValue: 'Show per-item and per-order timers on Kitchen Display and Floor Plan. Only overdue items pulse red — calm until something runs late.' })}
                </p>

                {operationSettings.prepTimeTracking && (
                  <>
                    <FormGroup style={{ marginLeft: '16px', marginTop: '8px' }}>
                      <Label>{t('settings:settingsPage.defaultPreparationTimePerItem', { defaultValue: 'Default Preparation Time (per item)' })}</Label>
                      <AutoSaveField onSave={handleSave}>
                        <FeeInput
                          type="number"
                          value={operationSettings.defaultPreparationTimePerItem}
                          onChange={(e) => {
                            setOperationSettings(prev => ({ ...prev, defaultPreparationTimePerItem: Number(e.target.value) }));
                          }}
                        />
                      </AutoSaveField>
                      <span style={{ color: '#4B5563', fontSize: '14px' }}>{t('settings:settingsPage.minutesPerItemHint', { defaultValue: 'minutes (used when a menu item has no prep time set)' })}</span>
                    </FormGroup>
                    <FormGroup style={{ marginLeft: '16px', marginTop: '8px' }}>
                      <Label>{t('settings:settingsPage.prepUrgentThreshold', { defaultValue: 'Urgent threshold' })}</Label>
                      <AutoSaveField onSave={handleSave}>
                        <FeeInput
                          type="number"
                          value={operationSettings.prepUrgentThreshold}
                          onChange={(e) => {
                            const v = Math.min(100, Math.max(0, Number(e.target.value)));
                            setOperationSettings(prev => ({ ...prev, prepUrgentThreshold: v }));
                          }}
                        />
                      </AutoSaveField>
                      <span style={{ color: '#4B5563', fontSize: '14px' }}>{t('settings:settingsPage.prepUrgentThresholdHint', { defaultValue: '% of target — turns amber here, red when over 100%' })}</span>
                    </FormGroup>
                  </>
                )}
              </SettingsCard>

              <SettingsCard>
                <CardTitle>{t('settings:settingsPage.taxServiceCharge')}</CardTitle>
                <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                      <span style={{ color: '#4B5563', fontSize: '14px' }}>%</span>
                    </div>
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
                  <>
                    <FormGroup style={{ marginLeft: '16px', marginTop: '8px' }}>
                      <Label>Service Charge Rate (%)</Label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                        <span style={{ color: '#4B5563', fontSize: '14px' }}>%</span>
                      </div>
                    </FormGroup>
                    <FormGroup style={{ marginLeft: '16px', marginTop: '4px' }}>
                      <AutoSaveField ref={serviceChargeExcludeTakeawayRef} onSave={handleSave} type="toggle">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#1F2937' }}>
                          <input
                            type="checkbox"
                            checked={operationSettings.serviceChargeExcludeTakeaway ?? true}
                            onChange={(e) => {
                              setOperationSettings(prev => ({ ...prev, serviceChargeExcludeTakeaway: e.target.checked }));
                              serviceChargeExcludeTakeawayRef.current?.triggerSave();
                            }}
                            style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#635BFF' }}
                          />
                          {t('settings:operations.excludeTakeawayLabel')}
                          <span style={{ color: '#6B7280', fontSize: '12px' }}>{t('settings:operations.excludeTakeawayHint')}</span>
                        </label>
                      </AutoSaveField>
                    </FormGroup>
                  </>
                )}
              </SettingsCard>

              {/* 주문 알림음 — 새 주문(전 화면 공통) + 서빙 준비완료. (주방은 주방 스테이션 섹션에서 별도) */}
              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>{t('settings:settingsPage.orderSounds', 'Order Notification Sounds')}</CardTitle>
                <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                  {t('settings:settingsPage.orderSoundsHint', 'New-order sound (all screens: Live Orders, Floor Plan, and other pages) and item-ready (serving) sound. Kitchen station sounds are set per station in the Kitchen Stations section. Each device can still mute locally with its speaker icon.')}
                </p>
                {(['newOrder', 'itemReady'] as const).map((screen) => {
                  const defType = screen === 'itemReady' ? 'triple' : 'bell';
                  const cur = operationSettings.orderSounds?.[screen] || { enabled: true, type: defType as any };
                  const screenLabel = screen === 'newOrder'
                    ? t('settings:settingsPage.soundNewOrder', 'New Order (all screens)')
                    : t('settings:settingsPage.soundItemReady', 'Item Ready (serving)');
                  const setScreen = (patch: Partial<{ enabled: boolean; type: any }>) => setOperationSettings(prev => {
                    const base = prev.orderSounds || { newOrder: { enabled: true, type: 'bell' }, itemReady: { enabled: true, type: 'triple' } };
                    return { ...prev, orderSounds: { ...base, [screen]: { ...(base as any)[screen], ...patch } } };
                  });
                  return (
                    <div key={screen} style={{ paddingBottom: '8px', marginBottom: '8px', borderBottom: screen !== 'itemReady' ? '1px solid #EEF1F5' : undefined }}>
                      <Toggle>
                        <ToggleLabel>{screenLabel}</ToggleLabel>
                        <AutoSaveField onSave={handleSave} type="toggle">
                          <ToggleSwitch>
                            <ToggleInput type="checkbox" checked={cur.enabled !== false}
                              onChange={(e) => setScreen({ enabled: e.target.checked })} />
                            <ToggleSlider />
                          </ToggleSwitch>
                        </AutoSaveField>
                      </Toggle>
                      {cur.enabled !== false && (
                        <FormGroup style={{ marginLeft: '16px', marginTop: '6px' }}>
                          <Label>{t('settings:settingsPage.alertSound', 'Alert sound')}</Label>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <AutoSaveField onSave={handleSave} type="select">
                              <Select value={cur.type || 'bell'} onChange={(e) => setScreen({ type: e.target.value as any })} style={{ flex: 1, maxWidth: '240px' }}>
                                <option value="bell">Bell</option>
                                <option value="beep">Double Beep</option>
                                <option value="triple">Triple</option>
                                <option value="urgent">Urgent</option>
                                <option value="melody">Melody</option>
                                <option value="deep">Deep</option>
                              </Select>
                            </AutoSaveField>
                            <button type="button"
                              onClick={async () => { const { playPresetSound } = await import('../../utils/notificationSound'); playPresetSound((cur.type || 'bell') as any, 0.8); }}
                              style={{ padding: '8px 14px', background: '#EEF2FF', color: '#635BFF', border: '1px solid #C7D2FE', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                              {t('settings:settingsPage.testSound', 'Test sound')}
                            </button>
                          </div>
                        </FormGroup>
                      )}
                    </div>
                  );
                })}
              </SettingsCard>

              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>{t('settings:settingsPage.currencyRoundingSettings')}</CardTitle>
                <p style={{ color: '#4B5563', marginBottom: '24px', fontSize: '14px' }}>
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

              {operationSettings.orderTypes?.takeaway && (
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
                          <option value="per-item-individual">{t('settings:settingsPage.perItemIndividualChargePerMenu', 'Per Menu Item (set individually)')}</option>
                        </Select>
                      </AutoSaveField>
                    </FormGroup>

                    {operationSettings.takeawayPricing.pricingType === 'per-item' && (
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
                        <span style={{ color: '#4B5563', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                        <HelpText>{t('settings:settingsPage.thisAmountWillBeAddedToEachItemForTakeawayOrders')}</HelpText>
                      </FormGroup>
                    )}

                    {operationSettings.takeawayPricing.pricingType === 'per-category' && (
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
                              <span style={{ color: '#4B5563', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                            </FormGroup>
                          ))}
                        </SettingsGrid>
                        <HelpText>{t('settings:settingsPage.theseAmountsWillBeAddedToItemsBasedOnTheirCategoryForTakeawayOrders')}</HelpText>
                      </>
                    )}

                    {operationSettings.takeawayPricing.pricingType === 'per-item-individual' && (() => {
                      // null = no override (use default); number (incl. 0) = explicit override.
                      // Sort: just-added row pinned to top while highlighted, then updatedAt DESC
                      // so the most recently added/modified row stays visible.
                      const overrideProducts = allProducts
                        .filter((p: any) => p.takeaway_charge !== null && p.takeaway_charge !== undefined)
                        .slice()
                        .sort((a: any, b: any) => {
                          if (takeawayJustAddedId === a.id) return -1;
                          if (takeawayJustAddedId === b.id) return 1;
                          const ta = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                          const tb = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
                          return tb - ta;
                        });
                      const currencySymbol = getCurrencySymbol(currencySettings.currency);
                      const defaultFee = Number(operationSettings.takeawayPricing.defaultPerItemCharge ?? 0);
                      const categoryById = new Map<string, any>(categories.map((c: any) => [String(c.id), c]));
                      const getCatFor = (prod: any) => categoryById.get(String(prod.categoryId ?? prod.category_id ?? prod.category));
                      return (
                        <>
                          {/* Default packaging fee */}
                          <FormGroup>
                            <Label>{t('settings:settingsPage.defaultPackagingFee', 'Default packaging fee')}</Label>
                            <AutoSaveField onSave={handleSave}>
                              <FeeInput
                                type="number"
                                step="0.10"
                                min="0"
                                value={operationSettings.takeawayPricing.defaultPerItemCharge}
                                onChange={(e) => {
                                  setOperationSettings(prev => ({
                                    ...prev,
                                    takeawayPricing: { ...prev.takeawayPricing, defaultPerItemCharge: Number(e.target.value) }
                                  }));
                                }}
                              />
                            </AutoSaveField>
                            <span style={{ color: '#4B5563', fontSize: '14px' }}>{currencySymbol}</span>
                            <HelpText>{t('settings:settingsPage.defaultPackagingFeeHelp', 'Applied to every menu item unless a custom fee is set below.')}</HelpText>
                          </FormGroup>

                          <Divider />

                          {/* Custom fee per item — override list */}
                          {(() => {
                            const eligibleProducts = allProducts.filter((p: any) => p.takeaway_charge === null || p.takeaway_charge === undefined);
                            const searchLower = takeawayAddSearch.trim().toLowerCase();
                            const filtered = searchLower
                              ? eligibleProducts.filter((p: any) =>
                                  (p.name && p.name.toLowerCase().includes(searchLower)) ||
                                  (p.code && String(p.code).toLowerCase().includes(searchLower))
                                )
                              : eligibleProducts;
                            const addOverride = async (prod: any) => {
                              setAllProducts(prev => prev.map((p: any) => p.id === prod.id ? { ...p, takeaway_charge: defaultFee } : p));
                              setTakeawayAddSearch('');
                              setShowTakeawayAddModal(false);
                              takeawayInputRef.current?.blur();
                              setTakeawayJustAddedId(prod.id);
                              setTimeout(() => setTakeawayJustAddedId((cur) => cur === prod.id ? null : cur), 1800);
                              const token = getAuthToken();
                              await fetch(`/api/menu/product/${prod.id}?restaurantId=${user?.restaurantId}`, {
                                method: 'PUT',
                                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                body: JSON.stringify({ takeaway_charge: defaultFee })
                              });
                            };
                            const dropdownOpen = showTakeawayAddModal;
                            return (
                              <>
                                <Label style={{ marginBottom: '10px' }}>{t('settings:settingsPage.customFeePerItem', 'Custom fee per item')}</Label>
                                <div style={{ position: 'relative', marginBottom: '12px' }}>
                                  <input
                                    ref={takeawayInputRef}
                                    type="text"
                                    placeholder={t('settings:settingsPage.searchMenuToAdd', 'Search menu to add custom fee...') as string}
                                    value={takeawayAddSearch}
                                    onChange={(e) => setTakeawayAddSearch(e.target.value)}
                                    onFocus={() => setShowTakeawayAddModal(true)}
                                    onBlur={() => { setTimeout(() => setShowTakeawayAddModal(false), 200); }}
                                    onKeyDown={(e) => { if (e.key === 'Escape') { setTakeawayAddSearch(''); (e.target as HTMLInputElement).blur(); } }}
                                    disabled={eligibleProducts.length === 0 && !takeawayAddSearch}
                                    style={{
                                      width: '100%',
                                      padding: '10px 12px 10px 36px',
                                      border: `1px solid ${dropdownOpen ? '#635BFF' : '#C7CED6'}`,
                                      borderRadius: '8px',
                                      fontSize: '14px',
                                      outline: 'none',
                                      boxSizing: 'border-box',
                                      background: eligibleProducts.length === 0 && !takeawayAddSearch
                                        ? `#F9FAFB url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23B0B7C3' stroke-width='2'><circle cx='11' cy='11' r='7'/><line x1='21' y1='21' x2='16.65' y2='16.65'/></svg>") no-repeat 12px center`
                                        : `white url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'><circle cx='11' cy='11' r='7'/><line x1='21' y1='21' x2='16.65' y2='16.65'/></svg>") no-repeat 12px center`,
                                      boxShadow: dropdownOpen ? '0 0 0 3px rgba(99, 91, 255, 0.1)' : 'none',
                                      transition: 'border-color 0.15s, box-shadow 0.15s'
                                    }}
                                  />
                                  {dropdownOpen && (
                                    <div
                                      onMouseDown={(e) => e.preventDefault()}
                                      style={{
                                        position: 'absolute',
                                        top: 'calc(100% + 4px)',
                                        left: 0,
                                        right: 0,
                                        maxHeight: '280px',
                                        overflowY: 'auto',
                                        background: 'white',
                                        border: '1px solid #C7CED6',
                                        borderRadius: '8px',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                                        zIndex: 100
                                      }}
                                    >
                                      {eligibleProducts.length === 0 ? (
                                        <div style={{ padding: '14px', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
                                          {t('settings:settingsPage.allMenuItemsAlreadyAdded', 'All menu items already have a custom fee.')}
                                        </div>
                                      ) : filtered.length === 0 ? (
                                        <div style={{ padding: '14px', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
                                          {t('settings:settingsPage.noMatchingMenuItems', 'No matching menu items.')}
                                        </div>
                                      ) : (
                                        filtered.slice(0, 20).map((item: any) => {
                                          const cat = getCatFor(item);
                                          return (
                                            <div
                                              key={item.id}
                                              onClick={() => addOverride(item)}
                                              style={{
                                                padding: '12px 16px',
                                                cursor: 'pointer',
                                                fontSize: '13px',
                                                color: '#0A2540',
                                                borderBottom: '1px solid #F1F4F8',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                gap: '12px',
                                                background: 'white',
                                                transition: 'background 0.1s'
                                              }}
                                              onMouseEnter={(e) => e.currentTarget.style.background = '#F5F3FF'}
                                              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                            >
                                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {cat && <span style={{ color: '#4B5563', marginRight: '6px' }}>{cat.emoji}</span>}
                                                <span style={{ fontWeight: 500 }}>{item.name}</span>
                                              </span>
                                              <span style={{ color: '#635BFF', fontWeight: 500, flexShrink: 0 }}>
                                                + {defaultFee.toFixed(2)}{currencySymbol}
                                              </span>
                                            </div>
                                          );
                                        })
                                      )}
                                    </div>
                                  )}
                                </div>
                              </>
                            );
                          })()}

                          {overrideProducts.length === 0 ? (
                            <div style={{ padding: '24px', background: '#F9FAFB', border: '1px dashed #C7CED6', borderRadius: '8px', textAlign: 'center', color: '#4B5563', fontSize: '13px', lineHeight: 1.5 }}>
                              {t('settings:settingsPage.allItemsUseDefaultFee', 'All items use the default fee of {{fee}}{{currency}}.', { fee: defaultFee.toFixed(2), currency: currencySymbol })}
                              <br />
                              {allProducts.length === 0
                                ? t('settings:settingsPage.noMenuItemsYet', 'No menu items yet. Add menu items first to set per-item packaging fees.')
                                : t('settings:settingsPage.addCustomFeeHint', 'Click "Add menu item" if a specific menu needs a different packaging fee.')}
                            </div>
                          ) : (
                            <>
                              <div style={{ border: '1px solid #C7CED6', borderRadius: '8px', overflow: 'hidden' }}>
                                {overrideProducts.map((prod: any) => {
                                  const cat = getCatFor(prod);
                                  return (
                                    <div
                                      key={prod.id}
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 16px',
                                        borderBottom: '1px solid #F1F4F8',
                                        background: takeawayJustAddedId === prod.id ? '#EEF2FF' : 'white',
                                        transition: 'background 1.2s ease'
                                      }}
                                    >
                                      <div style={{ flex: 1, minWidth: 0, fontSize: '14px', color: '#0A2540' }}>
                                        {cat && <span style={{ color: '#4B5563', marginRight: '6px' }}>{cat.emoji} {cat.name} ·</span>}
                                        <span style={{ fontWeight: 500 }}>{prod.name}</span>
                                      </div>
                                      <AutoSaveField
                                        type="list"
                                        debounceMs={1500}
                                        onSave={async () => {
                                          const cur = allProducts.find((p: any) => p.id === prod.id);
                                          const charge = cur?.takeaway_charge;
                                          const token = getAuthToken();
                                          await fetch(`/api/menu/product/${prod.id}?restaurantId=${user?.restaurantId}`, {
                                            method: 'PUT',
                                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ takeaway_charge: charge == null ? null : Number(charge) })
                                          });
                                        }}
                                      >
                                        <FeeInput
                                          type="number"
                                          step="0.10"
                                          min="0"
                                          value={prod.takeaway_charge ?? 0}
                                          onChange={(e) => {
                                            const v = Number(e.target.value);
                                            setAllProducts(prev => prev.map((p: any) => p.id === prod.id ? { ...p, takeaway_charge: v } : p));
                                          }}
                                          style={{ width: '90px' }}
                                        />
                                      </AutoSaveField>
                                      <span style={{ color: '#4B5563', fontSize: '13px', minWidth: '24px' }}>{currencySymbol}</span>
                                      <button type="button"
                                        type="button"
                                        title={t('settings:settingsPage.removeOverride', 'Remove custom fee (use default)') as string}
                                        onClick={async () => {
                                          setAllProducts(prev => prev.map((p: any) => p.id === prod.id ? { ...p, takeaway_charge: null } : p));
                                          const token = getAuthToken();
                                          await fetch(`/api/menu/product/${prod.id}?restaurantId=${user?.restaurantId}`, {
                                            method: 'PUT',
                                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ takeaway_charge: null })
                                          });
                                        }}
                                        style={{ width: '28px', height: '28px', border: '1px solid #C7CED6', borderRadius: '6px', background: 'white', cursor: 'pointer', color: '#4B5563', fontSize: '14px', lineHeight: 1 }}
                                      >
                                        ×
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                              <HelpText style={{ marginTop: '8px' }}>
                                {t('settings:settingsPage.overrideCount', '{{count}} item override the default fee.', { count: overrideProducts.length })}
                              </HelpText>
                            </>
                          )}
                        </>
                      );
                    })()}
                  </>
                )}
              </SettingsCard>
              )}

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

              </SettingsGrid>

              {/* Customer Display (Dual Monitor) — operations 탭 안에 배치.
                  하드웨어 (프린터) 가 아니라 운영 흐름 (영업 시작 시 듀얼 모니터 켜기) 에 속하는 설정이라
                  Operation 탭이 자연스러운 위치. 2026-05-27 이동. */}
              <SettingsCard style={{ marginTop: '24px' }}>
                <CardTitle>{t('settings:settingsPage.customerDisplay.title', 'Customer Display (Dual Monitor)')}</CardTitle>
                <p style={{ color: '#4B5563', marginBottom: '20px', fontSize: '14px', lineHeight: 1.5 }}>
                  {t('settings:settingsPage.customerDisplay.description', 'Show order details on a second monitor facing the customer (POS rear screen). Click Open Now after connecting the secondary monitor — your browser will ask once for permission, then remember it.')}
                </p>

                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
                  <button type="button"
                    onClick={async () => {
                      const result = await openCustomerDisplay(user?.restaurantId || '');
                      if (result.title && result.message) {
                        setInfoModal({ open: true, title: result.title, message: result.message });
                      }
                    }}
                    style={{
                      padding: '10px 20px', fontSize: '14px', fontWeight: 500,
                      background: '#635BFF', color: 'white', border: 'none',
                      borderRadius: '6px', cursor: 'pointer'
                    }}
                  >
                    {t('settings:settingsPage.customerDisplay.openNow', 'Open Now')}
                  </button>

                  <button type="button"
                    onClick={async () => {
                      resetCustomerDisplayPosition();
                      await openCustomerDisplay(user?.restaurantId || '');
                      setInfoModal({
                        open: true,
                        title: t('settings:settingsPage.customerDisplay.resetDoneTitle', 'Drag to Second Monitor'),
                        message: t('settings:settingsPage.customerDisplay.resetDoneMessage', 'Customer Display just opened on your main screen. Drag the popup to your second monitor, then close it. The new position will be saved — next time it will open there automatically.'),
                      });
                    }}
                    title={t('settings:settingsPage.customerDisplay.resetPositionTitle', 'Use this if the popup opens off-screen after disconnecting or rearranging monitors')}
                    style={{
                      padding: '10px 20px', fontSize: '14px', fontWeight: 500,
                      background: 'white', color: '#635BFF', border: '1px solid #C7CED6',
                      borderRadius: '6px', cursor: 'pointer'
                    }}
                  >
                    {t('settings:settingsPage.customerDisplay.resetPosition', 'Reset Position')}
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

          {/* ───── Tables & QR 탭 — Zones/Groups + Table Management + Quick-entry QR + External QR ───── */}
          {activeTab === 'tablesQr' && (
            <>
              <SettingsGrid>
              {user?.restaurantId && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <ZonesAndGroupsCard
                    restaurantId={Number(user.restaurantId)}
                    restaurantName={storeSettings.name}
                    authToken={getAuthToken()}
                    qrCodeBaseUrl={tableSettings.qrCodeBaseUrl}
                    restaurantSlug={restaurantSlug}
                  />
                </div>
              )}

              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>{t('settings:settingsPage.tableManagement')}</CardTitle>
                <p style={{ color: '#4B5563', marginBottom: '20px', fontSize: '14px' }}>
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
                    <FormGroup>
                        <Toggle>
                          <ToggleLabel>{t('settings:settingsPage.clearTableOnPayment')}</ToggleLabel>
                          <AutoSaveField ref={clearTableOnPaymentToggleRef} onSave={handleSave} type="toggle">
                          <ToggleSwitch>
                            <ToggleInput type="checkbox" checked={tableSettings.clearTableOnPayment}
                              onChange={(e) => { setTableSettings({...tableSettings, clearTableOnPayment: e.target.checked}); clearTableOnPaymentToggleRef.current?.triggerSave(); }} />
                            <ToggleSlider />
                          </ToggleSwitch>
                          </AutoSaveField>
                        </Toggle>
                      <HelpText>{t('settings:settingsPage.clearTableOnPaymentHelp')}</HelpText>
                    </FormGroup>
                  </div>
                  <div>
                    <div style={{ padding: '14px', background: '#F9FAFB', border: '1px solid #C7CED6', borderRadius: '6px', fontSize: '13px', color: '#4B5563', lineHeight: 1.5 }}>
                      {t('settings:zonesGroups.legacyHint')}
                    </div>
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
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid ' + (tableSettings.qrMode === 'static' ? '#635BFF' : '#C7CED6'), borderRadius: '8px', cursor: 'pointer', background: tableSettings.qrMode === 'static' ? '#F0F0FF' : 'white' }}>
                      <input type="radio" name="qrMode" value="static" checked={tableSettings.qrMode === 'static'} onChange={() => { setTableSettings({...tableSettings, qrMode: 'static'}); qrModeRef.current?.triggerSave(); }} />
                      <div>
                        <div style={{ fontWeight: 500 }}>{t('settings:settingsPage.static')}</div>
                        <div style={{ fontSize: '12px', color: '#4B5563' }}>{t('settings:settingsPage.permanentQrNoExpiration')}</div>
                      </div>
                    </label>
                    </AutoSaveField>
                    <AutoSaveField ref={qrModeSessionRef} onSave={handleSave} type="toggle" style={{ flex: 1 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', border: '1px solid ' + (tableSettings.qrMode === 'session' ? '#635BFF' : '#C7CED6'), borderRadius: '8px', cursor: 'pointer', background: tableSettings.qrMode === 'session' ? '#F0F0FF' : 'white' }}>
                      <input type="radio" name="qrMode" value="session" checked={tableSettings.qrMode === 'session'} onChange={() => { setTableSettings({...tableSettings, qrMode: 'session'}); qrModeSessionRef.current?.triggerSave(); }} />
                      <div>
                        <div style={{ fontWeight: 500 }}>{t('settings:settingsPage.session')}</div>
                        <div style={{ fontSize: '12px', color: '#4B5563' }}>{t('settings:settingsPage.expiringQrGeneratedPerVisit')}</div>
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
                {tableSettings.qrMode === 'session' && (
                  <div style={{ marginTop: '24px', padding: '16px', background: '#F0F0FF', borderRadius: '8px', color: '#635BFF', fontSize: '14px' }}>
                    Session mode is active. QR codes are generated per visit from the <strong>{t('settings:settingsPage.floorPlan')}</strong> page.
                    Static QR codes per table are shown in the <strong>Zones &amp; Table Groups</strong> card above.
                  </div>
                )}
                {tableSettings.qrMode === 'static' && (
                  <div style={{ marginTop: '16px', padding: '12px 14px', background: '#F9FAFB', border: '1px solid #C7CED6', borderRadius: '6px', fontSize: '13px', color: '#4B5563' }}>
                    Static QR codes per table are shown in the <strong>Zones &amp; Table Groups</strong> card above.
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
                    <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                      {t('settings:operations.quickEntryQrDesc')}
                      <br /><span style={{ color: '#6B7280' }}>{t('settings:operations.quickEntryQrHintPrefix')}<button type="button" onClick={() => handleTabChange('mobileOrder')} style={{ background: 'none', border: 'none', color: '#635BFF', textDecoration: 'underline', cursor: 'pointer', padding: 0, font: 'inherit' }}>{t('settings:operations.quickEntryQrHintLink')}</button>{t('settings:operations.quickEntryQrHintSuffix')}</span>
                    </p>
                    <TablesGrid>
                      {cards.map(card => {
                        const idSafe = `qe-${card.key}`;
                        return (
                          <TableItem key={idSafe}>
                            <TableNumber>{card.label}</TableNumber>
                            <div style={{ fontSize: '11px', color: '#6B7280', textAlign: 'center', marginBottom: '6px' }}>{card.description}</div>
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
                <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                  Create QR codes with custom names (e.g. "Cafe Maru", "Lobby") for partner locations.
                  Orders will be recorded with this name in place of a table number.
                  <br />
                  <span style={{ color: '#6B7280' }}>
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
                    <button type="button"
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
                              <button type="button"
                                type="button"
                                onClick={() => handleRemoveExternalQR(name)}
                                title="Delete"
                                style={{
                                  position: 'absolute', top: '8px', right: '8px',
                                  width: '24px', height: '24px',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  background: 'transparent', border: 'none', borderRadius: '4px',
                                  color: '#6B7280', fontSize: '16px', lineHeight: 1, cursor: 'pointer',
                                  transition: 'all 0.15s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.color = '#DC2626'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280'; }}
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
                                    border: '1px solid ' + (hasCoupon ? '#F59E0B' : '#C7CED6'),
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
                                    border: '1px solid ' + (hasOrderTypePin ? '#635BFF' : '#C7CED6'),
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
                    <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
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
                          <button type="button"
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
                          <button type="button"
                            type="button"
                            onClick={() => { window.location.href = `/restaurant/${user?.restaurantId}/settings?tab=store`; }}
                            style={{ padding: '8px 14px', background: '#EEF2FF', color: '#635BFF', border: '1px solid #C7D2FE', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
                          >
                            {t('settings:settingsPage.openQrManager')} →
                          </button>
                        </div>
                      </div>
                      <div style={{ padding: '8px', background: 'white', border: '1px solid #C7CED6', borderRadius: '8px' }}>
                        <QRCodeSVG value={`${tableSettings.qrCodeBaseUrl}/mobile/${restaurantSlug}`} size={104} level="H" includeMargin={true} />
                      </div>
                    </div>
                  </SettingsCard>
                )}

                {/* Pause ordering — emergency stop, placed 2nd right under Mobile Order entry */}
                <SettingsCard style={{ gridColumn: '1 / -1', borderLeft: mobileSettings.pause_ordering ? '4px solid #DC2626' : undefined }}>
                  <CardTitle>{t('settings:settingsPage.pauseOrdering')}</CardTitle>
                  <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
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

                {/* Quick Order + Mobile Order Alerts — paired side by side (2-col). */}
                <div style={{ gridColumn: '1 / -1' }}>
                <SettingsGrid>
                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.quickOrder')}</CardTitle>
                  <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                    Allow customers to order without providing contact information
                  </p>
                  <Toggle>
                      <ToggleLabel>
                        <span>{t('settings:settingsPage.allowQuickOrder')}</span>
                        <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 400, marginLeft: '8px' }}>(No customer info required)</span>
                      </ToggleLabel>
                      <AutoSaveField ref={mobileOrderQuickOrderRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput type="checkbox" checked={operationSettings.allowQuickOrder !== false}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, allowQuickOrder: e.target.checked })); mobileOrderQuickOrderRef.current?.triggerSave(); }} />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </Toggle>
                  <p style={{ color: '#6B7280', fontSize: '12px', marginTop: '8px' }}>
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
                  <CardTitle>{t('settings:settingsPage.mobileOrderAlerts', 'Mobile Order Alerts')}</CardTitle>
                  <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                    {t('settings:settingsPage.mobileOrderAlertsHint', 'How staff are notified when a new mobile/QR order arrives. Sidebar badge and Floor Plan dot are always shown.')}
                  </p>
                  <Toggle>
                    <ToggleLabel>{t('settings:settingsPage.alertBannerOnAllPages', 'Show notification banner on all pages')}</ToggleLabel>
                    <AutoSaveField onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput
                          type="checkbox"
                          checked={operationSettings.mobileOrderAlerts?.bannerEnabled !== false}
                          onChange={(e) => {
                            setOperationSettings(prev => ({
                              ...prev,
                              mobileOrderAlerts: { ...(prev.mobileOrderAlerts || { bannerEnabled: true, soundEnabled: true, soundType: 'bell' }), bannerEnabled: e.target.checked }
                            }));
                          }}
                        />
                        <ToggleSlider />
                      </ToggleSwitch>
                    </AutoSaveField>
                  </Toggle>
                  <p style={{ color: '#6B7C93', fontSize: '13px', marginTop: '8px' }}>
                    {t('settings:settingsPage.mobileAlertSoundMoved', 'The new-order alert sound is now set in Operations → Order Notification Sounds (shared across all screens).')}
                  </p>
                </SettingsCard>
                </SettingsGrid>
                </div>

                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.orderTypes')}</CardTitle>
                  <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                    Enable or disable order types for mobile ordering
                  </p>
                  <Toggle>
                      <ToggleLabel>
                        {t('settings:settingsPage.dineIn')}
                        <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 400, marginLeft: 8 }}>
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
                        <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 400, marginLeft: 8 }}>
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
                        <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 400, marginLeft: 8 }}>
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
                        <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 400, marginLeft: 8 }}>
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
                        <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 400, marginLeft: 8 }}>
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

                <SettingsCard>
                  <CardTitle>{t('settings:mobileOrder.orderProcessingTitle')}</CardTitle>
                  <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                    {t('settings:mobileOrder.orderProcessingDesc')}
                  </p>
                  <Toggle>
                    <div style={{ flex: 1 }}>
                      <ToggleLabel style={{ marginBottom: '4px' }}>{t('settings:mobileOrder.requirePaymentLabel')}</ToggleLabel>
                      <p style={{ fontSize: '12px', color: '#4B5563', margin: 0 }}>
                        {t('settings:mobileOrder.requirePaymentDescOff')}<br/>
                        {t('settings:mobileOrder.requirePaymentDescOn')}
                      </p>
                    </div>
                    {/* 2026-05-27: UI 토글 의미 반전 — 매장 직원 직관에 맞춤.
                        ON  (체크) = "즉시 키친 발송" (사용자가 자연스럽게 기대하는 방향)
                        OFF (해제) = "결제 후 키친 발송" (안전 모드)
                        DB 컬럼 (`requirePaymentBeforeKitchen`) 의미는 그대로 — 단지 표시만 뒤집어
                        토글 ON 시 DB 에 false 저장. 라벨/설명도 함께 바뀜. */}
                    <AutoSaveField ref={requirePaymentBeforeKitchenRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput
                          type="checkbox"
                          checked={!(operationSettings.mobileOrderProcessing?.requirePaymentBeforeKitchen ?? false)}
                          onChange={(e) => {
                            // UI ON = 즉시 발송 = DB false
                            const sendImmediately = e.target.checked;
                            setOperationSettings(prev => ({
                              ...prev,
                              mobileOrderProcessing: { ...prev.mobileOrderProcessing, requirePaymentBeforeKitchen: !sendImmediately }
                            }));
                            requirePaymentBeforeKitchenRef.current?.triggerSave();
                          }}
                        />
                        <ToggleSlider />
                      </ToggleSwitch>
                    </AutoSaveField>
                  </Toggle>

                  {/* 할인 PIN 승인 토글 (#5) */}
                  <Toggle>
                    <div style={{ flex: 1 }}>
                      <ToggleLabel style={{ marginBottom: '4px' }}>{t('settings:operations.requirePinForDiscountLabel', { defaultValue: 'Require PIN approval for discounts' })}</ToggleLabel>
                      <p style={{ fontSize: '12px', color: '#4B5563', margin: 0 }}>
                        {t('settings:operations.requirePinForDiscountDesc', { defaultValue: 'When on, applying a discount requires a manager PIN.' })}
                      </p>
                    </div>
                    <AutoSaveField ref={requirePinForDiscountRef} onSave={handleSave} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput
                          type="checkbox"
                          checked={!!(operationSettings as any).requirePinForDiscount}
                          onChange={(e) => {
                            const v = e.target.checked;
                            setOperationSettings(prev => ({ ...prev, requirePinForDiscount: v } as any));
                            requirePinForDiscountRef.current?.triggerSave();
                          }}
                        />
                        <ToggleSlider />
                      </ToggleSwitch>
                    </AutoSaveField>
                  </Toggle>
                </SettingsCard>

                {operationSettings.orderTypes?.pickup && (
                  <SettingsCard>
                    <CardTitle>{t('settings:settingsPage.pickupSettings')}</CardTitle>
                    <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                      {t('settings:settingsPage.pickupSettingsHint')}
                    </p>
                    <FormGroup>
                      <Label>{t('settings:settingsPage.prepMinutes')}</Label>
                      <AutoSaveField ref={mobileOrderPickupPrepRef} onSave={handleSave}>
                        <Input type="number" min="0" step="5"
                          value={operationSettings.pickupSettings?.prepMinutes ?? 30}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, pickupSettings: { ...prev.pickupSettings, prepMinutes: Number(e.target.value) } })); }} />
                      </AutoSaveField>
                      <span style={{ color: '#4B5563', fontSize: '14px', marginLeft: '8px' }}>{t('settings:settingsPage.prepMinutesUnit')}</span>
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
                        <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 400, marginLeft: 8 }}>
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
                    <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                      {t('settings:settingsPage.takeawaySettingsHint')}
                    </p>
                    <FormGroup>
                      <Label>{t('settings:settingsPage.prepMinutes')}</Label>
                      <AutoSaveField ref={mobileOrderTakeawayPrepRef} onSave={handleSave}>
                        <Input type="number" min="0" step="5"
                          value={operationSettings.takeawaySettings?.prepMinutes ?? 15}
                          onChange={(e) => { setOperationSettings(prev => ({ ...prev, takeawaySettings: { ...prev.takeawaySettings, prepMinutes: Number(e.target.value) } })); }} />
                      </AutoSaveField>
                      <span style={{ color: '#4B5563', fontSize: '14px', marginLeft: '8px' }}>{t('settings:settingsPage.prepMinutesUnit')}</span>
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

                {operationSettings.orderTypes?.delivery && (
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
                        <span style={{ color: '#4B5563', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                        <HelpText>Minimum subtotal required for delivery orders (0 = no minimum)</HelpText>
                      </FormGroup>
                      <FormGroup>
                        <Label>{t('settings:settingsPage.freeDeliveryAbove')}</Label>
                        <AutoSaveField onSave={handleSave}>
                          <FeeInput type="number" step="1.00" value={operationSettings.deliveryPricing.freeAbove}
                            onChange={(e) => { setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, freeAbove: Number(e.target.value) } })); }} />
                        </AutoSaveField>
                        <span style={{ color: '#4B5563', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span>
                        <HelpText>Waive delivery fee if order subtotal exceeds this amount (999999 = never free)</HelpText>
                      </FormGroup>
                      <Divider />
                      <Label style={{ marginBottom: '16px' }}>{t('settings:settingsPage.deliveryZones')}</Label>
                      <HelpText style={{ marginBottom: '16px' }}>{t('settings:settingsPage.configureDeliveryZonesAndTheirCorrespondingFees')}</HelpText>
                          {(operationSettings.deliveryPricing.zones || []).map((zone: any, index: number) => (
                            <div key={index} style={{ background: '#F9FAFB', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #C7CED6' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <Label style={{ margin: 0 }}>Zone {index + 1}</Label>
                                <button type="button" onClick={() => {
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
                                <span style={{ color: '#4B5563', fontSize: '14px' }}>{getCurrencySymbol(currencySettings.currency)}</span></FormGroup>
                            </div>
                          ))}
                          <button type="button" onClick={() => {
                            const zones = [...(operationSettings.deliveryPricing.zones || [])]; zones.push({ id: `zone-${Date.now()}`, name: '', description: '', fee: 0 });
                            setOperationSettings(prev => ({ ...prev, deliveryPricing: { ...prev.deliveryPricing, zones } }));
                            setTimeout(() => handleSave(), 300);
                          }} style={{ width: '100%', padding: '12px', background: '#F0F4FF', border: '1px dashed #635BFF', borderRadius: '8px', color: '#635BFF', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}>
                            Add Delivery Zone
                          </button>
                    </>
                  )}
                </SettingsCard>
                )}

                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.displayOptions')}</CardTitle>
                  <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
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
                  <p style={{ color: '#6B7280', fontSize: '12px', marginTop: '4px', marginBottom: '12px' }}>
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
                  <p style={{ color: '#6B7280', fontSize: '12px', marginTop: '4px' }}>
                    Show best-selling items based on recent order history
                  </p>

                  {/* Source categories — a sub-setting of "Show Popular Menu", shown only when it's on. */}
                  {mobileSettings.show_popular && categories.length > 0 && (
                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E6EBF1' }}>
                      <Label style={{ marginBottom: '4px' }}>{t('settings:settingsPage.popularMenuCategories')}</Label>
                      <p style={{ color: '#6B7280', fontSize: '12px', marginTop: 0, marginBottom: '12px' }}>
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
                    </div>
                  )}
                </SettingsCard>

                {/* Time restrictions — Category + Item side by side (2-col); inputs stack vertically inside each narrow card. */}
                <div style={{ gridColumn: '1 / -1' }}>
                <SettingsGrid>
                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.categoryTimeRestrictions')}</CardTitle>
                  <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                    Restrict specific categories to certain hours on mobile order only. Categories without a schedule are always visible.
                  </p>
                  <AutoSaveField ref={mobileOrderCategorySchedulesRef} onSave={handleSave} type="list">
                    <>
                      {/* Add-schedule control pinned at the TOP (mirrors Item Time Restrictions
                          search placement) so it's always reachable without scrolling past the list. */}
                      {(() => {
                        const scheduledIds = new Set((mobileSettings.category_schedules || []).map(s => s.category_id?.toString()));
                        const availableCats = categories.filter((c: any) => !scheduledIds.has(c.id?.toString()));
                        if (availableCats.length === 0) return (
                          <p style={{ color: '#6B7280', fontSize: '13px', textAlign: 'center', padding: '12px' }}>{t('settings:settingsPage.allCategoriesHaveSchedulesAssigned')}</p>
                        );
                        return (
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                            <select
                              id="add-schedule-cat"
                              style={{ flex: 1, minWidth: 0, boxSizing: 'border-box', padding: '12px 16px', border: '1px solid #C7CED6', borderRadius: '8px', fontSize: '14px', background: 'white' }}
                            >
                              {availableCats.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>{cat.emoji || '🍽️'} {cat.name}</option>
                              ))}
                            </select>
                            <button type="button" onClick={() => {
                              const sel = document.getElementById('add-schedule-cat') as HTMLSelectElement;
                              if (!sel?.value) return;
                              const catId = parseInt(sel.value);
                              setMobileSettings(prev => ({
                                ...prev,
                                category_schedules: [...prev.category_schedules, { category_id: catId, start_time: '09:00', end_time: '22:00', days: [], display: 'hide' }]
                              }));
                              mobileOrderCategorySchedulesRef.current?.triggerSave();
                            }} style={{ padding: '10px 16px', background: '#F0F4FF', border: '1px dashed #635BFF', borderRadius: '8px', color: '#635BFF', fontSize: '14px', fontWeight: '500', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                              Add Schedule
                            </button>
                          </div>
                        );
                      })()}
                      {(mobileSettings.category_schedules || []).map((sched, index) => {
                        const cat = categories.find((c: any) => c.id === sched.category_id || c.id?.toString() === sched.category_id?.toString());
                        return (
                          <div key={index} style={{ background: '#F9FAFB', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #C7CED6' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                              <Label style={{ margin: 0 }}>{cat ? `${cat.emoji || '🍽️'} ${cat.name}` : `Category #${sched.category_id}`}</Label>
                              <button type="button" onClick={() => {
                                setMobileSettings(prev => ({ ...prev, category_schedules: prev.category_schedules.filter((_, i) => i !== index) }));
                                mobileOrderCategorySchedulesRef.current?.triggerSave();
                              }} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '14px', padding: '4px 8px' }}>{t('settings:settingsPage.remove')}</button>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'stretch' }}>
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

                            {/* Days of week — none selected = every day */}
                            <div style={{ marginTop: '12px' }}>
                              <Label>{t('settings:settingsPage.scheduleDays', 'Days')}</Label>
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {[0, 1, 2, 3, 4, 5, 6].map(d => {
                                  const days = Array.isArray(sched.days) ? sched.days : [];
                                  const on = days.includes(d);
                                  return (
                                    <button key={d} type="button"
                                      onClick={() => {
                                        setMobileSettings(prev => {
                                          const arr = [...prev.category_schedules];
                                          const cur = Array.isArray(arr[index].days) ? arr[index].days! : [];
                                          const next = cur.includes(d) ? cur.filter(x => x !== d) : [...cur, d].sort((a, b) => a - b);
                                          arr[index] = { ...arr[index], days: next };
                                          return { ...prev, category_schedules: arr };
                                        });
                                        mobileOrderCategorySchedulesRef.current?.triggerSave();
                                      }}
                                      style={{ width: '42px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                                        border: on ? '1px solid #635BFF' : '1px solid #C7CED6',
                                        background: on ? '#635BFF' : '#FFFFFF', color: on ? '#FFFFFF' : '#4B5563' }}>
                                      {t('settings:settingsPage.weekdayShortList', 'Su,Mo,Tu,We,Th,Fr,Sa').split(',')[d]}
                                    </button>
                                  );
                                })}
                              </div>
                              {(!sched.days || sched.days.length === 0) && (
                                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>{t('settings:settingsPage.everyDay', 'Every day')}</div>
                              )}
                            </div>

                            {/* Event date range — optional, for limited-time events */}
                            <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexDirection: 'column' }}>
                              <FormGroup style={{ flex: 1, marginBottom: 0 }}>
                                <Label>{t('settings:settingsPage.eventStart', 'Event start (optional)')}</Label>
                                <DateField value={sched.start_date || ''} placeholder={t('settings:settingsPage.noDateLimit', 'No limit')}
                                  onChange={(v) => {
                                    setMobileSettings(prev => {
                                      const arr = [...prev.category_schedules];
                                      arr[index] = { ...arr[index], start_date: v || null };
                                      return { ...prev, category_schedules: arr };
                                    });
                                    mobileOrderCategorySchedulesRef.current?.triggerSave();
                                  }} />
                              </FormGroup>
                              <FormGroup style={{ flex: 1, marginBottom: 0 }}>
                                <Label>{t('settings:settingsPage.eventEnd', 'Event end (optional)')}</Label>
                                <DateField value={sched.end_date || ''} placeholder={t('settings:settingsPage.noDateLimit', 'No limit')}
                                  onChange={(v) => {
                                    setMobileSettings(prev => {
                                      const arr = [...prev.category_schedules];
                                      arr[index] = { ...arr[index], end_date: v || null };
                                      return { ...prev, category_schedules: arr };
                                    });
                                    mobileOrderCategorySchedulesRef.current?.triggerSave();
                                  }} />
                              </FormGroup>
                            </div>

                            {/* Off-schedule display mode */}
                            <FormGroup style={{ marginTop: '12px', marginBottom: 0 }}>
                              <Label>{t('settings:settingsPage.whenOffSchedule', 'When off-schedule')}</Label>
                              <select value={sched.display || 'hide'}
                                onChange={(e) => {
                                  setMobileSettings(prev => {
                                    const arr = [...prev.category_schedules];
                                    arr[index] = { ...arr[index], display: e.target.value as 'hide' | 'disable' };
                                    return { ...prev, category_schedules: arr };
                                  });
                                  mobileOrderCategorySchedulesRef.current?.triggerSave();
                                }}
                                style={{ width: '100%', padding: '12px 16px', border: '1px solid #C7CED6', borderRadius: '8px', fontSize: '14px', background: 'white' }}>
                                <option value="hide">{t('settings:settingsPage.offScheduleHide', 'Hide from menu')}</option>
                                <option value="disable">{t('settings:settingsPage.offScheduleDisable', 'Show as unavailable')}</option>
                              </select>
                            </FormGroup>
                          </div>
                        );
                      })}
                    </>
                  </AutoSaveField>
                </SettingsCard>

                {/* By Item — per-item availability (Product.availability). Mirrors the By Category list. */}
                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.itemTimeRestrictions', 'Item Time Restrictions')}</CardTitle>
                  <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                    {t('settings:settingsPage.itemTimeRestrictionsHint', 'Restrict individual menu items to certain hours or days on mobile order (e.g. a weekday-only dish). Items without a schedule are always available.')}
                  </p>
                  {(() => {
                    const scheduled = allProducts.filter((p: any) => p.availability && typeof p.availability === 'object');
                    const eligible = allProducts.filter((p: any) => !p.availability);
                    const searchLower = itemSchedAddSearch.trim().toLowerCase();
                    const filtered = searchLower
                      ? eligible.filter((p: any) => (p.name && p.name.toLowerCase().includes(searchLower)) || (p.code && String(p.code).toLowerCase().includes(searchLower)))
                      : eligible;
                    const catById = new Map<string, any>(categories.map((c: any) => [String(c.id), c]));
                    const getCatFor = (prod: any) => catById.get(String(prod.categoryId ?? prod.category_id ?? prod.category));
                    const dropdownOpen = showItemSchedAdd;
                    const defaultSched = { start_time: '09:00', end_time: '22:00', days: [], display: 'hide' as const };
                    const putAvail = async (id: number, availability: any) => {
                      const token = getAuthToken();
                      await fetch(`/api/menu/product/${id}?restaurantId=${user?.restaurantId}`, {
                        method: 'PUT',
                        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                        body: JSON.stringify({ availability })
                      });
                    };
                    const addSched = async (prod: any) => {
                      setAllProducts(prev => prev.map((p: any) => p.id === prod.id ? { ...p, availability: defaultSched } : p));
                      setItemSchedAddSearch(''); setShowItemSchedAdd(false); itemSchedInputRef.current?.blur();
                      setItemSchedJustAddedId(prod.id);
                      setTimeout(() => setItemSchedJustAddedId((cur) => cur === prod.id ? null : cur), 1800);
                      await putAvail(prod.id, defaultSched);
                    };
                    return (
                      <>
                        <div style={{ position: 'relative', marginBottom: '12px' }}>
                          <input
                            ref={itemSchedInputRef}
                            type="text"
                            placeholder={t('settings:settingsPage.searchItemToSchedule', 'Search menu item to schedule...') as string}
                            value={itemSchedAddSearch}
                            onChange={(e) => setItemSchedAddSearch(e.target.value)}
                            onFocus={() => setShowItemSchedAdd(true)}
                            onBlur={() => { setTimeout(() => setShowItemSchedAdd(false), 200); }}
                            onKeyDown={(e) => { if (e.key === 'Escape') { setItemSchedAddSearch(''); (e.target as HTMLInputElement).blur(); } }}
                            disabled={eligible.length === 0 && !itemSchedAddSearch}
                            style={{
                              width: '100%', padding: '10px 12px 10px 36px',
                              border: `1px solid ${dropdownOpen ? '#635BFF' : '#C7CED6'}`,
                              borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box',
                              background: `white url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'><circle cx='11' cy='11' r='7'/><line x1='21' y1='21' x2='16.65' y2='16.65'/></svg>") no-repeat 12px center`,
                              boxShadow: dropdownOpen ? '0 0 0 3px rgba(99, 91, 255, 0.1)' : 'none',
                              transition: 'border-color 0.15s, box-shadow 0.15s'
                            }}
                          />
                          {dropdownOpen && (
                            <div onMouseDown={(e) => e.preventDefault()} style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, maxHeight: '280px', overflowY: 'auto', background: 'white', border: '1px solid #C7CED6', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0,0,0,0.12)', zIndex: 100 }}>
                              {eligible.length === 0 ? (
                                <div style={{ padding: '14px', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
                                  {t('settings:settingsPage.allItemsScheduled', 'All menu items already have a schedule.')}
                                </div>
                              ) : filtered.length === 0 ? (
                                <div style={{ padding: '14px', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
                                  {t('settings:settingsPage.noMatchingMenuItems', 'No matching menu items.')}
                                </div>
                              ) : (
                                filtered.slice(0, 20).map((item: any) => {
                                  const cat = getCatFor(item);
                                  return (
                                    <div key={item.id} onClick={() => addSched(item)}
                                      style={{ padding: '12px 16px', cursor: 'pointer', fontSize: '13px', color: '#0A2540', borderBottom: '1px solid #F1F4F8', display: 'flex', alignItems: 'center', gap: '12px', background: 'white', transition: 'background 0.1s' }}
                                      onMouseEnter={(e) => e.currentTarget.style.background = '#F5F3FF'}
                                      onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {cat && <span style={{ color: '#4B5563', marginRight: '6px' }}>{cat.emoji}</span>}
                                        <span style={{ fontWeight: 500 }}>{item.name}</span>
                                      </span>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          )}
                        </div>

                        {scheduled.length === 0 ? (
                          <div style={{ padding: '24px', background: '#F9FAFB', border: '1px dashed #C7CED6', borderRadius: '8px', textAlign: 'center', color: '#4B5563', fontSize: '13px', lineHeight: 1.5 }}>
                            {allProducts.length === 0
                              ? t('settings:settingsPage.noMenuItemsForSchedule', 'No menu items yet. Add menu items first to set per-item schedules.')
                              : t('settings:settingsPage.noItemSchedulesHint', 'No items are time-restricted. Search above to schedule a specific item.')}
                          </div>
                        ) : (
                          scheduled.map((prod: any) => {
                            const cat = getCatFor(prod);
                            return (
                              <div key={prod.id} style={{ background: itemSchedJustAddedId === prod.id ? '#EEF2FF' : '#F9FAFB', padding: '16px', borderRadius: '8px', marginBottom: '12px', border: '1px solid #C7CED6', transition: 'background 1.2s ease' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                  <Label style={{ margin: 0 }}>{cat ? `${cat.emoji || '🍽️'} ` : ''}{prod.name}</Label>
                                  <button type="button"
                                    title={t('settings:settingsPage.removeItemSchedule', 'Remove schedule (always available)') as string}
                                    onClick={async () => {
                                      setAllProducts(prev => prev.map((p: any) => p.id === prod.id ? { ...p, availability: null } : p));
                                      await putAvail(prod.id, null);
                                    }}
                                    style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '14px', padding: '4px 8px' }}>
                                    {t('settings:settingsPage.remove')}
                                  </button>
                                </div>
                                <AutoSaveField type="list" debounceMs={1200} onSave={async () => {
                                  const cur = allProducts.find((p: any) => p.id === prod.id);
                                  await putAvail(prod.id, cur?.availability ?? null);
                                }}>
                                  <ItemScheduleEditor hideToggle value={prod.availability} onChange={(v) => {
                                    setAllProducts(prev => prev.map((p: any) => p.id === prod.id ? { ...p, availability: v } : p));
                                  }} />
                                </AutoSaveField>
                              </div>
                            );
                          })
                        )}
                      </>
                    );
                  })()}
                </SettingsCard>
                </SettingsGrid>
                </div>

              </SettingsGrid>
            </>
          )}

          {activeTab === 'reservation' && (
            <ReservationSettingsTab />
          )}

          {activeTab === 'printer' && (
            <>
              {/* ★ Emergency Routing Mode — top of the printer tab so it's the
                  first thing staff see when something breaks. Red when ON. The
                  flag is a single boolean; print routing checks it at runtime and
                  redirects every kitchen ticket to the active bill printer. We
                  never mutate the original kitchen station routing data, so
                  toggling OFF restores the normal flow instantly. */}
              {(() => {
                const isEm = !!(printerSettings as any).emergencyMode;
                const enabledAt = (printerSettings as any).emergencyEnabledAt;
                const minutesOn = enabledAt ? Math.max(0, Math.round((Date.now() - new Date(enabledAt).getTime()) / 60000)) : 0;

                // Detect the active workstation's cashier printer config so we
                // can pre-flight what the user will get when they toggle ON.
                const wsList = (printerSettings as any).workstations || [];
                const activeWs = wsList.find((w: any) => w.id === activeWorkstationId) || wsList[0];
                const wsName = activeWs?.name || '—';
                const cMethod: string = activeWs?.billPrinter?.method || 'browser';
                const cAddress: string = (activeWs?.billPrinter?.address || '').trim();
                // 실제 영수증(빌) 프린터 이름. "cashier" 추상어 대신 매장이 아는 진짜
                // 이름(예: POS-80C)을 카드에 노출 — 비상시 어디로 나가는지 명확히.
                const cName: string = (activeWs?.billPrinter?.name || '').trim();
                const cPrinterLabel: string = cName
                  || t('settings:printer.emergency.workstationReceiptPrinter', 'this workstation’s receipt printer');
                // Crude "LAN-ish" heuristic: an IP-or-host:port suggests LAN/Wi-Fi.
                const looksLan = /^(\d{1,3}\.){3}\d{1,3}(:\d+)?$/.test(cAddress) || /:\d+$/.test(cAddress);
                let envBand: 'good' | 'ok' | 'partial' = 'good';
                let envReadyKey = 'settings:printer.emergency.row2Ready';
                let envBehaviourKey = 'settings:printer.emergency.row2Behaviour';
                let envMethodLabel = '';
                if (cMethod === 'rawbt') {
                  envBand = 'good';
                  envReadyKey = 'settings:printer.emergency.row4Ready';
                  envBehaviourKey = 'settings:printer.emergency.row4Behaviour';
                  envMethodLabel = t('settings:printer.emergency.row4Method');
                } else if (cMethod === 'qztray') {
                  if (looksLan) {
                    envBand = 'partial';
                    envReadyKey = 'settings:printer.emergency.row3Ready';
                    envBehaviourKey = 'settings:printer.emergency.row3Behaviour';
                    envMethodLabel = t('settings:printer.emergency.row3Method');
                  } else {
                    envBand = 'good';
                    envReadyKey = 'settings:printer.emergency.row2Ready';
                    envBehaviourKey = 'settings:printer.emergency.row2Behaviour';
                    envMethodLabel = t('settings:printer.emergency.row2Method');
                  }
                } else {
                  envBand = 'ok';
                  envReadyKey = 'settings:printer.emergency.row1Ready';
                  envBehaviourKey = 'settings:printer.emergency.row1Behaviour';
                  envMethodLabel = t('settings:printer.emergency.row1Method');
                }
                const envBg = envBand === 'good' ? '#ECFDF5' : envBand === 'partial' ? '#FFFBEB' : '#F0F9FF';
                const envBorder = envBand === 'good' ? '#A7F3D0' : envBand === 'partial' ? '#FDE68A' : '#BAE6FD';
                const envFg = envBand === 'good' ? '#065F46' : envBand === 'partial' ? '#92400E' : '#075985';

                const toggleEmergency = async (next: boolean) => {
                  const nowIso = new Date().toISOString();
                  const newPS = {
                    ...printerSettings,
                    emergencyMode: next,
                    emergencyEnabledAt: next ? nowIso : null
                  };
                  setPrinterSettings(newPS as any);
                  if (!user?.restaurantId) return;
                  try {
                    const token = getAuthToken();
                    const r = await fetch(`/api/restaurants/${user.restaurantId}`, {
                      method: 'PUT',
                      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                      body: JSON.stringify({ printer_settings: newPS })
                    });
                    const d = await r.json();
                    if (!d.success) throw new Error('save failed');
                    // Inform the user — Setup Modal style, NOT alert/toast.
                    setInfoModal({
                      open: true,
                      title: next
                        ? t('settings:printer.emergency.modalOnTitle', 'Emergency Mode Enabled')
                        : t('settings:printer.emergency.modalOffTitle', 'Emergency Mode Disabled'),
                      message: next
                        ? t('settings:printer.emergency.modalOnMessage',
                            'All order tickets (POS and mobile) will print from {{printer}} — the receipt/bill printer on this workstation. Staff must hand-deliver tickets to each station.\n\nIf internet is down, connect this POS to a mobile hotspot. Old PCs without Wi-Fi: use a USB Wi-Fi dongle (TP-Link Nano / Mercusys / ASUS USB Adapter). Hotspot is for internet only — keep kitchen printers OFF the hotspot.',
                            { printer: cPrinterLabel })
                        : t('settings:printer.emergency.modalOffMessage',
                            'Original printer routing restored. Each station prints to its own printer again.')
                    });
                  } catch {
                    setInfoModal({ open: true, title: 'Save failed', message: 'Could not update emergency mode. Try again or check your connection.' });
                  }
                };

                const testCashierPrint = async () => {
                  try {
                    const { printBillViaRawBT } = await import('../../utils/billPrint');
                    const sample = {
                      orderNumber: 'TEST-EM',
                      items: [{ menuItem: { name: t('settings:printer.emergency.testItem', 'Cashier Printer Test') }, quantity: 1, price: 0 }],
                      total: 0, subtotal: 0, tax: 0,
                      paymentMethod: 'TEST'
                    };
                    await printBillViaRawBT(sample as any, { name: 'PurpleHere' } as any);
                  } catch (e: any) {
                    setInfoModal({ open: true, title: 'Test print failed', message: e?.message || 'Could not reach the cashier printer.' });
                  }
                };

                return (
                  <SettingsCard
                    style={{
                      marginBottom: '24px',
                      background: isEm ? '#FEF2F2' : '#FFFFFF',
                      border: isEm ? '2px solid #DC2626' : '1px solid #C7CED6'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: '28px', height: '28px', borderRadius: '50%',
                          background: isEm ? '#DC2626' : '#9CA3AF', color: '#fff',
                          fontSize: '16px', fontWeight: 700
                        }} aria-hidden="true">!</span>
                        <CardTitle style={{ margin: 0, color: isEm ? '#7F1D1D' : '#0A2540' }}>
                          {isEm
                            ? t('settings:printer.emergency.titleOn', 'Emergency Mode — ALL ORDERS ROUTED TO CASHIER')
                            : t('settings:printer.emergency.titleOff', 'Emergency Routing Mode')}
                        </CardTitle>
                        <button
                          type="button"
                          onClick={() => setShowPrinterTroubleshoot(true)}
                          style={{
                            padding: '4px 10px', fontSize: '11px', fontWeight: 600,
                            border: '1px solid #C7CED6', borderRadius: '12px',
                            background: '#fff', color: '#4B5563', cursor: 'pointer'
                          }}
                          title={t('settings:printer.troubleshoot.openTitle', 'Open the printer troubleshooting guide')}
                        >
                          {t('settings:printer.troubleshoot.openBtn', '문제 해결 가이드 ?')}
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {!isEm && (
                          <button
                            type="button"
                            onClick={testCashierPrint}
                            style={{
                              padding: '10px 16px', fontSize: '13px', fontWeight: 500,
                              border: '1px solid #6B7280', borderRadius: '8px',
                              background: '#fff', color: '#1F2937', cursor: 'pointer'
                            }}
                          >
                            {t('settings:printer.emergency.testCashier', 'Test Cashier Printer')}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleEmergency(!isEm)}
                          style={{
                            padding: '10px 20px', fontSize: '14px', fontWeight: 700,
                            border: 'none', borderRadius: '8px', cursor: 'pointer',
                            background: isEm ? '#DC2626' : '#10B981', color: '#fff',
                            minWidth: '140px'
                          }}
                        >
                          {isEm
                            ? t('settings:printer.emergency.turnOff', 'Turn OFF')
                            : t('settings:printer.emergency.turnOn', 'Turn ON')}
                        </button>
                      </div>
                    </div>

                    <p style={{ fontSize: '13px', color: isEm ? '#7F1D1D' : '#4B5563', lineHeight: 1.6, margin: '0 0 12px' }}>
                      {isEm
                        ? t('settings:printer.emergency.descOn',
                            'Every order ticket — POS and mobile — is printing from {{printer}} (the receipt/bill printer on this workstation) regardless of station mapping. Staff must hand-deliver tickets to each station. Click "Turn OFF" once your kitchen printers / network are back to normal.',
                            { printer: cPrinterLabel })
                        : t('settings:printer.emergency.descOff',
                            'One-click escape hatch for kitchen printer or network failures. Activating reroutes every order ticket (POS and mobile) to {{printer}} — the receipt/bill printer on this workstation. Original station routing is preserved — turning OFF restores it instantly. No manual reconfiguration.',
                            { printer: cPrinterLabel })}
                    </p>

                    {/* "How it works + recommended setup" — combined accordion.
                        Merges the old "effect by method" table and the old prereq
                        bullets into a single collapsed-by-default block, with the
                        core idea + recommendation up front so most users don't
                        need to expand the table at all. */}
                    <div style={{ border: '1px solid #FDE68A', borderRadius: '8px', overflow: 'hidden', marginBottom: '12px' }}>
                      <button
                        type="button"
                        onClick={() => setEmergencyEffectOpen(v => !v)}
                        aria-expanded={emergencyEffectOpen}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '12px 16px', background: '#FFFBEB', border: 'none', cursor: 'pointer',
                          fontSize: '13px', fontWeight: 600, color: '#92400E', textAlign: 'left'
                        }}
                      >
                        <span>{t('settings:printer.emergency.howItWorksTitle', 'How emergency mode works + recommended cashier setup')}</span>
                        <span style={{ fontSize: '14px', color: '#92400E', transform: emergencyEffectOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>▾</span>
                      </button>
                      {emergencyEffectOpen && (
                        <div style={{ padding: '14px 16px', background: '#FFFFFF', borderTop: '1px solid #FDE68A' }}>
                          <p style={{ fontSize: '13px', color: '#1F2937', lineHeight: 1.7, margin: '0 0 10px' }}>
                            <strong>{t('settings:printer.emergency.coreIdea', 'Core idea: emergency mode just redirects EVERY ticket to the cashier printer. So how reliable it is depends entirely on how the cashier printer is connected.')}</strong>
                          </p>
                          <p style={{ fontSize: '13px', color: '#1F2937', lineHeight: 1.7, margin: '0 0 14px' }}>
                            {t('settings:printer.emergency.coreRecommendation', '👉 Recommended: connect the cashier printer directly via USB or Bluetooth (router-independent). Keep kitchen printers on LAN as normal. This way, even if the router or kitchen printers die, the cashier alone keeps the shop running.')}
                          </p>

                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>
                            {t('settings:printer.emergency.effectByMethodTitle', 'Behaviour by cashier method')}
                          </div>
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', color: '#1F2937', minWidth: '480px' }}>
                              <thead>
                                <tr style={{ background: '#F9FAFB' }}>
                                  <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid #E5E7EB' }}>{t('settings:printer.emergency.colCashierMethod', 'Cashier printer method')}</th>
                                  <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid #E5E7EB' }}>{t('settings:printer.emergency.colBehaviour', 'Behaviour during emergency')}</th>
                                  <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid #E5E7EB' }}>{t('settings:printer.emergency.colReady', 'Emergency-ready?')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.emergency.row1Method')}</td>
                                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.emergency.row1Behaviour')}</td>
                                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.emergency.row1Ready')}</td>
                                </tr>
                                <tr>
                                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.emergency.row2Method')}</td>
                                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.emergency.row2Behaviour')}</td>
                                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top', color: '#047857', fontWeight: 600 }}>{t('settings:printer.emergency.row2Ready')}</td>
                                </tr>
                                <tr>
                                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.emergency.row3Method')}</td>
                                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.emergency.row3Behaviour')}</td>
                                  <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top', color: '#92400E', fontWeight: 600 }}>{t('settings:printer.emergency.row3Ready')}</td>
                                </tr>
                                <tr>
                                  <td style={{ padding: '8px 10px', verticalAlign: 'top' }}>{t('settings:printer.emergency.row4Method')}</td>
                                  <td style={{ padding: '8px 10px', verticalAlign: 'top' }}>{t('settings:printer.emergency.row4Behaviour')}</td>
                                  <td style={{ padding: '8px 10px', verticalAlign: 'top', color: '#047857', fontWeight: 600 }}>{t('settings:printer.emergency.row4Ready')}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Live comparison — two columns showing "now" vs "ON" */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '10px', alignItems: 'stretch', marginBottom: '12px' }}>
                      {/* LEFT — Current / Normal routing */}
                      <div style={{
                        padding: '12px 14px',
                        background: isEm ? '#F9FAFB' : '#F1F4F8',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        opacity: isEm ? 0.6 : 1
                      }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#4B5563', marginBottom: '8px', letterSpacing: '0.4px' }}>
                          {isEm
                            ? t('settings:printer.emergency.leftLabelOn', 'NORMAL (PAUSED)')
                            : t('settings:printer.emergency.leftLabelOff', 'NOW — NORMAL')}
                        </div>
                        <div style={{ fontSize: '12px', color: '#1F2937', lineHeight: 1.7 }}>
                          <div>
                            <strong>{t('settings:printer.emergency.activeWorkstation', 'Active workstation')}:</strong> {wsName}
                          </div>
                          <div>
                            <strong>{t('settings:printer.emergency.cashierMethodLabel', 'Cashier method')}:</strong> {envMethodLabel}{cAddress ? ` · ${cAddress}` : ''}
                          </div>
                          <div>
                            <strong>{t('settings:printer.emergency.routing', 'Routing')}:</strong> {t('settings:printer.emergency.routingNormal', 'Each station → its own printer (bar / kitchen / dessert separate)')}
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: isEm ? '#DC2626' : '#9CA3AF', fontWeight: 700 }}>
                        →
                      </div>

                      {/* RIGHT — Emergency routing */}
                      <div style={{
                        padding: '12px 14px',
                        background: isEm ? '#FEE2E2' : envBg,
                        border: `${isEm ? '2px' : '1px'} solid ${isEm ? '#DC2626' : envBorder}`,
                        borderRadius: '8px'
                      }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: isEm ? '#7F1D1D' : envFg, marginBottom: '8px', letterSpacing: '0.4px' }}>
                          {isEm
                            ? t('settings:printer.emergency.rightLabelOn', '🟢 RIGHT NOW — EMERGENCY ACTIVE')
                            : t('settings:printer.emergency.rightLabelOff', '⚡ IF YOU TURN ON')}
                        </div>
                        <div style={{ fontSize: '12px', color: isEm ? '#7F1D1D' : envFg, lineHeight: 1.7 }}>
                          <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '2px' }}>
                            → {cPrinterLabel}
                          </div>
                          <div style={{ fontSize: '11px', opacity: 0.85, marginBottom: '6px' }}>
                            {t('settings:printer.emergency.destinationHint', 'Receipt (bill) printer on workstation “{{ws}}”', { ws: wsName })}
                          </div>
                          <div>
                            <strong>{t('settings:printer.emergency.routing', 'Routing')}:</strong> {t('settings:printer.emergency.routingEmergency2', 'Every order ticket (all stations) prints here', {})}
                          </div>
                          <div>
                            <strong>{isEm
                              ? t('settings:printer.emergency.currentBehaviour', 'Behaviour now')
                              : t('settings:printer.emergency.expectedBehaviour', 'If turned ON')}:</strong> {t(envBehaviourKey)}
                          </div>
                          <div>
                            <strong>{t('settings:printer.emergency.fitness', 'Emergency fitness')}:</strong> {t(envReadyKey)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {isEm && enabledAt && (
                      <div style={{ fontSize: '12px', color: '#7F1D1D', marginBottom: '10px' }}>
                        {t('settings:printer.emergency.enabledFor', 'Active for {{minutes}} minute(s)', { minutes: minutesOn })} · {new Date(enabledAt).toLocaleString()}
                      </div>
                    )}

                  </SettingsCard>
                );
              })()}

              {/* Auto-Print Preview button — opens a modal showing the LAST 10
                  orders with per-station breakdown of what would print. Uses
                  the same bucketing logic as the actual auto-print path so the
                  preview is faithful. Catches the "station configured in DB
                  but no printer assigned → items silently merge into first
                  station" trap that has hit the store multiple times. Preview
                  only — no actual print. */}
              <div style={{ margin: '12px 0 16px 0', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setAutoPrintPreviewOpen(true)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 8,
                    border: '1px solid #635BFF',
                    background: '#F0EFFF',
                    color: '#635BFF',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer'
                  }}
                >
                  {t('settings:autoPrintPreview.title')}
                </button>
              </div>

              {/* Printer methods guide — 3 tabs so Browser / QZ Tray / RawBT are
                  presented as equally valid options. Each tab explains when to
                  pick it and shows its setup steps. The actual per-printer Method
                  select sits on every Workstation / Kitchen card below. */}
              <SettingsCard style={{ marginBottom: '24px' }}>
                <CardTitle>{t('settings:printer.methodGuide.title')}</CardTitle>
                <p style={{ color: '#4B5563', marginBottom: '12px', fontSize: '14px' }}>
                  {t('settings:printer.methodGuide.desc')}
                </p>

                {/* Decision matrix — accordion (collapsed by default). Opens
                    when user actually needs to choose. Keeps the printer tab clean. */}
                <div style={{ marginBottom: '16px', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setMethodMatrixOpen(v => !v)}
                    aria-expanded={methodMatrixOpen}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 16px', background: '#F9FAFB', border: 'none', cursor: 'pointer',
                      fontSize: '13px', fontWeight: 600, color: '#1F2937', textAlign: 'left'
                    }}
                  >
                    <span>{t('settings:printer.methodGuide.matrixTitle', 'Which method should I pick?')}</span>
                    <span style={{ fontSize: '14px', color: '#6B7280', transform: methodMatrixOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>▾</span>
                  </button>
                  {methodMatrixOpen && (
                  <div style={{ padding: '12px 16px', background: '#FFFFFF', borderTop: '1px solid #E5E7EB', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', color: '#1F2937', minWidth: '480px' }}>
                      <thead>
                        <tr style={{ background: '#F1F4F8' }}>
                          <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid #E5E7EB' }}>{t('settings:printer.methodGuide.matrixColEnv', 'Your environment')}</th>
                          <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid #E5E7EB' }}>{t('settings:printer.methodGuide.matrixColPick', 'Pick')}</th>
                          <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid #E5E7EB' }}>{t('settings:printer.methodGuide.matrixColWhy', 'Why')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.methodGuide.matrixRow1Env', 'Windows POS + LAN/Wi-Fi kitchen printer(s)')}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top', fontWeight: 600, color: '#635BFF' }}>{t('settings:printer.methodGuide.qzLabel')}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.methodGuide.matrixRow1Why', 'Silent + auto-print to LAN printers. One-time cert install per device.')}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.methodGuide.matrixRow2Env', 'Windows POS + USB cashier printer (small shop, no kitchen)')}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top', fontWeight: 600, color: '#635BFF' }}>{t('settings:printer.methodGuide.browserLabel')}{t('settings:printer.methodGuide.matrixOr', ' or ')}{t('settings:printer.methodGuide.qzLabel')}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.methodGuide.matrixRow2Why', 'Browser = simplest (OS default printer). QZ Tray if you need silent / auto-print.')}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.methodGuide.matrixRow3Env', 'Android tablet POS + USB OTG / Bluetooth printer')}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top', fontWeight: 600, color: '#635BFF' }}>{t('settings:printer.methodGuide.rawbtLabel')}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.methodGuide.matrixRow3Why', 'QZ Tray does not run on Android. RawBT is silent + router-independent — best for emergency.')}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.methodGuide.matrixRow4Env', 'iPad POS')}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top', fontWeight: 600, color: '#635BFF' }}>{t('settings:printer.methodGuide.browserLabel')}</td>
                          <td style={{ padding: '8px 10px', borderBottom: '1px solid #F1F4F8', verticalAlign: 'top' }}>{t('settings:printer.methodGuide.matrixRow4Why', 'AirPrint via OS print dialog. QZ Tray / RawBT not available on iOS.')}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 10px', verticalAlign: 'top' }}>{t('settings:printer.methodGuide.matrixRow5Env', 'Mixed shop (Windows counter + Android kitchen tablet)')}</td>
                          <td style={{ padding: '8px 10px', verticalAlign: 'top', fontWeight: 600, color: '#635BFF' }}>{t('settings:printer.methodGuide.matrixRow5Pick', 'Mix freely')}</td>
                          <td style={{ padding: '8px 10px', verticalAlign: 'top' }}>{t('settings:printer.methodGuide.matrixRow5Why', 'Each workstation / station card picks its own method. Windows → QZ Tray, Android → RawBT, anything else → Browser.')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  )}
                </div>

                {/* Method tabs */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', borderBottom: '1px solid #E5E7EB' }}>
                  {([
                    { key: 'browser', label: t('settings:printer.methodGuide.browserLabel'), sub: t('settings:printer.methodGuide.browserSub') },
                    { key: 'rawbt', label: t('settings:printer.methodGuide.rawbtLabel'), sub: t('settings:printer.methodGuide.rawbtSub') },
                    { key: 'qztray', label: t('settings:printer.methodGuide.qzLabel'), sub: t('settings:printer.methodGuide.qzSub') }
                  ] as const).map(tab => {
                    const active = printerGuideTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setPrinterGuideTab(tab.key)}
                        style={{
                          padding: '10px 16px', fontSize: '13px', fontWeight: 600,
                          border: 'none', borderBottom: active ? '2px solid #635BFF' : '2px solid transparent',
                          background: 'transparent', color: active ? '#635BFF' : '#4B5563',
                          cursor: 'pointer', marginBottom: '-1px',
                          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px'
                        }}
                      >
                        <span>{tab.label}</span>
                        <span style={{ fontSize: '11px', fontWeight: 400, color: '#6B7280' }}>{tab.sub}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Browser Print panel */}
                {printerGuideTab === 'browser' && (
                  <div>
                    <p style={{ fontSize: '13px', color: '#1F2937', lineHeight: 1.6, marginBottom: '12px' }}>
                      {t('settings:printer.methodGuide.browserDesc')}
                    </p>
                    <div style={{ padding: '12px 16px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '12px', color: '#4B5563', lineHeight: 1.6 }}>
                      <strong>{t('settings:printer.methodGuide.browserHowTitle')}</strong>
                      <ol style={{ margin: '6px 0 0 18px', padding: 0 }}>
                        <li>{t('settings:printer.methodGuide.browserStep1')}</li>
                        <li>{t('settings:printer.methodGuide.browserStep2')}</li>
                        <li>{t('settings:printer.methodGuide.browserStep3')}</li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* QZ Tray panel — clean 3-step setup: 1) Install  2) Check  3) Find printers */}
                {printerGuideTab === 'qztray' && (
                  <div>
                    <p style={{ fontSize: '13px', color: '#1F2937', lineHeight: 1.6, marginBottom: '16px' }}>
                      {t('settings:printer.methodGuide.qzDesc')}
                    </p>

                    {/* ───── STEP 1 — Install (one file installs QZ Tray + certificate) ───── */}
                    <div style={{ marginBottom: '12px', padding: '16px', background: '#FAFBFF', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#635BFF', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>1</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#312E81' }}>{t('settings:printer.methodGuide.qzStep1Title', 'Install the printing app')}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.6, margin: '0 0 10px 34px' }}>
                        {t('settings:printer.methodGuide.qzStep1Desc', 'Download this once and run it. It sets up everything in one go — the QZ Tray app and the trust certificate — so there are no extra steps and no permission pop-ups.')}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '34px' }}>
                        <button type="button"
                          onClick={() => window.open('/api/qz-tray/installer?os=windows', '_blank')}
                          style={{ padding: '10px 18px', fontSize: '13px', fontWeight: 700, border: 'none', borderRadius: '8px', background: '#635BFF', color: '#fff', cursor: 'pointer' }}
                        >{t('settings:printer.methodGuide.qzStep1WinBtn', 'Download Printer Setup (Windows)')}</button>
                        <button type="button"
                          onClick={() => window.open('/api/qz-tray/installer?os=mac', '_blank')}
                          style={{ padding: '10px 18px', fontSize: '13px', fontWeight: 600, border: '1px solid #635BFF', borderRadius: '8px', background: '#fff', color: '#635BFF', cursor: 'pointer' }}
                        >{t('settings:printer.methodGuide.qzStep1MacBtn', 'macOS')}</button>
                      </div>
                      <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '10px', marginLeft: '34px', lineHeight: 1.6 }}>
                        {t('settings:printer.methodGuide.qzStep1Note', 'Run it on every POS device that prints (each counter PC). Kitchen Display tablets do not need it — they only show orders.')}
                      </div>
                    </div>

                    {/* ───── STEP 2 — Check connection (running + trusted, no Allow prompt) ───── */}
                    <div style={{ marginBottom: '12px', padding: '16px', background: '#FAFBFF', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#635BFF', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>2</span>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#312E81' }}>{t('settings:printer.methodGuide.qzStep2Title', 'Check the connection')}</span>
                        </div>
                        <button type="button" disabled={qzDiagRunning}
                          onClick={async () => {
                            setQzDiagRunning(true);
                            setQzDiagSteps([]);
                            setQzDiagTicket(null);
                            try {
                              const result = await runQZDiagnostic();
                              setQzDiagSteps(result.steps);
                              setQzDiagSummary(result.summary);
                              if (result.summary?.connected) setQzTrayStatus('connected');
                              if (result.ok) {
                                try {
                                  const printers = await getQZTrayPrinters();
                                  setQzTrayPrinters(printers);
                                } catch { /* non-fatal */ }
                              }
                            } catch (e: any) {
                              setQzDiagSteps([{ key: 'crash', label: t('settings:printer.methodGuide.qzDiagCrashed', 'Diagnostic crashed'), status: 'failed', detail: String(e?.message || e) }]);
                            } finally {
                              setQzDiagRunning(false);
                            }
                          }}
                          style={{
                            padding: '10px 18px', fontSize: '13px', fontWeight: 700,
                            border: 'none', borderRadius: '8px', background: '#635BFF', color: '#fff',
                            cursor: qzDiagRunning ? 'wait' : 'pointer', opacity: qzDiagRunning ? 0.6 : 1,
                            minWidth: '160px', transition: 'opacity 0.15s'
                          }}
                        >{qzDiagRunning ? t('settings:printer.methodGuide.qzAutoTestRunning', 'Checking…') : t('settings:printer.methodGuide.qzStep2Btn', 'Check Connection')}</button>
                      </div>
                      <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.6, margin: '0 0 0 34px' }}>
                        {t('settings:printer.methodGuide.qzStep2Desc', 'Confirms QZ Tray is running and trusted (no "Allow this print?" pop-up). Run this after installing.')}
                      </p>

                      {qzDiagSteps.length > 0 && (
                        <div style={{ marginTop: '12px', marginLeft: '34px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {qzDiagSteps.map(s => (
                            <div key={s.key} style={{
                              padding: '10px 12px',
                              background: '#fff',
                              border: `1px solid ${s.status === 'ok' ? '#A7F3D0' : '#FCA5A5'}`,
                              borderRadius: '6px',
                              fontSize: '13px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: s.status === 'ok' ? '#059669' : '#DC2626', fontWeight: 700, minWidth: '14px', fontSize: '15px' }}>{s.status === 'ok' ? '✓' : '✗'}</span>
                                <span style={{ fontWeight: 600, color: '#1F2937' }}>{s.label}</span>
                              </div>
                              {s.detail && (
                                <div style={{ marginLeft: '22px', fontSize: '12px', color: '#6B7280', marginTop: '4px', lineHeight: 1.5 }}>
                                  {s.detail}
                                </div>
                              )}
                            </div>
                          ))}

                          {qzDiagSteps.every(s => s.status === 'ok') && (
                            <div style={{ padding: '10px 12px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '6px', fontSize: '13px', color: '#065F46', fontWeight: 600 }}>
                              {t('settings:printer.methodGuide.qzAutoTestAllOk', '✓ All good — receipts will print silently with no permission prompt.')}
                            </div>
                          )}

                          {qzDiagSteps.some(s => s.status === 'failed') && (
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginTop: '4px' }}>
                              <button type="button" disabled={qzDiagSending || !!qzDiagTicket}
                                onClick={async () => {
                                  setQzDiagSending(true);
                                  try {
                                    const r = await fetch('/api/qz-tray/diagnose', {
                                      method: 'POST',
                                      headers: { 'Authorization': `Bearer ${getAuthToken()}`, 'Content-Type': 'application/json' },
                                      body: JSON.stringify(qzDiagSummary || {})
                                    });
                                    const d = await r.json();
                                    setQzDiagTicket(d?.data?.ticketNumber || 'sent');
                                  } catch {
                                    setQzDiagTicket('error');
                                  } finally {
                                    setQzDiagSending(false);
                                  }
                                }}
                                style={{
                                  padding: '8px 14px', fontSize: '13px', fontWeight: 600,
                                  border: '1px solid #DC2626', borderRadius: '6px',
                                  background: qzDiagTicket ? '#FEF2F2' : '#fff',
                                  color: '#DC2626',
                                  cursor: qzDiagSending || qzDiagTicket ? 'default' : 'pointer',
                                  opacity: qzDiagSending ? 0.6 : 1
                                }}
                              >{qzDiagSending
                                  ? t('settings:printer.methodGuide.qzSendingDiag', 'Sending…')
                                  : qzDiagTicket === 'error'
                                    ? t('settings:printer.methodGuide.qzSendDiagRetry', 'Send failed — retry')
                                    : qzDiagTicket
                                      ? t('settings:printer.methodGuide.qzSendDiagSent', 'Sent — support will reply')
                                      : t('settings:printer.methodGuide.qzSendDiagBtn', 'Send diagnostics to support')}</button>
                              {qzDiagTicket && qzDiagTicket !== 'error' && (
                                <span style={{ fontSize: '12px', color: '#6B7280' }}>
                                  {t('settings:printer.methodGuide.qzTicketRef', 'Reference')}: <code style={{ background: '#F3F4F6', padding: '2px 6px', borderRadius: '4px' }}>{qzDiagTicket}</code>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* ───── STEP 3 — Find printers (detect this device's printers) ───── */}
                    <div style={{ padding: '16px', background: '#FAFBFF', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#635BFF', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>3</span>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#312E81' }}>{t('settings:printer.methodGuide.qzStep3Title', 'Find your printers')}</span>
                        </div>
                        <button type="button"
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
                            } catch { setQzTrayStatus('disconnected'); }
                          }}
                          style={{ padding: '10px 18px', fontSize: '13px', fontWeight: 700, border: 'none', borderRadius: '8px', background: '#635BFF', color: '#fff', cursor: 'pointer', minWidth: '160px' }}
                        >{qzTrayStatus === 'connecting' ? t('settings:printer.methodGuide.qzConnectingBtn') : t('settings:printer.methodGuide.qzStep3Btn', 'Find Printers')}</button>
                      </div>
                      <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.6, margin: '0 0 0 34px' }}>
                        {t('settings:printer.methodGuide.qzStep3Desc', 'Detects the printers connected to this device. Then assign each one in the printer cards below (bill printer, kitchen printer).')}
                      </p>

                      {/* Status line */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#1F2937', flexWrap: 'wrap', marginTop: '12px', marginLeft: '34px' }}>
                        <div style={{
                          width: '8px', height: '8px', borderRadius: '50%',
                          background: qzTrayStatus === 'connected' ? '#10B981' : qzTrayStatus === 'connecting' ? '#F59E0B' : '#9CA3AF'
                        }} />
                        <span style={{ fontWeight: 500 }}>
                          {qzTrayStatus === 'connected' ? t('settings:printer.methodGuide.qzStatusConnected') : qzTrayStatus === 'connecting' ? t('settings:printer.methodGuide.qzStatusConnecting') : t('settings:printer.methodGuide.qzStatusDisconnected')}
                        </span>
                        {qzTrayPrinters.length > 0 && (
                          <span style={{ color: '#4B5563' }}>
                            {t('settings:printer.methodGuide.qzDetectedPrinters')} <strong>{qzTrayPrinters.join(', ')}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* RawBT panel */}
                {printerGuideTab === 'rawbt' && (
                  <div>
                    <p style={{ fontSize: '13px', color: '#1F2937', lineHeight: 1.6, marginBottom: '12px' }}>
                      {t('settings:printer.methodGuide.rawbtDesc')}
                    </p>
                    <div style={{ padding: '12px 16px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '6px', fontSize: '12px', color: '#7C2D12', lineHeight: 1.6 }}>
                      <strong>{t('settings:printer.methodGuide.rawbtSetupTitle')}</strong>
                      <ol style={{ margin: '6px 0 0 18px', padding: 0 }}>
                        <li>{t('settings:printer.methodGuide.rawbtStep1')}</li>
                        <li>{t('settings:printer.methodGuide.rawbtStep2')}</li>
                        <li>{t('settings:printer.methodGuide.rawbtStep3')}</li>
                        <li>{t('settings:printer.methodGuide.rawbtStep4')}</li>
                        <li>{t('settings:printer.methodGuide.rawbtStep5')}</li>
                      </ol>
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '10px', fontStyle: 'italic' }}>
                      {t('settings:printer.methodGuide.rawbtNote')}
                    </p>
                  </div>
                )}

                {/* The legacy mode radio is intentionally removed — each workstation / kitchen / station card below picks its own method. */}
                {false && printerSettingsLoading && (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#4B5563' }}>
                    Loading printer settings...
                  </div>
                )}
                {false && (
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {[].map((opt: any) => (
                    <div key={opt.key}>{opt.label}</div>
                  ))}
                  </div>
                )}

                {/* (Removed) The old hardcoded QZ Tray status/cert block lived here. It
                    duplicated the connection status + cert download + setup steps and was
                    not translated (English/Korean leaked into every language). The clean,
                    i18n'd 3-step guide above (Install → Check → Find printers) is now the
                    single source. */}

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
                        <button type="button" onClick={() => setShowQzGuide(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#4B5563', padding: '4px' }}>&times;</button>
                      </div>

                      {/* What is QZ Tray */}
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '15px', color: '#1F2937', marginBottom: '8px' }}>{t('settings:settingsPage.whatIsQzTray')}</h3>
                        <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
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
                        <h3 style={{ fontSize: '15px', color: '#1F2937', marginBottom: '10px' }}>{t('settings:settingsPage.qzChooseScenario')}</h3>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                          {[
                            { key: 'migration' as const, label: t('settings:settingsPage.qzScenarioMigration') },
                            { key: 'fresh' as const, label: t('settings:settingsPage.qzScenarioFresh') },
                          ].map(opt => {
                            const active = qzScenario === opt.key;
                            return (
                              <button type="button"
                                key={opt.key}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setQzScenario(opt.key)}
                                style={{
                                  flex: 1, padding: '12px 16px', fontSize: '13px', fontWeight: 600,
                                  border: active ? '2px solid #635BFF' : '1px solid #6B7280', borderRadius: '8px',
                                  background: active ? '#EEF2FF' : '#fff', color: active ? '#635BFF' : '#1F2937',
                                  cursor: 'pointer', textAlign: 'left', lineHeight: 1.4
                                }}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                        <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                          {qzScenario === 'migration'
                            ? t('settings:settingsPage.qzScenarioMigrationDesc')
                            : t('settings:settingsPage.qzScenarioFreshDesc')}
                        </p>
                      </div>

                      {/* Step by step */}
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '15px', color: '#1F2937', marginBottom: '12px' }}>{t('settings:settingsPage.setupSteps')}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {(qzScenario === 'migration'
                            ? [
                                {
                                  title: t('settings:settingsPage.qzMigStep1Title'),
                                  desc: t('settings:settingsPage.qzMigStep1Desc'),
                                  action: (
                                    <>
                                      <button type="button" onClick={() => window.open('https://qz.io/download/', '_blank')} style={{ marginTop: '8px', padding: '6px 16px', fontSize: '13px', border: '1px solid #635BFF', borderRadius: '6px', background: '#635BFF', color: '#fff', cursor: 'pointer' }}>{t('settings:settingsPage.downloadQzTray')}</button>
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
                                  action: <button type="button" onClick={() => window.open('https://qz.io/download/', '_blank')} style={{ marginTop: '8px', padding: '6px 16px', fontSize: '13px', border: '1px solid #635BFF', borderRadius: '6px', background: '#635BFF', color: '#fff', cursor: 'pointer' }}>{t('settings:settingsPage.downloadQzTray')}</button>
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
                                <div style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.6' }}>{desc}</div>
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
                      <div style={{ marginBottom: '24px', padding: '16px', background: '#F1F4F8', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                        <h3 style={{ fontSize: '15px', color: '#1F2937', marginBottom: '10px', marginTop: 0 }}>{t('settings:settingsPage.howItWorks')}</h3>
                        <div style={{ fontSize: '13px', color: '#4B5563', fontFamily: 'monospace', lineHeight: '1.8', whiteSpace: 'pre', overflowX: 'auto' }}>
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
                        <p style={{ fontSize: '12px', color: '#6B7280', margin: '10px 0 0 0' }}>
                          {t('settings:settingsPage.qzDiagramFooter')}
                        </p>
                      </div>

                      {/* Troubleshooting */}
                      <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '15px', color: '#1F2937', marginBottom: '8px' }}>{t('settings:settingsPage.troubleshooting')}</h3>
                        <div style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.8' }}>
                          <strong>{t('settings:settingsPage.qzTroubleNotConnectedLabel')}</strong> {t('settings:settingsPage.qzTroubleNotConnectedDesc')}<br />
                          <strong>{t('settings:settingsPage.qzTroubleTestPrintLabel')}</strong> {t('settings:settingsPage.qzTroubleTestPrintDesc')}<br />
                          <strong>{t('settings:settingsPage.qzTroubleNoPrintersLabel')}</strong> {t('settings:settingsPage.qzTroubleNoPrintersDesc')}
                        </div>
                      </div>

                      <button type="button"
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
                {/* Workstations Section — multi-POS bill printers (replaces single Bill Printer card).
                    2026-05-27: removed gridColumn:'1/-1' so this sits side-by-side with the
                    Kitchen Printer card on wide screens (2-column grid). Below 768px the parent
                    SettingsGrid collapses to a single column automatically. */}
                <SettingsCard>
                  <CardTitle>{t('settings:printer.workstations.title')}</CardTitle>
                  <p style={{ color: '#4B5563', marginBottom: '16px', fontSize: '14px' }}>
                    {t('settings:printer.workstations.desc')}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(printerSettings.workstations || []).map((ws, wsIdx) => {
                      const wsBillMethod = (ws.billPrinter?.method || 'browser') as 'browser' | 'qztray' | 'rawbt';
                      const wsBillAddr = ws.billPrinter?.address || '';
                      const isActiveWs = activeWorkstationId === ws.id;
                      const canDelete = (printerSettings.workstations || []).length > 1;
                      const updateWs = (patch: any) => {
                        setPrinterSettings(prev => ({
                          ...prev,
                          workstations: (prev.workstations || []).map((w: any) => w.id === ws.id ? { ...w, ...patch, billPrinter: { ...w.billPrinter, ...(patch.billPrinter || {}) } } : w)
                        }));
                      };
                      const deleteWs = async () => {
                        if (!window.confirm(t('settings:printer.workstations.deleteConfirm', { name: ws.name }))) return;
                        // Compute new state and persist it atomically (handleSave's closure is stale here)
                        const newPS = {
                          ...printerSettings,
                          workstations: (printerSettings.workstations || []).filter((w: any) => w.id !== ws.id)
                        };
                        setPrinterSettings(newPS);
                        if (user?.restaurantId) {
                          try {
                            const token = getAuthToken();
                            const r = await fetch(`/api/restaurants/${user.restaurantId}`, {
                              method: 'PUT',
                              headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                              body: JSON.stringify({ printer_settings: newPS })
                            });
                            const d = await r.json();
                            setSaveStatus({ type: d.success ? 'success' : 'error', message: d.success ? 'Workstation deleted' : 'Delete failed' });
                          } catch { setSaveStatus({ type: 'error', message: 'Delete failed' }); }
                          setTimeout(() => setSaveStatus(null), 2000);
                        }
                      };
                      return (
                        <div key={ws.id} style={{ padding: '16px 20px', background: isActiveWs ? '#F5F3FF' : '#FFFFFF', border: isActiveWs ? '2px solid #635BFF' : '1px solid #C7CED6', borderRadius: '10px' }}>
                          {/* Header row: name input + active badge + action buttons.
                              Input gets flex: 1 1 100% so it always claims its own row first,
                              then buttons sit below in their own flex-shrink:0 row. This avoids
                              any overflow in the 2-column SettingsGrid where each card can be
                              ~440px wide on 10-inch tablets. */}
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', rowGap: '10px' }}>
                            <AutoSaveField onSave={handleSave} style={{ flex: '1 1 100%', minWidth: 0 }}>
                            <input
                              type="text"
                              value={ws.name || ''}
                              onChange={(e) => updateWs({ name: e.target.value })}
                              placeholder={t('settings:printer.workstations.nameInputPlaceholder')}
                              style={{ width: '100%', padding: '8px 12px', border: '1px solid #6B7280', borderRadius: '6px', fontSize: '14px', fontWeight: 600, boxSizing: 'border-box' }}
                            />
                            </AutoSaveField>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
                              {isActiveWs && (
                                <span style={{ padding: '4px 10px', fontSize: '11px', fontWeight: 700, color: '#635BFF', background: '#EDE9FE', border: '1px solid #C4B5FD', borderRadius: '12px', letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{t('settings:printer.workstations.thisDevice')}</span>
                              )}
                              {!isActiveWs && (
                                <button type="button"
                                  onClick={() => setActiveWorkstationId(ws.id)}
                                  style={{ padding: '6px 12px', fontSize: '12px', border: '1px solid #635BFF', borderRadius: '6px', background: '#fff', color: '#635BFF', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}
                                >{t('settings:printer.workstations.useOnDevice')}</button>
                              )}
                              <button type="button"
                                onClick={deleteWs}
                                disabled={!canDelete}
                                title={canDelete ? t('settings:printer.workstations.deleteConfirm', { name: ws.name }) : t('settings:printer.workstations.atLeastOneRequired')}
                                style={{ padding: '6px 10px', fontSize: '12px', border: '1px solid #FCA5A5', borderRadius: '6px', background: '#fff', color: '#DC2626', cursor: canDelete ? 'pointer' : 'not-allowed', opacity: canDelete ? 1 : 0.4, whiteSpace: 'nowrap' }}
                              >{t('settings:printer.workstations.deleteBtn')}</button>
                            </div>
                          </div>

                          {/* Enabled toggle */}
                          <AutoSaveField onSave={handleSave} type="toggle">
                          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={ws.billPrinter?.enabled !== false}
                              onChange={(e) => updateWs({ billPrinter: { enabled: e.target.checked } })}
                              style={{ width: '16px', height: '16px', accentColor: '#635BFF' }}
                            />
                            <span style={{ fontSize: '13px', color: '#1F2937', fontWeight: 500 }}>{t('settings:printer.workstations.billEnabled')}</span>
                          </label>
                          </AutoSaveField>

                          {ws.billPrinter?.enabled !== false && (
                            <>
                              {/* Method select */}
                              <div style={{ marginBottom: '10px' }}>
                                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#1F2937', marginBottom: '4px' }}>Connection Method</label>
                                <AutoSaveField onSave={handleSave} type="select">
                                <select
                                  value={wsBillMethod}
                                  onChange={(e) => updateWs({ billPrinter: { method: e.target.value as any } })}
                                  style={{ width: '100%', padding: '7px 10px', border: '1px solid #6B7280', borderRadius: '6px', fontSize: '13px', background: '#fff' }}
                                >
                                  <option value="browser">USB / Browser print (OS default printer)</option>
                                  <option value="qztray">Network / Local (via QZ Tray)</option>
                                  <option value="rawbt">Android tablet (via RawBT)</option>
                                </select>
                                </AutoSaveField>
                              </div>

                              {/* QZ Tray: address + detected dropdown + Test */}
                              {wsBillMethod === 'qztray' && (
                                <div>
                                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '6px', rowGap: '8px', alignItems: 'stretch' }}>
                                    <AutoSaveField onSave={handleSave} style={{ flex: '1 1 240px', minWidth: 0 }}>
                                    <input
                                      type="text"
                                      value={wsBillAddr}
                                      onChange={(e) => updateWs({ billPrinter: { address: e.target.value } })}
                                      placeholder="Leave blank = OS default printer · or 192.168.1.100:9100"
                                      style={{ width: '100%', padding: '7px 10px', border: '1px solid #6B7280', borderRadius: '6px', fontSize: '13px', fontFamily: 'monospace', boxSizing: 'border-box' }}
                                    />
                                    </AutoSaveField>
                                    <button type="button"
                                      onClick={async () => {
                                        const addr = wsBillAddr;
                                        // Empty address = use OS default on this device
                                        const ok = await qzTrayTestPrint(addr || (await (window as any).qz?.printers?.getDefault?.() || ''));
                                        setSaveStatus({ type: ok ? 'success' : 'error', message: ok ? `Test print sent to ${ws.name}!` : `Failed to send test print to ${ws.name}.` });
                                        setTimeout(() => setSaveStatus(null), 3000);
                                      }}
                                      style={{ padding: '7px 12px', fontSize: '12px', border: '1px solid #6B7280', borderRadius: '6px', background: '#fff', color: '#1F2937', cursor: 'pointer', whiteSpace: 'nowrap' }}
                                    >{t('settings:printer.stations.testBtn')}</button>
                                  </div>
                                  <div style={{ fontSize: '11px', color: '#4B5563', marginBottom: '6px' }}>
                                    Tip: leave blank so each POS device uses its own OS default printer. Or enter IP:Port for a network printer.
                                  </div>
                                  {qzTrayPrinters.length > 0 && (
                                    <div>
                                      <label style={{ fontSize: '11px', color: '#4B5563', marginBottom: '3px', display: 'block' }}>Or pick a detected printer (this device):</label>
                                      <AutoSaveField onSave={handleSave} type="select">
                                      <select
                                        value={wsBillAddr}
                                        onChange={(e) => updateWs({ billPrinter: { address: e.target.value } })}
                                        style={{ width: '100%', padding: '6px 10px', border: '1px solid #6B7280', borderRadius: '6px', fontSize: '12px' }}
                                      >
                                        <option value="">-- Use OS default --</option>
                                        {qzTrayPrinters.map(p => (
                                          <option key={p} value={p}>{p}</option>
                                        ))}
                                      </select>
                                      </AutoSaveField>
                                    </div>
                                  )}
                                </div>
                              )}

                              {wsBillMethod === 'browser' && (
                                <div style={{ fontSize: '11px', color: '#4B5563' }}>Uses the OS default printer on whichever device is bound to this workstation.</div>
                              )}
                              {wsBillMethod === 'rawbt' && (
                                <div style={{ fontSize: '11px', color: '#4B5563' }}>Prints to the default printer configured inside RawBT on this Android device.</div>
                              )}

                              {/* AutoPrint toggle */}
                              <AutoSaveField onSave={handleSave} type="toggle">
                              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px', cursor: 'pointer' }}>
                                <input
                                  type="checkbox"
                                  checked={!!ws.billPrinter?.autoPrint}
                                  onChange={(e) => updateWs({ billPrinter: { autoPrint: e.target.checked } })}
                                  style={{ width: '16px', height: '16px', accentColor: '#635BFF' }}
                                />
                                <span style={{ fontSize: '13px', color: '#1F2937' }}>{t('settings:printer.workstations.autoPrintAfterPayment')}</span>
                              </label>
                              </AutoSaveField>

                              {/* Auto-print sub-controls: copies + cash drawer. Shop-wide (receiptSettings),
                                  but shown here so cashier finds them right next to the trigger toggle. */}
                              {ws.billPrinter?.autoPrint && (
                                <div style={{ marginTop: '10px', marginLeft: '26px', padding: '10px 12px', background: '#F8F7FF', border: '1px solid #E5E3FF', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '13px', color: '#1F2937' }}>{t('settings:printer.workstations.copiesAfterPayment')}</span>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                      {[1, 2, 3].map(n => (
                                        <AutoSaveField key={n} onSave={handleSave} type="toggle">
                                        <button type="button"
                                          onClick={() => setReceiptSettings(prev => ({ ...prev, copiesAfterPayment: n }))}
                                          style={{
                                            minWidth: '36px', padding: '6px 10px', fontSize: '13px', fontWeight: 600,
                                            border: `1px solid ${receiptSettings.copiesAfterPayment === n ? '#635BFF' : '#C7CED6'}`,
                                            background: receiptSettings.copiesAfterPayment === n ? '#635BFF' : '#fff',
                                            color: receiptSettings.copiesAfterPayment === n ? '#fff' : '#1F2937',
                                            borderRadius: '6px', cursor: 'pointer'
                                          }}
                                        >{n}</button>
                                        </AutoSaveField>
                                      ))}
                                    </div>
                                    <span style={{ fontSize: '11px', color: '#6B7280' }}>{t('settings:printer.workstations.copiesHint')}</span>
                                  </div>
                                  <AutoSaveField onSave={handleSave} type="toggle">
                                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input
                                      type="checkbox"
                                      checked={receiptSettings.autoOpenDrawer !== false}
                                      onChange={(e) => setReceiptSettings(prev => ({ ...prev, autoOpenDrawer: e.target.checked }))}
                                      style={{ width: '16px', height: '16px', accentColor: '#635BFF' }}
                                    />
                                    <span style={{ fontSize: '13px', color: '#1F2937' }}>{t('settings:printer.workstations.autoOpenDrawer', 'Auto-open cash drawer on cash payment')}</span>
                                  </label>
                                  </AutoSaveField>
                                  <div style={{ fontSize: '11px', color: '#9CA3AF', fontStyle: 'italic' }}>{t('settings:printer.workstations.shopWideHint')}</div>
                                </div>
                              )}

                              {/* Full-order (consolidated) ticket to THIS POS. 2026-06-09 (Irene):
                                  one toggle per POS row — replaces the separate "Consolidated Order
                                  Ticket" card AND the redundant mirror-to-counter checkbox, and scales
                                  to any number of POS (add more with "+ Add Workstation"). */}
                              <AutoSaveField onSave={handleSave} type="toggle">
                              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '12px', cursor: 'pointer' }}>
                                <input
                                  type="checkbox"
                                  checked={!!(ws as any).consolidatedTicket}
                                  onChange={(e) => updateWs({ consolidatedTicket: e.target.checked })}
                                  style={{ width: '16px', height: '16px', accentColor: '#635BFF', marginTop: '2px' }}
                                />
                                <span style={{ fontSize: '13px', color: '#1F2937' }}>
                                  {t('settings:printer.workstations.consolidatedTicket', 'Print full order ticket here')}
                                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 400, color: '#6B7280', marginTop: '2px' }}>
                                    {t('settings:printer.workstations.consolidatedTicketHint', 'Print the whole order on one ticket to this POS, alongside the per-station kitchen tickets — it does not replace them.')}
                                  </span>
                                </span>
                              </label>
                              </AutoSaveField>

                              {/* 2026-06-12 (Irene): 통합티켓 스테이션 범위 — 주방 쪽 워크스테이션은
                                  바 메뉴를 뺀(=선택한 주방 스테이션 메뉴만 모은) 통합티켓이 필요.
                                  미선택(전체) = 기존과 동일한 전체 주문 티켓. */}
                              {!!(ws as any).consolidatedTicket && kitchenStations.length > 0 && (
                                <div style={{ marginTop: '8px', marginLeft: '26px' }}>
                                  <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '6px' }}>
                                    {t('settings:printer.workstations.consolidatedStations', 'Ticket scope — kitchen stations')}
                                    <span style={{ display: 'block', fontSize: '11px', color: '#9CA3AF', marginTop: '1px' }}>
                                      {t('settings:printer.workstations.consolidatedStationsHint', 'Select stations to print only their items on this ticket. Nothing selected = full order.')}
                                    </span>
                                  </div>
                                  <AutoSaveField onSave={handleSave} type="toggle">
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {(() => {
                                      const sel: number[] = Array.isArray((ws as any).consolidatedStations) ? (ws as any).consolidatedStations : [];
                                      const allOn = sel.length === 0;
                                      const chip = (active: boolean): React.CSSProperties => ({
                                        padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 600,
                                        cursor: 'pointer', border: `1px solid ${active ? '#C7D2FE' : '#E5E7EB'}`,
                                        background: active ? '#F0EFFF' : 'white', color: active ? '#4F46E5' : '#6B7280'
                                      });
                                      return (
                                        <>
                                          <button type="button" style={chip(allOn)}
                                            onClick={() => updateWs({ consolidatedStations: [] })}>
                                            {t('settings:printer.workstations.allStations', 'Full order')}
                                          </button>
                                          {kitchenStations.map((st: any) => {
                                            const on = sel.includes(Number(st.id));
                                            return (
                                              <button key={st.id} type="button" style={chip(on)}
                                                onClick={() => {
                                                  const next = on ? sel.filter(id => id !== Number(st.id)) : [...sel, Number(st.id)];
                                                  updateWs({ consolidatedStations: next });
                                                }}>
                                                {st.name}
                                              </button>
                                            );
                                          })}
                                        </>
                                      );
                                    })()}
                                  </div>
                                  </AutoSaveField>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* + Add Workstation — persist atomically with the new state */}
                  <button type="button"
                    onClick={async () => {
                      const newId = 'ws_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
                      const newName = `POS ${(printerSettings.workstations || []).length + 1}`;
                      const newPS = {
                        ...printerSettings,
                        workstations: [...(printerSettings.workstations || []), { id: newId, name: newName, billPrinter: { enabled: true, name: '', autoPrint: false, method: 'browser', address: '' } }]
                      };
                      setPrinterSettings(newPS);
                      if (user?.restaurantId) {
                        setSaveStatus({ type: 'success', message: 'Adding workstation…' });
                        try {
                          const token = getAuthToken();
                          const r = await fetch(`/api/restaurants/${user.restaurantId}`, {
                            method: 'PUT',
                            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({ printer_settings: newPS })
                          });
                          const d = await r.json();
                          setSaveStatus({ type: d.success ? 'success' : 'error', message: d.success ? 'Workstation added' : 'Add failed' });
                        } catch { setSaveStatus({ type: 'error', message: 'Add failed' }); }
                        setTimeout(() => setSaveStatus(null), 2000);
                      }
                    }}
                    style={{ marginTop: '12px', padding: '10px 16px', fontSize: '13px', border: '1px dashed #635BFF', borderRadius: '8px', background: '#F5F3FF', color: '#635BFF', cursor: 'pointer', fontWeight: 600, width: '100%' }}
                  >{t('settings:printer.workstations.addBtn')}</button>
                </SettingsCard>

                {/* Kitchen Printer Card — Station 유무 관계없이 동일 */}
                <SettingsCard>
                  <CardTitle>{t('settings:settingsPage.kitchenPrinter')}</CardTitle>
                  <p style={{ color: '#4B5563', marginBottom: '20px', fontSize: '14px' }}>
                    {t('settings:printer.kitchenPrinterDesc')}
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
                      {/* Per-printer method selector (default for kitchen + when no stations).
                          Each station can override below. */}
                      {kitchenStations.length === 0 && (
                        <div style={{ marginTop: '16px' }}>
                          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1F2937', marginBottom: '6px' }}>
                            Connection Method
                          </label>
                          <AutoSaveField onSave={handleSave} type="select">
                          <select
                            value={printerSettings.kitchenPrinter.method || 'qztray'}
                            onChange={(e) => setPrinterSettings(prev => ({
                              ...prev,
                              kitchenPrinter: { ...prev.kitchenPrinter, method: e.target.value as any }
                            }))}
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #6B7280', borderRadius: '6px', fontSize: '14px', background: '#fff' }}
                          >
                            <option value="browser">USB / Browser print (OS default printer)</option>
                            <option value="qztray">Network / Local (via QZ Tray)</option>
                            <option value="rawbt">Android tablet (via RawBT)</option>
                          </select>
                          </AutoSaveField>
                        </div>
                      )}

                      <div style={{ marginTop: '12px', padding: '12px 16px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', fontSize: '13px', color: '#075985', lineHeight: '1.5' }}>
                        {kitchenStations.length > 0 ? (
                          <>{t('settings:printer.stations.eachStationOwnMethod')}</>
                        ) : printerSettings.kitchenPrinter.method === 'qztray' ? (
                          <>{t('settings:settingsPage.sendKitchenTicketsDirectlyToANetworkPrinterViaQzTray')}<br />{t('settings:settingsPage.enterTheKitchenPrintersNetworkIpAddressBelow')}</>
                        ) : printerSettings.kitchenPrinter.method === 'browser' ? (
                          <>{t('settings:settingsPage.opensBrowserPrintDialogForKitchenOrderTickets')}</>
                        ) : (
                          <>
                            Use a separate device for kitchen printing:<br />
                            1. Open Kitchen Display on a kitchen tablet<br />
                            2. Set RawBT default printer to your kitchen printer on that device<br />
                            3. Order tickets will auto-print when new orders arrive
                          </>
                        )}
                      </div>

                      {(kitchenStations.length > 0 || printerSettings.kitchenPrinter.method === 'qztray') && (
                        <div style={{ marginTop: '16px' }}>
                          {kitchenStations.length > 0 ? (
                            /* Station별 프린터: 각 station 에 method select + IP/dropdown + Test */
                            <>
                              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1F2937', marginBottom: '10px' }}>
                                {t('settings:printer.stations.title')}
                              </label>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {kitchenStations.map((station: any) => {
                                  const sp = printerSettings.kitchenStationPrinters?.[station.id] || { name: '', autoPrint: true };
                                  const spMethod = (sp.method || 'qztray') as 'browser' | 'qztray' | 'rawbt';
                                  return (
                                    <div key={station.id} style={{ padding: '12px 16px', background: '#F1F4F8', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1F2937', marginBottom: '8px' }}>
                                        {station.name}
                                      </div>

                                      {/* Method select */}
                                      <div style={{ marginBottom: '8px' }}>
                                        <label style={{ display: 'block', fontSize: '12px', color: '#4B5563', marginBottom: '4px' }}>Connection Method</label>
                                        <AutoSaveField onSave={handleSave} type="select">
                                        <select
                                          value={spMethod}
                                          onChange={(e) => setPrinterSettings(prev => ({
                                            ...prev,
                                            kitchenStationPrinters: {
                                              ...prev.kitchenStationPrinters,
                                              [station.id]: {
                                                ...(prev.kitchenStationPrinters?.[station.id] || { name: '', autoPrint: true }),
                                                method: e.target.value as any,
                                                stationName: station.name
                                              } as any
                                            }
                                          }))}
                                          style={{ width: '100%', padding: '6px 10px', border: '1px solid #6B7280', borderRadius: '6px', fontSize: '13px', background: '#fff' }}
                                        >
                                          <option value="browser">USB / Browser print (OS default)</option>
                                          <option value="qztray">Network / Local (via QZ Tray)</option>
                                          <option value="rawbt">Android tablet (via RawBT)</option>
                                        </select>
                                        </AutoSaveField>
                                      </div>

                                      {/* QZ Tray: IP input + detected printer dropdown + Test */}
                                      {spMethod === 'qztray' && (
                                        <>
                                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            <AutoSaveField onSave={handleSave} style={{ flex: '1 1 160px', minWidth: 0 }}>
                                            <input
                                              type="text"
                                              value={sp.address || ''}
                                              onChange={(e) => setPrinterSettings(prev => ({
                                                ...prev,
                                                kitchenStationPrinters: {
                                                  ...prev.kitchenStationPrinters,
                                                  [station.id]: {
                                                    ...(prev.kitchenStationPrinters?.[station.id] || { name: '', autoPrint: true }),
                                                    address: e.target.value,
                                                    stationName: station.name
                                                  } as any
                                                }
                                              }))}
                                              placeholder={t('settings:printer.stations.addressPlaceholder')}
                                              style={{
                                                width: '100%', padding: '7px 10px', border: '1px solid #6B7280', borderRadius: '6px',
                                                fontSize: '13px', fontFamily: 'monospace', boxSizing: 'border-box'
                                              }}
                                            />
                                            </AutoSaveField>
                                            <button type="button"
                                              onClick={async () => {
                                                const addr = sp.address;
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
                                                padding: '7px 12px', fontSize: '12px', border: '1px solid #6B7280', borderRadius: '6px',
                                                background: '#fff', color: '#1F2937', cursor: 'pointer', whiteSpace: 'nowrap'
                                              }}
                                            >
                                              Test
                                            </button>
                                          </div>
                                          {qzTrayPrinters.length > 0 && (
                                            <div style={{ marginTop: '6px' }}>
                                              <label style={{ fontSize: '11px', color: '#4B5563', marginBottom: '3px', display: 'block' }}>Or pick a detected printer:</label>
                                              <AutoSaveField onSave={handleSave} type="select">
                                              <select
                                                value={sp.address || ''}
                                                onChange={(e) => setPrinterSettings(prev => ({
                                                  ...prev,
                                                  kitchenStationPrinters: {
                                                    ...prev.kitchenStationPrinters,
                                                    [station.id]: {
                                                      ...(prev.kitchenStationPrinters?.[station.id] || { name: '', autoPrint: true }),
                                                      address: e.target.value,
                                                      stationName: station.name
                                                    } as any
                                                  }
                                                }))}
                                                style={{ width: '100%', padding: '6px 10px', border: '1px solid #6B7280', borderRadius: '6px', fontSize: '12px' }}
                                              >
                                                <option value="">-- Select printer --</option>
                                                {qzTrayPrinters.map(p => (
                                                  <option key={p} value={p}>{p}</option>
                                                ))}
                                              </select>
                                              </AutoSaveField>
                                            </div>
                                          )}
                                        </>
                                      )}

                                      {spMethod === 'browser' && (
                                        <div style={{ fontSize: '11px', color: '#6B7280' }}>
                                          Browser print uses the OS default printer. Set this device's default printer to {station.name}'s printer.
                                        </div>
                                      )}
                                      {spMethod === 'rawbt' && (
                                        <div style={{ fontSize: '11px', color: '#6B7280' }}>
                                          RawBT prints to the default printer configured inside the RawBT Android app.
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '6px' }}>
                                {t('settings:printer.stations.routingHint')}
                              </div>
                            </>
                          ) : (
                            /* Station 없을 때 단일 IP */
                            <>
                              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#1F2937', marginBottom: '6px' }}>
                                Printer Address
                              </label>
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <AutoSaveField onSave={handleSave} style={{ flex: '1 1 180px', minWidth: 0 }}>
                                <input
                                  type="text"
                                  value={printerSettings.kitchenPrinter.address || ''}
                                  onChange={(e) => setPrinterSettings(prev => ({
                                    ...prev,
                                    kitchenPrinter: { ...prev.kitchenPrinter, address: e.target.value }
                                  }))}
                                  placeholder="192.168.1.101:9100"
                                  style={{
                                    width: '100%', padding: '8px 12px', border: '1px solid #6B7280', borderRadius: '6px',
                                    fontSize: '14px', fontFamily: 'monospace', boxSizing: 'border-box'
                                  }}
                                />
                                </AutoSaveField>
                                <button type="button"
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
                                    padding: '8px 14px', fontSize: '13px', border: '1px solid #6B7280', borderRadius: '6px',
                                    background: '#fff', color: '#1F2937', cursor: 'pointer', whiteSpace: 'nowrap'
                                  }}
                                >
                                  Test Print
                                </button>
                              </div>
                              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
                                IP:Port (e.g. 192.168.1.101:9100) or OS printer name
                              </div>
                            </>
                          )}
                          {qzTrayPrinters.length > 0 && kitchenStations.length === 0 && (
                            <div style={{ marginTop: '8px' }}>
                              <label style={{ fontSize: '12px', color: '#4B5563', marginBottom: '4px', display: 'block' }}>Or select detected printer:</label>
                              <AutoSaveField onSave={handleSave} type="select">
                              <select
                                value={printerSettings.kitchenPrinter.address || ''}
                                onChange={(e) => setPrinterSettings(prev => ({
                                  ...prev,
                                  kitchenPrinter: { ...prev.kitchenPrinter, address: e.target.value }
                                }))}
                                style={{ width: '100%', padding: '6px 10px', border: '1px solid #6B7280', borderRadius: '6px', fontSize: '13px' }}
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
                            // 2026-06-04 (Irene, docs/PRINT_RULES_MATRIX § 8.7): backlog cutoff.
                            // Record the EXACT moment autoPrint turns ON so the poller only
                            // auto-prints orders created from this point forward — switching
                            // ON must NOT flush the backlog that piled up while it was OFF.
                            // Cleared on OFF so the next ON starts a fresh cutoff.
                            try {
                              if (e.target.checked) localStorage.setItem('kitchenAutoPrintEnabledAt', String(Date.now()));
                              else localStorage.removeItem('kitchenAutoPrintEnabledAt');
                            } catch { /* localStorage may be blocked */ }
                            setPrinterSettings(prev => ({
                              ...prev,
                              kitchenPrinter: { ...prev.kitchenPrinter, autoPrint: e.target.checked }
                            }));
                            kitchenPrinterAutoPrintRef.current?.triggerSave();
                          }}
                          style={{ width: '18px', height: '18px', accentColor: '#635BFF' }}
                        />
                        <span style={{ fontSize: '14px', color: '#1F2937' }}>{t('settings:settingsPage.autoprintOnNewOrder')}</span>
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
                  <p style={{ color: '#4B5563', marginBottom: '20px', fontSize: '14px' }}>
                    {t('settings:printer.kitchenTicketOptionsDesc')}
                  </p>

                  <Toggle>
                    <div style={{ flex: 1 }}>
                      <ToggleLabel style={{ marginBottom: '4px' }}>{t('settings:settingsPage.printSeparateTicketForEachItem')}</ToggleLabel>
                      <p style={{ fontSize: '12px', color: '#4B5563', margin: 0 }}>
                        {t('settings:printer.printPerItemDesc')}
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

                  {/* 2026-06-09 (Irene): the "mirror full order to counter" checkbox was removed —
                      it duplicated the consolidated ticket. Full-order printing is now a per-POS
                      toggle in the Workstations section ("Print full order ticket here"). */}
                  {/* 2026-06-02 확정 스펙 v2: 취소 티켓은 설정 토글 없이 항상 발송
                      (취소·이동은 주방이 무조건 알아야 함). printCancellationTicket 설정 삭제. */}
                </SettingsCard>
              )}

              {/* Receipt Customization */}
              <SettingsCard style={{ marginTop: '24px' }}>
                <CardTitle>{t('settings:settingsPage.receiptCustomization')}</CardTitle>
                <p style={{ color: '#4B5563', marginBottom: '20px', fontSize: '14px' }}>
                  {t('settings:receipt.description')}
                </p>

                <div className="receipt-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0' }}>
                  {/* Left column: Logo + Footer + Membership */}
                  <div className="receipt-col-left" style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '24px' }}>
                    {/* Receipt Logo */}
                    <AutoSaveField ref={receiptLogoRef} onSave={handleSave} type="image">
                    <ImageUploadDropzone
                      value={receiptSettings.receiptLogo}
                      onChange={(value) => { setReceiptSettings(prev => ({ ...prev, receiptLogo: value })); receiptLogoRef.current?.triggerSave(); }}
                      label={t('settings:printer.receiptLogo')}
                      helpText={t('settings:printer.receiptLogoHint')}
                    />
                    </AutoSaveField>

                    {/* Membership Info */}
                    <Toggle>
                      <div style={{ flex: 1 }}>
                        <ToggleLabel style={{ marginBottom: '4px' }}>{t('settings:settingsPage.membershipInfoOnReceipt')}</ToggleLabel>
                        <p style={{ fontSize: '12px', color: '#4B5563', margin: 0 }}>
                          {t('settings:receipt.membershipHelpText')}
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
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#4B5563', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{t('settings:settingsPage.footerMessage')}</label>
                      <AutoSaveField onSave={handleSave}>
                      <input type="text" value={receiptSettings.footerMessage} onChange={(e) => setReceiptSettings(prev => ({ ...prev, footerMessage: e.target.value }))} placeholder={t('settings:receipt.footerMessagePlaceholder')} maxLength={100} style={{ width: '100%', padding: '8px 12px', border: '1px solid #C7CED6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                      </AutoSaveField>
                    </div>
                  </div>

                  {/* Vertical divider — hidden on mobile */}
                  <div className="receipt-divider" style={{ width: '1px', background: '#C7CED6', margin: '0' }} />

                  {/* Right column: Custom QR / Promotion */}
                  <div className="receipt-col-right" style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '24px' }}>
                    <AutoSaveField ref={customQrImageRef} onSave={handleSave} type="image">
                    <ImageUploadDropzone
                      value={receiptSettings.customQrImage}
                      onChange={(value) => { setReceiptSettings(prev => ({ ...prev, customQrImage: value })); customQrImageRef.current?.triggerSave(); }}
                      label={t('settings:receipt.customQrLabel')}
                      helpText={t('settings:receipt.customQrHelpText')}
                    />
                    </AutoSaveField>

                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#4B5563', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{t('settings:settingsPage.guideText')}</label>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <AutoSaveField onSave={handleSave}>
                        <input type="text" value={receiptSettings.customQrText} onChange={(e) => setReceiptSettings(prev => ({ ...prev, customQrText: e.target.value }))} placeholder={t('settings:receipt.customQrTextPlaceholder')} maxLength={100} style={{ flex: 1, padding: '8px 12px', border: '1px solid #C7CED6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                        </AutoSaveField>
                        <AutoSaveField ref={qrPositionRef} onSave={handleSave} type="toggle">
                        <div style={{ display: 'flex', gap: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '8px 10px', borderRadius: '6px', border: `1px solid ${receiptSettings.customQrPosition === 'front' ? '#635BFF' : '#C7CED6'}`, background: receiptSettings.customQrPosition === 'front' ? '#F8F7FF' : 'white', fontSize: '12px', whiteSpace: 'nowrap' }}>
                          <input type="radio" name="customQrPosition" checked={receiptSettings.customQrPosition === 'front'} onChange={() => { setReceiptSettings(prev => ({ ...prev, customQrPosition: 'front' })); qrPositionRef.current?.triggerSave(); }} style={{ margin: 0 }} />
                          <span style={{ fontWeight: 500, color: '#0A2540' }}>{t('settings:settingsPage.beforeQr')}</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '8px 10px', borderRadius: '6px', border: `1px solid ${receiptSettings.customQrPosition === 'back' ? '#635BFF' : '#C7CED6'}`, background: receiptSettings.customQrPosition === 'back' ? '#F8F7FF' : 'white', fontSize: '12px', whiteSpace: 'nowrap' }}>
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
                    .receipt-col-left { padding-right: 0 !important; padding-bottom: 20px !important; border-bottom: 1px solid #C7CED6 !important; }
                    .receipt-col-right { padding-left: 0 !important; padding-top: 20px !important; }
                  }
                `}</style>
              </SettingsCard>

              {/* Auto-print preview modal — opened from the button at the top of
                  the printer tab. Shows the actual bucketing of last orders by
                  station + warnings for missing printer configs. Preview only. */}
              {autoPrintPreviewOpen && user?.restaurantId && (
                <AutoPrintPreviewModal
                  restaurantId={user.restaurantId}
                  onClose={() => setAutoPrintPreviewOpen(false)}
                />
              )}

              {/* Printer troubleshooting modal — opened from Emergency card.
                  Covers the most common pain points reported on the floor. */}
              {showPrinterTroubleshoot && (
                <div
                  onClick={(e) => { if (e.target === e.currentTarget) setShowPrinterTroubleshoot(false); }}
                  style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}
                >
                  <div style={{ background: '#fff', borderRadius: '12px', maxWidth: '640px', width: '100%', padding: '28px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <h2 style={{ margin: 0, fontSize: '18px', color: '#1F2937' }}>
                        {t('settings:printer.troubleshoot.title', '프린터 문제 해결 가이드')}
                      </h2>
                      <button type="button" onClick={() => setShowPrinterTroubleshoot(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#4B5563', padding: '4px' }}>&times;</button>
                    </div>

                    {/* Scenario 1 — QZ Tray prompt keeps appearing */}
                    <div style={{ marginBottom: '20px', padding: '14px 16px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#92400E', marginBottom: '8px' }}>
                        {t('settings:printer.troubleshoot.s1Title', '권한 알림이 계속 뜨거나 "다시 묻지 않기" 체크박스가 비활성')}
                      </div>
                      <p style={{ fontSize: '12px', color: '#92400E', lineHeight: 1.6, margin: '0 0 10px' }}>
                        {t('settings:printer.troubleshoot.s1Why', '이전 시도의 거부 기록이 QZ Tray 에 캐시되어 있을 때 발생합니다. 새 인증서가 정상 검증되어도 옛 거부 기록이 우선합니다. 캐시를 비우고 한 번에 처음부터 다시 설치하면 됩니다.')}
                      </p>
                      <ol style={{ margin: '8px 0 0 18px', padding: 0, fontSize: '12px', color: '#7C2D12', lineHeight: 1.8 }}>
                        <li>{t('settings:printer.troubleshoot.s1Step1', 'QZ Tray 트레이 아이콘 우클릭 → Tools → Manage Sites → PurpleHere / dev.purplehere.com / purplehere.com 항목 모두 "Remove"')}</li>
                        <li>{t('settings:printer.troubleshoot.s1Step2', 'QZ Tray 트레이 아이콘 우클릭 → Exit (완전 종료)')}</li>
                        <li>{t('settings:printer.troubleshoot.s1Step3', '브라우저에서 Ctrl+Shift+R (강력 새로고침)')}</li>
                        <li>{t('settings:printer.troubleshoot.s1Step4', 'QZ Tray 탭의 "원클릭 설치 (.bat)" 다운로드 → 더블클릭 → "Certificate installed" 확인 후 닫기')}</li>
                        <li>{t('settings:printer.troubleshoot.s1Step5', '시작메뉴에서 QZ Tray 다시 실행')}</li>
                        <li>{t('settings:printer.troubleshoot.s1Step6', 'QZ Tray 탭의 "QZ Tray 연결 테스트" 클릭 → prompt 의 "remember" 체크 + Allow → 끝')}</li>
                      </ol>
                    </div>

                    {/* Scenario 2 — Kitchen printer doesn't print */}
                    <div style={{ marginBottom: '20px', padding: '14px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#7F1D1D', marginBottom: '8px' }}>
                        {t('settings:printer.troubleshoot.s2Title', '주방 프린터에서 티켓이 안 나옴 (캐셔는 정상)')}
                      </div>
                      <p style={{ fontSize: '12px', color: '#7F1D1D', lineHeight: 1.6, margin: '0 0 10px' }}>
                        {t('settings:printer.troubleshoot.s2Why', '주방 프린터 전원/연결/IP 설정 문제일 가능성. 정상화 전까지 위의 비상 모드를 켜서 영업을 멈추지 마세요 — 모든 티켓이 캐셔 프린터로 라우팅됩니다.')}
                      </p>
                      <ol style={{ margin: '8px 0 0 18px', padding: 0, fontSize: '12px', color: '#7F1D1D', lineHeight: 1.8 }}>
                        <li>{t('settings:printer.troubleshoot.s2Step1', '주방 프린터 전원 / 용지 확인')}</li>
                        <li>{t('settings:printer.troubleshoot.s2Step2', 'POS PC 에서 명령 프롬프트 → "ping 192.168.x.x" (주방 프린터 IP) 응답 확인')}</li>
                        <li>{t('settings:printer.troubleshoot.s2Step3', 'Settings → Printer → Kitchen Printer 카드의 "Test" 버튼')}</li>
                        <li>{t('settings:printer.troubleshoot.s2Step4', '여전히 안 나오면 → 비상 모드 ON → 캐셔 프린터로 출력 받아 매장 운영 유지 → 영업 시간 후 점검')}</li>
                      </ol>
                    </div>

                    {/* Scenario 3 — Network down */}
                    <div style={{ marginBottom: '20px', padding: '14px 16px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#075985', marginBottom: '8px' }}>
                        {t('settings:printer.troubleshoot.s3Title', '인터넷이 끊겼거나 라우터가 다운')}
                      </div>
                      <p style={{ fontSize: '12px', color: '#075985', lineHeight: 1.6, margin: '0 0 10px' }}>
                        {t('settings:printer.troubleshoot.s3Why', '캐셔 프린터를 USB / Bluetooth 직결로 사용 중이면 비상 모드 ON 만으로 운영 가능. LAN 프린터만 있다면 핫스팟 연결.')}
                      </p>
                      <ol style={{ margin: '8px 0 0 18px', padding: 0, fontSize: '12px', color: '#0C4A6E', lineHeight: 1.8 }}>
                        <li>{t('settings:printer.troubleshoot.s3Step1', 'POS 를 휴대폰 모바일 핫스팟에 연결 (PurpleHere API 호출용)')}</li>
                        <li>{t('settings:printer.troubleshoot.s3Step2', 'Wi-Fi 없는 구형 PC: USB Wi-Fi 동글 (TP-Link Nano / Mercusys / ASUS USB Adapter) 끼우고 핫스팟 연결')}</li>
                        <li>{t('settings:printer.troubleshoot.s3Step3', '캐셔 프린터가 USB 직결이면 그대로 인쇄 가능. LAN 프린터는 라우터 복구까지 못 씀.')}</li>
                        <li>{t('settings:printer.troubleshoot.s3Step4', '비상 모드 ON → 모든 티켓 캐셔로 라우팅 → 직원이 직접 전달')}</li>
                      </ol>
                    </div>

                    {/* Scenario 4 — printer not silent */}
                    <div style={{ marginBottom: '8px', padding: '14px 16px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1F2937', marginBottom: '8px' }}>
                        {t('settings:printer.troubleshoot.s4Title', '인쇄할 때마다 OS 다이얼로그가 뜸 (Enter 눌러야 함)')}
                      </div>
                      <p style={{ fontSize: '12px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                        {t('settings:printer.troubleshoot.s4Why', '현재 연결 방법이 "브라우저 인쇄"이기 때문입니다. 무음 인쇄가 필요하면 QZ Tray (Windows) 또는 RawBT (Android) 로 전환하세요. 위의 "어떤 방법을 선택해야 할까?" 표에서 매장 환경별 권장 방법 확인.')}
                      </p>
                    </div>

                    <div style={{ marginTop: '16px', textAlign: 'right' }}>
                      <button type="button" onClick={() => setShowPrinterTroubleshoot(false)} style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 600, background: '#635BFF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                        {t('settings:printer.troubleshoot.close', '닫기')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                <p style={{ fontSize: '13px', color: '#4B5563', margin: '0 0 16px' }}>
                  Control how same-name items are grouped in Kitchen Display Item View. Leave empty or 0 for unlimited merging (default).
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '400px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1F2937', marginBottom: '8px' }}>{t('settings:settingsPage.timeLimitMinutes')}</label>
                    <AutoSaveField onSave={handleSave}>
                    <input type="number" min="0" value={itemMergeTimeLimit || ''} placeholder="0 = unlimited"
                      onChange={(e) => setItemMergeTimeLimit(parseInt(e.target.value) || 0)}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #C7CED6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
                    </AutoSaveField>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1F2937', marginBottom: '8px' }}>{t('settings:settingsPage.maxCountPerGroup')}</label>
                    <AutoSaveField onSave={handleSave}>
                    <input type="number" min="0" value={itemMergeMaxCount || ''} placeholder="0 = unlimited"
                      onChange={(e) => setItemMergeMaxCount(parseInt(e.target.value) || 0)}
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #C7CED6', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
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

              {/* Routing explainer — only relevant with 2+ stations */}
              {kitchenStations.length > 1 && (
                <SettingsCard style={{ marginBottom: '24px', background: '#F0F9FF', borderColor: '#BAE6FD' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>i</span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#075985', fontSize: '14px', marginBottom: '4px' }}>
                        {t('settings:settingsPage.hybridAssignmentTitle')}
                      </div>
                      <div style={{ color: '#0369A1', fontSize: '13px', lineHeight: 1.5 }}>
                        {t('settings:settingsPage.hybridAssignmentDesc')}
                      </div>
                    </div>
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
                  <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>{t('settings:settingsPage.loading')}</div>
                ) : kitchenStations.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
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
                        <div key={station.id} style={{ background: '#F4F6F9', borderRadius: '8px', padding: '16px', border: '1px solid #C7CED6' }}>
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
                              <button type="button"
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
                                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #C7CED6', background: 'white', cursor: 'pointer', fontSize: '13px', color: '#4B5563' }}
                              >
                                Edit
                              </button>
                              <button type="button"
                                onClick={() => setDeleteStationConfirm({ isOpen: true, stationId: station.id, stationName: station.name })}
                                style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #FECACA', background: '#FEF2F2', cursor: 'pointer', fontSize: '13px', color: '#EF4444' }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          {/* Assignment info */}
                          <div style={{ marginTop: '8px', fontSize: '13px', color: '#4B5563' }}>
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

                {/* Unassigned Warning (hybrid) — items with no category station AND no per-item override */}
                {kitchenStations.length > 1 && (() => {
                  // Build cat → stationId map from stations data
                  const catToStation = new Map<number, number>();
                  kitchenStations.forEach((s: any) => {
                    (s.categories || []).forEach((c: any) => catToStation.set(Number(c.id), s.id));
                  });
                  // Per-item overrides
                  const productToStation = new Map<number, number>();
                  kitchenStations.forEach((s: any) => {
                    (s.products || []).forEach((p: any) => productToStation.set(Number(p.id), s.id));
                  });

                  // 카테고리 없는 아이템 찾기 (Uncategorized)
                  const validCatIds = new Set(allCategories.map((c: any) => Number(c.id)));
                  const uncategorizedProds = allProducts.filter((p: any) => {
                    const catId = p.categoryId ?? p.category_id;
                    return catId == null || !validCatIds.has(Number(catId));
                  });

                  // hybrid 미배정: product 자체 override 없고 + 속한 카테고리도 station 매핑 없는 것
                  const trulyUnassignedProds = allProducts.filter((p: any) => {
                    if (productToStation.has(Number(p.id))) return false;
                    const catId = Number(p.categoryId ?? p.category_id);
                    return !catToStation.has(catId);
                  }).filter((p: any) => !uncategorizedProds.some((u: any) => u.id === p.id));

                  const warnings: React.ReactElement[] = [];

                  if (trulyUnassignedProds.length > 0) {
                    warnings.push(
                      <div key="unassigned" style={{ padding: '12px 16px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', fontSize: '13px', color: '#92400E' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <strong>{trulyUnassignedProds.length} unassigned menu {trulyUnassignedProds.length === 1 ? 'item' : 'items'}</strong>
                        </div>
                        <div>{trulyUnassignedProds.slice(0, 10).map((p: any) => p.name).join(', ')}{trulyUnassignedProds.length > 10 ? ` +${trulyUnassignedProds.length - 10} more` : ''}</div>
                        <div style={{ marginTop: '6px', color: '#B45309', fontSize: '12px' }}>{t('settings:settingsPage.assignCategoryOrItemOverride')}</div>
                      </div>
                    );
                  }
                  if (uncategorizedProds.length > 0) {
                    warnings.push(
                      <div key="uncategorized" style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '13px', color: '#991B1B' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
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
                  maxWidth="640px"
                  footer={
                    <>
                      <button type="button"
                        onClick={() => setShowStationModal(false)}
                        style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #C7CED6', background: 'white', cursor: 'pointer', fontSize: '14px', color: '#4B5563' }}
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
                          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #C7CED6', fontSize: '14px', color: '#0A2540', background: 'white' }}
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
                        <button type="button"
                          type="button"
                          onClick={() => {
                            import('../../utils/notificationSound').then(({ playPresetSound }) => {
                              playPresetSound(stationForm.alert_sound as any);
                            });
                          }}
                          style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #C7CED6', background: 'white', cursor: 'pointer', fontSize: '13px', color: '#4B5563', whiteSpace: 'nowrap' }}
                        >
                          ▶ Test
                        </button>
                      </div>
                    </FormGroup>

                    {/* Categories (default routing) */}
                    <FormGroup>
                      <Label>{t('settings:settingsPage.assignCategories')}</Label>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                        {t('settings:settingsPage.assignCategoriesHint')}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
                        {allCategories.filter((cat: any) => {
                          // 2026-06-12 (Irene): 세트메뉴만 있는 카테고리는 스테이션 라우팅 비대상 —
                          // 세트는 구성품이 각자 스테이션으로 라우팅되므로 여기 떠 있으면 혼동만 준다.
                          const catProds = allProducts.filter((p: any) => String(p.categoryId ?? p.category_id ?? p.category) === String(cat.id));
                          return catProds.length === 0 || catProds.some((p: any) => !p.is_set_menu);
                        }).map((cat: any) => {
                          const isChecked = stationForm.category_ids.includes(cat.id);
                          // Check if assigned to another station
                          const otherStation = kitchenStations.find((s: any) =>
                            s.id !== editingStation?.id && (s.categories || []).some((c: any) => c.id === cat.id)
                          );
                          return (
                            <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '6px', cursor: otherStation ? 'not-allowed' : 'pointer', background: isChecked ? '#F8F7FF' : 'white', border: `1px solid ${isChecked ? '#C7D2FE' : '#C7CED6'}`, opacity: otherStation ? 0.5 : 1 }}>
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

                    {/* Per-menu overrides */}
                    <FormGroup>
                      <Label>{t('settings:settingsPage.menuItemOverrides')}</Label>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                        {t('settings:settingsPage.menuItemOverridesHint')}
                      </div>
                      {(() => {
                        // Build cat → currently-assigned station map (across all stations + this form's draft)
                        const catToStation = new Map<number, { id: number; name: string }>();
                        kitchenStations.forEach((s: any) => {
                          (s.categories || []).forEach((c: any) => {
                            // skip current station's saved cats — pretend draft is truth for this station
                            if (s.id === editingStation?.id) return;
                            catToStation.set(Number(c.id), { id: s.id, name: s.name });
                          });
                        });
                        // overlay current draft
                        stationForm.category_ids.forEach((cid) => {
                          catToStation.set(Number(cid), { id: editingStation?.id ?? -1, name: stationForm.name || t('settings:settingsPage.thisStation') });
                        });

                        // Group products by category
                        // 2026-06-12 (Irene): 세트메뉴는 스테이션 배정 비대상(구성품이 각자 라우팅) → 목록 제외.
                        // 세트 구성 전용 단품(set_only)은 배정 대상이므로 그대로 표시.
                        const grouped = new Map<string, { catName: string; emoji: string; items: any[] }>();
                        allProducts.filter((p: any) => !p.is_set_menu).forEach((p: any) => {
                          const catId = String(p.categoryId ?? p.category_id ?? p.category ?? '');
                          const catMeta = allCategories.find((c: any) => String(c.id) === catId);
                          const key = catMeta ? String(catMeta.id) : '__uncategorized__';
                          if (!grouped.has(key)) {
                            grouped.set(key, {
                              catName: catMeta?.name || t('settings:settingsPage.uncategorized'),
                              emoji: catMeta?.emoji || '',
                              items: []
                            });
                          }
                          grouped.get(key)!.items.push({ ...p, _catId: catMeta ? Number(catMeta.id) : null });
                        });

                        return (
                          <div style={{ maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {Array.from(grouped.entries()).map(([key, group]) => {
                              const catId = key === '__uncategorized__' ? null : Number(key);
                              const defaultStation = catId != null ? catToStation.get(catId) : null;
                              return (
                                <div key={key}>
                                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span>{group.emoji} {group.catName}</span>
                                    {defaultStation ? (
                                      <span style={{ fontSize: '11px', color: '#8898AA', fontWeight: 400 }}>
                                        {t('settings:settingsPage.routedToByCategory', { station: defaultStation.name })}
                                      </span>
                                    ) : (
                                      <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 400 }}>
                                        {t('settings:settingsPage.noCategoryRouting')}
                                      </span>
                                    )}
                                  </div>
                                  {/* 2026-06-03: 카테고리가 이미 스테이션에 배정(라우팅)됐으면 개별 메뉴 목록을
                                      숨긴다 — 카테고리 배정만으로 그 안 메뉴가 전부 자동 라우팅되므로(혼란 방지).
                                      라우팅 안 된 카테고리만 개별 항목을 펼쳐 예외 지정용으로 보여준다. */}
                                  {/* 2026-06-12 (Irene/thefire02): 라우팅된 카테고리 안에 "다른 스테이션을
                                      가리키는 개별 배정"이 숨어 있으면(개별 우선이라 실제 라우팅을 지배)
                                      보이지 않아 혼동 — 예외만 경고로 노출한다. 잉여(같은 스테이션) 개별
                                      배정은 저장 시 백엔드가 자동 정리. */}
                                  {defaultStation && (() => {
                                    const conflicts = group.items.filter((prod: any) =>
                                      prod.kitchen_station_id != null && Number(prod.kitchen_station_id) !== Number(defaultStation.id));
                                    if (conflicts.length === 0) return null;
                                    return (
                                      <div style={{ paddingLeft: '4px', marginBottom: '4px' }}>
                                        {conflicts.map((prod: any) => {
                                          const st = kitchenStations.find((s: any) => Number(s.id) === Number(prod.kitchen_station_id));
                                          return (
                                            <div key={prod.id} style={{ fontSize: '12px', color: '#B45309', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', padding: '5px 8px', marginBottom: '4px' }}>
                                              ⚠ {t('settings:settingsPage.stationOverrideNotice', { item: prod.name, station: st?.name || `#${prod.kitchen_station_id}`, defaultValue: '{{item}} is individually routed to {{station}} (overrides this category)' })}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    );
                                  })()}
                                  {!defaultStation && (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '4px' }}>
                                    {group.items.map((prod: any) => {
                                      const isChecked = stationForm.product_ids.includes(prod.id);
                                      const otherStation = kitchenStations.find((s: any) =>
                                        s.id !== editingStation?.id && (s.products || []).some((p: any) => p.id === prod.id)
                                      );
                                      return (
                                        <label key={prod.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '6px', cursor: otherStation ? 'not-allowed' : 'pointer', background: isChecked ? '#F8F7FF' : 'white', border: `1px solid ${isChecked ? '#C7D2FE' : '#E5E7EB'}`, opacity: otherStation ? 0.5 : 1 }}>
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
                                          {prod.set_only && <span style={{ fontSize: '11px', color: '#7C3AED', background: '#F0EFFF', padding: '1px 6px', borderRadius: '4px' }}>{t('settings:settingsPage.setOnlyBadge', 'Set only')}</span>}
                                          {otherStation && <span style={{ fontSize: '11px', color: '#8898AA' }}>({t('settings:settingsPage.overriddenBy', { station: otherStation.name })})</span>}
                                        </label>
                                      );
                                    })}
                                  </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </FormGroup>
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
                  <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
                    Loading managers...
                  </div>
                </SettingsCard>
              ) : managers.length === 0 ? (
                <SettingsCard>
                  <div style={{ textAlign: 'center', padding: '40px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '8px' }}>
                      No Managers Connected
                    </h3>
                    <p style={{ color: '#4B5563', fontSize: '14px' }}>
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
                          return { bg: '#F1F4F8', color: '#4B5563', border: '#C7CED6' };
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

                            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#4B5563', wordBreak: 'break-all' }}>
                              {manager.email}
                            </p>

                            {manager.company && (
                              <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#4B5563' }}>
                                {manager.company}
                              </p>
                            )}

                            {manager.phone && (
                              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#4B5563' }}>
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
                  <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
                    Loading membership settings...
                  </div>
                </SettingsCard>
              ) : (
                <>
                  {/* Customer Display Membership Entry — phone keypad on customer-facing screen */}
                  <SettingsCard style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 16 }}>
                      <div style={{ flex: 1 }}>
                        <CardTitle style={{ marginBottom: 4 }}>{t('settings:settingsPage.membershipDisplayEntry.title', 'Customer Display — Membership Entry')}</CardTitle>
                        <p style={{ color: '#4B5563', margin: 0, fontSize: 13, lineHeight: 1.5 }}>
                          {t('settings:settingsPage.membershipDisplayEntry.description', 'Show a phone-number keypad on the customer-facing screen (Customer Display) so guests can enter their phone for points / membership.')}
                        </p>
                      </div>
                      <AutoSaveField ref={checkoutDisplayPhoneRef} onSave={async () => {
                        const rid = user?.restaurantId;
                        if (!rid) return;
                        const enabled = (operationSettings as any)?.checkout_display?.show_phone_input !== false;
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
                      }} type="toggle">
                      <ToggleSwitch>
                        <ToggleInput
                          type="checkbox"
                          checked={(operationSettings as any)?.checkout_display?.show_phone_input !== false}
                          onChange={(e) => {
                            const enabled = e.target.checked;
                            setOperationSettings((prev: any) => ({
                              ...prev,
                              checkout_display: { ...((prev as any)?.checkout_display || {}), show_phone_input: enabled }
                            } as any));
                            checkoutDisplayPhoneRef.current?.triggerSave();
                          }}
                        />
                        <ToggleSlider />
                      </ToggleSwitch>
                      </AutoSaveField>
                    </div>
                  </SettingsCard>

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
                          <span style={{ fontSize: '14px', fontWeight: '500', color: membershipSettings.is_active ? '#635BFF' : '#4B5563' }}>
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
                        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#4B5563' }}>
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
                        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#4B5563' }}>
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
                  <SettingsCard style={{ marginTop: '24px', background: '#F1F4F8', border: '1px solid #E2E8F0' }}>
                    <CardTitle style={{ fontSize: '14px', color: '#475569' }}>{t('settings:settingsPage.pointSystemPolicyReference')}</CardTitle>
                    <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.8' }}>
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
                      <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748B' }}>
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
