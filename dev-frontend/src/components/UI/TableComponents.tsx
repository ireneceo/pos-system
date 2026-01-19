import styled from 'styled-components';

// ============================================================================
// 공통 테이블 반응형 컴포넌트
// 모든 Admin 페이지에서 사용 가능한 통일된 테이블 스타일
// ============================================================================

// 테이블 컨테이너
export const Table = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
  }
`;

// 테이블 헤더
export const TableHeader = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    display: none;
  }
`;

// 테이블 행
export const TableRow = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: block;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

// 모바일 라벨
export const MobileLabel = styled.div`
  display: none;
  font-size: 10px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;

  @media (max-width: 768px) {
    display: block;
  }
`;

// 모바일 값 컨테이너
export const MobileValue = styled.div`
  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
  }
`;

// 모바일 그리드 (flexbox로 자동 배치)
export const MobileGrid = styled.div`
  display: contents;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

// 액션 버튼 그룹
export const ActionButtons = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  max-width: 280px;

  @media (max-width: 1200px) {
    max-width: 240px;
  }

  @media (max-width: 1024px) {
    gap: 4px;
    max-width: 220px;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #F3F4F6;
    max-width: none;
  }
`;

// 액션 버튼
export const ActionButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 11px;
    flex: 0 0 auto;
  }
`;

// 아이콘 버튼
export const IconButton = styled.button<{ variant?: 'default' | 'edit' | 'delete' | 'view' }>`
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  font-size: 13px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  ${props => {
    switch (props.variant) {
      case 'edit':
        return `
          background: #EBF5FF;
          border: 1px solid #3B82F6;
          color: #3B82F6;
          &:hover {
            background: #DBEAFE;
            transform: translateY(-1px);
          }
        `;
      case 'delete':
        return `
          background: #FEF2F2;
          border: 1px solid #EF4444;
          color: #EF4444;
          &:hover {
            background: #FEE2E2;
            transform: translateY(-1px);
          }
        `;
      case 'view':
        return `
          background: #F0FDF4;
          border: 1px solid #22C55E;
          color: #22C55E;
          &:hover {
            background: #DCFCE7;
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: #F6F9FC;
          border: 1px solid #E6EBF1;
          color: #6B7280;
          &:hover {
            background: #E6EBF1;
            transform: translateY(-1px);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 6px;
    min-width: 30px;
    min-height: 30px;
  }
`;

// Empty State
export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;
