# 운영서버 배포 가이드

## 빠른 사용법

### 운영 서버로 배포
```bash
# 반드시 sudo로 실행 (nginx reload 권한 필요)
echo '7u7LnxNr' | sudo -S /var/www/deploy-production.sh
```

### 롤백 (이전 버전으로 복구)
```bash
sudo /var/www/rollback-production.sh [타임스탬프]
```

---

## 배포 프로세스 (deploy-production.sh)

1. **Git Pull** - 최신 코드 가져오기
2. **.env 백업** - 운영 .env 파일 백업 (rsync 전에)
3. **DB 백업** - 운영 DB 전체 백업 (압축)
4. **백엔드 코드 동기화** - rsync로 dev → production (.env 제외)
5. **백엔드 의존성 설치** - npm install --omit=dev
6. **DB 스키마 동기화** - Sequelize sync (alter: false)
7. **프론트엔드 빌드** - React 앱 빌드
8. **프론트엔드 배포** - build 폴더 복사
9. **PM2 재시작** - production-backend 재시작
10. **Nginx 리로드** - 캐시 클리어 및 리로드
11. **Health Check** - API 상태 확인

---

## 중요 사항

### .env 파일 보호
- 배포 스크립트가 rsync 전에 .env를 백업
- rsync는 --exclude='.env'로 덮어쓰기 방지
- 손상 시 백업에서 자동 복원

### DB 스키마 동기화 (2026-07-12 정정 — 중요)
- 배포는 `sync-database.js` 를 **`--alter` 없이** 실행한다 = **모델 로드만 검증하고 스키마는 전혀 바꾸지 않는다**(과거 `--alter` 컬럼 드롭 사고 때문).
- 따라서 **배포는 새 테이블·새 컬럼을 만들지 않는다.** 스키마 변경의 **유일한 경로 = `scripts/migrate-*.js`(멱등) + `scripts/migrations.registry.json` 의 `deploy` 등록**.
  - 등록을 잊으면 `check-migration-registry.js` 가 배포 전 fail-closed 로 차단.
  - 운영에 없고 **마이그도 없는** 테이블/컬럼이 있으면, 운영을 건드리기 전(백업·빌드·rsync 이전) 단계에서 배포가 **중단**된다(2026-07-12 신설). 등록된 마이그가 커버하면 통과.
- ⚠ 과거 함정(수정 완료): 마이그 실행 루프의 `while read` + `ssh` 조합에서 **ssh 가 stdin 을 삼켜 첫 1개만 실행**되고 나머지가 조용히 건너뛰어졌다(2026-07-10~12, 배포 3회). → `ssh -n` + **실행수 == 레지스트리수 대조(fail-closed)**. 배포 로그의 `배포 마이그레이션 N/N 실행 완료` 로 확인할 것.

### 배포 게이트는 fail-closed 이되 **fail-silent 는 금지** (2026-07-13)

배포가 막히는 건 정상이다(안전망). 그러나 **왜 막혔는지 모르면 다음 사람이 `--skip-safety` 로 우회한다.** 실제로 두 곳이 조용히 실패하고 있었다:

1. **스키마 export** — `node compare-schema.js --export ... 2>/dev/null` 로 stderr 를 버렸다. export 실패 시 스크립트가 `exit 2` 로 **아무 말 없이** 종료(반품 배포 1차 시도가 안전게이트 9/9 통과 후 여기서 죽었다). → **①stderr 표시 ②일시적 DB 경합은 3회 재시도 ③그래도 실패하면 원인을 찍고 `error`**.
2. **운영 백업** — `cp -r ... 2>/dev/null || true` 라 **실패해도 넘어가고 "Backup created" 를 찍었다.** 백업 없이 배포되면 **롤백 불가**. → 실패 시 `error` + **백업이 실제로 만들어졌는지 파일 수 검증 후에만 진행**.

회귀 박제: `health-check --category=pos` "배포 스크립트: 스키마 export·백업 실패가 조용히 넘어가지 않는다" — 옛 패턴(`2>/dev/null` / `|| true`)으로 되돌리면 배포 게이트가 잡는다.

### 백업 위치
- `/var/www/backups/[타임스탬프]/`
  - `.env.backup` - .env 파일
  - `db_backup_[타임스탬프].sql.gz` - DB 덤프

---

## 배포 자동 검증 (스크립트 내장)

배포 스크립트에 다음 검증이 포함되어 있음:
0. **배포 전 안전 게이트 (9개, fail-closed)** - 인쇄 보호파일 무결성·필드계약·디자인·IDOR·타임존·hydration·health-check·인스펙션·인쇄 라우트가드 + 마이그레이션 레지스트리(4b) + 빌드 직후 **실브라우저 mount sweep**. 하나라도 실패하면 배포 중단(긴급 우회 `--skip-safety`). 개발 중 동일 검사 = `dev-backend/scripts/verify-all.js`
1. **rsync 결과 검증** - 전송된 파일 수 + exit code 확인
2. **백엔드 파일 크기 비교** - dev vs production 핵심 파일 (server.js, invoices.js 등) 크기 비교, 차이 > 50%면 경고
3. **프론트엔드 JS hash 검증** - dev build의 main.js 해시와 production 배포본 일치 확인
4. **PM2 uptime 확인** - 재시작 후 30초 이내 = 정상 fresh restart
5. **Nginx 캐시 클리어** - 오래된 JS/CSS 캐시 제거
6. **Smoke tests** - /api/health, /api/invoices, /api/restaurants, /api/admin/payment-settings 응답 확인
7. **프론트엔드 번들 접근 확인** - main.*.js 파일 HTTP 200 응답 확인

## 배포 후 수동 확인

1. https://purplehere.com 접속 확인
2. PM2 상태 확인: `pm2 list | grep production`
3. API 테스트: `curl http://localhost:3002/api/health`
4. 로그 확인: `pm2 logs production-backend --lines 20`

---

## 관련 파일

- `/var/www/deploy-production.sh` - 배포 스크립트
- `/var/www/rollback-production.sh` - 롤백 스크립트
- `/var/www/.claude/commands/배포.md` - Claude 배포 명령어 상세
