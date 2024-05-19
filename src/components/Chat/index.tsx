import React, { useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import { useUserNotification } from "@/notifications/useUserNotifications";
import { ChatLayout } from '@/components/ui/chat/chat-layout';
import { viewNotificationsFromConversation } from '@/notifications/UserNotificationClient';
import { useLiveChat } from '@/contexts/useLiveChat';
import { useBot } from "@/contexts/BotContext";

const Chat: React.FC = () => {

  const { selectedConversation: conversation, currentUser, conversations, currentChatId, isSelectedConversationBot, addMessage } = useChat();
  // TODO: es-ce que j'ai besoin de caller getMessages ici?
  // const currentMessages = conversation?.messages || getMessages();
  const { resetBot, botMode, botMemory } = useBot();

  const { conversationsByStatus } = useUserNotification();


  useLiveChat({ conversation, currentUser })


  useEffect(() => {
    if (currentUser.id && conversation?.id) {
      viewNotificationsFromConversation({ conversationId: conversation?.id, userId: currentUser.id })
    }
  }, [conversation?.id, currentUser.id]);

  if (!conversation) {
    return <>Loading...</>
  }


  return (
    <>
      <div className="z-10 border h-[calc(100dvh-64px)] rounded-lg w-full text-sm">
        <ChatLayout
          navCollapsedSize={8}
          conversations={conversations}
          currentChatId={currentChatId}
          conversationsByStatus={conversationsByStatus}
          conversation={conversation}
          currentUser={currentUser}
          sendMessage={addMessage}
          botCongif={{resetBot, isBot: isSelectedConversationBot, botMode}}
        />
      </div>
    </>

  );
};

export default Chat;
