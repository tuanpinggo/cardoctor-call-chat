import { useEffect, useState } from "react";
import { CometChat, Group } from "@cometchat/chat-sdk-javascript";

export function useGroupInfo(guid: string) {
    
  const [loading, setLoading] = useState<boolean>(true);
  const [group, setGroup] = useState<Group | undefined>(undefined);
  const [error, setError] = useState<CometChat.CometChatException | undefined>(
    undefined
  );

  const handleGetGroup = async () => {
    setLoading(true);
    try {
      const req = await CometChat.getGroup(guid);
      setGroup(req);
    } catch (error) {
      setError(error as CometChat.CometChatException);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetGroup();
  }, []);

  return {
    loading,
    group,
    error,
  };
}
