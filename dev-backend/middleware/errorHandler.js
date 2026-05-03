const SENSITIVE_FIELDS = ['password', 'token', 'secret', 'authorization', 'cookie', 'creditCard', 'cardNumber', 'cvv', 'pin'];

const sanitizeBody = (body) => {
  if (!body || typeof body !== 'object') return body;
  const sanitized = {};
  for (const [key, value] of Object.entries(body)) {
    if (SENSITIVE_FIELDS.some(field => key.toLowerCase().includes(field))) {
      sanitized[key] = '[FILTERED]';
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

const errorHandler = (err, req, res, next) => {
  console.error('API Error:', {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: sanitizeBody(req.body),
    timestamp: new Date().toISOString()
  });

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let code = err.code || 'GENERAL_ERROR';
  let fieldErrors = null;
  let hint = null;

  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    code = 'VALIDATION_ERROR';
    fieldErrors = {};
    err.errors.forEach(e => { if (e.path) fieldErrors[e.path] = e.message; });
    message = 'Some fields are invalid. Please check the highlighted fields.';
    hint = 'Each red field below has a specific error message — fix and resubmit.';
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    code = 'DUPLICATE';
    fieldErrors = {};
    (err.errors || []).forEach(e => { if (e.path) fieldErrors[e.path] = `${e.path} already exists`; });
    const fieldList = Object.keys(fieldErrors);
    message = fieldList.length > 0
      ? `${fieldList.join(', ')} already in use`
      : 'This record already exists';
    hint = 'Pick a different value or edit the existing record instead.';
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
    code = 'INVALID_REFERENCE';
    message = 'Referenced record does not exist or has been deleted';
    hint = 'Refresh the page and re-select from the dropdown.';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    code = 'INVALID_ID';
    message = 'Invalid ID format';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    code = 'INVALID_TOKEN';
    message = 'Invalid authentication token';
    hint = 'Log out and sign in again.';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    code = 'TOKEN_EXPIRED';
    message = 'Your session has expired';
    hint = 'Sign in again to continue.';
  }

  const errorResponse = {
    success: false,
    error: {
      message,
      code,
      timestamp: new Date().toISOString()
    }
  };
  if (fieldErrors && Object.keys(fieldErrors).length > 0) errorResponse.error.fieldErrors = fieldErrors;
  if (hint) errorResponse.error.hint = hint;

  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack;
    errorResponse.error.details = err.details || null;
  }

  res.status(statusCode).json(errorResponse);
};

// Standardized success response helper
const successResponse = (res, data, message = null, statusCode = 200) => {
  const response = {
    success: true,
    data: data
  };
  
  if (message) {
    response.message = message;
  }
  
  response.timestamp = new Date().toISOString();
  
  return res.status(statusCode).json(response);
};

// Standardized error response helper.
// extra: { fieldErrors?: Record<string,string>, hint?: string }
const errorResponse = (res, message, statusCode = 500, code = 'GENERAL_ERROR', extra = {}) => {
  const response = {
    success: false,
    error: {
      message,
      code,
      timestamp: new Date().toISOString()
    }
  };
  if (extra.fieldErrors && Object.keys(extra.fieldErrors).length > 0) {
    response.error.fieldErrors = extra.fieldErrors;
  }
  if (extra.hint) response.error.hint = extra.hint;
  return res.status(statusCode).json(response);
};

// Quick field-error helper — for inline checks: requireFields(res, {name, code}) returns true if response sent.
const requireFields = (res, fields) => {
  const fieldErrors = {};
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
      fieldErrors[k] = 'Required';
    }
  }
  if (Object.keys(fieldErrors).length === 0) return false;
  errorResponse(res, 'Required fields missing', 400, 'VALIDATION_ERROR', {
    fieldErrors,
    hint: 'Fill in the highlighted fields and try again.'
  });
  return true;
};

module.exports = {
  errorHandler,
  successResponse,
  errorResponse,
  requireFields
};