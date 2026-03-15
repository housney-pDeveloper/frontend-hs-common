/** 통계 — MonthlyTrend는 dashboard.ts에서 정의 */
import type { MonthlyTrend } from './dashboard'
export type { MonthlyTrend }

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
