import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton } from './Modal';

/**
 * 비슷한 이름이 이미 있을 때 묻는 공용 창 (2026-10-11 Fable 판정 `fable-verdict-20261011-similar-name-guard.md` §4)
 *
 * Irene «이거 있는데 그래도 만들거면 만들어. 라는 형태. 자꾸 새로 만들고 이름 헷갈리고 … 연결 엉망 만드는 거 제지해야 해.»
 * 서버 409 SIMILAR_EXISTS 의 `candidates` 를 그대로 보여 준다 — 줄마다 종류·규격·왜 비슷한지·«이걸로 쓰기».
 * 막지 않는다: «그래도 새로 만들기» 는 같은 요청을 force:true 로 다시 보낸다(호출하는 화면이 정한다).
 * 이유 문장은 서버의 rule·words·typos 로 여기서 4언어로 만든다(서버는 문장을 정하지 않는다).
 * 재고아이템·판매 상품·브랜드 재료 세 화면이 이 창 하나를 쓴다 — 같은 모양 두 벌 금지.
 */
export interface SimilarCandidate {
  kind: 'stock_item' | 'brand_product' | 'brand_ingredient';
  id: number;
  name: string;
  spec?: string;
  is_active?: boolean;
  rule?: 'same_name' | 'paren_only' | 'same_words' | 'contains' | 'suggest';
  words?: string[];
  typos?: { a: string; b: string }[];
}

interface Props {
  isOpen: boolean;
  candidates: SimilarCandidate[];
  /** 그 후보로 «이걸로 쓰기» 버튼 글자 — null 이면 버튼 없음 */
  actionLabel?: (c: SimilarCandidate) => string | null;
  onUse?: (c: SimilarCandidate) => void;
  onCreateAnyway: () => void;
  onCancel: () => void;
  createLabel?: string;
  busy?: boolean;
}

const SimilarNameDialog: React.FC<Props> = ({ isOpen, candidates, actionLabel, onUse, onCreateAnyway, onCancel, createLabel, busy }) => {
  const { t } = useTranslation(['common']);
  const kindLabel = (k: SimilarCandidate['kind']): string => (k === 'stock_item' ? t('common:similarName.kindStockItem', 'Stock item')
    : k === 'brand_product' ? t('common:similarName.kindProduct', 'Product') : t('common:similarName.kindBrandIngredient', 'Brand ingredient'));
  const reason = (c: SimilarCandidate): string => {
    const typo = (c.typos || []).length
      ? ' ' + t('common:similarName.typo', '({{pairs}} — one letter apart)', { pairs: (c.typos || []).map((x) => `${x.a} ≈ ${x.b}`).join(', ') })
      : '';
    switch (c.rule) {
      case 'same_name': return t('common:similarName.ruleSameName', 'Same name');
      case 'paren_only': return t('common:similarName.ruleParen', 'Only the text in brackets differs');
      case 'same_words': return t('common:similarName.ruleSameWords', 'Same words — only order or size differs: {{words}}', { words: (c.words || []).join(', ') }) + typo;
      case 'contains': return t('common:similarName.ruleContains', 'Contains every word of the other name: {{words}}', { words: (c.words || []).join(', ') }) + typo;
      default: return t('common:similarName.ruleSuggest', 'Looks alike once sizes are removed');
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={t('common:similarName.title', 'Something similar already exists')} size="small">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6 }}>
          {t('common:similarName.intro', 'Is it one of these? Use the existing one to keep recipes, orders and stock on one line. If it is really different, create it anyway.')}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '50vh', overflowY: 'auto' }}>
          {candidates.map((c) => {
            const label = actionLabel ? actionLabel(c) : null;
            return (
              <div key={`${c.kind}-${c.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px',
                border: '1px solid #C7CED6', borderRadius: '6px', padding: '10px 12px' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '11px', color: '#6B7280' }}>
                    {kindLabel(c.kind)}{c.spec ? ` · ${c.spec}` : ''}{c.is_active === false ? ` · ${t('common:similarName.inactive', 'inactive')}` : ''}
                  </div>
                  <div style={{ fontSize: '13px', color: '#0A2540', fontWeight: 500, overflowWrap: 'anywhere' }}>{c.name}</div>
                  <div style={{ fontSize: '11px', color: '#B45309' }}>{reason(c)}</div>
                </div>
                {label && onUse ? (
                  <ModalButton type="button" variant="secondary" disabled={busy} onClick={() => onUse(c)}>{label}</ModalButton>
                ) : null}
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', flexWrap: 'wrap' }}>
          <ModalButton type="button" variant="secondary" onClick={onCancel}>{t('common:cancel', 'Cancel')}</ModalButton>
          <ModalButton type="button" variant="primary" disabled={busy} onClick={onCreateAnyway}>
            {createLabel || t('common:similarName.createAnyway', 'Create anyway')}
          </ModalButton>
        </div>
      </div>
    </Modal>
  );
};

/** 409 본문 → 후보 목록(브랜드 상품의 옛 similar·suggestions 도 함께 — 중복 제거) */
export function candidatesFrom409(data: any): SimilarCandidate[] {
  const err = (data && data.error) || {};
  const list: SimilarCandidate[] = Array.isArray(err.candidates) ? err.candidates : Array.isArray(data?.candidates) ? data.candidates : [];
  const seen = new Set(list.map((c) => `${c.kind}:${c.id}`));
  const legacy = (rows: any[], rule: SimilarCandidate['rule']) => (rows || []).forEach((r) => {
    const key = `brand_product:${r.id}`;
    if (seen.has(key)) return;
    seen.add(key);
    list.push({ kind: 'brand_product', id: r.id, name: r.name, spec: r.unit || undefined, rule });
  });
  legacy(err.similar, 'paren_only');
  legacy(err.suggestions, 'suggest');
  return list;
}

export default SimilarNameDialog;
