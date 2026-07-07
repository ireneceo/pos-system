import React, { forwardRef, useRef, useState } from 'react';
import { theme as t } from '../../styles/theme';
import styled, { css } from 'styled-components';

// ============================================================================
// 통합 Button 컴포넌트
// 프로젝트 전체에서 유일하게 사용해야 하는 버튼 styled-component
//
// 사용법:
//   import { Button } from '../../components/UI';
//   <Button variant="primary" size="medium" disabled={!isValid}>저장</Button>
//
// variant: 'primary' | 'secondary' | 'danger' | 'danger-outline' | 'success' | 'cancel'
// size: 'small' | 'medium' | 'large'
// fullWidth: boolean
// ============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'danger-outline' | 'success' | 'cancel' | 'outline' | 'warning' | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';

const StyledButton = styled.button<{
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${props => {
    switch (props.size) {
      case 'small': return t.components.button.paddingSm;
      case 'large': return t.components.button.paddingLg;
      default: return t.components.button.paddingMd;
    }
  }};
  border: none;
  border-radius: ${t.borderRadius.md};
  font-size: ${t.typography.fontSize.sm};
  font-weight: ${t.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  text-decoration: none;
  white-space: nowrap;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  ${props => {
    switch (props.variant) {
      case 'secondary':
      case 'cancel':
      case 'outline':
        return css`
          background: ${t.colors.surface};
          color: ${t.colors.text.muted};
          border: 1px solid ${t.colors.border};

          &:hover:not(:disabled) {
            background: ${t.colors.surfaceHover};
            color: ${t.colors.secondary};
            border-color: ${t.colors.borderHover};
          }
        `;
      case 'danger':
        return css`
          background: ${t.colors.danger};
          color: ${t.colors.surface};

          &:hover:not(:disabled) {
            background: ${t.colors.dangerHover};
            transform: translateY(-1px);
            box-shadow: ${t.shadows.dangerHover};
          }
        `;
      case 'danger-outline':
        return css`
          background: ${t.colors.dangerLight};
          color: #EF4444;
          border: 1px solid #EF4444;

          &:hover:not(:disabled) {
            background: #FEE2E2;
          }
        `;
      case 'success':
        return css`
          background: ${t.colors.status.successAlt};
          color: ${t.colors.surface};

          &:hover:not(:disabled) {
            background: ${t.colors.status.successDark};
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
          }
        `;
      case 'warning':
        return css`
          background: ${t.colors.status.warningAlt};
          color: ${t.colors.surface};

          &:hover:not(:disabled) {
            background: #B45309;
            transform: translateY(-1px);
          }
        `;
      case 'info':
        return css`
          background: ${t.colors.status.info};
          color: ${t.colors.surface};

          &:hover:not(:disabled) {
            background: #0891B2;
            transform: translateY(-1px);
          }
        `;
      default: // primary
        return css`
          background: ${t.colors.primary};
          color: ${t.colors.surface};

          &:hover:not(:disabled) {
            background: ${t.colors.primaryHover};
            transform: translateY(-1px);
            box-shadow: ${t.shadows.primaryHover};
          }
        `;
    }
  }}

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none;
    pointer-events: none;
  }

  /* Icon sizing */
  svg {
    width: ${props => {
      switch (props.size) {
        case 'small': return t.components.button.iconSizeSm;
        case 'large': return t.components.button.iconSizeLg;
        default: return t.components.button.iconSizeMd;
      }
    }};
    height: ${props => {
      switch (props.size) {
        case 'small': return t.components.button.iconSizeSm;
        case 'large': return t.components.button.iconSizeLg;
        default: return t.components.button.iconSizeMd;
      }
    }};
  }
`;

// ============================================================================
// Async-guarded Button (2026-07-07, Irene: "버튼 반복클릭해서 3번 저장됨").
// If onClick returns a Promise (async handler), the button auto-disables until it
// settles — so a slow save/send/pay can't be fired 2~3x by impatient clicking
// (duplicate invoices / duplicate payments). Backward compatible: sync handlers
// (return undefined) behave exactly as before. A synchronous ref guard blocks
// rapid clicks that land before React re-renders with disabled=true.
// className/ref are forwarded so styled(Button) (ModalButton 등) keeps working.
// ============================================================================
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, disabled, ...rest }, ref) => {
    const busyRef = useRef(false);
    const [busy, setBusy] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (busyRef.current || disabled) return;
      if (!onClick) return;
      const result = onClick(e) as unknown;
      if (result && typeof (result as { then?: unknown }).then === 'function') {
        busyRef.current = true;
        setBusy(true);
        Promise.resolve(result).finally(() => {
          busyRef.current = false;
          setBusy(false);
        });
      }
    };

    return (
      <StyledButton
        ref={ref}
        onClick={onClick ? handleClick : undefined}
        disabled={disabled || busy}
        aria-busy={busy || undefined}
        {...rest}
      />
    );
  }
);
Button.displayName = 'Button';

// Modal 전용 버튼 (disabled 시 색상 변경 포함 — 더 세밀한 비활성화 표현)
export const ModalButton = styled(Button)`
  &:disabled {
    opacity: 1;
    background: ${props => {
      switch (props.variant) {
        case 'primary': return t.colors.disabled.primaryBg;
        case 'danger': return t.colors.disabled.dangerBg;
        default: return t.colors.disabled.background;
      }
    }};
    color: ${props => {
      switch (props.variant) {
        case 'primary':
        case 'danger':
          return 'rgba(255, 255, 255, 0.7)';
        default: return t.colors.disabled.text;
      }
    }};
  }
`;

// Backward compatibility aliases
export const ThemedButton = Button;
export const BaseButton = Button;
