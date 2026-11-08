# Fable 게이트 판정 2026-11-08d — 브랜드 설정 잠금(default_locks) → 기존 메뉴·매장 잠금 즉시 적용 + scope PUT 선행 409

판정: **PASS** (운영 배포 가능 · 마이그 0 · SW 그대로). 직전 판정 `.claude/fable-verdict-20261108c-brand-menu-push-all-gate.md`(PASS · dfa3a0bc9) 뒤 추가 변경만 본다. 작성: Fable(리더). 운영 쓰기 0.

Irene 원문(2026-11-08): «그리고 브랜드 메뉴 설정에서 메뉴명이랑 가격 등 못 바꾸게 했는데 레스토랑이 다 바꿀 수 있어. 설정 제대로 적용된거 맞아?»

## 0. 원인 판정 (팀원 운영 읽기 그대로 + 코드 대조)
설정 «What franchises cannot change»(brands.menu_settings.default_locks)는 **새 메뉴를 만들 때의 기본값**으로만 쓰였다(`routes/brand-menus.js` `resolvedLock` — 메뉴 생성 시 explicit 없으면 default). 기존 brand_menus.lock_* 과 매장 products.brand_menu_locks_snapshot 에는 전혀 닿지 않았고, 매장 편집 가드(`routes/menu.js` 661~)는 **매장 상품의 snapshot 만** 읽는다. 따라서 브랜드 13 설정은 저장됐지만(이름·가격·카테고리 true) 39개 메뉴 lock_* = 0 · 매장 28 snapshot 전부 false → 매장이 다 바꿀 수 있었다. 설정이 「안 적용된 것」이 아니라 「새 메뉴 기본값으로만 설계돼 있었던 것」 — 옛 화면 문구도 그렇게 적혀 있었다. Irene 의 기대(설정 = 브랜드 전체에 바로 적용)가 맞는 쪽이고, 이번 변경이 그 기대로 맞춘다.

## 1. diff 범위 대조 (`git diff HEAD` 8파일 · 144+/11−) — Fable 직접 읽음
| 파일 | 내용 | 판정 |
|---|---|---|
| `services/brandMenuSyncService.js` | `applyBrandLocksToMenus({brandId, locks, keys})` — keys 칸만 `brand_menus.lock_*` 일괄 → `isBrandPushFrozen` 이면 `{frozen:true}` 로 매장 표 무접촉 → 아니면 메뉴마다 `products.brand_menu_locks_snapshot = buildLocksSnapshot(menu)`(where brand_menu_id). 내용 칸(이름·가격 등) 무접촉. export 추가 | 범위 안 |
| `routes/brand-menus.js` PUT /settings | 저장 전 `prev` 와 비교해 **바뀐 잠금 칸만** 적용(메뉴별로 따로 둔 다른 칸 보존) · `apply_locks_to_all=true` 면 5칸 모두 · 응답 `locks_applied` | 범위 안 |
| `routes/brand-menus.js` PUT /:id/scope | `setBrandMenuScope` **앞** `isBrandPushFrozen` → 409 (직전 판정 §2-5 후속 ①) | 범위 안 — 직전 판정에서 지시한 바로 그 1줄 |
| `scripts/health-check.js` | pos 1건(브랜드 17 · ZZ-HC 외 메뉴 있으면 건너뜀 · finally 로 menu_settings 원복+정리) | 범위 안 |
| `BrandMenusPage.tsx` + brand.json 4언어 | 잠금 카드 문구 교체(«켜면 모든 메뉴·매장에 바로 적용 · 메뉴 하나는 수정 창에서») · «Apply these locks to all menus now» 버튼(ThemedButton outline) · 결과 문구 · 키 4개 | 범위 안 |
| 🔒 인쇄/KDS 보호파일 | 접촉 0 (print-guard 8/8 — Fable 실행) | — |

워킹트리의 다른 파일(인보이스·구독·프린터 안내·마케팅 추적·server.js 등 50개)은 다른 방 작업 — 이 판정 범위 밖. `check-sensitive-diff` «대상(⑤ server.js · 안전망 4)» 은 트리 전체 기준이고 이 변경 파일은 health-check(안전망 — 근거: 새 계약 1건 추가)만 해당.

