import { useUi } from "@/contexts/UiContext"
import { useNotificationContext } from "./NotificationContext"
import { UserConversationNotification } from "./UserNotification"
import { ConversationId } from "./UserNotificationClient"
import { useMemo } from "react"

export type Countable = {
  countBy(conversationId: ConversationId, status: UserConversationNotification['status']): number
}

class UserConversationNotificationsGroupedByStatus implements Countable {
  private newNotificationsByConversation: Record<ConversationId, Record<UserConversationNotification['status'], number>> = {}

  public static create (): UserConversationNotificationsGroupedByStatus {
    return new UserConversationNotificationsGroupedByStatus()
  }

  public setNotifications(notifications: UserConversationNotification[]): UserConversationNotificationsGroupedByStatus {
    notifications.forEach(notification => {
      const conversationId = notification.context.conversationId
      const status = notification.status
      
      if (this.newNotificationsByConversation[conversationId] === undefined) {
        this.newNotificationsByConversation[conversationId] = { 'new': 0, 'deleted': 0, 'seen': 0 }
      }

      this.newNotificationsByConversation[conversationId][status]++
    })

    return this
  }

  public countBy(conversationId: ConversationId, status: UserConversationNotification['status']): number {
    if (this.newNotificationsByConversation[conversationId] === undefined) {
      return 0
    }

    return this.newNotificationsByConversation[conversationId][status]
  }
}

type UserNotificationUsecase = {
  notifications: UserConversationNotification[],
  hasNewNotification: boolean,
  conversationsByStatus: Countable,
  syncNotification: (newNotification: UserConversationNotification) => void,
}
// TODO: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Re-engageable_Notifications_Push
// or onesignal.com
export const useUserNotification = (): UserNotificationUsecase => {
  const { userNotifications, setUserNotifications } = useNotificationContext()
  const { addToast } = useUi()

  const conversationsByStatus = useMemo(() => {
    return UserConversationNotificationsGroupedByStatus.create().setNotifications(userNotifications)
  }, [userNotifications])

  return {
    notifications: userNotifications,
    hasNewNotification: userNotifications.some((notification) => notification.status === 'new'),
    conversationsByStatus,
    syncNotification: (notification) => {
      const notificationToModify = userNotifications.find(userNotification => userNotification.id === notification.id)
      if (notificationToModify === undefined) {
        setUserNotifications([...userNotifications, notification])

        if (notification.status === 'new') {
          addToast(notification)
        }
      } else {
        const updatedNotification: UserConversationNotification = {...notificationToModify, status: 'seen' }
        const updatedNotifications = [...userNotifications.filter(userNotification => userNotification.id !== notificationToModify.id), updatedNotification]
        setUserNotifications(updatedNotifications)
      }
    },
  }
}
