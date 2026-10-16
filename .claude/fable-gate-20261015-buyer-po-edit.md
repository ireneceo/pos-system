# Fable gate 판정 — 발주 뒤 매장 쪽 품목 수정 (buyer-po-edit) · 2026-10-15

> 설계: `.claude/fable-design-20261015-buyer-po-edit.md` · 사실 전달: `~/.claude/jobs/736a78f9/tmp/fable-gate-brief.md`
> 판정 종류: `gate`(돈 약속(발주 총액)을 바꾸는 경로 · 오너 승인 상태 전이 · 보안 경계 `buyerScope.js` 접촉)

## 판정: **PASS** (운영 반영은 다음 배포 때 · 아래 «지시» 는 배포를 막지 않는다)

## 1. diff 범위 대조 — 설계 밖 변경 0
| 설계 절 | 구현 | 대조 |
|---|---|---|
| §3-1·3-2 판정 단일 소스 | `utils/poAmend.js` `buyerAmendableStatuses`·`buyerAmendBlock`(6조건 순서·코드·http 설계와 동일) | ✅ |
| §3-3 줄 규격·단가 서버 채움·MOQ·판매중지·금액식·이력 | `routes/purchase-orders-amend.js` — `mappingUsableBy`→`carriedOptionsFor`/`resolveLineOptions`→`buildAmendedLine`→`assertLinesMeetMinOrder`·`assertLinesSellerProductActive`→`computeTotalsWithDelivery`→`diffLines`→`'amended'+by_buyer` | ✅ (B2 가 `unit_price:0.01` 을 보내도 10 으로 저장됨 = 요청 단가 무시 증명) |
| §3-4 승인 게이트 | `utils/poOwnerApproval.applyBuyerAmendGate` — 설계 코드와 동일, `edited_by_buyer`·`status_before` | ✅ |
| §4-1 새 파일·barrel·`stock_name` | 새 파일 + `purchase-orders.js` 1줄 + `listAmendableProducts` 출력 1칸 | ✅ |
| §4-2 상세 GET 두 칸 | `crud.js` `can_amend`·`amend_blocked` 같은 함수 호출 | ✅ (실호출: PO-R38-20261015-003 `can_amend:true, amend_blocked:null`) |
| §4-3 `OWNER_ACTING_ROUTES` | POST amend 1줄 | ✅ |
| §5-1·5-2 화면 | 버튼 2곳(`!ownerView`/`ownerView`) · `EditPoItemsModal.tsx` · 상단 박스 문구 분기 · 오너 큐 «Edited» 배지 | ✅ |
| §6 통지 | `fireSellerAmendedByBuyerNotification` · 승인 대기면 `fireOwnerApprovalPendingNotification` · `emitPoEvent('seller-order-updated')`(판매자 룸은 서비스가 봉인) | ✅ |
| §7 i18n | 4언어 키 동일(editItems 19 · error 8 · amendedByBuyer/Owner · editedBadge · actions.editItems) · `i18n:verify` Errors 0 | ✅ |
| §8 PUT 무변경·Staging 무변경·마이그 없음 · 문서 한 단락 | 확인 | ✅ |

**설계와 다른 점 6건 — 전부 수용:** ①외부 상품 option_ids → `OPTION_INVALID`(거부라는 계약은 같다) ②`payment_status` ENUM 실측(unpaid·paid·refunded) → 'paid' 만 — 설계가 «읽고 맞출 것» 이라 했다 ③`minOrderRulesByMapping` 분리 — 검사와 화면 미리 채우기가 같은 규칙(feedback_check_and_fix_same_sql), M1~M3 그대로 통과 ④메일 HTML 이스케이프 — 더 안전 ⑤모달 파일 분리 — 800줄 기준 ⑥역할 가드 이중(crud 라우터 머리 + 새 라우터 머리) — 더 강함.

## 2. 가드 스크립트
- `check-print-guard.js` 8/8 변경 없음 (인쇄·KDS 무접촉) ✅
- `check-sensitive-diff.js` → ②돈·주문 ⑤보안 경계(`buyerScope.js`) 로 **FABLE 게이트 대상** — 이 판정이 그 게이트 ✅
- `i18n:verify` Errors 0 ✅ · 팀원 보고: design-guard 신규 0 · 타입 기준선 통과 · 번들 신선도 통과(개발 번들에 `amendable-products` 포함 — 제가 grep 으로 확인)

## 3. 실호출·회귀 (Fable 직접 실행)
- `health-check --category=po`: **B1~B10 통과** (po 묶음 8/12 — 실패 4 = 수령 테스트 정리 단계 `stock_alerts` FK, 이 변경과 무관·이전부터)
- **고장주입(Fable 반증 1회)**: `buyerAmendableStatuses` 에 `'confirmed'` 추가 → B3 가 `200 undefined` 로 **실패** → 원복(cmp 일치) → pm2 재시작 → B1~B10 다시 통과. 검사가 살아 있다.
- 팀원 고장주입 4건(수령 가드·승인 게이트·OWNER 경로·역할 가드) 보고 수용 — 셋째·넷째 «반증 완료».
- 실호출 PO-R38-20261015-003(데모 38, 팀원 실브라우저 수정분): `status:submitted` · 마지막 이벤트 `amended by_buyer:true` · `total_before 360 → total_after 220` · `changes [changed, added]` · 후보 GET `can_amend:true` 후보 5.

## 4. 배포 안전성
- DB 스키마·마이그 없음 · SW bump 는 팀원 몫(프론트 변경 있음 — 다음 배포 때 올린다) · 롤백 = 코드만.
- 판매자 봉인(`SELLER_HIDDEN` 3지점)·승인 라우트 무변경 — 재승인 흐름이 기존 approve 로 끝남(B6 증명).

## 5. 지시 (배포를 막지 않음 — 다음 정리 때)
1. **오너 본인 판정 두 곳이 다르다** — GET `approval_required_on_edit` 와 `'amended'` 이벤트 `by_owner` 는 `req.buyerIsOwnerView`(= `?entity_type` 로 전환한 오너) 를 보고, 실제 게이트 `applyBuyerAmendGate` 는 `resolveOwnerRestaurantIds(actor)` 를 본다. `restaurant_id` 가 박힌 단일 매장 오너가 전환 없이 부르면 화면은 «승인 대기로 들어간다» 고 알리고 서버는 생략한다. 같은 판정 함수 하나로 모을 것(§4-1 «오너 본인 판정» 을 게이트와 같은 ownership 조회로). 지금 화면 경로(`withOwnerPoScope`)는 전환을 붙이므로 실사용 영향은 없다.
2. po 묶음 실패 4건(`stock_alerts` FK 정리)은 이 일이 아니다 — 수령 테스트 정리에 `stock_alerts` 삭제 줄 추가는 따로 한 건으로.
3. 확인 못 한 것 그대로 보고에 남길 것: 오너 승인 화면 «Edited» 배지 실브라우저(데모 38 오너 없음 — API B5 로만) · 판매자 통지 메일 실수신.

## 6. Irene 질문 Q1 — 권고 유지
**(가) 허용** 그대로. 판매자가 아직 약속하지 않은 구간이고, 판매자 amend 가 `confirmed` 까지 허용하는 것과 균형. (나)면 `buyerAmendableStatuses` 한 줄.

— Fable 2026-10-15
