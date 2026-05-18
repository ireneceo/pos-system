# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-18
**버전:** **v3.33** (운영 배포 완료, 같은 날 v3.32 + v3.33 + v3.33 hotfix 세 번 배포)
**작업 상태:** 완료 (모든 dev 누적 운영 반영). 새 지시 대기

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 누적, 2026-05-18)

**v3.32 운영 배포 (점심)**
- 테이블 QR 무조건 dine-in 고정
- Reservation 기능 base 격상 (paywall 제거, AddonModule basic, 마이그)
- Mobile Order Settings 탭 전수 보강 (7 카드 + 27 i18n 키 × 4 langs)
- RA support 페이지 타이틀 `t('nav.systemInquiry')` 로 일치

**v3.33 운영 배포 (저녁)**
- Admin Invoices Cancel + Revert to Draft 버튼 (dead modal trigger 연결 + Revert 모달 신규)
- PWA standalone 데스크탑 앱 같은 창 전환 (`utils/runtime.isStandalone()` + `openSecondaryWindow` helper)
- 4 풀화면 페이지 Back 버튼 표준화 (PageHeader backHref prop + Customer/Kitchen/Floor Plan)
- KDS 정확성 보완 4건 (formatPickupTimeRange timezone · Pickup scheduled_pickup_time 정렬 · URL station stationId 우선 · Backend status 콤마 다중 필터)

**v3.33 hotfix 운영 배포 (밤)**
- **RA Recipe Management 5 탭 ReferenceError fix** (운영 매장 4곳 Recipe 페이지 즉시 복구) — v3.32 alert sweep 잔여 결함
- 모바일 OrderTypePage Footer 링크 (Back to Dashboard / Visit Homepage)
- BG/FG/Owner Reports `/api/menu` aggregation fix (Owner 정상화, BG/FG 는 backend 미들웨어 한계로 부분 적용)
- 헤드리스 자동 mount sweep 도구 (Playwright, 95 페이지 검증) — 안정화 사이클 표준 도구로 정착

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- Backend `checkRestaurantAccess` 미들웨어에 BG/FG brand_id/foodcourt_id scope 분기 추가 → BG/FG 의 `/api/menu?restaurantId=X` 403 해소 + Reports 차트 카테고리 분석 정상화
- OrderContext `/api/orders?limit=100` 자동 호출 — BM/Supplier 권한 분기 (현재 console error 노출, mount 영향 0)
- BM Dashboard / BG/FG Reports networkidle timeout (페이지 mount 는 정상 — sweep marker 한계)
- 헤드리스 sweep CI 통합 (배포 전 자동 mount 검증)
- 다른 역할의 인터랙션 후 발생 가능한 결함 — 헤드리스 sweep 으로 잡지 못함. 별도 검증 도구 필요 시
- zh/ms i18n 영어 잔존 690건 sweep (운영 critical 아님)
- BG → 산하 매장 operation_settings PUT 200 — design vs 결함 비즈니스 결정 필요
- Reservation 후속 — deposit / 캘린더 monthly view / WaitingList / 환불 cron (스프린트 규모, `/기능설계` 필요)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
