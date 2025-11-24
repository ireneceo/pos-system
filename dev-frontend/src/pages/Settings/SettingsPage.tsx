import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { QRCodeCanvas } from 'qrcode.react';
import MainLayout from '../../components/Layout/MainLayout';
import { TabContainer, Tab } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { useMenu } from '../../contexts/MenuContext';
import { useBrandTheme } from '../../contexts/BrandThemeContext';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ImageUploadDropzone from '../../components/common/ImageUploadDropzone';
import { useTabParam } from '../../hooks/useTabParam';

// 스타일 컴포넌트
const SettingsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.header`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
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
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
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

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #C7D2FE;
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
`;

const FeeInput = styled(Input)`
  width: 100px;
  display: inline-block;
  margin-right: 8px;
`;

const TablesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 20px;
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
type TabType = 'store' | 'operations' | 'payment' | 'system' | 'backup' | 'company' | 'brands' | 'billing' | 'managers';

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
  gstRegNo: string;
  logo: string;
}

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
  
  // Payment settings state - start with null, will be loaded from DB
  const [paymentMethods, setPaymentMethods] = useState<any>(null);

  // Load settings from localStorage or use defaults
  const loadSettings = () => {
    const savedSettings = localStorage.getItem('storeSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      store: {
        name: 'FOODCOURT CENTRAL',
        businessRegistration: '000123456789',
        phone: '+60 3-1234-5678',
        email: 'contact@foodcourt.com',
        address: '123 Main Street, City Center',
        city: 'Kuala Lumpur',
        state: 'Wilayah Persekutuan',
        postalCode: '50000',
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
        }
      }
    };
  };
  
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(loadSettings().store);
  const [operationSettings, setOperationSettings] = useState<OperationSettings>(loadSettings().operations);

  // Initialize currencySettings from operationSettings (will be overridden by DB values in useEffect)
  const defaultOps = loadSettings().operations;
  const [currencySettings, setCurrencySettings] = useState({
    currency: defaultOps.currency || 'RM',
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
  const [tableSettings, setTableSettings] = useState({
    enableTableNumbers: true,
    tableNumberRequired: false,
    tablePrefix: 'T',
    totalTables: 20,
    qrCodeBaseUrl: window.location.origin
  });
  
  const [tables, setTables] = useState<Table[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loadingManagers, setLoadingManagers] = useState(false);
  // loadingStoreData removed - not used

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
              gstRegNo: restaurant.tax_id || '',
              logo: restaurant.logo_url || ''
            });

            // Load payment settings - use DB values directly (no merge)
            if (restaurant.payment_settings) {
              console.log('✅ Loading payment settings from DB:', JSON.stringify(restaurant.payment_settings).substring(0, 200));

              // Use DB values directly - no merging with defaults
              setPaymentMethods(restaurant.payment_settings);

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
              }
            } : defaultOps;

            // Override with currency settings from restaurant table (these take priority)
            const currencyFromDB = restaurant.currency || 'RM';
            const cashRoundingFromDB = restaurant.cash_rounding !== null && restaurant.cash_rounding !== undefined
              ? parseFloat(restaurant.cash_rounding)
              : 0.05;
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

  // Load table settings
  useEffect(() => {
    const savedTableSettings = localStorage.getItem('tableSettings');
    if (savedTableSettings) {
      const parsedSettings = JSON.parse(savedTableSettings);
      setTableSettings(parsedSettings);
      
      const savedTables = localStorage.getItem('tables');
      if (savedTables) {
        setTables(JSON.parse(savedTables));
      } else {
        // Generate tables with saved settings
        const newTables: Table[] = [];
        for (let i = 1; i <= parsedSettings.totalTables; i++) {
          const tableNumber = `${parsedSettings.tablePrefix}${String(i).padStart(3, '0')}`;
          const qrData = `${parsedSettings.qrCodeBaseUrl}/mobile?table=${tableNumber}`;
          newTables.push({
            id: `table-${i}`,
            number: i,
            qrCode: qrData,
            isActive: true
          });
        }
        setTables(newTables);
      }
    }
  }, []);

  // generateTables function removed - not used
  
  const handleGenerateQRCodes = () => {
    const newTables: Table[] = [];
    for (let i = 1; i <= tableSettings.totalTables; i++) {
      const tableNumber = `${tableSettings.tablePrefix}${String(i).padStart(3, '0')}`;
      const qrData = `${tableSettings.qrCodeBaseUrl}/mobile?table=${tableNumber}`;
      newTables.push({
        id: `table-${i}`,
        number: i,
        qrCode: qrData,
        isActive: true
      });
    }
    setTables(newTables);
    setHasChanges(true);
  };
  
  const handleDownloadQR = (table: Table) => {
    const canvas = document.getElementById(`qr-${table.id}`) as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `table-${tableSettings.tablePrefix}${String(table.number).padStart(3, '0')}-qr.png`;
      link.href = url;
      link.click();
    }
  };
  
  const handlePrintQR = (table: Table) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      const tableNumber = `${tableSettings.tablePrefix}${String(table.number).padStart(3, '0')}`;
      printWindow.document.write(`
        <html>
          <head>
            <title>Table ${tableNumber} QR Code</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
              }
              h1 { margin-bottom: 20px; }
              .qr-container { margin: 20px 0; }
              @media print {
                body { height: auto; }
              }
            </style>
          </head>
          <body>
            <h1>Table ${tableNumber}</h1>
            <div class="qr-container">
              <canvas id="qr-print"></canvas>
            </div>
            <p>Scan to order from this table</p>
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Draw QR code in print window
      const canvas = document.getElementById(`qr-${table.id}`) as HTMLCanvasElement;
      const printCanvas = printWindow.document.getElementById('qr-print') as HTMLCanvasElement;
      if (canvas && printCanvas) {
        const ctx = printCanvas.getContext('2d');
        printCanvas.width = canvas.width;
        printCanvas.height = canvas.height;
        ctx?.drawImage(canvas, 0, 0);
      }
      
      printWindow.print();
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
    setHasChanges(true);
  };

  const handlePaymentSettingChange = (methodKey: string, field: string, value: any) => {
    setPaymentMethods((prev: any) => ({
      ...prev,
      [methodKey]: { ...prev[methodKey], [field]: value }
    }));
    setHasChanges(true);
  };

  const handlePaymentConfigChange = (methodKey: string, configField: string, value: any) => {
    setPaymentMethods((prev: any) => ({
      ...prev,
      [methodKey]: {
        ...prev[methodKey],
        config: { ...prev[methodKey].config, [configField]: value }
      }
    }));
    setHasChanges(true);
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
            // Save all methods with their current state (enabled or disabled)
            normalizedPaymentMethods[key] = paymentMethods[key];
          });
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
          tax_id: storeSettings.gstRegNo,
          logo_url: storeSettings.logo,
          payment_settings: normalizedPaymentMethods,
          operation_settings: operationSettings,
          currency: currencySettings.currency,
          cash_rounding: currencySettings.cashRounding,
          rounding_apply_to: currencySettings.roundingApplyTo
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
          setSaveStatus({ type: 'error', message: `❌ Failed to save settings to database (${response.status}: ${response.statusText})` });

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
            currency: verifyRestaurant.currency || 'RM',
            cashRounding: verifyRestaurant.cash_rounding !== null && verifyRestaurant.cash_rounding !== undefined ? parseFloat(verifyRestaurant.cash_rounding) : null,
            roundingApplyTo: verifyRestaurant.rounding_apply_to || 'cash_only'
          });
        }
      } else {
        console.log('⚠️  No restaurantId found, skipping database save');
      }

      setSaveStatus({ type: 'success', message: '✅ Settings saved successfully!' });
      setHasChanges(false);
      console.log('✅ Save completed successfully');

      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 5000);
    } catch (error) {
      console.error('❌ Error saving settings:', error);
      setSaveStatus({ type: 'error', message: '❌ Failed to save settings' });

      // Auto-clear error message after 8 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 8000);
    }
  };

  return (
    <MainLayout>
      <SettingsContainer>
        <Header>
          <HeaderTitle>Store Settings</HeaderTitle>
        </Header>

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
                <Tab active={activeTab === 'system'} onClick={() => handleTabChange('system')}>
                  System
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
                <Tab active={activeTab === 'managers'} onClick={() => handleTabChange('managers')}>
                  Managers
                </Tab>
                <Tab active={activeTab === 'system'} onClick={() => handleTabChange('system')}>
                  System
                </Tab>
                <Tab active={activeTab === 'backup'} onClick={() => handleTabChange('backup')}>
                  Backup & Restore
                </Tab>
              </>
            )}
          </TabContainer>

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
              ) : Object.entries(paymentMethods).map(([key, method]: [string, any]) => (
                <PaymentMethodCard key={key}>
                  <div style={{ marginBottom: method.enabled ? '16px' : '0' }}>
                    {/* Header Row: Title on left, Checkboxes on right */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: method.enabled ? '16px' : '0'
                    }}>
                      <ToggleLabel>{method.label}</ToggleLabel>

                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        {/* POS Terminal Checkbox */}
                        <label style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer'
                        }}>
                          <input
                            type="checkbox"
                            checked={method.availableIn?.includes('pos') || false}
                            onChange={(e) => handlePaymentToggle(key, 'pos', e.target.checked)}
                            style={{
                              width: '18px',
                              height: '18px',
                              cursor: 'pointer',
                              accentColor: '#635BFF'
                            }}
                          />
                          <span style={{
                            fontSize: '13px',
                            fontWeight: '500',
                            color: method.availableIn?.includes('pos') ? '#0A2540' : '#6B7C93',
                            whiteSpace: 'nowrap'
                          }}>
                            Enable for POS Terminal
                          </span>
                        </label>

                        {/* Mobile Orders Checkbox */}
                        <label style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer'
                        }}>
                          <input
                            type="checkbox"
                            checked={method.availableIn?.includes('mobile') || false}
                            onChange={(e) => handlePaymentToggle(key, 'mobile', e.target.checked)}
                            style={{
                              width: '18px',
                              height: '18px',
                              cursor: 'pointer',
                              accentColor: '#635BFF'
                            }}
                          />
                          <span style={{
                            fontSize: '13px',
                            fontWeight: '500',
                            color: method.availableIn?.includes('mobile') ? '#0A2540' : '#6B7C93',
                            whiteSpace: 'nowrap'
                          }}>
                            Enable for Mobile Orders
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Card Payment Settings */}
                  {key === 'card' && method.enabled && (
                    <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px' }}>
                      <FormGroup>
                        <Label>Payment Gateway Provider</Label>
                        <Select
                          value={method.provider || ''}
                          onChange={(e) => handlePaymentSettingChange(key, 'provider', e.target.value)}
                        >
                          <option value="">Select Gateway</option>
                          <option value="ipay88">iPay88</option>
                          <option value="molpay">MOLPay</option>
                          <option value="2c2p">2C2P</option>
                          <option value="stripe">Stripe</option>
                          <option value="paypal">PayPal</option>
                        </Select>
                      </FormGroup>

                      {/* iPay88 Configuration */}
                      {method.provider === 'ipay88' && (
                        <>
                          <FormGroup>
                            <Label>Merchant Code</Label>
                            <Input
                              type="text"
                              placeholder="Enter iPay88 Merchant Code"
                              value={method.config?.ipay88MerchantCode || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'ipay88MerchantCode', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Merchant Key</Label>
                            <Input
                              type="password"
                              placeholder="Enter iPay88 Merchant Key"
                              value={method.config?.ipay88MerchantKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'ipay88MerchantKey', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}

                      {/* MOLPay Configuration */}
                      {method.provider === 'molpay' && (
                        <>
                          <FormGroup>
                            <Label>Merchant ID</Label>
                            <Input
                              type="text"
                              placeholder="Enter MOLPay Merchant ID"
                              value={method.config?.molpayMerchantId || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'molpayMerchantId', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Verify Key</Label>
                            <Input
                              type="password"
                              placeholder="Enter MOLPay Verify Key"
                              value={method.config?.molpayVerifyKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'molpayVerifyKey', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Secret Key</Label>
                            <Input
                              type="password"
                              placeholder="Enter MOLPay Secret Key"
                              value={method.config?.molpaySecretKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'molpaySecretKey', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}

                      {/* 2C2P Configuration */}
                      {method.provider === '2c2p' && (
                        <>
                          <FormGroup>
                            <Label>Merchant ID</Label>
                            <Input
                              type="text"
                              placeholder="Enter 2C2P Merchant ID"
                              value={method.config?.['2c2pMerchantId'] || ''}
                              onChange={(e) => handlePaymentConfigChange(key, '2c2pMerchantId', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Secret Key</Label>
                            <Input
                              type="password"
                              placeholder="Enter 2C2P Secret Key"
                              value={method.config?.['2c2pSecretKey'] || ''}
                              onChange={(e) => handlePaymentConfigChange(key, '2c2pSecretKey', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}

                      {/* Stripe Configuration */}
                      {method.provider === 'stripe' && (
                        <>
                          <FormGroup>
                            <Label>Publishable Key</Label>
                            <Input
                              type="text"
                              placeholder="pk_live_..."
                              value={method.config?.stripePublicKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'stripePublicKey', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Secret Key</Label>
                            <Input
                              type="password"
                              placeholder="sk_live_..."
                              value={method.config?.stripeSecretKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'stripeSecretKey', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}

                      {/* PayPal Configuration */}
                      {method.provider === 'paypal' && (
                        <>
                          <FormGroup>
                            <Label>Client ID</Label>
                            <Input
                              type="text"
                              placeholder="Enter PayPal Client ID"
                              value={method.config?.paypalClientId || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'paypalClientId', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Client Secret</Label>
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

                  {/* E-Wallet Settings */}
                  {key === 'ewallet' && method.enabled && (
                    <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px' }}>
                      <FormGroup>
                        <Label>E-Wallet Provider</Label>
                        <Select
                          value={method.provider || ''}
                          onChange={(e) => handlePaymentSettingChange(key, 'provider', e.target.value)}
                        >
                          <option value="">Select E-Wallet</option>
                          <option value="tng">Touch 'n Go eWallet</option>
                          <option value="grabpay">GrabPay</option>
                          <option value="boost">Boost</option>
                          <option value="shopeepay">ShopeePay</option>
                        </Select>
                      </FormGroup>

                      {/* Touch 'n Go Configuration */}
                      {method.provider === 'tng' && (
                        <>
                          <FormGroup>
                            <Label>Merchant ID</Label>
                            <Input
                              type="text"
                              placeholder="Enter TNG Merchant ID"
                              value={method.config?.tngMerchantId || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'tngMerchantId', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>API Key</Label>
                            <Input
                              type="password"
                              placeholder="Enter TNG API Key"
                              value={method.config?.tngApiKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'tngApiKey', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}

                      {/* GrabPay Configuration */}
                      {method.provider === 'grabpay' && (
                        <>
                          <FormGroup>
                            <Label>Merchant ID</Label>
                            <Input
                              type="text"
                              placeholder="Enter GrabPay Merchant ID"
                              value={method.config?.grabpayMerchantId || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'grabpayMerchantId', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Client ID</Label>
                            <Input
                              type="text"
                              placeholder="Enter GrabPay Client ID"
                              value={method.config?.grabpayClientId || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'grabpayClientId', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Client Secret</Label>
                            <Input
                              type="password"
                              placeholder="Enter GrabPay Client Secret"
                              value={method.config?.grabpayClientSecret || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'grabpayClientSecret', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}

                      {/* Boost Configuration */}
                      {method.provider === 'boost' && (
                        <>
                          <FormGroup>
                            <Label>Merchant ID</Label>
                            <Input
                              type="text"
                              placeholder="Enter Boost Merchant ID"
                              value={method.config?.boostMerchantId || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'boostMerchantId', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>API Key</Label>
                            <Input
                              type="password"
                              placeholder="Enter Boost API Key"
                              value={method.config?.boostApiKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'boostApiKey', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}

                      {/* ShopeePay Configuration */}
                      {method.provider === 'shopeepay' && (
                        <>
                          <FormGroup>
                            <Label>Merchant ID</Label>
                            <Input
                              type="text"
                              placeholder="Enter ShopeePay Merchant ID"
                              value={method.config?.shopeePayMerchantId || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'shopeePayMerchantId', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>API Key</Label>
                            <Input
                              type="password"
                              placeholder="Enter ShopeePay API Key"
                              value={method.config?.shopeePayApiKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'shopeePayApiKey', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}
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

                  {/* QR Payment Settings */}
                  {key === 'qrPayment' && method.enabled && (
                    <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px' }}>
                      <ImageUploadDropzone
                        value={method.qrImage || ''}
                        onChange={(base64) => handlePaymentSettingChange(key, 'qrImage', base64)}
                        label="QR Code Image"
                        helpText="Upload QR code image for customers to scan and make payment"
                        changeButtonText="Change QR Code"
                        removeButtonText="Remove QR Code"
                        imageAltText="QR Code"
                      />
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

                  {/* FPX Settings */}
                  {key === 'fpx' && method.enabled && (
                    <div style={{ borderTop: '1px solid #E6EBF1', paddingTop: '16px' }}>
                      <FormGroup>
                        <Label>FPX Gateway Provider</Label>
                        <Select
                          value={method.provider || ''}
                          onChange={(e) => handlePaymentSettingChange(key, 'provider', e.target.value)}
                        >
                          <option value="">Select FPX Gateway</option>
                          <option value="ipay88">iPay88 FPX</option>
                          <option value="molpay">MOLPay FPX</option>
                          <option value="2c2p">2C2P FPX</option>
                        </Select>
                      </FormGroup>

                      {/* iPay88 FPX Configuration */}
                      {method.provider === 'ipay88' && (
                        <>
                          <FormGroup>
                            <Label>Merchant Code</Label>
                            <Input
                              type="text"
                              placeholder="Enter iPay88 Merchant Code"
                              value={method.config?.ipay88MerchantCode || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'ipay88MerchantCode', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Merchant Key</Label>
                            <Input
                              type="password"
                              placeholder="Enter iPay88 Merchant Key"
                              value={method.config?.ipay88MerchantKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'ipay88MerchantKey', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}

                      {/* MOLPay FPX Configuration */}
                      {method.provider === 'molpay' && (
                        <>
                          <FormGroup>
                            <Label>Merchant ID</Label>
                            <Input
                              type="text"
                              placeholder="Enter MOLPay Merchant ID"
                              value={method.config?.molpayMerchantId || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'molpayMerchantId', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Verify Key</Label>
                            <Input
                              type="password"
                              placeholder="Enter MOLPay Verify Key"
                              value={method.config?.molpayVerifyKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'molpayVerifyKey', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Secret Key</Label>
                            <Input
                              type="password"
                              placeholder="Enter MOLPay Secret Key"
                              value={method.config?.molpaySecretKey || ''}
                              onChange={(e) => handlePaymentConfigChange(key, 'molpaySecretKey', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}

                      {/* 2C2P FPX Configuration */}
                      {method.provider === '2c2p' && (
                        <>
                          <FormGroup>
                            <Label>Merchant ID</Label>
                            <Input
                              type="text"
                              placeholder="Enter 2C2P Merchant ID"
                              value={method.config?.['2c2pMerchantId'] || ''}
                              onChange={(e) => handlePaymentConfigChange(key, '2c2pMerchantId', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label>Secret Key</Label>
                            <Input
                              type="password"
                              placeholder="Enter 2C2P Secret Key"
                              value={method.config?.['2c2pSecretKey'] || ''}
                              onChange={(e) => handlePaymentConfigChange(key, '2c2pSecretKey', e.target.value)}
                            />
                          </FormGroup>
                        </>
                      )}
                    </div>
                  )}
                </PaymentMethodCard>
              ))}

              {paymentMethods && (
              <SaveButtonContainer>
                <SaveButton onClick={handleSave} disabled={!hasChanges}>
                  {hasChanges ? 'Save Changes' : 'Saved'}
                </SaveButton>
                {saveStatus && (
                  <StatusMessage type={saveStatus.type}>
                    {saveStatus.message}
                  </StatusMessage>
                )}
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
                      setHasChanges(true);
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
                      setHasChanges(true);
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
                      setHasChanges(true);
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
                      setHasChanges(true);
                    }}
                    placeholder="Food Service Management"
                  />
                </FormGroup>

                <ImageUploadDropzone
                  value={companySettings.logo}
                  onChange={(base64) => {
                    setCompanySettings(prev => ({ ...prev, logo: base64 }));
                    setHasChanges(true);
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
                      setHasChanges(true);
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
                      setHasChanges(true);
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
                      setHasChanges(true);
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
                      setHasChanges(true);
                    }}
                    placeholder="123 Business District"
                  />
                </FormGroup>
              </SettingsCard>
              </SettingsGrid>

              <SaveButtonContainer>
                <SaveButton onClick={handleSave} disabled={!hasChanges}>
                  {hasChanges ? 'Save Changes' : 'Saved'}
                </SaveButton>
                {saveStatus && (
                  <StatusMessage type={saveStatus.type}>
                    {saveStatus.message}
                  </StatusMessage>
                )}
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
                        + Add Brand
                      </ThemedButton>
                    ) : (
                      <Button onClick={() => alert('Add Brand functionality coming soon')}>
                        + Add Brand
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
                            setHasChanges(true);
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
                            setHasChanges(true);
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
                            setHasChanges(true);
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
                      setHasChanges(true);
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
                <SaveButton onClick={handleSave} disabled={!hasChanges}>
                  {hasChanges ? 'Save Changes' : 'Saved'}
                </SaveButton>
                {saveStatus && (
                  <StatusMessage type={saveStatus.type}>
                    {saveStatus.message}
                  </StatusMessage>
                )}
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
                <SaveButton onClick={handleSave} disabled={!hasChanges}>
                  {hasChanges ? 'Save Changes' : 'Saved'}
                </SaveButton>
                {saveStatus && (
                  <StatusMessage type={saveStatus.type}>
                    {saveStatus.message}
                  </StatusMessage>
                )}
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
                      setHasChanges(true);
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
                      setHasChanges(true);
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
                      setHasChanges(true);
                    }}
                    placeholder="Enter tax registration number (optional)"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input 
                    type="tel" 
                    value={storeSettings.phone}
                    onChange={(e) => {
                      setStoreSettings(prev => ({ ...prev, phone: e.target.value }));
                      setHasChanges(true);
                    }}
                    placeholder="+60 3-1234-5678" 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) => {
                      setStoreSettings(prev => ({ ...prev, email: e.target.value }));
                      setHasChanges(true);
                    }}
                    placeholder="contact@foodcourt.com"
                  />
                </FormGroup>

                <ImageUploadDropzone
                  value={storeSettings.logo}
                  onChange={(base64) => {
                    setStoreSettings(prev => ({ ...prev, logo: base64 }));
                    setHasChanges(true);
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
                      setHasChanges(true);
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
                      setHasChanges(true);
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
                      setHasChanges(true);
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
                      setHasChanges(true);
                    }}
                    placeholder="50000"
                  />
                </FormGroup>
              </SettingsCard>
              </SettingsGrid>

              <SaveButtonContainer>
                <SaveButton onClick={handleSave} disabled={!hasChanges}>
                  {hasChanges ? 'Save Changes' : 'Saved'}
                </SaveButton>
                {saveStatus && (
                  <StatusMessage type={saveStatus.type}>
                    {saveStatus.message}
                  </StatusMessage>
                )}
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
                      setHasChanges(true);
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
                      setHasChanges(true);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Time Zone</Label>
                  <Select 
                    value={operationSettings.timeZone}
                    onChange={(e) => {
                      setOperationSettings(prev => ({ ...prev, timeZone: e.target.value }));
                      setHasChanges(true);
                    }}
                  >
                    <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur (GMT+8)</option>
                    <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                    <option value="Asia/Jakarta">Asia/Jakarta (GMT+7)</option>
                  </Select>
                </FormGroup>
              </SettingsCard>

              <SettingsCard>
                <CardTitle>Order Settings</CardTitle>
                <FormGroup>
                  <Label>Order Number Reset</Label>
                  <Select 
                    value={operationSettings.orderNumberReset}
                    onChange={(e) => {
                      setOperationSettings(prev => ({ ...prev, orderNumberReset: e.target.value as any }));
                      setHasChanges(true);
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
                      setHasChanges(true);
                    }}
                  />
                  <span style={{ color: '#6B7C93', fontSize: '14px' }}>minutes</span>
                </FormGroup>
              </SettingsCard>

              <SettingsCard>
                <CardTitle>Tax Settings</CardTitle>
                <Toggle>
                  <ToggleLabel>Enable Tax</ToggleLabel>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={operationSettings.taxEnabled}
                      onChange={(e) => {
                        setOperationSettings(prev => ({
                          ...prev,
                          taxEnabled: e.target.checked
                        }));
                        setHasChanges(true);
                      }}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </Toggle>

                {operationSettings.taxEnabled && (
                  <>
                    <Divider />
                    <FormGroup>
                      <Label>Tax Rate (%)</Label>
                      <FeeInput
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={operationSettings.taxRate}
                        onChange={(e) => {
                          setOperationSettings(prev => ({ ...prev, taxRate: Number(e.target.value) }));
                          setHasChanges(true);
                        }}
                      />
                      <span style={{ color: '#6B7C93', fontSize: '14px' }}>%</span>
                    </FormGroup>
                  </>
                )}
              </SettingsCard>

              <SettingsCard>
                <CardTitle>Service Charge Settings</CardTitle>
                <Toggle>
                  <ToggleLabel>Enable Service Charge</ToggleLabel>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={operationSettings.serviceChargeEnabled}
                      onChange={(e) => {
                        setOperationSettings(prev => ({
                          ...prev,
                          serviceChargeEnabled: e.target.checked
                        }));
                        setHasChanges(true);
                      }}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </Toggle>

                {operationSettings.serviceChargeEnabled && (
                  <>
                    <Divider />
                    <FormGroup>
                      <Label>Service Charge Rate (%)</Label>
                      <FeeInput
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={operationSettings.serviceChargeRate}
                        onChange={(e) => {
                          setOperationSettings(prev => ({ ...prev, serviceChargeRate: Number(e.target.value) }));
                          setHasChanges(true);
                        }}
                      />
                      <span style={{ color: '#6B7C93', fontSize: '14px' }}>%</span>
                    </FormGroup>
                  </>
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
                      setHasChanges(true);
                    }}
                  >
                    <option value="RM">Malaysian Ringgit (RM)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="SGD">Singapore Dollar (SGD)</option>
                    <option value="JPY">Japanese Yen (JPY)</option>
                    <option value="THB">Thai Baht (THB)</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Cash Rounding</Label>
                  <Select
                    value={currencySettings.cashRounding !== null ? currencySettings.cashRounding.toFixed(2) : ''}
                    onChange={(e) => {
                      const value = e.target.value ? parseFloat(e.target.value) : null;
                      setCurrencySettings(prev => ({ ...prev, cashRounding: value }));
                      setHasChanges(true);
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
                      setHasChanges(true);
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
                        setHasChanges(true);
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
                          setHasChanges(true);
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
                            setHasChanges(true);
                          }}
                        />
                        <span style={{ color: '#6B7C93', fontSize: '14px' }}>RM</span>
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
                                  setHasChanges(true);
                                }}
                              />
                              <span style={{ color: '#6B7C93', fontSize: '14px' }}>RM</span>
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
                <CardTitle>Delivery Pricing Settings</CardTitle>
                <Toggle>
                  <ToggleLabel>Enable Delivery Service</ToggleLabel>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={operationSettings.deliveryPricing?.enabled || false}
                      onChange={(e) => {
                        setOperationSettings(prev => ({
                          ...prev,
                          deliveryPricing: { ...prev.deliveryPricing, enabled: e.target.checked }
                        }));
                        setHasChanges(true);
                      }}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </Toggle>

                {operationSettings.deliveryPricing?.enabled && (
                  <>
                    <Divider />
                    <FormGroup>
                      <Label>Minimum Order Amount</Label>
                      <FeeInput
                        type="number"
                        step="1.00"
                        value={operationSettings.deliveryPricing.minimumOrder}
                        onChange={(e) => {
                          setOperationSettings(prev => ({
                            ...prev,
                            deliveryPricing: { ...prev.deliveryPricing, minimumOrder: Number(e.target.value) }
                          }));
                          setHasChanges(true);
                        }}
                      />
                      <span style={{ color: '#6B7C93', fontSize: '14px' }}>RM</span>
                      <HelpText>Minimum subtotal required for delivery orders (0 = no minimum)</HelpText>
                    </FormGroup>

                    <FormGroup>
                      <Label>Free Delivery Above</Label>
                      <FeeInput
                        type="number"
                        step="1.00"
                        value={operationSettings.deliveryPricing.freeAbove}
                        onChange={(e) => {
                          setOperationSettings(prev => ({
                            ...prev,
                            deliveryPricing: { ...prev.deliveryPricing, freeAbove: Number(e.target.value) }
                          }));
                          setHasChanges(true);
                        }}
                      />
                      <span style={{ color: '#6B7C93', fontSize: '14px' }}>RM</span>
                      <HelpText>Waive delivery fee if order subtotal exceeds this amount (999999 = never free)</HelpText>
                    </FormGroup>

                    <Divider />
                    <Label style={{ marginBottom: '16px' }}>Delivery Zones</Label>
                    <HelpText style={{ marginBottom: '16px' }}>Configure delivery zones and their corresponding fees</HelpText>

                    {(operationSettings.deliveryPricing.zones || []).map((zone, index) => (
                      <div key={index} style={{
                        background: '#FAFBFC',
                        padding: '16px',
                        borderRadius: '8px',
                        marginBottom: '12px',
                        border: '1px solid #E6EBF1'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <Label style={{ margin: 0 }}>Zone {index + 1}</Label>
                          <button
                            onClick={() => {
                              const zones = [...(operationSettings.deliveryPricing.zones || [])];
                              zones.splice(index, 1);
                              setOperationSettings(prev => ({
                                ...prev,
                                deliveryPricing: { ...prev.deliveryPricing, zones }
                              }));
                              setHasChanges(true);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#DC2626',
                              cursor: 'pointer',
                              fontSize: '14px',
                              padding: '4px 8px'
                            }}
                          >
                            Remove
                          </button>
                        </div>
                        <FormGroup>
                          <Label>Zone Name</Label>
                          <Input
                            type="text"
                            placeholder="e.g., Zone A (City Center)"
                            value={zone.name}
                            onChange={(e) => {
                              const zones = [...(operationSettings.deliveryPricing.zones || [])];
                              zones[index] = { ...zones[index], name: e.target.value };
                              setOperationSettings(prev => ({
                                ...prev,
                                deliveryPricing: { ...prev.deliveryPricing, zones }
                              }));
                              setHasChanges(true);
                            }}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Description</Label>
                          <Input
                            type="text"
                            placeholder="e.g., 3km radius"
                            value={zone.description}
                            onChange={(e) => {
                              const zones = [...(operationSettings.deliveryPricing.zones || [])];
                              zones[index] = { ...zones[index], description: e.target.value };
                              setOperationSettings(prev => ({
                                ...prev,
                                deliveryPricing: { ...prev.deliveryPricing, zones }
                              }));
                              setHasChanges(true);
                            }}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Delivery Fee</Label>
                          <FeeInput
                            type="number"
                            step="0.50"
                            value={zone.fee}
                            onChange={(e) => {
                              const zones = [...(operationSettings.deliveryPricing.zones || [])];
                              zones[index] = { ...zones[index], fee: Number(e.target.value) };
                              setOperationSettings(prev => ({
                                ...prev,
                                deliveryPricing: { ...prev.deliveryPricing, zones }
                              }));
                              setHasChanges(true);
                            }}
                          />
                          <span style={{ color: '#6B7C93', fontSize: '14px' }}>RM</span>
                        </FormGroup>
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        const zones = [...(operationSettings.deliveryPricing.zones || [])];
                        zones.push({
                          id: `zone-${Date.now()}`,
                          name: '',
                          description: '',
                          fee: 0
                        });
                        setOperationSettings(prev => ({
                          ...prev,
                          deliveryPricing: { ...prev.deliveryPricing, zones }
                        }));
                        setHasChanges(true);
                      }}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: '#F0F4FF',
                        border: '1px dashed #635BFF',
                        borderRadius: '8px',
                        color: '#635BFF',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      + Add Delivery Zone
                    </button>
                  </>
                )}
              </SettingsCard>

              <SettingsCard style={{ gridColumn: '1 / -1' }}>
                <CardTitle>Loyalty Tier Settings</CardTitle>
                <Toggle>
                  <ToggleLabel>Enable Loyalty Tier System</ToggleLabel>
                  <ToggleSwitch>
                    <ToggleInput
                      type="checkbox"
                      checked={operationSettings?.loyaltyTiers?.enabled || false}
                      onChange={(e) => {
                        setOperationSettings(prev => ({
                          ...prev,
                          loyaltyTiers: {
                            ...(prev.loyaltyTiers || {}),
                            enabled: e.target.checked,
                            bronze: prev?.loyaltyTiers?.bronze || { minOrders: 0, minSpent: 0 },
                            silver: prev?.loyaltyTiers?.silver || { minOrders: 5, minSpent: 500 },
                            gold: prev?.loyaltyTiers?.gold || { minOrders: 15, minSpent: 1500 },
                            vip: prev?.loyaltyTiers?.vip || { minOrders: 30, minSpent: 3000 }
                          }
                        }));
                        setHasChanges(true);
                      }}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </Toggle>
                <HelpText>Enable automatic loyalty tier upgrades based on customer orders and spending</HelpText>

                {operationSettings?.loyaltyTiers?.enabled && (
                  <>
                    <Divider />

                    {/* Bronze Tier */}
                    <div style={{ marginBottom: '24px' }}>
                      <Label style={{ color: '#CD7F32', fontWeight: 600, fontSize: '15px', marginBottom: '8px' }}>🥉 Bronze Tier (Default)</Label>
                      <HelpText>All new customers start at Bronze tier</HelpText>
                    </div>

                    {/* Silver Tier */}
                    <div style={{ marginBottom: '32px' }}>
                      <Label style={{ color: '#C0C0C0', fontWeight: 600, fontSize: '15px', marginBottom: '16px', display: 'block' }}>🥈 Silver Tier Requirements</Label>
                      <SettingsGrid>
                        <FormGroup>
                          <Label>Minimum Orders</Label>
                          <Input
                            type="number"
                            min="0"
                            value={operationSettings?.loyaltyTiers?.silver?.minOrders || 5}
                            onChange={(e) => {
                              setOperationSettings(prev => ({
                                ...prev,
                                loyaltyTiers: {
                                  ...prev.loyaltyTiers,
                                  silver: {
                                    ...prev.loyaltyTiers.silver,
                                    minOrders: Number(e.target.value)
                                  }
                                }
                              }));
                              setHasChanges(true);
                            }}
                          />
                          <HelpText>Number of completed orders</HelpText>
                        </FormGroup>
                        <FormGroup>
                          <Label>Minimum Spent ({currencySettings.currency})</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={operationSettings?.loyaltyTiers?.silver?.minSpent || 500}
                            onChange={(e) => {
                              setOperationSettings(prev => ({
                                ...prev,
                                loyaltyTiers: {
                                  ...prev.loyaltyTiers,
                                  silver: {
                                    ...prev.loyaltyTiers.silver,
                                    minSpent: Number(e.target.value)
                                  }
                                }
                              }));
                              setHasChanges(true);
                            }}
                          />
                          <HelpText>Total amount spent</HelpText>
                        </FormGroup>
                      </SettingsGrid>
                    </div>

                    {/* Gold Tier */}
                    <div style={{ marginBottom: '32px' }}>
                      <Label style={{ color: '#FFD700', fontWeight: 600, fontSize: '15px', marginBottom: '16px', display: 'block' }}>🥇 Gold Tier Requirements</Label>
                      <SettingsGrid>
                        <FormGroup>
                          <Label>Minimum Orders</Label>
                          <Input
                            type="number"
                            min="0"
                            value={operationSettings?.loyaltyTiers?.gold?.minOrders || 15}
                            onChange={(e) => {
                              setOperationSettings(prev => ({
                                ...prev,
                                loyaltyTiers: {
                                  ...prev.loyaltyTiers,
                                  gold: {
                                    ...prev.loyaltyTiers.gold,
                                    minOrders: Number(e.target.value)
                                  }
                                }
                              }));
                              setHasChanges(true);
                            }}
                          />
                          <HelpText>Number of completed orders</HelpText>
                        </FormGroup>
                        <FormGroup>
                          <Label>Minimum Spent ({currencySettings.currency})</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={operationSettings?.loyaltyTiers?.gold?.minSpent || 1500}
                            onChange={(e) => {
                              setOperationSettings(prev => ({
                                ...prev,
                                loyaltyTiers: {
                                  ...prev.loyaltyTiers,
                                  gold: {
                                    ...prev.loyaltyTiers.gold,
                                    minSpent: Number(e.target.value)
                                  }
                                }
                              }));
                              setHasChanges(true);
                            }}
                          />
                          <HelpText>Total amount spent</HelpText>
                        </FormGroup>
                      </SettingsGrid>
                    </div>

                    {/* VIP Tier */}
                    <div style={{ marginBottom: '24px' }}>
                      <Label style={{ color: '#9B59B6', fontWeight: 600, fontSize: '15px', marginBottom: '16px', display: 'block' }}>💎 VIP Tier Requirements</Label>
                      <SettingsGrid>
                        <FormGroup>
                          <Label>Minimum Orders</Label>
                          <Input
                            type="number"
                            min="0"
                            value={operationSettings?.loyaltyTiers?.vip?.minOrders || 30}
                            onChange={(e) => {
                              setOperationSettings(prev => ({
                                ...prev,
                                loyaltyTiers: {
                                  ...prev.loyaltyTiers,
                                  vip: {
                                    ...prev.loyaltyTiers.vip,
                                    minOrders: Number(e.target.value)
                                  }
                                }
                              }));
                              setHasChanges(true);
                            }}
                          />
                          <HelpText>Number of completed orders</HelpText>
                        </FormGroup>
                        <FormGroup>
                          <Label>Minimum Spent ({currencySettings.currency})</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            value={operationSettings?.loyaltyTiers?.vip?.minSpent || 3000}
                            onChange={(e) => {
                              setOperationSettings(prev => ({
                                ...prev,
                                loyaltyTiers: {
                                  ...prev.loyaltyTiers,
                                  vip: {
                                    ...prev.loyaltyTiers.vip,
                                    minSpent: Number(e.target.value)
                                  }
                                }
                              }));
                              setHasChanges(true);
                            }}
                          />
                          <HelpText>Total amount spent</HelpText>
                        </FormGroup>
                      </SettingsGrid>
                    </div>

                    <HelpText style={{ fontSize: '13px', marginTop: '16px' }}>
                      <strong>Note:</strong> Customers are automatically upgraded when they meet <strong>EITHER</strong> the minimum orders <strong>OR</strong> minimum spent requirement for a tier.
                    </HelpText>
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
                        setHasChanges(true);
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
                          setHasChanges(true);
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
                          <ToggleInput
                            type="checkbox"
                            checked={tableSettings.enableTableNumbers}
                            onChange={(e) => {
                              setTableSettings({...tableSettings, enableTableNumbers: e.target.checked});
                              setHasChanges(true);
                            }}
                          />
                          <ToggleSlider />
                        </ToggleSwitch>
                      </Toggle>
                      <HelpText>Allow customers to select table numbers when ordering</HelpText>
                    </FormGroup>
                    
                    <FormGroup>
                      <Toggle>
                        <ToggleLabel>Table Number Required</ToggleLabel>
                        <ToggleSwitch>
                          <ToggleInput
                            type="checkbox"
                            checked={tableSettings.tableNumberRequired}
                            onChange={(e) => {
                              setTableSettings({...tableSettings, tableNumberRequired: e.target.checked});
                              setHasChanges(true);
                            }}
                            disabled={!tableSettings.enableTableNumbers}
                          />
                          <ToggleSlider />
                        </ToggleSwitch>
                      </Toggle>
                      <HelpText>Make table number selection mandatory for dine-in orders</HelpText>
                    </FormGroup>
                  </div>
                  
                  <div>
                    <FormGroup>
                      <Label>Table Prefix</Label>
                      <Input
                        type="text"
                        value={tableSettings.tablePrefix}
                        onChange={(e) => {
                          setTableSettings({...tableSettings, tablePrefix: e.target.value});
                          setHasChanges(true);
                        }}
                        placeholder="e.g., T, TABLE"
                      />
                      <HelpText>Prefix for table numbers (e.g., T001, TABLE001)</HelpText>
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Number of Tables</Label>
                      <Input
                        type="number"
                        value={tableSettings.totalTables}
                        onChange={(e) => {
                          setTableSettings({...tableSettings, totalTables: parseInt(e.target.value) || 1});
                          setHasChanges(true);
                        }}
                        min="1"
                        max="999"
                      />
                    </FormGroup>
                  </div>
                </SettingsGrid>
                
                <FormGroup>
                  <Label>QR Code Base URL</Label>
                  <Input
                    type="text"
                    value={tableSettings.qrCodeBaseUrl}
                    onChange={(e) => {
                      setTableSettings({...tableSettings, qrCodeBaseUrl: e.target.value});
                      setHasChanges(true);
                    }}
                    placeholder="https://yourdomain.com"
                  />
                  <HelpText>Base URL for QR codes (usually your domain)</HelpText>
                </FormGroup>
                
                <button
                  onClick={handleGenerateQRCodes}
                  style={{
                    padding: '10px 20px',
                    background: '#E6EBF1',
                    color: '#0A2540',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    marginTop: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#D1D5DB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#E6EBF1';
                  }}
                >
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
                            <QRCodeCanvas
                              id={`qr-${table.id}`}
                              value={table.qrCode}
                              size={100}
                              level="M"
                              includeMargin={true}
                            />
                          </QRContainer>
                          <TableActions>
                            <ActionButton onClick={() => handleDownloadQR(table)}>
                              Download
                            </ActionButton>
                            <ActionButton onClick={() => handlePrintQR(table)}>
                              Print
                            </ActionButton>
                          </TableActions>
                        </TableItem>
                      );
                    })}
                  </TablesGrid>
                </div>
              </SettingsCard>
              </SettingsGrid>

              <SaveButtonContainer>
                <SaveButton onClick={handleSave} disabled={!hasChanges}>
                  {hasChanges ? 'Save Changes' : 'Saved'}
                </SaveButton>
                {saveStatus && (
                  <StatusMessage type={saveStatus.type}>
                    {saveStatus.message}
                  </StatusMessage>
                )}
              </SaveButtonContainer>
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
                <SaveButton onClick={handleSave} disabled={!hasChanges}>
                  {hasChanges ? 'Save Changes' : 'Saved'}
                </SaveButton>
                {saveStatus && (
                  <StatusMessage type={saveStatus.type}>
                    {saveStatus.message}
                  </StatusMessage>
                )}
              </SaveButtonContainer>
            </div>
          )}

          {activeTab === 'system' && (
            <SettingsCard>
              <CardTitle>System Configuration</CardTitle>
              <p style={{ color: '#6B7C93', marginBottom: '20px' }}>
                System settings will be implemented in the next phase.
              </p>

              <SaveButtonContainer>
                <SaveButton onClick={handleSave} disabled={!hasChanges}>
                  {hasChanges ? 'Save Changes' : 'Saved'}
                </SaveButton>
                {saveStatus && (
                  <StatusMessage type={saveStatus.type}>
                    {saveStatus.message}
                  </StatusMessage>
                )}
              </SaveButtonContainer>
            </SettingsCard>
          )}

          {activeTab === 'backup' && (
            <>
              <SettingsGrid>
                <SettingsCard>
                  <CardTitle>Automatic Backup</CardTitle>
                  <Toggle>
                    <ToggleLabel>Enable Auto Backup</ToggleLabel>
                    <ToggleSwitch>
                      <ToggleInput 
                        type="checkbox" 
                        defaultChecked
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </Toggle>
                  <FormGroup>
                    <Label>Backup Schedule</Label>
                    <Select defaultValue="daily">
                      <option value="daily">Daily at 2:00 AM</option>
                      <option value="weekly">Weekly on Sunday</option>
                      <option value="monthly">Monthly on 1st</option>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label>Retention Period</Label>
                    <Select defaultValue="30">
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="365">1 year</option>
                    </Select>
                    <HelpText>Older backups will be automatically deleted</HelpText>
                  </FormGroup>
                  <FormGroup>
                    <Label>Last Backup</Label>
                    <p style={{ color: '#0A2540', fontSize: '14px' }}>
                      August 5, 2025 at 2:00 AM
                    </p>
                    <HelpText>Backup completed successfully</HelpText>
                  </FormGroup>
                </SettingsCard>

                <SettingsCard>
                  <CardTitle>Manual Backup</CardTitle>
                  <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                    Create a backup of your entire system data including orders, customers, and settings.
                  </p>
                  <button
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#635BFF',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      marginBottom: '20px'
                    }}
                    onClick={() => alert('Backup started. You will receive an email when complete.')}
                  >
                    Create Backup Now
                  </button>
                  
                  <Divider />
                  
                  <CardTitle style={{ marginTop: '20px' }}>Restore from Backup</CardTitle>
                  <p style={{ color: '#DC2626', marginBottom: '16px', fontSize: '13px' }}>
                    ⚠️ Warning: Restoring will replace all current data
                  </p>
                  <FormGroup>
                    <Label>Select Backup</Label>
                    <Select>
                      <option>August 5, 2025 - 2:00 AM (Auto)</option>
                      <option>August 4, 2025 - 2:00 AM (Auto)</option>
                      <option>August 3, 2025 - 3:45 PM (Manual)</option>
                      <option>August 3, 2025 - 2:00 AM (Auto)</option>
                    </Select>
                  </FormGroup>
                  <button
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'white',
                      color: '#DC2626',
                      border: '1px solid #DC2626',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      if (window.confirm('Are you sure you want to restore? This will replace all current data.')) {
                        alert('Restore process started. The system will be unavailable for a few minutes.');
                      }
                    }}
                  >
                    Restore Selected Backup
                  </button>
                </SettingsCard>
              </SettingsGrid>

              <SettingsCard style={{ marginTop: '24px' }}>
                <CardTitle>Export Data</CardTitle>
                <p style={{ color: '#6B7C93', marginBottom: '20px', fontSize: '14px' }}>
                  Export specific data for external use or reporting.
                </p>
                <SettingsGrid>
                  <FormGroup>
                    <Label>Data Type</Label>
                    <Select>
                      <option>All Data</option>
                      <option>Orders Only</option>
                      <option>Customers Only</option>
                      <option>Menu Items</option>
                      <option>Sales Reports</option>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label>Date Range</Label>
                    <Select>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last year</option>
                      <option>All time</option>
                    </Select>
                  </FormGroup>
                </SettingsGrid>
                <button
                  style={{
                    padding: '8px 16px',
                    background: '#635BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    marginTop: '16px'
                  }}
                >
                  Export as CSV
                </button>
              </SettingsCard>

              <SaveButtonContainer>
                <SaveButton onClick={handleSave} disabled={!hasChanges}>
                  {hasChanges ? 'Save Changes' : 'Saved'}
                </SaveButton>
                {saveStatus && (
                  <StatusMessage type={saveStatus.type}>
                    {saveStatus.message}
                  </StatusMessage>
                )}
              </SaveButtonContainer>
            </>
          )}
        </Content>
      </SettingsContainer>
    </MainLayout>
  );
};

export default SettingsPage;