# ④ 브랜드 다중 관리자 — 코드 지시서 (Fable · 2026-10-04 · D1″=「같이」 확정분)

> 근거: `.claude/fable-verdict-20260929-structure.md` §4 D1″ · §6 항목 10. Irene 2026-10-04 「권고대로 해」.
> Irene 2026-09-25 「너가 판단하지마. 이건 복잡한 구조야」 → **이 문서는 Fable 이 코드 형태까지 정한 것이다. 옮겨 적는다.**
> 옮기다 앵커가 없거나 다르면 **중단하고 사실만 보고**한다. 구현 중 세부(에러 문구·글리프·키 이름)는 팀원이 정해 결과에 붙인다.
> 이 사안의 Fable 재호출은 **코드 묶음 게이트 1회**만.

---

## 0. 판정 — §6 항목 10 의 두 글자를 바꾼다

§6-10 은 「`brand_managers(brand_id, user_id)` 최소 1표 · 화면: 브랜드 설정에 관리자 추가/삭제」라고 썼다. 실측(팀원 2026-10-04 + 내가 읽은 코드) 결과 **기존 표가 있다** — 그래서 §6-10 의 「기존 표가 있으면 그것」 조항이 선다.

| | 결정 |
|---|---|
| **관리자 표** | **`user_contexts` 행 `(entity_type='brand', role='Brand Manager')`** — ENUM 에 둘 다 이미 있다(dev `SHOW CREATE TABLE` 확인). 새 표 **만들지 않는다**. |
| **「관리자」의 뜻** | **= Brand Manager 역할**. 이미 있는 개념이다 — 네이티브(`users.brand_id`)든 모자(`user_contexts`)든 **같은 역할·같은 판정**(`utils/managerBrandScope.brandIdsForUser` = 소유 ∪ 배정). 세 번째 「브랜드 관리자」 목록을 만들면 CLAUDE.md 「기존 개념에 새 목록·경로 금지」 위반이다(재료 4벌 사고와 같은 모양). |
| **부여 화면** | **SA Staff Management 의 기존 `UserContextsSection`** 에 유형 선택(매장/브랜드) 1칸 추가. 브랜드 설정 화면에 새 추가/삭제 UI **만들지 않는다**. 이유 ① 설계 §8-3·Q3 「부여는 SA 전용」 봉인 유지(오너 모자 9/25 와 같은 길) ② 새 라우트 0 ③ 운영 수요 = 계정 2개(user 11·19), SA 수동으로 충분. 브랜드 소유자가 직접 부여하는 입구는 **후속 별건**(순수 추가). |
| **소유자 전용(그대로)** | 결제 설정·은행(`brands-core.js` `/:id/payment-settings` GET :693 / PUT :729) · 브랜드 수정/삭제(:357·:654) · 스태프 추가/수정/삭제/권한/비번(:881~:1089) · 구독 PUT(`brands-plans.js:47` SA 전용). 전부 **역할·소유자 판정이 이미 BM 을 거부**한다 — 코드 변경 0 으로 보존. 테스트로 증명한다(§4). |
| **고치는 판정처** | 정확히 **둘** — 판정서가 지목한 그 둘. ① 브랜드 메뉴 3파일의 지역 `assertBrandOwnership`(`brands.owner_id === req.bgOwnerId`) ② `middleware/recipeAuth.isBrandManager`(`brand.owner_id !== user.id`). 둘 다 **`brandIdsForUser` 한 함수로 위임**. 98곳 전수 수정 **금지** — 나머지는 아래 §7 「알려진 한계」로 사실만 남긴다. |

설계 문서 §5.2 가 「브랜드 모자는 소유행(user.id) 판정이라 투영 불가」라고 쓴 것과 모순이 아니다 — 이번에 투영하는 것은 **소유자(BG)가 아니라 관리자(BM)** 이고, BM 판정은 2026-09-06·09-08 작업으로 이미 **스칼라(`users.brand_id`) 경로**로 통일돼 있다(`requireBrandScope`·`brands-core` GET `/`·`/:id`·`/:id/restaurants`·franchise-map·franchise-dashboard·staff GET). 스칼라는 투영된다. 남은 둘(위 ①②)만 아직 소유자 비교라 BM 이 「반쪽」이었고, 그 반쪽을 이번에 닫는다.

---

## 1. 백엔드

