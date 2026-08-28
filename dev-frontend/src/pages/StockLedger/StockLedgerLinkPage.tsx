/**
 * StockLedgerLinkPage — 일괄 연결 (재고 장부 정렬 + 재고·업체상품 링크)
 * 설계: docs/STOCK_LEDGER_UNIFICATION_DESIGN.md §11
 *
 * 탭 2개: ① 구매 연결(이관/카탈로그) ② 커버리지
 * 규칙: alert/toast 금지 → 결과 패널 + 목록 리프레시. 장식 이모지 금지. 공용 컴포넌트만 사용.
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthToken } from '../../utils/auth';
import { Button } from '../../components/UI/Button';
import {
  DataTableContainer, DataTable, DataTableHead, DataTableRow,
  DataTableCell, DataTableHeaderCell, DataTableEmpty
} from '../../components/UI/DataTable';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
import { TabContainer, Tab } from '../../components/UI/Tabs';
import type {
  MigrationItem, CatalogItem, PreviewSummary, BatchResult, CoverageReport, RowDecision, LinkMode
} from '../../interfaces/stockLedger';

const Bar = styled.div`
  display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
  padding: 12px 16px; background: #F1F4F8; border: 1px solid #C7CED6; border-radius: 8px; margin-bottom: 12px;
  font-size: 13px; color: #0A2540;
  strong { font-weight: 600; }
`;
const Field = styled.select`
  padding: 6px 10px; border: 1px solid #C7CED6; border-radius: 6px; background: #FFFFFF;
  font-size: 13px; color: #0A2540; font-family: inherit;
`;
const Banner = styled.div<{ $tone?: 'error' | 'info' }>`
  padding: 10px 14px; border-radius: 8px; margin-bottom: 12px; font-size: 13px;
  background: ${p => p.$tone === 'error' ? '#FEF2F2' : '#EEF2FF'};
  border: 1px solid ${p => p.$tone === 'error' ? '#EF4444' : '#C7D2FE'};
  color: ${p => p.$tone === 'error' ? '#B91C1C' : '#3730A3'};
`;
const Note = styled.span<{ $tone?: 'muted' | 'warn' | 'ok' }>`
  font-size: 12px;
  color: ${p => p.$tone === 'warn' ? '#B45309' : p.$tone === 'ok' ? '#166534' : '#64748B'};
`;
const Pager = styled.div`display: flex; gap: 8px; align-items: center; margin-top: 12px; font-size: 13px; color: #475569;`;

const PAGE = 50;

type TabKey = 'link' | 'coverage';
type SourceKind = 'stock_items' | 'catalog';

const StockLedgerLinkPage: React.FC = () => {
  const { t } = useTranslation(['stockLedger', 'common']);
  const { user } = useAuth();

  // user 는 snake_case 다 (reference_user_object_snake_case)
  const brandId = (user as any)?.brand_id ?? null;
  const restaurantId = (user as any)?.restaurant_id ?? null;
  const scope = brandId ? { type: 'brand' as const, id: brandId } : restaurantId ? { type: 'restaurant' as const, id: restaurantId } : null;
  const apiBase = scope ? (scope.type === 'brand' ? `/api/brands/${scope.id}` : `/api/restaurants/${scope.id}`) : null;

  const [tab, setTab] = useState<TabKey>('link');
  const [sourceKind, setSourceKind] = useState<SourceKind>(scope?.type === 'brand' ? 'stock_items' : 'catalog');
  const [sellerType, setSellerType] = useState<'supplier' | 'brand' | 'foodcourt'>('supplier');
  const [sellerEntityId, setSellerEntityId] = useState<string>('');

  const [rows, setRows] = useState<Array<MigrationItem | CatalogItem>>([]);
  const [summary, setSummary] = useState<PreviewSummary | null>(null);
  const [decisions, setDecisions] = useState<Record<number, RowDecision>>({});
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BatchResult | null>(null);
  const [coverage, setCoverage] = useState<CoverageReport | null>(null);

  const isMigration = sourceKind === 'stock_items';
  const rowKey = useCallback((r: any) => (isMigration ? r.source_id : r.seller_product_id), [isMigration]);

  const fetchJson = useCallback(async (path: string, init?: RequestInit) => {
    const token = getAuthToken();
    const res = await fetch(path, {
      ...init,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(init?.headers || {}) }
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.success) {
      const err: any = new Error(json?.message || t('stockLedger:errors.generic', 'Request failed'));
      err.code = json?.code;
      throw err;
    }
    return json.data;
  }, [t]);

  const loadPreview = useCallback(async () => {
    if (!apiBase) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const path = isMigration
        ? `${apiBase}/stock-ledger/migration-preview?limit=${PAGE}&offset=${offset}`
        : `${apiBase}/catalog-link/preview?seller_type=${sellerType}&seller_entity_id=${encodeURIComponent(sellerEntityId)}&limit=${PAGE}&offset=${offset}`;
      const data = await fetchJson(path);
      setRows(data.items || []);
      setSummary(data.summary || null);
      setDecisions(prev => {
        const next = { ...prev };
        (data.items || []).forEach((it: any) => {
          const k = isMigration ? it.source_id : it.seller_product_id;
          if (next[k]) return;
          next[k] = {
            mode: it.suggested_mode as LinkMode,
            existing_ingredient_id: it.match?.ingredient_id ?? null,
            apply_cost: false
          };
        });
        return next;
      });
    } catch (e: any) {
      setError(e.code === 'NO_ACTIVE_CONTRACT'
        ? t('stockLedger:errors.noContract', 'An active contract with this seller is required.')
        : e.code === 'BG_FG_RESTAURANT_ONLY'
          ? t('stockLedger:errors.restaurantOnly', 'Only restaurants can buy from brand or foodcourt sellers.')
          : e.message);
      setRows([]); setSummary(null);
    } finally {
      setLoading(false);
    }
  }, [apiBase, isMigration, offset, sellerType, sellerEntityId, fetchJson, t]);

  const loadCoverage = useCallback(async () => {
    if (!apiBase) return;
    setLoading(true); setError(null);
    try {
      setCoverage(await fetchJson(`${apiBase}/stock-ledger/coverage`));
    } catch (e: any) {
      setError(e.message); setCoverage(null);
    } finally { setLoading(false); }
  }, [apiBase, fetchJson]);

  useEffect(() => {
    if (tab === 'coverage') { loadCoverage(); return; }
    if (isMigration || sellerEntityId) loadPreview();
  }, [tab, isMigration, offset, loadPreview, loadCoverage, sellerEntityId]);

  // 제출 중 이탈 방지
  useEffect(() => {
    if (!submitting) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [submitting]);

  const setMode = (key: number, mode: LinkMode) =>
    setDecisions(prev => ({ ...prev, [key]: { ...prev[key], mode } }));
  const setApplyCost = (key: number, v: boolean) =>
    setDecisions(prev => ({ ...prev, [key]: { ...prev[key], apply_cost: v } }));

  const counts = useMemo(() => {
    const c = { connect: 0, create: 0, skip: 0, hold: 0 };
    rows.forEach(r => {
      const d = decisions[rowKey(r)];
      if (d) (c as any)[d.mode] = ((c as any)[d.mode] || 0) + 1;
    });
    return c;
  }, [rows, decisions, rowKey]);

  const submit = async () => {
    if (!apiBase) return;
    setSubmitting(true); setError(null);
    try {
      const payload = isMigration
        ? {
            decisions: rows.map(r => {
              const k = rowKey(r); const d = decisions[k];
              return { source_id: k, mode: d.mode, existing_ingredient_id: d.existing_ingredient_id, apply_cost: d.apply_cost };
            })
          }
        : {
            seller_type: sellerType,
            seller_entity_id: Number(sellerEntityId),
            items: rows.map(r => {
              const k = rowKey(r); const d = decisions[k];
              return { seller_product_id: k, mode: d.mode === 'hold' ? 'skip' : d.mode, existing_ingredient_id: d.existing_ingredient_id, apply_cost: d.apply_cost };
            })
          };
      const path = isMigration ? `${apiBase}/stock-ledger/migrate` : `${apiBase}/catalog-link/bulk`;
      const data = await fetchJson(path, { method: 'POST', body: JSON.stringify(payload) });
      setResult(data);
      await loadPreview();
    } catch (e: any) {
      setError(e.code === 'BATCH_IN_PROGRESS'
        ? t('stockLedger:errors.batchInProgress', 'Another batch is running. Try again shortly.')
        : e.message);
    } finally { setSubmitting(false); }
  };

  if (!scope) {
    return (
      <Container>
        <Header><Title>{t('stockLedger:title', 'Bulk link')}</Title></Header>
        <Content><DataTableEmpty>{t('stockLedger:noScope', 'No brand or restaurant is assigned to your account.')}</DataTableEmpty></Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header><Title>{t('stockLedger:title', 'Bulk link')}</Title></Header>
      <Content>
        <TabContainer>
          <Tab active={tab === 'link'} onClick={() => setTab('link')}>{t('stockLedger:tabs.link', 'Purchase links')}</Tab>
          <Tab active={tab === 'coverage'} onClick={() => setTab('coverage')}>{t('stockLedger:tabs.coverage', 'Coverage')}</Tab>
        </TabContainer>

        {error && <Banner $tone="error">{error}</Banner>}

        {tab === 'link' && (
          <>
            <Bar>
              <label>
                {t('stockLedger:source', 'Source')}{' '}
                <Field value={sourceKind} onChange={e => { setSourceKind(e.target.value as SourceKind); setOffset(0); setRows([]); setSummary(null); }}>
                  {scope.type === 'brand' && <option value="stock_items">{t('stockLedger:sources.stockItems', 'Company stock items')}</option>}
                  <option value="catalog">{t('stockLedger:sources.catalog', 'Seller catalog')}</option>
                </Field>
              </label>
              {!isMigration && (
                <>
                  <label>
                    {t('stockLedger:sellerType', 'Seller')}{' '}
                    <Field value={sellerType} onChange={e => { setSellerType(e.target.value as any); setOffset(0); }}>
                      <option value="supplier">{t('stockLedger:sellers.supplier', 'Supplier')}</option>
                      <option value="brand">{t('stockLedger:sellers.brand', 'Brand')}</option>
                      <option value="foodcourt">{t('stockLedger:sellers.foodcourt', 'Foodcourt')}</option>
                    </Field>
                  </label>
                  <label>
                    {t('stockLedger:sellerId', 'Seller ID')}{' '}
                    <input
                      value={sellerEntityId}
                      onChange={e => { setSellerEntityId(e.target.value.replace(/[^0-9]/g, '')); setOffset(0); }}
                      style={{ width: 90, padding: '6px 10px', border: '1px solid #C7CED6', borderRadius: 6, background: '#FFFFFF' }}
                    />
                  </label>
                </>
              )}
              {summary && (
                <span>
                  <strong>{t('stockLedger:summary.total', 'Total')} {summary.total}</strong>
                  {' · '}{t('stockLedger:summary.auto', 'New')} {summary.auto}
                  {' · '}{t('stockLedger:summary.review', 'Needs check')} {summary.review}
                  {summary.already_linked !== undefined && <>{' · '}{t('stockLedger:summary.linked', 'Linked')} {summary.already_linked}</>}
                  {summary.blocked !== undefined && <>{' · '}{t('stockLedger:summary.blocked', 'Unavailable')} {summary.blocked}</>}
                </span>
              )}
            </Bar>

            {result && (
              <Banner>
                {t('stockLedger:result.created', 'Created')} {result.created}
                {' · '}{t('stockLedger:result.connected', 'Linked')} {result.connected}
                {' · '}{t('stockLedger:result.skipped', 'Skipped')} {result.skipped}
                {' · '}{t('stockLedger:result.failed', 'Failed')} {result.failed.length}
                {result.failed.length > 0 && (
                  <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                    {result.failed.slice(0, 20).map((f, i) => (
                      <li key={i}>{f.source_id ?? f.seller_product_id} — {f.reason}</li>
                    ))}
                  </ul>
                )}
              </Banner>
            )}

            <DataTableContainer style={{ overflowX: 'auto' }}>
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell>{t('stockLedger:col.name', 'Seller item')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('stockLedger:col.unit', 'Unit')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('stockLedger:col.price', 'Price')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('stockLedger:col.target', 'Target')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('stockLedger:col.recipes', 'Recipes')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('stockLedger:col.cost', 'Apply cost')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {rows.length === 0 && (
                    <tr><DataTableCell colSpan={6}><DataTableEmpty>{loading ? t('common:loading', 'Loading') : t('stockLedger:empty', 'Nothing to show')}</DataTableEmpty></DataTableCell></tr>
                  )}
                  {rows.map((r: any) => {
                    const k = rowKey(r);
                    const d = decisions[k];
                    const blocked = !isMigration && r.blocked_reason;
                    const linked = !isMigration && r.already_linked_ingredient_id;
                    return (
                      <DataTableRow key={k} style={blocked ? { opacity: 0.55 } : undefined}>
                        <DataTableCell>
                          {r.name}{r.sku ? ` (${r.sku})` : ''}
                          {blocked && <><br /><Note $tone="warn">{t('stockLedger:blocked', 'Unavailable')} — {r.blocked_reason}</Note></>}
                          {linked && <><br /><Note $tone="ok">{t('stockLedger:linked', 'Already linked')}</Note></>}
                          {!blocked && !linked && r.match.type === 'exact' && <><br /><Note>{t('stockLedger:nameMatch', 'Name match')}: {r.match.ingredient_name}</Note></>}
                        </DataTableCell>
                        <DataTableCell>{r.unit || '-'}</DataTableCell>
                        <DataTableCell>{r.unit_price ?? r.unit_cost ?? '-'}</DataTableCell>
                        <DataTableCell>
                          <Field
                            value={d?.mode || 'skip'}
                            disabled={!!blocked}
                            onChange={e => setMode(k, e.target.value as LinkMode)}
                          >
                            {r.match.type === 'exact' && <option value="connect">{t('stockLedger:mode.connect', 'Link to existing')}</option>}
                            <option value="create">{t('stockLedger:mode.create', 'Create new')}</option>
                            <option value="skip">{t('stockLedger:mode.skip', 'Exclude')}</option>
                            {isMigration && <option value="hold">{t('stockLedger:mode.hold', 'Hold')}</option>}
                          </Field>
                        </DataTableCell>
                        <DataTableCell>{r.match.recipe_usage_count || 0}</DataTableCell>
                        <DataTableCell>
                          <input
                            type="checkbox"
                            checked={!!d?.apply_cost}
                            disabled={!!blocked || d?.mode !== 'connect'}
                            onChange={e => setApplyCost(k, e.target.checked)}
                          />
                        </DataTableCell>
                      </DataTableRow>
                    );
                  })}
                </tbody>
              </DataTable>
            </DataTableContainer>

            <Pager>
              <Button variant="secondary" size="small" disabled={offset === 0 || loading} onClick={() => setOffset(Math.max(0, offset - PAGE))}>
                {t('common:previous', 'Previous')}
              </Button>
              <span>{offset + 1}–{offset + rows.length}{summary ? ` / ${summary.total}` : ''}</span>
              <Button variant="secondary" size="small" disabled={loading || !summary || offset + PAGE >= summary.total} onClick={() => setOffset(offset + PAGE)}>
                {t('common:next', 'Next')}
              </Button>
              <span style={{ marginLeft: 'auto' }}>
                <Note>
                  {t('stockLedger:mode.connect', 'Link to existing')} {counts.connect}
                  {' · '}{t('stockLedger:mode.create', 'Create new')} {counts.create}
                  {' · '}{t('stockLedger:mode.skip', 'Exclude')} {counts.skip}
                  {isMigration && <>{' · '}{t('stockLedger:mode.hold', 'Hold')} {counts.hold}</>}
                </Note>
              </span>
              <Button variant="primary" disabled={rows.length === 0 || loading} onClick={submit}>
                {t('stockLedger:submit', 'Apply to selected')}
              </Button>
            </Pager>
          </>
        )}

        {tab === 'coverage' && (
          <>
            {coverage && (
              <Bar>
                <span>
                  <strong>{t('stockLedger:coverage.unmapped', 'No supplier linked')} {coverage.summary.ingredients_unmapped}</strong>
                  {' / '}{coverage.summary.ingredients_total}
                  {' · '}{t('stockLedger:coverage.usedInRecipes', 'Used in recipes')} {coverage.summary.ingredients_unmapped_used_in_recipes}
                  {' · '}{t('stockLedger:coverage.recipesWithout', 'Recipes with no ingredients')} {coverage.summary.recipes_without_ingredients}
                  {' / '}{coverage.summary.recipes_total}
                </span>
              </Bar>
            )}
            <DataTableContainer style={{ overflowX: 'auto' }}>
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell>{t('stockLedger:coverage.item', 'Item')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('stockLedger:col.unit', 'Unit')}</DataTableHeaderCell>
                    <DataTableHeaderCell>{t('stockLedger:col.recipes', 'Recipes')}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {(!coverage || coverage.unmapped_ingredients.length === 0) && (
                    <tr><DataTableCell colSpan={3}><DataTableEmpty>{loading ? t('common:loading', 'Loading') : t('stockLedger:coverage.allLinked', 'Every item has a supplier')}</DataTableEmpty></DataTableCell></tr>
                  )}
                  {coverage?.unmapped_ingredients.map(u => (
                    <DataTableRow key={u.ingredient_id}>
                      <DataTableCell>{u.name}</DataTableCell>
                      <DataTableCell>{u.unit || '-'}</DataTableCell>
                      <DataTableCell>{u.recipe_usage_count}</DataTableCell>
                    </DataTableRow>
                  ))}
                </tbody>
              </DataTable>
            </DataTableContainer>

            <div style={{ marginTop: 20 }}>
              <Note>{t('stockLedger:coverage.recipesHint', 'Recipes with no ingredients linked — link them in the recipe editor.')}</Note>
              <DataTableContainer style={{ overflowX: 'auto', marginTop: 8 }}>
                <DataTable>
                  <DataTableHead>
                    <tr><DataTableHeaderCell>{t('stockLedger:coverage.recipe', 'Recipe')}</DataTableHeaderCell></tr>
                  </DataTableHead>
                  <tbody>
                    {(!coverage || coverage.recipes_without_ingredients.length === 0) && (
                      <tr><DataTableCell><DataTableEmpty>{t('stockLedger:coverage.allRecipesLinked', 'Every recipe has ingredients')}</DataTableEmpty></DataTableCell></tr>
                    )}
                    {/* 동명 레시피도 각각 별개 행으로 — 이름 병합 금지 */}
                    {coverage?.recipes_without_ingredients.map(r => (
                      <DataTableRow key={r.recipe_id}><DataTableCell>{r.name}</DataTableCell></DataTableRow>
                    ))}
                  </tbody>
                </DataTable>
              </DataTableContainer>
            </div>
          </>
        )}
      </Content>
    </Container>
  );
};

export default StockLedgerLinkPage;
