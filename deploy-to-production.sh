#!/bin/bash

# ============================================
# 운영 서버 자동 배포 스크립트
# ============================================
# 이 스크립트는 개발 서버와 운영 서버 간 코드 동기화를 자동으로 검증합니다.
#
# 사용법:
#   ./deploy-to-production.sh
#
# 주의:
#   - 반드시 /var/www 디렉토리에서 실행하세요
#   - 배포 전 개발 서버에서 충분한 테스트를 완료하세요
# ============================================

set -e  # 에러 발생 시 즉시 중단

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 에러 핸들러
error_exit() {
    log_error "$1"
    log_error "배포를 중단합니다."
    exit 1
}

# ============================================
# Step 0: 환경 확인
# ============================================
log_info "배포 환경 확인 중..."

if [ ! -d "/var/www/dev-backend" ] || [ ! -d "/var/www/production-backend" ]; then
    error_exit "개발/운영 디렉토리를 찾을 수 없습니다."
fi

log_success "환경 확인 완료"
echo ""

# ============================================
# Step 1: 사용자 확인
# ============================================
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}운영 서버 배포를 시작합니다${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo "배포 전 체크리스트:"
echo "  1. 개발 서버에서 충분한 테스트 완료"
echo "  2. Git에 모든 변경사항 커밋 및 푸시 완료"
echo "  3. 데이터베이스 마이그레이션 스크립트 준비 완료"
echo ""
read -p "계속하시겠습니까? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    log_warning "배포를 취소했습니다."
    exit 0
fi

echo ""

# ============================================
# Step 2: 백업 생성
# ============================================
log_info "데이터베이스 백업 생성 중..."

BACKUP_DIR="/var/www/backups"
mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_production_$TIMESTAMP.sql"

# .env 파일에서 DB 정보 읽기
cd /var/www/production-backend
DB_NAME=$(grep DB_NAME .env | cut -d '=' -f2)
DB_USER=$(grep DB_USER .env | cut -d '=' -f2)
DB_PASS=$(grep DB_PASSWORD .env | cut -d '=' -f2)

if [ -z "$DB_NAME" ] || [ -z "$DB_USER" ]; then
    error_exit "데이터베이스 정보를 읽을 수 없습니다."
fi

# 백업 실행
mysqldump -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" > "$BACKUP_FILE" 2>/dev/null

if [ $? -eq 0 ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    log_success "백업 완료: $BACKUP_FILE ($BACKUP_SIZE)"
else
    error_exit "데이터베이스 백업 실패"
fi

echo ""

# ============================================
# Step 3: 코드 동기화 검증
# ============================================
log_info "개발/운영 서버 코드 동기화 검증 중..."

ERRORS=0

# 3.1 중요 백엔드 파일 비교
log_info "백엔드 Model 파일 검증 중..."

BACKEND_MODELS=(
    "Order.js"
    "Restaurant.js"
    "User.js"
)

for model in "${BACKEND_MODELS[@]}"; do
    DEV_FILE="/var/www/dev-backend/models/$model"
    PROD_FILE="/var/www/production-backend/models/$model"

    if [ ! -f "$DEV_FILE" ]; then
        log_warning "개발 서버에 $model 파일이 없습니다."
        continue
    fi

    if [ ! -f "$PROD_FILE" ]; then
        log_error "운영 서버에 $model 파일이 없습니다."
        ((ERRORS++))
        continue
    fi

    # 파일 diff 검사
    if ! diff -q "$DEV_FILE" "$PROD_FILE" > /dev/null 2>&1; then
        log_warning "$model 파일이 개발/운영 서버 간 다릅니다."

        # 중요 필드 검증 (Order.js의 경우)
        if [ "$model" = "Order.js" ]; then
            if grep -q "pager_number" "$DEV_FILE"; then
                if ! grep -q "pager_number" "$PROD_FILE"; then
                    log_error "운영 서버 Order.js에 pager_number 필드가 없습니다!"
                    ((ERRORS++))
                fi
            fi
        fi
    else
        log_success "$model 동기화 확인"
    fi
done

# 3.2 프론트엔드 빌드 파일 존재 확인
log_info "프론트엔드 빌드 확인 중..."

if [ ! -d "/var/www/dev-frontend/build" ]; then
    log_warning "개발 서버에 빌드 파일이 없습니다. 빌드를 진행합니다..."
    cd /var/www/dev-frontend
    npm run build > /dev/null 2>&1 || error_exit "프론트엔드 빌드 실패"
    log_success "개발 서버 빌드 완료"
fi

echo ""

if [ $ERRORS -gt 0 ]; then
    error_exit "코드 동기화 검증에서 $ERRORS개의 오류가 발견되었습니다."
fi

log_success "코드 동기화 검증 완료"
echo ""

# ============================================
# Step 4: 백엔드 모델 동기화
# ============================================
log_info "백엔드 모델 파일 동기화 중..."

for model in "${BACKEND_MODELS[@]}"; do
    DEV_FILE="/var/www/dev-backend/models/$model"
    PROD_FILE="/var/www/production-backend/models/$model"

    if [ -f "$DEV_FILE" ]; then
        cp "$DEV_FILE" "$PROD_FILE"
        log_success "$model 동기화 완료"
    fi
done

echo ""

# ============================================
# Step 5: 프론트엔드 배포
# ============================================
log_info "프론트엔드 배포 중..."

# 기존 빌드 삭제
rm -rf /var/www/production-frontend/build

# 새 빌드 복사
cp -r /var/www/dev-frontend/build /var/www/production-frontend/

log_success "프론트엔드 배포 완료"
echo ""

# ============================================
# Step 6: 데이터베이스 검증
# ============================================
log_info "데이터베이스 스키마 검증 중..."

cd /var/www/production-backend

# Node.js 스크립트로 DB 검증
node -e "
const { sequelize } = require('./config/database');
const { QueryTypes } = require('sequelize');

(async () => {
  try {
    // pager_number 컬럼 확인
    const columns = await sequelize.query('DESCRIBE orders', { type: QueryTypes.SELECT });
    const pagerColumn = columns.find(c => c.Field === 'pager_number');

    if (!pagerColumn) {
      console.error('ERROR: pager_number 컬럼이 없습니다.');
      console.error('MIGRATION_NEEDED: ALTER TABLE orders ADD COLUMN pager_number VARCHAR(10) NULL AFTER table_number;');
      process.exit(1);
    }

    console.log('SUCCESS: pager_number 컬럼 존재');

    // operation_settings 확인
    const settings = await sequelize.query(
      'SELECT operation_settings FROM restaurants WHERE id = 1',
      { type: QueryTypes.SELECT }
    );

    if (!settings[0].operation_settings || settings[0].operation_settings === 'null') {
      console.warn('WARNING: operation_settings가 설정되지 않았습니다.');
    } else {
      console.log('SUCCESS: operation_settings 존재');
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
  }
})();
" 2>&1

DB_CHECK_RESULT=$?

if [ $DB_CHECK_RESULT -ne 0 ]; then
    error_exit "데이터베이스 검증 실패. 마이그레이션이 필요합니다."
fi

log_success "데이터베이스 검증 완료"
echo ""

# ============================================
# Step 7: PM2 재시작
# ============================================
log_info "백엔드 서비스 재시작 중..."

pm2 restart all > /dev/null 2>&1

if [ $? -eq 0 ]; then
    log_success "PM2 재시작 완료"
else
    error_exit "PM2 재시작 실패"
fi

sleep 2
echo ""

# ============================================
# Step 8: 배포 후 검증
# ============================================
log_info "배포 검증 중..."

cd /var/www/production-backend

node -e "
const { sequelize } = require('./config/database');
const Order = require('./models/Order');

(async () => {
  try {
    console.log('✅ 1. Order Model 로드 성공');

    // 테스트 주문 생성
    const testOrder = await Order.create({
      order_number: 'DEPLOY_TEST_' + Date.now(),
      customer_name: 'Deploy Test',
      order_type: 'takeaway',
      status: 'pending',
      total_amount: 1.00,
      pager_number: '99',
      restaurant_id: 1
    });

    console.log('✅ 2. pager_number 저장 테스트 성공');

    // 조회 테스트
    const retrieved = await Order.findByPk(testOrder.id);

    if (retrieved.pager_number === '99') {
      console.log('✅ 3. pager_number 조회 테스트 성공');
    } else {
      console.error('❌ pager_number 조회 실패');
      process.exit(1);
    }

    // 테스트 데이터 정리
    await testOrder.destroy();
    console.log('✅ 4. 테스트 데이터 정리 완료');

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ 검증 실패:', error.message);
    process.exit(1);
  }
})();
" 2>&1

VERIFY_RESULT=$?

if [ $VERIFY_RESULT -ne 0 ]; then
    error_exit "배포 후 검증 실패"
fi

echo ""

# ============================================
# 배포 완료
# ============================================
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ 운영 서버 배포 완료!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "배포 정보:"
echo "  - 배포 시각: $(date '+%Y-%m-%d %H:%M:%S')"
echo "  - 백업 파일: $BACKUP_FILE"
echo ""
echo "다음 단계:"
echo "  1. 운영 POS Terminal에서 새 주문 생성"
echo "  2. Pager 번호 입력 및 저장 확인"
echo "  3. Live Orders에서 Pager 번호 표시 확인"
echo "  4. Kitchen Ticket 출력 확인"
echo ""
log_success "배포가 성공적으로 완료되었습니다!"
