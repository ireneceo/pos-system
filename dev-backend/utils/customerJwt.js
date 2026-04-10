const jwt = require('jsonwebtoken');

/**
 * 모바일 고객 전용 JWT 시스템
 *
 * Admin JWT와 분리: payload에 type='customer' 마커 포함
 * → Admin 토큰을 customer 엔드포인트에 사용 불가
 * → Customer 토큰을 admin 엔드포인트에 사용 불가
 */

const CUSTOMER_TOKEN_EXPIRES_IN = process.env.CUSTOMER_JWT_EXPIRES_IN || '30d';

function signCustomerToken(customer) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return jwt.sign(
    {
      type: 'customer',
      customerId: customer.id,
      phone: customer.phone,
      email: customer.email || null
    },
    process.env.JWT_SECRET,
    { expiresIn: CUSTOMER_TOKEN_EXPIRES_IN }
  );
}

function verifyCustomerToken(token) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.type !== 'customer') {
    throw new Error('Not a customer token');
  }
  return decoded;
}

module.exports = {
  signCustomerToken,
  verifyCustomerToken
};
