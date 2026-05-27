/**
 * DateRangeField — 폼 입력용 날짜 범위 선택 컴포넌트 (시작 + 종료 한 세트)
 *
 * CalendarPicker를 재사용하여 DatePeriodFilter와 동일한 UX.
 * 계약 시작/종료, 프로모션 기간, 정기 기간 등에 사용.
 *
 * Usage:
 *   <DateRangeField
 *     startDate={form.start_date}
 *     endDate={form.end_date}
 *     onChange={(s, e) => { updateField('start_date', s); updateField('end_date', e); }}
 *   />
 */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CalendarPicker from './CalendarPicker';
import { getRestaurantTimezone } from '../../utils/timezone';

interface DateRangeFieldProps {
  startDate?: string | null; // YYYY-MM-DD
  endDate?: string | null;   // YYYY-MM-DD
  onChange: (start: string, end: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  startLabel?: string;
  endLabel?: string;
}

const formatDisplayDate = (s: string | null | undefined): string => {
  if (!s) return '';
  // Accept both 'YYYY-MM-DD' and ISO '2026-06-06T00:00:00.000Z' — legacy DB rows stored as DATETIME.
  const datePart = String(s).slice(0, 10);
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(datePart);
  if (!match) return '';
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (!y || !m || !d) return '';
  // DATEONLY fields are pure calendar dates with no time-of-day — anchor to UTC + format
  // in UTC so the calendar date stays stable regardless of browser↔restaurant tz offset.
  // (DATETIME fields still use getRestaurantTimezone() per CLAUDE.md rule.)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC'
  });
};

const DateRangeField: React.FC<DateRangeFieldProps> = ({
  startDate,
  endDate,
  onChange,
  disabled,
  placeholder = 'Select date range',
  className,
  startLabel,
  endLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Outside click handled by CalendarPicker internally, but we also close our wrapper
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const displayText = (() => {
    if (startDate && endDate) return `${formatDisplayDate(startDate)} — ${formatDisplayDate(endDate)}`;
    if (startDate) return `${formatDisplayDate(startDate)} —`;
    if (endDate) return `— ${formatDisplayDate(endDate)}`;
    return placeholder;
  })();

  const hasValue = !!(startDate || endDate);

  return (
    <Wrapper ref={wrapperRef} className={className}>
      <InputDisplay
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        $hasValue={hasValue}
        disabled={disabled}
      >
        <CalendarIcon>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </CalendarIcon>
        <DisplayText $hasValue={hasValue}>{displayText}</DisplayText>
        {hasValue && !disabled && (
          <ClearButton
            as="span"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onChange('', '');
            }}
            aria-label="Clear"
          >
            ×
          </ClearButton>
        )}
      </InputDisplay>
      <CalendarPicker
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onRangeSelect={(s, e) => onChange(s, e)}
      />
    </Wrapper>
  );
};

export default DateRangeField;

// --- Styled Components (DateField와 동일 팔레트) ---

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const InputDisplay = styled.button<{ $hasValue: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  background: #FFFFFF;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  color: ${p => p.$hasValue ? '#0A2540' : '#6B7280'};
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
  text-align: left;
  font-family: inherit;

  &:hover:not(:disabled) {
    border-color: #635BFF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F1F4F8;
    color: #6B7280;
    cursor: not-allowed;
  }
`;

const CalendarIcon = styled.span`
  color: #4B5563;
  display: inline-flex;
  flex-shrink: 0;
`;

const DisplayText = styled.span<{ $hasValue: boolean }>`
  flex: 1;
  color: ${p => p.$hasValue ? '#0A2540' : '#6B7280'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClearButton = styled.span`
  color: #6B7280;
  font-size: 18px;
  line-height: 1;
  padding: 0 4px;
  cursor: pointer;

  &:hover {
    color: #4B5563;
  }
`;
