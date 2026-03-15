/**
 * @hs/common Tailwind 프리셋
 *
 * hs-admin과 hs-app에서 공유하는 Tailwind 설정
 *
 * 사용법 (tailwind.config.js):
 * ```js
 * import hsPreset from './hs-common/src/tailwind/preset.js'
 *
 * export default {
 *   presets: [hsPreset],
 *   content: [...],
 *   // 프로젝트별 확장 가능
 *   theme: {
 *     extend: {
 *       // 프로젝트 전용 설정
 *     }
 *   }
 * }
 * ```
 */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        // Title Typography (px 기반)
        'title-1': ['32px', { lineHeight: '46px', fontWeight: '600' }],
        'title-2': ['32px', { lineHeight: '46px', fontWeight: '500' }],
        'title-3': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'title-4': ['20px', { lineHeight: '30px', fontWeight: '600' }],
        'title-5': ['20px', { lineHeight: '30px', fontWeight: '500' }],
        'title-6': ['18px', { lineHeight: '28px', fontWeight: '600' }],
        'title-7': ['18px', { lineHeight: '28px', fontWeight: '500' }],
        'title-8': ['16px', { lineHeight: '28px', fontWeight: '600' }],

        // Body Typography (px 기반)
        'body-1': ['16px', { lineHeight: '28px', fontWeight: '500' }],
        'body-2': ['16px', { lineHeight: '28px', fontWeight: '400' }],
        'body-3': ['14px', { lineHeight: '20px', fontWeight: '600' }],
        'body-4': ['14px', { lineHeight: '20px', fontWeight: '500' }],
        'body-5': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-6': ['12px', { lineHeight: '20px', fontWeight: '600' }],
        'body-7': ['12px', { lineHeight: '20px', fontWeight: '500' }],
        'body-8': ['12px', { lineHeight: '20px', fontWeight: '400' }],

        // 모바일 버전
        'm-1': ['26px', { lineHeight: '38px', fontWeight: '600' }],
        'm-2': ['20px', { lineHeight: '30px', fontWeight: '600' }],
        'm-3': ['20px', { lineHeight: '30px', fontWeight: '500' }],
        'm-4': ['18px', { lineHeight: '28px', fontWeight: '600' }],
        'm-5': ['18px', { lineHeight: '28px', fontWeight: '500' }],
        'm-6': ['16px', { lineHeight: '28px', fontWeight: '600' }],
        'm-7': ['16px', { lineHeight: '28px', fontWeight: '500' }],
        'm-8': ['16px', { lineHeight: '28px', fontWeight: '400' }],
        'm-9': ['14px', { lineHeight: '24px', fontWeight: '600' }],
        'm-10': ['14px', { lineHeight: '24px', fontWeight: '500' }],
        'm-11': ['14px', { lineHeight: '24px', fontWeight: '400' }],
        'm-12': ['12px', { lineHeight: '24px', fontWeight: '400' }],
      },
      // spacing: px 기반 (0-100px, 1:1 매핑)
      spacing: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [i, `${i}px`])
      ),
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        'default': '2px 2px 16px 0 rgba(0, 0, 0, 0.08)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          gradient: 'var(--primary-gradient)',
          foreground: 'var(--primary-foreground)',
          10: 'var(--green10)',
          60: 'var(--green60)',
          80: 'var(--green80)',
          100: 'var(--green100)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
          border: 'var(--secondary-foreground)',
          10: 'var(--blue10)'
        },
        common: {
          DEFAULT: 'var(--border-dark)',
          foreground: 'var(--foreground)',
          border: 'var(--border-dark)',
        },
        gray: {
          1: 'var(--gray1)',
          2: 'var(--gray2)',
          3: 'var(--gray3)',
          4: 'var(--gray4)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
        },
        disabled: {
          DEFAULT: 'var(--disabled)',
          foreground: 'var(--disabled-foreground)',
          foreground2: 'var(--disabled-foreground2)',
          background: 'var(--disabled-background)',
        },
        border: 'var(--border)',
        input: 'var(--input)',

        // Point Colors
        'point-success': 'var(--point-success)',
        'point-navy': 'var(--point-navy)',
        'point-gray': 'var(--point-gray)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    }
  },
  plugins: [
    // Gradient 유틸리티 플러그인
    function({ addUtilities }) {
      addUtilities({
        '.bg-primary-gradient': {
          position: 'relative',
          'background-image': 'var(--primary-gradient)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0',
            'background-color': 'var(--green80)',
            opacity: '0',
            transition: 'opacity 0.2s ease-in-out',
            'border-radius': 'inherit',
            'z-index': '-1',
          },
          '&:hover:not(:disabled)::before': {
            opacity: '1',
          },
          '&:disabled': {
            'background-image': 'none',
            'background-color': 'var(--disabled)',
          },
        },
        '.border-primary-gradient': {
          border: '2px solid transparent',
          background: 'linear-gradient(var(--background), var(--background)) padding-box, var(--primary-gradient) border-box',
          'background-clip': 'padding-box, border-box',
        },
        '.text-primary-gradient': {
          backgroundImage: 'var(--primary-gradient)',
          "-webkit-background-clip": 'text',
          "background-clip": 'text',
          color: 'transparent',
        },
        '.scrollbar-gutter-stable': {
          "scrollbar-gutter": "stable",
        },
      })
    },
  ],
}
