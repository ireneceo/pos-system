# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-13 12:50, idle 2043s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: order-audit.js,orders-crud.js staff.js,server.js settingsGuard.js,voidPinGuard.js admin.json,orders.json reports.json,settings.json admin.json,orders.json
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-13 (백로그 정정 + 운영데이터 수정 2건 + DEV 버그수정 2건(미배포) + 기획설계 2건)
**버전:** v3.55 운영 + 오후 후속 수정 7건 배포됨 (버전 상승 여부 Irene 답변 대기 — 묻기만 했고 미정)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 2026-06-13)
- **백로그 stale 정정** — 구독 트라이얼 프론트(이미 완료·배포), 설정 anti-wipe 가드(이미 완료, 기능테스트 13/13 + 실API 5/5) 재확인. 메모리/백로그 "미완/보류" 표기가 stale 이라 정정.
- **운영 데이터: thefire02(r24) 닭갈비라면 스테이션** — product 650 개별배정 KQ2 제거(NULL) → Ramyun&Noddle 카테고리 KQ1 추종(다른 라면과 동일). 버그 아님(개별>카테고리 우선순위 정상). 백업 `/tmp/dakgalbi-ramyun-station-backup-2026-06-13.json`. enrich 검증 KQ1.
- **운영 데이터: thefire 본사 BG(user29) 7/1 정렬** — status suspended→trial, 시작 8/1→7/1, trial_end→6/30, 인보이스 RM499 기간 7/1 재발행. 백업 `/tmp/user29-billing-backup-2026-06-13.json`. (정지 원인=연체 아님, 6/9 사고때 레스토랑만 고치고 BG 누락 잔여데이터)
- **🐞 DEV(미배포): BG 구독 미래시작 강제 trial** — `users.js` PUT 수정경로가 status 명시 시 trial 파생 안 하던 갭(user29 drift 원인) → 레스토랑·생성경로처럼 강제. 실API 6/6 + print-guard 8/8 + health 101/101.
- **DEV(미배포, 🔒): pending-print is_deleted 필터** — `orders-crud.js` 인쇄 대기열이 삭제주문 안 거르던 엣지 → `is_deleted:false`(유령티켓 차단). 인쇄방식 무변경. 실API 3/3 + 인쇄계약 7/7. **배포후 실프린터 확인+bless 필요.**
- **기획설계 2건** (구현 미착수, 아래 다음 확정 작업).

### 미배포 DEV 변경 (다음 /배포 대상) — 2건
1. `users.js` BG/유저 구독 수정경로 미래시작=강제 trial
2. `orders-crud.js` pending-print is_deleted 필터 (🔒 — 배포 후 실프린터 확인+`check-print-guard.js --bless`)

### 다음 확정 작업 (Irene 지시: "이 구현은 다음 섹션에 할게")
- **삭제/취소 PIN 손실방지 게이트** — `docs/VOID_PIN_GATE_DESIGN.md`. 직원 현금 횡령 감시. ①권한 PIN(verify-pin-permission 재사용=세션전환 없음) ②사장 감시 리포트(Void&Cancel Log). 적용=아이템삭제+주문취소. 🔒 orders-crud 진입부.
- **브랜드메뉴 레스토랑 적용범위** — `docs/BRAND_MENU_SYSTEM.md` §14. 연결(opt-in) 방식. scope_mode(all/selected)+brand_menu_restaurants+Product.brand_scope_active(숨김+보존)+Brand.menu_settings.default_scope. 활성(RA)·범위(BG) 분리.

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
