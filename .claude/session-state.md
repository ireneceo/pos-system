# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-13 21:xx (임시저장 — 업무 종료, 이따 재개)
**버전:** v3.56 코드 운영 배포 완료(삭제/취소 PIN 게이트). **CHANGELOG/버전표기/릴리즈공지 미완** — 공지 수신자 문제 때문에 보류.
**작업 상태:** 중단 (이어서 재개 예정)

---

## ⚡ 빠른 재개 (새 세션에서 이것만 붙여넣기)
```
session-state.md 읽고 이어서 개발해.
```

---

## 🔖 지금 중단 지점

**마지막 작업:** v3.56(삭제/취소 PIN 게이트) 운영 배포 완료 + SW 3.63 재배포. 이후 Irene 질문("공지가 thefire에 안 감")으로 **공지 수신자 시스템 진단** 수행.

**바로 다음 작업 (Irene 지시 — 최우선):**
1. **고객 trial 과 test 를 분리한다. 트라이얼(체험) 고객은 공지를 받아야 한다.** 현재 `is_test` 하나로 뭉뚱그려 트라이얼 실고객(The Fire 등)이 공지에서 제외됨 → 잘못. trial 고객 = 실고객이므로 공지 수신 대상.
2. 그 위에서 v3.56 릴리즈 공지/블로그 발송 (현재 미발송).

