import type { AxiosInstance } from 'axios'
import type { ServerResponse } from '../../types/api'
import type { MeResponse, OrgnzSelectionResponse } from '../../types/auth'

type BuildApiUrl = (endpoint: string) => string

/**
 * 인증 Entity API Factory (Read-only)
 * Write 작업(login, signup 등)은 features/auth. 구성원 초대(sendInvite)는 features/group.
 */
export const createAuthApi = (client: AxiosInstance, buildUrl: BuildApiUrl) => ({
  /** GET /auth/me - 토큰 기반 사용자·조직 정보 조회 (정보 갱신·권한 재확인 등) */
  async getMe(): Promise<MeResponse> {
    const response = await client.get<ServerResponse<MeResponse>>(
      buildUrl('/auth/me')
    )
    return response.data.data!
  },

  /** POST /organization/getOrgSelection - 소속 조직 목록 조회 (가입 + 초대 목록) */
  async getOrgnzSelection(userNo: number): Promise<OrgnzSelectionResponse> {
    const params = { userNo }
    const response = await client.post<ServerResponse<OrgnzSelectionResponse>>(
      buildUrl('/organization/getOrgSelection'),
      params
    )
    return response.data.data!
  },
})
