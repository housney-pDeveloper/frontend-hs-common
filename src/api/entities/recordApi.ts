import type { AxiosInstance } from 'axios'
import type { ServerResponse } from '../../types/api'
import type { PageDto } from '../../types/page'
import type { Record, RecordDetail, RecordListRequest } from '../../types/record'

type BuildApiUrl = (endpoint: string) => string

/**
 * 기록 Entity API Factory
 */
export const createRecordApi = (client: AxiosInstance, buildUrl: BuildApiUrl) => ({
  async getList(params: RecordListRequest): Promise<PageDto<Record>> {
    const res = await client.post<ServerResponse<PageDto<Record>>>(
      buildUrl('/record/getList'),
      params
    )
    return res.data.data!
  },

  async getRecentList(params?: { pageNumber?: number; pageSize?: number }): Promise<PageDto<Record>> {
    const res = await client.post<ServerResponse<PageDto<Record>>>(
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
