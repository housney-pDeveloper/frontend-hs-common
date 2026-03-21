export interface RelationshipTagInfo {
  tagNo: number
  tagName: string
  tagColor: string
}

export interface RelationshipTypeInfo {
  relationshipTypeNo: number
  typeName: string
  typeColor: string
  sortOrder: number
  relationshipCount: number
}

export interface RelationshipByTag {
  relationshipNo: number
  relationshipName: string
  relationshipTypeNo: number
  phoneNo?: string
}

export interface Relationship {
  relationshipNo: number
  relationshipName: string
  relationshipTypeNo: number
  typeName: string
  typeColor: string
  phoneNo?: string
  memo?: string
  birthday?: string
  firstMetYear?: number
  tags?: RelationshipTagInfo[]
  regDate: string
  totalRecordCount?: number
  totalGivenAmount?: number
  totalReceivedAmount?: number
  lastRecordDate?: string
  upcomingScheduleYn?: string
}

export interface RelationshipDetail extends Relationship {
  anniversaries: RelationshipAnniversary[]
  tags: RelationshipTagInfo[]
  recentRecords: RelationshipRecentRecord[]
  upcomingSchedules: RelationshipUpcomingSchedule[]
}

export interface RelationshipAnniversary {
  anniversaryNo: number
  anniversaryDate: string
  title: string
  memo?: string
}

export interface RelationshipTagSummary {
  tagNo: number
  tagName: string
  tagColor: string
  relationshipCount: number
}

export interface RelationshipRecentRecord {
  recordNo: number
  recordTypeCode: string
  recordDate: string
  amount: number
  directionCode: string
}

export interface RelationshipUpcomingSchedule {
  scheduleNo: number
  title: string
  scheduleDate: string
  dday: number
}

export interface RelationshipOption {
  relationshipNo: number
  relationshipName: string
  relationshipTypeNo: number
  typeName: string
}

export interface RelationshipListRequest {
  searchKeyword?: string
  relationshipTypeNo?: number
  sortBy?: string
  sortOrder?: string
  pageNumber?: number
  pageSize?: number
}

export interface CreateRelationshipRequest {
  relationshipName: string
  relationshipTypeNo: number
  phoneNo?: string
  memo?: string
  birthday?: string
  firstMetYear?: number
  anniversaries?: { anniversaryDate: string; title: string; memo?: string }[]
  tags?: { tagName: string; tagColor: string }[]
}

export interface UpdateRelationshipRequest extends CreateRelationshipRequest {
  relationshipNo: number
}

export const SORT_OPTIONS = [
  { value: 'TYPE_NAME', label: '유형·이름순' },
  { value: 'NAME', label: '이름순' },
  { value: 'RECENT_RECORD', label: '최근 기록순' },
  { value: 'REG_DT', label: '등록순' },
] as const
