'use client'

import SingleNotification from './SingleNotification';

const Notifications = ({ notifications }) => {
  return (
    <>
      {notifications.map((notification, index) => (
        <SingleNotification  {...notification} key={`notiflist-${index}`} />
      ))}
    </>
  )
}

export default Notifications;
