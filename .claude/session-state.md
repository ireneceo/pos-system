# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-11
**버전:** v3.54 운영 (※ 버그수정/표시방법이라 버전 미상승 — backstage 규칙)
**작업 상태:** 배포됨, 실프린터 확인 대기

### 진행 중인 작업
- **🔒 통합 오더티켓 POS별 토글 4건 수정 — 운영 배포됨(2026-06-11, Backup 20260611_085310, SW 3.56). 실프린터 눈확인 + --bless 대기.**
  - 매장(r24=The Fire, 스테이션 KQ1/KQ2/BARPR, Main POS 토글 OFF + POS 2 토글 ON) 4증상:
    ① Main POS 토글 OFF인데 통합티켓 나옴 → 잔류 `mirrorToBillPrinter` 레거시 폴백이 현재기기 빌프린터(CASHIER) 강제추가가 원인. **POS별 토글 채택 매장은 레거시 폴백 무시** 가드.
    ② 라벨이 둘 다 "COUNTER" → **워크스테이션 이름(POS 2 등)** 으로. (하드코딩 COUNTER 폐기)
    ③ 취소가 POS 2(토글 ON)에 안 나옴 → 취소 경로가 새 `__unifiedTargets`(POS별 토글) 미사용, 옛 `mirrorToBillPrinter`만 썼음. **취소 카운터 미러를 새주문과 동일 로직으로 통일.**
    ④ 취소 시 Main POS 출력 + 라벨 없음(전체취소)/BARPR(아이템취소) → 위 통일로 Main POS 제외 + 라벨 워크스테이션명 통일.
  - 구현: `billPrint.js` 에 `computeUnifiedTicketTargets`/`sendUnifiedTickets` 공용 헬퍼 신설 → 새주문(`printKitchenTicketViaRawBT`)·아이템취소(`printCancellationTicket`)·전체취소(`printCancellationTicketsByStation`) 3경로가 단일 규칙 공유. 스테이션 라우팅/주방 발행/claim·dedup/poller/POSTerminal/KDS 무접촉(print-guard로 billPrint.js만 변경 확인).
  - 검증: state-hydration 0 / 타임존 신규0 / 빌드 exit0 / Autoprint 44/44 / 인쇄계약 7/7(티켓1번·동시claim dedup·+Round·금액·익명401) / health 100/101(무결성만 의도된 변경) / **r24 실설정 라우팅·라벨 시뮬 5/5** / critical 9페이지 mount ALL CLEAN. 배포 안전게이트는 `--skip-safety`(무결성만 막힘, 회귀는 수동 100/101 확인).
  - **다음**: Irene 실프린터 눈확인(POS2만 통합티켓 라벨 "POS 2", Main POS 없음 — 새주문·아이템취소·전체취소) → 확인 시 `cd /var/www/dev-backend && node scripts/check-print-guard.js --bless`.
  - **별건 인프라**: bare `/sw.js` 를 CF가 6/3자 immutable 1년 캐시(HIT)로 옛 3.46 서빙 중. origin no-cache(6/10)는 됐으나 CF 엣지 옛 엔트리 미퍼지 → SW_VERSION bump 캐시갱신 장치가 CF에 무력화. 이번 fix는 번들 해시명+index DYNAMIC 신선이라 무영향. **근본해결=CF /sw.js 1회 퍼지 + cache-bypass 페이지룰(CF 대시보드 필요, Irene).** [[reference_sw_version_stale_bundle]]

