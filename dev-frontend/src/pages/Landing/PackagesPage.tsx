import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead from '../../components/Common/SEOHead';
import PhoneInput from '../../components/Common/PhoneInput';

// ─── Types ───────────────────────────────────────────────────────────

interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  decimals: number;
}

interface SetItem {
  productId: number;
  name: string;
  quantity: number;
  role_label?: string;
}

interface AddonProduct {
  id: number;
  name: string;
  sku: string;
  emoji: string | null;
  image_url: string | null;
  is_active: boolean;
  currency_prices: Record<string, number>;
  category: { id: number; name: string; emoji: string | null } | null;
}

interface Addon {
  id: number;
  set_product_id: number;
  addon_product_id: number;
  addon_label: string | null;
  max_quantity: number;
  is_inquiry_only: boolean;
  sort_order: number;
  addonProduct: AddonProduct;
}

interface Package {
  id: number;
  name: string;
  sku: string;
  emoji: string | null;
  image_url: string | null;
  description: string | null;
  is_set: boolean;
  is_active: boolean;
  set_items: SetItem[] | null;
  set_display_order: number;
  set_group: string | null;
  set_tier: string | null;
  set_use_case: string | null;
  set_setup_items: string[] | null;
  is_recommended: boolean;
  shipping_countries: string[] | null;
  currency_prices: Record<string, number>;
  category: { id: number; name: string; emoji: string | null } | null;
  addons: Addon[];
}

interface SupportedCountry {
  code: string;
  name: string;
  currency: string;
  flag: string;
}

// ─── Constants ───────────────────────────────────────────────────────

const countryToCurrency: Record<string, string> = {
  'KR': 'KRW', 'MY': 'MYR', 'SG': 'SGD', 'JP': 'JPY',
  'CN': 'CNY', 'TW': 'TWD', 'TH': 'THB', 'VN': 'VND',
  'PH': 'PHP', 'ID': 'IDR', 'IN': 'INR', 'AU': 'AUD',
  'GB': 'GBP', 'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR',
  'ES': 'EUR', 'NL': 'EUR', 'US': 'USD', 'CA': 'CAD',
};

const ZERO_DECIMAL_CURRENCIES = ['KRW', 'JPY', 'VND', 'IDR', 'TWD'];

type SetGroup = 'tablet' | 'monitor';

// ─── Styled Components ──────────────────────────────────────────────

const PageContainer = styled.div`
  background: #F8F9FC;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 28px;
    padding: 0 8px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 650px;
  margin: 6px auto 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 8px;
  }
`;

const CountriesBanner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px 0;
`;

const CountriesBannerInner = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const CountriesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  font-size: 15px;
  color: #0A2540;
  font-weight: 600;
`;

const CountryItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const SoftwareNote = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0;
  line-height: 1.5;

  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 600;
    &:hover { text-decoration: underline; }
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const CurrencyBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
`;

const CurrencyLabel = styled.span`
  font-size: 14px;
  color: #6B7C93;
`;

const CurrencySelect = styled.select`
  padding: 10px 16px;
  font-size: 14px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  min-width: 160px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const SectionSubtitle = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`;

// ─── Group Selection ─────────────────────────────────────────────────

const GroupGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 48px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const GroupCard = styled.div<{ selected: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 32px;
  border: 2px solid ${props => props.selected ? '#635BFF' : '#E6EBF1'};
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  opacity: ${props => props.selected ? 1 : 0.85};

  ${props => props.selected && `
    box-shadow: 0 8px 24px rgba(99, 91, 255, 0.15);
  `}

  &:hover {
    border-color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    opacity: 1;
  }
`;

const GroupIcon = styled.div`
  margin-bottom: 16px;

  svg {
    width: 56px;
    height: 56px;
    stroke: #635BFF;
    stroke-width: 1.5;
    fill: none;
  }
`;

const GroupName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const GroupDesc = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
`;

// ─── Package Cards ──────────────────────────────────────────────────

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 450px;
    margin: 0 auto 48px;
  }
`;

