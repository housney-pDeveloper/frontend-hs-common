// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiClient = { get<T = any>(url: string, config?: any): Promise<{ data: T }>; post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }> }
import type { ServerResponse } from '../../types/api'
import type { CommonCodeType, CommonCodeItem } from '../../types/commonCode'

type BuildApiUrl = (endpoint: string) => string

export interface GetCommonCodeListRequest {
  clientNo: number
  codeType: CommonCodeType
}

export interface GetCommonCodeListResponse {
  list: CommonCodeItem[]
}

export interface SaveCommonCodeRequest {
  clientNo: number
  codeType: CommonCodeType
  list: CommonCodeItem[]
}

/** 전체 공통코드 요청 (앱 로드 시 1회 조회 - 조직별) */
export interface GetCommonCodeAllRequest {
  clientNo: number
}

/** 전체 공통코드 응답 (앱 로드 시 1회 조회) */
export type CommonCodeAllResponse = Record<CommonCodeType, CommonCodeItem[]>

/**
 * 공통코드 API Factory
 * POST /commonCode/getAll (앱 로드 1회), /commonCode/getList, /commonCode/save
 * clientNo: 조직별 공통코드 분리 (직급·직책 등은 조직마다 다름)
 */
export const createCommonCodeApi = (client: ApiClient, buildUrl: BuildApiUrl) => ({
  async getAll(params: GetCommonCodeAllRequest): Promise<CommonCodeAllResponse> {
    const response = await client.post<ServerResponse<CommonCodeAllResponse>>(
      buildUrl('/commonCode/getAll'),
      params
    )
    return response.data.data!
  },

  async getList(data: GetCommonCodeListRequest): Promise<GetCommonCodeListResponse> {
    const response = await client.post<ServerResponse<GetCommonCodeListResponse>>(
      buildUrl('/commonCode/getList'),
      data
    )
    return response.data.data!
  },

  async save(data: SaveCommonCodeRequest): Promise<void> {
    await client.post<ServerResponse<null>>(
      buildUrl('/commonCode/save'),
      data
    )
  },
})
