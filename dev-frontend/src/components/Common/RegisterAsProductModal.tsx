/**
 * RegisterAsProductModal — "이 재고아이템을 그대로 파는 프로덕트로도 등록" (P3-③).
 *
 * 왜 필요한가: 한 물건이 재료이면서 그대로도 팔리는 경우(병음료를 칵테일 재료로도, 낱개로도)
 * **수량은 재고아이템 한 곳에만 살아야 한다.** 서버가 프로덕트에 **재료 ×1 레시피**를 걸어 주므로
 * 팔릴 때 이 재고에서 빠진다 — 프로덕트에 따로 수량을 두면 같은 물건이 둘로 갈라진다.
 *
 * ⛔ 판매가는 사람이 넣는다. 원가(공급가)를 미리 채워 두지 않는다 —
 *    예전에 원가를 판매가로 복사해 마진 0 을 운영에 박은 사고가 있었다.
 *
 * 서버: RA `POST /api/restaurants/:rid/ingredients/:id/register-as-product`
 *       BG `POST /api/product-ingredients/:id/register-as-product` (brand_id 필요)
 * 이미 그렇게 파는 프로덕트가 있으면 409 — 그 이름을 그대로 보여준다.
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormGroup, FormLabel, FormInput } from '../UI/Modal';
import { getAuthToken } from '../../utils/auth';

interface Props {
  /** 대상 재고아이템 — id 는 endpoint 가 가리키는 테이블의 id. */
  target: { id: number; name: string; unit?: string | null } | null;
  /** 전체 경로. 예: `/api/restaurants/5/ingredients/12/register-as-product` */
  endpoint: string;
  /** BG 전용 — 어느 브랜드의 프로덕트로 만들지(브랜드를 여러 개 소유할 수 있다). */
  brandId?: number | null;
  onClose: () => void;
  onRegistered: () => void;
}

export default function RegisterAsProductModal({ target, endpoint, brandId = null, onClose, onRegistered }: Props) {
  // 판매가·프로덕트명 라벨은 카탈로그 쪽 모달과 같은 말이라 `newPo.newProduct.*` 를 재사용한다
  // (같은 말에 키를 두 벌 두면 번역이 갈린다).
  const { t } = useTranslation('purchaseOrders');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!target) return;
    setName(target.name || '');
    setPrice('');            // 판매가는 **비워 둔 채** 시작한다(원가 프리필 금지)
    setError(null);
  }, [target?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!target) return null;

  const save = async () => {
    const p = parseFloat(price);
    if (!Number.isFinite(p) || p <= 0) { setError(t('newPo.newProduct.priceRequired', 'Enter a selling price greater than 0.') as string); return; }
    setSaving(true); setError(null);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify({ price: p, name: name.trim() || target.name, ...(brandId ? { brand_id: brandId } : {}) }),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) { setError(j?.message || (t('newPo.sellAsProduct.failed', 'Failed to register as a product.') as string)); setSaving(false); return; }
      onRegistered();
      onClose();
    } catch {
      setError(t('newPo.sellAsProduct.error', 'An error occurred. Please try again.') as string);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen
      onClose={onClose}
      title={t('newPo.sellAsProduct.title', 'Also sell this as a product') as string}
      size="small"
      footer={<>
        <ModalButton variant="secondary" onClick={onClose}>{t('common.cancel', 'Cancel')}</ModalButton>
        <ModalButton variant="primary" disabled={saving} onClick={save}>{saving ? '…' : t('newPo.newProduct.save', 'Register')}</ModalButton>
      </>}
    >
      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13 }}>
          {error}
        </div>
      )}
      <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 12 }}>
        {t('newPo.sellAsProduct.desc', {
          name: target.name,
          unit: target.unit || 'unit',
          defaultValue: 'Sell {{name}} as-is. Stock stays on this item — one sale takes 1 {{unit}} from it, so the quantity never lives in two places.',
        })}
      </div>
      <FormGroup>
        <FormLabel>{t('newPo.newProduct.name', 'Product name')}</FormLabel>
        <FormInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={target.name} />
      </FormGroup>
      <FormGroup>
        <FormLabel>{t('newPo.newProduct.price', 'Selling price')} *</FormLabel>
        <FormInput type="number" step="0.01" min="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
          {t('newPo.sellAsProduct.priceHelp', 'What you sell it for — it is never filled in from your cost.')}
        </div>
      </FormGroup>
    </Modal>
  );
}
