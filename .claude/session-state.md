## 현재 작업 상태
**마지막 업데이트:** 2026-09-05 16:40 UTC (v3.85 배포 완료 · **H1 핫픽스 배포 대기**)
**버전:** SW `4.82-unit-model-calendar-20260905`
**작업 상태:** v3.85 배포 완료 · H1 은 커밋·마커까지 끝나고 **Irene `/배포` 대기**

### 진행 중인 작업
**H1 핫픽스 — 배포 대기 (마커 유효, 지문 `47066181e8e6`)**
커밋 `36ce2f8b5`(스크립트) · `435c281f4`(릴리즈 기록) · `3aeea7bc8`(보강)
- **왜**: v3.85 배포가 PM2 재시작 전에 한 번 실패해 운영이 몇 시간 **옛 코드**로 돌았고, 그 창에서 거울 단위가 덮이는 사고가 **4건** 실제로 났다(P0 가 막으려던 그것). 12시 스냅샷 vs 배포 직전 감사로그 id 조인으로 전수 확정.
  - `ing#40` 액젓 `880 g → 880 bottle` ← **복구 대상**(1병=880병은 뜻이 안 됨, 레시피 3줄이 g)
  - `ing#87/93/94` K-소스 3건 `1 piece → 1 kg` ← **무접촉**(줄 0·아이템 일치·kg 이 더 맞음)
  - `PI-073` 오징어링 `1 pack → 400 g` ← **사람 수정**(아이템만 바뀜) 무접촉
- **함께**: 수렴 스크립트가 빠뜨린 `unit_cost := 거울 값` 규칙 → **원가 18건** 채움. 이것 때문에 프로덕트 레시피 59줄의 원가가 실제보다 적게 나오고 있었다.
- **보강**(Fable 이 드라이런 출력에서 발견): `PI-139` 볶은참깨가 아이템 `pack/1` ↔ 거울 `g/1000` 로 남아 있어, **이름만 고쳐 저장해도** 거울이 덮이고 레시피 4줄이 틀어질 수 있었다(409 는 단위 변경만 막는다). → ①`stockItemMirror` **동기화 영구 가드**(단위 다르고 줄 있으면 unit·base 만 건너뜀) ②데이터 정합(줄 있으면 아이템을 거울에 맞춤) ③**`ING-UNI-016`**(차단).
- **검증**: 픽스처 9/9 · verify-all 17/17 · **운영 드라이런(적용→증명→롤백)** 복구 3줄 · 원가 18건 · 증명 ①1(육개장) ②0 ③0 · 운영 변경 0.
- ⚠ 남긴 것: 줄 없는 쌍의 "거울→아이템" 규칙은 정보 손실 가능(운영 대상 0, 그 분기는 사실상 죽은 코드). 다음에 그 파일 열 때 "더 구체적인 쪽이 이긴다"로 맞춘다. 가드가 `package_*` 는 계속 복사 — 항등식은 서므로 무해(기록만).

### 다음 확정 작업
> Irene 이 이번 세션에서 명시 지시했고 아직 안 끝난 것

1. **랜딩 언어** — 브라우저가 영어인데 한글로 뜸. 원인 확정: `src/i18n.ts:34` `detection.order:['localStorage','navigator']` + `caches:['localStorage']` 라 **로그인 시 시스템이 바꾼 언어까지 브라우저에 저장**된다. 위치(IP)는 아무 데서도 안 본다. 운영 `users.preferred_language` **49명 전원 `en`**(Irene 계정 3개 포함). Fable 판정: `caches: []` 2줄 + 사용자가 고른 것만 저장. **IP 기반 `ms` 자동적용은 기각**(업계 표준 아님).
2. **보고서 월 라벨 4곳** — 캘린더와 같은 부류 잠복 결함. `ReportsPage:1180`·`BrandReportsPage:1288`·`FoodcourtReportsPage:1183`·`OwnerReportsPage:1122` 가 `new Date('YYYY-MM-01')`(UTC 자정)을 매장 TZ 로 변환. 말레이시아·UTC·런던은 정상, **America/New_York → August**. 공용 `monthLabelFromYM` 으로 대체.
   → 위 1·2 를 **소배포 한 번**으로 (Fable 확정).
