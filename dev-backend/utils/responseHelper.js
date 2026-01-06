/**
 * Response Helper Utility
 * Standardizes API response formats across all routes
 */

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {Object} options - Optional parameters
 * @param {string} options.message - Optional message
 * @param {number} options.statusCode - HTTP status code (default: 200)
 * @param {Object} options.pagination - Pagination info
 */
function success(res, data, options = {}) {
  const { message, statusCode = 200, pagination } = options;

  const response = {
    success: true,
    data
  };

  if (message) {
    response.message = message;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(statusCode).json(response);
}

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {string} error - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {Object} options - Optional parameters
 * @param {string} options.code - Error code
 * @param {*} options.details - Additional error details
 */
function error(res, errorMessage, statusCode = 500, options = {}) {
  const { code, details } = options;

  const response = {
    success: false,
    error: errorMessage
  };

  if (code) {
    response.code = code;
  }

  if (details && process.env.NODE_ENV === 'development') {
    response.details = details;
  }

  return res.status(statusCode).json(response);
}

/**
 * Send not found response
 * @param {Object} res - Express response object
 * @param {string} resourceName - Name of the resource not found
 */
function notFound(res, resourceName = 'Resource') {
  return error(res, `${resourceName} not found`, 404);
}

/**
 * Send bad request response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
function badRequest(res, message = 'Bad request') {
  return error(res, message, 400);
}

/**
 * Send unauthorized response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
function unauthorized(res, message = 'Unauthorized') {
  return error(res, message, 401);
}

/**
 * Send forbidden response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
function forbidden(res, message = 'Permission denied') {
  return error(res, message, 403);
}

/**
 * Send conflict response (for duplicate resources)
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 */
function conflict(res, message = 'Resource already exists') {
  return error(res, message, 409);
}

/**
 * Send created response
 * @param {Object} res - Express response object
 * @param {*} data - Created resource data
 * @param {string} message - Optional message
 */
function created(res, data, message) {
  return success(res, data, { statusCode: 201, message });
}

/**
 * Handle validation errors
 * @param {Object} res - Express response object
 * @param {Array} errors - Array of validation errors
 */
function validationError(res, errors) {
  return res.status(400).json({
    success: false,
    error: 'Validation failed',
    errors: Array.isArray(errors) ? errors : [errors]
  });
}

/**
 * Handle paginated list response
 * @param {Object} res - Express response object
 * @param {Array} data - List data
 * @param {Object} pagination - Pagination info
 */
function paginatedList(res, data, pagination) {
  return success(res, data, { pagination });
}

/**
 * Wrap async route handler to catch errors
 * @param {Function} fn - Async route handler function
 * @returns {Function} Wrapped function with error handling
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
      console.error('Route error:', err);
      error(res, err.message, 500);
    });
  };
}

module.exports = {
  success,
  error,
  notFound,
  badRequest,
  unauthorized,
  forbidden,
  conflict,
  created,
  validationError,
  paginatedList,
  asyncHandler
};
