# [Fable 판정] GHL 카드단말기 ECR 1단계 + 보고서 결함 수정 — 게이트 2회차 (2026-10-01)

> 대상: 운영 배포 스냅샷(9d69e5bfe, v3.107) 이후 3커밋 — 4abacd179 · a40e6e659 · 355b61475. 워킹트리 clean.
> 설계: `.claude/fable-design-20261001-ghl-ecr.md`(1회차 + «추가 판정 — 결제수단 선택») · 기준 문서 `docs/CARD_TERMINAL_ECR_DESIGN.md`.
> 작성: Fable 5.1 · 코드 수정 0 · 운영 쓰기 0 · 규격서 사본은 스크래치에만(저장소 반입 없음 확인).
> 호출 횟수: 이 사안 2회차(설계 1 + 게이트 1). 이것으로 이 사안의 Fable 호출은 끝 — 아래 R1·R2 수정은 실단말기 테스트 결과(D-5 분기)와 **한 묶음**으로 다음 1회에 넣는다.

---

## 0. 판정 한 줄

**PASS — 운영 배포 가능(마커 발급). 단, 조건 2개.**
1. **운영 매장 어디서도 `card.terminal.enabled` 를 켜지 않는다**(파일럿 포함) — 아래 R1·R2 를 고쳐 게이트를 다시 받기 전까지. 지금 운영은 기본값 꺼짐(`Restaurant.js` getter `terminal.enabled:false`, `terminalConfig` 는 host 비면 꺼짐 → `/transactions` 409 — health-check 실측)이라 **켜지 않은 매장 변화 0** 이 증명됐다.
2. 배포 뒤 Irene 2026-10-02 실단말기 테스트는 **개발서버 + 개발용 APK(.dev)** 로 한다(이미 그렇게 준비돼 있음). 운영 매장 결제 창에는 아무 변화가 없어야 하고, 배포 후 스모크에서 결제 창 버튼이 «Card» 그대로인지 1회 눈 확인.

배포를 막지 않는 이유: 이 배포의 **운영 가치는 보고서 결함 수정**(Owner·Foodcourt 보고서가 기간에 주문이 있으면 ErrorBoundary — 09-17 f44885685 부터 운영에 살아 있음)이고, 단말기 기능은 운영에서 **잠들어 있는 코드**다. R1 은 단말기를 켠 매장에서만 성립한다.

---

## 1. 내가 직접 실측한 것 (팀원 보고를 믿지 않고 다시 돌림)

