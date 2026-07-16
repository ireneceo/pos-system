# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-07-16 05:20, idle 1826s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: CommentSection.tsx
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-07-15 #3
**버전:** v3.68 (운영, 유지) · 데스크탑앱 **0.1.9** · 안드로이드앱 **0.2.0**
**작업 상태:** 완료 — 운영 배포 2건(레시피/댓글, 안드로이드 CTA) + 안드로이드 V3게이트 완주 + 인쇄 자가진단 Fable 설계. **다음 세션 = 인쇄 자가진단 구현.**

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-07-15 #3)
- **#1 브랜드 메뉴 "Linked Recipe" 오배선 근본수리 (운영 배포·검증)**: 레시피 2계통 중 브랜드메뉴만 잘못 product_recipe_id 에 물려 "레시피 관리(Recipe)" 등록분이 드롭다운에 안 뜸 → recipe_id 정합화(`brand_menus.recipe_id` 신설·멱등마이그·레지스트리 / 드롭다운 `/api/brands/:id/recipes` / 매장 Product.recipe_id 비클로버 상속 / IDOR 검증). **Fable GO** → 운영배포(Backup 20260715_122030) → 운영실검증. [[reference_two_recipe_systems]]
- **#2 공지 댓글 삭제 하드닝**: CommentSection.handleDelete 실패 조용히 삼키던 것 → 사유 표시.
- **#3 안드로이드 네이티브앱 배포 배선 (운영 배포·검증)**: 윈도우처럼 안드로이드 브라우저 감지 → **"Download for Android"**(서명 release APK 0.2.0, 운영URL) CTA(PwaInstall 대칭·4언어·인증시만) + APK 운영 호스팅(`/desktop/PurplePOS.apk`). 운영배포(Backup 20260715_205804, 스모크9/9) → 다운로드 200·CTA 반영·헬스 확인. 키스토어 `/opt/secrets/purplepos-release.keystore`(보관필수). [[reference_android_app_distribution]]
- **#4 안드로이드 V3 인쇄게이트 완주 (Fable)**: 하니스 함정 4건(PWA SW 강제리로드·chrome-error 정지·동시실행 오염·워치독 850MB 오탐) 수정 → **V3 13/13 PASS**(앱 인쇄 바이트가 QZ와 동일·한글 래스터·드로어 증명, 하드웨어 없이). V4 폴러 실인쇄(blocker#2)는 코드-실측 모순 = **실 태블릿 확인으로 이관**(에뮬 불안정). [[reference_android_print_gate_traps]]
- **#5 인쇄 자가진단 시스템 Fable 설계**: `docs/PRINT_SELF_DIAGNOSE_DESIGN.md` 신규(6단계+판단). 구현은 다음 세션. [[project_print_self_diagnose]]
- 전 배포 **인쇄 보호파일 8/8 무접촉** · 버전 v3.68 유지(Irene).

### 다음 확정 작업 (Irene 명시)
1. **인쇄 자가진단 & 원격 지원 시스템 구현** — Fable 설계 완료·승인대기 = `docs/PRINT_SELF_DIAGNOSE_DESIGN.md`. 매장 버튼1개 진단(전 디바이스×방식)+가이드+안전복구, 관리자 원격뷰. **인쇄 보호파일 접촉 0**(조립8/신규2). MVP 중~대 2~3일, **Fable 게이트 대상**. 착수 전 §8 승인 6항목 Irene 확인(특히 실패배너 마운트=UX변화). 단일소스 [[project_print_self_diagnose]].

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

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
