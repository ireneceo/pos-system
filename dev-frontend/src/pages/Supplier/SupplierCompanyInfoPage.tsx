import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import AutoSaveField from '../../components/Common/AutoSaveField';
import AutoSaveAddressFields from '../../components/Form/AutoSaveAddressFields';
import PhoneInput from '../../components/Common/PhoneInput';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import { getAuthToken } from '../../utils/auth';

interface SupplierCompany {
  name: string;
  code: string;
  description: string;
  logo_url: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  address_line_2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  bank_name: string;
  bank_account: string;
  bank_account_name: string;
}

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

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
  }
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

const FormGroup = styled.div<{ fullWidth?: boolean }>`
  grid-column: ${p => p.fullWidth ? 'span 2' : 'span 1'};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
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

const EMPTY: SupplierCompany = {
  name: '',
  code: '',
  description: '',
  logo_url: '',
  email: '',
  phone: '',
  website: '',
  address: '',
  address_line_2: '',
  city: '',
  state: '',
  postal_code: '',
  country: 'MY',
  bank_name: '',
  bank_account: '',
  bank_account_name: ''
};

const SupplierCompanyInfoPage: React.FC = () => {
  const { t } = useTranslation('supplier');
  const [company, setCompany] = useState<SupplierCompany>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();
      const res = await fetch('/api/supplier/company', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to load company info');
      }
      const d = json.data || {};
      setCompany({
        name: d.name || '',
        code: d.code || '',
        description: d.description || '',
        logo_url: d.logo_url || '',
        email: d.email || '',
        phone: d.phone || '',
        website: d.website || '',
        address: d.address || '',
        address_line_2: d.address_line_2 || '',
        city: d.city || '',
        state: d.state || '',
        postal_code: d.postal_code || '',
        country: (d.country || 'MY').toUpperCase(),
        bank_name: d.bank_name || '',
        bank_account: d.bank_account || '',
        bank_account_name: d.bank_account_name || ''
      });
    } catch (e: any) {
      console.error('[SupplierCompanyInfo] fetch error:', e);
      setError(e.message || 'Failed to load company info');
    } finally {
      setLoading(false);
    }
  };

  const saveField = async (field: keyof SupplierCompany, value: any) => {
    const token = getAuthToken();
    const res = await fetch('/api/supplier/company', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ [field]: value })
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j.message || 'Failed to save');
    }
  };

  const handleChange = (field: keyof SupplierCompany, value: string) => {
    setCompany(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <Container>
        <Header><Title>{t('company.title')}</Title></Header>
        <Content><LoadingMessage>Loading...</LoadingMessage></Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{t('company.title')}</Title>
      </Header>

      <Content>
        {error && <ErrorBanner>{error}</ErrorBanner>}

        {/* General */}
        <Section>
          <SectionTitle>{t('company.tabs.general')}</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Supplier Name<span>*</span></Label>
              <AutoSaveField onSave={() => saveField('name', company.name)}>
                <Input
                  type="text"
                  value={company.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder="Enter supplier company name"
                />
              </AutoSaveField>
            </FormGroup>

            <FormGroup>
              <Label>Supplier Code</Label>
              <AutoSaveField onSave={() => saveField('code', company.code)}>
                <Input
                  type="text"
                  value={company.code}
                  onChange={e => handleChange('code', e.target.value)}
                  placeholder="e.g., SUP-001"
                />
              </AutoSaveField>
            </FormGroup>

            <FormGroup fullWidth>
              <Label>Description</Label>
              <AutoSaveField onSave={() => saveField('description', company.description)}>
                <Textarea
                  value={company.description}
                  onChange={e => handleChange('description', e.target.value)}
                  placeholder="Brief description of supplier business"
                />
              </AutoSaveField>
            </FormGroup>

            <FormGroup fullWidth>
              <Label>Logo</Label>
              <AutoSaveField type="image" onSave={() => saveField('logo_url', company.logo_url)}>
                <ImageUploadDropzone
                  value={company.logo_url}
                  onChange={(imageData: string) => handleChange('logo_url', imageData)}
                  imageAltText="Supplier Logo"
                />
              </AutoSaveField>
            </FormGroup>
          </FormGrid>
        </Section>

        {/* Contact */}
        <Section>
          <SectionTitle>Contact</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Email</Label>
              <AutoSaveField onSave={() => saveField('email', company.email)}>
                <Input
                  type="email"
                  value={company.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder="contact@example.com"
                />
              </AutoSaveField>
            </FormGroup>

            <FormGroup>
              <Label>Phone</Label>
              <AutoSaveField onSave={() => saveField('phone', company.phone)}>
                <PhoneInput
                  value={company.phone}
                  onChange={(val: string) => handleChange('phone', val)}
                  defaultCountry={company.country}
                />
              </AutoSaveField>
            </FormGroup>

            <FormGroup fullWidth>
              <Label>Website</Label>
              <AutoSaveField onSave={() => saveField('website', company.website)}>
                <Input
                  type="url"
                  value={company.website}
                  onChange={e => handleChange('website', e.target.value)}
                  placeholder="https://www.example.com"
                />
              </AutoSaveField>
            </FormGroup>
          </FormGrid>
        </Section>

        {/* Address */}
        <Section>
          <SectionTitle>{t('company.tabs.address')}</SectionTitle>
          <AutoSaveAddressFields
            value={{
              address: company.address,
              address_line_2: company.address_line_2,
              city: company.city,
              state: company.state,
              postal_code: company.postal_code,
              country: company.country
            }}
            onChange={(addr) => setCompany(prev => ({
              ...prev,
              address: addr.address || '',
              address_line_2: addr.address_line_2 || '',
              city: addr.city || '',
              state: addr.state || '',
              postal_code: addr.postal_code || '',
              country: (addr.country || '').toUpperCase()
            }))}
            onSave={async () => {
              const token = getAuthToken();
              // Save each address field individually (one PUT per field per AutoSave contract)
              const fields: Array<keyof SupplierCompany> = ['address', 'address_line_2', 'city', 'state', 'postal_code', 'country'];
              for (const f of fields) {
                const res = await fetch('/api/supplier/company', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                  body: JSON.stringify({ [f]: company[f] })
                });
                if (!res.ok) {
                  const j = await res.json().catch(() => ({}));
                  throw new Error(j.message || `Failed to save ${f}`);
                }
              }
            }}
            defaultCountry={company.country || 'MY'}
            required={['address', 'country']}
          />
        </Section>

        {/* Banking */}
        <Section>
          <SectionTitle>{t('company.tabs.banking')}</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>Bank Name</Label>
              <AutoSaveField onSave={() => saveField('bank_name', company.bank_name)}>
                <Input
                  type="text"
                  value={company.bank_name}
                  onChange={e => handleChange('bank_name', e.target.value)}
                  placeholder="e.g., Maybank"
                />
              </AutoSaveField>
            </FormGroup>

            <FormGroup>
              <Label>Bank Account Number</Label>
              <AutoSaveField onSave={() => saveField('bank_account', company.bank_account)}>
                <Input
                  type="text"
                  value={company.bank_account}
                  onChange={e => handleChange('bank_account', e.target.value)}
                  placeholder="Enter account number"
                />
              </AutoSaveField>
            </FormGroup>

            <FormGroup fullWidth>
              <Label>Account Holder Name</Label>
              <AutoSaveField onSave={() => saveField('bank_account_name', company.bank_account_name)}>
                <Input
                  type="text"
                  value={company.bank_account_name}
                  onChange={e => handleChange('bank_account_name', e.target.value)}
                  placeholder="Name on bank account"
                />
              </AutoSaveField>
            </FormGroup>
          </FormGrid>
        </Section>
      </Content>
    </Container>
  );
};

export default SupplierCompanyInfoPage;
