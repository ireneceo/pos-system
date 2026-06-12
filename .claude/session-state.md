# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-12 (오후 — v3.55 후속 운영버그 2건 **운영 배포 완료**, Backup 20260612_082237, smoke 9/9)
**버전:** v3.55 운영 + 오후 후속 수정 배포됨 (버전 상승 여부 Irene 답변 대기)
**작업 상태:** 배포 완료 + 운영 실측 검증 완료 — **Cloudflare sw.js 퍼지(Irene 대시보드 수동)만 남음**

### 진행 중인 작업
- 없음

### 🚨 Irene 액션 대기 (배포 후속)
1. **Cloudflare 캐시 퍼지** — 대시보드 → Caching → Custom Purge → `https://purplehere.com/sw.js`. 엣지가 6/3에 캐시한 SW 3.46(1y immutable)을 계속 서빙 중이라 **5/30 이후 모든 SW bump(3.47~3.61)가 매장 기기에 미도달** (nginx no-store 수정은 6/9에 됐지만 이미 캐시된 항목엔 무효). 퍼지하면 기기들이 3.61 받고 자동 캐시삭제+강제새로고침.
2. 퍼지 전이라도: 매장 인쇄 기기(POS 1 등) **수동 새로고침/PWA 재시작 1회** → 새 번들 즉시 적용 (index.html은 캐시 안 묶임).
3. r24 POS 2 통합티켓 스테이션 칩 **재선택** (버그로 소실됐던 것 — 이제 저장 유지됨). r16 POS 1 [12,13]=KQ1+KQ2 는 **내가 운영 DB에 복원 완료** (07:57 옛 코드 화면 저장으로 지워졌던 것).
4. 실프린터 종이 확인 — 워크스테이션별 통합티켓 + 스테이션 범위.

### 이번 오후 세션 완료 (2026-06-12 오후, DEV 미배포 — SW 3.61)
1. **통합티켓 스테이션 범위 "저장해도 풀오더로 복귀" 근본수정** (Irene 운영 보고)
   - 근본원인: `models/Restaurant.js` printer_settings **getter가 workstations를 {id,name,billPrinter,consolidatedTicket} 고정 키로 재조립** → 저장은 돼도 모든 API 읽기에서 `consolidatedStations` 소실 → UI 풀오더 복귀 → 그 상태로 재저장하면 DB에서도 소실(운영 r24 실제 발생, r16은 [12,13] DB 잔존)
   - 수정 3겹: ①Restaurant.js getter `...ws` spread 전 키 보존(핵심) ②settingsGuard 워크스테이션 키 단위 보존(stale 번들 echo 방어 — ct/cs 키 없으면 existing 보존, `[]`는 명시 해제로 정상 저장) ③SettingsPage 하이드레이션 localStorage sync에 workstations 누락 보강(설정 페이지 방문 시 billPrint가 레거시 풀오더 풀백으로 떨어지던 구멍)
   - 검증: 가드 단위 7/7 + 실API r38 3/3(저장/stale echo/해제+원복) + health 101/101 + print-guard 8/8 무변경 + settings?tab=printer mount 클린
   - **배포 후 Irene**: r24 POS 2 스테이션 칩 재선택(이미 소실) + 실프린터 종이 확인. **배포 전 운영에서 프린터 설정 저장 금지**(저장하면 r16 [12,13]도 소실).
2. **브랜드메뉴 사진 소실 확인 + 이모지 fallback** (Irene 운영 보고)
   - 사진: 원본 파일이 이전 공유참조 사고로 이미 소실(6/8 이후 업로드 백업 전부 부재, weekly=DB만 — 복구 불가). 어제 정리는 정당(죽은 참조만 NULL). **The Fire 브랜드메뉴 17건 BG 재업로드 필요**: 옛날통닭세트/김치&참치볶음밥/떡볶이/비빔국수/생수/딸기초코라떼/조리퐁쉐이크/로터스빙수/크로플5종(블루베리·찰리누텔라·로터스·바나나·딸기)/치즈라면/순두부라면/소고기라면/Steam Rice. 재업로드하면 copyImageToOwnedFile로 전 매장 복원+재발 방지.
   - 이모지: BrandMenusPage 카드 fallback이 회색 아이콘뿐 → menu.emoji 우선(48px) 표시로 수정. 실브라우저 🥡 렌더 확인.

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
