/**
 * 수익성 설정 — 결제·채널 수수료율 · 목표 · 성과판 기준선 · 브랜드와 공유 · 운영비 규칙 (설계 §4-2 · §4-3 · §6-2 · §9)
 * 한 번 넣으면 되는 것만 둔다(입력 최소화 §9). 운영비 규칙은 지우지 않고 «끝내기»(유효 기간 닫기) — 지난 달 손익이 흔들리지 않게.
 */
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/UI/Button';
import { Modal, FormGroup, FormLabel, FormInput, FormSelect } from '../../../components/UI/Modal';
import { StandardSelect } from '../../../components/UI/SelectComponents';
import ConfirmModal from '../../../components/ConfirmModal';
import { DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../../components/UI/DataTable';
import { getCurrencySymbol } from '../../../utils/currency';
import { storeApi, Settings, CostEntry } from '../profitabilityApi';
import { Card, CardTitle, Muted, Row, ErrorBox, COLORS, money } from '../profitabilityUi';

interface Props { restaurantId: string; currency: string; timeZone: string; onSaved: () => void }

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px 14px;
  margin: 10px 0 14px;
`;
const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: #374151;
  & input, & select {
    padding: 8px 10px;
    border: 1px solid #C7CED6;
    border-radius: 6px;
    font-size: 14px;
    min-height: 40px;
    box-sizing: border-box;
  }
`;
const Saved = styled.span`
  color: #047857;
  font-size: 13px;
  font-weight: 600;
`;

const CATEGORIES: CostEntry['category'][] = ['rent', 'royalty', 'marketing_fund', 'utilities', 'other_fixed'];
const RULES: CostEntry['rule'][] = ['fixed', 'pct', 'max'];

interface Draft { id?: number; category: CostEntry['category']; label: string; rule: CostEntry['rule']; fixed_amount: string; pct: string; effective_from: string; note: string }
const emptyDraft: Draft = { category: 'rent', label: '', rule: 'fixed', fixed_amount: '', pct: '', effective_from: '', note: '' };

const SettingsTab: React.FC<Props> = ({ restaurantId, currency, timeZone, onSaved }) => {
  const { t } = useTranslation('profitability');
  const [s, setS] = useState<Settings | null>(null);
  const [fees, setFees] = useState<Record<string, string>>({});
  const [chFees, setChFees] = useState<Record<string, string>>({});
  const [targets, setTargets] = useState<Record<string, string>>({});
  const [entries, setEntries] = useState<CostEntry[]>([]);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [draftError, setDraftError] = useState('');
  const [closing, setClosing] = useState<CostEntry | null>(null);

  // «오늘» = 매장 타임존(규칙 끝내기·진행 중 판정 — 서버와 같은 기준)
  const today = new Date().toLocaleDateString('en-CA', { timeZone });

  const fill = (d: Settings) => {
    setS(d);
    setFees(Object.fromEntries(d.fee_keys.map(k => [k, d.fees[k] === undefined ? '' : String(d.fees[k])])));
    setChFees(Object.fromEntries(d.channel_fee_keys.map(k => [k, d.channel_fees[k] === undefined ? '' : String(d.channel_fees[k])])));
    setTargets({ food_cost_pct: String(d.targets.food_cost_pct), prime_cost_pct: String(d.targets.prime_cost_pct), variance_alert_pct: String(d.targets.variance_alert_pct) });
  };

  const load = useCallback(async () => {
    const [a, b] = await Promise.all([storeApi<Settings>(restaurantId, '/settings'), storeApi<CostEntry[]>(restaurantId, '/cost-entries')]);
    if (!a.ok) { setError(a.message || t('errors.load', 'Could not load')); return; }
    fill(a.data);
    if (b.ok) setEntries(b.data);
  }, [restaurantId, t]);
  useEffect(() => { load(); }, [load]);

  const save = async (extra: Partial<Settings> = {}) => {
    if (saving) return;
    setSaving(true); setError(''); setSaved('');
    const toNum = (m: Record<string, string>) => Object.fromEntries(Object.entries(m).filter(([, v]) => v !== '').map(([k, v]) => [k, Number(v)]));
    const r = await storeApi<Settings>(restaurantId, '/settings', { method: 'PUT', body: { fees: toNum(fees), channel_fees: toNum(chFees), targets: toNum(targets), ...extra } });
    setSaving(false);
    if (!r.ok) { setError(r.message || t('errors.save', 'Could not save')); return; }
    fill(r.data); setSaved(t('settings.saved', 'Saved')); onSaved();
  };

  const openDraft = (e?: CostEntry) => {
    setDraftError('');
    setDraft(e ? {
      id: e.id, category: e.category, label: e.label || '', rule: e.rule,
      fixed_amount: e.fixed_amount === null ? '' : String(e.fixed_amount), pct: e.pct === null ? '' : String(e.pct),
      effective_from: e.effective_from || '', note: e.note || '',
    } : { ...emptyDraft });
  };

  const saveDraft = async () => {
    if (!draft || saving) return;
    setSaving(true); setDraftError('');
    const body = {
      category: draft.category, label: draft.label, rule: draft.rule,
      fixed_amount: draft.rule === 'pct' ? null : draft.fixed_amount, pct: draft.rule === 'fixed' ? null : draft.pct,
      effective_from: draft.effective_from || null, note: draft.note,
    };
    const r = draft.id
      ? await storeApi<CostEntry>(restaurantId, `/cost-entries/${draft.id}`, { method: 'PATCH', body })
      : await storeApi<CostEntry>(restaurantId, '/cost-entries', { method: 'POST', body });
    setSaving(false);
    if (!r.ok) { setDraftError(r.message || t('errors.save', 'Could not save')); return; }
    setDraft(null); load(); onSaved();
  };

  const closeEntry = async () => {
    if (!closing) return;
    const r = await storeApi(restaurantId, `/cost-entries/${closing.id}`, { method: 'PATCH', body: { effective_to: today } });
    setClosing(null);
    if (!r.ok) { setError(r.message || t('errors.save', 'Could not save')); return; }
    load(); onSaved();
  };

  if (error && !s) return <ErrorBox>{error}</ErrorBox>;
  if (!s) return <Muted>{t('common.loading', 'Loading…')}</Muted>;

  const feeLabel = (k: string) => t(`settings.feeKey.${k}`, { cash: 'Cash', card: 'Card', ewallet: 'E-wallet', qr_payment: 'QR payment', online: 'Online payment', bankTransfer: 'Bank transfer', counter: 'Pay at counter' }[k] || k);
  const chLabel = (k: string) => t(`channel.type.${k}`, { dine_in: 'Dine-in', takeaway: 'Takeaway', delivery: 'Delivery', pickup: 'Pickup' }[k] || k);
  const ruleText = (e: CostEntry) => (e.rule === 'fixed' ? `${money(e.fixed_amount, currency)} / ${t('cost.month', 'month')}`
    : e.rule === 'pct' ? t('cost.pctOf', '{{p}}% of net sales', { p: e.pct })
      : t('cost.maxOf', 'higher of {{a}} or {{p}}%', { a: money(e.fixed_amount, currency), p: e.pct }));
  const active = entries.filter(e => !e.effective_to || e.effective_to >= today);
  const ended = entries.filter(e => e.effective_to && e.effective_to < today);

  return (
    <>
      {error && <ErrorBox>{error}</ErrorBox>}
      <Card>
        <CardTitle>{t('settings.feesTitle', 'Payment fees (% of the paid amount)')}</CardTitle>
        <Muted>{t('settings.feesHint', 'What the bank / wallet / platform keeps. Empty = 0. Used for what is left per sale.')}</Muted>
        <FieldGrid>
          {s.fee_keys.map(k => (
            <Field key={k}>{feeLabel(k)}
              <input type="number" inputMode="decimal" min={0} max={100} step={0.1} value={fees[k] ?? ''} placeholder="0" onChange={e => setFees(f => ({ ...f, [k]: e.target.value }))} />
            </Field>
          ))}
        </FieldGrid>
        <CardTitle>{t('settings.channelTitle', 'Extra fee by order type (%)')}</CardTitle>
        <Muted>{t('settings.channelHint', 'For example a delivery partner’s commission on delivery orders taken in PurpleHere.')}</Muted>
        <FieldGrid>
          {s.channel_fee_keys.map(k => (
            <Field key={k}>{chLabel(k)}
              <input type="number" inputMode="decimal" min={0} max={100} step={0.1} value={chFees[k] ?? ''} placeholder="0" onChange={e => setChFees(f => ({ ...f, [k]: e.target.value }))} />
            </Field>
          ))}
        </FieldGrid>
        <CardTitle>{t('settings.targetsTitle', 'Targets')}</CardTitle>
        <FieldGrid>
          <Field>{t('settings.targetFood', 'Food cost target (%)')}
            <input type="number" min={1} max={100} step={0.5} value={targets.food_cost_pct || ''} onChange={e => setTargets(x => ({ ...x, food_cost_pct: e.target.value }))} />
          </Field>
          <Field>{t('settings.targetPrime', 'Prime cost target (%)')}
            <input type="number" min={1} max={100} step={0.5} value={targets.prime_cost_pct || ''} onChange={e => setTargets(x => ({ ...x, prime_cost_pct: e.target.value }))} />
          </Field>
          <Field>{t('settings.quadrant', 'Menu matrix lines')}
            <StandardSelect value={s.quadrant_baseline} onChange={e => save({ quadrant_baseline: e.target.value as Settings['quadrant_baseline'] })}>
              <option value="median">{t('settings.median', 'Median of menus')}</option>
              <option value="avg70">{t('settings.avg70', '70% of average')}</option>
            </StandardSelect>
          </Field>
        </FieldGrid>
        <Row>
          <Button variant="primary" onClick={() => save()} disabled={saving}>{t('settings.save', 'Save')}</Button>
          {saved && <Saved>✓ {saved}</Saved>}
        </Row>
      </Card>

      <Card>
        <CardTitle>{t('settings.shareTitle', 'Share with brand')}</CardTitle>
        <Muted style={{ marginBottom: 10 }}>{t('settings.shareHint', 'The brand always sees sales, food cost and menu results. Staff cost, rent and profit are shown to the brand only if you share them (from the next step, when those numbers arrive).')}</Muted>
        <FieldGrid style={{ gridTemplateColumns: 'minmax(220px, 360px)' }}>
          <Field>{t('settings.shareLabel', 'Brand can see')}
            <StandardSelect value={s.share_with_brand} onChange={e => save({ share_with_brand: e.target.value as Settings['share_with_brand'] })}>
              <option value="operations">{t('settings.shareOps', 'Operations only (default)')}</option>
              <option value="full">{t('settings.shareFull', 'Everything, incl. staff cost, rent and profit')}</option>
            </StandardSelect>
          </Field>
        </FieldGrid>
      </Card>

      <Card>
        <Row style={{ justifyContent: 'space-between', marginBottom: 6 }}>
          <CardTitle style={{ margin: 0 }}>{t('settings.rulesTitle', 'Rent & operating costs')}</CardTitle>
          <Button variant="primary" size="small" onClick={() => openDraft()}>+ {t('settings.addRule', 'Add cost')}</Button>
        </Row>
        <Muted style={{ marginBottom: 10 }}>{t('settings.rulesHint', 'Enter once — e.g. «RM6,000 or 13% of sales, whichever is higher». Brand purchases are already in stock costs, do not add them here.')}</Muted>
        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('settings.colName', 'Cost')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('settings.colRule', 'Rule')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('settings.colFrom', 'From')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('settings.colActions', 'Actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {active.map(e => (
                <DataTableRow key={e.id}>
                  <DataTableCell data-label={t('settings.colName', 'Cost')} mobileFullWidth>
                    <strong>{e.label || t(`cost.category.${e.category}`, e.category)}</strong><Muted>{t(`cost.category.${e.category}`, e.category)}</Muted>
                  </DataTableCell>
                  <DataTableCell data-label={t('settings.colRule', 'Rule')}>{ruleText(e)}</DataTableCell>
                  <DataTableCell data-label={t('settings.colFrom', 'From')}>{e.effective_from || '—'}</DataTableCell>
                  <DataTableCell data-label={t('settings.colActions', 'Actions')} align="right">
                    <Row gap={6} style={{ justifyContent: 'flex-end' }}>
                      <Button variant="secondary" size="small" onClick={() => openDraft(e)}>{t('settings.edit', 'Edit')}</Button>
                      <Button variant="danger-outline" size="small" onClick={() => setClosing(e)}>{t('settings.end', 'End')}</Button>
                    </Row>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
          {active.length === 0 && <DataTableEmpty>{t('settings.noRules', 'No costs yet. Add rent first — it is usually the biggest.')}</DataTableEmpty>}
        </DataTableContainer>
        {ended.length > 0 && <Muted style={{ marginTop: 8 }}>{t('settings.ended', 'Ended')}: {ended.map(e => `${e.label || e.category} (${e.effective_to})`).join(' · ')}</Muted>}
      </Card>

      <Modal isOpen={!!draft} onClose={() => setDraft(null)} title={draft?.id ? t('settings.editRule', 'Edit cost') : t('settings.addRule', 'Add cost')}
        footer={<>
          <Button variant="cancel" onClick={() => setDraft(null)}>{t('settings.cancel', 'Cancel')}</Button>
          <Button variant="primary" onClick={saveDraft} disabled={saving}>{t('settings.save', 'Save')}</Button>
        </>}>
        {draft && (
          <>
            {draftError && <ErrorBox>{draftError}</ErrorBox>}
            <FormGroup>
              <FormLabel>{t('settings.colCategory', 'Type')}</FormLabel>
              <FormSelect value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value as Draft['category'] })}>
                {CATEGORIES.map(c => <option key={c} value={c}>{t(`cost.category.${c}`, c)}</option>)}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>{t('settings.colLabel', 'Name (optional)')}</FormLabel>
              <FormInput value={draft.label} maxLength={60} placeholder={t('settings.labelPh', 'e.g. Mall rent')} onChange={e => setDraft({ ...draft, label: e.target.value })} />
            </FormGroup>
            <FormGroup>
              <FormLabel>{t('settings.colRule', 'Rule')}</FormLabel>
              <FormSelect value={draft.rule} onChange={e => setDraft({ ...draft, rule: e.target.value as Draft['rule'] })}>
                {RULES.map(r => <option key={r} value={r}>{t(`cost.rule.${r}`, { fixed: 'Fixed amount per month', pct: '% of net sales', max: 'Higher of fixed amount or %' }[r])}</option>)}
              </FormSelect>
            </FormGroup>
            {draft.rule !== 'pct' && (
              <FormGroup>
                <FormLabel>{t('settings.amount', 'Amount per month')} ({getCurrencySymbol(currency)})</FormLabel>
                <FormInput type="number" inputMode="decimal" min={0} step={1} value={draft.fixed_amount} onChange={e => setDraft({ ...draft, fixed_amount: e.target.value })} />
              </FormGroup>
            )}
            {draft.rule !== 'fixed' && (
              <FormGroup>
                <FormLabel>{t('settings.pct', '% of net sales')}</FormLabel>
                <FormInput type="number" inputMode="decimal" min={0} max={100} step={0.1} value={draft.pct} onChange={e => setDraft({ ...draft, pct: e.target.value })} />
              </FormGroup>
            )}
            <FormGroup>
              <FormLabel>{t('settings.colFrom', 'From')}</FormLabel>
              <FormInput type="date" value={draft.effective_from} onChange={e => setDraft({ ...draft, effective_from: e.target.value })} />
            </FormGroup>
            <Muted style={{ color: COLORS.muted }}>{t('settings.gtoNote', 'For mall GTO, check whether the contract counts sales before or after tax — this page uses net sales.')}</Muted>
          </>
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!closing}
        title={t('settings.endTitle', 'End this cost?')}
        message={t('settings.endMsg', '«{{name}}» stops from today. Past months keep it.', { name: closing?.label || closing?.category || '' })}
        onConfirm={closeEntry}
        onCancel={() => setClosing(null)}
        confirmText={t('settings.end', 'End')}
        cancelText={t('settings.cancel', 'Cancel')}
        type="warning"
      />
    </>
  );
};

export default SettingsTab;
