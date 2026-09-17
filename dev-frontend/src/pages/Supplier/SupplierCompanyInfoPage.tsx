import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import AutoSaveField from '../../components/Common/AutoSaveField';
import DeliveryTermsText from '../../components/Common/DeliveryTermsText';
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
  // 배송 조건 두 칸 (2026-09-17 Fable 판정 ⑦) — 구매자가 나에게 발주할 때 자동으로 붙는 배송비 규칙
  min_order_amount: string;
  delivery_fee: string;
  bank_account_name: string;
  // 판매 방식·주문용 상품 링크는 **상품 화면**에서 다룬다(components/Settings/SellerShopLinkCard).
  //   회사 정보는 상호·주소·계좌를 적는 곳이라 손님에게 뿌리는 링크가 여기 있으면 아무도 못 찾는다
  //   (2026-09-12 Irene 지적으로 옮김).
}

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

    /* 태블릿 세로(769~1024) — 이 구간 규칙이 없어 우측 내용이 넘치면 80px 고정에 잘렸다.
     내용이 접히면 높이만 늘어난다. PC·모바일 동작은 그대로. (2026-09-08 Irene) */
  @media (min-width: 769px) and (max-width: 1024px) {
    height: auto;
    min-height: 80px;
    max-height: none;
  }

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    max-height: none;   /* 세로로 쌓이면 80px 밖으로 잘렸다 (2026-09-08) */
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
  border: 1px solid #C7CED6;
  padding: 32px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F1F4F8;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DeliveryPreview = styled.div`
  padding: 10px 12px;
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #4B5563;
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
  color: #1F2937;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
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
  border: 1px solid #C7CED6;
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
  min_order_amount: '',
  delivery_fee: '',
  bank_account: '',
  bank_account_name: '',
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
        min_order_amount: d.min_order_amount != null ? String(d.min_order_amount) : '',
        delivery_fee: d.delivery_fee != null ? String(d.delivery_fee) : '',
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

        {/* 배송 조건 (2026-09-17 Fable 판정 ⑦)
            여기 적은 두 숫자로 구매자의 발주 화면에 배송비가 자동으로 붙는다.
            비워 두면 «미설정» — 배송비가 아예 안 나온다(무료라는 뜻이 아니다). */}
        <Section>
          <SectionTitle>{t('company.delivery.title', '배송 조건')}</SectionTitle>
          <FormGrid>
            <FormGroup>
              <Label>{t('company.delivery.freeAbove', '이 금액 이상 주문하면 무료배송')}</Label>
              <AutoSaveField onSave={() => saveField('min_order_amount', company.min_order_amount === '' ? null : Number(company.min_order_amount))}>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={company.min_order_amount}
                  onChange={e => handleChange('min_order_amount', e.target.value)}
                  placeholder="300"
                />
              </AutoSaveField>
            </FormGroup>

            <FormGroup>
              <Label>{t('company.delivery.fee', '그 미만이면 배송비 (고정)')}</Label>
              <AutoSaveField onSave={() => saveField('delivery_fee', company.delivery_fee === '' ? null : Number(company.delivery_fee))}>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={company.delivery_fee}
                  onChange={e => handleChange('delivery_fee', e.target.value)}
                  placeholder="15"
                />
              </AutoSaveField>
            </FormGroup>

            <FormGroup fullWidth>
              {/* 숫자 두 개가 실제로 어떤 문장이 되는지 그 자리에서 보여 준다 */}
              <DeliveryPreview>
                <DeliveryTermsText terms={{
                  min_order_amount: company.min_order_amount === '' ? null : Number(company.min_order_amount),
                  delivery_fee: company.delivery_fee === '' ? null : Number(company.delivery_fee)
                }} />
              </DeliveryPreview>
            </FormGroup>
          </FormGrid>
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
