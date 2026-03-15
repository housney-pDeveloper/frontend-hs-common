/**
 * 공통 페이지 응답 타입
 *
 * backend의 PageDto<T>와 1:1 매핑
 * 모든 list 조회 API는 이 타입으로 반환한다.
 */
export interface PageDto<T> {
  list: T[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

/**
 * 페이지 요청 파라미터
 *
 * pageNumber, pageSize 모두 0 초과 시에만 서버에서 paging 처리.
 * 0이면 전체 데이터 반환.
 */
export interface PageRequest {
  pageNumber?: number
  pageSize?: number
}
