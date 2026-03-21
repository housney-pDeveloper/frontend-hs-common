/** 금액 추천 요청 */
export interface GetAmountRequest {
  relationshipNo: number
  recommendationType: string
  directionCode: string
}

/** 개인 추천 */
export interface PersonalRecommendation {
  rawAmount: number
  adjustedAmount: number
  basedOnRecordCount: number
  durationGroup: string
  description: string
}

/** 집단 추천 */
export interface AggregateRecommendation {
  avgAmount: number
  medianAmount: number
  sampleCount: number
  durationGroup: string
  genderCode?: string
  relationshipCategory?: string
  description: string
}

/** 최종 추천 */
export interface FinalRecommendation {
  amount: number
  lowerOption: number | null
  upperOption: number
  confidence: 'HIGH' | 'MEDIUM' | 'LOW' | 'INSUFFICIENT'
  personalWeight: number
  aggregateWeight: number
  reasoning: string
}

/** 물가 환산 정보 */
export interface InflationInfo {
  lastGivenAmount: number
  lastGivenYear: number
  presentValueByCpi: number
  presentValueByDeposit: number
  cpiInflationRate: number
  depositAccumulatedRate: number
  dataConfirmed: boolean
  dataAvailableToYear: number
}

/** 금액 추천 응답 */
export interface GetAmountResponse {
  personalRecommendation: PersonalRecommendation | null
  aggregateRecommendation: AggregateRecommendation | null
  finalRecommendation: FinalRecommendation
  inflationInfo: InflationInfo | null
}

/** 물가 환산 요청 */
export interface GetInflationRequest {
  amount: number
  fromYear: number
  toYear: number
  customRate?: number
}

/** CPI 결과 */
export interface CpiResult {
  presentValue: number
  totalRate: number
  dataConfirmed: boolean
  description: string
}

/** 예금이자 결과 */
export interface DepositResult {
  presentValue: number
  totalRate: number
  formula: string
  description: string
}

/** 커스텀 이자율 결과 */
export interface CustomRateResult {
  customRate: number
  presentValue: number
  totalRate: number
  formula: string
  description: string
}

/** 물가 환산 응답 */
export interface GetInflationResponse {
  originalAmount: number
  fromYear: number
  toYear: number
  byCpi: CpiResult
  byDepositRate: DepositResult
  byCustomRate: CustomRateResult | null
  dataAvailableToYear: number
}

/** 트렌드 데이터 */
export interface TrendData {
  month: string
  avgAmount: number
  medianAmount: number
  sampleCount: number
}

/** 트렌드 인사이트 */
export interface TrendInsight {
  currentAvg: number
  previousAvg: number
  changeRate: number
  userAvg: number
  userVsAvgRate: number
  trends: TrendData[]
}

/** 추천 타입 매핑 */
export const RECOMMENDATION_TYPE_MAP: Record<string, string> = {
  WEDDING: '결혼',
  FUNERAL: '장례',
  BIRTHDAY: '생일',
  CELEBRATION: '축하',
  OTHER: '기타',
}

/** recordTypeCode → recommendationType 변환 */
export function toRecommendationType(recordTypeCode: string): string {
  const map: Record<string, string> = {
    WEDDING: 'WEDDING',
    FUNERAL: 'FUNERAL',
    BIRTHDAY: 'BIRTHDAY',
    ANNIVERSARY: 'CELEBRATION',
    OTHER: 'OTHER',
  }
  return map[recordTypeCode] ?? 'OTHER'
}

/** ceremonyTypeCode → recommendationType 변환 */
export function ceremonyToRecommendationType(ceremonyTypeCode: string): string {
  const map: Record<string, string> = {
    WEDDING: 'WEDDING',
    FUNERAL: 'FUNERAL',
    BIRTHDAY_PARTY: 'BIRTHDAY',
    CELEBRATION: 'CELEBRATION',
    OTHER: 'OTHER',
  }
  return map[ceremonyTypeCode] ?? 'OTHER'
}
