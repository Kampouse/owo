import React, { useState } from "react";
import { useChat } from "@/contexts/ChatContext";
import { BiReset } from 'react-icons/bi';
import { useBot } from "@/contexts/BotContext";
import { Button } from "@/components/ui/button"

interface ResetInputProps {
  disabled?: boolean;
}

const ResetInput: React.FC<ResetInputProps> = () => {
  const { resetBot } = useBot();

  return (
    <div className="chat-input d-flex align-items-center">
      <Button onClick={resetBot}>
        <BiReset className="icon" />
      </Button>
    </div>
  );
};

export default ResetInput;
