const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const Restaurant = require('../models/Restaurant');
const PlanTemplate = require('../models/PlanTemplate');
const PlanPrice = require('../models/PlanPrice');
// EntityPlanRestaurant is used by Brand/Foodcourt plan assignment, not self-signup
const { sequelize } = require('../db');

async function login(emailOrUsername, password) {
  // Try to find user by email or username (case-insensitive)
  const { Op } = require('sequelize');
  const sequelize = require('../db').sequelize;

  const user = await User.findOne({
    where: {
      [Op.or]: [
        sequelize.where(
          sequelize.fn('LOWER', sequelize.col('email')),
          sequelize.fn('LOWER', emailOrUsername)
        ),
        sequelize.where(
          sequelize.fn('LOWER', sequelize.col('username')),
          sequelize.fn('LOWER', emailOrUsername)
        )
      ]
    }
  });

  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid email/username or password');
  }

  // JWT_SECRET 필수 검증
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
  }

  const token = jwt.sign({
    userId: user.id,
    email: user.email,
    role: user.role,
    username: user.username,
    brand_id: user.brand_id,
    foodcourt_id: user.foodcourt_id,
    restaurant_id: user.restaurant_id,
    manager_id: user.manager_id
  }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });

  // permissions 파싱 (JSON string → array)
  let permissions = [];
  if (user.permissions) {
    try {
      permissions = typeof user.permissions === 'string'
        ? JSON.parse(user.permissions)
        : user.permissions;
    } catch (e) {
      permissions = [];
    }
  }

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      restaurant_id: user.restaurant_id,
      manager_id: user.manager_id,
      brand_id: user.brand_id,
      foodcourt_id: user.foodcourt_id,
      permissions,
      is_demo: user.is_demo || false
    }
  };
}

async function register(userData) {
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await User.create({
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
    role: userData.role || 'staff'
  });
  
  return { userId: user.id, email: user.email, username: user.username };
}

/**
 * Self-signup: creates user + role-specific entity + plan assignment + trial
 */
