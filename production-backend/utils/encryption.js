/**
 * What and Why: AES-256 암호화 유틸리티
 * - SMTP 비밀번호 등 민감한 정보를 데이터베이스에 안전하게 저장
 * - 환경변수 ENCRYPTION_KEY (32바이트) 사용
 * - IV(Initialization Vector)를 암호문에 포함하여 저장
 */

const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

/**
 * 암호화 키 가져오기
 * @returns {Buffer} 32바이트 암호화 키
 */
function getEncryptionKey() {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    // 키가 없으면 기본값 사용 (프로덕션에서는 반드시 설정 필요)
    console.warn('ENCRYPTION_KEY not set in environment, using default key');
    return crypto.scryptSync('default-key-change-me', 'salt', 32);
  }
  // 키가 32바이트가 아니면 scrypt로 변환
  if (key.length !== 32) {
    return crypto.scryptSync(key, 'purple-here-salt', 32);
  }
  return Buffer.from(key);
}

/**
 * 문자열 암호화
 * @param {string} text - 암호화할 평문
 * @returns {string} 암호화된 문자열 (hex 형식, IV 포함)
 */
function encrypt(text) {
  if (!text) return '';

  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // IV + 암호문을 함께 저장
    return iv.toString('hex') + ':' + encrypted;
  } catch (error) {
    console.error('Encryption failed:', error.message);
    return '';
  }
}

/**
 * 문자열 복호화
 * @param {string} encryptedText - 암호화된 문자열 (hex 형식, IV 포함)
 * @returns {string} 복호화된 평문
 */
function decrypt(encryptedText) {
  if (!encryptedText) return '';

  try {
    // 암호화되지 않은 평문인 경우 (기존 데이터 호환)
    if (!encryptedText.includes(':')) {
      return encryptedText;
    }

    const key = getEncryptionKey();
    const parts = encryptedText.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    // 복호화 실패 시 원본 반환 (기존 평문 데이터 호환)
    console.error('Decryption failed, returning original:', error.message);
    return encryptedText;
  }
}

/**
 * 암호화된 데이터인지 확인
 * @param {string} text - 확인할 문자열
 * @returns {boolean}
 */
function isEncrypted(text) {
  if (!text) return false;
  // IV:encrypted 형식인지 확인
  const parts = text.split(':');
  return parts.length === 2 && parts[0].length === 32; // IV는 16바이트 = 32 hex chars
}

module.exports = {
  encrypt,
  decrypt,
  isEncrypted
};
