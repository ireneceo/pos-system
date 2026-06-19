# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-19 (with MIN Cafe 운영 피드백 큐 — P0/P1/P2 진행. v3.59 배포 후 추가분 DEV 완료·미배포.)
**버전:** v3.59 운영 배포됨 (2026-06-19, Backup 20260619_065629). (버전은 /배포 시에만 갱신)
**작업 상태:** 완료. **미배포 묶음 밤 배포 예정**(Irene: 주문과정 확인 후 밤에).

### 진행 중인 작업
- 없음 (P2-5 Cash-up Phase1 완료. 배포만 대기.)

### 완료된 작업 (이번 세션, 2026-06-19)
- **v3.59 운영 배포 완료** (운영시간+라스트오더 · 취소사유 설정+서버강제 · 발주 통화 RM/MYR 버그 · 이미지/i18n · QZ티켓분리 · 이메일 is_test 가드). 운영 검증(데모 rid13 라이프사이클+print계약 7/7) 통과. 릴리즈노트/블로그/공지 발행.
- **[미배포] P1-4 스탭 PIN 로그인**: `server.js pinLimiter`(verify-pin 15회/15분, 16회째 429 실증) + `pages/Login/StaffPinLogin.tsx`(온스크린 패드) + LoginPage "직원 PIN" 토글 + `AuthContext.loginWithPin` + 공용단말 매장기억(`pos_device_restaurant`). i18n auth:staffPin 11키×4언어. RA 비번리셋·6/3 직원작업(email선택/접근프로파일)은 기존/배포됨.
- **[미배포] P2-5 현금관리 Cash-up Phase1**: 모델 `CashierShift`+`CashReconciliation`(신규 테이블) + `routes/cash-management.js`(`/api/cash/restaurant/:rid/shift` open/expected/reconcile/close/history) + `CashUpPage.tsx` 4단계 위저드(**블라인드 카운트→variance→Z-Report**, 터치 숫자패드) + 사이드바/라우트/cash i18n ns. 마감현금→익일 개시현금 carry-forward. 설계 `docs/CASH_MANAGEMENT_SHIFT_CLOSE.md`. 검증: 백엔드 E2E 15/15 + 데모세션 실렌더.
- **[미배포] PayPal 웹훅 알림 노이즈**: webhooks-payments 서명실패 error→warn(PayPal 미사용 매장 봇 노이즈) + 출처 기록.
- **[미배포] P1-3 취소사유 설정화 마무리**: requireCancelReason off/optional/required(기본required) UI+서버강제(orders-crud bless). Void&Cancel Log 리포트는 v3.56 기존.
- 공통 검증: build0 · health 101/101 · print-guard 8/8(MainLayout/orders-crud bless) · i18n0 · state-hydration0 · 타임존 신규0.

### 다음 확정 작업
- **밤 배포 (Irene 지시)**: 위 미배포 묶음(pinLimiter+PayPal+P1-4+P2-5 cash) — **주문 전 과정(생성·단계·결제·프린트) 확인 후** `/배포`. 마이그 3종(currency·qz·cash, deploy 등록됨). **SW_VERSION bump 필요**(프론트 변경). 배포 후 운영 검증.
- 다음 개발(밤 배포 후): **P2-6 예약↔플로어플랜** 또는 **P2-5 Cash-up Phase2**(결제수단 사전등록·Z-Report 프린트·드로어 수동오픈[🔒]) — Irene 지시 대기.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **구독역할 무료화 전략**(Owner/FG/Supplier/BG 통합 대시보드 무료+매장단위 과금, land&expand) — Irene 4역할 동시 검토 예정.
- 운영 피드백 잔여: 특정일/기간 운영시간 오버라이드(라마단, OT-001 실수요) · 마감 차단 주문시도 로깅 · pending-print cancelled 윈도우 · FG-6 쿠폰 실구현 · nginx www→apex 301.
- **검증방법 교훈**(메모리 [[reference_headless_page_sweep]]): 인증 페이지 헤드리스 mount는 토큰주입 X(/pos 리다이렉트=false OK) → **데모 퀵로그인 세션** 필수.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
