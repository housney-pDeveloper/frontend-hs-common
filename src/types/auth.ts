import type { BaseEntity } from '@hs/common/types'

/**
 * 사용자 역할 (hs-admin-docs/biz/login 기준)
 * - OWNER: 대표관리자 (최고 권한)
 * - ADMIN: 관리자 (전체 어드민 접근)
 * - PARTNER: 운영파트너 (초대받은 행사만 접근)
 * - USER: 일반 회원 (어드민 접속 불가, 앱만 가능)
 */
export type UserRole = 'owner' | 'admin' | 'partner' | 'user'

/** API·DB에서 사용하는 역할 코드 (대소문자 통일: OWNER/ADMIN/USER/PARTNER) */
export const USER_ROLE_CODES = ['OWNER', 'ADMIN', 'USER', 'PARTNER'] as const
export type UserRoleCode = (typeof USER_ROLE_CODES)[number]

/** 역할 코드 → 한글 라벨 (표시용). 공통코드 API 연동 시 useOrgnzRoleLabelMap 사용 */
export const USER_ROLE_CODE_TO_LABEL: Record<UserRoleCode, string> = {
  OWNER: '대표관리자',
  ADMIN: '관리자',
  USER: '일반',
  PARTNER: '운영파트너',
}

/** 초대 발송 시 부여 가능한 역할 (대표=서비스 신청만, 총감독 ADMIN=초대 없음) */
export const INVITE_ORGNZ_ROLE_CODES = ['USER', 'PARTNER'] as const
export type InviteOrgnzRoleCode = (typeof INVITE_ORGNZ_ROLE_CODES)[number]

/**
 * 사용자
 */
/** 성별 코드 (DB/API: M/F) */
export type GenderCode = 'M' | 'F'

export interface User extends BaseEntity {
  email: string
  name: string
  phone?: string
  /** 성별 (M/F). 마이페이지 회원정보 폼 표시·수정용 */
  gender?: GenderCode
  role: UserRole
  permissions?: string[] // 권한 목록 (optional)
  companyId?: string
  avatarUrl?: string
  isActive: boolean
  lastLoginAt?: string
}

/**
 * 로그인 요청
 */
export interface LoginRequest {
  email: string
  password: string // 평문 (내부에서 RSA 암호화됨)
}

/**
 * 로그인 요청 (암호화된 비밀번호)
 * 실제 API 호출 시 사용
 */
export interface LoginRequestEncrypted {
  email: string
  encryptedPassword: string // RSA로 암호화된 비밀번호 (Base64)
}

/**
 * 로그인 응답
 * requireClientSelection이 false면 아래 필드들이 모두 포함됨 (서버가 한 번에 제공)
 */
export interface LoginResponse {
  email: string
  accessToken: string
  issuedAt: string
  // 조직 선택 필요 여부
  requireClientSelection?: boolean
  userNo?: number
  // requireClientSelection === false일 때 아래 필드들 포함
  userName?: string
  userRole?: string
  clientNo?: number
  clientName?: string
  refreshToken?: string
  expiresInSeconds?: number
}

/**
 * 고객사 정보 (로그인 응답의 clientList = 가입 조직)
 * orgnzName, orgnzRole은 카드 표시용(가입 조직·초대 조직 동일 형식)
 * orgnzLeaveRequested: getOrgSelection 시 조직 탈퇴 신청 접수 여부(마이페이지 탈퇴 버튼 비활성용)
 */
export interface ClientInfo {
  clientNo: number
  clientName: string
  orgnzName?: string
  orgnzRole?: string
  orgnzLeaveRequested?: boolean
}

/**
 * 초대된 조직 정보 (invitedList)
 * 서버에서 가입 조직(joinedList)과 초대된 조직(invitedList)을 분리해서 내려주는 방식
 */
export interface InvitedOrgnzInfo {
  clientNo: number
  clientName: string
  orgnzName: string
  orgnzRole: string
  inviteExpiresAt: string
}

/**
 * 조직(orgnz) 선택 화면 전용 API 응답 (시니어 백엔드 스타일)
 * - 로그인 시 큰 payload 안 실어보내고, 조직 선택 페이지 진입 시 이 API 한 번 호출로 내려받음
 * - Request: POST /organization/getOrgSelection { userNo }
 * - Response: { joinedList, invitedList }
 */
export interface OrgnzSelectionResponse {
  joinedList: ClientInfo[]
  invitedList: InvitedOrgnzInfo[]
}

