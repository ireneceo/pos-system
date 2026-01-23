import styled from 'styled-components';

// ============================================================================
// 통합 데이터 테이블 컴포넌트
// HTML table 기반으로 반응형에서 열이 정확히 맞춰지도록 설계
//
// 정렬 규칙:
// - 긴 텍스트 (제목, 설명, 이름): 좌측 정렬 (기본값)
// - 간단한 표시 항목 (날짜, 상태): 가운데 정렬
// - 가격/금액: 우측 정렬
// ============================================================================

// 테이블 외부 래퍼 (border, shadow 등)
export const DataTableContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  width: 100%;

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`;

// HTML table 요소
// table-layout: auto로 내용 기준 유연한 열 너비
export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  @media (max-width: 1024px) {
    display: block;
  }

  tbody {
    @media (max-width: 1024px) {
      display: block;
    }
  }
`;

// 테이블 헤더
export const DataTableHead = styled.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 1024px) {
    display: none;
  }
`;

// 데이터 행
export const DataTableRow = styled.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
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

// 데이터 셀 - 기본 좌측 정렬
export const DataTableCell = styled.td<{
  align?: 'left' | 'center' | 'right';
  mobileFullWidth?: boolean;
}>`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;
  text-align: ${props => props.align || 'left'};
  word-wrap: break-word;

  /* 내부 콘텐츠도 정렬 */
  > * {
    text-align: inherit;
  }

  @media (max-width: 1024px) {
    flex: ${props => props.mobileFullWidth ? '1 1 100%' : '1 1 calc(50% - 5px)'};
    min-width: ${props => props.mobileFullWidth ? '100%' : '140px'};
    padding: 0;
    text-align: left !important;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    ${props => props.mobileFullWidth ? `
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F3F4F6;
      &:before { display: none; }
    ` : ''}
  }
`;

// 헤더 셀 - 정렬 속성 지원 (기본 가운데 정렬)
// isActions: 액션 열은 유연하게 줄어들 수 있도록 허용
export const DataTableHeaderCell = styled.th<{
  align?: 'left' | 'center' | 'right';
  width?: string;
  isActions?: boolean;
}>`
  padding: 14px 16px;
  text-align: ${props => props.align || 'center'};
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  ${props => props.width ? `width: ${props.width};` : ''}
`;

// 액션 버튼 그룹 (테이블 셀 내부용)
// 좌측 정렬, 줄바꿈 허용, 너비 제한으로 자연스러운 줄바꿈
export const DataTableActions = styled.div`
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

// 빈 상태 표시
export const DataTableEmpty = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  @media (max-width: 1024px) {
    padding: 40px 20px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
  }
`;

// 금액 표시 스타일
export const DataTableAmount = styled.span<{ highlight?: boolean }>`
  font-weight: ${props => props.highlight ? '600' : '500'};
  color: ${props => props.highlight ? '#0A2540' : '#6B7280'};
`;

// 상태 뱃지 (래핑 허용)
export const DataTableStatus = styled.span<{
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
}>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: normal;
  line-height: 1.3;
  text-align: center;

  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          background: #E6F9F0;
          color: #059669;
        `;
      case 'warning':
        return `
          background: #FEF3C7;
          color: #D97706;
        `;
      case 'error':
        return `
          background: #FEE2E2;
          color: #DC2626;
        `;
      case 'info':
        return `
          background: #E0F2FE;
          color: #0284C7;
        `;
      default:
        return `
          background: #F3F4F6;
          color: #6B7280;
        `;
    }
  }}
`;

// ============================================================================
// 사용 예시:
//
// <DataTableContainer>
//   <DataTable>
//     <DataTableHead>
//       <tr>
//         <DataTableHeaderCell>Name</DataTableHeaderCell>
//         <DataTableHeaderCell align="center">Date</DataTableHeaderCell>
//         <DataTableHeaderCell align="center">Status</DataTableHeaderCell>
//         <DataTableHeaderCell align="right">Amount</DataTableHeaderCell>
//         <DataTableHeaderCell align="right">Actions</DataTableHeaderCell>
//       </tr>
//     </DataTableHead>
//     <tbody>
//       {items.map(item => (
//         <DataTableRow key={item.id}>
//           <DataTableCell data-label="Name">{item.name}</DataTableCell>
//           <DataTableCell data-label="Date" align="center">{item.date}</DataTableCell>
//           <DataTableCell data-label="Status" align="center">
//             <DataTableStatus variant="success">Active</DataTableStatus>
//           </DataTableCell>
//           <DataTableCell data-label="Amount" align="right">
//             <DataTableAmount highlight>{formatCurrency(item.amount)}</DataTableAmount>
//           </DataTableCell>
//           <DataTableCell data-label="" mobileFullWidth>
//             <DataTableActions>
//               <button>Edit</button>
//               <button>Delete</button>
//             </DataTableActions>
//           </DataTableCell>
//         </DataTableRow>
//       ))}
//     </tbody>
//   </DataTable>
// </DataTableContainer>
// ============================================================================
