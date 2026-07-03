# AI 음식 인식 서빙 시스템 (AI Food Recognition Serving) — 기술 설계

> 작성 2026-07-03. 상태: **설계 (구현 0 — Irene 비즈니스 결정 확정 2026-07-03, 기술 구현 승인 대기)**.
> 워크플로우 규모 = **대** (신규 모델 2+, 신규 라우터, 외부 AI 연동) → 설계 문서 필수.
> 관련 문서: `docs/SERVING_VIEW_DESIGN.md`(서빙 뷰 — 본 기능의 직접 토대), `docs/KITCHEN_DISPLAY_RULES.md`, `docs/PRINT_RULES_MATRIX.md`(🔒 무접촉 확인용).

---

## 0. Decisions Locked (2026-07-03, Irene)

세 가지 비즈니스 결정이 **확정**됨. 아래 본문 §3/§9/§10/§12 에 반영. 재논의 금지 — Irene 새 지시 시에만 변경.

1. **손님/서빙 사진 무보존 (프라이버시 표면 제거).** 직원 촬영 스냅샷은 **인식에만 순간 사용 후 즉시 폐기**. 영구 저장은 **텍스트 recognition_log 만** (결과·확신도·mode·고른 주문/품목·시각). **원본 이미지 저장 경로 자체를 MVP 에서 삭제** (opt-in 이미지 보존 없음). 평가용 임베딩 벡터 보존은 *선택*으로만 남기되 **기본 OFF**, 원본 사진은 어떤 경우에도 저장 안 함.
2. **레퍼런스 사진이 유일한 "학습" 소스.** (a) 기존 메뉴/상품 이미지 자동 시드 + (b) 설정 화면 **"메뉴 인식 사진 추가"** 에서 매장이 접시당 각도·조명·실플레이팅 사진 몇 장 업로드해 정확도 상승. **손님 사진은 학습에 쓰지 않는다.** 이것이 정확도 전략의 전부 — 손님 사진 학습 루프는 폐기.
3. **유료 티어 포함 (무료 개방 아님) — 레스토랑 Enterprise 플랜 전용.** `plan_templates` id=3, name `enterprise`, `plan_target='restaurant'` (레스토랑 최상위 티어) **에만** 모듈 키 `ai_serving` 추가. **basic(id=1) / professional(id=2) 제외.** 기존 tier-gating 3-layer 로 강제(`requireModule('ai_serving')` + `MODULE_GATED_ROUTES` + UI `hasModule('ai_serving')`). **포함 = 해당 티어는 건당 과금 없음** — 임베딩 비용(~US$1–7/매장·월)은 Enterprise 가격에 흡수. 공정사용 상한(~30k 인식/매장·월)은 **정상 과금이 아니라 남용 방지 백스톱**(스로틀 안내 / 선택적 원가 초과분).
   - ⚠️ **가격 표기 확인 필요**: dev DB `plan_templates` id=3 `base_price_monthly` = **RM99** (coordinator 전달 "RM179" 와 불일치). 게이팅 결정(id=3 `enterprise` 전용)은 가격과 무관하게 확정이나, **운영 실제 Enterprise 월가(RM99 vs RM179)는 배포 전 Irene 재확인** — §9 참조.

---

## 1. 요약 + 핵심 원리 재정의

### 1.1 제품 목표 (Irene)

주방이 "이 접시 어느 테이블 거고 옵션이 뭐다"를 매번 설명·인계하는 일을 없앤다.
서빙 직원이 **지금 쓰는 태블릿/폰**으로 접시를 비추고 **한 번 탭** → **~1초 안에** 메뉴명 · 매칭된 주문 · 테이블 번호 · 옵션 → **서빙 버튼**. 확신이 낮으면 후보를 보여주고 사람이 고른다. **AI는 절대 강제 확정하지 않는다 — 애매하면 사람이 결정.** 모든 결과는 로그로 남겨 정확도를 계속 올린다.

두 트랙:
- **Track A (즉시 효과, AI 없음)**: Floor Plan 아이템 리스트/주문 상세에 **메뉴 사진 썸네일** + 탭하면 상세(옵션·테이블). 어디서든 한 번 탭으로 여는 "메뉴 사진 확인" 갤러리. Track B의 데이터(레퍼런스 사진)·UX 기반이 된다.
- **Track B (AI 서빙)**: 카메라 → 인식 → 조리완료 주문 매칭 → 테이블/옵션 → 서빙.

### 1.2 핵심 원리 — "분류(classification)가 아니라 제약된 매칭(constrained match)"

이 시스템의 정확도와 1초 응답이 가능한 이유는 AI가 똑똑해서가 아니라 **문제를 극단적으로 좁혀서**다. 아래 두 가지가 설계 전체를 지배하는 확정 원칙이다 (번복 금지):

1. **인식 엔진 = 범용 라벨 감지가 아니다.** Google Vision label detection 류는 "food, rice, dish, meat"만 돌려주며 "불고기덮밥 vs 제육덮밥"을 절대 구분 못 한다. 올바른 엔진 = **매장 자신의 메뉴 사진에 대한 이미지 유사도(임베딩) 매칭** — "이 사진이 *우리 메뉴* 중 어느 것과 가장 닮았나". 프로바이더는 인터페이스 뒤로 추상화(Google→Vertex→OpenAI→Azure→자체)하되, MVP 엔진은 **메뉴사진 유사도 + POS 상태 제약**이다.
2. **비교 대상은 열린 세계가 아니라 "지금 조리완료(ready)인 주문 품목"뿐.** 조리중/이미 서빙완료/취소는 제외. 점심 피크에도 매장의 ready 품목은 보통 3~15개 — 후보가 이만큼 작으니 1초 안에 높은 정확도가 나온다. 수학적으로: 전 메뉴 100개 중 고르기가 아니라, ready 품목이 가리키는 **서로 다른 메뉴 3~8개** 중 고르기다.

```
정확도 공식(직관):
  P(정답) = P(이미지 유사도가 후보 중 정답을 1위로 놓음 | 후보 = ready 품목의 메뉴들)
  후보 메뉴 수가 5개면, 유사도 모델이 "위에서 절반 수준"만 돼도 실전 정확도는 매우 높다.
```

3. **확신도 정책 (human-in-the-loop 의무)**: ≥95% 자동 선택 · 90–95% 추천(확인 탭) · 80–90% 후보 2개 제시 · <80% 재촬영 유도. 자동 선택이어도 **서빙 확정은 항상 사람의 탭**.
4. **동일 메뉴 다중 주문 구분**: A12/B03/C07 이 전부 불고기덮밥이면 이미지로는 구분 불가 → 옵션 차이 + ready 경과시간(FIFO)으로 정렬해 **후보를 전부 보여주고** 사람이 고른다. 조용히 하나 찍지 않는다.
5. **옵션(계란추가/고기많이/김치제외)은 사진으로 안 보이는 경우가 많다** → 매칭된 주문 데이터에서 가져와 표시하고, 동일메뉴 후보들이 옵션만 다르면 옵션 차이를 강조해 직원이 확인.

