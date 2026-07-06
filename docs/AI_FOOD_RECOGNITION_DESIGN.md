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

---

## Track A 구현 설계 (기능설계, 2026-07-06)

> 작성: Fable 설계 세션. 범위 = **Track A 만** (AI/카메라/임베딩 전혀 없음 — §1.1 Track A 정의). 구현은 Opus 세션이 이어받는다.
> 모든 판단은 실코드 실측 기반 — 근거 파일:라인을 각 항목에 병기.

### A-1. 1단계 — 기능 정의

- **기능명**: 서빙 메뉴 사진 표시 (Track A — Serving Menu Photos)
- **목적**: 서빙/홀 직원이 접시를 들고 "이게 무슨 메뉴지? 옵션이 뭐지? 어느 테이블이지?"를 화면 한 번으로 해결. 기존 상품 이미지(`Product.image`/`image_thumbnail`)를 서빙 동선(Floor Plan)에 노출하는 **순수 표시 기능**.
- **핵심 사용자**: ① 서빙/홀 직원(Expo/Runner — ItemListView 주 사용자, 태블릿) ② 신입 직원(메뉴 학습) ③ RA(부수효과 — 사진 없는 메뉴가 보이므로 사진 등록 유도).
- **유스케이스**:
  1. 러너가 아이템 리스트(Items 뷰)에서 ready 품목 행의 **썸네일**을 보고 접시와 대조 → 헷갈리면 썸네일 탭 → **큰 사진 + 옵션 + 테이블 + [서빙]** 시트에서 확인 후 그 자리에서 서빙 처리.
  2. 홀 직원이 테이블 상세 패널(TableDetailPanel)에서 품목 줄의 **소형 썸네일**로 주문 구성을 시각 확인 (동작 변경 0 — 표시만).
  3. 신입 직원이 FloorPlan 어느 뷰에서든 **[Menu Photos] 칩** 한 번 탭 → 전체 메뉴 사진 갤러리(검색+카테고리 필터) → 카드 탭 = 확대 + 가격/옵션그룹/설명.
  4. RA가 갤러리에서 "No photo" 플레이스홀더가 많은 것을 보고 메뉴 관리에서 사진을 채움 → **Track B 레퍼런스 시드 데이터(§3.1a)가 저절로 쌓임**.
  5. 세트 주문 서빙: 세트 구성품 행에도 구성품 단품의 사진이 뜸(이름 매칭) → "이 반찬이 세트 몫인가"를 사진으로 판별.
- **기존 시스템과의 관계**: 검증 완료된 서빙 뷰(`docs/SERVING_VIEW_DESIGN.md`, ItemListView 2026-06-03) **위에 표시 레이어만 얹는다**. 단계 전이·주문 데이터·인쇄·KDS 로직 무변경.
- **성공 기준**: ① Items 뷰/테이블 패널에 사진 있는 메뉴 100% 썸네일 표시(없으면 이니셜 플레이스홀더) ② 갤러리 1탭 진입(모든 FloorPlan 뷰) ③ 기존 서빙 토글·패널 열기 동작 회귀 0 ④ check-print-guard 변경 0.
- **비범위 (Track B — 본 설계에서 만들지 않음)**: 카메라/촬영/getUserMedia, 임베딩·인식 API, `menu_reference_photos`·`recognition_logs` 테이블, 레퍼런스 사진 다중 업로드 설정 화면, `ai_serving` 모듈 게이팅 마이그레이션. **Track A가 놓는 토대 = 데이터가 아니라 행동**: 사진 등록률 상승(→ Track B 자동 시드 §3.1a 원료) + 품목↔상품 이미지 lookup 유틸(Track B 후보 카드가 재사용).
- **게이팅 판단 (범위 결정 — 근거 명기)**: Track A 전체(썸네일·시트·갤러리)는 **모듈 게이트 없음(전 플랜 노출)** 으로 구현한다. 근거: ① 외부 비용 0(자기 매장 이미지 표시뿐 — 모바일 메뉴는 이미 전 플랜에서 같은 이미지를 손님에게 노출, `routes/mobile-public.js:399`) ② §6.1.5 의 전략(사진 등록 유도 → Track B 데이터)은 전 매장에 열려야 작동 ③ 게이트를 걸려면 `ai_serving` 플랜 마이그(§3.4)를 Track A 로 끌어와야 해 범위 오염. §3.3 이 MenuPhotoGallery 를 hasModule 게이트 목록에 넣었으나 그 문맥은 Track B 번들 — **Track B 배포 시점에 Irene 가 원하면 `hasModule('ai_serving')` 1줄 래핑으로 되돌릴 수 있음** (역행 비용 최소라 지금은 열어둠). Irene 이견 시 재조정.

### A-2. 2단계 — API

**신규 API 0개. 기존 `GET /api/menu?restaurant_id=` 전면 재사용.** (정직 실측 결론 — 새 엔드포인트를 만들 근거가 없음.)

근거:
- FloorPlanPage 는 **이미 마운트 시 `/api/menu?restaurant_id=` 를 호출**한다 (`FloorPlanPage.tsx:492`) — 현재는 name→category 만 남기고 응답을 버림 (`:497-500`).
- 그 응답 items 에 Track A 가 필요한 전부가 이미 있음: `id / name / price / categoryId / image / imageThumbnail / optionGroups / is_set_menu / is_active / soldOut / set_only / description` (`routes/menu.js:216-259`). 썸네일 폴백(`image_thumbnail || image.replace('/products/','/products/thumbnails/')`)도 서버가 이미 처리 (`menu.js:196,212`). 레거시 base64/구 JSON 포맷도 서버 파싱 완료 (`menu.js:184-214`).
- 인증: `/api/menu` 의 기존 인증·매장 스코프 그대로 (변경 0). 신규 권한 없음 — FloorPlan 접근 가능한 직원 전원 사용.
- 서빙 전이: 기존 `PATCH /api/orders/:id/items` (사진 시트의 [서빙] = ItemListView `onServe` prop 그대로 → `FloorPlanPage.tsx:1120 handleServeItem` → 동일 PATCH). **새 전이 경로 없음** (§1.4·§4.3 준수).
- 갤러리 데이터 신선도: 갤러리 열 때 동일 엔드포인트 1회 refetch (품절 상태 최신화). 새 API 아님 — 기존 로더 재호출.

### A-3. 3단계 — DB

**신규 테이블 0 · 신규 컬럼 0 · 마이그레이션 0.**

근거: 표시 소스는 `Product.image`(TEXT medium, URL) + `Product.image_thumbnail` (`models/Product.js:41-50`) — 이미 존재·운영 중(썸네일 300×300 생성 = `utils/imageProcessor.js:21,141-149`, 무수정). 주문 품목↔상품 매핑 키는 order_items 라인의 `product_id` — dev DB 실측으로 최근 주문 라인에 존재 확인(주문 6543: `{"product_id":191,"name":"Kimchi Pancake",...}`; 세트 라인 6447: `set_components` 는 `{name, kitchen_station_id}` 만 → 이름 폴백 필요).

**Track B 토대(`menu_reference_photos`) 를 Track A 에서 미리 만들지 않는다** (범위 판단): §3.1(a) 자동 시드는 Track B 활성화 시점에 `Product.image` 를 읽어 시드하므로 Track A 가 스키마를 선점할 이유가 없음. Track A 의 토대 기여 = 사진 등록률 상승(행동)이지 스키마가 아님. 과설계 금지 원칙 적용.

### A-4. 4단계 — UI

#### A-4.1 파일 계획 (신규 4 · 수정 3 — 전부 프론트, 백엔드 0)

| 파일 | 신규/수정 | 내용 |
|---|---|---|
| `dev-frontend/src/pages/FloorPlan/productImageMap.ts` | 신규 (소) | `/api/menu` items → lookup 빌더 + 조회 함수 (아래 A-4.2) |
| `dev-frontend/src/pages/FloorPlan/MenuThumb.tsx` | 신규 (소) | 공유 썸네일 컴포넌트 (img + onError/무사진 → 이니셜 플레이스홀더) |
| `dev-frontend/src/pages/FloorPlan/ItemPhotoSheet.tsx` | 신규 (중) | 품목 사진 상세 시트 — 표준 `components/UI/Modal` |
| `dev-frontend/src/pages/FloorPlan/MenuPhotoGallery.tsx` | 신규 (중) | 메뉴 사진 갤러리 — 표준 `components/UI/Modal` size large |
| `dev-frontend/src/pages/FloorPlan/FloorPlanPage.tsx` | 수정 | itemMeta fetch 확장(제품 유지) + lookup 전달 + 갤러리 칩/상태 |
| `dev-frontend/src/pages/FloorPlan/ItemListView.tsx` | 수정 | 행 44px 썸네일 + 썸네일 탭 → ItemPhotoSheet |
| `dev-frontend/src/pages/FloorPlan/TableDetailPanel.tsx` | 수정 | 품목/구성품 줄 24px 썸네일 (표시만) |

