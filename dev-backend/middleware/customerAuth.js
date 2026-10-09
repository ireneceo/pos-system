const { Customer } = require('../models');
const { verifyCustomerToken } = require('../utils/customerJwt');

/**
 * 모바일 고객 JWT 인증 미들웨어
 *
 * Authorization: Bearer <customer_token>
 * 검증 성공 시 req.customer = { id, phone, email } 설정
 */
async function authenticateCustomer(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Customer access token required'
      });
    }

    let decoded;
    try {
      decoded = verifyCustomerToken(token);
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: 'Invalid customer token'
      });
    }

    // DB에서 고객 존재 여부 확인 (탈퇴된 계정 차단)
    const customer = await Customer.findByPk(decoded.customerId);
    if (!customer) {
      return res.status(401).json({
        success: false,
        message: 'Customer not found'
      });
    }

    req.customer = {
      id: customer.id,
      phone: customer.phone,
      email: customer.email,
      name: customer.name,
      type: customer.type
    };

    next();
  } catch (error) {
    console.error('[CUSTOMER AUTH] error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
}

/**
 * URL 파라미터의 customerId가 토큰의 customer.id와 일치하는지 검증
 * IDOR 방어용
 */
function requireCustomerSelf(paramName = 'customerId') {
  return (req, res, next) => {
    if (!req.customer) {
      return res.status(401).json({
        success: false,
        message: 'Customer authentication required'
      });
    }
    const targetId = parseInt(req.params[paramName]);
    if (parseInt(req.customer.id) !== targetId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: not your account'
      });
    }
    next();
  };
}

/**
 * Admin OR Customer self
 * customers.js에서 PUT /:customerId 같은 라우트를 위한 dual auth
 */
async function authenticateAdminOrCustomerSelf(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  // 먼저 customer token으로 시도
  try {
    const decoded = verifyCustomerToken(token);
    if (decoded.type === 'customer') {
      const customer = await Customer.findByPk(decoded.customerId);
      if (customer) {
        const targetId = parseInt(req.params.customerId);
        if (parseInt(customer.id) !== targetId) {
          return res.status(403).json({ success: false, message: 'Access denied' });
        }
        req.customer = {
          id: customer.id, phone: customer.phone, email: customer.email,
          name: customer.name, type: customer.type
        };
        return next();
      }
    }
  } catch (e) {
    // customer token 아님 → admin token으로 fallback
  }

  // Admin token 시도
  // 2026-10-09 사전점검 S9: 관리자 토큰이면 «아무 역할»이 아니라 그 손님이 등록된 매장 중
  //   하나를 관할해야 한다(전엔 아무 매장 직원이 다른 매장 손님의 정보·주문·이메일을 다뤘다).
  const { authenticateToken } = require('./auth');
  return authenticateToken(req, res, async () => {
    try {
      if (await adminCanAccessCustomer(req.user, req.params.customerId)) return next();
      return res.status(403).json({ success: false, message: 'Access denied' });
    } catch (e) {
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
}

/**
 * 관리자(POS 쪽 계정)가 이 손님을 다뤄도 되는가 — System Admin 이거나, 손님이 등록된 매장
 * (restaurant_customers) 가운데 하나라도 관할(userCanAccessRestaurant)하면 true.
 */
async function adminCanAccessCustomer(user, customerId) {
  if (!user) return false;
  if (user.role === 'System Admin') return true;
  const { RestaurantCustomer } = require('../models');
  const { userCanAccessRestaurant } = require('./auth');
  const links = await RestaurantCustomer.findAll({ where: { customer_id: parseInt(customerId) }, attributes: ['restaurant_id'] });
  for (const l of links) {
    if (await userCanAccessRestaurant(user, l.restaurant_id)) return true;
  }
  return false;
}

module.exports = {
  adminCanAccessCustomer,
  authenticateCustomer,
  requireCustomerSelf,
  authenticateAdminOrCustomerSelf
};
