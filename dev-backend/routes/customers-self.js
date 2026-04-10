// Customer self-service 라우트 (본인만 접근)
// 마운트: /api/customers
// 보안: authenticateAdminOrCustomerSelf (POS 관리자 또는 본인)
//        authenticateCustomer + requireCustomerSelf (본인 전용)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Customer, RestaurantCustomer, Order } = require('../models');
const { authenticateCustomer, requireCustomerSelf, authenticateAdminOrCustomerSelf } = require('../middleware/customerAuth');

/**
 * GET /api/customers/stats/:customerId
 * 고객 통계 조회
 */
router.get('/stats/:customerId', authenticateAdminOrCustomerSelf, async (req, res) => {
  try {
    const { customerId } = req.params;
    const { restaurant_id } = req.query;

    if (!restaurant_id) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant ID is required'
      });
    }

    const relation = await RestaurantCustomer.findOne({
      where: {
        customer_id: customerId,
        restaurant_id: restaurant_id
      }
    });

    if (!relation) {
      return res.json({
        success: true,
        data: {
          total_orders: 0,
          total_spent: '0',
          points: 0,
          loyalty_tier: 'Bronze'
        }
      });
    }

    res.json({
      success: true,
      data: {
        total_orders: relation.total_orders,
        total_spent: relation.total_spent,
        points: relation.points,
        loyalty_tier: relation.loyalty_tier
      }
    });
  } catch (error) {
    console.error('Get customer stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get customer stats'
    });
  }
});

/**
 * GET /api/customers/:customerId/orders
 * 특정 고객의 주문 내역 조회
 * IMPORTANT: 이 라우트는 /:restaurantId 보다 먼저 정의되어야 함 (mount 순서로 보장)
 */
router.get('/:customerId/orders', authenticateAdminOrCustomerSelf, async (req, res) => {
  try {
    const { customerId } = req.params;
    const { restaurant_id, limit = 50 } = req.query;

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const whereClause = { customer_id: customerId };
    if (restaurant_id) {
      whereClause.restaurant_id = restaurant_id;
    }

    const orders = await Order.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit)
    });

    const formattedOrders = orders.map(order => ({
      id: order.id,
      order_number: order.order_number,
      pickup_number: order.order_number ? order.order_number.split('-').pop() : null,
      status: order.status,
      payment_status: order.payment_status,
      order_type: order.order_type,
      total_amount: parseFloat(order.total_amount),
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      table_number: order.table_number,
      order_items: order.order_items,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }));

    res.json({
      success: true,
      data: formattedOrders
    });
  } catch (error) {
    console.error('Get customer orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get customer orders'
    });
  }
});

/**
 * PUT /api/customers/:customerId
 * 고객 정보 업데이트 (본인 또는 POS 관리자)
 */
router.put('/:customerId', authenticateAdminOrCustomerSelf, async (req, res) => {
  try {
    const { customerId } = req.params;
    const { name, email } = req.body;

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    await customer.update({ name, email });

    res.json({
      success: true,
      data: {
        id: customer.id,
        phone: customer.phone,
        name: customer.name,
        email: customer.email,
        type: customer.type
      }
    });
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update customer'
    });
  }
});

/**
 * PUT /api/customers/:customerId/password
 * 비밀번호 변경 (로그인 상태에서)
 */
router.put('/:customerId/password', authenticateCustomer, requireCustomerSelf('customerId'), async (req, res) => {
  try {
    const { customerId } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      });
    }

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    if (customer.type !== 'member' || !customer.password_hash) {
      return res.status(400).json({
        success: false,
        message: 'Password change is only available for members'
      });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, customer.password_hash);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await customer.update({ password_hash: newPasswordHash });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
});

module.exports = router;
