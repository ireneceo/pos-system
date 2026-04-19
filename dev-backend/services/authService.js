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

  // Block login for suspended accounts (all roles except System Admin, demo and test accounts)
  if (user.role !== 'System Admin' && !user.is_demo && !user.is_test) {
    // Brand General, Foodcourt General, Restaurant Owner: check users.subscription_status
    if (['Brand General', 'Foodcourt General', 'Restaurant Owner'].includes(user.role) && user.subscription_status === 'suspended') {
      const err = new Error('Your account has been suspended due to unpaid invoices. Please contact your administrator.');
      err.code = 'ACCOUNT_SUSPENDED';
      throw err;
    }
    // Restaurant Admin, Staff: check restaurant.status
    if (['Restaurant Admin', 'Staff'].includes(user.role) && user.restaurant_id) {
      const Restaurant = require('../models/Restaurant');
      const restaurant = await Restaurant.findByPk(user.restaurant_id);
      if (restaurant && restaurant.status === 'suspended' && !restaurant.is_demo && !user.is_test) {
        const err = new Error('Your restaurant account has been suspended due to unpaid invoices. Please contact your administrator.');
        err.code = 'ACCOUNT_SUSPENDED';
        throw err;
      }
    }
  }

  // Email verification check (demo/test 계정 bypass)
  if (!user.is_demo && !user.is_test && user.email_verified === false) {
    const err = new Error('Please verify your email address before logging in. Check your inbox for the verification link.');
    err.code = 'EMAIL_NOT_VERIFIED';
    err.email = user.email;
    throw err;
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
    branch_id: user.branch_id,
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
      branch_id: user.branch_id,
      preferred_language: user.preferred_language || 'en',
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

    // 2c. MX record verification
    const { verifyMxRecord, generateVerificationToken, getVerificationUrl } = require('../utils/emailValidator');
    const mxResult = await verifyMxRecord(data.email);
    if (!mxResult.valid) {
      throw new Error(mxResult.message);
    }

    // 3. Hash password & create user
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userFields = {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      full_name: data.full_name,
      phone: data.phone || null,
      role: data.role,
      email_verified: false
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

      // Send verification email (non-blocking)
      sendVerificationEmail(user);

      // Send welcome email (non-blocking)
      sendSignupWelcomeEmail({
        user, role: 'Restaurant', entityName: data.restaurant_name,
        planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly',
        dashboardUrl: `https://purplehere.com/restaurant/${restaurant.id}/dashboard`
      });
      notifyAdminNewSignup({ user, role: 'Restaurant', entityName: data.restaurant_name, planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly' });

      return { email_verification_required: true, email: user.email };

    } else if (data.role === 'Brand General') {
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 7);

      const brand = await Brand.create({
        name: data.brand_name,
        status: 'active',
        subscription_status: 'trial',
        plan_type: plan.display_name || plan.name,
        plan_amount: planAmount,
        billing_cycle: data.billing_cycle || 'monthly',
        currency: currency,
        subscription_start: new Date(),
        trial_end_date: trialEndDate
      }, { transaction });

      userFields.brand_id = brand.id;
      const user = await User.create(userFields, { transaction });

      await brand.update({ owner_id: user.id }, { transaction });

      await transaction.commit();

      // Generate first invoice (non-blocking, after commit)
      try {
        const invoiceScheduler = require('./invoiceScheduler');
        await invoiceScheduler.createEntitySubscriptionInvoice(brand, 'brand', plan, currency, trialEndDate);
        console.log(`[Signup] Brand invoice generated for ${brand.name}`);
      } catch (e) {
        console.error('[Signup] Brand invoice generation failed:', e.message);
      }

      sendVerificationEmail(user);

      sendSignupWelcomeEmail({
        user, role: 'Brand', entityName: data.brand_name,
        planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly',
        dashboardUrl: 'https://purplehere.com/pos/brand/general/dashboard'
      });
      notifyAdminNewSignup({ user, role: 'Brand General', entityName: data.brand_name, planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly' });

      return { email_verification_required: true, email: user.email };

    } else if (data.role === 'Foodcourt General') {
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 7);

      const foodcourt = await Foodcourt.create({
        name: data.foodcourt_name,
        address: data.foodcourt_address || null,
        status: 'active',
        subscription_status: 'trial',
        plan_type: plan.display_name || plan.name,
        plan_amount: planAmount,
        billing_cycle: data.billing_cycle || 'monthly',
        currency: currency,
        subscription_start: new Date(),
        trial_end_date: trialEndDate
      }, { transaction });

      userFields.foodcourt_id = foodcourt.id;
      const user = await User.create(userFields, { transaction });

      await foodcourt.update({ owner_id: user.id }, { transaction });

      await transaction.commit();

      // Generate first invoice (non-blocking, after commit)
      try {
        const invoiceScheduler = require('./invoiceScheduler');
        await invoiceScheduler.createEntitySubscriptionInvoice(foodcourt, 'foodcourt', plan, currency, trialEndDate);
        console.log(`[Signup] Foodcourt invoice generated for ${foodcourt.name}`);
      } catch (e) {
        console.error('[Signup] Foodcourt invoice generation failed:', e.message);
      }

      sendVerificationEmail(user);

      sendSignupWelcomeEmail({
        user, role: 'Food Court', entityName: data.foodcourt_name,
        planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly',
        dashboardUrl: 'https://purplehere.com/pos/foodcourt/general/dashboard'
      });
      notifyAdminNewSignup({ user, role: 'Foodcourt General', entityName: data.foodcourt_name, planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly' });

      return { email_verification_required: true, email: user.email };

    } else if (data.role === 'Restaurant Owner') {
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 7);

      userFields.company_name = data.company_name || null;
      userFields.plan_type = plan.display_name || plan.name;
      userFields.subscription_status = 'trial';
      userFields.subscription_start = new Date();
      userFields.trial_end_date = trialEndDate;
      const user = await User.create(userFields, { transaction });

      await transaction.commit();

      // Generate first invoice (non-blocking, after commit)
      try {
        const invoiceScheduler = require('./invoiceScheduler');
        await invoiceScheduler.createEntitySubscriptionInvoice(user, 'owner', plan, currency, trialEndDate);
        console.log(`[Signup] Owner invoice generated for ${user.username}`);
      } catch (e) {
        console.error('[Signup] Owner invoice generation failed:', e.message);
      }

      sendVerificationEmail(user);

      sendSignupWelcomeEmail({
        user, role: 'Owner', entityName: data.company_name,
        planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly',
        dashboardUrl: 'https://purplehere.com/pos/owner/dashboard'
      });
      notifyAdminNewSignup({ user, role: 'Restaurant Owner', entityName: data.company_name, planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly' });

      return { email_verification_required: true, email: user.email };

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

/**
 * Notify System Admin about new signup (non-blocking)
 */
function notifyAdminNewSignup({ user, role, entityName, planName, billingCycle }) {
  try {
    const { sendPlatformEmail } = require('../utils/emailService');
    const { emailLayout } = require('../utils/emailTemplates');
    const User = require('../models/User');

    // Find System Admin emails
    User.findAll({ where: { role: 'System Admin' }, attributes: ['email'] }).then(admins => {
      if (!admins.length) return;

      const adminEmails = admins.map(a => a.email).join(', ');
      const row = (label, value) => `<tr><td style="padding:10px 16px;font-size:14px;color:#6B7280;border-bottom:1px solid #E5E7EB;width:35%;">${label}</td><td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #E5E7EB;">${value}</td></tr>`;
      const trialEnds = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();

      const bodyContent = `
    <h2 style="color:#0A2540;font-size:20px;font-weight:600;margin:0 0 16px;">New Signup</h2>
    <p style="color:#6B7280;font-size:14px;margin:0 0 20px;">A new user has registered:</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden;margin:0 0 16px;">
      ${row('Name', user.full_name)}
      ${row('Email', user.email)}
      ${row('Role', role)}
      ${entityName ? row('Entity', entityName) : ''}
      ${row('Plan', `${planName} (${billingCycle})`)}
      ${row('Trial Ends', trialEnds)}
    </table>`;

      const html = emailLayout(bodyContent);

      sendPlatformEmail({
        to: adminEmails,
        subject: `[PurpleHere] New Signup: ${user.full_name} (${role})`,
        html,
        text: `New signup: ${user.full_name} (${user.email}) as ${role}. Plan: ${planName} (${billingCycle}).`
      }).catch(err => {
        console.error('[Signup] Admin notification email failed:', err.message);
      });
    }).catch(err => {
      console.error('[Signup] Failed to find admins:', err.message);
    });
  } catch (err) {
    console.error('[Signup] Admin notification setup failed:', err.message);
  }
}

/**
 * 회원가입 후 이메일 인증 토큰 생성 + 인증 이메일 발송 (non-blocking)
 */
async function sendVerificationEmail(user) {
  try {
    const { generateVerificationToken, getVerificationUrl } = require('../utils/emailValidator');
    const { emailVerificationEmail } = require('../utils/notificationTemplates');
    const { sendPlatformEmail } = require('../utils/emailService');

    const { rawToken, hashedToken, expires } = await generateVerificationToken();
    await user.update({
      email_verification_token: hashedToken,
      email_verification_expires: expires
    });

    const verificationUrl = getVerificationUrl(rawToken, user.email);
    const emailContent = emailVerificationEmail(user.full_name || user.username, verificationUrl);

    await sendPlatformEmail({
      to: user.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    });
    console.log(`[Signup] Verification email sent to ${user.email}`);
  } catch (err) {
    console.error('[Signup] Verification email failed:', err.message);
  }
}

module.exports = { login, register, signup };