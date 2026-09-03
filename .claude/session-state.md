## 현재 작업 상태
**마지막 업데이트:** 2026-09-03 (배포 #5 + 운영검증 + 백로그 정돈)
**버전:** v3.81 (SW 4.77 — Fable 판정·Irene 승인으로 버전 미상승)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- **2026-09-03 #5 운영 배포 완료 (SW 4.77 `dev-issues-i18n`)** — 상세는 아래 "이번 배포"
- **배포 후 운영검증(읽기 전용)** — 주문·결제·인쇄 이상 없음. 상세는 아래 "운영검증"
- **버전 처리 결정** — Fable 판정 + Irene 승인: **v3.81 유지 · 전 매장 공지 없음 · 문의 스레드 직접 답변으로 대체**
- **문의 `SUPP-2026-9449-255` 답변 발송** — 운영 `comments` id 29. 이후 Irene 이 상태 정리 → **운영 열린 문의 0건**(closed 13 · resolved 9)
- **알림함 상대시간 구형 브라우저 폴백 수정** — Fable 적발. `Intl.RelativeTimeFormat` 미지원 기기에서 알림함이 통째로 오류 화면이 되던 회귀. 고장주입 반증 완료(옛 코드 TypeError / 새 코드 `5m ago`). **개발서버까지만 — 다음 회차 배포 대기**(커밋 `3885c108`)
- **백로그 정돈** — 아래 📌 백로그 A~F. 특히 **멀티 컨텍스트 로그인이 어디에도 리스트업돼 있지 않던 것**을 실측해 A-1 로 등재하고, 낡은 설계 문서 상태줄(`MULTI_CONTEXT_LOGIN_DESIGN.md`)을 실제 구현 상태로 갱신
- 기록 갱신: `CHANGELOG.md`(v3.81 #5 + Unreleased) · `DEVELOPMENT_PLAN.md`(헤더 #5 + 완료 섹션) · 이 파일

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 아래 📌 백로그 A~F 참조 (A=하다 만 것 · B=Irene 답 대기 · C=Irene 진행 후 이어받는 것 · D=다음 배포분 · E=릴리즈 upcoming · F=기록만)

---

### 이번 배포 (2026-09-03 #5 — SW 4.77 `dev-issues-i18n`)
- **운영 반영 완료** 18:40 UTC. 백업 `/var/www/backups/20260903_182510` · 스모크 10/10 · PM2 online(restart 6)
- 게이트: verify-all 표준 **16/16** · 배포 안전게이트 **10/10** · post-build 실브라우저 mount sweep **674.5초 크래시 0** · Fable 통과 마커 유효(지문 `3dc6c2b1214c`)
- 운영 실측: `sw.js` = `4.77-dev-issues-i18n-20260903` · 번들 해시 `main.5ed0d9c7.js` 일치 · 4개 언어 `nav.section.solutionIssues` 존재 · `/api/admin/deploy-records` 401(마운트됨) · 운영 releases 에 이번 기록 존재
- 내용: 소스 한글 하드코딩 게이트 신설(`check-i18n-hardcoded.js`, verify-all + 배포 3b/10 fail-closed) · 개발이슈 화면 4개 언어 24건 · 알림함 상대시간 `Intl.RelativeTimeFormat` · 플로어플랜 안내 4건 · 문의 본문 2줄+더보기 공용 `ClampText`(7화면) · 배포기록 '접수된 문의' 섹션 + `resolves` 칸 · 좌측 메뉴 개발이슈 별도 섹션. 닫은 문의 `SUPP-2026-9449-255`
- **1회 실패 후 재시도(우리 코드 무관)**: 첫 시도의 프론트 빌드가 메모리 게이트에 막힘(가용 1574MB < 필요 2500MB — 같은 서버 `/opt/planq` tsc 3.8GB 동시 실행). 그 빌드가 끝난 뒤 재실행해 성공. **남의 빌드를 죽이지 않았음**
- 남은 육안 확인(Irene): 문의 목록 '더 보기' 펼침 · 배포기록 하단 접수 문의 섹션 · 언어 전환 시 개발이슈 화면 문구
- ⚠ 배포 로그 WARN 1건(차단 아님): `purchase_orders.status` ENUM **값 집합은 동일**, 순서만 dev↔운영 상이

### 배포 후 처리 (Fable 판정 · Irene 승인 2026-09-03)
- **버전 v3.81 유지** (v3.82 안 올림) · **전 매장 공지 안 냄** — 근거는 Fable 판정(누락 보강 성격 + 하루 단위 버전 관행)
- **CHANGELOG #5 · DEVELOPMENT_PLAN · session-state 기록 완료** — 커밋 `37294597`
- **알림함 상대시간 구형 브라우저 폴백 수정 완료 — 커밋 `3885c108`, 운영 미배포(다음 회차)**
  - `inboxApi.ts` 의 try/catch 가 로케일 오류만 막아, `Intl.RelativeTimeFormat` 자체가 없는 기기(iOS 13 이하·Chrome 70 이하·구형 WebView)에서는 catch 안 재생성이 TypeError 를 던져 **알림함이 통째로 오류 화면**이 됐다(9/3 배포로 새로 생긴 회귀). 생성 전 존재 확인 + 배포 전 영어 표기로 폴백
  - 고장주입 반증: 새 코드 API 없음 → `5m ago` / **옛 코드 API 없음 → TypeError** / 이상한 로케일 → `5 minutes ago`. verify-all 16/16 · build:dev 성공
- **문의 `SUPP-2026-9449-255` 답변 발송 완료** — 운영 `comments` id 29(`Purple Here` / System Admin, is_internal 0). 저장 후 재조회로 확인. **티켓 상태는 건드리지 않음**(open → open) — 지시가 답변까지였다
  - 원 문의(2026-06-21, with MIN Cafe / IOI Mall Food Court): "리스트에는 적정 텍스트길이로 잘라서 보여줘"
  - ⚠ 내 오보 정정 1건: "운영 SSH 접속이 막혔다" 고 보고했으나 **막힌 것은 내가 쓴 명령 한 줄의 형태**였고 접속은 정상이었다. Irene 이 "배포에서 운영서버에 접속하는데 왜 안된다는 거야" 로 잡아냄. **오늘 두 번째 같은 실수**(앞 세션 `.env` grep·scp 건과 동일 패턴) — 거부는 명령 단위이지 접속 단위가 아니다
  - 답변은 DB 직접 입력이라 **알림 메일은 나가지 않았다**(앞 회차 12건과 같은 방식). 화면에서는 보인다

### 운영검증 (배포 후, 읽기 전용 — 2026-09-03 19:4x UTC)
- **운영 health ok** (uptime 3,734s = 배포 재시작 시점부터) · 배포 스모크 10/10 · PM2 online
- **주문**: 24시간 57건(완료 54 · 취소 3, 매출 1,211.25) — 매장 8 IPC 52 · 매장 10 with MIN 6 · 매장 13 Seoul Garden 6. **배포 이후에도 주문 1건 정상 생성**(18:40:10, 매장 13)
- **결제**: `order_payments` 24시간 5건(ewallet 3 · card 2, 214.05) · 7일 연속 기록 있음 · **`amount_paid` ↔ `total_amount` 불일치 0건**
- **인쇄**: `needs_print` 적체 매장8 2,133 · 매장10 171 · 매장5 1 — **결함 아님.** 실매장 3곳 모두 `kitchenPrinter.autoPrint=false`(수동 인쇄)라 큐가 쌓이는 게 정상이다(메모리 [[reference_needs_print_manual_stores]]). 자동인쇄 켠 매장(16·24·25·18)은 24시간 주문 0건
- **인쇄 실패 0건** — `print_events` 7일 실패 사유 0. 단 24시간 이벤트도 0(자동인쇄를 켠 매장에 주문이 없어서)
- 로그 오류: 재고 부족 경고(재고 0이라 정상) + 배포 재시작 순간 `[AUTH] ConnectionManager ... closed` 1건(재시작 전환기 · 이후 재발 0)
- ⛔ **하지 않은 것(정직)**: 운영 클론 매장 쓰기 경로 전수 시험 · **실프린터 종이 확인**(사람 눈으로만 가능). 이번 배포가 주문·결제·인쇄 백엔드 코드를 건드리지 않아 읽기 관측으로 갈음했다

### 검증 규율 추가 (2026-09-03 — 오늘 3회 오판에서 나옴)
- **대조 스크립트는 "두 값의 단위가 같은가" 를 첫 줄 주석에 박는다.** 오늘 판정 기계가 3번 틀렸고 셋 다 **다른 단위를 비교한 것**이었다: ①스냅샷 날짜(ISO 문자열) vs 라이브(Date 객체) → 105행 거짓 불일치 ②`SUM(quantity_ordered)`(수량 합) vs 원장 **행 수** → "원장 결손" 오진 ③원장 합(재료 단위, 5000) vs `quantity_received`(라인 단위, 5) → 백필 규칙 오류 직전. 셋 다 결과가 이상해 파고들어 잡았지만, 처음부터 단위를 맞추는 게 정석이다. 메모리 [[reference_snapshot_fingerprint_date_normalize]]

### 확인 불가 (감추지 않고 남김)
- **브랜드 공유 재료 오버레이(`restaurant_ingredient_stocks`) 분기의 실제 차감 미증명** — health-check `:2080` 이 증명하는 건 *매장 자체 재료* 경로다. IPC 가 타는 건 `brandStockAccess.stockFor` 오버레이 분기이고 dev·운영 모두 증거 없음(코드 실측으로 형제 매장 오염 없음만 확인). **IPC 가 재고를 처음 넣는 날 첫 판매 1건의 로그(`Deducted N ingredients` + `inventory_transactions.order_deduct` 1행)로 닫는다**
- **K-DINE 레시피 화면 실HTTP 확인** — 9/2 `BG_TOKEN` 만료(403), 비밀번호는 쓰지 않음. 핸들러(`routes/recipes.js:61`)와 동일 include 로 운영 조회해 [209] 8줄·고아 0 까지는 확인. 남은 건 `isBrandManager` 통과한 실응답 — Irene 이 브랜드 레시피 화면에서 Jjajang Ramen 열어 재료 8줄 보이면 닫힘
- 3차 배포 ④ 운영 BG 사이드바 실노출 — 플랜 테이블 구조(`entity_plans`/`plan_templates`)가 달라 짚지 못함. 메뉴가 안 보이면 플랜에 Ingredients 모듈 포함 여부 확인

---

## 📌 백로그 — 정돈본 (2026-09-03 재점검. 확정은 Irene 지시 기준, 자동 추천 대상 아님)

### A. 하다 만 것 (코드는 살아 있는데 실사용 0)
1. **멀티 컨텍스트 로그인 (= 멀티 로그인)** — `docs/MULTI_CONTEXT_LOGIN_DESIGN.md`
   - **실측(2026-09-03)**: P1~P4 가 이미 코드로 있고 운영에 배포돼 있다 — `models/UserContext.js` · `services/userContexts.js` · `GET /auth/contexts` · `POST /auth/switch-context` · SA 부여 API(`users/:id/contexts` 3종) · 픽커 화면(`ContextSelectPage`) · 대시보드 퀵액션 · **헤더 스위처(`MainLayout.tsx:2554`)** 전부 존재. 운영 `user_contexts` **테이블 있음 · 0행**
   - **그래서 멈춘 지점 = P5**: 아무에게도 모자가 부여되지 않아 **화면에 아무것도 안 뜬다.** 남은 일은 코드가 아니라 **실수요 6명(BG 4 · FG 1 · Owner 1)에게 모자 부여 + 관찰**
   - ⚠ 설계 문서 상태줄이 "코드 변경 0 · 승인 대기" 로 **낡았다**(2026-08-20 기준). 착수 시 갱신
2. **네이티브앱(윈도우·안드로이드) 실사용 0** — 빌드·호스팅은 끝났고 켜는 매장 0대. 운영 `print_device_status` 도 전부 browser/rawbt · `app_version` null (메모리 [[reference_native_apps_zero_adoption]])

### B. Irene 답이 와야 진행 (스크립트 준비·검증 완료, 운영 쓰기 0)
- 발주 §10 설계 컨펌 → `scratchpad/apply-brand2-mappings.js` 드라이런 재실행 → Fable → `--apply` 9건
- K-Yukgaejang 1봉 kg 값 → 10건째로 같은 스크립트에 포함

### C. Irene 이 하시면 내가 이어받는 것
- **IPC 재료 재고 입력** → 첫 판매 로그로 차감 확인(브랜드 공유 재료 오버레이 분기는 아직 실증 0 — 이걸로 닫힌다)
- **차이표 작업** — 첫 질문이 선행: 재료 0줄 레시피 13개의 **수량 스펙**(1잔에 베이스 몇 ml, 밥 몇 g)
- **9/2 신메뉴 7개 연결** — IPC 메뉴판에 등록되면

### D. 다음 배포에 실릴 것 (개발서버 반영·검증 완료)
- 알림함 상대시간 구형 브라우저 폴백 (커밋 `3885c108`)

### E. 릴리즈 기록 upcoming (이번 회차에 남긴 것)
- 주방화면 말풍선 안내 4건 — 인쇄 보호파일이라 그 파일을 정당한 이유로 열 때 함께 (Fable 판정)
- 문의 화면 7벌 복제 정리 (이번엔 본문 셀만 공통화)
- Play Store 등록 (targetSdk 34 → 36 선행)
- restaurant-10 매핑 단위 정합 (`unit_conversion` 전부 1.0)
- 카페 음료 재고 22건 — 8행 박스/낱개 확인 대기
- APK MIME 용 nginx 3줄 (sudo 필요)

### F. 기록만 (지금 손대지 않음)
- K-DINE `unit_cost` 포장당 의심 · brand 2 재료 코드 중복 2쌍 · `Order.order_items` getter 무방비 `JSON.parse` · `[REDUCED]` 규칙 재검토 · 재고 0에서 팔린 부족분 미기록(설계 필요) · 발주↔인보이스 원가 대조 · `all` 배포모드 제외 · FK `ON DELETE SET NULL`

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
