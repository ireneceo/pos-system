import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import AutoSaveField from '../../components/Common/AutoSaveField';
import PaymentGatewayGuide from '../../components/Payment/PaymentGatewayGuide';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { CURRENCY_CONFIG } from '../../utils/currency';
import { getAuthToken } from '../../utils/auth';

interface StripeConfig {
  enabled: boolean;
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
}

interface PayPalConfig {
  enabled: boolean;
  clientId: string;
  clientSecret: string;
  webhookId: string;
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

interface PaymentSettings {
  currencies: string[];
  defaultCurrency: string;
  stripe: StripeConfig;
  paypal: PayPalConfig;
  bankTransfer: { [currency: string]: BankTransferConfig };
  qrPayment: { [currency: string]: QRPaymentConfig };
}

const DEFAULT_SETTINGS: PaymentSettings = {
  currencies: ['MYR'],
  defaultCurrency: 'MYR',
  stripe: { enabled: false, publishableKey: '', secretKey: '', webhookSecret: '' },
  paypal: { enabled: false, clientId: '', clientSecret: '', webhookId: '' },
  bankTransfer: {},
  qrPayment: {}
};

const Container = styled.div`
  background: #F9FAFB;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const Section = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const SectionDescription = styled.p`
  color: #4B5563;
  font-size: 14px;
  margin: 0 0 20px 0;
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
  color: #1F2937;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const PaymentMethodCard = styled.div`
  background: white;
  border: 1px solid #C7CED6;
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
  color: #4B5563;
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
  top: 0; left: 0; right: 0; bottom: 0;
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
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
`;

const MethodContent = styled.div`
  border-top: 1px solid #C7CED6;
  margin-top: 16px;
  padding-top: 16px;
`;

const NoCurrencyMessage = styled.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #4B5563;
  font-size: 14px;
`;

const ErrorBanner = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #991B1B;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  margin-bottom: 24px;
`;

const SUPPORTED_CURRENCIES = ['MYR', 'USD', 'KRW', 'SGD', 'THB', 'JPY', 'EUR', 'GBP', 'CNY'];

const SupplierPaymentSettingsPage: React.FC = () => {
  const { t } = useTranslation('supplier');
  const [settings, setSettings] = useState<PaymentSettings>(DEFAULT_SETTINGS);
  const settingsRef = useRef<PaymentSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('MYR');

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (settings.currencies.length > 0 && !settings.currencies.includes(selectedCurrency)) {
      setSelectedCurrency(settings.currencies[0]);
    }
  }, [settings.currencies, selectedCurrency]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();
      const res = await fetch('/api/supplier/payment-settings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to load payment settings');
      }
      const merged: PaymentSettings = {
        ...DEFAULT_SETTINGS,
        ...(json.data || {}),
        stripe: { ...DEFAULT_SETTINGS.stripe, ...((json.data || {}).stripe || {}) },
        paypal: { ...DEFAULT_SETTINGS.paypal, ...((json.data || {}).paypal || {}) },
        bankTransfer: (json.data || {}).bankTransfer || {},
        qrPayment: (json.data || {}).qrPayment || {},
        currencies: (json.data || {}).currencies || ['MYR'],
        defaultCurrency: (json.data || {}).defaultCurrency || 'MYR'
      };
      settingsRef.current = merged;
      setSettings(merged);
      if (merged.currencies.length > 0) {
        setSelectedCurrency(merged.currencies[0]);
      }
    } catch (e: any) {
      console.error('[SupplierPaymentSettings] fetch error:', e);
      setError(e.message || 'Failed to load payment settings');
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = (updater: (prev: PaymentSettings) => PaymentSettings) => {
    setSettings(prev => {
      const next = updater(prev);
      settingsRef.current = next;
      return next;
    });
  };

  const saveKey = async (key: keyof PaymentSettings) => {
    const token = getAuthToken();
    const res = await fetch('/api/supplier/payment-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ [key]: settingsRef.current[key] })
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j.message || 'Failed to save');
    }
  };

  const toggleCurrency = (code: string) => {
    updateSettings(prev => {
      const has = prev.currencies.includes(code);
      const nextList = has ? prev.currencies.filter(c => c !== code) : [...prev.currencies, code];
      const nextDefault = !nextList.includes(prev.defaultCurrency) ? (nextList[0] || 'MYR') : prev.defaultCurrency;
      return { ...prev, currencies: nextList, defaultCurrency: nextDefault };
    });
    // Save both keys after state set
    setTimeout(() => { saveKey('currencies'); saveKey('defaultCurrency'); }, 0);
  };

  const handleStripeChange = (field: keyof StripeConfig, value: string | boolean) => {
    updateSettings(prev => ({ ...prev, stripe: { ...prev.stripe, [field]: value } }));
  };

  const handlePayPalChange = (field: keyof PayPalConfig, value: string | boolean) => {
    updateSettings(prev => ({ ...prev, paypal: { ...prev.paypal, [field]: value } }));
  };

  const handleBankTransferChange = (currency: string, field: keyof BankTransferConfig, value: string | boolean) => {
    updateSettings(prev => ({
      ...prev,
      bankTransfer: {
        ...prev.bankTransfer,
        [currency]: {
          enabled: false, bankName: '', accountNumber: '', accountName: '',
          ...prev.bankTransfer[currency],
          [field]: value
        }
      }
    }));
  };

  const handleQRChange = (currency: string, field: keyof QRPaymentConfig, value: string | boolean) => {
    updateSettings(prev => ({
      ...prev,
      qrPayment: {
        ...prev.qrPayment,
        [currency]: {
          enabled: false, qrImage: '', qrDescription: '',
          ...prev.qrPayment[currency],
          [field]: value
        }
      }
    }));
  };

  const getBank = (c: string): BankTransferConfig =>
    settings.bankTransfer[c] || { enabled: false, bankName: '', accountNumber: '', accountName: '' };
  const getQR = (c: string): QRPaymentConfig =>
    settings.qrPayment[c] || { enabled: false, qrImage: '', qrDescription: '' };

  if (loading) {
    return (
      <Container>
        <Header><Title>Payment Settings</Title></Header>
        <Content><LoadingMessage>Loading...</LoadingMessage></Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header><Title>Payment Settings</Title></Header>
      <Content>
        {error && <ErrorBanner>{error}</ErrorBanner>}

        {/* Currency Settings */}
        <Section>
          <SectionTitle>Currency Settings</SectionTitle>
          <SectionDescription>
            Configure supported currencies for trade invoices and customer payments.
          </SectionDescription>

          <FormRow>
            <FormGroup>
              <Label>Default Currency</Label>
              <AutoSaveField type="select" onSave={() => saveKey('defaultCurrency')}>
                <Select
                  value={settings.defaultCurrency}
                  onChange={e => updateSettings(prev => ({ ...prev, defaultCurrency: e.target.value }))}
                >
                  {settings.currencies.map(code => (
                    <option key={code} value={code}>
                      {CURRENCY_CONFIG[code]?.symbol || code} {code} - {CURRENCY_CONFIG[code]?.name || code}
                    </option>
                  ))}
                </Select>
              </AutoSaveField>
            </FormGroup>

            <FormGroup>
              <Label>Supported Currencies</Label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SUPPORTED_CURRENCIES.map(code => {
                  const active = settings.currencies.includes(code);
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => toggleCurrency(code)}
                      style={{
                        padding: '6px 12px',
                        border: `1px solid ${active ? '#635BFF' : '#C7CED6'}`,
                        background: active ? '#F0F0FF' : 'white',
                        color: active ? '#635BFF' : '#1F2937',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 500
                      }}
                    >
                      {CURRENCY_CONFIG[code]?.symbol || ''} {code}
                    </button>
                  );
                })}
              </div>
            </FormGroup>
          </FormRow>
        </Section>

        {/* Online Payments */}
        <Section>
          <SectionTitle>Online Payment</SectionTitle>
          <SectionDescription>
            Configure online payment gateways. Applied across all currencies.
          </SectionDescription>

          {/* Stripe */}
          <PaymentMethodCard>
            <MethodHeader>
              <MethodInfo>
                <MethodLabel>Stripe</MethodLabel>
                <MethodDescription>Credit/debit card payments</MethodDescription>
              </MethodInfo>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                  checked={settings.stripe.enabled}
                  onChange={e => { handleStripeChange('enabled', e.target.checked); setTimeout(() => saveKey('stripe'), 0); }}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </MethodHeader>
            {settings.stripe.enabled && (
              <MethodContent>
                <PaymentGatewayGuide gateway="stripe" />
                <FormGroup>
                  <Label>Publishable Key</Label>
                  <AutoSaveField onSave={() => saveKey('stripe')}>
                    <Input
                      type="text"
                      placeholder="pk_live_..."
                      value={settings.stripe.publishableKey}
                      onChange={e => handleStripeChange('publishableKey', e.target.value)}
                    />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>Secret Key</Label>
                  <AutoSaveField onSave={() => saveKey('stripe')}>
                    <Input
                      type="password"
                      placeholder="sk_live_..."
                      value={settings.stripe.secretKey}
                      onChange={e => handleStripeChange('secretKey', e.target.value)}
                    />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>Webhook Secret</Label>
                  <AutoSaveField onSave={() => saveKey('stripe')}>
                    <Input
                      type="password"
                      placeholder="whsec_..."
                      value={settings.stripe.webhookSecret}
                      onChange={e => handleStripeChange('webhookSecret', e.target.value)}
                    />
                  </AutoSaveField>
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
                  checked={settings.paypal.enabled}
                  onChange={e => { handlePayPalChange('enabled', e.target.checked); setTimeout(() => saveKey('paypal'), 0); }}
                />
                <ToggleSlider />
              </ToggleSwitch>
            </MethodHeader>
            {settings.paypal.enabled && (
              <MethodContent>
                <PaymentGatewayGuide gateway="paypal" />
                <FormGroup>
                  <Label>Client ID</Label>
                  <AutoSaveField onSave={() => saveKey('paypal')}>
                    <Input
                      type="text"
                      placeholder="PayPal Client ID"
                      value={settings.paypal.clientId}
                      onChange={e => handlePayPalChange('clientId', e.target.value)}
                    />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>Client Secret</Label>
                  <AutoSaveField onSave={() => saveKey('paypal')}>
                    <Input
                      type="password"
                      placeholder="PayPal Client Secret"
                      value={settings.paypal.clientSecret}
                      onChange={e => handlePayPalChange('clientSecret', e.target.value)}
                    />
                  </AutoSaveField>
                </FormGroup>
                <FormGroup>
                  <Label>Webhook ID</Label>
                  <AutoSaveField onSave={() => saveKey('paypal')}>
                    <Input
                      type="text"
                      placeholder="PayPal Webhook ID (e.g. WH-…)"
                      value={settings.paypal.webhookId || ''}
                      onChange={e => handlePayPalChange('webhookId', e.target.value)}
                    />
                  </AutoSaveField>
                  <div style={{ fontSize: 12, color: '#4B5563', marginTop: 4, lineHeight: 1.5 }}>
                    From PayPal Developer Dashboard → your app → Live Webhooks → click your webhook → copy "Webhook ID".
                  </div>
                </FormGroup>
              </MethodContent>
            )}
          </PaymentMethodCard>
        </Section>

        {/* Manual Payments per currency */}
        <Section>
          <SectionTitle>Manual Payment (per currency)</SectionTitle>
          <SectionDescription>
            Configure bank transfer and QR payment per currency. Different currencies require different bank accounts and QR codes.
          </SectionDescription>

          {settings.currencies.length === 0 ? (
            <NoCurrencyMessage>
              No currencies configured. Please add supported currencies above first.
            </NoCurrencyMessage>
          ) : (
            <>
              <Tabs>
                {settings.currencies.map(code => (
                  <Tab
                    key={code}
                    active={selectedCurrency === code}
                    onClick={() => setSelectedCurrency(code)}
                  >
                    {CURRENCY_CONFIG[code]?.symbol || ''} {code}
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
                      checked={getBank(selectedCurrency).enabled}
                      onChange={e => { handleBankTransferChange(selectedCurrency, 'enabled', e.target.checked); setTimeout(() => saveKey('bankTransfer'), 0); }}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </MethodHeader>
                {getBank(selectedCurrency).enabled && (
                  <MethodContent>
                    <FormGroup>
                      <Label>Bank Name</Label>
                      <AutoSaveField onSave={() => saveKey('bankTransfer')}>
                        <Input
                          type="text"
                          placeholder="e.g., Maybank, CIMB"
                          value={getBank(selectedCurrency).bankName}
                          onChange={e => handleBankTransferChange(selectedCurrency, 'bankName', e.target.value)}
                        />
                      </AutoSaveField>
                    </FormGroup>
                    <FormGroup>
                      <Label>Account Number</Label>
                      <AutoSaveField onSave={() => saveKey('bankTransfer')}>
                        <Input
                          type="text"
                          placeholder="Bank account number"
                          value={getBank(selectedCurrency).accountNumber}
                          onChange={e => handleBankTransferChange(selectedCurrency, 'accountNumber', e.target.value)}
                        />
                      </AutoSaveField>
                    </FormGroup>
                    <FormGroup>
                      <Label>Account Name</Label>
                      <AutoSaveField onSave={() => saveKey('bankTransfer')}>
                        <Input
                          type="text"
                          placeholder="Account holder name"
                          value={getBank(selectedCurrency).accountName}
                          onChange={e => handleBankTransferChange(selectedCurrency, 'accountName', e.target.value)}
                        />
                      </AutoSaveField>
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
                      checked={getQR(selectedCurrency).enabled}
                      onChange={e => { handleQRChange(selectedCurrency, 'enabled', e.target.checked); setTimeout(() => saveKey('qrPayment'), 0); }}
                    />
                    <ToggleSlider />
                  </ToggleSwitch>
                </MethodHeader>
                {getQR(selectedCurrency).enabled && (
                  <MethodContent>
                    <ImageUploadDropzone
                      value={getQR(selectedCurrency).qrImage}
                      onChange={(base64: string) => { handleQRChange(selectedCurrency, 'qrImage', base64); setTimeout(() => saveKey('qrPayment'), 0); }}
                      label="QR Code Image"
                      helpText={`Upload QR code for ${selectedCurrency} payments`}
                      changeButtonText="Change QR Code"
                      removeButtonText="Remove QR Code"
                      imageAltText="Payment QR Code"
                    />
                    <FormGroup style={{ marginTop: 16 }}>
                      <Label>Description</Label>
                      <AutoSaveField onSave={() => saveKey('qrPayment')}>
                        <Input
                          type="text"
                          placeholder="e.g., Scan to pay via DuitNow"
                          value={getQR(selectedCurrency).qrDescription}
                          onChange={e => handleQRChange(selectedCurrency, 'qrDescription', e.target.value)}
                        />
                      </AutoSaveField>
                    </FormGroup>
                  </MethodContent>
                )}
              </PaymentMethodCard>
            </>
          )}
        </Section>
      </Content>
    </Container>
  );
};

export default SupplierPaymentSettingsPage;
