import styled from 'styled-components';

export const ThemedButton = styled.button<{
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'danger-outline' | 'cancel';
  size?: 'small' | 'medium' | 'large';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${props => {
    switch (props.size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 28px';
      default: return '12px 20px';
    }
  }};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background: white;
          color: #4B5563;
          border: 1px solid #C7CED6;

          &:hover {
            background: #F1F4F8;
            color: #0A2540;
            border-color: #64748B;
          }
        `;
      case 'outline':
        return `
          background: white;
          color: #4B5563;
          border: 1px solid #C7CED6;

          &:hover {
            background: #F1F4F8;
            color: #0A2540;
            border-color: #64748B;
          }
        `;
      case 'danger':
        return `
          background: #EF4444;
          color: white;

          &:hover {
            background: #B91C1C;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
          }
        `;
      case 'danger-outline':
        return `
          background: white;
          color: #DC2626;
          border: 1px solid #DC2626;

          &:hover {
            background: #FEF2F2;
            color: #B91C1C;
            border-color: #B91C1C;
          }
        `;
      case 'cancel':
        return `
          background: white;
          color: #4B5563;
          border: 1px solid #C7CED6;

          &:hover {
            background: #F1F4F8;
            color: #0A2540;
            border-color: #64748B;
          }
        `;
      default: // primary
        return `
          background: #635BFF;
          color: white;

          &:hover {
            background: #5A51E6;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${props => {
      switch (props.size) {
        case 'small': return '14px';
        case 'large': return '20px';
        default: return '16px';
      }
    }};
    height: ${props => {
      switch (props.size) {
        case 'small': return '14px';
        case 'large': return '20px';
        default: return '16px';
      }
    }};
  }
`;

export const ThemedSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #1F2937;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`;

export const ThemedInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #1F2937;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`;

export const ThemedCard = styled.div<{ accent?: boolean }>`
  background: white;
  border-radius: 8px;
  border: 1px solid #C7CED6;
  padding: 16px;
  transition: all 0.2s ease;

  ${props => props.accent && `
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);
  `}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`;