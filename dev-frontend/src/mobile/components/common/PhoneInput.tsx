import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 주요 국가 코드 목록
const COUNTRY_CODES = [
  { code: '+82', country: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: '+60', country: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+65', country: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: '+81', country: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'CN', name: 'China', flag: '🇨🇳' },
  { code: '+1', country: 'US', name: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: '+66', country: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: '+84', country: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: '+63', country: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: '+62', country: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: '+91', country: 'IN', name: 'India', flag: '🇮🇳' },
];

// 국가 코드로 기본 국가코드 찾기 (ISO 코드 또는 국가명 모두 지원)
export const getDefaultCountryCode = (countryCode?: string): string => {
  if (!countryCode) return '+60'; // 기본값 말레이시아

  const upperCode = countryCode.toUpperCase();

  // ISO 코드로 찾기 (예: "MY", "KR")
  let country = COUNTRY_CODES.find(c => c.country === upperCode);

  // 국가명으로 찾기 (예: "Malaysia", "South Korea")
  if (!country) {
    country = COUNTRY_CODES.find(c => c.name.toUpperCase() === upperCode);
  }

  return country?.code || '+60';
};

// E.164 형식으로 변환 (예: +821012345678)
export const formatToE164 = (countryCode: string, phoneNumber: string): string => {
  // 숫자만 추출
  const digits = phoneNumber.replace(/\D/g, '');
  // 앞의 0 제거 (010 -> 10)
  const normalized = digits.startsWith('0') ? digits.slice(1) : digits;
  return `${countryCode}${normalized}`;
};

// E.164에서 파싱 (예: +821012345678 -> { countryCode: '+82', phoneNumber: '1012345678' })
export const parseE164 = (e164: string): { countryCode: string; phoneNumber: string } => {
  if (!e164) return { countryCode: '+82', phoneNumber: '' };

  // 국가 코드 찾기 (긴 것부터 매칭)
  const sortedCodes = [...COUNTRY_CODES].sort((a, b) => b.code.length - a.code.length);

  for (const country of sortedCodes) {
    if (e164.startsWith(country.code)) {
      return {
        countryCode: country.code,
        phoneNumber: e164.slice(country.code.length)
      };
    }
  }

  // 매칭 안 되면 그대로 반환
  return { countryCode: '+82', phoneNumber: e164.replace(/^\+/, '') };
};

const Container = styled.div`
  display: flex;
  gap: 8px;
`;

const CountryCodeSelect = styled.select`
  width: 110px;
  padding: 14px 8px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M2 4l4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const PhoneNumberInput = styled.input`
  flex: 1;
  padding: 14px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.2s;
  background: white;
  -webkit-appearance: none;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

interface PhoneInputProps {
  value: string; // E.164 형식 또는 일반 전화번호
  onChange: (e164Value: string) => void;
  defaultCountryCode?: string; // 레스토랑 국가 코드 (KR, MY 등)
  placeholder?: string;
  disabled?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  defaultCountryCode,
  placeholder = 'Phone number',
  disabled = false
}) => {
  const [countryCode, setCountryCode] = useState(() => {
    if (value) {
      const parsed = parseE164(value);
      return parsed.countryCode;
    }
    return getDefaultCountryCode(defaultCountryCode);
  });

  const [phoneNumber, setPhoneNumber] = useState(() => {
    if (value) {
      const parsed = parseE164(value);
      return parsed.phoneNumber;
    }
    return '';
  });

  // value가 외부에서 변경되면 파싱
  useEffect(() => {
    if (value) {
      const parsed = parseE164(value);
      setCountryCode(parsed.countryCode);
      setPhoneNumber(parsed.phoneNumber);
    }
  }, [value]);

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryCode = e.target.value;
    setCountryCode(newCountryCode);
    if (phoneNumber) {
      onChange(formatToE164(newCountryCode, phoneNumber));
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    if (newPhoneNumber) {
      onChange(formatToE164(countryCode, newPhoneNumber));
    } else {
      onChange('');
    }
  };

  return (
    <Container>
      <CountryCodeSelect
        value={countryCode}
        onChange={handleCountryCodeChange}
        disabled={disabled}
      >
        {COUNTRY_CODES.map(country => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.code}
          </option>
        ))}
      </CountryCodeSelect>
      <PhoneNumberInput
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Container>
  );
};

export default PhoneInput;
