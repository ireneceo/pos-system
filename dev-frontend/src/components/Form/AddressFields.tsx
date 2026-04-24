import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormRow, FormGroup, FormLabel, FormInput, FormSelect, FormHelperText } from './FormComponents';
import { Address, getCountryList, AppLocale } from '../../utils/formatAddress';

export interface AddressFieldsProps {
  value: Address;
  onChange: (value: Address) => void;
  showLatLng?: boolean;
  defaultCountry?: string;
  required?: Array<keyof Address>;
  disabled?: boolean;
  compact?: boolean;
}

const Section = styled.div<{ $compact?: boolean }>`
  display: grid;
  grid-template-columns: ${p => p.$compact ? '1fr 1fr' : '1fr'};
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

const Required = styled.span`color: #DC2626; margin-left: 2px;`;

const LatLngRow = styled(FormRow)`
  input { font-family: monospace; font-size: 13px; }
`;

function sanitizeSingleLine(v: string) {
  return v.replace(/[\r\n\t]/g, ' ');
}

const AddressFields: React.FC<AddressFieldsProps> = ({
  value,
  onChange,
  showLatLng = false,
  defaultCountry = 'MY',
  required = [],
  disabled = false
}) => {
  const { i18n, t } = useTranslation('common');
  const locale = (['en', 'ko', 'zh', 'ms'].includes(i18n.language) ? i18n.language : 'en') as AppLocale;

  const countryList = useMemo(() => getCountryList(locale), [locale]);

  const country = (value.country || '').toUpperCase() || defaultCountry;

  const set = (partial: Partial<Address>) => onChange({ ...value, ...partial });
  const req = (f: keyof Address) => required.includes(f);

  return (
    <div>
      <FormGroup>
        <FormLabel>
          {t('address.line1', 'Address')}
          {req('address') && <Required>*</Required>}
        </FormLabel>
        <FormInput
          type="text"
          value={value.address || ''}
          disabled={disabled}
          onChange={e => set({ address: sanitizeSingleLine(e.target.value) })}
          placeholder={t('address.line1Placeholder', 'Street, building, area')}
          maxLength={500}
          autoComplete="street-address"
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>{t('address.line2', 'Address Line 2 (optional)')}</FormLabel>
        <FormInput
          type="text"
          value={value.address_line_2 || ''}
          disabled={disabled}
          onChange={e => set({ address_line_2: sanitizeSingleLine(e.target.value) })}
          placeholder={t('address.line2Placeholder', 'Unit / Floor / Building name')}
          maxLength={255}
          autoComplete="address-line2"
        />
      </FormGroup>

      <Section $compact>
        <FormGroup style={{ marginBottom: 0 }}>
          <FormLabel>
            {t('address.city', 'City')}
            {req('city') && <Required>*</Required>}
          </FormLabel>
          <FormInput
            type="text"
            value={value.city || ''}
            disabled={disabled}
            onChange={e => set({ city: sanitizeSingleLine(e.target.value) })}
            maxLength={100}
            autoComplete="address-level2"
          />
        </FormGroup>

        <FormGroup style={{ marginBottom: 0 }}>
          <FormLabel>{t('address.postalCode', 'Postal Code')}</FormLabel>
          <FormInput
            type="text"
            value={value.postal_code || ''}
            disabled={disabled}
            onChange={e => set({ postal_code: sanitizeSingleLine(e.target.value) })}
            maxLength={20}
            autoComplete="postal-code"
          />
        </FormGroup>
      </Section>

      <Section $compact style={{ marginTop: 16 }}>
        <FormGroup style={{ marginBottom: 0 }}>
          <FormLabel>{t('address.state', 'State / Province')}</FormLabel>
          <FormInput
            type="text"
            value={value.state || ''}
            disabled={disabled}
            onChange={e => set({ state: sanitizeSingleLine(e.target.value) })}
            maxLength={100}
            autoComplete="address-level1"
          />
        </FormGroup>

        <FormGroup style={{ marginBottom: 0 }}>
          <FormLabel>
            {t('address.country', 'Country')}
            {req('country') && <Required>*</Required>}
          </FormLabel>
          <FormSelect
            value={country}
            disabled={disabled}
            onChange={e => set({ country: e.target.value })}
            autoComplete="country"
          >
            <option value="">{t('address.selectCountry', 'Select country')}</option>
            {countryList.map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </FormSelect>
        </FormGroup>
      </Section>

      {showLatLng && (
        <LatLngRow style={{ marginTop: 16 }}>
          <FormGroup style={{ marginBottom: 0 }}>
            <FormLabel>{t('address.latitude', 'Latitude')}</FormLabel>
            <FormInput
              type="number"
              step="0.0000001"
              value={value.latitude as any ?? ''}
              disabled={disabled}
              onChange={e => set({ latitude: e.target.value === '' ? null : Number(e.target.value) } as any)}
              placeholder="e.g., 3.1390"
            />
            <FormHelperText>{t('address.latLngHint', 'Leave blank to auto-geocode on save')}</FormHelperText>
          </FormGroup>
          <FormGroup style={{ marginBottom: 0 }}>
            <FormLabel>{t('address.longitude', 'Longitude')}</FormLabel>
            <FormInput
              type="number"
              step="0.0000001"
              value={value.longitude as any ?? ''}
              disabled={disabled}
              onChange={e => set({ longitude: e.target.value === '' ? null : Number(e.target.value) } as any)}
              placeholder="e.g., 101.6869"
            />
          </FormGroup>
        </LatLngRow>
      )}
    </div>
  );
};

export default AddressFields;
