/**
 * 직원 휴가 알림 메일 — 신청(→ 매장 관리자) · 결과(→ 신청 직원). 카테고리 'staff_leave'.
 * 설계 .claude/fable-design-20261016-staff-attendance.md §4-4. 문구는 locales/<lang>/email.json 의 attendance.*.
 */
const { wrapTemplate } = require('./notificationTemplates');
const { getEmailText } = require('./i18n');

const BASE_URL = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function rows(pairs) {
  return `<table style="width:100%;border-collapse:collapse;margin:0 0 20px;">${pairs.map(([k, v]) => `
    <tr><td style="padding:8px 0;color:#6B7280;font-size:14px;width:40%;">${esc(k)}</td>
        <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">${esc(v)}</td></tr>`).join('')}</table>`;
}

function button(label, url) {
  return `<p style="margin:24px 0 0;"><a href="${esc(url)}" style="display:inline-block;background:#635BFF;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;">${esc(label)}</a></p>`;
}

function period(r) {
  const base = r.start_date === r.end_date ? r.start_date : `${r.start_date} – ${r.end_date}`;
  return r.half_day ? `${base} (${r.half_day.toUpperCase()})` : base;
}

/** 휴가 신청 → 관리자 */
function leaveRequestedEmail({ staffName, typeName, request, restaurantId }, lang = 'en') {
  const t = (k, p) => getEmailText(lang, 'attendance.leaveRequested.' + k, p);
  const title = t('heading');
  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">${esc(t('body', { name: staffName }))}</p>
    ${rows([[t('type'), typeName], [t('period'), period(request)], [t('days'), String(Number(request.days))], [t('reason'), request.reason || '—']])}
    ${button(t('cta'), `${BASE_URL}/restaurant/${restaurantId}/attendance?tab=leave`)}`;
  return {
    subject: t('subject', { name: staffName }),
    html: wrapTemplate(title, body, lang),
    text: t('body', { name: staffName }),
  };
}

/** 승인/반려 → 신청 직원 */
function leaveDecidedEmail({ typeName, request, restaurantId }, lang = 'en') {
  const t = (k, p) => getEmailText(lang, 'attendance.leaveDecided.' + k, p);
  const approved = request.status === 'approved';
  const title = approved ? t('headingApproved') : t('headingRejected');
  const body = `
    <p style="color:#374151;font-size:16px;margin:0 0 16px;">${esc(approved ? t('bodyApproved') : t('bodyRejected'))}</p>
    ${rows([[t('type'), typeName], [t('period'), period(request)], [t('days'), String(Number(request.days))], [t('note'), request.decision_note || '—']])}
    ${button(t('cta'), `${BASE_URL}/restaurant/${restaurantId}/my-attendance`)}`;
  return {
    subject: approved ? t('subjectApproved') : t('subjectRejected'),
    html: wrapTemplate(title, body, lang),
    text: approved ? t('bodyApproved') : t('bodyRejected'),
  };
}

module.exports = { leaveRequestedEmail, leaveDecidedEmail };
