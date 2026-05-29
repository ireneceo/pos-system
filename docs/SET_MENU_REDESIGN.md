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
