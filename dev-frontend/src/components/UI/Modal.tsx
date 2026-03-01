import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// 모달 오버레이 (배경)
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 40px 0;
`;

// 모달 컨텐츠
export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  flex-shrink: 0;
`;

// 모달 헤더
export const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 모달 타이틀
export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

// 닫기 버튼
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover {
    color: #0A2540;
  }
`;

// 모달 바디
export const ModalBody = styled.div`
  padding: 24px;
`;

// 모달 푸터
export const ModalFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

// 폼 행 (2열 레이아웃)
export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// 폼 그룹
export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

// 폼 라벨
export const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`;

// 폼 인풋
export const FormInput = styled.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

// 폼 셀렉트
export const FormSelect = styled.select`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }
`;

// 폼 텍스트에어리어
export const FormTextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

// 모달 경고 메시지 (버튼 하단에 표시)
export const ModalWarning = styled.div<{ show?: boolean }>`
  display: ${props => props.show === false ? 'none' : 'block'};
  margin-top: 16px;
  padding: 12px 16px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 14px;
  line-height: 1.5;
`;

// 모달 버튼
export const ModalButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${props => {
    switch (props.variant) {
      case 'primary': return 'none';
      case 'danger': return 'none';
      default: return '1px solid #E6EBF1';
    }
  }};
  background: ${props => {
    switch (props.variant) {
      case 'primary': return '#635BFF';
      case 'danger': return '#DC2626';
      default: return 'white';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'primary': return 'white';
      case 'danger': return 'white';
      default: return '#6B7C93';
    }
  }};

  &:hover:not(:disabled) {
    background: ${props => {
      switch (props.variant) {
        case 'primary': return '#5A51E6';
        case 'danger': return '#B91C1C';
        default: return '#F8FAFC';
      }
    }};
    transform: translateY(-1px);
  }

  &:disabled {
    background: ${props => {
      switch (props.variant) {
        case 'primary': return '#A5A0FF';
        case 'danger': return '#FCA5A5';
        default: return '#F3F4F6';
      }
    }};
    color: ${props => {
      switch (props.variant) {
        case 'primary': return 'rgba(255, 255, 255, 0.7)';
        case 'danger': return 'rgba(255, 255, 255, 0.7)';
        default: return '#D1D5DB';
      }
    }};
    cursor: not-allowed;
    transform: none;
    opacity: 1;
  }
`;

// React 컴포넌트로 사용할 수 있는 모달
interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  size?: 'small' | 'medium' | 'large';
  headerActions?: React.ReactNode;
}

const ModalComponentInternal: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth,
  size = 'medium',
  headerActions
}) => {
  if (!isOpen) return null;

  // size에 따른 maxWidth 설정
  const getMaxWidth = () => {
    if (maxWidth) return maxWidth;
    switch (size) {
      case 'small': return '400px';
      case 'large': return '800px';
      default: return '600px';
    }
  };

  // React Portal을 사용하여 document.body에 직접 렌더링
  // 이렇게 하면 부모 컴포넌트의 CSS 리셋 영향을 받지 않음
  const modalContent = (
    <ModalOverlay onClick={onClose}>
      <ModalContent style={{ maxWidth: getMaxWidth() }} onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {headerActions}
            <CloseButton onClick={onClose}>×</CloseButton>
          </div>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        {footer && (
          <ModalFooter>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </ModalOverlay>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

// Export as both Modal and ModalComponent for backward compatibility
export const Modal = ModalComponentInternal;
export const ModalComponent = ModalComponentInternal;
export default ModalComponentInternal;