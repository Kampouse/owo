import React, { PropsWithChildren } from 'react';
import { AppNav } from '@/components/AppNav'
import { Onboarding } from '@/components/Onboarding'
import usePrivatePage from '@/contexts/authentication/usePrivatePage';
import { useNotificationBroadcaster } from '@/notifications/useNotificationBroadcaster';
import { NotificationProvider } from '@/notifications/NotificationContext';
import { Toaster } from "@/components/ui/toaster"

const InnerLayout: React.FC<PropsWithChildren> = ({ children }) => {
  useNotificationBroadcaster()

  return (
    <>
      <AppNav />
      <div className="private-layout">
        <main>{children}</main>
      </div>
      <Onboarding />
      <Toaster />
    </>
  )
}

const PrivateLayout: React.FC<PropsWithChildren> = ({ children }) => {
  usePrivatePage() // BUG: quand je navigue sur une page privéee et que je ne suis pas ocnnecté ca plante. ex: go to /profile/logout then "back"

  return (
    <NotificationProvider>
      <InnerLayout>
        {children}
      </InnerLayout>
    </NotificationProvider>
  )
}
export default PrivateLayout;
