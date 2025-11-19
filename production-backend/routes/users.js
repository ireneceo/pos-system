const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get all users
router.get('/', async (req, res) => {
  console.log('🔄 GET /api/users - Request received');
  console.log('📝 Query params:', req.query);

  try {
    const { sequelize } = require('../config/database');

    // Handle manager role filter - 'Manager' maps to 4 specific roles
    let roleFilter = '';
    let replacements = [];

    if (req.query.role) {
      if (req.query.role === 'Manager') {
        // Map 'Manager' to all 4 manager roles
        roleFilter = 'WHERE u.role IN (?, ?, ?, ?)';
        replacements = ['Foodcourt General', 'Foodcourt Manager', 'Brand General', 'Brand Manager'];
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

// Get single user
router.get('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
  console.log('🔄 POST /api/users - Request received');
  console.log('📝 Request body:', req.body);

  try {
    const { username, email, password, role, full_name, first_name, last_name, phone, permissions, restaurant_id, department, company_name, manager_id, monthly_salary } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Password is required'
      });
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

    const hashedPassword = await bcrypt.hash(password, 10);

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
      restaurant_id: restaurant_id || null,
      department: department || null,
      company_name: company_name || null,
      manager_id: manager_id || null
    });

    console.log('✅ User created successfully:', user.id, user.username);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json({ success: true, data: userWithoutPassword });
  } catch (error) {
    console.error('❌ Error creating user:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
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

    console.log('📝 Update data:', updateData);

    await user.update(updateData);

    console.log('✅ User updated successfully');

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json({ success: true, data: userWithoutPassword });
  } catch (error) {
    console.error('❌ Error updating user:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    await user.destroy();
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user password
router.patch('/:id/password', async (req, res) => {
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

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Admin password reset endpoint (no current password verification required)
router.post('/:id/reset-password', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Reset to default password: 1234
    const defaultPassword = '1234';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({
      success: true,
      message: 'Password reset successfully',
      defaultPassword: defaultPassword
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;