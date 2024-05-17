import {
  FileImage,
  Paperclip,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import { Message, User, BotMode } from '@/types/ChatTypes';
import ChatTextinput from "./chat-inputs/chat-textinput";

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
  currentUser: User;
  inputMode: BotMode;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  sendMessage, isMobile, currentUser, inputMode,
}: ChatBottombarProps) {


  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <ChatTextinput
        sendMessage={sendMessage}
        currentUser={currentUser}
      />
    </div>
  );
}
