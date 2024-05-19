import { Chat } from '@/components/Chat'
import { useRouter } from 'next/router'
import { BotProvider } from '@/contexts/BotContext'
import { ChatProvider } from '@/contexts/ChatContext'
import { PrivateLayout } from "@/components/Layouts"
import { useUi } from '@/contexts/UiContext'
import { useEffect } from 'react';

const Messages = () => {
  const router = useRouter()
  const { changeUi } = useUi();

  useEffect(() => {
    if (router.query.chatId !== 'offer') {
      changeUi('latestConversationOpenedId', router.query.chatId);
    }
  }, [router.query.chatId])

  return (
    <ChatProvider chatId={router.query.chatId}>
      <BotProvider botId={router.query.chatId}>
        <Chat />
      </BotProvider>
    </ChatProvider>
  )
}


Messages.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>
}


export default Messages
