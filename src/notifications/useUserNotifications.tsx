import React, { useMemo } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useNotificationContext } from "./NotificationContext"
import { UserConversationNotification } from "./UserNotification"
import { useRouter } from "next/router"
import { Countable, UserConversationNotificationsGroupedByStatus } from "./UserConversationNotificationsGroupedByStatus"

type UserNotificationUsecase = {
  notifications: UserConversationNotification[],
  hasNewNotification: boolean,
  conversationsByStatus: Countable,
  syncNotification: (newNotification: UserConversationNotification) => void,
}
// TODO: push notification
// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Re-engageable_Notifications_Push
// or onesignal.com
export const useUserNotification = (): UserNotificationUsecase => {
  const { userNotifications, setUserNotifications } = useNotificationContext()
  const { toast } = useToast()
  const router = useRouter()

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
          toast({
            title: notification.context.from,
            description: notification.excerpt,
            action: <ToastAction altText="👀" onClick={() => router.push(`/messages/${notification.context.conversationId}`)}>👀</ToastAction>
          })
        }
      } else {
        setUserNotifications([...userNotifications.filter(userNotification => userNotification.id !== notificationToModify.id), notification])
      }
    },
  }
}
