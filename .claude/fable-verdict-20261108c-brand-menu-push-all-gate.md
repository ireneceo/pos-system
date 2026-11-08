# Fable 게이트 판정 2026-11-08c — 브랜드 메뉴 «푸시 = 브랜드 그대로» · 삭제 표시 · IPC 보호(push_frozen)

판정: **PASS** (운영 배포 가능 · 마이그 1 = brands 1행 설정 칸 · SW 그대로)
설계: `.claude/fable-design-20261108c-brand-menu-push-all.md` §3·§6·§7. 작성: Fable(리더). 운영 쓰기 0.

## 1. diff 범위 대조 (§3 안인지) — 원본 사본(`~/.claude/jobs/c532c504/tmp/*.orig.*`) 대비 직접 읽음
| 파일 | 설계 항목 | 판정 |
|---|---|---|
| `services/brandMenuSyncService.js` | 결정 1(갱신 4칸 잠금 무관 · 사진/카테고리는 브랜드 값 있을 때만) · 1-b(`isBrandPushFrozen`/`assertBrandPushAllowed` 한 곳 + sync·applyScope·markPending·bump·softUnlink 5함수) · 2(softUnlink `is_active:false`, `brand_scope_active` 무접촉) · 3(`brand_scope_active = brandMenu.is_active!==false` · 꺼진 메뉴 생성 스킵 `skipped:'inactive'` · pushed 에 안 셈) · 머리 주석 교체 | 범위 안 |
| `services/brandMenuBulkPush.js` | 결정 4(이름·가격·사진(브랜드 있을 때)·카테고리 이름 비교 — Category 행 생성 0, 묶음 칸이면 차이로 안 셈 · 가시성) · `changes[].fields` · frozen 이면 계획 0 | 범위 안 |
| `routes/brand-menus.js` | `push_frozen` 기본값/merge · DELETE 409 · push/push-pending/scope 409 전달 · create/update reconcile 의 frozen 은 `{frozen:true}` 로 삼킴(브랜드 편집은 성공) | 범위 안 |
| `routes/restaurant-brand-menus.js` | `/unlinked/:productId/keep`(authenticateToken + checkRestaurantAccess 수동 · where 에 restaurant_id·unlinked·brand_menu_id null) · sync/sync-all 409 · updates 에 `push_frozen` | 범위 안 |
| `scripts/migrate-brand-menu-push-frozen-ipc.js` + registry `deploy` | brands.id=2 ∧ name='K-DINE with MIN' ∧ 칸 없을 때만 true · 멱등 · 없으면 exit 0 | 범위 안 |
| `scripts/health-check.js` | §6 ①~⑤ 5건(pos) | 범위 안 |
| 프론트 3 + i18n 4언어 | 토글·띠·버튼 비활성·Push All 차이 목록 · RA 꼬리표+Keep · Updates 문구+409 | 범위 안 |
| 🔒 인쇄/KDS 보호파일 | 접촉 0 (print-guard 8/8 변경 없음 — Fable 실행) | — |

워킹트리의 다른 파일(인보이스·구독·프린터 안내·마케팅 추적·server.js 등)은 다른 방 작업 — 이 판정 범위 밖. `check-sensitive-diff` 가 «대상(②③⑤)» 인 것은 트리 전체 기준.

