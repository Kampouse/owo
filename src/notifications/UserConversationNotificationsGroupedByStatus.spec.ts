import { UserConversationNotificationsGroupedByStatus } from "./UserConversationNotificationsGroupedByStatus";
import { UserConversationNotification } from "./UserNotification";

describe('UserConversationNotificationsGroupedByStatus', () => {
  let underTest: UserConversationNotificationsGroupedByStatus;

  beforeEach(() => {
    underTest = UserConversationNotificationsGroupedByStatus.create();
  });

  describe('given no notifications', () => {
    beforeEach(() => {
      underTest.setNotifications([]);
    });

    it('when counting some conversation id by new status, then returns 0', () => {
      const count = underTest.countBy('any-conversation-id', 'new')

      expect(count).toEqual(0);
    });

    it('when counting some conversation id by seen status, then returns 0', () => {
      const count = underTest.countBy('any-conversation-id', 'seen')

      expect(count).toEqual(0);
    });

    it('when counting some conversation id by deleted status, then returns 0', () => {
      const count = underTest.countBy('any-conversation-id', 'deleted')

      expect(count).toEqual(0);
    });

    it('when counting total of new, then returns 0', () => {
      const total = underTest.totalOf('new');

      expect(total).toEqual(0);
    });

    it('when counting total of seen, then returns 0', () => {
      const total = underTest.totalOf('new');

      expect(total).toEqual(0);
    });

    it('when counting total of deleted, then returns 0', () => {
      const total = underTest.totalOf('new');

      expect(total).toEqual(0);
    });
  });

  describe('given multiple notifications from different conversations', () => {
    const scenerios: { conversationId: string, status: UserConversationNotification['status'], count: number }[] = [
      { conversationId: 'a.conversation.id', status: 'new', count: 3 },
      { conversationId: 'a.conversation.id', status: 'seen', count: 2 },
      { conversationId: 'a.conversation.id', status: 'deleted', count: 1 },
      { conversationId: 'another.conversation.id', status: 'new', count: 500 },
      { conversationId: 'another.conversation.id', status: 'seen', count: 0 },
      { conversationId: 'another.conversation.id', status: 'deleted', count: 2 },
      { conversationId: 'id-with-no-notifications', status: 'new', count: 0 },
      { conversationId: 'id-with-no-notifications', status: 'seen', count: 0 },
      { conversationId: 'id-with-no-notifications', status: 'deleted', count: 0 },
    ];

    scenerios.forEach(({ conversationId, status, count }) => {
      it(`when counting ${conversationId} by ${status} status, then returns ${count}`, () => {
        underTest.setNotifications(givenMultipleNotificationsFromDifferentConversations());

        expect(underTest.countBy(conversationId, status)).toEqual(count);
      });
    });

    it('when counting total of new, then returns 503', () => {
      underTest.setNotifications(givenMultipleNotificationsFromDifferentConversations());

      expect(underTest.totalOf('new')).toEqual(503);
    });

    it('when counting total of seen, then returns 2', () => {
      underTest.setNotifications(givenMultipleNotificationsFromDifferentConversations());

      expect(underTest.totalOf('seen')).toEqual(2);
    });

    it('when counting total of deleted, then returns 3', () => {
      underTest.setNotifications(givenMultipleNotificationsFromDifferentConversations());

      expect(underTest.totalOf('deleted')).toEqual(3);
    });
  });
});

const givenMultipleNotificationsFromDifferentConversations = (): UserConversationNotification[] => {
  return [
    ...createNotifications('a.conversation.id', 'new', 3),
    ...createNotifications('another.conversation.id', 'deleted', 2),
    ...createNotifications('a.conversation.id', 'seen', 2),
    ...createNotifications('a.conversation.id', 'deleted', 1),
    ...createNotifications('another.conversation.id', 'new', 500),
  ];
}

const createNotifications = (conversationId: string, status: UserConversationNotification['status'], count: number): UserConversationNotification[] => {
  const notifications: UserConversationNotification[] = [];

  for(let i = 0; i < count; i++) {
    notifications.push(createNotification(conversationId, status))
  }

  return notifications;
}

const createNotification = (conversationId: string, status: UserConversationNotification['status']): UserConversationNotification => {
  return {
    context: {
      conversationId
    },
    status
  } as UserConversationNotification;
}