### A. `dev-backend/utils/managerBrandScope.js` — BM 은 배정 브랜드만
`brandIdsForUser` 안:
```js
  const owned = await Brand.findAll({ where: { owner_id: user.id }, attributes: ['id'] });
  owned.forEach((b) => ids.add(b.id));
```
→
```js
  // Brand Manager 는 **소속 브랜드 하나**다(2026-09-06 판정). 소유 조회를 섞으면 브랜드 모자(user_contexts,
  // 2026-10-04)를 쓴 BG 가 모자 아래에서 자기 소유 브랜드까지 보게 된다 — 모자는 추가가 아니라 교체(설계 §5.4).
  // dev 실측: 소유자 역할이 BM 인 브랜드 0건이라 네이티브 BM 에게는 결과가 같다.
  if (user.role !== 'Brand Manager') {
    const owned = await Brand.findAll({ where: { owner_id: user.id }, attributes: ['id'] });
    owned.forEach((b) => ids.add(b.id));
  }
```
`brandOwnerUserIds` 는 **무접촉**.

### B. `dev-backend/middleware/brandScope.js` — 단일 판정 함수 1개 export
`module.exports` 위에 추가, exports 에 `userCanManageBrand` 포함:
```js
/**
 * userCanManageBrand — 이 요청자가 브랜드 brandId 를 관리할 수 있는가 (소유자 ∪ 관리자).
 * 2026-10-04 ④ 브랜드 다중 관리자: 판정은 utils/managerBrandScope.brandIdsForUser 하나(소유 brands.owner_id ∪ 배정
 * users.brand_id — 브랜드 모자는 투영으로 brand_id 가 채워져 같은 길을 탄다). 형제 브랜드는 열리지 않는다.
 * brand-menus · brand-menu-categories · brand-menu-option-groups 의 지역 assertBrandOwnership 이 전부 여기로 위임한다.
 */
async function userCanManageBrand(req, brandId) {
  if (req.bgOwnerIsAdmin || isSysAdmin(req.user)) return true;
  const id = parseInt(brandId, 10);
  if (!Number.isFinite(id)) return false;
  const { brandIdsForUser } = require('../utils/managerBrandScope');
  const ids = await brandIdsForUser(req.user);
  return ids.includes(id);
}
```
`requireBGScope`·`requireBrandScope` 본문은 **무접촉**(이미 소유 ∪ 배정).

### C. 브랜드 메뉴 3파일 — 지역 판정 삭제, 위임
`routes/brand-menus.js:36-41` · `routes/brand-menu-categories.js:12-16` · `routes/brand-menu-option-groups.js:18-22` 의 `async function assertBrandOwnership(req, brandId) { … }` 전체를 각각 다음 한 줄로:
```js
const assertBrandOwnership = (req, brandId) => userCanManageBrand(req, brandId); // 판정은 brandScope 한 곳(2026-10-04)
```
import 줄 `const { requireBGScope } = require('../middleware/brandScope');` → `const { requireBGScope, userCanManageBrand } = require('../middleware/brandScope');`
각 파일에서 `Brand` import 가 그 함수에서만 쓰였으면 제거(lint). 호출부 46곳(메뉴 34·카테고리 5·옵션 7)은 **무접촉**.

### D. `dev-backend/middleware/recipeAuth.js` `isBrandManager` (111-141)
`const brand_id = …` 아래부터 함수 끝까지를:
```js
  // 소유자 ∪ 관리자(2026-10-04 ④) — 판정은 utils/managerBrandScope.brandIdsForUser 하나. 형제 브랜드 미포함.
  const { brandIdsForUser } = require('../utils/managerBrandScope');
  const ids = await brandIdsForUser(user);

  if (brand_id) {
    const brand = await Brand.findByPk(brand_id, { attributes: ['id'] });
    if (!brand || !ids.includes(brand.id)) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    return next();
  }

  // No URL brand_id — 관리 가능한 브랜드가 하나도 없으면 거부 (dangling BG/BM 우회 방지)
  if (ids.length === 0) {
    return res.status(403).json({ success: false, message: 'No brand owned by user' });
  }
  return next();
```
`isFoodcourtManager` **무접촉**.
실측 사실(내가 확인, 팀원 재grep 후 결과에 첨부): `isBrandManager` 뒤 핸들러 중 `req.user.id` 를 쓰는 곳은 `ingredients.js:57`·`ingredient-categories.js:58`(소유 브랜드 목록 → BM 은 빈 배열) · `suppliers.js:274·318`(소유자 아니면 403) · `recipes.js:1004`(복사 대상 소유자 아니면 403) · `suppliers.js:225`(생성 소유자 = `brand.owner_id` — 이미 관리자를 염두에 둔 코드). **BM 이 자기 id 로 브랜드 데이터를 만드는 길은 없다** — 전부 빈 목록 또는 403 으로 닫힌다. 고치지 않는다(§7).

