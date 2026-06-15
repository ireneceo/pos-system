# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-15 04:25, idle 2085s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: BrandMenu.js,BrandMenuRestaurant.js Product.js,index.js brand-menus.js,menu.js mobile-public.js,restaurants-crud.js brandMenuSyncService.js,BrandMenusPage.tsx
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-13 저녁 (/개발완료 — 태블릿 레이아웃 점검 추가)
**버전:** v3.56 운영 배포 완료 (삭제/취소 PIN 게이트). 이후 backstage 배포(소켓 인증 Phase A)는 버전 미상승.
**작업 상태:** 완료

---

## ⚡ 빠른 재개 (새 세션에서 이것만 붙여넣기)
```
session-state.md 읽고 이어서 개발해.
```

---

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 2026-06-13 저녁)
- **The Fire 공지 누락 수정** (운영 데이터) — trial 실고객이 `is_test=true` 오분류로 공지·청구 제외 → User 8 + Restaurant 3 `is_test=false`. 코드 0. "trial/test 분리"는 오진(trial=기존 status). 백업 `/tmp/thefire-istest-backup.json`.
- **v3.56 릴리즈 공지/블로그 발송** — 공지#56(운영) 8명(The Fire 4/4) + 블로그 release-v3.56. 공통/역할별 + 언어별 UI라벨 교정.
- **소켓 인증 하드닝 Phase A** — 운영 배포·검증(Backup 20260613_155548, Smoke 9/9). 11소켓/9파일 `auth:{token}`(동작 무변경). 인쇄 무관. print-guard bless. 설계 docs/SOCKET_AUTH_HARDENING.md.
- **Cloudflare sw.js 퍼지**(Irene) — 매장이 v3.46(5/30)에 묶여있던 것 해소, 최신 3.63 전달(BYPASS, 재발 X).
- **태블릿 레이아웃 점검** (코드 변경 0, 점검만) — 9"/10"(1024×600·768·1280×800) Playwright 실로그인 측정. **확인: LiveOrders 상태 탭 줄이 1024 폭에서 208px 넘침 → "Completed" 잘림 + 좌우 흔들림(overflow-x:auto, 사이드바 열림 시 콘텐츠 ~780px). 1280은 정상.** KDS/FloorPlan/아이템뷰는 데모가 오늘자 active 주문 0이라 재현 불가 → 다음 세션 A.

### 다음 확정 작업 (Irene 지시)
1. **[A] 태블릿 레이아웃 오버플로우 전수 점검 + 수정** (Irene "A로, 다음 세션") — 데모 r38에 **오늘자 active 주문 여러 건**(pending/preparing/ready, 긴 메뉴명·세트 포함) + 주방 스테이션·존 추가로 과밀 재현 → KDS·FloorPlan·아이템뷰·LiveOrders를 1024×600/768/1280×800에서 점검 → `overflow-x:auto` 가로 스트립(탭·칩·통계줄)이 넘쳐 흔들리는 것 전부 수정. **재현 도구**: Playwright 단일 context 데모 RA 퀵로그인('RESTAURANT ADMIN' 카드 클릭) + 내부 넘침 탐지(el.scrollWidth-el.clientWidth>8 & overflowX!=visible). **주의: r38 과거주문 364건 있으나 live뷰는 오늘자만 → active 주문 생성 필요.** 끝나면 시드 정리.
2. **[소켓 Phase B] 백엔드 인증 강제** — 매장 기기가 Phase A 새 번들 받은 뒤(며칠 뒤 확인). `io.of().use()` JWT + `userCanAccessRestaurant`로 join 검증. 설계 docs/SOCKET_AUTH_HARDENING.md §3. [[project_socket_auth_hardening]]

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **Irene 실프린터 확인**: v3.56 취소표 / v3.55 통합티켓 스테이션 범위 / 닭갈비라면 KQ1 (인쇄 무변경, 형식 확인)
- **Irene 직접**: BG 브랜드메뉴 이미지 17건 재업로드 / (선택) Cloudflare API 토큰 주면 배포 시 sw.js 자동퍼지
- 디자인 규칙 위반 발견(점검 중): FloorPlan "+ Takeaway Walk-in" 버튼의 `+` prefix → 메모리 [[feedback_no_plus_prefix]] 위반, 수정 후보
- 브랜드메뉴 레스토랑 적용범위 구현 — docs/BRAND_MENU_SYSTEM.md §14
- 첫 유료 멀티지점 하드닝 잔여 wave — docs/OPERATIONAL_READINESS_AUDIT §8

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
