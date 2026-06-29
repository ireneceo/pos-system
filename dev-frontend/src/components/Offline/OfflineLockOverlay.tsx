/**
 * OfflineLockOverlay — 오프라인 중 "보조 기기" 전체 잠금 안내.
 *
 * 설계(Irene 확정 2026-06-29):
 * - 오프라인(인터넷 끊김) 동안에는 매장이 지정한 **메인 POS 1대에서만** 주문을 받는다.
 * - 그 외 기기(보조 POS/태블릿)는 이 전체 화면 오버레이로 입력을 막아, 직원이 "되는 줄 알고"
 *   주문을 받았다가 조용히 어긋나는 사고를 원천 차단한다.
 * - 연결이 돌아오면 OfflineContext 가 자동으로 오프라인 상태를 풀어 오버레이가 사라진다.
 *
 * 인쇄/주문 로직 무관 — 순수 표시·입력차단 레이어. 메인 POS 기기에는 절대 뜨지 않는다.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useOffline } from '../../contexts/OfflineContext';
import { useOfflineMainPos } from '../../utils/offlineMainPos';

const OfflineLockOverlay: React.FC = () => {
  const { isOffline } = useOffline();
  const isMainPos = useOfflineMainPos();
  const { t } = useTranslation('common');

  // 메인 POS 이거나 온라인이면 잠그지 않는다.
  if (!isOffline || isMainPos) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-label={t('offlineLockTitle', { defaultValue: 'Offline — orders are handled by the main POS' })}
      style={{
        position: 'fixed', inset: 0, zIndex: 2147483000,
        background: 'rgba(15, 23, 42, 0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', backdropFilter: 'blur(2px)',
      }}
      // 모든 포인터/키 입력을 이 레이어에서 삼킨다(뒤 화면 조작 차단).
      onClickCapture={(e) => { e.stopPropagation(); }}
    >
      <div
        style={{
          maxWidth: '460px', width: '100%', textAlign: 'center',
          background: '#FFFFFF', borderRadius: '16px', padding: '36px 28px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            width: '56px', height: '56px', margin: '0 auto 18px',
            borderRadius: '50%', background: '#FEF2F2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#DC2626', fontSize: '28px', fontWeight: 700,
          }}
        >!</div>
        <h2 style={{ margin: '0 0 12px', fontSize: '20px', fontWeight: 800, color: '#0A2540' }}>
          {t('offlineLockTitle', { defaultValue: 'Offline — orders are handled by the main POS' })}
        </h2>
        <p style={{ margin: '0 0 10px', fontSize: '15px', lineHeight: 1.6, color: '#334155' }}>
          {t('offlineLockBody', {
            defaultValue: 'The internet is down. While offline, please take all orders on the main POS counter. This device is paused to prevent lost or duplicated orders.',
          })}
        </p>
        <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
          {t('offlineLockAuto', { defaultValue: 'This screen unlocks automatically when the connection is back.' })}
        </p>
      </div>
    </div>
  );
};

export default OfflineLockOverlay;