### E. `dev-backend/services/userContexts.js` — 브랜드 관리자 모자
- `OWNER_HAT` 아래:
```js
// 브랜드 관리자 모자 (v1.2, 2026-10-04 — 판정서 09-29 §6-10 ④, Irene 「권고대로 해」).
// 투영 = role 'Brand Manager' + brand_id = 브랜드 id. BM 판정은 스칼라(users.brand_id) 경로로 통일돼 있어
// (2026-09-06·09-08) 투영이 그대로 먹는다 — 설계 §5.2 가 막은 것은 **소유자(BG) 모자**이고 이것은 아니다.
// 부여는 SA 전용(§8-3). 결제 설정·브랜드 수정/삭제·스태프 관리는 소유자 판정이 BM 을 거부하므로 열리지 않는다.
const BRAND_MANAGER_HAT = { entity_type: 'brand', role: 'Brand Manager' };
function isBrandManagerHat(entityType, role) {
  return entityType === BRAND_MANAGER_HAT.entity_type && role === BRAND_MANAGER_HAT.role;
}
// 부여 행이 가리키는 엔티티 표 — 목록·검증·전환이 같은 표를 JOIN 해야 list ⊆ detail 이 유지된다.
const GRANT_JOIN_TABLE = { restaurant: 'restaurants', brand: 'brands' };
```
- `listContexts`: 기존 restaurant 쿼리 **그대로 두고** 바로 아래에 브랜드 행 쿼리 추가(`JOIN brands b ON b.id = uc.entity_id`, `entityType: BRAND_MANAGER_HAT.entity_type, role: BRAND_MANAGER_HAT.role`, `label: b.name`, `ORDER BY uc.last_used_at IS NULL, uc.last_used_at DESC, b.name ASC`). push 모양은 restaurant 행과 동일(`kind:'granted'`, `id`, `entity_type`, `entity_id`, `role`, `label`, `last_used_at`).
- `validateGrantedContext`: 오너 분기 아래, `if (!isV1GrantableCombination(...)) return false;` 를
  `if (!isV1GrantableCombination(ctx.entity_type, ctx.role) && !isBrandManagerHat(ctx.entity_type, ctx.role)) return false;` 로. 쿼리의 `JOIN restaurants r ON r.id = uc.entity_id` → `JOIN ${GRANT_JOIN_TABLE[ctx.entity_type]} r ON r.id = uc.entity_id`(테이블명은 위 상수에서만 오므로 주입 없음).
- `getGrantedContextForSwitch`: 같은 조건 확장 + 같은 JOIN 치환. 반환 `entity_type: ctx.entity_type`(현재 `'restaurant'` 하드코딩 → 치환). `brands.status` 가 있으니(모델 :37) `r.status` 그대로 동작.
- exports 에 `BRAND_MANAGER_HAT, isBrandManagerHat` 추가.

### F. `dev-backend/middleware/auth.js` `projectContext` (46-56)
```js
      restaurant_id: (ctx.t === 'owner' || ctx.t === 'brand') ? null : ctx.id, // 오너·브랜드 모자는 매장 스칼라가 없다
      brand_id: ctx.t === 'brand' ? ctx.id : null,                              // 브랜드 관리자 모자(2026-10-04)
```

### G. `dev-backend/routes/auth.js` `/switch-context` (702-733)
`const isOwnerHat = …` 아래 `const isBrandHat = resolved.entity_type === 'brand';`
토큰 claim 과 응답 `user` 둘 다: `restaurant_id: (isOwnerHat || isBrandHat) ? null : resolved.entity_id`, `brand_id: isBrandHat ? resolved.entity_id : null`. `restaurantStatus`/`restaurantName` 필드명은 유지(브랜드면 브랜드 status/name 이 실린다 — 프론트 키 변경 0).

