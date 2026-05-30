# 세트메뉴(콤보) 재설계 — 설계 문서

> 작성: 2026-05-29 · 상태: **설계 확정 대기 → 다음 세션 `/기능설계` 6단계로 진행**
> 트리거: Irene — "세트등록이 부족". 두 핵심 이슈 + 품절 연동.

## 1. 현재 구조와 한계

- `Product.is_set_menu` + `Product.set_items` (JSON): `[{ menuItemId, name, quantity, ... }]`
- 구성품 선택 UI는 **이미 검색 가능** (`MenuManagementPage` `setMenuSearchQuery`).
- **한계 (왜 부족한가):**
  1. 구성품의 **옵션이 상속 안 됨** → 세트에서 옵션 재등록 필요.
  2. 세트가 **단일 상품으로만 집계** → 구성품(단품) 판매 통계에 세트분이 안 잡힘.
  3. **OR(택1) 슬롯 불가** — "치킨 + (김치찌개 or 순두부찌개)" 같은 선택 구성 불가.
  4. 구성품이 이름 복사라 원본 상품 수정이 세트에 반영 안 됨.

## 2. Issue A — OR(택1) 슬롯: `set_groups` 구조

`set_items` → **`set_groups`** 로 일반화 (옵션그룹과 동일 멘탈모델: "옵션이 상품인 그룹").

```jsonc
set_groups: [
  { id, label: '메인',      type: 'fixed',  items: [{ product_id: 치킨, qty: 1 }] },
  { id, label: '찌개 택1',  type: 'choice', min: 1, max: 1,
    items: [ { product_id: 김치찌개 }, { product_id: 순두부찌개, upcharge: 0 } ] }
]
```

- `type: 'fixed'` — 자동 포함. `type: 'choice'` — 택 min~max (기본 1~1).
- **가격 모델:** 세트 고정가 기본 + 프리미엄 선택지 `upcharge`(선택). (sum-of-components 아님)
- **주문 UI:** fixed는 자동 표시, choice는 라디오(택1)/체크(택N) 피커.

## 3. Issue B — 객체/옵션 재사용 + 통합 통계 (핵심 아키텍처)

- **구성품 = Product live 참조** (`product_id`), 이름 복사 금지 → 원본 상품(이름/옵션/레시피) 수정이 세트에 자동 반영. **등록 1번, 수정 1번.**
- **옵션 상속:** 주문 시 각 구성품의 **옵션그룹을 그대로 상속**해 선택. 세트에서 옵션 재등록 X. (세트 한정 override는 선택 기능.)
- **주문 라인 구성품 분해 저장:**
  ```jsonc
  order_item (set): {
    product_id: SET1, is_set: true, qty, price,
    set_components: [
      { product_id: 치킨, qty: 1, options: [...], price_share: ... },
      { product_id: 김치찌개, qty: 1, options: [...], price_share: ... }  // choice 선택 결과
    ]
  }
  ```
- **통계:** 리포트가 `set_components`를 읽어 **세트 판매수 + 구성품별 판매수(단품 + 세트포함) 둘 다** 집계. "치킨 몇 개 나갔나"에 세트 내장분 포함.
- **재고:** 세트 주문 시 각 구성품 레시피로 차감 (현재 세트=단일차감 → 구성품 차감으로).

## 4. 품절(Sold-out) 연동 (별도 확정됨, 본 설계에 통합)

- 단품/세트 모두 `soldOut` 수동 토글 (POS 길게누르기).
- **세트 자동 차단(계산식, DB 미기록 → 구성품 복구 시 자동 부활):**
  - `fixed` 슬롯: 그 상품이 soldOut이면 세트 차단.
  - `choice` 슬롯: **선택지가 전부 soldOut일 때만** 차단 (하나라도 남으면 주문 가능, 품절 선택지는 비활성).
- 사유 표시: "SOLD OUT · 구성품 품절"(자동) / "SOLD OUT"(수동).

## 5. UI/UX (빌더 / 주문)

- **빌더:** 세트 편집 = "구성 슬롯" 리스트. 슬롯별: 이름 + 타입(고정/선택) + 검색형 상품 멀티선택(이미 검색됨) + 선택형이면 min/max + 슬롯내 상품별 upcharge. 각 상품 "옵션 상속" 기본 ON.
- **주문(POS/모바일):** fixed 자동 표시 → choice 피커(라디오/체크) → 선택 구성품의 옵션그룹 인라인 상속 노출 → 합계 = 세트가 + upcharge.

