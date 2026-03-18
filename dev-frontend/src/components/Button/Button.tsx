import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const StyledButton = styled.button<{
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
}>`
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  ${props => {
    switch(props.size) {
      case 'small':
        return `
          padding: 8px 16px;
          font-size: 12px;
        `;
      case 'medium':
        return `
          padding: 12px 20px;
          font-size: 14px;
        `;
      case 'large':
        return `
          padding: 16px 24px;
          font-size: 16px;
        `;
      default:
        return `
          padding: 12px 20px;
          font-size: 14px;
        `;
    }
  }}

  ${props => {
    switch(props.variant) {
      case 'primary':
        return `
          background: #635BFF;
          color: white;
          border-color: #635BFF;

          &:hover:not(:disabled) {
            background: #5A51E6;
            border-color: #5A51E6;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
          }
        `;
      case 'secondary':
        return `
          background: white;
          color: #6B7280;
          border-color: #E6EBF1;

          &:hover:not(:disabled) {
            background: #F8FAFC;
            color: #0A2540;
            border-color: #CBD5E1;
          }
        `;
      case 'danger':
        return `
          background: #EF4444;
          color: white;
          border-color: #DC2626;

          &:hover:not(:disabled) {
            background: #B91C1C;
            border-color: #B91C1C;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
          }
        `;
      default:
        return '';
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  ${props => props.loading && `
    cursor: not-allowed;
    opacity: 0.7;
  `}
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  fullWidth = false
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled || loading}
      loading={loading}
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
    >
      {loading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
};

export default Button;