### H. `dev-backend/routes/users.js`
- `POST /:id/contexts`(1324~): `const grantOwner = …` 아래 `const grantBrandManager = userContexts.isBrandManagerHat(entity_type, role);` · 조합 검사 `if (!grantOwner && !grantBrandManager && !userContexts.isV1GrantableCombination(entity_type, role))`, 메시지 `'Only (restaurant × Restaurant Admin), (restaurant × Restaurant Owner) or (brand × Brand Manager) can be granted'`.
  `const Restaurant = …` **앞에** 브랜드 분기:
```js
    if (grantBrandManager) {
      const Brand = require('../models/Brand');
      const brand = await Brand.findByPk(entityId, { attributes: ['id', 'name', 'owner_id'] });
      if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });
      if (Number(brand.owner_id) === Number(target.id)) {
        return res.status(400).json({ success: false, message: 'User already owns this brand' });
      }
      if (['Brand General', 'Brand Manager'].includes(target.role) && Number(target.brand_id) === entityId) {
        return res.status(400).json({ success: false, message: 'User already belongs to this brand' });
      }
      await _seq.query(
        `INSERT INTO user_contexts (user_id, entity_type, entity_id, role, granted_by, created_at, updated_at)
         VALUES (:u, 'brand', :e, :r, :by, NOW(), NOW()) ON DUPLICATE KEY UPDATE updated_at = NOW()`,
        { replacements: { u: target.id, e: entityId, r: role, by: req.user.id } }
      );
      logActivity(req, { action_type: 'create', entity_type: 'user_context', entity_id: target.id,
        entity_name: target.full_name || target.username || target.email,
        description: `Granted Brand Manager context for brand "${brand.name}" (#${entityId}) to ${target.email || target.id}` });
      return res.json({ success: true, data: { user_id: target.id, entity_id: entityId, role }, message: 'Context granted' });
    }
```
- `GET /:id/contexts`(1305-1314) orphans: 브랜드 고아 쿼리 1개 추가(`LEFT JOIN brands b … entity_type='brand' AND b.id IS NULL`) → 두 결과 concat.
- `DELETE /:id/contexts/:contextId` **무접촉**(행 id 기준이라 유형 무관).

### I. 인스펙션 `dev-backend/scripts/inspection/suites/user-contexts.js`
- UC-002 조건: `WHERE NOT ((entity_type='restaurant' AND role='Restaurant Admin') OR (entity_type='brand' AND role='Brand Manager'))`. 이름 「허용 외 조합 0건」, 주석에 v1.2 추가.
- UC-004 신설 「고아 브랜드 모자 0건」(`LEFT JOIN brands`). UC-003 무접촉.

### J. 소켓 `services/socketService.js` — **변경 0** (validateGrantedContext 공유). 테스트로만 증명.

---

## 2. 프론트 (빌드 1회 원칙 — 전부 확정 후 빌드)

### K. `dev-frontend/src/components/Admin/UserContextsSection.tsx`
- state: `const [pickType, setPickType] = useState<'restaurant' | 'brand'>('restaurant');` · `const [brands, setBrands] = useState<Array<{ id: number; name: string }>>([]);` · `pickRole` 타입에 `'Brand Manager'` 추가.
- 매장 목록 effect 와 나란히 `/api/brands` 로드(응답은 **배열 그대로**, `brands-core.js:233 res.json(brands)`) → `setBrands`.
- `pickType` 바뀌면 `setPick('')` 하고 role 을 `restaurant→'Restaurant Admin'` / `brand→'Brand Manager'` 로 리셋.
- `grant` body: `{ entity_type: pickType, entity_id: Number(pick), role: pickRole }`.
- 부여 Row 맨 앞에 유형 `<Picker>`(기존 Picker 재사용, 새 styled 금지): 옵션 `typeRestaurant`/`typeBrand`. role Picker 옵션은 유형별(매장: Admin/Owner · 브랜드: Brand Manager 1개). 대상 Picker 는 유형별 목록(`selectRestaurant`/`selectBrand`).
- granted 행 `<Tag>{c.role}</Tag>` 그대로(역할명이 유형을 말한다). orphan 행 라벨: `o.entity_type === 'brand' ? t('context.admin.deletedBrand', { id }) : t('context.admin.deletedRestaurant', { id })` — `Orphan` 인터페이스에 `entity_type: string` 추가.

### L. `dev-frontend/src/components/Layout/HeaderContextSwitcher.tsx` (156-160)
`const current =` 첫 줄 **앞에**:
```ts
    (user?.role === 'Brand Manager' && contexts.find((c) => c.kind === 'granted' && c.entity_type === 'brand' && String(c.entity_id) === String(user?.brand_id ?? ''))) ||
