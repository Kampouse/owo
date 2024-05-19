import { UserConversationNotification } from "./UserNotification";
import { ConversationId } from "./UserNotificationClient";


export type Countable = {
  countBy(conversationId: ConversationId, status: UserConversationNotification['status']): number;
};

export class UserConversationNotificationsGroupedByStatus implements Countable {
  private newNotificationsByConversation: Record<ConversationId, Record<UserConversationNotification['status'], number>> = {};

  public static create(): UserConversationNotificationsGroupedByStatus {
    return new UserConversationNotificationsGroupedByStatus();
  }

  public setNotifications(notifications: UserConversationNotification[]): UserConversationNotificationsGroupedByStatus {
    notifications.forEach(notification => {
      const conversationId = notification.context.conversationId;
      const status = notification.status;

      if (this.newNotificationsByConversation[conversationId] === undefined) {
        this.newNotificationsByConversation[conversationId] = { 'new': 0, 'deleted': 0, 'seen': 0 };
      }

      this.newNotificationsByConversation[conversationId][status]++;
    });

    return this;
  }

  public countBy(conversationId: ConversationId, status: UserConversationNotification['status']): number {
    if (this.newNotificationsByConversation[conversationId] === undefined) {
      return 0;
    }

    return this.newNotificationsByConversation[conversationId][status];
  }

  public totalOf(status: UserConversationNotification['status']): number {
    let total = 0;

    Object.entries(this.newNotificationsByConversation).forEach(([_conversation, countByStatus]) => {
      total = total + countByStatus[status];
    })

    return total;
  }
}
