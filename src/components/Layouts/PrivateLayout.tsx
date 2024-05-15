import React, { PropsWithChildren } from 'react';
import { AppNav, Onboarding } from '@/components'
import usePrivatePage from '@/contexts/authentication/usePrivatePage';
import { useNotificationBroadcaster } from '@/notifications/useNotificationBroadcaster';
import { NotificationProvider } from '@/notifications/NotificationContext';
import NotificationContainer from '@/components/Notifications/NotificationContainer';

const InnerLayout: React.FC<PropsWithChildren> = ({ children }) => {
  useNotificationBroadcaster()

  return (
    <>
      <AppNav />
      <div className="private-layout">
        <main>{children}</main>
      </div>
      <Onboarding />
      <NotificationContainer />
    </>
  )
}

const PrivateLayout: React.FC<PropsWithChildren> = ({ children }) => {
  usePrivatePage()

  return (
    <NotificationProvider>
      <InnerLayout>
        {children}
      </InnerLayout>
    </NotificationProvider>
  )
}
export default PrivateLayout;
