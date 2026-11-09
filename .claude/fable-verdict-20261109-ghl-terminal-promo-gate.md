# Fable 판정 — «태블릿 + 프린터 + 카드단말기면 끝» 안내·어필 구현 — 게이트 검증(gate)

- 날짜 2026-11-09 · 종류 `gate`(운영 DB 마이그 ENUM 확장 포함 — 공용 기준 ③) · Fable 2회차(설계 1 + 검증 1 = 한도 안)
- 설계 원본: `.claude/fable-design-20261109-ghl-terminal-promo.md`
- 검증 방식: 읽기만(git diff · 파일 읽기 · 팀원 스크린샷). 실호출·게이트 숫자는 팀원 실측을 그대로 썼다(이 방은 백그라운드라 허락 창을 못 넘음). fable-gate 마커는 **찍지 않음**(작업 트리에 다른 방의 돈·마이그 미커밋 변경이 섞여 지문이 이 일만의 것이 아님 — 이전 방들 관례).

---

## 판정: **PASS** (조건 2 · 기록 4)

운영 배포를 막을 결함은 없다. 아래 «조건» 은 배포 준비 방·운영검증이 그때 하면 되는 것이고, 코드 수정을 요구하지 않는다.

### 조건 (배포 때)
1. **SW 버전·배포 기록은 배포 준비 방 몫** — verify-all 의 유일한 실패 `deploy-ready`(오늘 배포 기록 없음 · 화면 버전 6.16 그대로)는 이 일의 결함이 아니다. 프론트가 바뀌었으니 배포 준비 때 화면 버전을 올린다(이 일에서 올리지 않은 것이 맞다 — 빌드 1회 원칙).
2. **운영검증 항목 1줄 추가** — 배포 뒤 운영 `/faq?category=features` 에 카드단말기 FAQ 2문항이 보이는지. 이유: `migrate-faq-card-terminal-20261109.js` 는 `content_categories` 에 `features`(type faq) 가 없으면 그 글을 건너뛰고도 표지를 써서 다음 배포부터 영원히 건너뛴다. 운영엔 기존 FAQ 가 그 분류를 쓰고 있어 있을 것이 거의 확실하지만, 기계로 못 가른 것은 확인 항목으로 둔다.

---

## 근거

