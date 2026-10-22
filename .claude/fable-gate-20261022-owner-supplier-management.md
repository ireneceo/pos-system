# [Fable 게이트] 오너 공급업체·가격 관리 · 발주/관리 권한 분리 · 오너 공통으로 올리기 (2026-10-22)

> 설계: `.claude/fable-design-20261019-owner-supplier-management.md` · Irene 답(10-22) «권고대로 진행해 줘» → 컨펌 ①A ②A ③예 ④승인 ⑤0이면 제거 ⑥월결제 거부 유지.
> 종류: `gate`(권한 경계 ⑤ · 운영 행 소유 변경 · 🔒 MainLayout 접촉 · 배포 마이그 1개). 규칙: `/var/www/CLAUDE.md` §0 · «검증 규율 4조항» · `~/dev-server/FABLE.md`.
> 팀원 보고의 숫자는 전부 **내가 다시 돌려** 확인했다(증거 스크립트 · health-check security · 가드 3종 · 고장주입 1회 추가).

## 0. 판정 — **통과 (게이트에서 구멍 1개를 찾아 Fable 이 직접 정정한 뒤 통과)**

| 조항 | 결과 |
|---|---|
| ① diff 범위 대조 (설계 밖 변경 0) | ✓ — 설계 밖 변경 3개는 전부 설계의 뜻 안(아래 §2), 설계에 어긋나는 것 0. 인쇄 코드 접촉 0(`_printPollFn` diff 에 없음) |
| ② 가드 스크립트 | ✓ `check-sensitive-diff` = 게이트 대상(①③⑤ — 정상) · `check-print-guard` = MainLayout 1건만(bless 전 정상) · `check-migration-registry` 미분류 0 · `tests/context-requests.test.js` 15/15(키 목록 3곳 일치) |
| ③ 실호출·회귀 | ✓ 증거 스크립트 **24/24**(내 실행 2회 — 정정 전·후) · health-check security **97/97** · 고장주입 **4회**(팀원 3 + 내 1) 전부 ✗ 가 떴다가 원복 후 통과 |
| ④ 배포 안전성 | ✓ 마이그 1개 멱등(`--dry-run` = 적용 · 2회째 0 · registry `deploy`) · 스키마 변경 0 · ENUM 0 · 롤백 = 코드 되돌림만(올리기로 바뀐 운영 행은 아직 0 — 운영에서 쓰기 전) · SW bump/배포 기록은 배포 방 몫 |

## 1. 게이트에서 찾은 구멍 1개 — 설계 §3-C 의 오류, 정정 적용

- **증상**: 설계가 «공급업체 4경로 → `inventory`» 로 적어 팀원이 그대로 구현했다. 그런데 발주 작성 화면(`NewPurchaseOrderPage.tsx` `fetchCatalog`)의 상품 목록이 `GET /api/supplier-catalog` 다 → **`purchasing` 만 가진 직원은 상품 목록이 403 → 발주를 만들 수 없었다.** 팀원 실호출 ④ 의 «purchasing 만: 업체 403» 이 바로 그 값이고, 실브라우저는 사이드바까지만 봐서 못 잡았다. 마이그로 기존 직원은 둘 다 가지므로 배포 당일 사고는 아니지만, RA 가 «발주만» 직원을 새로 만들면 바로 터진다.
- **정정(Fable 직접 · 설계 §10 에 기록)**: 공급업체 4경로 **읽기(GET)** = `inventory` 또는 `purchasing` · **쓰기(POST/PUT/DELETE)** = `inventory` 만. 분리의 뜻(발주하는 것 / 관리하는 것 = 쓰기)은 그대로. 화면 변경 0.
- 바뀐 파일: `dev-backend/middleware/buyerScope.js`(직원 분기 6줄) · `scripts/health-check.js`(«직원 발주/업체 권한 분리» 검사를 읽기/쓰기 4열 × 4조합으로) · `.claude/evidence-…-test.js` ④ · `content/structure-map.html` 표 «보기» 행 · `docs/SUPPLIER_CONTRACT_SYSTEM.md` §H-4 · 설계 문서 §10.
- **반증**: 읽기 절을 `inventory` 만으로 되돌려 주입 → 증거 ④ «purchasing 만» ✗(200/403/403/403/403) · health-check 그 검사 ✗(96/97) → 원복 → 24/24 · 97/97. pm2 restart 매번.
- 알려진 결과: 청구서 화면 «외부 월정산서 발행» 단추(`ExternalSoaIssueButton` — `GET /api/external-suppliers`)는 `inventory`·`purchasing` 둘 다 없는 직원에게 숨는다(403 → 목록 0 → 단추 없음, 오류 아님). 전엔 직원 게이트가 없어 누구나 보였다. 이 사안 밖.

