# Fable 게이트 판정 — 2026-10-04 카드단말기 Void(A2) · Direct 실패 분류(B0·CA·HTTP BUSY) · 직원 발주 권한 (SW 5.81)

**판정: PASS** (조건 = 배포 뒤 운영 실측 §5, 코드 조건 아님)
판정자: Fable 5.1 · 설계 `.claude/fable-design-20261004-terminal-void-direct.md` · 작성 2026-10-04 16:3x UTC
Irene 원문 「뭘 내 승인을 기다린대. fable이 뭐라는데?」 = 진행 지시로 받음(설계 승인 대기 생략).

## 1. 왜 게이트 대상인가
`check-sensitive-diff`: ② 돈·주문 무결성 `PaymentModal.tsx` · ⑤ 보안 경계 `middleware/buyerScope.js` · ⚠ 안전망 `health-check.js`(신규 케이스). 🔒 보호파일 접촉 **0**(`check-print-guard` 8/8 변경 없음 — bless 불필요).

## 2. 내가 직접 확인한 것

### 2-1. diff 범위 대조 — 설계 외 변경 1건(수용), 그 외 설계 §5 표와 일치
29건(수정 25 · 미추적 4) 전부 읽음.
- `utils/ghlEcr.js`: `classifyStatus` B0·CA → declined(주석에 운영 tx29→30 사고 근거) · `parseHttpRaw`(상태줄 필수 · 본문이 STX/«02…» hex 프레임이면 null — 프레임을 HTTP 로 오인하지 않음) · export. 다른 함수 무접촉.
- `services/terminalPayments.js`: `isCounted`(approved|manual + order_payment_id 또는 `orders.transaction_id === ref`) · `VOIDABLE` 6상태 · `createVoid`(sale 만 · voided→409 ALREADY_VOIDED · counted 면 `userCanVoid` + `enforceVoidPin` — 주문 취소와 **같은 함수** 재사용) · `applyResponse` 무응답 분기 HTTP 해석(4xx **and** `row.command==='sale'` 만 declined · `H400`/`HTTP 400 BUSY`) · void 자식→부모 전이(00·C5→voided, 미확인 부모만 pick · C3 는 미확인 부모만 declined · 그 외 불변). 기존 5겹 방어(CRC·명령·금액·송장·AMOUNT_MISSING)는 void 자식에도 그대로 걸린다(`CMD_OF.void` 기존).
- `routes/terminal-payments.js`: `/void` 1개(loadTxn 매장접근 → svc → `terminal_void` 감사) · `GET /transactions` `order_id`(정수 검증)·`command` 필터. 라우터 공통 `requirePaymentAccess` 유지.
- 화면: `terminalVoid.ts` 신설(none/voided/no-bridge/failed/unknown — 설계 §3-3 그대로, 승인 조회 실패는 `[]` = 오늘과 같은 취소) · `terminalSale.ts`(roundTrip export · `voidTerminalTxn` · failText 코드→키 · E6 H4xx 3초 뒤 1회) · LiveOrders/TableDetailPanel: **PATCH 앞** 삽입, 오프라인 분기 무접촉, 실패·무응답 → return(주문 그대로), 낙관적 `patchOrderLocal` 을 Void 뒤로 이동, 취소표 인쇄 코드 diff 0줄(`git diff … | grep -c print` 로 확인: 삽입부에 인쇄 호출 없음).
- **설계와 다른 판단 1건 — 수용**: `PaymentModal.canConfirm` 에 `useTerminal && terminalIssue?.kind==='voided' → false`. 비분할 Confirm 이 오류 뒤에도 켜져 있던 기존 동작(재시도 역할) 때문에 «취소 뒤 잠김»(설계 A-2) 을 만들려면 필요했다. 분할 경로는 기존 `else return` 으로 이미 막힘. 돈 방향은 더 보수적(기록 안 함) → 회귀 아님.
- 직원 발주: `App.tsx` PO 라우트 7개 전부 Staff 포함(history·:id·print 는 이미 있었음 — 직원이 목록→상세로 들어가도 튕기지 않음 확인) · `buyerScope.requireBuyerRole` Staff + `/api/purchase-orders*` + `inventory` 없음 → 403(재료·공급업체 라우터엔 안 걸림 — 의도 주석 있음) · StaffPage 라벨 1줄.
- `user.restaurantId`(camelCase) 가 LiveOrders 의 void 호출 조건 — AuthContext 561/642 가 `restaurant_id → restaurantId` 로 매핑, 같은 파일 261/289 도 같은 키 사용 → 조건이 항상 거짓이 되는 함정 아님(e2e J 가 `A2` 를 실제로 쐈다).