🔒 **무접촉 확인**: 위 7개 중 인쇄 보호파일 8개(check-print-guard.js `PROTECTED_FILES`, `scripts/check-print-guard.js:35-45`) 해당 **0개**. 단 FloorPlanPage(:996-1023)·TableDetailPanel(:977-982,:1096-1100,:1316) 에는 billPrint/hybridKitchenPrint 호출 블록이 있음 — **그 블록들은 한 줄도 건드리지 않는다** (수정 지점은 전부 다른 위치: itemMeta·ZoneFilterBar·ItemRow 렌더). POSTerminalPage·MainLayout·KitchenDisplayPage·orders-crud 는 아예 안 연다. 구현 후 `node scripts/check-print-guard.js` 변경 0건 필수.

#### A-4.2 `productImageMap.ts` — 데이터 계약

```ts
export interface ProductPhotoInfo {
  id: number; name: string; thumb: string | null; image: string | null;
  category: string;           // categoryId(이름 매칭 결과) — 갤러리 필터용
  price: number; description?: string | null;
  optionGroups: any[]; soldOut: boolean; isSetMenu: boolean; setOnly: boolean;
}
export function buildProductPhotoMaps(items: any[]): {
  byId: Map<number, ProductPhotoInfo>;
  byName: Map<string, ProductPhotoInfo>;   // name.trim().toLowerCase() 키
  list: ProductPhotoInfo[];                // 갤러리용 (is_active !== false 만)
};
export function lookupProductPhoto(maps, productId?: number | null, name?: string): ProductPhotoInfo | null;
// 우선순위: byId(product_id) → byName(정규화 이름). 둘 다 miss → null (플레이스홀더).
```

- 매핑 소스: FlatRow/품목 라인의 `product_id`(실측: 최근 주문 라인에 존재) → 폴백 `menuItem?.id` → 폴백 이름. **세트 구성품은 이름 매칭만** (set_components 라인에 product_id 없음 — DB 실측). 이름 중복 시 byName 은 첫 항목 유지(단순·결정적).
- 이미지 URL 은 `/uploads/...` 상대경로(=same-origin) 또는 레거시 base64 data-URI — 둘 다 `<img src>` 직결, 외부 도메인 없음 ([[reference_upload_same_origin]] 충족).

#### A-4.3 `MenuThumb.tsx` — 공유 썸네일

```
props: { src?: string | null; name: string; size: number; radius?: number }
동작: src 있으면 <img loading="lazy"> (object-fit: cover).
      src 없음/로드 실패(onError) → 플레이스홀더: var(--pos-surface-2) 배경 +
      1px var(--pos-border) 테두리 + name 첫 글자(대문자, 700, var(--pos-text-muted)).
```
- **이모지·아이콘 글리프 사용 금지** — 이니셜 텍스트만 (디자인 가드 통과). posDisplayTheme CSS 변수만 사용(라이트/고대비/다크 자동, 인라인 hex 신규 0).

#### A-4.4 ItemListView — 행 썸네일 + 사진 시트 (와이어프레임)

```
┌──────────────────────────────────────────────────────────────┐
│ ┌────────┐ ┌────┐  TABLE A12  [SET 1/3] [KQ1]     3m ago · 12:01 │
│ │ READY  │ │ 44 │  2 × Kimchi Pancake  [SET tag] [opt][opt]      │
│ │ Serve  │ │ px │                                                │
│ └────────┘ └────┘                                                │
└──────────────────────────────────────────────────────────────┘
  ↑PillCell(기존)  ↑MenuThumb — PillCell 과 Body 사이 삽입 (§6.1.1)
```
- 삽입 지점: `ItemListView.tsx:309-318` Card 내부, `<PillCell>` 다음. 새 styled `ThumbCell`(align-self:center, padding-left:8px). `@media(max-width:480px)` 36px 축소.
- `FlatRow` 확장: `productId: number | null` (push 시 `item.product_id ?? item.menuItem?.id ?? null`; 구성품은 `c.product_id ?? null` — 사실상 null → 이름 폴백) (`ItemListView.tsx:167-186`).
- **썸네일 탭** = `e.stopPropagation()` + ItemPhotoSheet 열기. **카드 몸통 탭 = 기존 openPanel 그대로, 좌측 pill 탭 = 기존 서빙 토글 그대로** (기존 UX 무변경 — 새 타깃 1개 추가만).
- 새 props: `productLookup: (pid?: number|null, name?: string) => ProductPhotoInfo | null` (FloorPlanPage 에서 주입).

**ItemPhotoSheet** (표준 Modal, maxWidth 520px — Modal.tsx:306 prop 사용, body portal 이라 스태킹 안전):
```
┌─ Kimchi Pancake ─────────────────────── × ┐
│  [   큰 사진 (max-height 40vh, cover)   ] │   ← 사진 없으면 대형 플레이스홀더
│  TABLE A12          [READY pill(기존)]    │
│  SET: Lunch Set B   (세트 구성품일 때만)   │
│  Options: Extra egg · Less spicy          │
│  2 × · ordered 12:01 (3m ago)             │
├───────────────────────────────────────────┤
│              [ Close ]   [ Serve ]        │   ← Serve = onServe(orderId,itemIndex,compIndex,true) 후 닫기
└───────────────────────────────────────────┘
```
- 단계 pill = 기존 `ItemStatusPill`/`toDisplayStatus` 재사용 (`orderItemStatus.tsx:49-62`, 색·의미 단일소스 유지). served 상태면 [Serve] 대신 [Unserve](기존 토글 의미 그대로) — 동작 = 기존 pill 과 동일 경로. 버튼은 Modal 의 `ModalButton` variant primary/secondary 재사용.
- props: `{ open, onClose, row: FlatRow, photo: ProductPhotoInfo|null, onServe, timezone }`. 시트가 열린 채 소켓 갱신으로 rows 가 바뀌면 최신 row 재조회(키 매칭) — 사라졌으면 자동 닫기(타 직원 서빙 케이스, §10 표와 동일 철학).

#### A-4.5 TableDetailPanel — 24px 썸네일 (표시만)

- 일반 품목 줄: `ItemRow > ItemInfo` 앞에 `MenuThumb size=24` (`TableDetailPanel.tsx:1942-1978` 렌더 지점). 세트 구성품 줄(`:1913-1937`)에도 동일(이름 매칭).
- 새 optional prop `productLookup?` — 없으면(다른 호출처가 있다면) 썸네일 미표시로 무해 폴백. **탭 동작 추가 없음** (패널 자체가 이미 상세 — 과설계 금지). 그 외 로직·인쇄 블록 무접촉.

#### A-4.6 MenuPhotoGallery — 갤러리 (와이어프레임)

진입: FloorPlanPage `ZoneFilterBar` 에 상시 칩 (`FloorPlanPage.tsx:2063-2071` "+ Walk-in" 칩 뒤, 모든 뷰에서 항상 같은 자리 — [[feedback_pos_ui_persistent_controls]], "+ " 접두사 금지 — [[feedback_no_plus_prefix]]). 라벨 = `t('floorplan:menuPhotos.open')` "Menu Photos". 기존 `ZoneChip` styled 재사용.

```
┌─ Menu Photos ────────────────────────────────────── × ┐
│ [Search menu…            ] [All categories ▾(SearchableSelect)] │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│ │photo │ │photo │ │ K    │ │photo │  ← 사진無=이니셜     │
│ │      │ │      │ │(회색)│ │SOLD  │  ← 품절=텍스트 배지  │
│ ├──────┤ ├──────┤ ├──────┤ ├──────┤                    │
│ │Name  │ │Name  │ │Name  │ │Name  │                    │
│ │RM12.9│ │RM15  │ │No photo│ │RM8 │                    │
│ └──────┘ └──────┘ └──────┘ └──────┘                    │
│  (grid: repeat(auto-fill, minmax(140px,1fr)); gap 12px) │
└─────────────────────────────────────────────────────────┘
   카드 탭 → 같은 모달 안 상세 뷰 (← Back):
   큰 사진 / 이름 / 가격 / 카테고리 / 설명 / 옵션그룹(그룹명 + 옵션들 텍스트 목록) / SET 구성(있으면)
```
- 표준 `components/UI/Modal` `size="large"`(필요 시 maxWidth "960px") — pos 테마 변수 내장이라 POS 화면과 조화 (`Modal.tsx:26-46` 실측). FloorPlanPage 는 이미 `Modal as CommonModal` 사용 중 (`FloorPlanPage.tsx:12`) — 동일 패턴.
- 데이터: `maps.list` (is_active 만, **set_only 포함** — 러너가 나르는 실물이 곧 구성품이므로 표시 대상. 판단 근거: `set_only` 는 "주문 화면 숨김" 플래그지 "존재 숨김"이 아님, `Product.js:147-150` 주석). 카테고리 필터 = 기존 `SearchableSelect` 재사용(ItemListView:256-288 과 동일 패턴). 검색 = 이름 부분일치.
- 열 때 menu 로더 1회 refetch(품절 최신화) + 로딩 중 텍스트("Loading…" — 스피너 신규 제작 금지, 기존 패턴). 빈 상태 = 순수 텍스트 `menuPhotos.empty` (이모지 금지). 이미지 전부 `loading="lazy"`.
- 품절 배지 = 텍스트 "SOLD OUT" (기존 StationBadge 류 스타일 재사용, 색 신규 정의 최소).

