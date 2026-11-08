# Fable 설계 판정 2026-11-08c — 브랜드 메뉴 «푸시 = 브랜드 그대로» · 삭제 표시 · IPC 보호

작성: Fable(리더). 근거: 팀원 사실 자료(코드 사실·운영 읽기 2026-11-08) + 내가 다시 읽은 코드 `services/brandMenuSyncService.js` · `services/brandMenuBulkPush.js` · `routes/brand-menus.js`(PUT·DELETE·settings·push-pending·scope) · `routes/restaurant-brand-menus.js`(updates·sync·sync-all) · `routes/menu.js`(:229 목록 필터 · :661 잠금 가드) · `routes/mobile-public.js`(:267·477·661·752) · `models/BrandMenu.js` · `models/Product.js` · 지난 판정 `backups/fable-pending/fable-verdict-20261009-kdine-menu-reconcile.md` · 메모리 `feedback_kdine_ipc_menu_untouchable` · `reference_menu_owner_is_restaurant`. **코드 변경 0 · 운영 쓰기 0.**

Irene 원문 ①: «브랜드메뉴에서 삭제한거 왜 레스토랑에서 안없어져? 푸시해도 사진 안들어가고. 수정가능한거랑 푸시할 때 다 보내는 건 다른 거잖아. 왜 안가? k-dine noodles 브랜드제너럴에서 메뉴 만든거 그대로 레스토랑에 적용되게 체크 좀 제대로 해줘»
Irene 원문 ②: «IPC는 건드리지 말고 케이다인누들만 다 보내게 해줘. 그리고 브랜드 제너럴에서 지웠다고 표시 해야지. 알아서 지우게 하던지. 아니면 어떻게 관리해?»

---

## 0. 호출 조건
성립(`design`). 브랜드 푸시가 매장 판매표(`products` — 주문·재고·인쇄가 읽는 표)를 어디까지 덮는가를 바꾸는 일이고, 여러 화면(브랜드 푸시·푸시 전체·자동 분배·매장 «업데이트 받기»)이 같은 규칙을 나눈다. 이 사안 설계 1회(이번) + 구현 뒤 게이트 1회(아래 §7).

---

## 1. 왜 지금 그런가 — 원인 한 줄씩

| Irene 가 본 것 | 코드 원인 |
|---|---|
| «푸시해도 사진 안 들어가» | `syncBrandMenuToRestaurant` 가 **잠금(lock_*)을 «푸시 여부»로도 쓴다.** 이름·가격·사진·카테고리는 잠금일 때만 덮고, 안 잠겼으면 처음 만들 때 한 번만 넣는다(:185-191). 브랜드 13 은 잠금 0 → 뒤에 넣은 사진 35장이 매장 28 로 못 간다. 옵션·세트·설명·코드는 잠금과 무관하게 항상 간다 — 칸마다 규칙이 달라 «왜 이건 가고 저건 안 가?» 가 된 것. |
| «삭제한 게 매장에서 안 없어져» | 브랜드 메뉴 DELETE → `softUnlinkProductsFromBrandMenu`: 연결만 끊고(`brand_menu_id=null`·`unlinked`) 매장 상품은 **켜진 채 그대로**. 매장 화면엔 아무 표시도 없다(`unlinked` 는 브랜드 쪽 집계에만 쓰임). 매장 28 의 2개는 11-05 일회성 스크립트가 손으로 꺼 둔 것이라 목록엔 남아 있다. |
| «수정가능한거랑 푸시할 때 다 보내는 건 다른 거잖아» | 맞다. 잠금의 **원래 뜻은 «매장이 못 고치는 칸»**(`routes/menu.js:661` 가드)이고, 이걸 «푸시가 덮는 칸» 으로도 겹쳐 쓴 것이 설계 결함이다. 두 개념을 떼면 끝난다. |
| «푸시 전체(Push All Changes)로 되나?» | 안 된다. `planBrandBulkPush` 는 **버전·링크상태**만 보고 «최신 아님» 을 고른다. 매장 28 은 11-05 에 현재 버전으로 동기화돼 `in_sync` → 계획 0건. 내용이 달라도 안 잡힌다. |

