# Fable 게이트 판정 2026-10-04 — (0-a) 브랜드 관리자 모자 사이드바 표시 키 (+ 단말기 브릿지 재확인)

작성: Fable(리더). 선행 판정 `.claude/fable-verdict-20261004-brand-manager-targets.md` §2·§3 의 (0-a) 게이트. Irene 원문: 「권고대로 진행해」.
대상 diff: `git diff b94d466a3`(마지막 운영 배포 커밋) + 워킹트리 — 8파일 변경 · 미추적 2(배포기록 JSON · 선행 판정문).
운영 쓰기 0. 운영 읽기 시도 1(nginx 로그) → 권한 없음·확인 불가(§6).

---

## 0. 결론 — **PASS (조건부)**

배포해도 된다. 조건은 **배포 뒤 Irene 눈 확인 2건**(§7)이며 코드 보류 사유가 아니다.
마커: `fable-gate.js pass` (이 판정문 작성 직후 기록 · 지문 = 이 판정문 포함 상태).

---

## 1. 범위 대조 — 선행 판정 §2 ↔ 실제 diff

| §2 항목 | 지시 | diff | 판정 |
|---|---|---|---|
| 1 | `userContexts.js` 상수 `BRAND_MANAGER_HAT_PERMISSIONS = ['dashboard','products']` + export | 그대로(주석 포함) | 일치 |
| 2 | `middleware/auth.js projectContext` `permissions: ctx.t==='brand' ? … : []` | `[...BRAND_MANAGER_HAT_PERMISSIONS]` 복사 | 일치(복사는 공유 배열 오염 방지 — 수용) |
| 3 | `routes/auth.js /switch-context` 응답 `isBrandHat ? … : []`, 토큰 claim 무변경 | 응답 1줄만 | 일치 |
| 4 | 테스트 ⑧-2·⑧-3 단언 추가, ③ 그대로 | 2줄 추가 · 테스트 수 38→38(삭제 0, b94d466a3 대비 동일) | 일치 |
| 5 | 프론트 변경 0 · `MainLayout.tsx` 🔒 무접촉 | MainLayout 변경 0 · print-guard 8/8 | 일치 |
| 6 | 설계문서 §5.5 한 줄 | 1줄 | 일치 |

**설계 밖 변경 2건 — 판정:**
- `dev-frontend/e2e/brand-manager-hat.spec.js` +10줄: 사이드바 Dashboard·Brands→Brand Menus 단언. 검증 강화, 운영 영향 0. **수용.**
- `dev-frontend/src/pages/Settings/CardTerminalSettings.tsx` +16줄 · `sw.js` 5.74 bump: **(0-a) 범위 밖**이지만 Irene 원문(「앱에서 열어도 자동으로 단말기 ip 주소를 자동을 안찾잖아?」·「자동 찾기 안되는데 어떻게 해? 왜 안돼?」)에 대한 팀원 수정. 3축으로 보면 A 작음(설정 화면 표시 한 칸·돈/주문/인쇄 무접촉) · B 가역(프론트 번들·롤백 경로 그대로) · C 길 하나(브릿지 감지를 상태로 바꾸고 짧게 재확인하는 것 외 대안 없음) → **팀원 결정 범위, 묶음 배포 수용**(인쇄 규율 「안 되던 것은 묶어서 한 번에」 와도 일치). 내용 판정은 §2.
  선행 판정의 「프론트 변경 0이라 SW bump 불필요」는 이 추가로 무효 — 프론트가 바뀌었으니 **5.74 bump 는 필요하고 맞다.**

## 2. 단말기 브릿지 재확인 — 코드 판정

실측(코드):
- `mobile-app/android/.../MainActivity.java:34` — 브릿지 JS 는 `WebViewListener.onPageLoaded`(= 페이지 load 완료 뒤) 에서 `evaluateJavascript` 로 1회 주입. 원격 URL(`capacitor.config` server.url=`https://purplehere.com/pos`) 라 **앱 안 SPA 이동은 재주입 없음** — 페이지 load 때 열려 있던 화면이 설정이면 그 컴포넌트는 주입 전에 그려진다.
- `nativePrintBridge.js:52-60` — `Cap.Plugins.NativeEcr` 가 있을 때만 `window.__NATIVE_ECR` 생성. 이 플러그인은 10-01(a40e6e659) 추가, 10-02 앱 0.3.0(db3857110). **0.2.0 에는 없다.**
- 수정 전 `CardTerminalSettings.tsx:36` `const bridge = !!getEcrBridge()` — 렌더마다 재계산되지만 **재렌더를 일으키는 것이 없어** 마운트 시점 값이 굳는다. 자동 확인 effect(`[v.enabled, bridge, restaurantId]`)와 찾기·연결확인 버튼 전부 `bridge` 에 걸려 있음 → 굳으면 영영 안 뜸.
- 수정: `bridge` 를 state 로, 없으면 0.5초×20 회 재확인, 생기면 즉시 중단·effect 재실행, 언마운트 시 clearInterval. 브라우저(브릿지 영구 없음) 경로는 10초 뒤 멈추고 안내 문구 그대로. 훅 순서 정적(새 훅 2개는 선언 위치 고정) · check-hook-tdz 통과 · mount sweep 크래시 0.
- 같은 패턴 `PaymentModal.tsx:537 ecrBridgeReady = !!getEcrBridge()` — 결제 모달은 결제 시점(주입 훨씬 뒤)에 열리고 상태 변화마다 재렌더되므로 **무조치가 맞다.** 기록만.

