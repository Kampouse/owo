import { useEffect } from "react"
import useAuthentication from "@/contexts/authentication/useAuthentication"
import { initializeUserNotificationBroadcaster, removeUserNotificationBroadcaster } from "./UserNotificationClient"
import { useUserNotification } from "./useUserNotifications"

export const useNotificationBroadcaster = () => {
  const { user } = useAuthentication()
  const { syncNewNotification, syncUpdateNotification } = useUserNotification()
  
  useEffect(() => {
    if (user) {
      const channel = initializeUserNotificationBroadcaster({ targetUserId: user.id, notifyInserts: syncNewNotification, notifyUpdates: syncUpdateNotification })

      return () => {
        removeUserNotificationBroadcaster(channel)
      }
    }
  }, [syncNewNotification, syncUpdateNotification, user])
}