/**
 * Toggle — 시스템 표준 토글 스위치 컴포넌트.
 *
 * 디자인 가이드:
 *   - 44px × 22px (terminal 디바이스 터치 타겟 충족)
 *   - 색상: off=#E6EBF1, on=#635BFF (brand primary)
 *   - knob: 16px 흰색 원
 *   - 0.3s ease transition
 *
 * 사용:
 *   <Toggle checked={x} onChange={(v) => setX(v)} />
 *
 * 자동저장 표시는 부모를 AutoSaveField 로 감싸면 표준 ToggleBadge (스위치 우측) 가 자동 표시.
 */
import React from 'react';
import styled from 'styled-components';

/* ReservationSettings 패턴과 동일 — 모든 설정 토글이 같은 모양으로 보이게 표준화.
   44 × 24px, knob 18px, off=#CBD5E0, on=#635BFF, knob shift 20px. */
const Label = styled.label<{ $disabled?: boolean }>`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: ${p => p.$disabled ? 'not-allowed' : 'pointer'};
  opacity: ${p => p.$disabled ? 0.5 : 1};
  flex-shrink: 0;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #CBD5E0;
  transition: 0.3s;
  border-radius: 24px;
  pointer-events: none;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  ${Input}:checked + & {
    background-color: #635BFF;
  }

  ${Input}:checked + &:before {
    transform: translateX(20px);
  }
`;

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  ariaLabel?: string;
  /** 부모 카드의 onClick 이벤트로 propagate 되지 않도록 stop propagation (default true) */
  stopPropagation?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled, ariaLabel, stopPropagation = true }) => (
  <Label
    $disabled={disabled}
    onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
    onMouseDown={stopPropagation ? (e) => e.stopPropagation() : undefined}
  >
    <Input
      type="checkbox"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      checked={checked}
      disabled={disabled}
      onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
      onChange={(e) => {
        if (stopPropagation) e.stopPropagation();
        if (!disabled) onChange(e.target.checked);
      }}
    />
    <Slider />
  </Label>
);

export default Toggle;