## 2. 설계 대조 — 팀원 판단 «메뉴 순서 잠금과 같은 방식» 승인, 그리고 Fable 이 따로 본 4가지
1. **같은 방식 맞다.** `enforce_menu_order` 가 이미 «저장 시 브랜드 전 메뉴 lock_sort_order 일괄» 이었고, 이번은 나머지 5칸을 같은 단일 source 원칙으로 맞춘 것. 새 목록·새 경로 없음(TRADE_STRUCTURE 무관).
2. **「바뀐 칸만」이 맞다.** 전 칸을 매번 덮으면 메뉴 수정 창에서 따로 둔 잠금이 설정 저장(다른 칸 자동저장)마다 사라진다. 비교 기준이 `mergeMenuSettings(storedPrev)` 라 저장값 null 이어도 안전. 화면은 GET 으로 받은 **전체 merged 객체**를 `settingsRef` 로 보내므로(2개 PUT 호출 모두) default_locks 가 빠져 전부 false 로 읽히는 길 없음 — 다른 화면에서 이 PUT 을 부르는 곳 0(grep).
3. **매장 범위가 맞다.** `Product.update where brand_menu_id` — 매장이 스스로 끊은 상품(link_status null)과 브랜드에서 삭제된 상품(unlinked) 모두 `brand_menu_id=null` 로 두므로(`softUnlink`·restaurant-brand-menus 205) 독립 상품은 안 잠긴다.
4. **frozen 순서가 맞다.** 브랜드 쪽 lock_* 은 바뀌고 매장 표만 안 쓴다 = 직전 설계 1-b(«브랜드 편집은 막지 않고 매장 표 쓰기 0»)와 동일. 풀고 난 뒤 매장에 맞추려면 「Apply to all now」 1번(Push All 은 잠금 칸을 비교하지 않음 — 아래 §5).

## 3. 숫자 — Fable 직접 실행 / 팀원 실측
- **health-check `--category=pos` 68/68 통과(Fable 재실행)** — 새 1건(켬 → 메뉴 lock 1·매장 snapshot true·RA 이름 수정 400 · 끔 → 200 · frozen+apply → frozen:true·snapshot 전후 동일 · frozen scope PUT 409·scope_mode 그대로) 포함. 시험 뒤 dev DB: 브랜드 17 ZZ-HC 메뉴 0 · 매장 38 'ZZ-HC locks' 상품 0 · 브랜드 17 menu_settings 원복(잠금 전부 false · push_frozen 키 없음 — 직전 판정과 같은 상태).
- `check-print-guard` 8/8 변경 없음 · `check-design-guard` 신규 0(299/기준 295 — 기존 부채) · `check-migration-registry` ✓ · `i18n:verify` Errors 0 (모두 Fable 실행).
- 팀원 실측(그대로 옮김): 고장주입 — 적용 호출 막음(`if false`) → 새 테스트 실패(매장 수정 200) → 원복 통과 ✓(반증 요건 충족 — Fable 재실행 안 함). health-check 전체 중 브랜드 grep 통과 · 빌드 1회 성공 · page-sweep(RA·BG) 82/82 · 실브라우저 버튼 보임·결과 문구·폰폭 넘침 0·pageerror 0·설정 원복 일치. 잔재 감시 «고아청구서 0→4» 는 발주·청구서 쪽(다른 방 미커밋) — 이 변경은 청구서·발주 무접촉.

## 4. 배포 안전성 · 롤백
- 마이그 0 · SW bump 없음 · 스키마 변경 0. 배포 자체는 운영 데이터를 **한 줄도 바꾸지 않는다** — 잠금 적용은 브랜드 관리자가 설정 PUT 을 칠 때만 일어난다.
- 운영 반영 뒤 할 일(팀원 보고 그대로): 브랜드 13 설정 화면에서 «Apply these locks to all menus now» 1번(또는 잠금 스위치 다시 저장) → brand_menus 39개 lock_name/price/category = 1 · 매장 28 상품 39개 snapshot 이름·가격·카테고리 true → 매장 28 이 그 칸을 바꾸면 400. 내용(이름·가격 값) 은 안 바뀐다. IPC 브랜드 2 는 push_frozen → 매장 8 무접촉(설계대로).
- 롤백 = 설정 스위치 끄기(같은 길로 lock 0·snapshot false — 코드 변경 없이). 코드 롤백 = git.

## 5. 남는 것 (배포 막지 않음)
- 「Apply to all」 결과 문구가 frozen 때 «N menus and 0 store menus» 로만 나와 «멈춤이라 매장은 안 바뀜» 을 말하지 않는다 — 다음 화면 손질 때 `locks_applied.frozen` 이면 문구 한 줄 분기.
- 직전 판정 §5 둘째(health-check ① 카테고리 재푸시 1줄)는 아직 그대로.
