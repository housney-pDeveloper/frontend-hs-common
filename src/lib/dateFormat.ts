/**
 * 날짜 포맷 유틸
 *
 * 서버에서 내려오는 *Date(varchar8, YYYYMMDD) 또는 *Date(varchar14, YYYYMMDDHHMMSS)를
 * 사용자 친화적 형식으로 변환한다.
 *
 * 기본값: yyyy-mm-dd
 * 커스텀 포맷 지원:
 *   - 'yyyy-mm-dd'       → 2026-03-15
 *   - 'yyyy.mm.dd'       → 2026.03.15
 *   - 'yyyy년 mm월 dd일'  → 2026년 03월 15일
 *   - 'yyyy년 m월 d일'    → 2026년 3월 15일
 *   - 'yyyy년 m월 d일(E)' → 2026년 3월 15일(일)
 *   - 'mm/dd'            → 03/15
 *   - 'm월 d일'           → 3월 15일
 */

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'] as const

interface ParsedDate {
  year: number
  month: number
  day: number
  dayOfWeek: string
}

/**
 * YYYYMMDD 또는 YYYYMMDDHHMMSS 문자열을 파싱
 */
function parseRawDate(raw: string): ParsedDate | null {
  if (!raw || raw.length < 8) return null
  const year = Number(raw.slice(0, 4))
  const month = Number(raw.slice(4, 6))
  const day = Number(raw.slice(6, 8))
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null
  const dayOfWeek = DAY_NAMES[new Date(year, month - 1, day).getDay()]
  return { year, month, day, dayOfWeek }
}

/**
 * 날짜 포맷 변환
 *
 * @param raw 서버에서 받은 날짜 문자열 (YYYYMMDD 또는 YYYYMMDDHHMMSS)
 * @param format 포맷 문자열 (기본: 'yyyy-mm-dd')
 * @returns 포맷된 날짜 문자열. 파싱 실패 시 원본 반환.
 *
 * @example
 * formatDate('20260315')                        // '2026-03-15'
 * formatDate('20260315', 'yyyy.mm.dd')           // '2026.03.15'
 * formatDate('20260315', 'yyyy년 m월 d일')        // '2026년 3월 15일'
 * formatDate('20260315', 'yyyy년 m월 d일(E)')     // '2026년 3월 15일(일)'
 * formatDate('20260315', 'm월 d일')               // '3월 15일'
 * formatDate('20260315', 'mm/dd')                // '03/15'
 */
export function formatDate(raw: string, format = 'yyyy-mm-dd'): string {
  const parsed = parseRawDate(raw)
  if (!parsed) return raw

  const { year, month, day, dayOfWeek } = parsed
  const mm = String(month).padStart(2, '0')
  const dd = String(day).padStart(2, '0')

  return format
    .replace('yyyy', String(year))
    .replace('mm', mm)
    .replace('dd', dd)
    .replace('m', String(month))
    .replace('d', String(day))
    .replace('E', dayOfWeek)
}

/**
 * 날짜 포맷 프리셋
 */
export const DATE_FORMAT = {
  /** 2026-03-15 */
  DEFAULT: 'yyyy-mm-dd',
  /** 2026.03.15 */
  DOT: 'yyyy.mm.dd',
  /** 03/15 */
  SHORT: 'mm/dd',
  /** 2026년 3월 15일 */
  KOREAN: 'yyyy년 m월 d일',
  /** 2026년 3월 15일(일) */
  KOREAN_DAY: 'yyyy년 m월 d일(E)',
  /** 3월 15일 */
  MONTH_DAY: 'm월 d일',
} as const
