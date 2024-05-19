'use client'

import SingleNotification from './SingleNotification';

export const Notifications = ({ notifications, actionComponent }) => {
  return (
    <>
      {notifications.map((notification, index) => (
        <SingleNotification  {...notification} key={`notiflist-${index}`} actionComponent={actionComponent} />
      ))}
    </>
  )
}


