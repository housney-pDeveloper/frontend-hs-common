// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiClient = { get<T = any>(url: string, config?: any): Promise<{ data: T }>; post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }> }
import type { ServerResponse } from '../../types/api'
import type {
  HomeSummary,
  HomeInsight,
  MonthlyTrend,
  TypeDistribution,
} from '../../types/dashboard'

type BuildApiUrl = (endpoint: string) => string

/**
 * 대시보드 Entity API Factory
 */
export const createDashboardApi = (client: ApiClient, buildUrl: BuildApiUrl) => ({
  async getHomeSummary(): Promise<HomeSummary> {
    const res = await client.post<ServerResponse<HomeSummary>>(
      buildUrl('/dashboard/getHomeSummary')
    )
    return res.data.data!
  },

  async getHomeInsight(): Promise<HomeInsight> {
    const res = await client.post<ServerResponse<HomeInsight>>(
      buildUrl('/insight/getHomeInsight')
    )
    return res.data.data!
  },

  async getMonthlyTrend(months = 6): Promise<MonthlyTrend[]> {
    const res = await client.post<ServerResponse<MonthlyTrend[]>>(
      buildUrl('/statistics/getMonthlyTrend'),
      { months }
    )
    return res.data.data ?? []
  },

  async getRecordTypeDistribution(params?: { startDate?: string; endDate?: string }): Promise<TypeDistribution[]> {
    const res = await client.post<ServerResponse<TypeDistribution[]>>(
      buildUrl('/statistics/getRecordTypeDistribution'),
      params ?? {}
    )
    return res.data.data ?? []
  },

  async getRelationshipTypeDistribution(params?: { startDate?: string; endDate?: string }): Promise<TypeDistribution[]> {
    const res = await client.post<ServerResponse<TypeDistribution[]>>(
      buildUrl('/statistics/getRelationshipTypeDistribution'),
      params ?? {}
    )
    return res.data.data ?? []
  },
})
