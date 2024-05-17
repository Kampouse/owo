import React, { useState } from "react";
import { BiReset } from 'react-icons/bi';
import { useBot } from "@/contexts/BotContext";
import { Button } from "@/components/ui/button"
import { ChatInputProps } from "@/types/ChatTypes";
import { ListRestart } from "lucide-react"



// REFACTOR: deconnect it to the context
const ChatResetInput: React.FC<ChatInputProps> = () => {
  const { resetBot } = useBot();

  return (
    <div className="chat-input d-flex align-items-center">
      <Button
        onClick={resetBot}
        className="h-9 w-9"
        size="icon"
        variant="outline"
      >
        <ListRestart size={20} className="text-muted-foreground" />
      </Button>
    </div>
  );
};

export default ChatResetInput;
