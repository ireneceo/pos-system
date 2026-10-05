# Fable 게이트 판정 — 단말기 BUSY 자동 대기 (2026-10-05, SW 5.85)

판정: **PASS** (조건 2건 — 배포 뒤 Irene 실단말기 확인에 종속)

## 대조한 것
- diff 11건 직접 대조: terminalSale.ts(+33) · PaymentModal.tsx(+7, stopRef·shouldStop 전달만) · TerminalPanel.tsx(+20, 'terminalBusy' 안내 분기) · pos.json 4언어 busyWait 4키 각 4건 · sw.js 5.85 · e2e B2 · 단위 테스트 신규 · 배포 기록 JSON. 설계 외 변경 0.
- 이중 결제 안전성(핵심): 재시도 조건 `status==='declined' && /^H4\d\d$/`. 서버 `services/terminalPayments.js applyResponse` 는 **response_hex 없음 + raw 가 HTTP 4xx + command==='sale'** 일 때만 declined(H4xx) 를 매긴다 → 프레임이 하나라도 왔으면 이 분기에 못 들어온다. 재전송은 «단말기가 받기 전 거절» 한 판매에만 일어난다. 처리됐을 수 있는 상태(timeout/comm_error/pending)는 기존 Reprint·EA 경로 그대로.
- 루프 종료: 60초 상한 · shouldStop(3초 sleep 뒤·전송 전 읽음) · 재생성 실패(!again.ok) → 모두 기존 declined→'reason:terminalBusy' 로 떨어짐. 재시도 중 무응답은 **새 sale.id** 로 unknown 반환(복구 대상 id 정확).
- 단위 3/3 Fable 재실행(`CI=true react-scripts test`; `npx jest` 직접 실행은 CRA 변환 미적용으로 돌지 않음 — 도구 문제, 코드 아님). check-sensitive-diff: ② 돈 1건(PaymentModal) 대상 확정. print-guard 8/8 변경 없음. 팀원 e2e 14/14×3 · verify-all --full 24/24 수용(재실행 안 함 — Fable 최소화).

## 조건·확인 불가
1. 운영 단말기에서 BUSY 가 영수증 화면을 끝내면 풀리는지, 60초 안에 풀리는지 — Irene 실테스트가 유일한 증명. 안 풀리면 설계(대기 길이·안내 문구) 재판정 대상.
2. BUSY 가 아닌 4xx(설정 오류 등)도 같은 «앞 결제 마무리 중» 문구로 60초 기다린다 — 결제는 안 일어나 안전하나 문구가 어긋날 수 있음. 실측에 4xx 는 400 BUSY 만 있어 지금은 수용, 다른 4xx 가 보이면 그때 분기.
3. 재시도마다 declined H400 행 남음 — 결제 아님, 장부 영향 없음(ALREADY_APPROVED·Void 는 approved 만 본다). 수용.

## 재도장 (2026-10-05 08:40, Irene 문구 지시 반영) — PASS
Irene «Try again 버튼 불필요 · 안내만 · DONE 누르고 대기상태» 반영. 직전 판정 뒤 바뀐 것 = `pos.json` 4언어의 `busyWait.title/doThis/auto` + `reason.terminalBusy` 값과 e2e B2 기대 문구 1줄만. 코드 파일(terminalSale/PaymentModal/TerminalPanel/sw.js) mtime 07:56~08:05 < 직전 판정 08:24 → 코드 변경 0 확정. 4언어 busyWait 키 4개 동일 · 코드 참조 키와 일치 · 빌드 산출물(08:33)에 새 문구 포함 · SW 5.85 유지. 재시도 버튼은 원래 없었고(자동 재시도) «Stop waiting» 은 손님이 결제를 그만둘 때 60초 갇힘을 막는 탈출구라 유지가 맞다. 직전 판정의 조건 1·2 그대로 — Irene 실단말기 확인에 종속.

## 재도장 2 (2026-10-05, 배송 준비 목록 버튼 추가) — PASS
Irene 「가격말고 딱 일하게 배송준비해야하는 정보만」 「스탭에게는 정신없어」. 직전 마커 뒤 변경 = poShare.ts(`poItemQtyText` 추출은 기존 식 그대로 옮긴 것 · `shareSellerPackingListViaWhatsApp` 신규: 단가·합계·SKU·`@`·`=` 0, 굵게는 PACKING 머리글·카테고리만, 카테고리 묶음·수량 표기·배송지·메모 줄은 주문 공유와 같은 함수·같은 필드) · IncomingOrdersView 버튼 1개(secondary, 기존 WhatsApp 버튼과 같은 `detailFull` 가드·같은 인자) · supplier.json 4언어 1키 · 단위 테스트 1건 · 배포 기록 항목. 서버·돈·권한·🔒 보호파일 접촉 0(print-guard 8/8 변경 없음 재실행 · check-sensitive-diff 대상은 여전히 PaymentModal ② 1건뿐 — 이번 추가분과 무관). poShare 12/12 Fable 재실행. 고장주입(단가 줄 추가 → 1건 실패 → 원복)·빌드 1회·e2e 14/14·verify-all --full 24/24 는 팀원 결과 수용. 확인 불가: 판매자 상세 모달 실클릭(sweep 밖) — 기존 WhatsApp 버튼과 동일 패턴이라 수용, 배포 뒤 Irene 가 받은 주문 하나에서 1회 눌러 보면 끝. 직전 조건 1·2(BUSY 실단말기 확인) 그대로.
