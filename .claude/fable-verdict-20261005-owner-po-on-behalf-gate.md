# Fable 게이트 판정 — 오너 대리 발주 ① 구현 (2026-10-05) — **PASS**

근거 설계: `.claude/fable-verdict-20261004-owner-po-on-behalf.md` §1·§2·§3. Irene 「응」(착수) · 「응」(서버 경계) · 「응.」(승인 게이트 호출부, §1·§2-2·§3 원문 전달 뒤) · 「검증하고다음 말해.」

## 1. diff 범위 대조 (Fable 직접 — `git diff` 전부 읽음) — 설계 외 변경 0
- **§2-1 buyerScope**: 오너 전환 허용을 `OWNER_ACTING_ROUTES` 10개 명시 목록(fail-closed)으로. GET purchase-orders* · POST / · /bulk · /consolidate-drafts · /:id/{refresh-prices,submit,mark-sent-external,cancel} · DELETE /:id · DELETE /:id/items/:itemId. **ownership 확인 코드 무접촉.** 열린 라우트 10개 모두 `checkPOOwnership(po, req)`(전환 매장과 대조) 또는 `req.buyerEntity` where 로 매장 한정 · DELETE 2개·refresh-prices·submit·mark-sent-external 은 라우트가 `draft` 만 허용 — 직접 확인. 외부공급업체·재고·재료 연결·수령·결제·반품·대조는 그대로 403. supplier-catalog 열지 않음.
- **§2-2 applySubmitGate(po,t,append,actor)**: 단일 소스 유지, 분기 1개(`needsApproval && actor` → `resolveOwnerRestaurantIds(actor)` 에 `po.entity_id` 포함이면 생략 + tracking «Submitted by Owner (approval skipped)»). **생략 판정 술어 = 승인자 판정 술어와 동일**(`restaurant_managers.relationship_type='ownership'` + 레거시 Owner restaurant_id) — «승인자가 작성자» 를 정확히 코드로 옮김. 역할 조건 없음은 판정 문구 그대로. 구매자 경로 4곳(submit·bulk auto_submit·mark-sent-external·direct-purchase)만 `req.user` 전달, 판매자 대리추가 무접촉 — 맞다(판매자가 작성자면 승인 생략돼선 안 됨).
- **§2-3 프론트**: App `OwnerToPoHistory` 삭제 + 주석 갱신 · staging 라우트에 Owner 추가 · New PO 매장 선택 먼저(다매장 필수·«전체» 없음·단일 자동, `/api/owner/restaurants` = PO 목록 화면과 같은 소스, `utils/ownerPoScope` 재사용, 공용 SearchableSelect — 새 컴포넌트 없음) · Staging 전 호출 `withOwnerPoScope` · «Receive + pay» 오너 숨김 · 상세 `ownerView` 초안 제출 버튼(같은 handleSubmit, 전환 쿼리). 🔒 MainLayout 무접촉.
- **팀원 판단 수용**: 오너 화면에서 Supplier Catalog 탭·공급처 연결·deep-link connect 숨김 → «오너는 매장이 연결해 둔 품목만 발주». §2-1 «재료 연결 쓰기 그대로 403 · 공급업체 추가는 오너 자기 실체» 와 일치하는 **축소** 방향이라 범위 안. (`/api/restaurants/:id/ingredients/from-catalog` 가 checkRestaurantAccess 라 API 직접 호출은 기존부터 통과 — 이번 변경 아님, 기록만.)
- 마이그 0 · 운영 DB 쓰기 0 · SW 5.83 = `dev-frontend-build/sw.js` 실측 일치(04:47 빌드).

## 2. 기계 게이트
- check-print-guard 8/8 변경 없음(Fable 재실행) · check-sensitive-diff ②(workflow)⑤(buyerScope) 대상 + 안전망 변경 1(health-check — 근거: 신규 영구 케이스 추가 + 기존 «소유 매장 POST 403» 검사가 이 판정으로 거짓이 된 것을 «남의 매장 POST 403» 으로 바꿈) · verify-all --full 24/24(팀원, mount sweep 크래시 0) · design-guard 0 · i18n 4언어 키 3개 일치(Fable grep).
- health-check security **70/70 — Fable 재실행 2회**(주입 전·원복 후).

## 3. 반증
- **Fable 직접**: `applySubmitGate` 의 `if (byOwner) needsApproval = false;` 주석 처리 → pm2 restart → security **1건 실패 검출**(«제출 200/pending_approval 기록 false») → cp 원복 **cmp 동일** → restart → 70/70.
- 팀원 보고: buyerScope `if (!owned) 403` 제거 → security 3건 실패 검출 → cp 원복 cmp 동일. (같은 술어를 10-04 게이트에서 Fable 이 직접 반증했음 — 코드 무접촉.)

## 4. 실브라우저
- e2e `owner-po-on-behalf.spec.js` 3회 연속 통과(팀원): 오너 대시보드 → Operations › Purchase Order → `/pos/purchase-orders` (튕김 없음) → 매장 선택 안내 → 선택 → 카탈로그 탭 없음 → 담기 → Create POs → staging → «Submit for approval»·«Receive + pay» 없음 → 제출 → DB `submitted` + «Submitted by Owner» → 그 매장 RA GET 200. afterAll 삭제. 스펙 본문 Fable 읽음 — 단언이 보고와 일치.

## 5. 확인 불가 (명시)
- 단일매장 오너(자동 선택) 실화면 — dev 에 restaurant_id 박힌 오너 데모 계정 없음. 코드 경로는 `list.length === 1 → setOwnerRid` 한 줄.
- 오너 **상세** 화면 «초안 제출» 실클릭 — e2e 는 staging 경로. 같은 handleSubmit·같은 서버 라우트.
- 운영 help@ 오너 모자에서의 눈 확인 — 배포 뒤 1회(릴리즈 노트 `irene_actions_after_deploy` 그대로).

## 6. 판정
**PASS — 조건 없음.** 배포 가능. 배포 뒤 할 일: §2-4 문서 3곳(`PURCHASE_ORDER_SYSTEM.md` · `RESTAURANT_OWNER_PLAN.md:155` · `SUPPLIER_CONTRACT_SYSTEM.md §H-3`) «오너는 발주를 만들지 않는다(403)» 갱신 · Irene 눈 확인 1회.
기록(사안 바뀐 것 아님): 승인 OFF 매장은 오너 제출에 «Submitted by Owner» 기록이 안 남는다 — 생략한 승인이 없으니 정상.
