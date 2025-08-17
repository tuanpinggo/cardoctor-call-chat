import { useEffect, useRef, useState } from 'react';
 
import { CometChat } from '@cometchat/chat-sdk-javascript';
 
export function useCometChatNotificationList(limit: number = 50){

  const [conversation, setConversation] = useState<CometChat.Conversation[]>([]);

  const conversationsRequest = useRef(
    new CometChat.ConversationsRequestBuilder()
      .setLimit(limit) // customize as needed (max 50)
      .setUnread(true)
      .setConversationType('group')
      .build(),
  );
  
  const fetchConversations = async () => {
    try {
      const conversationList = await conversationsRequest.current.fetchNext();
      setConversation(conversationList);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };
  const fetchNext = async () => {
    const conversationList = await conversationsRequest.current.fetchNext();
    setConversation(conversationList);
  };

  useEffect(() => {
    fetchConversations();
  }, []);
 
  return {
    conversation,
    fetchNext,
  };
};
 
export default useCometChatNotificationList;
