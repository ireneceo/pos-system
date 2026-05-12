# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-12
**버전:** **v3.28** (Unreleased 누적 / 미배포)
**작업 상태:** 완료

---

## ⚡ 빠른 재개

```
session-state.md 읽고 이어서 개발해.
```

---

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 2026-05-12)

**예약 UI 정렬 + SVG favicon 버그 fix + 앱 아이콘 교체 (미배포)**
- ReservationsTimelinePage Source 컬럼 + 필터 chip (All / Customer / Staff). Customer/Staff/Walk-in 뱃지
- 액션 버튼 LiveOrders 정렬: forward = destination status 색 + 흰 글자 (Confirm `#10B981` / Arrived `#635BFF` 브랜드 메인 / Seated `#8B5CF6` / Completed `#9CA3AF`), No-show + Cancel × = LiveOrders 연회색 (`#F6F9FC`/`#6B7C93`/`#E6EBF1`). 공용 `ActionButton`/`IconButton` import
- STATUS_COLOR 를 Tailwind 팔레트로 정렬 (ORDER_STATUS_STYLE_GUIDE 일치). ACTION_LABEL / STATUS_LABEL 대문자화 (Confirm/Arrived/No-show 등)
- Pending approval ↔ Today 중복 제거 (Today 는 pending 필터 아웃)
- PwaInstallBanner Dismiss 텍스트 → × 아이콘 (28×28)
- 앱 아이콘 새 SVG (Irene 제공) → sharp 로 PNG 192/512/180/48 + 64-px favicon.ico 생성. `manifest.json` SVG 우선 + PNG fallback. `index.html` apple-touch-icon href 설정
- **Site-settings SVG 파비콘 업로드 버그 fix** — `imageProcessor.js:320` regex `^data:image\/(\w+);base64,(.+)$` 가 svg+xml 의 `+` 미매칭 → `[a-zA-Z0-9.+-]+` 로 확장. SVG 는 sharp 변환 안 거치고 .svg 벡터 그대로 저장. 실패 시 400 반환 (기존 favicon wipe 방지)
- Favicon 즉시 갱신 UX — 저장 후 응답 `settings` 로 state 갱신 + cache-bust 토큰 `?v=Date.now()` 으로 LogoPreview / 모든 link[rel~='icon'] / apple-touch-icon 무효화. App.tsx 글로벌 favicon 도 동일 처리
- UI_DESIGN_GUIDE 4.2.1 신규: 상태 전환 액션 버튼 strict 규칙 (LiveOrders 4 색 + 공용 컴포넌트 import + Material/파스텔 채움 금지)

### 검증
- API 실호출: SVG `data:image/svg+xml;base64,...` PUT 200 → DB 저장 → 파일 디스크 확인 (`/var/www/uploads/logos/favicon.svg` 572 bytes)
- 예약 API source 정상 반환: customer_mobile 3 / staff_phone 1 / walk_in 1 + pending 1
- Health-check 78/78 통과
- 빌드 main.6471d9fd.js (exit 0, 0 신규 경고)
- dev 페이지 200 응답

### 이전 누적 작업 (2026-05-11 기준 — 운영 배포 완료)
- 사이드바 2단 구조 전면 리디자인 + 헤더 80px 통일 (Sentry/Stripe/Linear 패턴, 6 역할 통일, lucide 아이콘)
- Reservation R1 customer_id fix + 백필 스크립트
- ManagersPage / RestaurantsPage SubscriptionFormFields 통합
- User.auto_renew 컬럼 추가

### 다음 할 일

1. **버전 결정** — 사이드바 UX 큰 변경 → v3.29 올릴지 (CHANGELOG Unreleased → v3.29 이동 + 릴리즈 노트 + 블로그)
2. 후속 후보 (우선순위):
   - Reservation R2 — deposit 결제 UI / 캘린더 monthly view / WaitingList / 보증금 자동 환불 cron
   - Reservation 동시 booking race window — advisory lock 또는 SERIALIZABLE 트랜잭션
   - Reservation timezone 시드 데이터 정리 (`at(19,30)` 서버 UTC 기준 → MY 표시 시 +1day 이슈)
   - SubscriptionsPage Edit SubscriptionFormFields 통합 검토 (Status dropdown + custom plan 보존 설계)
   - PageSettingsLink i18n 4언어
   - Foodcourt `isRouteAllowed('/pos/foodcourt/general/reports')` false 원인 fix (plan 모듈 매핑)
   - 운영 demo 시드 ID 파라미터화

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
