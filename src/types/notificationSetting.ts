export interface NotificationSetting {
  settingNo: number
  targetType: string
  daysBefore: number
  channelCode: string
  enabledYn: string
}

export interface SaveNotificationSettingRequest {
  settingNo?: number
  targetType: string
  daysBefore: number
  channelCode: string
  enabledYn: string
}

export const NOTIFICATION_TARGET_OPTIONS = [
  { value: 'BIRTHDAY', label: '생일' },
  { value: 'ANNIVERSARY', label: '기념일' },
  { value: 'SCHEDULE', label: '일정' },
  { value: 'CEREMONY', label: '경조사' },
] as const

export const NOTIFICATION_CHANNEL_OPTIONS = [
  { value: 'IN_APP', label: '앱 알림' },
  { value: 'EMAIL', label: '이메일' },
] as const

export const DAYS_BEFORE_OPTIONS = [
  { value: 1, label: '1일 전' },
  { value: 3, label: '3일 전' },
  { value: 7, label: '7일 전' },
  { value: 14, label: '14일 전' },
  { value: 30, label: '30일 전' },
] as const