async function signup(data) {
  const { Op } = require('sequelize');
  const transaction = await sequelize.transaction();

  try {
    // 1. Check email & username uniqueness
    const existingEmail = await User.findOne({ where: { email: data.email }, transaction });
    if (existingEmail) {
      throw new Error('This email is already registered');
    }
    const existingUsername = await User.findOne({
      where: { username: { [Op.eq]: data.username } },
      transaction
    });
    if (existingUsername) {
      throw new Error('This username is already taken');
    }

    // 2. Validate plan exists
    const plan = await PlanTemplate.findByPk(data.plan_id, { transaction });
    if (!plan || !plan.is_active) {
      throw new Error('Selected plan is not available');
    }

    // 2b. Resolve currency and plan amount
    const currency = data.currency || 'MYR';
    let planAmount = data.billing_cycle === 'annual' ? plan.base_price_annual : plan.base_price_monthly;

    // Look up currency-specific price if available
    const planPrice = await PlanPrice.findOne({
      where: { plan_id: data.plan_id, currency, is_active: true },
      transaction
    });
    if (planPrice) {
      planAmount = data.billing_cycle === 'annual' ? planPrice.annual_price : planPrice.monthly_price;
    }

    // 3. Hash password & create user
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userFields = {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      full_name: data.full_name,
      phone: data.phone || null,
      role: data.role
    };

    // 4. Role-specific entity creation
    if (data.role === 'Restaurant Admin') {
      // Create user first
      const user = await User.create(userFields, { transaction });

      // Create restaurant with trial status
      const restaurant = await Restaurant.create({
        name: data.restaurant_name,
        address: data.restaurant_address || null,
        phone: data.restaurant_phone || null,
        email: data.restaurant_email || null,
        admin_id: user.id,
        admin_name: data.full_name,
        status: 'trial',
        plan_type: plan.display_name || plan.name,
        plan_amount: planAmount,
        billing_cycle: data.billing_cycle || 'monthly',
        currency: currency,
        subscription_start: new Date(),
        subscription_snapshot: plan.toJSON(),
        order_limit: plan.order_limit || -1,
        menu_item_limit: plan.menu_item_limit || -1,
        staff_limit: plan.staff_limit || -1,
        payment_model: 'restaurant'
      }, { transaction });

      // Link user to restaurant
      await user.update({ restaurant_id: restaurant.id }, { transaction });

      await transaction.commit();

      // Start trial (after commit)
      try {
        const subscriptionScheduler = require('./subscriptionScheduler');
        await subscriptionScheduler.startTrial(restaurant.id);
      } catch (e) {
        console.error('[Signup] Trial start failed:', e.message);
      }

      // Generate JWT
      const response = generateSignupResponse(user, { restaurant_id: restaurant.id });

      // Send welcome email (non-blocking)
      sendSignupWelcomeEmail({
        user, role: 'Restaurant', entityName: data.restaurant_name,
        planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly',
        dashboardUrl: `https://purplehere.com/restaurant/${restaurant.id}/dashboard`
      });

      return response;

    } else if (data.role === 'Brand General') {
      // Create brand first, then user
      const brand = await Brand.create({
        name: data.brand_name,
        status: 'active',
        subscription_status: 'trial',
        plan_type: plan.display_name || plan.name,
        currency: currency
      }, { transaction });

      userFields.brand_id = brand.id;
      const user = await User.create(userFields, { transaction });

      // Link brand owner
      await brand.update({ owner_id: user.id }, { transaction });

      await transaction.commit();
      const response = generateSignupResponse(user, { brand_id: brand.id });

      sendSignupWelcomeEmail({
        user, role: 'Brand', entityName: data.brand_name,
        planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly',
        dashboardUrl: 'https://purplehere.com/pos/brand/general/dashboard'
      });

      return response;

    } else if (data.role === 'Foodcourt General') {
      const foodcourt = await Foodcourt.create({
        name: data.foodcourt_name,
        address: data.foodcourt_address || null,
        status: 'active',
        subscription_status: 'trial',
        plan_type: plan.display_name || plan.name,
        currency: currency
      }, { transaction });

      userFields.foodcourt_id = foodcourt.id;
      const user = await User.create(userFields, { transaction });

      // Link foodcourt owner
      await foodcourt.update({ owner_id: user.id }, { transaction });

      await transaction.commit();
      const response = generateSignupResponse(user, { foodcourt_id: foodcourt.id });

      sendSignupWelcomeEmail({
        user, role: 'Food Court', entityName: data.foodcourt_name,
        planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly',
        dashboardUrl: 'https://purplehere.com/pos/foodcourt/general/dashboard'
      });

      return response;

    } else if (data.role === 'Restaurant Owner') {
      userFields.company_name = data.company_name || null;
      userFields.plan_type = plan.display_name || plan.name;
      userFields.subscription_status = 'trial';
      userFields.subscription_start = new Date();
      const user = await User.create(userFields, { transaction });

      await transaction.commit();
      const response = generateSignupResponse(user, {});

      sendSignupWelcomeEmail({
        user, role: 'Owner', entityName: data.company_name,
        planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly',
        dashboardUrl: 'https://purplehere.com/pos/owner/dashboard'
      });

      return response;

    } else {
      throw new Error('Invalid account type');
    }
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

function generateSignupResponse(user, extras) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required');
  }

  const token = jwt.sign({
    userId: user.id,
    email: user.email,
    role: user.role,
    username: user.username,
    brand_id: user.brand_id || extras.brand_id || null,
    foodcourt_id: user.foodcourt_id || extras.foodcourt_id || null,
    restaurant_id: user.restaurant_id || extras.restaurant_id || null,
    manager_id: user.manager_id || null
  }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      restaurant_id: user.restaurant_id || extras.restaurant_id || null,
      manager_id: user.manager_id || null,
      brand_id: user.brand_id || extras.brand_id || null,
      foodcourt_id: user.foodcourt_id || extras.foodcourt_id || null,
      permissions: [],
      is_demo: false
    }
  };
}

/**
 * Send signup welcome email (non-blocking, fire-and-forget)
 */
function sendSignupWelcomeEmail({ user, role, entityName, planName, billingCycle, dashboardUrl }) {
  try {
    const { sendPlatformEmail } = require('../utils/emailService');
    const { signupWelcomeEmail } = require('../utils/emailTemplates');

    const emailData = signupWelcomeEmail({
      fullName: user.full_name,
      email: user.email,
      username: user.username,
      role,
      entityName: entityName || null,
      planName,
      billingCycle,
      trialDays: 7,
      dashboardUrl
    });

    sendPlatformEmail({
      to: user.email,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text
    }).catch(err => {
      console.error('[Signup] Welcome email failed:', err.message);
    });
  } catch (err) {
    console.error('[Signup] Welcome email setup failed:', err.message);
  }
}

module.exports = { login, register, signup };