"use client";

import Link from "next/link";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Conversation } from '@/types/ChatTypes';
import { Countable } from '@/notifications/useUserNotifications';

interface SidebarProps {
  isCollapsed: boolean;
  links: Array<Conversation & {
    variant: "primary" | "ghost";
  }>;
  conversationsByStatus: Countable;
  onClick?: () => void;
  isMobile: boolean;
}

export function Sidebar({ links, isCollapsed, isMobile, conversationsByStatus }: SidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({links.length})</span>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={`/messages/${link.id}`}
                    className={cn(
                      buttonVariants({ size: "icon", variant: link.variant }),
                      "h-11 w-11 md:h-16 md:w-16",
                      link.variant === "primary" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={link.user.avatar}
                        alt={link.user.username}
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                      />
                    </Avatar>{" "}
                    <span className="sr-only">{link.user.username}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.user.username}: {link.title}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href={`/messages/${link.id}`}
              className={cn(
              buttonVariants({ variant: link.variant }),
                "justify-start gap-4 p-8"
              )}
            >
              <Avatar className="flex justify-center items-center">
                <AvatarImage
                  src={link.user.avatar}
                  alt={link.user.username}
                  width={6}
                  height={6}
                  className="w-10 h-10 "
                />
              </Avatar>
              <div className="flex flex-col max-w-28 gap-1">
                <span>{link.user.username}</span>
                <span className="text-zinc-500 text-xs truncate ">{link.title}</span>
              </div>
              {conversationsByStatus.countBy(link.id, 'new') >= 0 &&
                <Badge className="absolute -translate-y-1/2 right-2">
                  TODO: make it work
                  {conversationsByStatus.countBy(link.id, 'new')}
                </Badge>
              }
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
