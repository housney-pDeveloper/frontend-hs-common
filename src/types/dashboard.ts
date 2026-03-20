/** 대시보드 홈 요약 */
export interface HomeSummary {
  userName: string
  totalRelationshipCount: number
  totalRecordCount: number
  monthlyRecordCount: number
  upcomingScheduleCount: number
  /** 내 행사(HOST) 요약 */
  hostSummary: HostSummary
  /** 참석 행사(GUEST) 요약 */
  guestSummary: GuestSummary
  recentRecords: DashboardRecentRecord[]
  upcomingSchedules: DashboardUpcomingSchedule[]
}

/** 주축 = 나 (내 결혼식, 내 자녀 돌잔치, 내가 상주인 장례 등) */
export interface HostSummary {
  eventCount: number
  totalReceivedAmount: number
  /** 내 행사 목록 (셀렉트박스용) */
  events: HostEvent[]
  /** 관계별 받은 금액 */
  receivedByRelation: RelationAmount[]
  /** 행사 항목별 지출액 */
  expenseByCategory: CategoryAmount[]
}

/** 내 행사 개별 항목 */
export interface HostEvent {
  ceremonyNo: number
  title: string
  ceremonyTypeCode: string
  ceremonyDate: string
  receivedAmount: number
  /** 관계별 받은 금액 (개별 행사) */
  receivedByRelation: RelationAmount[]
  /** 항목별 지출 (개별 행사) */
  expenseByCategory: CategoryAmount[]
}

/** 주축 = 상대 (타인의 결혼식, 조카 돌잔치, 동료 장례 등) */
export interface GuestSummary {
  eventCount: number
  totalGivenAmount: number
  /** 관계별 보낸 금액 */
  givenByRelation: RelationAmount[]
  /** 유형별 분포 */
  givenByType: CategoryAmount[]
}

export interface RelationAmount {
  relationshipTypeNo: number
  label: string
  amount: number
}

export interface CategoryAmount {
  categoryCode: string
  label: string
  amount: number
  percentage: number
}

export interface DashboardRecentRecord {
  recordNo: number
  relationshipName: string
  relationshipTypeNo: number
  recordTypeCode: string
  recordDate: string
  amount: number
  directionCode: string
  /** SELF: 내 행사, OTHER: 참석 행사 */
  hostTypeCode: 'SELF' | 'OTHER'
}

export interface DashboardUpcomingSchedule {
  scheduleNo: number
  title: string
  scheduleDate: string
  scheduleTypeCode: string
  relationshipName: string
  dday: number
}

/** 인사이트 */
export interface HomeInsight {
  insightMessage: string
  insightTypeCode: string
  relatedRelationshipName?: string
  generatedDate: string
}

/** 차트 데이터 (통계 API 재사용) */
export interface MonthlyTrend {
  yearMonth: string
  totalCount: number
  totalGivenAmount: number
  totalReceivedAmount: number
}

export interface TypeDistribution {
  typeCode: string
  count: number
  totalAmount?: number
  percentage: number
}
