/**
 * API 관련 공유 타입
 */

/**
 * API 엔드포인트 설정
 */
export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
}

/**
 * 서버 응답 형식 (admin-docs 기준)
 * code가 1이면 성공, 그 외는 에러
 * 
 * Gateway 에러 응답: { code, message, success: false }
 * Application 응답: { code, message, data: T | null }
 */
export interface ServerResponse<T = unknown> {
  code: number
  message: string
  data?: T | null // Application 응답
  success?: boolean // Gateway 에러 응답 (false인 경우 Gateway 에러)
}

/**
 * API 에러
 */
export interface ApiError {
  code: number | string
  message: string
  details?: unknown
  status?: number
}

/**
 * 공개키 응답
 */
export interface PublicKeyResponse {
  publicKey: string
  algorithm: string
  keySize: number
}

/**
 * API 요청 옵션 (공통)
 * 프로젝트별로 AxiosRequestConfig를 확장하여 사용
 */
export interface BaseApiRequestOptions {
  /** 에러 토스트 표시 여부 */
  showError?: boolean
  /** 로딩 표시 여부 */
  showLoading?: boolean
  /** 인증 토큰 사용 여부 */
  useAuth?: boolean
}

/**
 * 파일 업로드 진행률
 */
export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

/**
 * 페이지네이션 응답 타입
 */
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
