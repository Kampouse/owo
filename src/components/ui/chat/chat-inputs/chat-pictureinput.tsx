import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/config/SupabaseClient'
import { ChatInputProps, Message } from "@/types/ChatTypes";
import { Button } from "@/components/ui/button"
import { PhotoUpload } from '@/components/PhotoUpload'
import { SendHorizontal } from "lucide-react";



const ChatPictureinput: React.FC<ChatInputProps> = ({ sendMessage, currentUser }) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileSelect = (file: File) => {
    setFile(file);
  };

  const handleSend = async () => {
    if (!file) {
      return;
    }

    // upload file to server
    const uuid = uuidv4();
    const filePath = `${currentUser.id}/${uuid}.${file.name.split('.')[1]}`

    const { data, error } = await supabase
      .storage
      .from('offers')
      .upload(filePath, file, {
        cacheControl: '3600',
      })

    const publicBaseUrl = 'https://nchfhnhquozlugyqknuf.supabase.co/storage/v1/object/public/offers'

    const newMessage = new Message(
      currentUser,
      `${publicBaseUrl}/${filePath}`,
      new Date().toISOString(),
      uuidv4(),
      'image'
    )

    sendMessage(newMessage);

    // Reset input field
    setFile(null);
  };

  const handleCancelMessage = () => {
    setFile(null);

    const cancelMessage = new Message(
      currentUser,
      'NULL',
      new Date().toISOString(),
      uuidv4(),
      'text'
    )

    sendMessage(cancelMessage);
  }

  return (
    <>
      <Button variant="destructive" onClick={handleCancelMessage} >
        Non
      </Button>

      <PhotoUpload onFileSelect={handleFileSelect} />

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
        onClick={handleSend}
      >
        <SendHorizontal size={20} className="text-muted-foreground" />
      </Button>

    </>
  );
};

export default ChatPictureinput;
