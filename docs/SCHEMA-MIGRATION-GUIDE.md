# 데이터베이스 스키마 마이그레이션 가이드

개발 환경에서 테이블 구조를 변경하고, 운영 환경에 안전하게 적용하는 방법입니다.

---

## 🎯 현재 시스템 구조

```
개발 DB (purple_dev_db)     운영 DB (purple_production_db)
    ↓ 테이블 변경                ↓ 안전하게 적용
sync-database.js            sync-database.js
{ alter: true }             { alter: true }
```

---

## 📋 테이블 변경 워크플로우

### 1단계: 개발 환경에서 모델 수정

예: User 모델에 `phone_verified` 컬럼 추가

```javascript
// /var/www/dev-backend/models/User.js
const User = sequelize.define('User', {
  // ... 기존 필드들
  phone_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: '전화번호 인증 여부'
  }
});
```

### 2단계: 개발 DB에서 테스트

```bash
cd /var/www/dev-backend

# 데이터베이스 스키마 동기화
node sync-database.js

# 개발 서버 실행
npm run dev

# 브라우저에서 테스트
# https://dev.purplehere.com
```

### 3단계: Git 커밋

```bash
cd /var/www
git add dev-backend/models/User.js
git commit -m "Add phone_verified field to User model"
git push origin main
```

### 4단계: 운영 환경에 배포

```bash
cd /var/www
./deploy-production.sh
```

이 스크립트가 자동으로:
1. ✅ Git pull (최신 코드)
2. ✅ rsync (dev → production)
3. ✅ npm install
4. ✅ **node sync-database.js** ← 테이블 구조 업데이트!
5. ✅ PM2 restart

---

## 🔍 sync-database.js 동작 방식

### `alter: true` 모드 (현재 사용 중)

```javascript
await sequelize.sync({ alter: true });
```

**장점:**
- ✅ 기존 데이터 유지
- ✅ 컬럼 추가/삭제/변경 자동 처리
- ✅ 타입 변경 자동 처리

**동작:**
- 새 컬럼 추가 → 자동 추가
- 컬럼 삭제 → 자동 삭제
- 타입 변경 → ALTER TABLE 실행

**주의사항:**
- ⚠️ 복잡한 변경은 오류 발생 가능
- ⚠️ 외래키 변경시 수동 처리 필요할 수 있음

---

## ⚠️ 주의해야 할 변경

### 안전한 변경 (자동 처리됨)
✅ 새 컬럼 추가 (nullable 또는 defaultValue 있을 때)
✅ 컬럼 이름 변경 (주의: 데이터 유지 확인)
✅ 인덱스 추가/삭제
✅ 컬럼 타입 확장 (VARCHAR(50) → VARCHAR(100))

### 위험한 변경 (수동 처리 권장)
❌ 컬럼 삭제 (데이터 손실)
❌ NOT NULL 추가 (기존 데이터에 NULL 있으면 실패)
❌ 타입 축소 (VARCHAR(100) → VARCHAR(50), 데이터 잘릴 수 있음)
❌ 외래키 변경 (참조 무결성 문제)

---

## 🛠️ 수동 마이그레이션 방법

복잡한 변경이나 데이터 변환이 필요할 때 사용합니다.

### 예제: NOT NULL 컬럼 추가

#### 방법 1: defaultValue 사용 (권장)
```javascript
// models/User.js
phone: {
  type: DataTypes.STRING(20),
  allowNull: false,
  defaultValue: ''  // 기본값 설정
}
```

#### 방법 2: 마이그레이션 스크립트 작성
```javascript
// /var/www/migrations/001-add-phone-field.js
const { sequelize } = require('../config/database');

async function migrate() {
  try {
    // 1단계: nullable로 컬럼 추가
    await sequelize.query(`
      ALTER TABLE users
      ADD COLUMN phone VARCHAR(20) NULL
    `);

    // 2단계: 기존 레코드에 기본값 설정
    await sequelize.query(`
      UPDATE users
      SET phone = ''
      WHERE phone IS NULL
    `);

    // 3단계: NOT NULL로 변경
    await sequelize.query(`
      ALTER TABLE users
      MODIFY COLUMN phone VARCHAR(20) NOT NULL
    `);

    console.log('✅ Migration completed');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

migrate();
```

실행:
```bash
# 개발 환경에서 테스트
cd /var/www/dev-backend
node ../migrations/001-add-phone-field.js

# 운영 환경에서 실행
cd /var/www/production-backend
node ../migrations/001-add-phone-field.js
```

---

## 📊 배포 전 체크리스트

### 개발 환경에서
- [ ] 모델 파일 수정 완료
- [ ] `node sync-database.js` 실행 성공
- [ ] 개발 서버에서 기능 테스트 완료
- [ ] Git 커밋 완료