## 2. 팀원이 설계와 다르게/추가로 한 6건 — 판정
1. 매장 스스로 «연결 끊기» → `link_status=null`(기존 'unlinked'): **승인.** 'unlinked' 는 «브랜드에서 삭제됨» 꼬리표 전용이어야 Keep/꼬리표 의미가 선다. updates/sync-all 의 `=== 'unlinked'` 건너뛰기 줄은 brand_menu_id 로 찾기 때문에 전후 모두 닿지 않는 줄 — 동작 변화 0.
2. 매장 skip-version·unlink 도 frozen 이면 409: **승인.** 둘 다 `products` 를 쓰는 길 — «매장 표 쓰기 0» 규칙과 같은 칸.
3. `bumpMenusUsingOptionGroup` frozen 이면 오류 대신 매장 쓰기 건너뛰고 `{frozen:true}`: **승인.** 브랜드 쪽 편집(version+1)은 막지 않는다는 1-b 와 일치. 풀면 Push All 이 'version' 으로 잡는다.
4. settings PUT 에 `push_frozen` 없으면 저장값 유지: **승인(안전 쪽).**
5. 개별 push·push-pending 라우트 선행 409: **승인.** 단 **scope PUT 은 선행 검사 없음** — `setBrandMenuScope` 가 브랜드 쪽 scope_mode·allowlist 를 커밋한 뒤 `applyScopeToBrandMenu` 에서 409 → 응답은 «멈춤» 인데 브랜드 범위는 저장돼 있음. 매장 표는 무접촉(⑤ 지문 동일로 증명). **배포 막지 않음 — 다음 일에서 scope PUT 앞에 `isBrandPushFrozen` 1줄(지금 고치면 마커가 죽으니 이번엔 그대로).**
6. 마이그 이름 가드: **승인.** 운영 brands.id=2 이름 'K-DINE with MIN' 확인(팀원 운영 읽기).

## 3. §6 숫자 — Fable 직접 실행 / 팀원 실측
- **health-check `--category=pos` 67/67 통과(Fable 재실행)** — 새 5건 ①②③④⑤ 포함. 시험 뒤 ZZ-HC brand_menus·option_groups 0 · 브랜드 17 menu_settings 에 push_frozen 키 없음(원복됨). (products 의 `ZZ-HC-Q6/P3` 3행은 매장 1 의 옛 다른 검사 잔재 — 이 일 아님.)
- `check-print-guard` 8/8 변경 없음 · `check-design-guard` 신규 0(합계 299/기준 295 — 기존 부채) · `check-migration-registry` ✓ · `i18n:verify` Errors 0 · 마이그 dev 실행 «브랜드 2 없음 — 건너뜀» exit 0 (모두 Fable 실행).
- 팀원 실측(그대로 옮김): 고장주입 — `assertBrandPushAllowed` 호출 주석 + pm2 restart → ⑤ 실패(sync 200·지문 바뀜) → 원복 → 통과 ✓(§6 ⑤ 반증 요건 충족 — Fable 재실행 안 함). 마이그 멱등 — 데모 17 사본으로 1회 켬·2회 «이미 정해짐»·false 유지·타 브랜드 CRC 동일 ✓. verify-all --full 21/24 — 실패 3 = deploy-ready(sw 6.14≠6.15 기록, 이전 안드로이드 작업) · health [invoice-boundary] ⑧⑨(다른 방 인보이스 미커밋) · mount 출력 잘림→page-sweep 단독 82/82 OK. 셋 다 이 일 파일과 무관. 실브라우저 pageerror 0 · 설정 원복.
- 운영 읽기(쓰기 0): «브랜드 메뉴 꺼짐 ∧ 매장 brand_scope_active=1» 0건 → 결정 3 배포 즉시 영향 0 (The Fire 포함). 매장 8 지문 기준 111:266355658210/12:26994044483/28:62844998136. 브랜드 2 menu_settings=null → 마이그 뒤 {push_frozen:true}.

## 4. 배포 안전성 · 롤백
- 마이그 1 = `brands` 1행 JSON 칸 1개(매장 표 무접촉) · `deploy` 등록 · 멱등 · 사람이 false 로 바꾸면 다시 안 켬. 롤백 = 브랜드 메뉴 › Settings «Pause sending to stores» 끄기(코드 변경 없이). 코드 롤백 = git.
- 배포 뒤 읽기(§6 ⑨): 브랜드 2 push_frozen=true · 매장 8 지문 위 기준값과 동일 → 그 뒤 브랜드 13 «Push All Changes»(dry_run 목록 확인) → 브랜드 13↔매장 28 다른 칸 0 · 매장 28 «Removed from brand» 2건 Delete(Irene UI).
- SW bump 없음(화면 변경은 다음 배포 번들에 실림 — 기존 캐시 정책대로).

## 5. 남는 것(배포 막지 않음)
- scope PUT 선행 409(위 2-5).
- health-check ① 는 카테고리 칸 재푸시 덮기를 직접 재지 않음(코드로는 `if (categoryName) updates.category` 단순 분기) — 다음에 ① 에 카테고리 1줄 추가하면 좋다.
