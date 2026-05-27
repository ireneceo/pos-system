import styled from 'styled-components';

// 🎨 표준 고급 드롭다운 컴포넌트
// Reports 페이지 기준으로 통일된 스타일
export const StandardSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  width: 100%;
  min-width: 180px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #6B7280;
  }

  &:disabled {
    background-color: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
    border-color: #C7CED6;
  }
`;

// 🔍 검색 가능한 드롭다운 (향후 확장용)
export const SearchableSelect = styled(StandardSelect)`
  /* 향후 react-select 등과 연동 시 사용 */
`;

// 📱 모바일 최적화 드롭다운
export const MobileSelect = styled(StandardSelect)`
  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 16px; /* iOS 확대 방지 */
    min-width: 120px;
  }
`;

// 🎨 컬러 테마별 드롭다운
export const ThemeSelect = styled(StandardSelect)<{ variant?: 'primary' | 'success' | 'warning' | 'danger' }>`
  ${props => {
    switch (props.variant) {
      case 'success':
        return `
          border-color: #10B981;
          &:focus { border-color: #059669; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }
        `;
      case 'warning':
        return `
          border-color: #F59E0B;
          &:focus { border-color: #D97706; box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1); }
        `;
      case 'danger':
        return `
          border-color: #EF4444;
          &:focus { border-color: #DC2626; box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1); }
        `;
      default:
        return '';
    }
  }}
`;

// 📏 사이즈별 드롭다운
export const SmallSelect = styled(StandardSelect)`
  padding: 8px 12px;
  font-size: 13px;
  min-width: 120px;
`;

export const LargeSelect = styled(StandardSelect)`
  padding: 16px 20px;
  font-size: 16px;
  min-width: 200px;
`;

// 기본 export (가장 많이 사용될 것)
export default StandardSelect;