3. **C1 코드 자동채번** — Irene 지시 "입력 안 하면 자동으로 들어가서 나중에 정돈 잘되게". 착수 전 **prefix 규칙·unique index·`count()` 채번 전수 실측을 Fable 에** 먼저.
4. **Irene 답 대기 — 이제 1건뿐**: `K-Yukgaejang Beef 1kg` 레시피 줄 `0.05 piece` ↔ 재료 `kg` 이 **`0.05 kg`(50 g) 오타인지**. ⚠ **액젓 3줄은 물을 필요가 없어졌다** — 사람이 정할 값이 아니라 배포 창에서 덮인 것이고 H1 이 되돌린다(Fable 정정). ⚠ 육개장은 **오늘 생긴 게 아니라 원래 있던 불일치**(Fable 재정정 — 12시 실측이 거울 경유만 세서 안 잡혔던 것).
   추가 확인: **볶은참깨** 이름의 `500 g` vs 기존 `1000 g`(2배 차) — H1 은 기존값을 쓰고 이름값은 안 쓴다. 실물 포장 확인 필요. **K-소스 3건**의 포장 이름은 화면에서 기준단위에 채우면 된다.
5. **Irene 질문 3건 미답** (실측·판정 남음): 가격 변경 전파와 고객 표시(공급업체/BG 가 가격 고치면 RA·BG 에 어떻게 보이나, 고객에게 알림?) · 브랜드 미연결 매장 구조 · "각 아이템 연동이 체계적인가".

### 완료된 작업 (이번 세션)
**v3.85 운영 배포 — 커밋 `d36f9a63f` → `da29d4eff` (6개)**

1. **P0 `9ba5b5d2f`** — 재고아이템을 저장하면 브랜드 재료(거울) 단위가 덮여 레시피 `20 g` 이 `20 pack` 이 되던 길 차단(`stockItemMirror.js` MIRRORED_FIELDS 에서 `unit` 제거). 운영에 그렇게 어긋난 아이템 **18건** 대기 중이었음. 인스펙션 `ING-UNI-011/012` 신설. 고장주입 4/4.
2. **게이트 `d36f9a63f`** — 배포 준비 검사의 "프론트 변경" 판정을 **커밋 시각 → 파일 내용 지문**으로. 배포 기록 커밋이 스냅샷보다 뒤에 찍혀 백엔드만 고쳐도 "SW 올려라"가 뜨던 오탐.
3. **문서 `9f69c2fe7`** — `docs/TRADE_STRUCTURE.md` **§2-2 단위 모델 다섯 칸** 신설(표·항등식·mermaid 관계도·"지금 틀린 자리").
4. **P1 `0e415c227`** — 다섯 칸 스키마·수렴 스크립트·이름 규격 파서·화면·4개 언어·409 확장·매장 재료 잠금 신설·인스펙션 013.
5. **수렴 결함 3건 `b453c7933`** — 기준숫자 오환산(37건에 ×1000)·매핑 필터 누락(**169건이 잘못 곱해질 뻔**)·검증이 commit 뒤.
6. **캘린더 `7b0cf64f5`** — 배송 모달 달력이 9월인데 "August". 2026-07-05 수정이 **부품 둘 중 하나에만** 들어가 있었음. 이번엔 `CalendarPicker.getMonthLabel` 을 **export 해 공유**(복사 금지). jest 4/4.
7. **수렴 증명 자기모순 `da29d4eff`** — 1차 배포 실패 원인. D-2 가 비호환 쌍을 의도적으로 남기는데 증명은 전역 0 을 요구 → 매번 롤백. + D-2 가 `product_recipe_ingredients` 를 안 봄. + 배포 로그 fail-loud.