### 완료된 작업 (이번 세션, 2026-06-10 — 운영 배포 3회: Backup 071746/084756/105904)
- **인쇄① 새주문 2장→1장**: 두 폴러에 원자적 `/print-claim` + 실패 시 `/print-rearm`. SW 3.55 bump.
- **인쇄② 통합티켓 POS행 토글**: "MASTER" 자유입력 폐기 → 각 워크스테이션 행에 "Print full order ticket here" 토글. 별도 카드+중복 mirrorToBillPrinter 체크박스 제거. (모델 consolidatedTicket 보존 + billPrint __unifiedTargets 루프)
- **구독 시작일/트라이얼**: /검증이 실버그 발견 — create 핸들러가 `req.body.subscriptionStart`(camel)만 읽어 프론트의 snake 미수신→trial 무동작. create/put에 snake 폴백. 검증 9/9. ([[project_thefire_billing_trial_fix]] 완료)
- **nginx sw.js no-cache**: 운영 nginx가 sw.js까지 immutable 1년→CF 옛 SW 캐시(만성 stale-bundle 뿌리). `location = /sw.js` no-cache 추가. ([[reference_sw_version_stale_bundle]])
- **이메일 로고 ? 수정**: notificationService 첨부로직이 branding 수신자에 cid:purplehere-logo 미첨부 → "html이 cid 참조하면 branding 무관 항상 첨부". ([[reference_email_send_guard]])
- **직원 버그리포트 5건 검토**: FG-1(등록불가)=부정확(foodcourt 자동도출로 등록됨), BG-1(Admin레스토랑필수)=설계상정상. 진짜버그 수정: BG-2(멀티브랜드 레시피 brand_id 누락→생성400, ProductRecipesTab payload에 추가), FG-2(Tenancy Archive→Active 뷰리셋, setTab view강제 제거), FG-3(인벤토리 헤더 1024~1280 반응형, ≤1280 카드모드).
- **WorkstationChip**: 단일POS(워크스테이션≤1)에도 칩 항상 떠 모바일 헤더 밀림 → `<=1` 숨김 + 모바일 컴팩트.
- **모바일 인기/Featured 탭 디폴트**: 첫탭인데 둘째탭 선택되던 레이스(featuredLoaded 플래그).
- **POS #2 현금박스**: 결제수단 무관 열리던 것 → billPrint 단일게이트로 현금결제에만. 라벨 변경.
- **POS #3 필수옵션**: 카드클릭 바로담겨 필수옵션 무시 → 필수옵션 있으면 카드클릭=옵션모달+미선택 주문차단. (useMenu optionGroups로 판별, end-to-end 검증)
- **이메일 인증 검토**: 변경→재인증·미인증 알림차단·추가시 인증메일 다 이미 구현 확인 (변경 불필요).

### 다음 확정 작업
- **🔒 POS 직접결제 빌 복사 매수 미반영 (2026-06-10 Irene 보고)**: 레스토랑 프린터 설정의 빌 복사 매수(예: 2장)가 **POS Terminal "결제하기" 직접 결제 경로에서만 무시됨** — 자동 1장만 나오고 매수 설정이 안 먹힘. **PayLater + Floor Plan 결제는 정상**(설정대로 2장 출력). → POS 직접 인쇄 블록(`POSTerminalPage.tsx` 직접 인쇄)이 빌 복사 매수 설정을 안 읽고 1장 고정인 듯. PayLater/FloorPlan 경로(poller/billPrint 복사 루프)와 대조해 동일하게. 🔒 보호 파일(billPrint.js `printBillViaRawBT`/`sendHTMLViaQZTray`, POSTerminalPage 직접인쇄) → **Irene 승인 받음 + 한 번에 하나 + 실프린터 매수 눈확인 필수**. ([[feedback_print_code_caution]] [[reference_kitchen_print_pipeline]])
- **gitconsulting/with MIN 발주 데모 Phase 2 (운영 시딩)**: dev 검증 14/14 완료(BG#6/brand4/rest10에 Packaging+ingredient매핑→발주→Trade Invoice→결제+전상태). 운영용=BG23/brand1(with MIN)/rest10/SELLER_USER=23 native + 기존 Packaging(cat11,20제품) 매핑으로 조정 필요. **Irene "운영 실행" 지시 대기.** 스크립트는 삭제됨(세션-state 참고로 재작성).

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **매장 물리 확인 대기**(배포 후만 가능): 인쇄①(새주문 station당1장+카운터1장) / 인쇄②(POS행 토글→해당프린터 통합티켓) / #2 현금박스(카드→안열림/현금→열림) — Irene 눈으로 실프린터·드로어 확인.
- 모바일 고객 UI/UX 전체 심층 감사(탭 버그만 처리, 나머지 보류).
- 현금결제 보강: 권종별 시재입력, 마감 현금 대조.
- 첫 유료 멀티지점 하드닝 Phase 2 Wave B(브랜드 Advanced 게이팅) / Phase 4 전파.
- 통합티켓 dead code 정리(consolidated-print route/useConsolidatedTicketPoller/consolidatedTicket.ts/migrate).

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
