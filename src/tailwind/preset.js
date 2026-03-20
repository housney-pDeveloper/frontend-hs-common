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
        'title-1': ['38px', { lineHeight: '54px', fontWeight: '600' }],
        'title-2': ['38px', { lineHeight: '54px', fontWeight: '500' }],
        'title-3': ['28px', { lineHeight: '38px', fontWeight: '600' }],
        'title-4': ['24px', { lineHeight: '34px', fontWeight: '600' }],
        'title-5': ['24px', { lineHeight: '34px', fontWeight: '500' }],
        'title-6': ['21px', { lineHeight: '32px', fontWeight: '600' }],
        'title-7': ['21px', { lineHeight: '32px', fontWeight: '500' }],
        'title-8': ['19px', { lineHeight: '30px', fontWeight: '600' }],

        // Body Typography (px 기반)
        'body-1': ['19px', { lineHeight: '30px', fontWeight: '500' }],
        'body-2': ['19px', { lineHeight: '30px', fontWeight: '400' }],
        'body-3': ['17px', { lineHeight: '26px', fontWeight: '600' }],
        'body-4': ['17px', { lineHeight: '26px', fontWeight: '500' }],
        'body-5': ['17px', { lineHeight: '26px', fontWeight: '400' }],
        'body-6': ['15px', { lineHeight: '24px', fontWeight: '600' }],
        'body-7': ['15px', { lineHeight: '24px', fontWeight: '500' }],
        'body-8': ['15px', { lineHeight: '24px', fontWeight: '400' }],

        // 모바일 버전
        'm-1': ['30px', { lineHeight: '44px', fontWeight: '600' }],
        'm-2': ['24px', { lineHeight: '34px', fontWeight: '600' }],
        'm-3': ['24px', { lineHeight: '34px', fontWeight: '500' }],
        'm-4': ['21px', { lineHeight: '32px', fontWeight: '600' }],
        'm-5': ['21px', { lineHeight: '32px', fontWeight: '500' }],
        'm-6': ['19px', { lineHeight: '30px', fontWeight: '600' }],
        'm-7': ['19px', { lineHeight: '30px', fontWeight: '500' }],
        'm-8': ['19px', { lineHeight: '30px', fontWeight: '400' }],
        'm-9': ['17px', { lineHeight: '28px', fontWeight: '600' }],
        'm-10': ['17px', { lineHeight: '28px', fontWeight: '500' }],
        'm-11': ['17px', { lineHeight: '28px', fontWeight: '400' }],
        'm-12': ['15px', { lineHeight: '28px', fontWeight: '400' }],

        // UI Typography
        'caption': ['11px', { lineHeight: '16px', fontWeight: '500' }],
        'sm': ['13px', { lineHeight: '20px', fontWeight: '400' }],
        'stat': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'page-title': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'section-title': ['15px', { lineHeight: '22px', fontWeight: '600' }],
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
        surface: 'var(--surface)',
        foreground: 'var(--foreground)',
        'muted-foreground': 'var(--muted-foreground)',
        placeholder: 'var(--placeholder)',
        border: 'var(--border)',
        'border-light': 'var(--border-light)',
        'row-hover': 'var(--row-hover)',
        'row-zebra': 'var(--row-zebra)',
        'row-selected': 'var(--row-selected)',
        destructive: 'var(--destructive)',
        info: 'var(--info)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          light: 'var(--primary-light)',
          foreground: 'var(--primary-foreground)',
        },
        ring: 'var(--ring)',
        input: 'var(--input)',
        disabled: {
          DEFAULT: 'var(--disabled)',
          foreground: 'var(--disabled-foreground)',
        },
        muted: {
          DEFAULT: 'var(--surface)',
          foreground: 'var(--muted-foreground)',
        },
        popover: {
          DEFAULT: 'var(--background)',
          foreground: 'var(--foreground)',
        },
        accent: {
          DEFAULT: 'var(--row-hover)',
          foreground: 'var(--foreground)',
        },
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
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-gutter-stable': {
          "scrollbar-gutter": "stable",
        },
      })
    },
  ],
}
