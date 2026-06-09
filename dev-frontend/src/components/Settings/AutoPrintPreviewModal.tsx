/**
 * Auto-Print Preview Modal
 *
 * Shows the last N orders broken down by which station printer would
 * receive them — uses the SAME bucketing logic the actual auto-print
 * path uses (backend mirrors the frontend bucketing function). Catches
 * the "kitchen station configured in DB but no printer assigned →
 * silent merge into first station" trap that has bitten the store
 * multiple times.
 *
 * NO actual printing happens. This is preview only.
 */
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { getAuthToken } from '../../utils/auth';
import {
  ModalOverlay, ModalContent, ModalHeader, ModalTitle, CloseButton,
  ModalBody, ModalFooter, ModalButton, FormSelect
} from '../UI/Modal';

interface StationBreakdown {
  stationId: number;
  stationName: string;
  printerName: string | null;
  printerAddress: string | null;
  method: string | null;
  items: Array<{ name: string; quantity: number; kitchen_station_id: number | null; options: any[] }>;
}

interface Warning {
  type: 'station_no_printer' | 'unmapped_items' | 'station_drift';
  stationId?: number;
  stationName?: string;
  stationNames?: string[];
  count?: number;
  itemNames?: string[];
  message: string;
}

interface Preview {
  orderId: number;
  orderNumber: string;
  tableNumber: string | null;
  source: string | null;
  orderType: string;
  paymentStatus: string;
  createdAt: string;
  totalAmount: string;
  totalItems: number;
  stations: StationBreakdown[];
  unmappedItemCount: number;
  warnings: Warning[];
}

interface Props {
  restaurantId: number;
  onClose: () => void;
}

const WideModal = styled(ModalContent)`
  max-width: 760px;
`;

const HeaderBar = styled.div`
  background: #F3F4F6;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #374151;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`;

const WarningBox = styled.div<{ severity?: 'high' | 'med' }>`
  background: ${p => p.severity === 'high' ? '#FEF2F2' : '#FFFBEB'};
  border: 1px solid ${p => p.severity === 'high' ? '#FCA5A5' : '#FCD34D'};
  border-radius: 8px;
  padding: 12px 14px;
  margin-bottom: 10px;
  color: ${p => p.severity === 'high' ? '#B91C1C' : '#92400E'};
  font-size: 13px;
  line-height: 1.5;
`;

const StationCard = styled.div`
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 10px;
  background: white;
`;

const StationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px dashed #E5E7EB;
  margin-bottom: 8px;
`;

const StationName = styled.div`
  font-weight: 600;
  color: #111827;
  font-size: 15px;
`;

const StationMeta = styled.div`
  color: #6B7280;
  font-size: 12px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 13px;
  color: #374151;
  border-bottom: 1px solid #F3F4F6;
  &:last-child { border-bottom: none; }
`;

const ItemQty = styled.span`
  color: #6B7280;
  margin-right: 8px;
`;

const NoConfig = styled.div`
  color: #B91C1C;
  font-size: 12px;
  font-style: italic;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7280;
