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
 * (디자인 단일 기준). 고를 것이 2개 미만이면 null 을 돌려 **아무것도 그리지 않는다**
 * = 부여 0건인 사용자(현재 전원)에게는 화면 변화 0.
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
  const { contexts } = useAuth();

  if (!contexts || contexts.length < 2) return null;

  return {
    icon: '◐',
    title: t('context.select.title'),
    desc: t('context.select.subtitle'),
    onClick: () => navigate('/pos/select-context')
  };
}

export default useContextSwitchQuickAction;
