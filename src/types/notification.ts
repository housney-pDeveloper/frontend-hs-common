/** 서버에서 WebSocket으로 전송되는 알림 데이터 */
export interface NotificationItem {
  id: string
  title: string
  message: string
  createdAt: string
  read: boolean
  /** 알림 채널 (SECURITY | EVENT | SYSTEM 등) - category 표시에 사용 */
  channel?: string
}
