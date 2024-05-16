import React, { useState } from "react";
import { useChat } from "@/contexts/ChatContext";

import ChatWithUser from './ChatWithUser'
import ChatUserList from './ChatUserList'
import ChatWithBot from './ChatBot'
import { useUserNotification } from "@/notifications/useUserNotifications";

const Chat: React.FC = () => {
  const { selectedConversation: conversation, currentUser, conversations, currentChatId, isSelectedConversationBot } = useChat();
  const { conversationsByStatus } = useUserNotification();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!conversation) {
    return <>Loading...</>
  }

  return (
    <>

      <ChatUserList isCollapsed={!show} conversations={conversations} currentChatId={currentChatId} onSelect={handleClose} conversationsByStatus={conversationsByStatus} />


          {isSelectedConversationBot
            ? <ChatWithBot showNav={handleShow} />
            : <ChatWithUser conversation={conversation} currentUser={currentUser} showNav={handleShow} />
          }

    </>

  );
};

export default Chat;
