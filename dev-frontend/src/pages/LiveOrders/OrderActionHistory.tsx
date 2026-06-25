import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';

interface OrderAction {
  id: number;
  action_type: string;
  from_status: string | null;
  to_status: string | null;
  performed_by_name: string;
  performed_by_role: string;
  source: string;
  reason: string | null;
  metadata: any;
  created_at: string;
}

interface Props {
  orderId: number | string;
  timeZone?: string;
}

const Wrap = styled.div`
  padding: 8px 0;
`;

const Empty = styled.div`
  padding: 32px 16px;
  text-align: center;
  color: #4B5563;
  font-size: 13px;
`;

const Item = styled.div<{ critical?: boolean }>`
  display: flex;
  gap: 14px;
  padding: 14px 16px;
  border-left: 3px solid ${p => p.critical ? '#FF6B6B' : '#C7CED6'};
  background: ${p => p.critical ? '#FFF5F5' : 'transparent'};
  border-radius: 0 8px 8px 0;
  margin-bottom: 6px;
`;

const TimeCol = styled.div`
  min-width: 96px;
  font-size: 12px;
  color: #4B5563;
  line-height: 1.4;
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const ActionLine = styled.div<{ critical?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.critical ? '#DC2626' : '#0A2540'};
  margin-bottom: 4px;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #4B5563;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
`;

const Tag = styled.span`
  background: #C7CED6;
  color: #3B30D9;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
`;

const Reason = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #B91C1C;
  background: #FEE2E2;
  padding: 6px 8px;
  border-radius: 6px;
  line-height: 1.4;
  word-break: break-word;
`;

function fmtDateTime(iso: string, timeZone?: string) {
  try {
    return new Date(iso).toLocaleString('en-MY', {
      year: 'numeric', month: 'short', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false,
      timeZone
    });
  } catch { return iso; }
}

const OrderActionHistory: React.FC<Props> = ({ orderId, timeZone }) => {
  const { t } = useTranslation('orders');
  const [actions, setActions] = useState<OrderAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        const res = await fetch(`/api/orders/${orderId}/actions`, {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
        });
        const json = await res.json();
        if (!cancelled) {
          if (json && json.success) setActions(Array.isArray(json.data) ? json.data : []);
          else setError(json?.message || 'Failed to load history');
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Network error');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [orderId]);

  if (loading) return <Empty>{t('history.loading', 'Loading history…')}</Empty>;
  if (error) return <Empty>{error}</Empty>;
  if (!actions.length) return <Empty>{t('history.empty', 'No actions recorded yet.')}</Empty>;

  return (
    <Wrap>
      {actions.map(a => {
        const critical = a.action_type === 'cancelled';
        const actionLabel = t(`history.actionType.${a.action_type}`, a.action_type.replace(/_/g, ' '));
        const statusFlow = a.from_status || a.to_status
          ? `${a.from_status || '—'} → ${a.to_status || '—'}`
          : null;
        // 테이블 이동(table_moved): metadata.from_table → to_table 을 "X → Y" 로 보여준다(2026-06-25 Irene).
        const _md = a.metadata || {};
        const moveFlow = a.action_type === 'table_moved' && (_md.from_table != null || _md.to_table != null)
          ? `${_md.from_table ?? '—'} → ${_md.to_table ?? '—'}${_md.mode === 'merged' ? ` (${t('history.mergedTag', 'merged')})` : ''}`
          : null;
        return (
          <Item key={a.id} critical={critical}>
            <TimeCol>{fmtDateTime(a.created_at, timeZone)}</TimeCol>
            <Body>
              <ActionLine critical={critical}>
                {actionLabel}
                {statusFlow && <span style={{ marginLeft: 8, fontWeight: 500, color: '#4B5563' }}>{statusFlow}</span>}
                {moveFlow && <span style={{ marginLeft: 8, fontWeight: 700, color: '#635BFF' }}>{moveFlow}</span>}
              </ActionLine>
              <Meta>
                <span>{a.performed_by_name || 'System'}</span>
                <Tag>{t(`history.role.${a.performed_by_role}`, a.performed_by_role)}</Tag>
                <Tag>{t(`history.source.${a.source}`, a.source.toUpperCase())}</Tag>
              </Meta>
              {a.reason && <Reason>{a.reason}</Reason>}
            </Body>
          </Item>
        );
      })}
    </Wrap>
  );
};

export default OrderActionHistory;