```
(`user.brand_id` 가 프론트 user 에 실리는지 `AuthContext.switchUser` :905 `brand_id: userData.brand_id` 로 확인됨.)

### M. `dev-frontend/src/pages/ContextSelect/ContextSelectPage.tsx:232` 글리프
`ctx.entity_type === 'owner' ? '◯' : ctx.entity_type === 'brand' ? '◐' : '▦'` (RA 표준 기하 글리프 집합 안에서).

### N. i18n `dev-frontend/public/locales/{en,ko,zh,ms}/auth.json` `context.admin`
| 키 | en | ko | zh | ms |
|---|---|---|---|---|
| typeRestaurant | Store | 매장 | 门店 | Kedai |
| typeBrand | Brand | 브랜드 | 品牌 | Jenama |
| roleBrandManager | Brand manager | 브랜드 관리자 | 品牌管理员 | Pengurus jenama |
| selectBrand | Select a brand… | 브랜드 선택… | 选择品牌… | Pilih jenama… |
| deletedBrand | Deleted brand (#{{id}}) | 삭제된 브랜드 (#{{id}}) | 已删除的品牌 (#{{id}}) | Jenama dipadam (#{{id}}) |
| title | Store & brand access (contexts) | 매장·브랜드 접근 권한 | 门店与品牌访问权限 | Akses kedai & jenama |
| hint | Grant this user access to another store (as store admin or owner) or to a brand (as brand manager — menus, recipes, reports; not payment settings or brand ownership). They can switch into it after logging in. Revoking takes effect on their next request — they are returned to their own account, not logged out. | 이 사용자에게 다른 매장(매장 관리자 또는 오너) 또는 브랜드(브랜드 관리자 — 메뉴·레시피·리포트, 결제 설정과 브랜드 소유권은 제외) 권한을 부여합니다. 로그인 후 그 자격으로 전환할 수 있습니다. 회수하면 다음 요청부터 적용되며, 로그아웃이 아니라 본래 계정으로 되돌아갑니다. | 授予该用户另一门店（门店管理员或业主）或品牌（品牌管理员——菜单、配方、报表；不含支付设置与品牌所有权）的权限。登录后即可切换。撤销后在其下次请求时生效——会返回其本人账号，而非退出登录。 | Beri pengguna ini akses ke kedai lain (pentadbir kedai atau pemilik) atau ke jenama (pengurus jenama — menu, resipi, laporan; tidak termasuk tetapan pembayaran dan pemilikan jenama). Mereka boleh bertukar selepas log masuk. Penarikan balik berkuat kuasa pada permintaan seterusnya — mereka kembali ke akaun sendiri, bukan dilog keluar. |
→ `npm run i18n:verify`.

### 🔒 `MainLayout.tsx` **무접촉.** BM 역할의 사이드바(`:1016`·`:1031 brandId = user.brand_id`·`:1679 Brand Menus`)가 투영된 `brand_id` 로 그대로 돈다. 만약 실브라우저에서 사이드바가 안 맞으면 **고치지 말고 중단·보고**.

---

## 3. 테스트 `dev-backend/tests/user-contexts-switch.test.js`

고정물(dev 실측): demo BG **22** = 브랜드 10(K-Taste, 매장 39)·**17**(K-Dine, 매장 38) 소유. demo RA **23** = 매장 38. 모자 대상 = **(brand 17 × Brand Manager) → user 23**. 쓰기는 `user_contexts` 행만, afterAll 전량 삭제(기존 규칙).

- ⑤ `'v1 비허용 조합(브랜드 모자) → 400'`(206) → **(brand × Brand General)** 로 바꿔 400 유지. (brand × BM) 은 아래 ⑧로.
- ⑧ 브랜드 관리자 모자 (신설):
  1. 네이티브 RA 23: `GET /api/brand-menus?brand_id=17` → 403.
  2. SA 로 `POST /users/23/contexts {brand,17,Brand Manager}` → 200. 목록에 카드(`entity_type:'brand'`, label `'K-Dine'`). 전환 → 200, `ctx.t='brand'`, 응답 `user.brand_id=17`, `restaurant_id=null`, `role='Brand Manager'`.
  3. `/auth/me` 투영 동일 + 폴백 헤더 없음.
  4. 모자로 `GET /api/brand-menus?brand_id=17` · `/api/brand-menu-categories?brand_id=17` · `/api/brand-menu-option-groups?brand_id=17` · `/api/brands/17/recipes` · `/api/brands?owner=me`(17 하나만) → 전부 200.
  5. **형제 브랜드** 10: brand-menus·`/api/brands/10/recipes` → 403/404 (200 금지).
  6. **교체**: 모자 토큰으로 네이티브가 열던 매장 38 라우트(①~③에서 쓰는 그 URL) → 403.
  7. **소유자 전용 보존**: `GET /api/brands/17/payment-settings` 403 · `PUT /api/brands/17` 403 · `POST /api/brands/17/staff` 403.
  8. 회수(DELETE) → 같은 토큰 `/me` 폴백 헤더 + role RA · brand-menus 17 → 403.
  9. 소켓: 유효한 브랜드 ctx 토큰 연결 OK · 회수 후 거부(기존 ⑥ 패턴 복제).
- 고장주입(assert 필수):
  - **FI-10** 서명 유효·미부여 ctx `{t:'brand',id:10,r:'Brand Manager'}` → `/me` 200+헤더(401 아님), brand-menus 10 → 403.
  - **FI-11** SQL 로 `(brand × Brand General)` 행 직접 INSERT → listContexts 에 **안 뜨고**, 전환 400 `UNSUPPORTED_COMBINATION`, 인스펙션 UC-002 **실패**(그 뒤 행 삭제·재실행 통과).
  - **FI-12** 소유자 BG 22 에 `(brand 1 × BM)` 부여(브랜드 1 은 dev 데이터, 읽기만) → 모자 아래 `brand-menus?brand_id=17`(자기 소유) **404/403**, `brand_id=1` 200. 회수.
  - **FI-13 반증** — §B `userCanManageBrand` 를 임시로 `brand.owner_id === req.bgOwnerId` 로 되돌리고 ⑧-4 가 **실패**하는지 1회 확인 후 원복(결과에 기록).
- `scripts/health-check.js` :311-325 의 컨텍스트 케이스 중 「브랜드 모자 → 400」 을 단언하는 것이 있으면 **(brand × Brand General)** 로 바꾼다. 케이스 1개 추가: 「(brand × Brand Manager) 비부여 전환 → 403」.

---

## 4. 문서 (새 파일 0)
- `docs/MULTI_CONTEXT_LOGIN_DESIGN.md`: §5.4 뒤에 **§5.5 「브랜드 관리자 모자 (v1.2, 2026-10-04)」** — 위 §0 표의 결정 5줄 + 「§5.2 가 막은 것은 소유자(BG) 모자. BM 은 스칼라 경로(09-06·09-08)라 투영 가능」 + 알려진 한계(§7). §5.2 머리에 한 줄 배너 「2026-10-04 v1.2: 브랜드 **관리자**(BM) 모자는 §5.5 로 허용 — 이 절의 금지는 소유자 모자에 한정」. Q3 끝에 「v1.2: + brand × Brand Manager」.
- `docs/BRAND_MENU_SYSTEM.md`: 접근 관문 절(있으면 그 자리, 없으면 09-29 판정 절 뒤)에 「2026-10-04 메뉴·카테고리·옵션 화면 = 소유자 ∪ Brand Manager(네이티브·모자). 판정 `brandScope.userCanManageBrand`」.
- `docs/ROLES_AND_PERMISSIONS.md` BM 행: 브랜드 메뉴 편집 가능 · 결제설정/브랜드 수정/스태프 관리 불가 명시.
- 메모리 `reference_brand_menu_owner_gate`·`project_brand_multi_owner` 갱신은 **게이트 통과 뒤** 팀원이.

---

## 5. 검증 순서 (빌드 1회 · sweep 1회)
1. 백엔드 A~J 확정 → `pm2 restart dev-backend` → `npx jest tests/user-contexts-switch.test.js` → `node scripts/health-check.js` → `node scripts/inspection/run.js`(또는 verify-all 의 인스펙션 단계) UC-00x 통과 → FI-10~13 결과 기록.
2. 프론트 K~N 전부 확정 → `npm run i18n:verify` → `npm run build:dev` **1회** → `node scripts/verify-all.js --full` **1회**(print-guard 변경 0 = MainLayout 무접촉 증명 · design-guard).
3. 실브라우저(dev): SA 로 Staff Management → user 23 → 유형 「브랜드」· K-Dine · Brand manager 부여 → demo RA 23 로그인 → 선택 화면에 ◐ 「K-Dine」 카드 → 전환 → 브랜드 대시보드 → 사이드바 Brand Menus → 브랜드 17 메뉴 목록 표시 → 메뉴 1개 이름 수정·저장·원복 → 헤더 스위처 제목 「K-Dine」 → 본래 정체 복귀 → SA 화면에서 회수. 1440·390 폭, console.error 0. **끝나면 부여 행 삭제.**
4. `node scripts/check-sensitive-diff.js` → 게이트 요청(사실만: diff 파일 목록 · 테스트 수 · FI-10~13 결과 · sweep 결과 · 확인 불가 항목).

---

## 6. 배포 뒤 운영 데이터 (Irene 승인 뒤 · SQL 0 · 화면으로)
- 사전 읽기 1회(운영 read-only 스크립트 패턴): `SELECT COUNT(*) FROM brands b JOIN users u ON u.id=b.owner_id WHERE u.role='Brand Manager'` → **0 이어야** 함(§A 전제). 0 아니면 중단·보고. 그리고 브랜드 2 owner_id=23 ≠ 11·19 재확인.
- SA 화면 Staff Management: **user 11(irene@)** → 부여 「브랜드 · K-DINE with MIN(2) · Brand manager」 / **user 19(매장 8 관리자)** → 같은 부여. 두 계정은 로그인 뒤 카드에서 K-DINE 브랜드로 전환해 메뉴를 편집하고, 매장 일은 본래 정체로 돌아가서 한다(모자 = 교체).
- 이 부여가 **D1′=A(잠금 5칸·auto) 데이터 단계보다 먼저** 돼 있어야 한다 — 잠긴 뒤 매장 화면에서 400 을 맞는 user 19 가 갈 곳이 있어야 하므로(판정서 §2-1 「비용」 행).

---

## 7. 알려진 한계 — 이번 절단면 밖 (사실로 보고, 고치지 않는다)
- BM(네이티브·모자 동일) 아래 **BG 사용자 소유 카탈로그**는 소유자 데이터가 안 보인다: 브랜드 상품(`brand-products.js` `owner_user_id = req.bgOwnerId`), 브랜드 재료 목록(`ingredients.js:57`)·재료 카테고리(`ingredient-categories.js:58`), 공급업체 수정/삭제(`suppliers.js:274·318` 403). 이는 **BM 역할의 기존 경계**이고 「브랜드 데이터가 브랜드가 아니라 사용자(owner_user_id)에 걸려 있는」 구조 문제다 — `docs/TRADE_STRUCTURE.md` 대조 뒤 별건. 메뉴 화면(D1″ 목적)에는 영향 없음(메뉴 편집기가 부르는 `/brands/:id/recipes` 는 brand_id 기준).
- `brands-plans.js:105-106` `requireBrandModule` 은 BM 에게 브랜드 요금제(가맹점 플랜·가격) 편집을 **이미** 허용한다 — 기존 BM 경계, 변경 0. Irene 이 알아야 할 사실로 보고에 포함.
- 브랜드 소유자가 직접 관리자를 부여하는 화면(브랜드 설정) — 후속 별건.

## 하지 말 것
- `brand_managers` 표 · 브랜드 설정 화면 부여 UI · Brand General 모자 · 푸드코트 모자 — 전부 금지.
- `brands.owner_id === user.id` 98곳 전수 수정 금지. `requireBGScope` 의 `bgOwnerId = user.id` 변경 금지(소유자 흉내 = 형제 브랜드 누출).
- 🔒 인쇄 보호파일(MainLayout 포함)·KDS 무접촉. 운영 쓰기 0. 프론트 빌드는 §5-2 한 번.
- 구현 중 세부를 Fable 에 되묻지 않는다 — 결정해서 결과에 붙인다. 앵커 불일치만 중단·보고.
