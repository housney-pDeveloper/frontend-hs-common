/**
 * 간격 토큰 (플랫폼 중립)
 * 
 * 기본 단위: px
 * Web에서는 rem으로 변환하여 사용 (1rem = 10px)
 */

export const spacing = {
  0: 0,
  1: 1,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
  36: 36,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
  80: 80,
  96: 96,
  100: 100,
} as const

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const

export const shadow = {
  default: '2px 2px 16px 0 rgba(0, 0, 0, 0.08)',
} as const

export type Spacing = typeof spacing
export type BorderRadius = typeof borderRadius
