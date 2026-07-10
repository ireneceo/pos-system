#!/bin/bash
#
# Remote Production Deployment Script
# 개발서버(87.106.11.184)에서 운영서버(87.106.78.146)로 배포
#
# 사용법:
#   ./deploy-to-production.sh           # 대화형 모드
#   ./deploy-to-production.sh --auto    # 자동 모드
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
PROD_SERVER="irene@87.106.78.146"
LOCAL_DEV_BACKEND="/var/www/dev-backend"
LOCAL_DEV_FRONTEND="/var/www/dev-frontend"
REMOTE_PROD_BACKEND="/var/www/production-backend"
REMOTE_PROD_FRONTEND="/var/www/production-frontend"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Flags
AUTO_MODE=false
SKIP_BUILD=false
SKIP_SAFETY=false                  # 인쇄/주문 안전 게이트. 기본 ON(막힘). 긴급 핫픽스 시에만 --skip-safety 로 우회
SYNC_CONTENT=true                  # default ON: 랜딩/블로그 콘텐츠는 코드와 함께 운영에 반영되어야 함
SYNC_CONTENT_SINCE="90d"           # 최근 90일 발행/수정분 sync (그 이상 과거 글은 사용자가 별도 --group=N 지정)

for arg in "$@"; do
    case $arg in
        --auto) AUTO_MODE=true ;;
        --skip-build) SKIP_BUILD=true ;;
        --skip-safety) SKIP_SAFETY=true ;;         # 인쇄/주문 안전 게이트 우회 (긴급 핫픽스 전용)
        --sync-content) SYNC_CONTENT=true ;;       # 명시적 ON (기본값과 동일, 이전 호환)
        --no-sync-content) SYNC_CONTENT=false ;;   # 콘텐츠 sync 끄기 (긴급 핫픽스용)
        --sync-content-since=*) SYNC_CONTENT_SINCE="${arg#*=}" ;;  # 예: --sync-content-since=30d
    esac
done

