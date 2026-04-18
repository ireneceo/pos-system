import React from 'react';
import styled from 'styled-components';

interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  label?: string;
  hint?: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`;

const Switch = styled.button<{ checked: boolean; disabled?: boolean }>`
  position: relative;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  border: none;
  padding: 0;
  cursor: ${p => p.disabled ? 'not-allowed' : 'pointer'};
  background: ${p => p.checked ? '#635BFF' : '#CBD5E1'};
  opacity: ${p => p.disabled ? 0.5 : 1};
  transition: background 0.15s;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${p => p.checked ? '18px' : '2px'};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    transition: left 0.15s;
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

const LabelText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`;

const Hint = styled.span`
  font-size: 12px;
  color: #6B7C93;
`;

const SyncMasterToggle: React.FC<Props> = ({ checked, onChange, disabled, label, hint }) => {
  return (
    <Wrapper>
      <Switch
        type="button"
        checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        aria-checked={checked}
        role="switch"
      />
      <TextBox>
        <LabelText>{label || 'Keep in sync with master'}</LabelText>
        {hint && <Hint>{hint}</Hint>}
      </TextBox>
    </Wrapper>
  );
};

export default SyncMasterToggle;