/**
 * 고객사 선택 요청
 */
export interface SelectClientRequest {
  userNo: number
  clientNo: number
}

/** 초대 시 조직 권한 옵션 → useOrgnzRoleOptions('invite') 사용 */

/**
 * 초대 발송 요청 (직급/직책 설정 후 SMS·이메일 발송 시 사용)
 * orgnzRole은 초대 시 USER|PARTNER만 (OWNER=서비스신청, ADMIN=총감독은 초대 없음)
 */
export interface SendInviteRequest {
  inviteeEmail: string
  orgnzName?: string
  orgnzRole: InviteOrgnzRoleCode
  /** 초대 구성원 이름 */
  userName?: string
  /** 초대 구성원 연락처 */
  phone?: string
  /** 직급 codeId (OFFICE_PSTN) */
  officePstn?: string
  /** 직책 codeId (OFFICE_DUTY) */
  officeDuty?: string
  /** 조직 코드 (그룹 상세에서 초대 시 전달) */
  orgnzCode?: string
}

/**
 * 고객사 선택 응답
 */
export interface SelectClientResponse {
  userNo: number
  email: string
  userName: string
  requireClientSelection: boolean
  userClientNo: number
  clientNo: number
  clientName: string
  userRole: string // OWNER/ADMIN/USER/PARTNER
  accessToken: string
  refreshToken: string
  expiresInSeconds: number
  issuedAt: string // ISO 8601 형식
}

/** 초대 수락 응답이 정식 토큰 포함인지 여부 (한 번에 로그인 완료) */
export const isSelectClientResponse = (
  r: ClientInfo | SelectClientResponse
): r is SelectClientResponse => 'accessToken' in r && !!r.accessToken

/**
 * 사업자등록번호 중복 체크 요청
 */
export interface BizRegNoCheckRequest {
  bizRegNo: string
}

/**
 * 사업자등록번호 중복 체크 응답
 */
export interface BizRegNoCheckResponse {
  available: boolean
  reason: string
}

/**
 * 회원가입 진입 경로 (API·서버 전달용, 결과 페이지 variant와 별개)
 * - service: 서비스 신청하기 → 서버가 OWNER 부여 → 결과 화면은 owner
 * - invite: 초대 수락하기 → 서버가 초대 orgnzRole(USER|PARTNER) 부여 → 결과 화면은 user/partner
 * 결과 페이지 URL(owner|partner|user|access)은 useSignup에서 response.userRole로 결정.
 */
export type SignupVariant = 'service' | 'invite'

/**
 * 회원가입 요청 (서버 규격)
 */
export interface SignupRequest {
  // 1) 모바일 인증 정보
  authKey: string

  /** 어디서 넘어왔는지: service → OWNER, invite → USER */
  signupVariant?: SignupVariant

  // 2) 고객사 정보 (ClientVO 상속)
  bizRegNo?: string
  clientName?: string
  repTelNo?: string
  zipCode?: string
  addr?: string
  addrDetail?: string

  // 3) 사용자 정보
  userName: string
  email: string
  phoneNumber: string
  /** 성별 (필수). M | F */
  gender: 'M' | 'F'
  password: string // 평문 (서버에서 bcrypt 암호화)

  // 4) 약관 동의 정보
  termsNoList: number[]
}

/**
 * 회원가입 응답 (가입 시 부여된 역할로 결과 페이지 variant 결정)
 */
export interface SignupResponse {
  clientNo: number
  userNo: number
  /** 가입 시 부여된 역할(OWNER/ADMIN/USER/PARTNER). 결과 화면 분기용 */
  userRole?: string
}

/**
 * 비밀번호 재설정 요청
 */
export interface PasswordResetRequest {
  email: string
}

/**
 * 비밀번호 변경 요청
 */
export interface PasswordChangeRequest {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}

/**
 * 현재 접속 중인 고객사 (조직 선택 후 메인/API에서 공통 사용)
 * - 조직 선택 시 저장, 메인 진입 시 이 값을 담아 POST 등에 사용
 */
export type CurrentClient = Pick<ClientInfo, 'clientNo' | 'clientName'> & {
  orgnzName?: string
  orgnzRole?: string
}

/**
 * 인증 상태
 *
 * Access Token: 메모리만 (shared/lib/authStorage). persist/저장소에 넣지 않음.
 * Refresh/상태: Zustand persist (rememberMe에 따라 localStorage/sessionStorage).
 */