| # | 항목 | 결과 |
|---|---|---|
| ① | diff 범위 대조 — `git diff --stat 9d69e5bfe..HEAD` 47파일 전부 설계 절단면(§3-1~3-5 · 추가 판정 D-1~D-9) 안인지 파일 단위로 대조 | **설계 밖 변경 2건, 둘 다 팀원이 결과에 붙여 보고한 것** — (a) 보고서 import 2줄(운영 결함, 아래 §2) (b) health-check 정리 보강(order_actions 선삭제). 🔒 8개 보호파일 접촉 0 (`check-print-guard` 8/8 내가 재실행). `orderPaymentLedger.js`·`mallSalesService.js`·`orders-crud`·`POSTerminalPage` 0줄 — `git diff --stat` 에 없음 |
| ② | `check-sensitive-diff` | ②돈(PaymentModal·terminalPaymentLink) ③DB(모델·마이그) ⑤보안(server.js 마운트 1줄) — 게이트 대상 맞음 |
| ③ | `npx jest tests/ghl-ecr.test.js` | 28/28 |
| ④ | **고장주입(내가 1건 직접)**: `parseFrame` 의 CRC 검사 1줄 제거 → jest **1 failed / 27 passed** → `cp` 원복 `cmp` 동일 → `git status` clean | 판정 기계가 살아 있음을 반증으로 확인. 팀원의 7건(금액·멱등 두 겹·사설망·D018·분류·원장 매칭)은 보고로만 받음 — 방법(주입→확인→cp 원복→pm2 restart)이 규율에 맞아 재현 생략 |
| ⑤ | `health-check --category=terminal` | 5/5 (익명 401 · 타매장 403 · 잔액 초과 400 · CRC/금액/송장 위변조 422 상태 불변 · 응답 2회 deduped · DOUBLE_APPROVAL 409 · Reprint 복구 · C3→not_found · EA→Check Status · 수동 사유/수단 400 · TnG→ewallet/tng 원장 연결 · 주소 저장 한 칸만) · 잔재 0 |
| ⑥ | `desktop-pos/test/ecr-units.js` | 14/14 |
| ⑦ | `verify-all`(표준, --full 은 팀원 24/24 보고) | **23/23** — 타입 기준선·i18n 4언어·IDOR·마이그 레지스트리·배포 준비(릴리즈 JSON 7칸)·계약 테스트·health 전체 포함 |
| ⑧ | i18n | `pos.json` cardTerminal.* 29키 en/ko/zh/ms 전부 29 |
| ⑨ | 설정 보존 | `normalizePaymentSettings` 가 `card` 를 spread 로 보존 → `terminal` 키 살아남음(wipe 잠금과 충돌 없음). `saveDiscoveredHost` 는 raw JSON 에 host 한 칸만 — health 실측 «주소 외 다른 설정 불변» |
| ⑩ | 배포 경로 | 마이그 레지스트리 `deploy` 등록 → 매 배포 멱등(CREATE IF NOT EXISTS + information_schema 뒤 ADD COLUMN) · sync-database 는 --alter 없이 돌아 `unique:true` 중복 인덱스 걱정 없음 · `check-enum-parity` 는 운영에 없는 표를 건너뛰고 신규 표는 «마이그 없는 스키마» 검사가 보는데 마이그가 있어 통과 · SW 5.71 bump · 롤백 = 코드 되돌리기(표는 남아도 무해) |
| ⑪ | 개발용 APK 노출 경로 | `dev-frontend-build/dev-apps/` — 운영 rsync 원본은 `dev-frontend/build/`(여기 없음), desktop 동기화는 `dev-frontend-build/desktop/`(여기 아님), `deploy-dev.sh` 는 static 만 지움 → **운영 유출·빌드 소실 둘 다 없음**. 릴리즈 JSON remaining 의 «desktop/PurplePOS-dev-ecr.apk 삭제» 는 옛 위치 문구 — 실파일은 dev-apps 에만 있음(desktop/ 에는 7월 정식 APK 2개뿐) |
| ⑫ | 보고서 결함 증거 | 스냅샷 커밋 `git show 9d69e5bfe:…FoodcourtReportsPage.tsx` — `isRevenueOrder(` 사용 1 · `from '../../utils/orderRevenue'` import **0**. Owner 도 동일(:549·:555). 수정은 import 1줄씩, `verify-all` «매출 정의 단일» 게이트 통과 |

---

## 2. 설계 대비 이탈·결함 (심각도 순)

### R1 🔴 분할 결제 경로 — 단말기 결과가 «거절/미확인» 인 뒤에도 승인 없이 카드 기록이 된다 (설계 §3-4 위반 · **파일럿 전 수정 필수**)
`PaymentModal.tsx` `handleSplitConfirm`:
```ts
if (useTerminal && !terminalIssue) { …runTerminal… }
else if (useTerminal && terminalIssue && manualTender.method) { applyTenderToBody(…수동…) }
// ↓ 두 분기 다 아니면(= 거절 뒤, 또는 미확인인데 수단 안 고름) 그대로 POST /orders/:id/payments 로 간다
```
- 거절(`terminalIssue.kind==='declined'`) 상태에서 **footer «Confirm Payment»** 가 `canConfirm` 분할-card 분기 `(useTerminal && !terminalIssue) || !requireCardType || !!cardType` 로 **활성**(requireCardType 기본 false) → 카드종류 칩도 `!(useTerminal && !terminalIssue)` 라 다시 보임 → 누르면 **단말기 승인 0 · 수동 감사기록 0** 인 카드 분할 결제가 원장에 기록된다.
- 미확인(`unknown`) 상태에서도 «수동 기록» 버튼 대신 footer Confirm 을 누르면 같은 경로(수단을 골랐으면 `/manual` 없이 수동 수단만 실림).
- **전액 경로는 안전** — `handleConfirm` 은 `if (useTerminal) { runTerminal…; return }` 라 이슈 상태와 무관하게 항상 단말기를 다시 탄다.
- 고치는 법(팀원 몫, 2~3줄): 분할 경로도 전액과 같은 규칙 — `useTerminal` 이면 (a) `terminalIssue` 가 없을 때만 단말기 재시도, (b) 수동은 `handleTerminalManual` 을 거친 호출에서만(플래그 1개) 수단을 싣고, (c) 그 밖은 `return`. `canConfirm` 분할-card 분기에서 `useTerminal && terminalIssue` 면 false. 증명: e2e 에 **분할 + 거절 → Confirm 눌러도 원장 0** 1건 추가(지금 e2e B 는 전액 경로만).
- 왜 지금 배포를 막지 않나: 단말기 켠 매장이 운영에 0 — 켜기 전까지 성립하지 않는 결함. 단, **이 수정 없이 파일럿 매장 활성화 금지.**

