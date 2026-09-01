import styled from 'styled-components';

// ============================================================================
// 공통 테이블 반응형 컴포넌트
// 모든 Admin 페이지에서 사용 가능한 통일된 테이블 스타일
// ============================================================================

// 테이블 컨테이너
export const Table = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
  /* 2026-09-01: 세로만 hidden, 가로는 auto. overflow:hidden 이면 안의 표가 넓어질 때
     스크롤이 아니라 잘려서 오른쪽 열에 손이 닿지 않는다(1025~1400px 노트북 구간).
     세로 hidden 유지라 둥근 모서리는 그대로다. 실측: scripts/responsive-audit.js */
  overflow-x: auto;
  overflow-y: hidden;

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
  }
`;

// 테이블 헤더 (CSS Grid 기반)
// 헤더는 모든 열 가운데 정렬 (예외 없음)
export const TableHeader = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  gap: 16px;
  padding: 16px 24px;
  background: #F1F4F8;
  border-bottom: 1px solid #C7CED6;
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
  align-items: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

// 테이블 행
// MobileGrid(display:contents)가 첫 번째 DOM 자식이므로 first-child 사용 불가
// 클래스 기반으로 정렬: col-info(좌측), col-action(좌측), col-*(금액 우측)
export const TableRow = styled.div<{ columns: string }>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F1F4F8;
  align-items: center;
  text-align: center;
  transition: all 0.2s;

  /* 정보/이름/제목 열 좌측 정렬 (MobileValue에 className="col-info") */
  div.col-info {
    text-align: left;
  }

  /* 액션 열 좌측 정렬 (ActionButtons에 className="col-action" 또는 자체 스타일) */
  div.col-action {
    text-align: left;
  }

  /* 금액/가격 열은 우측 정렬 */
  div.col-amount,
  div.col-total,
  div.col-price,
  div.col-fee,
  div.col-salary,
  div.col-revenue,
  div.col-cost,
  div.col-money {
    text-align: right;
  }

  &:hover {
    background: #F1F4F8;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1024px) {
    display: block;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #C7CED6;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    /* 모바일에서는 모두 좌측 정렬 */
    div.col-info,
    div.col-amount,
    div.col-total,
    div.col-price,
    div.col-fee,
    div.col-salary,
    div.col-revenue,
    div.col-cost,
    div.col-money {
      text-align: left;
    }

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
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;

  @media (max-width: 1024px) {
    display: block;
  }
`;

// 모바일 값 컨테이너
export const MobileValue = styled.div`
  @media (max-width: 1024px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
  }
`;

// 모바일 그리드 (flexbox로 자동 배치)
export const MobileGrid = styled.div`
  display: contents;

  @media (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

// 액션 버튼 그룹
// 테이블 열이 줄어들 때 버튼들이 자연스럽게 줄바꿈되도록 허용
export const ActionButtons = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`;

// 액션 버튼
export const ActionButton = styled.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  color: #4B5563;
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
  padding: 6px;
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
          background: #F4F6F9;
          border: 1px solid #C7CED6;
          color: #4B5563;
          &:hover {
            background: #C7CED6;
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
  color: #4B5563;
  grid-column: 1 / -1;

  h3 {
    color: #1F2937;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #4B5563;
  }

  @media (max-width: 1024px) {
    padding: 40px 20px;
  }
`;

// ============================================================================
// HTML Table 기반 공통 컴포넌트
// 정렬 옵션: left(좌측), center(가운데, 기본), right(우측/금액)
// ============================================================================

// 테이블 컨테이너 (HTML table용)
export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 1024px) {
    display: block;
  }

  tbody {
    @media (max-width: 1024px) {
      display: block;
    }
  }
`;

// 테이블 헤더 (thead)
export const DataTableHead = styled.thead`
  background: #F1F4F8;
  border-bottom: 1px solid #C7CED6;

  @media (max-width: 1024px) {
    display: none;
  }
`;

// 헤더 셀 (th) - 항상 가운데 정렬
export const DataTableTh = styled.th<{ align?: 'left' | 'center' | 'right' }>`
  padding: 14px 16px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// 테이블 행 (tr)
export const DataTableRow = styled.tr`
  border-bottom: 1px solid #F1F4F8;
  transition: background 0.15s;

  &:hover {
    background: #F1F4F8;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #C7CED6;
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

// 데이터 셀 (td) - align prop으로 정렬 설정
// isActions: 액션 버튼 셀인 경우 (모바일에서 전체 너비)
export const DataTableCell = styled.td<{ align?: 'left' | 'center' | 'right'; isActions?: boolean }>`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;
  text-align: ${props => props.align || 'center'};

  @media (max-width: 1024px) {
    flex: ${props => props.isActions ? '1 1 100%' : '1 1 calc(50% - 5px)'};
    min-width: ${props => props.isActions ? 'auto' : '140px'};
    padding: 0;
    border-bottom: none;
    text-align: left !important;

    &:before {
      content: attr(data-label);
      display: ${props => props.isActions ? 'none' : 'block'};
      font-size: 10px;
      font-weight: 600;
      color: #6B7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    ${props => props.isActions && `
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F1F4F8;
    `}
  }
`;

// 테이블 바디 (tbody)
export const DataTableBody = styled.tbody``;
