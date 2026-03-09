/**
 * 색상 토큰 (플랫폼 중립)
 * 
 * - Web: CSS 변수로 매핑하여 사용
 * - RN: 직접 값 사용
 */

export const colors = {
  // Base
  background: '#FFFFFF',
  foreground: '#1A1A1A',
  
  // Primary (Green)
  primary: {
    DEFAULT: '#11C5A7',
    foreground: '#FFFFFF',
    10: '#EFFAF9',
    60: '#70DCCA',
    80: '#41D1B9',
    100: '#11C5A7',
  },
  
  // Secondary (Blue)
  secondary: {
    DEFAULT: '#00AFDF',
    foreground: '#FFFFFF',
    10: '#EBFBFF',
  },
  
  // Gray Scale
  gray: {
    1: '#1A1A1A',
    2: '#444444',
    3: '#666666',
    4: '#999999',
  },
  
  // Semantic
  destructive: '#FF453A',
  muted: '#F6F8F9',
  mutedForeground: '#666666',
  accent: '#E8EDF3',
  accentForeground: '#1A1D24',
  
  // Border
  border: '#E2E8F0',
  borderDark: '#1A1A1A',
  line: '#EEEEEE',  // hs-app border-line, bg-line
  input: '#DDDDDD',
  
  // Disabled
  disabled: {
    DEFAULT: '#F6F8F9',
    foreground: '#999999',
    foreground2: '#CCCCCC',
    background: '#EAECF0',
  },
  
  // Point Colors
  point: {
    success: '#40E193',
    navy: '#1C274C',
    gray: '#B9C2CE',
  },
} as const

/**
 * 그라디언트 (CSS 전용)
 */
export const gradients = {
  primary: 'linear-gradient(90deg, #19D297 0%, #0DC2F4 100%)',
} as const

/**
 * 그라디언트 색상 (RN용)
 */
export const gradientColors = {
  primary: ['#19D297', '#0DC2F4'] as const,
} as const

// 타입 export
export type Colors = typeof colors
export type Gradients = typeof gradients
