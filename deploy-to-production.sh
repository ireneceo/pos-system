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
SYNC_CONTENT=false

for arg in "$@"; do
    case $arg in
        --auto) AUTO_MODE=true ;;
        --skip-build) SKIP_BUILD=true ;;
        --sync-content) SYNC_CONTENT=true ;;
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
FRONTEND_RSYNC_LOG=$(rsync -avz --delete \
    $LOCAL_DEV_FRONTEND/build/ $PROD_SERVER:$REMOTE_PROD_FRONTEND/build/ 2>&1)
FRONTEND_RSYNC_EXIT=$?
if [ $FRONTEND_RSYNC_EXIT -ne 0 ]; then
    error "Frontend rsync failed (exit code: $FRONTEND_RSYNC_EXIT)"
fi
FRONTEND_FILE_COUNT=$(echo "$FRONTEND_RSYNC_LOG" | grep -cE '^\S' 2>/dev/null || echo 0)
success "Frontend synced ($FRONTEND_FILE_COUNT files transferred)"

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

# --- 14c. API Endpoints ---
if [ -n "$ADMIN_TOKEN" ]; then
    smoke_test "GET invoices" \
        "curl -s --max-time 5 http://localhost:3002/api/invoices \
            -H 'Authorization: Bearer $ADMIN_TOKEN'" \
        '"id"'

    smoke_test "GET restaurants" \
        "curl -s --max-time 5 http://localhost:3002/api/restaurants \
            -H 'Authorization: Bearer $ADMIN_TOKEN'" \
        '"id"'

    smoke_test "GET payment-settings" \
        "curl -s --max-time 5 http://localhost:3002/api/admin/payment-settings \
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
# ──────────────────────────────────────────
if [ "$SYNC_CONTENT" = true ]; then
    log "Syncing landing page content (FAQ, Blog) to production DB..."

    # Export from dev DB
    cd $LOCAL_DEV_BACKEND
    node -e "
    const { sequelize } = require('./config/database');
    (async () => {
      const [cats] = await sequelize.query('SELECT * FROM content_categories');
      const [contents] = await sequelize.query('SELECT * FROM contents WHERE type IN (\"faq\", \"blog\") AND status = \"published\"');
      const fs = require('fs');
      fs.writeFileSync('/tmp/content_sync.json', JSON.stringify({ categories: cats, contents: contents }));
      console.log('Exported: ' + cats.length + ' categories, ' + contents.length + ' contents');
      process.exit(0);
    })();
    " 2>/dev/null || warn "Failed to export content from dev DB"

    if [ -f /tmp/content_sync.json ]; then
        # Copy to production server
        scp /tmp/content_sync.json ${PROD_SERVER}:/tmp/content_sync.json

        # Import to production DB
        ssh $PROD_SERVER "cd /var/www/production-backend && node -e \"
        require('dotenv').config();
        const { sequelize } = require('./config/database');
        const fs = require('fs');
        (async () => {
          const data = JSON.parse(fs.readFileSync('/tmp/content_sync.json', 'utf8'));

          // Sync categories
          for (const cat of data.categories) {
            const [existing] = await sequelize.query('SELECT id FROM content_categories WHERE id = ?', { replacements: [cat.id] });
            if (existing.length > 0) {
              await sequelize.query('UPDATE content_categories SET name=?, slug=?, type=?, icon=?, is_active=?, sort_order=?, updated_at=NOW() WHERE id=?',
                { replacements: [cat.name, cat.slug, cat.type, cat.icon, cat.is_active, cat.sort_order, cat.id] });
            } else {
              await sequelize.query('INSERT INTO content_categories (id,name,slug,type,icon,is_active,sort_order,created_at,updated_at) VALUES (?,?,?,?,?,?,?,NOW(),NOW())',
                { replacements: [cat.id, cat.name, cat.slug, cat.type, cat.icon, cat.is_active, cat.sort_order] });
            }
          }
          console.log('Categories synced: ' + data.categories.length);

          // Sync contents
          for (const c of data.contents) {
            const [existing] = await sequelize.query('SELECT id FROM contents WHERE slug = ? AND type = ?', { replacements: [c.slug, c.type] });
            if (existing.length > 0) {
              await sequelize.query('UPDATE contents SET category_id=?, title=?, content=?, excerpt=?, status=?, sort_order=?, updated_at=NOW() WHERE slug=? AND type=?',
                { replacements: [c.category_id, c.title, c.content, c.excerpt, c.status, c.sort_order, c.slug, c.type] });
            } else {
              await sequelize.query('INSERT INTO contents (category_id,type,status,title,content,excerpt,slug,sort_order,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,NOW(),NOW(),NOW())',
                { replacements: [c.category_id, c.type, c.status, c.title, c.content, c.excerpt, c.slug, c.sort_order] });
            }
          }
          console.log('Contents synced: ' + data.contents.length);

          fs.unlinkSync('/tmp/content_sync.json');
          process.exit(0);
        })();
        \" 2>/dev/null" && success "Content synced to production" || warn "Content sync failed"

        rm -f /tmp/content_sync.json
    fi
else
    log "Skipping content sync (use --sync-content to sync FAQ/Blog)"
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
