# 배포 기록 (솔루션 개발이슈)

**한 줄:** 배포할 때마다 개발 현황을 남긴다. 기록이 없으면 **배포가 막힌다**(fail-closed).

Irene 요구(2026-09-03): *"배포할 때마다 현재 작업중인 상태, 완료처리한 거, 진행중인 거, 이슈된거,
앞으로 해야 할 거 리스트업 해줘. 변경 후 바뀌는 현상, 추가로 체크해야 할 영역도 꼭 넣어.
그리고 개발자/관리자 시선으로 해."*

## 왜 파일이 소스인가
화면에서 입력하게 하면 잊힌다. 배포 스크립트가 저장소의 파일을 읽고, 없거나 비면 배포를 거부한다 —
**기억이 아니라 기계가 강제한다.** 그래서 쓰기 API 가 없다(화면에서 고치면 코드와 기록이 갈라진다).

## 절차
1. 배포 전에 `dev-backend/releases/<YYYY-MM-DD>-<태그>.json` 을 **정확히 1개** 만든다.
2. 7칸을 채운다. 없으면 빈 배열이 아니라 **`"none"`** 이라고 쓴다(빈 칸과 "없음"을 구분한다).
3. `./deploy-to-production.sh` — 안전 게이트 **10/10** 이 기록을 검사한다.
4. 배포·재시작·헬스 확인 뒤 운영 DB(`deploy_records`)에 적재되고, 파일은 `releases/archive/` 로 이동한다.
5. 시스템 관리자 화면 **`/pos/admin/deploy-records`("솔루션 개발이슈")** 에서 회차별로 본다.

## 7칸
| 키 | 뜻 |
|---|---|
| `in_progress` | 배포 시점에 진행 중인 것 |
| `completed` | 이번 배포에 들어간 것 |
| `issues` | 발견됐고 아직 안 닫힌 것 (`status: "open"` 이면 화면에서 빨갛게) |
| `upcoming` | 다음 사이클 후보 |
| **`behavior_changes`** | **변경 후 바뀌는 현상** — 화면·수치·동작이 달라지는 것 |
| **`check_areas`** | **추가로 체크할 영역** — 누가(`who`) 무엇을 눈으로 확인하는가 |
| `verification` | 돌린 게이트·계약 수·고장주입·`fable_note`·`sw_version`·`not_verified` |

항목 모양: `{ title, detail, scope, status }` (`check_areas` 는 `who` 추가).

## 게이트가 막는 것 (`scripts/check-deploy-record.js`)
- 기록 파일 **0개** → "기록 없음" / **2개 이상** → "어느 배포인지 모호"
- 7칸 중 하나라도 없거나 빈 배열 → 차단 (없으면 `"none"`)
- 민감영역 변경(`check-sensitive-diff` 판정)인데 `verification.fable_note` 없음 → 차단
- 프론트가 바뀌었는데 `verification.sw_version` 이 없거나 `public/sw.js` 값과 다름 → 차단
  (2026-09-03: 마커를 찍은 뒤 SW 를 올려 지문이 깨진 순서 오류를 기계로 막는다.
   순서는 **bump → build → 게이트 → 마커 → 배포**)

## 적재 실패는 fail-loud
코드는 이미 나갔으므로 롤백이 아니다. 배포 결과에 `[FAIL]` 을 찍고 수동 재적재 명령을 출력한다:
```
ssh <prod> "cd /var/www/production-backend && node scripts/load-deploy-record.js releases/<파일>"
```

## 공개 릴리즈 공지와의 관계
`scripts/release-vX.json` + `create-release-post.js` 는 **매장·공개 청중용 홍보 문구**다(랜딩 포스트·공지).
개발 기록은 **내부용**이고 매 배포 필수다. 주기가 달라 파일을 합치지 않는다 —
같은 회차면 기록에 `public_release: "3.16"` 만 적어 참조한다.

관련: `docs/AGENT_ONBOARDING.md`(배포 전 체크), `CLAUDE.md` 검증 단계.
