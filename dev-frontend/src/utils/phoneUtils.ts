/**
 * 전화번호 유틸리티
 * 국가별 전화번호 처리
 */

// 지원 국가 목록
export const COUNTRIES = [
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾', minLength: 9, maxLength: 10 },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬', minLength: 8, maxLength: 8 },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭', minLength: 9, maxLength: 9 },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷', minLength: 10, maxLength: 11 },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩', minLength: 9, maxLength: 12 },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭', minLength: 10, maxLength: 10 },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳', minLength: 9, maxLength: 10 },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪', minLength: 9, maxLength: 9 },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦', minLength: 9, maxLength: 9 },
];

export const getCountryByCode = (code: string) => {
  return COUNTRIES.find(c => c.code === code) || COUNTRIES[0];
};

export const getCountryByDialCode = (dialCode: string) => {
  return COUNTRIES.find(c => c.dialCode === dialCode) || COUNTRIES[0];
};

// Detect the country of a stored international number by its dial-code prefix
// (longest match wins). Returns null when the value has no recognizable + prefix,
// so callers can fall back to a default country.
export const detectCountryFromInternational = (value: string) => {
  if (!value || !value.startsWith('+')) return null;
  const matches = COUNTRIES.filter(c => value.startsWith(c.dialCode));
  if (!matches.length) return null;
  return matches.reduce((best, c) => (c.dialCode.length > best.dialCode.length ? c : best));
};

/**
 * 전화번호를 국제 형식으로 변환
 * @param phone - 입력된 전화번호
 * @param countryCode - 국가 코드 (예: 'MY', 'SG')
 * @returns 국제 형식 전화번호 (+60123456789)
 */
export const formatPhoneNumber = (phone: string, countryCode: string = 'MY'): string => {
  if (!phone) return '';

  const country = getCountryByCode(countryCode);
  const dialCode = country.dialCode.replace('+', '');

  // 모든 공백, 하이픈, 괄호 제거 (숫자만 남김)
  let cleaned = phone.replace(/\D/g, '');

  // 이미 국가코드가 포함된 경우
  if (cleaned.startsWith(dialCode)) {
    return '+' + cleaned;
  }

  // 0으로 시작하면 제거 (로컬 번호)
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  return country.dialCode + cleaned;
};

/**
 * 전화번호를 로컬 형식으로 표시 (하이픈 없이 숫자만)
 * @param phone - 국제 형식 전화번호 (+60123456789)
 * @param countryCode - 국가 코드
 * @returns 로컬 형식 (0123456789)
 */
export const displayPhoneNumber = (phone: string, countryCode: string = 'MY'): string => {
  if (!phone) return '';

  const country = getCountryByCode(countryCode);

  // 국가코드 제거하고 0 추가
  const withoutDialCode = phone.replace(country.dialCode, '');
  return '0' + withoutDialCode;
};

/**
 * 전화번호 유효성 검증
 * @param phone - 검증할 전화번호
 * @param countryCode - 국가 코드
 * @returns 유효 여부
 */
export const validatePhoneNumber = (phone: string, countryCode: string = 'MY'): boolean => {
  if (!phone) return false;

  const country = getCountryByCode(countryCode);
  const formatted = formatPhoneNumber(phone, countryCode);

  // 국가코드 제거하고 숫자만 추출
  const numbers = formatted.replace(country.dialCode, '');

  // 자릿수 검증
  return numbers.length >= country.minLength && numbers.length <= country.maxLength;
};

/**
 * 입력 중 전화번호 포맷팅 (숫자만, 하이픈 없음)
 * @param value - 입력 값
 * @param countryCode - 국가 코드
 * @returns 포맷팅된 값 (숫자만)
 */
export const formatPhoneInput = (value: string, countryCode: string = 'MY'): string => {
  const country = getCountryByCode(countryCode);

  // 숫자만 추출
  const numbers = value.replace(/\D/g, '');

  // 국가별 최대 길이로 제한
  const maxLength = country.maxLength;
  return numbers.substring(0, maxLength);
};

/**
 * 전화번호에서 숫자만 추출
 * @param phone - 전화번호
 * @returns 숫자만
 */
export const extractNumbers = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

/**
 * 전화번호를 사용자에게 보기 좋게 표시
 * 예: +60123456789 → +60 12-345 6789
 * 예: +821012345678 → +82 10-1234-5678
 * @param phone - 정규화된 전화번호 (+60123456789)
 * @returns 포맷팅된 전화번호 (+60 12-345 6789)
 */
export const formatPhoneForDisplay = (phone: string): string => {
  if (!phone) return '';

  // 숫자와 + 기호만 남김
  const cleaned = phone.replace(/[^0-9+]/g, '');

  // 말레이시아 (+60)
  if (cleaned.startsWith('+60')) {
    const local = cleaned.substring(3);
    if (local.length === 9) {
      // +60 12-345 6789
      return `+60 ${local.substring(0, 2)}-${local.substring(2, 5)} ${local.substring(5)}`;
    }
    if (local.length === 10) {
      // +60 12-3456 7890
      return `+60 ${local.substring(0, 2)}-${local.substring(2, 6)} ${local.substring(6)}`;
    }
    return `+60 ${local}`;
  }

  // 한국 (+82)
  if (cleaned.startsWith('+82')) {
    const local = cleaned.substring(3);
    // 휴대폰: 10-1234-5678
    if (local.startsWith('10') && local.length === 10) {
      return `+82 ${local.substring(0, 2)}-${local.substring(2, 6)}-${local.substring(6)}`;
    }
    // 서울: 2-1234-5678
    if (local.startsWith('2') && local.length >= 9) {
      return `+82 ${local.substring(0, 1)}-${local.substring(1, 5)}-${local.substring(5)}`;
    }
    // 기타 지역: 31-1234-5678
    if (local.length >= 10) {
      return `+82 ${local.substring(0, 2)}-${local.substring(2, 6)}-${local.substring(6)}`;
    }
    return `+82 ${local}`;
  }

  // 싱가포르 (+65)
  if (cleaned.startsWith('+65')) {
    const local = cleaned.substring(3);
    if (local.length === 8) {
      return `+65 ${local.substring(0, 4)} ${local.substring(4)}`;
    }
    return `+65 ${local}`;
  }

  // 태국 (+66)
  if (cleaned.startsWith('+66')) {
    const local = cleaned.substring(3);
    if (local.length === 9) {
      return `+66 ${local.substring(0, 2)}-${local.substring(2, 5)}-${local.substring(5)}`;
    }
    return `+66 ${local}`;
  }

  // 인도네시아 (+62)
  if (cleaned.startsWith('+62')) {
    const local = cleaned.substring(3);
    if (local.length >= 10) {
      return `+62 ${local.substring(0, 3)}-${local.substring(3, 7)}-${local.substring(7)}`;
    }
    return `+62 ${local}`;
  }

  // 기타는 그대로 반환
  return cleaned;
};

/**
 * 전화번호 에러 메시지
 */
export const getPhoneErrorMessage = (phone: string, countryCode: string = 'MY'): string | null => {
  if (!phone) {
    return 'Phone number is required';
  }

  const country = getCountryByCode(countryCode);
  const formatted = formatPhoneNumber(phone, countryCode);
  const numbers = formatted.replace(country.dialCode, '');

  if (numbers.length < country.minLength) {
    return `Phone number must be at least ${country.minLength} digits`;
  }

  if (numbers.length > country.maxLength) {
    return `Phone number must be at most ${country.maxLength} digits`;
  }

  if (!validatePhoneNumber(phone, countryCode)) {
    return 'Please enter a valid phone number';
  }

  return null;
};
