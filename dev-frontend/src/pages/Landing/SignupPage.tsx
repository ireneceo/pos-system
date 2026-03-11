import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { LandingLayout } from '../../components/Landing';

// ─── Types ───────────────────────────────────────────────────────
interface Plan {
  id: number;
  name: string;
  display_name: string;
  base_price_monthly: number;
  base_price_annual: number;
  plan_target: string;
  features: string[];
  order_limit: number;
  menu_item_limit: number;
  staff_limit: number;
  restaurant_limit: number;
  manager_limit: number;
  included_modules: string[];
  currency_prices?: Record<string, { monthly: number; annual: number }>;
}

interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  decimals: number;
}

type AccountRole = 'Restaurant Admin' | 'Brand General' | 'Foodcourt General' | 'Restaurant Owner';

interface FormData {
  // Step 1
  role: AccountRole | '';
  // Step 2
  full_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  phone: string;
  // Step 3
  restaurant_name: string;
  restaurant_address: string;
  restaurant_phone: string;
  restaurant_email: string;
  brand_name: string;
  foodcourt_name: string;
  foodcourt_address: string;
  company_name: string;
  plan_id: number | null;
  billing_cycle: 'monthly' | 'annual';
}

// Country code → currency mapping for IP detection
const countryToCurrency: Record<string, string> = {
  'KR': 'KRW', 'MY': 'MYR', 'SG': 'SGD', 'JP': 'JPY', 'CN': 'CNY',
  'TW': 'TWD', 'TH': 'THB', 'VN': 'VND', 'PH': 'PHP', 'ID': 'IDR',
  'IN': 'INR', 'AU': 'AUD', 'GB': 'GBP', 'DE': 'EUR', 'FR': 'EUR',
  'IT': 'EUR', 'ES': 'EUR', 'NL': 'EUR', 'US': 'USD', 'CA': 'CAD',
};

// SVG line-style icons for role cards
const RestaurantIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <path d="M9 21v-4h6v4" />
    <path d="M9 10h1" />
    <path d="M14 10h1" />
    <path d="M9 14h1" />
    <path d="M14 14h1" />
  </svg>
);

const BrandIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

const FoodcourtIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l9-9 9 9" />
    <path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
    <path d="M9 21v-6h6v6" />
    <circle cx="12" cy="14" r="1" />
  </svg>
);

const OwnerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="10" cy="7" r="4" />
    <path d="M19 8v6" />
    <path d="M22 11h-6" />
  </svg>
);

const ROLE_CONFIG: Record<AccountRole, {
  icon: React.FC;
  title: string;
  subtitle: string;
  planTarget: string;
}> = {
  'Restaurant Admin': {
    icon: RestaurantIcon,
    title: 'Restaurant',
    subtitle: 'Manage a single restaurant with full POS features',
    planTarget: 'restaurant'
  },
  'Brand General': {
    icon: BrandIcon,
    title: 'Brand',
    subtitle: 'Manage your brand and franchise restaurants',
    planTarget: 'brand'
  },
  'Foodcourt General': {
    icon: FoodcourtIcon,
    title: 'Food Court',
    subtitle: 'Manage a food court and tenant restaurants',
    planTarget: 'foodcourt'
  },
  'Restaurant Owner': {
    icon: OwnerIcon,
    title: 'Owner',
    subtitle: 'Own and oversee multiple restaurants',
    planTarget: 'owner'
  }
};

const INITIAL_FORM: FormData = {
  role: '',
  full_name: '',
  email: '',
  username: '',
  password: '',
  confirm_password: '',
  phone: '',
  restaurant_name: '',
  restaurant_address: '',
  restaurant_phone: '',
  restaurant_email: '',
  brand_name: '',
  foodcourt_name: '',
  foodcourt_address: '',
  company_name: '',
  plan_id: null,
  billing_cycle: 'monthly'
};

// ─── Session Storage helpers ─────────────────────────────────────
const STORAGE_KEY = 'signup_draft';

const saveDraft = (form: FormData, step: number, currency: string) => {
  try {
    // Exclude passwords from storage
    const { password, confirm_password, ...safe } = form;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ form: safe, step, currency, ts: Date.now() }));
  } catch { /* quota exceeded – ignore */ }
};

