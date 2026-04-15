## 현재 작업 상태
**마지막 업데이트:** 2026-04-15 (모바일 이미지 파이프라인 + 엔티티 브랜딩 이메일)
**작업 상태:** 완료 (dev 검증 완료, 이메일 브랜딩 운영 배포 대기)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### 긴급 이슈 1: 모바일 주문 상품 상세 진입 불가
- `routes/mobile-public.js:413` `getPreparationTime()` 호출 제거 → `|| 15` 리터럴로 교체
- 운영 영향: with MIN Cafe 포함 모든 레스토랑 모바일 주문에서 상품 탭 시 장바구니 담기 실패 → 복구
- 이미 Irene이 운영 배포 완료 (2026-04-15 06:08 UTC)

#### 긴급 이슈 2: 모바일 메뉴 카테고리 전환 30초+ 로딩
- `utils/imageProcessor.js:processImage()` 재작성 — sharp 로 파일 저장 + URL 반환 (이전엔 base64 JSON 반환하던 버그)
- `routes/menu.js` create/update 2곳: `JSON.stringify` 제거, `image` + `image_thumbnail` 분리 저장
- `scripts/migrate-images.js` 기존 스크립트로 운영 290건 base64 → 파일 변환 (289 성공, 1 스킵)
- 운영 `products.image` 컬럼 35.4MB → 0.01MB
- 모바일 `/api/mobile/menu/with-min-cafe` 응답 2,394KB → 44KB (~55배 감소)
- Irene이 운영 배포 완료 (2026-04-15 08:51 UTC)

#### 긴급 이슈 3: 카테고리 전환 시 전체 페이지 리로딩 flicker
- `MenuPage.tsx:handleCategoryChange` 가 `loadMenu()` 경유 → `setIsLoading(true)` → 페이지 전체가 `<LoadingContainer>Loading menu...</LoadingContainer>` 로 교체되는 현상
- 수정: inline fetch 로 전환, `setIsLoading` 건드리지 않음
- `categoryCacheRef: useRef<Map<string, MenuItem[]>>` 추가 — 재방문 시 네트워크 0
- Irene이 운영 배포 완료 (2026-04-15 09:10 UTC)

#### 이메일 엔티티 브랜딩 시스템 구축 (운영 배포 대기)
- `utils/emailBranding.js` 신규 — `getEntityBranding(entityType, entityId)` + sharp pre-resize (height 40px / max-width 280px) → Buffer CID 첨부
- `utils/emailService.js` — `sendEntityOrPlatformEmail(entityType, entityId, mailOptions)` 헬퍼 추가 (entity SMTP 시도 → "not configured" 에러 시 플랫폼 fallback)
- `routes/customers-auth.js` 고객 비밀번호 리셋 전환 — 레스토랑 브랜딩 + fallback + 하드코딩 `restaurantId=1` 제거
- `utils/notificationTemplates.js` — 8개 템플릿에 `_title/_body/_lang` non-enumerable 메타 포함 (`withRenderMeta`)
- `utils/notificationService.js` — `resolveReceiverBranding(user)` + `sendNotification` 수신자별 재렌더 파이프라인
- `utils/emailTemplates.js:emailLayout` 로고 렌더 규칙 재작성 — 3 분기: (1) hasIssuer+logo → pre-resized img 링크 없음, (2) hasIssuer+no logo → 브랜드 이름 텍스트, (3) !hasIssuer → PurpleHere 기본 (기존 유지)
- 푸터 조건부 링크 — entity 브랜딩 시 PurpleHere 도메인/notification-preferences 링크 완전 제거, entity website 있으면 그것만 표시
- 첨부 정책 분기 — entity 브랜딩 → entity 로고만 / PurpleHere 기본 → `getLogoAttachment()` (html 에 `cid:purplehere-logo` 있을 때만 자동)
- **System Admin 발송 메일은 영향 없음** (`auth.js`/`users.js`/`public.js`/`authService.notifyAdminNewSignup`/`systemLogger.js` 등 `emailLayout(body)` 경로는 그대로)

### 검증
- dev health-check: 40/40 통과
- state-hydration-check: 0 warnings
- 통합 API 테스트: 39/39 (Write→Read 왕복, 권한별, 에러케이스)
- 브랜딩 유닛 테스트: 27/27 (로고 있음/없음, Restaurant/Brand/Foodcourt, 텍스트 fallback, 재렌더)
- 실제 이메일 수신 테스트: irene@irenewp.com 으로 5케이스 반복 발송하여 Irene 육안 확인

### 다음 할 일

#### 운영 배포 대기 (Irene 본인 실행)
이번 세션의 이메일 엔티티 브랜딩은 dev 검증 완료, 운영 배포는 Irene이 직접 `/var/www/deploy-to-production.sh --auto` 실행 예정.

#### 후속 개발 과제 (DEVELOPMENT_PLAN.md 기반)
1. **고객 회원가입 환영 + 이메일 인증 플로우** (현재 미구현, 구현 시 플랫폼 이메일)
2. **주문 확인 / 영수증 메일** (현재 미구현, 구현 시 레스토랑 SMTP 우선 + 플랫폼 fallback)
3. **branch_name 표시 전수 점검** — 모든 역할/페이지의 레스토랑 이름 옆 branch_name 누락 감사 (중규모)
4. **"No Active Subscription" 배너 정책 결정** — Free 플랜 자동 발행 vs 배너 vs 차단 (Irene 판단)
5. **N:M 조인 테이블 DROP** (`brand_product_brands`, `supplier_brands`) — 2026-04-13 읽기 중단 후 안정화 완료 시점
6. **구독 Trial→Overdue/Suspended 전환 알림** (EMAIL_SYSTEM.md TODO #2, #3)
7. **다른 이미지 경로 (Brand logo, Foodcourt logo, Ingredient image 등) base64 저장 여부 감사** — 상품 이미지와 동일 구조 문제 없는지 확인

#### Irene 직접 확인 필요 (코딩 아님)
- `/pos/admin/plans` 에서 신규 advanced 모듈 8개 (Work Manuals, Ingredients, Suppliers) 를 Restaurant/Brand/Foodcourt/Owner 플랜에 체크

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
