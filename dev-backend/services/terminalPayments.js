/**
 * 카드단말기 ECR 거래 — 상태 전이 단일 소스 (Fable 설계 .claude/fable-design-20261001-ghl-ecr.md §3-2·§3-4).
 *
 * 돈 무결성 규칙(이 파일 밖에서 terminal_transactions.status 를 바꾸지 않는다):
 *   - 승인(approved)이 아니면 카드 결제를 자동 기록하지 않는다. 예외는 manual 하나 — 사유·캐셔·시각이 남는다.
 *   - 응답 hex 는 서버가 직접 해석한다(CRC·명령·금액·ECR 송장 대조). 계산대가 보낸 «승인됐다» 를 믿지 않는다.
 *   - 같은 행에 응답이 두 번 오면 첫 결과가 고정된다(멱등).
 *   - 응답을 못 받은 거래는 Reprint 로 되찾고, 그래도 모르면 캐셔가 단말기 영수증을 보고 수동 기록한다.
 */
const { Op } = require('sequelize');
const ecr = require('../utils/ghlEcr');
const { TerminalTransaction, Order, OrderPayment, Restaurant } = require('../models');
const { normalizePaymentSettings } = require('../utils/settingsGuard');

const TIMEOUT_MS = 120000; // GHL 테스트 스크립트 «POS Timeout: MUST set 120 seconds»
const FINAL = new Set(['approved', 'declined', 'cancelled', 'not_found', 'voided', 'manual']);
const CMD_OF = { sale: ecr.CMD.sale, reprint: ecr.CMD.reprint, check_status: ecr.CMD.checkStatus, void: ecr.CMD.void, echo: ecr.CMD.echo };

const err = (status, code, message, extra) => Object.assign(new Error(message), { status, code, extra });

async function terminalConfig(restaurantId) {
  const r = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'payment_settings'] });
  if (!r) throw err(404, 'NOT_FOUND', 'Restaurant not found');
  const card = normalizePaymentSettings(r.payment_settings).card || {};
  const t = card.terminal && typeof card.terminal === 'object' ? card.terminal : {};
  return {
    enabled: t.enabled === true && !!String(t.host || '').trim(),
    provider: 'ghl_ecr',
    host: String(t.host || '').trim(),
    port: Number(t.port) > 0 ? Number(t.port) : 33898,
    transport: ['http-hex', 'tcp-hex', 'tcp-bin'].includes(t.transport) ? t.transport : 'http-hex',
  };
}

const money = (n) => Math.round((parseFloat(n) || 0) * 100) / 100;

/** 이 주문에서 아직 안 받은 금액 — 단말기에 그보다 많이 보내지 않는다. */
async function orderRemaining(order) {
  return money(money(order.total_amount) - money(order.amount_paid));
}

function publicRow(row) {
  const o = row.get ? row.get({ plain: true }) : row;
  const { request_hex, response_hex, ...rest } = o; // 원본 프레임은 감사용 — 화면에 내리지 않는다
  return { ...rest, status_text: o.status_code ? (ecr.STATUS_TEXT[o.status_code] || null) : null };
}

/** 단말기로 보낼 요청 묶음 — 계산대 브릿지는 이 hex 를 그대로 운반만 한다. */
function job(row, cfg, requestHex) {
  return { id: row.id, ecr_invoice_no: row.ecr_invoice_no, request_hex: requestHex, timeout_ms: TIMEOUT_MS,
    connection: { host: cfg.host, port: cfg.port, transport: cfg.transport } };
}

