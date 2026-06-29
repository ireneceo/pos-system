/**
 * OfflineBanner — 오프라인 모드 UI.
 * 연결이 끊기면 상단에 경고 배너 + 로컬 보관 주문 건수, 복구 순간 "동기화 중(N건)" 표시.
 * 설계: docs/OFFLINE_MODE_DESIGN.md §5-2.
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOffline } from '../../contexts/OfflineContext';
import { useOfflineMainPos } from '../../utils/offlineMainPos';

const OfflineBanner: React.FC = () => {
  const { isOffline, isReconnecting } = useOffline();
  const isMainPos = useOfflineMainPos();
  const { t } = useTranslation('common');
  const [held, setHeld] = useState(0);

  // 오프라인/복구 중에만 로컬 보관(미동기화) 주문 건수를 주기 폴링. 온라인 정상이면 0.
  useEffect(() => {
    let alive = true;
    if (!isOffline && !isReconnecting) { setHeld(0); return; }
    const poll = () => {
      import('../../utils/offlineStore')
        .then(({ unsyncedOrderCount }) => unsyncedOrderCount())
        .then((n) => { if (alive) setHeld(n); })
        .catch(() => {});
    };
    poll();
    const iv = setInterval(poll, 4000);
    return () => { alive = false; clearInterval(iv); };
  }, [isOffline, isReconnecting]);

  if (!isOffline && !isReconnecting) return null;

  const reconnecting = !isOffline && isReconnecting;
  const bg = reconnecting ? '#0A7D57' : '#B45309'; // 복구=초록 / 오프라인=경고주황

  let text: string;
  if (reconnecting) {
    text = held > 0
      ? t('offlineReconnectingHeld', { defaultValue: 'Connection restored — sending {{count}} order(s)…', count: held })
      : t('offlineReconnecting', { defaultValue: 'Connection restored — syncing…' });
  } else if (isMainPos) {
    // 메인 POS — 이 기기가 모든 주문·인쇄를 도맡는다는 점 + 주방 프린터 실패 시 비상 인쇄 안내.
    text = held > 0
      ? t('offlineBannerMainHeld', {
          defaultValue: 'Offline — {{count}} order(s) held on this main POS. This device handles all orders and printing; other devices are locked. If a kitchen printer fails, turn on Emergency Mode (Settings ▸ Printer) to print every ticket here.',
          count: held,
        })
      : t('offlineBannerMain', {
          defaultValue: 'Offline — this main POS handles all orders and printing; other devices are locked. If a kitchen printer fails, turn on Emergency Mode (Settings ▸ Printer) to print every ticket here.',
        });
  } else {
    text = held > 0
      ? t('offlineBannerHeld', { defaultValue: 'Offline — {{count}} order(s) held locally, will send automatically when reconnected.', count: held })
      : t('offlineBanner', { defaultValue: 'Offline — internet disconnected. Will recover automatically when reconnected.' });
  }

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
