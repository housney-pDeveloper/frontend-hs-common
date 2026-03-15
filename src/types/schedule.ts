/** 일정 */
export interface Schedule {
  scheduleNo: number
  relationshipNo?: number
  relationshipName?: string
  scheduleTypeCode: string
  title: string
  scheduleDate: string
  memo?: string
  repeatYn: string
  repeatCycleCode?: string
  alarmYn: string
  regDate: string
}

export interface ScheduleDetail extends Schedule {
  dday: number
  modDate: string
}

export interface CalendarSchedule {
  scheduleNo: number
  title: string
  scheduleDate: string
  scheduleTypeCode: string
  relationshipName?: string
  repeatYn: string
  alarmYn: string
}

export interface UpcomingSchedule {
  scheduleNo: number
  title: string
  scheduleDate: string
  scheduleTypeCode: string
  relationshipName?: string
  dday: number
}

export interface ScheduleListRequest {
  days?: number
  pageNumber?: number
  pageSize?: number
}

export interface CalendarScheduleRequest {
  yearMonth: string
  relationshipNo?: number
}

export interface CreateScheduleRequest {
  relationshipNo?: number
  scheduleTypeCode: string
  title: string
  scheduleDate: string
  memo?: string
  repeatYn?: string
  repeatCycleCode?: string
  alarmYn?: string
}

export interface UpdateScheduleRequest extends CreateScheduleRequest {
  scheduleNo: number
}

export const SCHEDULE_TYPE_OPTIONS = [
  { value: 'BIRTHDAY', label: '생일' },
  { value: 'ANNIVERSARY', label: '기념일' },
  { value: 'REMINDER', label: '리마인더' },
  { value: 'OTHER', label: '기타' },
] as const

export const SCHEDULE_TYPE_MAP: Record<string, string> = {
  BIRTHDAY: '생일',
  ANNIVERSARY: '기념일',
  REMINDER: '리마인더',
  OTHER: '기타',
}

export const REPEAT_CYCLE_OPTIONS = [
  { value: 'NONE', label: '반복 없음' },
  { value: 'YEARLY', label: '매년' },
  { value: 'MONTHLY', label: '매월' },
] as const
