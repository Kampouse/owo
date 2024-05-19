import React, { useState, useMemo } from "react";
import { ChatInputProps, Message } from "@/types/ChatTypes";
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SendHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const ConfirmInput: React.FC<ChatInputProps> = ({ sendMessage, currentUser }) => {
  const [radioValue, setRadioValue] = useState('');
  const handleChange = (val: string) => setRadioValue(val);

  const disabled = useMemo(() => { return radioValue === '' }, [radioValue]);

  const handleSend = () => {
    const message = radioValue;

    if (!message.trim()) {
      return;
    }

    const newMessage = new Message(
      currentUser,
      message,
      new Date().toISOString(),
      "m-" + Math.floor(Math.random() * 10000), // Replace with a proper ID generation method
      'text'
    );

    sendMessage(newMessage);

    // Reset input field
    setRadioValue('')
  };


  return (
  <>
      <RadioGroup
        onValueChange={handleChange}
        orientation="horizontal"
        className="flex rounded-lg border border-gray-200 dark:border-gray-800 gap-0">
        <RadioGroupItem className="peer sr-only" id="opt-non" value="Non" />
        <Label
          className={cn(buttonVariants({ variant: radioValue === 'Non' ? 'destructive' : 'ghost' }),
          "rounded-tr-none rounded-br-none")}
          htmlFor="opt-non"
        >
          Non
        </Label>
        <RadioGroupItem className="peer sr-only" id="opt-oui" value="Oui" />
        <Label
          className={cn(buttonVariants({ variant: radioValue === 'Oui' ? 'success' : 'ghost' }),
          "rounded-tl-none rounded-bl-none")}
          htmlFor="opt-oui"
        >
          Oui
        </Label>
      </RadioGroup>

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
        onClick={handleSend}
        disabled={disabled}
      >
        <SendHorizontal size={20} className="text-muted-foreground" />
      </Button>
  </>
  );
};

export default ConfirmInput;
