// API 상수 (에러 메시지는 서버 응답 message 사용)
export { API_RESPONSE_CODES } from './constants'

// API 설정
export {
  type ClientType,
  type ApiVersion,
  type ApiConfig,
  buildApiUrl,
  createApiConfig,
} from './config'

// 에러 처리 유틸리티
export {
  parseApiError,
  getApiErrorMessage,
} from './error-utils'

// Entity API Factories
export {
  createAuthApi,
  createCeremonyApi,
  createCommonCodeApi,
  createDashboardApi,
  createNotificationApi,
  createRecordApi,
  createRelationshipApi,
  createScheduleApi,
  createStatisticsApi,
} from './entities'

export type {
  GetCommonCodeListRequest,
  GetCommonCodeListResponse,
  SaveCommonCodeRequest,
  GetCommonCodeAllRequest,
  CommonCodeAllResponse,
  NotificationListResponse,
} from './entities'