import { SenderMessage, initializeChannel, removeChannel } from "@/conversations/RealtimeMessagesClient";
import { Conversation, Message, User } from "@/types/ChatTypes";
import { useEffect } from "react";
import { useChat } from "./ChatContext";
import { viewNotificationsFromConversation } from '@/notifications/UserNotificationClient';

type LiveChatProps = {
    conversation?: Conversation,
    currentUser: User,
}

const onNewMessage = (syncMessage: (message: Message) => void) => (senderMessage: SenderMessage): void => {
    const newMessage = new Message(
        { id: senderMessage.sender, avatar: `https://api.multiavatar.com/${senderMessage.sender}.png` },
        senderMessage.message,
        senderMessage.sent_at,
        senderMessage.id,
        senderMessage.type,
    )

    syncMessage(newMessage)
}

export const useLiveChat = ({ conversation, currentUser }: LiveChatProps) => {
    const { syncMessage } = useChat()

    useEffect(() => {
      if (conversation) {
        const channel = initializeChannel({ channelId: conversation.id, senderId: currentUser.id!, notifyNewMessage: onNewMessage(syncMessage) })

        return () => {
          removeChannel(channel)
        }
      }
    }, [])

    useEffect(() => {
      if (currentUser.id && conversation?.id) {
        viewNotificationsFromConversation({ conversationId: conversation?.id, userId: currentUser.id })
      }
    }, [conversation?.id, currentUser.id]);
}
