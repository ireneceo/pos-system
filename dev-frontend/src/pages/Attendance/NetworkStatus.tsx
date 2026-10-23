/**
 * 찍기 전에 «지금 매장 와이파이인지» 를 먼저 보여 주는 한 줄 (Time Clock · 내 출퇴근 공용).
 * 2026-10-23 Irene «어떻게 하라는지 헷갈려» — 눌러 보고 막혀야 알던 것을 미리 알린다.
 * 값은 GET /me/status 의 on_store_network(검사 꺼짐 = null → 아무것도 안 보임).
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Pill = styled.div<{ ok: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  color: ${p => (p.ok ? '#047857' : '#B45309')};
  background: ${p => (p.ok ? '#ECFDF5' : '#FFFBEB')};
  border: 1px solid ${p => (p.ok ? '#A7F3D0' : '#FCD34D')};
`;

const Mark = styled.span<{ ok: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => (p.ok ? '#10B981' : '#F59E0B')};
`;

const NetworkStatus: React.FC<{ onStoreNetwork: boolean | null | undefined; style?: React.CSSProperties }> = ({ onStoreNetwork, style }) => {
  const { t } = useTranslation('attendance');
  if (onStoreNetwork === null || onStoreNetwork === undefined) return null;
  return (
    <Pill ok={onStoreNetwork} style={style} role="status">
      <Mark ok={onStoreNetwork} />
      {onStoreNetwork
        ? t('network.onStore', 'On the store Wi-Fi')
        : t('network.offStore', 'Not on the store Wi-Fi — a manager PIN will be needed')}
    </Pill>
  );
};

export default NetworkStatus;
