/**
 * 알림 «수신 자격(addressee)» — 2026-10-22 Fable 설계 (.claude/fable-design-20261022-notification-addressee.md)
 *
 * Irene: «브랜드제너럴인 내게 보내는 건지, 레스토랑관리자인 내게 보내는 건지, 브랜드오너에게 보내는 건지
 *        모르겠고, 무슨 할일을 해야 한다는게 명확하지가 않아»
 *
 * 모든 알림은 자격 하나를 달고 나간다 — 그 값이 ①제목 맨 앞 꼬리표 ②미리보기 줄 ③본문 «받는 분» 띠
 * ④버튼 주소(utils/notificationLinks) ⑤바닥글 «받는 이유» 에 **같은 값**으로 찍힌다.
 * 자격은 수신자 계정 역할이 아니라 **그 발송의 자리**다(판매자 메일 = 판매자 자리).
 *
 *   addressee = { kind, entity_type, entity_id, entity_name }
 *     kind: store | store_staff | owner | brand | brand_manager | foodcourt | foodcourt_manager
 *           | supplier | admin | referral | account   (account = 자격 무관 → 꼬리표·띠 없음)
 *   action    = { state: 'action' | 'fyi' | 'result', key?, text?, due?, tone? }
 *     key 는 locales/*\/email.json `action.*` 사전 키. text 는 키 대신 쓰는 완성 문장(이스케이프 전).
 *     tone 은 result 일 때 'good' | 'bad' (초록/빨강), action 일 때 'urgent' 면 빨강.
 */

const KINDS = ['store', 'store_staff', 'owner', 'brand', 'brand_manager', 'foodcourt', 'foodcourt_manager',
  'supplier', 'admin', 'referral', 'account'];

