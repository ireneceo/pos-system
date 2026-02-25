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

  // Default error response
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // Handle specific error types
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    message = err.errors.map(e => e.message).join(', ');
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    message = 'Resource already exists';
  } else if (err.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
    message = 'Invalid reference to related resource';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Standard error response format
  const errorResponse = {
    success: false,
    error: {
      message: message,
      code: err.code || 'GENERAL_ERROR',
      timestamp: new Date().toISOString()
    }
  };

  // Add additional details in development
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

// Standardized error response helper
const errorResponse = (res, message, statusCode = 500, code = 'GENERAL_ERROR') => {
  const response = {
    success: false,
    error: {
      message: message,
      code: code,
      timestamp: new Date().toISOString()
    }
  };
  
  return res.status(statusCode).json(response);
};

module.exports = {
  errorHandler,
  successResponse,
  errorResponse
};