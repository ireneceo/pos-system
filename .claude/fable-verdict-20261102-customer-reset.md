# Fable 게이트 판정 — 손님(모바일) 비밀번호 재설정 링크 DB 보관 (2026-11-02)

**판정: PASS** (조건 없음 · 권고 2건은 배포를 막지 않음)

사실 문서: `.claude/fable-facts-20261101-password.md` «추가 (2026-11-02)» 절 · Irene «권고대로 진행해 줘»(A — DB 저장)
앞선 판정: `.claude/fable-verdict-20261101-password.md`(PASS · 권고 1 = health-check 의 brand_id=1 하드코딩 → 데모 브랜드 조회. 이번에 반영됨을 확인)

## 1. 게이트 대상 근거
- `check-sensitive-diff.js`: ③ DB 스키마·마이그(`models/Customer.js` · `scripts/migrate-customer-reset-token.js`) + 안전망 자체(`health-check.js`) 접촉 → **gate 대상 맞음**. 로그인·비밀번호 경로라 보안 경계이기도 하다.
- 🔒 인쇄 보호파일 무접촉: `check-print-guard.js` **8/8 변경 없음**.

## 2. diff 범위 대조 — 설계(사실 문서 «바꾼 파일») 밖 변경 0
| 파일 | 본 것 | 판정 |
|---|---|---|
| `routes/customers-auth.js` | 메모리 `Map`·`setTimeout` 삭제(저장소에 `resetTokens` 잔재 **0**). `hashResetToken`(sha256) · `findCustomerByResetToken`(길이 200 상한 · 해시 조회 · 만료 판정) · `clearResetToken`. forgot = `customer.update` 로 덮어쓰기(옛 링크 무효) · slug 255 절단. verify/reset = 해시 조회 · 만료 시 칸 비움 · 재설정은 **비번+칸 3개 한 `update`**(1회용). 404 «Customer not found» 분기는 해시 조회가 손님 행 자체를 돌려주므로 자연 소멸 — 의미 변화 없음. 그 외 로직(member 만 · 이메일 발송 · 응답 문구) 무변경 | 범위 안 |
| `models/Customer.js` | 칸 3개(CHAR(64)/DATE/STRING(255), NULL 허용) + `toJSON` 재정의로 3칸 제외. 기존 칸·인덱스 무변경 | 범위 안 |
| `scripts/migrate-customer-reset-token.js`(새) | information_schema 로 있으면 skip · ADD COLUMN ×3(NULL) + 인덱스 1 · `--dry-run` · `process.exit` 명시(마이그 exit 규칙) · ENUM 접촉 없음(expand-only 규칙 해당 없음) | 범위 안 |
| `scripts/migrations.registry.json` | `deploy` 끝에 1줄 추가 — `check-migration-registry.js` **통과**(미분류·유령·중복 0) | 범위 안 |
| `scripts/health-check.js` | auth 1건 추가(손님 링크 DB 보관·재사용 400·만료 400·toJSON 칸 없음 — 임시 손님 1명 insert → finally 삭제, 메일 발송 없음) + 11-01 검사의 brand_id → `brands.is_demo=1` 조회(권고 1 반영). 같은 파일 security «브랜드 매장 범위» 1건은 **다른 방(brand performance)** 것 — 이 판정 밖 | 범위 안 |

**설계 점검(내가 본 것):**
- 원문 토큰은 어디에도 저장되지 않는다(해시만). 토큰 32바이트 무작위 → 해시 역산·추측 불가. 조회는 인덱스 칸 등가 비교.
- 노출 경로 점검: 손님 객체를 그대로 응답에 싣는 라우트 없음 — `customers-admin.js` 는 `attributes: ['id','phone','name','email','type']` 로 한정, `customers-self.js`·`membership.js` 는 칸을 골라 담음, `Customer` 를 `include` 하는 라우트 **0**, `FROM customers … *` raw SELECT **0**. 따라서 `toJSON` 제외는 2중 안전망이지 유일한 방어가 아니다.
- 만료 비교: DB 쪽 `NOW()` 기준 insert 와 Node `Date.now()` 비교가 dev 에서 일치(sequelize `timezone: '+00:00'`), 운영 서버도 UTC.