#### A-4.7 FloorPlanPage 배선

1. **itemMeta fetch 확장** (`:483-507`): 응답 products 를 버리지 않고 `buildProductPhotoMaps(products)` 결과를 state 로 유지 (요청 수 증가 0 — 이미 받던 페이로드 활용). 로더를 `useCallback` 으로 승격해 갤러리 open 시 재호출.
2. `productLookup` 를 `useMemo` 로 만들어 ItemListView(:2095)·TableDetailPanel(:2300, :2386 두 곳) 에 prop 전달.
3. 갤러리 칩 + `const [galleryOpen, setGalleryOpen] = useState(false)` + `<MenuPhotoGallery>` 렌더. AI/모듈 게이트 없음(A-1 판단).

#### A-4.8 i18n (floorplan ns, flat key — 기존 `itemList.*` 관례와 동일)

en→ko→zh→ms 4언어 파일 (`public/locales/{en,ko,zh,ms}/floorplan.json`) 전부 + `npm run i18n:verify` 통과. 신규 키(안):
`menuPhotos.open` "Menu Photos" / `menuPhotos.title` "Menu Photos" / `menuPhotos.search` "Search menu" / `menuPhotos.allCategories` "All categories" / `menuPhotos.empty` "No menu items" / `menuPhotos.noPhoto` "No photo" / `menuPhotos.soldOut` "SOLD OUT" / `menuPhotos.back` "Back" / `menuPhotos.loading` "Loading…" / `itemSheet.options` "Options" / `itemSheet.close` "Close". 서빙 라벨은 기존 `common:itemServe.serveHint`·`floorplan:tableDetailPanel.itemStatus.*` 재사용(신규 금지). 모듈 스코프 `t()` 호출 금지.

#### A-4.9 엣지 케이스 (전수)

| 케이스 | 동작 |
|---|---|
| 사진 없는 메뉴 | 이니셜 플레이스홀더 (리스트/패널/시트/갤러리 공통, MenuThumb 단일 구현) |
| `image_thumbnail` 없고 `image` 만 | 서버가 thumb 폴백 제공(menu.js:196,212) + 클라도 `thumb ?? image` 이중 폴백 |
| 레거시 base64 / 구 JSON 이미지 | 서버 파싱 완료(menu.js:199-213) — 클라 무처리, data-URI 도 same-origin |
| 이미지 404 (파일 유실) | `<img onError>` → 플레이스홀더 전환 (빈 아이콘 X) |
| 세트 구성품 | 이름 매칭만(라인에 product_id 없음 — DB 실측). miss → 플레이스홀더 |
| 상품 개명/삭제 후의 옛 주문 | lookup miss → 플레이스홀더 (에러 없음) |
| product_id 없는 레거시 주문 라인 | 이름 폴백 (🔒 stationEnrichment 는 재사용하지 않음 — 독립 구현, §5-④ 원칙) |
| 메뉴 0건/menu API 실패 | 썸네일 전부 플레이스홀더 + 갤러리 빈 상태 텍스트 — 서빙 기능 자체는 기존 그대로 동작(표시 레이어라 실패 무해) |
| 시트 열린 채 타 직원이 서빙 | rows 갱신 시 키 재매칭 — 사라지면 자동 닫기 |
| 오프라인 | 이미지 로드 실패 → 플레이스홀더 (기능 차단 없음) |

#### A-4.10 검증 계획 (구현 세션 의무)

1. `npm run build:dev` (경고 0) + SW_VERSION bump(§6 전제 — PWA 캐시).
2. **실브라우저 mount** (운영 critical — FloorPlan): headless sweep 에 Items 뷰 + 갤러리 open + 시트 open 시나리오 — 크래시 0, console.error 0.
3. 유저 흐름 실검증(데모 매장 id=38): 주문 생성 → Items 뷰 썸네일 표시 → 썸네일 탭 시트 → [Serve] → `PATCH /orders/:id/items` 실호출로 served 확인 → 리스트 반영. 사진 없는 메뉴/세트 구성품/레거시 라인 각 1건.
4. `node scripts/check-print-guard.js` **변경 0건** + `node scripts/check-design-guard.js` + `npm run i18n:verify` + `node scripts/health-check.js` 88/88 무회귀. (신규 API/DB 0 이므로 백엔드 테스트 신규 불필요.)
5. Fable 게이트: 본 건은 신규 시스템 아님·보호파일 무접촉·표시 전용이라 **일상 `/검증` 절차로 충분** — 단 TableDetailPanel/FloorPlanPage diff 에 인쇄 블록이 섞이지 않았는지 diff 육안 대조는 필수.

---

## Track B 구현 설계 (기능설계, 2026-07-06)

> 작성: Fable 설계 세션. 범위 = **Track B (카메라 비전 AI 서빙)** — §0 Locked 결정 3건·§1.2 제약매칭 원리·§2~§11 아키텍처를 그대로 계승하되, **이 서버의 실환경 실측**으로 구현 가능한 형태(B1/B2 분할)로 확정한다. 구현은 Opus 세션이 이어받는다.
> Track A 는 **구현 완료·재사용 토대** (productImageMap.ts / MenuThumb.tsx / ItemPhotoSheet.tsx / MenuPhotoGallery.tsx / ItemListView 썸네일 — 전부 실코드 확인).

### B-0. 실환경 실측 → B1/B2 분할 (설계 전체를 지배하는 결정)

**실측 결과 (2026-07-06, dev 서버):**

| 항목 | 실측 | 결론 |
|---|---|---|
| 외부 AI 자격증명 | `dev-backend/.env` 키 14개 전수 확인 — **AI 관련 키 0개** (DB/JWT/VAPID/SITE_URL/ALLOWED_ORIGINS 뿐. OPENAI/VERTEX/GOOGLE/AZURE/ANTHROPIC 계열 전무) | **Vertex/OpenAI/Azure 는 지금 호출 불가** — 키 확보는 Irene 결정 사항 |
| AI SDK 의존성 | node_modules 에 openai/@google/@azure/@anthropic/onnxruntime **없음**. `sharp@0.34.5` + `multer@2.0.2` 는 **있음** | 로컬 이미지 처리·업로드 토대는 즉시 사용 가능 |
| 외부 네트워크 | `us-central1-aiplatform.googleapis.com` 404(0.78s)·`api.openai.com` 401(0.20s) — **아웃바운드 HTTPS 정상** | 키만 생기면 즉시 배선 가능 (방화벽 이슈 없음) |
| 서버 자원 | dev 8GB RAM / 4 core. 운영은 자원부족 이력([[reference_prod_server_resource_constraint]]) | onnx CLIP 상주(수백 MB)는 운영에 위험 — LocalClip 은 Prod(§8 Phase3) 유보 유지 |

**따라서 2단계 분할 (구현 가능성 최우선):**

- **B1 (지금 착수 — 외부 키 0개로 완결)**: 파이프라인 전체(카메라→후보쿼리→유사도→랭킹→로그→서빙)를 **`LocalColorProvider`**(sharp 기반 색·공간 특징 벡터, 외부 호출 0·비용 0)로 완성. 프로바이더 인터페이스(§2.2)·DB·API·UI·게이팅·로그가 전부 실물로 돌아간다. **정직한 정확도 기대치**: 색·플레이팅이 뚜렷이 다른 메뉴 간 구분에 유효(제약매칭 §1.2 덕에 후보 3~8개 중 선별), 비슷하게 생긴 음식 구분은 약함 → **로컬 프로바이더는 `auto` 모드 금지(최대 `recommend`)**로 캡. B1 의 목적 = UX·파이프라인·수집(recognition_logs) 완결 + 파일럿 현장 데이터 확보.
- **B2 (Irene 키 확보 후 — 배선만)**: `VertexEmbeddingProvider`(multimodalembedding@001, 1408-dim) 실배선 + 전 레퍼런스 재임베딩(`embedding_model` 태그 교체 — §2.2 의 교체 경로 그대로) + `auto` 모드 해금 + 확신도 재캘리브레이션. 코드 변화 = 프로바이더 어댑터 1파일 + env 2~3개 + `npm i google-auth-library` — **B1 인터페이스 무변경**.

이 분할로 §2.2 의 "프로바이더 추상화" 가 종이 약속이 아니라 **B1→B2 전환으로 즉시 증명**된다.

