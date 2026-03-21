/** 예산 현황 요청 */
export interface GetBudgetStatusRequest {
  budgetType: 'MONTHLY' | 'YEARLY'
  year: number
  month?: number
}

/** 예상 지출 */
export interface UpcomingExpense {
  scheduleName: string
  relationshipName: string
  scheduleDate: string
  recommendedAmount: number
}

/** 예산 현황 응답 */
export interface BudgetStatus {
  budgetAmount: number
  spentAmount: number
  remainingAmount: number
  usagePercent: number
  upcomingExpenses: UpcomingExpense[]
}

/** 예산 저장 요청 */
export interface SaveBudgetRequest {
  budgetType: 'MONTHLY' | 'YEARLY'
  year: number
  month?: number
  amount: number
}
