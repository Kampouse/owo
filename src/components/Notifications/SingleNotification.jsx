import Toast from 'react-bootstrap/Toast';
import React, { useState, useEffect } from 'react';
import ReactTimeAgo from 'react-time-ago'
import { IoIosChatbubbles } from 'react-icons/io';
import Link from 'next/link'
import { viewNotification } from '@/notifications/UserNotificationClient';

const SingleNotification = ({ id, excerpt, createdAt, status, type, context, floating }) => {
  const [show, setShow] = useState(true)
  const [isClient, setIsClient] = useState(false)
  const floatingProps = floating ? {
    onClose: () => setShow(false),
    delay: 7000,
    autohide: true,
  } : {}

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? (
    <Link href={type === 'message' && `/messages/${context.conversationId}`} onClick={() => viewNotification(id)}>
      <Toast {...floatingProps} show={show}>
        <Toast.Header closeButton={false}>
          <IoIosChatbubbles className="icon" />
          <strong className="me-auto ml-2">
            {context.from}
          </strong>
          <small>
            <ReactTimeAgo date={new Date(createdAt)} locale="fr" />
          </small>
        </Toast.Header>
        <Toast.Body>{type === 'message' && "Nouveau message"}: {excerpt}</Toast.Body>
      </Toast>
    </Link>
  ) : null;
}


export default SingleNotification;