2026-09-29 결정(D1′=A «브랜드 원본 잠금», Irene 10-04 «권고대로 해»)과 오늘 원문은 같은 방향이다: **브랜드가 원본, 매장은 판매 여부·품절·재고·주방만.** 09-17 «매장이 주인» 은 이미 대체된 결정이라 되살리지 않는다.

---

## 2. 결정

### 결정 1 — 푸시는 브랜드가 정한 내용을 **전부** 보낸다. 잠금은 «매장 편집 금지» 뜻만 남긴다.

`syncBrandMenuToRestaurant` 의 기존 상품 갱신(:174~)에서 잠금 조건을 뗀다:

| 칸 | 지금 | 바꾼 뒤 |
|---|---|---|
| 이름 `name` | lock_name 또는 비었을 때 | **항상 브랜드 값** |
| 가격 `price` | lock_price 일 때 | **항상 브랜드 값** |
| 카테고리 `category` | lock_category 또는 미분류일 때 | **브랜드 카테고리가 있으면 항상** (브랜드 category_id 없음 · 매장에서 같은 이름이 묶음 칸이라 못 넣는 경우(`categorySkipped`) 는 지금처럼 매장 값 유지 + 결과에 남김) |
| 사진 `image` | lock_image 일 때 | **브랜드 사진이 있으면 항상.** 브랜드가 비어 있으면 매장 값 유지 — 설명·이모지·코드와 같은 «브랜드가 비우면 안 건드림» 규칙 |
| 옵션·세트·set_only·설명·이모지·코드·레시피 | 항상(지금 규칙) | 그대로 |
| `is_active`·`soldOut`·재고·`kitchen_station_id`·`is_featured`·`display_order`(순서 강제 아닐 때)·매장 자체 옵션그룹 | 매장 소유 | 그대로 — 푸시가 안 건드림 |

- **범위 = 전 브랜드, 브랜드 설정 없음.** «푸시가 어디까지 덮나» 설정을 두면 Irene 이 지적한 혼동(두 개념 겹침)이 설정 이름만 바꿔 다시 생긴다. 규칙은 하나: *브랜드가 적은 내용은 매장에 그대로 간다. 잠금은 매장이 그 칸을 고칠 수 있는지만 정한다.* 잠기지 않은 칸을 매장이 고친 값은 **다음 푸시까지만** 산다 — 매장 «Brand Menu Updates» 화면이 이미 `computeMenuDiff` 로 «이렇게 바뀜» 을 보여 주니 새 UI 없음. 문구 하나만 그 화면에: «Unlocked fields you edited are replaced when the brand pushes again.»
- `brand_menu_locks_snapshot` 생성 코드·`routes/menu.js` 잠금 가드는 **그대로**(매장 편집 금지 뜻은 유지).
- 영향 실측(팀원 자료): 브랜드 5 The Fire 3매장 다른 칸 0 · 브랜드 4 데모 0 → **바뀐 뒤 푸시해도 변하는 것 0.** 브랜드 13→매장 28 은 바로 원하는 변화(사진 35·이름 3·카테고리). 브랜드 2→매장 8 IPC(이름 27·가격 21·사진 66)는 **결정 1-b 로 기계적으로 막는다.**

### 결정 1-b — IPC 보호 = 브랜드 단위 «매장으로 보내기 멈춤»(push_frozen) 기계 가드

Irene «IPC는 건드리지 말고». 지금 보호는 사람 규칙(«버튼 누르지 말기»)뿐인데, 결정 1 로 푸시가 더 많이 덮게 되므로 실수 한 번의 피해가 커진다. 그래서 가드를 기계로 올린다.