## 6. 마이그레이션

- 기존 `set_items: [{menuItemId, name, qty}]` → `set_groups: [{ type:'fixed', items:[{product_id: menuItemId, qty}] }]` 단일 fixed 그룹으로 **무손실 변환**.
- 구버전 데이터 폴백: `set_groups` 없으면 `set_items`를 fixed 그룹으로 런타임 해석.

## 7. 규모 / 다음 단계

대규모 (DB 모델 + 주문/장바구니 흐름 + 옵션상속 + 리포트 + 재고 + 마이그). **`/기능설계` 6단계로 진행**: 기능정의 → API → DB → UI → 코드 → 테스트 시나리오. 각 단계 Irene 승인.

---

# 정식 설계 (2026-05-29, /기능설계)

> 1단계 기능정의 Irene 승인 완료. 비범위 확정: 단계형 옵션(min/max/parent_option) + BG 옵션전파 버그 + optionGroups lock 갭 = **별도 트랙**. 가격모델 = 세트 고정가 + 프리미엄 upcharge. UI 원칙: **모든 셀렉트는 검색 가능한 고급형 `<Select>`**(SELECT_COMPONENT_GUIDE.md), 표준 Modal/FormGroup/Button 재사용, 30년차 UX(쉽고 통일).

## 8. DB 구조 (3단계)

신규 테이블 없음. `Product`에 컬럼 1개 추가 + 기존 `set_items` 레거시 폴백 유지.

### Product (products 테이블)
| 컬럼 | 타입 | null | default | 설명 |
|------|------|------|---------|------|
| `set_groups` | JSON | Y | null | 신규. 세트 구성 슬롯 배열(아래 shape). `is_set_menu=true`일 때만 의미 |
| `set_items` | JSON | Y | null | **레거시 유지**(드롭 X). set_groups 없으면 런타임 폴백 해석 |
| `is_set_menu` | BOOLEAN | - | false | 기존 |

**`set_groups` shape:**
```jsonc
[
  { "id": "g1", "label": "메인", "type": "fixed",
    "items": [ { "product_id": 101, "qty": 1 } ] },
  { "id": "g2", "label": "찌개 택1", "type": "choice", "min": 1, "max": 1,
    "items": [ { "product_id": 201, "upcharge": 0 }, { "product_id": 202, "upcharge": 2.00 } ] }
]
```
- `type`: `'fixed'`(자동 포함) | `'choice'`(택 min~max). `min/max`는 choice만(기본 1/1). `upcharge`는 choice 선택지별 추가금(기본 0).
- 구성품은 **`product_id` live 참조만** 저장(이름/가격/옵션 비복사). 표시·옵션·레시피는 주문/렌더 시점에 원본 Product에서 resolve.

### Order (orders.order_items TEXT-JSON) — 신규 테이블 없음
세트 주문라인 안에 구성품 분해 저장:
```jsonc
{
  "product_id": 500, "name": "치킨 세트", "is_set": true, "quantity": 1, "price": 25.00,
  "set_components": [
    { "group_id": "g1", "product_id": 101, "name": "후라이드치킨", "qty": 1,
      "options": ["꿀간장"], "price_share": 23.00 },
    { "group_id": "g2", "product_id": 202, "name": "순두부찌개", "qty": 1,
      "options": [], "upcharge": 2.00, "price_share": 2.00 }
  ]
}
```
- `options`는 기존 주문 옵션 저장 포맷(string[])과 동일 → 빌·주방·리포트 기존 렌더 재사용.
- `price_share`: 통계용 가격 안분(세트가를 구성품에 분배). 합계=세트 price.

### 마이그레이션
- `sync-database.js`로 `set_groups` 컬럼 추가(JSON nullable, 무위험).
- 백필 스크립트 `scripts/migrate-set-items-to-groups.js`: `is_set_menu && set_items && !set_groups`인 Product → `set_groups=[{type:'fixed', label:'Set', items: set_items.map(i=>({product_id:i.menuItemId, qty:i.quantity}))}]`. **무손실**, 멱등(이미 set_groups 있으면 skip).
- 런타임 폴백: `resolveSetGroups(product)` 헬퍼 — set_groups 있으면 그대로, 없고 set_items 있으면 fixed 그룹으로 변환 반환. 프론트/백 공용 로직(`utils/setMenu.js`).