### B-1. 1단계 — 기능 정의

- **기능명**: AI 카메라 서빙 (Track B — AI Serve Camera)
- **목적**: 서빙 직원이 태블릿/폰 카메라로 접시를 비추고 한 번 탭 → ~1초 안에 메뉴명·매칭 주문·테이블·옵션 → [서빙]. 주방의 구두 인계("이거 A12 계란추가")를 제거. AI 는 **후보를 좁혀줄 뿐, 확정은 항상 사람 탭** (§1.2-3).
- **핵심 사용자**: ① 서빙/홀 직원(Expo/Runner — Items 뷰 사용자와 동일) ② 신입 직원(메뉴를 몰라도 카메라가 알려줌) ③ RA(레퍼런스 사진 관리 + 정확도 개선).
- **유스케이스**:
  1. 러너가 패스에서 접시를 받아 [Serve Cam] 탭 → 촬영 → "불고기덮밥 · A12 · 계란추가 · 조리완료 3분 · 확신 91%" 카드 → [서빙] 탭 → 완료 토스트 → 뷰파인더 복귀(연속 서빙).
  2. 동일 메뉴 3접시(A12/B03/C07 전부 불고기덮밥): 촬영 → 확신도와 무관하게 **후보 3개 전부** ready 오래된 순으로 표시 + 옵션 차이 굵게 → 직원이 탭으로 선택 (§5-⑧ pick 강등 — 조용히 하나 찍지 않음).
  3. 확신 낮음/조명 나쁨: "다시 찍어주세요" + [직접 고르기] → ready 품목 리스트(= 기존 Items 뷰 수동 흐름과 동일 데이터)에서 탭.
  4. 프로바이더 장애/오프라인 서버측 실패: `fallback` 모드 — ready 시간순 수동 리스트로 우아한 강등, 카메라 화면은 절대 죽지 않음 (§10).
  5. RA 가 정확도 리포트 대신(B1) recognition_logs 기반 감으로 혼동 잦은 메뉴에 **레퍼런스 사진 추가**(갤러리 상세에서 각도·실플레이팅 업로드, §3.1b) → 즉시 재임베딩 → 다음 인식부터 반영.
- **기존 시스템과의 관계**: Track A(사진 lookup·썸네일·갤러리) + 서빙 뷰(ItemListView·onServe) **위에 얹는 인식 레이어**. 서빙 전이 = 기존 `PATCH /api/orders/:id/items` (orders-crud.js:1788 실측 — IDOR 가드:1798·STALE_WRITE:1816·forward-only 가드:1849·단계 roll-up:1885 전부 내장) **무수정 재사용**. 후보 정의 = `toDisplayStatus`(orderItemStatus.tsx:49) 의 `ready` 와 동일 어휘.
- **성공 기준 (B1)**: ① 촬영→후보 응답 p95 < 1.5s(로컬 프로바이더는 외부 호출 0 이라 실제 ~0.3–0.5s) ② 서빙 확정 100% 기존 PATCH 경로(신규 전이 0) ③ 사진 무보존 — 디스크·DB 어디에도 촬영 원본 0 바이트 ④ check-print-guard 변경 0 ⑤ 전 실패 모드(권한거부/미지원/오프라인/후보0/프로바이더 실패)에서 화면 생존 ⑥ recognition_logs 에 시도 전량 기록(정확도 루프 원료).
- **비범위 (B1 에서 안 만듦)**: 실 외부 임베딩(Vertex/Azure — B2), OpenAI judge 폴백(B2+), `auto` 자동선택 모드(B2 해금), 정확도 리포트 API §4.7(Beta), 옵션 시각단서 optPrior(Beta), 야간 임베딩 cron(B2 — B1 은 수동/자동 리컨실만), LocalClip onnx(Prod), 플레이팅 검사·CCTV 류(§8 미래). **POSTerminalPage/MainLayout/KDS 무접촉**.
- **§0 Locked 반영**: 사진 무보존(멀터 memoryStorage 만, 저장 경로 자체 없음) / 학습소스 = 레퍼런스 사진만(자동 시드 + RA 업로드, 손님 사진 승격 경로 없음) / Enterprise 전용(`ai_serving` 모듈, plan_templates id=3).

### B-2. 2단계 — API

신규 라우터 `dev-backend/routes/ai-serving.js`, `server.js` **경로 전용 마운트** `app.use('/api/ai-serving', require('./routes/ai-serving'))` (server.js:414-486 관례와 동일 — 블랭킷 router.use 인증 후 fall-through 함정 회피 [[reference_path_level_middleware]]). 응답 표준 `{success,data}/{success:false,message}`.

**게이팅 3단 (실측 정정 포함)**: 공통 미들웨어 체인 = `authenticateToken` + `checkRestaurantAccess`(middleware/auth.js:148 — `:restaurantId` 불신뢰) + **`requireRestaurantModule('ai_serving', 'restaurantId')`** (middleware/requireModule.js:226 — 자기 플랜 ∪ 엔티티플랜 union:185, **데모 매장 bypass:247** → 파일럿(데모 id=38)은 플랜 마이그 전에도 동작, health-check 도 데모로 검증 가능).
> ⚠️ 실측 정정: §3.3 의 "백엔드 MODULE_GATED_ROUTES" 는 존재하지 않는다 — `MODULE_GATED_ROUTES` 는 **프론트** ProtectedRoute.tsx:13 의 정적 URL prefix 목록이다. Track B 는 신규 App 라우트를 만들지 않으므로(카메라 = FloorPlan 오버레이, B-4.1) **이 목록 추가도 불필요**. 백엔드 강제 = requireRestaurantModule 이 전부이자 충분(inventory-routes.js:18 등 기존 관례와 동일).

| # | METHOD path | 권한 | 용도 |
|---|---|---|---|
| 1 | `POST /api/ai-serving/:restaurantId/recognize` | 공통 3단 + 전용 rate limit **30/분/유저** | 촬영 → 후보 랭킹 (아래 상세) |
| 2 | `GET /api/ai-serving/:restaurantId/ready-items` | 공통 3단 | ④후보쿼리 단독 노출 — [직접 고르기]·fallback 화면 |
| 3 | `POST /api/ai-serving/:restaurantId/logs/:logId/outcome` | 공통 3단 (+ log.restaurant_id 일치 검증) | 결정 기록 (§4.4 그대로) |
| 4 | `GET /api/ai-serving/:restaurantId/reference-photos?product_id=` | 공통 3단 | 레퍼런스 목록 (전 직원 열람) |
| 5 | `POST /api/ai-serving/:restaurantId/reference-photos` | 공통 3단 + `requireRole('Restaurant Admin','System Admin')` | multipart 업로드(product_id 지정) → 디스크 저장 + 즉시 임베딩 |
| 6 | `DELETE /api/ai-serving/:restaurantId/reference-photos/:id` | 5 와 동일 | soft delete (is_active=false, source='staff_upload' 만 — 자동시드 행은 리컨실 소관) |
| 7 | `POST /api/ai-serving/:restaurantId/refresh-embeddings` | 5 와 동일 | 시드+임베딩 리컨실 배치 (멱등, 아래) |

