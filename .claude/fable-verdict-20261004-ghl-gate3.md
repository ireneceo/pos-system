# [Fable 판정] GHL 2차 묶음 — R1~R5 + 안드로이드 정식 앱 0.3.0 (SW 5.72) — 게이트 3회차 (2026-10-04)

> 대상: 운영 배포 스냅샷(2026-10-02 04:35, SW 5.71) 이후 커밋 db3857110 + a5e03a751. 워킹트리 clean · 지문 9345f71b6ffb.
> 전 판정: `.claude/fable-verdict-20261001-ghl-ecr-gate.md` §2 (R1~R5) · 설계 `docs/CARD_TERMINAL_ECR_DESIGN.md`.
> 작성: Fable 5.1 · 코드 수정 0(고장주입 1건은 cp 원복·cmp 동일) · 운영 쓰기 0 · 운영 접근 0.
> 호출 횟수: 이 사안 3회차(설계 1 · 게이트 1 · 이번 게이트 1). 다음 Fable 은 실단말기 결과로 **길이 갈릴 때만**(D-5 QR 수용 여부 등).

## 0. 판정 한 줄
**PASS — 운영 배포 가능(마커 발급). 조건은 아래 §3.**
운영에서 단말기를 켠 매장 0 → 이 배포로 바뀌는 운영 동작은 «단말기 켠 매장» 안에만 있고, 그 매장은 Irene 이 테스트할 **운영 데모 매장 1곳**뿐이다.

## 1. 내가 직접 실측한 것 (팀원 보고를 믿지 않고 다시 돌림)
| # | 항목 | 결과 |
|---|---|---|
| ① | diff 범위 — 코드 15파일(`git diff --stat 164deb8cc..HEAD`) 전부 R1~R5·앱 0.3.0 절단면 안. 설계 밖 변경 **0** (문서·기록·sw 버전·health 1케이스·e2e 1케이스는 절단면의 증명 수단) | 통과 |
| ② | 🔒 `check-print-guard` | 8/8 변경 없음 |
| ③ | `check-sensitive-diff` | ② 돈(PaymentModal) + 안전망(health-check) — 게이트 대상 맞음 |
| ④ | `verify-all`(표준) | **23/23** (print-guard·IDOR·마이그 레지스트리·배포 준비·번들 신선도·타입 기준선·i18n·health 전체·계약 테스트 포함) |
| ⑤ | `health-check --category=terminal` | **6/6** |
| ⑥ | `jest tests/ghl-ecr.test.js` | 28/28 |
| ⑦ | **고장주입(내가 1건, 팀원 2건과 다른 지점)** — `createSale` 의 같은 금액 승인 찾기(`same`) 를 undefined 로 → health 신규 케이스 **✗ «재사용 승인 id=undefined»** → `cp` 원복 `cmp` 동일 → pm2 restart → 6/6 · `git status` clean | 재사용 경로가 실제로 검사되고 있음을 반증으로 확인 |
| ⑧ | **e2e card-terminal 9/9 (내가 1회, `--retries=0`, 28초)** — I(분할+거절→Confirm 비활성·원장 0·다시 시도 뒤 재전송) · H(POS 신규주문 연결) 포함. 종료 뒤 데모38 `card.terminal.enabled` 원복(null) 확인 | R1 이 **서빙 번들**에서 증명됨 |
| ⑨ | 번들 — `dev-frontend-build/sw.js` = 5.72 · main·chunk 에 `reason:doubleApproval`·`ALREADY_APPROVED` 존재(10-02 05:02 빌드) | 소스=번들 |
| ⑩ | i18n — `alreadyApproved`·`doubleApproval` en/ko/zh/ms 4언어 | 통과 |
| ⑪ | APK — sha256 3개(빌드 산출물·`desktop/PurplePOS-0.3.0.apk`·`desktop/PurplePOS.apk`) 동일 f912f96a… · `capacitor.config.json` server.url = `https://purplehere.com/pos`, cleartext false · **서명 인증서 SHA256 B5:58:13:CF… = 0.2.0 과 동일**(keytool) → 덮어 설치 가능 · 배포 스크립트 7a 가 `dev-frontend-build/desktop/` 을 운영 `/desktop/` 로 rsync | 운영 다운로드 경로 성립 |
| ⑫ | R1 경계 — `useTerminal = paymentMethod==='card' && …` 이라 이월렛 분할 경로는 단말기 경로가 아님(QR 은 Card 버튼→단말기 분류). canConfirm 분할-card `useTerminal ? !terminalIssue` · `handleSplitConfirm` 은 manual 플래그 없이는 이슈 상태에서 `return` | 전액 경로와 같은 규칙 성립 |
| ⑬ | R3 — POS `adjustedTotal = total − pointDiscount` 와 PaymentModal `total` 동일식 · e2e H 로 표준 품목 연결 증명 | 통과(포인트 할인 경계는 §4) |
| ⑭ | 마이그 없음 · 레지스트리 변화 없음 · `.fable-gate-skip` 없음(10-02 삭제 확인) | 배포 안전 |

