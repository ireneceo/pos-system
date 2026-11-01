import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableEmpty, DataTableActions
} from '../UI/DataTable';
import { IconButton } from '../UI/TableComponents';
import { Button } from '../UI/Button';
import { Modal, FormGroup, FormLabel, FormInput } from '../UI/Modal';
import StandardSelect from '../UI/SelectComponents';
import ConfirmDialog from '../Common/ConfirmDialog';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/dateFormat';

/**
 * 오너 발주 승인 예외 규칙 (2026-11-01 Fable 설계 docs/PURCHASE_ORDER_SYSTEM.md §G-7-6 ①②).
 * 오너가 «이건 묻지 말고 바로 보내» 라고 지정한 공급업체·재료 카테고리·품목.
 *   - 오너 화면(PO Approvals ▸ Approval rules): 매장 고르기 + 규칙 표 + 추가·삭제
 *   - 매장 설정(readOnly): 그 매장 규칙 읽기 전용 목록
 * 판정은 서버 utils/poOwnerApproval.evaluateApproval 하나 — 화면은 규칙만 다룬다.
 */

type Scope = 'seller' | 'ingredient_category' | 'ingredient' | 'product';
interface Rule {
  id: number; restaurant_id: number; scope: Scope; seller_type: string; target_id: number;
  note: string | null; created_at: string; display_name: string | null; deleted: boolean; created_by_name: string | null;
}
interface Candidate { scope: Scope; seller_type: string; target_id: number; name: string; sub?: string }
interface StoreOption { id: number; name: string }

interface Props {
  /** 매장 설정 화면: 그 매장 하나, 읽기 전용 */
  restaurantId?: number;
  readOnly?: boolean;
  timeZone?: string;
}

const auth = () => ({ Authorization: `Bearer ${getAuthToken()}` });

