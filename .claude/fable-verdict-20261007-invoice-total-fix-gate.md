# Fable 게이트 판정 — 청구서에서 총액 수정 + 수정 이력 (2026-10-07 · 이 사안 2회차)

설계 원문: `.claude/fable-design-20261007-invoice-total-fix.md` · 배포 기록: `dev-backend/releases/2026-10-07-invoice-total-fix.json`

## 판정: PASS (배포 가능 — Irene «/배포» 지시 때만)

## 내가 직접 한 것
1. **diff 범위 대조** — 변경 파일 전부를 설계 §3 열한 항목에 하나씩 맞췄다. 설계 밖 변경 0.
   - 보안 경계(`buyerScope.js`): OWNER_ACTING_ROUTES 에 reconcile 1줄만. 오너 «매장으로 행동» 길은 ownership 확인 뒤에만 열리고, 그 길로 들어온 요청은 라우트(`cost-reconciliation.js`)가 소유권 검사(`checkPOOwnership`) **뒤·어떤 변경보다 앞**에서 `total_only !== true` 면 403 OWNER_TOTAL_ONLY. 전환 파라미터 없이 들어온 오너는 예전과 같은 판정(소속 매장 없으면 403, fail-closed) — 새로 열린 문은 «총액만» 하나뿐이다.
   - 돈 경로(`reconcileInvoiceSync.js`): 바꾸기 전 총액을 잡아 finalize·reload 뒤와 비교, **다를 때만** `modification_history` 한 줄 + `is_modified`. 결제된 건의 paid_amount 동기화는 예전 값 그대로(round2 만 추가). 가입 공급업체·결제-불허 분기는 그 앞에서 그대로 빠져나간다.
   - 목록 3칸(`invoices-list.js`·`owner.js`·`invoicePurchaseOrderAttach.js`)은 읽기 전용 집계·전달만. `srcPo` 변수 범위 확인.
   - 화면: 공용 `Modal/ModalButton/FormInput/DateField` 사용, 로컬 styled.button 0. D6 는 같은 창 안 두 번째 누름(ConfirmModal z-index 1000 < 창 1100 때문 — 팀원 판단 수용). 오너 URL 은 그 청구서의 `restaurantId`. 이력 시각: 매장 화면 = 매장 타임존, 오너 화면 = `formatDateTime` 기본값 **Asia/Kuala_Lumpur**(브라우저 로컬 아님 — 규칙 위반 아님).
   - `health-check.js`: `invoice-total-fix` T1~T4 **추가만**. T2 임시 오너는 `@example.com` + finally 삭제(메일 사고 규칙 준수).
   - 문서 3곳·i18n 4언어 키·sw.js 5.88 확인. 🔒 인쇄·KDS 보호파일 무접촉(`check-print-guard` 8/8 내가 재실행).
2. **기계 게이트 내 손으로 재실행** — `verify-all.js` **23/23 통과**(health-check 전체 회귀 포함 · 타입 기준선 신규 0 · 타임존·디자인·i18n·인스펙션·계약 테스트). mount sweep(--full)은 팀원이 같은 번들로 8역할 크래시 0 — 번들이 바뀌지 않았으므로 재실행하지 않았다.
3. **고장주입 3종** — 팀원 실행 결과를 수용. 근거: 테스트 코드(T1 이력 길이·T2 403 코드·T2 200)가 주입 지점(이력 push / OWNER_TOTAL_ONLY 조건 / OWNER_ACTING_ROUTES 줄)과 정확히 1:1 로 대응함을 코드로 대조했다. 내가 재현하지는 않았다(pm2 재시작이 필요해 verify-all 과 겹침).

## 남는 위험 (배포를 막지 않음)
- 같은 청구서에 두 사람이 **동시에** 총액을 고치면 이력 한 줄이 덮일 수 있다(읽고-더하고-쓰기, 트랜잭션 없음). 청구서 직접 수정(PUT)도 같은 방식이고 사람이 손으로 하는 일이라 실제 확률은 낮다. 기록만.
- 오너 화면의 이력 시각은 매장 설정 타임존이 아니라 기본값(말레이시아). 그 화면의 다른 날짜와 같은 기준이라 일관되나, 매장이 다른 타임존이면 어긋난다. 현재 시장(말레이시아)에선 영향 0.
- T2 의 «남의 매장 403» 은 데모 매장이 2개 이상일 때만 실제로 때린다(없으면 건너뜀). 개발 DB 에는 있다.

## 후속 (코드 아님)
- `.claude/.fable-gate-skip` 가 **10-05 15:37 부터 남아 있다** — 그 뒤로 정지 훅이 한 번도 막지 않았고 오늘만 skip 5건이 기록됐다(09:30~09:51). 마커를 찍은 뒤 팀원이 이 파일을 지워 훅을 되살릴 것(gitignore 라 지문 무관).
