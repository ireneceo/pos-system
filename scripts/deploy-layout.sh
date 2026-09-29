#!/bin/bash
# deploy-layout.sh — 운영 배포와 롤백이 **같이 쓰는** 경로·복원 규칙 (단일 소스, 2026-09-27 Fable 판정 R4)
#
# 왜 한 파일인가
#   배포 스크립트는 백업을 `/var/www/backups/<TS>/production-backend/`(node_modules·.git 제외)와
#   `production-frontend-build/`, DB 덤프를 `/var/backups/orderhere/pre-deploy/db_predeploy_<TS>.sql.gz`
#   로 만든다. 그런데 운영의 rollback-production.sh(2026-01판)는 `production-backend.backup`·
#   `db_backup_<TS>` 를 찾아 **전 단계를 skip 하고 «ROLLBACK COMPLETE»** 를 찍는 상태였다(2026-09-27 실측).
#   경로를 두 스크립트가 따로 적으면 다시 갈라진다 → 여기 한 곳에만 적는다.
#
# 쓰는 곳
#   - deploy-to-production.sh : 개발기에서 source(경로) + 실패 시 이 파일을 ssh 표준입력으로 운영에 보내 복원 함수 실행
#   - rollback-production.sh  : 운영에서 source (배포가 운영 /var/www/scripts/ 에 이 파일을 복사해 둔다)
# 경로는 환경변수로 덮어쓸 수 있다 — 개발기에서 가짜 디렉터리로 복원 함수를 재현하기 위해서다.

: "${PROD_BACKEND_DIR:=/var/www/production-backend}"
: "${PROD_FRONTEND_DIR:=/var/www/production-frontend}"
: "${PROD_BACKUP_ROOT:=/var/www/backups}"
: "${PROD_PREDEPLOY_DIR:=/var/backups/orderhere/pre-deploy}"

backup_dir_of()      { echo "${PROD_BACKUP_ROOT}/$1"; }
backup_backend_of()  { echo "${PROD_BACKUP_ROOT}/$1/production-backend"; }
backup_frontend_of() { echo "${PROD_BACKUP_ROOT}/$1/production-frontend-build"; }
predeploy_dump_of()  { echo "${PROD_PREDEPLOY_DIR}/db_predeploy_$1.sql.gz"; }

# 코드 원복 — 백업 <TS> 의 백엔드·프론트를 운영 자리로 되돌린다. DB 는 건드리지 않는다.
#
#   되살리지 않는 것(운영의 런타임 자산): node_modules(백업에 없음) · .env(비밀값은 지금 것이 진실) ·
#   uploads(백업 뒤 올라온 사진을 지우면 안 된다) · logs/·*.log · .git · 프론트 desktop/(설치본은 별도 동기화).
#   `rm -rf` + `cp` 대신 제외 rsync — 지우는 동안 빈 폴더를 서빙하는 틈과 제외 대상 소실을 막는다.
#
# 반환: 0 = 백엔드 원복(프론트는 백업이 있으면 함께) / 1 = 백엔드 백업이 없거나 비어 있어 아무것도 안 함.
#   «아무것도 안 했는데 성공» 을 돌려주지 않는다 — 예전 롤백이 바로 그 모양이었다.
restore_code_from_backup() {
  local ts="$1"
  local bk fbk
  bk="$(backup_backend_of "$ts")"
  fbk="$(backup_frontend_of "$ts")"
  if [ -z "$ts" ] || [ ! -f "$bk/package.json" ]; then
    echo "restore: 백엔드 백업 없음 또는 비어 있음 ($bk)" >&2
    return 1
  fi
  # --checksum: 기본 비교(크기+수정시각)는 둘이 같으면 내용이 달라도 건너뛴다(2026-09-29 재현 테스트에서 실측).
  #   원복 도구는 «틀림없이 백업과 같아짐» 이 목적이라 내용으로 비교한다(백엔드·빌드 수천 파일이라 수 초).
  rsync -a --checksum --delete \
    --exclude=node_modules --exclude=.env --exclude=uploads \
    --exclude=logs/ --exclude='*.log' --exclude=.git \
    "$bk/" "$PROD_BACKEND_DIR/" || return 1
  echo "restore: 백엔드 ← $bk"
  if [ -f "$fbk/index.html" ]; then
    mkdir -p "$PROD_FRONTEND_DIR/build"
    rsync -a --checksum --delete --exclude=desktop "$fbk/" "$PROD_FRONTEND_DIR/build/" || return 1
    echo "restore: 프론트 ← $fbk"
  else
    echo "restore: 프론트 백업 없음 — 프론트는 그대로 ($fbk)" >&2
  fi
  return 0
}