async function createSale({ restaurantId, orderId, amount, user, cashierName, deviceLabel }) {
  const cfg = await terminalConfig(restaurantId);
  if (!cfg.enabled) throw err(409, 'TERMINAL_DISABLED', 'Card terminal is not set up for this restaurant');
  let cents;
  try { cents = ecr.toCents(amount); } catch { throw err(400, 'BAD_AMOUNT', 'Invalid amount'); }
  if (Number(cents) <= 0) throw err(400, 'BAD_AMOUNT', 'Amount must be greater than 0');
  const amt = (Number(cents) / 100).toFixed(2);
  if (orderId) {
    const order = await Order.findByPk(orderId, { attributes: ['id', 'restaurant_id', 'total_amount', 'amount_paid', 'payment_status'] });
    if (!order || Number(order.restaurant_id) !== Number(restaurantId)) throw err(404, 'NOT_FOUND', 'Order not found');
    if (order.payment_status === 'completed') throw err(400, 'ALREADY_PAID', 'Order is already paid');
    if (money(amt) - await orderRemaining(order) > 0.005) throw err(400, 'AMOUNT_EXCEEDS', 'Amount is more than the unpaid balance');
  }
  const row = await TerminalTransaction.create({
    restaurant_id: restaurantId, order_id: orderId || null, command: 'sale', amount: amt, status: 'created',
    cashier_id: user?.id || null, cashier_name: (cashierName || user?.full_name || user?.username || '').slice(0, 150) || null,
    device_label: deviceLabel ? String(deviceLabel).slice(0, 80) : null,
  });
  // ECR 송장 = 행 PK 로 전역 유일, 영숫자만(규격 C013 AN..40). 단말기 무응답 때 Reprint/Void 로 되찾는 열쇠.
  const inv = `PH${restaurantId}A${row.id}`;
  const req = ecr.bufToHex(ecr.saleRequest({ amount: amt, ecrInvoiceNo: inv, cashierId: row.cashier_id ? String(row.cashier_id) : null }));
  await row.update({ ecr_invoice_no: inv, request_hex: req, status: 'sent', sent_at: new Date() });
  return job(row, cfg, req);
}

async function createChild(parent, command, allowed, buildReq) {
  if (!allowed.includes(parent.status)) throw err(409, 'BAD_STATE', `Cannot ${command} a ${parent.status} transaction`);
  const cfg = await terminalConfig(parent.restaurant_id);
  if (!cfg.enabled) throw err(409, 'TERMINAL_DISABLED', 'Card terminal is not set up for this restaurant');
  const req = ecr.bufToHex(buildReq({ amount: parent.amount, ecrInvoiceNo: parent.ecr_invoice_no }));
  const child = await TerminalTransaction.create({
    restaurant_id: parent.restaurant_id, order_id: parent.order_id, parent_id: parent.id, command,
    amount: parent.amount, status: 'sent', request_hex: req, sent_at: new Date(),
    cashier_id: parent.cashier_id, cashier_name: parent.cashier_name, device_label: parent.device_label,
  });
  if (command === 'reprint') await parent.update({ status: 'recovering' });
  return job(child, cfg, req);
}

/** 응답 없음/통신오류 → Reprint(E6) 로 단말기의 마지막 결과를 다시 받는다. */
const recover = (parent) => createChild(parent, 'reprint', ['timeout', 'comm_error', 'recovering'], ecr.reprintRequest);
/** EA(보류) → Check Status(E3). */
const checkStatus = (parent) => createChild(parent, 'check_status', ['pending'], ecr.checkStatusRequest);

const RESULT_FIELDS = ['terminal_invoice_no', 'terminal_batch_no', 'approval_code', 'rrn', 'masked_pan', 'card_type_code',
  'card_brand', 'card_type', 'entry_mode', 'terminal_id', 'merchant_id', 'txn_ref', 'txn_datetime', 'message_prompt'];
const pick = (r) => Object.fromEntries(RESULT_FIELDS.map(k => [k, r[k] == null ? null : String(r[k]).slice(0, 80)]));

/**
 * 브릿지가 올린 응답(또는 전송 실패)을 반영한다.
 * @returns {{ row, deduped?, parent? }}
 */
