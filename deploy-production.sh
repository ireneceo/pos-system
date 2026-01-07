#!/bin/bash
# 운영서버 배포 스크립트 (개선 버전)
# 사용법: sudo ./deploy-production.sh
# 주의: sudo로 실행해야 nginx reload가 동작합니다

set -e  # 에러 발생시 즉시 중단

echo "========================================="
echo "Starting Production Deployment"
echo "========================================="

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/var/www"
PROD_BACKEND="$PROJECT_DIR/production-backend"
DEV_BACKEND="$PROJECT_DIR/dev-backend"
PROD_FRONTEND="$PROJECT_DIR/production-frontend"
DEV_FRONTEND="$PROJECT_DIR/dev-frontend"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$PROJECT_DIR/backups/${TIMESTAMP}"
ENV_BACKUP_FILE="/tmp/.env.backup.${TIMESTAMP}"

# ==============================================
# Step 0: Fix Ownership Issues (Pre-deployment cleanup)
# ==============================================
echo -e "${YELLOW}Step 0: Fixing file ownership issues...${NC}"

# 대상 사용자 결정 (sudo로 실행시 원래 사용자, 아니면 현재 사용자)
TARGET_USER="${SUDO_USER:-$(whoami)}"
TARGET_GROUP="${TARGET_USER}"

# root 소유 파일이 있으면 수정 (dev, prod 모두 체크)
ROOT_FILES_PROD_FRONTEND=$(find "$PROD_FRONTEND" -user root 2>/dev/null | wc -l)
ROOT_FILES_DEV_FRONTEND=$(find "$DEV_FRONTEND" -user root 2>/dev/null | wc -l)
ROOT_FILES_PROD_BACKEND=$(find "$PROD_BACKEND/node_modules" -user root 2>/dev/null | wc -l)
ROOT_FILES_DEV_BACKEND=$(find "$DEV_BACKEND" -user root 2>/dev/null | wc -l)

TOTAL_ROOT_FILES=$((ROOT_FILES_PROD_FRONTEND + ROOT_FILES_DEV_FRONTEND + ROOT_FILES_PROD_BACKEND + ROOT_FILES_DEV_BACKEND))

if [ "$TOTAL_ROOT_FILES" -gt 0 ]; then
    echo -e "${BLUE}   Found root-owned files. Fixing ownership...${NC}"
    if [ "$EUID" -eq 0 ]; then
        # root로 실행 중 - 직접 chown
        [ "$ROOT_FILES_PROD_FRONTEND" -gt 0 ] && chown -R "$TARGET_USER:$TARGET_GROUP" "$PROD_FRONTEND"
        [ "$ROOT_FILES_DEV_FRONTEND" -gt 0 ] && chown -R "$TARGET_USER:$TARGET_GROUP" "$DEV_FRONTEND"
        [ "$ROOT_FILES_PROD_BACKEND" -gt 0 ] && chown -R "$TARGET_USER:$TARGET_GROUP" "$PROD_BACKEND/node_modules"
        [ "$ROOT_FILES_DEV_BACKEND" -gt 0 ] && chown -R "$TARGET_USER:$TARGET_GROUP" "$DEV_BACKEND"
    else
        # sudo 시도
        [ "$ROOT_FILES_PROD_FRONTEND" -gt 0 ] && sudo chown -R "$TARGET_USER:$TARGET_GROUP" "$PROD_FRONTEND"
        [ "$ROOT_FILES_DEV_FRONTEND" -gt 0 ] && sudo chown -R "$TARGET_USER:$TARGET_GROUP" "$DEV_FRONTEND"
        [ "$ROOT_FILES_PROD_BACKEND" -gt 0 ] && sudo chown -R "$TARGET_USER:$TARGET_GROUP" "$PROD_BACKEND/node_modules"
        [ "$ROOT_FILES_DEV_BACKEND" -gt 0 ] && sudo chown -R "$TARGET_USER:$TARGET_GROUP" "$DEV_BACKEND"
    fi
    echo -e "${GREEN}   ✅ Ownership fixed for $TARGET_USER${NC}"
