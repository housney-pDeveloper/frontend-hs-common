import type { ApiError } from '../types/api'

/**
 * API 에러를 파싱하여 에러 코드와 메시지를 반환
 * 메시지는 서버가 내려준 message를 그대로 사용하고, 없을 때만 defaultMessage 사용
 *
 * @param error - API 에러 (unknown 타입)
 * @param defaultMessage - 기본 에러 메시지 (서버 message 없을 때만 사용)
 * @returns 에러 코드와 메시지 객체
 */
export const parseApiError = (
  error: unknown,
  defaultMessage: string = '오류가 발생했습니다.'
): { code: number; message: string } => {
  try {
    const apiError = error as unknown as ApiError
    const errorCode = typeof apiError.code === 'number' ? apiError.code : 0
    const errorMessage = apiError.message || defaultMessage

    return {
      code: errorCode,
      message: errorMessage,
    }
  } catch {
    return {
      code: 0,
      message: defaultMessage,
    }
  }
}

/**
 * API 에러에서 에러 메시지만 추출
 * 
 * @param error - API 에러 (unknown 타입)
 * @param defaultMessage - 기본 에러 메시지 (선택)
 * @returns 에러 메시지 문자열
 * 
 * @example
 * ```tsx
 * const errorMessage = getApiErrorMessage(mutation.error, '작업에 실패했습니다.')
 * ```
 */
export const getApiErrorMessage = (
  error: unknown,
  defaultMessage: string = '오류가 발생했습니다.'
): string => {
  return parseApiError(error, defaultMessage).message
}
