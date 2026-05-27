/**
 * Restaurant — Brand Menu Updates
 *
 * Lists pending updates from the linked Brand. Shows diff per menu (only
 * changed fields), supports per-menu sync, bulk Sync All, or Skip This Version.
 * New menus pushed for the first time appear with a "NEW" tag.
 */
import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, RefreshCw, SkipForward, AlertTriangle, Building2 } from 'lucide-react';
import PageHeader from '../../components/Common/PageHeader';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import { formatCurrency } from '../../utils/currency';

const Container = styled.div` min-height: 100vh; background: #F9FAFB; `;
const Content = styled.main` padding: 24px 32px; @media (max-width: 768px) { padding: 16px; } `;
const ActionRow = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 12px; flex-wrap: wrap; `;
const Summary = styled.div` font-size: 14px; color: #4B5563; `;
const Card = styled.div<{ $isNew?: boolean }>`
  background: ${p => p.$isNew ? '#F0EFFF' : 'white'};
  border: 1px solid ${p => p.$isNew ? '#DDD9FF' : '#C7CED6'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;
const CardHeader = styled.div` display: flex; align-items: center; gap: 12px; margin-bottom: 12px; `;
const Title = styled.h3` font-size: 15px; font-weight: 600; color: #0A2540; margin: 0; flex: 1; `;
const NewBadge = styled.span`
  display: inline-flex; align-items: center; gap: 4px;
  background: #635BFF; color: white; padding: 2px 8px; border-radius: 999px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
`;
const VersionBadge = styled.span` font-size: 12px; color: #4B5563; `;
const DiffList = styled.div` margin-top: 8px; `;
const DiffRow = styled.div` font-size: 13px; color: #0A2540; padding: 4px 0; display: flex; align-items: center; gap: 8px; `;
const FieldName = styled.span` color: #4B5563; min-width: 80px; text-transform: capitalize; `;
const OldValue = styled.span` color: #6B7280; text-decoration: line-through; `;
const NewValue = styled.span` color: #635BFF; font-weight: 500; `;
const Arrow = styled.span` color: #6B7280; `;
const LockChip = styled.span`
  display: inline-flex; align-items: center; gap: 4px; margin-left: 8px;
  padding: 2px 8px; background: #F0EFFF; color: #635BFF; border-radius: 999px;
  font-size: 11px; font-weight: 500;
  svg { width: 10px; height: 10px; }
`;
const Actions = styled.div` display: flex; gap: 8px; margin-top: 12px; padding-top: 12px; border-top: 1px solid #F1F4F8; justify-content: flex-end; `;
const IngredientsWarning = styled.div`
  margin-top: 8px; padding: 8px 12px; background: #FEF3C7; border-radius: 6px;
  font-size: 12px; color: #92400E; display: flex; align-items: center; gap: 6px;
  svg { width: 14px; height: 14px; }
`;
const EmptyState = styled.div`
  background: white; border: 1px dashed #C7CED6; border-radius: 12px;
  padding: 64px 24px; text-align: center; color: #4B5563;
`;

interface DiffField { field: string; old: any; new: any; will_be_locked: boolean; }
interface UpdateItem {
  brand_menu_id: number; brand_menu_name: string; brand_menu_image: string | null;
  brand_menu_price: number; brand_menu_category: string | null;
  local_product_id: number | null;
  current_version: number | null; new_version: number;
  is_new_menu: boolean;
  diff: { fields: DiffField[]; is_new_menu: boolean };
  locks: { name: boolean; price: boolean; category: boolean; image: boolean; options: boolean };
}
interface UpdatesData { brand: { id: number; name: string; logo_url: string | null } | null; pending_count: number; items: UpdateItem[]; }

