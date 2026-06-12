# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-12 07:50, idle 1943s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: Restaurant.js,settingsGuard.js sw.js,BrandMenusPage.tsx SettingsPage.tsx
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-12
**버전:** v3.55 운영 (2026-06-12 배포, Backup 20260612_063050, smoke 9/9 + 운영 demo 실검증 13/13)
**작업 상태:** 완료 — 배포 끝, 세션 마무리

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션, 2026-06-11 밤 ~ 06-12)
- **⭐ 전 화면 주문 단계 실시간 동기화 통일 (Irene "정석대로") — v3.55 배포.** 백엔드 단일 단계 모델(orders-crud: 주문단위 이동=아이템·세트구성품 양방향 동행(P1), 아이템 변경=주문 min roll-up, void 포함) + 공용 `OrdersRealtimeContext`/`orderStage.ts`(table-status 1:1 클라 파생) + LiveOrders·FloorPlan(캔버스/아이템뷰/Takeout) 전환·table-status 의존 제거. 검증: 실API 23×3 + 크로스화면 e2e(≤2s·리프레시0, 실반영 ~10ms)×3.
- **KDS 만성 "리프레시해야 보임" 근본수정** — ①`restaurant_id !== user.restaurantId` 문자열/숫자 엄격비교로 전 소켓 이벤트 무시(6/4 미진단 건의 정체) ②버전가드 ms 역전(생성=메모리 ms vs 갱신=DB 초절삭). KDS e2e 3회 6/6.
- **KDS 아이템뷰** — 준비시간 신호등(버튼 옆) + 긴 메뉴명/768px overflow 수정(+공통 PageHeader ≤768 shrink). 구조는 이전 그대로(교차주문 합치기+merge limits 유지 — Irene 확정). 소켓 신규주문도 fetch 와 동일 세트 전개(rawToKitchenOrder 통일).
- **테이블이동 머지 배너** — "Orders Merged" + 출발 주문/테이블 명시(viaTableMove 플래그). i18n 4언어.
- **세트 전용 단품(set_only)** — Product/BrandMenu 플래그 + 메뉴관리·BG 토글 + POS/모바일/추가주문 숨김(빈 카테고리 탭 숨김) + 푸시/sync 전파(브랜드 판매정책 추종). 마이그 `add_product_set_only.sql`(운영 선적용 완료).
- **주방스테이션 배정 정리** — 세트메뉴 배정 제외 + 저장 시 잉여 개별배정 자동정리 + 충돌 예외 ⚠ 표시. **운영 r24 잉여 97건 정리**(스냅샷 `.claude/r24-repair-log-20260612.txt`).
- **통합티켓 워크스테이션별 스테이션 범위** (🔒 Irene 명시) — `consolidatedStations` 칩 선택, 범위 필터(미배정 포함=silent drop 방지, 0개면 발행 생략), 취소 동일. print-guard bless.
- **브랜드 이미지 소실 사고 근본수정** — 참조→복사 소유(copyImageToOwnedFile) + deleteOldImages brand-menus 보호 + POS img onError. **운영 죽은 참조 68건(brand_menus 17+products 51, The Fire 3매장) 정리.**
- **/검증 풀패스 + v3.55 배포** — hydration 0 / 타임존 신규 0 / health 101/101 / print 8/8 / mount 7라우트 / 운영 demo 13/13 / 운영 critical 5페이지 mount / SW 3.60.

### 다음 확정 작업
- 없음 — 지시 대기

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **Irene 확인 2건 (v3.55 후속)**: ①실프린터 종이 확인 — 워크스테이션별 통합티켓 + 스테이션 범위 티켓 ②BG 브랜드메뉴 이미지 재업로드(원본 소실 — 재업로드하면 전 매장 복원, 이후 안전)
- **Irene 결정 1건**: thefire02 닭갈비라면 스테이션 충돌 — 개별→KQ2 vs 카테고리(Ramyun & Noddle)→KQ1, 현재 KQ2로 인쇄. 의도한 예외면 유지, 아니면 정리(→KQ1)
- 구독 시작일/트라이얼 프론트 마무리 — Manager/RestaurantsPage:991 `status:'active'`→폼값 (백엔드는 배포됨). memory [[project_thefire_billing_trial_fix]]
- 설정 저장 보호 가드(빈값 덮어쓰기 차단) — 분석 완료, Irene 결정(hydration marker) 후 구현. memory [[project_settings_guard_analysis]]
- BG dashboard 자동 trial 판정 + user 29 데이터 정정
- pending-print 가 is_deleted 주문을 안 거르는 엣지(🔒 인쇄 라우트 — 한 줄 필터, Irene 승인 시)
- KDS acceptVersion 의 ms 비교는 초단위로 교정했으나, 운영 중 추가 echo 레이스 관찰 시 OrdersRealtimeProvider 로의 Phase 4 전환 검토 (설계문서 §3)
- gitconsulting/with MIN 발주 데모 Phase 2 (운영 시딩, Irene "운영 실행" 지시 대기)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
