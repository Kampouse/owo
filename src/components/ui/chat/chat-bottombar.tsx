import { Message, User, BotMode, DynamicInputProps } from '@/types/ChatTypes';
import ChatTextinput from "./chat-inputs/chat-textinput";
import ChatInputConfirm from "./chat-inputs/chat-inputconfirm";
import ChatPictureinput from "./chat-inputs/chat-pictureinput";
import ChatResetInput from "./chat-inputs/chat-resetinput";


const DynamicInput: React.FC<DynamicInputProps> = ({ inputMode, ...props }) => {
  switch (inputMode) {
    case 'listen-picture':
      return <ChatPictureinput {...props} />
    case 'listen-confirm':
      return <ChatInputConfirm {...props} />
    case 'end':
      return <ChatResetInput {...props} />
    case 'listen':
      default:
      return <ChatTextinput {...props} />
  }
}

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
  currentUser: User;
  inputMode: BotMode;
}

export default function ChatBottombar({
  sendMessage, isMobile, currentUser, inputMode,
}: ChatBottombarProps) {

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <DynamicInput
        inputMode={inputMode}
        sendMessage={sendMessage}
        currentUser={currentUser}
      />
    </div>
  );
}