판정: **최소·가역·방어적. 수용.** 단 이 수정이 Irene 태블릿 증상을 고치는지는 **원인에 따라 다르다**(§6) — 수정 자체는 둘 중 하나(타이밍)만 막는다.

## 3. 기계 게이트 — 내 재실행 (팀원 보고 그대로 믿지 않음)

| 게이트 | 결과 |
|---|---|
| `check-sensitive-diff` | ⑤ 보안 경계 2건(auth.js·routes/auth.js) → 게이트 대상 — 예상대로 |
| `check-print-guard` | 8/8 변경 없음 |
| `check-design-guard` | 신규 위반 0 (합계 299 / baseline 295 — 지문 집합 비교라 중복 계수 차이, 이 diff 와 무관) |
| `jest tests/user-contexts-switch.test.js` | **38/38** (b94d466a3 도 38 — 삭제 없음. 선행 마커 note 의 「41」은 다른 묶음 수치) |
| `health-check --category=auth` | 13/13 |
| `verify-all --full` | **24/24** · mount sweep 은 번들 지문 동일로 07:09 통과 재사용(sweep 자체는 팀원 실행 671초 크래시 0) |
| e2e `brand-manager-hat.spec.js` (`-c e2e/playwright.config.js`) | **2/2**(1440·390) 52초 · 사이드바 Dashboard·Brands→Brand Menus 단언 포함. 첫 시도는 `-c` 누락으로 demo-guard 가 baseURL 을 막음 = **운영 보호 가드 작동 확인(의도치 않은 반증 1회)** |

## 4. 실호출·반증
- API: jest ⑧-2(`/switch-context` 응답 permissions) · ⑧-3(`/me` 투영 permissions) 둘 다 `['dashboard','products']` 정확 일치 단언 — 투영 두 곳 모두 실호출로 증명.
- 실브라우저: e2e 가 demo RA 23 → 브랜드 17 모자 → 사이드바 Dashboard 보임 → Brands 클릭 → Brand Menus 보임 → 메뉴 편집·원복 → 회수. 팀원 3회 + 내 1회 통과.
- 반증(팀원 보고): `projectContext` 를 `[]` 로 되돌림 → ⑧-3 실패 · cp 원복 cmp 동일 · pm2 restart 뒤 38/38. 단언이 정확 배열 비교라 되돌리면 반드시 실패하는 구조 — 수용.
- Operations·Plans 미표시(§2 ④): e2e 에 음성 단언은 없다. 키 집합이 `dashboard`·`products` 뿐이고 `hasManagerPermission` 이 `includes` 라 코드상 자명 — 추가 요구 안 함.

## 5. 배포 안전성
- 마이그 0 · ENUM 0 · 레지스트리 변경 0.
- SW 5.74 bump 가 소스·`dev-frontend-build/sw.js`(06:56) 모두 반영. 배포 기록 `releases/2026-10-04-bm-sidebar-terminal-bridge.json` 7칸·fable_note 있음(verify-all 배포준비 통과).
- 롤백: 직전 운영 배포(b94d466a3 · SW 5.73) 로 표준 경로. 백엔드 변경은 BM 모자 투영에만 닿고 **운영 모자 부여 행은 restaurant 1행뿐**(선행 판정 §1-1) → 배포 직후 영향받는 운영 사용자 0명.
- 🔒 인쇄·KDS 보호파일 무접촉.

## 6. Irene 「자동 찾기 안 되는데 어떻게 해? 왜 안 돼?」 — 원인 판정

사실: 운영 `terminal_transactions` 0행(팀원 2회 확인) = 설정 화면이 **한 번도 「앱 연결 기능 있음」 상태로 열린 적이 없다**(있었다면 자동 확인이 echo 행을 남긴다). 즉 단말기·와이파이 문제가 아니라 **화면이 앱 기능을 못 봤다.**

