#!/bin/bash
# 운영서버 롤백 스크립트 (v3.0 — 2026-09-27 R4)
# 사용법: sudo ./rollback-production.sh [TIMESTAMP]
# 예시: sudo ./rollback-production.sh 20260925_185824
#
# v3 에서 바뀐 것 (2026-09-27 Fable 판정 R4)
#   - 경로·복원 함수를 배포 스크립트와 **같은 파일**(/var/www/scripts/deploy-layout.sh)에서 읽는다.
#     v2 는 `production-backend.backup`·`db_backup_<TS>` 를 찾았는데 배포는 그 이름으로 백업을 만들지 않아
#     **전 단계가 skip 되고도 «ROLLBACK COMPLETE»** 를 찍었다.
#   - `rm -rf` + `cp` → 제외 rsync. .env·uploads·logs·node_modules 는 지금 것을 남긴다.
#   - 아무것도 되돌리지 못했으면 **실패(exit 1)** 로 끝난다.
#   - DB 는 배포 직전 덤프(pre-deploy)에서 되돌린다(선택, 확인 질문).

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

LAYOUT="${DEPLOY_LAYOUT:-/var/www/scripts/deploy-layout.sh}"
# shellcheck source=/var/www/scripts/deploy-layout.sh
source "$LAYOUT" || { echo -e "${RED}✗ 경로 파일을 읽지 못함: $LAYOUT${NC}"; exit 1; }

list_backups() {
    echo -e "${BLUE}Available backups:${NC}"
    ls -1t "$PROD_BACKUP_ROOT" 2>/dev/null | head -10 | while read -r dir; do
        [ -d "$(backup_dir_of "$dir")" ] || continue
        CONTENTS=""
        [ -f "$(backup_backend_of "$dir")/package.json" ] && CONTENTS="$CONTENTS backend"
        [ -f "$(backup_frontend_of "$dir")/index.html" ] && CONTENTS="$CONTENTS frontend"
        [ -f "$(predeploy_dump_of "$dir")" ] && CONTENTS="$CONTENTS db"
        echo "   $dir [$CONTENTS ]"
    done
}

if [ -z "$1" ]; then
    echo -e "${RED}Error: Timestamp required${NC}"
    echo "Usage: sudo ./rollback-production.sh [TIMESTAMP]"
    echo ""
    list_backups
    exit 1
fi

TIMESTAMP=$1
BACKUP_DIR="$(backup_dir_of "$TIMESTAMP")"
DB_BACKUP_FILE="$(predeploy_dump_of "$TIMESTAMP")"

if [ ! -d "${BACKUP_DIR}" ]; then
    echo -e "${RED}✗ 에러: 백업 디렉토리를 찾을 수 없습니다: ${BACKUP_DIR}${NC}"
    echo ""
    list_backups
    exit 1
fi

echo -e "${RED}=========================================${NC}"
echo -e "${RED}🔙 운영서버 롤백 시작${NC}"
echo -e "${RED}=========================================${NC}"
echo ""
echo -e "${YELLOW}⚠️  경고: 이 작업은 다음을 복원합니다:${NC}"
echo "   - 백엔드 코드   ← $(backup_backend_of "$TIMESTAMP")"
echo "   - 프론트엔드 빌드 ← $(backup_frontend_of "$TIMESTAMP")"
echo "   - 데이터베이스 (선택) ← ${DB_BACKUP_FILE}"
echo "   (.env · uploads · logs · node_modules 는 지금 것을 유지)"
echo ""
read -p "계속하시겠습니까? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}롤백이 취소되었습니다.${NC}"
    exit 0
fi

TARGET_USER="${SUDO_USER:-$(whoami)}"
RESTORED=0

