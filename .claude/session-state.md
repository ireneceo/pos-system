# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-16 (인쇄 자가진단 **운영 배포 완료**)
**버전:** **v3.69** (운영 — 2026-07-16 배포) · 데스크탑앱 **0.1.9** · 안드로이드앱 **0.2.0**
**작업 상태:** **완료 — 인쇄 자가진단 & 원격 지원 시스템 운영 배포 (v3.69).** Fable 게이트(CONDITIONAL GO→보안수정→GO) 통과 후 배포. Backup 20260716_124948 · Smoke 9/9 · 운영 테이블 생성(15컬럼)·신규 라우트 401 확인.

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-07-16)
- **인쇄 자가진단 & 원격 지원 시스템 — 운영 배포**. 설계 `docs/PRINT_SELF_DIAGNOSE_DESIGN.md`. 매장 버튼1개로 전 디바이스×방식 진단(원인+가이드+안전복구+테스트인쇄) + 관리자 원격뷰(Admin>Print Health). 8c088aac 이후 26파일:
  - 백엔드 신규: PrintDeviceStatus 모델·`routes/print-diagnostics.js`(checks S1~S8·device-report·devices·fleet)·pollerObserver·멱등마이그(레지스트리 deploy). 프론트 신규: printDiagnostics.ts·PrintSelfDiagnosePanel·PrintHealthPage·PrintDeviceReporter + 배선(App/SettingsPage/i18n 4언어).
  - **설계대조 후 3건 보강**: 실패배너 딥링크 죽은경로 교정(`/restaurant/:rid/settings?tab=printer&diag=1`) + S4 `unprinted_now` + D7 `bt_permission`. S9는 S8 흡수·D9 Phase2.
  - **Fable 게이트**: 보안결함 1건 적발·수정 — device-report가 restaurant_id 미보유 계정의 body.restaurant_id 무검증 신뢰(BG→타매장 위조행 주입, fleet오염). 토큰스코프로만 확정+매장계정 아니면 403. 재검증 크로스테넌트 403·오염0.
  - 🔒 **인쇄 보호파일 8/8 무접촉**(MainLayout은 사이드바 1줄만·재-bless). AutoPrintFailureBanner **전매장 첫 노출**(App.tsx 마운트=UX변화·Irene 승인).
  - **남은 것**: D8 테스트 인쇄 1회 실프린터 종이 확인(매장 방문·헤드리스 불가).

### (이전) 인쇄 자가진단 구현 상세 (아카이브)
- 8c088aac(개발완료) 이후 25파일 ~2065줄 작성됨:
  - 백엔드: `models/PrintDeviceStatus.js`(신규) · `routes/print-diagnostics.js`(신규 269줄) · `utils/pollerObserver.js`(신규) · `scripts/migrate-print-device-status.js`(신규·레지스트리 등록) · server.js 배선
  - 프론트: `utils/printDiagnostics.ts`(신규 349줄) · `components/Settings/PrintSelfDiagnosePanel.tsx`(신규) · `pages/Admin/PrintHealthPage.tsx`(신규) · `components/PrintDeviceReporter.tsx`(신규) · App.tsx 라우트 + MainLayout 사이드바 1줄(Print Health) + SettingsPage 배선 · printDiagnostics.json 4언어
  - 🔒 보호파일: MainLayout.tsx = **사이드바 메뉴 1줄만**(인쇄 로직 무접촉), print-guard manifest 07-16 07:57 재-bless.
  - **2026-07-16 설계대조 후 3건 보강 완료**(Irene 지시): ①실패배너 딥링크 — 죽은 경로 `/pos/restaurant/settings` → 실경로 `/restaurant/:rid/settings?tab=printer&diag=1`(useAuth·패널 자동진단) ②S4 `unprinted_now` 서버체크 신규(needs_print 45초+ · 사유별 cause) ③D7 `bt_permission` 기기체크 신규(android `__NATIVE_PRINT_SETUP.getState().btPermission`) + i18n 4언어. **S9는 S8 evidence에 흡수(중복) / D9 lan_reach는 Phase2**로 확정.
  - **검증 완료(2026-07-16)**: 마이그 멱등 실행·테이블 15컬럼 / 신규 엔드포인트 API **19/19**(checks에 S4·device-report upsert 멱등·devices·fleet SA·IDOR 403) / **S4 fault-injection**(pass→fail cause=no_device critical→복원) / build:dev 경고0(내 파일) / **print-guard 8/8 무접촉** / i18n Errors0 / **verify-all --full 14/14**(실브라우저 mount 8역할 크래시0 포함).
  - **Fable 게이트 완료 (2026-07-16) — CONDITIONAL GO → 필수수정 반영 후 GO**: 7기준 중 보안경계에서 **결함 1건 적발·수정**. `device-report` 가 restaurant_id 미보유 계정(BG/FG/SA)에 대해 `body.restaurant_id` 를 무검증 신뢰 → BG가 소유 안 한 매장에 위조 기기행 주입(fleet 오염·S8 가짜초록) 가능. Fable 실재현(BG6→body=38→200). **수정**: 토큰 스코프로만 rid 확정, 매장계정 아니면 403(프론트는 restaurant_id 미전송=무손실). **재검증 5/5**(크로스테넌트 403·오염행0 / 정상RA 200 / body스푸핑 무시) + print-guard 8/8 + health-check print 8/8 + sensitive-diff clean. fleet IDOR(Brand.owner_id 필터)·마이그·미들웨어순서·정직성불변식·가드 전부 PASS.
  - **남은 것 (배포 전, 전부 사람/승인 항목)**: ①MainLayout 재-bless(사이드바 1줄) Irene 명시 승인 ②실패배너 전매장 첫 노출 + Admin Print Health 신규 페이지 배포 승인(설계 §8) ③D8 테스트 인쇄 1회 실프린터 종이 확인. → /배포.

