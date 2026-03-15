// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiClient = { get<T = any>(url: string, config?: any): Promise<{ data: T }>; post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }> }
import type { ServerResponse } from '../../types/api'
import type {
  MonthlyTrend,
  RecordTypeDistribution,
  RelationshipTypeDistribution,
  TopFrequent,
} from '../../types/statistics'

type BuildApiUrl = (endpoint: string) => string

/**
 * 통계 Entity API Factory
 */
export const createStatisticsApi = (client: ApiClient, buildUrl: BuildApiUrl) => ({
  async getMonthlyTrend(months = 6): Promise<MonthlyTrend[]> {
    const res = await client.post<ServerResponse<MonthlyTrend[]>>(
      buildUrl('/statistics/getMonthlyTrend'),
      { months }
    )
    return res.data.data ?? []
  },

  async getRecordTypeDistribution(params?: { startDate?: string; endDate?: string }): Promise<RecordTypeDistribution[]> {
    const res = await client.post<ServerResponse<RecordTypeDistribution[]>>(
      buildUrl('/statistics/getRecordTypeDistribution'),
      params ?? {}
    )
    return res.data.data ?? []
  },

  async getRelationshipTypeDistribution(params?: { startDate?: string; endDate?: string }): Promise<RelationshipTypeDistribution[]> {
    const res = await client.post<ServerResponse<RelationshipTypeDistribution[]>>(
      buildUrl('/statistics/getRelationshipTypeDistribution'),
      params ?? {}
    )
    return res.data.data ?? []
  },

  async getTopFrequent(params?: {
    targetType?: string
    startDate?: string
    endDate?: string
    limit?: number
  }): Promise<TopFrequent[]> {
    const res = await client.post<ServerResponse<TopFrequent[]>>(
      buildUrl('/statistics/getTopFrequent'),
      params ?? {}
    )
    return res.data.data ?? []
  },
})
