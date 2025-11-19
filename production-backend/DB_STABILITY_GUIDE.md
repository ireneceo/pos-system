# 데이터베이스 연결 안정성 개선 가이드

## 개요

React + Node/Express API + MySQL + Plesk 서버 환경에서 발생하는 데이터베이스 연결 안정성 문제를 해결하기 위한 전문적인 솔루션입니다.

## 구현된 기능

### 1. Connection Pool 최적화

**파일**: `backend/config/database.js`

- **최대 연결 수**: 5 → 20 (동시 요청 처리 능력 향상)
- **최소 연결 수**: 0 → 2 (항상 연결 유지)
- **연결 타임아웃**: 1분
- **유휴 연결 타임아웃**: 10초
- **자동 재연결**: 활성화

### 2. DB 연결 상태 모니터링

**파일**: `backend/config/database.js`

- 연결 상태 추적 (`isConnected` 플래그)
- 주기적 연결 상태 확인 (5분마다)
- 연결 이벤트 리스너 등록
- Graceful shutdown 지원

### 3. DB 헬스 체크 미들웨어

**파일**: `backend/middleware/dbHealthCheck.js`

- 모든 API 요청 전 DB 연결 상태 확인
- 연결이 끊어져 있으면 자동 재연결 시도
- 5초마다 체크 (동시 요청 방지)
- 연결 실패 시 503 응답 반환

### 4. 쿼리 래퍼 유틸리티

**파일**: `backend/utils/queryWrapper.js`

- 자동 재시도 로직 (최대 3회)
- 지수 백오프 (Exponential Backoff)
- 트랜잭션 자동 관리
- 에러 타입별 재시도 가능 여부 판단

### 5. 헬스 체크 엔드포인트

**파일**: `backend/routes/health.js`

- `/api/health`: 기본 헬스 체크
- `/api/health/detailed`: 상세 헬스 체크 (쿼리 테스트 포함)

## 사용 방법

### 1. 쿼리 래퍼 사용

```javascript
const { executeQuery, executeTransaction } = require('../utils/queryWrapper');

// 단순 쿼리
const orders = await executeQuery(async () => {
  return await Order.findAll({
    where: { status: 'pending' }
  });
}, { maxRetries: 3 });

// 트랜잭션 사용
const result = await executeTransaction(async (t) => {
  const order = await Order.create(orderData, { transaction: t });
  await Payment.create(paymentData, { transaction: t });
  return order;
}, { maxRetries: 3 });
```

### 2. 헬스 체크 확인

```bash
# 기본 헬스 체크
curl https://orderhere.wor-pro.com/api/health

# 상세 헬스 체크
curl https://orderhere.wor-pro.com/api/health/detailed
```

### 3. 연결 상태 확인

```javascript
const { checkConnection, isConnected } = require('../config/database');

// 연결 상태 확인
const connected = await checkConnection();

// 연결 상태 플래그 확인
if (isConnected()) {
  console.log('DB 연결됨');
}
```

## 문제 해결

### 1. 연결이 자주 끊어지는 경우

**원인**:
- MySQL 서버의 `wait_timeout` 설정이 짧음
- 네트워크 불안정
- Connection pool 설정 부족

**해결**:
- Connection pool 최소 연결 수를 2로 설정 (이미 적용됨)
- 주기적 연결 상태 확인 활성화 (이미 적용됨)
- MySQL 서버의 `wait_timeout` 설정 확인 필요

### 2. 동시 요청이 많을 때 에러 발생

**원인**:
- Connection pool 크기가 작음
- 쿼리 실행 시간이 길어서 연결이 오래 점유됨

**해결**:
- Connection pool 최대 연결 수를 20으로 증가 (이미 적용됨)
- 쿼리 최적화 필요
- 인덱스 추가 검토

### 3. 트랜잭션 에러 발생

**원인**:
- 트랜잭션 롤백 누락
- 데드락 발생
- 타임아웃

**해결**:
- `executeTransaction` 사용 (자동 롤백)
- 재시도 로직 적용 (이미 적용됨)
- 트랜잭션 격리 수준 조정 (READ_COMMITTED 사용)

### 4. 쿼리 타임아웃

**원인**:
- 쿼리 실행 시간이 너무 김
- 네트워크 지연

**해결**:
- 쿼리 타임아웃 설정 (60초)
- 쿼리 최적화
- 인덱스 추가

## 모니터링

### 1. 로그 확인

```bash
# PM2 로그 확인
pm2 logs pos-backend

# 에러만 확인
pm2 logs pos-backend --err
```

### 2. 헬스 체크 모니터링

```bash
# 주기적 헬스 체크 (cron 등으로 설정)
*/5 * * * * curl -f https://orderhere.wor-pro.com/api/health || echo "Health check failed"
```

### 3. Connection Pool 상태 확인

헬스 체크 엔드포인트에서 다음 정보 확인:
- `pool.size`: 전체 연결 수
- `pool.using`: 사용 중인 연결 수
- `pool.waiting`: 대기 중인 연결 수

## 추가 개선 사항

### 1. 쿼리 최적화

- 인덱스 추가
- N+1 쿼리 문제 해결
- 불필요한 데이터 조회 제거

### 2. 캐싱

- Redis 캐싱 도입
- 자주 조회되는 데이터 캐싱
- 캐시 무효화 전략 수립

### 3. 로깅 강화

- Winston 등 로깅 라이브러리 도입
- 구조화된 로그 포맷
- 로그 레벨 관리

### 4. 모니터링 도구

- PM2 Monitoring
- New Relic / Datadog
- Grafana + Prometheus

## 테스트

### 1. 연결 끊김 테스트

```bash
# MySQL 연결 끊기
mysqladmin -u root -p shutdown

# 서버에서 자동 재연결 확인
pm2 logs pos-backend
```

### 2. 부하 테스트

```bash
# Apache Bench 사용
ab -n 1000 -c 10 https://orderhere.wor-pro.com/api/orders
```

### 3. 트랜잭션 테스트

- 동시 주문 생성 테스트
- 결제 처리 테스트
- 주문 상태 업데이트 테스트

## 참고 자료

- [Sequelize Connection Pool](https://sequelize.org/docs/v6/other-topics/connection-pool/)
- [MySQL Connection Management](https://dev.mysql.com/doc/refman/8.0/en/connection-management.html)
- [Node.js Best Practices - Database](https://github.com/goldbergyoni/nodebestpractices#7-database-practices)