### 1.3 이 코드베이스에서의 위치 (실측 근거)

이 기능은 **이미 구현·검증된 서빙 뷰 위에 얹는다** (`docs/SERVING_VIEW_DESIGN.md`, 2026-06-03 DEV 완료):

| 이미 있는 것 | 파일 | 본 설계에서의 역할 |
|---|---|---|
| 아이템별 서빙 리스트 (Expo/Runner) | `dev-frontend/src/pages/FloorPlan/ItemListView.tsx` | Track A 썸네일이 들어갈 곳 + Track B의 수동 폴백 화면 |
| 아이템 단계 pill + 단계 매핑 | `dev-frontend/src/pages/FloorPlan/orderItemStatus.tsx` (`toDisplayStatus`: pending→queued, preparing→cooking, ready→ready, served/completed→served) | 후보 = `ready` 인 품목의 정의 |
| 아이템 서빙 토글 (단계 전이) | `PATCH /api/orders/:id/items` (`dev-backend/routes/orders-crud.js:1779`, 회귀방지 가드 내장) | **Track B "서빙" 버튼이 그대로 재사용** — 새 단계 전이 경로 안 만듦 |
| 주문 단계 모델 | `models/Order.js:76` ENUM `awaiting_payment/pending/preparing/ready/served/completed/cancelled/outstanding`, 품목 단계는 `order_items` JSON 라인에 (`Order.js:191`), 세트 구성품 단계는 `set_items[동일 index]` (KDS:770 규칙, 메모리 [[reference_set_component_stage_field]]) | 후보 쿼리의 단일 진실 |
| 실시간 | `io.of('/orders').to('restaurant_{id}')` — `order-created/order-updated/order-items-added/order-deleted` | 카메라 화면의 후보 최신화 + 충돌 감지 |
| 메뉴 사진 | `models/Product.js` `image`(URL, TEXT medium) + `image_thumbnail`, `utils/imageProcessor.js`(sharp, `/var/www/uploads/products` + `/thumbnails`) | Track A 썸네일 + Track B 레퍼런스 사진 시드 |
| 직원 권한 | `pos_counter` capability, `requirePosCounter`, 서빙 직원 = 단계이동 허용/취소·결제 차단 (SERVING_VIEW_DESIGN §3) | 카메라 화면 접근 권한 = 서빙 직원 그대로 |

### 1.4 🔒 인쇄 보호 — 무접촉 선언

이 기능은 인쇄와 **무관**하다. 설계상 보호 파일 8개(billPrint / useAutoPrintPoller / MainLayout / KitchenDisplayPage / POSTerminalPage / orders-crud / stationEnrichment / orderTotals)를 **한 줄도 수정하지 않는다**:
- 서빙 전이 = **기존** `PATCH /orders/:id/items` 호출 (orders-crud.js 무수정 재사용).
- Track A/B 진입 버튼은 **FloorPlan 툴바 안** — MainLayout(사이드바) 무접촉. (사이드바 메뉴가 나중에 필요하면 그때 Irene 승인 + `--bless` 별도 건.)
- Track A 썸네일 범위 = FloorPlan(ItemListView/TableDetailPanel) — **POSTerminalPage 는 MVP 제외** (보호 파일. 원하면 별도 승인 건).
- 검증 게이트: 구현 후 `node scripts/check-print-guard.js` **변경 0건** 이 통과 조건.

---

## 2. 시스템 아키텍처

### 2.1 전체 흐름 (텍스트 다이어그램)

```
[서빙 직원 태블릿/폰 — 모바일웹 PWA (기존 POS PWA, start_url=/pos)]
 │
 │ ① getUserMedia(후면 카메라) → 한 탭 촬영
 │ ② 클라이언트 압축: canvas → JPEG 긴변 512px, ~80–200KB   (client)
 ▼
POST /api/ai-serving/:restaurantId/recognize  (multipart, authenticateToken+checkRestaurantAccess)
 │
 ├─ ③ sharp 재검증/정규화 (512px, EXIF 회전 보정)            (server)
 │
 ├─ ④ 후보 쿼리 (POS 상태 제약) ──────────────┐              (server, MySQL)
 │     orders WHERE restaurant_id=? AND status IN               │
 │     ('pending','preparing','ready') AND is_deleted=0         │
 │     → order_items JSON 파싱 → item.status==='ready'          │
 │       (세트는 set_items[i].status==='ready' 구성품)          │
 │     → 서빙 안 된 ready 품목 리스트 = 후보셋 (보통 3~15개)    │
 │                                                              │
 ├─ ⑤ AIProvider.embedImage(사진) → 벡터                     (external API, ~300–500ms)
 │                                                              │
 ├─ ⑥ 유사도: 사진벡터 × 후보 메뉴들의 레퍼런스 임베딩       (server, <5ms)
 │     (menu_reference_photos.embedding, 메뉴당 max-pooling)    │
 │                                                              │
 ├─ ⑦ 융합 랭킹: 이미지점수 + ready경과시간 + 옵션 prior ◄────┘ (server)
 ├─ ⑧ 확신도 보정 → 정책 (auto/recommend/pick/reshoot)
 ├─ ⑨ recognition_logs INSERT (텍스트만: 결과·확신도·지연시간 — 원본 사진 무보존)
 ▼
응답 { candidates[], mode, log_id }  →  화면: 메뉴/테이블/옵션/확신도 + [서빙] [재촬영]
 │
 │ [서빙] 탭 → 기존 PATCH /api/orders/:id/items (품목 served)   ← 단계 전이는 기존 경로 그대로
 │          → POST /api/ai-serving/logs/:id/outcome (무엇을 골랐나 기록)
 ▼
socket order-updated → KDS·FloorPlan·LiveOrders 즉시 일관 (기존 실시간 그대로)
```

**어디서 무엇이 도는가**: 촬영·압축 = 클라이언트 / 후보쿼리·유사도·랭킹·로그 = 우리 백엔드(Node) / **외부 AI는 임베딩 1회 호출뿐**. 벡터 비교는 후보가 작아 브루트포스 코사인으로 충분 — **벡터 DB 불필요** (매장당 메뉴 ~100 × 사진 3장 = 벡터 300개, JSON 컬럼 저장으로 끝).

