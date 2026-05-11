import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import AutoSaveField from '../../components/Common/AutoSaveField';
import { getAuthToken } from '../../utils/auth';

interface InvoiceSettings {
  invoicePrefix: string;
  paymentTerms: number;
  taxRate: number;
  autoGenerate: boolean;
  autoSendEmail: boolean;
}

const DEFAULT_SETTINGS: InvoiceSettings = {
  invoicePrefix: 'INV',
  paymentTerms: 30,
  taxRate: 0,
  autoGenerate: false,
  autoSendEmail: false
};

const Container = styled.div`
  background: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 0;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const HelpText = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  margin-bottom: 12px;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #6B7C93;
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

const SupplierInvoiceSettingsPage: React.FC = () => {
  const { t } = useTranslation('supplier');
  const [settings, setSettings] = useState<InvoiceSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();
      const res = await fetch('/api/supplier/invoice-settings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to load invoice settings');
      }
      const d = json.data || {};
      setSettings({
        invoicePrefix: typeof d.invoicePrefix === 'string' ? d.invoicePrefix : 'INV',
        paymentTerms: Number.isFinite(Number(d.paymentTerms)) ? Number(d.paymentTerms) : 30,
        taxRate: Number.isFinite(Number(d.taxRate)) ? Number(d.taxRate) : 0,
        autoGenerate: !!d.autoGenerate,
        autoSendEmail: !!d.autoSendEmail
      });
    } catch (e: any) {
      console.error('[SupplierInvoiceSettings] fetch error:', e);
      setError(e.message || 'Failed to load invoice settings');
    } finally {
      setLoading(false);
    }
  };

  const saveField = async (field: keyof InvoiceSettings, value: any) => {
    const token = getAuthToken();
    const res = await fetch('/api/supplier/invoice-settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ [field]: value })
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j.message || 'Failed to save');
    }
  };

  const handleChange = <K extends keyof InvoiceSettings>(field: K, value: InvoiceSettings[K]) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <Container>
        <Header><Title>Invoice Settings</Title></Header>
        <Content><LoadingMessage>Loading...</LoadingMessage></Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header><Title>Invoice Settings</Title></Header>
      <Content>
        {error && <ErrorBanner>{error}</ErrorBanner>}

        <Section>
          <SectionTitle>Invoice Configuration</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Invoice Prefix</Label>
              <AutoSaveField onSave={() => saveField('invoicePrefix', settings.invoicePrefix)}>
                <Input
                  type="text"
                  value={settings.invoicePrefix}
                  onChange={e => handleChange('invoicePrefix', e.target.value)}
                  placeholder="INV"
                />
              </AutoSaveField>
              <HelpText>Prefix prepended to invoice numbers (e.g., INV-2026-0001)</HelpText>
            </FormGroup>

            <FormGroup>
              <Label>Payment Terms (days)</Label>
              <AutoSaveField onSave={() => saveField('paymentTerms', settings.paymentTerms)}>
                <Input
                  type="number"
                  min="0"
                  value={settings.paymentTerms}
                  onChange={e => handleChange('paymentTerms', parseInt(e.target.value, 10) || 0)}
                  placeholder="30"
                />
              </AutoSaveField>
              <HelpText>Days customers have to pay invoices after issue date</HelpText>
            </FormGroup>

            <FormGroup>
              <Label>Tax Rate (%)</Label>
              <AutoSaveField onSave={() => saveField('taxRate', settings.taxRate)}>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={settings.taxRate}
                  onChange={e => handleChange('taxRate', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                />
              </AutoSaveField>
              <HelpText>Default tax rate applied to invoice line items</HelpText>
            </FormGroup>
          </FormGrid>
        </Section>

        <Section>
          <SectionTitle>Automation</SectionTitle>

          <AutoSaveField type="toggle" onSave={() => saveField('autoGenerate', settings.autoGenerate)}>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={settings.autoGenerate}
                onChange={e => handleChange('autoGenerate', e.target.checked)}
              />
              Automatically generate trade invoices from confirmed orders
            </CheckboxLabel>
          </AutoSaveField>

          <AutoSaveField type="toggle" onSave={() => saveField('autoSendEmail', settings.autoSendEmail)}>
            <CheckboxLabel>
              <input
                type="checkbox"
                checked={settings.autoSendEmail}
                onChange={e => handleChange('autoSendEmail', e.target.checked)}
              />
              Automatically email invoices to customers when generated
            </CheckboxLabel>
          </AutoSaveField>
        </Section>
      </Content>
    </Container>
  );
};

export default SupplierInvoiceSettingsPage;
