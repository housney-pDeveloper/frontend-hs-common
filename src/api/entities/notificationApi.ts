// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiClient = { get<T = any>(url: string, config?: any): Promise<{ data: T }>; post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }> }
import type { ServerResponse } from '../../types/api'
import type { NotificationItem } from '../../types/notification'

type BuildApiUrl = (endpoint: string) => string

/** REST 알림 목록 응답 */
export interface NotificationListResponse {
  items: NotificationItem[]
  count: number
  hasMore: boolean
  lastEventId: string | null
  /** 전체 미읽음 개수 (배지 표시용, 페이지네이션과 무관) */
  totalUnreadCount?: number
}

/**
 * 알림 목록 REST API Factory (초기 로드용)
 * - 앱 로드·새로고침 시 호출하여 store 세팅
 * - WebSocket은 실시간 푸시만 담당
 */
export const createNotificationApi = (client: ApiClient, buildUrl: BuildApiUrl) => ({
  async getList(params: { limit?: number; afterId?: string } = {}): Promise<NotificationListResponse> {
    const queryParams = new URLSearchParams()
    if (params.limit) queryParams.set('limit', String(params.limit))
    if (params.afterId) queryParams.set('afterId', params.afterId)

    const url = buildUrl('/notifications')
    const queryString = queryParams.toString()
    const fullUrl = queryString ? `${url}?${queryString}` : url

    const response = await client.get<ServerResponse<NotificationListResponse>>(fullUrl)
    return response.data.data!
  },
})
