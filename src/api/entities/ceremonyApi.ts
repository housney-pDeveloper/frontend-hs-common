import type { AxiosInstance } from 'axios'
import type { ServerResponse } from '../../types/api'
import type { PageDto } from '../../types/page'
import type {
  Ceremony,
  CeremonyDetail,
  CeremonyListRequest,
  CeremonyStatistics,
} from '../../types/ceremony'

type BuildApiUrl = (endpoint: string) => string

/**
 * 경조사 Entity API Factory
 */
export const createCeremonyApi = (client: AxiosInstance, buildUrl: BuildApiUrl) => ({
  async getList(params: CeremonyListRequest): Promise<PageDto<Ceremony>> {
    const res = await client.post<ServerResponse<PageDto<Ceremony>>>(
      buildUrl('/ceremony/getList'),
      params
    )
    return res.data.data!
  },

  async getDetail(ceremonyNo: number): Promise<CeremonyDetail> {
    const res = await client.post<ServerResponse<CeremonyDetail>>(
      buildUrl('/ceremony/getDetail'),
      { ceremonyNo }
    )
    return res.data.data!
  },

  async getStatistics(params?: { startDate?: string; endDate?: string }): Promise<CeremonyStatistics> {
    const res = await client.post<ServerResponse<CeremonyStatistics>>(
      buildUrl('/ceremony/getStatistics'),
      params ?? {}
    )
    return res.data.data!
  },
})
