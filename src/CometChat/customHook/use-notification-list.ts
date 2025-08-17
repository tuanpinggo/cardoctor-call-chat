import { useEffect, useRef, useState } from 'react';
 
import { CometChat } from '@cometchat/chat-sdk-javascript'; 

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
    const req = conversationsRequest.current as any;
    const currentPage = req?.pagination?.current_page ?? 1;
    const totalPages = req?.pagination?.total_pages ?? 1;

    if ( currentPage >= totalPages ) {
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

  const refresh = async () => {
    setLoading(true);
    // Rebuild a fresh request to start from page 1
    conversationsRequest.current = new CometChat.ConversationsRequestBuilder()
      .setLimit(limit)
      .setUnread(unRead)
      .setConversationType('group')
      .build();
    try {
      const freshList = await conversationsRequest.current.fetchNext();
      setConversations(freshList);
      checkHasMore();
    } catch (error) {
      setConversations([]);
      console.error('Refresh failed:', error);
    } finally {
      setLoading(false);
    }
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
    refresh
  };
};
 
export default useCometChatNotificationList;