else
    echo -e "${GREEN}   ✅ No ownership issues found${NC}"
fi

# 백업 디렉토리 생성
echo -e "${BLUE}📦 Creating backup directory...${NC}"
mkdir -p "${BACKUP_DIR}"

# ==============================================
# Step 1: Git Pull
# ==============================================
echo ""
echo -e "${YELLOW}Step 1: Git Pull${NC}"
cd $PROJECT_DIR
git pull origin main || echo "Git pull failed or no changes"

# ==============================================
# Step 2: Database Backup
# ==============================================
echo ""
echo -e "${YELLOW}Step 2: Backup Database${NC}"

# .env 파일에서 운영 DB 정보 로드
if [ -f "$PROD_BACKEND/.env" ]; then
    source <(grep -E "^DB_" "$PROD_BACKEND/.env" | sed 's/^/export /')
    DB_USER=$DB_USER
    DB_PASS=$DB_PASSWORD
    DB_NAME=$DB_NAME
else
    echo -e "${RED}   ❌ .env 파일을 찾을 수 없습니다: $PROD_BACKEND/.env${NC}"
    exit 1
fi

DB_BACKUP_FILE="${BACKUP_DIR}/db_backup_${TIMESTAMP}.sql.gz"

echo -e "${BLUE}   Backing up ${DB_NAME}...${NC}"
mysqldump -u $DB_USER -p$DB_PASS \
  --single-transaction \
  --quick \
  --lock-tables=false \
  --routines \
  --triggers \
  --no-tablespaces \
  $DB_NAME | gzip > $DB_BACKUP_FILE

if [ $? -eq 0 ]; then
    DB_SIZE=$(du -h $DB_BACKUP_FILE | cut -f1)
    echo -e "${GREEN}   ✅ Database backup completed: ${DB_SIZE}${NC}"
else
    echo -e "${RED}   ❌ Database backup failed!${NC}"
    exit 1
fi

# ==============================================
# Step 3: Backup Backend Code
# ==============================================
echo ""
echo -e "${YELLOW}Step 3: Backup Production Backend${NC}"
if [ -d "$PROD_BACKEND" ]; then
    cp -r $PROD_BACKEND "${BACKUP_DIR}/production-backend.backup"
    echo -e "${GREEN}   ✅ Backend backup completed${NC}"
fi

# ==============================================
# Step 4: Backup Frontend Build
# ==============================================
echo ""
echo -e "${YELLOW}Step 4: Backup Production Frontend Build${NC}"
if [ -d "$PROD_FRONTEND/build" ]; then
    cp -r $PROD_FRONTEND/build "${BACKUP_DIR}/production-frontend-build.backup"
    echo -e "${GREEN}   ✅ Frontend build backup completed${NC}"
fi

# ==============================================
# Step 5: Sync Backend Code
# ==============================================
echo ""
echo -e "${YELLOW}Step 5: Sync Backend Code (dev -> production)${NC}"

# .env 백업 (타임스탬프 기반 고유 파일명으로 rsync --delete로부터 보호)
cp $PROD_BACKEND/.env $ENV_BACKUP_FILE

# .deployignore 파일에서 제외할 파일 읽기
EXCLUDE_ARGS="--exclude='node_modules' --exclude='.env' --exclude='*.log' --exclude='.server.pid' --exclude='.env.backup'"

