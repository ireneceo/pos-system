/**
 * suites/brand-account-settings.js — 판매자 결제 설정 = 계정(회사) 하나 (2026-10-07 Fable 판정).
 * 같은 주인 브랜드들의 결제·청구·배송 설정 칸(ACCOUNT_LEVEL_FIELDS)이 하나라도 다르면, 둘째 브랜드가 발행한
 * 청구서 결제창이 «Payment Not Available» 이 되거나 다른 계좌가 찍힌다(2026-10-05 운영 K-DINE 사고).
 * 탐지 조건은 정렬 마이그(migrate-brand-account-payment-settings.js)와 같은 함수 — baseline 등록 금지.
 */
const { findAccountDrift, ACCOUNT_LEVEL_FIELDS } = require('../../../utils/brandAccountSettings');

module.exports = {
  name: 'brand-account-settings',
  async run({ q }) {
    const checks = [];
    const add = (name, pass, detail) => checks.push({ name, pass, detail });
    let drift;
    try {
      drift = await findAccountDrift(q);
    } catch (e) {
      add('B-ACC 같은 주인 브랜드 결제 설정 일치', false, '조회 실패: ' + e.message.slice(0, 100));
      return checks;
    }
    const { fixable, conflicts } = drift;
    add('B-ACC 같은 주인 브랜드 결제 설정 일치',
      fixable.length === 0 && conflicts.length === 0,
      [
        ...fixable.slice(0, 6).map(f => `브랜드 ${f.target_id}≠${f.source_id}(${f.fields.join('/')})`),
        ...conflicts.slice(0, 3).map(c => `owner ${c.owner_id} 기준 없음(${c.brand_ids.join(',')})`),
      ].join(' · ') + (fixable.length || conflicts.length ? ` → migrate-brand-account-payment-settings.js (칸: ${ACCOUNT_LEVEL_FIELDS.length}개)` : ''));
    return checks;
  },
};
