# 운영 DB 읽기 전용 계정 만들기 — Irene 님이 한 번만 하시면 됩니다

> 2026-09-11 · Fable 판정 A안 · 관련 코드 `dev-backend/scripts/prod-query.js`

## 이게 왜 필요한가요?

지금 Claude 는 운영 DB 를 볼 때마다 막힙니다. 그래서 배포 후 «운영 데이터에 문제가 없는지»를 숫자로 확인하지 못하고 «확인 불가»로 보고하고 있습니다.

이 설정을 하면:
- Claude 가 운영 DB 를 **읽기만** 할 수 있게 됩니다.
- **쓰기(수정·삭제)는 MySQL 자체가 막습니다.** Claude 가 실수로 쓰려 해도 DB 가 거부합니다.

소요 시간: 약 5분. 한 번만 하면 됩니다.

---

## 1단계 — 운영서버에 «읽기만 되는 계정» 만들기

### ① 운영서버에 접속

터미널에 붙여넣고 Enter:

```bash
ssh irene@87.106.78.146
```

→ 운영서버 프롬프트로 바뀌면 성공입니다.

### ② 계정 만들기 (세 줄을 한꺼번에 붙여넣고 Enter)

```bash
PW=$(openssl rand -base64 30 | tr -d '=+/' | cut -c1-32)
sudo mysql -e "CREATE USER IF NOT EXISTS 'claude_ro'@'localhost' IDENTIFIED BY '$PW'; GRANT SELECT, SHOW VIEW ON purple_production_db.* TO 'claude_ro'@'localhost'; FLUSH PRIVILEGES;"
printf "\n[client_claude_ro]\nuser=claude_ro\npassword=%s\n" "$PW" >> ~/.my.cnf && chmod 600 ~/.my.cnf && unset PW
```

각 줄이 하는 일:
- 1줄: 아무도 모르는 긴 비밀번호를 자동으로 만듭니다(화면에 안 나옵니다).
- 2줄: `claude_ro` 라는 계정을 만들고 **읽기(SELECT)만** 허락합니다. `sudo` 비밀번호를 물으면 Irene 님 서버 비밀번호를 넣으세요.
- 3줄: 그 비밀번호를 운영서버의 개인 설정 파일(`~/.my.cnf`)에만 저장하고, 본인만 읽게 잠급니다.

→ 아무 메시지 없이 끝나면 성공입니다.

### ③ 제대로 됐는지 확인 (한 줄씩)

```bash
mysql --defaults-group-suffix=_claude_ro -D purple_production_db -e "SELECT COUNT(*) FROM restaurants"
```
→ **숫자가 나오면 성공** (읽기가 됨)

```bash
mysql --defaults-group-suffix=_claude_ro -D purple_production_db -e "UPDATE restaurants SET name=name WHERE id=0"
```
→ **`UPDATE command denied` 가 나오면 성공** (쓰기가 막힘. 실제로 바뀌는 데이터는 없습니다)

### ④ 운영서버에서 나오기

```bash
exit
```

---

## 2단계 — Claude Code 에 «이 조회는 안전하다»고 알려 주기

Claude 는 운영 DB 접속을 기본적으로 위험한 일로 보고 막습니다. 1단계에서 만든 **읽기 전용 경로만** 허락한다고 알려 줍니다.
(이 설정은 사용자가 정하는 것이라 Claude 가 스스로 바꾸지 않습니다.)

### ① 설정 파일 열기

개발서버 터미널에서:

```bash
nano ~/.claude/settings.json
```

### ② 아래 내용 추가

**파일이 비어 있거나 없으면** 아래를 그대로 붙여넣습니다.
**이미 다른 내용이 있으면** 맨 바깥 `{ }` 안에 `"autoMode": { … }` 부분만 추가하고, 앞 항목 끝에 쉼표(`,`)를 붙이세요.

```json
{
  "autoMode": {
    "environment": [
      "$defaults",
      "Production database access for this project goes through /var/www/dev-backend/scripts/prod-query.js, which connects with a MySQL account that has SELECT privileges only."
    ],
    "allow": [
      "$defaults",
      "Running `node scripts/prod-query.js \"<SELECT/SHOW/EXPLAIN query>\"` from /var/www/dev-backend to read the production database is routine read-only work."
    ]
  }
}
```

저장: `Ctrl+O` → Enter → 나가기: `Ctrl+X`

### ③ 반영 확인

```bash
claude auto-mode config
```
→ 출력에 `prod-query.js` 문장이 보이면 성공입니다.

(어렵거나 오류가 나면 이 단계는 건너뛰고 Claude 에게 «2단계에서 막혔어»라고만 말씀하세요.)

---

## 3단계 — Claude 에게 한마디

Claude 세션에서 이렇게만 말씀하세요:

> **운영 DB 읽기 전용 계정 만들었어**

그다음은 Claude 가 합니다.
1. `node scripts/prod-query.js "SELECT 1"` 로 읽기가 되는지 확인
2. 쓰기를 넣어 **스크립트와 MySQL 둘 다 거부하는지** 증명
3. 2026-09-11 배포에서 «확인 불가»였던 운영 데이터 3건 확인
   - 매장에서 꺼진 채 남은 브랜드 외부 공급업체 계약 수(있으면 그 매장은 «Turn on» 필요)
   - 인보이스는 결제됨인데 발주는 미결제로 남은 건수
   - 매장 소유 재료에 남은 오버레이 원가 행 수
4. 프로젝트 설정에 남아 있는 옛 «운영 쓰기 허용» 규칙 정리(Irene 님 승인 후)

---

## 문제가 생기면

| 증상 | 뜻 | 할 일 |
|---|---|---|
| ②에서 `sudo: a password is required` 반복 | sudo 비밀번호가 틀림 | 서버 로그인 비밀번호로 다시 |
| ③ 첫 줄에서 `Access denied` | 3줄(설정 파일 저장)이 안 됨 | ② 세 줄을 다시 붙여넣기(계정은 이미 있어도 괜찮음) |
| ③ 두 번째 줄이 오류 없이 끝남 | 쓰기가 막히지 않음 | **멈추고 Claude 에게 알려 주세요** |

계정을 없애고 싶을 때(운영서버에서): `sudo mysql -e "DROP USER 'claude_ro'@'localhost';"`
