import React from 'react'
import { User, ButtonBarIcons } from '@/types/ChatTypes';
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Info, Phone, Video } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';

interface ChatTopbarProps {
  selectedUser: User;
  buttonBarIcons: ButtonBarIcons
}

export default function ChatTopbar({ selectedUser, buttonBarIcons }: ChatTopbarProps) {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={selectedUser.avatar}
              alt={selectedUser.username}
              width={6}
              height={6}
              className="w-10 h-10 "
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{selectedUser.username}</span>
            <span className="text-xs"># TODO: Active 2 mins ago //  TODO: Nom de l'obet a vendre // title de la conversation </span>
          </div>
        </div>

        <div>
          {buttonBarIcons.map(({ icon: Icon, onClick }, index) => (
            <Button
              key={index}
              onClick={onClick}
              className="h-9 w-9"
              size="icon"
              variant="outline"
            >
              <Icon size={20} className="text-muted-foreground" />
            </Button>
          ))}
        </div>
      </div>
  )
}