**지연 예산 (~1s)**: 압축 100ms + 업로드 150ms + 임베딩 API 300–500ms + 쿼리/랭킹 20ms + 응답 렌더 100ms ≈ 0.7–0.9s.

### 2.2 AIProvider 추상화 인터페이스

위치: `dev-backend/services/ai/` (신규 디렉토리 — 라우트와 분리).

```js
// services/ai/AIVisionProvider.js — 추상 계약
class AIVisionProvider {
  get name() {}            // 'vertex' | 'azure' | 'openai-judge' | 'local-clip'
  get mode() {}            // 'embedding' | 'judge'  (아래 2모드 설명)
  get embeddingDim() {}    // embedding 모드일 때 차원 (예: Vertex 1408)

  // embedding 모드: 이미지 → 벡터. 유사도 계산은 우리 서버가 한다.
  async embedImage(jpegBuffer /*, {timeoutMs} */) {}   // → { vector:number[], model, ms }

  // judge 모드(폴백): 후보 레퍼런스 사진들 중 고르라고 멀티모달 LLM에 시킴.
  async judgeAmongCandidates(jpegBuffer, candidates /*[{menuId,name,refImageUrl}]*/) {}
  //   → { ranked:[{menuId, score}], model, ms }

  async healthCheck() {}   // → { ok, latencyMs }
}
module.exports = { AIVisionProvider };
```

**두 모드가 있는 이유** — 프로바이더마다 제공 형태가 다르다:

| 구현체 | 모드 | 비고 |
|---|---|---|
| `VertexEmbeddingProvider` (**MVP 기본**) | embedding | Vertex AI `multimodalembedding@001` (1408-dim). 이미지·텍스트 동일 공간. 레퍼런스는 미리 임베딩해 저장 → 실시간엔 촬영분 1회만 호출 |
| `AzureVisionProvider` | embedding | Azure AI Vision Image Vectorization (Florence). 인터페이스 동일 |
| `OpenAIJudgeProvider` | judge | OpenAI 는 이미지 임베딩 API 가 없음 → GPT-4o 비전에 "촬영사진 + 후보 메뉴 사진들" 주고 고르게 함. 비싸고 느림(1–2s) — **프로바이더 장애 폴백/정확도 크로스체크 전용** |
| `LocalClipProvider` (미래) | embedding | onnxruntime-node + CLIP/SigLIP. 외부 비용 0, 오프라인 임베딩. Prod 단계 옵션 |

참고: **Google Cloud Vision Product Search 는 서비스 폐지(deprecation) 라인**이라 채택하지 않는다 — 같은 회사의 Vertex 멀티모달 임베딩이 후계 경로.

**교체 경로**: `services/ai/index.js` 팩토리 — `AI_VISION_PROVIDER` env (기본 `vertex`) + 프로바이더별 자격증명 env. 임베딩 모델이 바뀌면 벡터 공간이 달라지므로 `menu_reference_photos.embedding_model` 컬럼으로 버전을 태깅하고, 모델 교체 시 `refresh-embeddings` 배치가 전체 재임베딩(§4.6). 서로 다른 모델 벡터끼리 비교 금지 — 조회 시 `embedding_model = 현재 모델` 필터.

**장애 격리**: 프로바이더 호출은 timeout 3s + 실패 시 **degrade 응답**(이미지 점수 0, ready 시간순 후보 리스트 = 사실상 수동 선택 화면) — 카메라 화면이 죽지 않는다(§10).

---

## 3. 데이터 모델

새 테이블 2개 + 기존 테이블 무변경 (orders/products 스키마 무접촉 — 🔒 안전).

### 3.1 `menu_reference_photos` — 메뉴별 레퍼런스 사진 + 임베딩

```
id                INT PK AI
restaurant_id     INT NOT NULL           → restaurants.id (인덱스)
product_id        INT NOT NULL           → products.id (인덱스; 매장 메뉴 = Product 모델, restaurant_id 스코프)
image_url         VARCHAR(500) NOT NULL  -- /uploads/products/... 재사용 또는 /uploads/reference-photos/...
thumbnail_url     VARCHAR(500) NULL
source            ENUM('menu_image','staff_upload') NOT NULL
                  -- menu_image: Product.image 에서 자동 시드
                  -- staff_upload: 설정 "메뉴 인식 사진 추가" 에서 매장이 올린 각도/조명/실플레이팅 사진
                  -- ⛔ 손님/인식 촬영 사진 승격 경로 없음 (2026-07-03 결정 #1·#2 — 손님 사진 학습 안 함)
embedding         JSON NULL              -- float 배열 (1408-dim ≈ 11KB). 후보가 작아 JSON+브루트포스로 충분
embedding_model   VARCHAR(60) NULL       -- 'vertex/multimodalembedding@001' — 모델 교체 대비 버전 태그
embedding_dim     SMALLINT NULL
is_active         BOOLEAN DEFAULT true
created_by        INT NULL               → users.id
created_at / updated_at
UNIQUE (product_id, image_url)           -- 멱등 시드
```