async function applyResponse(row, { response_hex, error }) {
  if (FINAL.has(row.status)) return { row, deduped: true };
  if (row.status !== 'sent' && row.status !== 'pending') {
    // timeout/comm_error 뒤에 늦게 온 응답 — 받아 준다(단말기가 실제로 끝낸 결과다). 그 외 상태는 이미 처리 중.
    if (!['timeout', 'comm_error', 'recovering'].includes(row.status)) return { row, deduped: true };
  }

  if (!response_hex) {
    const kind = String(error || '').toUpperCase();
    const status = kind === 'TIMEOUT' ? 'timeout' : 'comm_error';
    await row.update({ status, status_message: kind.slice(0, 200) || null, responded_at: new Date() });
    if (row.parent_id && row.command === 'reprint') {
      const parent = await TerminalTransaction.findByPk(row.parent_id);
      if (parent && parent.status === 'recovering') await parent.update({ status: 'timeout' });
    }
    return { row };
  }

  let frame;
  try { frame = ecr.parseFrame(response_hex); } catch (e) {
    throw err(422, e.code || 'FRAME_INVALID', `Terminal response rejected: ${e.message}`);
  }
  if (frame.isAck) throw err(422, 'FRAME_ACK_ONLY', 'Received an acknowledgement, not a result');
  if (frame.command !== CMD_OF[row.command]) throw err(422, 'FRAME_COMMAND', 'Response is for a different command');
  const result = ecr.readResult(frame);
  if (result.amount != null && money(result.amount) !== money(row.amount) && row.command !== 'echo') {
    throw err(422, 'AMOUNT_MISMATCH', 'Terminal amount does not match the requested amount');
  }
  const parentForInv = row.parent_id ? await TerminalTransaction.findByPk(row.parent_id) : null;
  const expectInv = row.ecr_invoice_no || parentForInv?.ecr_invoice_no;
  if (result.ecr_invoice_no && expectInv && result.ecr_invoice_no !== expectInv) {
    throw err(422, 'INVOICE_MISMATCH', 'Terminal response is for a different invoice');
  }

  let status = row.command === 'echo'
    ? (frame.status === '00' ? 'approved' : 'declined')
    : ecr.classifyStatus(frame.command, frame.status, result.original_response_code);
  // 승인인데 금액이 없으면 «얼마가 승인됐는지» 증명이 없다 — 승인으로 받지 않는다
  if (status === 'approved' && row.command !== 'echo' && result.amount == null) {
    throw err(422, 'AMOUNT_MISSING', 'Approved response carries no amount');
  }
  await row.update({
    status, status_code: frame.status, status_message: ecr.STATUS_TEXT[frame.status] || null,
    response_hex: ecr.bufToHex(ecr.hexToBuf(response_hex)), responded_at: new Date(), ...pick(result),
  });

  // 자식(복구/상태조회) 결과를 부모 거래로 올린다 — 부모가 그 판매의 단일 기록이다
  let parent = null; let linkError = null;
  if (parentForInv && (row.command === 'reprint' || row.command === 'check_status')) {
    parent = parentForInv;
    if (status === 'approved') {
      await parent.update({ status: 'approved', status_code: '00', status_message: `Recovered via ${row.command}`, responded_at: new Date(), ...pick(result) });
    } else if (row.command === 'reprint' && status === 'not_found') {
      await parent.update({ status: 'not_found', status_code: frame.status, status_message: ecr.STATUS_TEXT[frame.status] || null });
    } else if (row.command === 'check_status' && status === 'declined') {
      await parent.update({ status: 'declined', status_code: result.original_response_code || frame.status, status_message: 'Declined (check status)' });
    } else if (row.command === 'reprint' && status !== 'approved') {
      // Reprint 가 마지막 거래를 실패로 돌려줬다 = 판매가 승인되지 않았다
      await parent.update({ status: status === 'pending' ? 'pending' : 'declined', status_code: frame.status, status_message: ecr.STATUS_TEXT[frame.status] || null });
    }
    await parent.reload();
    if (parent.status === 'approved' && parent.order_id) linkError = await safeLink(parent, parent.order_id);
  } else if (status === 'approved' && row.order_id && row.command === 'sale') {
    linkError = await safeLink(row, row.order_id);
  }
  return { row, parent, linkError };
}

const transactionRef = (row) => `GHL:${row.terminal_invoice_no || row.ecr_invoice_no}:${row.approval_code || '-'}`;

/** 승인은 이미 저장됐다 — 연결 실패(이중 승인 등)가 «승인 실패» 로 보이면 안 된다. 사유만 돌려준다. */
async function safeLink(row, orderId) {
  try { await link(row, orderId); return null; } catch (e) { return e.code || 'LINK_FAILED'; }
}

