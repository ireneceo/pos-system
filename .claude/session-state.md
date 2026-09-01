## 현재 작업 상태
**마지막 업데이트:** 2026-09-01 (`/개발완료`)
**버전:** v3.80 — 변경 없음 (운영 코드 배포 없음)
**작업 상태:** 완료. 코드 변경 1건은 **개발서버만(미배포)**, 운영은 **데이터 작업만** 수행.

> ### 🔔 돌아오면 여기부터 (2026-09-01, K-DINE / GIT Consulting)
>
> **오늘 운영 코드 배포는 없었다.** 운영에 들어간 것은 **데이터**뿐이다(가격 16행 + 레시피 정리).
>
> **⚠ 내가 저지른 사고 — 같은 세션에 정정함**
> Irene 이 준 **낱개 가격(0.60/0.86)을 `pack` 칸에 그대로 넣어 운영을 50배 싸게** 만들었다.
> Irene 이 *"1팩이 30링43링깃인데 뭐가 31배야?"* 로 잡아줬다. **1팩 = 50개.**
> → 넣은 뒤 **낱개로 되나눠 대조**했으면 막았다. 규칙화 = 메모리 [[reference_packaging_unit_is_pack]]
>
> **📌 Irene 지적 3건 (재발 금지)**
> 1. *"왜 자꾸 같은 소리를 해? 아까 그 가격 바꾸라고 했잖아"* — **이미 지시받은 건 되묻지 말고 실행.**
> 2. *"마음대로 레시피 만들지 말고 내용은 비워둬. 제목 넣으라고 했잖아"* — **모르는 값을 지어내지 않는다.**
>    (내가 소시지 1줄=40g·밥 200g·재료 원가 0 을 임의로 넣었다가 전부 제거)
> 3. *"메뉴는 대부분 겹치는데 왜 신메뉴가 66개야?"* — **66은 브랜드 계층 총계.** 매장 기준 진짜 신규는 **7건**.

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

**1. 레시피 목록 CSV 다운로드 — 개발서버 완료 (미배포)**
- `dev-frontend/src/pages/RecipeManagement/RecipesTab.tsx` **1파일**.
  이 컴포넌트가 BG `/pos/recipes` + RA `/restaurant/:id/recipe-management` **양쪽에 그대로 재사용**돼 한 곳으로 두 역할 커버.
- 목록 API가 이미 `recipeIngredients` 를 include → **백엔드 변경 0**. 공용 `utils/csvDownload.ts` 재사용 → **신규 유틸 0**.
  공용 `ThemedButton` → **design-guard 신규 위반 0**.
- 19열, 재료 단위로 펼침. **화면 필터/정렬 그대로** + **재료 없는 레시피도 1행 보존**.
- 검증: tsc 0 · design-guard 0 · `build:dev` OK · **실브라우저 RA(데모 rid38)/BG 둘 다 PASS**
  (RA 4레시피→17행, 19열 일치, BOM OK, console.error 0). BG 1건은 결함 아님 —
  페이지가 `/api/brands/4/recipes` 를 불렀고 CSV 가 그 전부를 담았음을 네트워크 응답 대조로 증명.

**2. SC-450 / SC-800 용기 가격 정정 — 운영 16행 반영**
- **1팩 = 50개.** 단위 `pack` 무변경, 가격 컬럼만.

  | | 원가/pack | 판매가/pack (+20%) | 낱개 환산 |
  |---|---|---|---|
  | SC-450 | 22.50 → **30.00** | 27.90 → **36.00** | 0.60 / 0.72 ✓ |
  | SC-800 | 38.25 → **43.00** | 45.90 → **51.60** | 0.86 / 1.032 ✓ |

- 체인 6곳: UGS 상품(352/353) → UGS→GIT(453/454) → GIT 재고(304/305)
  → GIT 판매가(181/182) → GIT→withMIN(1256/1257) → withMIN 재고(1080/1081)
- **중복 경로도 같은 값으로 정리** — 중복상품 240/241 + 링크 1197/1198 → 36.00/51.60.
  with MIN 이 보는 4개 링크 전부 동일값 확인. (8/28 원가복사 사고의 잔재였음)
- 롤백 파일 3개: `운영:/var/www/backups/sc-price-before-*.json` · `sc-price-fix2-before-*.json` · `sc-dup-before-*.json`

**3. K-DINE 브랜드 레시피 정리 — 운영 반영 (brand 2, 42 → 68건)**
- **Suggested Price 26건 갱신** — 기존 값이 정수 반올림이라 많이 틀려 있었다
  (미역국 19→15.9, 된장 21→17.9, 감자전 17→14.9, 치킨강정 19→14.9 등). 확정 가격표로 교정.
