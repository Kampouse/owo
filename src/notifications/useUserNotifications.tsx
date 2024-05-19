import React, { useMemo } from "react"
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useNotificationContext } from "./NotificationContext"
import { UserConversationNotification } from "./UserNotification"
import { Countable, UserConversationNotificationsGroupedByStatus } from "./UserConversationNotificationsGroupedByStatus"

type UserNotificationUsecase = {
  notifications: UserConversationNotification[],
  hasNewNotification: boolean,
  conversationsByStatus: Countable,
  syncNewNotification: (newNotification: UserConversationNotification) => void,
  syncUpdateNotification: () => void,
}

export const useUserNotification = (): UserNotificationUsecase => {
  const { userNotifications, setUserNotifications } = useNotificationContext()
  const { toast } = useToast()

  const conversationsByStatus = useMemo(() => {
    return UserConversationNotificationsGroupedByStatus.create().setNotifications(userNotifications)
  }, [userNotifications])

  return {
    notifications: userNotifications,
    hasNewNotification: conversationsByStatus.totalOf('new') > 0,
    conversationsByStatus,
    syncNewNotification: (notification) => {
      setUserNotifications([...userNotifications, notification])
      if (notification.status === 'new') {
        toast({
          title: notification.context.from,
          description: notification.excerpt,
          action:
          <ToastAction asChild altText="👀">
            <Link href={notification.type === 'message' ? `/messages/${notification.context.conversationId}` : '/messages'}>
              👀
            </Link>
          </ToastAction>
        })
      }
    },
    syncUpdateNotification: () => {
      const updatedNotications = userNotifications
        .filter(notification => notification.status === 'new')
        .map(notification => ({...notification, status: "seen"} as UserConversationNotification));
      setUserNotifications([...userNotifications.filter(notification => notification.status !== 'new'), ...updatedNotications]);
    }
  }
}
