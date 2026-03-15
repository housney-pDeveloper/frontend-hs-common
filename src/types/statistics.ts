/** 통계 */
export interface MonthlyTrend {
  yearMonth: string
  totalCount: number
  totalGivenAmount: number
  totalReceivedAmount: number
}

export interface RecordTypeDistribution {
  recordTypeCode: string
  count: number
  totalAmount: number
  percentage: number
}

export interface RelationshipTypeDistribution {
  relationshipTypeCode: string
  count: number
  percentage: number
}

export interface TopFrequent {
  name: string
  count: number
}

export interface StatisticsOverview {
  monthlyTrend: MonthlyTrend[]
  recordTypeDist: RecordTypeDistribution[]
  relationshipTypeDist: RelationshipTypeDistribution[]
  topRelations: TopFrequent[]
  topRecordTypes: TopFrequent[]
}
