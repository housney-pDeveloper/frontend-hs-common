/** 경조사 */
export interface Ceremony {
  ceremonyNo: number
  relationshipNo?: number
  relationshipName?: string
  ceremonyTypeCode: string
  title: string
  ceremonyDate: string
  location?: string
  amount: number
  directionCode: string
  attendYn: string
  memo?: string
  linkedRecordNo?: number
  regDate: string
}

export interface CeremonyDetail extends Ceremony {
  relationshipTypeNo?: number
  modDate: string
}

export interface CeremonyListRequest {
  relationshipNo?: number
  ceremonyTypeCode?: string
  directionCode?: string
  startDate?: string
  endDate?: string
  searchKeyword?: string
  sortBy?: string
  sortOrder?: string
  pageNumber?: number
  pageSize?: number
}

export interface CreateCeremonyRequest {
  relationshipNo?: number
  ceremonyTypeCode: string
  title: string
  ceremonyDate: string
  location?: string
  amount?: number
  directionCode?: string
  attendYn?: string
  memo?: string
  linkedRecordNo?: number
}

export interface UpdateCeremonyRequest extends CreateCeremonyRequest {
  ceremonyNo: number
}

export interface CeremonyTypeStat {
  ceremonyTypeCode: string
  count: number
  totalAmount: number
  percentage: number
}

export interface CeremonyStatistics {
  totalCount: number
  totalGivenAmount: number
  totalReceivedAmount: number
  typeStats: CeremonyTypeStat[]
}

export const CEREMONY_TYPE_OPTIONS = [
  { value: 'WEDDING', label: '결혼' },
  { value: 'FUNERAL', label: '장례' },
  { value: 'BIRTHDAY_PARTY', label: '돌잔치/생일' },
  { value: 'CELEBRATION', label: '축하' },
  { value: 'OTHER', label: '기타' },
] as const

export const CEREMONY_TYPE_MAP: Record<string, string> = {
  WEDDING: '결혼',
  FUNERAL: '장례',
  BIRTHDAY_PARTY: '돌잔치/생일',
  CELEBRATION: '축하',
  OTHER: '기타',
}
