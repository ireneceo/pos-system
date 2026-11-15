import { parseAddressLine } from './parseAddressLine';

describe('parseAddressLine — 한 줄 주소 칸 나누기', () => {
  it('Irene 예시 (말레이시아 · 나라 없음)', () => {
    expect(parseAddressLine('Lot 1.01.00, Level 2, 1, Jalan Damanlela, Bukit Damansara, 50490 Kuala Lumpur, Federal Territory of Kuala Lumpur', 'MY')).toEqual({
      address: 'Lot 1.01.00, Level 2, 1, Jalan Damanlela',
      address_line_2: 'Bukit Damansara',
      city: 'Kuala Lumpur',
      postal_code: '50490',
      state: 'Federal Territory of Kuala Lumpur',
    });
  });
  it('말레이시아 · 나라 이름 끝에', () => {
    expect(parseAddressLine('No 12, Jalan SS 2/24, 47300 Petaling Jaya, Selangor, Malaysia')).toEqual({
      country: 'MY', address: 'No 12, Jalan SS 2/24', city: 'Petaling Jaya', postal_code: '47300', state: 'Selangor',
    });
  });
  it('미국 · 주 약자 + 우편번호 한 조각', () => {
    expect(parseAddressLine('1234 Market St, San Francisco, CA 94105, USA')).toEqual({
      country: 'US', address: '1234 Market St', city: 'San Francisco', state: 'CA', postal_code: '94105',
    });
  });
  it('영국 · 도시 + 우편번호 한 조각', () => {
    expect(parseAddressLine('10 Downing Street, London SW1A 2AA, United Kingdom')).toEqual({
      country: 'GB', address: '10 Downing Street', city: 'London', postal_code: 'SW1A 2AA',
    });
  });
  it('싱가포르 · 우편번호 뒤에 붙음', () => {
    expect(parseAddressLine('1 Raffles Place, #20-01, Singapore 048616', 'SG')).toEqual({
      address: '1 Raffles Place, #20-01', city: 'Singapore', postal_code: '048616',
    });
  });
  it('쉼표 없는 주소는 통째로 주소 1줄', () => {
    expect(parseAddressLine('서울특별시 강남구 테헤란로 123')).toEqual({ address: '서울특별시 강남구 테헤란로 123' });
  });
  it('우편번호 없음 · 조각 3개 이상', () => {
    expect(parseAddressLine('Jalan Ampang, Kuala Lumpur, Selangor')).toEqual({
      address: 'Jalan Ampang', city: 'Kuala Lumpur', state: 'Selangor',
    });
  });
  it('첫 조각 번지는 우편번호로 안 봄', () => {
    expect(parseAddressLine('12345 Long Road, Springfield')).toEqual({ address: '12345 Long Road', city: 'Springfield' });
  });
  it('글자를 잃지 않음 (모든 조각이 어딘가 들어감)', () => {
    const src = 'A1, B2, C3, D4, 50000 E5, F6, Malaysia';
    const p = parseAddressLine(src);
    const joined = [p.address, p.address_line_2, p.city, p.postal_code, p.state].join(' ');
    for (const w of ['A1', 'B2', 'C3', 'D4', '50000', 'E5', 'F6']) expect(joined).toContain(w);
  });
  it('빈 값', () => { expect(parseAddressLine('  ')).toEqual({}); });
});
