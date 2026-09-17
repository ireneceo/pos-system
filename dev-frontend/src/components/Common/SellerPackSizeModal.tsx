/**
 * 「이 업체에서 1 □ 를 받으면 내 재고가 몇 □ 늘어나는가」를 고치는 창
 *   (2026-09-17 Fable 설계 F1 · Irene 「환산값이라는 단어를 쓰는 건 아닐 거 아냐. 단어나 표시 좀 쉽게」)
 *
 * 왜 이름 없는 문장인가
 *   전에는 「단위 변환 / Unit conversion」이라는 항목명이었다. Irene 이 그 말을 모르는 것이 정상이다.
 *   그래서 **칸 이름을 없애고 문장의 빈칸**으로 만들었다 — 읽으면 무엇을 넣어야 하는지 바로 보인다.
 *
 * 저장 = 확인
 *   값이 1 그대로여도 저장하면 「사람이 그렇게 정했다」로 기록된다. 업체의 «개» 와 우리 «팩» 이
 *   같은 물건인 경우(운영 273건 중 125건)가 바로 그 자리다 — 그 1 을 인정할 방법이 없으면
 *   확인 목록에서 영원히 안 빠진다.
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, FormInput, ModalButton } from '../UI/Modal';

export interface SellerPackSizeTarget {
  /** 연결 id — 저장 경로는 화면이 정한다(매장 재료 / BG 재고아이템) */
  id: number;
  sellerName?: string | null;
  sellerProductName?: string | null;
  /** 업체가 파는 단위 (piece · box · kg …) */
  sellerUnit?: string | null;
  /** 내가 재고를 세는 단위 */
  stockUnit?: string | null;
  /** 현재 값 */
  value: number;
  /** 데이터로 계산되는 값이 있으면 제안한다(서버 판정 conversion_suggested) */
  suggested?: number | null;
}

interface Props {
  target: SellerPackSizeTarget | null;
  onClose: () => void;
  /** 저장 실행 — 성공하면 {po_lines_updated} 를 돌려준다. 실패는 문자열 사유를 throw. */
  onSave: (target: SellerPackSizeTarget, value: number) => Promise<{ po_lines_updated?: number } | void>;
}

const SellerPackSizeModal: React.FC<Props> = ({ target, onClose, onSave }) => {
  const { t } = useTranslation(['inventory', 'common']);
  const [value, setValue] = useState('1');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (target) { setValue(String(target.value ?? 1)); setError(null); }
  }, [target]);

  if (!target) return null;

  const sellerUnit = (target.sellerUnit || '').trim() || t('inventory:packSize.unitUnknown', '단위');
  const stockUnit = (target.stockUnit || '').trim() || t('inventory:packSize.unitUnknown', '단위');
  const changed = Number(value) !== Number(target.value);

  const submit = async () => {
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0) {
      setError(t('inventory:packSize.invalid', '0 보다 큰 숫자를 넣어 주세요.') as string);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await onSave(target, n);
      onClose();
    } catch (e: any) {
      setError(String(e?.message || e) || (t('inventory:packSize.saveFailed', '저장하지 못했습니다.') as string));
    } finally {
      setBusy(false);
    }
  };

  const who = [target.sellerName, target.sellerProductName].filter(Boolean).join(' · ');

  return (
    <Modal
      isOpen={!!target}
      onClose={onClose}
      size="small"
      title={t('inventory:packSize.title', '받으면 재고가 얼마나 느나요?')}
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose} disabled={busy}>
            {t('common:cancel', '취소')}
          </ModalButton>
          <ModalButton variant="primary" onClick={submit} disabled={busy}>
            {t('common:save', '저장')}
          </ModalButton>
        </>
      }
    >
      {who && <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 12 }}>{who}</div>}

      {/* 항목 이름이 아니라 문장이다 — 읽으면 무엇을 넣는지 바로 안다 */}
      <div style={{ fontSize: 14, color: '#111827', lineHeight: 1.9 }}>
        {t('inventory:packSize.sentenceLead', '이 업체에서')}{' '}
        <strong>1 {sellerUnit}</strong>{' '}
        {t('inventory:packSize.sentenceMid', '를 받으면 내 재고는')}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
          <FormInput
            type="number"
            min="0"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: 130, textAlign: 'right' }}
            autoFocus
          />
          <strong>{stockUnit}</strong>
          <span>{t('inventory:packSize.sentenceTail', '늘어납니다')}</span>
        </div>
      </div>

      {target.suggested != null && Number(target.suggested) !== Number(value) && (
        <button
          type="button"
          onClick={() => setValue(String(target.suggested))}
          style={{
            marginTop: 4, padding: '6px 10px', borderRadius: 6, cursor: 'pointer',
            border: '1px solid #C7D2FE', background: '#EEF2FF', color: '#3730A3',
            fontSize: 12, fontWeight: 600,
          }}
        >
          {t('inventory:packSize.suggest', '적어 두신 규격대로라면 {{n}} 입니다 — 넣기', { n: target.suggested })}
        </button>
      )}

      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 10, lineHeight: 1.7 }}>
        <div>{t('inventory:packSize.help', '예 — 한 박스에 50개가 들었으면 50, 낱개로 오면 1 입니다.')}</div>
        <div>{t('inventory:packSize.confirmNote', '저장하면 이 값을 확인한 것으로 기록됩니다.')}</div>
        {changed && <div>{t('inventory:packSize.poNote', '아직 받지 않은 발주에도 새 값이 적용됩니다.')}</div>}
        <div>{t('inventory:packSize.untouchedNote', '지금 재고 수량과 이미 받은 발주는 바뀌지 않습니다.')}</div>
      </div>

      {error && <div style={{ marginTop: 12, fontSize: 13, color: '#DC2626' }}>{error}</div>}
    </Modal>
  );
};

export default SellerPackSizeModal;
