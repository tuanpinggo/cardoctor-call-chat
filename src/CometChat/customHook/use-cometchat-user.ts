import { CometChat } from "@cometchat/chat-sdk-javascript"
import { useEffect, useState } from "react"

export function useCometChatUser(){

    const [user,setUser] = useState<CometChat.User | undefined>()
    const [loading,setLoading] = useState<boolean>(true)
    const [error,setError] = useState()

    useEffect(()=>{
        setLoading(true)
        CometChat.getLoggedInUser()
        .then(user => setUser(user))
        .catch(error => setError(error))
        .finally(() => setLoading(false))
    },[])

    const logOutCometChat = async () => await CometChat.logout()

    return{
        user,
        loading,
        error,
        logOutCometChat
    }
}