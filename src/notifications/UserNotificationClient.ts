import { supabase } from "@/config/SupabaseClient"
import { RealtimeChannel } from '@supabase/supabase-js'
import { UserConversationNotification } from "./UserNotification"

export type ConversationId = string
type UserId = string

type UserNotificationIdentification = {
  targetUserId: UserId,
  notify: (notification: UserConversationNotification) => void,
}

type SQLUserConversationNotification = Omit<UserConversationNotification, 'createdAt'> & {
  created_at: string
}

const fromSQLToDomain = (sql: SQLUserConversationNotification): UserConversationNotification => {
  return {
    ...sql,
    createdAt: sql.created_at,
  }
}

const SOURCE_SCHEMA = "public"
const SOURCE_TABLE = "user_notifications"

const initializeUserNotificationBroadcaster = ({ targetUserId, notify }: UserNotificationIdentification): RealtimeChannel => {
  return supabase.channel(targetUserId)
    .on<SQLUserConversationNotification>(
      "postgres_changes",
      { 
        event: 'INSERT',
        schema: SOURCE_SCHEMA,
        table: SOURCE_TABLE,
        filter: `target=eq.${targetUserId}`,
      },
      (payload) => {
        notify(fromSQLToDomain(payload.new))
      })
    .subscribe()
}

const removeUserNotificationBroadcaster = async (toRemove: RealtimeChannel): Promise<void> => {
  await supabase.removeChannel(toRemove)
}


export type SendUserConversationNotificationUsecase = {
  conversationId: ConversationId,
  userId: UserId,
  from: string,
  message: string,
}

const sendUserNotification = async ({ conversationId, userId, message, from }: SendUserConversationNotificationUsecase): Promise<void> => {
  const newNotification = {
    type: 'message',
    target: userId,
    excerpt: message,
    context: {
      conversationId,
      from,
    },
  }

  await supabase
    .from('user_notifications')
    .insert(newNotification)
}


type NotificationId = string

const viewNotification = async (id: NotificationId): Promise<void> => {
  await supabase
    .from(SOURCE_TABLE)
    .update({ status: 'seen' })
    .eq('id', id);
}

type ViewNotificationsFromConversationUsecase = {
  conversationId: ConversationId,
  userId: UserId,
}

const viewNotificationsFromConversation = async ({ conversationId, userId }: ViewNotificationsFromConversationUsecase) => {
  await supabase
    .from(SOURCE_TABLE)
    .update({ status: 'seen' })
    .eq('target', userId)
    .eq('context->>conversationId', conversationId)
    .eq('status', 'new');
}

const getAllNotifications = async (user: UserId): Promise<UserConversationNotification[]> => {
  const { data: userNotifications } = await supabase
    .from('user_notifications')
    .select(`
      id,
      target,
      excerpt,
      type,
      createdAt:created_at,
      context,
      status
    `)
    .eq('target', user)
    .order('created_at', { ascending: false })
    .returns<UserConversationNotification[]>()

  return userNotifications || []
}

export {
  initializeUserNotificationBroadcaster,
  removeUserNotificationBroadcaster,
  sendUserNotification,
  viewNotification,
  viewNotificationsFromConversation,
  getAllNotifications,
}