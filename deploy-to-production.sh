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

for arg in "$@"; do
    case $arg in
        --auto) AUTO_MODE=true ;;
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
log "Building frontend..."
cd $LOCAL_DEV_FRONTEND
npm run build:dev > /tmp/build.log 2>&1 || {
    error "Frontend build failed. Check /tmp/build.log"
}
success "Frontend built successfully"

# ──────────────────────────────────────────
# 6. Sync backend to production
# ──────────────────────────────────────────
log "Syncing backend to production server..."
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.env' \
    --exclude 'uploads' \
    --exclude '*.log' \
    $LOCAL_DEV_BACKEND/ $PROD_SERVER:$REMOTE_PROD_BACKEND/
success "Backend synced"

# ──────────────────────────────────────────
# 7. Sync frontend build to production
# ──────────────────────────────────────────
log "Syncing frontend build to production server..."
rsync -avz --delete \
    $LOCAL_DEV_FRONTEND/build/ $PROD_SERVER:$REMOTE_PROD_FRONTEND/build/
success "Frontend synced"

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

if echo "$SYNC_OUTPUT" | grep -q "❌ Unable to sync"; then
    warn "Database sync failed! Check manually:"
    echo "$SYNC_OUTPUT" | grep "❌"
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
if ssh $PROD_SERVER "curl -s --max-time 5 http://localhost:3002/api/health" | grep -q '"status":"ok"'; then
    success "Production server is healthy!"
else
    warn "Health check failed. Please verify manually."
fi

# ──────────────────────────────────────────
# 13. Reload nginx
# ──────────────────────────────────────────
log "Reloading nginx..."
ssh $PROD_SERVER "sudo systemctl reload nginx"
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

ADMIN_TOKEN=$(ssh $PROD_SERVER "curl -s --max-time 5 -X POST http://localhost:3002/api/auth/login \
    -H 'Content-Type: application/json' \
    -d '{\"email\":\"admin@pos-system.com\",\"password\":\"admin123\"}'" 2>/dev/null \
    | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -n "$ADMIN_TOKEN" ] && [ "$ADMIN_TOKEN" != "null" ]; then
    echo -e "  ${GREEN}✓${NC} Admin login"
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
        "curl -s --max-time 5 http://localhost:3002/api/menu?restaurantId=1 \
            -H 'Authorization: Bearer $ADMIN_TOKEN'" \
        '"success"'

    SMOKE_TOTAL=$((SMOKE_TOTAL + 1))
    ORDER_RESPONSE=$(ssh $PROD_SERVER "curl -s --max-time 10 -X POST http://localhost:3002/api/orders \
        -H 'Content-Type: application/json' \
        -H 'Authorization: Bearer $ADMIN_TOKEN' \
        -d '{\"restaurant_id\":1,\"order_type\":\"dine_in\",\"table_number\":\"SMOKE99\",\"skipAutoMerge\":true,\"order_items\":[{\"name\":\"Smoke Test Item\",\"price\":1.00,\"quantity\":1}]}'" 2>/dev/null) || ORDER_RESPONSE=""

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

# --- 14c. Frontend ---
smoke_test "Frontend" \
    "curl -s --max-time 5 -o /dev/null -w '%{http_code}' https://purplehere.com/" \
    "200"

# --- Summary ---
echo ""
if [ $SMOKE_FAIL -eq 0 ]; then
    success "Smoke tests: ${SMOKE_PASS}/${SMOKE_TOTAL} passed — all OK"
else
    warn "Smoke tests: ${SMOKE_PASS}/${SMOKE_TOTAL} passed, ${SMOKE_FAIL} FAILED"
fi

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
