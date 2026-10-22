import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty, DataTableStatus,
  Modal, FormGroup, FormLabel
} from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { Button } from '../../components/UI/Button';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import AlertDialog from '../../components/Common/AlertDialog';
import { getAuthToken } from '../../utils/auth';
import { formatCurrency } from '../../utils/currency';
import { useAuth } from '../../contexts/AuthContext';
import { isOwnerRole, withOwnerPoScope, setOwnerPoRestaurantId } from '../../utils/ownerPoScope';
import OwnerPoTabs from '../../components/PurchaseOrders/OwnerPoTabs';
import RecurringOrderModal, { StandingOrder } from '../../components/PurchaseOrders/RecurringOrderModal';

/**
 * 정기 발주 목록 — 2026-10-22 Fable 설계 recurring-po §8-2 · §8-3.
 * 매장(구매자): 수정·일시정지·다시 시작·종료·기록.  오너: 승인 대기 검토(지금 가격)·승인·반려·일시정지·종료.
 * 오너는 «승인 전 / 승인 완료 / 정기 발주» 탭 띠(OwnerPoTabs)로 들어온다.
 */
const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  pending_approval: 'warning', active: 'success', paused: 'default', ended: 'default'
};
const OUTCOME_VARIANT: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
  submitted: 'success', pending_approval: 'warning', skipped: 'default', failed: 'error'
};

const Sub = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`;

const ReasonTextarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  box-sizing: border-box;
  resize: vertical;
  &:focus { outline: none; border-color: #635BFF; }
`;

