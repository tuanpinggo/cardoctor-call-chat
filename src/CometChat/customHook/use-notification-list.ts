import { useEffect, useState } from "react"
import {CometChat, Conversation} from '@cometchat/chat-sdk-javascript'

export function useCometChatNotificationList(limit: number = 50){
    const [unRead,setUnRead] = useState<Conversation[] | undefined>()
    const getUnReadMessage = async () => {
        try {
            const conversationsRequest = new CometChat.ConversationsRequestBuilder()
              .setLimit(limit) // customize as needed (max 50)
              .setUnread(true)
              .build();
        
            const conversationList = await conversationsRequest.fetchNext();
            setUnRead(conversationList)
            
        } catch (error) {
            console.log("🚀 ~ getUnReadMessage ~ error:", error)
        }
    }
    useEffect(()=>{
        getUnReadMessage()
    },[])
    return{
        unRead
    }
}