- **정확도 전략 = 레퍼런스 사진이 유일한 학습 소스 (2026-07-03 결정 #2, 손님 사진 미사용).** 두 경로뿐:
  - **(a) 자동 시드**: 매장 활성화 시 `Product.image` 있는 메뉴 전부 → 행 생성 + 임베딩 배치. **Irene/매장이 이미 올린 메뉴 사진이 곧 초기 학습 데이터** — Track A 가 사진 등록률을 끌어올리는 이유.
  - **(b) 설정 "메뉴 인식 사진 추가"**: RA 설정 화면에서 접시당 **각도·조명·실플레이팅 사진 몇 장** 업로드 → source=`staff_upload`. 메뉴당 레퍼런스 3~5장이 정확도의 핵심 지렛대. (§4.5 API + §6 UI.)
  - ⛔ 손님 촬영/인식 스냅샷은 레퍼런스로 승격하지 않는다 — 학습은 오직 매장이 의도적으로 올린 사진.
- `Product.image` 변경 시(products 라우트의 이미지 저장 성공 지점에서) 해당 메뉴 재시드 큐잉 — `imageProcessor.processImage` 자체는 무수정, 라우트 레벨 훅.
- Sequelize 모델 `models/MenuReferencePhoto.js` + `models/index.js` association (Restaurant.hasMany / Product.hasMany) + export — 체크리스트 3점 세트.

### 3.2 `recognition_logs` — 모든 인식 시도 기록 (텍스트만, 정확도 개선 루프의 원료)

**결정 #1 (2026-07-03): 원본 사진 컬럼 없음.** 직원 스냅샷은 인식에만 순간 쓰고 즉시 폐기 — 이 테이블엔 **텍스트 결과만** 남는다. `image_url`/`image_retained` 컬럼은 **설계에서 제거**. 프라이버시 표면(손님 얼굴 등) 자체가 존재하지 않음.

```
id                 INT PK AI
restaurant_id      INT NOT NULL          (인덱스: restaurant_id+created_at)
staff_user_id      INT NULL              → users.id
query_embedding    JSON NULL             -- ⚙️ 선택·기본 OFF (aiServing.retainEvalVectors=false).
                                         --    켜도 벡터(비가역·비식별)만, 원본 사진은 절대 저장 안 함.
                                         --    평가 하네스 재생용. 기본 NULL.
candidates         JSON NOT NULL         -- top-k [{product_id, order_id, item_index, table, img_score, fused_score, confidence}]
top_product_id     INT NULL
top_confidence     DECIMAL(5,4) NULL
mode               ENUM('auto','recommend','pick','reshoot','fallback') NOT NULL  -- 정책 결과
decision           ENUM('auto_confirmed','recommend_confirmed','picked_other','manual','reshoot','abandoned') NULL
chosen_order_id    INT NULL              → orders.id
chosen_item_index  SMALLINT NULL         -- order_items 배열 인덱스 (품목은 JSON 라인이라 FK 없음)
chosen_product_id  INT NULL
was_top1_correct   BOOLEAN NULL          -- chosen_product_id === top_product_id (파생, 리포트용)
provider           VARCHAR(30) NOT NULL
latency_ms         SMALLINT UNSIGNED NULL
created_at
```

- INSERT 는 recognize 응답 직전(⑨), decision/chosen_* 은 outcome API 로 나중 UPDATE(§4.4). abandoned = 5분 내 outcome 없음(정리 배치).
- **이 테이블이 곧**: 정확도 리포트(주간 top1 정확률, 메뉴별 혼동 페어), 확신도 보정 데이터, 평가 하네스 입력.
- **원본 사진 무보존**이라 Beta 의 "정답 실사진 레퍼런스 승격"은 채택 안 함 — 정확도 개선은 매장이 설정에서 올린 레퍼런스 사진(§3.1 b)으로만. `query_embedding` 은 옵션이며 기본 꺼둠 → 실사용 기본값에서 이 테이블은 **완전 텍스트**.

### 3.3 설정·게이팅 (새 테이블 없음) — **Enterprise 티어 전용 (결정 #3)**

- **유료 티어 포함, 무료 개방 아님.** 기존 **tier-gating 3-layer** 패턴 재사용 (메모리 [[reference_tier_gating]]):
  1. **plan_templates**: 모듈 키 `ai_serving` 를 **id=3 `enterprise` (`plan_target='restaurant'`, 레스토랑 최상위 티어) 의 `included_modules` 에만** 추가. **id=1 `basic` / id=2 `professional` 은 제외** (미포함 = 접근 불가). 실측 확인(dev DB): id=3 이 레스토랑 최상위, 현재 included_modules 에 `mobile_ordering/recipe_management/inventory_management/advanced_inventory` 등 상위 모듈이 이미 여기만 들어있음 → `ai_serving` 도 동일 위치. 멱등 마이그(§3.4)로 id=3 included_modules 에 append.
  2. **백엔드**: `MODULE_GATED_ROUTES` 에 `/api/ai-serving` 매핑 + 라우터에 `requireModule('ai_serving')` 미들웨어 (authenticateToken·checkRestaurantAccess 다음). 미포함 매장 = 402/403.
  3. **프론트**: `hasModule('ai_serving')` 로 카메라 버튼·설정 화면·MenuPhotoGallery 노출 게이트 (자리 유지·비활성이 아니라 미포함 티어면 아예 숨김 — 상위 모듈 관례 따름).
- **포함 = 건당 과금 없음.** Enterprise 매장은 인식 무제한(공정사용 상한 내). 임베딩 원가(~US$1–7/매장·월)는 Enterprise 월가에 흡수 — §9.
- **공정사용 상한 ~30k 인식/매장·월** = 정상 과금 아님, **남용 방지 백스톱**. 초과 시 스로틀 안내(또는 선택적 원가 초과분) — §9. 레이트리밋(30/분, §4.1)과 별개의 월 카운터.
- **매장 설정**: `operation_settings.aiServing = { enabled: true, retainEvalVectors: false }`.
  (⛔ `retainPhotos` 키 없음 — 결정 #1 로 사진 보존 개념 자체 제거. `retainEvalVectors` 는 벡터만, 기본 false.)
  ⚠️ 함정 2개 (실측된 과거 사고 기반): ① `settingsGuard.js` **화이트리스트에 키 추가 필수** (미등록 시 다른 설정 저장에 wipe — [[reference_prep_timer]] 교훈) ② 저장→GET round-trip 검증 (모델 getter 키 strip 함정 — [[reference_model_getter_key_strip]]).
- 프로바이더 자격증명 = 서버 env 만 (`AI_VISION_PROVIDER`, `VERTEX_PROJECT_ID`, `VERTEX_LOCATION`, `AZURE_VISION_KEY`...). DB/프론트에 절대 노출 금지.

### 3.4 마이그레이션 방식 (프로젝트 규칙 준수)

- 전용 **멱등** 스크립트 `dev-backend/scripts/migrate-ai-serving.js`: `CREATE TABLE IF NOT EXISTS` 2개 + **plan_templates id=3(`enterprise`) `included_modules` 에 `ai_serving` append**(이미 있으면 skip — 멱등) + **끝에 `process.exit()` 필수** (sequelize 핸들 잔류 → 배포 무한정지, [[reference_deploy_migration_must_exit]]). id=1/2 는 건드리지 않음.
- `sync-database.js` 는 컬럼 ALTER 만 하므로 (ENUM/seed 는 명시 마이그 필요 — [[reference_deploy_schema_drift]]) 신규 테이블·seed 는 이 스크립트가 단일 경로. 배포 체크리스트(9a-2)에 등재.
- 기존 테이블 ALTER 0건 — 롤백 = 테이블 drop 만으로 완결, 주문/메뉴 데이터 무영향.

---

## 4. API 설계

신규 라우터 `dev-backend/routes/ai-serving.js`, `server.js` 에서 `app.use('/api/ai-serving', aiServingRouter)` 로 **경로 전용 마운트** (블랭킷 `router.use(authenticateToken)` 후 fall-through 함정 회피 — [[reference_path_level_middleware]], [[reference_public_route_under_router_auth]]). 모든 응답 = 프로젝트 표준 `{success:true,data}` / `{success:false,message}`.

공통 미들웨어: `authenticateToken` + `checkRestaurantAccess` (`:restaurantId` 파라미터 불신뢰 원칙). 서빙 직원(비 `pos_counter`)도 사용 가능해야 하므로 **requirePosCounter 걸지 않는다** — 서빙 전이 자체가 SERVING_VIEW_DESIGN §3 에서 서빙 직원 허용으로 이미 확정된 영역.

### 4.1 `POST /api/ai-serving/:restaurantId/recognize` — 촬영 → 인식

- **요청**: multipart (`multer` memoryStorage, **fileSize 3MB 제한**, image/jpeg·png 만) 필드 `photo`. (base64 JSON 도 허용하되 multipart 우선 — express.json 10mb 한도 내이지만 multipart 가 메모리·속도 유리.)
- **레이트 리밋**: 전용 limiter 30회/분/유저 (연사 방지 + 프로바이더 비용 가드).
- **서버 처리**: sharp 로 512px JPEG 재정규화(EXIF 회전 포함) → §5 파이프라인.
- **응답**:

```json
{ "success": true, "data": {
  "log_id": 123,
  "mode": "recommend",              // auto | recommend | pick | reshoot | fallback
  "provider": "vertex",
  "latency_ms": 640,
  "candidates": [
    { "order_id": 9911, "item_index": 2, "product_id": 55,
      "menu_name": "불고기덮밥", "thumbnail": "/uploads/products/thumbnails/bulgogi.jpg",
      "table": "A12", "order_type": "dine_in", "order_number": "0342",
      "options": ["계란추가", "고기많이"], "notes": null,
      "ready_at": "2026-07-03T12:01:44Z", "ready_min": 3,
      "confidence": 0.93, "img_score": 0.91,
      "is_set_component": false, "set_index": null }
  ]
} }
```

- 후보 0건(ready 품목 없음) → `mode:'reshoot'` 아님 — `{success:true, data:{mode:'no_candidates', candidates:[]}}` + 화면은 "지금 조리완료된 품목이 없어요".

### 4.2 `GET /api/ai-serving/:restaurantId/ready-items` — 후보(수동 폴백) 조회

recognize 의 ④단계(후보 쿼리)만 단독 노출 — 카메라 화면 하단 "직접 고르기" 시트와 프로바이더 장애 폴백이 사용. 응답 형태는 candidates 와 동일(confidence 없이 ready 시간순).

### 4.3 서빙 확정 — **신규 전이 API 없음 (의도적)**

서빙 버튼은 프론트가 **기존** `PATCH /api/orders/:id/items` (orders-crud.js:1779, 품목 status→'served', 회귀가드·`order-updated` 소켓 방송 내장)를 그대로 호출한다. ItemListView 의 서빙 토글과 100% 같은 코드 경로 → 단계 전이 단일 경로 유지(§7), 🔒 orders-crud 무수정.

### 4.4 `POST /api/ai-serving/logs/:logId/outcome` — 결정 기록

```json
// 요청
{ "decision": "recommend_confirmed", "chosen_order_id": 9911, "chosen_item_index": 2, "chosen_product_id": 55 }
```
- 서빙 PATCH 성공 **후** 프론트가 호출(비차단, 실패해도 서빙은 이미 완료). `was_top1_correct` 서버 파생. 소유 검증: log.restaurant_id vs req.user.
- `decision:'reshoot'|'manual'` 도 기록 — 실패 데이터가 정확도 루프의 핵심.

### 4.5 레퍼런스 사진 관리 (RA + staff)

- `GET    /api/ai-serving/:restaurantId/reference-photos?product_id=` — 목록
- `POST   /api/ai-serving/:restaurantId/reference-photos` — multipart 업로드(메뉴 지정, 각도 추가). 저장은 `imageProcessor` 패턴 준용(디스크 저장 + URL — base64 DB 인라인 금지 [[reference_image_storage_rule]]). 업로드 즉시 임베딩.
- `DELETE /api/ai-serving/:restaurantId/reference-photos/:id` — soft (is_active=false)
- 권한: 목록 = 전 직원 / 등록·삭제 = RA (사진은 매장 자산 — 설정 wipe 계열 사고 예방과 같은 철학).

### 4.6 `POST /api/ai-serving/:restaurantId/refresh-embeddings` — 임베딩 갱신

- 멱등 배치: `embedding IS NULL OR embedding_model != 현재모델` 인 행만 재임베딩. RA/System Admin.
- 동일 로직의 야간 cron = **SchedulerRun 패턴** ([[reference_scheduler_run]]) `ai-embedding-refresh` — running→success/error 기록, Admin 모니터링 자동 노출.

### 4.7 리포트 (Beta)

- `GET /api/ai-serving/:restaurantId/accuracy-report?from=&to=` — top1 정확률, mode 분포, 메뉴별 혼동 페어, 평균 지연. RA 리포트 탭용.

---

## 5. 인식 파이프라인 상세 (①–⑨)

### ① 촬영 (client)
`getUserMedia({ video: { facingMode: 'environment' } })` — 기존 POS PWA 안이므로 HTTPS 충족. 한 탭 = 캔버스 캡처(연속 스트림에서 스틸). 권한 거부 시 `<input type="file" accept="image/*" capture="environment">` 폴백(§10).

### ② 압축 (client)
canvas → `toBlob('image/jpeg', 0.8)`, 긴변 512px. 80–200KB. 접시 인식에 512px 이상 불필요 — 업로드 150ms 대 확보.

### ③ 정규화 (server)
sharp: EXIF autoRotate + 512px 재보장 + JPEG 재인코딩(악성 페이로드 세척 겸용).

### ④ 후보 쿼리 — POS 상태 제약 (핵심)

```sql
SELECT id, order_number, table_number, order_type, order_items, created_at
FROM orders
WHERE restaurant_id = :rid
  AND status IN ('pending','preparing','ready')   -- served/completed/cancelled/awaiting_payment/outstanding 제외
  AND (is_deleted = 0 OR is_deleted IS NULL)
```

이후 Node 에서 `order_items` JSON 파싱:
- 일반 품목: `item.status === 'ready'` → 후보. (주문이 `preparing` 이어도 품목이 ready 면 후보 — KDS 는 품목 단위로 ready 를 찍고 주문 승급은 전 주방 완료 시에만이므로(KDS 🔒 규칙) **품목 레벨이 정답 소스**다.)
- 세트: `set_items[i].status === 'ready'` 인 구성품 각각 후보 (구성 정보는 set_components, 단계는 set_items[동일 index] — [[reference_set_component_stage_field]] 규칙 그대로. ItemListView 가 이미 이렇게 구성품을 개별 행으로 편다).
- 수량 n>1 품목은 후보 1건으로 취급(서빙 토글도 품목 단위).
- 결과: `[{order_id, item_index, product_id, menu_name, options, table, ready_since, ...}]`. product_id 없는 라인(레거시)은 이름 매칭 폴백 — `stationEnrichment.resolveProductId` 와 같은 원칙(해당 유틸은 🔒라 **재사용하지 않고** ai-serving 쪽에 독립 이름폴백 구현).

### ⑤ 임베딩 (external, 1회)
`provider.embedImage(buffer)` — timeout 3s. 실패 → `mode:'fallback'` (④ 결과를 ready 시간순으로 반환).

### ⑥ 유사도

후보의 **서로 다른 product_id** 집합(3~8개)에 대해:
```
imgScore(menu) = max over refs of cosine(queryVec, ref.embedding)   // 메뉴당 max-pooling
```
전 레퍼런스 벡터는 서버 메모리 캐시(매장당 수백 개, 재시작/refresh 시 로드) — DB 왕복 없이 <5ms.

### ⑦ 융합 랭킹 (후보 = 품목 단위)

```
fused(item) = w_img · norm(imgScore(item.product))   // norm = 후보 내 min-max
            + w_time · fifo(item)                    // ready 오래된 순 (0..1) — 먼저 나온 음식 먼저 서빙
            + w_opt · optPrior(item)                 // MVP 0. Beta: 옵션 시각 단서(§5-옵션)
초기 가중치: w_img=0.85, w_time=0.15, w_opt=0 (Beta 에서 로그 기반 튜닝)
```

### ⑧ 확신도 + 정책

원시 코사인은 확률이 아니다 → **보정 확신도**:
```
confidence = σ( a · top1_img + b · (top1_img − top2_img) + c )    // margin 이 핵심 신호
```
초기 a,b,c 는 파일럿 수동 캘리브레이션, Beta 부터 recognition_logs 로 재적합(로지스틱 회귀 — was_top1_correct 라벨).

| confidence | mode | 화면 |
|---|---|---|
| ≥ 0.95 | `auto` | 1위 자동 선택 표시 + [서빙] 큰 버튼 (탭은 여전히 사람) |
| 0.90–0.95 | `recommend` | 1위 추천 + "이 메뉴 맞나요?" 확인 탭 |
| 0.80–0.90 | `pick` | 후보 2개 나란히 — 사람이 선택 |
| < 0.80 | `reshoot` | "다시 촬영해 주세요" + [직접 고르기] |

**동일 메뉴 규칙(정책 우선)**: 매칭 1위 메뉴에 ready 품목이 **2건 이상**이면 confidence 와 무관하게 `mode='pick'` 강등 — 테이블 후보(A12·B03·C07)를 ready 오래된 순으로 전부 표시 + 옵션 차이 하이라이트. **절대 조용히 하나 찍지 않는다.**

### 옵션 추론
- MVP: 옵션은 **매칭된 주문 라인의 데이터를 그대로 표시** (`order_items[i].options`) — 사진 해석 아님. 동일메뉴 다중 후보 시 옵션 diff 를 굵게(예: A12 계란추가 / B03 김치제외).
- Beta: "사진으로 확인 가능한 옵션"(계란추가 등)에 시각 단서 임베딩 활용 — 옵션 텍스트도 멀티모달 임베딩(텍스트-이미지 동일 공간)해 `optPrior` 가중치로만 반영. 확정은 항상 사람.

### ⑨ 로깅
recognition_logs INSERT (§3.2) → 응답. outcome 은 §4.4.

---

## 6. UI/UX

전제: **모바일웹 PWA** (기존 POS 번들, 새 하드웨어 0) — Windows POS·태블릿·iOS·Android 동시 도달. `posDisplayTheme` CSS 변수(밝게/고대비/어둡게) + i18n 4언어 (`floorplan` ns 확장 또는 신규 `aiserving` ns, en→ko→zh→ms + `npm run i18n:verify`). 터치 전제(44px+, hover 비의존 — [[feedback_touchscreen_no_keyboard]]). 배포 시 SW_VERSION bump 필수.

### 6.1 Track A — 사진 우선 (AI 없음)

1. **ItemListView 행 썸네일**: `PillCell` 과 `Body` 사이 44×44 라운드 썸네일 (`Product.image_thumbnail`). 매핑 = 품목 product_id → POS 메뉴 캐시(이미 로드돼 있는 products) lookup, 이름 폴백. 사진 없으면 이니셜 플레이스홀더(이모지 금지 — 디자인 가드).
2. **탭 → 품목 상세 시트**: 큰 사진 + 메뉴명 + 옵션 + 테이블 + 단계 pill + [서빙] (기존 토글 재사용). 표준 `components/UI/Modal` 사용 (자체 overlay 금지 — [[feedback_standard_modal_components]]).
3. **TableDetailPanel 품목 행에도 같은 썸네일** (작게, 24px).
4. **"메뉴 사진 확인" 원탭 진입**: FloorPlan 툴바 버튼(모든 뷰에서 보임, 항상 같은 자리 — [[feedback_pos_ui_persistent_controls]]) → `MenuPhotoGallery` 모달: 카테고리 필터 + 검색 + 사진 그리드, 탭 = 확대 + 옵션그룹 표기. 신입 직원의 "이게 무슨 메뉴지?"를 즉시 해결.
5. 부수효과: 사진 없는 메뉴가 눈에 보임 → 매장이 사진을 채움 → **Track B 레퍼런스 데이터가 저절로 쌓임**.

### 6.2 Track B — 카메라 서빙

진입: ItemListView 툴바의 [카메라] 버튼 (`hasModule('ai_serving')` && 설정 enabled 일 때만. 단 버튼 자리는 유지하고 비활성 — 조건부 언마운트 금지 규칙).

```
[카메라 화면]  풀스크린 뷰파인더 + 하단 큰 셔터 1개 + "직접 고르기" 링크
   ↓ 탭
[분석 중]     0.5–1s 스피너 + 촬영 스틸 프리뷰 (취소 가능)
   ↓
[결과 — auto/recommend]          [결과 — pick]              [reshoot]
 ┌────────────────────┐   후보 카드 2~N개 세로 나열       "잘 안 보여요.
 │ 메뉴사진 │ 불고기덮밥 │   (테이블 크게, 옵션 diff 굵게,   다시 찍어주세요"
 │  A12 (크게)          │    ready 경과시간)               [재촬영][직접 고르기]
 │  계란추가 · 고기많이  │   탭 = 선택 → 서빙 확인
 │  조리완료 3분 경과    │
 │  확신도 96%          │
 │ [ 서빙 완료 ]  [재촬영]│
 └────────────────────┘
   ↓ 서빙 탭
[완료 토스트 "A12 불고기덮밥 서빙"] → 뷰파인더 복귀 (연속 서빙 흐름)
```

- 제로 트레이닝: 화면에 버튼 최대 2개, 설명 문구는 평이한 말만("PC 있냐/프린터 연결됐냐" 수준의 언어 — 내부 용어 비노출).
- 확신도는 % 숫자 + 문구("거의 확실해요/확인해 주세요")로 이중 표기.
- 이미 다른 직원이 서빙한 품목(소켓 order-updated 수신) → 결과 카드에 "방금 서빙됨" 덮개 + 자동 새로고침(§7).

### 6.3 위치/라우팅

- 신규 페이지 컴포넌트: `dev-frontend/src/pages/FloorPlan/AIServeCamera.tsx` (FloorPlan 하위 — 서빙 도메인 응집, lazy chunk. cross-chunk styled import 금지 주의 — TDZ [[reference_live_orders_pattern]]).
- App.tsx 라우트 `/pos/serve-camera` (lazy) — MainLayout 사이드바 무접촉(🔒).

---

## 7. 실시간 / POS 통합

- **후보의 단일 진실 = DB (`orders.order_items` 품목 status)** — recognize 시점마다 서버가 fresh 쿼리(④). 폴링/소켓 캐시에 의존하지 않으므로 "소켓 끊겨도 정확" (인쇄에서 배운 원칙: DB 가 단일 진실).
- **소켓은 가속·무효화용**: 카메라/결과 화면이 `/orders` 네임스페이스 `restaurant_{id}` 룸 구독(기존 OrdersRealtimeProvider 재사용, restaurant 비교 Number() 함정 유의) — `order-updated` 수신 시 표시 중 후보의 품목이 served/cancelled 로 바뀌면 카드 무효화.
- **서빙 전이 = 기존 경로 그대로**: `PATCH /orders/:id/items` → orders-crud 가 `order-updated` 방송 → KDS(표시전용)·FloorPlan·LiveOrders 자동 일관. 주문 전체 승급은 기존 규칙(전 품목 완료 시 `areAllItemsDoneForColumn` 계열 — 프론트 기존 코드가 이미 수행) — **본 기능은 품목 서빙만 찍고 승급 로직에 관여하지 않는다** (KDS 🔒 단계 로직 무접촉).
- **경합 (두 직원이 같은 접시를 서빙)**: PATCH 의 기존 회귀방지 가드(orders-crud.js:1837 — 품목 status 후퇴 방지)로 안전. 두 번째 요청은 무해한 no-op → 프론트는 "이미 서빙됨" 토스트.
- **인쇄와의 관계 = 없음**: needs_print/printed_at/pending-print 어디에도 안 닿음. 서빙 단계 전이는 인쇄 트리거가 아님(기존과 동일).

---

## 8. 롤아웃 플랜

### Phase 1 — MVP (Track A + Track B 최소 완결)
- Track A 전부: ItemListView/TableDetailPanel 썸네일, 품목 상세 시트, MenuPhotoGallery.
- Track B: VertexEmbeddingProvider 단일, `Product.image` 자동 시드(메뉴당 사진 1장) + 설정 "메뉴 인식 사진 추가"(staff_upload) 화면, recognize/outcome/ready-items API, 확신도 4구간 정책 + 동일메뉴 pick 강등, recognition_logs 전량 기록(**텍스트만·사진 무보존**), 프로바이더 장애 fallback.
- 게이팅: **Enterprise(plan_templates id=3) 전용** `ai_serving` 모듈 + requireModule/MODULE_GATED_ROUTES/hasModule + operation_settings.aiServing + settingsGuard 화이트리스트. basic/professional 제외.
- 파일럿: 데모 매장(dev id=38) → 실매장 1곳(후보: thefire — Irene 결정 §12).
- 검증: §11 전부 + check-print-guard 0건 + health-check(신규 ai 카테고리 포함).

### Phase 2 — Beta (정확도 루프)
- **다각도 레퍼런스 = 유일한 학습 소스 (결정 #2)**: 설정 "메뉴 인식 사진 추가"(staff_upload) 활용 극대화 — 혼동 잦은 메뉴에 사진 더 올리라는 리포트 유도. ⛔ 손님/인식 실사진 승격 경로 없음.
- 확신도 재보정(로그 로지스틱 적합 — 텍스트 로그의 was_top1_correct 라벨) + 가중치 튜닝 + 옵션 시각단서 optPrior.
- 정확도 리포트(§4.7) + 주간 혼동 페어 알림(NOTIFICATION_CATEGORIES 등록) → 어느 메뉴에 레퍼런스 사진을 더 올려야 하는지 매장에 안내.
- 평가 하네스 상시화(§11.4) — 임계값 변경은 하네스 수치로만.

### Phase 3 — Production (스케일·비용)
- 사용량 미터링 + 매장별 일일 상한, 헤비유저 과금 전환 판단(§9).
- 프로바이더 페일오버 체인(vertex→azure→judge→fallback), LocalClipProvider 검토(외부비용 0).
- **미래 항목 (MVP 아님 — 목록만)**: 플레이팅/품질 체크, 접시 자동 수량 카운트, 주방 거치 카메라의 자동 ready 처리, CCTV 연동. 전부 별도 설계 건.

---

## 9. 비용 모델 (ballpark — 구현 시 최신 단가 재확인)

| 항목 | 단가(추정) | 매장 월비용 |
|---|---|---|
| Vertex 멀티모달 임베딩 (인식 1회 = 이미지 1건) | ~US$0.0001–0.0002/이미지 | 한가한 매장 ~10k/월 ≈ **$1** · 바쁜 매장 ~35k/월 ≈ **$3.5–7** |
| 레퍼런스 임베딩 (시드+갱신) | 동일 | 메뉴 100 × 사진 3~5 = ~300–500건, 사실상 **1회성 ≈ $0.03/매장** |
| OpenAI judge 폴백 (GPT-4o 비전) | ~$0.003–0.01/호출 | 폴백 전용(프로바이더 장애 시만) — 상시 아님 |
| 스토리지 | **0** | **원본 사진 무보존(결정 #1)** → 이미지 스토리지 비용 없음. 텍스트 로그만(무시 가능) |

**비용 제어 = 4개**: ① 클라이언트 압축(512px, 80–200KB) ② 레퍼런스 임베딩 캐시(실시간엔 촬영분 1회만 호출) ③ **ready-only 3–8 메뉴 비교 → 벡터 DB 불필요**(브루트포스 코사인) ④ Prod 에서 헤비 매장은 LocalClipProvider(외부비용 0, 온서버 임베딩).

**과금 결론 (결정 #3)**: **Enterprise(RM99/월* — *가격 재확인 필요) 티어 포함 = 건당 과금 없음.** 매장당 원가 US$1–7/월 은 Enterprise 가격에 흡수. basic/professional 은 애초에 미포함이라 비용 노출 없음.
- **공정사용 상한 ~30k 인식/매장·월** = **남용 방지 백스톱**(정상 과금 아님). 월 카운터가 초과하면: 스로틀 안내(계속 쓰려면 문의) 또는 선택적 원가 초과분 청구 — 정책 스위치. 정상 운영(하루 300–1,000 인식 = 월 9k–30k)은 상한 내.
- *운영 실제 Enterprise 월가(dev DB RM99 vs 전달 RM179)는 배포 전 Irene 재확인 (§0 결정 #3 각주).

**미래(Prod)**: 전 매장 합산 외부 API 비용이 월 $수백 넘으면 헤비 매장부터 LocalClipProvider 로 전환 — 게이트/스위치는 이미 있음.

---

## 10. 예외 처리 · 프라이버시

| 상황 | 동작 |
|---|---|
| 카메라 권한 거부 | `<input type=file capture>` 폴백 제안 + [직접 고르기](ready-items 리스트). 화면 죽지 않음 |
| getUserMedia 미지원 (구형 웹뷰) | 카메라 버튼 → 바로 직접 고르기 모드 + 1회 안내 |
| 오프라인 | 카메라 버튼 비활성(자리 유지) + "인터넷 연결 후 사용 가능". ItemListView 는 기존 동작 그대로 |
| 프로바이더 다운/타임아웃(3s) | `mode:'fallback'` — ready 시간순 후보 리스트 반환 (= 수동 선택으로 우아한 강등). SchedulerRun healthCheck 로 지속 장애 감지 |
| 매칭 없음(<0.80) | reshoot 안내(조명/각도 팁 1줄) + 직접 고르기. reshoot 도 로그(개선 원료) |
| ready 품목 0건 | "조리완료된 품목이 없어요" 빈 상태(에러 아님) |
| 표시 중 후보가 타 직원에 의해 서빙/취소 | 소켓 무효화 + "방금 서빙됨" + 재조회 |
| 업로드 >3MB / 비이미지 | 400 표준 메시지 (클라 압축이 정상 경로라 실사용 미발생) |

**프라이버시 (결정 #1 — 표면 자체를 제거)**:
- **원본 사진 무보존.** 촬영 스냅샷은 메모리에서 인식(임베딩 추출)에만 쓰고 응답 후 즉시 폐기 — 디스크 저장 없음, `recognition_logs` 에 image 컬럼 없음. 배경에 손님이 찍혀도 어디에도 남지 않음 → 프라이버시 리스크 원천 소거.
- `/var/www/uploads/recognition/` 같은 저장 경로 **만들지 않는다**. multer memoryStorage 만 사용, 요청 종료 시 버퍼 GC.
- **평가 벡터 보존(`query_embedding`)은 선택·기본 OFF** (`aiServing.retainEvalVectors=false`). 켜도 비가역 벡터만(원본 재구성 불가), 원본 사진은 어떤 경우에도 저장 안 함.
- 직원 식별(staff_user_id)은 운영 리포트용 — 개인 평가 지표로 쓰지 않음을 문서 명기.
- 학습 데이터 = 매장이 설정에서 의도적으로 올린 레퍼런스 사진(§3.1)뿐 — 동의 없는 손님 사진 학습 없음.

---

## 11. 테스트 전략

1. **단위 (jest — `tests/order-totals.test.js` 패턴)**: `tests/ai-ranking.test.js` — 코사인/max-pooling, 융합 점수, 4구간 정책 경계값(0.80/0.90/0.95), **동일메뉴 pick 강등**, margin 보정, 후보 0건/1건 엣지.
2. **통합 (health-check 신규 `--category=ai`, 데모 매장 id=38 시드)**: ready 품목 시드 → recognize(고정 벡터 목킹) → 후보 제약 검증(preparing/served 미포함, 세트 set_items 규칙) → outcome 기록 → 서빙 PATCH 후 후보에서 사라짐 → 익명 401/타매장 403(IDOR). 멱등(테스트 주문 정리). **실 open shift 삭제 금지** 교훈 준수 — 데모 데이터만.
3. **UI mount (필수 — build 통과 ≠ runtime 안전)**: `scripts/headless-page-sweep.js` 에 AIServeCamera·MenuPhotoGallery 추가 — 진입 크래시 0 + console.error 0. getUserMedia 는 Playwright fake device 플래그로 목킹. 큰 변경이므로 `/검증 --e2e` 대상, flaky 3회 연속 100%.
4. **정확도 평가 하네스** `scripts/eval-recognition.js`: recognition_logs 의 (query_embedding, was_top1_correct) 재생 → top1 정확률/구간별 분포 리포트. **임계값·가중치 변경은 이 수치로만 정당화** (라이브 시행착오 금지 — 인쇄에서 배운 "측정 먼저").
5. **가드**: `check-print-guard.js` 변경 0건(필수 통과 조건) + `check-design-guard.js` + `npm run i18n:verify` + 기존 health-check 88/88 무회귀.
6. **Fable 검증 게이트 해당** (신규 시스템·아키텍처 기준 4) — 구현 완료 시 Fable 세션 점검 후 배포.

---

## 12. 결정 현황

### 확정됨 (2026-07-03, Irene — §0)
1. ✓ **손님 사진 보존** → **무보존 확정** (텍스트 로그만, 평가 벡터만 선택·기본 OFF).
2. ✓ **학습 소스** → **레퍼런스 사진만**(자동 시드 + 설정 업로드), 손님 사진 미사용.
3. ✓ **과금** → **Enterprise(plan_templates id=3) 티어 포함**, basic/professional 제외. 건당 과금 없음 + 공정사용 상한 백스톱.

### 남은 확인 1건 (배포 전)
- **Enterprise 실제 월가**: dev DB `plan_templates` id=3 = **RM99** 인데 전달받은 값은 **RM179**. 게이팅(id=3 전용)은 가격과 무관하게 확정이나, 운영/랜딩 표기와 흡수 원가 계산을 위해 실제 가를 확인. (RM99 든 RM179 든 원가 $1–7/월 은 충분히 흡수.)

### 파일럿 (제안 — Irene 확인만)
- 파일럿 매장: 데모(dev id=38) → 실매장 1곳(thefire?). 성공 기준 제안: 2주, top1 정확률 ≥85% + reshoot 비율 ≤15% → 전 Enterprise 매장 오픈.

— 기술 디테일(가중치·임계 초기값·프로바이더 기본 vertex·테이블 스키마)은 위 설계대로 진행하고 결과로 보고한다.