**확정 용어 (Irene 정의, `TRADE_STRUCTURE.md` §2-2 단일 기준)**
`1 pack(기준단위) = 2000 g(취급단위) = RM 93(가격·발주 단가)`
| 한글 | 영어 | DB |
|---|---|---|
| 취급단위 | Usage Unit | `unit` (내부 사용단위 — 레시피·재고·차감) |
| 취급 기준숫자 | Base Qty | `base_quantity` (기준양 전체에 든 취급단위 양) |
| 기준단위(포장) | Package Unit | `package_unit` (신설) |
| 기준양 | Package Qty | `package_quantity` (신설) |
| 가격 | Price / Package | `unit_cost` |

### 운영 반영 결과 (2026-09-05 15:32 UTC)
- 백업 `/var/www/backups/20260905_151656` · **마이그 73/73** · **스모크 10/10** · PM2 재시작 · 매니페스트 1,906파일
- **치즈 PI-142**: `2000 g` · 기준 `1 pack` · RM 93 / 거울 일치 / 레시피 줄 `0.02 pack → 40 g`
- **ri 522**: `0.07 kg → 70 g` (그동안 0.07 g 만 빠지던 실결함)
- 채워짐: 재고아이템 **253/308** · 재료 **507/546**
- 기준숫자 교정: `K-Gochujang 1000 g`·`Egg 30 piece`·`Rice 5 kg` — **g 당 원가가 1000배 부풀려져 있던 34건 정정**
- **인스펙션 011 ❌ 4건**(사람 몫, 늘지 않음) · **012 ✅ 0건** · **013 ❌ 94건**(비차단 목록)
- **PI-073** — Irene 이 배포 창 사이에 화면에서 `1 pack → 400 g` 로 고친 것, 수렴이 `copy` 로 판정해 **그대로 유지**됨. 다만 `package_unit='g'/400` 으로 복사돼 "400 g = 400 g" — 포장이 `1 pack` 이라는 사실은 화면에서 채워야 함.

### 미완 (감추지 않고 기록)
- **캘린더 실브라우저 미확인** — mount sweep 은 크래시만 보고 월 라벨 값은 안 본다. jest 4/4 로 로직은 박았으나 실제 화면 확인은 없음. Fable 지시: 다음 세션 첫 항목으로 **Playwright spec 1건** — `test.use({ timezoneId: 'Asia/Seoul' })` 로 브라우저 존을 KST 에 두고 매장(MYT) 배송 모달을 열어 9월 라벨 = "September" 단언. 기계로 되는 일이니 Irene 눈에 맡기지 않는다.
- **수렴 출력 캡처 실패** — 배포 스크립트가 마이그 출력을 변수에 담고 성공 시 안 찍어 증명 3조건·사람 몫 목록이 배포 로그에 없다. 운영 DB 직접 대조로 갈음함(Fable: 그게 더 강한 증명이라 이번 판정에는 충분).

### 이번에 드러난 부류 결함 3건 (다음 절단면 — Fable 확정, **코드보다 먼저**)
1. **드라이런이 증명 단계를 건너뛴다** — 증명이 `if (APPLY)` 안에만 있어(`:451`/`:484`) **드라이런 4회 통과가 증명을 한 번도 실행하지 않았다.** 오늘 자기모순이 운영 apply 에서야 드러난 직접 원인.
2. **배포 로그가 마이그 출력을 성공·실패 모두 삼킨다** — `SPRINT_OUTPUT=$(ssh …)` 로 변수에 담고 실패 때만 echo. 1차 실패에서 **왜 죽었는지 로그로 알 수 없었다.**
3. **위험한 데이터 마이그가 11분짜리 mount sweep 뒤에 있다** — 한 번 틀리면 30분 재소요. Irene "며칠째 같은 문제" 지적의 뿌리.

