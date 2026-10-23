/**
 * DeleteSupplierProductFlow — 외부 공급업체 상품 삭제 흐름 (2026-10-23 Fable 설계 supplier-product-delete D5)
 *   설계: /var/www/.claude/fable-design-20261023-supplier-product-delete.md
 *   Irene: «역할마다 공급업체 상품보는 곳 있으면 삭제도 되게 해. 지울 수가 없잖아. 지울 때 연결된 거 있으면 바꾸게 하고. 스톡아이템 처럼»
 *
 * 흐름 하나, 입구 둘(전체 상품 탭 AllSupplierProductsView · 업체 상세 SupplierProfilePage):
 *   ① 확인 → DELETE /api/external-suppliers/:id/products/:pid
 *   ② 409 IN_USE 면 바로 교체 창 — 쓰는 곳 목록 + 같은 업체 다른 상품 고르기 → Preview(dry_run) → «Switch & delete»
 *      대체할 상품이 없으면 «Unlink & delete»(이력 없는 연결은 지우고 발주가 쓰는 연결은 꺼서 남김).
 * 실패 본문(error.code·uses)을 읽어야 해서 raw fetch 를 쓴다(공용 fetchAPI 는 실패 본문을 버린다).
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton } from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';
import SearchableSelect from '../../components/Common/SearchableSelect';
import { getAuthToken } from '../../utils/auth';
import { formatQuantity } from '../../utils/unitConversion';
import { formatCurrency } from '../../utils/currency';

interface Use {
  link_id: number;
  target: { kind: string; id: number; name: string | null; owner_name: string | null };
  is_active: boolean;
  open_po_count: number;
  schedule_count: number;
  has_history?: boolean;
  reason?: string;
}
interface Moved {
  link_id: number;
  target: Use['target'];
  price: { from: number; to: number };
  conversion: { from: number; to: number; needs_confirm: boolean };
  cost: { from: number; to: number } | { skip: string };
  open_po_count: number;
  schedule_count: number;
}
interface Props {
  supplierId: number;
  product: { id: number; name: string };
  /** 오너 매장 범위 등 주소 꼬리를 붙이는 함수(withOwnerSupplierScope) */
  scopeUrl: (url: string) => string;
  onClose: () => void;
  /** 실제로 지워졌을 때 */
  onDeleted: () => void;
}

const BOX: React.CSSProperties = { fontSize: 12, color: '#4B5563', border: '1px solid #C7CED6', borderRadius: 6, padding: '8px 10px', lineHeight: 1.6 };
const HEAD: React.CSSProperties = { fontSize: 12, color: '#0A2540', fontWeight: 600 };
const ERR: React.CSSProperties = { fontSize: 12, color: '#B91C1C', fontWeight: 600 };

