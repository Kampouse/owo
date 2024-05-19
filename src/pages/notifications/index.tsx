import { ReactNode } from "react"
import { PrivateLayout } from "@/components/Layouts"
import { Notifications } from '@/components/Notifications'
import { useUserNotification } from "@/notifications/useUserNotifications"

const NotificationWall = () => {
  const { notifications } = useUserNotification()

  return (
    <div className="grid gap-4 p-4">
      <Notifications notifications={notifications} actionComponent={null}/>
    </div>
  )
}

NotificationWall.getLayout = function getLayout(page: ReactNode) {
  return <PrivateLayout>{page}</PrivateLayout>
}


export default NotificationWall
