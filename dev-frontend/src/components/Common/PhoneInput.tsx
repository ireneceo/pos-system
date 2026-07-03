import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  formatPhoneInput,
  getPhoneErrorMessage,
  formatPhoneNumber,
  COUNTRIES,
  getCountryByCode,
  detectCountryFromInternational
} from '../../utils/phoneUtils';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onBlur?: () => void;
  defaultCountry?: string; // 기본 국가 코드 (예: 'MY')
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 8px 12px 8px 80px;
  border: 1px solid ${props => props.hasError ? '#EF4444' : '#C7CED6'};
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#EF4444' : '#635BFF'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 91, 255, 0.1)'};
  }

  &::placeholder {
    color: #6B7280;
  }

  &:disabled {
    background: #F1F4F8;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: #EF4444;
  margin-top: 4px;
`;

const HelperText = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 4px;
`;

const CountrySelector = styled.button`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: #F1F4F8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CountryDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 280px;
  z-index: 1000;
  min-width: 260px;
  display: flex;
  flex-direction: column;
`;

const SearchInputWrapper = styled.div`
  padding: 8px;
  border-bottom: 1px solid #C7CED6;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #635BFF;
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #6B7280;
  }
`;

const CountryList = styled.div`
  overflow-y: auto;
  max-height: 220px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #F1F4F8;
  }

  &::-webkit-scrollbar-thumb {
    background: #6B7280;
    border-radius: 3px;
  }
`;

const EmptyState = styled.div`
  padding: 20px;
  text-align: center;
  color: #6B7280;
  font-size: 13px;
`;

const CountryOption = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  transition: background 0.2s;

  &:hover {
    background: #F1F4F8;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #F1F4F8;
  }
`;

const CountryFlag = styled.span`
  font-size: 18px;
`;

const CountryInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CountryName = styled.div`
  font-weight: 500;
  color: #1F2937;
`;

const CountryDialCode = styled.div`
  font-size: 12px;
  color: #4B5563;
`;

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder = '123456789',
  required = false,
  disabled = false,
  autoFocus = false,
  onBlur,
  defaultCountry = 'MY'
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(getCountryByCode(defaultCountry));
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 초기값 설정 — 저장된 국제번호의 실제 dial code로 국가를 판별해 맞춘다.
  // (기존: 항상 selectedCountry(기본국가)로 strip → 다른 국가코드 번호는 표시가
  //  깨지고 한 글자만 쳐도 잘못된 국가코드로 저장되던 버그)
  useEffect(() => {
    if (!value) {
      setDisplayValue('');
      return;
    }
    const detected = detectCountryFromInternational(value);
    if (detected && detected.code !== selectedCountry.code) {
      // 저장된 번호의 국가를 채택 (effect가 갱신된 selectedCountry로 재실행)
      setSelectedCountry(detected);
      return;
    }
    const country = detected || selectedCountry;
    // dial code를 접두사로서만 제거 (문자열 어디서나 replace 하지 않음)
    const local = value.startsWith(country.dialCode) ? value.slice(country.dialCode.length) : value;
    setDisplayValue(formatPhoneInput(local, country.code));
  }, [value, selectedCountry]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
        setCountrySearch('');
      }
    };

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      // 드롭다운 열릴 때 검색 input에 포커스
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

  // 국가 필터링
  const filteredCountries = COUNTRIES.filter(country => {
    const searchLower = countrySearch.toLowerCase();
    return (
      country.name.toLowerCase().includes(searchLower) ||
      country.code.toLowerCase().includes(searchLower) ||
      country.dialCode.includes(searchLower)
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatPhoneInput(inputValue, selectedCountry.code);
    setDisplayValue(formatted);

    // 숫자만 추출하여 국가코드 추가
    const numbers = inputValue.replace(/\D/g, '');
    const internationalFormat = numbers ? formatPhoneNumber(numbers, selectedCountry.code) : '';
    onChange(internationalFormat);

    // 에러 클리어
    if (error) {
      setError(null);
    }
  };

  const handleCountryChange = (country: typeof selectedCountry) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setCountrySearch('');

    // 기존 번호가 있으면 새 국가코드로 재포맷
    if (displayValue) {
      const numbers = displayValue.replace(/\D/g, '');
      const internationalFormat = formatPhoneNumber(numbers, country.code);
      onChange(internationalFormat);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);

    // displayValue 기준으로 검증 (value prop은 비동기 업데이트라 stale할 수 있음)
    if (displayValue && required) {
      const numbers = displayValue.replace(/\D/g, '');
      const internationalFormat = numbers ? formatPhoneNumber(numbers, selectedCountry.code) : '';
      const errorMsg = internationalFormat ? getPhoneErrorMessage(internationalFormat, selectedCountry.code) : null;
      setError(errorMsg);
    }

    if (onBlur) {
      onBlur();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setError(null);
  };

  return (
    <Container>
      <InputWrapper ref={containerRef}>
        <CountrySelector
          type="button"
          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
          disabled={disabled}
        >
          <CountryFlag>{selectedCountry.flag}</CountryFlag>
          <span>{selectedCountry.dialCode}</span>
        </CountrySelector>

        {showCountryDropdown && (
          <CountryDropdown>
            <SearchInputWrapper>
              <SearchInput
                ref={searchInputRef}
                type="text"
                placeholder="Search country..."
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </SearchInputWrapper>

            <CountryList>
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <CountryOption
                    key={country.code}
                    type="button"
                    onClick={() => handleCountryChange(country)}
                  >
                    <CountryFlag>{country.flag}</CountryFlag>
                    <CountryInfo>
                      <CountryName>{country.name}</CountryName>
                      <CountryDialCode>{country.dialCode}</CountryDialCode>
                    </CountryInfo>
                  </CountryOption>
                ))
              ) : (
                <EmptyState>No countries found</EmptyState>
              )}
            </CountryList>
          </CountryDropdown>
        )}

        <StyledInput
          type="tel"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          hasError={!!error}
          inputMode="numeric"
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && !isFocused && !value && (
        <HelperText>{selectedCountry.name} phone number ({selectedCountry.minLength}-{selectedCountry.maxLength} digits)</HelperText>
      )}
    </Container>
  );
};

export default PhoneInput;
