// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiClient = { get<T = any>(url: string, config?: any): Promise<{ data: T }>; post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }> }
import type { ServerResponse } from '../../types/api'
import type { GetBudgetStatusRequest, BudgetStatus, SaveBudgetRequest } from '../../types/budget'

type BuildApiUrl = (endpoint: string) => string

/**
 * 예산 Entity API Factory
 */
export const createBudgetApi = (client: ApiClient, buildUrl: BuildApiUrl) => ({
  async getStatus(params: GetBudgetStatusRequest): Promise<BudgetStatus> {
    const res = await client.post<ServerResponse<BudgetStatus>>(
      buildUrl('/budget/getStatus'),
      params
    )
    return res.data.data!
  },

  async save(params: SaveBudgetRequest): Promise<void> {
    await client.post<ServerResponse<void>>(buildUrl('/budget/save'), params)
  },

  async deleteBudget(budgetNo: number): Promise<void> {
    await client.post<ServerResponse<void>>(buildUrl('/budget/delete'), { budgetNo })
  },
})