## 9. API 구조 (2단계)

세트 등록은 기존 메뉴 상품 라우트 재사용(별도 CRUD 파일 X). 주문/렌더용 resolve만 보강.

| METHOD / PATH | 역할 | 인증 | Body / 응답 | 비고 |
|---|---|---|---|---|
| `POST /api/menu/product` | RA/Owner | authenticateToken + checkProductTenant | body에 `is_set_menu`, `set_groups[]` 추가 허용 | 기존 라우트 확장 |
| `PUT /api/menu/product/:id` | RA/Owner | 〃 | `set_groups` 갱신. **set_groups 검증**(아래) | 기존 확장 |
| `GET /api/menu/:slug` (모바일) / `GET /api/menu` (POS) | 공개/직원 | 기존 | 세트 상품에 **`set_groups_resolved`** 포함: 각 구성품 {id,name,price,soldOut, optionGroups(상속 해석됨)} + `set_available`(품절 계산) | 렌더용 enrich |
| `POST /api/orders` / `POST /api/mobile/order` | 직원/고객 | 기존 | order_item에 `set_components[]` 허용 + **서버 검증**(choice min/max, fixed 존재, 구성품 옵션 required, 품절 차단) + price/재고 계산 | 기존 확장 |

**set_groups 검증 규칙(백엔드 공용 `validateSetGroups`)**: 각 그룹 label 필수 / type∈{fixed,choice} / fixed는 items≥1 / choice는 1≤min≤max≤items.length / 모든 product_id가 같은 restaurant의 비-세트 활성 상품(세트 중첩 금지) / upcharge≥0.

**응답 형식**: `{ success, data }` 표준. 검증 실패 400 `{ success:false, message }`.

**품절(soldOut) 계산(`computeSetAvailability`)**: fixed 슬롯 상품 중 하나라도 soldOut → `set_available=false`(사유 'component'). choice 슬롯은 **전 선택지 soldOut일 때만** 차단. 품절 선택지는 `items[].soldOut=true`로 표시(비활성). DB 미기록 → 구성품 복구 시 자동 부활.

## 10. UI 흐름 (4단계)

### A. 세트 빌더 (MenuManagementPage 세트 모달 재구성)
기존 "메뉴 목록에 수량 추가" → **"구성 슬롯" 리스트**로 교체. 표준 Modal + FormGroup.
- 상단: 세트명/가격/카테고리(기존 상품 필드).
- **슬롯 리스트**(동적, Add Slot 버튼 / 슬롯 삭제 아이콘 / 드래그 정렬):
  - 슬롯명 텍스트 입력
  - **타입 Select**(고정/선택) — 검색형 `<Select>` 통일
  - **구성품 멀티선택** — 검색 가능한 고급형 `<Select multi search>` (상품명/코드 검색, 보라 하이라이트, 세트는 제외 필터). 이미 검색되던 패턴 표준 컴포넌트로 승격
  - type=choice면: **min/max Select**(검색형) + 슬롯내 상품별 **upcharge CurrencyInput**
  - **"옵션 상속" 스위치**(기본 ON, 라벨+힌트) — 구성품 옵션그룹을 주문 시 노출할지
- 슬롯 카드 하단 액션 정렬(카드 룰 준수). 빈 상태: "구성 슬롯을 추가하세요" + Add CTA.
- 저장 시 `set_groups` 직렬화 → PUT.

### B. 주문 UI (POS `OptionModal` + 모바일 `ItemDetailPage` 공통 패턴)
세트 상품 선택 시:
1. **fixed 슬롯** 구성품 자동 표시(읽기전용 칩).
2. **choice 슬롯** 피커 — min/max=1/1이면 라디오, 그 외 체크(최대 max개). 품절 선택지 비활성+"SOLD OUT". upcharge는 "+RM2.00" 표기.
3. 선택된(또는 fixed) 구성품마다 **상속된 옵션그룹 인라인 표시**(기존 옵션 렌더 재사용) → 구성품별 옵션 선택.
4. 하단 합계 = 세트가 + Σupcharge. 유효성: choice min 충족 + 각 구성품 required 옵션 충족 전엔 담기 비활성.
5. `set_available=false`면 타일 회색 + "SOLD OUT · 구성품 품절", 담기 차단.

