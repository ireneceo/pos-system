import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageHeader from '../../components/Common/PageHeader';
import { SaveButtonContainer, SaveButtonGroup, SaveButton, StatusMessage } from '../../components/UI';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { Modal, ModalButton } from '../../components/UI/Modal';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import { useAuth } from '../../contexts/AuthContext';

interface CurrencyConfig {
  [code: string]: {
    symbol: string;
    name: string;
    decimals: number;
  };
}

interface StripeConfig {
  enabled: boolean;
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
  autoCharge: boolean;
}

interface PayPalConfig {
  enabled: boolean;
  clientId: string;
  clientSecret: string;
}

interface BankTransferConfig {
  enabled: boolean;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface QRPaymentConfig {
  enabled: boolean;
  qrImage: string;
  qrDescription: string;
}

interface AdditionalChargeConfig {
  enabled: boolean;
  name: string;
  rate: number;
}

interface PaymentSettings {
  stripe: StripeConfig;
  paypal: PayPalConfig;
  bankTransfer: { [currency: string]: BankTransferConfig };
  qrPayment: { [currency: string]: QRPaymentConfig };
  additionalCharges: { [currency: string]: AdditionalChargeConfig[] };
}

const Container = styled.div`
  min-height: 100vh;
`;

const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const Section = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const SectionDescription = styled.p`
  color: #6B7C93;
  font-size: 14px;
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const CurrencySelector = styled.div`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  min-height: 46px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  &:hover {
    border-color: #635BFF;
  }
`;

const CurrencyTag = styled.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`;

const PlaceholderText = styled.span`
  color: #9CA3AF;
`;

const PaymentMethodCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`;

const MethodHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MethodInfo = styled.div``;

const MethodLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`;

const MethodDescription = styled.div`
  font-size: 13px;
  color: #6B7C93;
  margin-top: 2px;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #635BFF;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
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
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
`;

const MethodContent = styled.div`
  border-top: 1px solid #E6EBF1;
  margin-top: 16px;
  padding-top: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const NoCurrencyMessage = styled.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`;

const defaultPaymentSettings: PaymentSettings = {
  stripe: {
    enabled: false,
    publishableKey: '',
    secretKey: '',
    webhookSecret: '',
    autoCharge: false
  },
  paypal: {
    enabled: false,
    clientId: '',
    clientSecret: ''
  },
  bankTransfer: {},
  qrPayment: {},
  additionalCharges: {}
};

const FoodcourtPaymentSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const foodcourtId = user?.foodcourt_id;

