/**
 * 발주에 붙이는 파일 — 공급업체 인보이스 · 영수증 (2026-10-30)
 *
 * 올리기 = 파일을 `/api/upload/files` 로 먼저 올리고 그 주소를 발주에 붙인다(다시 올리면 서버가 옛 파일을 지운다).
 * 떼기   = `DELETE /api/purchase-orders/:id/upload-{invoice|receipt}` (서버가 파일도 지운다).
 * 화면 4곳(발주 목록·발주 상세·청구서 창)이 같은 함수를 쓴다.
 * 실패는 `PoAttachmentError` — message 는 서버 문장(없으면 null) · stage 로 어느 단계인지.
 */
import { getAuthToken } from './auth';
import { getErrorMessage } from './apiError';

export type PoAttachmentKind = 'invoice' | 'receipt';

export class PoAttachmentError extends Error {
  stage: 'upload' | 'attach' | 'remove' | 'network';
  serverMessage: string | null;
  constructor(stage: PoAttachmentError['stage'], serverMessage: string | null) {
    super(serverMessage || stage);
    this.stage = stage;
    this.serverMessage = serverMessage;
  }
}

/** 화면이 보여 줄 문장 — 서버 문장이 있으면 그것, 없으면 fallback */
export const poAttachmentErrorText = (e: unknown, fallback: string): string =>
  e instanceof PoAttachmentError && e.serverMessage ? e.serverMessage : fallback;

const endpoint = (poId: number | string, kind: PoAttachmentKind) =>
  `/api/purchase-orders/${poId}/upload-${kind}`;

/** scopeUrl — 청구서 창처럼 스코프 꼬리표가 필요한 곳이 주소를 바꿔 끼운다 */
export async function attachPoFile(
  poId: number | string,
  kind: PoAttachmentKind,
  file: File,
  scopeUrl: (url: string) => string = (u) => u,
): Promise<void> {
  const token = getAuthToken();
  let up: Response;
  try {
    const fd = new FormData();
    fd.append('files', file);
    up = await fetch('/api/upload/files', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
  } catch {
    throw new PoAttachmentError('network', null);
  }
  const upData = await up.json().catch(() => ({}));
  if (!up.ok || !upData.success || !upData.data?.[0]) {
    throw new PoAttachmentError('upload', getErrorMessage(upData, '') || null);
  }
  const f = upData.data[0];
  let res: Response;
  try {
    res = await fetch(scopeUrl(endpoint(poId, kind)), {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: f.url, filename: f.originalName }),
    });
  } catch {
    throw new PoAttachmentError('network', null);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new PoAttachmentError('attach', getErrorMessage(data, '') || null);
}

export async function removePoFile(
  poId: number | string,
  kind: PoAttachmentKind,
  scopeUrl: (url: string) => string = (u) => u,
): Promise<void> {
  let res: Response;
  try {
    res = await fetch(scopeUrl(endpoint(poId, kind)), {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getAuthToken()}` },
    });
  } catch {
    throw new PoAttachmentError('network', null);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) throw new PoAttachmentError('remove', getErrorMessage(data, '') || null);
}