## 3. 가드 스크립트
- `check-print-guard.js` 8/8 · `check-migration-registry.js` 통과 · `check-sensitive-diff.js` 대상 판정(위). Opus 보고: design-guard 신규 0 · i18n 통과 · type-baseline 은 PlanQ 빌드 메모리 게이트로 막힘(재실행 예정 — 프론트 변경 0 이라 이 일의 위험은 아님).

## 4. 실호출·회귀 (Fable 독립 재실행)
- `health-check --category=auth`: 이 일의 새 검사 **3회 연속 통과**. 마이그 재실행 → 칸 3·인덱스 전부 skip(**멱등 증명**). dev `customers` 칸 3개·인덱스 1개 존재 확인(33행 · 토큰 보유 0).
- **고장주입 1/1 (Opus 와 다른 지점)**: reset-password 의 `update` 에서 칸 비우기를 제거(비번만 저장) → pm2 restart → 새 검사 **실패 «재사용 200»** → 사본으로 원복 `cmp` 동일 → restart → **통과**. 반증 성립(«1회용» 단언이 실제로 검사된다).
- Opus 고장주입(옛 메모리 Map 판 → «DB 보관» 실패)·pm2 restart 뒤 valid 유지·forgot 실호출 숫자는 보고 그대로 수용(forgot 실호출은 메일 발송을 수반해 Fable 은 재실행하지 않음).
- 임시 데이터 잔재: `customers` 0 · `users zzhcpw%` 0.
- **관찰(이 변경의 결함 아님)**: 같은 범주를 15분 안에 3번 돌리자 **11-01 검사**가 `/auth/reset-password` 의 `forgotPasswordLimiter`(5회/15분) 에 걸려 429 로 1회 실패(«재설정 429»). 한 번 돌릴 때 호출 2회라 정상 배포 게이트(1회 실행)에서는 걸리지 않지만, 반복 실행 시 거짓 실패가 난다 → 권고 2.

## 5. 배포 안전성
- 마이그 1개: `ADD COLUMN … NULL` ×3 + 인덱스 1, MySQL 8.0(dev 8.0.46) 에서 ADD COLUMN 은 INSTANT, 인덱스 생성은 online — 테이블이 작아(dev 33행) 잠금 부담 무시 수준. 레지스트리 `deploy` 라 매 배포 재실행되며 skip 으로 끝난다.
- 롤백: 코드만 되돌려도 칸 3개는 NULL 로 남아 무해(옛 코드는 그 칸을 읽지 않음). 배포 직전까지 메모리에만 있던 손님 링크는 재시작으로 어차피 끊긴다(기존 동작과 같음, 악화 아님).
- 프론트 변경 0 → SW bump 불필요(손님 화면은 같은 API 계약).
- 운영 반영: 다음 배포 때.

## 6. 권고 (배포 조건 아님)
1. `Customer.toJSON` 의 `{ ...this.get() }` 은 중첩 include 가 있을 때 하위를 인스턴스로 둔다(현재 Customer 를 include 하는 곳이 없어 영향 0). 다음에 손댈 때 `this.get({ plain: true })` 로 바꾸면 정석.
2. health-check 11-01 검사가 `forgotPasswordLimiter`(5/15분) 아래 `/auth/reset-password` 를 치므로 15분 안 반복 실행 시 429 거짓 실패 — 검사에서 429 를 «환경 제한» 으로 구분해 알리거나 NODE_ENV=development 에서 limiter 를 느슨하게 하는 쪽 중 하나를 다음 health-check 손볼 때 같이.

## 7. 마커
`fable-gate.js pass` 는 워킹트리 전체 지문에 찍힌다. **이 PASS 가 판정한 범위는 위 5개 파일(손님 재설정 링크 일) + 11-01 PASS 범위의 권고 1 반영분(health-check.js)** 이다. 같은 트리의 brand performance·GTM·middleware/auth.js 등 다른 방 변경은 각자의 판정에 따른다.