  // Currency settings (foodcourt-specific)
  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>({});
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);
  const [systemSupportedCurrencies, setSystemSupportedCurrencies] = useState<string[]>([]);
  const [defaultCurrency, setDefaultCurrency] = useState<string>('USD');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [tempSelectedCurrencies, setTempSelectedCurrencies] = useState<string[]>([]);

  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(defaultPaymentSettings);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');

  // UI state
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadAllSettings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (supportedCurrencies.length > 0 && !selectedCurrency) {
      setSelectedCurrency(supportedCurrencies[0]);
    }
  }, [supportedCurrencies, selectedCurrency]);

  const loadAllSettings = async () => {
    if (!foodcourtId) {
      console.error('No foodcourt ID available');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch currency config (global), system supported currencies, and foodcourt-specific payment settings
      const [configRes, systemCurrenciesRes, foodcourtSettingsRes] = await Promise.all([
        fetch('/api/currencies/config'),
        fetch('/api/currencies/supported'),
        fetch(`/api/foodcourts/${foodcourtId}/payment-settings`, { headers })
      ]);

      if (configRes.ok) {
        const data = await configRes.json();
        if (data.success && data.currencies) {
          setCurrencyConfig(data.currencies);
        }
      }

      // System admin's supported currencies (read-only reference)
      let systemCurrencyCodes: string[] = [];
      if (systemCurrenciesRes.ok) {
        const data = await systemCurrenciesRes.json();
        if (data.success && data.data) {
          systemCurrencyCodes = data.data.map((c: { code: string }) => c.code);
          setSystemSupportedCurrencies(systemCurrencyCodes);
        }
      }

      if (foodcourtSettingsRes.ok) {
        const responseData = await foodcourtSettingsRes.json();
        console.log('Foodcourt payment settings loaded:', responseData);

        // API returns { success: true, data: { payment_settings, supported_currencies } }
        const data = responseData.data || responseData;

        // Set supported currencies from foodcourt settings (filtered by system-allowed currencies)
        if (data.supported_currencies && Array.isArray(data.supported_currencies)) {
          const validCurrencies = systemCurrencyCodes.length > 0
            ? data.supported_currencies.filter((c: string) => systemCurrencyCodes.includes(c))
            : data.supported_currencies;

          setSupportedCurrencies(validCurrencies);
          if (validCurrencies.length > 0) {
            setSelectedCurrency(validCurrencies[0]);
            const savedDefault = data.payment_settings?.defaultCurrency;
            if (savedDefault && validCurrencies.includes(savedDefault)) {
              setDefaultCurrency(savedDefault);
            } else {
              setDefaultCurrency(validCurrencies[0]);
            }
          }
        }

        // Set payment settings
        if (data.payment_settings && Object.keys(data.payment_settings).length > 0) {
          let charges = data.payment_settings.additionalCharges || {};
          if (Array.isArray(charges)) charges = {};
          setPaymentSettings({
            ...defaultPaymentSettings,
            ...data.payment_settings,
            bankTransfer: data.payment_settings.bankTransfer || {},
            qrPayment: data.payment_settings.qrPayment || {},
            additionalCharges: charges
          });
        }
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Currency functions - using foodcourt-specific API
  const updateDefaultCurrency = (currency: string) => {
    setDefaultCurrency(currency);
    setHasChanges(true);
  };

  const updateSupportedCurrencies = async () => {
    if (!foodcourtId) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/foodcourts/${foodcourtId}/payment-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ supported_currencies: tempSelectedCurrencies })
      });

      if (response.ok) {
        setSupportedCurrencies(tempSelectedCurrencies);
        setShowCurrencyModal(false);
        setSaveStatus({ type: 'success', message: 'Supported currencies updated' });
        setTimeout(() => setSaveStatus(null), 3000);

        if (!tempSelectedCurrencies.includes(defaultCurrency) && tempSelectedCurrencies.length > 0) {
          setDefaultCurrency(tempSelectedCurrencies[0]);
        }
        if (tempSelectedCurrencies.length > 0 && !tempSelectedCurrencies.includes(selectedCurrency)) {
          setSelectedCurrency(tempSelectedCurrencies[0]);
        }
      } else {
        throw new Error('Failed to update currencies');
      }
    } catch (error) {
      console.error('Error updating supported currencies:', error);
      setSaveStatus({ type: 'error', message: 'Failed to update currencies' });
    }
  };

  const toggleCurrencySelection = (code: string) => {
    setTempSelectedCurrencies(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  // Payment settings functions
  const handleStripeChange = (field: keyof StripeConfig, value: string | boolean) => {
    setPaymentSettings(prev => ({
      ...prev,
      stripe: { ...prev.stripe, [field]: value }
    }));
    setHasChanges(true);
  };

  const handlePayPalChange = (field: keyof PayPalConfig, value: string | boolean) => {
    setPaymentSettings(prev => ({
      ...prev,
      paypal: { ...prev.paypal, [field]: value }
    }));
    setHasChanges(true);
  };

  const handleBankTransferChange = (currency: string, field: keyof BankTransferConfig, value: string | boolean) => {
    setPaymentSettings(prev => ({
      ...prev,
      bankTransfer: {
        ...prev.bankTransfer,
        [currency]: {
          enabled: false,
          bankName: '',
          accountNumber: '',
          accountName: '',
          ...prev.bankTransfer[currency],
          [field]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const handleQRPaymentChange = (currency: string, field: keyof QRPaymentConfig, value: string | boolean) => {
    setPaymentSettings(prev => ({
      ...prev,
      qrPayment: {
        ...prev.qrPayment,
        [currency]: {
          enabled: false,
          qrImage: '',
          qrDescription: '',
          ...prev.qrPayment[currency],
          [field]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const getBankConfig = (currency: string): BankTransferConfig => {
    return paymentSettings.bankTransfer[currency] || { enabled: false, bankName: '', accountNumber: '', accountName: '' };
  };

  const getQRConfig = (currency: string): QRPaymentConfig => {
    return paymentSettings.qrPayment[currency] || { enabled: false, qrImage: '', qrDescription: '' };
  };

  const defaultCharges: AdditionalChargeConfig[] = [
    { enabled: false, name: '', rate: 0 },
    { enabled: false, name: '', rate: 0 },
    { enabled: false, name: '', rate: 0 }
  ];

  const getChargesForCurrency = (currency: string): AdditionalChargeConfig[] => {
    return paymentSettings.additionalCharges[currency] || defaultCharges;
  };

  const handleChargeChange = (currency: string, index: number, field: keyof AdditionalChargeConfig, value: boolean | string | number) => {
    const currentCharges = [...getChargesForCurrency(currency)];
    currentCharges[index] = { ...currentCharges[index], [field]: value };
    setPaymentSettings(prev => ({
      ...prev,
      additionalCharges: {
        ...prev.additionalCharges,
        [currency]: currentCharges
      }
    }));
    setHasChanges(true);
  };

  const savePaymentSettings = async () => {
    if (!hasChanges || !foodcourtId) {
      console.log('No changes to save or no foodcourt ID');
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    try {
      const token = localStorage.getItem('auth_token');
      console.log('Saving foodcourt payment settings:', JSON.stringify(paymentSettings, null, 2));

      const response = await fetch(`/api/foodcourts/${foodcourtId}/payment-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ payment_settings: paymentSettings })
      });

      const responseData = await response.json();
      console.log('Server response:', response.status, responseData);

      if (!response.ok) {
        throw new Error(responseData.error || responseData.details || 'Failed to save');
      }

      setSaveStatus({ type: 'success', message: 'Payment settings saved successfully!' });
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving:', error);
      setSaveStatus({ type: 'error', message: `Failed to save payment settings: ${error instanceof Error ? error.message : 'Unknown error'}` });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Container>
          <PageHeader title="Payment Settings" />
          <Content>
            <p>Loading...</p>
          </Content>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <PageHeader title="Payment Settings" />
        <Content>
          {/* Section 1: Currency Settings */}
          <Section>
            <SectionTitle>Currency Settings</SectionTitle>
            <SectionDescription>
              Configure supported currencies for subscription plans and invoices.
            </SectionDescription>

            <FormRow>
              <FormGroup>
                <Label>Default Currency</Label>
                <Select
                  value={defaultCurrency}
                  onChange={(e) => updateDefaultCurrency(e.target.value)}
                >
                  {supportedCurrencies.map(code => (
                    <option key={code} value={code}>
                      {currencyConfig[code]?.symbol} {code} - {currencyConfig[code]?.name}
                    </option>
                  ))}
                </Select>
                <HelpText>Used as default for new subscriptions and invoices</HelpText>
              </FormGroup>

              <FormGroup>
                <Label>Supported Currencies</Label>
                <CurrencySelector
                  onClick={() => {
                    setTempSelectedCurrencies(supportedCurrencies);
                    setShowCurrencyModal(true);
                  }}
                >
                  {supportedCurrencies.length > 0 ? (
                    supportedCurrencies.map(code => (
                      <CurrencyTag key={code}>
                        {currencyConfig[code]?.symbol} {code}
                      </CurrencyTag>
                    ))
                  ) : (
                    <PlaceholderText>Click to select currencies</PlaceholderText>
                  )}
                </CurrencySelector>
                <HelpText>Currencies available for pricing plans and invoices</HelpText>
              </FormGroup>
            </FormRow>
          </Section>

          {/* Section 2: Online Payment (Global) */}
          <Section>
            <SectionTitle>Online Payment</SectionTitle>
            <SectionDescription>
              Configure online payment gateways. These settings apply to all currencies.
            </SectionDescription>

            {/* Stripe */}
            <PaymentMethodCard>
              <MethodHeader>
                <MethodInfo>
                  <MethodLabel>Stripe</MethodLabel>
                  <MethodDescription>Credit/Debit Card payments</MethodDescription>
                </MethodInfo>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={paymentSettings.stripe.enabled}
                    onChange={(e) => handleStripeChange('enabled', e.target.checked)}
                  />
                  <ToggleSlider />
                </ToggleSwitch>
              </MethodHeader>
              {paymentSettings.stripe.enabled && (
                <MethodContent>
                  <FormGroup>
                    <Label>Publishable Key</Label>
                    <Input
                      type="text"
                      placeholder="pk_live_..."
                      value={paymentSettings.stripe.publishableKey}
                      onChange={(e) => handleStripeChange('publishableKey', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Secret Key</Label>
                    <Input
                      type="password"
                      placeholder="sk_live_..."
                      value={paymentSettings.stripe.secretKey}
                      onChange={(e) => handleStripeChange('secretKey', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Webhook Secret</Label>
                    <Input
                      type="password"
                      placeholder="whsec_..."
                      value={paymentSettings.stripe.webhookSecret}
                      onChange={(e) => handleStripeChange('webhookSecret', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <CheckboxLabel>
                      <Checkbox
                        type="checkbox"
                        checked={paymentSettings.stripe.autoCharge}
                        onChange={(e) => handleStripeChange('autoCharge', e.target.checked)}
                      />
                      Enable auto-charge for subscription renewals
                    </CheckboxLabel>
                  </FormGroup>
                </MethodContent>
              )}
            </PaymentMethodCard>

            {/* PayPal */}
            <PaymentMethodCard>
              <MethodHeader>
                <MethodInfo>
                  <MethodLabel>PayPal</MethodLabel>
                  <MethodDescription>PayPal account or card</MethodDescription>
                </MethodInfo>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={paymentSettings.paypal.enabled}
                    onChange={(e) => handlePayPalChange('enabled', e.target.checked)}
                  />
                  <ToggleSlider />
                </ToggleSwitch>
              </MethodHeader>
              {paymentSettings.paypal.enabled && (
                <MethodContent>
                  <FormGroup>
                    <Label>Client ID</Label>
                    <Input
                      type="text"
                      placeholder="Enter PayPal Client ID"
                      value={paymentSettings.paypal.clientId}
                      onChange={(e) => handlePayPalChange('clientId', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Client Secret</Label>
                    <Input
                      type="password"
                      placeholder="Enter PayPal Client Secret"
                      value={paymentSettings.paypal.clientSecret}
                      onChange={(e) => handlePayPalChange('clientSecret', e.target.value)}
                    />
                  </FormGroup>
                </MethodContent>
              )}
            </PaymentMethodCard>
          </Section>

          {/* Section 3: Manual Payment (Per Currency) */}
          <Section>
            <SectionTitle>Manual Payment</SectionTitle>
            <SectionDescription>
              Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes.
            </SectionDescription>

            {supportedCurrencies.length === 0 ? (
              <NoCurrencyMessage>
                No currencies configured. Please add supported currencies above first.
              </NoCurrencyMessage>
            ) : (
              <>
                <Tabs>
                  {supportedCurrencies.map(code => (
                    <Tab
                      key={code}
                      active={selectedCurrency === code}
                      onClick={() => setSelectedCurrency(code)}
                    >
                      {currencyConfig[code]?.symbol} {code}
                    </Tab>
                  ))}
                </Tabs>

                {/* Bank Transfer */}
                <PaymentMethodCard>
                  <MethodHeader>
                    <MethodInfo>
                      <MethodLabel>Bank Transfer ({selectedCurrency})</MethodLabel>
                      <MethodDescription>Manual transfer with receipt upload</MethodDescription>
                    </MethodInfo>
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={getBankConfig(selectedCurrency).enabled}
                        onChange={(e) => handleBankTransferChange(selectedCurrency, 'enabled', e.target.checked)}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </MethodHeader>
                  {getBankConfig(selectedCurrency).enabled && (
                    <MethodContent>
                      <FormGroup>
                        <Label>Bank Name</Label>
                        <Input
                          type="text"
                          placeholder="e.g., Maybank, CIMB, Shinhan Bank"
                          value={getBankConfig(selectedCurrency).bankName}
                          onChange={(e) => handleBankTransferChange(selectedCurrency, 'bankName', e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Account Number</Label>
                        <Input
                          type="text"
                          placeholder="Enter bank account number"
                          value={getBankConfig(selectedCurrency).accountNumber}
                          onChange={(e) => handleBankTransferChange(selectedCurrency, 'accountNumber', e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Account Name</Label>
                        <Input
                          type="text"
                          placeholder="Enter account holder name"
                          value={getBankConfig(selectedCurrency).accountName}
                          onChange={(e) => handleBankTransferChange(selectedCurrency, 'accountName', e.target.value)}
                        />
                      </FormGroup>
                    </MethodContent>
                  )}
                </PaymentMethodCard>

                {/* QR Payment */}
                <PaymentMethodCard>
                  <MethodHeader>
                    <MethodInfo>
                      <MethodLabel>QR Payment ({selectedCurrency})</MethodLabel>
                      <MethodDescription>Scan QR code to pay (DuitNow, KakaoPay, etc.)</MethodDescription>
                    </MethodInfo>
                    <ToggleSwitch>
                      <ToggleInput
                        type="checkbox"
                        checked={getQRConfig(selectedCurrency).enabled}
                        onChange={(e) => handleQRPaymentChange(selectedCurrency, 'enabled', e.target.checked)}
                      />
                      <ToggleSlider />
                    </ToggleSwitch>
                  </MethodHeader>
                  {getQRConfig(selectedCurrency).enabled && (
                    <MethodContent>
                      <ImageUploadDropzone
                        value={getQRConfig(selectedCurrency).qrImage}
                        onChange={(base64) => handleQRPaymentChange(selectedCurrency, 'qrImage', base64)}
                        label="QR Code Image"
                        helpText={`Upload QR code for ${selectedCurrency} payments`}
                        changeButtonText="Change QR Code"
                        removeButtonText="Remove QR Code"
                        imageAltText="Payment QR Code"
                      />
                      <FormGroup style={{ marginTop: '16px' }}>
                        <Label>Description</Label>
                        <Input
                          type="text"
                          placeholder="e.g., Scan to pay via DuitNow"
                          value={getQRConfig(selectedCurrency).qrDescription}
                          onChange={(e) => handleQRPaymentChange(selectedCurrency, 'qrDescription', e.target.value)}
                        />
                        <HelpText>Short description shown below the QR code</HelpText>
                      </FormGroup>
                    </MethodContent>
                  )}
                </PaymentMethodCard>

                {/* Additional Charges (per currency) */}
                <SectionTitle style={{ fontSize: '15px', marginTop: '24px', marginBottom: '8px' }}>
                  Additional Charges ({selectedCurrency})
                </SectionTitle>
                <SectionDescription style={{ marginBottom: '12px' }}>
                  Configure tax, service charge, etc. for {selectedCurrency} invoices. Up to 3 items.
                </SectionDescription>

                {[0, 1, 2].map((index) => {
                  const charge = getChargesForCurrency(selectedCurrency)[index] || { enabled: false, name: '', rate: 0 };
                  return (
                    <PaymentMethodCard key={`charge-${selectedCurrency}-${index}`} style={{ marginBottom: '12px' }}>
                      <MethodHeader>
                        <MethodInfo>
                          <MethodLabel>Charge Item {index + 1}</MethodLabel>
                          <MethodDescription>{charge.enabled && charge.name ? `${charge.name} (${charge.rate}%)` : 'Not configured'}</MethodDescription>
                        </MethodInfo>
                        <ToggleSwitch>
                          <ToggleInput
                            type="checkbox"
                            checked={charge.enabled}
                            onChange={(e) => handleChargeChange(selectedCurrency, index, 'enabled', e.target.checked)}
                          />
                          <ToggleSlider />
                        </ToggleSwitch>
                      </MethodHeader>
                      {charge.enabled && (
                        <MethodContent>
                          <FormRow>
                            <FormGroup>
                              <Label>Item Name</Label>
                              <Input
                                type="text"
                                value={charge.name}
                                onChange={(e) => handleChargeChange(selectedCurrency, index, 'name', e.target.value)}
                                placeholder="e.g., SST, VAT, Service Charge"
                              />
                              <HelpText>Name displayed on invoices</HelpText>
                            </FormGroup>
                            <FormGroup>
                              <Label>Rate (%)</Label>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={charge.rate}
                                onChange={(e) => handleChargeChange(selectedCurrency, index, 'rate', parseFloat(e.target.value) || 0)}
                                placeholder="0"
                              />
                              <HelpText>Percentage to add to subtotal</HelpText>
                            </FormGroup>
                          </FormRow>
                        </MethodContent>
                      )}
                    </PaymentMethodCard>
                  );
                })}
              </>
            )}
          </Section>

          <SaveButtonContainer>
            <SaveButtonGroup>
              {saveStatus && (
                <StatusMessage type={saveStatus.type}>
                  {saveStatus.message}
                </StatusMessage>
              )}
              <SaveButton onClick={savePaymentSettings} disabled={isSaving || !hasChanges}>
                {isSaving ? 'Saving...' : hasChanges ? 'Save Changes' : 'Saved'}
              </SaveButton>
            </SaveButtonGroup>
          </SaveButtonContainer>
        </Content>
      </Container>

      {/* Currency Selection Modal */}
      <Modal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        title="Select Supported Currencies"
        size="medium"
        footer={
          <>
            <ModalButton variant="secondary" onClick={() => setShowCurrencyModal(false)}>
              Cancel
            </ModalButton>
            <ModalButton
              variant="primary"
              onClick={updateSupportedCurrencies}
              disabled={tempSelectedCurrencies.length === 0}
            >
              Save ({tempSelectedCurrencies.length} selected)
            </ModalButton>
          </>
        }
      >
        <p style={{ color: '#6B7280', marginBottom: '16px' }}>
          Select from the currencies enabled by System Administrator.
        </p>
        {systemSupportedCurrencies.length === 0 ? (
          <p style={{ color: '#DC2626', padding: '16px', background: '#FEF2F2', borderRadius: '8px' }}>
            No currencies have been configured by System Administrator yet.
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {/* Only show currencies enabled by System Administrator */}
            {systemSupportedCurrencies.map(code => {
              const config = currencyConfig[code];
              if (!config) return null;
              return (
                <label
                  key={code}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    border: `1px solid ${tempSelectedCurrencies.includes(code) ? '#635BFF' : '#E6EBF1'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: tempSelectedCurrencies.includes(code) ? '#F0F0FF' : 'white',
                    transition: 'all 0.2s'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={tempSelectedCurrencies.includes(code)}
                    onChange={() => toggleCurrencySelection(code)}
                    style={{ width: '18px', height: '18px', accentColor: '#635BFF' }}
                  />
                  <div>
                    <div style={{ fontWeight: 500 }}>
                      {config.symbol} {code}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>
                      {config.name}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </Modal>
    </>
  );
};

export default FoodcourtPaymentSettingsPage;
