// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiClient = { get<T = any>(url: string, config?: any): Promise<{ data: T }>; post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }> }
import type { ServerResponse } from '../../types/api'
import type { PageDto } from '../../types/page'
import type { MemonRecord, RecordDetail, RecordListRequest } from '../../types/record'

type BuildApiUrl = (endpoint: string) => string

/**
 * 기록 Entity API Factory
 */
export const createRecordApi = (client: ApiClient, buildUrl: BuildApiUrl) => ({
  async getList(params: RecordListRequest): Promise<PageDto<MemonRecord>> {
    const res = await client.post<ServerResponse<PageDto<MemonRecord>>>(
      buildUrl('/record/getList'),
      params
    )
    return res.data.data!
  },

  async getRecentList(params?: { pageNumber?: number; pageSize?: number }): Promise<PageDto<MemonRecord>> {
    const res = await client.post<ServerResponse<PageDto<MemonRecord>>>(
      buildUrl('/record/getRecentList'),
      params ?? {}
    )
    return res.data.data!
  },

  async getDetail(recordNo: number): Promise<RecordDetail> {
    const res = await client.post<ServerResponse<RecordDetail>>(
      buildUrl('/record/getDetail'),
      { recordNo }
    )
    return res.data.data!
  },
})
