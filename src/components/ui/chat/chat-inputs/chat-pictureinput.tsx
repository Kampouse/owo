import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/config/SupabaseClient'
import { FaPaperPlane } from 'react-icons/fa';
import { ChatInputProps, Message } from "@/types/ChatTypes";
import { Button } from "@/components/ui/button"
import { PhotoUpload } from '@/components'



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
    <div className="chat-input d-flex align-items-center">
      <PhotoUpload onFileSelect={handleFileSelect} />
      <div>
        {file && <Button onClick={handleSend} className="mr-2">
          <FaPaperPlane className="icon" />
        </Button>}

        <Button variant="danger" onClick={handleCancelMessage} >
          X
        </Button>
      </div>
    </div>
  );
};

export default ChatPictureinput;