## 2. 팀원 판단 1건 판정
**«승인 합 + 이번 금액 > 주문 금액» 으로 구현(내 문구 «합이 잔액을 덮으면» 대신)** → **수용.** 내 문구를 그대로 쓰면 정상 분할 2번째 몫이 막힌다는 지적이 맞다. 팀원이 스스로 보고한 빈틈(분할 몫 기록 실패 뒤 같은 몫 재시도는 합 ≤ 총액이라 못 잡음)도 맞다 — 그 경우 손님은 몫을 두 번 긁히지만 **원장은 주문 금액을 넘지 않고**, 마지막 몫에서 409→같은 금액 승인 재사용으로 끝난다(돈은 맞고 승인 1건이 미참조로 남음). 정확한 해법은 «원장에 아직 안 붙은 승인(미기록 승인)이 있으면 그 금액은 재사용» — `order_payments.transaction_id` 조인 필요. **2단계(Void·Settlement)와 묶는다.** 지금 막지 않음.

## 3. 조건
### 배포(`/배포`) 조건
1. 마커 뒤 저장소 파일 수정·커밋 금지(session-state.md 만 예외). 기록은 배포 후.
2. 배포 후 운영 읽기 2건: `GET https://purplehere.com/desktop/PurplePOS.apk` sha256 = f912f96a… · 운영 아무 매장 `GET /api/terminal/config` → `enabled:false`.
3. 배포 후 스모크 눈 확인 1회: 운영 결제 창 카드 버튼이 «Card» 그대로(단말기 안 켠 매장 변화 0).

### 운영 데모 매장 실단말기 테스트 조건
1. **단말기 연동은 운영 데모 매장 1곳만** 켠다. 다른 운영 매장 활성화 금지(파일럿은 이 테스트 결과 + 아래 4 뒤).
2. 테스트 순서(기록 JSON 그대로): 태블릿 0.3.0 덮어 설치 → 설정›결제›Card›카드 단말기 연동 켜기 → 단말기 찾기 → **RM 1.00 카드 1건(전액)** → **TnG QR 1건** → 원장·`terminal_transactions`·보고서 확인 → **단말기 메뉴에서 Void**. 기록 4항목: Echo 응답 hex · 프로파일(ECR/Direct) · 금액만 보낸 Sale 로 QR 수용 여부(D-5) · 찾기 동작.
3. **Void 뒤 같은 주문을 POS 에서 다시 결제하지 말 것** — 단말기 Void 는 1단계 범위 밖이라 POS 는 그 승인을 모른다(아래 §4-1). Void 는 «단말기 돈 되돌리기» 확인으로 끝내고 주문은 그대로 둔다.
4. 테스트 후 데모 매장 단말기 연동은 **끄고** 끝낸다(켜진 매장 0 으로 복귀).
5. 안내 아티팩트(https://claude.ai/artifact/ALL7b8nE7jZr4vgAuS3LeK)는 개발용 앱 기준 → 테스트 전 정식 앱·운영 데모 기준으로 갱신(팀원, 코드 아님).

## 4. 비차단 결함·한계 (기록해 두고 2단계로)
1. **단말기 Void 역반영 없음(1단계 범위 밖, 설계대로)** — 단말기에서 Void 한 승인도 `terminal_transactions` 에 approved 로 남는다. 그 주문이 POS 에서 결제 취소돼 다시 결제되면 `ALREADY_APPROVED` 가 **Void 된 옛 승인을 재사용**해 긁지 않고 기록한다(매장 돈 누락 가능). 전액 결제 완료 주문은 `ALREADY_PAID` 가 먼저 막아 단일 테스트 흐름에서는 성립하지 않음. **파일럿(실매장) 전 2단계 Void 또는 «재사용 전 캐셔 확인» 중 하나 필수.**
2. 분할 모드에서 «수동 기록» 으로 한 몫을 기록한 뒤 `terminalIssue` 가 남아 다음 몫의 Confirm 이 잠긴다 — «다시 시도» 를 눌러야 풀림(UX 턱). 같은 txn 재수동기록은 서버 `BAD_STATE` 409 로 막혀 **이중 기록 없음.** 1줄 수정감, 다음 묶음.
3. §2 의 «미기록 승인 재사용» 정밀화.
4. R3 — 포인트 할인·서버 재계산으로 주문 `total_amount` 가 단말기 금액과 1센트라도 다르면 연결을 건너뛰어 «미연결 승인» 으로 남는다(설계대로 안전 쪽). 실단말기 테스트에서 POS 신규주문 1건의 `orders.transaction_id` 가 `GHL:` 로 채워지는지 1회 확인.
5. e2e 가 dev `terminal_transactions` 에 데모38 행을 남긴다(이번 12행, 무해, 이미 메모됨).

## 5. 확인 불가 (추측하지 않음)
- 실단말기(전송 형식·프로파일·QR 수용·D002) — 전부 목 단말기 기준. 이번 테스트가 그 답.
- Android 실기기 실행 — APK 구조·서명·설정만 확인, 설치·실행은 Irene 태블릿.
- `verify-all --full`(mount sweep 695초) — 팀원 24/24 보고만. 번들 지문이 10-02 빌드와 동일하고 내가 23/23 + e2e 9/9 를 그 번들에서 돌렸으므로 재실행 생략.
- 운영 서버에는 들어가지 않았다(데모 매장 id 13 은 기록상 — 배포 후 팀원이 운영 읽기로 확정).