**Fable 확정 절단면 (한 묶음 · fable-gate 대상 — 배포 스크립트 접촉):**
1. **드라이런의 정의를 바꾼다** — "적용 없이 결과만 보는 것" → **"적용하고 되돌리는 것"**. 증명 블록을 `if (APPLY)` 밖으로 빼고, 드라이런도 트랜잭션 안에서 apply 와 동일 실행 → 증명 3조건 → 무조건 rollback. 픽스처: 증명 실패가 **드라이런에서** 뜨는지 1건.
2. **배포 로그가 마이그 출력을 항상 남긴다** — 성공·실패 무관 `logs/deploy-<ts>/<mig>.log` 파일 저장 + 배포 로그에 마지막 10줄. 어제 주석("파이프 버퍼")이 확증 없는 추측이었던 것도 여기서 정정.
3. **배포 전 게이트에 "운영 드라이런(=적용+롤백)" 을 추가** — 1번이 되면 백업 직후 운영에서 `--dry-run` 을 먼저 돌리고 증명이 깨지면 **빌드·sweep 전에** 멈춘다. 30분 낭비의 뿌리를 그 자리에서 끊는다. 실행 순서는 안 바꾸고 게이트를 앞에 하나 더 두는 것.

### H2 절단면 (Fable 확정 — H1 뒤, 별도 커밋·마커)
**"원가 = 공급업체 가격" 백필.** 원가 0 인 활성 재고아이템 **251건** 실측 분류:
| 조건 | 건수 |
|---|---|
| 판매단위 == 취급단위 · `base_quantity=1` | 85 |
| 판매단위 == 취급단위 · `base>1` | 40 |
| 판매단위 == 기준단위(`package_unit`) | 84 |
| **판매자 가격이 갈림** | **12** ⚠ |
| 공급처·거울 어디에도 값 없음 | 31 |

**규칙 하나로 푼다**(가격은 양에 비례):
- 판매자 포장량(취급단위) = `order_mode='measure'` 면 `1 × sp.unit`, 아니면 `sp.base_quantity × sp.unit`. 아이템 포장량 = `base_quantity`. 같거나 kg↔g·L↔ml 호환이면 환산, 아니면(piece↔g) **건너뛰고 목록**.
- `unit_cost := 매핑.unit_price × (아이템 포장량 ÷ 판매자 포장량) × package_quantity`
- 조건: 아이템 `unit_cost = 0` 일 때만(사람 값 절대 안 덮음) · 매핑은 `is_preferred` 1건 · **가격 갈리는 12건은 선호 없으면 건너뛰고 Irene 목록** · 31건 목록.
- 드라이런 = 적용+증명+롤백 · **행별 산식 로그**(`27.90 × 1000/1000 × 1`) · 인스펙션 `ING-UNI-017`(차단).
- 픽스처 8: 같은 단위 base1 / 판매단위==기준단위 / measure kg↔g ×1000 / 비호환 skip / 선호 있음 / 선호 없음 skip / 0 아닌 값 무접촉 / 멱등.
- 보고 숫자: 채운 건수 · 건너뛴 사유별 건수 · **원가 변화 큰 상위 10건**.

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님. 다음 사이클 결정은 Irene 지시 기준.
- 코드 중복 16쌍 정리(PI 10·PRD 6) — C1 뒤 Irene 컨펌
- 활성 메뉴 751 중 **687 이 레시피·재고 미연결**(팔려도 차감 0) · with MIN 재료 **288/381 원가 0** — 단위가 아니라 "연결" 문제, 별건
- P1-R: 매장(RA) 화면 다섯 칸 적용 — 백엔드 잠금·칸은 이미 들어감, 화면만 남음
- P2: 레시피 붙은 아이템의 기준단위 재정의 화면(환산 계수 입력)
- 생성 시 `suggested_base`(이름·판매자 규격 제안) — P1-R 로 이월

### 라우트·화면 정리 후보 (2026-09-05 기계 스캔)
> 코드 변경 0. 스캔 스크립트: `/tmp/claude-1000/-var-www/0799050d-1c8d-41ae-bb8f-66b4c2dff6d6/scratchpad/route-dupes2.js`
> (express 라우터 스택을 걸어 등록 파일:줄을 기록 → `(메서드, 정규화 경로)` 로 묶어 중복 검출. 착수 때 다시 돌릴 것.)

