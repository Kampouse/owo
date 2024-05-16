import React from 'react';
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";
import { Conversation } from '@/types/ChatTypes';
import { buttonVariants } from "@/components/ui/button";
import { Countable } from '@/notifications/useUserNotifications';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

type ChatUserListProps = {
  isCollapsed: boolean,
  conversations: Conversation[],
  currentChatId: string,
  conversationsByStatus: Countable,
  onSelect: () => void
}

const ChatUserList = ({ isCollapsed, conversations, currentChatId, conversationsByStatus, onSelect }: ChatUserListProps) => {
return (
  <div
    data-collapsed={isCollapsed}
    className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
  >
    {!isCollapsed && (
      <div className="flex justify-between p-2 items-center">
        <div className="flex gap-2 items-center text-2xl">
          <p className="font-medium">Chats</p>
          <span className="text-zinc-300">({conversations.length})</span>
        </div>
      </div>
    )}
    <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      {conversations.map((chat: Conversation, index) =>
        isCollapsed ? (
          <TooltipProvider key={index}>
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  onClick={onSelect}
                  href={`/messages/${chat.id}`}
                  className={cn(
                    buttonVariants({ size: "icon", variant: chat.id === currentChatId ? 'primary' : 'ghost' }),
                    "h-11 w-11 md:h-16 md:w-16",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={chat.user.avatar}
                      alt={chat.user.avatar}
                      width={6}
                      height={6}
                      className="w-10 h-10 "
                    />
                  </Avatar>{" "}
                  <span className="sr-only">{chat.user.username}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="flex items-center gap-4"
              >
                {chat.user.username}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Link
            key={index}
            onClick={onSelect}
            href={`/messages/${chat.id}`}
            className={cn(
              buttonVariants({ size: "lg", variant: chat.id === currentChatId ? 'primary' : 'ghost' }),
              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
              "justify-start gap-4"
            )}
          >
            <Avatar className="flex justify-center items-center">
              <AvatarImage
                src={chat.user.avatar}
                alt={chat.user.username}
                width={6}
                height={6}
                className="w-10 h-10 "
              />
            </Avatar>
            <div className="flex flex-col max-w-28">
              <span>{chat.user.username}</span>
              <span className="text-zinc-300 text-xs truncate ">{chat.title}</span>
            </div>
            {conversationsByStatus.countBy(chat.id, 'new') >= 0 &&
              <Badge className="absolute -translate-y-1/2 right-2">
                {conversationsByStatus.countBy(chat.id, 'new')}
              </Badge>
            }
          </Link>
        )
      )}
    </nav>
  </div>
)
}

export default ChatUserList;
