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
        // Title Typography (피그마 기준)
        'title-1': ['3.2rem', { lineHeight: '4.6rem', fontWeight: '600' }],  // 32px
        'title-2': ['3.2rem', { lineHeight: '4.6rem', fontWeight: '500' }],  // 32px
        'title-3': ['2.4rem', { lineHeight: '3.2rem', fontWeight: '600' }],  // 24px
        'title-4': ['2.0rem', { lineHeight: '3.0rem', fontWeight: '600' }],  // 20px
        'title-5': ['2.0rem', { lineHeight: '3.0rem', fontWeight: '500' }],  // 20px
        'title-6': ['1.8rem', { lineHeight: '2.8rem', fontWeight: '600' }],  // 18px
        'title-7': ['1.8rem', { lineHeight: '2.8rem', fontWeight: '500' }],  // 18px
        'title-8': ['1.6rem', { lineHeight: '2.8rem', fontWeight: '600' }],  // 16px
        
        // Body Typography (피그마 기준)
        'body-1': ['1.6rem', { lineHeight: '2.8rem', fontWeight: '500' }],   // 16px
        'body-2': ['1.6rem', { lineHeight: '2.8rem', fontWeight: '400' }],   // 16px
        'body-3': ['1.4rem', { lineHeight: '2.0rem', fontWeight: '600' }],   // 14px
        'body-4': ['1.4rem', { lineHeight: '2.0rem', fontWeight: '500' }],   // 14px
        'body-5': ['1.4rem', { lineHeight: '2.0rem', fontWeight: '400' }],   // 14px
        'body-6': ['1.2rem', { lineHeight: '2.0rem', fontWeight: '600' }],   // 12px
        'body-7': ['1.2rem', { lineHeight: '2.0rem', fontWeight: '500' }],   // 12px
        'body-8': ['1.2rem', { lineHeight: '2.0rem', fontWeight: '400' }],   // 12px

        //모바일 버전 별도
        'm-1': ['2.6rem', { lineHeight: '3.8rem', fontWeight: '600' }],
        'm-2': ['2.0rem', { lineHeight: '3.0rem', fontWeight: '600' }],
        'm-3': ['2.0rem', { lineHeight: '3.0rem', fontWeight: '500' }],
        'm-4': ['1.8rem', { lineHeight: '2.8rem', fontWeight: '600' }],
        'm-5': ['1.8rem', { lineHeight: '2.8rem', fontWeight: '500' }],
        'm-6': ['1.6rem', { lineHeight: '2.8rem', fontWeight: '600' }],
        'm-7': ['1.6rem', { lineHeight: '2.8rem', fontWeight: '500' }],
        'm-8': ['1.6rem', { lineHeight: '2.8rem', fontWeight: '400' }],
        'm-9': ['1.4rem', { lineHeight: '2.4rem', fontWeight: '600' }],
        'm-10': ['1.4rem', { lineHeight: '2.4rem', fontWeight: '500' }],
        'm-11': ['1.4rem', { lineHeight: '2.4rem', fontWeight: '400' }],
        'm-12': ['1.2rem', { lineHeight: '2.4rem', fontWeight: '400' }], 
      },
      // spacing: 높이, 너비, 패딩, 마진, gap 등 모든 spacing 속성에 적용
      // 0-100 값에 대해 rem 기반 spacing (1 = 0.1rem = 1px at 10px base)
      spacing: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => {
          const value = i / 10;
          return [i, value % 1 === 0 ? `${value}rem` : `${value.toFixed(1)}rem`];
        })
      ),
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 0.4rem)',
        sm: 'calc(var(--radius) - 0.4rem)'
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
