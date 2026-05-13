# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-13
**버전:** **v3.30** (2026-05-13 운영 배포 완료 / smoke 10/10)
**작업 상태:** 배포 완료

---

## ⚡ 빠른 재개

```
session-state.md 읽고 이어서 개발해.
```

---

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 2026-05-13)

**v3.30 운영 배포 완료 (smoke 10/10, 빌드 main.44e0d72d.js)**

- 배포 스크립트 `/var/www/deploy-to-production.sh --auto` 2회 실행 (07:32 UTC backstage, 07:45 UTC PWA+알림 통합 + 버전 bump)
- Backend rsync (7 + 22 파일) + Frontend rsync (713 + 718 파일)
- DB 스키마 dev/prod 일치 (130 tables), Migration 11건 모두 OK
- 백업 `/var/www/backups/20260513_074418`
- 릴리즈 블로그 `release-v3.30` (id=89) + System Admin 공지 id=57 (운영 5 수신자 자동 생성)

**PWA 데스크탑/모바일 앱 빈 화면 fix**

- `manifest.json` `start_url`: `/pos/login?utm_source=pwa` → `/pos?utm_source=pwa` (App.tsx `/pos` = LoginPage 실제 라우트)
- LoginPage useEffect 가 인증 시 역할별 dashboard 로 자동 navigate → 사용자 재설치 후 정상 진입

**알림 우리 규칙 정확 반영 (단일 source of truth 통합)**

- `pushService.isCategoryEnabled` 통합: `notification_preferences[cat]` 우선 + `push_preferences.categories[cat]` fallback (둘 중 하나라도 false 면 차단)
- NotificationSettings UI 토글이 푸시도 즉시 차단 (이전엔 이메일만 차단됐음)
- pushService `User.findByPk` attributes 에 `notification_preferences` 추가
- 미사용 `OPT_IN_CATEGORIES = ['marketing','owner_report']` 제거
- 카테고리 정의 단일 source = `routes/notification-settings.js NOTIFICATION_CATEGORIES` (25 카테고리, role/section/push_only 메타)

**Stock Items 페이지 로딩 성능 425배 (3.15MB → 7.4KB)**

- 원인: `ingredients.image_url` 에 base64 PNG (각 1.5MB) 인라인 저장. IngredientsPage 는 image_url 사용도 안 함
- `scripts/migrate-base64-images.js` 신규 — ingredients 6건 → 디스크 파일 (sharp 600×600, 평균 75KB), company_settings.og_image_url 1건 (153KB→33KB), products.image 누락 1건 NULL 처리
- 백엔드 신규 입력 가드: `routes/restaurants-ingredients.js`, `routes/ingredients.js` POST/PUT 에 `normalizeIngredientImage` 추가 (base64 들어오면 자동 `saveImageToFile` 디스크 저장 + URL 변환)
- `utils/imageProcessor.saveImageToFile` 에 `subdir` 옵션 추가 (logos/ 외 임의 dir)

**MenuManagement onError TypeError fix**

- `e.currentTarget.parentElement.innerHTML` 직접 교체하던 React 안티패턴 (null.style TypeError + 무한 루프 가능)
- `<MenuItemImageWithFallback>` 컴포넌트 + useState 패턴으로 교체. sweep 결과 같은 안티패턴 다른 곳 없음

**모바일 햄버거 메뉴 2뎁스 펼침**

- `SecondaryPanel` 이 `@media (max-width: 768px) { display: none }` 라서 모바일에서 1뎁스만 노출되던 결함
- `MobileSubmenu` styled-component 신규 (RailItem 바로 아래 inline accordion, 흰배경, ≤768px 만)
- `mobileExpandedCatId` state — 한 카테고리 펼침. location active 카테고리는 진입 시 자동 펼침
- 적용 6 역할 (useTwoTier): System Admin / Brand / Foodcourt / Owner / Supplier / Restaurant Admin

**빌드 파이프라인 견고화**

- `deploy-dev.sh` — 다중 user (irene/lua) 번갈아 빌드 시 chmod fail 로 배포 중단되던 결함. `find -not -user CURRENT_USER` 로 다른 user 소유 파일도 자동 chown

**개발 환경 — lua 사용자 ACL 부여 (운영 영향 없음)**

- `/var/www/dev-frontend`, `/var/www/dev-backend`, `/var/www/dev-frontend-build` 에 `setfacl -R -m u:lua:rwX` + default ACL
- lua 가 랜딩 페이지 등 어떤 파일이든 직접 수정 가능 (root 그룹 추가 없이 ACL 로 scope 한정)

**Docs / Memory 갱신**

- `docs/PWA_PUSH_NOTIFICATIONS.md` — isCategoryEnabled 통합, notification_preferences 컬럼 row 추가
- `memory/reference_pwa_install.md` (신규) — manifest start_url == 실제 라우트 규칙
- `memory/reference_image_storage_rule.md` (신규) — DB 컬럼 base64 인라인 금지, saveImageToFile 표준 패턴
- `memory/reference_notification_rules.md` (신규) — 알림 카테고리 + 토글 단일 source 정의
- `CHANGELOG.md` v3.30 섹션 이동, `[Unreleased]` 비움

### 다음 확정 작업
- 없음 — 지시 대기 (v3.30 운영 배포 완료, 새 사이클 시작 전)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **Reservation 후속** — deposit 결제 UI / 캘린더 monthly view / WaitingList / 보증금 자동 환불 cron
- **Reservation 동시 booking race window** — advisory lock 또는 SERIALIZABLE 트랜잭션 (R1 에서 WONTFIX 명시)
- **SubscriptionsPage Edit SubscriptionFormFields 통합** — Status dropdown + "others" custom plan 보존 설계 필요
- **PageSettingsLink i18n** — `<PageSettingsLink>` 라벨 4언어 (현재 영어 고정)
- **`_localToUTC` DST 보정** — 현재 `now` 기준 offset 사용. MY/KR/SG 무영향이지만 미래 대비
- **운영 demo 시드 ID 파라미터화** — 데모 계정 마킹 스크립트 하드코딩 정리
- **`push_preferences` 컬럼 deprecate** — v3.30 에서 fallback 으로만 사용. 다음 마이그레이션 사이클에 컬럼 제거 + isCategoryEnabled 의 fallback 분기 삭제
- **이미지 컬럼 sweep** — 다른 모델(brands.logo 등)에도 base64 들어와 있을 가능성 정기 스캔 스크립트 + alert

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
