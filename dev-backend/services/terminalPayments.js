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
const { userCanVoid } = require('../middleware/auth');
const { enforceVoidPin } = require('../utils/voidPinGuard');

const TIMEOUT_MS = 120000; // GHL 테스트 스크립트 «POS Timeout: MUST set 120 seconds»
const FINAL = new Set(['approved', 'declined', 'cancelled', 'not_found', 'voided', 'manual']);
const CMD_OF = { sale: ecr.CMD.sale, reprint: ecr.CMD.reprint, check_status: ecr.CMD.checkStatus, void: ecr.CMD.void, echo: ecr.CMD.echo };

const err = (status, code, message, extra) => Object.assign(new Error(message), { status, code, extra });

/**
 * @param device 등록된 키오스크(req.kioskDevice) — 그 기기 옆 단말기 주소가 있으면 매장 값 대신 쓴다
 *               (키오스크 옆 단말기가 카운터 것과 다를 때 · Fable 판정 2026-10-07 D5). 켜고 끄기는 매장 설정 그대로.
 */
async function terminalConfig(restaurantId, device = null) {
  const r = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'payment_settings'] });
  if (!r) throw err(404, 'NOT_FOUND', 'Restaurant not found');
  const card = normalizePaymentSettings(r.payment_settings).card || {};
  const t = card.terminal && typeof card.terminal === 'object' ? card.terminal : {};
  const host = String((device && device.terminal_host) || t.host || '').trim();
  const port = device && Number(device.terminal_port) > 0 ? Number(device.terminal_port) : (Number(t.port) > 0 ? Number(t.port) : 33898);
  return {
    enabled: t.enabled === true && !!host,
    provider: 'ghl_ecr',
    host,
    port,
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

async function createSale({ restaurantId, orderId, amount, user, cashierName, deviceLabel, device = null }) {
  const cfg = await terminalConfig(restaurantId, device);
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
    // 이 주문의 승인 합에 이번 금액을 더하면 주문 금액을 넘는다 = 손님을 두 번 긁게 된다(Fable 게이트 R2).
    //   예: 승인 뒤 결제 기록이 네트워크로 실패 → 캐셔 재시도. 같은 금액의 승인이 있으면 그 승인을 돌려줘
    //   새 판매 없이 그 승인으로 기록하게 하고, 아니면 막는다(link 의 DOUBLE_APPROVAL 을 단말기 전에 건다).
    const approved = await TerminalTransaction.findAll({
      where: { order_id: order.id, command: 'sale', status: ['approved', 'manual'] },
      order: [['id', 'DESC']],
    });
    const approvedSum = approved.reduce((s, o) => s + money(o.amount), 0);
    if (approvedSum + money(amt) - money(order.total_amount) > 0.005) {
      const same = approved.find(o => money(o.amount) === money(amt));
      throw err(409, 'ALREADY_APPROVED', 'This order already has a card terminal approval — no new charge was sent',
        same ? { txn: publicRow(same) } : undefined);
    }
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

async function createChild(parent, command, allowed, buildReq, device = null) {
  if (!allowed.includes(parent.status)) throw err(409, 'BAD_STATE', `Cannot ${command} a ${parent.status} transaction`);
  const cfg = await terminalConfig(parent.restaurant_id, device);
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
const recover = (parent, device = null) => createChild(parent, 'reprint', ['timeout', 'comm_error', 'recovering'], ecr.reprintRequest, device);
/** EA(보류) → Check Status(E3). */
const checkStatus = (parent, device = null) => createChild(parent, 'check_status', ['pending'], ecr.checkStatusRequest, device);

/**
 * 키오스크가 만든 거래 표시 — device_label 머리에 기기 번호를 박는다(표 변경 없이 «어느 키오스크의 시도인가» 를 남김).
 * 키오스크 토큰은 자기 기기 거래만 이어서 다룰 수 있다(routes/terminal-payments.js loadTxn · orders-payment 기록).
 */
const kioskLabel = (device) => `kiosk#${device.id} ${String(device.name || '')}`.slice(0, 80);
const isKioskTxnOf = (row, device) => !!row && !!device && String(row.device_label || '').startsWith(`kiosk#${device.id} `);

/** 매출에 잡힌 단말기 결제인가 — 원장 행에 붙었거나 주문 참조가 이 결제다(서버가 계산, 화면 주장 안 믿음). */
async function isCounted(parent) {
  if (!['approved', 'manual'].includes(parent.status)) return false;
  if (parent.order_payment_id) return true;
  if (!parent.order_id) return false;
  const order = await Order.findByPk(parent.order_id, { attributes: ['id', 'transaction_id'] });
  return !!order && order.transaction_id === transactionRef(parent);
}

const VOIDABLE = ['approved', 'manual', 'timeout', 'comm_error', 'recovering', 'not_found'];

/**
 * 단말기 결제 취소 Void(A2) — 자식 행 1개(ECR 송장 C013). 결과는 applyResponse 가 부모로 올린다.
 * 권한(Fable 설계 §3-2): 매출에 잡힌 결제(counted) = 주문 취소와 같은 게이트(access_void + 매장 PIN 설정).
 *   매출에 안 잡힌 것(이중 승인·주문 없는 승인·결과 미확인 시도) = 손님 보호만 → 결제 권한(라우터)으로 충분.
 */
async function createVoid(parent, { user, voidPin }) {
  if (parent.command !== 'sale') throw err(409, 'BAD_STATE', 'Only a card sale can be voided');
  if (parent.status === 'voided') throw err(409, 'ALREADY_VOIDED', 'This card payment is already voided');
  if (!VOIDABLE.includes(parent.status)) throw err(409, 'BAD_STATE', `Cannot void a ${parent.status} transaction`);
  const counted = await isCounted(parent);
  let approver = null;
  if (counted) {
    if (!userCanVoid(user)) throw err(403, 'VOID_FORBIDDEN', 'You do not have permission to cancel payments');
    const gate = await enforceVoidPin(parent.restaurant_id, voidPin);
    if (!gate.ok) throw err(gate.status, gate.code, gate.message);
    approver = gate.approver;
  }
  const data = await createChild(parent, 'void', VOIDABLE, ecr.voidRequest);
  return { data, counted, approver };
}

const RESULT_FIELDS = ['terminal_invoice_no', 'terminal_batch_no', 'approval_code', 'rrn', 'masked_pan', 'card_type_code',
  'card_brand', 'card_type', 'tender_method', 'ewallet_type', 'entry_mode', 'terminal_id', 'merchant_id', 'txn_ref', 'txn_datetime', 'message_prompt'];
const pick = (r) => Object.fromEntries(RESULT_FIELDS.map(k => [k, r[k] == null ? null : String(r[k]).slice(0, 80)]));

/**
 * 브릿지가 올린 응답(또는 전송 실패)을 반영한다.
 * @returns {{ row, deduped?, parent? }}
 */
async function applyResponse(row, { response_hex, error, raw_hex }) {
  if (FINAL.has(row.status)) return { row, deduped: true };
  if (row.status !== 'sent' && row.status !== 'pending') {
    // timeout/comm_error 뒤에 늦게 온 응답 — 받아 준다(단말기가 실제로 끝낸 결과다). 그 외 상태는 이미 처리 중.
    if (!['timeout', 'comm_error', 'recovering'].includes(row.status)) return { row, deduped: true };
  }

  if (!response_hex) {
    const kind = String(error || '').toUpperCase();
    let status = kind === 'TIMEOUT' ? 'timeout' : 'comm_error';
    // 읽지 못한 응답의 원본 바이트(앱 0.3.4+) — 단말기가 실제로 무엇을 보냈는지 남긴다(2026-10-04 BAD_RESPONSE 실측)
    const raw = raw_hex ? String(raw_hex).replace(/[^0-9A-Fa-f]/g, '').slice(0, 2000).toUpperCase() || null : null;
    // 단말기가 HTTP 오류로 거절했으면(운영 tx30: «HTTP 400 BUSY») 원인을 남긴다(Fable 설계 §2-2).
    //   4xx + 프레임 없는 본문 = 명령을 받기 전에 거절 = 처리되지 않았다 → 판매 행은 declined(«단말기가 바쁨»).
    //   복구·상태조회·Void 자식은 comm_error 그대로(부모 처리는 아래 기존 규칙). 5xx·상태줄 없음 = 처리 여부 불명 → comm_error.
    const http = raw ? ecr.parseHttpRaw(raw) : null;
    let statusCode = null;
    let message = kind.slice(0, 200) || null;
    if (http) {
      statusCode = `H${http.status}`;
      message = `HTTP ${http.status}${http.body ? ` ${http.body}` : ''}`.slice(0, 200);
      if (http.status >= 400 && http.status < 500 && row.command === 'sale') status = 'declined';
    }
    await row.update({ status, status_code: statusCode, status_message: message, responded_at: new Date(), ...(raw ? { response_hex: raw } : {}) });
    if (row.parent_id && row.command === 'reprint') {
      const parent = await TerminalTransaction.findByPk(row.parent_id);
      if (parent && parent.status === 'recovering') await parent.update({ status: 'timeout' });
    }
    return { row };
  }

  // 보낸 프레임을 그대로 돌려준 것은 단말기 응답이 아니다(2026-10-04 — 자동 찾기가 되돌림 기기를 단말기로 잡았다).
  //   우리 요청 프레임도 Echo 모양이라 형식 검사만으로는 통과하고 echo 가 «approved» 가 됐다.
  if (row.request_hex && String(response_hex).toUpperCase() === String(row.request_hex).toUpperCase()) {
    throw err(422, 'FRAME_REFLECTED', 'Response is our own request echoed back — not a terminal');
  }
  let frame;
  // 한 본문에 ACK·Notify(진행 알림, PayHere Direct) + 결과가 이어 올 수 있다 → 결과 프레임만 고른다(utils/ghlEcr.pickResultFrame)
  try { ({ frame } = ecr.pickResultFrame(response_hex)); } catch (e) {
    throw err(422, e.code || 'FRAME_INVALID', `Terminal response rejected: ${e.message}`);
  }
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
  } else if (parentForInv && row.command === 'void') {
    // Void(A2) 결과 → 부모 판매(Fable 설계 §3-2 표). 00·C5(이미 취소) = voided(멱등).
    //   C3(단말기에 기록 없음): 승인 기록된 부모는 그대로(정산 뒤일 수 있음 → 단말기 Refund), 미확인 시도 부모는 «청구 안 됨» = declined.
    //   그 외·무응답은 부모 불변 — 복구는 Void 재시도(갔으면 C5 가 돌아온다).
    parent = parentForInv;
    const unconfirmed = ['timeout', 'comm_error', 'recovering', 'not_found'].includes(parent.status);
    if (frame.status === '00' || frame.status === 'C5') {
      await parent.update({
        status: 'voided', status_message: frame.status === '00' ? 'Voided via POS' : 'Already voided on terminal',
        ...(unconfirmed && frame.status === '00' ? pick(result) : {}),
      });
    } else if (frame.status === 'C3' && unconfirmed) {
      await parent.update({ status: 'declined', status_code: 'C3', status_message: 'No transaction on terminal (void check)' });
    }
    await parent.reload();
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
  // 카드 vs 손님 QR(지갑) — 단말기 응답이 정한 수단의 원장 행에 붙인다(Fable 추가 판정 C-2)
  const pay = await OrderPayment.findOne({
    where: { order_id: order.id, payment_method: row.tender_method || 'card', transaction_id: null, amount: money(row.amount) },
    order: [['id', 'DESC']],
  });
  if (pay) {
    await pay.update({ transaction_id: ref });
    if (!row.order_payment_id) await row.update({ order_payment_id: pay.id });
  }
  return row;
}

const CARD_KEYS = ['visa', 'master', 'amex', 'debit', 'other'];
const EWALLET_KEYS = ['tng', 'grabpay', 'boost', 'shopeepay', 'duitnow', 'other'];

/**
 * 단말기 결과를 끝내 알 수 없을 때 — 캐셔가 단말기 영수증을 보고 직접 닫는다(감사 표시).
 * 응답이 없으니 카드인지 지갑인지도 캐셔가 영수증을 보고 고른다(필수). 종류는 화면 목록 키만.
 */
async function markManual(row, note, tender = {}) {
  const n = String(note || '').trim();
  if (n.length < 3) throw err(400, 'NOTE_REQUIRED', 'Please write what the terminal receipt shows');
  const method = tender && tender.method;
  if (method !== 'card' && method !== 'ewallet') throw err(400, 'TENDER_REQUIRED', 'Choose card or e-wallet from the terminal receipt');
  const cardType = method === 'card' && tender.card_type ? String(tender.card_type) : null;
  const ewType = method === 'ewallet' && tender.ewallet_type ? String(tender.ewallet_type) : null;
  if (cardType && !CARD_KEYS.includes(cardType)) throw err(400, 'BAD_TENDER', 'Unknown card type');
  if (ewType && !EWALLET_KEYS.includes(ewType)) throw err(400, 'BAD_TENDER', 'Unknown e-wallet type');
  if (!['timeout', 'comm_error', 'not_found', 'recovering'].includes(row.status)) throw err(409, 'BAD_STATE', `Cannot record a ${row.status} transaction manually`);
  await row.update({ status: 'manual', manual_override: true, manual_note: n.slice(0, 300), tender_method: method, card_type: cardType, ewallet_type: ewType });
  // 주문이 이미 있는 경로(FloorPlan·LiveOrders)는 여기서 주문 참조까지 채운다(Fable 게이트 R4).
  //   POS 신규 주문은 주문 생성 뒤 대기 연결이 같은 일을 한다.
  const linkError = row.order_id ? await safeLink(row, row.order_id) : null;
  return Object.assign(row, { linkError });
}

async function createEcho({ restaurantId, user, probe = false }) {
  // 주소가 비어 있어도 Echo 프레임은 준다 — 계산대 앱의 «단말기 자동 찾기» 가 이 프레임으로 와이파이 안을 확인한다
  const cfg = await terminalConfig(restaurantId);
  const req = ecr.bufToHex(ecr.echoRequest());
  // 자동 찾기용 프레임만 필요할 때는 기록 행을 만들지 않는다 — 결과를 돌려줄 곳이 없어 «sent» 로 영영 남았다(2026-10-04 운영 9행).
  //   찾기 결과는 /discovery-report 가 활동 기록으로 남긴다.
  if (probe) return { id: null, ecr_invoice_no: null, request_hex: req, timeout_ms: TIMEOUT_MS, connection: { host: cfg.host, port: cfg.port, transport: cfg.transport } };
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

/**
 * 자동 찾기 실측 기록(2026-10-04) — 앱이 와이파이에서 연결된 기기마다 무엇이 돌아왔는지.
 * 판정에는 쓰지 않는다(기록 전용). 값은 잘라 담는다.
 */
function summarizeDiscovery(body) {
  const probed = Array.isArray(body?.probed) ? body.probed.slice(0, 32) : [];
  return {
    scanned: Number.isFinite(Number(body?.scanned)) ? Number(body.scanned) : null,
    hosts: Array.isArray(body?.hosts) ? body.hosts.filter((h) => PRIVATE_IPV4.test(String(h))).slice(0, 16) : [],
    probed: probed.filter((p) => p && PRIVATE_IPV4.test(String(p.host))).map((p) => ({
      host: String(p.host), ok: !!p.ok, reflected: !!p.reflected,
      response: p.responseHex ? String(p.responseHex).replace(/[^0-9A-Fa-f]/g, '').slice(0, 120) : null,
      error: p.error ? String(p.error).slice(0, 40) : null,
      raw: p.rawHex ? String(p.rawHex).replace(/[^0-9A-Fa-f]/g, '').slice(0, 1200) : null,
    })),
    device_ip_hint: body?.device ? String(body.device).slice(0, 40) : null,
  };
}

module.exports = {
  summarizeDiscovery, saveDiscoveredHost, TIMEOUT_MS, terminalConfig, createSale, recover, checkStatus, createVoid, applyResponse, link, markManual, createEcho, publicRow,
  kioskLabel, isKioskTxnOf, transactionRef };
