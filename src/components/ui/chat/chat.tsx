import { Message, Conversation, User } from '@/types/ChatTypes';
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";

interface ChatProps {
  conversation: Conversation;
  isMobile: boolean;
  sendMessage: (newMessage: Message) => void;
  currentUser: User;
}

export function Chat({ currentUser, conversation, sendMessage, conversation: { messages }, isMobile }: ChatProps) {

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={conversation.user} />

      <ChatList
        messages={messages}
        selectedUser={conversation.user}
        sendMessage={sendMessage}
        isMobile={isMobile}
        currentUser={currentUser}
      />
    </div>
  );
}