- **저장:** `brands.menu_settings.push_frozen: boolean`(기본 false) — 이미 있는 브랜드 메뉴 설정 JSON(`DEFAULT_MENU_SETTINGS`/`mergeMenuSettings`)에 칸 1개 추가. 새 컬럼 없음.
- **판정 한 곳:** `brandMenuSyncService.assertBrandPushAllowed(brandId, transaction)` → frozen 이면 `code='BRAND_PUSH_FROZEN'` 오류. 호출 자리 = 매장 표(`products`·`option_groups`·`options`)를 쓰는 서비스 함수 **전부**: `syncBrandMenuToRestaurant`(5경로 모두 여기로 옴) · `applyScopeToBrandMenu`(retract 일괄 update 전) · `markPendingForBrandMenu` · `bumpMenusUsingOptionGroup`(Product.update 부분) · `softUnlinkProductsFromBrandMenu`. 라우트는 지금처럼 매장별 실패 목록으로 받고, DELETE 는 409 로 거절(«이 브랜드는 매장으로 보내기가 멈춰 있어 메뉴를 지울 수 없습니다 — 먼저 설정에서 풀기»). 브랜드 쪽 표(`brand_menus`·`brand_menu_*`) 편집은 **막지 않는다**(10-09 결정과 같음 — 브랜드 표는 만져도 됨).
- **운영 값:** 브랜드 2 = `push_frozen:true`. **배포 마이그레이션** `scripts/migrate-brand-menu-push-frozen-ipc.js`(멱등 · `deploy` 등록 · brands.id=2 의 menu_settings 에 push_frozen 이 없을 때만 true 로) — 배포 순간부터 가드가 서게 해 «배포 뒤 Irene 이 켤 때까지» 빈틈을 없앤다. 쓰는 표는 `brands`(브랜드 쪽) 1행 — 매장 표 무접촉. 운영 쓰기이므로 **배포 때 Irene 지시로 실행**(§5).
- **UI:** 브랜드 메뉴 설정 탭에 토글 «Pause sending to stores»(설명: «While paused, pushes, auto-distribution, store-side updates and menu deletion do not write to store menus.») · 켜져 있으면 브랜드 메뉴 목록 맨 위 띠 + «Push»·«Push All Changes» 버튼 비활성. 매장 쪽 «Brand Menu Updates» 는 목록은 보이되 «Apply» 가 409 를 받으면 «The brand has paused updates» 로 표시.
- 특정 브랜드 id 를 코드에 박지 않는다 — 데이터(설정)로 둔다. 브랜드 2 의 뒷정리(10-09 판정 ①→②→③)가 끝나 풀 때는 같은 토글.

### 결정 2 — 브랜드 메뉴 삭제 → 매장 상품은 **끄고 «브랜드에서 삭제됨» 표시**, 지우는 건 매장이

Irene «지웠다고 표시 해야지. 알아서 지우게 하던지. 아니면 어떻게 관리해?» — **표시 + 끄기**를 권고한다. 자동 삭제는 안 한다.
- 이유: 매장 상품 행은 주문 이력·주방 지정·매장이 붙인 옵션을 달고 있다. 브랜드가 메뉴를 지웠다고 매장 표의 행을 기계가 지우면 되돌릴 수 없고, 손님 메뉴에선 **끄는 것만으로 이미 사라진다**(mobile-public·POS 는 `is_active` 로 거른다). 매장이 «지울지 / 자기 메뉴로 남길지» 를 한 번 고르는 것이 맞다.
- `softUnlinkProductsFromBrandMenu` 가 쓰는 값: `brand_menu_id=null` · `brand_menu_locks_snapshot=null` · `brand_menu_link_status='unlinked'`(기존) + **`is_active=false`(추가)**. `brand_scope_active` 는 건드리지 않는다(true 유지 — 매장 관리 목록에 보여야 표시가 되니까). 결정 1-b 가드 적용.
- **매장 메뉴 화면(RA):** `brand_menu_status==='unlinked'` 인 행에 꼬리표 «Removed from brand» + 행 액션 2개 — «Delete»(기존 삭제) · «Keep as my menu»(→ `brand_menu_link_status=null`, 꼬리표 사라짐 · 이미 매장 소유니 그 외 변화 없음). 새 라우트 1개: `POST /api/restaurants/:rid/brand-menus/unlinked/:productId/keep`(`authenticateToken + checkRestaurantAccess`, 그 매장 상품이고 `unlinked` 일 때만 200, 아니면 404). 새 컬럼 없음(삭제 시각은 두지 않는다 — 꼬리표만으로 충분; 필요해지면 그때).
- 꼬리표 디자인은 RA 표준(기하 글리프·텍스트, `check-design-guard` 통과) — 문구·배치는 팀원이 정하고 결과에 붙인다.
- 기존 `unlinked` 행(매장 8 켜짐 1 · 13·14·19 꺼짐 각 2 · 28 꺼짐 2): **일괄 백필 없음.** 매장 8 은 무접촉(1-b), 다른 매장은 이미 꺼져 있어 손님에겐 안 보이며 배포 뒤 꼬리표가 저절로 붙는다 → 그 매장이 알아서 지우거나 남긴다. 매장 28 의 2개(Gochujang Bibimbap · Rice Combo)도 같은 길(§4).

