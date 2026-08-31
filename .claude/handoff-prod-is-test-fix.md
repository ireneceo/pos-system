# 운영서버 Claude Code 에게 — 계정 2개 테스트표시 해제 (읽고 그대로 실행)

아래를 **그대로 복사해서** 운영서버 Claude Code 세션에 붙여넣으세요.

---

운영 DB(`purple_production_db`)에서 잘못 붙은 테스트 표시 2건을 해제해줘. 아래 조건을 반드시 지켜.

## 배경 (왜 이걸 하는지)

매 배포마다 도는 `scripts/mark-demo-accounts.js` 가 "화이트리스트에 없으면 전부 테스트 계정으로 표시"하는 방식인데,
그 제외 조건이 **username 목록과 매장 ID 둘뿐**이었다. 브랜드 운영자는 매장에 소속되지 않아
`restaurant_id` 가 NULL 이라, 이름이 목록에 없으면 배포할 때마다 `is_test=1` 로 다시 표시됐다.

`utils/notificationService.js` 의 알림 관문(1-a2, :207)이 `is_test` 를 보고 발송을 건너뛰기 때문에,
**실제 이메일 주소를 가진 브랜드 운영자 2명이 알림을 전혀 못 받고 있었다.**

스크립트 쪽 근본 수정은 개발서버에서 이미 끝났다(커밋 `79e55034` — 실고객 판정을 코드 하드코딩이 아니라
DB 컬럼 `is_real_customer` 에서 읽도록 전환, 연속 3회 실행 지속성 리허설 통과).
**그 수정은 2026-08-31 운영 배포 완료**(커밋 `c9872f0f` 포함). 컬럼·시드 운영 반영 확인:
`brands` 1·2·5 / `restaurants` 8·10·16·24·25 = `is_real_customer=1`. 더는 뒤집히지 않는다.
지금 필요한 건 **이미 잘못 붙어 있는 2행을 되돌리는 것**뿐이다.
(스크립트에는 test→real 자동 복원 절을 일부러 넣지 않았다. 자동 복원은 진짜 시험 계정에
실제 메일이 나가는 역방향 사고 위험이 커서 기각됐다.)

## 대상 (정확히 2행, id 로 못 박혀 있음)

| id | username | email | role | brand_id | 현재 |
|----|----------|-------|------|----------|------|
| 11 | `K-DINE Brand` | `irene@gitconsulting.group` | Brand General | 1 (`with MIN`) | `is_test=1` |
| 29 | `thefire` | `Xghz12@gmail.com` | Brand General | 5 (`The Fire`) | `is_test=1` |

둘 다 `is_demo=0`, `is_active=1`, `email_verified=1` 이고 **실브랜드를 운영하는 실계정**이다.

## 해야 할 일

`is_test` 만 `1 → 0` 으로 바꾼다. **`is_demo` 는 건드리지 마라** (이미 0).

```sql
UPDATE users SET is_test = 0 WHERE id IN (11, 29) AND is_test = 1;
```

## 반드시 지킬 것

1. **UPDATE 전후로 SELECT 를 찍어 결과를 보고에 남겨라.**
   ```sql
   SELECT id, username, email, role, brand_id, is_demo, is_test, is_active, email_verified
   FROM users WHERE id IN (11, 29) ORDER BY id;
   ```
2. **실행 전 안전 확인**: 조회 결과가 정확히 2행이고 username 이 `K-DINE Brand`·`thefire` 인지 확인.
   하나라도 다르면 **중단하고 보고**해라. id 가 다른 계정을 가리키고 있을 수 있다.
3. **`id IN (11,29)` 이외의 조건으로 UPDATE 하지 마라.** `WHERE is_test=1` 같은 광범위 조건 금지 —
   운영에 정상적으로 테스트 표시된 계정이 30건 있고(2 대상 제외), 그건 전부 그대로 둬야 한다.
4. **다른 계정을 같이 고치지 마라.** 특히 아래는 **표시가 맞는 것들이니 절대 건드리지 마라**:
   - `kdine_admin`(id 9) · `kdine_staff`(id 10) — 로그인 페이지 테스트 카드가 이 계정을 쓴다.
     `is_test=1` 이어야 `services/authService.js` 의 demo-login 가드를 통과한다. 풀면 테스트 로그인이 깨진다.
   - `brand_general`(5) · `foodcourt_general`(6) · `owner_test`(27) · `demo_*`(24·25·35·36·37) —
     `authService.js:804` `DEMO_KEY_TO_EMAIL` 에 등록된 지정 데모/테스트 계정 10개.
   - lua 계열 계정들(31·33·34·38·43·44·45·60·63) — 전부 데모/시험 매장 소속이고 주문 0건. 표시가 맞다.
5. **스키마 변경 금지.** 컬럼 추가·ALTER 하지 마라. `is_real_customer` 컬럼은 2026-08-31 배포에서
   마이그레이션(`scripts/migrate-real-customer-flag.js`)이 **이미 만들었고 시드까지 끝났다**
   (brands 1·2·5 / restaurants 8·10·16·24·25). 손대지 마라.
6. **코드 수정·배포 금지.** 이 작업은 데이터 2행 수정이 전부다.
7. 임시 스크립트를 만들었으면 **실행 후 반드시 삭제**하고, 잔재 0을 확인해 보고해라.

## 완료 보고에 포함할 것

- UPDATE 전 SELECT 결과 (2행)
- 실제 변경된 행 수 (`affectedRows`)
- UPDATE 후 SELECT 결과 (2행, `is_test=0` 확인)
- 전체 분포 대조: 작업 전 `users` 49건 중 `is_test=1` **32건** → 작업 후 **30건** 이어야 한다.
  (2026-08-31 배포 후 기준. 배포로 실매장 직원 2명 `r8:Wai`·`r8:James` 가 이미 정상 복구돼 34→32 가 됐다.)
  숫자가 다르면 다른 행을 건드린 것이니 즉시 보고.
- 임시파일 잔재 0 확인

## 배경 참고 (더 알고 싶으면)

- 개발서버 `/var/www/.claude/session-state.md` 의 "2026-08-31 알림 3종" 절
- `dev-backend/scripts/mark-demo-accounts.js` 상단 주석 (근본 원인·전환 이유)
- 메모리 `[[reference_notification_six_gates]]` — 알림이 개인별로 조용히 빠지는 관문 6개
