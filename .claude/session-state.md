# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-11
**버전:** v3.54 운영 (버그수정/표시방법이라 버전 미상승 — backstage 규칙)
**작업 상태:** 완료 (Irene 이동, 실시간 동기화 통일은 밤에 정석대로 착수 예정)

### 진행 중인 작업
- 없음 (전 작업 dev 완료 / 설계 완료. 구현 대기는 "다음 확정 작업" 참고)

### 완료된 작업 (이번 세션, 2026-06-11)
- **통합 오더티켓 POS별 토글 4건 — 운영 배포(3.56, Backup 20260611_085310).** ①Main POS 토글OFF 오발행 차단(레거시 mirror 폴백을 토글채택 매장서 무시) ②티켓 라벨=워크스테이션명(COUNTER 하드코딩 폐기) ③취소도 새주문과 동일 POS별 토글 통일 ④취소 라벨 통일. billPrint 공용 `sendUnifiedTickets`/`computeUnifiedTicketTargets` 신설. **실프린터 눈확인 + `check-print-guard.js --bless` 대기.**
- **테이블 takeaway → takeaway 유지 (DEV, 미배포)** — POSTerminalPage:1576 effect가 table 파라미터 있으면 order_type=takeaway 덮어쓰던 것 수정(takeaway면 강제 안 함 + dine-in 강제 1회한정으로 availableTables 레이스 제거). 백엔드 off-table auto-merge 제외(Irene "항상 별도 takeaway"). Takeout 리스트에 테이블칩 "Table B-4"(4언어).
- **KDS 세트 구성품 단계 리셋 수정 (DEV, 미배포)** — set_components(status필드 없음) 읽기우선 vs set_items 쓰기 불일치 → processRawOrderItems 에서 `c.status ?? prevSetItems[ci]?.status` 폴백. 운영 #006 실데이터로 증명.
- **전 화면 실시간 동기화 구조 감사·설계** — 5화면 데이터소스/소켓/단계도출 실측. 근본원인 = order.status↔item.status **단계 드리프트**(역방향 revert 시 아이템 미전파, orders-crud.js:1397; 전진은 전파). 설계 `docs/ORDER_REALTIME_SYNC_UNIFICATION.md`(진단+목표구조+안전롤아웃+문제 레지스트리 P1~P7).

### 다음 확정 작업
- **⭐ 전 화면 주문 단계 실시간 동기화 통일 (Irene 2026-06-11 명시 "이따 밤에, 정석대로"). 최우선.**
  - 설계: `docs/ORDER_REALTIME_SYNC_UNIFICATION.md` (§4-B 문제 레지스트리 P1~P7 = 나중에 하나씩 정석 원인파악). 메모리 [[project_realtime_sync_unification]].
  - 핵심: 단일 단계 모델(order↔item 양방향 일관 cascade 또는 단일 파생) + 공용 OrdersRealtimeProvider(단일 `/orders` 소스 + 6종 소켓 단일 reducer) + 단일 단계유틸 → 5화면 필터링만. table-status 의존 제거.
  - 정석: 설계→구현→매 Phase 검증(한 화면 조치→전 화면 ≤2s·리프레시0·동일단계 3회연속). KDS는 🔒 보호파일이라 마지막 Phase, 인쇄 무접촉.
  - **추측 수정 금지** — 각 문제(P1~P7) 코드+데이터로 검증 후 처리 ([[feedback_investigate_dont_ask]]).

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 미배포 dev 묶음(SW 3.58: KDS 세트구성품 + 테이블 takeaway 3건) → /배포 시 함께. 통합티켓(3.56)은 운영에 이미 있음.
- 통합티켓 4건 실프린터 눈확인 후 `--bless` (billPrint+POSTerminal+orders-crud 무결성).
- 🔒 POS 직접결제 빌 복사 매수 미반영 (POSTerminalPage 직접인쇄 1장고정, P7).
- gitconsulting/with MIN 발주 데모 Phase 2 (운영 시딩, Irene "운영 실행" 지시 대기).

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