### 결정 3 — 브랜드 메뉴 끄기(is_active=false)는 매장의 **brand_scope_active** 로 간다

- 지금은 안 간다(«is_active 는 매장 소유» 주석). 하지만 Irene 의 «브랜드에서 만든 그대로 적용» 에서 «브랜드가 꺼 둔 메뉴는 매장에서도 안 팔림» 은 당연히 들어가고, 11-05 매장 28 스크립트도 이 칸을 손으로 꺼 줘야 했다.
- 매장 `is_active`(매장이 끄고 켜는 칸)를 덮지 않고, 이미 있는 **브랜드 소유 가시성 칸 `brand_scope_active`** 를 쓴다(모델 주석 «노출 = brand_scope_active(BG) AND is_active(RA)» 그대로). 새 칸 0.
  - `syncBrandMenuToRestaurant`: 갱신·생성 모두 `brand_scope_active = (brandMenu.is_active !== false)` (지금은 항상 true). 브랜드 메뉴가 꺼져 있고 매장에 아직 없으면 **만들지 않는다**(`{product:null, created:false, skipped:'inactive'}` — 호출자는 pushed 에 안 센다).
  - 결과: 브랜드가 끄면 다음 푸시/자동분배에서 그 매장 상품이 관리 목록·POS·손님 메뉴에서 숨고(기록 보존), 다시 켜고 푸시하면 내용까지 최신으로 복원. 범위(scope)에서 뺀 것과 같은 동작이라 매장 입장에 새 개념이 없다.
  - `syncAllScopedMenusToNewRestaurant` · RA `sync-all` 은 이미 `is_active:true` 만 돌리므로 그대로.
- **배포 전 실측 의무(§6-③):** 운영에서 «브랜드 메뉴 꺼짐 + 매장 상품 brand_scope_active=1» 쌍을 브랜드별로 센다. The Fire 에 있으면 다음 자동분배에서 숨게 되니 Irene 에게 수치로 알리고 배포한다(브랜드 2 는 1-b 로 안 닿음).

### 결정 4 — «Push All Changes» 가 **내용이 다른 매장**도 고른다 → 매장 28 은 버튼 한 번

- `planBrandBulkPush` 의 «최신 아님» 판정에 추가: ① 이름·가격·사진(브랜드 사진 있을 때)·카테고리(브랜드 카테고리 이름 vs 매장 `category` 문자열 — Category 행을 **만들지 않고** 비교만) 중 하나라도 다름 ② 가시성이 다름(`brand_scope_active` ≠ 브랜드 `is_active`). 기존 조건(없음·in_sync 아님·버전 낮음·숨김) 유지. 이미 같은 매장은 그대로 안 건드린다(«Stores already up to date are not touched» 문구 그대로 참).
- 미리 세기(dry_run) 응답에 매장별 «무엇이 다른지»(fields) 를 넣어 확인창 목록에 보이게 — 팀원이 기존 `{{list}}` 자리에 붙인다.
- 매장 28 반영 = **배포 뒤 브랜드 13 화면 «Push All Changes»**(Irene 또는 브랜드 담당). 운영 스크립트 불필요. 결과: 사진 35·이름 3·카테고리 → 브랜드 값. 삭제된 2개는 연결이 없어 푸시가 못 닿음 → 결정 2 꼬리표를 보고 매장 28 메뉴 화면에서 «Delete»(Irene 할 일로 올림, UI 2번).
- RA 쪽 `sync-all`(매장 «모두 받기»)은 버전·상태만 보는 지금 규칙 유지 — 매장이 고친 값을 매장 버튼이 조용히 되돌리는 건 다른 결정이라 이번엔 넣지 않는다(«Brand Menu Updates» 목록은 computeMenuDiff 로 차이를 이미 보여 주고, 메뉴별 Apply 는 결정 1 규칙으로 간다).

