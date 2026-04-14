## 현재 작업 상태
**마지막 업데이트:** 2026-04-14 (v3.14 운영 배포 + hotfix — /개발완료)
**현재 버전:** v3.14
**작업 상태:** 완료 (운영 배포 2회, smoke 10/10 × 2)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### 운영 배포 1 (06:27 UTC 2026-04-14) — `main.0028215c.js`

1. **인보이스 발행자 은행계좌 정보 복구 + PDF 안전 분할**
   - `invoices-helpers.js`: `extractBankFromPaymentSettings` 헬퍼 추가. Brand/Foodcourt 분기에서 `payment_settings.bankTransfer[currency]` JSON 우선 읽기, legacy 컬럼 폴백
   - `invoices-main.js`: 메인 `/api/invoices` GET 에 `issuerInfo` 추가 (캐시로 N+1 방지)
   - `invoicePdf.ts` 신규: `renderIframeToPdf()` — 캔버스 픽셀 행 스캔으로 흰색 행 찾아 안전 분할. `INVOICE_PRINT_CSS` 상수
   - 5개 invoice 페이지 (Admin/Restaurant/Brand/Foodcourt/Owner) 모두 공통 util 호출 + `issuerInfo` 우선 렌더
   - 뷰/프린트/다운로드 3경로 모두 은행정보 표시 확인

2. **Kitchen Stations 3개 이슈**
   - `SettingsPage.tsx:4697` uncategorized 필터: `p.category` → `p.categoryId ?? p.category_id`
   - `kitchen-stations.js GET /`: stations 0개이면 "Kitchen" default station 자동 INSERT (lazy)
   - stations ≤ 1 일 때 초록 안내 배너 + Assignment Mode/경고 숨김
   - `useSetupStatus.ts:103`: `result.data?.stations || []` 로 올바른 파싱 → 온보딩 체크리스트 즉시 완료

3. **Legacy email 템플릿 2개 → emailLayout() 교체**
   - `authService.js notifyAdminNewSignup` (신규가입 admin 알림 — 운영 레거시 발송 사건의 템플릿)
   - `routes/public.js` 문의 답변 메일
   - `sendPlatformEmail` 이 `cid:purplehere-logo` 자동 감지 → 로고 CID 첨부

4. **POST /api/restaurants 역할 가드 (HIGH 보안 갭)**
   - `requireRole('System Admin', 'Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner')` 추가
   - 회원가입 흐름 (`authService.js Restaurant.create`) 미영향
   - `health-check.js` regression test 추가 (39 → 40 통과)

#### 운영 배포 2 hotfix (07:14 UTC 2026-04-14) — `main.3fe57608.js`

5. **공지 가시성 + Updates 배지**
   - `/api/notices/sent`: System Admin 로그인 시 `author_id IN (모든 SA ids)` 로 확장. 이전엔 `req.user.id` 로 본인 작성만 → release-post 스크립트가 id=1 로 고정 생성한 공지를 Irene(id=4) 이 못 봄
   - 5개 역할 NoticesPage (Admin/Brand/Foodcourt/Owner/Restaurant): `updates` 카테고리에 보라색 "Updates" 배지 추가. 기존 `guide` 배지 패턴 재사용
   - 검증: Irene (prod id=4) `/sent` 응답 0 → 14건, v3.14 포함

### 문서 업데이트
- `DEVELOPMENT_PLAN.md`: v3.14 완료 섹션 추가
- `CHANGELOG.md`: v3.14 섹션 — 4개 종합 fix + hotfix 추가
- `docs/KITCHEN_STATION_SYSTEM.md`: lazy default 생성 + 1-station UI 분기 문단 추가
- `docs/EMAIL_SYSTEM.md`: notifyAdminNewSignup / public.js 문의 답변 emailLayout 전환 기록. TODO 목록에서 Contact 확인 메일 항목 제거

### v3.11 건너뜀
- 질문 있었음. CHANGELOG + git 이력 확인 — v3.10 → v3.12 로 버전 번호만 건너뛴 것. 공지/블로그도 v3.11 없음. 그대로 두기로 결정

### 다음 할 일
1. **운영 플랜 수동 체크** (Irene 직접): `/pos/admin/plans` 에서 신규 advanced 모듈 8개 (Work Manuals, Ingredients, Suppliers) 를 Restaurant/Brand/Foodcourt/Owner 플랜에 체크
2. **`branch_name` 표시 점검**: 모든 역할 모든 페이지 레스토랑 이름 옆 `branch_name` 누락 페이지 찾기
3. **"No Active Subscription" 배너 정책**: Free 플랜 자동 발행 vs 배너 vs 차단 — Irene 판단 필요
4. **N:M 조인 테이블 DROP** (`brand_product_brands`, `supplier_brands`): 2026-04-13 읽기 중단 후 1-2주 안정화 완료 시점에 DROP
5. **고객 비밀번호 리셋 메일 emailLayout 전환** (`routes/customers.js`): 레거시 HTML 마지막 남은 사이트
6. **`POST /api/contact/inquiries` 알림 미구현** (System Admin 에게): EMAIL_SYSTEM.md TODO #1

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
