// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiClient = { get<T = any>(url: string, config?: any): Promise<{ data: T }>; post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }> }
import type { ServerResponse } from '../../types/api'
import type {
  GetAmountRequest,
  GetAmountResponse,
  GetInflationRequest,
  GetInflationResponse,
  TrendInsight,
} from '../../types/recommendation'

type BuildApiUrl = (endpoint: string) => string

/**
 * 추천 Entity API Factory
 */
export const createRecommendationApi = (client: ApiClient, buildUrl: BuildApiUrl) => ({
  async getAmount(params: GetAmountRequest): Promise<GetAmountResponse> {
    const res = await client.post<ServerResponse<GetAmountResponse>>(
      buildUrl('/recommendation/getAmount'),
      params
    )
    return res.data.data!
  },

  async getInflationValue(params: GetInflationRequest): Promise<GetInflationResponse> {
    const res = await client.post<ServerResponse<GetInflationResponse>>(
      buildUrl('/recommendation/getInflationValue'),
      params
    )
    return res.data.data!
  },

  async getTrend(params?: { recommendationType?: string; year?: number }): Promise<TrendInsight> {
    const res = await client.post<ServerResponse<TrendInsight>>(
      buildUrl('/recommendation/getTrend'),
      params ?? {}
    )
    return res.data.data!
  },
})
