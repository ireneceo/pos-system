// 국가 목록 및 전화번호 국가코드 상수
export const COUNTRIES = [
  { code: 'MY', name: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', phoneCode: '+60' },
  { code: 'SG', name: 'Singapore', timezone: 'Asia/Singapore', phoneCode: '+65' },
  { code: 'KR', name: 'South Korea', timezone: 'Asia/Seoul', phoneCode: '+82' },
  { code: 'JP', name: 'Japan', timezone: 'Asia/Tokyo', phoneCode: '+81' },
  { code: 'CN', name: 'China', timezone: 'Asia/Shanghai', phoneCode: '+86' },
  { code: 'TH', name: 'Thailand', timezone: 'Asia/Bangkok', phoneCode: '+66' },
  { code: 'VN', name: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', phoneCode: '+84' },
  { code: 'PH', name: 'Philippines', timezone: 'Asia/Manila', phoneCode: '+63' },
  { code: 'ID', name: 'Indonesia', timezone: 'Asia/Jakarta', phoneCode: '+62' },
  { code: 'IN', name: 'India', timezone: 'Asia/Kolkata', phoneCode: '+91' },
  { code: 'AU', name: 'Australia', timezone: 'Australia/Sydney', phoneCode: '+61' },
  { code: 'US', name: 'United States', timezone: 'America/New_York', phoneCode: '+1' },
  { code: 'GB', name: 'United Kingdom', timezone: 'Europe/London', phoneCode: '+44' },
  { code: 'AE', name: 'United Arab Emirates', timezone: 'Asia/Dubai', phoneCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', timezone: 'Asia/Riyadh', phoneCode: '+966' },
];

// 국가 코드로 국가 정보 찾기
export const getCountryByCode = (code: string) => {
  return COUNTRIES.find(c => c.code === code) || COUNTRIES[0]; // 기본값 Malaysia
};

// 국가명으로 국가 정보 찾기
export const getCountryByName = (name: string) => {
  return COUNTRIES.find(c => c.name === name) || COUNTRIES[0];
};

// 국가 코드를 국가명으로 변환
export const getCountryName = (code: string) => {
  const country = COUNTRIES.find(c => c.code === code);
  return country ? country.name : code;
};

// 국가명을 국가 코드로 변환
export const getCountryCode = (name: string) => {
  const country = COUNTRIES.find(c => c.name === name);
  return country ? country.code : 'MY';
};

export default COUNTRIES;
