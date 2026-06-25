# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-25 10:00, idle 1807s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: orders-crud.js,print-guard.manifest.json common.json,orders.json common.json,orders.json common.json,orders.json common.json,orders.json sw.js,MainLayout.tsx
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-25
**버전:** v3.62 + 백스테이지(프린터설정 wipe 방지 운영배포, 버전 미상승 — backstage). 스키마 dev=운영 일치.
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (2026-06-25)
- **소켓 즉시화 + 백로그 컷오프 빈틈 수리 — 운영배포(Backup 20260625_075239, Smoke 9/9, SW 4.12)**: ① 전체화면 폴러(useAutoPrintPoller)에 order-created 소켓 트리거 추가(MainLayout엔 6/24 이미 있던 것) → POS/KDS/플로어 화면의 인쇄 전담 기기도 다른기기·모바일 주문을 5초 안 기다리고 즉시 인쇄(폴링=안전망 유지, claim=중복방지). ② 백로그 컷오프(_anyAutoNow)를 스테이션 OR가 아니라 **실제 인쇄 게이트(마스터 enabled&&autoPrint)와 동일 기준**으로 수정 → 마스터 off→on 시 옛 백로그 우르르 인쇄(오늘 아침 폭주) 방지. 두 폴러(useAutoPrintPoller+MainLayout._printPollFn) 일괄. **print-guard bless(정식)**. 검증: build·autoprint-regression44·health107·hydration0·POS/KDS/플로어 mount 크래시0. **실프린터 확인=Irene 매장 테스트 1회**. (폭주 원인=아침 마스터OFF로 needs_print 누적→복구시 flush. 현재 needs_print 0.)
- **thefire 무인쇄 사고 근본수리 — 운영배포(Backup 20260625_072026, Smoke 9/9)**: 원인=설정 미로드 자동저장이 kitchenPrinter 마스터를 OFF로 덮음(wipe값=SettingsPage 초기기본값 8필드 일치, DB덤프로 6/24→6/25 flip 증명). 자물쇠①프론트 로드가드 ②settingsGuard 미로드보존 ③store.js RA전용(비상모드 직원예외)+안내문구(4언어)+회귀테스트(tests/settings-guard.test.js 5/5). **인쇄 핵심파일 무변경(print-guard 8/8)**. 운영 thefire 마스터 DB 복구(enabled/autoPrint=true). 상세=[[project_printer_settings_wipe_locks]].
- **운영 디스크 정리**: 83%→21%(배포백업 362→20개, 77G→4.8G). 보안모니터 메일 원인.
- **인쇄 구조 결정 — 확정·박제(번복 금지, CLAUDE.md 🔒섹션)**: 우리는 모바일오더 기준 솔루션 → "지정 인쇄 스테이션 서버경유 인쇄"가 **표준이자 정답**. 풀 하이브리드(각POS 로컬인쇄)는 **필수 아님=선택**(카운터형 매장 전용, thefire는 POS1이 주문 거의 안 넣어 무의미). 소켓=폴링 위 가속만(대체 금지). **다음 세션 재논의·되돌리기 금지.** 설계=docs/PRINT_DB_DRIVEN_DISPATCH.md §6.
- **검증**: /검증 통과(hydration0·timezone신규0·build·health107·jest5/5·e2e6/6·print-guard8/8·design0·i18n0·프린터설정탭 실브라우저mount 크래시0/안내배너노출). site-settings 헤더 non-ISO 에러는 전역 기존이슈(무관, 별건).

### (참고) 과거 완료된 작업 (이전 세션 #2 — 2026-06-24)
- **8GB 업그레이드 확인**: RAM 4→8GB(available 5.6GB), 메모리 압박 해소. swap 잔재 1.1GB 무해(콘솔서 swapoff/swapon 선택). CPU 2코어·디스크83%.
- **A 직원ID 네임스페이스 표시 strip — 운영배포(SW 4.11)**: SERVER1이 `r16:server1`로 보이던 버그. AuthContext displayStaffName + 백엔드 폴백 strip + 화면 strip + cashier_name 1회 백필. **인쇄 무접촉(print-guard 8/8)**. 운영 prefix 잔여 0.
- **B 권한리셋·D MYR/RM**: 운영 실측 결과 이미 해결 확인.
- **C rid=16 cancelled 테스트주문 31건 삭제**(완료 4건 보존, 백업 thefire16-cancelled-testdelete-20260624T_evening.json).
- **E 메뉴sync 종결**: 실영업점(본점 rid16) 정상, 미반영은 주문0건 빈 분점(24/25)뿐. 원인=manual 전송모드(버그 아님).
- **모바일 크로스셀 기획설계 저장**: docs/MOBILE_ADDON_CROSS_SELL.md.
- 배포 사고 수정: migrate-strip-cashier-namespace.js process.exit 추가([[reference_deploy_migration_must_exit]]).
- 운영 라이프사이클 검증 ALL PASS(주문/단계/결제/프린트).

### 다음 확정 작업
- **(대기) Irene 매장 실프린터 테스트 1회** — SW 4.12 배포분: 메인POS 하드새로고침 후 ①주문 즉시 인쇄 ②옛 주문 안 쏟아짐 확인. 문제 시 롤백 Backup 20260625_075239. 결과 보고 대기.
- **모바일 크로스셀(추천 애드온) 구현** — 설계 완료(docs/MOBILE_ADDON_CROSS_SELL.md). Irene "구현 시작" 지시 시 착수. (①상품수동연결→②추천카테고리[Dessert/Drink 자동+체크] 폴백, RA+BG 동기화, 담은직후 바텀시트)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- E: The Fire 빈 분점(24/25) 실제 오픈 시 브랜드메뉴 manual→auto 전환(또는 "업데이트 N건" 알림 강화).
- 모바일 크로스셀: 장바구니 결제직전 추천줄 / 주문이력 기반 자동추천(우리 데이터 집계, 외부 API 불필요).
- 운영 PlanQ 분리 → 모바일오더 애드온 → 오프라인 대응 설계(기존 확정 순서).
- 운영 디스크 정리 완료(21%). 향후 배포백업 누적 재발 시 동일 정리(최근20개 보존). swap 잔재(선택).
- site-settings 로드 시 헤더 non-ISO-8859-1 에러(전역, 인쇄 무관) — 별건으로 추적.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
