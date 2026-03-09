# @hs/common

MEMON 프론트엔드 공통 패키지 - webadmin과 appuser에서 공유하는 코드

**의존성 없음**: hs-common에는 `dependencies`/`devDependencies`가 없습니다. 공통 유틸·타입·스타일만 포함하며, `jsencrypt` 등 필요한 라이브러리는 **호스트 프로젝트(webadmin, appuser)**의 `package.json`에 두고 빌드 시 함께 사용합니다. hs-common 폴더에서 `npm install`은 하지 않아도 됩니다.

## 구조

```
hs-common/
├── src/
│   ├── api/              # API 유틸리티
│   │   ├── config.ts     # API 설정 (buildApiUrl, createApiConfig)
│   │   ├── constants.ts  # 응답 코드 (API_RESPONSE_CODES)
│   │   ├── error-utils.ts # 에러 파싱 유틸 (parseApiError, getApiErrorMessage)
│   │   └── index.ts
│   ├── tokens/           # 디자인 토큰 (플랫폼 중립)
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── types/            # 공유 타입
│   │   ├── api.ts
│   │   ├── common.ts
│   │   └── index.ts
│   ├── tailwind/         # Tailwind 프리셋
│   │   └── preset.js
│   ├── styles/           # CSS 파일
│   │   ├── variables.css
│   │   ├── base.css
│   │   └── index.ts
│   └── index.ts
└── tsconfig.json
```

## 사용 방법

### 프로젝트에 추가

이 저장소는 Git Submodule로 워크스페이스에 포함되어 있습니다.

```bash
# 워크스페이스 클론 시 서브모듈 포함
git clone --recurse-submodules <workspace-repository-url>

# 또는 기존 클론 후 서브모듈 초기화
git submodule update --init --recursive
```

### TypeScript 경로 설정

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@hs/common": ["./hs-common/src/index.ts"],
      "@hs/common/*": ["./hs-common/src/*"]
    }
  }
}
```

### Vite 경로 설정

`vite.config.ts`:
```typescript
resolve: {
  alias: {
    '@hs/common': path.resolve(__dirname, './hs-common/src'),
  },
},
```

## API 유틸리티

### API URL 빌더

```typescript
import { buildApiUrl, createApiConfig } from '@hs/common/api'

// 직접 사용
buildApiUrl('/login', { clientType: 'web', version: 'v1' }) // => '/web/v1/login'

// 팩토리 패턴 (프로젝트별 래핑)
// webadmin
const apiConfig = createApiConfig({ clientType: 'web', version: 'v1' })
apiConfig.buildUrl('/login') // => '/web/v1/login'

// appuser
const apiConfig = createApiConfig({ clientType: 'app', version: 'v1' })
apiConfig.buildUrl('/login') // => '/app/v1/login'
```

### 에러 파싱

```typescript
import { parseApiError, getApiErrorMessage } from '@hs/common/api'

try {
  await apiCall()
} catch (error) {
  // 에러 코드 + 메시지 추출
  const { code, message } = parseApiError(error, '기본 에러 메시지')
  toast.error(message)

  // 메시지만 필요한 경우
  const message = getApiErrorMessage(error, '작업에 실패했습니다.')
}
```

**참고**: 에러 메시지는 서버가 내려준 `message`를 그대로 사용합니다. 프론트에서 코드별 메시지를 매핑하지 않습니다.

## Tailwind 프리셋

### 프리셋 사용

`tailwind.config.js`:
```javascript
import hsPreset from './hs-common/src/tailwind/preset.js'

export default {
  presets: [hsPreset],
  content: [...],
  // 프로젝트별 확장
  theme: {
    extend: {
      // 프로젝트 전용 설정
    }
  }
}
```

### CSS 변수

프로젝트 `index.css`에서 import:
```css
/* CSS 변수 (colors, radius 등) */
@import './hs-common/src/styles/variables.css';

/* 폰트 정의 */
@import './hs-common/src/styles/base.css';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 공유 타입

### API 타입

```typescript
import type { ServerResponse, ApiError, PaginatedResponse } from '@hs/common/types'

interface MyResponse {
  data: ServerResponse<User>
}
```

### 공통 엔티티

```typescript
import type { BaseEntity, Coordinates, Location } from '@hs/common/types'

interface Event extends BaseEntity {
  location: Location
}
```

## 디자인 토큰

### Colors
```typescript
import { colors } from '@hs/common/tokens'

colors.primary       // '#11C5A7'
colors.background    // '#FFFFFF'
colors.foreground    // '#1A1A1A'
```

### Typography
```typescript
import { typography, textStyles } from '@hs/common/tokens'

typography.fontFamily.sans  // 'Pretendard, sans-serif'
textStyles.title1           // { fontSize: 32, lineHeight: 46, fontWeight: 600 }
```

## 설계 원칙

### 공유 범위

| 공유해야 하는 것 | 공유하지 말 것 |
|-----------------|---------------|
| API URL 빌더/에러 파싱 | Axios 인스턴스 (ENV 다름) |
| API 타입 | UI 컴포넌트 (플랫폼 다름) |
| Tailwind 프리셋 | hooks (비즈니스 로직 다름) |
| CSS 변수 | 프로젝트별 config |
| 디자인 토큰 | 인증 스토어 |

### 플랫폼 고려

- webadmin: React Web (shadcn/ui)
- appuser: React Web → React Native 전환 예정 (순수 Tailwind)

## 업데이트 방법

```bash
# 워크스페이스에서 서브모듈 업데이트
git submodule update --remote 21_hs-common
```