export default function DeleteSupplierProductFlow({ supplierId, product, scopeUrl, onClose, onDeleted }: Props) {
  const { t } = useTranslation(['supplierDirectory', 'common']);
  const [step, setStep] = useState<'confirm' | 'replace'>('confirm');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uses, setUses] = useState<Use[]>([]);
  const [others, setOthers] = useState<Array<{ id: number; name: string; sub: string }>>([]);
  const [target, setTarget] = useState<number | null>(null);
  const [mode, setMode] = useState<'switch' | 'unlink'>('switch');
  const [preview, setPreview] = useState<any>(null);
  const [blocked, setBlocked] = useState<Use[]>([]);
  const [done, setDone] = useState(false);

  const base = `/api/external-suppliers/${supplierId}/products/${product.id}`;
  const call = async (method: string, url: string, body?: any) => {
    const res = await fetch(scopeUrl(url), {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
      body: body ? JSON.stringify(body) : undefined,
    });
    const j = await res.json().catch(() => null);
    return { ok: res.ok && j?.success !== false, status: res.status, j };
  };
  const failText = (j: any) => j?.error?.message || j?.message || (t('extProduct.del.failed', { defaultValue: 'Could not delete the product.' }) as string);

  // 같은 업체의 다른 상품(켜진 것) — 교체 후보
  useEffect(() => {
    if (step !== 'replace') return;
    let alive = true;
    fetch(scopeUrl(`/api/external-suppliers/${supplierId}/products`), { headers: { Authorization: `Bearer ${getAuthToken()}` } })
      .then(r => r.json()).then(j => {
        if (!alive) return;
        const list = (Array.isArray(j?.data) ? j.data : [])
          .filter((p: any) => Number(p.id) !== Number(product.id) && p.is_active !== false)
          .map((p: any) => ({ id: Number(p.id), name: String(p.name), sub: [p.sku, p.unit && `${formatQuantity(Number(p.base_quantity) || 1)} ${p.unit}${p.package_unit ? '/' + p.package_unit : ''}`].filter(Boolean).join(' · ') }));
        setOthers(list);
        if (!list.length) setMode('unlink');
      }).catch(() => { if (alive) setOthers([]); });
    return () => { alive = false; };
  }, [step, supplierId, product.id, scopeUrl]);

  const tryDelete = async () => {
    setBusy(true); setError(null);
    try {
      const r = await call('DELETE', base);
      if (r.ok) { onDeleted(); onClose(); return; }
      if (r.status === 409 && r.j?.error?.code === 'IN_USE') { setUses(r.j.error.uses || []); setStep('replace'); return; }
      setError(failText(r.j));
    } catch { setError(t('extProduct.del.failed', { defaultValue: 'Could not delete the product.' }) as string); }
    finally { setBusy(false); }
  };

  const run = async (dryRun: boolean) => {
    setBusy(true); setError(null); setBlocked([]);
    try {
      const r = mode === 'switch'
        ? await call('POST', `${base}/replace`, { target_product_id: target, dry_run: dryRun })
        : await call('POST', `${base}/unlink`, { dry_run: dryRun });
      if (!r.ok) {
        setPreview(null);
        if (Array.isArray(r.j?.error?.uses) && r.j.error.uses.length) setBlocked(r.j.error.uses);
        setError(failText(r.j));
        return;
      }
      setPreview(r.j.data);
      if (!dryRun) { setDone(true); onDeleted(); }
    } catch { setError(t('extProduct.del.failed', { defaultValue: 'Could not delete the product.' }) as string); }
    finally { setBusy(false); }
  };

  if (step === 'confirm') {
    return (
      <>
        <ConfirmModal
          isOpen
          title={t('extProduct.deleteTitle', { defaultValue: 'Delete product' }) as string}
          message={(error ? `${error}\n\n` : '') + (t('extProduct.deleteConfirm', { defaultValue: 'Delete "{{name}}"? This cannot be undone.', name: product.name }) as string)}
          confirmText={busy ? '…' : t('common:button.delete', { defaultValue: 'Delete' }) as string}
          type="danger"
          onConfirm={() => { if (!busy) tryDelete(); }}
          onCancel={onClose}
        />
      </>
    );
  }

  const whereText = (u: Use) => [u.target.name || `#${u.target.id}`, u.target.owner_name].filter(Boolean).join(' · ');
  const reasonText = (u: Use) => u.reason === 'already_linked'
    ? t('extProduct.del.reasonDup', { defaultValue: 'already has the chosen product as a supplier source — remove one of the two from the stock item first' })
    : u.reason === 'unit_incompatible'
      ? t('extProduct.del.reasonUnit', { defaultValue: 'units cannot be converted ({{from}} → {{to}}) — pick a product in a matching unit', from: (u as any).target_unit, to: (u as any).stock_unit })
      : '';
  const openPo = uses.reduce((n, u) => n + (u.open_po_count || 0), 0);
  const schedules = uses.reduce((n, u) => n + (u.schedule_count || 0), 0);
  const targetName = others.find(o => o.id === target)?.name || '';

  return (
    <Modal isOpen onClose={onClose} size="small"
      title={t('extProduct.del.replaceTitle', { defaultValue: 'Switch stock items to another product, then delete' }) as string}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>
          {t('extProduct.del.intro', { defaultValue: '"{{name}}" is the supplier source of {{count}} stock item(s) below, so it cannot just be deleted. Pick another product from this supplier — they all switch to it, then "{{name}}" is deleted.', name: product.name, count: uses.length })}
        </div>

        {!done && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 180, overflowY: 'auto', border: '1px solid #C7CED6', borderRadius: 6, padding: '8px 10px' }}>
            {uses.map(u => (
              <div key={u.link_id} style={{ display: 'flex', gap: 8, fontSize: 12, lineHeight: 1.5, minWidth: 0 }}>
                <span style={{ color: '#0A2540', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{whereText(u)}</span>
                {!u.is_active && <span style={{ color: '#6B7280', whiteSpace: 'nowrap' }}>{t('extProduct.del.off', { defaultValue: 'off' })}</span>}
              </div>
            ))}
          </div>
        )}

        {!done && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#0A2540' }}>
              <input type="radio" name="spdel-mode" checked={mode === 'switch'} disabled={!others.length}
                onChange={() => { setMode('switch'); setPreview(null); setBlocked([]); setError(null); }} />
              {t('extProduct.del.modeSwitch', { defaultValue: 'Switch to another product from this supplier' })}
            </label>
            {mode === 'switch' && (others.length ? (
              <SearchableSelect
                options={others.map(o => ({ value: o.id, label: o.name, subLabel: o.sub }))}
                value={target}
                onChange={(v) => { setTarget(v == null ? null : Number(v)); setPreview(null); setBlocked([]); setError(null); }}
                placeholder={t('extProduct.del.pick', { defaultValue: 'Search the product to use instead...' }) as string}
              />
            ) : null)}
            {!others.length && (
              <div style={{ fontSize: 12, color: '#6B7280' }}>
                {t('extProduct.del.noOthers', { defaultValue: 'This supplier has no other product. Add one first, or unlink below.' })}
              </div>
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#0A2540' }}>
              <input type="radio" name="spdel-mode" checked={mode === 'unlink'}
                onChange={() => { setMode('unlink'); setPreview(null); setBlocked([]); setError(null); }} />
              {t('extProduct.del.modeUnlink', { defaultValue: 'Remove this supplier source from the stock items' })}
            </label>
          </div>
        )}

        {error && <div style={ERR}>{error}</div>}
        {blocked.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {blocked.map((u, i) => (
              <div key={i} style={BOX}><strong style={{ color: '#0A2540' }}>{whereText(u)}</strong>{reasonText(u) ? ` — ${reasonText(u)}` : ''}</div>
            ))}
          </div>
        )}

        {preview && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={HEAD}>
              {done
                ? t('extProduct.del.done', { defaultValue: 'Done — the product was deleted.' })
                : t('extProduct.del.preview', { defaultValue: 'Preview — nothing is changed until you confirm:' })}
            </div>
            {mode === 'switch' && (preview.moved || []).map((m: Moved) => (
              <div key={m.link_id} style={BOX}>
                <strong style={{ color: '#0A2540' }}>{whereText(m as any)}</strong> → {targetName || preview.target?.name}
                <div>
                  {t('extProduct.del.price', { defaultValue: 'Price {{from}} → {{to}}', from: formatCurrency(m.price.from, 'MYR'), to: formatCurrency(m.price.to, 'MYR') })}
                  {' · '}
                  {t('extProduct.del.conv', { defaultValue: 'Stock conversion {{from}} → {{to}}', from: formatQuantity(m.conversion.from), to: formatQuantity(m.conversion.to) })}
                  {m.conversion.needs_confirm ? ` (${t('extProduct.del.needsConfirm', { defaultValue: 'please check on the stock item' })})` : ''}
                </div>
                {'from' in m.cost && <div style={{ color: '#6B7280' }}>{t('extProduct.del.cost', { defaultValue: 'Unit cost {{from}} → {{to}}', from: formatCurrency(m.cost.from, 'MYR'), to: formatCurrency(m.cost.to, 'MYR') })}</div>}
              </div>
            ))}
            {mode === 'unlink' && (
              <div style={BOX}>
                {t('extProduct.del.unlinkSummary', { defaultValue: '{{removed}} source(s) removed · {{kept}} kept but turned off (used by purchase orders)', removed: (preview.removed || []).length, kept: (preview.deactivated || []).length })}
              </div>
            )}
            {!done && openPo > 0 && (
              <div style={{ fontSize: 12, color: '#4B5563' }}>{t('extProduct.del.openPo', { defaultValue: '{{count}} open purchase order(s) use these sources — sent ones stay as they are; open drafts to check them.', count: openPo })}</div>
            )}
            {!done && schedules > 0 && mode === 'switch' && (
              <div style={{ fontSize: 12, color: '#4B5563' }}>{t('extProduct.del.schedules', { defaultValue: '{{count}} recurring order(s) will order "{{to}}" from the next run.', count: schedules, to: targetName })}</div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <ModalButton type="button" variant="secondary" onClick={onClose}>{t('common:close', { defaultValue: 'Close' })}</ModalButton>
          {!done && (preview ? (
            <ModalButton type="button" variant="danger" disabled={busy} onClick={() => run(false)}>
              {mode === 'switch' ? t('extProduct.del.applySwitch', { defaultValue: 'Switch & delete' }) : t('extProduct.del.applyUnlink', { defaultValue: 'Unlink & delete' })}
            </ModalButton>
          ) : (
            <ModalButton type="button" variant="primary" disabled={busy || (mode === 'switch' && !target)} onClick={() => run(true)}>
              {t('extProduct.del.check', { defaultValue: 'Preview' })}
            </ModalButton>
          ))}
        </div>
      </div>
    </Modal>
  );
}
