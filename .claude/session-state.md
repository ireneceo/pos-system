# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-15 #2
**버전:** v3.68 (운영, 유지) · 데스크탑앱 **0.1.9**
**작업 상태:** 완료 — BG 데모 버그 2건 수정 + Fable GO + **운영 배포**(Backup 20260715_122030, 마이그 46/46, 스모크 9/9, 운영 실검증 PASS).

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-07-15 #2, 운영 배포)
- **#1 브랜드 메뉴 "Linked Recipe" 오배선 근본수리**: 레시피 2계통(Recipe/recipe_id ↔ ProductRecipe/product_recipe_id) 중 브랜드 메뉴만 잘못 product_recipe_id 에 물려, "레시피 관리(Brand Recipes)"에 등록한 Recipe 가 드롭다운에 안 떴다. 레스토랑 메뉴·재고차감(inventoryDeductionService)이 쓰는 recipe_id 로 정합화 → `brand_menus.recipe_id` 신설(멱등 마이그+레지스트리) + 드롭다운 `/api/brands/:id/recipes` + create/update/GET(linkedRecipe) + brandMenuSyncService 매장 Product.recipe_id 상속(생성 상속·업데이트 비클로버) + recipe_id 브랜드 소유 IDOR 검증. 단일소스 [[reference_two_recipe_systems]].
- **#2 공지 댓글 삭제 하드닝**: 삭제 실패를 조용히 삼켜 "삭제 안됨"으로 보이던 CommentSection.handleDelete → 실패 사유 화면 표시. (서버·데이터·프론트 전 계층 정상이라 하드 실패 재현은 못 했으나, 실패 시 원인이 드러나도록.)
- **검증**: 실API 전흐름·IDOR 4/4·verify-all 13/13·print-guard 8/8 무접촉·BG mount 21/21 → **Fable 게이트 GO**(동기화 비클로버 런타임 20/20·FK ON DELETE SET NULL 실증) → 운영 배포 → 운영 실검증(recipe_id 컬럼+FK 적용·드롭다운소스 200·linkedRecipe 필드 정상).
- 버전 v3.68 유지(Irene 확정) — 버그수정이라 릴리즈노트/공지 생략.

### 완료된 작업 (이번 세션 — 2026-07-15)
- **윈도우앱 빌 백지 정석 수리(0.1.9 래스터)**: HTML 렌더 → `capturePage` → ESC/POS GS v 0 래스터(`raster.js`) → `printRawWindows`(오더티켓이 쓰는 검증된 winspool RAW)로 **GDI 드라이버 우회**. 실패 시 GDI 폴백(회귀0), 웹 계약 불변(billPrint.js 무접촉). C1(캡처폭 302px 고정+zoom 576dot 네이티브렌더+높이 재측정) 반영. 진단창 "전체 인쇄 테스트(Bill+Ticket)" 1클릭 추가.
- **with MIN(id=10) 운영 설정**: 빌 프린터 `qztray/POS-80`, **`printFormat='graphic'`**(우리 디자인). 스테이션 9·22·로고 불변. 백업 `/tmp/withmin-printer_settings-backup-*.json`(운영).
- **데스크탑 피드**: 0.1.9 wine 빌드 → 운영/dev 피드 0.1.9(정체됐던 0.1.7 해소) + CTA 다운로드 별칭 0.1.9.
- **PayPal 웹훅 로그레벨**: PayPal 꺼짐=warn(알림메일 오탐 제거)/켰는데 webhookId 없음=error. 400 차단 불변.
- **Floor Plan 헤더 반응형**(백로그 [[project_native_app_floorplan_cashmgmt_backlog]]): ①헤더 2줄 = isNarrow 임계 1440→**1720**(인라인 액션은 ≥1680px에서만 한 줄, 1441~1679 구간이 2줄이던 것 — 실측 재현). ②캐시 버튼 = Open Drawer를 Today's Cash Drawer 옆으로 묶음. Playwright 1500~1920 전 구간 1줄 확인.
- **검증/배포**: verify-all --full **14/14**(mount sweep 크래시0) → 운영 배포 2회(Backup 20260715_070606·084544, Smoke 9/9) → 운영체크(번들 바이트동일·에러0·graphic유지) → **Fable 최종검증 GO** ×2(래스터 + FloorPlan). 인쇄 보호파일 8/8 무접촉·디자인 신규0.
- 버전 유지(Irene). CHANGELOG/릴리즈노트는 내일 종이확인 후 정리.

### 다음 확정 작업 (Irene 명시)
1. **내일 매장 실프린터 확인** — 앱이 오늘밤 03~06시 유휴에 자동 0.1.9+재시작→graphic 반영됨. ①빌 1장 + 오더티켓 1장 = 둘 다 우리 디자인(로고·한글) 확인 ②서랍(Open Drawer) 1회.
   - 실주문 없이 먼저 보려면: 앱 **Ctrl+Shift+D → "전체 인쇄 테스트(Bill+Ticket)"**(프린터 POS-80). 출력창 `via:raster` 확인.
   - ⚠ 앱이 **0.1.9인지 먼저 확인**(창 제목). 0.1.8에 graphic 로드되면 백지. (앱은 Ctrl+R/재시작 전까지 옛 설정으로 인쇄 = 안전.)
   - **백지/이상 시 즉시 원격 복구**: `production-backend/withmin-bill-printer.js`(배포가 지움 → 없으면 scratchpad `withmin-bill-printer.js` 재scp) → `node withmin-bill-printer.js text`(빌=raw텍스트로 복구) + `[print-trace]`의 `render.{txt,via,rasterErr}`로 원인판정 → 0.1.10. 진단: `ssh -n irene@87.106.78.146 'pm2 logs production-backend --lines 300 --nostream | grep print-trace'`
2. **운영 메모리 보호막(earlyoom)** — 운영 root 비번 필요, Irene 1줄: `! ssh -t irene@87.106.78.146 'sudo bash -s' < /var/www/scripts/prod-memory-protection.sh` (무중단·멱등·문법검증 완료. 현재 운영에 earlyoom 미가동, fail2ban만 가동.)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 인쇄 후속(내일 종이확인 후): 빌 실패 N회 포기+통지(폴러 절단면·승인 필요) · Fable 다듬기(TIMEOUT류 애매실패 시 GDI 폴백 생략 = 이중인쇄 방지, `doRenderCheck` zoom 리셋 1줄) · 58mm 매장 `widthMm` 플러밍(현재 웹 80 하드코딩)
- 소켓 인증 하드닝(라이브주문 무인증) · 매출 대조 마감(미구현) · 안드로이드 M2(V4 게이트 완주) · 프랜차이즈 맵 좌표 백필(dev완료·미배포) · timezone/design baseline 부채
- FloorPlan 주석 3곳 1720 정정분(순수 주석)·release notes 정리 = 다음 배포/내일 반영

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
