import {
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Message, ChatInputProps } from '@/types/ChatTypes';
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPicker } from "./emoji-picker";


export default function ChatTextinput({
  sendMessage, currentUser
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    const newMessage = new Message(
      currentUser,
      '👍',
      new Date().toISOString(),
      "m-" + Math.floor(Math.random() * 10000), // Replace with a proper ID generation method
      'text',
    );
    sendMessage(newMessage);
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = new Message(
        currentUser,
        message.trim(),
        new Date().toISOString(),
        "m-" + Math.floor(Math.random() * 10000), // Replace with a proper ID generation method
        'text',
      );
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className=" w-full border flex items-center h-9 resize-none overflow-hidden bg-background"
          ></Textarea>
          <div className="absolute right-2 bottom-0.5  ">
            <EmojiPicker onChange={(value) => {
              setMessage(message + value)
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }} />
          </div>
        </motion.div>

        {message.trim() ? (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleThumbsUp}
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Link>
        )}
      </AnimatePresence>
  );
}
