# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-07-04 06:30, idle 1879s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: ingredient-seller-products.js,ingredients.js product-ingredients.js,purchase-orders-crud.js purchase-orders-workflow.js,restaurants-ingredients.js seller-orders.js,ConnectSellerModal.tsx InventoryManager.tsx,useAlertResolver.ts useIngredientAdjustModal.ts,useOrderModal.ts
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태

**마지막 업데이트:** 2026-07-03 #2 (BG/Owner 전수감사 32건 수정·검증·배포 + AI 음식인식 설계 + 개발순서 로드맵)
**버전:** 운영=**v3.66 / SW 4.56** (dev SW=4.58, 미배포 — /배포 시에만 갱신)
**작업 상태:** 완료 (체크포인트)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-07-03)
- **데모 버그 4건** — 전부 현재 dev 정상(원인=SW 캐시 옛 번들) 확인, dev SW 4.57→4.58 bump+재빌드 배포.
- **BG/Owner 전수감사 — 32건 수정·검증·배포** (Fable 감사→적대검증→Opus 수정, 40건 중 32건). 단일진실 `docs/BG_OWNER_AUDIT_2026-07-03.md`:
  - 보안 5(IDOR·인보이스 PATCH·SMTP·구독스코프·owner self-entity, userCanAccessEntity 신설, 크로스테넌트 403/정상 200 검증)
  - 크래시·500 8(오너 댓글/매뉴얼 author_name·삭제 FK캐스케이드·React#31 공용 getErrorMessage)
  - 주소 3(브랜드 전체필드 round-trip·삭제 응답표준·owner null 정규화 — 레스토랑 표준)
  - 리포트/성능 7 + **#9 Manager Sales 실매출 엔드포인트**(`/api/manager/sales-summary` 신규·타임존정확·테스트주문 검증) + **#31 PhoneInput 크로스컨트리 오파싱**
  - /검증: hydration0·design신규0·health106/107(1=의도된 desktopP2)·i18n통과·mount crash0
- **AI 음식인식 서빙 설계 확정**(Fable) — `docs/AI_FOOD_RECOGNITION_DESIGN.md`. 결정 3개 잠금(사진보관X / 참조사진=메뉴+설정업로드 / RM179 Enterprise 게이팅). 메모리 [[project_ai_food_recognition]].
- **개발순서 로드맵**(Fable 판단) 확정 — 아래 섹션.

### 다음 확정 작업 (Irene 지시 = 로드맵대로)
- **P1: 브랜드-인벤토리 브랜드모드 클러스터 (#5/6/36/23/35)** — 스코핑 완료. 근본: 브랜드모드 액션 훅들이 레스토랑 경로 사용. 스톡목록은 정상(`useInventoryData:91` `/api/product-ingredients`=**BG Product기준 ProductIngredient**, 메뉴/레시피 아님 — Irene 확인). 수정=useSettingsModal/useOrderModal/useAlertResolver/InventoryManager를 mode-aware화 → 브랜드모드는 product-ingredient 엔드포인트 호출 + 없는 것 신설(brand-inventory.js 확장).
- 이후 로드맵 순서: #24 구독(Fable 돈게이트) → AI Track A → #8+#38 analytics → AI Track B(Fable) → 안드로이드.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.
- **AI Phase 0 (Irene 액션)**: ①GCP/Vertex 프로젝트+자격증명 ②안드로이드 태블릿1+BT프린터 ③#8 데이터소스 결정(직원/고객 지표 원천 없음 → 숨김 vs 추적기능 신설).
- 앱 진입 UX(아래) — 안드로이드/윈도우 앱 완료기준.
- Lingo 상세 개발설계(Fable)·dev 서브도메인. 오더노트 실프린터 눈확인. IOI Mall 매출 API 운영전환(+ mallSalesService.js:289 타임존 검토).

---

## 📌 앱 진입 UX 요구 (2026-07-03 Irene 지시) — 안드로이드/윈도우 앱 공통
- **접속 즉시 바로 접근 가능한 "제대로 된 UI/UX"**여야 함. 앱(안드로이드·윈도우) 실행→로그인→POS 도달까지 매끄럽고 정돈된 진입경험 필수. 스플래시/로그인/기기설정 화면 품질 = 앱 작업 완료기준에 포함.

## 🧭 개발 순서 로드맵 (2026-07-03, Fable 판단 · Irene 위임 · 정석대로)
원리: ①살아있는 제품의 능동적 피해부터 멈춤 ②저위험 성과+미래자산 ③프리미엄 빌드 ④리드타임 항목은 Day0 병렬. 트랙 간 코드충돌 없음(FE/BE/네이티브), 인쇄 8파일 무접촉.
- **P0(즉시 병렬, Irene 액션):** Vertex 세팅(→AI TrackB) · 안드로이드 하드웨어(→Track3 실기기) · #8 데이터소스 결정(→#8·#38).
- **P1 라이브 정합성:** #31 PhoneInput ✅ → 브랜드-인벤토리 클러스터(#5/6/36/23/35, 5-for-1) → #24 구독 미저장(돈=Fable게이트).
- **P2 빠른성과+B예열:** AI Track A(아이템 썸네일·탭상세, 순수FE·저위험, P1과 병렬 가능). 매장이 사진 채움→Track B 정확도 레퍼런스.
- **P3:** #8 Manager Reports + #38 Customer Insights(실 analytics 엔드포인트).
- **P4 프리미엄:** AI Track B(카메라 인식→Serve, Enterprise게이트, Fable게이트).
- **P5:** 안드로이드 완성(에뮬 단계 P1~P4 병렬, 실기기 V1~V4는 하드웨어 후). ⚠️예외: 안드로이드 인쇄 막혀 영업지장 라이브 매장 생기면 즉시 P1급.
- 한 줄: (P0 병렬)→#31✅→인벤토리클러스터→#24(Fable)→AI TrackA→#8+#38→AI TrackB(Fable)→안드로이드.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
