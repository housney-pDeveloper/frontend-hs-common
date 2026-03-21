export interface LinkItem {
  linkNo: number
  userName: string
  email: string
  statusCode: string
  regDate: string
  expireDate: string
}

export interface ActiveLink {
  linkNo: number
  userName: string
  email: string
  acceptedDate: string
}

export interface SearchUserResult {
  userNo: number
  userName: string
  maskedEmail: string
}

export interface CreateLinkResponse {
  linkNo: number
  inviteCode: string
  expireDate: string
}

export interface CreateLinkRequest { responderEmail: string }
export interface AcceptLinkRequest { inviteCode: string }
export interface LinkedDataRequest { linkNo: number; pageNumber?: number; pageSize?: number }

export const LINK_STATUS_OPTIONS = [
  { value: 'PENDING', label: '대기' },
  { value: 'ACCEPTED', label: '수락' },
  { value: 'REJECTED', label: '거절' },
  { value: 'EXPIRED', label: '만료' },
  { value: 'CANCELLED', label: '취소' },
] as const

export const LINK_STATUS_MAP: Record<string, string> = {
  PENDING: '대기',
  ACCEPTED: '수락',
  REJECTED: '거절',
  EXPIRED: '만료',
  CANCELLED: '취소',
}