- **§4 대비 변경점**: outcome 경로에 `:restaurantId` 를 포함시켜 (§4.4 는 `/logs/:id/outcome`) 공통 3단 미들웨어를 같은 라우터 패턴으로 태운다(경로 파라미터 기반 checkRestaurantAccess 일관성). §4.7 리포트는 Beta 유보.
- **recognize 상세 (§4.1·§5 계승 + B1 확정)**:
  - 요청: multipart `photo` (multer **memoryStorage**, fileSize 3MB, jpeg/png 만 — import.js:17 관례). **디스크 기록 없음 — 결정 #1.**
  - 처리: sharp EXIF 회전+512px 재정규화(메모리) → 후보쿼리(§5-④ SQL 그대로: `status IN ('pending','preparing','ready') AND is_deleted=0` → Node 에서 `order_items[i].status==='ready'`, 세트는 `set_items[i].status==='ready'` — set_components[i]↔set_items[i] 동일 인덱스 규칙 [[reference_set_component_stage_field]]) → `provider.embedImage(buffer)` → 메뉴당 max-pooling 코사인(§5-⑥, 서버 메모리 캐시) → 융합 랭킹 w_img 0.85 + w_time 0.15(§5-⑦) → 정책(§5-⑧ + **로컬 프로바이더 캡: auto→recommend 강등**) → recognition_logs INSERT → 응답(스키마 §4.1 JSON 그대로 + `seeding` 힌트 필드 추가).
  - **candidates 의 `item_index`/`comp_index` 계약**: `item_index` = order_items 배열 인덱스, `comp_index` = 세트 구성품 인덱스(set_components/set_items 동일 인덱스이므로 프론트 FlatRow(ItemListView.tsx:96 `orderId/itemIndex/compIndex`)와 1:1 — [서빙] 이 기존 `handleServeItem(orderId,itemIndex,compIndex,true)`(FloorPlanPage.tsx:1105) 를 그대로 부를 수 있는 형태.
  - **콜드스타트 자동 시드**: 매장의 활성 임베딩 레퍼런스가 0이면 recognize 는 즉시 `mode:'fallback', seeding:true` 반환(수동 리스트로 동작) + **백그라운드로 시드 킥오프**(매장당 in-flight 뮤텍스 1개, Product.image 있는 활성 상품 → menu_image 행 생성+임베딩). 로컬 임베딩이라 수 초 내 완료 — 두 번째 촬영부터 매칭. 별도 "활성화 버튼" 불필요(평이한 디바이스 설정 원칙 [[feedback_solution_standard_plain_device_setup]]).
  - 프로바이더 실패/timeout 3s → `mode:'fallback'` (§10). 후보 0건 → `mode:'no_candidates'` (§4.1).
- **refresh-embeddings = 시드 리컨실 단일 경로 (멱등)**: ① `Product.image` 있는 활성 상품 중 menu_image 행 없는 것 생성 (UNIQUE(product_id,image_url) 로 멱등) ② source='menu_image' 인데 image_url ≠ 현재 Product.image 인 행 is_active=false (이미지 교체 자연 반영 — **products 라우트 훅 불필요**, §3.1 의 훅 방식보다 단순) ③ `embedding IS NULL OR embedding_model != 현재` 재임베딩. B1 트리거 = 콜드스타트 자동 + RA 수동. SchedulerRun 야간 cron 은 B2([[reference_scheduler_run]] 패턴 명시 유지).
- **reference-photos 업로드 저장**: multer memoryStorage → sharp 검증/리사이즈 → **`/var/www/uploads/reference-photos/`** + `/thumbnails/` 디스크 저장(imageProcessor.js:16-17 PRODUCTS_DIR 패턴 준용, base64 DB 인라인 금지 [[reference_image_storage_rule]], same-origin URL [[reference_upload_same_origin]]) → 행 INSERT + 즉시 임베딩. **레퍼런스는 매장이 의도 업로드한 자산이라 보존 — 무보존 대상은 손님/인식 스냅샷만** (결정 #1·#2 구분).
- **프로바이더 인터페이스**: §2.2 `AIVisionProvider` 계약 그대로 `dev-backend/services/ai/` (services/ 디렉토리 실존 — dailyStatsScheduler.js 등과 동급). 팩토리 `services/ai/index.js`, env `AI_VISION_PROVIDER` 기본 **`local-color`** (B2 에서 `vertex` 로 전환). 구현체 추가 필드: `get maxMode()` — local-color 는 `'recommend'`, vertex 는 `'auto'` (정책 단계에서 min 적용).
- **LocalColorProvider (`local-color-v1`) 스펙**: sharp 로 96×96 정규화 → 4×4 공간 그리드 × HSV 히스토그램(h8·s4·v4) + 그리드별 밝기/에지 통계 → **~288-dim float 벡터, L2 정규화** → 코사인. 결정적(같은 입력=같은 벡터)·외부 호출 0·<50ms. `embedding_model='local-color-v1'`, `embedding_dim=288`. 단위 테스트로 "동일 이미지 유사도 1.0 / 색 다른 이미지 < 임계" 계약 고정.
- **VertexEmbeddingProvider (B2)**: REST `POST https://{loc}-aiplatform.googleapis.com/v1/projects/{p}/locations/{loc}/publishers/google/models/multimodalembedding@001:predict` + `google-auth-library` SA 토큰. env: `VERTEX_PROJECT_ID`/`VERTEX_LOCATION`/`GOOGLE_APPLICATION_CREDENTIALS`. B1 에서 어댑터 파일까지 작성해 두되(키 없으면 팩토리가 local-color 로 폴백 + 경고 로그 1회) 실검증은 B2.
- **이미지 무보존 명문화**: recognize 경로에 `fs` 쓰기 코드 자체가 없어야 함(리뷰 체크포인트). `/var/www/uploads/recognition/` 류 디렉토리 생성 금지 (§10).

### B-3. 3단계 — DB

**신규 테이블 2 + plan_templates 시드 1 + operation_settings 키 1. 기존 테이블 ALTER 0 (orders/products 무접촉).**

1. **`menu_reference_photos`** — §3.1 스키마 **그대로 채택** (컬럼 가감 없음: restaurant_id/product_id/image_url/thumbnail_url/source ENUM('menu_image','staff_upload')/embedding JSON/embedding_model/embedding_dim/is_active/created_by + UNIQUE(product_id,image_url)). 인덱스: (restaurant_id), (product_id). local-color-v1 벡터 288-dim ≈ 2.5KB/행 — 매장 100메뉴×5장=500행≈1.2MB, JSON+브루트포스로 충분(§2.1 — 벡터DB 불필요 재확인). Sequelize `models/MenuReferencePhoto.js` + models/index.js association(Restaurant.hasMany/Product.hasMany) + export 3점 세트.
2. **`recognition_logs`** — §3.2 스키마 **그대로 채택** (이미지 컬럼 없음 — 결정 #1. query_embedding JSON 은 기본 NULL/OFF). 인덱스: (restaurant_id, created_at). `abandoned` 판정은 **쓰기 배치 없이 조회시 파생**(decision IS NULL AND created_at < NOW()-5min) — B1 은 정리 cron 을 만들지 않는다(가동부 최소화; §3.2 의 정리배치는 Beta 리포트와 함께). FK 는 restaurant_id 만 실제 constraint, order/product 참조는 soft(주문 삭제·상품 삭제에도 로그 생존 — 감사 데이터).
3. **plan_templates 시드**: dev DB 실측 = id=3, name=`enterprise`, display_name=`Enterprise Plan`, plan_target=`restaurant`, **base_price_monthly=99.00**, included_modules 26개(advanced_inventory 등 상위 모듈이 여기에만 존재 — §3.3 실측 재확인). → `included_modules` 에 `ai_serving` append(이미 있으면 skip). **id=1 basic/id=2 professional 무접촉.** ⚠️ RM99 vs RM179 표기 불일치(§0-3)는 여전히 Irene 확인 대기 — 게이팅 구현과 무관.
4. **`operation_settings.aiServing`** = `{ enabled: true, retainEvalVectors: false }` (§3.3). **필수: `settingsGuard.js:20 OPERATION_SETTINGS_ALLOWED_KEYS` 에 `'aiServing'` 추가** — 실측: crossSellEnabled 까지 등록된 화이트리스트에 미등록 키는 저장 round-trip 에서 조용히 wipe (requirePinForDiscount 잠복버그:29-31 주석의 그 함정). 저장→GET round-trip 검증 의무([[reference_model_getter_key_strip]]).
5. **마이그레이션**: `dev-backend/scripts/migrate-ai-serving.js` 단일 멱등 스크립트 — CREATE TABLE IF NOT EXISTS ×2 + plan id=3 append + **말미 `process.exit(0)` 필수**([[reference_deploy_migration_must_exit]]). sync-database.js 는 신규 테이블/seed 를 못 다루므로([[reference_deploy_schema_drift]]) 이 스크립트가 단일 경로, 배포 체크리스트 등재. **롤백 = DROP TABLE 2개 + included_modules 에서 키 제거** — 주문/메뉴/설정 데이터 무영향.
6. **cross-tenant 격리**: 모든 쿼리 restaurant_id 스코프(미들웨어가 :restaurantId 검증) + reference-photos/logs 의 :id 접근 시 소유 매장 재검증(IDOR — health-check 케이스로 고정, [[reference_idor_sweep]]).

### B-4. 4단계 — UI

#### B-4.1 구조 결정 — 신규 라우트가 아니라 **FloorPlan 풀스크린 오버레이** (§6.3 정정)

§6.3 은 `/pos/serve-camera` 별도 lazy 페이지를 그렸으나 실측과 충돌: ① FloorPlan 실제 라우트는 `/restaurant/:restaurantId/floor-plan`(App.tsx:558) — 프론트 MODULE_GATED_ROUTES(ProtectedRoute.tsx:13)는 **정적 prefix startsWith 매칭**(:352)이라 `:restaurantId` 동적 경로를 게이트할 수 없음 ② FloorPlanPage 는 이미 **POS Terminal 풀스크린 오버레이 패턴**을 보유(:269, :582, :2566 — [[reference_floor_plan_pos_overlay]]) ③ 오버레이면 주문 상태·소켓·handleServeItem 컨텍스트를 그대로 공유(별도 페이지는 전부 재구축 필요). → **`AIServeCameraOverlay.tsx` (FloorPlan 하위, lazy import — POSTerminal 오버레이와 동일 방식, cross-chunk styled import 금지 TDZ 주의)**. App.tsx·라우트·MODULE_GATED_ROUTES **변경 0**.

#### B-4.2 파일 계획 (프론트 신규 1 · 수정 2~3 / 백엔드 신규 6 · 수정 2)

| 파일 | 신규/수정 | 내용 |
|---|---|---|
| `pages/FloorPlan/AIServeCameraOverlay.tsx` | 신규 (대) | 뷰파인더+셔터+결과카드+직접고르기 (아래 B-4.3) |
| `pages/FloorPlan/FloorPlanPage.tsx` | 수정 (소) | hasModule 조회 + [Serve Cam] ZoneChip + 오버레이 state/렌더 + onServe 배선 |
| `pages/FloorPlan/MenuPhotoGallery.tsx` | 수정 (소) | 카드 상세에 RA 전용 "인식 사진 N장 + 추가/삭제" 스트립 (B-4.5) |
| `routes/ai-serving.js` | 신규 | B-2 엔드포인트 7개 |
| `services/ai/{index,AIVisionProvider,LocalColorProvider,VertexEmbeddingProvider}.js` | 신규 4 | 팩토리+계약+구현체 |
| `models/{MenuReferencePhoto,RecognitionLog}.js` (+index.js) | 신규 2+수정 | B-3 |
| `scripts/migrate-ai-serving.js` | 신규 | B-3.5 |
| `server.js` / `utils/settingsGuard.js` | 수정 (각 1~2줄) | 마운트 + aiServing 화이트리스트 |

🔒 **무접촉 재확인**: 보호파일 8개 해당 0. FloorPlanPage 는 보호파일 아니나 인쇄 호출 블록(:347 useAutoPrintPoller, :996-1023, :1448-1450)이 있음 — **수정 지점은 chip row(:2091 부근)·오버레이 state·prop 배선뿐, 인쇄 블록 diff 0**. orders-crud.js/MainLayout/POSTerminalPage/KDS 는 열지 않는다. 구현 후 `check-print-guard.js` 변경 0건 필수.

#### B-4.3 AIServeCameraOverlay — 화면 흐름 (§6.2 와이어프레임 계승 + B1 확정)

```
[진입] FloorPlan chip row 의 [Serve Cam] ZoneChip (Menu Photos 칩(:2091-2098) 옆, 모든 뷰 동일 위치)
   │   hasModule('ai_serving') 미포함 → 칩 자체 미렌더(상위모듈 관례 §3.3; 미포함 매장에선 애초에 없는 기능이라
   │   "자리 유지" 규칙 비적용 — 포함 매장에서는 항상 렌더, navigator.onLine=false 면 비활성+안내)
   ▼
[뷰파인더] getUserMedia({video:{facingMode:'environment'}}) 풀스크린 + 하단 셔터 1개 + [직접 고르기] 링크 + [닫기]
   │   권한거부/미지원 → <input type=file accept=image/* capture=environment> 폴백 (§10)
   │   열림과 동시에 fetchStatuses() 1회(후보 신선도) — 이후 기존 소켓이 최신화
   ▼ 셔터 탭: canvas 512px JPEG 0.8 압축(§5-②) → POST recognize
[분석 중] 촬영 스틸 + 스피너(로컬 ~0.3s) — 취소 가능
   ▼
[결과] mode 별 (§5-⑧ 표 그대로, B1 은 auto 없음):
  recommend → 대형 카드 1: MenuThumb(Track A 재사용, 후보의 product_id lookup — productLookup prop) +
              메뉴명 + loc 배지(ItemListView .loc 스타일) + 옵션 Tag + "조리완료 N분" + 확신도(% + 평이문구)
              + [서빙 완료](대형) [재촬영]
  pick      → 후보 카드 2~N 세로 나열(ready 오래된 순, 동일메뉴면 옵션 diff 굵게) — 탭=선택→[서빙] 확인
  reshoot   → 안내 1줄 + [재촬영] [직접 고르기]
  no_candidates → "지금 조리완료된 품목이 없어요" (빈 상태, 에러 아님)
  fallback(+seeding) → ready 시간순 리스트 = 직접 고르기와 동일 화면 (+"메뉴 사진 준비 중" 1줄)
   ▼ [서빙] 탭
onServe(order_id, item_index, comp_index, true)  ← FloorPlanPage.handleServeItem(:1105) 그대로 — 낙관적
   override·base_updated_at STALE_WRITE·roll-up 전부 기존 로직이 처리. 성공 후 outcome POST(비차단, §4.4)
   ▼
[완료 토스트 "A12 불고기덮밥 서빙"] → 뷰파인더 복귀 (연속 서빙)
```

- 소켓 무효화: 표시 중 후보가 order-updated 로 served/취소되면 카드에 "방금 서빙됨" 덮개 + 재조회 (§7 — FloorPlanPage 의 기존 상태 갱신을 props 로 받아 감지, 오버레이 자체 소켓 구독 신설 없음).
- 스타일: posDisplayTheme CSS 변수만(신규 hex 최소), 터치 44px+([[feedback_touchscreen_no_keyboard]]), 버튼 최대 2개/화면(제로 트레이닝 §6.2), 이모지 금지. 확신도 이중 표기("91% · 확인해 주세요").
- 카메라 스트림은 오버레이 unmount 시 `track.stop()` 필수(태블릿 배터리/LED).

#### B-4.4 게이팅·권한

- **UI**: FloorPlanPage 에 `useAllowedRoutes({ role: user.role, restaurantId })`(useAllowedRoutes.ts:59 — Restaurant Admin/Staff 지원 실측) → `hasModule('ai_serving')`. MainLayout 무접촉. 데모 매장은 백엔드 bypass 지만 UI 는 allowed-routes 응답 기준 — 데모 계정 응답이 Enterprise 상당(requireModule.js:14 데모=Enterprise 관례)임을 파일럿에서 확인, 아니면 데모 한정 표시 예외 1줄.
- **역할**: 카메라 사용 = FloorPlan 접근 가능한 전 직원(서빙 직원 포함 — requirePosCounter 안 걺 §4 전문). 레퍼런스 사진 등록/삭제 = RA(§4.5 — 설정 wipe 계열 사고 예방 철학).
- **백엔드가 진짜 게이트**(requireRestaurantModule) — UI 게이트는 cosmetic 이라는 원칙(requireModule.js:8-10 주석) 그대로.

#### B-4.5 레퍼런스 사진 관리 UI — 신규 페이지 없이 MenuPhotoGallery 확장

RA 로 로그인 시 갤러리 카드 상세 뷰(Track A 기존)에 "인식 사진" 스트립 추가: 현재 레퍼런스 N장 썸네일(menu_image/staff_upload 구분 배지) + [사진 추가](multipart 업로드 → API 5) + staff_upload 행 [삭제]. 신규 설정 페이지·라우트 0 — 사진이 이미 모여 있는 화면에 얹는 게 최소절단면이자 발견성 최고(러너가 "이 메뉴 자꾸 틀리네" → RA 가 같은 갤러리에서 바로 보강). RA 아닌 역할에는 스트립 미렌더(표시 전용 갤러리 그대로).

#### B-4.6 i18n / 빈·로딩·에러·오프라인

- `floorplan` ns 확장(Track A 의 menuPhotos.* 와 동일 관례, 신규 ns 안 만듦): `aiServe.open` "Serve Cam" / `aiServe.shoot` / `aiServe.analyzing` / `aiServe.confidence` / `aiServe.confirmServe` / `aiServe.retake` / `aiServe.pickManually` / `aiServe.noCandidates` / `aiServe.reshootHint` / `aiServe.justServed` / `aiServe.seeding` / `aiServe.offline` / `aiServe.cameraDenied` / `aiServe.referencePhotos` / `aiServe.addPhoto` 등 — **en→ko→zh→ms 4언어 전부** + `npm run i18n:verify`. 모듈 스코프 t() 금지.
- 상태 전수: §10 표 전부 구현 대상(권한거부/미지원/오프라인/프로바이더실패/후보0/경합/3MB초과) — B1 추가분 = `seeding`(콜드스타트) 1건.
- 시간 표시는 레스토랑 타임존(`operationSettings.timeZone`) — ItemListView.fmtTime(:141) 패턴.

### B-5. 테스트·검증 (§11 계승 + B1 구체화)

1. **jest `tests/ai-ranking.test.js`**: 코사인/max-pooling·융합점수·4구간 경계(0.80/0.90/0.95)·동일메뉴 pick 강등·**local-color maxMode 캡(auto 불가)**·후보 0/1건·LocalColorProvider 결정성 계약.
2. **health-check 신규 `--category=ai`** (기존 카테고리 auth/security/pos/mobile/payment/referral 에 추가, 데모 매장 실측 조회 패턴:850 재사용): ready 품목 시드→recognize(고정 이미지)→후보 제약(preparing/served 제외·세트 set_items 규칙)→outcome→서빙 PATCH 후 후보 소멸→익명 401→타매장 403(IDOR)→**비 Enterprise 매장 403 MODULE_NOT_INCLUDED**→촬영 후 디스크에 신규 이미지 파일 0(무보존 계약). 멱등 정리.
3. **UI mount**: headless-page-sweep 에 오버레이 open(Playwright `--use-fake-device-for-media-stream`) — 크래시 0·console.error 0. `/검증 --e2e` 대상(신규 UI 흐름).
4. **가드**: check-print-guard **0건** + check-design-guard + i18n:verify + health-check 88/88 무회귀 + build:dev + SW_VERSION bump.
5. **Fable 게이트 해당** (신규 시스템 + 플랜/과금 마이그 + 신규 외부연동 표면) — 구현 완료 후 Fable 점검, 그 후에만 배포.

### B-6. 구현 순서 (Opus 착수용 — B1)

1. **마이그+모델**: migrate-ai-serving.js(테이블 2+plan seed) → models 2+index.js → dev 실행·round-trip 확인.
2. **AI 서비스층**: services/ai 4파일(계약/팩토리/LocalColorProvider 완성/Vertex 어댑터 스켈레톤) + jest ai-ranking 통과.
3. **라우터**: routes/ai-serving.js 7 엔드포인트 + server.js 마운트 + rate limiter + 콜드스타트 시드 + settingsGuard 'aiServing' — curl 실호출로 recognize/outcome/ready-items 계약 검증(데모 id=38).
4. **health-check ai 카테고리** 작성·통과 (백엔드 완결 증명 후 프론트 진입).
5. **프론트**: FloorPlanPage 배선(hasModule/칩/오버레이) → AIServeCameraOverlay(뷰파인더→결과→서빙 연속 흐름) → i18n 4언어.
6. **갤러리 레퍼런스 스트립**(RA 업로드/삭제) + refresh-embeddings 수동 버튼.
7. **검증 전체**(B-5) → Fable 게이트 → Irene 실기기(태블릿 카메라) 확인 → 파일럿.

B2(별도 세션, Irene 키 확보 후): google-auth-library + Vertex env + refresh-embeddings 전량 재임베딩 + auto 모드 해금 + 정확도 A/B(eval 하네스 §11.4).

### B-7. Irene 결정 필요 (구현과 병행 가능 — B1 은 어느 결정도 블로킹 안 됨)

1. **실 프로바이더 키**: Vertex(권장 — §2.2 근거 유지, GCP 프로젝트+서비스계정 필요, 원가 ~US$0.0001–0.0002/인식 = 매장 월 $1–7)를 **언제 켤지**. B1 로컬 매칭은 무비용이나 정확도 한계 명확 — 파일럿 데이터로 필요성 입증 후 결정해도 됨.
2. **Enterprise 월가 RM99 vs RM179** (dev DB 실측 99.00 재확인 — §0-3 미결 그대로).
3. **B1 파일럿 범위**: 데모(id=38) 검증 후 실매장 1곳(thefire 후보 §12) 투입 여부·시점.
4. (선택) 레퍼런스 업로드 UI(B-4.5)를 B1 에 포함(권장, 소규모) vs B2 로 미룰지 — 기본 포함으로 진행.

---

## 사업 전략 + 개발 퀄리티 평가 (Fable, 2026-07-06)

> 관점: 예스맨 금지 — 실데이터·실코드 기반 냉정 평가. 이 섹션의 모든 수치는 2026-07-06 실측 (dev DB / **운영 DB read-only 쿼리** / 구현 코드 전량 리딩).

### 실측 사실 (평가 전체의 토대 — 설계 가정과 어긋나는 것 포함)

| 항목 | 실측 | 설계/전달값과의 차이 |
|---|---|---|
| Enterprise 월가 | **운영 DB = RM99.00** (basic 29 / professional 59 / enterprise 99 — dev 와 동일) | **RM179 는 오류 확정** (§0-3 미결 → 해소). 메모리의 "basic 49/pro 99/ent 179"도 낡음 |
| thefire 실주문량 | 운영 30일: id=16 **468 품목라인**(≈16접시/일), id=24 170, id=25 9, id=5(레거시) 135 | §9 비용모델의 "10k–35k 인식/월" 가정은 **현 플래그십 대비 20–70배 과대**. 전량 촬영+재촬영 3배로 잡아도 ≈1.5k/월 |
| thefire 플랜 | id=5·16 = **Enterprise** / id=24·25 = **Professional** | Enterprise 게이팅이면 **thefire 3매장 중 1곳(최다 매출 id=16)만** 기능 획득 — 파일럿엔 오히려 적합 |
| 메뉴사진 커버리지 | thefire(16/24/25) 활성상품 126 중 **122 사진 보유(97%)** | 자동시드 레퍼런스 데이터는 이미 충분 — Track A "사진 채우기 유도"는 thefire 에선 불필요했음 |
| 실사용 | recognition_logs = **0건** (dev·미배포) | 수요는 아직 100% 가설 |

### 1. 팔 만한가 — **조건부 Go (Enterprise 차별화 자산으로. 단독 수익 동력으로는 No)**

- **정직한 페인 평가**: 제약매칭 원리(§1.2)가 역설을 품고 있다 — 후보가 3~8개로 좁기 **때문에** 정확도가 나오지만, 후보가 3~8개면 **Track A 의 Items 뷰(사진+테이블+옵션)에서 눈으로 고르는 데 2~3초**면 된다. 카메라가 절약하는 건 그 2~3초와 "메뉴 이름을 모르는 신입"의 인지 부담이다. thefire 규모(피크에 ready 1~3개)에서는 **운영 페인 자체가 작다**. 이 기능의 실질 가치는 ①메뉴 100+·회전 빠른 대형 매장/푸드코트(= 우리가 앞으로 잡을 고객) ②신입/외국인 직원 많은 매장 ③**세일즈 데모 임팩트**다.
- **경쟁 포지셔닝**: 말레이시아 경쟁(StoreHub·Feedme·Slurp·Qashier)·글로벌(Toast/Square) 어디에도 "카메라로 접시→주문 매칭" 기능은 없다(2026-01 지식 기준). Toast 는 KDS·타이머까지, Square 는 KDS 뿐. **"AI가 서빙을 아는 POS"는 데모 30초짜리 차별화 스토리**이고, 모바일오더 정체성과도 충돌하지 않는다(모바일 주문일수록 카운터 직원이 주문을 못 봤으므로 서빙 인계 페인이 더 큼 — 오히려 정합).
- **결론**: 매장이 이것 "때문에" 돈을 더 내진 않는다. 그러나 **RM99 Enterprise 번들의 체감 가치와 세일즈 전환율을 올리는 자산**으로서는 이미 지불한 개발비(B1 완료) 대비 유지비 ~0 이므로 버릴 이유가 없다. 추가 투자는 실사용 데이터가 정당화할 때만.

### 2. 모델 전략 — **A(Vertex 임베딩) 유지. 단, B2 배선은 파일럿 사용량 확인 후. B1 은 골격으로 정확히 제 역할**

- **실측 볼륨이 계산을 뒤집는다**: 실제 ~0.5–2k 인식/월/매장에서 — A(임베딩) ≈ **$0.1–0.4/월**, B(비전 LLM, Haiku 4.5 급) ≈ **$1–12/월**. "B는 월 $60–180라 불가"는 3만회 가정에서만 참이고 **실볼륨에선 B도 흡수 가능**하다. 그럼에도 A 를 추천하는 이유는 비용이 아니라: ①지연(0.3–0.5s vs 1–3s — "~1초" 제품 약속) ②결정성(같은 사진=같은 벡터, 캘리브레이션·평가 하네스 §11.4 성립) ③프롬프트 유지보수 0 ④레퍼런스 사진 추가=즉시 반영이라는 §0-2 학습 모델과의 정합. 비전 LLM 은 설계 §2.2 의 **judge 폴백/혼동페어 크로스체크 슬롯**(오프라인 평가용)으로만 — 실시간 경로 금지.
- **B1(색)의 위치**: 실사용 엔진이 아니라 **파이프라인 증명 + 사용량 계측기**다. 갈색 덮밥 2개를 못 가르는 건 사실이고, 코드가 이를 정직하게 캡했다(`maxMode='recommend'`, ranking.js:50 — auto 금지). B1 성적표로 정확도를 논하지 말 것 — B1 이 측정하는 건 정확도가 아니라 **채택률**이다.
- **운영 서버 부담**: A/B 모두 외부 API 라 상주 메모리 0 — 자원부족 서버([[reference_prod_server_resource_constraint]])에 안전. LocalCLIP(onnx 수백 MB 상주)을 Prod 유보한 §B-0 판단은 옳다. B1 sharp 임베딩은 요청당 <50ms·시드 시 122장 버스트뿐 — 허용 범위.
- **공정사용 상한**: 30k 백스톱 유지(비용 아닌 남용 방지). 실볼륨에서 걸릴 일 없음 — 종량 과금 설계는 **불필요**(청구 복잡도만 늘림).

### 3. 가격·패키징 — **Enterprise 포함 유지 (RM99 확정). 별도 애드온 금지**

- **RM99 vs RM179 → 운영 DB 실측 RM99 로 종결.** basic 29/professional 59/enterprise 99 (dev=운영 동일). 랜딩·세일즈 자료·메모리의 RM179/49 표기는 전부 정정 대상.
- 이 기능 단독으로 RM99 를 정당화하진 못한다(Professional 과의 RM40 갭은 advanced_inventory 등 26개 모듈 번들이 정당화). 그러나 원가 회수 계산은 무의미할 정도로 유리: **Enterprise 1매장의 월 갭 RM40 ≫ Vertex 원가 <RM2**. 즉 "몇 매장이 써야 회수되나"의 답 = **1매장, 첫 달**.
- **별도 애드온 과금 반대**: 수요 미검증 기능에 과금 SKU·인보이스·게이팅 축을 추가하는 건 첫 유료출시 감사([[project_paid_launch_audit]])에서 확인한 청구 복잡도 리스크를 재생산한다. Enterprise 업셀 스토리("AI 서빙 포함")로만 쓰는 게 옳다.

### 4. Go-to-market — **파일럿 = thefire id=16 (Enterprise·사진 97%·최다 볼륨). 성공지표는 정확도보다 채택률**

1. **순서**: dev 배포 → 데모(id=38, 모듈 bypass 실측 확인됨) 스모크 → **thefire id=16** 실기기(태블릿 카메라) 투입. id=24/25 는 Professional 이라 게이팅상 제외 — 파일럿 통제군으로 오히려 유용.
2. **성공지표 (4주)**: ①**채택률 — served 품목 중 Serve Cam 경유 ≥30%** (이게 본질 지표. 안 쓰면 정확도는 무의미) ②카메라 시도 중 top1 채택(picked_other 아님) ≥70%(B1 색기반 기준; B2 후 §12 의 85% 적용) ③reshoot+이탈 ≤20% ④서빙 소요·인계 구두설명 감소 체감(Irene 인터뷰).
3. **B2 트리거**: 채택률 지표 통과 + "동일색 메뉴 혼동" 로그가 실제로 쌓일 때만 Vertex 키 발급. 그 전 GCP 프로젝트 만들 필요 없음.
4. **접는 조건 (명시)**: 4주 채택률 <10% 이면 **B1 에서 동결** — 코드 유지(세일즈 데모 + Enterprise 번들 문구용), B2·Beta(리포트/optPrior) 개발 중단. 데모 자산으로서의 가치는 남으므로 제거는 안 함.
5. 볼륨이 16접시/일인 매장에서 4주 = 시도 수백 건 — 통계적으론 얇다. 지표는 흐름 판단용이지 논문용이 아님을 전제.

### 5. 개발 퀄리티 평가 — **판정: 프로덕션급 골격. B1-first 는 옳은 결정. 구조 재작업 불필요, B2 전 필수 작업 1건(확신도 캘리브레이션)**

- **B1 을 먼저 지은 게 옳았나 — 옳았다.** 근거: 서버에 AI 키 0개(§B-0 실측)라 "처음부터 임베딩" = Irene 의 GCP 결정에 블로킹당한 채 대기였다. B1 은 키 없이 파이프라인·DB·API·UI·게이팅·로그·테스트를 전부 실물로 완성했고, 프로바이더 교체가 종이 약속이 아님을 팩토리 폴백(services/ai/index.js:14-22 — vertex 키 없으면 경고 1회 후 local-color)으로 증명했다. 유일한 위험은 "색깔 성적을 제품 성적으로 오독"하는 것 — §B-0 과 maxMode 캡이 이미 방어.
- **코드 품질 (전량 리딩 근거)**: 설계→구현 충실도가 높다. ①추상화 실재(AIVisionProvider 계약 + LocalColor 완성 + Vertex 스켈레톤 `isConfigured()` 폴백) ②ranking.js 순수함수 + **동일메뉴 다중주문 무조건 pick 강등**(ranking.js:60-61 — "조용히 하나 찍지 않는다" §1.2-4 구현) ③무보존 계약 준수(recognize = memoryStorage 만, 디스크 쓰기 코드 0 — routes/ai-serving.js 검증, health-check 이 파일 0바이트까지 검사) ④게이팅 3단+IDOR+rate limit(30/분/유저·매장 복합키) ⑤콜드스타트 시드 뮤텍스+멱등 리컨실(UNIQUE(product_id,image_url)) ⑥오버레이 unmount 시 `track.stop()`(:73-75, 배터리/LED) ⑦서빙 전이 = 기존 onServe 재사용(신규 전이 API 0, 인쇄 8파일 무접촉). health-check ai 카테고리·jest 계약 테스트 실재.
- **정직한 결함 목록 (치명 아님, 기록)**:
  1. **[B2 전 필수] 확신도 = fused_score 원값** (routes/ai-serving.js:186 `confidence: r.fused_score`). §5-⑧ 의 margin 기반 sigmoid 보정 미구현. 색 히스토그램은 전 성분 양수 벡터라 코사인이 구조적으로 높게 몰림 → 0.90/0.80 밴드가 과잉 recommend 를 낳는다. B1 은 사람확정 캡이라 무해하나, **auto 해금(B2) 전 recognition_logs 기반 재캘리브레이션은 선택이 아니라 의무** (설계도 §5-⑧에 명시 — 알려진 갭이지 은닉 버그 아님).
  2. seedFromProductImages 의 `fs.readFileSync` 루프(:127) — 122장 시드 시 이벤트루프 블로킹 버스트. 콜드스타트 1회성이라 허용하되 운영 투입 시 pm2 CPU 관찰 대상.
  3. 오버레이 결과 화면에 소켓 무효화 부재(§B-4.3 의 "방금 서빙됨" 덮개 미구현) — 타 직원 선서빙 시 스테일 카드. 기존 PATCH forward-only 가드 덕에 무해한 no-op 이지만 UX 개선 여지.
  4. 오버레이 하드코딩 hex(#10B981/#635BFF 등) — 풀스크린 카메라 다크 컨텍스트라 실용적이나 posDisplayTheme 변수 원칙과는 어긋남. 디자인가드 baseline 처리 확인 필요.
  5. recognize 가 `req.file` 검증 전에 후보 쿼리 실행(:151→161) — 사진 누락 요청도 DB 왕복. 사소.
- **진짜 모델 끼우면 프로덕션감인가 — 그렇다.** B2 = VertexEmbeddingProvider.embedImage 1개 구현 + env 3개 + `npm i google-auth-library` + refresh-embeddings 전량 재임베딩 + 캘리브레이션. 구조 재작업 0. `embedding_model` 태깅이 모델 혼용 비교를 이미 차단.
- **개발 우선순위 — 여기서 멈추는 게 맞다.** 오프라인 모드(주문·인쇄 생명선 직결 [[project_offline_mode]])·안드로이드/데스크탑 앱·IOI 몰 API·유료출시 감사 잔여가 전부 **실매출·실운영**에 닿는 반면, 이 기능은 수요 가설 단계다. B1 완료 상태가 정확히 투자 적정선 — **파일럿은 개발이 아니라 관찰**(배포 1회 + 로그 열람)만 소모한다. B2 착수는 §4 트리거 충족 시에만.

### 6. 최종 권고

- **Go/No-Go: 조건부 Go** — Enterprise 차별화 자산으로 파일럿까지만 진행, 추가 개발(B2·Beta)은 채택률 데이터가 정당화할 때. 안 쓰이면 B1 동결(데모 자산화)이 손절선.
- **다음 1개 액션**: dev 배포 + 데모(id=38) 스모크 → **thefire id=16 파일럿 투입**(실기기 카메라 확인 포함) → 4주 recognition_logs 관찰.
- **Irene 결정사항**:
  1. **Enterprise 월가 = RM99 확정 공표** (운영 DB 실측 — RM179 표기 전면 정정: 랜딩/세일즈 자료/메모리).
  2. **파일럿 승인**: thefire id=16, 4주, 지표 = 채택률 ≥30% / top1 채택 ≥70% / reshoot ≤20%. (id=24/25 는 Professional — 게이팅상 제외 유지 동의 여부.)
  3. **Vertex(GCP) 키**: 지금 만들지 **않고** 파일럿 채택률 통과 시 발급 — 동의 여부.
  4. **접는 조건 합의**: 4주 채택률 <10% → B1 동결·B2/Beta 중단(코드는 데모용 유지).
  5. (선택) 랜딩/Enterprise 소개에 "AI 카메라 서빙" 노출 시점 — 파일럿 후(권장) vs 즉시.
- **리소스 배분**: 이 기능 신규 개발 0 (파일럿 관찰만). 개발 여력은 오프라인 모드·앱·유료출시 잔여로.

