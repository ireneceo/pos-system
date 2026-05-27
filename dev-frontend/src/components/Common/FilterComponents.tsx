import React from 'react';
import styled from 'styled-components';

// Common Filter Bar - completely independent from tables/cards
const CommonFilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`;

// Common Search Input
// 검색창 표준 폭 — LiveOrders FilterToolbar 패턴 일치 (220-280px), 모바일 풀폭.
// 길게 늘이지 않아서 같은 줄에 카테고리/뷰토글/액션버튼 여유 있게 들어감.
const CommonSearchInput = styled.input`
  flex: 1;
  min-width: 220px;
  max-width: 280px;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #6B7280;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 220px;
  max-width: 280px;

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #6B7280;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #1F2937;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

// Common Filter Select
const CommonFilterSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F1F4F8;
    color: #4B5563;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`;

// Props interfaces
interface CommonSearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

interface CommonFilterSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

interface CommonFilterBarProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Export styled components as React components with proper props
export const FilterBar: React.FC<CommonFilterBarProps> = ({ children, className, style, ...props }) => (
  <CommonFilterBar className={className} style={style} {...props}>
    {children}
  </CommonFilterBar>
);

export const SearchInput: React.FC<CommonSearchInputProps> = ({ placeholder = "Search...", value, onChange, style, ...props }) => (
  <SearchInputWrapper style={style}>
    <CommonSearchInput
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ width: '100%', minWidth: 0, maxWidth: 'none', paddingRight: value ? '36px' : '16px' }}
      {...props}
    />
    {value && (
      <ClearButton
        type="button"
        onClick={() => onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
        aria-label="Clear search"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </ClearButton>
    )}
  </SearchInputWrapper>
);

export const FilterSelect: React.FC<CommonFilterSelectProps> = ({ children, ...props }) => (
  <CommonFilterSelect {...props}>
    {children}
  </CommonFilterSelect>
);

// Export the styled components directly as well for flexibility
export { CommonFilterBar, CommonSearchInput, CommonFilterSelect };

// Pre-configured common filter combinations
interface QuickFiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters?: Array<{
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
    placeholder?: string;
  }>;
}

export const QuickFilters: React.FC<QuickFiltersProps> = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = []
}) => (
  <FilterBar>
    <SearchInput
      type="text"
      placeholder={searchPlaceholder}
      value={searchValue}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    {filters.map((filter, index) => (
      <FilterSelect
        key={index}
        value={filter.value}
        onChange={(e) => filter.onChange(e.target.value)}
      >
        {filter.placeholder && <option value="">{filter.placeholder}</option>}
        {filter.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </FilterSelect>
    ))}
  </FilterBar>
);

// Named exports only - no default export to avoid anonymous-default-export warning