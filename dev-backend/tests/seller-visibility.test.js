// 판매자 시야 판정 (2026-11-17 Fable 설계 «seller hold») — utils/sellerVisibility · services/poRealtimeService.emitPoEvent
const { sellerHoldOf, isVisibleToSeller, sellerActionBlock } = require('../utils/sellerVisibility');
const { emitPoEvent } = require('../services/poRealtimeService');

const ev = (status, extra = {}) => ({ at: '2026-11-16T10:00:00.000Z', status, note: '', ...extra });
const po = (status, events) => ({ id: 1, po_number: 'PO-T', status, seller_type: 'brand', seller_entity_id: 7, entity_type: 'restaurant', entity_id: 3, tracking_info: { events } });

describe('sellerHoldOf', () => {
  test('판매자 인상 → hold seller_raise', () => {
    const p = po('pending_approval', [
      ev('submitted'),
      ev('amended', { total_increased: true }),
      ev('pending_approval', { raised_by_seller: true, status_before: 'submitted', total_before: 909.8, total_after: 1074.3 })
    ]);
    const h = sellerHoldOf(p);
    expect(h).toMatchObject({ cause: 'seller_raise', status_before: 'submitted', total_before: 909.8, total_after: 1074.3 });
    expect(isVisibleToSeller(p)).toBe(true);
    expect(sellerActionBlock(p)).toMatchObject({ http: 409, code: 'AWAITING_OWNER_APPROVAL' });
  });

  test('매장이 보낸 뒤 수정 → buyer_edit · 오너 승인취소 → owner_revoke', () => {
    expect(sellerHoldOf(po('pending_approval', [ev('submitted'), ev('confirmed'), ev('pending_approval', { edited_by_buyer: true, status_before: 'confirmed' })])).cause).toBe('buyer_edit');
    expect(sellerHoldOf(po('pending_approval', [ev('pending_approval'), ev('submitted', { owner_signed: true }), ev('pending_approval', { approval_revoked: true, status_before: 'submitted' })])).cause).toBe('owner_revoke');
  });

  test('N1 한 번도 안 나간 승인 대기 → null · 404', () => {
    const p = po('pending_approval', [ev('pending_approval', { note: 'Awaiting Owner approval' })]);
    expect(sellerHoldOf(p)).toBeNull();
    expect(isVisibleToSeller(p)).toBe(false);
    expect(sellerActionBlock(p)).toMatchObject({ http: 404, code: 'NOT_FOUND' });
  });

  test('첫 승인 대기 중 매장 수정(status_before pending_approval) → 여전히 비공개', () => {
    expect(sellerHoldOf(po('pending_approval', [ev('pending_approval'), ev('pending_approval', { edited_by_buyer: true, status_before: 'pending_approval' })]))).toBeNull();
  });

  test('N2 hold 중 매장이 한 번 더 고침 → 시작까지 거슬러 가 hold 유지', () => {
    const p = po('pending_approval', [
      ev('submitted'),
      ev('pending_approval', { raised_by_seller: true, status_before: 'submitted' }),
      ev('amended'),
      ev('pending_approval', { edited_by_buyer: true, status_before: 'pending_approval' })
    ]);
    expect(sellerHoldOf(p)).toMatchObject({ cause: 'seller_raise' });
  });

  test('N3 hold → 반려(draft) → 다시 보냄 → null', () => {
    const p = po('pending_approval', [
      ev('submitted'),
      ev('pending_approval', { raised_by_seller: true, status_before: 'submitted' }),
      ev('draft', { note: 'Rejected by Owner: x' }),
      ev('pending_approval', { note: 'Awaiting Owner approval' })
    ]);
    expect(sellerHoldOf(p)).toBeNull();
  });

  test('draft · 다른 상태 · tracking 문자열/없음', () => {
    expect(sellerHoldOf(po('draft', [ev('submitted')]))).toBeNull();
    expect(isVisibleToSeller(po('draft', []))).toBe(false);
    expect(sellerHoldOf(po('submitted', [ev('submitted')]))).toBeNull();
    expect(isVisibleToSeller(po('submitted', []))).toBe(true);
    expect(sellerActionBlock(po('submitted', []))).toBeNull();
    const s = { status: 'pending_approval', tracking_info: JSON.stringify({ events: [ev('submitted'), ev('pending_approval', { raised_by_seller: true, status_before: 'submitted' })] }) };
    expect(sellerHoldOf(s)).toMatchObject({ cause: 'seller_raise' });
    expect(sellerHoldOf({ status: 'pending_approval', tracking_info: null })).toBeNull();
    expect(sellerHoldOf({ status: 'pending_approval', tracking_info: '{bad' })).toBeNull();
  });
});

describe('emitPoEvent 판매자 룸', () => {
  function fakeReq() {
    const sent = [];
    const io = { of: () => ({ to: (room) => ({ emit: (name, payload) => sent.push({ room, name, payload }) }) }) };
    return { req: { app: { get: () => io } }, sent };
  }
  const sellerSends = (sent) => sent.filter(x => x.room.startsWith('seller_'));

  test('한 번도 안 받은 승인 대기 → 판매자 룸 0회', () => {
    const { req, sent } = fakeReq();
    emitPoEvent(req, po('pending_approval', [ev('pending_approval')]), 'seller-order-updated');
    expect(sellerSends(sent)).toHaveLength(0);
    expect(sent.some(x => x.room.startsWith('buyer_'))).toBe(true);
  });

  test('hold → 판매자 룸 1회(내용 포함)', () => {
    const { req, sent } = fakeReq();
    emitPoEvent(req, po('pending_approval', [ev('submitted'), ev('pending_approval', { raised_by_seller: true, status_before: 'submitted' })]), 'seller-order-updated');
    const s = sellerSends(sent);
    expect(s).toHaveLength(1);
    expect(s[0].payload.status).toBe('pending_approval');
  });

  test('반려로 시야에서 나감 + sellerSawBefore → removed 만', () => {
    const { req, sent } = fakeReq();
    emitPoEvent(req, po('draft', [ev('submitted'), ev('draft')]), 'seller-order-updated', { sellerSawBefore: true });
    const s = sellerSends(sent);
    expect(s).toHaveLength(1);
    expect(s[0].payload).toEqual(expect.objectContaining({ id: 1, removed: true }));
    expect(s[0].payload.tracking_info).toBeUndefined();
    expect(s[0].payload.total_amount).toBeUndefined();
  });

  test('반려인데 판매자가 본 적 없음 → 0회', () => {
    const { req, sent } = fakeReq();
    emitPoEvent(req, po('draft', [ev('draft')]), 'seller-order-updated', { sellerSawBefore: false });
    expect(sellerSends(sent)).toHaveLength(0);
  });
});
