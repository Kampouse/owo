import React from 'react';
import Link from 'next/link'
import { ListGroup, Badge } from 'react-bootstrap';
import { Conversation } from '@/types/ChatTypes';
import { Countable } from '@/notifications/useUserNotifications';

type ChatUserListProps = {
  conversations: Conversation[],
  currentChatId: string,
  conversationsByStatus: Countable,
  onSelect: () => void
}

const ChatUserList = ({ conversations, currentChatId, conversationsByStatus, onSelect }: ChatUserListProps) => {

  return (
    <ListGroup as="ol" variant="flush">
      {conversations.map((chat: Conversation) => (
        <ListGroup.Item
          key={chat.id}
          onClick={onSelect}
          active={chat.id === currentChatId}
          action href={`/messages/${chat.id}`}
          as={Link}
          className="d-flex justify-content-between align-items-start text-left"
        >
          <div className="d-flex flex-row">
            <div>
              <img
                src={chat.user.avatar}
                alt="avatar"
                className="d-flex align-self-center me-3"
                width="60"
              />
            </div>
            <div className="">
              <p className="fw-bold mb-0">{chat.user.username}</p>
              <p className="small text-muted">{chat.title}</p>
            </div>
          </div>
          {conversationsByStatus.countBy(chat.id, 'new') > 0 &&
            <Badge bg="primary" pill>
              {conversationsByStatus.countBy(chat.id, 'new')}
            </Badge>}
        </ListGroup.Item>

      ))}
    </ListGroup>
);
  }

export default ChatUserList;
