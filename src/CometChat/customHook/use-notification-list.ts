import { useEffect, useRef, useState } from 'react';
 
import { CometChat } from '@cometchat/chat-sdk-javascript'; 
import { get } from 'lodash';

export function useCometChatNotificationList(limit: number = 50, unRead: boolean = false){

  const [conversations, setConversations] = useState<CometChat.Conversation[]>([]);
    const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const conversationsRequest = useRef(
    new CometChat.ConversationsRequestBuilder()
      .setLimit(limit) // customize as needed (max 50)
      .setUnread(unRead)
      .setConversationType('group')
      .build(),
  );

  const checkHasMore = () => {
    if (
      get(conversationsRequest.current, 'pagination.current_page', 1) >=
      get(conversationsRequest.current, 'pagination.total_pages', 1)
    ) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  };
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const conversationList = await conversationsRequest.current.fetchNext();
      setConversations(conversationList);
      checkHasMore();
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNext = async () => {
    try {
      setLoading(true);
      const conversationList = await conversationsRequest.current.fetchNext();
      setConversations((prev) => [...prev, ...conversationList]);
      checkHasMore();
    } finally {
      setLoading(false);
    }
  };

  const readAll = () => {
    conversations.forEach((conversation) => {
      const lastMessage = conversation.getLastMessage();
      if (lastMessage) {
        CometChat.markAsRead(lastMessage);
      }
    });
  };

  useEffect(() => {
    fetchConversations();
  }, []);
 
  return {
    conversations,
    hasMore,
    loading,
    fetchNext,
    readAll,
  };
};
 
export default useCometChatNotificationList;