`;

const formatOrderLabel = (p: Preview, t: TFunction) => {
  const time = new Date(p.createdAt).toLocaleString('en-MY', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  const items = t('settings:autoPrintPreview.itemsCount', { count: p.totalItems });
  return `${p.orderNumber} — ${time} (${p.source || 'pos'}, ${items})`;
};

const AutoPrintPreviewModal: React.FC<Props> = ({ restaurantId, onClose }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Preview[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [meta, setMeta] = useState<{ configuredStationCount: number; dbActiveStationCount: number } | null>(null);
  const [healing, setHealing] = useState<string | null>(null);
  const [healMsg, setHealMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const tok = getAuthToken();
      const r = await fetch(`/api/diagnostic/autoprint/preview/${restaurantId}?limit=10`, {
        headers: { Authorization: `Bearer ${tok}` }
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = await r.json();
      const list: Preview[] = j?.data?.previews || [];
      setPreviews(list);
      setMeta({
        configuredStationCount: j?.data?.configuredStationCount || 0,
        dbActiveStationCount: j?.data?.dbActiveStationCount || 0
      });
      if (list.length > 0) setSelectedId(list[0].orderId);
    } catch (e: any) {
      setError(e?.message || 'Failed to load preview');
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => { load(); }, [load]);

  const heal = useCallback(async (action: 'clear-stuck' | 'seed-missing') => {
    setHealing(action);
    setHealMsg(null);
    try {
      const tok = getAuthToken();
      const path = action === 'clear-stuck'
        ? `/api/diagnostic/autoprint/clear-stuck-print-flags/${restaurantId}`
        : `/api/diagnostic/autoprint/seed-missing-printer-configs/${restaurantId}`;
      const r = await fetch(path, {
        method: 'POST',
        headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
        body: action === 'clear-stuck' ? JSON.stringify({ minutesOld: 60 }) : '{}'
      });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j?.message || `HTTP ${r.status}`);
      setHealMsg({ kind: 'ok', text: j.data?.message || t('settings:autoPrintPreview.done') });
      await load();
    } catch (e: any) {
      setHealMsg({ kind: 'err', text: e?.message || t('settings:autoPrintPreview.selfHealFailed') });
    } finally {
      setHealing(null);
    }
  }, [restaurantId, load]);

  const selected = previews.find(p => p.orderId === selectedId) || null;

  return (
    <ModalOverlay onClick={onClose}>
      <WideModal onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{t('settings:autoPrintPreview.title')}</ModalTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>
        <ModalBody>
          <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 12, lineHeight: 1.5 }}>
            {t('settings:autoPrintPreview.desc')}
          </div>

          {meta && (
            <HeaderBar>
              <span>{t('settings:autoPrintPreview.dbStations')}: <b>{meta.dbActiveStationCount}</b></span>
              <span>{t('settings:autoPrintPreview.configuredStations')}: <b>{meta.configuredStationCount}</b></span>
              {meta.dbActiveStationCount > meta.configuredStationCount && (
                <span style={{ color: '#B91C1C', fontWeight: 600 }}>
                  ⚠ {t('settings:autoPrintPreview.unconfiguredWarn', { count: meta.dbActiveStationCount - meta.configuredStationCount })}
                </span>
              )}
            </HeaderBar>
          )}

          {/* Self-heal action bar */}
          {meta && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
              {meta.dbActiveStationCount > meta.configuredStationCount && (
                <button
                  type="button"
                  onClick={() => heal('seed-missing')}
                  disabled={!!healing}
                  style={{ padding: '8px 14px', borderRadius: 6, border: '1px solid #635BFF', background: healing === 'seed-missing' ? '#E0DFFF' : '#F0EFFF', color: '#635BFF', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
                >
                  {healing === 'seed-missing' ? t('settings:autoPrintPreview.seeding') : t('settings:autoPrintPreview.seedBtn')}
                </button>
              )}
              <button
                type="button"
                onClick={() => heal('clear-stuck')}
                disabled={!!healing}
                style={{ padding: '8px 14px', borderRadius: 6, border: '1px solid #EAB308', background: healing === 'clear-stuck' ? '#FEF3C7' : '#FFFBEB', color: '#92400E', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                {healing === 'clear-stuck' ? t('settings:autoPrintPreview.clearing') : t('settings:autoPrintPreview.clearBtn')}
              </button>
            </div>
          )}
          {healMsg && (
            <div style={{ padding: '10px 12px', borderRadius: 6, marginBottom: 12, background: healMsg.kind === 'ok' ? '#ECFDF5' : '#FEF2F2', color: healMsg.kind === 'ok' ? '#065F46' : '#B91C1C', fontSize: 13, fontWeight: 500 }}>
              {healMsg.text}
            </div>
          )}

          {loading && <EmptyState>{t('settings:autoPrintPreview.loading')}</EmptyState>}
          {error && <WarningBox severity="high">{t('settings:autoPrintPreview.loadFailed')}: {error}</WarningBox>}

          {!loading && !error && previews.length === 0 && (
            <EmptyState>{t('settings:autoPrintPreview.noOrders')}</EmptyState>
          )}

          {!loading && !error && previews.length > 0 && (
            <>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, color: '#6B7280', marginBottom: 6 }}>{t('settings:autoPrintPreview.selectOrder')}</label>
                <FormSelect value={selectedId ?? ''} onChange={e => setSelectedId(parseInt(e.target.value, 10))}>
                  {previews.map(p => (
                    <option key={p.orderId} value={p.orderId}>{formatOrderLabel(p, t)}</option>
                  ))}
                </FormSelect>
              </div>

              {selected && (
                <>
                  {selected.warnings.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      {selected.warnings.map((w, i) => (
                        <WarningBox key={i} severity={w.type === 'station_no_printer' ? 'high' : 'med'}>
                          <b>{w.type === 'station_no_printer' ? t('settings:autoPrintPreview.warnNoPrinter') : w.type === 'unmapped_items' ? t('settings:autoPrintPreview.warnUnmapped') : t('settings:autoPrintPreview.warnDrift')}</b> — {w.message}
                          {w.itemNames && w.itemNames.length > 0 && (
                            <div style={{ marginTop: 4, fontSize: 12 }}>{t('settings:autoPrintPreview.affectedItems')}: {w.itemNames.join(', ')}</div>
                          )}
                        </WarningBox>
                      ))}
                    </div>
                  )}

                  {selected.stations.length === 0 ? (
                    <EmptyState>{t('settings:autoPrintPreview.noStations')}</EmptyState>
                  ) : (
                    selected.stations.map(s => (
                      <StationCard key={s.stationId}>
                        <StationHeader>
                          <StationName>{s.stationName} <span style={{ color: '#9CA3AF', fontSize: 12, fontWeight: 400 }}>(id={s.stationId})</span></StationName>
                          <StationMeta>
                            {s.printerName ? (
                              <>{s.printerName}{s.printerAddress ? ` @ ${s.printerAddress}` : ''} · {s.method || '-'}</>
                            ) : (
                              <NoConfig>{t('settings:autoPrintPreview.warnNoPrinter')}</NoConfig>
                            )}
                          </StationMeta>
                        </StationHeader>
                        {s.items.map((it, idx) => (
                          <ItemRow key={idx}>
                            <span><ItemQty>{it.quantity}×</ItemQty>{it.name}</span>
                            <span style={{ color: '#9CA3AF', fontSize: 11 }}>
                              {it.kitchen_station_id ? `station=${it.kitchen_station_id}` : <span style={{ color: '#DC2626' }}>{t('settings:autoPrintPreview.unmappedAbsorb')}</span>}
                            </span>
                          </ItemRow>
                        ))}
                      </StationCard>
                    ))
                  )}
                </>
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <ModalButton variant="secondary" onClick={load} disabled={loading}>{t('settings:autoPrintPreview.refresh')}</ModalButton>
          <ModalButton variant="primary" onClick={onClose}>{t('settings:autoPrintPreview.close')}</ModalButton>
        </ModalFooter>
      </WideModal>
    </ModalOverlay>
  );
};

export default AutoPrintPreviewModal;
