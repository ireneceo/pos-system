import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

/**
 * 대시보드 퀵액션 "컨텍스트 전환" 항목.
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §6.2 — 상시 전환의 **1단 진입점**.
 *
 * 헤더 스위처(2단)는 인쇄 보호파일(MainLayout)을 건드려야 해서 Irene 사인오프가 필요하다.
 * 이 항목만으로 상시 전환이 기능적으로 완결되므로, 사인오프 전까지 여기가 유일한 진입점이다.
 *
 * ⚠ 컴포넌트가 아니라 **항목 descriptor 를 돌려주는 훅**이다 — 각 대시보드가 이미 가진
 * QuickActionCard 로 그려야 디자인이 통일되고, 새 로컬 버튼 스타일을 만들지 않는다
 * (디자인 단일 기준). System Admin 이면 null(요청 대상 아님) — 그 외에는 모자 수와 무관하게 표시(v1.3 D4).
 */
export interface QuickActionItem {
  icon: string;
  title: string;
  desc: string;
  onClick: () => void;
}

export function useContextSwitchQuickAction(): QuickActionItem | null {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { user } = useAuth();

  // v1.3(2026-10-05, Irene 확정 D4): SA 외 전 사용자에게 상시 표시 — 선택 화면이 역할 추가 요청의 입구다.
  if (!user || user.role === 'System Admin') return null;

  return {
    icon: '◐',
    title: t('context.select.title'),
    desc: t('context.select.subtitle'),
    onClick: () => navigate('/pos/select-context')
  };
}

export default useContextSwitchQuickAction;
