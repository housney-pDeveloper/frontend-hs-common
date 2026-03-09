/**
 * 클라이언트 타입
 * - 'app': 모바일 앱
 * - 'web': 웹 애플리케이션
 */
export type ClientType = 'app' | 'web'

/**
 * API 버전
 */
export type ApiVersion = 'v1' | 'v2'

/**
 * API 설정 인터페이스
 */
export interface ApiConfig {
  clientType: ClientType
  version: ApiVersion
}

/**
 * Gateway 패턴 URL 생성
 * 
 * @param endpoint API 엔드포인트 (예: '/login', '/auth/getPublicKey')
 * @param config API 설정 (clientType, version)
 * @returns Gateway URL (예: '/web/v1/login', '/app/v1/login')
 * 
 * @example
 * buildApiUrl('/login', { clientType: 'web', version: 'v1' }) // => '/web/v1/login'
 * buildApiUrl('/auth/getPublicKey', { clientType: 'app', version: 'v1' }) // => '/app/v1/auth/getPublicKey'
 */
export const buildApiUrl = (endpoint: string, config: ApiConfig): string => {
  // 슬래시로 시작하지 않으면 추가
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  
  // admin-docs 기준 Gateway 패턴: /{clientType}/{version}/{endpoint}
  // 예: /web/v1/login, /app/v1/signup/insClient
  return `/${config.clientType}/${config.version}${normalizedEndpoint}`
}

/**
 * API 설정 팩토리 함수
 * 프로젝트별로 clientType을 고정하고 buildApiUrl을 간편하게 사용
 * 
 * @param defaultConfig 기본 API 설정
 * @returns buildApiUrl 래퍼 함수
 * 
 * @example
 * // hs-admin에서
 * const { buildUrl } = createApiConfig({ clientType: 'web', version: 'v1' })
 * buildUrl('/login') // => '/web/v1/login'
 * 
 * // hs-app에서
 * const { buildUrl } = createApiConfig({ clientType: 'app', version: 'v1' })
 * buildUrl('/login') // => '/app/v1/login'
 */
export const createApiConfig = (defaultConfig: ApiConfig) => {
  return {
    config: defaultConfig,
    buildUrl: (endpoint: string, overrideConfig?: Partial<ApiConfig>) => {
      return buildApiUrl(endpoint, { ...defaultConfig, ...overrideConfig })
    },
  }
}
