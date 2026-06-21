# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-21 05:35, idle 2087s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: auth.js,owner.js users.js,work-manuals.js sw.js,OperationInquiryPage.tsx SystemInquiryPage.tsx,BrandProductRecipePage.tsx ProductRecipeCategoriesTab.tsx,OperationInquiryPage.tsx SystemInquiryPage.tsx,AdminManagementPage.tsx
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-20 (백스테이지 운영 배포 2건 + 운영 검증 완료)
**버전:** **v3.60 운영 배포됨 (2026-06-20).** 이후 백스테이지 배포 2건(버전 미상승): ①시재 차이 원장 자동기입+시재 tz 버그+액션버튼 통일(Backup 20260620_193147) ②할인 PIN 누락경로 게이트(Backup 20260620_195910, 번들 main.46dad59d). SW_VERSION=3.66-pin-cash-settlement-20260620.
**작업 상태:** 완료 (운영 배포 + 운영 검증 통과)

### 진행 중인 작업
- 시재(Cash Management) 2건 dev 수정 완료·검증 통과 — **운영 미배포(Irene /배포 대기)**
  1. **Today's Cash Drawer 버튼 무반응 버그** — CashUpPage 가 CashDrawerModal 을 import만 하고 JSX 렌더 누락 → 클릭해도 모달 안 뜸. `<CashDrawerModal>` 렌더 추가(onClose 시 reloadKey bump).
  2. **페이지↔팝업 계산 불일치 동기화(Option A)** — 원인: 같은 cash_movements 테이블이지만 팝업=개시현금+입금−출금=현재드로어(147), 페이지=순액만(122). 페이지에도 팝업과 '동일한' 엔드포인트(/shift/current + /shift/{id}/expected)로 드로어 요약(개시/입금/출금/현재드로어) 표시. '오늘'+열린shift 일 때만 노출(과거기간은 회계순액 유지). CashLedger hideSummary prop 으로 중복 요약줄 숨김.
  - 검증: build 성공, 실API(rest5 shift45: 개시25/입213/출91/onHand147 페이지=팝업 동일, ledger net122=147−25), health 107/107, print-guard 8/8(인쇄 무변경)
  - 파일: CashUpPage.tsx, CashLedger.tsx (인쇄 무관)
  - 알려진 잔여(범위 외): 팝업 하단 'Today's cash in/out' 리스트는 달력-오늘 기준, 상단 요약은 shift 기준 — 단일 shift 매장은 일치. 추후 필요 시 정리.

### 완료된 작업 (이번 세션)
- 할인 PIN 승인 누락 경로 게이트 — 설정 '할인 PIN 필수' ON 시 POS 금액할인·% 할인·결제창(PaymentModal) 할인 3경로 모두 PIN 모달 뜨도록(기존엔 정책버튼만 검사). pendingDiscount.kind 분기, doApplyPaymentDiscount 분리. 🔒 POS 인쇄블록 무변경(print-guard re-bless 8/8)
- (앞서) 현금 차이 원장 자동기입(cash_movements.source), 시재 "오늘" tz 버그 픽스, 액션 IconButton 정사각 통일
- 검증 — health 107/107, print-guard 8/8, hydration 0, 금액공식 11/11, 주문 라이프사이클+할인 재계산(17.8→5할인 12.8) 실API, verify-pin-permission 실API(권한없는 staff/틀린PIN→거부·익명 401), POS터미널 mount 0크래시, 반응형 overflow 0
- 운영 배포 2건 + 운영 검증(번들 라이브 확인·익명 401·pos 200·스키마 신규차이 0)

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 인앱 Docs/매뉴얼 시스템 — `docs/IN_APP_DOCS_MANUAL_SYSTEM.md` 기획만 됨. Irene "Docs 기획은 그 다음 볼게"
- 매장 실프린터 확인 대기 — Z-Report 종이·드로어·주방티켓(v3.60 시재/마감) + 마감프린트가 워크스테이션 Bill printer(QZ)로 직접 나가는지 현장 확인
- 할인 PIN: 매장에 discount_authorize 권한 직원/관리자 PIN 세팅돼 있는지(없으면 승인 불가) — 운영 안내 여지
- 시재: 영업일 경계(business_date) vs 달력 "오늘" 정합성(야간 교대) 점검 여지

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
