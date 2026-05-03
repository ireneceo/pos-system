// Jest configuration for Purple POS backend.
// Why: health-check.js is a live integration test against a running server.
// Jest covers unit/contract tests that don't need the full server (or hit a test instance).
//
// Tests live in `tests/` and are matched by *.test.js. Run with `npm test`.

module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  testTimeout: 30000,
  // Skip auto-loading node_modules — speeds up cold start
  transformIgnorePatterns: ['/node_modules/'],
  // Suppress dotenv noise during test runs
  silent: false,
  // No coverage threshold yet (P0 — write first tests, raise bar later)
  collectCoverage: false
};
