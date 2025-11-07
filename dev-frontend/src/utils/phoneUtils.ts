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
];

export const getCountryByCode = (code: string) => {
  return COUNTRIES.find(c => c.code === code) || COUNTRIES[0];
};

export const getCountryByDialCode = (dialCode: string) => {
  return COUNTRIES.find(c => c.dialCode === dialCode) || COUNTRIES[0];
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