- **레시피 신규 17건 + 옵션 레시피 9건 = 26건을 제목·카테고리·Suggested Price 만** 생성. **내용 전부 비움.**
  (Jjajang Ramen·Seafood Rice Bowl·Chicken Yukgaejang·Buldak·Veggie Ramen·Egg Fried Rice·Others 3·Drinks 6 / Add-on 9)
- 레시피 카테고리 신규 3: `A La Carte` · `Others` · `Add-on`
- **재료는 하나도 만들지 않았다** — 모짜렐라·해물은 원가를 몰라서.
  **기존 레시피 42개의 재료 무접촉**(`suggested_price` 만 갱신).
- 백업: `운영:/var/www/backups/recipes-before-*.json`

**4. K-DINE 신메뉴 — 문서화만 (적용 안 함)**
- **`docs/KDINE_MENU_AND_RECIPE_PLAN.md`** (신규, 219줄) = 단일 소스.
  확정 가격표 전문 · 옵션가 9종 · 옵션그룹 11개 · 옵션→재료 매핑 · 기존 레시피 35건 대조 · 시스템 제약 5가지.
- **매장(rid 8) 기준 진짜 신규는 7건**: Seafood Rice Bowl · Buldak Fried Chicken(밥/단품) ·
  Chicken Yukgaejang · Seafood Kimchi Pancake · Jjajang Ramen · Grape Ade.
  이름 그대로 있음 43건 / **이름만 다른 것 16건**(Family Set 1~3 = K-Fire·K-Fry Delight·Veggie Lover,
  `ALA CARTE -` 접두사 8건, Beef Miyeokguk, Sausage Egg Fried Rice, Fried Rice Beef Bulgogi, Egg Veggie Ramen 등).
- 적용 스크립트(멱등, 드라이런 통과): `운영:/tmp/kd.js --apply` · 스냅샷 `운영:/var/www/backups/kdine-brand-snapshot-*.json`

**5. 문서/메모리**
- `DEVELOPMENT_PLAN.md` · `CHANGELOG.md` · `docs/RECIPE_MANAGEMENT_SYSTEM.md`
  (RecipesTab 이 BG 전용이라는 잘못된 서술 정정 + CSV 절 신설) · `docs/KDINE_MENU_AND_RECIPE_PLAN.md`(신규)
- 메모리 2건: [[reference_packaging_unit_is_pack]] · [[project_kdine_menu_pending_apply]]

### 다음 확정 작업
- 없음 — 지시 대기
  단, Irene 이 주기로 한 것 2건이 오면 바로 이어짐:
  ① **레시피 상세**(계란·소세지 포함 여부 포함) → 비워둔 26건 내용 채우기 + `#27`/`#20` 연결
  ② **K-DINE 신메뉴 적용 지시** → `docs/KDINE_MENU_AND_RECIPE_PLAN.md` 기준 실행

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **레시피 CSV 운영 배포** — 개발서버에서 검증 끝. `/배포` 지시 시 나감
- **K-DINE 기존 메뉴 가격 변경** — Irene "나중에". 안전창 = 현지 **22:00~익일 09:00**(주문 0건 실측).
  같이 처리할 것: **가격 0원 메뉴 2건**(`Sundubu-jjigae (S)`, `Kimchi-jjigae (S)` — 현재 RM0.00),
  Potato Pancake 15.90→14.90
- **음료 조건부 가격** — "음식 주문 시 RM3/RM1" 은 시스템 미지원. 별도 메뉴 2줄 or 옵션. Irene 결정 필요
- **미정값** — 소시지 1줄 g · 밥 옵션 g · 모짜렐라 원가 · 해물 원가/구성 · 치킨강정 "6피스" g
- **운영서버 좀비 프로세스 정리** — 이전 세션들이 남긴 `node -e` 가 **17~47일째** 살아 있다
  (sequelize 풀 열어둔 채 `process.exit` 없이 종료). 메모리 상시 점유 → [[reference_prod_server_resource_constraint]]
- **재고 대시보드 "입고 예정" 표시** (8/31 확정분, 미착수) — `/restaurant/:id/inventory?tab=dashboard`
- **운영서버 OS 재부팅** — Irene "밤에 하자" 결정됨 (커널 6.8.0-134 → 138)
- 주문 알림 나머지 4종(죽은 토글) · 매장 기기 푸시 구독 1회

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
