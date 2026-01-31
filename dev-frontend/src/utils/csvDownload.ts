/**
 * CSV Download Utility
 * What and Why: Safari 호환성 및 메모리 누수 방지를 위한 CSV 다운로드 유틸리티
 * - Blob URL을 생성 후 반드시 해제하여 메모리 누수 방지
 * - Safari에서도 안정적으로 동작하도록 처리
 */

// What and Why: BOM(Byte Order Mark) 추가로 Excel에서 한글 깨짐 방지
const BOM = '\uFEFF';

/**
 * CSV 파일 다운로드 함수
 * - 메모리 누수 방지: Blob URL 자동 해제
 * - Safari 호환성: 다운로드 속성 fallback 처리
 */
export const downloadCSV = (content: string, filename: string): void => {
  // BOM + CSV 내용으로 Blob 생성
  const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  // 다운로드 링크 생성
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);

  // Safari 호환성: display none으로 설정하고 body에 추가
  link.style.visibility = 'hidden';
  link.style.position = 'absolute';
  link.style.left = '-9999px';
  document.body.appendChild(link);

  // 다운로드 트리거
  link.click();

  // What and Why: 메모리 누수 방지
  // - setTimeout으로 브라우저가 다운로드를 시작할 시간 확보
  // - 이후 Blob URL 해제 및 DOM에서 링크 제거
  setTimeout(() => {
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 150);
};

/**
 * CSV 문자열 이스케이프 처리
 * - 쉼표, 따옴표, 줄바꿈이 포함된 값을 안전하게 처리
 */
export const escapeCSV = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return '';

  const str = String(value);

  // 쉼표, 따옴표, 줄바꿈이 포함되면 따옴표로 감싸기
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    // 내부 따옴표는 이중 따옴표로 이스케이프
    return `"${str.replace(/"/g, '""')}"`;
  }

  return str;
};

/**
 * 배열을 CSV 행으로 변환
 */
export const toCSVRow = (values: (string | number | null | undefined)[]): string => {
  return values.map(escapeCSV).join(',');
};

/**
 * 2차원 배열을 CSV 문자열로 변환
 */
export const arrayToCSV = (rows: (string | number | null | undefined)[][]): string => {
  return rows.map(row => toCSVRow(row)).join('\n');
};

/**
 * 객체 배열을 CSV 문자열로 변환
 * @param data 객체 배열
 * @param headers 헤더 매핑 { key: 'Header Name' }
 */
export const objectArrayToCSV = <T extends Record<string, any>>(
  data: T[],
  headers: Record<keyof T, string>
): string => {
  const keys = Object.keys(headers) as (keyof T)[];
  const headerRow = keys.map(key => headers[key]);

  const rows = data.map(item =>
    keys.map(key => escapeCSV(item[key]))
  );

  return [toCSVRow(headerRow), ...rows.map(row => row.join(','))].join('\n');
};

/**
 * 기간 타입 한글 변환
 */
export const getPeriodLabel = (period: string, isCustom: boolean, startDate: string, endDate: string): string => {
  if (isCustom) {
    return `Custom Period: ${startDate} to ${endDate}`;
  }

  switch (period) {
    case 'today': return 'Today';
    case 'week': return 'Last 7 Days';
    case 'month': return 'Last 30 Days';
    case 'year': return 'Last 12 Months';
    case 'all': return 'All Time';
    default: return period;
  }
};

/**
 * 날짜 포맷팅 (파일명용)
 */
export const formatDateForFilename = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * 파일명 생성
 */
export const generateFilename = (
  prefix: string,
  tabName: string,
  period: string,
  isCustom: boolean,
  startDate: string,
  endDate: string
): string => {
  const periodStr = isCustom ? `${startDate}_${endDate}` : period;
  const timestamp = formatDateForFilename(new Date());
  return `${prefix}_${tabName}_${periodStr}_${timestamp}.csv`;
};