const OwnerApprovalRulesPanel: React.FC<Props> = ({ restaurantId, readOnly = false, timeZone }) => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const [stores, setStores] = useState<StoreOption[]>([]);
  const [rid, setRid] = useState<number | null>(restaurantId || null);
  const [rules, setRules] = useState<Rule[]>([]);
  const [masterOn, setMasterOn] = useState<boolean | null>(null);
  const [canEdit, setCanEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Rule | null>(null);
  // 마스터 스위치 — 오너 연결 매장은 오너·SA 만 바꾼다(2026-11-01 §G-7-8 A안 · PUT /purchase-orders/approval-master)
  const [masterConfirm, setMasterConfirm] = useState<boolean | null>(null);
  const [masterSaving, setMasterSaving] = useState(false);

  // 추가 창
  const [addOpen, setAddOpen] = useState(false);
  const [addKind, setAddKind] = useState<'seller' | 'ingredient_category' | 'item'>('seller');
  const [cands, setCands] = useState<Candidate[]>([]);
  const [query, setQuery] = useState('');
  const [picked, setPicked] = useState<Candidate | null>(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // 오너 화면: 소유 매장 목록
  useEffect(() => {
    if (restaurantId) return;
    let alive = true;
    fetch('/api/owner/restaurants', { headers: auth() })
      .then(r => (r.ok ? r.json() : null))
      .then(j => {
        if (!alive || !j?.success || !Array.isArray(j.data)) return;
        const list: StoreOption[] = j.data.map((r: any) => ({ id: Number(r.id), name: r.branch_name ? `${r.name} · ${r.branch_name}` : r.name }));
        setStores(list);
        setRid(prev => prev || (list[0]?.id ?? null));
      })
      .catch(() => { /* 매장 목록 없이 빈 상태 */ });
    return () => { alive = false; };
  }, [restaurantId]);

  const load = useCallback(async () => {
    if (!rid) return;
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/purchase-orders/approval-exemptions?restaurant_id=${rid}`, { headers: auth() });
      const j = await res.json();
      if (!res.ok || !j.success) throw new Error(j?.message || 'load failed');
      setRules(Array.isArray(j.data) ? j.data : []);
      setCanEdit(!readOnly && !!j.can_edit);
      setMasterOn(j.master_on !== false);
    } catch {
      setError(t('approvalRules.loadFailed', 'Could not load approval rules.') as string);
      setRules([]);
    } finally {
      setLoading(false);
    }
  }, [rid, readOnly, t]);

  useEffect(() => { load(); }, [load]);

  // 후보 — 공급업체·카테고리는 전체, 품목은 검색(재료 + 재고 프로덕트)
  useEffect(() => {
    if (!addOpen || !rid) return;
    let alive = true;
    const get = (scope: Scope, q = '') =>
      fetch(`/api/purchase-orders/approval-exemptions/candidates?restaurant_id=${rid}&scope=${scope}&q=${encodeURIComponent(q)}`, { headers: auth() })
        .then(r => (r.ok ? r.json() : null)).then(j => (j?.success && Array.isArray(j.data) ? j.data as Candidate[] : []))
        .catch(() => [] as Candidate[]);
    const timer = setTimeout(async () => {
      let list: Candidate[] = [];
      if (addKind === 'item') {
        if (query.trim().length >= 2) {
          const [a, b] = await Promise.all([get('ingredient', query.trim()), get('product', query.trim())]);
          list = [...a, ...b];
        }
      } else {
        list = await get(addKind);
      }
      if (alive) setCands(list);
    }, addKind === 'item' ? 250 : 0);
    return () => { alive = false; clearTimeout(timer); };
  }, [addOpen, addKind, query, rid]);

  const existingKeys = useMemo(() => new Set(rules.map(r => `${r.scope}:${r.seller_type}:${r.target_id}`)), [rules]);
  const candKey = (c: Candidate) => `${c.scope}:${c.seller_type}:${c.target_id}`;

  const scopeLabel = (s: Scope) => ({
    seller: t('approvalRules.typeSupplier', 'Supplier'),
    ingredient_category: t('approvalRules.typeCategory', 'Category'),
    ingredient: t('approvalRules.typeItem', 'Item'),
    product: t('approvalRules.typeItem', 'Item')
  }[s]);
  const subLabel = (c: Candidate) => {
    if (c.sub === 'brand') return ` (${t('approvalRules.subBrand', 'brand')})`;
    if (c.sub === 'external') return ` (${t('approvalRules.subExternal', 'external')})`;
    if (c.sub === 'product') return ` (${t('approvalRules.subProduct', 'product')})`;
    return '';
  };

  const openAdd = () => {
    setAddKind('seller'); setQuery(''); setPicked(null); setNote(''); setCands([]); setAddError(null); setAddOpen(true);
  };

  const saveRule = async () => {
    if (!rid || !picked) return;
    setSaving(true); setAddError(null);
    try {
      const res = await fetch('/api/purchase-orders/approval-exemptions', {
        method: 'POST', headers: { ...auth(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurant_id: rid, scope: picked.scope, seller_type: picked.seller_type, target_id: picked.target_id, note: note.trim() || null })
      });
      const j = await res.json();
      if (!res.ok || !j.success) throw new Error(j?.message || 'save failed');
      setAddOpen(false);
      await load();
    } catch (e: any) {
      setAddError(e?.message || (t('approvalRules.saveFailed', 'Could not save the rule.') as string));
    } finally {
      setSaving(false);
    }
  };

  const saveMaster = async (on: boolean) => {
    setMasterConfirm(null);
    if (!rid) return;
    setMasterSaving(true); setError(null);
    try {
      const res = await fetch('/api/purchase-orders/approval-master', {
        method: 'PUT', headers: { ...auth(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurant_id: rid, on })
      });
      if (!res.ok) throw new Error('save failed');
    } catch {
      setError(t('approvalRules.masterSaveFailed', 'Could not change the Owner approval setting.') as string);
    } finally {
      setMasterSaving(false);
    }
    await load();
  };

  const doDelete = async () => {
    const target = deleteTarget;
    setDeleteTarget(null);
    if (!target) return;
    try {
      const res = await fetch(`/api/purchase-orders/approval-exemptions/${target.id}`, { method: 'DELETE', headers: auth() });
      if (!res.ok) throw new Error('delete failed');
    } catch {
      setError(t('approvalRules.deleteFailed', 'Could not remove the rule.') as string);
    }
    await load();
  };

  // ── 매장 설정: 읽기 전용 한 줄 목록
  if (readOnly) {
    if (masterOn !== true) return null;   // 읽기 전 · 오너 미연결 · 승인 꺼짐 — 규칙이 뜻이 없다
    return (
      <ReadOnlyBox>
        <ReadOnlyTitle>{t('approvalRules.readOnlyTitle', 'Exempt from Owner approval (set by the Owner)')}</ReadOnlyTitle>
        {loading ? null : rules.length === 0 ? (
          <ReadOnlyText>{t('approvalRules.readOnlyEmpty', 'No exemptions')}</ReadOnlyText>
        ) : (
          <ReadOnlyText>
            {rules.map(r => `${scopeLabel(r.scope)}: ${r.display_name || t('approvalRules.deleted', '(deleted)')}`).join(' · ')}
          </ReadOnlyText>
        )}
        <ReadOnlyHint>{t('approvalRules.readOnlyHint', 'Managed by the Owner in PO Approvals → Approval rules.')}</ReadOnlyHint>
      </ReadOnlyBox>
    );
  }

  return (
    <div>
      <Intro>
        {t('approvalRules.intro', 'Purchase orders that match a rule go straight to the supplier without waiting for your approval. An order skips approval when its supplier is exempt, or when every item in it is exempt (by item or by category).')}
      </Intro>

      <Toolbar>
        {stores.length > 1 && (
          <StandardSelect value={rid ?? ''} onChange={(e) => setRid(Number(e.target.value))} style={{ maxWidth: 320 }}>
            {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </StandardSelect>
        )}
        {stores.length === 1 && <StoreName>{stores[0].name}</StoreName>}
        <MasterState $on={masterOn !== false}>
          {masterOn === false
            ? t('approvalRules.masterOff', 'Owner approval is off for this restaurant — every order is sent without approval.')
            : t('approvalRules.masterOn', 'Owner approval is on for this restaurant.')}
        </MasterState>
        {canEdit && masterOn !== null && (
          <Button variant="outline" size="small" disabled={masterSaving} onClick={() => setMasterConfirm(!masterOn)}>
            {masterOn ? t('approvalRules.masterTurnOff', 'Turn off approval') : t('approvalRules.masterTurnOn', 'Turn on approval')}
          </Button>
        )}
        <div style={{ flex: 1 }} />
        {canEdit && (
          <Button variant="primary" size="small" onClick={openAdd} disabled={!rid}>
            {t('approvalRules.add', 'Add rule')}
          </Button>
        )}
      </Toolbar>

      {error && <ErrorText>{error}</ErrorText>}

      <DataTableContainer>
        <DataTable>
          <DataTableHead>
            <tr>
              <DataTableHeaderCell>{t('approvalRules.colType', 'Type')}</DataTableHeaderCell>
              <DataTableHeaderCell>{t('approvalRules.colName', 'Name')}</DataTableHeaderCell>
              <DataTableHeaderCell>{t('approvalRules.colNote', 'Note')}</DataTableHeaderCell>
              <DataTableHeaderCell>{t('approvalRules.colAdded', 'Added')}</DataTableHeaderCell>
              {canEdit && <DataTableHeaderCell align="right">{t('approvalRules.colActions', 'Actions')}</DataTableHeaderCell>}
            </tr>
          </DataTableHead>
          <tbody>
            {!loading && rules.length === 0 ? (
              <tr>
                <td colSpan={canEdit ? 5 : 4}>
                  <DataTableEmpty>{t('approvalRules.empty', 'No exemptions — every purchase order of this restaurant needs your approval.')}</DataTableEmpty>
                </td>
              </tr>
            ) : rules.map(r => (
              <DataTableRow key={r.id}>
                <DataTableCell>{scopeLabel(r.scope)}</DataTableCell>
                <DataTableCell>
                  {r.deleted
                    ? <span style={{ color: '#9CA3AF' }}>{t('approvalRules.deleted', '(deleted)')}</span>
                    : r.display_name}
                </DataTableCell>
                <DataTableCell>{r.note || '—'}</DataTableCell>
                <DataTableCell>
                  {formatDate(r.created_at, timeZone)}{r.created_by_name ? ` · ${r.created_by_name}` : ''}
                </DataTableCell>
                {canEdit && (
                  <DataTableCell align="right">
                    <DataTableActions>
                      <IconButton type="button" onClick={() => setDeleteTarget(r)} title={t('approvalRules.remove', 'Remove') as string} aria-label={t('approvalRules.remove', 'Remove') as string}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </IconButton>
                    </DataTableActions>
                  </DataTableCell>
                )}
              </DataTableRow>
            ))}
          </tbody>
        </DataTable>
      </DataTableContainer>

      <Modal
        isOpen={addOpen}
        onClose={() => { if (!saving) setAddOpen(false); }}
        title={t('approvalRules.addTitle', 'Skip my approval for…') as string}
        maxWidth="520px"
        footer={
          <>
            <Button variant="secondary" onClick={() => setAddOpen(false)} disabled={saving}>{t('common.cancel')}</Button>
            <Button variant="primary" onClick={saveRule} disabled={!picked || saving}>
              {saving ? t('approvalRules.saving', 'Saving…') : t('approvalRules.save', 'Save rule')}
            </Button>
          </>
        }
      >
        <KindRow>
          {(['seller', 'ingredient_category', 'item'] as const).map(k => (
            <Button key={k} type="button" size="small" variant={addKind === k ? 'primary' : 'outline'}
              onClick={() => { setAddKind(k); setPicked(null); setQuery(''); setCands([]); }}>
              {k === 'seller' ? t('approvalRules.typeSupplier', 'Supplier') : k === 'ingredient_category' ? t('approvalRules.typeCategory', 'Category') : t('approvalRules.typeItem', 'Item')}
            </Button>
          ))}
        </KindRow>
        <KindHint>
          {addKind === 'seller' && t('approvalRules.hintSupplier', 'Every purchase order to this supplier is sent without your approval.')}
          {addKind === 'ingredient_category' && t('approvalRules.hintCategory', 'Stock items in this category don\'t need your approval. An order skips approval only if every item in it is exempt.')}
          {addKind === 'item' && t('approvalRules.hintItem', 'This item doesn\'t need your approval. An order skips approval only if every item in it is exempt.')}
        </KindHint>

        {addKind === 'item' ? (
          <FormGroup>
            <FormLabel>{t('approvalRules.searchItem', 'Search stock items')}</FormLabel>
            <FormInput value={query} onChange={(e) => { setQuery(e.target.value); setPicked(null); }}
              placeholder={t('approvalRules.searchPlaceholder', 'Type at least 2 letters') as string} autoFocus />
            <PickList>
              {cands.map(c => {
                const exists = existingKeys.has(candKey(c));
                const active = picked && candKey(picked) === candKey(c);
                return (
                  <PickRow key={candKey(c)} role="button" tabIndex={exists ? -1 : 0} aria-disabled={exists} $active={!!active} $disabled={exists}
                    onClick={() => { if (!exists) setPicked(c); }}
                    onKeyDown={(e) => { if (!exists && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setPicked(c); } }}>
                    {c.name}{subLabel(c)}{exists ? ` — ${t('approvalRules.already', 'already exempt')}` : ''}
                  </PickRow>
                );
              })}
              {query.trim().length >= 2 && cands.length === 0 && <PickEmpty>{t('approvalRules.noMatch', 'No matching items')}</PickEmpty>}
            </PickList>
          </FormGroup>
        ) : (
          <FormGroup>
            <FormLabel>{addKind === 'seller' ? t('approvalRules.pickSupplier', 'Supplier') : t('approvalRules.pickCategory', 'Category')}</FormLabel>
            <StandardSelect
              value={picked ? candKey(picked) : ''}
              onChange={(e) => setPicked(cands.find(c => candKey(c) === e.target.value) || null)}
            >
              <option value="">{t('approvalRules.choose', 'Choose…')}</option>
              {cands.map(c => (
                <option key={candKey(c)} value={candKey(c)} disabled={existingKeys.has(candKey(c))}>
                  {c.name}{subLabel(c)}{existingKeys.has(candKey(c)) ? ` — ${t('approvalRules.already', 'already exempt')}` : ''}
                </option>
              ))}
            </StandardSelect>
          </FormGroup>
        )}

        <FormGroup>
          <FormLabel>{t('approvalRules.note', 'Note (optional)')}</FormLabel>
          <FormInput value={note} maxLength={255} onChange={(e) => setNote(e.target.value)}
            placeholder={t('approvalRules.notePlaceholder', 'e.g. Packaging — ordered by Ali') as string} />
        </FormGroup>
        {addError && <ErrorText>{addError}</ErrorText>}
      </Modal>

      <ConfirmDialog
        isOpen={masterConfirm !== null}
        onClose={() => setMasterConfirm(null)}
        onConfirm={() => saveMaster(!!masterConfirm)}
        title={(masterConfirm ? t('approvalRules.masterTurnOn', 'Turn on approval') : t('approvalRules.masterTurnOff', 'Turn off approval')) as string}
        message={(masterConfirm
          ? t('approvalRules.masterOnConfirm', 'Purchase orders of this restaurant will need your approval again (except the rules below).')
          : t('approvalRules.masterOffConfirm', 'Every purchase order of this restaurant will be sent to the supplier without your approval. Your rules are kept.')) as string}
        confirmText={(masterConfirm ? t('approvalRules.masterTurnOn', 'Turn on approval') : t('approvalRules.masterTurnOff', 'Turn off approval')) as string}
        variant={masterConfirm ? 'info' : 'warning'}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={doDelete}
        title={t('approvalRules.removeTitle', 'Remove rule') as string}
        message={t('approvalRules.removeConfirm', { name: deleteTarget?.display_name || '', defaultValue: 'Orders for «{{name}}» will need your approval again from the next order.' }) as string}
        confirmText={t('approvalRules.remove', 'Remove') as string}
        variant="danger"
      />
    </div>
  );
};

const Intro = styled.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 16px;
  line-height: 1.5;
`;
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;
const StoreName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #111827;
`;
const MasterState = styled.div<{ $on: boolean }>`
  font-size: 12px;
  color: ${p => (p.$on ? '#065F46' : '#92400E')};
  background: ${p => (p.$on ? '#ECFDF5' : '#FFFBEB')};
  padding: 6px 10px;
  border-radius: 6px;
`;
const ErrorText = styled.div`
  color: #B91C1C;
  font-size: 13px;
  margin: 8px 0;
`;
const KindRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;
const KindHint = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 12px;
`;
const PickList = styled.div`
  margin-top: 8px;
  max-height: 220px;
  overflow-y: auto;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  &:empty { display: none; }
`;
const PickRow = styled.div<{ $active: boolean; $disabled: boolean }>`
  padding: 8px 12px;
  border-bottom: 1px solid #F3F4F6;
  background: ${p => (p.$active ? '#EEF2FF' : 'white')};
  color: ${p => (p.$disabled ? '#9CA3AF' : p.$active ? '#635BFF' : '#111827')};
  font-size: 13px;
  cursor: ${p => (p.$disabled ? 'default' : 'pointer')};
`;
const PickEmpty = styled.div`
  padding: 8px 12px;
  font-size: 13px;
  color: #9CA3AF;
`;
const ReadOnlyBox = styled.div`
  margin-top: 12px;
  padding: 10px 12px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
`;
const ReadOnlyTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
`;
const ReadOnlyText = styled.div`
  font-size: 13px;
  color: #4B5563;
`;
const ReadOnlyHint = styled.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`;

export default OwnerApprovalRulesPanel;