function esc(v) {
  return String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function t(lang, key, params) {
  const { getEmailText } = require('./i18n');
  return getEmailText(lang || 'en', key, params);
}

function isTagged(addressee) {
  return !!(addressee && addressee.kind && addressee.kind !== 'account' && KINDS.includes(addressee.kind));
}

/** «K-DINE Bangsar · Store» (이스케이프 전 평문). 자격 없으면 ''. */
function addresseeLabel(addressee, lang) {
  if (!isTagged(addressee)) return '';
  const word = t(lang, 'addressee.kind.' + addressee.kind);
  const name = (addressee.entity_name || '').toString().trim().slice(0, 80);
  return name ? `${name} · ${word}` : word;
}

/** 제목 맨 앞 꼬리표 «[K-DINE Bangsar · Store]». 자격 없으면 ''. */
function addresseeTag(addressee, lang) {
  const label = addresseeLabel(addressee, lang);
  return label ? `[${label}]` : '';
}

/** 이미 꼬리표가 붙은 제목에 두 번 붙이지 않는다(재발송·재렌더 방어). */
function tagSubject(subject, addressee, lang) {
  const tag = addresseeTag(addressee, lang);
  const s = (subject || '').toString();
  if (!tag || s.startsWith(tag)) return s;
  return `${tag} ${s}`;
}

/** 할 일 문장(평문). */
function actionText(action, lang) {
  if (!action) return t(lang, 'action.no_action');
  if (action.text) return String(action.text);
  if (action.key) return t(lang, 'action.' + action.key);
  return t(lang, 'action.no_action');
}

function actionPalette(action) {
  const state = action ? action.state : 'fyi';
  if (state === 'action') {
    return action.tone === 'urgent'
      ? { border: '#EF4444', bg: '#FEF2F2', fg: '#991B1B', glyph: '▶' }
      : { border: '#F59E0B', bg: '#FFFBEB', fg: '#92400E', glyph: '▶' };
  }
  if (state === 'result') {
    return action.tone === 'bad'
      ? { border: '#EF4444', bg: '#FEF2F2', fg: '#991B1B', glyph: '✕' }
      : { border: '#10B981', bg: '#ECFDF5', fg: '#065F46', glyph: '✓' };
  }
  return { border: '#D1D5DB', bg: '#F9FAFB', fg: '#374151', glyph: '◯' };
}

/** 본문 «받는 분» 띠 HTML. 자격 없으면 ''. */
function addresseeBandHtml(addressee, recipientName, lang) {
  if (!isTagged(addressee)) return '';
  const label = addresseeLabel(addressee, lang);
  const name = (recipientName || '').toString().trim();
  const line = name
    ? t(lang, 'addressee.to', { name: esc(name.slice(0, 80)), label: `<strong>${esc(label)}</strong>` })
    : t(lang, 'addressee.toNoName', { label: `<strong>${esc(label)}</strong>` });
  return `<div style="background:#F3F4F6;border-radius:6px;padding:8px 12px;margin:0 0 16px;font-size:13px;color:#4B5563;">◉ ${line}</div>`;
}

/** «해야 할 일» 블록 HTML — 3상태(action / fyi / result). action 이 없으면 fyi(«할 일 없음»). */
function actionBlockHtml(action, lang) {
  const state = action ? action.state : 'fyi';
  const p = actionPalette(action);
  const titleKey = state === 'action' ? 'notify.actionTitle' : state === 'result' ? 'notify.resultTitle' : 'notify.fyiTitle';
  let text = esc(actionText(action, lang));
  if (action && action.due) text += ` <strong>(${esc(t(lang, 'notify.dueBy', { date: action.due }))})</strong>`;
  return `<div style="border-left:4px solid ${p.border};background:${p.bg};border-radius:0 6px 6px 0;padding:12px 16px;margin:0 0 20px;">
      <p style="margin:0 0 4px;font-size:12px;font-weight:600;color:${p.fg};text-transform:uppercase;letter-spacing:0.3px;">${p.glyph} ${esc(t(lang, titleKey))}</p>
      <p style="margin:0;font-size:15px;color:#111827;line-height:1.5;">${text}</p>
    </div>`;
}

/** 미리보기 줄(평문 → 이스케이프). 할 일 문장 + 핵심 사실. */
function preheaderText(meta, lang) {
  if (!meta) return '';
  if (meta.preheader) return esc(String(meta.preheader).slice(0, 140));
  const parts = [actionText(meta.action, lang)];
  if (meta.action && meta.action.due) parts.push(t(lang, 'notify.dueBy', { date: meta.action.due }));
  const label = addresseeLabel(meta.addressee, lang);
  if (label) parts.push(label);
  return esc(parts.join(' · ').slice(0, 140));
}

function footerLineHtml(addressee, lang) {
  if (!isTagged(addressee)) return '';
  return esc(t(lang, 'footer.receivingAs', { label: addresseeLabel(addressee, lang) }));
}

/**
 * 수신자 → 자격 맵에서 sendNotificationBatch 용 팩토리를 만든다.
 *   sendNotificationBatch(ids, cat, { ...mail, _addressee: addresseeFor(list) })
 */
function addresseeFor(list) {
  const map = new Map((list || []).map((r) => [Number(r.id), r.addressee]));
  return (user) => map.get(Number(user.id)) || null;
}

/**
 * 수신자마다 자격(→ 버튼 주소·꼬리표)이 다른 배치용 메일 팩토리.
 *   sendNotificationBatch(list.map(r => r.id), cat, mailFor(list, (addressee, user) => template({...}, lang)))
 * Object.assign 으로 원본(비열거 _title/_body/_action)을 살린 채 _addressee 만 더한다.
 */
function mailFor(list, build) {
  const map = new Map((list || []).map((r) => [Number(r.id), r.addressee]));
  return async (user) => {
    const addressee = map.get(Number(user.id)) || null;
    const mail = await build(addressee, user);
    if (!mail) return mail;
    return Object.assign(mail, { _addressee: addressee });
  };
}

module.exports = {
  mailFor,
  KINDS, esc, isTagged, addresseeLabel, addresseeTag, tagSubject, actionText,
  addresseeBandHtml, actionBlockHtml, preheaderText, footerLineHtml, addresseeFor
};
