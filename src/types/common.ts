/**
 * 공통 타입 정의
 */

// 기본 엔티티
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// 페이지네이션 파라미터
export interface PaginationParams {
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// 검색 파라미터
export interface SearchParams extends PaginationParams {
  keyword?: string
}

// 날짜 범위
export interface DateRange {
  startDate: string
  endDate: string
}

// Select 옵션
export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
}

// 파일 업로드
export interface UploadFile {
  id: string
  name: string
  url: string
  size: number
  type: string
  uploadedAt: string
}

// 주소
export interface Address {
  zipCode?: string
  address: string
  addressDetail?: string
  city?: string
  state?: string
  country?: string
}

// 좌표
export interface Coordinates {
  latitude: number
  longitude: number
}

// 위치 (주소 + 좌표)
export interface Location extends Address {
  coordinates?: Coordinates
}
