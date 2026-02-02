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

# 1. Pre-checks
log "Checking SSH connection to production server..."
if ! ssh -o ConnectTimeout=5 $PROD_SERVER "echo 'Connected'" > /dev/null 2>&1; then
    error "Cannot connect to production server"
fi
success "SSH connection OK"

# 2. Check local dev server health
log "Checking local dev server health..."
if ! curl -s --max-time 3 http://localhost:3001/api/health | grep -q '"status":"ok"'; then
    error "Local dev server is not healthy"
fi
success "Local dev server is healthy"

# 3. Confirmation
if [ "$AUTO_MODE" = false ]; then
    echo ""
    warn "이 작업은 운영서버에 배포합니다."
    read -p "계속하시겠습니까? (y/N): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
fi

# 4. Create backup on production server
log "Creating backup on production server..."
ssh $PROD_SERVER "mkdir -p /var/www/backups/${TIMESTAMP}"
ssh $PROD_SERVER "cp -r $REMOTE_PROD_BACKEND /var/www/backups/${TIMESTAMP}/production-backend" 2>/dev/null || true
ssh $PROD_SERVER "cp -r $REMOTE_PROD_FRONTEND/build /var/www/backups/${TIMESTAMP}/production-frontend-build" 2>/dev/null || true
success "Backup created: /var/www/backups/${TIMESTAMP}"

# 5. Build frontend locally
log "Building frontend..."
cd $LOCAL_DEV_FRONTEND
npm run build:dev > /tmp/build.log 2>&1 || {
    error "Frontend build failed. Check /tmp/build.log"
}
success "Frontend built successfully"

# 6. Sync backend to production
log "Syncing backend to production server..."
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.env' \
    --exclude 'uploads' \
    --exclude '*.log' \
    $LOCAL_DEV_BACKEND/ $PROD_SERVER:$REMOTE_PROD_BACKEND/
success "Backend synced"

# 7. Sync frontend build to production
log "Syncing frontend build to production server..."
rsync -avz --delete \
    $LOCAL_DEV_FRONTEND/build/ $PROD_SERVER:$REMOTE_PROD_FRONTEND/build/
success "Frontend synced"

# 8. Install dependencies on production (if package.json changed)
log "Installing dependencies on production server..."
ssh $PROD_SERVER "cd $REMOTE_PROD_BACKEND && npm install --production --silent"
success "Dependencies installed"

# 9. Restart production backend
log "Restarting production backend..."
ssh $PROD_SERVER "pm2 restart production-backend"
success "Backend restarted"

# 10. Wait and verify
log "Waiting for server to start..."
sleep 3

log "Verifying production server health..."
if ssh $PROD_SERVER "curl -s --max-time 5 http://localhost:3002/api/health" | grep -q '"status":"ok"'; then
    success "Production server is healthy!"
else
    warn "Health check failed. Please verify manually."
fi

# 11. Reload nginx (if needed)
log "Reloading nginx..."
ssh $PROD_SERVER "sudo systemctl reload nginx"
success "Nginx reloaded"

echo ""
echo "============================================"
echo "  Deployment Complete!"
echo "  Backup: /var/www/backups/${TIMESTAMP}"
echo "  Time: $(date)"
echo "============================================"
echo ""