const loadDraft = (): { form: Partial<FormData>; step: number; currency: string } | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Expire after 30 minutes
    if (Date.now() - data.ts > 30 * 60 * 1000) {
      sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch { return null; }
};

const clearDraft = () => { sessionStorage.removeItem(STORAGE_KEY); };

// ─── Component ───────────────────────────────────────────────────
const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Restore draft on mount
  const draft = loadDraft();
  const [step, setStep] = useState(draft?.step || 1);
  const [form, setForm] = useState<FormData>({ ...INITIAL_FORM, ...draft?.form });
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currencies, setCurrencies] = useState<CurrencyInfo[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState(draft?.currency || 'USD');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // IP-based currency detection
  const detectCurrencyFromIP = async (): Promise<string> => {
    try {
      const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
      if (!res.ok) throw new Error('IP API failed');
      const data = await res.json();
      const cc = data.country_code?.toUpperCase();
      return (cc && countryToCurrency[cc]) || 'USD';
    } catch {
      try {
        const locale = navigator.language || 'en-US';
        const region = locale.split('-')[1]?.toUpperCase() || '';
        return countryToCurrency[region] || 'USD';
      } catch { return 'USD'; }
    }
  };

  // Pre-fill from PricingPage navigation state
  useEffect(() => {
    const state = location.state as any;
    if (state?.plan_target) {
      const roleMap: Record<string, AccountRole> = {
        restaurant: 'Restaurant Admin',
        brand: 'Brand General',
        foodcourt: 'Foodcourt General',
        owner: 'Restaurant Owner'
      };
      if (roleMap[state.plan_target]) {
        setForm(prev => ({ ...prev, role: roleMap[state.plan_target] }));
        setStep(2); // Skip step 1 if role is pre-selected
      }
    }
  }, [location.state]);

  // Load plans + currencies
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch('/api/public/plans');
        if (res.ok) {
          const data = await res.json();
          const planList = Array.isArray(data) ? data : data.data || [];
          setPlans(planList.filter((p: Plan) => p.plan_target));
        }
      } catch (e) {
        console.error('Failed to load plans:', e);
      }
    };

    const loadCurrencies = async () => {
      try {
        const res = await fetch('/api/currencies/supported');
        if (res.ok) {
          const data = await res.json();
          const loaded = data.data || [];
          setCurrencies(loaded);

          // Only auto-detect if no draft currency was restored
          if (!draft?.currency) {
            const detected = await detectCurrencyFromIP();
            const isSupported = loaded.some((c: CurrencyInfo) => c.code === detected);
            if (isSupported) {
              setSelectedCurrency(detected);
            } else if (loaded.length > 0) {
              setSelectedCurrency(loaded[0].code);
            }
          }
        }
      } catch {
        const fallback = [
          { code: 'USD', symbol: '$', name: 'US Dollar', decimals: 2 },
          { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', decimals: 2 },
          { code: 'KRW', symbol: '₩', name: 'Korean Won', decimals: 0 }
        ];
        setCurrencies(fallback);
      }
    };

    loadPlans();
    loadCurrencies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pre-select plan from PricingPage
  useEffect(() => {
    const state = location.state as any;
    if (state?.plan_id && plans.length > 0) {
      setForm(prev => ({ ...prev, plan_id: parseInt(state.plan_id) }));
    }
  }, [location.state, plans]);

  const filteredPlans = plans.filter(p => {
    if (!form.role) return false;
    return p.plan_target === ROLE_CONFIG[form.role as AccountRole]?.planTarget;
  });

  const selectedPlan = plans.find(p => p.id === form.plan_id);

  // ─── Validation ──────────────────────────────────────────────
  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!form.full_name.trim()) errors.full_name = 'Full name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Invalid email format';

    if (!form.username.trim()) errors.username = 'Username is required';
    else if (!/^[a-zA-Z0-9_]{3,30}$/.test(form.username)) errors.username = '3-30 characters, letters, numbers, underscore only';

    if (!form.password) errors.password = 'Password is required';
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password))
      errors.password = 'Min 8 characters with uppercase, lowercase, and number';

    if (form.password !== form.confirm_password) errors.confirm_password = 'Passwords do not match';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const errors: Record<string, string> = {};
    const role = form.role as AccountRole;

    if (role === 'Restaurant Admin' && !form.restaurant_name.trim()) {
      errors.restaurant_name = 'Restaurant name is required';
    }
    if (role === 'Brand General' && !form.brand_name.trim()) {
      errors.brand_name = 'Brand name is required';
    }
    if (role === 'Foodcourt General' && !form.foodcourt_name.trim()) {
      errors.foodcourt_name = 'Food court name is required';
    }
    if (!form.plan_id) {
      errors.plan_id = 'Please select a plan';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ─── Navigation ──────────────────────────────────────────────
  const handleNext = () => {
    setError('');
    if (step === 1 && !form.role) {
      setError('Please select an account type');
      return;
    }
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setFieldErrors({});
    setStep(prev => prev - 1);
  };

  // Auto-save draft on changes
  useEffect(() => {
    saveDraft(form, step, selectedCurrency);
  }, [form, step, selectedCurrency]);

  const updateField = (field: keyof FormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  // ─── Submit ──────────────────────────────────────────────────
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: form.role,
          full_name: form.full_name,
          email: form.email,
          username: form.username,
          password: form.password,
          phone: form.phone || undefined,
          restaurant_name: form.restaurant_name || undefined,
          restaurant_address: form.restaurant_address || undefined,
          restaurant_phone: form.restaurant_phone || undefined,
          restaurant_email: form.restaurant_email || undefined,
          brand_name: form.brand_name || undefined,
          foodcourt_name: form.foodcourt_name || undefined,
          foodcourt_address: form.foodcourt_address || undefined,
          company_name: form.company_name || undefined,
          plan_id: form.plan_id,
          billing_cycle: form.billing_cycle,
          currency: selectedCurrency
        })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Signup failed');
      }

      // Auto-login: store token and redirect
      clearDraft();
      if (result.data?.token) {
        localStorage.setItem('auth_token', result.data.token);
        // Trigger auth context refresh by navigating
        const user = result.data.user;
        if (user.role === 'Restaurant Admin' && user.restaurant_id) {
          navigate(`/restaurant/${user.restaurant_id}/dashboard`, { replace: true });
        } else if (user.role === 'Brand General') {
          navigate('/pos/brand/general/dashboard', { replace: true });
        } else if (user.role === 'Foodcourt General') {
          navigate('/pos/foodcourt/general/dashboard', { replace: true });
        } else if (user.role === 'Restaurant Owner') {
          navigate('/pos/owner/dashboard', { replace: true });
        } else {
          navigate('/pos', { replace: true });
        }
        // Force page reload to pick up new auth state
        window.location.reload();
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrencyInfo = (code: string): CurrencyInfo => {
    return currencies.find(c => c.code === code) || { code, symbol: code, name: code, decimals: 2 };
  };

  const getPlanPrice = (plan: Plan, type: 'monthly' | 'annual'): number => {
    if (plan.currency_prices && plan.currency_prices[selectedCurrency]) {
      return plan.currency_prices[selectedCurrency][type];
    }
    return 0;
  };

  const currencyInfo = getCurrencyInfo(selectedCurrency);

  const formatPrice = (price: number) => {
    const num = Number(price) || 0;
    if (num === 0) return 'Free';
    if (currencyInfo.decimals === 0) {
      return `${currencyInfo.symbol} ${Math.round(num).toLocaleString()}`;
    }
    return `${currencyInfo.symbol} ${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatLimit = (limit: number) => {
    const num = Number(limit) || 0;
    return num === -1 ? 'Unlimited' : num.toLocaleString();
  };

  // ─── Render Steps ────────────────────────────────────────────
  const renderStep1 = () => (
    <StepContent>
      <StepTitle>Choose your account type</StepTitle>
      <StepDescription>Select the type that best describes your business</StepDescription>
      <RoleGrid>
        {(Object.entries(ROLE_CONFIG) as [AccountRole, typeof ROLE_CONFIG[AccountRole]][]).map(([role, config]) => (
          <RoleCard
            key={role}
            selected={form.role === role}
            onClick={() => updateField('role', role)}
          >
            <RoleIcon><config.icon /></RoleIcon>
            <RoleTitle>{config.title}</RoleTitle>
            <RoleSubtitle>{config.subtitle}</RoleSubtitle>
            {form.role === role && <SelectedCheck>✓</SelectedCheck>}
          </RoleCard>
        ))}
      </RoleGrid>
    </StepContent>
  );

  const renderStep2 = () => (
    <StepContent>
      <StepTitle>Account information</StepTitle>
      <StepDescription>Create your login credentials</StepDescription>
      <FormGrid>
        <FormGroup>
          <FormLabel>Full Name *</FormLabel>
          <FormInput
            type="text"
            value={form.full_name}
            onChange={e => updateField('full_name', e.target.value)}
            placeholder="Enter your full name"
            hasError={!!fieldErrors.full_name}
          />
          {fieldErrors.full_name && <FieldError>{fieldErrors.full_name}</FieldError>}
        </FormGroup>

        <FormGroup>
          <FormLabel>Email *</FormLabel>
          <FormInput
            type="email"
            value={form.email}
            onChange={e => updateField('email', e.target.value)}
            placeholder="you@example.com"
            hasError={!!fieldErrors.email}
          />
          {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
        </FormGroup>

        <FormGroup>
          <FormLabel>Username *</FormLabel>
          <FormInput
            type="text"
            value={form.username}
            onChange={e => updateField('username', e.target.value)}
            placeholder="Choose a username"
            hasError={!!fieldErrors.username}
          />
          {fieldErrors.username && <FieldError>{fieldErrors.username}</FieldError>}
        </FormGroup>

        <FormGroup>
          <FormLabel>Phone</FormLabel>
          <FormInput
            type="tel"
            value={form.phone}
            onChange={e => updateField('phone', e.target.value)}
            placeholder="Optional"
          />
        </FormGroup>

        <FormGroup>
          <FormLabel>Password *</FormLabel>
          <PasswordWrapper>
            <FormInput
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={e => updateField('password', e.target.value)}
              placeholder="Min 8 chars, upper, lower, number"
              hasError={!!fieldErrors.password}
            />
            <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </PasswordToggle>
          </PasswordWrapper>
          {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
        </FormGroup>

        <FormGroup>
          <FormLabel>Confirm Password *</FormLabel>
          <FormInput
            type={showPassword ? 'text' : 'password'}
            value={form.confirm_password}
            onChange={e => updateField('confirm_password', e.target.value)}
            placeholder="Re-enter your password"
            hasError={!!fieldErrors.confirm_password}
          />
          {fieldErrors.confirm_password && <FieldError>{fieldErrors.confirm_password}</FieldError>}
        </FormGroup>
      </FormGrid>
    </StepContent>
  );

  const renderStep3 = () => {
    const role = form.role as AccountRole;
    return (
      <StepContent>
        <StepTitle>Business details</StepTitle>
        <StepDescription>Set up your {ROLE_CONFIG[role]?.title.toLowerCase() || 'business'}</StepDescription>

        {/* Role-specific fields */}
        {role === 'Restaurant Admin' && (
          <FormGrid>
            <FormGroup fullWidth>
              <FormLabel>Restaurant Name *</FormLabel>
              <FormInput
                type="text"
                value={form.restaurant_name}
                onChange={e => updateField('restaurant_name', e.target.value)}
                placeholder="Enter restaurant name"
                hasError={!!fieldErrors.restaurant_name}
              />
              {fieldErrors.restaurant_name && <FieldError>{fieldErrors.restaurant_name}</FieldError>}
            </FormGroup>
            <FormGroup fullWidth>
              <FormLabel>Address</FormLabel>
              <FormInput
                type="text"
                value={form.restaurant_address}
                onChange={e => updateField('restaurant_address', e.target.value)}
                placeholder="Restaurant address (optional)"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Restaurant Phone</FormLabel>
              <FormInput
                type="tel"
                value={form.restaurant_phone}
                onChange={e => updateField('restaurant_phone', e.target.value)}
                placeholder="Restaurant phone number"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Restaurant Email</FormLabel>
              <FormInput
                type="email"
                value={form.restaurant_email}
                onChange={e => updateField('restaurant_email', e.target.value)}
                placeholder="Restaurant contact email"
              />
            </FormGroup>
          </FormGrid>
        )}

        {role === 'Brand General' && (
          <FormGrid>
            <FormGroup fullWidth>
              <FormLabel>Brand Name *</FormLabel>
              <FormInput
                type="text"
                value={form.brand_name}
                onChange={e => updateField('brand_name', e.target.value)}
                placeholder="Enter brand name"
                hasError={!!fieldErrors.brand_name}
              />
              {fieldErrors.brand_name && <FieldError>{fieldErrors.brand_name}</FieldError>}
            </FormGroup>
          </FormGrid>
        )}

        {role === 'Foodcourt General' && (
          <FormGrid>
            <FormGroup fullWidth>
              <FormLabel>Food Court Name *</FormLabel>
              <FormInput
                type="text"
                value={form.foodcourt_name}
                onChange={e => updateField('foodcourt_name', e.target.value)}
                placeholder="Enter food court name"
                hasError={!!fieldErrors.foodcourt_name}
              />
              {fieldErrors.foodcourt_name && <FieldError>{fieldErrors.foodcourt_name}</FieldError>}
            </FormGroup>
            <FormGroup fullWidth>
              <FormLabel>Address</FormLabel>
              <FormInput
                type="text"
                value={form.foodcourt_address}
                onChange={e => updateField('foodcourt_address', e.target.value)}
                placeholder="Food court address (optional)"
              />
            </FormGroup>
          </FormGrid>
        )}

        {role === 'Restaurant Owner' && (
          <FormGrid>
            <FormGroup fullWidth>
              <FormLabel>Company Name</FormLabel>
              <FormInput
                type="text"
                value={form.company_name}
                onChange={e => updateField('company_name', e.target.value)}
                placeholder="Company name (optional)"
              />
            </FormGroup>
          </FormGrid>
        )}

        {/* Info notice for non-restaurant roles */}
        {role !== 'Restaurant Admin' && (
          <InfoNotice>
            {role === 'Restaurant Owner'
              ? 'Link your restaurants after signing up from the dashboard. Each restaurant will need its own POS subscription. Restaurants can also be linked to a brand or food court.'
              : 'You can add and manage restaurants after signing up. Each restaurant will need its own POS subscription.'}
          </InfoNotice>
        )}

        {role === 'Restaurant Admin' && (
          <InfoNotice>
            Your restaurant can be linked to a brand or food court later from the admin dashboard.
          </InfoNotice>
        )}

        {/* Plan Selection */}
        <PlanSectionTitle>Select a plan *</PlanSectionTitle>
        <PlanTrialHint>All plans include a 7-day free trial. No payment required.</PlanTrialHint>
        {fieldErrors.plan_id && <FieldError style={{ marginBottom: 12 }}>{fieldErrors.plan_id}</FieldError>}

        {/* Currency + Billing toggle row */}
        <PlanControlsRow>
          <BillingToggle>
            <BillingOption active={form.billing_cycle === 'monthly'} onClick={() => updateField('billing_cycle', 'monthly')}>
              Monthly
            </BillingOption>
            <BillingOption active={form.billing_cycle === 'annual'} onClick={() => updateField('billing_cycle', 'annual')}>
              Annual
            </BillingOption>
          </BillingToggle>

          {currencies.length > 0 && (
            <CurrencySelect
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>
                  {c.symbol} {c.code}
                </option>
              ))}
            </CurrencySelect>
          )}
        </PlanControlsRow>

        <PlanGrid>
          {filteredPlans.map(plan => {
            const monthlyPrice = getPlanPrice(plan, 'monthly');
            const annualPrice = getPlanPrice(plan, 'annual');
            const price = form.billing_cycle === 'annual' ? annualPrice : monthlyPrice;
            const annualSavings = monthlyPrice > 0 ? Math.round(((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12)) * 100) : 0;
            return (
              <PlanCard
                key={plan.id}
                selected={form.plan_id === plan.id}
                onClick={() => updateField('plan_id', plan.id)}
              >
                <PlanName>{plan.display_name || plan.name}</PlanName>
                <PlanPriceDisplay>
                  {formatPrice(price)}
                  <PlanPeriod>/{form.billing_cycle === 'annual' ? 'year' : 'month'}</PlanPeriod>
                </PlanPriceDisplay>
                {form.billing_cycle === 'annual' && annualSavings > 0 && (
                  <SaveBadge>Save {annualSavings}%</SaveBadge>
                )}
                {form.billing_cycle === 'monthly' && annualPrice > 0 && annualSavings > 0 && (
                  <AnnualHint>{formatPrice(annualPrice)}/year (save {annualSavings}%)</AnnualHint>
                )}
                <PlanFeatures>
                  {plan.plan_target === 'restaurant' && (
                    <>
                      <PlanFeature>Staff: {formatLimit(plan.staff_limit)}</PlanFeature>
                      <PlanFeature>Orders: {formatLimit(plan.order_limit)}</PlanFeature>
                      <PlanFeature>Menu Items: {formatLimit(plan.menu_item_limit)}</PlanFeature>
                    </>
                  )}
                  {(plan.plan_target === 'brand' || plan.plan_target === 'foodcourt') && (
                    <>
                      <PlanFeature>Restaurants: {formatLimit(plan.restaurant_limit)}</PlanFeature>
                      <PlanFeature>Managers: {formatLimit(plan.manager_limit)}</PlanFeature>
                    </>
                  )}
                  {plan.plan_target === 'owner' && (
                    <PlanFeature>Restaurants: {formatLimit(plan.restaurant_limit)}</PlanFeature>
                  )}
                </PlanFeatures>
                {form.plan_id === plan.id && <PlanSelected>Selected</PlanSelected>}
              </PlanCard>
            );
          })}
        </PlanGrid>
      </StepContent>
    );
  };

  const renderStep4 = () => {
    const role = form.role as AccountRole;
    const price = selectedPlan
      ? getPlanPrice(selectedPlan, form.billing_cycle === 'annual' ? 'annual' : 'monthly')
      : 0;

    return (
      <StepContent>
        <StepTitle>Review & confirm</StepTitle>
        <StepDescription>Check your details before creating your account</StepDescription>

        <ReviewSection>
          <ReviewGroup>
            <ReviewLabel>Account Type</ReviewLabel>
            <ReviewValue>{ROLE_CONFIG[role]?.title}</ReviewValue>
          </ReviewGroup>

          <ReviewDivider />

          <ReviewGroup>
            <ReviewLabel>Full Name</ReviewLabel>
            <ReviewValue>{form.full_name}</ReviewValue>
          </ReviewGroup>
          <ReviewGroup>
            <ReviewLabel>Email</ReviewLabel>
            <ReviewValue>{form.email}</ReviewValue>
          </ReviewGroup>
          <ReviewGroup>
            <ReviewLabel>Username</ReviewLabel>
            <ReviewValue>{form.username}</ReviewValue>
          </ReviewGroup>

          <ReviewDivider />

          {role === 'Restaurant Admin' && (
            <ReviewGroup>
              <ReviewLabel>Restaurant</ReviewLabel>
              <ReviewValue>{form.restaurant_name}</ReviewValue>
            </ReviewGroup>
          )}
          {role === 'Brand General' && (
            <ReviewGroup>
              <ReviewLabel>Brand</ReviewLabel>
              <ReviewValue>{form.brand_name}</ReviewValue>
            </ReviewGroup>
          )}
          {role === 'Foodcourt General' && (
            <ReviewGroup>
              <ReviewLabel>Food Court</ReviewLabel>
              <ReviewValue>{form.foodcourt_name}</ReviewValue>
            </ReviewGroup>
          )}
          {role === 'Restaurant Owner' && form.company_name && (
            <ReviewGroup>
              <ReviewLabel>Company</ReviewLabel>
              <ReviewValue>{form.company_name}</ReviewValue>
            </ReviewGroup>
          )}

          <ReviewDivider />

          <ReviewGroup>
            <ReviewLabel>Plan</ReviewLabel>
            <ReviewValue>{selectedPlan?.display_name || selectedPlan?.name}</ReviewValue>
          </ReviewGroup>
          <ReviewGroup>
            <ReviewLabel>Billing</ReviewLabel>
            <ReviewValue>{form.billing_cycle === 'annual' ? 'Annual' : 'Monthly'}</ReviewValue>
          </ReviewGroup>
          <ReviewGroup>
            <ReviewLabel>Price</ReviewLabel>
            <ReviewValue highlight>{formatPrice(price)}/{form.billing_cycle === 'annual' ? 'year' : 'month'}</ReviewValue>
          </ReviewGroup>
        </ReviewSection>

        <TrialBadge>
          7-day free trial included — no payment required now
        </TrialBadge>
      </StepContent>
    );
  };

  // ─── Main Render ─────────────────────────────────────────────
  return (
    <LandingLayout>
      <Helmet>
        <title>Sign Up - PurpleHere</title>
        <meta name="description" content="Create your PurpleHere POS account. Start with a 7-day free trial." />
      </Helmet>

      <HeroSection>
        <HeroTitle>Create Your Account</HeroTitle>
        <HeroSubtitle>Start your 7-day free trial today</HeroSubtitle>
      </HeroSection>

      <ContentSection>
        <SignupCard>
          {/* Progress bar */}
          <ProgressBar>
            {[1, 2, 3, 4].map(s => (
              <ProgressStep key={s} active={step >= s} current={step === s}>
                <ProgressDot active={step >= s} current={step === s}>{step > s ? '✓' : s}</ProgressDot>
                <ProgressLabel active={step >= s}>
                  {s === 1 ? 'Type' : s === 2 ? 'Account' : s === 3 ? 'Business' : 'Review'}
                </ProgressLabel>
              </ProgressStep>
            ))}
            <ProgressLine>
              <ProgressFill style={{ width: `${((step - 1) / 3) * 100}%` }} />
            </ProgressLine>
          </ProgressBar>

          {/* Error */}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {/* Steps */}
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}

          {/* Navigation */}
          <ButtonRow>
            {step > 1 && (
              <BackButton onClick={handleBack} disabled={isSubmitting}>Back</BackButton>
            )}
            <ButtonSpacer />
            {step < 4 ? (
              <NextButton onClick={handleNext}>Continue</NextButton>
            ) : (
              <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Create Account & Start Free Trial'}
              </SubmitButton>
            )}
          </ButtonRow>

          <LoginLink>
            Already have an account? <Link to="/pos">Sign in</Link>
          </LoginLink>
        </SignupCard>
      </ContentSection>
    </LandingLayout>
  );
};

// ─── Styled Components ─────────────────────────────────────────

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;

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

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.3;
`;

const ContentSection = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px 60px;
`;

const SignupCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  border: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

// ─── Progress Bar ──────────────────────────────────────────────

const ProgressBar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 36px;
  position: relative;
  padding: 0 20px;
`;

const ProgressStep = styled.div<{ active: boolean; current: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1;
`;

const ProgressDot = styled.div<{ active: boolean; current: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s;
  background: ${({ active, current }) => current ? '#635BFF' : active ? '#635BFF' : '#E6EBF1'};
  color: ${({ active }) => active ? 'white' : '#6B7C93'};
`;

const ProgressLabel = styled.div<{ active: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ active }) => active ? '#0A2540' : '#6B7C93'};
`;

const ProgressLine = styled.div`
  position: absolute;
  top: 18px;
  left: 50px;
  right: 50px;
  height: 3px;
  background: #E6EBF1;
  z-index: 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #635BFF;
  transition: width 0.3s;
  border-radius: 2px;
`;

// ─── Step Content ──────────────────────────────────────────────

const StepContent = styled.div`
  margin-bottom: 32px;
`;

const StepTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 4px;
`;

const StepDescription = styled.p`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 0 24px;
`;

// ─── Step 1: Role Cards ────────────────────────────────────────

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const RoleCard = styled.div<{ selected: boolean }>`
  position: relative;
  padding: 24px;
  border-radius: 12px;
  border: 2px solid ${({ selected }) => selected ? '#635BFF' : '#E6EBF1'};
  background: ${({ selected }) => selected ? '#F8F7FF' : 'white'};
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: ${({ selected }) => selected ? '#635BFF' : '#CBD5E1'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const RoleIcon = styled.div`
  margin-bottom: 12px;
  color: #635BFF;
  display: flex;
  justify-content: center;
`;

const RoleTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 6px;
`;

const RoleSubtitle = styled.div`
  font-size: 13px;
  color: #6B7C93;
  line-height: 1.4;
`;

const SelectedCheck = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
`;

// ─── Form Elements ─────────────────────────────────────────────

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ fullWidth?: boolean }>`
  grid-column: ${({ fullWidth }) => fullWidth ? '1 / -1' : 'auto'};
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 6px;
`;

const FormInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ hasError }) => hasError ? '#DC2626' : '#E6EBF1'};
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  transition: all 0.2s;
  background: white;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ hasError }) => hasError ? '#DC2626' : '#635BFF'};
    box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? 'rgba(220, 38, 38, 0.1)' : 'rgba(99, 91, 255, 0.1)'};
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6B7C93;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    color: #635BFF;
  }
`;

const FieldError = styled.div`
  font-size: 12px;
  color: #DC2626;
  margin-top: 4px;
`;

// ─── Info Notice ───────────────────────────────────────────────

const InfoNotice = styled.div`
  padding: 14px 18px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  font-size: 13px;
  color: #4338CA;
  line-height: 1.5;
  margin: 16px 0;
`;

// ─── Step 3: Plan Selection ────────────────────────────────────

const PlanSectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 4px;
`;

const PlanTrialHint = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0 0 16px;
`;

const PlanControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const CurrencySelect = styled.select`
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  color: #0A2540;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const BillingToggle = styled.div`
  display: flex;
  gap: 0;
  background: #F3F4F6;
  border-radius: 8px;
  padding: 3px;
  width: fit-content;
`;

const BillingOption = styled.button<{ active: boolean }>`
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ active }) => active ? 'white' : 'transparent'};
  color: ${({ active }) => active ? '#0A2540' : '#6B7C93'};
  box-shadow: ${({ active }) => active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};
