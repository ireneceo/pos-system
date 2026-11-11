import React from 'react';
import { useTranslation } from 'react-i18next';
import { StockVerdict, VERDICT_COLOR } from './stockVerdict';

/** 재고 상태 배지 하나 — 목록·일괄 발주 창·설정 창 미리보기가 같은 이름·색을 쓴다 (2026-11-10 §2-2) */
export function useVerdictLabel() {
  const { t } = useTranslation(['inventory']);
  return (v: StockVerdict, days?: number | null): string => {
    switch (v) {
      case 'out': return t('inventory:verdict.out', 'Out of stock');
      case 'order_now': return t('inventory:verdict.orderNow', 'Order now');
      case 'soon': return days != null
        ? t('inventory:verdict.soon', { defaultValue: 'Running low · ~{{n}}d left', n: days })
        : t('inventory:verdict.soonPlain', 'Running low');
      case 'incoming': return t('inventory:verdict.incoming', 'Ordered · on the way');
      case 'off': return t('inventory:verdict.off', 'Turned off');
      case 'no_basis': return t('inventory:verdict.noLevel', 'No reorder number');
      default: return t('inventory:verdict.ok', 'OK');
    }
  };
}

const VerdictBadge: React.FC<{ verdict: StockVerdict; days?: number | null }> = ({ verdict, days }) => {
  const label = useVerdictLabel();
  const c = VERDICT_COLOR[verdict];
  return (
    <span style={{
      display: 'inline-block', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
      whiteSpace: 'nowrap', background: c.bg, color: c.fg,
    }}>
      {label(verdict, days)}
    </span>
  );
};

export default VerdictBadge;
