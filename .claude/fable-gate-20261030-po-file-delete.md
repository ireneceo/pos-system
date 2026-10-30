# Fable 게이트 판정 — 발주 인보이스·영수증 다시 올리기·삭제 (2026-10-30 · 작업방 b93ac573)

요청서: `.claude/fable-request-20261030-po-file-delete.md` · Irene 원문 «영수증이나 인보이스를 업로드하면 재업로드 기능이 나와야 해. 그래서 재업로드하면 이전 거 그냥 삭제하면 될 것 같아. 삭제도 가능해야 하지 않아? 검토하고 적용해줘.»
게이트 사유: `check-sensitive-diff` ②(돈·주문 `purchase-orders-workflow.js`) + ⚠ 안전망(`health-check.js`) → 정정으로 ⑤(`buyerScope.js` 권한 문)까지. 개발서버만 · 운영 쓰기 0 · 마이그 0.

## 1. 판정 — **PASS (Fable 정정 1건 반영 후)**

| # | 변경 | 판정 |
|---|---|---|
| 1 | `utils/poUploadedFile.js`(새) — 옛 파일 치우기: 첨부 폴더 안(정규화 경로, `..` 차단) + 발주 두 칸·청구서 `invoices.receipt_url` 미참조일 때만 unlink · 실패해도 요청 성공 | **통과.** `routes/upload.js` 의 `ATTACHMENTS_BASE`·정규화와 같은 기준. 업로드 파일명이 `timestamp_random_이름` 이라 두 칸이 같은 주소를 쓰는 길은 수동 SQL 뿐 — 그래도 참조 검사를 넣은 쪽이 보수적이라 맞다. 다른 첨부 칸(comments·notices·support_tickets 등 `attachments`)은 검사 밖이지만 같은 이유로 공유될 길이 없다(남김). |
| 2 | `routes/purchase-orders-workflow.js` — upload-receipt/upload-invoice 에 `prevUrl !== url` 이면 치우기 · `DELETE …/upload-receipt`·`DELETE …/upload-invoice` 2개(칸만 비움, 대조·총액·결제 기록 그대로 · 없으면 400 `NO_RECEIPT`/`NO_INVOICE_FILE`) | **통과.** 경로 가드 `router.use('/purchase-orders', authenticateToken, requireBuyerRole)` 아래라 익명 401(실호출 2/2) · 남의 매장 발주 404(RA38 → 매장 2 발주 43339 실호출 2/2) · 소유 판정은 올리기와 같은 `checkPOOwnership`. 2026-10-09 A-3 «파일은 증거, 숫자는 장부» 유지. DB 칸을 비운 **뒤** 치우기라 자기 참조가 남지 않는다. |
| 3 | 화면 — `utils/poAttachment.ts`(올리기·떼기 한 함수) · `PoFileManageModal.tsx`(열기·다시 올리기·삭제, 삭제는 창 안 재확인) · 발주 목록 «영수증 보기»/«Invoice»(외부 인보이스·오너 제외) · 발주 상세 «Re-upload / delete»(오너 숨김) · 청구서 창 «Delete invoice file»(확인창) | **통과.** 공용 Modal/ModalButton · design-guard 신규 0 · i18n 4언어 일치 · tsc 신규 0 · mount sweep 크래시 0(verify-all --full) · 빌드 산출물에 새 문구·`fileManage` 키 들어감(`5184.*.chunk.js` · `locales/en/purchaseOrders.json`). 오너는 목록·상세에서 열기만(canEdit=false). |
| 4 | **정정(Fable)** `middleware/buyerScope.js OWNER_ACTING_ROUTES` 에 `DELETE /purchase-orders/:id/upload-invoice` 1줄 | **원래 diff 는 조건부.** 청구서 창은 오너에게도 «Delete invoice file» 을 보여 주는데(PO 상태만 봄) 서버 allowlist 에 POST 만 있어 **실호출 403** 이었다(POST 는 같은 스코프로 가드 통과 400). 문서는 «오너도 삭제 가능» 이라 적혀 있어 사실과 달랐다. 판정: 2026-10-09 A-6 «파일 붙이기는 되돌릴 수 있는 일» 과 같은 칸 — 다시 올리기가 이미 옛 파일을 지우므로 떼기의 힘이 더 크지 않다 → **허용이 맞다**(버튼 숨기기가 아니라). 영수증 떼기는 넣지 않음(오너 영수증 올리기도 없음 · 결제는 매장 몫 — 실호출 403 유지). |
| 5 | **정정(Fable)** `health-check.js` A5 — 임시 오너(데모 매장 ownership 행) 로 떼기 200 · 영수증 떼기 403 · 올리기 200 상시 검사 (finally 로 users·restaurant_managers 삭제) | **통과.** 고장주입: 4번 줄 제거 → `pm2 restart` → A5 **✗ (7/8)** → 원복(사본 cp) → **8/8**. |
| 6 | **정정(Fable)** `e2e/po-file-manage.spec.js` — ① 데모 발주가 원래 가리키던 파일 **바이트를 들고 있다가 끝에 되돌림**(DB 만 되돌리면 첫 올리기가 지운 파일이 빈 링크로 남았다 — 실제로 06:23 에 손으로 다시 만든 흔적) ② 발주에 인보이스가 이미 있으면 목록 «Upload Inv.» 단계 건너뜀(있으면 그 칸이 «Invoice» 버튼이라 input 이 없다 — 팀원이 실브라우저 확인으로 46664 에 파일을 붙인 뒤 1번 테스트가 15초 timeout 으로 떨어졌다, 재현 1회) | **통과.** 2건 × 2회 4/4 · 끝난 뒤 46664 행·파일 모두 원래대로(파일 mtime 갱신 = 되돌리기가 실제로 돌았다). |
| 7 | `docs/PURCHASE_ORDER_SYSTEM.md` 끝 절 + Fable 정정 1줄 · 4언어 locale | **통과.** |