`;

const SaveBadge = styled.span`
  display: inline-block;
  font-size: 11px;
  background: #ECFDF5;
  color: #059669;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  margin-bottom: 6px;
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
`;

const PlanCard = styled.div<{ selected: boolean }>`
  padding: 20px;
  border-radius: 12px;
  border: 2px solid ${({ selected }) => selected ? '#635BFF' : '#E6EBF1'};
  background: ${({ selected }) => selected ? '#F8F7FF' : 'white'};
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    border-color: ${({ selected }) => selected ? '#635BFF' : '#CBD5E1'};
  }
`;

const PlanName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 8px;
`;

const PlanPriceDisplay = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #635BFF;
  margin-bottom: 4px;
`;

const PlanPeriod = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: #6B7C93;
`;

const AnnualHint = styled.div`
  font-size: 11px;
  color: #059669;
  font-weight: 500;
  margin-bottom: 8px;
`;

const PlanFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlanFeature = styled.div`
  font-size: 12px;
  color: #6B7C93;
`;

const PlanSelected = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: 600;
  color: #635BFF;
`;

// ─── Step 4: Review ────────────────────────────────────────────

const ReviewSection = styled.div`
  background: #F8FAFC;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`;

const ReviewGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

const ReviewLabel = styled.div`
  font-size: 14px;
  color: #6B7C93;
`;

const ReviewValue = styled.div<{ highlight?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ highlight }) => highlight ? '#635BFF' : '#0A2540'};
`;

const ReviewDivider = styled.div`
  height: 1px;
  background: #E6EBF1;
  margin: 4px 0;
`;

const TrialBadge = styled.div`
  margin-top: 20px;
  padding: 14px 20px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border: 1px solid #C7D2FE;
  border-radius: 10px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #4338CA;
`;

// ─── Buttons & Error ───────────────────────────────────────────

const ErrorMessage = styled.div`
  padding: 12px 16px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  margin-bottom: 20px;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ButtonSpacer = styled.div`
  flex: 1;
`;

const BackButton = styled.button`
  padding: 12px 24px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  color: #6B7C93;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #F8FAFC;
    border-color: #CBD5E1;
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const NextButton = styled.button`
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  }
`;

const SubmitButton = styled.button`
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #6B7C93;

  a {
    color: #635BFF;
    text-decoration: none;
    font-weight: 500;
    &:hover { text-decoration: underline; }
  }
`;

export default SignupPage;