### 완료된 작업 (이번 세션 — 2026-07-15 #3)
- **#1 브랜드 메뉴 "Linked Recipe" 오배선 근본수리 (운영 배포·검증)**: 레시피 2계통 중 브랜드메뉴만 잘못 product_recipe_id 에 물려 "레시피 관리(Recipe)" 등록분이 드롭다운에 안 뜸 → recipe_id 정합화(`brand_menus.recipe_id` 신설·멱등마이그·레지스트리 / 드롭다운 `/api/brands/:id/recipes` / 매장 Product.recipe_id 비클로버 상속 / IDOR 검증). **Fable GO** → 운영배포(Backup 20260715_122030) → 운영실검증. [[reference_two_recipe_systems]]
- **#2 공지 댓글 삭제 하드닝**: CommentSection.handleDelete 실패 조용히 삼키던 것 → 사유 표시.
- **#3 안드로이드 네이티브앱 배포 배선 (운영 배포·검증)**: 윈도우처럼 안드로이드 브라우저 감지 → **"Download for Android"**(서명 release APK 0.2.0, 운영URL) CTA(PwaInstall 대칭·4언어·인증시만) + APK 운영 호스팅(`/desktop/PurplePOS.apk`). 운영배포(Backup 20260715_205804, 스모크9/9) → 다운로드 200·CTA 반영·헬스 확인. 키스토어 `/opt/secrets/purplepos-release.keystore`(보관필수). [[reference_android_app_distribution]]
- **#4 안드로이드 V3 인쇄게이트 완주 (Fable)**: 하니스 함정 4건(PWA SW 강제리로드·chrome-error 정지·동시실행 오염·워치독 850MB 오탐) 수정 → **V3 13/13 PASS**(앱 인쇄 바이트가 QZ와 동일·한글 래스터·드로어 증명, 하드웨어 없이). V4 폴러 실인쇄(blocker#2)는 코드-실측 모순 = **실 태블릿 확인으로 이관**(에뮬 불안정). [[reference_android_print_gate_traps]]
- **#5 인쇄 자가진단 시스템 Fable 설계**: `docs/PRINT_SELF_DIAGNOSE_DESIGN.md` 신규(6단계+판단). 구현은 다음 세션. [[project_print_self_diagnose]]
- 전 배포 **인쇄 보호파일 8/8 무접촉** · 버전 v3.68 유지(Irene).

### 다음 확정 작업 (Irene 명시)
- 없음 — 지시 대기. (인쇄 자가진단 = v3.69 운영 배포 완료.)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **인쇄 자가진단 D8 실프린터 종이 확인**: 다음 매장 방문 시 설정>프린터 "전체 점검"의 테스트 인쇄(빌·주방, 텍스트/이미지)로 종이 실제 출력 눈 확인. 헤드리스로 못 본 유일 항목. [[project_print_self_diagnose]]
- **안드로이드 실 태블릿 확인**: APK 깔고 실주문 → 폴러 자동인쇄 나오나(V4 blocker#2 확정). 2분. 안 되면 print-trace로 폴러→billPrint 라우팅 측정.
- **운영 메모리 보호막(earlyoom)** — Irene sudo 1줄: `! ssh -t irene@87.106.78.146 'sudo bash -s' < /var/www/scripts/prod-memory-protection.sh`
- with MIN 매장 실프린터 종이확인(빌 graphic) · 소켓 인증 하드닝 · 매출 대조 마감(미구현) · 프랜차이즈 맵 좌표 백필(dev완료·미배포) · timezone/design baseline 부채
- 인쇄 자가진단 Phase 2(BG fleet뷰·브릿지 LAN probe) · 옛 PRINT_VISIBILITY_DIAGNOSTICS 보호파일 배선(bless+실프린터 필요)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