if [ -f "$PROJECT_DIR/.deployignore" ]; then
  echo -e "${BLUE}   Loading .deployignore...${NC}"
  while IFS= read -r line || [ -n "$line" ]; do
    if [[ ! "$line" =~ ^# ]] && [[ -n "$line" ]]; then
      EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude='$line'"
    fi
  done < "$PROJECT_DIR/.deployignore"
fi

# rsync 실행
eval "rsync -av --delete $EXCLUDE_ARGS $DEV_BACKEND/ $PROD_BACKEND/"
echo -e "${GREEN}   ✅ Backend code synced${NC}"

# .env 복원 (타임스탬프 기반 파일에서)
mv $ENV_BACKUP_FILE $PROD_BACKEND/.env
echo -e "${GREEN}   ✅ .env restored${NC}"

# ==============================================
# Step 5.5: Check for Duplicate Routes
# ==============================================
echo ""
echo -e "${YELLOW}Step 5.5: Check for Duplicate Routes${NC}"
DUPLICATE_ROUTES=$(grep -rh "router\.\(get\|post\|put\|delete\).*['\"]/" $DEV_BACKEND/routes/*.js 2>/dev/null | \
  sed "s/.*router\.\(get\|post\|put\|delete\)(\s*['\"]//g" | \
  sed "s/['\"].*//g" | \
  sort | uniq -d)

if [ -n "$DUPLICATE_ROUTES" ]; then
    echo -e "${YELLOW}   Warning: Potential duplicate routes detected:${NC}"
    echo "$DUPLICATE_ROUTES" | while read route; do
        echo -e "${YELLOW}      - $route${NC}"
        grep -rn "router\.\(get\|post\|put\|delete\).*$route" $DEV_BACKEND/routes/*.js 2>/dev/null | head -5
    done
    echo -e "${YELLOW}   Please review these routes before deployment${NC}"
else
    echo -e "${GREEN}   ✅ No duplicate routes detected${NC}"
fi

# ==============================================
# Step 6: Install Backend Dependencies
# ==============================================
echo ""
echo -e "${YELLOW}Step 6: Install Backend Dependencies${NC}"
cd $PROD_BACKEND
npm install --omit=dev
echo -e "${GREEN}   ✅ Dependencies installed${NC}"

# ==============================================
# Step 7: Auto-Sync Database Schema (Dev -> Prod)
# ==============================================
echo ""
echo -e "${YELLOW}Step 7: Auto-Sync Database Schema (Dev -> Prod)${NC}"

# .env 파일에서 개발 DB 정보 로드
if [ -f "$DEV_BACKEND/.env" ]; then
    DEV_DB_USER=$(grep "^DB_USER=" "$DEV_BACKEND/.env" | cut -d'=' -f2)
    DEV_DB_PASS=$(grep "^DB_PASSWORD=" "$DEV_BACKEND/.env" | cut -d'=' -f2)
    DEV_DB_NAME=$(grep "^DB_NAME=" "$DEV_BACKEND/.env" | cut -d'=' -f2)
else
    echo -e "${RED}   ❌ 개발 .env 파일을 찾을 수 없습니다: $DEV_BACKEND/.env${NC}"
    exit 1
fi

echo -e "${BLUE}   Checking and auto-syncing missing tables and columns...${NC}"

# 테이블 비교 및 자동 생성
DEV_TABLES=$(mysql -u $DEV_DB_USER -p$DEV_DB_PASS $DEV_DB_NAME -N -e "SHOW TABLES;" 2>/dev/null | sort)
PROD_TABLES=$(mysql -u $DB_USER -p$DB_PASS $DB_NAME -N -e "SHOW TABLES;" 2>/dev/null | sort)

MISSING_TABLES=$(comm -23 <(echo "$DEV_TABLES") <(echo "$PROD_TABLES"))

if [ -n "$MISSING_TABLES" ]; then
    echo -e "${BLUE}   누락된 테이블 발견 - 자동 생성 중...${NC}"
    echo "$MISSING_TABLES" | while read table; do
        if [ -n "$table" ]; then
            echo -e "${BLUE}      Creating table: $table${NC}"
            # 개발DB에서 테이블 구조 추출하여 운영DB에 생성
            mysqldump -u $DEV_DB_USER -p$DEV_DB_PASS --no-data --skip-add-drop-table $DEV_DB_NAME $table 2>/dev/null | \
                sed 's/CREATE TABLE/CREATE TABLE IF NOT EXISTS/g' | \
                mysql -u $DB_USER -p$DB_PASS $DB_NAME 2>/dev/null
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}      ✅ $table 테이블 생성 완료${NC}"
            else
                echo -e "${RED}      ❌ $table 테이블 생성 실패${NC}"
                exit 1
            fi
        fi
    done
fi

# 모든 테이블 컬럼 비교 및 자동 추가/수정
echo -e "${BLUE}   Comparing all table schemas...${NC}"

# 공통 테이블 목록 가져오기
COMMON_TABLES=$(comm -12 <(echo "$DEV_TABLES") <(echo "$PROD_TABLES"))

for table in $COMMON_TABLES; do
    if [ -z "$table" ]; then
        continue
    fi

    # 1. 누락된 컬럼 추가
    DEV_COLS=$(mysql -u $DEV_DB_USER -p$DEV_DB_PASS $DEV_DB_NAME -N -e "SELECT GROUP_CONCAT(COLUMN_NAME ORDER BY ORDINAL_POSITION) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='$DEV_DB_NAME' AND TABLE_NAME='$table';" 2>/dev/null)
    PROD_COLS=$(mysql -u $DB_USER -p$DB_PASS $DB_NAME -N -e "SELECT GROUP_CONCAT(COLUMN_NAME ORDER BY ORDINAL_POSITION) FROM information_schema.COLUMNS WHERE TABLE_SCHEMA='$DB_NAME' AND TABLE_NAME='$table';" 2>/dev/null)

    if [ -n "$DEV_COLS" ] && [ -n "$PROD_COLS" ]; then
        MISSING_COLS=$(comm -23 <(echo "$DEV_COLS" | tr ',' '\n' | sort) <(echo "$PROD_COLS" | tr ',' '\n' | sort))
        if [ -n "$MISSING_COLS" ]; then
            echo -e "${BLUE}   [$table] 누락된 컬럼 추가 중...${NC}"
            echo "$MISSING_COLS" | while read col; do
                if [ -n "$col" ]; then
                    COL_DEF=$(mysql -u $DEV_DB_USER -p$DEV_DB_PASS $DEV_DB_NAME -N -e "
                        SELECT CONCAT(
                            COLUMN_NAME, ' ',
                            COLUMN_TYPE,
                            IF(IS_NULLABLE='NO', ' NOT NULL', ''),
                            IF(COLUMN_DEFAULT IS NOT NULL, CONCAT(' DEFAULT ', IF(DATA_TYPE IN ('varchar','text','char','enum','set'), CONCAT('''', COLUMN_DEFAULT, ''''), COLUMN_DEFAULT)), ''),
                            IF(EXTRA != '', CONCAT(' ', EXTRA), '')
                        ) FROM information_schema.COLUMNS
                        WHERE TABLE_SCHEMA='$DEV_DB_NAME' AND TABLE_NAME='$table' AND COLUMN_NAME='$col';" 2>/dev/null)

                    if [ -n "$COL_DEF" ]; then
                        echo -e "${BLUE}      + $col${NC}"
                        mysql -u $DB_USER -p$DB_PASS $DB_NAME -e "ALTER TABLE \`$table\` ADD COLUMN $COL_DEF;" 2>/dev/null
                        if [ $? -eq 0 ]; then
                            echo -e "${GREEN}        ✅ 추가 완료${NC}"
                        fi
                    fi
                fi
            done
        fi
    fi

    # 2. 컬럼 타입 차이 자동 수정
    TYPE_DIFF=$(mysql -u $DEV_DB_USER -p$DEV_DB_PASS -N -e "
        SELECT d.COLUMN_NAME, d.COLUMN_TYPE as dev_type, p.COLUMN_TYPE as prod_type
        FROM information_schema.COLUMNS d
        JOIN information_schema.COLUMNS p
            ON d.COLUMN_NAME = p.COLUMN_NAME
        WHERE d.TABLE_SCHEMA = '$DEV_DB_NAME'
            AND d.TABLE_NAME = '$table'
            AND p.TABLE_SCHEMA = '$DB_NAME'
            AND p.TABLE_NAME = '$table'
            AND d.COLUMN_TYPE != p.COLUMN_TYPE
    " 2>/dev/null)

    if [ -n "$TYPE_DIFF" ]; then
        echo -e "${BLUE}   [$table] 컬럼 타입 차이 수정 중...${NC}"
        echo "$TYPE_DIFF" | while read line; do
            col=$(echo "$line" | awk '{print $1}')
            dev_type=$(echo "$line" | awk '{print $2}')
            prod_type=$(echo "$line" | awk '{print $3}')

            if [ -n "$col" ] && [ -n "$dev_type" ]; then
                # 전체 컬럼 정의 가져오기 (DEFAULT 값 포함)
                FULL_DEF=$(mysql -u $DEV_DB_USER -p$DEV_DB_PASS $DEV_DB_NAME -N -e "
                    SELECT CONCAT(
                        COLUMN_TYPE,
                        IF(IS_NULLABLE='NO', ' NOT NULL', ' NULL'),
                        IF(COLUMN_DEFAULT IS NOT NULL,
                            CONCAT(' DEFAULT ',
                                CASE
                                    WHEN DATA_TYPE IN ('varchar','text','char','mediumtext','longtext') THEN CONCAT('''', REPLACE(COLUMN_DEFAULT, '''', ''''''), '''')
                                    WHEN DATA_TYPE = 'enum' THEN CONCAT('''', COLUMN_DEFAULT, '''')
                                    ELSE COLUMN_DEFAULT
                                END
                            ),
                            IF(IS_NULLABLE='YES', ' DEFAULT NULL', '')
                        ),
                        IF(EXTRA != '', CONCAT(' ', EXTRA), '')
                    ) FROM information_schema.COLUMNS
                    WHERE TABLE_SCHEMA='$DEV_DB_NAME' AND TABLE_NAME='$table' AND COLUMN_NAME='$col';" 2>/dev/null)

                if [ -n "$FULL_DEF" ]; then
                    echo -e "${BLUE}      ~ $col: $prod_type -> $dev_type${NC}"
                    mysql -u $DB_USER -p$DB_PASS $DB_NAME -e "ALTER TABLE \`$table\` MODIFY COLUMN \`$col\` $FULL_DEF;" 2>/dev/null
                    if [ $? -eq 0 ]; then
                        echo -e "${GREEN}        ✅ 수정 완료${NC}"
                    else
                        echo -e "${YELLOW}        ⚠️  수정 실패 (데이터 호환성 문제일 수 있음)${NC}"
                    fi
                fi
            fi
        done
    fi
done

echo -e "${GREEN}   ✅ DB 스키마 자동 동기화 완료${NC}"

# ==============================================
# Step 8: Database Sync (Sequelize - alter: false)
# ==============================================
echo ""
echo -e "${YELLOW}Step 8: Sync Database Schema${NC}"
echo -e "${BLUE}   Running Sequelize sync (safe mode - alter: false)...${NC}"
node sync-database.js
if [ $? -eq 0 ]; then
    echo -e "${GREEN}   ✅ Database schema synced${NC}"
else
    echo -e "${RED}   ❌ Database sync failed!${NC}"
    exit 1
fi

# ==============================================
# Step 9: Build Frontend
# ==============================================
echo ""
echo -e "${YELLOW}Step 9: Build Frontend${NC}"
cd $DEV_FRONTEND

# 캐시 및 빌드 폴더 클리어
rm -rf node_modules/.cache build 2>/dev/null || true

echo -e "${BLUE}   Building React app...${NC}"
# sudo로 실행된 경우 원래 사용자로 빌드 (root 소유 파일 생성 방지)
if [ -n "$SUDO_USER" ]; then
    su - $SUDO_USER -c "cd $DEV_FRONTEND && npm run build"
else
    npm run build
fi

if [ ! -d "build" ]; then
    echo -e "${RED}   ❌ Frontend build failed!${NC}"
    exit 1
fi
echo -e "${GREEN}   ✅ Frontend built successfully${NC}"

# ==============================================
# Step 10: Deploy Frontend Build
# ==============================================
echo ""
echo -e "${YELLOW}Step 10: Deploy Frontend Build${NC}"

# 빌드 폴더 삭제 및 복사 (원래 사용자 권한으로)
rm -rf $PROD_FRONTEND/build 2>/dev/null || true
cp -r $DEV_FRONTEND/build $PROD_FRONTEND/
# 원래 사용자 소유로 설정
if [ -n "$SUDO_USER" ]; then
    chown -R $SUDO_USER:$SUDO_USER $PROD_FRONTEND/build
fi
echo -e "${GREEN}   ✅ Frontend build deployed${NC}"

# ==============================================
# Step 11: Restart Backend Server
# ==============================================
echo ""
echo -e "${YELLOW}Step 11: Restart Backend Server${NC}"

# sudo로 실행된 경우 원래 사용자의 PM2로 실행
if [ "$SUDO_USER" != "" ]; then
    # sudo로 실행됨 - 원래 사용자(irene)의 PM2 사용
    su - $SUDO_USER -c "pm2 restart production-backend && pm2 save"
else
    # 일반 사용자로 실행됨
    pm2 restart production-backend && pm2 save
fi
sleep 3
echo -e "${GREEN}   ✅ Backend server restarted${NC}"

# ==============================================
# Step 12: Reload Nginx (with sudo check)
# ==============================================
echo ""
echo -e "${YELLOW}Step 12: Reload Nginx${NC}"

# Clear nginx cache if exists
if [ -d "/var/cache/nginx" ]; then
    rm -rf /var/cache/nginx/* 2>/dev/null || true
fi

# Try to reload nginx (requires sudo)
if [ "$EUID" -eq 0 ]; then
    # Running as root
    systemctl reload nginx
    echo -e "${GREEN}   ✅ Nginx reloaded${NC}"
else
    # Not running as root, try with sudo
    if sudo -n systemctl reload nginx 2>/dev/null; then
        echo -e "${GREEN}   ✅ Nginx reloaded${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Nginx reload skipped (no sudo permission)${NC}"
        echo -e "${YELLOW}   Run manually: sudo systemctl reload nginx${NC}"
    fi
fi

# ==============================================
# Save Last Deployed Commit
# ==============================================
cd $PROJECT_DIR
DEPLOYED_COMMIT=$(git rev-parse HEAD)
echo "$DEPLOYED_COMMIT" > "$PROJECT_DIR/.last-deployed-commit"
echo -e "${GREEN}   ✅ Saved last deployed commit: ${DEPLOYED_COMMIT:0:7}${NC}"

# ==============================================
# Deployment Complete
# ==============================================
echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "${BLUE}📊 Deployment Info:${NC}"
echo "   - Timestamp: ${TIMESTAMP}"
echo "   - Deployed Commit: ${DEPLOYED_COMMIT:0:7}"
echo "   - Backup Location: ${BACKUP_DIR}"
echo "   - Database Backup: ${DB_BACKUP_FILE} (${DB_SIZE})"
echo ""
echo -e "${BLUE}🔍 Service Status:${NC}"
pm2 list | grep production
echo ""
echo -e "${BLUE}📝 Post-Deployment Checklist:${NC}"
echo "   1. ✓ Visit https://purplehere.com"
echo "   2. ✓ Press Ctrl+Shift+R for hard refresh"
echo "   3. ✓ Test POS Terminal functionality"
echo "   4. ✓ Check if Takeaway Charge appears"
echo "   5. ✓ Verify receipt printing"
echo ""
echo -e "${YELLOW}🔙 Rollback Command:${NC}"
echo "   sudo ./rollback-production.sh ${TIMESTAMP}"
echo ""
