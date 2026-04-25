import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormRow, FormGroup, FormLabel, FormInput, FormSelect, FormHelperText } from './FormComponents';
import { Address, getCountryList, AppLocale, normalizePlaceName, validatePostalCode } from '../../utils/formatAddress';
import { getAuthToken } from '../../utils/auth';

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

const WarnText = styled(FormHelperText)`color: #B45309;`;

const LatLngRow = styled(FormRow)`
  input { font-family: monospace; font-size: 13px; }
`;

function sanitizeSingleLine(v: string) {
  return v.replace(/[\r\n\t]/g, ' ');
}

// Module-level cache so navigating between pages doesn't re-fetch the same country
const SUGGEST_CACHE = new Map<string, { city: string[]; state: string[]; ts: number }>();
const SUGGEST_TTL = 5 * 60 * 1000;

async function fetchSuggestions(country: string): Promise<{ city: string[]; state: string[] }> {
  const key = (country || '').toUpperCase();
  if (!key) return { city: [], state: [] };
  const cached = SUGGEST_CACHE.get(key);
  if (cached && Date.now() - cached.ts < SUGGEST_TTL) {
    return { city: cached.city, state: cached.state };
  }
  try {
    const token = getAuthToken();
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
    const [cityR, stateR] = await Promise.all([
      fetch(`/api/address/suggestions?field=city&country=${encodeURIComponent(key)}`, { headers }),
      fetch(`/api/address/suggestions?field=state&country=${encodeURIComponent(key)}`, { headers })
    ]);
    const cityJ = cityR.ok ? await cityR.json() : { suggestions: [] };
    const stateJ = stateR.ok ? await stateR.json() : { suggestions: [] };
    const result = {
      city: Array.isArray(cityJ.suggestions) ? cityJ.suggestions : [],
      state: Array.isArray(stateJ.suggestions) ? stateJ.suggestions : []
    };
    SUGGEST_CACHE.set(key, { ...result, ts: Date.now() });
    return result;
  } catch {
    return { city: [], state: [] };
  }
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

  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [stateSuggestions, setStateSuggestions] = useState<string[]>([]);
  const fetchSeqRef = useRef(0);

  // Fetch datalist suggestions whenever country changes
  useEffect(() => {
    if (!country) return;
    const seq = ++fetchSeqRef.current;
    fetchSuggestions(country).then(({ city, state }) => {
      // ignore stale responses if user changed country quickly
      if (seq !== fetchSeqRef.current) return;
      setCitySuggestions(city);
      setStateSuggestions(state);
    });
  }, [country]);

  const set = (partial: Partial<Address>) => onChange({ ...value, ...partial });
  const req = (f: keyof Address) => required.includes(f);

  const postalValid = validatePostalCode(country, value.postal_code);

  const cityListId = `addr-city-${country || 'NA'}`;
  const stateListId = `addr-state-${country || 'NA'}`;

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
            onBlur={e => {
              const normalized = normalizePlaceName(e.target.value);
              if (normalized !== value.city) set({ city: normalized });
            }}
            maxLength={100}
            autoComplete="address-level2"
            list={cityListId}
          />
          <datalist id={cityListId}>
            {citySuggestions.map(c => <option key={c} value={c} />)}
          </datalist>
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
          {!postalValid && (
            <WarnText>
              {t('address.postalCodeInvalid', "Doesn't match the postal-code format for the selected country (saved as-is).")}
            </WarnText>
          )}
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
            onBlur={e => {
              const normalized = normalizePlaceName(e.target.value);
              if (normalized !== value.state) set({ state: normalized });
            }}
            maxLength={100}
            autoComplete="address-level1"
            list={stateListId}
          />
          <datalist id={stateListId}>
            {stateSuggestions.map(s => <option key={s} value={s} />)}
          </datalist>
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