**맥락 유지할 것 (이번 진단 결과 — 운영 실데이터):**
- **공지 수신자 로직**(`scripts/create-release-post.js`): `is_demo=false AND is_test=false` 매장 전체 + 역할유저(SysAdmin/Brand/Foodcourt/Owner)에게 NoticeRecipient 생성. target_type='all'.
- **운영 실태**: 전체 21매장 중 is_test=true 10, is_demo=true 9 → **공지 수신대상 단 2매장 + 2유저**. v3.51~54 공지 총수신 4명. 사실상 공지가 거의 아무에게도 안 감.
- **The Fire(실 유료/트라이얼 고객) 전부 is_test=true** (user#29 thefire/BG, #32 thefire01/RA rid16, #50 thefire02/rid24, #51 thefire03/rid25, rest#5/16/24/25) → 릴리즈 공지 0건 수신.
- **is_test 영향 범위**: 공지뿐 아니라 invoiceScheduler/subscriptionScheduler(청구)도. → trial/test 분리 시 청구 로직 영향 점검 필수.
- **is_test=true & is_demo=false 매장 10개**: The Fire×4(r5/16/24/25=실고객) + lua_test/lualua(진짜테스트) + Korean noodle/Seoul Table Kitchen/K-Bowl House/Bamboo Garden Café(분류 필요).
- **시스템문의 자동글 정체**: `routes/qz-tray.js:382` 가 프린터 진단 시 자동 SupportTicket 생성(customerId=POS유저) → 매장 본인 시스템문의에 `[QZ Tray] printing diagnostic...` 뜸(직원이 쓴 거 아님). thefire01 8건, 전체 169 technical 중 다수. (별도 처리 보류 — 매장 목록 숨기고 SysAdmin만 보게 할지 결정 대기)
- 미해결 질문(내가 AskUserQuestion 띄웠다 reject됨): trial/test 분리 방식 + v3.56 공지 시점 + QZ 티켓 가시성.

### 진행 중인 작업
- **고객 trial/test 분리 + 트라이얼 고객 공지 수신 보장** (Irene 지시, 다음 세션 최우선). 설계→구현 필요.

### 완료된 작업 (2026-06-13 저녁) — 삭제/취소 PIN 손실방지 게이트 (DEV 미배포)
설계 `docs/VOID_PIN_GATE_DESIGN.md` 전체 구현. 예방(PIN 게이트) + 추적(사장 감시 리포트) 두 축.
- **백엔드**: `utils/voidPinGuard.js`(신규 enforceVoidPin) / `routes/orders-crud.js` 🔒 DELETE items·PATCH status(cancelled) 진입부 PIN 재검증 + audit metadata(금액·결제상태·결제수단·승인자) — **인쇄 파이프라인 0 접촉**(git diff 증명) / `routes/order-audit.js`(신규 Void&Cancel Log 조회, Owner/Admin 전용, server.js 마운트) / `staff.js` verify-pin-permission 은 이미 제네릭(void_authorize 분기 불필요) — audit 라벨만 권한별 구분.
- **프론트**: `components/POSTerminal/VoidPinModal.tsx`(신규, DiscountPinModal 복제 onApproved=(by,pin)) / LiveOrders·FloorPlan TableDetailPanel 삭제/취소 전 토글 게이트(perform*+handle* 분리) / SettingsPage operation 토글(할인 PIN 옆) / StaffManagement AuthorizationsPicker(void_authorize) / ReportsPage 'Void & Cancel Log' 탭(현금완료 빨강, Owner/Admin) + MainLayout 사이드바.
- **🐞 보너스 버그수정**: `requirePinForDiscount` 가 settingsGuard 화이트리스트 누락으로 저장 시 stripped 되던 잠복 버그 발견 → requireVoidPin 과 함께 등록.
- **검증**: 빌드(내 파일 0경고) + 실API 16/16(7시나리오 전부) + health 100/101(실패1=의도된 print-guard 무결성, 인쇄계약 8/8 통과) + i18n verify 0 errors(4언어) + Playwright mount 7/7 clean.
- **🔒 print-guard**: orders-crud.js + MainLayout.tsx 플래그(둘 다 인쇄코드 무접촉 증명). **배포 후 실프린터 확인 → `check-print-guard.js --bless`**(설계 §4.4).

### 완료된 작업 (이번 세션 2026-06-13)
- **백로그 stale 정정** — 구독 트라이얼 프론트(이미 완료·배포), 설정 anti-wipe 가드(이미 완료, 기능테스트 13/13 + 실API 5/5) 재확인. 메모리/백로그 "미완/보류" 표기가 stale 이라 정정.
- **운영 데이터: thefire02(r24) 닭갈비라면 스테이션** — product 650 개별배정 KQ2 제거(NULL) → Ramyun&Noddle 카테고리 KQ1 추종(다른 라면과 동일). 버그 아님(개별>카테고리 우선순위 정상). 백업 `/tmp/dakgalbi-ramyun-station-backup-2026-06-13.json`. enrich 검증 KQ1.
- **운영 데이터: thefire 본사 BG(user29) 7/1 정렬** — status suspended→trial, 시작 8/1→7/1, trial_end→6/30, 인보이스 RM499 기간 7/1 재발행. 백업 `/tmp/user29-billing-backup-2026-06-13.json`. (정지 원인=연체 아님, 6/9 사고때 레스토랑만 고치고 BG 누락 잔여데이터)
- **🐞 DEV(미배포): BG 구독 미래시작 강제 trial** — `users.js` PUT 수정경로가 status 명시 시 trial 파생 안 하던 갭(user29 drift 원인) → 레스토랑·생성경로처럼 강제. 실API 6/6 + print-guard 8/8 + health 101/101.
- **DEV(미배포, 🔒): pending-print is_deleted 필터** — `orders-crud.js` 인쇄 대기열이 삭제주문 안 거르던 엣지 → `is_deleted:false`(유령티켓 차단). 인쇄방식 무변경. 실API 3/3 + 인쇄계약 7/7. **배포후 실프린터 확인+bless 필요.**
- **기획설계 2건** (구현 미착수, 아래 다음 확정 작업).

### ✅ 운영 배포 완료 (2026-06-13 저녁) — 삭제/취소 PIN 게이트 + 미배포분 동반 배포
- `deploy-to-production.sh --auto` exit 0 + 운영 직접검증: 헬스 200(production)/order-audit 라우트 401/프론트 번들 void-log 포함.
- print-guard bless 완료(Irene 승인, 인쇄코드 무접촉+주문회귀0 검증 후). 설정 토글 위치=Operations 탭 "Manager PIN Approvals" 카드(할인PIN과 묶음).
- 동반 배포된 기존 미배포분: `users.js` BG 미래시작 강제 trial, `orders-crud.js` pending-print is_deleted 필터.
- **배포 후 Irene 실프린터 sanity**: 취소/아이템삭제 시 취소표 종이 1장 정상 출력(인쇄 동작 무변경이라 기존과 동일해야).
- 버전 상승 여부 Irene 답변 대기.

### 다음 확정 작업 (Irene 지시)
1. **고객 trial/test 분리 + 트라이얼 고객 공지 수신 보장** (2026-06-13 Irene 지시, 최우선). 현재 is_test 하나로 묶여 트라이얼 실고객이 공지 제외됨 → trial≠test 분리. 위 "중단 지점" 진단결과 참조. 청구 스케줄러 영향 점검 필수.
2. v3.56 릴리즈 공지/블로그 발송 (위 1 해결 후). + CHANGELOG [Unreleased]→[v3.56] 이동 + 버전표기.
3. ~~삭제/취소 PIN 게이트~~ ✅ 완료·배포(v3.56).
4. (후보) 브랜드메뉴 레스토랑 적용범위 — `docs/BRAND_MENU_SYSTEM.md` §14. scope_mode + Product.brand_scope_active. 활성(RA)·범위(BG) 분리.

### 배포 후 잔여 확인 (Irene)
- 실프린터 sanity: 취소/아이템삭제 시 취소표 1장 정상(인쇄 무변경이라 기존 동일해야).
- Cloudflare Custom Purge `https://purplehere.com/sw.js` 필요 — 안 하면 SW 3.63 매장 미도달(운영 sw.js 현재 3.46 캐시 서빙).

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **Irene 매장 확인(내일)**: ①통합티켓 필터+스테이션 범위 실프린터 ②닭갈비라면 KQ1 동반출력 ③(배포 시) pending-print 삭제주문 안 찍힘
- **Irene 직접 작업**: Cloudflare sw.js 퍼지 / BG 브랜드메뉴 이미지 17건 재업로드(원본 소실)
- **미결정**: r16(thefire01)도 닭갈비라면=KQ2(다른라면 KQ1) 동일 패턴 — thefire02만 고침, r16도 정리할지 Irene 지시 대기
- hydration marker(설정가드 1% 추가안전, 클라 변경) — Irene 결정사항, 서버가드만으로 99% 차단되어 보류 정당
- KDS acceptVersion echo 레이스 관찰 시 OrdersRealtimeProvider Phase 4 (설계문서 §3)
- gitconsulting/with MIN 발주 데모 Phase 2 (운영 시딩, Irene "운영 실행" 지시 대기)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
