import React, { useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";

import ChatWithUser from './ChatWithUser'
import ChatUserList from './ChatUserList'
import ChatWithBot from './ChatBot'
import { useUserNotification } from "@/notifications/useUserNotifications";
import { ChatLayout } from '@/components/ui/chat/chat-layout';
import { viewNotificationsFromConversation } from '@/notifications/UserNotificationClient';

const Chat: React.FC = () => {
  // const layout = cookies().get("react-resizable-panels:layout");
  // const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const { selectedConversation: conversation, currentUser, conversations, currentChatId, isSelectedConversationBot, addMessage } = useChat();
  const { conversationsByStatus } = useUserNotification();


  useEffect(() => {
    if (currentUser.id && conversation?.id) {
      viewNotificationsFromConversation({ conversationId: conversation?.id, userId: currentUser.id })
    }
  }, [conversation?.id, currentUser.id]);

  if (!conversation) {
    return <>Loading...</>
  }

  // TODO: make the height dynamic / responsive intelligent
  return (
    <>
      <div className="z-10 border h-[calc(100dvh-200px)] rounded-lg w-full text-sm">
        <ChatLayout
          defaultLayout={undefined}
          navCollapsedSize={8}
          conversations={conversations}
          currentChatId={currentChatId}
          conversationsByStatus={conversationsByStatus}
          conversation={conversation}
          currentUser={currentUser}
          sendMessage={addMessage}
        />

        {isSelectedConversationBot && <ChatWithBot />}
      </div>
    </>

  );
};

export default Chat;
