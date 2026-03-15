import type { AxiosInstance } from 'axios'
import type { ServerResponse } from '../../types/api'
import type { PageDto } from '../../types/page'
import type {
  Relationship,
  RelationshipDetail,
  RelationshipListRequest,
  RelationshipOption,
} from '../../types/relationship'

type BuildApiUrl = (endpoint: string) => string

/**
 * 관계 Entity API Factory
 */
export const createRelationshipApi = (client: AxiosInstance, buildUrl: BuildApiUrl) => ({
  async getList(params: RelationshipListRequest): Promise<PageDto<Relationship>> {
    const res = await client.post<ServerResponse<PageDto<Relationship>>>(
      buildUrl('/relationship/getList'),
      params
    )
    return res.data.data!
  },

  async getDetail(relationshipNo: number): Promise<RelationshipDetail> {
    const res = await client.post<ServerResponse<RelationshipDetail>>(
      buildUrl('/relationship/getDetail'),
      { relationshipNo }
    )
    return res.data.data!
  },

  async getOptionList(): Promise<RelationshipOption[]> {
    const res = await client.post<ServerResponse<RelationshipOption[]>>(
      buildUrl('/relationship/getOptionList'),
      {}
    )
    return res.data.data ?? []
  },
})
