/**
 * 입력 검증 미들웨어
 * What and Why: XSS, SQL Injection, 잘못된 입력 방어
 * - express-validator 기반 체계적 검증
 * - 공통 검증 규칙 재사용
 */

const { body, param, query, validationResult } = require('express-validator');

// 검증 결과 처리 미들웨어 — fieldErrors + hint 포함 (errorHandler 와 동일 형식)
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const fieldErrors = {};
    errors.array().forEach(err => { if (err.path) fieldErrors[err.path] = err.msg; });
    return res.status(400).json({
      success: false,
      error: {
        message: 'Some fields are invalid. Please check the highlighted fields.',
        code: 'VALIDATION_ERROR',
        fieldErrors,
        hint: 'Each red field has a specific error message — fix and resubmit.',
        // 하위 호환 — 기존 details 형태도 유지
        details: errors.array().map(err => ({ field: err.path, message: err.msg }))
      }
    });
  }
  next();
};

// XSS 방지를 위한 문자열 정리
const sanitizeString = (value) => {
  if (typeof value !== 'string') return value;
  return value
    .replace(/[<>]/g, '') // HTML 태그 제거
    .trim();
};

// ============================================
// 공통 검증 규칙
// ============================================

// 이메일 검증
const emailValidation = body('email')
  .isEmail()
  .withMessage('Invalid email format')
  .normalizeEmail()
  .isLength({ max: 255 })
  .withMessage('Email must be less than 255 characters');

// 비밀번호 검증 (로그인용 - 간단)
const passwordValidation = body('password')
  .notEmpty()
  .withMessage('Password is required')
  .isLength({ min: 1, max: 128 })
  .withMessage('Password must be between 1 and 128 characters');

// 비밀번호 검증 (회원가입용 - 강력)
const strongPasswordValidation = body('password')
  .isLength({ min: 8, max: 128 })
  .withMessage('Password must be between 8 and 128 characters')
  .matches(/[a-z]/)
  .withMessage('Password must contain at least one lowercase letter')
  .matches(/[A-Z]/)
  .withMessage('Password must contain at least one uppercase letter')
  .matches(/[0-9]/)
  .withMessage('Password must contain at least one number');

// ID 파라미터 검증 (숫자)
const idParamValidation = (paramName = 'id') =>
  param(paramName)
    .isInt({ min: 1 })
    .withMessage(`${paramName} must be a positive integer`)
    .toInt();

// 페이지네이션 검증
const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt()
];

// 날짜 범위 검증
const dateRangeValidation = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('startDate must be a valid ISO 8601 date'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('endDate must be a valid ISO 8601 date')
];

// 일반 텍스트 검증 (이름, 제목 등)
const textValidation = (fieldName, maxLength = 255) =>
  body(fieldName)
    .trim()
    .customSanitizer(sanitizeString)
    .isLength({ min: 1, max: maxLength })
    .withMessage(`${fieldName} must be between 1 and ${maxLength} characters`);

// 선택적 텍스트 검증
const optionalTextValidation = (fieldName, maxLength = 255) =>
  body(fieldName)
    .optional()
    .trim()
    .customSanitizer(sanitizeString)
    .isLength({ max: maxLength })
    .withMessage(`${fieldName} must be less than ${maxLength} characters`);

// 금액 검증
const amountValidation = (fieldName) =>
  body(fieldName)
    .isFloat({ min: 0 })
    .withMessage(`${fieldName} must be a positive number`)
    .toFloat();

// ============================================
// 라우트별 검증 규칙
// ============================================

// 로그인 검증
const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('Email or username is required')
    .isLength({ max: 255 })
    .withMessage('Email must be less than 255 characters')
    .customSanitizer(sanitizeString),
  passwordValidation,
  handleValidationErrors
];

// 회원가입 검증
const validateRegister = [
  emailValidation,
  strongPasswordValidation,
  optionalTextValidation('username', 50),
  handleValidationErrors
];

// 주문 생성 검증
const validateCreateOrder = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.id')
    .isInt({ min: 1 })
    .withMessage('Item ID must be a positive integer'),
  body('items.*.quantity')
    .isInt({ min: 1, max: 999 })
    .withMessage('Quantity must be between 1 and 999'),
  body('total_amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a positive number'),
  handleValidationErrors
];

// 메뉴 아이템 검증
const validateMenuItem = [
  textValidation('name', 100),
  optionalTextValidation('description', 500),
  amountValidation('price'),
  body('category_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer'),
  handleValidationErrors
];

// 레스토랑 접근 검증 (ID)
const validateRestaurantId = [
  idParamValidation('restaurantId'),
  handleValidationErrors
];

// 검색 쿼리 검증
const validateSearchQuery = [
  query('q')
    .optional()
    .trim()
    .customSanitizer(sanitizeString)
    .isLength({ max: 100 })
    .withMessage('Search query must be less than 100 characters'),
  ...paginationValidation,
  handleValidationErrors
];

// 레스토랑 생성 검증 (Restaurant Admin 1:1 포함)
const validateRestaurantCreation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Restaurant name is required')
    .isLength({ max: 255 })
    .withMessage('Restaurant name must be less than 255 characters'),
  body('adminAction')
    .optional()
    .isIn(['create', 'assign'])
    .withMessage('adminAction must be "create" or "assign"'),
  body('adminEmail')
    .if(body('adminAction').equals('create'))
    .isEmail()
    .withMessage('Valid admin email is required')
    .normalizeEmail(),
  // adminPassword removed — auto-generated on server side
  body('adminUsername')
    .if(body('adminAction').equals('create'))
    .trim()
    .notEmpty()
    .withMessage('Admin username is required'),
  body('adminFullName')
    .if(body('adminAction').equals('create'))
    .trim()
    .notEmpty()
    .withMessage('Admin full name is required'),
  body('adminUserId')
    .if(body('adminAction').equals('assign'))
    .isInt({ min: 1 })
    .withMessage('Valid admin user ID is required'),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  sanitizeString,
  // 개별 규칙
  emailValidation,
  passwordValidation,
  strongPasswordValidation,
  idParamValidation,
  paginationValidation,
  dateRangeValidation,
  textValidation,
  optionalTextValidation,
  amountValidation,
  // 라우트별 검증
  validateLogin,
  validateRegister,
  validateCreateOrder,
  validateMenuItem,
  validateRestaurantId,
  validateSearchQuery,
  validateRestaurantCreation
};