/** 승인 거래 ↔ 주문. 주문 생성 뒤(POS 신규 주문) 또는 시작 시점(FloorPlan 등)에 부른다. */
async function link(row, orderId) {
  if (!['approved', 'manual'].includes(row.status) || row.command !== 'sale') throw err(409, 'BAD_STATE', 'Only an approved sale can be linked');
  const order = await Order.findByPk(orderId, { attributes: ['id', 'restaurant_id', 'total_amount', 'transaction_id'] });
  if (!order || Number(order.restaurant_id) !== Number(row.restaurant_id)) throw err(404, 'NOT_FOUND', 'Order not found');
  if (row.order_id && Number(row.order_id) !== Number(order.id)) throw err(409, 'ALREADY_LINKED', 'This payment belongs to another order');
  // 같은 주문에 승인이 주문 금액보다 많이 붙으면 이중 승인 의심 — 캐셔가 단말기에서 하나를 취소해야 한다
  const others = await TerminalTransaction.findAll({
    where: { order_id: order.id, command: 'sale', status: ['approved', 'manual'], id: { [Op.ne]: row.id } },
    attributes: ['amount'],
  });
  const sum = others.reduce((s, o) => s + money(o.amount), money(row.amount));
  if (sum - money(order.total_amount) > 0.005) throw err(409, 'DOUBLE_APPROVAL', 'More card approvals than the order total — void the extra one on the terminal');

  const ref = transactionRef(row);
  if (Number(row.order_id) !== Number(order.id)) await row.update({ order_id: order.id });
  if (!order.transaction_id) await Order.update({ transaction_id: ref }, { where: { id: order.id } });
  // 원장 행(같은 금액의 카드 결제, 아직 참조 없음)에 색인 복사 — 없으면 건너뛴다(POS 신규 주문은 원장 행이 없다)
  const pay = await OrderPayment.findOne({
    where: { order_id: order.id, payment_method: 'card', transaction_id: null, amount: money(row.amount) },
    order: [['id', 'DESC']],
  });
  if (pay) {
    await pay.update({ transaction_id: ref });
    if (!row.order_payment_id) await row.update({ order_payment_id: pay.id });
  }
  return row;
}

/** 단말기 결과를 끝내 알 수 없을 때 — 캐셔가 단말기 영수증을 보고 직접 닫는다(감사 표시). */
async function markManual(row, note) {
  const n = String(note || '').trim();
  if (n.length < 3) throw err(400, 'NOTE_REQUIRED', 'Please write what the terminal receipt shows');
  if (!['timeout', 'comm_error', 'not_found', 'recovering'].includes(row.status)) throw err(409, 'BAD_STATE', `Cannot record a ${row.status} transaction manually`);
  await row.update({ status: 'manual', manual_override: true, manual_note: n.slice(0, 300) });
  return row;
}

async function createEcho({ restaurantId, user }) {
  // 주소가 비어 있어도 Echo 프레임은 준다 — 계산대 앱의 «단말기 자동 찾기» 가 이 프레임으로 와이파이 안을 확인한다
  const cfg = await terminalConfig(restaurantId);
  const req = ecr.bufToHex(ecr.echoRequest());
  const row = await TerminalTransaction.create({ restaurant_id: restaurantId, command: 'echo', status: 'sent', request_hex: req, sent_at: new Date(), cashier_id: user?.id || null });
  return job(row, cfg, req);
}

const PRIVATE_IPV4 = /^(10\.\d{1,3}|192\.168|172\.(1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}$/;

/**
 * 자동 찾기로 알아낸 단말기 주소 저장 (Irene 2026-10-01 「바뀌면 자동으로 찾아야」).
 * 결제 권한 직원(캐셔)도 부를 수 있다 — 바꾸는 것은 card.terminal.host 한 칸뿐이고 사설망 IPv4 만 받는다.
 * 설정 전체를 덮어쓰지 않는다(결제 설정 wipe 잠금과 같은 취지).
 */
async function saveDiscoveredHost(restaurantId, host) {
  const h = String(host || '').trim();
  if (!PRIVATE_IPV4.test(h) || h.split('.').some((o) => Number(o) > 255)) throw err(400, 'BAD_HOST', 'Terminal address must be a local network address');
  const r = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'payment_settings'] });
  if (!r) throw err(404, 'NOT_FOUND', 'Restaurant not found');
  const ps = normalizePaymentSettings(r.payment_settings);
  const t = ps.card && ps.card.terminal;
  if (!t || t.enabled !== true) throw err(409, 'TERMINAL_DISABLED', 'Card terminal is not set up for this restaurant');
  if (t.host === h) return { host: h, changed: false };
  const raw = typeof r.payment_settings === 'string' ? JSON.parse(r.payment_settings || '{}') : (r.payment_settings || {});
  raw.card = { ...(raw.card || {}), terminal: { ...(raw.card && raw.card.terminal), host: h } };
  await r.update({ payment_settings: raw }); // 인스턴스 update — 모델 setter(JSON 문자열화)를 탄다
  return { host: h, changed: true, previous: t.host || null };
}

module.exports = { saveDiscoveredHost, TIMEOUT_MS, terminalConfig, createSale, recover, checkStatus, applyResponse, link, markManual, createEcho, publicRow };
