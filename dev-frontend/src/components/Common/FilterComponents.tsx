import React from 'react';
import styled from 'styled-components';

// Common Filter Bar - completely independent from tables/cards
const CommonFilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 20px;
  }
`;

// Common Search Input
const CommonSearchInput = styled.input`
  flex: none;
  width: 350px;
  min-width: 350px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 768px) {
    width: 300px;
    min-width: 300px;
  }

  @media (max-width: 480px) {
    width: 100%;
    min-width: 100%;
  }
`;

// Common Filter Select
const CommonFilterSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    min-width: 120px;
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
}

// Export styled components as React components with proper props
export const FilterBar: React.FC<CommonFilterBarProps> = ({ children, className, ...props }) => (
  <CommonFilterBar className={className} {...props}>
    {children}
  </CommonFilterBar>
);

export const SearchInput: React.FC<CommonSearchInputProps> = ({ placeholder = "Search...", ...props }) => (
  <CommonSearchInput placeholder={placeholder} {...props} />
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

export default {
  FilterBar,
  SearchInput,
  FilterSelect,
  QuickFilters
};