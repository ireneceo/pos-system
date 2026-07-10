# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-10 (모델 독립 안전개발 기반 구축 — dev 전용·미배포. Fable 구축·Opus 실측검증)
**버전:** 운영=배포됨(웹 + 데스크탑 0.1.7). 이번 세션 dev분 미배포. 버전 미상승.
**작업 상태:** 완료 (Irene "다음 섹션에서 계속" 지시 — 잔여 로드맵 이어감)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 2026-07-10)
> Irene "Fable에게 — 너(Opus) 없어도 개발 문제없게 잘 확장하도록 안정적 구조·아키텍처·스킬 탁월하게 보완해 달라." → Fable 진단→설계→구현, Opus 실측검증·조율. 목표=model-agnostic 안전 개발 확장. 단일진실 메모리 [[reference_model_independent_safety_scaffolding]], 온보딩 입구 `docs/AGENT_ONBOARDING.md`. 전부 **dev 전용·운영 무접촉·미배포**.

- **verify-all 단일 러너** (`dev-backend/scripts/verify-all.js`) — 기계 게이트 12종 1명령(표준/`--full` mount/`--quick`/`--only`, fail-closed). 개별 스크립트 암기 불필요.
- **check-sensitive-diff** — CLAUDE.md Fable 5기준(🔒인쇄8/💰돈/🗄️마이그/🔐보안+⚠안전망) 경로패턴 자동분류→"Fable 대상" 기계판정(`--gate` fail-closed). 앵커=deploy-manifest 배포 스냅샷+git 합집합.
- **deploy-manifest** — 배포 성공 시 소스 sha256 스냅샷(`.claude/deploy-manifest.json`), "운영 대비 뭐 바뀌었나" 단일진실.
- **safety-guard 훅 규칙확장** — 인쇄8/KDS 보호파일·가드 baseline·bless·skip-safety 편집 **시점** ask(기존 활성 훅 확장, 신규 배선 아님).
- **배포 게이트 7→9 + post-build mount sweep** (deploy-to-production.sh) — 타임존·hydration 추가 + 빌드 직후 실브라우저 크래시 검사 fail-closed.
- **마이그레이션 레지스트리화** — 하드코딩 41목록→`migrations.registry.json` 단일소스(deploy 41+manual 23 이유명시) + `check-migration-registry.js`(미분류=스키마드리프트 fail-closed). 배포 스크립트가 레지스트리 소비.
- **roles-sweep verify-all 편입** — mount 커버 2역할(RA·BG)→5역할(+FG·Owner·Supplier). admin/manager는 demo계정 부재 graceful skip(문서화 갭).
- **E2E 뼈대** — `dev-frontend/e2e/`(playwright.config + demo-guard rid=38·운영도메인 throw 안전레일 + auth-roles 시나리오 a flaky0 + mobile-order b 스텁). opt-in(배포 게이트 아님).
- **AGENT_ONBOARDING.md** + CLAUDE.md/스킬 4개/session-state 배선 + 메모리 신규.

**검증(전부 실행):** verify-all 12/12·print-guard 8/8 무접촉·마이그 집합 41==41 독립대조(누락0·차이7=비마이그 게이트/싱크 스크립트 여전히 호출)·fail-closed 실증(sensitive-diff 돈경로→exit1·훅 보호파일→ask·미분류마이그→exit1, 전부 복원clean)·5역할 mount 466s exit0. 인쇄/KDS/돈 런타임 무접촉.

### 다음 확정 작업
- **Irene "다음 섹션에서 계속" 지시 → 안전기반 잔여 로드맵 이어감**:
  1. E2E 시나리오 b~f 구현(demo-guard 안전레일 위에서 — b 모바일주문은 유일 mutation이라 우선)
  2. timezone(242)·design(310) baseline 부채 점진 소거
  3. admin/manager mount 커버(demo 계정 부재 갭 메우기)
  4. 다음 `/배포` 후 `.claude/deploy-manifest.json` 자동생성 확인(델타 앵커 활성화)
- **배포 시 주의**: 이번 dev분에 `deploy-to-production.sh`·`.claude/hooks/safety-guard.sh`(안전망 파일) 변경 포함 → 운영 반영은 Irene `/배포` + 배포 전 리뷰 권장. (Irene 지시 전 배포 금지.)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 자동 추천 대상 아님.
- (안전기반) inspection suites·verify-all GATES·sensitive-diff CLASSES 지속 확장("피드백 1건=불변식 1개")
- prod `node sync-database.js`로 processed_ops 확인(오프라인 멱등, 없어도 무해)
- i18n `settings:printer.stations.noPrinterWarning` 4언어 파일 추가(현재 defaultValue 폴백)
- (이전 큐, 미착수) #8 매니저리포트 가짜매출·#24 구독변경배선(돈,Fable)·비전AI B2(Irene 키)·오프라인 편집배선 — 상세 아카이브 `DEVELOPMENT_PLAN.md`

---

## ⏳ 여전히 대기(물리) — with MIN(#10) 인쇄 데스크탑앱 0.1.7 매장 1회 테스트
> 앱 0.1.7 운영배포 완료(2026-07-09, Fable GO). 코드로 불가한 물리 확인만 남음. Irene 매장 방문 시 아래 순서. 백지 나와도 `printFormat=auto` 원격복구(재방문 불필요). 결과(Render check/백지)는 **Fable가 판단**해 다음 실행 지시(printToPDF 플랜B 등). Opus 단독 판단 실행 금지(2026-07-09 확정 방식).

> #### 🏪 매장 1회 테스트 절차 (with MIN #10 — 이 순서대로)
> 1. **앱 업데이트**: 0.1.5 앱 켜두고 수분~30분 → "지금 재시작" 뜨면 재시작. 안 뜨면 `purplehere.com/desktop/PurplePOS-Setup-0.1.7.exe` 수동설치 → **좌상단 배지 0.1.7 확인**.
> 2. **스테이션 프린터 지정**: Settings→Printer→Kitchen Stations→각 스테이션(**BAR 포함**) 드롭다운 **POS-80 선택**(미지정 스테이션엔 노란 경고) → 저장 → 주문→주방 티켓 나오는지.
> 3. **빌 인쇄**: 영수증이 **디자인(백지 아님)**으로 나오는지.
> 4. **오더티켓 디자인**: Settings→Printer→**printFormat='graphic'** → 오더티켓이 raw텍스트 대신 디자인으로.
> 5. **백지 나오면**: 재빌드 말고 **Ctrl+Shift+D → "Render check (PDF, no paper)"** → 화면 PDF에 내용있으면 드라이버문제(플랜B)/백지면 렌더문제. **결과를 Fable에 전달.**
> #### 🔙 백지 시 원격 즉시복구: Settings→`printFormat='auto'` 되돌리면 raw ESC/POS 복귀(인쇄 중단 없음). 앱 롤백: 0.1.6/0.1.5 설치본 재설치 가능.
> 상세 히스토리 = `docs/WITHMIN_PRINT_SAGA_2026-07-09.md`.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