### C. 표시/통계
- 빌·주방·주문상세: order_item.set_components를 들여쓰기로 표시(구성품명 + 옵션). 기존 옵션 string[] 렌더 그대로.
- Sales 리포트: set_components 순회해 **구성품별 판매수(단품+세트내장 합산)** + 세트 판매수 둘 다 집계(`price_share` 기반 매출 안분).

### 공통 규칙
- **터치스크린·키보드 없음 전제**(매장 단말): 모든 입력 손가락 터치로 완결. 검색형 Select는 **탭 선택이 기본 + 필요 시 온스크린 키보드**, 수량/min·max/upcharge는 **+/- 스테퍼 또는 온스크린 숫자 키패드**(타이핑 강제 금지). 터치 타겟 ≥44px, hover 의존 금지. ([[feedback_touchscreen_no_keyboard]])
- **모든 Select = 검색 가능한 고급형**(SELECT_COMPONENT_GUIDE.md) — 단 위 터치 전제 충족. 표준 Modal/ConfirmModal/FormGroup/Button/Select 재사용, 자체 styled overlay 금지. alert/toast.success 금지. 이모지 금지. i18n 4언어(`menu`/`pos`/`common`). 반응형(모바일/태블릿 슬롯 카드 1열).

---

## §11. 브랜드 메뉴 세트 업그레이드 (2026-05-30) — set_groups + OR/Choice + 개별옵션을 Brand General 에도

> 배경: 매장(Restaurant) 메뉴는 set_groups(슬롯/Fixed·Choice/구성품 상속옵션) 빌더로 업그레이드됐으나, **Brand General 메뉴(BrandMenusPage)는 아직 레거시 set_items**("Items in this set" 단순 목록, OR·옵션 없음). BG가 만든 세트가 매장에 푸시돼도 레거시라 OR/옵션이 없다. → BG 세트도 동일 빌더로 통일.

### 데이터
- `brand_menus.set_groups` JSON 컬럼 추가 (Product.set_groups 미러). 슬롯 구조 동일: `[{id,label,type:fixed|choice,min,max,items:[{product_id,qty,upcharge}]}]`.
- **단, 브랜드 set_groups 의 `items[].product_id` = 구성품 브랜드메뉴의 id** (브랜드 시스템 내 참조). 매장은 restaurant product id 를 쓰므로 푸시 시 변환 필요.
- 레거시 `set_items` 는 유지(폴백/하위호환). 세트 잠금은 기존 `lock_set_items` 가 set_groups 도 커버.

### 백엔드 (`routes/brand-menus.js`)
- create/update 가 `set_groups` 저장(검증은 매장과 동일 `validateSetGroups` 재사용 — utils/setMenu).
- 단일 조회/목록에 set_groups 노출. 빌더 상속옵션 표시용 resolve = 브랜드 구성품(BrandMenu) + 옵션그룹(BrandMenuOptionGroup) 기반(매장 buildSetResolved 의 브랜드 버전, 신규 헬퍼 `buildBrandSetResolved`).

### 푸시 매핑 (`services/brandMenuSyncService.js`) — 핵심
- 브랜드 set_groups → 매장 Product.set_groups 변환: 각 구성품 `product_id`(=brand_menu_id) 를 해당 매장의 미러 상품 id 로 치환 (`Product.findOne({where:{brand_menu_id, restaurant_id}})`).
- 구성품 브랜드메뉴가 그 매장에 아직 안 깔렸으면 그 구성품은 skip(매핑 실패 fallback). set_components 가 비면 레거시 set_items 도 함께 유지돼 표시는 보존.
- lock_set_items 잠금 시 set_groups 도 매장에 동기화.

### 프론트 (`pages/BrandGeneral/BrandMenusPage.tsx`)
- 레거시 "Items in this set" UI → **SetMenuBuilder 재사용**(슬롯+Fixed/Choice+구성품 상속옵션 표시). menuItems=판매가능 브랜드메뉴, optionGroups=브랜드 옵션그룹.
- 저장 시 set_groups 전송. set_items 는 set_groups 에서 파생(하위호환 표시용).

### 검증
- BG 세트 생성(슬롯/Choice/옵션) → 매장 푸시 → 매장 Product.set_groups 에 매장 product_id 로 변환 확인 → 매장 주문 시 구성품 개별옵션 + 세트옵션 표시/인쇄(§위에서 완성된 흐름 재사용).
