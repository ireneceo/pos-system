import styled from 'styled-components';

// ============================================================================
// 공통 페이지 레이아웃 컴포넌트
// 모든 Admin 페이지에서 사용
// ============================================================================

// 페이지 컨테이너
export const Container = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
`;

// 페이지 헤더
export const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  /* 태블릿 세로(769~1024). 여기 규칙이 없어서 우측 내용이 아랫줄로 밀리면
     80px 고정 높이에 잘렸다 — 아이패드 세로에서 실제로 그렇게 보였다(2026-09-08 Irene).
     제목은 왼쪽에 두고 나머지는 오른쪽에 두 줄로 접히게 한다(HeaderRight). */
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 14px 20px;
    height: auto;
    min-height: 80px;
    max-height: none;
    align-items: center;
    gap: 12px 16px;
  }

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

/**
 * 헤더 우측 묶음 — 제목 말고 전부 여기 담는다(둘러보기·플랜·남은 기간·액션).
 *   PC: 한 줄 · 태블릿 세로: 오른쪽 정렬 두 줄 · 모바일: 제목 아래로 내려간다.
 * ⛔ 헤더에 우측 항목을 낱개로 붙이지 말 것 — 그러면 폭이 좁아질 때 제각각 접힌다.
 */
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  min-width: 0;

  @media (min-width: 769px) and (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    text-align: right;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
    gap: 8px;
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
          color: #4B5563;
          border: 1px solid #C7CED6;
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
