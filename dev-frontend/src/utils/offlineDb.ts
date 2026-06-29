/**
 * offlineDb — 오프라인 모드 3단계: IndexedDB 저수준 래퍼.
 *
 * 설계: docs/OFFLINE_MODE_DESIGN.md §2·§3 (LocalStore). localStorage 가 아닌 IndexedDB 를
 * 쓰는 이유 = 용량(수천 주문)·동시성(트랜잭션 격리)·영속성(정전 후 재부팅 생존).
 *
 * 이 파일은 "DB 손잡이"만 제공한다(스키마 + 트랜잭션 + 단건 헬퍼). 주문/op 로그의
 * 의미(시퀀스·멱등·동기화 상태)는 offlineStore.ts 가 이 위에 얹는다.
 *
 * 인쇄 무관 — 데이터 계층일 뿐 billPrint 무접촉.
 */

export const DB_NAME = 'purple_pos_offline';
export const DB_VERSION = 1;

export const STORE_ORDERS = 'offline_orders'; // keyPath: localId
export const STORE_OPS = 'offline_ops';       // keyPath: opId, index: seq / synced
export const STORE_META = 'offline_meta';     // keyPath: key  (seq 카운터·마이그 플래그 등)

let _dbPromise: Promise<IDBDatabase> | null = null;

/** 브라우저에 IndexedDB 가 있는지(SSR·구형 브라우저·프라이빗모드 차단 대비). */
export function isIDBAvailable(): boolean {
  try {
    return typeof indexedDB !== 'undefined' && indexedDB !== null;
  } catch {
    return false;
  }
}

/** DB 싱글톤 오픈. 스키마 생성은 onupgradeneeded 에서. */
export function openDb(): Promise<IDBDatabase> {
  if (_dbPromise) return _dbPromise;
  _dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    if (!isIDBAvailable()) {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    let req: IDBOpenDBRequest;
    try {
      req = indexedDB.open(DB_NAME, DB_VERSION);
    } catch (e) {
      reject(e);
      return;
    }
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_ORDERS)) {
        db.createObjectStore(STORE_ORDERS, { keyPath: 'localId' });
      }
      if (!db.objectStoreNames.contains(STORE_OPS)) {
        const ops = db.createObjectStore(STORE_OPS, { keyPath: 'opId' });
        // 재생 순서용. seq 는 매장 단조증가(offlineStore 가 META 카운터로 발급).
        ops.createIndex('seq', 'seq', { unique: false });
        // 미동기화 조회용. IndexedDB 키는 boolean 불가 → synced 는 0|1 숫자로 저장한다.
        ops.createIndex('synced', 'synced', { unique: false });
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: 'key' });
      }
    };
    req.onsuccess = () => {
      const db = req.result;
      // 다른 탭이 버전 올리면 이 연결을 닫아 blocked 방지(다음 openDb 가 재오픈).
      db.onversionchange = () => {
        try { db.close(); } catch { /* ignore */ }
        _dbPromise = null;
      };
      resolve(db);
    };
    req.onerror = () => reject(req.error || new Error('IndexedDB open failed'));
    req.onblocked = () => { /* 다른 탭이 옛 버전 보유 — 닫히면 자동 진행 */ };
  });
  return _dbPromise;
}

/** IDBRequest → Promise. */
export function reqToPromise<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/** 트랜잭션 완료(쓰기 확정) 대기. 쓰기는 request.onsuccess 가 아니라 tx.oncomplete 가 영속 확정 신호. */
export function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('tx error'));
    tx.onabort = () => reject(tx.error || new Error('tx aborted'));
  });
}

// ── 단건 헬퍼(단일 스토어) ────────────────────────────────────────────────
export async function idbPut(store: string, value: any): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, 'readwrite');
  tx.objectStore(store).put(value);
  await txDone(tx);
}

export async function idbGet<T = any>(store: string, key: IDBValidKey): Promise<T | undefined> {
  const db = await openDb();
  const tx = db.transaction(store, 'readonly');
  return reqToPromise<T>(tx.objectStore(store).get(key) as IDBRequest<T>);
}

export async function idbGetAll<T = any>(store: string): Promise<T[]> {
  const db = await openDb();
  const tx = db.transaction(store, 'readonly');
  return reqToPromise<T[]>(tx.objectStore(store).getAll() as IDBRequest<T[]>);
}

export async function idbDelete(store: string, key: IDBValidKey): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, 'readwrite');
  tx.objectStore(store).delete(key);
  await txDone(tx);
}

export async function idbClear(store: string): Promise<void> {
  const db = await openDb();
  const tx = db.transaction(store, 'readwrite');
  tx.objectStore(store).clear();
  await txDone(tx);
}

/** uuid (crypto 가용 시) — 폴백 포함. localId·opId·idempotencyKey 공용. */
export function genId(prefix = ''): string {
  try {
    if (typeof crypto !== 'undefined' && (crypto as any).randomUUID) {
      return prefix + (crypto as any).randomUUID();
    }
  } catch { /* ignore */ }
  return prefix + Date.now().toString(36) + '-' +
    Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
}

/** 테스트/디버그용 — DB 전체 삭제(데모 검증 후 정리). */
export async function deleteOfflineDb(): Promise<void> {
  try {
    if (_dbPromise) {
      const db = await _dbPromise;
      try { db.close(); } catch { /* ignore */ }
    }
  } catch { /* ignore */ }
  _dbPromise = null;
  if (!isIDBAvailable()) return;
  await new Promise<void>((resolve) => {
    const req = indexedDB.deleteDatabase(DB_NAME);
    req.onsuccess = () => resolve();
    req.onerror = () => resolve();
    req.onblocked = () => resolve();
  });
}
