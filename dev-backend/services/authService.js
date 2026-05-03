const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const Restaurant = require('../models/Restaurant');
const SupplierCompany = require('../models/SupplierCompany');
const SupplierInvitation = require('../models/SupplierInvitation');
const PlanTemplate = require('../models/PlanTemplate');
const PlanPrice = require('../models/PlanPrice');
// EntityPlanRestaurant is used by Brand/Foodcourt plan assignment, not self-signup
const { sequelize } = require('../db');
const ReferralClick = require('../models/ReferralClick');

/**
 * If the new user signed up via a referral_code, link them to the referrer
 * (users.referred_by = referrer.id) and mark the matching unconverted clicks
 * as converted. Idempotent and best-effort — silently skips on invalid codes
 * so signup never fails purely because of a typo'd referral code.
 *
 * Self-referral guard: refuses to link if the code belongs to the same email
 * (paranoid check — referrer cannot be the new user since the new user didn't
 * exist before this transaction, but emails could match if a user attempts to
 * re-signup with their own code).
 */
async function applyReferralCodeToNewUser(user, referralCode, transaction) {
  if (!referralCode) return;
  const trimmed = String(referralCode).trim().toUpperCase();
  if (!trimmed) return;
  const referrer = await User.findOne({ where: { referral_code: trimmed }, transaction });
  if (!referrer) return;
  if (referrer.id === user.id) return;
  if (referrer.email && user.email && referrer.email.toLowerCase() === user.email.toLowerCase()) return;
  await user.update({ referred_by: referrer.id }, { transaction });
  try {
    await ReferralClick.update(
      { converted: true, converted_at: new Date() },
      { where: { referral_code: trimmed, converted: false }, transaction }
    );
  } catch (e) {
    console.error('[applyReferralCodeToNewUser] click conversion update failed:', e.message);
  }
  // Notify referrer that someone signed up using their code (fire-and-forget,
  // best-effort — never block signup on email failure).
  (async () => {
    try {
      const { sendNotification } = require('../utils/notificationService');
      const { referredSignupEmail } = require('../utils/notificationTemplates');
      const mail = referredSignupEmail({
        referrerName: referrer.full_name || referrer.email,
        referredBusiness: user.full_name || user.email,
        referredRole: user.role
      });
      await sendNotification(referrer.id, 'referral_commission', mail);
    } catch (e) {
      console.error('[applyReferralCodeToNewUser] referrer email error:', e.message);
    }
  })();
}

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

  // Suspended accounts are NOT blocked from logging in — they need access to
  // the invoice payment page to settle the overdue balance and restore service.
  // The frontend (ProtectedRoute) detects subscription_status / restaurantStatus
  // === 'suspended' and redirects every route except the invoice page.

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

  // Resolve supplier_company_id for supplier roles (Admin via owner_id reverse FK; Staff via direct column)
  let supplierCompanyId = user.supplier_company_id || null;
  if (!supplierCompanyId && user.role === 'Supplier Admin') {
    const SupplierCompany = require('../models/SupplierCompany');
    const sc = await SupplierCompany.findOne({ where: { owner_id: user.id }, attributes: ['id'] });
    if (sc) supplierCompanyId = sc.id;
  }

  // Resolve restaurant context for RA/Staff so the frontend can decide whether to
  // pin the user to the invoice page (suspended account UX). Demo / test
  // restaurants are excluded from that pin so QA tooling stays usable.
  let restaurantStatus = null;
  let restaurantName = null;
  let restaurantIsDemo = false;
  let restaurantIsTest = false;
  if (user.restaurant_id) {
    const r = await Restaurant.findByPk(user.restaurant_id, {
      attributes: ['status', 'name', 'is_demo', 'is_test']
    });
    if (r) {
      restaurantStatus = r.status;
      restaurantName = r.name;
      restaurantIsDemo = !!r.is_demo;
      restaurantIsTest = !!r.is_test;
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
      supplier_company_id: supplierCompanyId,
      subscription_status: user.subscription_status || null,
      restaurantStatus,
      restaurantName,
      restaurantIsDemo,
      restaurantIsTest,
      is_demo: !!user.is_demo,
      is_test: !!user.is_test,
      preferred_language: user.preferred_language || 'en',
      permissions
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

      // Referral linkage — set referred_by + mark click converted
      await applyReferralCodeToNewUser(user, data.referral_code, transaction);

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

      // Referral linkage
      await applyReferralCodeToNewUser(user, data.referral_code, transaction);

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

      // Referral linkage
      await applyReferralCodeToNewUser(user, data.referral_code, transaction);

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

      // Referral linkage — Owner role: payerUser is `user` itself
      await applyReferralCodeToNewUser(user, data.referral_code, transaction);

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

    } else if (data.role === 'Supplier Admin') {
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 7);

      const supplierCompany = await SupplierCompany.create({
        name: data.supplier_name,
        status: 'active',
        subscription_status: 'trial',
        plan_id: plan.id,
        plan_type: plan.display_name || plan.name,
        plan_amount: planAmount,
        billing_cycle: data.billing_cycle || 'monthly',
        currency: currency,
        subscription_start: new Date(),
        trial_end_date: trialEndDate
      }, { transaction });

      // Supplier Admin doesn't have brand_id/foodcourt_id; uses owner_id reverse FK on SupplierCompany
      const user = await User.create(userFields, { transaction });

      await supplierCompany.update({ owner_id: user.id }, { transaction });

      // Referral linkage
      await applyReferralCodeToNewUser(user, data.referral_code, transaction);

      // If signup via invitation, mark used
      if (data.invitation_token) {
        const invitation = await SupplierInvitation.findOne({
          where: { token: data.invitation_token, status: 'pending' },
          transaction
        });
        if (invitation && invitation.expires_at > new Date()) {
          await invitation.update({
            status: 'used',
            used_at: new Date(),
            used_by_user_id: user.id
          }, { transaction });
        }
      }

      await transaction.commit();

      // Generate first invoice (non-blocking, after commit)
      try {
        const invoiceScheduler = require('./invoiceScheduler');
        await invoiceScheduler.createEntitySubscriptionInvoice(supplierCompany, 'supplier', plan, currency, trialEndDate);
        console.log(`[Signup] Supplier invoice generated for ${supplierCompany.name}`);
      } catch (e) {
        console.error('[Signup] Supplier invoice generation failed:', e.message);
      }

      sendVerificationEmail(user);

      sendSignupWelcomeEmail({
        user, role: 'Supplier', entityName: data.supplier_name,
        planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly',
        dashboardUrl: 'https://purplehere.com/pos/supplier/dashboard'
      });
      notifyAdminNewSignup({ user, role: 'Supplier Admin', entityName: data.supplier_name, planName: plan.display_name || plan.name, billingCycle: data.billing_cycle || 'monthly' });

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
 * Returns true if the user looks like an automated test signup
 * (pattern: prefix-{timestamp}@purplehere.com / *@test.local / is_test flag).
 * These should never trigger admin emails.
 */
function isAutomatedTestSignup(user) {
  if (!user || !user.email) return false;
  if (user.is_test) return true;
  const e = user.email.toLowerCase();
  if (e.endsWith('@test.local')) return true;
  if (e.endsWith('@purplehere.com')) {
    // Pattern: prefix-{digits}@purplehere.com (auto test signups: s4r2-XXX, test-supplier-XXX, etc.)
    if (/^[a-z0-9]+-\d{10,}@purplehere\.com$/.test(e)) return true;
    // Common manual test prefixes
    if (/^(test-|verify-|flow-|final-|dup_|smoke-|qa-)/i.test(e.split('@')[0])) return true;
  }
  return false;
}

/**
 * Notify System Admin about new signup (non-blocking)
 */
function notifyAdminNewSignup({ user, role, entityName, planName, billingCycle }) {
  try {
    if (isAutomatedTestSignup(user)) {
      console.log(`[Signup] Skipping admin notification for test pattern: ${user.email}`);
      return;
    }
    const { sendPlatformEmail } = require('../utils/emailService');
    const { emailLayout } = require('../utils/emailTemplates');
    const { getSiteTimezone } = require('../utils/dateTimeHelper');
    const User = require('../models/User');

    // Find System Admin emails
    Promise.all([
      User.findAll({ where: { role: 'System Admin' }, attributes: ['email'] }),
      getSiteTimezone()
    ]).then(([admins, siteTz]) => {
      if (!admins.length) return;

      const adminEmails = admins.map(a => a.email).join(', ');
      const row = (label, value) => `<tr><td style="padding:10px 16px;font-size:14px;color:#6B7280;border-bottom:1px solid #E5E7EB;width:35%;">${label}</td><td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #E5E7EB;">${value}</td></tr>`;
      const trialEnds = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: siteTz });

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
    // Auto-test signup pattern → skip both verification AND any downstream platform email.
    // (Test fake @purplehere.com addresses bounce + spam admin inbox via catchall.)
    if (isAutomatedTestSignup(user)) {
      console.log(`[Signup] Skipping verification email for test pattern: ${user.email}`);
      return;
    }
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

    const result = await sendPlatformEmail({
      to: user.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    });
    if (result?.skipped) {
      console.log(`[Signup] Verification email blocked (${result.reason || 'env'}): ${user.email}`);
    } else {
      console.log(`[Signup] Verification email sent to ${user.email}`);
    }
  } catch (err) {
    console.error('[Signup] Verification email failed:', err.message);
  }
}

/**
 * Self-signup for Referral Partners — no plan, no entity, no trial.
 * Returns email_verification_required so the existing verify flow handles activation.
 *
 * Diverges from `signup()` in two ways:
 *  - Plan / entity creation skipped entirely (RP only owns themselves).
 *  - Their own referral_code is pre-generated at signup so the welcome email
 *    can include the share link. (POS-role users still get lazy generation
 *    on first /referral access, since they may never visit it.)
 */
async function signupReferralPartner(data) {
  const { Op } = require('sequelize');
  const transaction = await sequelize.transaction();

  try {
    const existingEmail = await User.findOne({ where: { email: data.email }, transaction });
    if (existingEmail) {
      throw new Error('This email is already registered. Please log in instead.');
    }
    const existingUsername = await User.findOne({
      where: { username: { [Op.eq]: data.username } },
      transaction
    });
    if (existingUsername) {
      throw new Error('This username is already taken');
    }

    const { verifyMxRecord } = require('../utils/emailValidator');
    const mxResult = await verifyMxRecord(data.email);
    if (!mxResult.valid) {
      throw new Error(mxResult.message);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      full_name: data.full_name,
      phone: data.phone || null,
      role: 'Referral Partner',
      email_verified: false
    }, { transaction });

    // RP can also be referred (e.g. someone shares the program with a friend who joins as RP)
    await applyReferralCodeToNewUser(user, data.referral_code, transaction);

    // Pre-generate own referral_code inside the same transaction
    const referralService = require('./referralService');
    const code = await referralService.getOrCreateReferralCode(user.id, { transaction });

    await transaction.commit();

    sendVerificationEmail(user);
    // Dedicated Referral Partner welcome — includes referral code + share link.
    // The generic sendSignupWelcomeEmail is skipped for RP since the referral
    // welcome email is more useful (links to /referral/dashboard, shows code).
    (async () => {
      try {
        if (isAutomatedTestSignup(user)) return; // suppress for auto test patterns
        const { sendPlatformEmail } = require('../utils/emailService');
        const { referralPartnerWelcomeEmail } = require('../utils/notificationTemplates');
        const mail = referralPartnerWelcomeEmail({
          fullName: user.full_name || user.username,
          referralCode: code
        });
        await sendPlatformEmail({ to: user.email, subject: mail.subject, html: mail.html });
      } catch (e) {
        console.error('[signupReferralPartner] welcome email error:', e.message);
      }
    })();
    notifyAdminNewSignup({
      user, role: 'Referral Partner', entityName: null, planName: '-', billingCycle: '-'
    });

    return { email_verification_required: true, email: user.email, referral_code: code };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

/**
 * Whitelist mapping demo/test login key → account email.
 * Key is what the frontend sends; email is resolved server-side so passwords
 * never leave the bundle. Each resolved user MUST be flagged is_demo or is_test
 * (defence-in-depth — if a non-demo email is ever placed here by mistake, the
 * gate below blocks it).
 */
const DEMO_KEY_TO_EMAIL = Object.freeze({
  // Demo (showcase / landing) — 5 roles in canonical order
  demo_restaurant_admin:    'demo-restaurant@purplehere.com',
  demo_brand_general:       'demo-brand@purplehere.com',
  demo_foodcourt_general:   'demo-foodcourt@purplehere.com',
  demo_multi_owner:         'demo-owner@purplehere.com',
  demo_supplier_admin:      'demo-supplier@purplehere.com',
  // Test (QA / staging)
  test_brand_general:       'brand_general@orderhere.center',
  test_foodcourt_general:   'foodcourt_general@orderhere.center',
  test_restaurant_owner:    'owner@purplehere.com',
  test_restaurant_admin:    'admin@kdine.com',
  test_staff:               'staff@kdine.com'
});

/**
 * Login as a demo / test account by key (no password required).
 * Used by the LoginPage quick-login cards so passwords stay out of the bundle.
 *
 * Security gate: the resolved user must have is_demo === true or is_test === true.
 * Any whitelist accident that resolves to a real account is rejected.
 */
async function loginAsDemo(key) {
  const email = DEMO_KEY_TO_EMAIL[key];
  if (!email) {
    const err = new Error('Unknown demo account');
    err.code = 'INVALID_DEMO_KEY';
    throw err;
  }

  const { Op } = require('sequelize');
  const sequelize = require('../db').sequelize;
  const user = await User.findOne({
    where: sequelize.where(
      sequelize.fn('LOWER', sequelize.col('email')),
      sequelize.fn('LOWER', email)
    )
  });
  if (!user) {
    const err = new Error('Demo account not provisioned');
    err.code = 'DEMO_ACCOUNT_MISSING';
    throw err;
  }
  if (!user.is_demo && !user.is_test) {
    // Defence-in-depth: never issue a token for a real account via this path.
    const err = new Error('Account is not a demo/test account');
    err.code = 'NOT_DEMO_ACCOUNT';
    throw err;
  }

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

  // Permissions / supplier company / restaurant context — same shape as login()
  let permissions = [];
  if (user.permissions) {
    try {
      permissions = typeof user.permissions === 'string' ? JSON.parse(user.permissions) : user.permissions;
    } catch (e) { permissions = []; }
  }
  let supplierCompanyId = user.supplier_company_id || null;
  if (!supplierCompanyId && user.role === 'Supplier Admin') {
    const SupplierCompany = require('../models/SupplierCompany');
    const sc = await SupplierCompany.findOne({ where: { owner_id: user.id }, attributes: ['id'] });
    if (sc) supplierCompanyId = sc.id;
  }
  let restaurantStatus = null;
  let restaurantName = null;
  let restaurantIsDemo = false;
  let restaurantIsTest = false;
  if (user.restaurant_id) {
    const r = await Restaurant.findByPk(user.restaurant_id, {
      attributes: ['status', 'name', 'is_demo', 'is_test']
    });
    if (r) {
      restaurantStatus = r.status;
      restaurantName = r.name;
      restaurantIsDemo = !!r.is_demo;
      restaurantIsTest = !!r.is_test;
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
      supplier_company_id: supplierCompanyId,
      subscription_status: user.subscription_status || null,
      restaurantStatus,
      restaurantName,
      restaurantIsDemo,
      restaurantIsTest,
      is_demo: !!user.is_demo,
      is_test: !!user.is_test,
      preferred_language: user.preferred_language || 'en',
      permissions
    }
  };
}

module.exports = { login, loginAsDemo, register, signup, signupReferralPartner, DEMO_KEY_TO_EMAIL };