/** 기록 */
export interface MemonRecord {
  recordNo: number
  relationshipNo: number
  relationshipName: string
  recordTypeCode: string
  recordDate: string
  amount: number
  directionCode: string
  hostTypeCode?: string
  memo?: string
  regDate: string
}

export interface RecordDetail extends MemonRecord {
  relationshipTypeNo: number
  modDate: string
}

export interface RecordListRequest {
  relationshipNo?: number
  recordTypeCode?: string
  directionCode?: string
  startDate?: string
  endDate?: string
  searchKeyword?: string
  sortBy?: string
  sortOrder?: string
  pageNumber?: number
  pageSize?: number
}

export interface CreateRecordRequest {
  relationshipNo: number
  recordTypeCode: string
  recordDate: string
  amount?: number
  directionCode?: string
  hostTypeCode?: string
  memo?: string
}

export interface UpdateRecordRequest extends CreateRecordRequest {
  recordNo: number
}

export const RECORD_TYPE_OPTIONS = [
  { value: 'WEDDING', label: '결혼' },
  { value: 'FUNERAL', label: '장례' },
  { value: 'BIRTHDAY', label: '생일/기념일' },
  { value: 'ANNIVERSARY', label: '기념일' },
  { value: 'OTHER', label: '기타' },
] as const

export const RECORD_TYPE_MAP: Record<string, string> = {
  WEDDING: '결혼',
  FUNERAL: '장례',
  BIRTHDAY: '생일',
  ANNIVERSARY: '기념일',
  OTHER: '기타',
}

export const DIRECTION_OPTIONS = [
  { value: 'GIVEN', label: '보낸' },
  { value: 'RECEIVED', label: '받은' },
] as const

export const DIRECTION_MAP: Record<string, string> = {
  GIVEN: '보낸',
  RECEIVED: '받은',
}

export const HOST_TYPE_OPTIONS = [
  { value: 'SELF', label: '본인' },
  { value: 'OTHER', label: '타인' },
] as const

export const HOST_TYPE_MAP: Record<string, string> = {
  SELF: '본인',
  OTHER: '타인',
}
