const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { authenticateToken, demoProtection } = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');

// Get all users
router.get('/', authenticateToken, async (req, res) => {
  console.log('🔄 GET /api/users - Request received');
  console.log('📝 Query params:', req.query);

  try {
    const { sequelize } = require('../config/database');

    // Handle manager role filter - 'Manager' maps to 4 specific roles
    let roleFilter = '';
    let replacements = [];

    if (req.query.role) {
      if (req.query.role === 'Manager') {
        // Map 'Manager' to all manager-level roles (including Restaurant Owner)
        roleFilter = 'WHERE u.role IN (?, ?, ?, ?, ?)';
        replacements = ['Foodcourt General', 'Foodcourt Manager', 'Brand General', 'Brand Manager', 'Restaurant Owner'];
      } else {
        // Use specific role
        roleFilter = 'WHERE u.role = ?';
        replacements = [req.query.role];
      }
    }

    const users = await sequelize.query(`
      SELECT u.*, r.name as restaurant_name
      FROM users u
      LEFT JOIN restaurants r ON u.restaurant_id = r.id
      ${roleFilter}
      ORDER BY u.full_name
    `, {
      replacements,
      type: sequelize.QueryTypes.SELECT
    });

    // Remove password from results
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    console.log(`✅ Found ${usersWithoutPassword.length} users with role: ${req.query.role || 'all'}`);
    res.json({ success: true, data: usersWithoutPassword });
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get available admin candidates (users not assigned to any restaurant)
router.get('/available-admins', authenticateToken, async (req, res) => {
  try {
    const { q } = req.query;
    const { sequelize } = require('../config/database');

    let searchFilter = '';
    let replacements = [];

    if (q && q.trim()) {
      searchFilter = 'AND (u.full_name LIKE ? OR u.email LIKE ? OR u.username LIKE ?)';
      const searchTerm = `%${q.trim()}%`;
      replacements = [searchTerm, searchTerm, searchTerm];
    }

    const users = await sequelize.query(`
      SELECT u.id, u.username, u.email, u.role, u.full_name, u.phone
      FROM users u
      WHERE u.restaurant_id IS NULL
        AND u.role IN ('Restaurant Admin', 'Staff')
        ${searchFilter}
      ORDER BY u.full_name
      LIMIT 20
    `, {
      replacements,
      type: sequelize.QueryTypes.SELECT
    });

    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching available admins:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single user
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create user (admin only)
router.post('/', authenticateToken, async (req, res) => {
  console.log('🔄 POST /api/users - Request received');
  console.log('📝 Request body:', req.body);

  try {
    const { username, email, password, role, full_name, first_name, last_name, phone, permissions, restaurantId, restaurant_id, department, company_name, manager_id, monthly_salary, pin_code } = req.body;
    // Support both camelCase (new) and snake_case (legacy) for restaurant ID
    const finalRestaurantId = restaurantId || restaurant_id;

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    // Auto-generate strong password if not provided
    let generatedPassword = null;
    let finalPassword = password;
    if (!password) {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
      generatedPassword = '';
      // Ensure at least one of each required type
      generatedPassword += 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 24)];
      generatedPassword += 'abcdefghjkmnpqrstuvwxyz'[Math.floor(Math.random() * 23)];
      generatedPassword += '23456789'[Math.floor(Math.random() * 8)];
      generatedPassword += '!@#$%'[Math.floor(Math.random() * 5)];
      for (let i = 0; i < 8; i++) {
        generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      // Shuffle the password
      generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');
      finalPassword = generatedPassword;
    }

    if (!username) {
      return res.status(400).json({
        success: false,
        error: 'Username is required'
      });
    }

    console.log('📝 Parsed username:', username);
    console.log('📝 Parsed email:', email);

    // Check if user already exists (by email or username)
    const existingUser = await User.findOne({
      where: {
        [require('sequelize').Op.or]: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      // Build descriptive error message
      let errorDetail = '';
      if (existingUser.email === email && existingUser.username === username) {
        errorDetail = `Both email "${email}" and username "${username}" are already in use`;
      } else if (existingUser.email === email) {
        errorDetail = `Email "${email}" is already in use`;
      } else {
        errorDetail = `Username "${username}" is already in use`;
      }

      // Add context about existing user
      const userContext = existingUser.restaurant_id
        ? `by a ${existingUser.role} at restaurant ID ${existingUser.restaurant_id}`
        : `by a ${existingUser.role} (system user)`;

      return res.status(400).json({
        success: false,
        error: `${errorDetail} ${userContext}. Please use a different email or username.`
      });
    }

    // PIN duplicate check within same restaurant
    if (pin_code && finalRestaurantId) {
      const pinExists = await User.findOne({
        where: { restaurant_id: finalRestaurantId, pin_code }
      });
      if (pinExists) {
        return res.status(400).json({
          success: false,
          error: `PIN ${pin_code} is already used by another staff member in this restaurant`
        });
      }
    }

    const hashedPassword = await bcrypt.hash(finalPassword, 10);

    // Generate full_name from first_name and last_name if not provided
    const generatedFullName = full_name ||
      (first_name && last_name ? `${first_name} ${last_name}` :
       first_name || last_name || null);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'Staff',
      full_name: generatedFullName,
      phone: phone || null,
      permissions: permissions || null,
      restaurant_id: finalRestaurantId || null,
      department: department || null,
      company_name: company_name || null,
      manager_id: manager_id || null,
      pin_code: pin_code || null
    });

    console.log('✅ User created successfully:', user.id, user.username);

    logActivity(req, {
      action_type: 'create',
      entity_type: 'staff',
      entity_id: user.id,
      entity_name: user.full_name || user.username,
      description: `Created ${role || 'Staff'} "${user.full_name || user.username}" (${email})`,
      restaurant_id: finalRestaurantId
    });

    // Return user without password (include generated password if auto-generated)
    const { password: _, ...userWithoutPassword } = user.toJSON();
    const response = { success: true, data: userWithoutPassword };
    if (generatedPassword) {
      response.generatedPassword = generatedPassword;
    }
    res.status(201).json(response);
  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update user
router.put('/:id', authenticateToken, demoProtection, async (req, res) => {
  console.log('🔄 PUT /api/users/:id - Request received');
  console.log('📝 User ID:', req.params.id);
  console.log('📝 Request body:', req.body);

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      console.log('❌ User not found:', req.params.id);
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    console.log('✅ User found:', user.username, user.email);

    const { password, first_name, last_name, ...updateData } = req.body;

    // If password is being updated, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Generate full_name from first_name and last_name if provided
    if (first_name || last_name) {
      updateData.full_name = (first_name && last_name) ?
        `${first_name} ${last_name}` :
        (first_name || last_name);
    }

    const { Op } = require('sequelize');

    // Email duplicate check (only if email is being changed)
    if (updateData.email && updateData.email !== user.email) {
      const emailExists = await User.findOne({
        where: {
          email: updateData.email,
          id: { [Op.ne]: user.id }
        }
      });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          error: `Email "${updateData.email}" is already used by another user`
        });
      }
    }

    // PIN duplicate check within same restaurant (only if pin_code is being changed)
    if (updateData.pin_code && user.restaurant_id) {
      const pinExists = await User.findOne({
        where: {
          restaurant_id: user.restaurant_id,
          pin_code: updateData.pin_code,
          id: { [Op.ne]: user.id }
        }
      });
      if (pinExists) {
        return res.status(400).json({
          success: false,
          error: `PIN ${updateData.pin_code} is already used by another staff member`
        });
      }
    }

    await user.update(updateData);

    logActivity(req, {
      action_type: 'update',
      entity_type: 'staff',
      entity_id: user.id,
      entity_name: user.full_name || user.username,
      description: `Updated ${user.role} "${user.full_name || user.username}"`,
      restaurant_id: user.restaurant_id
    });

    console.log('✅ User updated successfully');

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json({ success: true, data: userWithoutPassword });
  } catch (error) {
    console.error('❌ Error updating user:', error);
    // Duplicate entry 에러를 사용자 친화적 메시지로 변환
    if (error.original && error.original.code === 'ER_DUP_ENTRY') {
      const match = error.original.message.match(/Duplicate entry '(.+?)' for key '(.+?)'/);
      if (match) {
        return res.status(400).json({ success: false, error: `"${match[1]}" is already in use by another user` });
      }
    }
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete user (with cascade cleanup)
router.delete('/:id', authenticateToken, async (req, res) => {
  const { sequelize } = require('../config/database');
  const RestaurantManager = require('../models/RestaurantManager');
  const Restaurant = require('../models/Restaurant');
  const Brand = require('../models/Brand');
  const Foodcourt = require('../models/Foodcourt');
  const OperationTicket = require('../models/OperationTicket');
  const Comment = require('../models/Comment');
  const Notice = require('../models/Notice');
  const NoticeRecipient = require('../models/NoticeRecipient');
  const EntityPlan = require('../models/EntityPlan');
  const RestaurantIngredientCost = require('../models/RestaurantIngredientCost');

  const t = await sequelize.transaction();

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      await t.rollback();
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const uid = user.id;

    // 1. Remove junction table records
    await RestaurantManager.destroy({ where: { manager_id: uid }, transaction: t });
    await NoticeRecipient.destroy({ where: { user_id: uid }, transaction: t });

    // 2. Unlink restaurants admin_id
    await Restaurant.update({ admin_id: null, admin_name: null }, { where: { admin_id: uid }, transaction: t });

    // 3. Unlink brand/foodcourt ownership
    await Brand.update({ owner_id: null }, { where: { owner_id: uid }, transaction: t });
    await Foodcourt.update({ owner_id: null }, { where: { owner_id: uid }, transaction: t });

    // 4. Unlink operation tickets
    await OperationTicket.update({ managerId: null }, { where: { managerId: uid }, transaction: t });
    await OperationTicket.update({ requesterId: null }, { where: { requesterId: uid }, transaction: t });

    // 5. Unlink comments and notices (set NULL for read_by)
    await Comment.update({ author_id: null }, { where: { author_id: uid }, transaction: t });
    await Notice.update({ author_id: null }, { where: { author_id: uid }, transaction: t });
    await NoticeRecipient.update({ read_by: null }, { where: { read_by: uid }, transaction: t });

    // 6. Unlink entity plans and ingredient costs
    await EntityPlan.update({ created_by: null }, { where: { created_by: uid }, transaction: t });
    await RestaurantIngredientCost.update({ updated_by: null }, { where: { updated_by: uid }, transaction: t });

    // 7. Delete the user
    const userName = user.full_name || user.username;
    const userRole = user.role;
    const userRestaurantId = user.restaurant_id;
    await user.destroy({ transaction: t });

    await t.commit();

    logActivity(req, {
      action_type: 'delete',
      entity_type: 'staff',
      entity_id: uid,
      entity_name: userName,
      description: `Deleted ${userRole} "${userName}"`,
      restaurant_id: userRestaurantId
    });

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    await t.rollback();
    console.error('[Users] Error deleting user:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user password
router.patch('/:id/password', authenticateToken, demoProtection, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ success: false, error: 'Current password is incorrect' });
    }

    // Validate new password strength
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ success: false, error: 'Password must be at least 8 characters long' });
    }
    if (!/[a-z]/.test(newPassword)) {
      return res.status(400).json({ success: false, error: 'Password must contain at least one lowercase letter' });
    }
    if (!/[A-Z]/.test(newPassword)) {
      return res.status(400).json({ success: false, error: 'Password must contain at least one uppercase letter' });
    }
    if (!/[0-9]/.test(newPassword)) {
      return res.status(400).json({ success: false, error: 'Password must contain at least one number' });
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// What and Why: 패스워드 리셋 - System Admin 또는 Restaurant Admin(자기 스태프만)
// - 강력한 임시 비밀번호 생성 (12자, 대소문자+숫자+특수문자)
// - 응답에 임시 비밀번호 포함하여 관리자가 사용자에게 전달
router.post('/:id/reset-password', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // 권한 체크: System Admin은 모두 가능, Restaurant Admin은 자기 레스토랑 스태프만
    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Restaurant Admin') {
      if (!req.user.restaurant_id || user.restaurant_id?.toString() !== req.user.restaurant_id.toString()) {
        return res.status(403).json({ success: false, error: 'You can only reset passwords for your own restaurant staff' });
      }
      if (user.role !== 'Staff' && user.id !== req.user.id) {
        return res.status(403).json({ success: false, error: 'You can only reset passwords for Staff members' });
      }
    } else {
      return res.status(403).json({ success: false, error: 'Not authorized to reset passwords' });
    }

    // 강력한 임시 비밀번호 생성 (12자)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let tempPassword = '';
    for (let i = 0; i < 12; i++) {
      tempPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({
      success: true,
      message: 'Password has been reset successfully',
      tempPassword: tempPassword
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;