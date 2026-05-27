import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface Option {
  value: string | number;
  label: string;
  subLabel?: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string | number | null;
  onChange: (value: string | number | null) => void;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  noOptionsMessage?: string;
}

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const InputWrapper = styled.div<{ isOpen: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid ${props => props.isOpen ? '#635BFF' : '#C7CED6'};
  border-radius: 8px;
  background: ${props => props.disabled ? '#F9FAFB' : 'white'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.disabled ? '#C7CED6' : '#635BFF'};
  }

  ${props => props.isOpen && `
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  `}
`;

const Input = styled.input<{ disabled?: boolean }>`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: ${props => props.disabled ? '#6B7280' : '#0A2540'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'text'};

  &::placeholder {
    color: #6B7280;
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: #C7CED6;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 8px;
  transition: background 0.2s;

  &:hover {
    background: #6B7280;
  }

  svg {
    width: 12px;
    height: 12px;
    color: #4B5563;
  }
`;

const ArrowIcon = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};

  svg {
    width: 16px;
    height: 16px;
    color: #4B5563;
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 240px;
  overflow-y: auto;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const OptionItem = styled.div<{ isSelected: boolean; isHighlighted: boolean }>`
  padding: 10px 12px;
  cursor: pointer;
  background: ${props => {
    if (props.isSelected) return '#F0F4FF';
    if (props.isHighlighted) return '#F9FAFB';
    return 'white';
  }};
  color: ${props => props.isSelected ? '#635BFF' : '#0A2540'};
  font-weight: ${props => props.isSelected ? '500' : '400'};
  transition: background 0.15s;

  &:hover {
    background: ${props => props.isSelected ? '#F0F4FF' : '#F9FAFB'};
  }
`;

const OptionLabel = styled.div`
  font-size: 14px;
`;

const OptionSubLabel = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 2px;
`;

const NoOptions = styled.div`
  padding: 12px;
  text-align: center;
  color: #4B5563;
  font-size: 14px;
`;

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  allowClear = true,
  noOptionsMessage = 'No options found'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (opt.subLabel && opt.subLabel.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setHighlightedIndex(0);
    if (!isOpen) setIsOpen(true);
  };

  const handleOptionClick = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        } else if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        break;
    }
  };

  const displayValue = isOpen ? searchTerm : (selectedOption?.label || '');

  return (
    <Container ref={containerRef}>
      <InputWrapper isOpen={isOpen} disabled={disabled} onClick={handleInputClick}>
        <Input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
        />
        {allowClear && value && !disabled && (
          <ClearButton onClick={handleClear} type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </ClearButton>
        )}
        <ArrowIcon isOpen={isOpen}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </ArrowIcon>
      </InputWrapper>

      <Dropdown isOpen={isOpen}>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <OptionItem
              key={option.value}
              isSelected={option.value === value}
              isHighlighted={index === highlightedIndex}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <OptionLabel>{option.label}</OptionLabel>
              {option.subLabel && <OptionSubLabel>{option.subLabel}</OptionSubLabel>}
            </OptionItem>
          ))
        ) : (
          <NoOptions>{noOptionsMessage}</NoOptions>
        )}
      </Dropdown>
    </Container>
  );
};

export default SearchableSelect;
