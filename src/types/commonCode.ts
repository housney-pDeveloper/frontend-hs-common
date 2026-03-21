/**
 * 공통코드 타입
 *
 * shared/types에 위치하는 이유:
 * - commonCode는 앱 전체에서 사용하는 글로벌 lookup table (cross-cutting concern)
 * - shared/stores/commonCodeStore가 이 타입을 참조하므로 shared 레이어에 배치
 */
export type CommonCodeType =
  | 'CEREMONY_TYPE'       // 경조사 유형
  | 'RECORD_TYPE'         // 기록 유형
  | 'DIRECTION'           // 방향 (보낸/받은)
  | 'RELATIONSHIP_TYPE'   // 관계 유형
  | 'SCHEDULE_TYPE'       // 일정 유형
  | 'HOST_TYPE'           // 주축 유형 (내 행사/참석 행사)
  | 'EXPENSE_CATEGORY'    // 지출 항목
  | 'REPEAT_CYCLE'        // 반복 주기
  | 'GENDER'              // 성별
  | 'ORGNZ_ROLE'          // 조직 권한
  | 'EVENT_AUTH'          // 행사 권한
  | 'EVENT_STATUS'        // 행사 진행상태
  | 'OFFICE_DUTY'         // 직책
  | 'OFFICE_PSTN'         // 직급
  | 'ORGNZ'               // 조직/부서

/**
 * 공통코드 항목 (서버 응답 포맷)
 */
export interface CommonCodeItem {
  codeGroupId?: string
  codeId: string
  codeName: string
  sortOrder?: number
  description?: string | null
  useYn: 'Y' | 'N'
  codeInit?: string
  icon?: string
}

export type CommonCodeMap = Partial<Record<CommonCodeType, CommonCodeItem[]>>