### R2 🟠 «이중 승인 의심» 경고가 화면에 없다 + 같은 주문 재승인을 서버가 미리 막지 않는다 (설계 §3-4 «두 번째 승인은 link 거부 + 경고» 절반만 구현)
- 서버는 `link()` 에서 `DOUBLE_APPROVAL` 409 를 내고 `applyResponse` 가 `link_error` 로 돌려주지만 **프론트가 `link_error` 를 읽는 곳이 0**(`grep link_error dev-frontend/src` = 0). 캐셔는 두 번째 승인이 주문에 안 붙은 걸 모른다 → 손님은 두 번 긁혔는데 Void 안내가 없다.
- 시나리오: FloorPlan 전액 — 승인 → `PATCH /orders/:id` 가 네트워크로 실패 → 캐셔 Confirm 재시도 → `createSale`(orderId) 는 `payment_status!=='completed'` · `amount≤remaining` 만 보고 **새 Sale 을 또 보냄** → 손님 재탭 → 승인 2건.
- 고치는 법(팀원 몫): ① `createSale` 에 orderId 가 있으면 그 주문의 approved/manual 합이 이미 잔액을 덮으면 **409 `ALREADY_APPROVED`**(«이 주문은 단말기 승인이 이미 있음 — 그 승인으로 기록하세요») 로 **재승인 자체를 선제 차단**. ② 응답/링크의 `link_error==='DOUBLE_APPROVAL'` 을 `TerminalPanel` 에 경고 문구로(4언어 키 1개). health-check 에 ① 1케이스.
- R1 과 같은 묶음으로. 배포는 막지 않음(같은 이유).

### R3 🟡 POS 신규주문 «대기 연결» 이 금액을 안 맞춰 본다
`terminalPaymentLink.ts` 는 `amount` 를 저장만 하고 `OrderContext.addOrder` 가 꺼낼 때 `savedOrder.total_amount` 와 비교하지 않는다. 승인 뒤 `addOrder` 가 실패하고 2분 안에 다른 카드/이월렛 주문(스탠디 QR E-Wallet 수기 등)이 생기면 그 주문에 **앞 승인이 붙을 수 있다**(서버 `link` 는 «합 ≤ 주문 총액» 만 봐서 금액이 작으면 통과). 1줄: `Math.abs(link.amount − total) < 0.005` 일 때만 link. R1 묶음.

### R4 🟡 수동 기록 + orderId(FloorPlan/LiveOrders) 경로는 `orders.transaction_id` 가 비어 남는다
`markManual` 은 상태만 바꾸고 `link` 를 안 부른다. POS 신규주문은 대기 연결→`link`(manual 허용) 로 채워지지만 orderId 가 있는 경로는 `terminal_transactions.order_id` 만 있고 주문·원장 참조가 비어 보고서에서 «수동 기록» 추적이 한 단계 더 든다. `/manual` 뒤 `row.order_id` 있으면 `safeLink` 1줄. 비차단.

### R5 ⚪ `handleTerminalManual` 이 `setTerminalBusy('starting')` 뒤 `if (!manualTender.method) return` — busy 가 안 풀린다
버튼이 `!manualTender.method` 면 disabled 라 **도달 불가**. 순서만 바꾸면 됨. 비차단.

### P1 🟠 프로세스 — `.claude/.fable-gate-skip` 가 09-29 17:47 부터 **상존**, 오늘도 skip 5회 기록(21:24~21:48, 로그 누적 220건)
Stop 훅이 이 기간 내내 «우회 기록» 모드였다 = 뒷문이 열려 있었다. 이번 작업은 결과적으로 게이트까지 왔으니 피해는 없지만, 훅의 존재 이유가 사라진 상태. **배포 뒤 skip 파일 삭제** 권고(지문 제외 경로라 마커에 영향 없음). 누가·왜 두었는지는 로그에 없다(기계 한계) — Irene 확인.

---