**① 같은 경로에 핸들러 두 벌(그림자) — 6종.** 등록 라우트 1144개 중. 뒤에 마운트된 쪽은 **한 줄도 실행되지 않는다.**
가드는 전부 동일해 권한이 새는 곳은 없음(실측). 별칭 마운트 31종은 그림자가 아니라 제외.

| 메서드·경로 | ▶ 이기는 쪽 | · 그림자 |
|---|---|---|
| `PUT /api/restaurants/:x/ingredients/:x` | `restaurants-ingredients.js:640` | `ingredients.js:790` |
| `GET /api/restaurants/:x/ingredients` | `restaurants-ingredients.js:54` | `ingredients.js:507` |
| `POST /api/restaurants/:x/ingredients` | `restaurants-ingredients.js:246` | `ingredients.js:752` |
| `DELETE /api/restaurants/:x/ingredients/:x` | `restaurants-ingredients.js:707` | `ingredients.js:862` |
| `GET /api/orders/:x/actions` | `orders-crud.js:2101` | `orders-crud.js:2906` (같은 파일) |
| `GET /api/brands/:x/restaurants` | `brands-core.js:333` | `brand-inventory.js:35` |

→ 매장 재료 CRUD 한 벌(`ingredients.js` 의 `/restaurants/*` 4개)이 통째로 그림자.

**② 도달 불가 화면** — `dev-frontend/src/pages/Recipes/RecipesPage.tsx` (`App.tsx :1074`).
어느 역할 `ROLE_ROUTES` 에도 없어 열면 대시보드로 튕긴다. 안에 `base_quantity` 미적용(치즈 70 g → RM 6,510)·저장 `cost` 미전송(DB 원가 0) 결함이 남아 있음. 사람이 못 여는 화면이라 고치지 않음.

**③ 사장 라우트** — `routes/ingredient-seller-products.js :286` `/api/seller-catalog`. 프론트 호출 0건.
(현재 쓰이는 것은 `routes/supplier-directory.js :572` `/api/supplier-catalog`.)

**④ `requireBrandScope()` 는 이름과 동작이 어긋난다** — `middleware/brandScope.js`. `isBG()` 가 Brand Manager 를 통과시키지만 그 다음 `Brand.findAll({owner_id:user.id})` 가 빈 배열이라 **BM 은 항상 403 `No brand owned by user`**. 실측: BM 토큰 → `GET /api/brands/1/inventory` 403. 이 미들웨어가 걸린 라우트: `brand-soa.js` 4곳 + `brand-inventory.js`.

**⑤ Brand Manager 접근 모델 — 한 덩어리로 본다 (Fable: 이번 배포 밖, 별건 설계)**

