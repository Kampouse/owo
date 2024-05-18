"use client";

import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { User, Conversation } from '@/types/ChatTypes';
import { cn } from "@/lib/utils";
import { Sidebar } from "./chat-sidebar";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import { Countable } from '@/notifications/useUserNotifications';
import ChatBottombar from "./chat-bottombar";
import { BotMode } from "@/types/ChatTypes";
import { ListRestart } from "lucide-react"

interface ChatLayoutProps {
  defaultLayout?: number[];
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  conversations: Conversation[]
  conversationsByStatus: Countable,
  currentChatId: string,
  conversation: Conversation,
  currentUser: User,
  botCongif: { resetBot: () => void, isBot: boolean, botMode: BotMode }
  sendMessage: (newMessage: any) => void;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
  conversations,
  currentChatId,
  conversationsByStatus,
  conversation,
  currentUser,
  sendMessage,
  botCongif: { resetBot, isBot, botMode },
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed && "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        )}
      >

        <Sidebar
          isCollapsed={isCollapsed || isMobile}
          links={conversations.map((chat) => ({
            ...chat,
            variant: chat.id === currentChatId ? "primary" : "ghost",
          }))}
          conversationsByStatus={conversationsByStatus}
          isMobile={isMobile}

        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>

        <div className="flex flex-col justify-between w-full h-full">
          <ChatTopbar
            selectedUser={conversation.user}
            buttonBarIcons={isBot ? [{ icon:ListRestart, onClick:resetBot }] :[]}
            />
          <ChatList
            messages={conversation.messages}
            selectedUser={conversation.user}
            sendMessage={sendMessage}
            isMobile={isMobile}
            currentUser={currentUser}
          >
            <ChatBottombar currentUser={currentUser} sendMessage={sendMessage} isMobile={isMobile} inputMode={isBot ? botMode : 'listen'} />
          </ChatList>
        </div>

      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