### 운영 배포 전
- [ ] 운영 DB 백업
  ```bash
  # .env 파일에서 DB 정보 로드
  source <(grep -E "^DB_" /var/www/production-backend/.env | sed 's/^/export /')
  mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME > backup_$(date +%Y%m%d_%H%M%S).sql
  ```
- [ ] 피크 시간대 피하기 (새벽 또는 한가한 시간)
- [ ] 배포 시간 공지 (필요시)

### 배포 중
```bash
cd /var/www
./deploy-production.sh
```

### 배포 후
- [ ] PM2 로그 확인: `pm2 logs production-backend`
- [ ] 운영 사이트 접속 테스트
- [ ] 테이블 구조 확인
  ```bash
  # .env 파일에서 DB 정보 로드
  source <(grep -E "^DB_" /var/www/production-backend/.env | sed 's/^/export /')
  mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME -e "DESCRIBE users;"
  ```

---

## 🔄 롤백 방법

### 배포 후 문제 발생시

#### 1. 코드 롤백 (Git)
```bash
cd /var/www/production-backend
git log  # 이전 커밋 ID 확인
git checkout <이전커밋ID>
pm2 restart production-backend
```

#### 2. 데이터베이스 롤백 (백업에서 복원)
```bash
# .env 파일에서 DB 정보 로드
source <(grep -E "^DB_" /var/www/production-backend/.env | sed 's/^/export /')

# 전체 복원
mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME < backup_20250110_120000.sql

# 특정 테이블만 복원
mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME -e "DROP TABLE users;"
# 참고: 테이블 복원은 /var/www/scripts/restore-database.sh 스크립트 사용 권장
```

---

## 💡 실전 예제

### 예제 1: 새 컬럼 추가
```javascript
// models/Product.js
discount_rate: {
  type: DataTypes.DECIMAL(5, 2),
  defaultValue: 0.00,
  comment: '할인율 (%)'
}
```

```bash
# 개발에서 테스트
cd /var/www/dev-backend
node sync-database.js
npm run dev

# 운영 배포
cd /var/www
./deploy-production.sh
```

### 예제 2: 테이블 관계 추가
```javascript
// models/Order.js
Order.associate = (models) => {
  Order.belongsTo(models.User, {
    foreignKey: 'customer_id',
    as: 'customer'
  });
};
```

동일한 배포 프로세스 사용.

### 예제 3: 새 테이블 생성
```javascript
// models/Customer.js (새 파일)
const Customer = sequelize.define('Customer', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING
});

module.exports = Customer;
```

```javascript
// sync-database.js에 추가
const Customer = require('./models/Customer');
const models = { User, Product, Customer /* ... */ };
```

배포하면 자동으로 테이블 생성됨.

---

## 📝 마이그레이션 로그 관리

배포할 때마다 기록하세요:

```bash
# /var/www/MIGRATION-LOG.md
## 2025-01-10 21:00 - User 테이블에 phone_verified 추가
- 변경: User 모델에 phone_verified (BOOLEAN) 추가
- 배포자: admin
- 영향: 기존 데이터 유지, 기본값 false
- 결과: 성공

## 2025-01-11 14:00 - Product 테이블에 discount_rate 추가
- 변경: Product 모델에 discount_rate (DECIMAL) 추가
- 배포자: admin
- 영향: 기존 데이터 유지, 기본값 0.00
- 결과: 성공
```

---

## 🚨 긴급 상황 대응

### 배포 중 에러 발생
1. **즉시 롤백**
   ```bash
   cd /var/www/production-backend
   git checkout HEAD~1
   pm2 restart production-backend
   ```

2. **로그 확인**
   ```bash
   pm2 logs production-backend --err --lines 100
   ```

3. **개발 환경에서 재검증**
   ```bash
   cd /var/www/dev-backend
   node sync-database.js
   ```

4. **수정 후 재배포**

---

## 📚 관련 문서

- [WORKFLOW-GUIDE.md](./WORKFLOW-GUIDE.md) - 전체 워크플로우
- [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) - 배포 가이드
- [DEPLOYMENT-SUMMARY.md](./DEPLOYMENT-SUMMARY.md) - 배포 요약

---

## ✅ 요약

1. **개발에서 모델 수정** → `node sync-database.js`
2. **개발 서버에서 테스트** → 충분히 검증
3. **Git 커밋** → 버전 관리
4. **운영 배포** → `./deploy-production.sh` (자동으로 테이블 구조 업데이트)
5. **배포 후 확인** → 로그 체크, 사이트 테스트

**핵심:** `deploy-production.sh`가 자동으로 `sync-database.js`를 실행하므로, 테이블 구조가 자동으로 동기화됩니다! 🚀
