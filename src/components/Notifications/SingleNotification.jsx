import Toast from 'react-bootstrap/Toast';
import React from 'react';
import ReactTimeAgo from 'react-time-ago'
import { IoIosChatbubbles } from 'react-icons/io';
import Link from 'next/link'
import { viewNotification } from '@/notifications/UserNotificationClient';

const SingleNotification = ({ id, excerpt, createdAt, status, type, context }) => {
  return (
    <Link href={type === 'message' && `/messages/${context.conversationId}`} onClick={() => viewNotification(id)}>
      <Toast>
        <Toast.Header closeButton={false}>
          <IoIosChatbubbles className="icon" />
          <strong className="me-auto ml-2">
            {type === 'message' && "Nouveau message"}
          </strong>
          <small>
            <ReactTimeAgo date={new Date(createdAt)} locale="fr" />
          </small>
        </Toast.Header>
        <Toast.Body>{excerpt}</Toast.Body>
      </Toast>
    </Link>
  );
}


export default SingleNotification;