# ==============================================
# Step 1~2: 코드 롤백 (백엔드 + 프론트) — 배포 자동 원복과 같은 함수
# ==============================================
echo ""
echo -e "${YELLOW}Step 1: 코드 롤백 (백엔드 · 프론트)${NC}"
if restore_code_from_backup "$TIMESTAMP"; then
    RESTORED=$((RESTORED + 1))
    if [ -n "$SUDO_USER" ]; then
        chown -R "$SUDO_USER:$SUDO_USER" "$PROD_FRONTEND_DIR/build" 2>/dev/null || true
    fi
    echo -e "${BLUE}   Restarting backend...${NC}"
    if [ -n "$SUDO_USER" ]; then
        su - "$SUDO_USER" -c "pm2 restart production-backend --update-env && pm2 save"
    else
        pm2 restart production-backend --update-env && pm2 save
    fi
    sleep 3
    echo -e "${GREEN}   ✓ 코드 복원 · 백엔드 재시작${NC}"
else
    echo -e "${RED}   ✗ 코드 백업을 쓸 수 없음 — 코드 롤백 안 함${NC}"
fi

# ==============================================
# Step 3: 데이터베이스 롤백 (선택)
# ==============================================
echo ""
echo -e "${YELLOW}Step 3: 데이터베이스 롤백 (선택)${NC}"
if [ -f "$DB_BACKUP_FILE" ]; then
    echo -e "${RED}⚠️  경고: 데이터베이스를 복원하면 배포 이후 생긴 주문·결제가 사라집니다!${NC}"
    read -p "데이터베이스를 복원하시겠습니까? (yes/no): " DB_CONFIRM

    if [ "$DB_CONFIRM" = "yes" ]; then
        if [ -f "$PROD_BACKEND_DIR/.env" ]; then
            source <(grep -E "^DB_" "$PROD_BACKEND_DIR/.env" | sed 's/^/export /')
        else
            echo -e "${RED}   ✗ .env 파일을 찾을 수 없습니다.${NC}"
            exit 1
        fi
        echo -e "${BLUE}   Restoring database...${NC}"
        set -o pipefail
        if gunzip < "$DB_BACKUP_FILE" | mysql -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME"; then
            RESTORED=$((RESTORED + 1))
            echo -e "${GREEN}   ✓ 데이터베이스 롤백 완료${NC}"
        else
            echo -e "${RED}   ✗ 데이터베이스 롤백 실패!${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}   ⏭️  데이터베이스 롤백을 건너뜁니다.${NC}"
    fi
else
    echo -e "${YELLOW}   ⚠️  배포 전 DB 덤프가 없습니다: ${DB_BACKUP_FILE}${NC}"
fi

# 아무것도 되돌리지 못했으면 성공이 아니다 (v2 는 여기서도 «ROLLBACK COMPLETE» 였다)
if [ "$RESTORED" -eq 0 ]; then
    echo ""
    echo -e "${RED}=========================================${NC}"
    echo -e "${RED}   ROLLBACK FAILED — 되돌린 것이 없습니다${NC}"
    echo -e "${RED}=========================================${NC}"
    list_backups
    exit 1
fi

# ==============================================
# Step 4: Nginx 재시작
# ==============================================
echo ""
echo -e "${YELLOW}Step 4: Nginx 캐시 클리어 및 재시작${NC}"
if [ -d "/var/cache/nginx" ]; then
    rm -rf /var/cache/nginx/*
fi
systemctl reload nginx
echo -e "${GREEN}   ✓ Nginx 재시작 완료${NC}"

# ==============================================
# Step 5: Post-rollback Verification
# ==============================================
echo ""
echo -e "${YELLOW}Step 5: Post-rollback Verification${NC}"

PROD_API="http://localhost:3002/api"
sleep 2

echo -n "   Health check... "
HEALTH=$(curl -s --max-time 5 "$PROD_API/health" 2>/dev/null || echo "FAIL")
if echo "$HEALTH" | grep -q '"status":"ok"'; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAILED - check pm2 logs${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}   ROLLBACK COMPLETE${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${BLUE}Service Status:${NC}"
pm2 list | grep production || true
echo ""
echo -e "${BLUE}Restored from:${NC}"
echo "   Timestamp: ${TIMESTAMP}"
echo "   Backup:    ${BACKUP_DIR}"
echo ""
echo -e "${YELLOW}Manual Verification (recommended):${NC}"
echo "   1. https://purplehere.com - 사이트 접속"
echo "   2. POS 터미널 - 주문 생성 테스트"
echo ""
