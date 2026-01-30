#!/bin/bash
#
# Production Deployment Script v3.0
#
# 특징:
# - sudo 최소화 (nginx reload만 사용)
# - 빠른 배포 (불필요한 단계 제거)
# - 자동화 지원 (--auto 플래그)
# - 안전한 롤백
#
# 사용법:
#   ./deploy-production-v3.sh           # 대화형 모드
#   ./deploy-production-v3.sh --auto    # 자동 모드 (CI/CD용)
#   ./deploy-production-v3.sh --dry-run # 테스트 모드
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Paths
PROJECT_DIR="/var/www"
DEV_BACKEND="$PROJECT_DIR/dev-backend"
PROD_BACKEND="$PROJECT_DIR/production-backend"
DEV_FRONTEND="$PROJECT_DIR/dev-frontend"
PROD_FRONTEND="$PROJECT_DIR/production-frontend"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$PROJECT_DIR/backups/${TIMESTAMP}"

# Flags
AUTO_MODE=false
DRY_RUN=false

# Parse arguments
for arg in "$@"; do
    case $arg in
        --auto) AUTO_MODE=true ;;
        --dry-run) DRY_RUN=true ;;
    esac
done

log() { echo -e "${BLUE}[$(date +%H:%M:%S)]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }

confirm() {
    if [ "$AUTO_MODE" = true ]; then
        return 0
    fi
    read -p "$1 (yes/no): " response
    [ "$response" = "yes" ]
}

# ==================================================
# Pre-flight Checks
# ==================================================
preflight_check() {
    log "Pre-flight checks..."

    # Check directories exist
    [ -d "$DEV_BACKEND" ] || { error "dev-backend not found"; exit 1; }
    [ -d "$PROD_BACKEND" ] || { error "production-backend not found"; exit 1; }
    [ -d "$DEV_FRONTEND" ] || { error "dev-frontend not found"; exit 1; }
    [ -f "$PROD_BACKEND/.env" ] || { error "production .env not found"; exit 1; }

    # Check dev server is running
    if ! curl -s --max-time 3 http://localhost:3001/api/health | grep -q '"status":"ok"'; then
        error "Dev server not responding!"
        exit 1
    fi

    # Check PM2 process exists
    if ! pm2 describe production-backend > /dev/null 2>&1; then
        warn "PM2 production-backend not found, will create"
    fi

    success "All checks passed"
}

# ==================================================
# Show Changes
# ==================================================
show_changes() {
    log "Changes since last deployment..."

    cd "$PROJECT_DIR"

    LAST_DEPLOYED=""
    if [ -f ".last-deployed-commit" ]; then
        LAST_DEPLOYED=$(cat .last-deployed-commit)
    fi

    CURRENT=$(git rev-parse HEAD)

    echo "  Last deployed: ${LAST_DEPLOYED:0:7:-"(first deploy)"}"
    echo "  Current:       ${CURRENT:0:7}"
    echo ""

    if [ -n "$LAST_DEPLOYED" ]; then
        CHANGED=$(git diff --name-only "$LAST_DEPLOYED" HEAD 2>/dev/null | wc -l)
        echo "  Changed files: $CHANGED"

        # Show key changes
        git diff --name-only "$LAST_DEPLOYED" HEAD 2>/dev/null | grep -E "^dev-(backend|frontend)" | head -10
        echo ""
    fi
}

# ==================================================
# Backup
# ==================================================
create_backup() {
    log "Creating backup..."

    if [ "$DRY_RUN" = true ]; then
        echo "  [DRY-RUN] Would create: $BACKUP_DIR"
        return 0
    fi

    mkdir -p "$BACKUP_DIR"

    # Backup .env
    cp "$PROD_BACKEND/.env" "$BACKUP_DIR/.env.backup"

    # Backup backend (fast, excludes node_modules)
    tar -czf "$BACKUP_DIR/backend.tar.gz" \
        --exclude='node_modules' \
        --exclude='*.log' \
        -C "$PROJECT_DIR" production-backend 2>/dev/null

    # Backup frontend build
    if [ -d "$PROD_FRONTEND/build" ]; then
        tar -czf "$BACKUP_DIR/frontend.tar.gz" \
            -C "$PROD_FRONTEND" build 2>/dev/null
    fi

    success "Backup created: $BACKUP_DIR"
}

# ==================================================
# Sync Backend
# ==================================================
sync_backend() {
    log "Syncing backend code..."

    if [ "$DRY_RUN" = true ]; then
        echo "  [DRY-RUN] Would sync: dev-backend -> production-backend"
        return 0
    fi

    # Preserve .env
    cp "$PROD_BACKEND/.env" "/tmp/.env.prod.$$"

    # Sync (fast rsync)
    rsync -a --delete \
        --exclude='node_modules' \
        --exclude='.env' \
        --exclude='*.log' \
        --exclude='.server.pid' \
        "$DEV_BACKEND/" "$PROD_BACKEND/"

    # Restore .env
    mv "/tmp/.env.prod.$$" "$PROD_BACKEND/.env"
    chmod 600 "$PROD_BACKEND/.env"

    success "Backend synced"
}

# ==================================================
# Install Dependencies
# ==================================================
install_deps() {
    log "Installing dependencies..."

    if [ "$DRY_RUN" = true ]; then
        echo "  [DRY-RUN] Would run: npm install --omit=dev"
        return 0
    fi

    cd "$PROD_BACKEND"
    npm install --omit=dev --silent 2>/dev/null

    success "Dependencies installed"
}

# ==================================================
# Sync Database
# ==================================================
sync_database() {
    log "Syncing database schema..."

    if [ "$DRY_RUN" = true ]; then
        echo "  [DRY-RUN] Would run: sync-database.js"
        return 0
    fi

    cd "$PROD_BACKEND"
    node sync-database.js 2>&1 | grep -E "^(✅|❌)" || true

    success "Database synced"
}

# ==================================================
# Build Frontend
# ==================================================
build_frontend() {
    log "Building frontend..."

    if [ "$DRY_RUN" = true ]; then
        echo "  [DRY-RUN] Would run: npm run build"
        return 0
    fi

    cd "$DEV_FRONTEND"

    # Clear cache
    rm -rf node_modules/.cache 2>/dev/null || true

    # Build
    NODE_OPTIONS='--max-old-space-size=768' npm run build 2>&1 | tail -5

    # Verify
    if [ ! -f "build/index.html" ]; then
        error "Frontend build failed!"
        exit 1
    fi

    success "Frontend built"
}

# ==================================================
# Deploy Frontend
# ==================================================
deploy_frontend() {
    log "Deploying frontend..."

    if [ "$DRY_RUN" = true ]; then
        echo "  [DRY-RUN] Would copy: dev-frontend/build -> production-frontend/build"
        return 0
    fi

    rm -rf "$PROD_FRONTEND/build"
    cp -r "$DEV_FRONTEND/build" "$PROD_FRONTEND/"

    success "Frontend deployed"
}

# ==================================================
# Restart Server
# ==================================================
restart_server() {
    log "Restarting server..."

    if [ "$DRY_RUN" = true ]; then
        echo "  [DRY-RUN] Would run: pm2 restart production-backend"
        return 0
    fi

    # Check if process exists
    if pm2 describe production-backend > /dev/null 2>&1; then
        pm2 restart production-backend --update-env 2>/dev/null
    else
        cd "$PROD_BACKEND"
        pm2 start server.js --name production-backend 2>/dev/null
    fi

    pm2 save 2>/dev/null

    success "Server restarted"
}

# ==================================================
# Reload Nginx
# ==================================================
reload_nginx() {
    log "Reloading nginx..."

    if [ "$DRY_RUN" = true ]; then
        echo "  [DRY-RUN] Would run: sudo systemctl reload nginx"
        return 0
    fi

    # Clear cache
    sudo rm -rf /var/cache/nginx/* 2>/dev/null || true

    # Reload
    if sudo systemctl reload nginx 2>/dev/null; then
        success "Nginx reloaded"
    else
        warn "Nginx reload failed (non-critical)"
    fi
}

# ==================================================
# Verify Deployment
# ==================================================
verify_deployment() {
    log "Verifying deployment..."

    if [ "$DRY_RUN" = true ]; then
        echo "  [DRY-RUN] Would check: localhost:3002/api/health"
        return 0
    fi

    sleep 2

    # Health check
    if curl -s --max-time 5 http://localhost:3002/api/health | grep -q '"status":"ok"'; then
        success "Health check passed"
    else
        error "Health check failed!"
        warn "Consider rollback: ./rollback-production.sh $TIMESTAMP"
        exit 1
    fi
}

# ==================================================
# Update Deployment Record
# ==================================================
update_record() {
    if [ "$DRY_RUN" = true ]; then
        return 0
    fi

    cd "$PROJECT_DIR"
    git rev-parse HEAD > .last-deployed-commit
}

# ==================================================
# Main
# ==================================================
main() {
    echo ""
    echo -e "${GREEN}=========================================${NC}"
    echo -e "${GREEN}  Production Deployment v3.0${NC}"
    echo -e "${GREEN}=========================================${NC}"
    echo ""

    if [ "$DRY_RUN" = true ]; then
        warn "DRY-RUN MODE - No changes will be made"
        echo ""
    fi

    START_TIME=$(date +%s)

    preflight_check
    show_changes

    if [ "$AUTO_MODE" = false ] && [ "$DRY_RUN" = false ]; then
        if ! confirm "Continue with deployment?"; then
            echo "Deployment cancelled."
            exit 0
        fi
    fi

    echo ""

    create_backup
    sync_backend
    install_deps
    sync_database
    build_frontend
    deploy_frontend
    restart_server
    reload_nginx
    verify_deployment
    update_record

    END_TIME=$(date +%s)
    ELAPSED=$((END_TIME - START_TIME))

    echo ""
    echo -e "${GREEN}=========================================${NC}"
    echo -e "${GREEN}  Deployment Complete! (${ELAPSED}s)${NC}"
    echo -e "${GREEN}=========================================${NC}"
    echo ""
    echo "  Timestamp: $TIMESTAMP"
    echo "  Rollback:  ./rollback-production.sh $TIMESTAMP"
    echo ""
    echo "  Verify:"
    echo "    https://purplehere.com"
    echo "    https://purplehere.com/restaurant/8/pos"
    echo ""
}

main