## 3. 팀원 결정 7건 판정 (설계 밖 세부)
| 결정 | 판정 |
|---|---|
| `lib/` → `utils/ghlEcr.js` | 수용. 저장소 관례 |
| 자동 찾기(Irene 요구) — 사설망 /22 상한 · Echo 형식 응답만 · **연결 전 실패만 재전송**, TIMEOUT 은 재전송 없음 | **수용 — 핵심 규칙이 맞다.** CONNECT_* 와 TIMEOUT 을 가르는 것이 이중결제 방지의 전부이고 Electron(`connected` 플래그)·Android(connect 예외 vs soTimeout) 둘 다 그렇게 갈랐다. 1대면 캐셔도 저장(host 한 칸·사설망·켜진 매장·활동기록) 수용 |
| 브릿지 사설망만 · Android 원시 소켓으로 HTTP(cleartext 설정 무변경) · 개발 APK `.dev` 분리 · dev-apps 호스팅 | 수용. §1 ⑪ 로 유출 없음 확인. 정식 설치본은 실단말기 확인 뒤 |
| 승인 뒤 연결 실패 = 비치명 `link_error` | **절반 수용** — 승인을 지우지 않는 건 맞다. 그러나 화면에 안 보이는 건 R2 |
| 문구 키 평면/중첩 | 수용(파일 관례 따름, i18n 게이트 통과) |
| 보고서 import 2줄(설계 밖) | **수용·배포 사유.** 운영 결함이고 1줄 import 라 범위 이탈이 아니다 |
| health-check 정리 보강(order_actions 선삭제) | 수용. «검사기부터 의심» 규율에 맞음(조용히 남던 잔재를 잡았다) |

---

## 4. 배포 전·후 조치 (팀원 실행)
1. **배포 전 커밋 금지** — 이 판정문·session-state 를 커밋하면 HEAD 트리가 바뀌어 마커가 죽는다. 기록은 배포 후.
2. 배포: `/배포` 표준. 마이그 `migrate-create-terminal-transactions.js` 가 레지스트리로 돈다. 배포 후 운영 읽기로 `SHOW TABLES LIKE 'terminal_transactions'` 1회 + `GET /api/terminal/config?restaurant_id=<운영 아무 매장>` → `enabled:false` 1회.
3. 배포 후 스모크에 **Owner·Foodcourt 보고서 화면을 기간에 주문 있는 매장으로 1회 열기**(이번 배포의 목적) 추가.
4. 배포 후 `.claude/.fable-gate-skip` 삭제(P1) — Irene 승인 뒤.
5. 릴리즈 JSON remaining 의 «desktop/…apk 삭제» 문구는 실제 위치(dev-apps)와 다르다 — 배포 뒤 기록 정리 때 고침(코드 아님).
6. **R1·R2·R3(·R4·R5)** 는 Irene 실단말기 테스트 결과(D-5 분기: 금액만으로 QR 수용 여부)와 **한 묶음**으로 수정 → 그 묶음이 다음 Fable 게이트 1회. 그 전엔 운영 매장 단말기 활성화 금지.

---

## 5. 확인 불가 (추측하지 않음)
- **실단말기** — 전송 형식(HTTP hex 본문/응답), 프로파일(ECR/Direct), 금액만 보낸 Sale 로 손님 QR 수용 여부, D002 길이. 전부 목 단말기 기준으로만 증명됨. Irene 2026-10-02 태블릿.
- Android 실기기 실행(컴파일·APK 만), Windows 설치본(0.1.10 그대로, 미빌드) — Windows 매장은 아직 쓸 수 없음.
- `verify-all --full`(mount sweep) 은 팀원 24/24 보고만(내가 재실행하면 11분·번들 동일이라 생략). e2e 8/8×3 도 보고만 — 스펙 파일은 읽어 8시나리오가 설계 P3 를 덮는 것은 확인했으나 **분할+거절(R1) 시나리오는 없다**.
- 운영 번들에 보고서 결함이 실제로 있는지는 팀원 ssh grep 보고 + 스냅샷 커밋 소스로 확인. 운영 서버에 직접 들어가지 않았다.

---

## 6. 후속(2단계·기록)
- 메모리 `reference_card_terminal_ghl_ecr.md` 신설(설계 §6) — 구조 한 줄 + «분할 경로도 전액과 같은 규칙» + «CONNECT_* 만 재전송».
- 2단계 범위 그대로: Void(A2)·Settlement(A3)·마감 자동입력·DuitNow 단말기 화면 QR(Product ID). Void 가 들어오면 R2 의 «경고» 가 «여기서 취소» 버튼이 된다.
