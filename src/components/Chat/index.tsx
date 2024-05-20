import React from "react";
import { useChat } from "@/contexts/ChatContext";
import { useUserNotification } from "@/notifications/useUserNotifications";
import { ChatLayout } from '@/components/ui/chat/chat-layout';
import { useLiveChat } from '@/contexts/useLiveChat';
import { useBot } from "@/contexts/BotContext";

export const Chat: React.FC = () => {
  const { selectedConversation: conversation, currentUser, conversations, currentChatId, isSelectedConversationBot, addMessage } = useChat();
  const { resetBot, botMode } = useBot();
  const { conversationsByStatus } = useUserNotification();

  useLiveChat({ conversation, currentUser })

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
