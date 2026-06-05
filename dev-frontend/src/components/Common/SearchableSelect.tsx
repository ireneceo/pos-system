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
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: 42px;
  /* 우측에 화살표(+선택해제) 공간 확보 → 화살표가 항상 박스 안에 고정 */
  padding: 8px 36px 8px 12px;
  /* 테마 변수 + 동일 fallback — 테마 없는 페이지는 기존(#fff/#C7CED6)과 동일,
     POS/FloorPlan 에서는 검색입력 박스와 색·높이 통일 (박스 흰색만 튀던 문제 해결). */
  border: 1px solid ${props => props.isOpen ? 'var(--pos-brand, #635BFF)' : 'var(--pos-border, #C7CED6)'};
  border-radius: 8px;
  background: ${props => props.disabled ? 'var(--pos-surface-2, #F9FAFB)' : 'var(--pos-surface, #fff)'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.disabled ? 'var(--pos-border, #C7CED6)' : 'var(--pos-brand, #635BFF)'};
  }

  ${props => props.isOpen && `
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  `}
`;

const Input = styled.input<{ disabled?: boolean }>`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 600;
  text-overflow: ellipsis;
  background: transparent;
  /* 선택된 값은 항상 본문색(진하게). placeholder 만 muted. */
  color: ${props => props.disabled ? 'var(--pos-text-muted, #6B7280)' : 'var(--pos-text, #0A2540)'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &::placeholder {
    color: var(--pos-text-muted, #6B7280);
    font-weight: 400;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: none;
  background: var(--pos-border, #C7CED6);
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: var(--pos-text-muted, #6B7280);
  }

  svg {
    width: 11px;
    height: 11px;
    color: #fff;
  }
`;

// 화살표는 박스 안 우측에 절대 고정 — 내용 길이와 무관하게 항상 박스 내부.
const ArrowIcon = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%) ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: transform 0.2s;

  svg {
    width: 16px;
    height: 16px;
    color: var(--pos-text-muted, #4B5563);
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

  // 열려도 타이핑 전이면 선택값을 그대로(진하게) 유지 — 열자마자 회색 placeholder 로
  // 바뀌어 "글자 회색" 처럼 보이던 문제 해결. 실제 검색을 시작(searchTerm)하면 그때 전환.
  const displayValue = (isOpen && searchTerm) ? searchTerm : (selectedOption?.label || '');

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
