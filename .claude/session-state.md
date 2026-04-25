# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-04-25 (개발 완료)
**버전:** **v3.18** (2026-04-25 운영 배포) · 미배포 누적 → 다음 v3.19
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

**오전/낮 — v3.18 운영 배포 + 후속**
- Phase 1+2 주소 시스템 통일 (33+ 파일, 4 헬퍼 유틸, 6 입력 폼, 백엔드 4 라우트)
- Address suggestions endpoint + 자동완성 + normalize + 17국 postal 검증
- v3.18 운영 배포 (smoke 10/10, `main.e5103dd0.js`)
- v3.18 릴리즈 블로그 + System Admin 공지 (운영 sync)

**오후 — Onboarding wizard 강화 (옵션 A)**
- `<WelcomeModal>` 신설 — 첫 로그인 1회 표시, localStorage 가드, 진정 신규자만 노출
- `useSetupStatus` 확장 — Restaurant Owner 3 / System Admin 4 / Brand 4→5 / Foodcourt 2→4 / RA 11 (모두 dependsOn 메타)
- `SetupGuide` UI에 dependency lock (회색 + 🔒 + tooltip)
- Admin/Owner Dashboard에 SetupGuide + WelcomeModal 통합
- i18n 4언어 5 키

**저녁 — 알림 센터 (Inbox) v1**
- 신규 endpoint `/api/inbox` — Notice + SupportTicket + OperationTicket UNION 시간순
- `<InboxBell>` (헤더 종, 30s polling, shake) + `<InboxDrawer>` (420px 슬라이드, filter pills, skeleton, 빈 상태)
- `pages/Inbox/InboxPage.tsx` (전체 보기, tab/status segment/search)
- 30+ 키 × 4언어, role="dialog" + aria-live + keyboard nav
- Restaurant Owner relationship_type fix (검증으로 catch)

**밤 — DEVELOPMENT_PLAN.md 예정 작업 일괄**
- 보안 fix: POST /api/restaurants 역할 제한 (BM/FM 차단, health-check 43/43)
- Trial 만료 자동 알림 (D-3/D-0/D+1, 4 entity, 신규 카테고리 + opt-out)
- Daily scheduler 모니터링 대시보드 (scheduler_runs 테이블 + 통합 + Admin 페이지)
- 구독 변경 히스토리 (InvoiceHistoryModal + 3 페이지 통합)
- 인보이스 type 뱃지 (이미 완료, stale 마감)

### 다음 할 일

DEVELOPMENT_PLAN.md "📋 예정" 잔여:
- **Supplier Portal + 구독 인보이스 연동** — Supplier Portal 구축 시 5분 작업 (헬퍼만 추가 호출)
- **대량 구독 변경 확인 다이얼로그** — Bulk edit 기능 추가 시
- **스토어 키오스크 UI** — Irene 우선순위 확인 후 착수 (`/kiosk/:slug`, 5 라우트, 70% 재사용)

docs/ 큰 시스템 (각 1-2일+):
- `INVENTORY_MANAGEMENT_SYSTEM.md`
- `MEMBERSHIP_SYSTEM_PLAN.md`
- `PETTY_CASH_AND_PURCHASE_ORDER_SYSTEM.md`
- `REFERRAL_SYSTEM.md`
- `SELLER_PRODUCT_INVENTORY_SYSTEM.md`

### 미배포 [Unreleased] 누적 (다음 `/배포` 시 v3.19)
- Onboarding wizard 강화
- 알림 센터 (Inbox) v1
- 보안 fix (POST /api/restaurants)
- Trial 만료 자동 알림
- Scheduler 모니터링 대시보드
- 구독 변경 히스토리 페이지

**검증 상태:**
- 빌드 `main.3fc1c132.js` exit 0
- State hydration 0 warnings
- health-check 43/43 PASS
- API 라운드트립 모두 통과 (Inbox 12/12 + 5 역할 30/30, Trial reminder 6 시나리오, Scheduler-runs)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