---

## 3. 구현 범위 (팀원 · 이 밖은 하지 않는다)

백엔드
1. `services/brandMenuSyncService.js` — 결정 1(갱신 분기 4칸) · 결정 1-b(`assertBrandPushAllowed` + 5함수 호출) · 결정 2(softUnlink 에 `is_active:false`) · 결정 3(`brand_scope_active` = 브랜드 is_active · 꺼진 메뉴 생성 스킵). 머리 주석(Lock rules)을 새 규칙으로 고친다.
2. `services/brandMenuBulkPush.js` — 결정 4(내용·가시성 비교 · dry_run fields).
3. `routes/brand-menus.js` — `DEFAULT_MENU_SETTINGS`/`mergeMenuSettings` 에 `push_frozen` · DELETE 409 · push/push-pending 는 서비스 오류 코드 그대로 전달.
4. `routes/restaurant-brand-menus.js` — `/unlinked/:productId/keep` 1개 · Apply 409 전달.
5. `scripts/migrate-brand-menu-push-frozen-ipc.js`(멱등) + `migrations.registry.json` `deploy` 등록.
6. `scripts/health-check.js` — §6 ①②④⑤⑥ 케이스(데모 브랜드 10 · 매장 38/39 · 이름에 `ZZ-HC`).

프론트
7. `BrandGeneral/BrandMenusPage.tsx` — 설정 탭 토글 · 멈춤 띠 · 버튼 비활성 · Push All 확인창에 차이 목록.
8. RA 메뉴 화면 — «Removed from brand» 꼬리표 + Delete/Keep 액션. 매장 «Brand Menu Updates» 문구 1줄 + 409 표시.
9. i18n 4언어(brand·menu·settings namespace) · `npm run i18n:verify`.

하지 않는 것: 매장→브랜드 역동기화 · 자동 삭제 · «푸시 범위» 브랜드 설정 · 새 컬럼 · 기존 unlinked 백필 · 매장 8 어떤 표도 쓰기 · 🔒 인쇄/KDS 보호파일 접촉(이번 범위에 없음) · K-DINE 메뉴 데이터 운영 스크립트(일회성 11-05 스크립트는 다시 안 돌림).

---

## 4. 운영 반영 순서 (Irene 지시 뒤 · 배포 방/정기 점검이 실행)

1. 배포(마이그 1 = 브랜드 2 push_frozen) → 배포 직후 읽기: `brands.id=2 menu_settings.push_frozen=true` · 매장 8 `products`/`option_groups`/`options` 지문 배포 전후 동일.
2. 브랜드 13 화면 «Push All Changes» — dry_run 목록이 «매장 28 · 39건(사진 35·이름 3…)» 인지 보고 실행. 뒤 읽기: 브랜드 13 ↔ 매장 28 이름·가격·사진·카테고리 다른 칸 0.
3. **Irene 할 일(UI):** 매장 28 메뉴 화면에서 «Removed from brand» 2건(Gochujang Bibimbap · Rice Combo) → Delete. 끝나면 목록에서 사라짐.
4. 그때까지 사람 규칙은 그대로: 브랜드 2 화면 푸시·매장 8 «업데이트 받기» 누르지 않기(배포 뒤엔 기계가 막음).

---

## 5. Irene 컨펌 요청 (각각 Fable 권고)