const RecurringOrdersPage: React.FC = () => {
  const { t, i18n } = useTranslation('purchaseOrders');
  const navigate = useNavigate();
  const { user } = useAuth() as any;
  const role = user?.role;
  const owner = isOwnerRole(role);

  const [rows, setRows] = useState<StandingOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [editTarget, setEditTarget] = useState<StandingOrder | null>(null);
  const [endTarget, setEndTarget] = useState<StandingOrder | null>(null);
  const [reviewTarget, setReviewTarget] = useState<StandingOrder | null>(null);
  const [rejectTarget, setRejectTarget] = useState<StandingOrder | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [runsFor, setRunsFor] = useState<{ s: StandingOrder; runs: any[] } | null>(null);
  const [alert, setAlert] = useState<string | null>(null);

  const auth = () => ({ Authorization: `Bearer ${getAuthToken()}` });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      if (owner) {
        const [all, pend] = await Promise.all([
          fetch('/api/purchase-orders/schedules/owned', { headers: auth() }).then(r => r.json()).catch(() => null),
          fetch('/api/purchase-orders/schedules/pending-approval', { headers: auth() }).then(r => r.json()).catch(() => null)
        ]);
        const previews = new Map<number, StandingOrder>((pend?.data || []).map((p: StandingOrder) => [p.id, p]));
        const list: StandingOrder[] = (all?.data || []).map((s: StandingOrder) => ({ ...s, ...(previews.get(s.id) || {}) }));
        setRows(list);
      } else {
        const j = await fetch(withOwnerPoScope('/api/purchase-orders/schedules', role), { headers: auth() }).then(r => r.json()).catch(() => null);
        setRows(j?.success && Array.isArray(j.data) ? j.data : []);
      }
    } finally {
      setLoading(false);
    }
  }, [owner, role]);

  useEffect(() => { load(); }, [load]);

  // 요일 이름은 브라우저 Intl 로 — i18n 배열(returnObjects)은 이 화면에서 배열이 아닌 값으로 와 .map 에서 화면이 죽었다.
  //   2026-10-25(일)~10-31(토) 고정 날짜를 UTC 로 읽는다(요일 이름만 필요 — 매장 시간대 무관).
  const days = useMemo(() => {
    const lang = i18n.language || 'en';
    return Array.from({ length: 7 }, (_, i) =>
      new Date(Date.UTC(2026, 9, 25 + i)).toLocaleDateString(lang, { weekday: 'long', timeZone: 'UTC' }));
  }, [i18n.language]);
  const cadence = (s: StandingOrder) => (s.frequency === 'monthly'
    ? t('recurring.cad.monthly', { day: s.day_of_month })
    : t(`recurring.cad.${s.frequency}`, { day: days[Number(s.weekday)] || '' })) as string;
  const nameOf = (s: StandingOrder) => s.name || `${s.seller_name || ''} #${s.id}`;

  const act = async (s: StandingOrder, path: string, body?: any) => {
    setBusyId(s.id);
    try {
      const res = await fetch(owner ? `/api/purchase-orders/schedules/${s.id}/${path}` : withOwnerPoScope(`/api/purchase-orders/schedules/${s.id}/${path}`, role), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...auth() },
        body: body ? JSON.stringify(body) : undefined
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) { setAlert(j?.message || (t('recurring.failed') as string)); return false; }
      await load();
      return true;
    } catch {
      setAlert(t('recurring.failed') as string);
      return false;
    } finally {
      setBusyId(null);
    }
  };

  const openRuns = async (s: StandingOrder) => {
    try {
      const j = await fetch(withOwnerPoScope(`/api/purchase-orders/schedules/${s.id}/runs`, role), { headers: auth() }).then(r => r.json());
      setRunsFor({ s, runs: j?.success ? j.data : [] });
    } catch {
      setAlert(t('recurring.failed') as string);
    }
  };

  const openPo = (s: StandingOrder, poId: number) => {
    if (owner && s.entity_id) setOwnerPoRestaurantId(Number(s.entity_id));
    navigate(`/pos/purchase-orders/${poId}`);
  };

  const cols = owner ? 8 : 7;

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('recurring.title')}</Title>
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>{t('recurring.subtitle')}</div>
        </div>
        {!owner && (
          <ThemedButton size="small" variant="outline" onClick={() => navigate('/pos/purchase-orders/history')}>
            {t('list.title')}
          </ThemedButton>
        )}
      </Header>
      <Content>
        {owner && <OwnerPoTabs active="standing" />}
        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell>{t('recurring.col.name')}</DataTableHeaderCell>
                {owner && <DataTableHeaderCell>{t('recurring.col.restaurant')}</DataTableHeaderCell>}
                <DataTableHeaderCell align="center">{t('recurring.col.items')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('recurring.col.cadence')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('recurring.col.next')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('recurring.col.last')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('recurring.col.status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('recurring.col.actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading && rows.length === 0 ? (
                <tr><td colSpan={cols}><DataTableEmpty>{t('ownerApprovals.loading')}</DataTableEmpty></td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={cols}>
                  <DataTableEmpty>
                    <div style={{ marginBottom: 8, fontSize: 16, fontWeight: 600, color: '#1F2937' }}>{t('recurring.empty')}</div>
                    <div style={{ fontSize: 13, color: '#4B5563' }}>{t('recurring.emptyHint')}</div>
                  </DataTableEmpty>
                </td></tr>
              ) : rows.map(s => (
                <DataTableRow key={s.id}>
                  <DataTableCell data-label={t('recurring.col.name') as string}>
                    <div style={{ fontWeight: 600, color: '#1F2937' }}>{nameOf(s)}</div>
                    <Sub>{s.seller_name}</Sub>
                  </DataTableCell>
                  {owner && <DataTableCell data-label={t('recurring.col.restaurant') as string}>{s.restaurant_name || '-'}</DataTableCell>}
                  <DataTableCell data-label={t('recurring.col.items') as string} align="center">{s.line_items?.length || 0}</DataTableCell>
                  <DataTableCell data-label={t('recurring.col.cadence') as string}>{cadence(s)}</DataTableCell>
                  <DataTableCell data-label={t('recurring.col.next') as string}>
                    {s.status === 'ended' ? '-' : (s.next_run_date || '-')}
                  </DataTableCell>
                  <DataTableCell data-label={t('recurring.col.last') as string}>
                    {s.last_po ? (
                      <ThemedButton size="small" variant="outline" onClick={() => openPo(s, s.last_po!.id)}>
                        {s.last_po.po_number} · {t(`status.${s.last_po.status}`)}
                      </ThemedButton>
                    ) : '-'}
                    {s.pending_po && <Sub>{t('recurring.pendingPo', { po: s.pending_po.po_number })}</Sub>}
                  </DataTableCell>
                  <DataTableCell data-label={t('recurring.col.status') as string} align="center">
                    <DataTableStatus variant={STATUS_VARIANT[s.status] || 'default'}>{t(`recurring.st.${s.status}`)}</DataTableStatus>
                    {s.status === 'paused' && s.paused_reason && <Sub>{s.paused_reason}</Sub>}
                  </DataTableCell>
                  <DataTableCell data-label="" align="right" mobileFullWidth>
                    <DataTableActions>
                      {owner ? (
                        <>
                          {s.status === 'pending_approval' && (
                            <ThemedButton size="small" variant="primary" disabled={busyId === s.id} onClick={() => setReviewTarget(s)}>
                              {t('recurring.act.view')}
                            </ThemedButton>
                          )}
                          {(s.status === 'active' || s.status === 'pending_approval') && (
                            <ThemedButton size="small" variant="outline" disabled={busyId === s.id} onClick={() => act(s, 'owner-pause')}>
                              {t('recurring.act.pause')}
                            </ThemedButton>
                          )}
                          {s.status !== 'ended' && (
                            <ThemedButton size="small" variant="danger-outline" disabled={busyId === s.id} onClick={() => setEndTarget(s)}>
                              {t('recurring.act.end')}
                            </ThemedButton>
                          )}
                        </>
                      ) : (
                        <>
                          {s.status !== 'ended' && (
                            <ThemedButton size="small" variant="outline" disabled={busyId === s.id} onClick={() => setEditTarget(s)}>
                              {t('recurring.act.edit')}
                            </ThemedButton>
                          )}
                          {(s.status === 'active' || s.status === 'pending_approval') && (
                            <ThemedButton size="small" variant="outline" disabled={busyId === s.id} onClick={() => act(s, 'pause')}>
                              {t('recurring.act.pause')}
                            </ThemedButton>
                          )}
                          {s.status === 'paused' && (
                            <ThemedButton size="small" variant="primary" disabled={busyId === s.id} onClick={() => act(s, 'resume')}>
                              {t('recurring.act.resume')}
                            </ThemedButton>
                          )}
                          <ThemedButton size="small" variant="outline" onClick={() => openRuns(s)}>
                            {t('recurring.act.runs')}
                          </ThemedButton>
                          {s.status !== 'ended' && (
                            <ThemedButton size="small" variant="danger-outline" disabled={busyId === s.id} onClick={() => setEndTarget(s)}>
                              {t('recurring.act.end')}
                            </ThemedButton>
                          )}
                        </>
                      )}
                    </DataTableActions>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        </DataTableContainer>
      </Content>

      <RecurringOrderModal
        isOpen={!!editTarget}
        schedule={editTarget}
        role={role}
        onClose={() => setEditTarget(null)}
        onSaved={() => { setEditTarget(null); load(); }}
      />

      <ConfirmDialog
        isOpen={!!endTarget}
        onClose={() => setEndTarget(null)}
        onConfirm={async () => { const s = endTarget!; setEndTarget(null); await act(s, owner ? 'owner-end' : 'end'); }}
        title={t('recurring.endTitle') as string}
        message={t('recurring.endConfirm', { name: endTarget ? nameOf(endTarget) : '' }) as string}
        confirmText={t('recurring.act.end') as string}
        variant="danger"
      />

      {/* 오너 검토 — 지금 가격으로 계산한 줄·총액(서버 드라이런) */}
      <Modal
        isOpen={!!reviewTarget}
        onClose={() => setReviewTarget(null)}
        title={t('recurring.approveTitle') as string}
        maxWidth="720px"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button variant="secondary" onClick={() => { const s = reviewTarget!; setReviewTarget(null); setRejectTarget(s); setRejectReason(''); }}>
              {t('recurring.act.reject')}
            </Button>
            <Button
              variant="primary"
              disabled={!reviewTarget?.preview || busyId === reviewTarget?.id}
              onClick={async () => { const s = reviewTarget!; if (await act(s, 'approve')) setReviewTarget(null); }}
            >
              {t('recurring.act.approve')}
            </Button>
          </div>
        }
      >
        {reviewTarget && (
          <>
            <div style={{ fontSize: 14, color: '#374151', marginBottom: 12 }}>
              <strong>{nameOf(reviewTarget)}</strong> · {reviewTarget.restaurant_name} · {reviewTarget.seller_name}
              <Sub>{cadence(reviewTarget)} · {t('recurring.firstRun')}: {reviewTarget.next_run_date}</Sub>
            </div>
            {reviewTarget.preview_error && (
              <div style={{ color: '#991B1B', background: '#FEF2F2', padding: '10px 12px', borderRadius: 8, fontSize: 13, marginBottom: 12 }}>
                {t('recurring.previewError', { msg: reviewTarget.preview_error })}
              </div>
            )}
            {reviewTarget.preview && (
              <>
                <DataTable>
                  <DataTableHead>
                    <tr>
                      <DataTableHeaderCell>{t('recurring.items')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('recurring.qty')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('recurring.unitPrice')}</DataTableHeaderCell>
                      <DataTableHeaderCell align="right">{t('recurring.lineTotal')}</DataTableHeaderCell>
                    </tr>
                  </DataTableHead>
                  <tbody>
                    {reviewTarget.preview.lines.map((l, i) => (
                      <DataTableRow key={i}>
                        <DataTableCell data-label={t('recurring.items') as string}>{l.name}</DataTableCell>
                        <DataTableCell data-label={t('recurring.qty') as string} align="right">{l.quantity_ordered}{l.unit ? ` ${l.unit}` : ''}</DataTableCell>
                        <DataTableCell data-label={t('recurring.unitPrice') as string} align="right">{formatCurrency(l.unit_price, reviewTarget.preview!.currency)}</DataTableCell>
                        <DataTableCell data-label={t('recurring.lineTotal') as string} align="right">{formatCurrency(l.line_total, reviewTarget.preview!.currency)}</DataTableCell>
                      </DataTableRow>
                    ))}
                  </tbody>
                </DataTable>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '12px 0', fontSize: 14 }}>
                  <span>{t('recurring.total')}</span>
                  <strong>{formatCurrency(reviewTarget.preview.total, reviewTarget.preview.currency)}</strong>
                </div>
              </>
            )}
            <div style={{ fontSize: 13, color: '#374151', background: '#F3F4F6', padding: '10px 12px', borderRadius: 8 }}>
              {t('recurring.approveConfirm', { name: nameOf(reviewTarget), cadence: cadence(reviewTarget) })}
            </div>
          </>
        )}
      </Modal>

      <Modal
        isOpen={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
        title={t('recurring.rejectTitle') as string}
        maxWidth="460px"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button variant="secondary" onClick={() => setRejectTarget(null)}>{t('common.cancel')}</Button>
            <Button
              variant="danger"
              disabled={!rejectReason.trim() || busyId === rejectTarget?.id}
              onClick={async () => { const s = rejectTarget!; if (await act(s, 'reject', { reason: rejectReason.trim() })) setRejectTarget(null); }}
            >
              {t('recurring.rejectSubmit')}
            </Button>
          </div>
        }
      >
        <FormGroup>
          <FormLabel>{t('recurring.rejectReason')} *</FormLabel>
          <ReasonTextarea value={rejectReason} autoFocus placeholder={t('recurring.rejectPlaceholder') as string} onChange={e => setRejectReason(e.target.value)} />
        </FormGroup>
      </Modal>

      <Modal
        isOpen={!!runsFor}
        onClose={() => setRunsFor(null)}
        title={t('recurring.runsTitle', { name: runsFor ? nameOf(runsFor.s) : '' }) as string}
        maxWidth="720px"
      >
        {runsFor && (
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell>{t('recurring.runDate')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('recurring.outcome')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('recurring.po')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('recurring.lineTotal')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('recurring.reason')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {runsFor.runs.length === 0 ? (
                <tr><td colSpan={5}><DataTableEmpty>-</DataTableEmpty></td></tr>
              ) : runsFor.runs.map(r => (
                <DataTableRow key={r.id}>
                  <DataTableCell data-label={t('recurring.runDate') as string}>{r.run_date}</DataTableCell>
                  <DataTableCell data-label={t('recurring.outcome') as string}>
                    {r.outcome ? <DataTableStatus variant={OUTCOME_VARIANT[r.outcome] || 'default'}>{t(`recurring.out.${r.outcome}`)}</DataTableStatus> : '-'}
                  </DataTableCell>
                  <DataTableCell data-label={t('recurring.po') as string}>
                    {r.po ? (
                      <ThemedButton size="small" variant="outline" onClick={() => { setRunsFor(null); openPo(runsFor.s, r.po.id); }}>{r.po.po_number}</ThemedButton>
                    ) : '-'}
                  </DataTableCell>
                  <DataTableCell data-label={t('recurring.lineTotal') as string} align="right">
                    {r.total_amount != null ? formatCurrency(Number(r.total_amount), runsFor.s.last_po?.currency || 'MYR') : '-'}
                  </DataTableCell>
                  <DataTableCell data-label={t('recurring.reason') as string}>
                    {r.reason ? t(`recurring.skip.${r.reason}`, { defaultValue: r.reason }) : '-'}
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        )}
      </Modal>

      <AlertDialog isOpen={!!alert} onClose={() => setAlert(null)} title={t('recurring.title') as string} message={alert || ''} />
    </Container>
  );
};

export default RecurringOrdersPage;