## 2. 설계 밖 변경 3개 — 전부 승인

| 변경 | 판정 |
|---|---|
| `promote-to-owner` 에 «이미 오너 것이면 400 `ALREADY_SHARED`» | 승인 — 설계 §5-③ «다시 올리기 400» 을 맞추는 유일한 길 |
| 🔒 MainLayout 1줄 더: 직원 Operations 섹션 `visible` 에 `\|\| hasMenuPermission('purchasing')` | 승인 — 없으면 purchasing 만 가진 직원에게 섹션이 통째로 안 보여 발주 메뉴가 사라진다. 인쇄 코드 무접촉(diff 11줄 전부 nav) |
| 마이그 대상에 `user_context_requests(pending)` 추가 | 승인 — 승인되면 그 값이 모자로 가므로 빠뜨리면 초대 중인 직원만 발주를 잃는다 |

## 3. 설계 핵심 대조 (코드 실측)

- **A 전환 문**: `OWNER_ACTING_ROUTES` +9 정규식, `isOwnerActingRoute` 가 `?` 앞을 자른다(쿼리 붙은 GET 도 매치) · 4 라우터는 `router.use([...], authenticateToken, requireBuyerRole)` 한 줄 아래 · 재료 3경로 403 유지(증거 ②).
- **B 올리기**: 한 트랜잭션 · 행 id 유지 · 오너 계약 1(`payment_terms` 복사) · 매장 행 destroy(paranoid → `deleted_at`) — 운영 코드(routes/utils/services/middleware)에 `supplier_contracts` 원시 SQL **0건**이라 soft-delete 행이 상속을 가릴 길 없음(증거 ③ 매장 2·3 `scope:'owner'`) · 상품·연결·발주 id 동일(증거 ③) · 고유 색인 위반 → 409(증거 ③ 사본 2개째) · 월결제 400 · 가입 공급업체 400 · 남의 매장 403 · 전환 없이 403.
- **C 권한**: 키 3곳 일치(jest ⑪) · 서버 게이트 위 §1 정정본 · 마이그 멱등.
- **D 🔒 MainLayout**: 설계 5줄 + §2 의 1줄 = 6줄, 전부 사이드바 항목. `_printPollFn`·인쇄 코드 0줄.
- **E 화면**: `ownerPoScope.ts` 에 범위 저장 1곳(`ownerSupplierScope`, 매장을 고르면 발주 범위도 맞춤) · 5개 화면 19곳 `withOwnerSupplierScope` · 올리기 단추는 `source==='external'`(자기 등록·브랜드 사본 = 서버 `scope:'own'`) 카드에만, FROM OWNER·가입 공급업체 카드엔 없음(설계대로) · `AllSupplierProductsView` «내 아이템에 추가» 는 오너에게 그대로 숨김 · i18n 4언어 키 있음.
- **G 잔재 제거**: 운영 읽기 0건 → `brand_suppliers` 카드 루프 제거, `SourceKey` 유지(컨펌 ⑤대로).

## 4. 확인 못 한 것 (추측하지 않는다)

- 가입 공급업체 계약 신청·종료를 오너 전환으로 **화면에서** 끝까지 누르기(서버 GET 200 · POST 정규식 매치만 확인).
- 실제 휴대폰 · 오너 모자(BG 23 같은 경우) 실계정 — health-check «오너 모자» 가 같은 투영을 검사하므로 원리상 같다.
- `verify-all --full` 은 팀원 1회(21/24 — ✗ 3 = 보호파일 무결성 2곳(bless 전) + 배포 기록/SW 버전(배포 방 몫)). 내 정정은 서버 코드만이라 번들 지문 불변 — 다시 돌리지 않았다.

## 5. 이 사안 밖 기존 사실 (팀원 보고 그대로 · 고치지 않음 · 별건)

1. `POST /api/restaurants/:id/ingredients/from-catalog` 는 매장 라우트(`checkRestaurantAccess`)라 오너가 매장 주소로 재고아이템·연결을 만들 수 있는 길이 **이 작업 전부터** 열려 있다(화면은 오너에게 숨김). Irene ② «연결은 RA 몫» 은 구매자 라우트에서만 막혀 있다. 막으려면 매장 라우트 쪽 별도 판정 — 새 사안.
2. `PUT /api/external-suppliers/undefined` → 500(HEAD 그대로).

## 6. 마커

- `check-print-guard.js --bless` → `fable-gate.js pass` 순서(bless 가 baseline 을 바꾸므로 먼저).
- 운영 반영: 다음 배포 때(마이그 `migrate-staff-purchasing-permission.js` 포함 → 배포 게이트가 돌린다).