export interface AuthState {
  user: User | null
  refreshToken: string | null
  isAuthenticated: boolean
  /** 조직 선택 후 저장. 메인/이벤트 목록 등에서 clientNo 등으로 API 호출 시 사용 */
  currentClient: CurrentClient | null
  /** 아이디 기억하기: true면 localStorage, false면 sessionStorage에 저장 */
  rememberMe: boolean
}

/**
 * GET /auth/me 응답 (토큰 복호화하여 접속 사용자 계정 정보)
 * 정식 토큰: 사용자 + 선택 조직 정보 포함
 * 임시 토큰: 사용자만 (requireClientSelection: true)
 */
export interface MeResponse {
  userNo: number
  email: string
  userName: string
  userRole: string
  /** 성별 (M/F). 마이페이지 회원정보 표시용 */
  gender?: string | null
  /** 휴대전화번호. 마이페이지 회원정보 표시·수정용 */
  phoneNumber?: string | null
  clientNo: number | null
  clientName: string | null
  orgnzName: string | null
  orgnzRole: string | null
  requireClientSelection?: boolean
}

/**
 * 조직 정보 (SelectOrg 페이지용)
 */
export interface Organization {
  id: number
  company: string
  group: string
  badge: string
  isInvite: boolean
  date?: string
}

/**
 * User 변환 함수들 (코드 중복 제거)
 */

/**
 * LoginResponse → User 변환
 */
export const mapLoginResponseToUser = (response: LoginResponse): User => {
  return {
    id: response.userNo?.toString() || '',
    email: response.email ?? '',
    name: response.userName ?? '',
    role: (response.userRole?.toLowerCase() as User['role']) ?? 'user',
    isActive: true,
    createdAt: response.issuedAt ?? '',
    updatedAt: response.issuedAt ?? '',
  }
}

/**
 * SelectClientResponse → User 변환
 */
export const mapSelectClientResponseToUser = (response: SelectClientResponse): User => {
  return {
    id: response.userNo.toString(),
    email: response.email,
    name: response.userName,
    role: response.userRole.toLowerCase() as User['role'],
    isActive: true,
    createdAt: response.issuedAt,
    updatedAt: response.issuedAt,
  }
}

/**
 * MeResponse → User 변환
 */
export const mapMeResponseToUser = (me: MeResponse): User => {
  return {
    id: me.userNo.toString(),
    email: me.email,
    name: me.userName,
    phone: me.phoneNumber ?? undefined,
    gender: (me.gender === 'M' || me.gender === 'F' ? me.gender : undefined) as User['gender'],
    role: (me.userRole?.toLowerCase() as User['role']) ?? 'user',
    isActive: true,
    createdAt: '',
    updatedAt: '',
  }
}

// ─── 휴대폰 인증 공통 타입 ─────────────────────────────────────────────────────

/**
 * 모바일 인증 단계 (버튼 문구·disabled 파생용)
 * - idle: 초기. 발송 전. [인증번호 전송] / 인증번호 입력 영역 숨김
 * - sending: 인증번호 발송 API 호출 중. [전송 중...] / 발송 버튼 비활성화
 * - sent: 발송 완료. 인증번호 입력 영역 표시. [재전송] / [인증번호 확인]
 * - verifying: 인증번호 확인 API 호출 중. [확인 중...] / 확인 버튼 로딩
 * - verified: 인증 완료. [재전송] / [인증완료](비활성). 재전송 시 sent로 리셋
 */
export type MobileAuthStatus = 'idle' | 'sending' | 'sent' | 'verifying' | 'verified'

export interface MobileAuthPhoneBinding {
  value: string
  onChange: (value: string) => void
  error: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
  id?: string
}

export interface MobileAuthCodeBinding {
  value: string
  onChange: (value: string) => void
  error: boolean
  placeholder?: string
  id?: string
}

/** 훅 반환 + 폼 바인딩 + 콜백. 호출부에서 한 번만 조립해서 넘김 */
export interface MobileAuthBinding {
  status: MobileAuthStatus
  resendTimer: number
  authCodeTimer: number
  authCodeSent: boolean
  mobileVerified: boolean
  isSending: boolean
  isVerifying: boolean
  onSendCode: () => void
  onVerify: () => void
  phone: MobileAuthPhoneBinding
  authCode: MobileAuthCodeBinding
  sendError?: string | null
  verifyError?: string | null
}
