import styled from 'styled-components';

// ============================================================================
// 공통 페이지 레이아웃 컴포넌트
// 모든 Admin 페이지에서 사용
// ============================================================================

// 페이지 컨테이너
export const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
`;

// 페이지 헤더
export const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    max-height: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

// 페이지 타이틀
export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

// 액션 버튼 섹션
export const ActionSection = styled.div`
  display: flex;
  gap: 12px;
`;

// 페이지 콘텐츠
export const Content = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

// 공통 버튼
export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' | 'danger-outline' }>`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #635BFF;
          color: white;
          &:hover {
            background: #5A54E5;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
          }
        `;
      case 'secondary':
        return `
          background: #F8F9FA;
          color: #6B7C93;
          border: 1px solid #E6EBF1;
          &:hover {
            background: #EBEEF2;
            border-color: #D1D9E0;
          }
        `;
      case 'danger':
        return `
          background: #EF4444;
          color: white;
          &:hover {
            background: #DC2626;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          }
        `;
      case 'danger-outline':
        return `
          background: #FEF2F2;
          color: #EF4444;
          border: 1px solid #EF4444;
          &:hover {
            background: #FEE2E2;
          }
        `;
      default:
        return `
          background: #635BFF;
          color: white;
          &:hover {
            background: #5A54E5;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