const PackageCard = styled.div<{ selected: boolean; recommended?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 28px;
  border: 2px solid ${props => props.selected ? '#635BFF' : props.recommended ? '#635BFF' : '#E6EBF1'};
  position: relative;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${props => (props.selected || props.recommended) && `
    box-shadow: 0 8px 24px rgba(99, 91, 255, 0.15);
  `}

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
`;

const RecommendedBadge = styled.div`
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: #635BFF;
  color: white;
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

const SelectedCheck = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
`;

const PackageName = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
  text-align: center;
`;

const PackageUseCase = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 20px 0;
  text-align: center;
  min-height: 40px;
  line-height: 1.4;
`;

const PackagePriceSection = styled.div`
  text-align: center;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const PackagePrice = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #059669;
`;

const PackageCurrencySymbol = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #6B7280;
  margin-right: 4px;
`;

const SubscriptionNotice = styled.div`
  font-size: 11px;
  color: #9CA3AF;
  margin-top: 6px;
  line-height: 1.4;

  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 600;
    &:hover { text-decoration: underline; }
  }
`;

const EquipmentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
  flex: 1;
`;

const EquipmentItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  font-size: 13px;
  color: #374151;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const EquipmentRole = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #635BFF;
  background: #F0F0FF;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
`;

const EquipmentQty = styled.span`
  font-size: 12px;
  color: #6B7280;
  margin-left: auto;
  white-space: nowrap;
`;

const SetupTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 12px 0 8px 0;
`;

const SetupItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  font-size: 13px;
  color: #374151;
`;

const SetupCheck = styled.span`
  color: #10B981;
  font-weight: bold;
  font-size: 14px;
`;

const SelectPackageButton = styled.button<{ selected: boolean }>`
  width: 100%;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.selected ? '#635BFF' : 'white'};
  color: ${props => props.selected ? 'white' : '#635BFF'};
  border: 2px solid #635BFF;
  margin-top: auto;

  &:hover {
    background: ${props => props.selected ? '#5A51E6' : '#F0F4FF'};
  }
`;

// ─── Addons Section ─────────────────────────────────────────────────

const AddonsContainer = styled.div<{ disabled: boolean }>`
  position: relative;
  margin-bottom: 120px;

  ${props => props.disabled && `
    opacity: 0.5;
    pointer-events: none;
  `}
`;

const AddonsOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(248, 249, 252, 0.7);
  border-radius: 16px;
  z-index: 2;
`;

const AddonsOverlayText = styled.div`
  background: white;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #6B7280;
  border: 1px solid #E6EBF1;
`;

const AddonGroupTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 12px 0;

  &:first-of-type {
    margin-top: 0;
  }
`;

const AddonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AddonRow = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  border: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: border-color 0.2s;

  &:hover {
    border-color: #C4C1FF;
  }
`;

const AddonEmoji = styled.span`
  font-size: 28px;
  width: 40px;
  text-align: center;
  flex-shrink: 0;
`;

const AddonInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const AddonName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const AddonPrice = styled.div`
  font-size: 13px;
  color: #059669;
  font-weight: 600;
  margin-top: 2px;
`;

const InquiryLabel = styled.div`
  font-size: 13px;
  color: #6B7280;
  font-style: italic;
`;

const QtyControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const QtyButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  background: white;
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    background: #F0F0FF;
    border-color: #635BFF;
  }

  &:disabled {
    color: #D1D5DB;
    cursor: not-allowed;
    &:hover {
      background: white;
      border-color: #E6EBF1;
    }
  }
`;

const QtyValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  min-width: 24px;
  text-align: center;
`;

// ─── Sticky Quote Bar ───────────────────────────────────────────────

const StickyBar = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #E6EBF1;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  padding: 16px 24px;
  z-index: 100;
  transform: translateY(${props => props.visible ? '0' : '100%'});
  transition: transform 0.3s ease;
`;

const StickyContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const StickyLeft = styled.div`
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StickyPackageName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StickyAddonsList = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StickyRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const StickyPriceBreakdown = styled.div`
  text-align: right;
`;

const StickyTotal = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: #059669;
`;

const StickyBreakdown = styled.div`
  font-size: 11px;
  color: #6B7280;
  margin-top: 2px;
`;

const QuoteButton = styled.button`
  background: #635BFF;
  color: white;
  border: none;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: auto;
    flex-shrink: 0;
  }
`;

// ─── Modal ──────────────────────────────────────────────────────────

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 24px 0;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const Required = styled.span`
  color: #EF4444;
  margin-left: 2px;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid ${props => props.hasError ? '#EF4444' : '#E6EBF1'};
  border-radius: 8px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#EF4444' : '#635BFF'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 91, 255, 0.1)'};
  }
`;

const FieldError = styled.span`
  font-size: 12px;
  color: #EF4444;
  margin-top: -4px;
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  min-height: 80px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: #635BFF;
  color: white;
  border: none;
  padding: 14px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #B0BEC5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: white;
  color: #6B7280;
  border: 1px solid #E6EBF1;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F8F9FC;
  }
`;

const ModalButtonRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const SuccessMessage = styled.div`
  background: #ECFDF5;
  border: 1px solid #10B981;
  border-radius: 8px;
  padding: 24px;
  color: #065F46;
  text-align: center;
  line-height: 1.6;
`;

const ErrorMessage = styled.div`
  background: #FEF2F2;
  border: 1px solid #EF4444;
  border-radius: 8px;
  padding: 16px;
  color: #991B1B;
  text-align: center;
  font-size: 14px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
  font-size: 16px;
  line-height: 1.6;

  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
  font-size: 16px;
`;

// ─── Component ──────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const PackagesPage: React.FC = () => {
  // Data
  const [packages, setPackages] = useState<Package[]>([]);
  const [currencies, setCurrencies] = useState<CurrencyInfo[]>([]);
  const [supportedCountries, setSupportedCountries] = useState<SupportedCountry[]>([]);
  const [loading, setLoading] = useState(true);

  // Selection
  const [selectedGroup, setSelectedGroup] = useState<SetGroup | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [addonQuantities, setAddonQuantities] = useState<Record<number, number>>({});

  // Currency
  const [selectedCurrency, setSelectedCurrency] = useState('MYR');
  const [detectedCountry, setDetectedCountry] = useState('');

  // Modal
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    company_address: '',
    tax_id: '',
    wants_invoice: false,
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});

  // ─── Currency Detection ─────────────────────────────────────────

  const detectCurrencyFromBrowserLanguage = (): string => {
    try {
      const locale = navigator.language || 'en-US';
      const regionCode = locale.split('-')[1]?.toUpperCase() || '';
      return countryToCurrency[regionCode] || 'MYR';
    } catch {
      return 'USD';
    }
  };

  const detectCountryAndCurrency = useCallback(async (): Promise<{ country: string; currency: string }> => {
    try {
      const response = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(3000),
      });
      if (!response.ok) throw new Error('IP API failed');
      const data = await response.json();
      const country = data.country_code?.toUpperCase() || '';
      const currency = countryToCurrency[country] || 'USD';
      return { country, currency };
    } catch {
      return { country: '', currency: detectCurrencyFromBrowserLanguage() };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Data Loading ───────────────────────────────────────────────

  useEffect(() => {
    const init = async () => {
      const { country, currency } = await detectCountryAndCurrency();
      setDetectedCountry(country);

      // Load supported countries
      try {
        const res = await fetch('/api/currencies/countries/supported');
        if (res.ok) {
          const data = await res.json();
          setSupportedCountries(data.data || []);
        }
      } catch (err) {
        console.error('Failed to load supported countries:', err);
      }

      // Load currencies
      let loadedCurrencies: CurrencyInfo[] = [];
      try {
        const res = await fetch('/api/currencies/supported');
        if (res.ok) {
          const data = await res.json();
          loadedCurrencies = data.data || [];
        }
      } catch (err) {
        console.error('Failed to load currencies:', err);
      }

      if (loadedCurrencies.length === 0) {
        loadedCurrencies = [
          { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', decimals: 2 },
          { code: 'KRW', symbol: '\u20A9', name: 'Korean Won', decimals: 0 },
        ];
      }
      setCurrencies(loadedCurrencies);

      const isSupported = loadedCurrencies.some(c => c.code === currency);
      setSelectedCurrency(isSupported ? currency : loadedCurrencies[0].code);

      // Load packages
      try {
        const countryParam = country ? `?country=${country}` : '';
        const res = await fetch(`/api/public/packages${countryParam}`);
        if (res.ok) {
          const data = await res.json();
          setPackages(data.data || []);
        }
      } catch (err) {
        console.error('Failed to load packages:', err);
      }
      setLoading(false);
    };

    init();
  }, [detectCountryAndCurrency]);

  // ─── Helpers ────────────────────────────────────────────────────

  const getCurrencyInfo = (code: string): CurrencyInfo => {
    return currencies.find(c => c.code === code) || { code, symbol: code, name: code, decimals: 2 };
  };

  const formatPrice = (price: number, currency: string): string => {
    const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.includes(currency);
    if (isZeroDecimal) {
      return Math.round(price).toLocaleString('en-US');
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getPackagePrice = (pkg: Package): number => {
    return pkg.currency_prices[selectedCurrency] || 0;
  };

  const getAddonPrice = (addon: Addon): number => {
    return addon.addonProduct.currency_prices[selectedCurrency] || 0;
  };

  // ─── Form Validation ──────────────────────────────────────────

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    return errors;
  };

  const isFormValid = formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    EMAIL_REGEX.test(formData.email.trim()) &&
    formData.phone.trim() !== '';

  // ─── Derived Data ──────────────────────────────────────────────

  const groupPackages = selectedGroup
    ? packages.filter(p => p.set_group === selectedGroup)
    : [];

  const availableAddons: Addon[] = selectedPackage?.addons || [];

  // Group addons by category name, deduplicated by product ID
  const addonsByCategory: Record<string, Addon[]> = {};
  const seenProductIds = new Set<number>();
  availableAddons.forEach(addon => {
    const productId = addon.addonProduct.id;
    if (seenProductIds.has(productId)) return;
    seenProductIds.add(productId);
    const categoryName = addon.addonProduct.category?.name || 'Additional Equipment';
    if (!addonsByCategory[categoryName]) addonsByCategory[categoryName] = [];
    addonsByCategory[categoryName].push(addon);
  });

  // Calculate totals
  const packagePrice = selectedPackage ? getPackagePrice(selectedPackage) : 0;
  let addonTotal = 0;
  const addonSummaryItems: string[] = [];

  // Use deduplicated addons for total calculation
  const deduplicatedAddons = Object.values(addonsByCategory).flat();
  deduplicatedAddons.forEach(addon => {
    const qty = addonQuantities[addon.addonProduct.id] || 0;
    if (qty > 0) {
      addonTotal += getAddonPrice(addon) * qty;
      addonSummaryItems.push(`${addon.addonProduct.name} x${qty}`);
    }
  });

  const totalAmount = packagePrice + addonTotal;
  const currencyInfo = getCurrencyInfo(selectedCurrency);

  // ─── Event Handlers ───────────────────────────────────────────

  const handleGroupSelect = (group: SetGroup) => {
    setSelectedGroup(group);
    setSelectedPackage(null);
    setAddonQuantities({});
  };

  const handlePackageSelect = (pkg: Package) => {
    if (selectedPackage?.id === pkg.id) {
      setSelectedPackage(null);
      setAddonQuantities({});
    } else {
      setSelectedPackage(pkg);
      setAddonQuantities({});
    }
  };

  const handleAddonQty = (productId: number, delta: number, maxQty: number) => {
    setAddonQuantities(prev => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      const limited = maxQty > 0 ? Math.min(next, maxQty) : next;
      return { ...prev, [productId]: limited };
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change if field was touched
    if (formTouched[name]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  };

  const handleFieldBlur = (fieldName: string) => {
    setFormTouched(prev => ({ ...prev, [fieldName]: true }));
    // Validate single field on blur
    const errors = validateForm();
    if (errors[fieldName as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [fieldName]: errors[fieldName as keyof FormErrors] }));
    } else {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[fieldName as keyof FormErrors];
        return next;
      });
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;

    // Validate all fields
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormTouched({ name: true, email: true, phone: true });
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    const addonItems = deduplicatedAddons
      .filter(a => (addonQuantities[a.addonProduct.id] || 0) > 0)
      .map(a => ({
        product_id: a.addonProduct.id,
        name: a.addonProduct.name,
        quantity: addonQuantities[a.addonProduct.id],
        unit_price: getAddonPrice(a),
        total_price: getAddonPrice(a) * (addonQuantities[a.addonProduct.id] || 0),
      }));

    const body = {
      contact_name: formData.name.trim(),
      contact_email: formData.email.trim(),
      contact_phone: formData.phone || null,
      company_name: formData.company_name || null,
      company_address: formData.company_address || null,
      tax_id: formData.tax_id || null,
      wants_invoice: formData.wants_invoice,
      message: formData.message || null,
      country_code: detectedCountry || null,
      currency: selectedCurrency,
      package_product_id: selectedPackage.id,
      package_snapshot: {
        name: selectedPackage.name,
        set_group: selectedPackage.set_group,
        set_items: selectedPackage.set_items,
        set_setup_items: selectedPackage.set_setup_items,
      },
      addon_items: addonItems,
      package_price: packagePrice,
      addon_total: addonTotal,
      total_amount: totalAmount,
    };

    try {
      const response = await fetch('/api/public/hardware-quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setQuoteSubmitted(true);
      } else {
        const data = await response.json();
        setSubmitError(data.message || 'Failed to submit quote. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowQuoteModal(false);
    setQuoteSubmitted(false);
    setSubmitError('');
    setFormData({ name: '', email: '', phone: '', company_name: '', message: '' });
    setFormErrors({});
    setFormTouched({});
  };

  // ─── Render ────────────────────────────────────────────────────

  const hasPackages = packages.length > 0;

  return (
    <LandingLayout>
      <SEOHead
        title="POS Hardware Packages - PurpleHere"
        description="Choose the right POS hardware setup for your restaurant. Select a package, add extra equipment, and get an instant quote."
        keywords="POS hardware, restaurant hardware, tablet POS, kitchen display monitor, POS package"
        canonicalUrl="https://purplehere.com/packages"
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>POS Hardware Packages</HeroTitle>
          <HeroSubtitle>
            Choose the right hardware setup for your restaurant. Select a package, add extra equipment, and get an instant quote.
          </HeroSubtitle>
        </HeroSection>

        {/* Supported Countries Banner */}
        {supportedCountries.length > 0 && (
          <CountriesBanner>
            <CountriesBannerInner>
              <CountriesList>
                <span style={{ color: '#6B7280', fontWeight: 500 }}>Available in:</span>
                {supportedCountries.map(c => (
                  <CountryItem key={c.code}>
                    {c.flag} {c.name}
                  </CountryItem>
                ))}
              </CountriesList>
              <SoftwareNote>
                Don't need hardware? You can subscribe to our software and use your own devices and printers.{' '}
                <Link to="/pricing">View Plans &rarr;</Link>
              </SoftwareNote>
            </CountriesBannerInner>
          </CountriesBanner>
        )}

        <ContentSection>
          {/* Currency Selector */}
          <CurrencyBar>
            <CurrencyLabel>Currency:</CurrencyLabel>
            <CurrencySelect
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code} - {c.name}
                </option>
              ))}
            </CurrencySelect>
          </CurrencyBar>

          {loading ? (
            <LoadingText>Loading packages...</LoadingText>
          ) : !hasPackages ? (
            <EmptyMessage>
              Hardware packages are not yet available in your region.<br />
              Please <Link to="/contact">contact us</Link> for a custom quote.
            </EmptyMessage>
          ) : (
            <>
              {/* Step 1: Group Selection */}
              <SectionTitle>1. Choose Your Setup Type</SectionTitle>
              <SectionSubtitle>Select the type of hardware configuration for your restaurant.</SectionSubtitle>
              <GroupGrid>
                <GroupCard
                  selected={selectedGroup === 'tablet'}
                  onClick={() => handleGroupSelect('tablet')}
                >
                  <GroupIcon>
                    <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                      <rect x="10" y="4" width="36" height="48" rx="4" />
                      <line x1="24" y1="46" x2="32" y2="46" />
                    </svg>
                  </GroupIcon>
                  <GroupName>All Tablet</GroupName>
                  <GroupDesc>POS, kitchen display, and customer screen all run on tablets. Compact, portable, and quick to set up.</GroupDesc>
                </GroupCard>
                <GroupCard
                  selected={selectedGroup === 'monitor'}
                  onClick={() => handleGroupSelect('monitor')}
                >
                  <GroupIcon>
                    <svg viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="6" width="48" height="34" rx="3" />
                      <line x1="28" y1="40" x2="28" y2="48" />
                      <line x1="18" y1="48" x2="38" y2="48" />
                    </svg>
                  </GroupIcon>
                  <GroupName>Tablet + Touchscreen</GroupName>
                  <GroupDesc>POS runs on a tablet, but the kitchen uses a 15"+ touchscreen monitor for better visibility across larger kitchens with multiple staff.</GroupDesc>
                </GroupCard>
              </GroupGrid>

              {/* Step 2: Package Selection */}
              {selectedGroup && (
                <>
                  <SectionTitle>2. Select a Package</SectionTitle>
                  <SectionSubtitle>Pick the package that best fits your restaurant's needs.</SectionSubtitle>
                  {groupPackages.length === 0 ? (
                    <EmptyMessage>
                      No packages available for this setup type yet.<br />
                      Please <Link to="/contact">contact us</Link> for a custom quote.
                    </EmptyMessage>
                  ) : (
                    <PackagesGrid>
                      {groupPackages.map(pkg => {
                        const isSelected = selectedPackage?.id === pkg.id;
                        const price = getPackagePrice(pkg);
                        const items = pkg.set_items || [];
                        const setupItems = pkg.set_setup_items || [];

                        return (
                          <PackageCard
                            key={pkg.id}
                            selected={isSelected}
                            recommended={pkg.is_recommended}
                            onClick={() => handlePackageSelect(pkg)}
                          >
                            {pkg.is_recommended && <RecommendedBadge>RECOMMENDED</RecommendedBadge>}
                            {isSelected && <SelectedCheck>&#x2713;</SelectedCheck>}
                            <PackageName>{pkg.name}</PackageName>
                            {pkg.set_use_case && (
                              <PackageUseCase>{pkg.set_use_case}</PackageUseCase>
                            )}

                            <PackagePriceSection>
                              {price > 0 ? (
                                <>
                                  <PackagePrice>
                                    <PackageCurrencySymbol>{currencyInfo.symbol}</PackageCurrencySymbol>
                                    {formatPrice(price, selectedCurrency)}
                                  </PackagePrice>
                                  <SubscriptionNotice>
                                    * Software subscription charged separately.{' '}
                                    <Link to="/pricing">View Plans &rarr;</Link>
                                  </SubscriptionNotice>
                                </>
                              ) : (
                                <PackagePrice style={{ color: '#0A2540' }}>Contact Us</PackagePrice>
                              )}
                            </PackagePriceSection>

                            {items.length > 0 && (
                              <>
                                <SetupTitle>Included Equipment</SetupTitle>
                                <EquipmentList>
                                  {items.map((item, idx) => (
                                    <EquipmentItem key={idx}>
                                      {item.role_label && <EquipmentRole>{item.role_label}</EquipmentRole>}
                                      <span>{item.name}</span>
                                      <EquipmentQty>x{item.quantity}</EquipmentQty>
                                    </EquipmentItem>
                                  ))}
                                </EquipmentList>
                              </>
                            )}

                            {setupItems.length > 0 && (
                              <>
                                <SetupTitle>Included Setup</SetupTitle>
                                {setupItems.map((item, idx) => (
                                  <SetupItem key={idx}>
                                    <SetupCheck>&#x2713;</SetupCheck>
                                    {item}
                                  </SetupItem>
                                ))}
                              </>
                            )}

                            <div style={{ height: 16 }} />
                            <SelectPackageButton selected={isSelected}>
                              {isSelected ? 'Selected' : 'Select This Package'}
                            </SelectPackageButton>
                          </PackageCard>
                        );
                      })}
                    </PackagesGrid>
                  )}
                </>
              )}

              {/* Step 3: Additional Equipment */}
              {selectedGroup && (
                <>
                  <SectionTitle>3. Additional Equipment</SectionTitle>
                  <SectionSubtitle>Add extra hardware to your package as needed.</SectionSubtitle>
                  <AddonsContainer disabled={!selectedPackage}>
                    {!selectedPackage && (
                      <AddonsOverlay>
                        <AddonsOverlayText>Select a package first</AddonsOverlayText>
                      </AddonsOverlay>
                    )}
                    {Object.keys(addonsByCategory).length === 0 && selectedPackage && (
                      <div style={{ textAlign: 'center', padding: '32px', color: '#6B7280' }}>
                        No additional equipment available for this package.
                      </div>
                    )}
                    {Object.entries(addonsByCategory).map(([categoryName, addons]) => (
                      <div key={categoryName}>
                        <AddonGroupTitle>{categoryName}</AddonGroupTitle>
                        <AddonsGrid>
                          {addons.map(addon => {
                            const price = getAddonPrice(addon);
                            const qty = addonQuantities[addon.addonProduct.id] || 0;

                            return (
                              <AddonRow key={addon.addonProduct.id}>
                                <AddonEmoji>
                                  {addon.addonProduct.emoji || addon.addonProduct.category?.emoji || '\uD83D\uDCE6'}
                                </AddonEmoji>
                                <AddonInfo>
                                  <AddonName>{addon.addonProduct.name}</AddonName>
                                  {addon.is_inquiry_only ? (
                                    <InquiryLabel>Contact for pricing</InquiryLabel>
                                  ) : price > 0 ? (
                                    <AddonPrice>
                                      {currencyInfo.symbol} {formatPrice(price, selectedCurrency)}
                                    </AddonPrice>
                                  ) : (
                                    <InquiryLabel>Contact for pricing</InquiryLabel>
                                  )}
                                </AddonInfo>
                                {addon.is_inquiry_only ? null : (
                                  <QtyControl>
                                    <QtyButton
                                      disabled={qty <= 0}
                                      onClick={() => handleAddonQty(addon.addonProduct.id, -1, addon.max_quantity)}
                                    >
                                      -
                                    </QtyButton>
                                    <QtyValue>{qty}</QtyValue>
                                    <QtyButton
                                      disabled={addon.max_quantity > 0 && qty >= addon.max_quantity}
                                      onClick={() => handleAddonQty(addon.addonProduct.id, 1, addon.max_quantity)}
                                    >
                                      +
                                    </QtyButton>
                                  </QtyControl>
                                )}
                              </AddonRow>
                            );
                          })}
                        </AddonsGrid>
                      </div>
                    ))}
                    {/* Spacer when no addons to keep overlay visible */}
                    {!selectedPackage && Object.keys(addonsByCategory).length === 0 && (
                      <div style={{ minHeight: 120 }} />
                    )}
                  </AddonsContainer>
                </>
              )}
            </>
          )}
        </ContentSection>

        {/* Sticky Quote Summary Bar */}
        <StickyBar visible={selectedPackage !== null}>
          <StickyContent>
            <StickyLeft>
              <StickyPackageName>
                {selectedPackage?.name || ''}
              </StickyPackageName>
              {addonSummaryItems.length > 0 && (
                <StickyAddonsList>
                  + {addonSummaryItems.join(', ')}
                </StickyAddonsList>
              )}
            </StickyLeft>
            <StickyRight>
              <StickyPriceBreakdown>
                <StickyTotal>
                  {currencyInfo.symbol} {formatPrice(totalAmount, selectedCurrency)}
                </StickyTotal>
                {addonTotal > 0 && (
                  <StickyBreakdown>
                    Package {currencyInfo.symbol}{formatPrice(packagePrice, selectedCurrency)}
                    {' + '}
                    Addons {currencyInfo.symbol}{formatPrice(addonTotal, selectedCurrency)}
                  </StickyBreakdown>
                )}
              </StickyPriceBreakdown>
              <QuoteButton onClick={() => setShowQuoteModal(true)}>
                Request Quote
              </QuoteButton>
            </StickyRight>
          </StickyContent>
        </StickyBar>

        {/* Quote Request Modal */}
        {showQuoteModal && (
          <ModalOverlay onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
            <ModalContent>
              <ModalTitle>Request a Quote</ModalTitle>

              {quoteSubmitted ? (
                <>
                  <SuccessMessage>
                    Your quote request has been submitted! We'll contact you within 1-2 business days.
                  </SuccessMessage>
                  <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <CancelButton onClick={closeModal}>Close</CancelButton>
                  </div>
                </>
              ) : (
                <ModalForm onSubmit={handleQuoteSubmit}>
                  {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

                  <FormGroup>
                    <Label>Name<Required>*</Required></Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      onBlur={() => handleFieldBlur('name')}
                      hasError={!!formErrors.name}
                      placeholder="Your name"
                    />
                    {formErrors.name && <FieldError>{formErrors.name}</FieldError>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Email<Required>*</Required></Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      onBlur={() => handleFieldBlur('email')}
                      hasError={!!formErrors.email}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && <FieldError>{formErrors.email}</FieldError>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Phone<Required>*</Required></Label>
                    <PhoneInput
                      value={formData.phone}
                      onChange={(value) => {
                        setFormData(prev => ({ ...prev, phone: value }));
                        if (formTouched.phone) {
                          if (!value.trim()) {
                            setFormErrors(prev => ({ ...prev, phone: 'Phone number is required' }));
                          } else {
                            setFormErrors(prev => {
                              const next = { ...prev };
                              delete next.phone;
                              return next;
                            });
                          }
                        }
                      }}
                      onBlur={() => handleFieldBlur('phone')}
                      required
                    />
                    {formErrors.phone && <FieldError>{formErrors.phone}</FieldError>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Company Name</Label>
                    <Input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleFormChange}
                      placeholder="Your company or restaurant name"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#374151' }}>
                      <input
                        type="checkbox"
                        checked={formData.wants_invoice}
                        onChange={(e) => setFormData(prev => ({ ...prev, wants_invoice: e.target.checked }))}
                        style={{ width: '18px', height: '18px', accentColor: '#635BFF' }}
                      />
                      I need a formal invoice
                    </label>
                  </FormGroup>

                  {formData.wants_invoice && (
                    <>
                      <FormGroup>
                        <Label>Company Address <span style={{ color: '#DC2626' }}>*</span></Label>
                        <TextArea
                          name="company_address"
                          value={formData.company_address}
                          onChange={handleFormChange}
                          placeholder="Full company address for invoice"
                          rows={2}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Tax ID / Registration Number</Label>
                        <Input
                          type="text"
                          name="tax_id"
                          value={formData.tax_id}
                          onChange={handleFormChange}
                          placeholder="Business registration or tax ID"
                        />
                      </FormGroup>
                    </>
                  )}

                  <FormGroup>
                    <Label>Message</Label>
                    <TextArea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Any specific requirements or questions..."
                    />
                  </FormGroup>

                  {/* Quote Summary in Modal */}
                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: 8,
                    padding: 16,
                    fontSize: 13,
                    color: '#374151',
                  }}>
                    <div style={{ fontWeight: 700, marginBottom: 8 }}>Quote Summary</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span>{selectedPackage?.name}</span>
                      <span>{currencyInfo.symbol} {formatPrice(packagePrice, selectedCurrency)}</span>
                    </div>
                    {addonSummaryItems.map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, color: '#6B7280' }}>
                        <span>{item}</span>
                      </div>
                    ))}
                    {addonTotal > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span>Addon Total</span>
                        <span>{currencyInfo.symbol} {formatPrice(addonTotal, selectedCurrency)}</span>
                      </div>
                    )}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderTop: '1px solid #E6EBF1',
                      paddingTop: 8,
                      marginTop: 8,
                      fontWeight: 700,
                      color: '#059669',
                    }}>
                      <span>Total</span>
                      <span>{currencyInfo.symbol} {formatPrice(totalAmount, selectedCurrency)}</span>
                    </div>
                  </div>

                  <ModalButtonRow>
                    <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
                    <SubmitButton type="submit" disabled={submitting || !isFormValid}>
                      {submitting ? 'Submitting...' : 'Submit Quote Request'}
                    </SubmitButton>
                  </ModalButtonRow>
                </ModalForm>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </PageContainer>
    </LandingLayout>
  );
};

export default PackagesPage;