같은 형태의 결함 3개가 겹쳐 있다 — **역할 검사는 BM 을 통과시키고, 그다음 `owner_id` 로 걸러 항상 빈 결과/403.**
- `GET /api/brands?owner=me` (`brands-core.js :134-136`) → BM **0건**(실측: BM 0 / BG#6 3건). 그래서 `/pos/brand-menus` 의 `selectedBrandId` 가 null → **Settings 탭이 통째로 빈 화면**.
- `requireBrandScope()` (`middleware/brandScope.js`) → `isBG()` 는 BM 을 통과시키지만 `Brand.findAll({owner_id})` 가 비어 **항상 403 `No brand owned by user`**. 실측: BM → `GET /api/brands/1/inventory` 403. 걸린 라우트: `brand-soa.js` 4곳 + `brand-inventory.js`.
- `brands-core.js` 인라인 소유권 검사 10곳(아래).

⛔ **주의(Fable 판정 근거)**: `GET /api/brands` 목록은 Brand 행을 통째로 돌려준다 — `payment_settings`(Stripe/PayPal)·`bank_name/bank_account/bank_account_name`·`plan_amount/subscription_*` 포함. 형제 라우트 `payment-settings`(:604)는 같은 값을 BM 에게 **일부러 403** 으로 막는다. 목록을 그냥 넓히면 그 돈 경계가 통째로 뚫린다. 정식 수정은 **BM 에게 안전한 투영만**(id·name·code·logo·restaurants) 주는 형태이고, `brands?owner=me` 호출부 전수 조사가 선행돼야 한다.

**BM 절이 없는 인라인 검사 10곳** (BM 이 부르면 403) — 호출 화면과 BM 도달 여부 실측:

| 라우트 | 검사 줄 | 호출 화면 | BM 도달 |
|---|---|---|---|
| `GET /:id` | :194 | `useSetupStatus.ts` · `BrandManagement`(`/pos/brand/general/management`) · `ProductIngredientsTab` · `IngredientsTab` · `StockLedgerLinkPage` · `SuppliersPage` | **O** (BrandManagement) |
| `PUT /:id` | :268 | 없음 | — |
| `DELETE /:id` | :565 | 없음 | — |
| `GET /:id/payment-settings` | :604 | `BrandInvoicesPage`(`/pos/brand/invoices`) · `BrandPaymentSettingsPage`(`/pos/brand/payment-settings`) | **O** (둘 다) |
| `PUT /:id/payment-settings` | :635 | 같음 | **O** |
| `POST /:id/staff` | :766 | `BrandStaffPage`(`/pos/brand/manager`) | X (`requiredRole` 에 BM 없음) |
| `PUT /:id/staff/:userId` | :845 | 같음 | X |
| `DELETE /:id/staff/:userId` | :903 | 같음 | X |
| `PUT /:id/staff/:userId/permissions` | :935 | 같음 | X |
| `PUT /:id/staff/:userId/reset-password` | :974 | 같음 | X |

→ **staff 쓰기 5개는 화면 자체가 BM 에게 안 열린다**(`BrandStaffPage` 의 `requiredRole` 에 Brand Manager 없음). 서버 차단과 화면 차단이 일치 = 결함 아님.
→ **결제 설정 2개는 화면이 BM 에게 열리는데 서버가 막는다** — 돈 경계라 "넓힌다"가 아니라 **화면이 BM 에게 그 메뉴를 보여 주는 게 맞나**로 봐야 함(Fable 기준).
→ `GET /:id` 도 BM 도달 화면이 있음(`BrandManagement`).

BM 절이 **있는** 4곳: `/:id/restaurants`(이번 배포에 수정 포함) · `/:id/franchise-map` · `GET /:id/staff` · `/:id/franchise-dashboard`.

**(구) 목록은 위 표로 대체.**

### Git 상태
- 최근 커밋: `da29d4eff` (앞선 6개는 위 목록)
- **미커밋 3건** — `.claude/deploy-manifest.json`(배포가 갱신) · `releases/2026-09-05-unit-model.json` 이 `releases/archive/` 로 이동(배포 스크립트가 아카이브). **배포 산출물이라 다음 세션에서 커밋하면 됨**

### 주요 변경사항
- 스키마: `product_ingredients`·`ingredients` 에 `package_unit`(ENUM 8값, NULL) · `package_quantity`(DECIMAL(10,2) NOT NULL DEFAULT 1)
- 신규 파일: `scripts/migrate-package-unit.js`(스키마) · `scripts/migrate-package-unit-2-converge.js`(수렴, **파일명이 실행 순서** — 레지스트리는 파일명 정렬) · `utils/specFromName.js` · `tests/spec-from-name.test.js` · `src/components/Common/monthLabel.guard.test.ts`
- 수렴 스크립트 원칙: `package_unit IS NULL` 인 행만(행 단위 1회 보장 → 사람이 고친 값을 재실행이 안 되돌림) · 이름 > 거울 > 판매자 규격 > 복사 · 비식품은 무게·부피 규격 제외(개수는 적용) · 미결은 NULL 로 남김 · 대조는 **commit 앞**에서, 어긋나면 롤백
