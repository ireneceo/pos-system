/**
 * OfflineBanner — 오프라인 모드 1단계 UI.
 * 연결이 끊기면 상단에 경고 배너, 복구 순간 잠깐 "동기화 중" 표시.
 * 설계: docs/OFFLINE_MODE_DESIGN.md §5-2. (다음 단계에서 "주문 N건 보관" 등으로 확장)
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useOffline } from '../../contexts/OfflineContext';

const OfflineBanner: React.FC = () => {
  const { isOffline, isReconnecting } = useOffline();
  const { t } = useTranslation('common');
  if (!isOffline && !isReconnecting) return null;

  const reconnecting = !isOffline && isReconnecting;
  const bg = reconnecting ? '#0A7D57' : '#B45309'; // 복구=초록 / 오프라인=경고주황
  const text = reconnecting
    ? t('offlineReconnecting', { defaultValue: 'Connection restored — syncing…' })
    : t('offlineBanner', { defaultValue: 'Offline — internet disconnected. Will recover automatically when reconnected.' });

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100000,
        padding: '7px 16px', textAlign: 'center',
        fontSize: '13px', fontWeight: 600, color: '#FFFFFF', background: bg,
        boxShadow: '0 1px 4px rgba(0,0,0,0.18)', letterSpacing: '0.2px',
      }}
    >
      {text}
    </div>
  );
};

export default OfflineBanner;