- 🔒 인쇄 보호파일 접촉 0(print-guard 8/8 · ① 1건 `MainLayout.tsx` 는 다른 방) · KDS 접촉 0 · 마이그 0 · 운영 DB 접촉 0.
- `check-sensitive-diff` 의 ③ DB 4건·⑤ `validation.js`·`server.js`·`settingsGuard.js` 는 **다른 방 변경**(각자 게이트) — 이 판정은 위 7줄만 본다.

## 2. 검증 (4조항 · Fable 직접 돌린 것만 숫자, 팀원 실측은 «팀원 보고대로»)

1. **diff 대조** — 요청서 파일 목록 밖 변경 0. Fable 정정 3파일(buyerScope 3+ · health-check A5 재구성 · e2e 2곳)은 이 문서 §1-4~6 에 근거.
2. **가드 반증** — Fable 1회(§1-5). 팀원 1회(참조 검사·폴더 검사 제거 → A5 ✗ → 원복)는 팀원 보고대로.
3. **실호출·실브라우저** — health-check `invoice-actions` **8/8**(정정 뒤 2회) · `security` **105/105** · 익명 DELETE 2/2 401 · 오너 스코프 DELETE 인보이스 **정정 전 403 → 정정 뒤 200**(A5) · 오너 스코프 DELETE 영수증 403 · RA 남의 매장 404 2/2 · e2e 4/4 · 인스펙션 **신규 0**(verify-all 당시 신규 1 = 팀원 확인용 발주 52221 줄 재고 타깃 없음 → 팀원이 데모 재료 20618 로 연결, Fable 재실행 2회 신규 0) · mount sweep 크래시 0 은 verify.txt(712s) 그대로.
4. **배포 안전성** — 마이그 0 · 롤백 = 파일 되돌리기 · 프론트 변경 있음 → **SW 버전 올리기 + releases 기록 7칸은 /개발완료 몫**(`deploy-ready` 가 지금 그 2건으로 ✗ 인 것이 정상). 운영 `uploads` 경로는 `routes/upload.js` 와 같은 `/var/www/uploads/attachments` 가정 — 새 가정 아님.

## 3. 확인 못 한 것
- 운영 매장의 다른 테이블이 `/uploads/attachments/` 주소를 발주 칸과 공유하는지 — 운영 DB 읽지 않음. 파일명 생성 규칙상 공유 불가라 판단(§1-1).
- 팀원 스크린샷 2장(청구서 창)은 다시 열지 않음(화면 변경은 mount sweep + e2e 로 덮임).

## 4. Irene 에게 물을 것 — **없음**
오너 삭제 허용은 이미 Irene 이 2026-10-09 «권고대로» 로 정한 A-6 의 같은 칸이라 새 결정이 아니다.

## 5. 마커
- 이 판정문을 쓴 뒤 Fable 이 `fable-gate.js pass` 를 찍는다. 지문은 작업공간 전체(다른 방 미커밋 — 수익성·매장 관리자 검색·GTM·🔒 MainLayout·fable-design/gate 문서 2개 — 포함, 그것들은 이 판정 대상 아님). 어느 방이든 한 줄 고치면 마커는 죽는다(정상).
- 팀원 할 일: `.claude/session-state.md`(지문 제외) 갱신 · 보고 ✅ «운영 반영: 다음 배포 때» · /개발완료 에서 SW 버전·releases 기록 → 그때 지문이 바뀌므로 **마커는 /개발완료가 코드 외 2파일만 바꾼 뒤 `fable-gate.js status` 로 보고 Irene 이 배포 방에서 판단**(코드 변경이 없으면 이 판정이 그대로 유효하다 — 판정문 §1 표 대조로 가른다).