log() { echo -e "${BLUE}[$(date +%H:%M:%S)]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }

echo ""
echo "============================================"
echo "  Production Deployment (Remote)"
echo "  From: 개발서버 (87.106.11.184)"
echo "  To:   운영서버 (87.106.78.146)"
echo "============================================"
echo ""

# ──────────────────────────────────────────
# 1. Pre-checks
# ──────────────────────────────────────────
log "Checking SSH connection to production server..."
if ! ssh -o ConnectTimeout=5 $PROD_SERVER "echo 'Connected'" > /dev/null 2>&1; then
    error "Cannot connect to production server"
fi
success "SSH connection OK"

log "Checking local dev server health..."
if ! curl -s --max-time 3 http://localhost:3001/api/health | grep -q '"status":"ok"'; then
    error "Local dev server is not healthy"
fi
success "Local dev server is healthy"

# ──────────────────────────────────────────
# 1b. SAFETY GATE — 인쇄/주문 생명선 회귀 + 보호 파일 무결성 (운영 도달 전 마지막 자동 검사)
# ──────────────────────────────────────────
# 매장 인쇄는 영업 생명선 (CLAUDE.md 최우선). 다른 기능을 개발하다 인쇄/주문 코드를
# 실수로 건드렸으면 여기서 배포가 막힌다. 운영을 건드리기 전(backup/build 전)이라 fail-fast.
# 긴급 핫픽스로 우회가 필요하면 --skip-safety (의식적 선택, 기본은 막힘).
if [ "$SKIP_SAFETY" = true ]; then
    warn "⚠️  안전 게이트 건너뜀 (--skip-safety) — 긴급 핫픽스 모드. 인쇄/주문 회귀 미검증 상태로 배포함."
else
    cd $LOCAL_DEV_BACKEND

    log "Safety gate (1/9): 🔒 인쇄/주문 보호 파일 무결성..."
    if ! node scripts/check-print-guard.js --quiet; then
        error "🔒 인쇄/주문 보호 파일이 변경됨. 의도한 인쇄 변경이고 실프린터 확인까지 끝났으면
       'cd dev-backend && node scripts/check-print-guard.js --bless' 후 재배포.
       인쇄 작업이 아니었다면 변경을 되돌릴 것. (긴급 우회: --skip-safety)"
    fi
    success "보호 파일 무결성 OK (생명선 안전)"

    log "Safety gate (2/9): 🧾 인쇄 데이터 필드 계약 (세트 구성품 누락 방지)..."
    if ! node scripts/check-print-field-contract.js; then
        error "인쇄 항목 변환에서 세트 구성품 필드(set_components) 누락 — 빌/주방에 'SET' 만 찍히는 회귀. 해당 mapItem 수정 후 재배포. (긴급 우회: --skip-safety)"
    fi
    success "인쇄 필드 계약 OK (세트 구성품 전 경로 통과)"

    log "Safety gate (3/9): 🎨 디자인 단일 기준(RA=표준) — 신규 위반 차단..."
    if ! node scripts/check-design-guard.js --summary; then
        error "🎨 신규 디자인 위반 — 공용 컴포넌트(DataTable/Button/StatCard/Modal) 미사용·장식 이모지·일반 danger 에 #FF6B6B 등 CLAUDE.md '🎨 디자인 단일 기준' 위반. 공용/RA 기준으로 고칠 것. 정식 변경이면 'node scripts/check-design-guard.js --bless'. (긴급 우회: --skip-safety)"
    fi
    success "디자인 단일 기준 OK (신규 위반 0)"

    log "Safety gate (4/9): 🛡️ 라우트 가드 (IDOR — 신규 무방비 literal /restaurant/:param 차단, 마운트프리픽스 라우터는 배럴가드+health-check 담당)..."
    if ! node scripts/check-route-guard.js --summary; then
        error "🛡️ 신규 무방비 라우트 — /restaurant/:param 에 checkRestaurantAccess 또는 인라인 매장검사(req.user.restaurant_id≠param→403) 누락 = 타매장 데이터 유출(IDOR) 위험. 소유권 검사 추가 후 재배포. 정식/예외면 'node scripts/check-route-guard.js --bless'. (긴급 우회: --skip-safety)"
    fi
    success "라우트 가드 OK (무방비 /restaurant/:param 신규 0)"

    log "Safety gate (4b/9): 🗄️ 마이그레이션 레지스트리 (배포목록 누락 = 스키마 드리프트 차단)..."
    if ! node scripts/check-migration-registry.js; then
        error "🗄️ 미분류/유령 마이그레이션 — 새 migrate-*.js 를 만들고 목록 등록을 잊으면 운영 DB 스키마가 안 맞는다. scripts/migrations.registry.json 의 deploy(멱등·매배포) 또는 manual(일회성, 이유명시) 에 추가 후 재배포. (긴급 우회: --skip-safety)"
    fi
    success "마이그레이션 레지스트리 OK (전 마이그 분류됨 — 드리프트 안전)"

    log "Safety gate (5/9): 🕐 타임존 가드 (신규 위반 0 — 매장 타임존 규칙)..."
    if ! node scripts/timezone-check.js; then
        error "🕐 신규 타임존 위반 — 브라우저 로컬시간 사용. getTodayBounds/formatDateTime 로 교체 후 재배포. 정식이면 'node scripts/timezone-check.js --bless'. (긴급 우회: --skip-safety)"
    fi
    success "타임존 가드 OK (신규 위반 0)"

    log "Safety gate (6/9): 💧 state hydration 안전 (legacy 캐시 crash 방지)..."
    if ! (cd $LOCAL_DEV_FRONTEND && node scripts/state-hydration-check.js); then
        error "💧 hydration warning — 새 state field 의 defensive merge/accessor 누락 = legacy 사용자 runtime crash. /검증 0단계 가이드 참조. (긴급 우회: --skip-safety)"
    fi
    cd $LOCAL_DEV_BACKEND
    success "state hydration 안전 OK (warning 0)"

    log "Safety gate (7/9): 회귀 테스트 (health-check 전체 — 인쇄 계약 + 보안 + API)..."
    if ! node scripts/health-check.js --quiet; then
        error "회귀 테스트 실패 — 인쇄/주문/보안 등 기능 회귀 감지. 위 실패 항목 수정 후 재배포. (긴급 우회: --skip-safety)"
    fi
    success "회귀 테스트 통과 — 인쇄/주문 계약 + 전체 기능 정상"

    log "Safety gate (8/9): 인스펙션 하니스 (공급망·플랜모듈·주문돈무결성 구조 불변식)..."
    if ! node scripts/inspection/run.js; then
        error "🔎 신규 구조 위반 — 공급망(자기참조/고아/미러/카테고리)·플랜모듈(buyer 게이트)·주문돈무결성(금액재구성/멱등중복/고아결제/결제합) 불변식 위반 감지. scripts/inspection 참조. 정식/의도된 부채면 'node scripts/inspection/run.js --bless'. (긴급 우회: --skip-safety)"
    fi
    success "인스펙션 하니스 통과 — 구조 불변식 신규 위반 0"

    log "Safety gate (9/9): 🖨️ 인쇄 라우트 가드 (자동인쇄 디스패치 전 루트: 방식×프린터×native/web 실제 실행)..."
    cd $LOCAL_DEV_FRONTEND
    if ! node scripts/print-route-guard/run.js --quiet; then
        error "🖨️ 인쇄 라우트 회귀 — 자동인쇄 디스패치(utils/billPrint.js)가 어떤 방식/프린터 조합에서 잘못된 트랜스포트로 가거나 유령출력/누락 발생. 위 실패 루트 수정 후 재배포. 정식 라우팅 변경이면 scripts/print-route-guard/cases.js 기대값도 함께 갱신. (긴급 우회: --skip-safety)"
    fi
    success "인쇄 라우트 가드 통과 — 전 자동인쇄 루트 정상 (종이만 실기기 확인 남음)"
    cd $LOCAL_DEV_BACKEND

    # 1c. 배포 델타 분류 (정보성, fail 아님) — 이번 배포가 민감영역(인쇄/돈/보안/마이그레이션)에
    # 닿는지 자동 분류해 표시. Fable 게이트 대상이면 여기서 눈으로 확인된다.
    log "Classifying deploy delta (sensitive areas — Fable gate check)..."
    node scripts/check-sensitive-diff.js || true
fi

# ──────────────────────────────────────────
# 2. Pre-deploy: DB Schema Comparison (dev vs prod)
# ──────────────────────────────────────────
log "Comparing DB schemas (dev vs prod)..."

# Export dev DB schema
cd $LOCAL_DEV_BACKEND
node compare-schema.js --export --out /tmp/deploy_dev_schema.json 2>/dev/null
DEV_TABLES=$(node -e "console.log(Object.keys(JSON.parse(require('fs').readFileSync('/tmp/deploy_dev_schema.json','utf-8'))).length)")

# Export prod DB schema via SSH
ssh $PROD_SERVER "cd $REMOTE_PROD_BACKEND && node compare-schema.js --export --out /tmp/deploy_prod_schema.json 2>/dev/null" 2>/dev/null || true
scp -q $PROD_SERVER:/tmp/deploy_prod_schema.json /tmp/deploy_prod_schema.json 2>/dev/null

if [ -f /tmp/deploy_prod_schema.json ] && [ -s /tmp/deploy_prod_schema.json ]; then
    PROD_TABLES=$(node -e "console.log(Object.keys(JSON.parse(require('fs').readFileSync('/tmp/deploy_prod_schema.json','utf-8'))).length)")

    echo -e "  ${CYAN}Dev: ${DEV_TABLES} tables | Prod: ${PROD_TABLES} tables${NC}"

    # Compare schemas
    SCHEMA_DIFF=$(cd $LOCAL_DEV_BACKEND && node compare-schema.js --compare /tmp/deploy_dev_schema.json /tmp/deploy_prod_schema.json 2>/dev/null) || true

    if echo "$SCHEMA_DIFF" | grep -q "Schemas are identical"; then
        success "DB schemas are identical — no migration needed"
    else
        warn "DB schema differences detected:"
        echo ""
        echo "$SCHEMA_DIFF" | grep -E "^(🆕|⚠️|🔄|🗑️|   |───|Total)" | head -40
        echo ""

        if [ "$AUTO_MODE" = false ]; then
            warn "sync-database.js will attempt to apply these changes automatically."
            read -p "Continue with deployment? (y/N): " schema_confirm
            if [[ ! "$schema_confirm" =~ ^[Yy]$ ]]; then
                echo "Cancelled."
                exit 0
            fi
        fi
    fi
else
    warn "Could not export prod schema (compare-schema.js may not exist on prod yet). Will sync after deploy."
fi

# ──────────────────────────────────────────
# 3. Confirmation
# ──────────────────────────────────────────
if [ "$AUTO_MODE" = false ]; then
    echo ""
    warn "이 작업은 운영서버에 배포합니다."
    read -p "계속하시겠습니까? (y/N): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
fi

# ──────────────────────────────────────────
# 4. Create backup on production server
# ──────────────────────────────────────────
log "Creating backup on production server..."
ssh $PROD_SERVER "mkdir -p /var/www/backups/${TIMESTAMP}"
ssh $PROD_SERVER "cp -r $REMOTE_PROD_BACKEND /var/www/backups/${TIMESTAMP}/production-backend" 2>/dev/null || true
ssh $PROD_SERVER "cp -r $REMOTE_PROD_FRONTEND/build /var/www/backups/${TIMESTAMP}/production-frontend-build" 2>/dev/null || true
success "Backup created: /var/www/backups/${TIMESTAMP}"

# ──────────────────────────────────────────
# 5. Build frontend locally
# ──────────────────────────────────────────
if [ "$SKIP_BUILD" = true ]; then
    log "Skipping frontend build (--skip-build)"
    if [ ! -f "$LOCAL_DEV_FRONTEND/build/index.html" ]; then
        error "No existing build found. Remove --skip-build to build."
    fi
    success "Using existing build"
else
    log "Building frontend..."
    cd $LOCAL_DEV_FRONTEND
    npm run build:dev > /tmp/build.log 2>&1 || {
        error "Frontend build failed. Check /tmp/build.log"
    }
    success "Frontend built successfully"
fi

# ──────────────────────────────────────────
# 5b. POST-BUILD SAFETY GATE — 실브라우저 mount sweep (fail-closed)
# build 통과 ≠ runtime 안전 (v3.37 TDZ 크래시 교훈 — CLAUDE.md CRITICAL).
# 방금 dev 에 배포된 번들(build:dev = dev nginx 서빙)을 Playwright 로 실제 mount 해
# 운영 critical 페이지 크래시/console.error/ErrorBoundary 를 잡는다. (~5분)
# ──────────────────────────────────────────
if [ "$SKIP_SAFETY" = true ]; then
    warn "⚠️  mount sweep 건너뜀 (--skip-safety)"
else
    log "Post-build gate: 실브라우저 mount sweep (RA+BG 전 페이지 크래시 0)..."
    cd $LOCAL_DEV_BACKEND
    if ! node scripts/verify-all.js --only mount; then
        error "실브라우저 mount 실패 — 운영 critical 페이지 크래시/console.error 감지 (build 는 통과했어도 runtime 사고). 수정 후 재배포. (긴급 우회: --skip-safety)"
    fi
    success "mount sweep 통과 — 실브라우저 크래시 0"
fi

# ──────────────────────────────────────────
# 6. Sync backend to production
# ──────────────────────────────────────────
log "Syncing backend to production server..."
BACKEND_RSYNC_LOG=$(rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.env' \
    --exclude 'uploads' \
    --exclude '*.log' \
    $LOCAL_DEV_BACKEND/ $PROD_SERVER:$REMOTE_PROD_BACKEND/ 2>&1)
BACKEND_RSYNC_EXIT=$?
if [ $BACKEND_RSYNC_EXIT -ne 0 ]; then
    error "Backend rsync failed (exit code: $BACKEND_RSYNC_EXIT)"
fi
BACKEND_FILE_COUNT=$(echo "$BACKEND_RSYNC_LOG" | grep -cE '^\S' 2>/dev/null || echo 0)
success "Backend synced ($BACKEND_FILE_COUNT files transferred)"

# ──────────────────────────────────────────
# 6b. Verify critical backend files on production
# ──────────────────────────────────────────
log "Verifying critical backend files on production..."
VERIFY_FAIL=0

# Compare file sizes of key backend files
for CHECK_FILE in "server.js" "routes/invoices.js" "models/Invoice.js" "services/invoiceScheduler.js"; do
    LOCAL_SIZE=$(stat -c%s "$LOCAL_DEV_BACKEND/$CHECK_FILE" 2>/dev/null || echo "0")
    REMOTE_SIZE=$(ssh $PROD_SERVER "stat -c%s $REMOTE_PROD_BACKEND/$CHECK_FILE" 2>/dev/null || echo "0")
    if [ "$LOCAL_SIZE" != "$REMOTE_SIZE" ]; then
        warn "  Size mismatch: $CHECK_FILE (dev: $LOCAL_SIZE, prod: $REMOTE_SIZE)"
        VERIFY_FAIL=$((VERIFY_FAIL + 1))
    fi
done

if [ $VERIFY_FAIL -eq 0 ]; then
    success "Critical backend files verified"
else
    warn "$VERIFY_FAIL file(s) have size mismatches — may need manual check"
fi

# ──────────────────────────────────────────
# 7. Sync frontend build to production
# ──────────────────────────────────────────
log "Syncing frontend build to production server..."
# NOTE: --delete would wipe build/desktop/ (the Windows installer .exe lives in
# dev-frontend-build/desktop/, NOT in the fresh npm build). Exclude it here and
# sync it separately below so the native app installer is never removed/regressed.
FRONTEND_RSYNC_LOG=$(rsync -avz --delete --exclude 'desktop' \
    $LOCAL_DEV_FRONTEND/build/ $PROD_SERVER:$REMOTE_PROD_FRONTEND/build/ 2>&1)
FRONTEND_RSYNC_EXIT=$?
if [ $FRONTEND_RSYNC_EXIT -ne 0 ]; then
    error "Frontend rsync failed (exit code: $FRONTEND_RSYNC_EXIT)"
fi
FRONTEND_FILE_COUNT=$(echo "$FRONTEND_RSYNC_LOG" | grep -cE '^\S' 2>/dev/null || echo 0)
success "Frontend synced ($FRONTEND_FILE_COUNT files transferred)"

# 7a. Sync desktop app installer (Windows .exe) — served at /desktop/*.
# Source is the nginx-served dev build dir (dev-frontend-build/desktop/), which
# holds the wine-built PurplePOS-Setup.exe + blockmap + latest.yml (auto-updater).
# No --delete: additive, keeps prior versions for electron-updater rollback.
DESKTOP_SRC="/var/www/dev-frontend-build/desktop"
if [ -d "$DESKTOP_SRC" ]; then
    log "Syncing desktop app installer to production..."
    DESKTOP_RSYNC_LOG=$(rsync -avz \
        "$DESKTOP_SRC/" "$PROD_SERVER:$REMOTE_PROD_FRONTEND/build/desktop/" 2>&1)
    if [ $? -ne 0 ]; then
        warn "Desktop installer rsync failed — Windows app download may be stale"
    else
        DESKTOP_FILE_COUNT=$(echo "$DESKTOP_RSYNC_LOG" | grep -cE '^\S' 2>/dev/null || echo 0)
        success "Desktop installer synced ($DESKTOP_FILE_COUNT files)"
    fi
else
    log "No desktop installer dir ($DESKTOP_SRC) — skipping"
fi

# ──────────────────────────────────────────
# 7b. Verify frontend build hash matches
# ──────────────────────────────────────────
log "Verifying frontend build integrity..."
LOCAL_MAIN_JS=$(ls -1 $LOCAL_DEV_FRONTEND/build/static/js/main.*.js 2>/dev/null | head -1)
if [ -n "$LOCAL_MAIN_JS" ]; then
    LOCAL_MAIN_NAME=$(basename "$LOCAL_MAIN_JS")
    REMOTE_EXISTS=$(ssh $PROD_SERVER "ls $REMOTE_PROD_FRONTEND/build/static/js/$LOCAL_MAIN_NAME 2>/dev/null && echo 'YES' || echo 'NO'")
    if echo "$REMOTE_EXISTS" | grep -q "YES"; then
        success "Frontend main.js hash match: $LOCAL_MAIN_NAME"
    else
        warn "Frontend main.js not found on production! Expected: $LOCAL_MAIN_NAME"
        warn "  Prod JS files:"
        ssh $PROD_SERVER "ls $REMOTE_PROD_FRONTEND/build/static/js/main.*.js 2>/dev/null" || echo "  (none found)"
    fi
fi

# ──────────────────────────────────────────
# 8. Install dependencies on production
# ──────────────────────────────────────────
log "Installing dependencies on production server..."
ssh $PROD_SERVER "cd $REMOTE_PROD_BACKEND && npm install --production --silent"
success "Dependencies installed"

# ──────────────────────────────────────────
# 9. Sync database schema (ALTER TABLE for new/changed columns)
# ──────────────────────────────────────────
log "Syncing database schema on production server..."
SYNC_OUTPUT=$(ssh $PROD_SERVER "cd $REMOTE_PROD_BACKEND && node sync-database.js 2>&1") || true
SYNC_EXIT=$?

# Show sync results
if echo "$SYNC_OUTPUT" | grep -q "models synchronized successfully"; then
    SYNCED=$(echo "$SYNC_OUTPUT" | grep -oP '\d+ models synchronized' | head -1)
    success "Database schema synced ($SYNCED)"
fi

if echo "$SYNC_OUTPUT" | grep -q "⚠️"; then
    warn "Some models had sync issues:"
    echo "$SYNC_OUTPUT" | grep "⚠️" | head -10
fi

if echo "$SYNC_OUTPUT" | grep -q "✗ Unable to sync"; then
    warn "Database sync failed! Check manually:"
    echo "$SYNC_OUTPUT" | grep "✗"
fi

# 9a. Run data migration (if exists)
# ──────────────────────────────────────────
MIGRATE_FILE="migrate-2026-03-18.js"
if ssh $PROD_SERVER "test -f $REMOTE_PROD_BACKEND/$MIGRATE_FILE"; then
    log "Running data migration ($MIGRATE_FILE)..."
    MIGRATE_OUTPUT=$(ssh $PROD_SERVER "cd $REMOTE_PROD_BACKEND && node $MIGRATE_FILE 2>&1") || true
    if echo "$MIGRATE_OUTPUT" | grep -q "Migration 완료"; then
        success "Data migration completed"
    else
        warn "Migration output:"
        echo "$MIGRATE_OUTPUT" | head -15
    fi
fi

# ──────────────────────────────────────────
# 9a-2. Run deploy-time migrations (idempotent)
#
# 목록의 단일 소스 = scripts/migrations.registry.json 의 `deploy` 배열 (순서 = FK 의존성).
# 예전엔 여기 하드코딩돼 있어, 새 migrate-*.js 를 만들고 목록 추가를 잊으면 운영 스키마 드리프트가
# 났다([[reference_deploy_schema_drift]]). 이제 check-migration-registry.js 가 미분류 마이그를
# 배포 전(안전 게이트)에 fail-closed 로 잡고, 실행 목록은 레지스트리에서 읽는다.
#
# sync-database.js 는 model→table 컬럼 ALTER 만 한다. 이 스크립트들은 그 밖의 것을 처리:
#   - seed 행 INSERT (예: Sprint5 carrier 5개) · ENUM 값 ALTER (예: Sprint6 'delivered')
# 전부 멱등(재실행 안전). manual(일회성/의도적 제외) 은 레지스트리 `manual` 에 이유와 함께 분리.
#   예) migrate-staff-payment-void-perms.js = 재실행 시 직원 결제·취소 권한 재부여 문제로 제외.
# ──────────────────────────────────────────
cd $LOCAL_DEV_BACKEND
DEPLOY_MIGRATIONS=$(node scripts/check-migration-registry.js --list-deploy)
if [ $? -ne 0 ] || [ -z "$DEPLOY_MIGRATIONS" ]; then
    error "마이그레이션 레지스트리 검사 실패 — 미분류/유령 마이그가 있어 배포 목록을 확정할 수 없음. 'node scripts/check-migration-registry.js' 로 확인 후 registry.json 정리. (안전 게이트에서 이미 걸렸어야 함)"
fi
while IFS= read -r MIG_NAME; do
    [ -z "$MIG_NAME" ] && continue
    SPRINT_MIG="scripts/$MIG_NAME"
    if ssh $PROD_SERVER "test -f $REMOTE_PROD_BACKEND/$SPRINT_MIG"; then
        log "Running $MIG_NAME..."
        SPRINT_OUTPUT=$(ssh $PROD_SERVER "cd $REMOTE_PROD_BACKEND && node $SPRINT_MIG 2>&1") || true
        if echo "$SPRINT_OUTPUT" | grep -qiE "(complete|✓|done|migrated|seeded)"; then
            success "$MIG_NAME completed"
        else
            warn "$MIG_NAME output (review needed):"
            echo "$SPRINT_OUTPUT" | tail -20
        fi
    else
        warn "$MIG_NAME not found on prod — copying from dev..."
        scp -q "$LOCAL_DEV_BACKEND/$SPRINT_MIG" "$PROD_SERVER:$REMOTE_PROD_BACKEND/$SPRINT_MIG" || warn "scp failed for $MIG_NAME"
        SPRINT_OUTPUT=$(ssh $PROD_SERVER "cd $REMOTE_PROD_BACKEND && node $SPRINT_MIG 2>&1") || true
        echo "$SPRINT_OUTPUT" | tail -10
    fi
done <<< "$DEPLOY_MIGRATIONS"

# ──────────────────────────────────────────
# 9b. Sync seed data (addon_modules, plan_templates 등 시스템 설정 데이터)
# ──────────────────────────────────────────
log "Syncing seed data (system config tables)..."

# Export seed data from dev DB
cd $LOCAL_DEV_BACKEND
SEED_EXPORT=$(node sync-seed-data.js --export --out /tmp/deploy_seed_data.json 2>&1) || true

if [ -f /tmp/deploy_seed_data.json ]; then
    # Copy to production
    scp -q /tmp/deploy_seed_data.json $PROD_SERVER:/tmp/deploy_seed_data.json

    # Import on production
    SEED_IMPORT=$(ssh $PROD_SERVER "cd $REMOTE_PROD_BACKEND && node sync-seed-data.js --import --in /tmp/deploy_seed_data.json 2>&1") || true

    if echo "$SEED_IMPORT" | grep -q "Seed data sync complete"; then
        SEED_SUMMARY=$(echo "$SEED_IMPORT" | grep "📊" | head -1)
        success "Seed data synced — $SEED_SUMMARY"
    else
        warn "Seed data sync had issues:"
        echo "$SEED_IMPORT" | head -10
    fi

    # Cleanup
    rm -f /tmp/deploy_seed_data.json
    ssh $PROD_SERVER "rm -f /tmp/deploy_seed_data.json" 2>/dev/null || true
else
    warn "Could not export seed data (non-critical)"
fi

# Mark demo accounts (is_demo flag)
log "Marking demo accounts on production..."
DEMO_MARK=$(ssh $PROD_SERVER "cd $REMOTE_PROD_BACKEND && node scripts/mark-demo-accounts.js 2>&1") || true
if echo "$DEMO_MARK" | grep -q "Demo marking complete"; then
    success "Demo accounts marked"
else
    warn "Demo marking had issues:"
    echo "$DEMO_MARK" | head -5
fi

# ──────────────────────────────────────────
# 10. Post-sync: Verify schema parity
# ──────────────────────────────────────────
log "Verifying schema parity after sync..."
ssh $PROD_SERVER "cd $REMOTE_PROD_BACKEND && node compare-schema.js --export --out /tmp/deploy_prod_schema_after.json 2>/dev/null" 2>/dev/null || true
scp -q $PROD_SERVER:/tmp/deploy_prod_schema_after.json /tmp/deploy_prod_schema_after.json 2>/dev/null || true

if [ -f /tmp/deploy_prod_schema_after.json ] && [ -s /tmp/deploy_prod_schema_after.json ]; then
    POST_DIFF=$(cd $LOCAL_DEV_BACKEND && node compare-schema.js --compare /tmp/deploy_dev_schema.json /tmp/deploy_prod_schema_after.json 2>/dev/null) || true

    if echo "$POST_DIFF" | grep -q "Schemas are identical"; then
        success "Post-sync: schemas are now identical"
    else
        # Count remaining new tables and new columns (critical)
        NEW_TABLES=$(echo "$POST_DIFF" | grep -c "^   + " 2>/dev/null || echo 0)
        TYPE_CHANGES=$(echo "$POST_DIFF" | grep -c "^   ⚡" 2>/dev/null || echo 0)

        if echo "$POST_DIFF" | grep -qE "^🆕 New (tables|columns)"; then
            warn "Post-sync: some new tables/columns still missing on prod!"
            echo "$POST_DIFF" | grep -E "^(🆕|   \+)" | head -10
        fi

        if [ "$TYPE_CHANGES" -gt 0 ]; then
            # Type changes (datetime vs timestamp etc) are usually harmless
            echo -e "  ${CYAN}${TYPE_CHANGES} type differences remain (usually harmless: datetime↔timestamp etc)${NC}"
        fi
    fi
else
    warn "Could not verify post-sync schema (non-critical)"
fi

# ──────────────────────────────────────────
# 11. Restart production backend
# ──────────────────────────────────────────
log "Restarting production backend..."
ssh $PROD_SERVER "pm2 restart production-backend"
success "Backend restarted"

# ──────────────────────────────────────────
# 12. Wait and verify health
# ──────────────────────────────────────────
log "Waiting for server to start..."
sleep 3

log "Verifying production server health..."
HEALTH_RESP=$(ssh $PROD_SERVER "curl -s --max-time 5 http://localhost:3002/api/health" 2>/dev/null) || HEALTH_RESP=""
if echo "$HEALTH_RESP" | grep -q '"status":"ok"'; then
    # Extract uptime to verify it's a fresh restart (should be < 30 seconds)
    UPTIME=$(echo "$HEALTH_RESP" | grep -oP '"uptime":\K[0-9.]+' | head -1)
    if [ -n "$UPTIME" ]; then
        UPTIME_INT=${UPTIME%%.*}
        if [ "$UPTIME_INT" -lt 30 ]; then
            success "Production server is healthy (uptime: ${UPTIME_INT}s — fresh restart confirmed)"
        else
            warn "Production server is healthy but uptime is ${UPTIME_INT}s — PM2 may not have restarted properly!"
        fi
    else
        success "Production server is healthy!"
    fi
else
    warn "Health check failed. Please verify manually."
fi

# ──────────────────────────────────────────
# 13. Reload nginx (with cache clear)
# ──────────────────────────────────────────
log "Reloading nginx..."
ssh $PROD_SERVER "sudo systemctl reload nginx"
# Clear nginx proxy cache if it exists
ssh $PROD_SERVER "if [ -d /var/cache/nginx ]; then sudo rm -rf /var/cache/nginx/* 2>/dev/null; echo 'Nginx cache cleared'; fi" 2>/dev/null || true
success "Nginx reloaded"

# ──────────────────────────────────────────
# 14. Smoke Test — 핵심 기능 검증
# ──────────────────────────────────────────
log "Running smoke tests on production server..."
echo ""

SMOKE_PASS=0
SMOKE_FAIL=0
SMOKE_TOTAL=0

smoke_test() {
    local label="$1"
    local cmd="$2"
    local expect="$3"
    SMOKE_TOTAL=$((SMOKE_TOTAL + 1))

    RESULT=$(ssh $PROD_SERVER "$cmd" 2>/dev/null) || RESULT=""
    if echo "$RESULT" | grep -q "$expect"; then
        echo -e "  ${GREEN}✓${NC} $label"
        SMOKE_PASS=$((SMOKE_PASS + 1))
    else
        echo -e "  ${RED}✗${NC} $label"
        SMOKE_FAIL=$((SMOKE_FAIL + 1))
    fi
}

# --- 14a. Server & Login ---
smoke_test "Health check" \
    "curl -s --max-time 5 http://localhost:3002/api/health" \
    '"status":"ok"'

# Smoke 로그인 — 로그인 페이지의 "Test Accounts" 와 동일한 demo-login(키 기반, 비번 하드코딩 X).
# test_restaurant_admin = K-DINE Restaurant Admin(is_test, restaurant_id=5). 과거 직접로그인
# (admin@pos-system.com)은 그 계정 삭제(이메일폭주 정리, 2026-06-01)로 항상 실패하던 것 →
# demo-login 키 방식으로 교체(2026-06-04). restaurant_id 도 응답에서 추출해 하위 smoke 에 사용.
SMOKE_LOGIN=$(ssh $PROD_SERVER "curl -s --max-time 5 -X POST http://localhost:3002/api/auth/demo-login \
    -H 'Content-Type: application/json' \
    -d '{\"key\":\"test_restaurant_admin\"}'" 2>/dev/null)
ADMIN_TOKEN=$(echo "$SMOKE_LOGIN" | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4)
SMOKE_RID=$(echo "$SMOKE_LOGIN" | grep -o '"restaurant_id":[0-9]*' | head -1 | cut -d':' -f2)
[ -z "$SMOKE_RID" ] && SMOKE_RID=5

if [ -n "$ADMIN_TOKEN" ] && [ "$ADMIN_TOKEN" != "null" ]; then
    echo -e "  ${GREEN}✓${NC} Test admin login (demo-login key)"
    SMOKE_PASS=$((SMOKE_PASS + 1))
else
    echo -e "  ${RED}✗${NC} Admin login"
    SMOKE_FAIL=$((SMOKE_FAIL + 1))
    ADMIN_TOKEN=""
fi
SMOKE_TOTAL=$((SMOKE_TOTAL + 1))

# --- 14b. POS 핵심 흐름: 메뉴 → 주문 → 빌 ---
if [ -n "$ADMIN_TOKEN" ]; then
    smoke_test "GET menu" \
        "curl -s --max-time 5 http://localhost:3002/api/menu?restaurantId=$SMOKE_RID \
            -H 'Authorization: Bearer $ADMIN_TOKEN'" \
        '"success"'

    SMOKE_TOTAL=$((SMOKE_TOTAL + 1))
    ORDER_RESPONSE=$(ssh $PROD_SERVER "curl -s --max-time 10 -X POST http://localhost:3002/api/orders \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer $ADMIN_TOKEN' \
        -d '{\"restaurant_id\":$SMOKE_RID,\"order_type\":\"dine_in\",\"table_number\":\"SMOKE99\",\"skipAutoMerge\":true,\"order_items\":[{\"name\":\"Smoke Test Item\",\"price\":1.00,\"quantity\":1}]}'" 2>/dev/null) || ORDER_RESPONSE=""

    SMOKE_ORDER_ID=$(echo "$ORDER_RESPONSE" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

    if [ -n "$SMOKE_ORDER_ID" ] && echo "$ORDER_RESPONSE" | grep -q '"success":true'; then
        echo -e "  ${GREEN}✓${NC} POST order (#$SMOKE_ORDER_ID)"
        SMOKE_PASS=$((SMOKE_PASS + 1))

        smoke_test "GET bill data" \
            "curl -s --max-time 5 http://localhost:3002/api/orders/$SMOKE_ORDER_ID \
                -H 'Authorization: Bearer $ADMIN_TOKEN'" \
            '"order_items"'

        # Cleanup
        ssh $PROD_SERVER "curl -s --max-time 5 -X PATCH http://localhost:3002/api/orders/$SMOKE_ORDER_ID/status \
            -H 'Content-Type: application/json' \
            -H 'Authorization: Bearer $ADMIN_TOKEN' \
            -d '{\"status\":\"cancelled\"}'" > /dev/null 2>&1 || true
    else
        echo -e "  ${RED}✗${NC} POST order"
        SMOKE_FAIL=$((SMOKE_FAIL + 1))
    fi
fi

# --- 14c. API Endpoints ---
if [ -n "$ADMIN_TOKEN" ]; then
    # 매장(Restaurant Admin) 토큰 스코프 검증. 과거 GET invoices([] 빈배열 → '"id"' 못찾아
    # false fail) / GET admin/payment-settings(System Admin 전용 → RA 403) 는 제거하고, 매장
    # 토큰으로 항상 유효한 항목으로 교체(2026-06-04). 운영 인증/POS 흐름은 위 menu→order→bill 로 검증.
    smoke_test "GET restaurants (accessible)" \
        "curl -s --max-time 5 http://localhost:3002/api/restaurants \
            -H 'Authorization: Bearer $ADMIN_TOKEN'" \
        '"id"'

    smoke_test "GET pending-print" \
        "curl -s --max-time 5 http://localhost:3002/api/orders/restaurant/$SMOKE_RID/pending-print \
            -H 'Authorization: Bearer $ADMIN_TOKEN'" \
        '"success"'
fi

# --- 14d. Frontend ---
smoke_test "Frontend" \
    "curl -s --max-time 5 -o /dev/null -w '%{http_code}' https://purplehere.com/" \
    "200"

# --- 14e. Frontend JS bundle check ---
SMOKE_TOTAL=$((SMOKE_TOTAL + 1))
PROD_MAIN_JS=$(ssh $PROD_SERVER "ls -1 $REMOTE_PROD_FRONTEND/build/static/js/main.*.js 2>/dev/null | head -1" 2>/dev/null)
if [ -n "$PROD_MAIN_JS" ]; then
    PROD_JS_NAME=$(basename "$PROD_MAIN_JS")
    # Verify the JS is accessible via HTTPS
    JS_HTTP=$(ssh $PROD_SERVER "curl -s --max-time 5 -o /dev/null -w '%{http_code}' https://purplehere.com/static/js/$PROD_JS_NAME" 2>/dev/null)
    if [ "$JS_HTTP" = "200" ]; then
        echo -e "  ${GREEN}✓${NC} Frontend JS bundle accessible ($PROD_JS_NAME)"
        SMOKE_PASS=$((SMOKE_PASS + 1))
    else
        echo -e "  ${RED}✗${NC} Frontend JS bundle NOT accessible ($PROD_JS_NAME → HTTP $JS_HTTP)"
        SMOKE_FAIL=$((SMOKE_FAIL + 1))
    fi
else
    echo -e "  ${RED}✗${NC} Frontend JS bundle not found on production"
    SMOKE_FAIL=$((SMOKE_FAIL + 1))
fi

# --- Summary ---
echo ""
if [ $SMOKE_FAIL -eq 0 ]; then
    success "Smoke tests: ${SMOKE_PASS}/${SMOKE_TOTAL} passed — all OK"
else
    warn "Smoke tests: ${SMOKE_PASS}/${SMOKE_TOTAL} passed, ${SMOKE_FAIL} FAILED"
fi

# ──────────────────────────────────────────
# Content sync (FAQ, Blog → production DB)
# 랜딩 페이지 콘텐츠(블로그·FAQ)는 코드와 함께 운영 DB에도 반영되어야 한다.
# scripts/sync-contents-to-prod.js 가 다국어/persona/funnel/video/social 모든 컬럼을 처리.
# ──────────────────────────────────────────
if [ "$SYNC_CONTENT" = true ]; then
    log "Syncing landing content (Blog + FAQ) to production DB — since=${SYNC_CONTENT_SINCE}..."
    cd $LOCAL_DEV_BACKEND
    if node scripts/sync-contents-to-prod.js --since=${SYNC_CONTENT_SINCE} 2>&1 | tee /tmp/content_sync_log.txt; then
        SYNC_LINES=$(grep -cE "(updated|inserted)" /tmp/content_sync_log.txt 2>/dev/null || echo "0")
        success "Content synced to production (${SYNC_LINES} rows)"
    else
        warn "Content sync failed — check /tmp/content_sync_log.txt and rerun: node scripts/sync-contents-to-prod.js --since=${SYNC_CONTENT_SINCE}"
    fi
    rm -f /tmp/content_sync_log.txt
else
    log "Skipping content sync (--no-sync-content set)"
fi

# ──────────────────────────────────────────
# Deploy snapshot — 배포된 소스 지문 기록 (.claude/deploy-manifest.json)
# 이후 세션에서 "운영 대비 무엇이 바뀌었나"를 check-sensitive-diff.js 가 기계로 판정하는 앵커.
# ──────────────────────────────────────────
log "Recording deploy manifest snapshot..."
(cd $LOCAL_DEV_BACKEND && node scripts/deploy-manifest.js --snapshot) || warn "deploy manifest snapshot 실패 (비치명 — 다음 배포 때 재기록)"

# ──────────────────────────────────────────
# Cleanup temp files
# ──────────────────────────────────────────
rm -f /tmp/deploy_dev_schema.json /tmp/deploy_prod_schema.json /tmp/deploy_prod_schema_after.json

echo ""
echo "============================================"
echo "  Deployment Complete!"
echo "  Backup: /var/www/backups/${TIMESTAMP}"
echo "  Smoke:  ${SMOKE_PASS}/${SMOKE_TOTAL} passed"
echo "  Time: $(date)"
echo "============================================"
echo ""
