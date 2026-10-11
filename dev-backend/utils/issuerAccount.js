/**
 * 웹훅 발행자 일치 판정 (2026-10-11 Fable 판정 F3)
 *
 * 브랜드·푸드코트·공급업체가 자기 Stripe 계정을 쓰면 웹훅도 그 계정 비밀로 서명된다. 서명이 맞다는 건
 * «그 계정이 보냈다» 까지만 증명한다 — 자기 Stripe 를 가진 브랜드가 metadata 에 **남의** invoice_id 를
 * 넣으면 서명은 정상이다. 그래서 paid 로 바꾸기 전에 «서명한 계정 = 청구서 발행자 계정» 을 본다.
 *
 * 브랜드 결제 설정은 계정 하나(같은 owner 의 형제 브랜드 행이 같은 값 — utils/brandAccountSettings.js)라
 * 브랜드·푸드코트는 id 가 아니라 owner_id 로 맞춘다.
 */
const { Brand, Foodcourt } = require('../models');

const norm = (t) => (t === 'system_admin' ? 'system' : t);

/**
 * @param {{type:string,id:number|null}} verified  서명을 검증한 발행자(웹훅 주소)
 * @param {{issuer_type:string,issuer_id:number|null}} invoice
 */
async function sameIssuerAccount(verified, invoice) {
  if (!verified || !invoice) return false;
  const vt = norm(verified.type);
  const it = norm(invoice.issuer_type || 'system_admin');
  if (vt !== it) return false;
  if (vt === 'system') return true;

  const vid = Number(verified.id);
  const iid = Number(invoice.issuer_id);
  if (!vid || !iid) return false;
  if (vid === iid) return true;
  if (vt === 'supplier') return false;

  const Model = vt === 'brand' ? Brand : vt === 'foodcourt' ? Foodcourt : null;
  if (!Model) return false;
  const rows = await Model.findAll({ where: { id: [vid, iid] }, attributes: ['id', 'owner_id'] });
  if (rows.length !== 2) return false;
  const [a, b] = rows;
  return a.owner_id != null && b.owner_id != null && Number(a.owner_id) === Number(b.owner_id);
}

module.exports = { sameIssuerAccount };