const authHeaders = () => {
  const t = getAuthToken();
  return t ? { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` } : { 'Content-Type': 'application/json' };
};

const BrandMenuUpdatesPage: React.FC = () => {
  const { t } = useTranslation(['orders', 'common']);
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [data, setData] = useState<UpdatesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!restaurantId) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/restaurant/${restaurantId}/brand-menus/updates`, { headers: authHeaders() });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Failed to load');
      setData(j.data);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => { load(); }, [load]);

  const syncOne = async (bmid: number) => {
    setBusy({ ...busy, [bmid]: true });
    try {
      const r = await fetch(`/api/restaurant/${restaurantId}/brand-menus/${bmid}/sync`, { method: 'POST', headers: authHeaders() });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Sync failed');
      await load();
    } catch (e: any) {
      setError(e?.message || 'Sync failed');
    } finally {
      setBusy({ ...busy, [bmid]: false });
    }
  };

  const skipOne = async (bmid: number) => {
    setBusy({ ...busy, [bmid]: true });
    try {
      const r = await fetch(`/api/restaurant/${restaurantId}/brand-menus/${bmid}/skip-version`, { method: 'POST', headers: authHeaders() });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Skip failed');
      await load();
    } catch (e: any) {
      setError(e?.message || 'Skip failed');
    } finally {
      setBusy({ ...busy, [bmid]: false });
    }
  };

  const syncAll = async () => {
    if (!window.confirm(t('orders:brandMenuUpdatesPage.confirmSyncAll', 'Sync all pending brand menu updates?'))) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/restaurant/${restaurantId}/brand-menus/sync-all`, { method: 'POST', headers: authHeaders() });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Sync all failed');
      await load();
    } catch (e: any) {
      setError(e?.message || 'Sync all failed');
    } finally {
      setLoading(false);
    }
  };

  const renderValue = (field: string, val: any) => {
    if (val == null || val === '') return '—';
    if (field === 'price') return formatCurrency(Number(val), 'MYR');
    if (field === 'image') return t('orders:brandMenuUpdatesPage.imageChanged', '(image changed)');
    return String(val);
  };

  return (
    <Container>
      <PageHeader title={t('orders:brandMenuUpdatesPage.title', 'Brand Menu Updates')} />
      <Content>
        <ActionRow>
          <Summary>
            {data?.brand?.name ? (
              <>
                <Building2 style={{ width: 14, height: 14, verticalAlign: -2, marginRight: 4 }} />
                {t('orders:brandMenuUpdatesPage.summary', { count: data.pending_count, brandName: data.brand.name, defaultValue: `${data.pending_count} updates from ${data.brand.name}` })}
              </>
            ) : t('orders:brandMenuUpdatesPage.noBrand', 'This restaurant is not linked to a brand.')}
          </Summary>
          {data && data.items.length > 0 && (
            <ThemedButton variant="primary" onClick={syncAll} disabled={loading}>
              <RefreshCw style={{ width: 14, height: 14, marginRight: 4 }} />
              {t('orders:brandMenuUpdatesPage.syncAllNow', 'Sync All Now')}
            </ThemedButton>
          )}
        </ActionRow>

        {error && (
          <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{error}</div>
        )}

        {loading ? (
          <EmptyState>{t('common:label.loading', 'Loading...')}</EmptyState>
        ) : !data || data.items.length === 0 ? (
          <EmptyState>
            <div style={{ fontSize: 32, color: '#10B981', marginBottom: 8 }}>✓</div>
            <div style={{ fontWeight: 500, color: '#0A2540', marginBottom: 4 }}>
              {t('orders:brandMenuUpdatesPage.allSyncedTitle', 'All synced')}
            </div>
            <div>{t('orders:brandMenuUpdatesPage.allSyncedDesc', 'No pending updates from your brand.')}</div>
          </EmptyState>
        ) : (
          data.items.map(item => (
            <Card key={item.brand_menu_id} $isNew={item.is_new_menu}>
              <CardHeader>
                <Title>{item.brand_menu_name}</Title>
                {item.is_new_menu && <NewBadge>{t('orders:brandMenuUpdatesPage.newMenuLabel', 'NEW')}</NewBadge>}
                <VersionBadge>
                  {item.current_version != null ? `v${item.current_version} → v${item.new_version}` : `v${item.new_version}`}
                </VersionBadge>
              </CardHeader>

              {item.is_new_menu ? (
                <div style={{ fontSize: 13, color: '#0A2540' }}>
                  <div style={{ marginBottom: 4 }}>
                    {t('orders:brandMenuUpdatesPage.firstTimePush', 'New menu pushed for the first time.')}
                  </div>
                  <div style={{ color: '#4B5563' }}>
                    {t('orders:brandMenuUpdatesPage.price', 'Price')}: {formatCurrency(item.brand_menu_price, 'MYR')}
                    {item.locks.price && <LockChip><Lock /> {t('orders:brandMenuUpdatesPage.willBeEnforced', 'will be enforced')}</LockChip>}
                  </div>
                  {item.brand_menu_category && (
                    <div style={{ color: '#4B5563' }}>{t('orders:brandMenuUpdatesPage.category', 'Category')}: {item.brand_menu_category}</div>
                  )}
                </div>
              ) : (
                <DiffList>
                  {item.diff.fields.length === 0 ? (
                    <div style={{ fontSize: 13, color: '#4B5563' }}>{t('orders:brandMenuUpdatesPage.optionGroupOnly', 'Option group(s) changed — sync to apply.')}</div>
                  ) : item.diff.fields.map((f, i) => (
                    <DiffRow key={i}>
                      <FieldName>{f.field}:</FieldName>
                      <OldValue>{renderValue(f.field, f.old)}</OldValue>
                      <Arrow>→</Arrow>
                      <NewValue>{renderValue(f.field, f.new)}</NewValue>
                      {f.will_be_locked && <LockChip><Lock /> {t('orders:brandMenuUpdatesPage.lockedByBrand', 'Locked by Brand')}</LockChip>}
                    </DiffRow>
                  ))}
                </DiffList>
              )}

              <Actions>
                <ThemedButton variant="secondary" onClick={() => skipOne(item.brand_menu_id)} disabled={busy[item.brand_menu_id]}>
                  <SkipForward style={{ width: 14, height: 14, marginRight: 4 }} />
                  {t('orders:brandMenuUpdatesPage.skipThisVersion', 'Skip This Version')}
                </ThemedButton>
                <ThemedButton variant="primary" onClick={() => syncOne(item.brand_menu_id)} disabled={busy[item.brand_menu_id]}>
                  <RefreshCw style={{ width: 14, height: 14, marginRight: 4 }} />
                  {item.is_new_menu ? t('orders:brandMenuUpdatesPage.addMenu', 'Add Menu') : t('orders:brandMenuUpdatesPage.syncThisMenu', 'Sync This Menu')}
                </ThemedButton>
              </Actions>
            </Card>
          ))
        )}
      </Content>
    </Container>
  );
};

export default BrandMenuUpdatesPage;