### 2-2. 가드·게이트 (내가 재실행)
- `jest tests/ghl-ecr.test.js` **39/39** — Void 프레임(ack 0x10) = 규격 §9.7 요청 바이트·CRC 9622 동일(설계 때 내가 실측한 값과 테스트가 같은 걸 고정).
- `health-check --category=terminal` **11/11**(기존 8 + 신규 3 — 403/400/201→voided/새 결제 허용/C5 멱등/409 · 고아 PIN 면제/미확인 C3 declined/승인 C3 불변 · B0 declined/복구 409/BUSY declined+원인/Reprint BUSY comm_error).
- **e2e J·K·L·M 4/4 를 실브라우저로 내가 재실행**(`--config e2e/playwright.config.js`, retries 0, 11.6초). K 본문 읽음: 첫 Void 무응답 뒤 «주문은 그대로» 를 API 로 확인하고 두 번째 취소에서 C5 행 존재를 검사 — 비공허.
- `check-print-guard` 8/8 변경 없음 · `check-sensitive-diff` ②⑤ 대상 판정 정상 · `i18n:verify` Errors 0 · 4언어 pos 17키·orders 4키 각각 동일 수.
- 서빙 번들: `dev-frontend-build/sw.js` = `5.81-terminal-void-staff-po-20261004`, 번들 chunk 에 `cardTerminal.void.safeCancel`·`/void` 포함. pm2 dev-backend uptime 34m > 서버 파일 마지막 수정(15:57) → 현재 코드가 돌고 있다.
- **고장주입(내가 1건, 반증)**: `classifyStatus` 에 `B0→comm_error` 되돌림 → jest **1 failed/39** → cp 원복 `cmp` 동일 → 39/39. 팀원 보고 서버 4건·화면 1건(e2e K 실패 재현)은 바뀐 줄을 겨눈 것으로 읽혀 수용.
- `verify-all --full 24/24`·`×3` 반복은 팀원 보고 수용(번들·SW·e2e 내 재실행으로 교차 확인).

### 2-3. 규격·설계 대조
- Void 는 C013 ECR 송장(GHL 테스트 1.2~4.2 «Void(ECR Invoice Num)») · 응답 «Sale 과 같은 꼴» → 금액·송장 대조 통과. C5(이미 취소)=voided 멱등은 테스트 8.3 «Transaction already Void» 와 일치.
- C1 Cancellation 미구현(규격에 형식 없음) — 설계대로 보류, 문구 유지.

## 3. 받아들인 한계 (확인 불가 — 추측하지 않음)
1. **실단말기 Void 응답·영수증** — 은행 연결이 B0 라 승인 자체가 아직 없어 못 봄. 목 단말기 + 규격 샘플 바이트 일치까지만.
2. **«HTTP 4xx = 처리 전 거절»** 은 운영 1건 + HTTP 의미론 위의 판단 — §5 ③ 반증 절차로 운영에서 확인. 틀리면 1줄(`comm_error`) 되돌림.
3. 서버가 «Void 안 된 승인이 있는 주문 취소» 를 막지 않음(🔒 orders-crud 무접촉) — 오늘과 같은 틈, 매장 손실 방향 아님. 다음 orders-crud 정식 변경 때.
4. 사유 없는 모드(`requireCancelReason 'off'`)의 확인창엔 «카드도 함께 취소» 안내 1줄이 없다(동작은 동일하게 Void 함) — 문구 누락, 후속.

## 4. 마커 순서
보호파일 변경 0 → bless 없음. 이 판정문(미추적 → 지문 포함) 저장 → `fable-gate.js pass`. **이 뒤 저장소 파일을 한 줄이라도 고치면 마커가 죽는다** — session-state.md 만 예외. 배포 기록 커밋은 배포 후.

## 5. 배포 뒤 운영 실측(Irene 눈 + 팀원 운영 읽기 — 코드 조건 아님)
① 단말기 자체 메뉴 RM1(POS 없이) — time-out 이면 GHL(TID 활성·단말기 네트워크), POS 무관.
② ①OK 면 POS RM1(신용카드/QR) 승인 → LiveOrders 취소 → 단말기 Void 영수증 · 주문 cancelled · `terminal_transactions` 부모 voided(읽기).
③ 단말기 메뉴를 열어 둔 채 POS 결제 → «단말기가 바빠서…» → 단말기 배치에 거래 **0**(있으면 §2-2 4xx 규칙 되돌림).
④ 같은 주문 취소 두 번 → 영수증 1장(C5).
⑤ 직원 계정 «Stock Management» 켜고 Operations › Purchase Order 열림, 끄면 메뉴 없음 + API 403.
