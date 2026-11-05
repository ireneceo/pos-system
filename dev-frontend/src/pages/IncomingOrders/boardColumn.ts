// 판매자 «주문 준비 보드» 칸 배치 (2026-11-05 Fable 판정 .claude/fable-verdict-20261105-bg-order-kds.md Ⅱ-3)
//   카드 자리는 «가장 덜 끝난 품목» 기준 한 칸 — 주방화면 «주문 보기» 와 같은 원리(코드는 가져오지 않음).
//   순수 함수 — 화면·jest 가 같이 쓴다.

export type BoardColumn = 'new' | 'preparing' | 'ready' | 'shipped' | 'done';

export const BOARD_COLUMNS: BoardColumn[] = ['new', 'preparing', 'ready', 'shipped', 'done'];

export interface BoardLine {
  is_service?: boolean;
  shipped_at?: string | null;
  prepared_at?: string | null;
}

export interface BoardRow {
  status: string;
  is_service_only?: boolean;
  shipped_at?: string | null;
  unshipped_count?: number;
  unprepared_count?: number;
  items?: BoardLine[];
}

const HIDDEN = new Set(['cancelled', 'rejected', 'draft', 'pending_approval', 'delivery_failed']);
const DONE = new Set(['delivered', 'received', 'closed']);

/** 서버 값 우선, 없으면 줄로 센다. 백필 전 옛 전량 출고(헤더만 기록)는 «다 보냄». */
export function lineCounts(row: BoardRow): { unshipped: number; unprepared: number } {
  const items = Array.isArray(row.items) ? row.items : [];
  const legacyAllShipped = !!row.shipped_at && items.length > 0 && !items.some(it => it.shipped_at);
  let unshipped = 0;
  let unprepared = 0;
  for (const it of items) {
    if (it.is_service || it.shipped_at) continue;
    unshipped++;
    if (!it.prepared_at) unprepared++;
  }
  if (legacyAllShipped) { unshipped = 0; unprepared = 0; }
  return {
    unshipped: typeof row.unshipped_count === 'number' ? row.unshipped_count : unshipped,
    unprepared: typeof row.unprepared_count === 'number' ? row.unprepared_count : unprepared,
  };
}

/** 이 주문이 보드의 어느 칸에 서는지. null = 보드에 안 보임. («끝» 칸의 «오늘만» 거르기는 화면이 한다.) */
export function boardColumnOf(row: BoardRow): BoardColumn | null {
  const st = String(row.status || '');
  if (HIDDEN.has(st)) return null;
  if (st === 'submitted') return 'new';
  if (DONE.has(st)) return 'done';
  // 매장이 일부만 받음 — 아직 안 보낸 줄이 남았으면 판매자 할 일이 남은 것(게이트 F1 · 2026-11-05)
  if (st === 'partial_received') {
    if (row.is_service_only) return 'done';
    const { unshipped, unprepared } = lineCounts(row);
    if (unshipped === 0) return 'done';
    return unprepared > 0 ? 'preparing' : 'ready';
  }
  if (row.is_service_only) return st === 'confirmed' ? 'ready' : 'shipped';
  const { unshipped, unprepared } = lineCounts(row);
  if (unshipped === 0) return 'shipped';
  if (unprepared > 0) return 'preparing';
  return 'ready';
}
