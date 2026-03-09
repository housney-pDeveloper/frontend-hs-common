# @hs/common

HS 프로젝트 공통 패키지 - webAdmin과 appUser에서 공유하는 코드

**의존성 없음**: hs-common에는 `dependencies`/`devDependencies`가 없습니다. 공통 컴포넌트·유틸·타입·스타일만 포함하며, `jsencrypt` 등 필요한 라이브러리는 **호스트 프로젝트(webAdmin, appUser)**의 `package.json`에 두고 빌드 시 함께 사용합니다. hs-common 폴더에서 `npm install`은 하지 않아도 됩니다.

## 구조

```
hs-common/
├── src/
│   ├── api/              # API 유틸리티
│   │   ├── config.ts     # API 설정 (buildApiUrl 등)
│   │   ├── constants.ts  # 에러 코드, 응답 코드
│   │   ├── crypto.ts     # RSA 암호화
│   │   ├── error-utils.ts # 에러 파싱 유틸
│   │   └── index.ts
│   ├── tokens/           # 디자인 토큰 (플랫폼 중립)
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   ├── types/            # 공유 타입
│   │   ├── api.ts
│   │   └── common.ts
│   ├── tailwind/         # Tailwind 프리셋
│   │   └── preset.js
│   ├── styles/           # CSS 파일
│   │   ├── variables.css
│   │   └── base.css
│   └── index.ts
├── package.json
└── tsconfig.json
```

## 사용 방법

### 프로젝트에 추가

```bash
# webAdmin 레포에서
cd webAdmin
git clone -b [branch name] http://dev.fingate.kr:9418/platform/ef/frontend/hs-common.git hs-common

# appUser 레포에서
cd appUser
git clone -b [branch name] http://dev.fingate.kr:9418/platform/ef/frontend/hs-common.git hs-common
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

### 에러 코드 & 메시지

```typescript
import { API_ERROR_CODES, getErrorMessage } from '@hs/common/api'

// 에러 코드 확인
if (error.code === API_ERROR_CODES.JWT_TOKEN_EXPIRED) {
  // 토큰 만료 처리
}

// 에러 메시지 가져오기
const message = getErrorMessage(error.code)
```

### API URL 빌더

```typescript
import { createApiConfig } from '@hs/common/api'

// hs-admin (web)
const apiConfig = createApiConfig({ clientType: 'web', version: 'v1' })
apiConfig.buildUrl('/login') // => '/web/v1/login'

// hs-app (app)
const apiConfig = createApiConfig({ clientType: 'app', version: 'v1' })
apiConfig.buildUrl('/login') // => '/app/v1/login'
```

### RSA 암호화

```typescript
import { setPublicKey, encryptWithPublicKey } from '@hs/common/api'

// 공개키 설정 (로그인 전 서버에서 받아옴)
setPublicKey(publicKeyFromServer)

// 비밀번호 암호화
const encryptedPassword = encryptWithPublicKey(plainPassword)
```

### 에러 파싱

```typescript
import { parseApiError, getApiErrorMessage } from '@hs/common/api'

try {
  await apiCall()
} catch (error) {
  const { code, message } = parseApiError(error, '기본 에러 메시지')
  toast.error(message)
}
```

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
| API 에러 코드/메시지 | Axios 인스턴스 (ENV 다름) |
| API 타입 | UI 컴포넌트 (플랫폼 다름) |
| Tailwind 프리셋 | hooks (비즈니스 로직 다름) |
| CSS 변수 | 프로젝트별 config |
| RSA 암호화 유틸 | 인증 스토어 |

### 플랫폼 고려

- webAdmin: React Web (shadcn/ui)
- appUser: React Web → React Native 전환 예정 (순수 Tailwind)

## 업데이트 방법

```bash
# hs-common 레포에서 수정 후
git add .
git commit -m "Update shared types"
git push

# webAdmin에서 업데이트
cd webAdmin/hs-common
git pull
cd ..

# appUser에서 업데이트
cd appUser/hs-common
git pull
cd ..
```