### ① diff 범위 대조 — 설계 밖 변경 0
| 설계 자리 | 구현 | 대조 |
|---|---|---|
| §3-1 설정 › 카드 꺼짐 안내 | `CardTerminalSettings.tsx` — `!v.enabled` 일 때만 제목·`<ol>` 3줄·`ModalButton variant="secondary"`·`window.open('/contact?type=card_terminal','_blank','noopener')`·after 한 줄. 상자 없음 · `data-testid="card-terminal-get-started"` | 설계 그대로(«ModalButton as Button» 은 이 파일이 원래 쓰던 것) |
| §3-2(a) 백엔드 | 모델 ENUM 끝에 `card_terminal` + comment · 마이그 `expandEnum(..., ['card_terminal'])` 한 값만 · `process.exit` · 레지스트리 `deploy` · `public.js` 메일 두 통에 보라 블록(`#F5F3FF/#5B21B6`) 문구 설계 원문 그대로 · 저장 로직 무변경 | 설계 그대로 |
| §3-2(b) ContactPage | `useSearchParams` + `location.state` 둘 다 · 허용 목록 6종(free_trial 제외) · `card_terminal` 이고 본문 비었을 때만 prefill(i18n ready 뒤) · select 에 Pricing 다음 Demo 앞 · 고르면 help 한 줄(13px #6B7C93) · `track('generate_lead')` 에 `inquiry_type` 이미 있음(tracking.ts 무접촉) | 설계 그대로 |
| §3-2(c) 관리자 | 타입 유니온 · 라벨 `Card terminal` · 배지 `#EEF2FF/#4338CA` | 설계 그대로 |
| §3-3 기능 페이지 | `card_terminal points 3→5` · `activeRole.key==='restaurant'` 일 때만 띠 1개(advanced 아래·CTA 위) | 설계 그대로 |
| §3-4 홈 카드 3 | landing.json 문구만(코드 0) | 설계 그대로 |
| §3-5 다운로드 | Windows desc 보정 · Grid 아래 `<CounterSetupStrip hideDownload />` | 설계 그대로 |
| §3-6 FAQ | 데이터 JSON en·ko 가 설계 표와 글자 단위로 같음 · 분류 features · 정렬 31·32 · 마이그는 20261011 의 ②③ 과 같은 구조(slug / `slug-lang` · 같은 group · 표지 `faq_card_terminal_20261109`) | 설계 그대로 |
| §3-7 패키지 · §3-8 가격 | `SoftwareNote` 한 줄 더 + 링크 · `CTASubtitle` 두 번째 줄 + 링크, 버튼은 하나 유지 | 설계 그대로 |
| §4 띠 | `styled.section/div` 만 · 버튼은 공용 `Button primary` · 글리프 `▭ ≡ ▦` 26px #635BFF aria-hidden · 720px 1열 · `data-testid="counter-setup-strip"` | 설계 그대로. 버튼이 `navigate('/contact?type=card_terminal', {state})` 로 주소·state 둘 다 넘기는 건 설계(state)보다 넉넉한 쪽 — 문제 없음 |
| §5 경계 | `git status` 에 PaymentModal · TerminalPanel · terminalSale · 🔒 인쇄 보호파일 8개 · KDS · orders-crud · tracking.ts · index.html 모두 **이 일로는 변경 없음**(결제·단말기 관련 변경 파일은 CardTerminalSettings 하나). 새 라우트·GNB·패키지 DB·견적 API 변경 없음 | 지킴 |
| 문구 금지 목록 | 수수료·계약·승인 기간·«파트너»·«무료 단말기»·«모든 기종 호환» — en·ko·zh·ms 전부에 없음. «may not connect / 보장하지 못합니다 / 不保证能够连接 / mungkin tidak dapat disambungkan» 로 단정 피함 | 지킴 |

zh·ms 번역: 새 키 27(landing)+10(settings) 가 en 과 같은 자리 · 고유명사 GHL · PayHere Direct · DuitNow · PurpleHere 보존(각 언어 GHL 12줄) · 뜻이 영어 원문과 같음(표본 전부 읽음).

### ② 가드 스크립트 (팀원 실측)
- `check-print-guard` 8/8 변경 없음 · `check-design-guard` 신규 0 · `check-migration-registry` 통과 · `i18n:verify` 0 오류 · 빌드 1회 성공.
- 레지스트리 `deploy` 끝 2줄이 이 일의 것(같은 파일의 `migrate-company-logo-to-file` · `migrate-subscription-item-type-repair` 2줄은 다른 방 미커밋 — 이 판정 밖).

### ③ 실호출·회귀 (팀원 실측 — 숫자 그대로)
- ENUM 마이그 1회차 `+= card_terminal` · 2회차 «이미 최신» · COLUMN_TYPE 에 7값(기존 6 보존). `expandEnum` 은 값이 하나라도 사라지면 throw 하므로 소거 가드 내장.
- FAQ 마이그 1회차 새로 8줄(2 slug × 4 언어, group 36·37) · 2회차 표지로 건너뜀.
- `POST /api/public/contact` card_terminal → 201 · DB 저장 확인.
- 실브라우저 21/21(홈 카드·기능 매장 탭 띠 1/브랜드 탭 0·문의 미리 채움·맨손 빈 값·`?type=free_trial` 무시·다운로드·패키지·가격·FAQ 2문항·설정 꺼짐 안내·새 탭 주소·390px 넘침 0·콘솔 오류 0). 스크린샷으로 설정 안내(ko)·띠(en) 모양 확인 — 설계 그림과 같음.
- health-check 전체 · mount sweep 8역할 · 타입 기준선 · 인스펙션 통과.

### ④ 배포 안전성
- 마이그 2개 모두 멱등 · `process.exit` · `deploy` 등록 → 배포 루프가 자동 실행. 롤백: ENUM 값 추가는 되돌릴 필요 없음(기존 코드와 호환) · FAQ 는 행 8개 + 표지 1개뿐.
- **팀원이 판단 안 한 항목 — 판정:** «`sync-contents-to-prod.js` 가 translation_group_id 를 dev 값(36·37)으로 덮을 수 있다» 는 **사실이 아니다.** 그 스크립트 268~287행은 운영에 같은 slug+language 행이 있으면 **운영의 group 번호를 재사용**하고, 없으면 운영 `MAX+1` 을 새로 딴다(dev 번호를 그대로 쓰지 않음). 배포 순서도 마이그(905행) → 콘텐츠 동기화(1350행)라, 운영 마이그가 먼저 만든 group 을 동기화가 그대로 잇는다. 조치 없음.
- **설계 §3-8 각주(«모든 플랜에 포함» 확인) — 팀원 보고에 없어 내가 봄:** `/api/terminal` 라우트는 `requireModule` 계열을 쓰는 라우트 목록에 없고, 단말기용 module_code 도 없으며, 티어 게이팅 파일 어디에도 card terminal 참조가 없다. 단말기 연동은 POS 터미널 안의 기능이라 플랜으로 갈리지 않는다 → 문장 그대로 둔다.

---

## 기록 (결함 아님 · 이번 범위 밖)
1. `inquiry_type:'ghl'` 같은 잘못된 값 → 500 은 **기존 동작**(라우트에 허용 목록 없음). 다음 할 일: 허용 목록 + 400. 이번 일이 만든 것이 아니라 조건으로 걸지 않음.
2. 관리자 알림 메일 1통이 개발서버에서 실제 발송된 것은 기존 개발서버 동작(손님 메일만 차단). 기록만.
3. **확인 못 함(팀원 명시):** 안드로이드 계산대 앱 WebView 안에서 설정 «카드단말기 신청하기»(`window.open` 새 탭)가 열리는지 — 실기기 없음. 같은 방식이 프린터 안내 EspBluFi 버튼에 이미 쓰이고 있어 같은 결과일 가능성이 높다. 보고에 «확인 못 함» 으로 그대로 남긴다. 안 열리면 그때 `href` 링크로 바꾸면 되는 되돌릴 수 있는 변경.
4. 설계 §7 «다음 할 일» 그대로: RA 설정 체크리스트 «기기 연결» 단계 · 기능 페이지 스크린샷 2장 · 기존 FAQ 2건 한 줄 보강 · 블로그 1편.

## 확인할 곳 (보고용 — 설계 §6 그대로)
- https://dev.purplehere.com/features — 매장 탭 맨 아래 «Tablet + printer + card terminal» 띠 · Card Terminal Integration 카드 5줄
- https://dev.purplehere.com/contact?type=card_terminal — 문의 종류 «Card terminal (GHL) request» 선택·본문 틀
- https://dev.purplehere.com/faq?category=features — 카드단말기 FAQ 2문항
- https://dev.purplehere.com/restaurant/38/settings?tab=payment — 카드 › Card terminal integration 꺼짐 «필요한 것» 3줄 + 버튼 [as=restaurant store=38]
