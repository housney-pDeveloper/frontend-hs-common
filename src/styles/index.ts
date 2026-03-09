/**
 * @hs/common 스타일 관련 export
 * 
 * CSS 파일들은 직접 import하여 사용하세요:
 * - @import './hs-common/src/styles/variables.css';
 * - @import './hs-common/src/styles/base.css';
 * 
 * Tailwind 프리셋은 tailwind.config.js에서 import:
 * - import hsPreset from './hs-common/src/tailwind/preset.js';
 */

// CSS 파일 경로 상수 (참조용)
export const STYLE_PATHS = {
  variables: './hs-common/src/styles/variables.css',
  base: './hs-common/src/styles/base.css',
} as const

// Tailwind 프리셋 경로
export const TAILWIND_PRESET_PATH = './hs-common/src/tailwind/preset.js'
