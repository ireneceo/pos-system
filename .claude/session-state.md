## 현재 작업 상태
**마지막 업데이트:** 2026-04-09
**현재 버전:** v3.12
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- fix: 프린터 설정 저장 버그 (store.js allowedFields에 printer_settings 누락)
- fix: ImageUploadDropzone 자동저장 안정화 (수동 triggerSave)
- fix: StoreContext 아키텍처 개선 (AuthProvider > StoreProvider 구조, user 의존)
- fix: StoreContext 기본값 'FOODCOURT CENTRAL' → 빈 문자열
- fix: LiveOrders 빌프린트 미리보기 로고 누락 (receiptSettings 로드 + img 추가)
- fix: 영수증 인쇄 시 로고/멤버십QR/커스텀QR/푸터 누락 (React state + localStorage 이중 전달)
- fix: 멤버십 QR URL `/m/{id}` → `/mobile/{slug}/account` (올바른 프로필 페이지)
- fix: 멤버십 QR 외부 API 의존 제거 → 로컬 QRCode.toDataURL 생성
- fix: getStoreInfo()에 receiptSettings/slug/membershipQR/timeZone 통합
- fix: QR Code Mode (Static/Session) AutoSaveField 적용 (개별 라디오 감싸기)
- fix: FloorPlan Print QR 브라우저 인쇄 모드 미적용 (shouldUseBrowserPrint 체크 추가)
- fix: Table QR 프린트 레이아웃 개선 + 시간/만료 표시 + 타임존 적용
- fix: StoreContext URL 레스토랑 ID 변경 감지 (다른 레스토랑 데이터 혼재 방지)
- UI_DESIGN_GUIDE.md AutoSaveField 필수 규칙 추가
- CLAUDE.md 타임존 규칙 추가

### 다음 할 일 (최우선 순서)

#### 0. POS 로그인과 모바일 고객 로그인 세션 충돌 (최긴급)
- **문제**: 같은 브라우저에서 POS 관리자 로그인 + 모바일오더 고객 로그인이 섞임
- **증상**: 모바일에서 고객으로 로그인하면 POS 관리자 세션이 끊겨서 관리자 페이지가 닫힘
- **원인 추정**: 같은 `auth_token` localStorage 키를 공유 → 고객 로그인 시 관리자 토큰 덮어쓰기
- **기대**: POS(관리자)와 모바일(고객)은 완전히 별도 인증 체계
- **참조**: `dev-frontend/src/contexts/AuthContext.tsx`, `dev-frontend/src/mobile/` 인증 흐름

#### 1. 포인트 사용 기능 안 나오는 문제 (긴급)
- **POS 터미널**: 결제 시 포인트 사용 선택 기능 안 나옴
  - 확인: `POSTerminalPage.tsx` 결제 모달에서 포인트 관련 UI 확인
  - 운영 DB restaurant 10: `MembershipSettings.is_active = true`, `points_to_currency = 100`
- **모바일 결제** (`/mobile/{slug}/payment`): 로그인 상태에서도 포인트 사용 안 나옴
  - 조건: `currentCustomer && membershipSettings?.is_active` + `availablePoints >= min_points_to_use(100)`
  - 확인: PaymentPage.tsx 593행 `/api/membership/settings/{store.id}` 응답 + 고객 포인트 확인
- **참조 파일**: `dev-frontend/src/mobile/pages/PaymentPage.tsx`, `dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx`

#### 2. 쿠폰 필터링 (모바일 Account 페이지)
- **문제**: `/mobile/{slug}/account`에서 My Coupons에 모든 쿠폰이 표시됨
- **기대**: 해당 유저에게 적용되는 쿠폰 + 전체 공개 쿠폰만 표시
- **확인**: `routes/coupons.js` 44행 — target_type 필터링은 있으나, `target_type`이 null인 쿠폰이 전부 통과
- **참조**: `dev-backend/routes/coupons.js`, `dev-frontend/src/mobile/pages/AccountPage.tsx`

#### 3. 회원가입 후 자동 로그인
- **문제**: 모바일에서 회원가입 완료 후 다시 로그인 화면으로 이동
- **기대**: 가입 즉시 로그인 처리 후 Account 페이지로 이동
- **참조**: `dev-frontend/src/mobile/pages/RegisterPage.tsx`

#### 4. 타임존 미적용 81곳 전체 수정 (대규모)
- `utils/dateFormat.ts` 유틸 함수 작성 → 81곳 순차 적용
- DEVELOPMENT_PLAN.md "다음 1.5" 참조
- 상세 계획: billPrint.js(11) → 인보이스(18) → 매출(11) → POS(4) → 대시보드(6) → 관리자(30+)

#### 5. Franchise & Tenancy Management Phase 2 나머지
- #11 Plan 연결 UI (ContractPlan + EntityPlanRestaurant)
- #12 Restaurants 페이지 보완 (계약 뱃지 + 연결 플랜)
- #13 Foodcourt Unit Management UI

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
