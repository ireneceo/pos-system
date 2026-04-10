/**
 * 쿼리 래퍼 유틸리티
 * DB 쿼리 실행 시 자동 재시도 및 에러 핸들링 제공
 */

const { sequelize, Sequelize, checkConnection } = require('../config/database');

/**
 * 쿼리 실행 래퍼 함수
 * @param {Function} queryFn - 실행할 쿼리 함수 (async)
 * @param {Object} options - 옵션
 * @param {number} options.maxRetries - 최대 재시도 횟수 (기본: 3)
 * @param {number} options.retryDelay - 재시도 지연 시간(ms) (기본: 1000)
 * @param {boolean} options.useTransaction - 트랜잭션 사용 여부 (기본: false)
 * @returns {Promise} 쿼리 실행 결과
 */
const executeQuery = async (queryFn, options = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    useTransaction = false,
    transaction = null
  } = options;

  let lastError = null;
  let currentTransaction = transaction;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // 연결 상태 확인
      if (attempt > 0) {
        const isConnected = await checkConnection();
        if (!isConnected) {
          console.warn(`⚠️ DB 연결 끊김. 재연결 대기 중... (시도 ${attempt}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
          continue;
        }
      }

      // 트랜잭션 시작 (필요한 경우)
      if (useTransaction && !currentTransaction) {
        currentTransaction = await sequelize.transaction({
          isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
        });
      }

      // 쿼리 실행
      const result = await queryFn(currentTransaction);

      // 트랜잭션 커밋 (새로 시작한 경우)
      if (useTransaction && !transaction && currentTransaction) {
        await currentTransaction.commit();
      }

      return result;

    } catch (error) {
      lastError = error;

      // 트랜잭션 롤백 (새로 시작한 경우)
      if (useTransaction && !transaction && currentTransaction) {
        try {
          await currentTransaction.rollback();
        } catch (rollbackError) {
          console.error('✗ 트랜잭션 롤백 실패:', rollbackError.message);
        }
        currentTransaction = null;
      }

      // 재시도 가능한 에러인지 확인
      const isRetryable = isRetryableError(error);

      if (!isRetryable || attempt >= maxRetries) {
        // 재시도 불가능하거나 최대 재시도 횟수 초과
        throw error;
      }

      // 지수 백오프로 재시도
      const delay = retryDelay * Math.pow(2, attempt);
      console.warn(`⚠️ 쿼리 실행 실패. ${delay}ms 후 재시도... (시도 ${attempt + 1}/${maxRetries})`);
      console.warn(`   에러: ${error.message}`);

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  // 모든 재시도 실패
  throw lastError || new Error('Query execution failed after all retries');
};

/**
 * 재시도 가능한 에러인지 확인
 * @param {Error} error - 에러 객체
 * @returns {boolean} 재시도 가능 여부
 */
const isRetryableError = (error) => {
  if (!error) return false;

  const errorMessage = error.message || '';
  const errorCode = error.code || '';
  const errorName = error.name || '';

  // 재시도 가능한 에러 패턴
  const retryablePatterns = [
    /ETIMEDOUT/,
    /EHOSTUNREACH/,
    /ECONNRESET/,
    /ECONNREFUSED/,
    /ESOCKETTIMEDOUT/,
    /EPIPE/,
    /EAI_AGAIN/,
    /Connection lost/,
    /Lost connection to MySQL server/,
    /MySQL server has gone away/,
    /ER_LOCK_WAIT_TIMEOUT/,
    /ER_LOCK_DEADLOCK/,
    /SequelizeConnectionError/,
    /SequelizeConnectionRefusedError/,
    /SequelizeHostNotFoundError/,
    /SequelizeHostNotReachableError/,
    /SequelizeInvalidConnectionError/,
    /SequelizeConnectionTimedOutError/,
    /timeout/i,
    /connection/i
  ];

  // 재시도 불가능한 에러 (논리적 에러)
  const nonRetryablePatterns = [
    /SequelizeValidationError/,
    /SequelizeUniqueConstraintError/,
    /SequelizeForeignKeyConstraintError/,
    /ER_NO_SUCH_TABLE/,
    /ER_BAD_FIELD_ERROR/,
    /ER_PARSE_ERROR/,
    /syntax error/i,
    /invalid/i
  ];

  // 재시도 불가능한 에러 체크
  for (const pattern of nonRetryablePatterns) {
    if (pattern.test(errorMessage) || pattern.test(errorCode) || pattern.test(errorName)) {
      return false;
    }
  }

  // 재시도 가능한 에러 체크
  for (const pattern of retryablePatterns) {
    if (pattern.test(errorMessage) || pattern.test(errorCode) || pattern.test(errorName)) {
      return true;
    }
  }

  // 기본적으로는 재시도하지 않음 (알 수 없는 에러)
  return false;
};

/**
 * 트랜잭션 래퍼 함수
 * @param {Function} transactionFn - 트랜잭션 내에서 실행할 함수
 * @param {Object} options - 옵션
 * @returns {Promise} 트랜잭션 실행 결과
 */
const executeTransaction = async (transactionFn, options = {}) => {
  return executeQuery(
    async (transaction) => {
      if (!transaction) {
        throw new Error('Transaction is required');
      }
      return await transactionFn(transaction);
    },
    {
      ...options,
      useTransaction: true
    }
  );
};

module.exports = {
  executeQuery,
  executeTransaction,
  isRetryableError
};

