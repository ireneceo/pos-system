/**
 * Email Validation Utilities
 * - MX record verification (도메인의 메일 서버 존재 확인)
 * - Verification token generation
 * - Bounce count management
 */

const dns = require('dns');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

/**
 * MX 레코드 검증: 이메일 도메인에 메일 서버가 존재하는지 확인
 * @param {string} email
 * @returns {Promise<{valid: boolean, message?: string}>}
 */
async function verifyMxRecord(email) {
  try {
    const domain = email.split('@')[1];
    if (!domain) {
      return { valid: false, message: 'Invalid email format' };
    }

    return new Promise((resolve) => {
      dns.resolveMx(domain, (err, addresses) => {
        if (err || !addresses || addresses.length === 0) {
          resolve({ valid: false, message: `The email domain "${domain}" does not have a mail server` });
        } else {
          resolve({ valid: true });
        }
      });
    });
  } catch (error) {
    // DNS 검증 실패 시에도 이메일 등록은 허용 (네트워크 이슈 가능)
    console.error('MX verification error:', error.message);
    return { valid: true };
  }
}

/**
 * 이메일 인증 토큰 생성
 * @returns {{ rawToken: string, hashedToken: string, expires: Date }}
 */
async function generateVerificationToken() {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = await bcrypt.hash(rawToken, 10);
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24시간

  return { rawToken, hashedToken, expires };
}

/**
 * 인증 토큰 검증
 * @param {string} rawToken - URL에서 받은 토큰
 * @param {string} hashedToken - DB에 저장된 해시 토큰
 * @returns {Promise<boolean>}
 */
async function verifyToken(rawToken, hashedToken) {
  if (!rawToken || !hashedToken) return false;
  return bcrypt.compare(rawToken, hashedToken);
}

/**
 * 인증 이메일에 포함될 URL 생성
 * @param {string} rawToken
 * @param {string} email
 * @returns {string}
 */
function getVerificationUrl(rawToken, email) {
  const baseUrl = process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');
  return `${baseUrl}/verify-email?token=${encodeURIComponent(rawToken)}&email=${encodeURIComponent(email)}`;
}

module.exports = {
  verifyMxRecord,
  generateVerificationToken,
  verifyToken,
  getVerificationUrl
};