원인 후보 (가능성 순):
1. **태블릿 앱이 0.2.0** — 단말기 연결 기능(NativeEcr)은 0.3.0 에서 들어갔다. 0.2.0 이면 코드가 아무리 맞아도 「앱에서 여세요」 안내만 뜬다. **확인: 설정 화면의 `app v…` 배지(App.tsx:521)가 `0.3.0` 인지.** 0.2.0 이면 답은 APK 업데이트 하나 — 이번 수정과 무관.
2. **타이밍(이번 수정이 막는 것)** — 앱은 페이지 load 뒤에 기능을 끼운다. 오늘 06:11 배포 뒤 SW 가 열려 있던 화면을 스스로 새로 고쳤는데(「새로고침 두 번」 기록) 그때 설정 화면이 열려 있었다면 화면이 기능보다 먼저 그려져 「없음」이 굳는다. 앱을 설정 화면에서 다시 열 때도 같다. 5.74 배포 뒤엔 10초 안에 다시 본다.
3. 카드 단말기 토글 OFF 또는 매장 미지정 — 가능성 낮음(Irene 이 자동 찾기 칸을 본 것으로 들림).

**확인 불가(명시):** 운영 nginx 로그는 irene 계정에 읽기 권한이 없어(건수 자체가 비어 나옴) 태블릿 UA·번들 확인 못 함 · 태블릿 앱 버전은 서버에서 알 수 없음 · APK 배포 경로 조회는 도구 거부.

## 7. 다음 단계 (순서 고정)

| 순서 | 내용 | 주체 |
|---|---|---|
| **(0-a) 배포** | Irene `/배포` — 이 묶음(SW 5.74). 배포 뒤 Irene 눈 확인 2건: ① 태블릿 앱 배지 `app v0.3.0` 인지 → 설정 › 결제 › Card 에서 「연결 확인 중… → ✓ 같은 와이파이」(또는 찾기 버튼 등장). 0.2.0 이면 APK 업데이트 먼저. ② 소유자 help@(user 23) 로 Brand Menus 200 회귀(선행 게이트 조건 승계). | Irene / 팀원 보조 |
| **(0-b) Kate 부여** | SA Staff Management → user 19 `kate.kim.snkn@gmail.com` → 유형 「브랜드」· 「K-DINE with MIN (2)」· Brand manager. **운영 쓰기 = 이 1행.** 부여 뒤 Kate 에게 두 줄: 「로그인하면 카드 2장 — 매장 일은 Kate 카드, 메뉴 수정은 K-DINE 카드(왼쪽 Brands › Brand Menus). 저장하면 매장에 자동 반영」 | Irene(SA 화면) |
| ① refresh · ② options 짝 | 선행 판정 §3 그대로 — (0-a) 와 무관하므로 먼저 해도 됨. ③ 직전 ① 1회 재실행(드라이런 표 → 승인) | 팀원(밤·표 승인) |
| ③ 잠금 5칸 + auto + version+1 → sync 1회 | **(0-a)(0-b) + Kate 안내 완료 뒤에만** | 팀원 |
| ④~⑧ | 그대로(순두부·병합·GIT 연결·원가·재검사) | 팀원 |

권고 일정 유지: 오늘 배포 → 부여 → 데이터 밤 1회 「①②③④⑤⑥⑦⑧」 로 한 밤에 닫는다.

## 8. Irene 에게 (전달문)
> (0-a) 수정은 통과입니다. 백엔드 3줄(모자에 사이드바 표시 키 `dashboard`·`products`)이 설계와 정확히 일치하고, 제가 직접 다시 돌린 결과 jest 38/38 · e2e 2/2(사이드바에 Dashboard·Brand Menus 보임) · verify-all 24/24 · 인쇄 보호파일 무접촉입니다. 함께 묶인 단말기 설정 화면 수정(앱 기능을 10초 동안 다시 확인)도 안전해서 같이 배포해도 됩니다.
>
> 「자동 찾기 왜 안 돼?」 — 단말기나 와이파이 문제가 아니라 **화면이 앱의 단말기 기능을 한 번도 못 본 것**입니다(운영 기록 0건). 두 가지 중 하나입니다. ① 태블릿 앱이 아직 **0.2.0** 이면 단말기 기능 자체가 없어서 안 됩니다 — 설정 화면의 `app v…` 표시를 봐 주세요. 0.3.0 이 아니면 앱 업데이트가 답입니다. ② 0.3.0 인데도 안 됐다면, 앱이 기능을 늦게 끼우는 사이 화면이 먼저 열려 「없음」으로 굳은 것이고, 이번 배포가 그걸 고칩니다. 배포 뒤 설정 › 결제 › Card 를 열어 「연결 확인 중… → ✓ 같은 와이파이」 가 뜨는지 한 번 봐 주세요.
>
> 승인하시면: `/배포` → 태블릿 확인 → SA 화면에서 Kate 에게 K-DINE 브랜드 관리자 부여(운영 쓰기 1행) → 데이터 정리 밤 1회 순서로 갑니다.