1. **푸시는 잠금과 무관하게 브랜드 내용 전부(이름·가격·사진·카테고리 포함)를 보낸다 — 전 브랜드 공통, 설정 없음.** 권고: 예. Irene 원문 그대로이고 The Fire·데모는 다른 칸 0 이라 변화 없음.
2. **IPC 보호 = 브랜드 2 «매장으로 보내기 멈춤» 기계 가드(배포 마이그로 켬, 브랜드 표 1행 쓰기).** 권고: 예. 사람 규칙만으로는 결정 1 이후 실수 1번이 매장 8 판매표를 덮는다.
3. **브랜드 삭제 → 매장 상품 끄기 + «Removed from brand» 표시, 지우기/남기기는 매장이 고름.** 권고: 이것(자동 삭제 아님). 손님에겐 즉시 사라지고, 이력 있는 행을 기계가 지우지 않는다.
4. **브랜드 끄기 → 매장 숨김(brand_scope_active).** 권고: 예 — 단 배포 전 The Fire 실측 수치를 보고.
5. **매장 28 은 배포 뒤 «Push All Changes» 1번 + 삭제 2건 UI.** 권고: 예(스크립트 없음).

---

## 6. 검증 기준 (게이트에서 이걸 본다 — 코드 리뷰만은 불합격)

개발서버 · 데모 브랜드 10(매장 38·39) · 실호출:
① 잠금 0 메뉴 생성·푸시 → 매장에서 이름·가격·사진·카테고리 고침(200) → 브랜드 재푸시 → 4칸 전부 브랜드 값 · 매장 `is_active`·`soldOut`·매장 자체 옵션그룹 그대로. 브랜드 사진 비우고 재푸시 → 매장 사진 유지.
② 브랜드 메뉴 is_active=false + 푸시 → 매장 상품 `brand_scope_active=0`·`is_active` 불변 · `/api/menu` 목록·mobile-public 에서 안 보임. 다시 켜고 푸시 → 보임 + 내용 최신. 꺼진 메뉴를 상품 없는 매장에 푸시 → 생성 0.
③ 브랜드 메뉴 삭제 → 매장 상품 `is_active=0`·`unlinked`·`brand_scope_active=1` · RA 목록에 꼬리표 · mobile-public 안 보임 · «Keep» → 상태 null · 다른 매장 상품·남의 상품 id 로 Keep → 404.
④ Push All dry_run: 버전 같고 `in_sync` 인데 매장 이름만 다르게 바꾼 뒤 → 그 매장 1건 + fields 에 name · 실행 뒤 재계획 0건 · 같은 매장 다시 실행 시 쓰기 0(updatedAt 불변).
⑤ push_frozen=true 브랜드: 메뉴 push · push-pending · PUT(auto) · 옵션그룹 수정 · 매장 sync/sync-all/Apply · DELETE → 전부 `BRAND_PUSH_FROZEN`/409 · 그 브랜드 매장들의 `products`·`option_groups`·`options` 지문 전후 동일. **고장주입:** `assertBrandPushAllowed` 호출 1곳을 빼면 ⑤ 가 실제로 실패하는지 1회 증명 후 원복.
⑥ 마이그 멱등: 2회 실행 결과 같음 · brands.id≠2 변화 0 · dev 에선 브랜드 2 가 없어도 종료코드 0.
⑦ 기계 게이트: `verify-all --full`(빌드 1회·sweep 1회 — 프론트 변경 다 끝낸 뒤) · `check-print-guard` 변경 0 · `check-design-guard` 신규 위반 0 · `check-sensitive-diff` · `i18n:verify` · health-check 신규 케이스 포함 전체 통과.
⑧ 배포 전 운영 읽기(쓰기 0): 브랜드별 «브랜드 메뉴 꺼짐 ∧ 매장 brand_scope_active=1» 수 · 브랜드 5↔매장 16/24/25 4칸 다른 수(0 기대) · 매장 8 지문 기준값 저장.
⑨ 배포 뒤 운영 읽기: 브랜드 2 push_frozen=true · 매장 8 지문 동일 · (Push All 뒤) 브랜드 13↔매장 28 다른 칸 0.

## 7. 게이트
구현 끝나면 Fable 검증 1회(gate — 전 브랜드 매장 판매표 덮기 규칙 변경 + 운영 마이그 1): diff 가 §3 범위 안인지 · ①~⑦ 숫자 · ⑧ 수치 · 롤백 경로(마이그는 설정 칸 1개라 토글로 원복). 그 전엔 운영 배포 안 함.
