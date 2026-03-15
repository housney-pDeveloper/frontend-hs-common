// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiClient = { get<T = any>(url: string, config?: any): Promise<{ data: T }>; post<T = any>(url: string, data?: any, config?: any): Promise<{ data: T }> }
import type { ServerResponse } from '../../types/api'
import type { PageDto } from '../../types/page'
import type {
  UpcomingSchedule,
  CalendarSchedule,
  ScheduleDetail,
  CalendarScheduleRequest,
} from '../../types/schedule'

type BuildApiUrl = (endpoint: string) => string

/**
 * 일정 Entity API Factory
 */
export const createScheduleApi = (client: ApiClient, buildUrl: BuildApiUrl) => ({
  async getUpcomingList(params?: { days?: number; limit?: number }): Promise<PageDto<UpcomingSchedule>> {
    const res = await client.post<ServerResponse<PageDto<UpcomingSchedule>>>(
      buildUrl('/schedule/getUpcomingList'),
      params ?? {}
    )
    return res.data.data!
  },

  async getCalendarList(params: CalendarScheduleRequest): Promise<PageDto<CalendarSchedule>> {
    const res = await client.post<ServerResponse<PageDto<CalendarSchedule>>>(
      buildUrl('/schedule/getCalendarList'),
      params
    )
    return res.data.data!
  },

  async getDetail(scheduleNo: number): Promise<ScheduleDetail> {
    const res = await client.post<ServerResponse<ScheduleDetail>>(
      buildUrl('/schedule/getDetail'),
      { scheduleNo }
    )
    return res.data.data!
  },
})
