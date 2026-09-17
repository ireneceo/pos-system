import React from 'react';
import { useTranslation } from 'react-i18next';
import { describeDeliveryTerms, DeliveryTerms } from '../../utils/deliveryFee';

/**
 * 판매자 배송 조건을 한 문장으로 보여준다 (2026-09-17 Fable 판정 ⑦).
 *
 * 설정 화면 미리보기와 발주 담기 근거줄이 **같은 문장**을 쓰게 하려고 한 곳에 모았다.
 * 문구는 4개 언어 파일(common:delivery.*)에 있다 — 여기에 한글을 박지 않는다.
 *
 * «미설정»은 «무료»가 아니다. 그 둘을 같은 말로 쓰면 판매자가 안 정한 것을 무료로 읽는다.
 */
interface Props {
  terms: DeliveryTerms;
  /** 금액 표기(통화기호 포함). 기본은 소수점 2자리 숫자. */
  money?: (n: number) => string;
  className?: string;
}

const DeliveryTermsText: React.FC<Props> = ({ terms, money, className }) => {
  const { t } = useTranslation('common');
  const fmt = money || ((n: number) => n.toFixed(2));
  const d = describeDeliveryTerms(terms);

  if (d.kind === 'unset') {
    return <span className={className}>{t('delivery.unset', '배송비 미설정 — 발주 화면에 배송비가 나오지 않습니다')}</span>;
  }
  if (d.kind === 'free') {
    return <span className={className}>{t('delivery.free', '무료배송')}</span>;
  }
  if (d.kind === 'always') {
    return <span className={className}>{t('delivery.always', '배송비 항상 {{fee}}', { fee: fmt(d.fee as number) })}</span>;
  }
  return (
    <span className={className}>
      {t('delivery.threshold', '{{free}} 이상 무료 · 미만 {{fee}}', {
        free: fmt(d.free_above as number),
        fee: fmt(d.fee as number),
      })}
    </span>
  );
};

export default DeliveryTermsText;
