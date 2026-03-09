/**
 * 타이포그래피 토큰 (플랫폼 중립)
 * 
 * 피그마 기준 - 1rem = 10px
 */

export const fontFamily = {
  sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
} as const

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const

/**
 * 타이포그래피 스타일
 * 
 * 각 스타일은 [fontSize(rem), lineHeight(rem), fontWeight] 형태
 */
export const typography = {
  // Title
  'title-1': { fontSize: 32, lineHeight: 46, fontWeight: 600 },
  'title-2': { fontSize: 32, lineHeight: 46, fontWeight: 500 },
  'title-3': { fontSize: 24, lineHeight: 32, fontWeight: 600 },
  'title-4': { fontSize: 20, lineHeight: 30, fontWeight: 600 },
  'title-5': { fontSize: 20, lineHeight: 30, fontWeight: 500 },
  'title-6': { fontSize: 18, lineHeight: 28, fontWeight: 600 },
  'title-7': { fontSize: 18, lineHeight: 28, fontWeight: 500 },
  'title-8': { fontSize: 16, lineHeight: 28, fontWeight: 600 },
  
  // Mobile (hs-app text-m-1 ~ text-m-12)
  'm-1': { fontSize: 26, lineHeight: 38, fontWeight: 600 },
  'm-2': { fontSize: 20, lineHeight: 30, fontWeight: 600 },
  'm-3': { fontSize: 20, lineHeight: 30, fontWeight: 500 },
  'm-4': { fontSize: 18, lineHeight: 28, fontWeight: 600 },
  'm-5': { fontSize: 18, lineHeight: 28, fontWeight: 500 },
  'm-6': { fontSize: 16, lineHeight: 28, fontWeight: 600 },
  'm-7': { fontSize: 16, lineHeight: 28, fontWeight: 500 },
  'm-8': { fontSize: 16, lineHeight: 28, fontWeight: 400 },
  'm-9': { fontSize: 14, lineHeight: 24, fontWeight: 600 },
  'm-10': { fontSize: 14, lineHeight: 24, fontWeight: 500 },
  'm-11': { fontSize: 14, lineHeight: 24, fontWeight: 400 },
  'm-12': { fontSize: 12, lineHeight: 24, fontWeight: 400 },

  // Body
  'body-1': { fontSize: 16, lineHeight: 28, fontWeight: 500 },
  'body-2': { fontSize: 16, lineHeight: 28, fontWeight: 400 },
  'body-3': { fontSize: 14, lineHeight: 20, fontWeight: 600 },
  'body-4': { fontSize: 14, lineHeight: 20, fontWeight: 500 },
  'body-5': { fontSize: 14, lineHeight: 20, fontWeight: 400 },
  'body-6': { fontSize: 12, lineHeight: 20, fontWeight: 600 },
  'body-7': { fontSize: 12, lineHeight: 20, fontWeight: 500 },
  'body-8': { fontSize: 12, lineHeight: 20, fontWeight: 400 },
} as const

export type Typography = typeof typography
export type TypographyKey = keyof Typography
