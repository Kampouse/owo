import { Message, User } from '@/types/ChatTypes';
import { cn } from "@/lib/utils";
import React, { useRef, Fragment } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { ImgDialog } from "@/components/ui/img-dialog";


const usersAreSame = (u1: User, u2: User) => u1.id === u2.id;

interface ChatListProps {
  messages?: Message[];
  selectedUser: User;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
  currentUser: User;
  children: React.ReactNode;
}

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile,
  currentUser,
  children
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                !usersAreSame(message.user, selectedUser) ? "items-end" : "items-start"
              )}
            >
              <div className="flex gap-3 items-center">
                {usersAreSame(message.user, selectedUser) && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={message.user?.avatar}
                      alt={message.user?.username}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}


                {message.type === 'image' && (
                  <span className={cn(!usersAreSame(message.user, selectedUser) ? 'bg-muted' : 'bg-secondary'," p-3 rounded-md max-w-xs")}>
                    <ImgDialog src={message.content} alt="image" className="rounded-md object-cover" />
                  </span>
                )}

                {message.type !== 'image' && (
                  <span className={cn(!usersAreSame(message.user, selectedUser) ? 'bg-muted' : 'bg-secondary'," p-3 rounded-md max-w-xs")}>
                    {message.content.split("\n").map((l: string) => <Fragment key={l}>{l}<br /></Fragment>)}
                  </span>
                )}


                {!usersAreSame(message.user, selectedUser) && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={message.user?.avatar}
                      alt={message.user.username}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {children}
    </div>
  );
}
