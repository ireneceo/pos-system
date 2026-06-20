# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-20 (백스테이지 운영 배포 + 운영 검증 완료)
**버전:** **v3.60 운영 배포됨 (2026-06-20).** 이후 **백스테이지 운영 배포**(시재 차이 원장 자동기입 + 시재 tz 버그 픽스 + 액션버튼 통일, Backup 20260620_193147, Smoke 9/9, 버전 미상승). SW_VERSION=3.66-pin-cash-settlement-20260620.
**작업 상태:** 완료 (운영 배포 + 운영 검증 통과)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- 현금 차이 원장 자동기입 — 파이널 마감 확정 시 over/short 를 시재 원장에 1줄 자동 기록(`cash_movements.source` 신설, settlement 행 수정/삭제 차단). 마감 미리보기 아닌 close 에서만, carryover/Z-Report 이중계상 없음
- 시재 "오늘" 타임존 버그 픽스 — `CashUpPage` 가 매장 tz 미적용으로 당일 입출금 누락(서버 UTC=매장 새벽) → KL 폴백 + tz 하이드레이션 후 dateRange 재계산. 데이터 손실 아님(표시 버그). 실측 확인
- 액션 아이콘버튼 통일 — 공용 `components/UI/IconButton` padding 6px 10px→6px(라이브오더 동일 32×32 정사각), 33곳 일괄
- 검증 — health 107/107, print-guard 8/8, 금액공식 11/11, 주문 라이프사이클(생성→preparing→ready→served→cancelled) 실호출, 반응형 6페이지×3폭 overflow 0, POS터미널/라이브오더/플로어/KDS/설정 실브라우저 mount 0크래시
- 운영 배포 + 운영 검증 — Backup 20260620_193147, Smoke 9/9, prod source 컬럼 적용·익명 cash 401·cash-management 페이지 200 확인

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 인앱 Docs/매뉴얼 시스템 — `docs/IN_APP_DOCS_MANUAL_SYSTEM.md` 기획만 됨(랜딩+관리자 모듈 동기화). Irene "Docs 기획은 그 다음 볼게"
- 매장 실프린터 확인 대기 — Z-Report 종이·드로어·주방티켓(v3.60 시재/마감)
- 시재: 매장 영업일 경계(business_date) vs 달력 "오늘" 정합성 — 자정 넘긴 야간 교대 표시 정책 점검 여지

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
