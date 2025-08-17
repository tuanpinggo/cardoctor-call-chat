import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
type IMessage = {
     message: CometChat.Action,
}
interface IOnGroupMemberJoined extends IMessage {
    joinedUser: CometChat.User,
    joinedGroup: CometChat.Group
}
interface IGroupMemberLeft extends IMessage{
    leftUser: CometChat.User,
    leftGroup: CometChat.Group
}
interface IGroupMemberKicked extends IMessage{
    kickedUser: CometChat.User,
    kickedBy: CometChat.User,
    kickedFrom: CometChat.Group
}
interface IGroupMemberBanned extends IMessage{
    bannedUser: CometChat.User,
    bannedBy: CometChat.User,
    bannedFrom: CometChat.Group
}
interface IGroupMemberUnbanned extends IMessage{
    unbannedUser: CometChat.User,
    unbannedBy: CometChat.User,
    unbannedFrom: CometChat.Group
}
interface IGroupMemberScopeChanged extends IMessage{
    changedUser: CometChat.User,
    newScope: string,
    oldScope: string,
    changedGroup: CometChat.Group
}
interface IMemberAddedToGroup extends IMessage{
    userAdded: CometChat.User,
    addedby: CometChat.User,
    addedTo: CometChat.Group
}

export function useCometChatRealTimeGroup(
  uniqueId: string = "UNIQUE_LISTENER_GROUP_ID"
) {
  const [groupMemberJoined,setgroupMemberJoined] = useState<IOnGroupMemberJoined | undefined>();
  const [groupMemberLeft,setgroupMemberLeft] = useState<IGroupMemberLeft | undefined>();
  const [groupMemberKicked,setgroupMemberKicked] = useState<IGroupMemberKicked | undefined>();
  const [groupMemberBanned,setgroupMemberBanned] = useState<IGroupMemberBanned | undefined>();
  const [groupMemberUnbanned,setgroupMemberUnbanned] = useState<IGroupMemberUnbanned | undefined>();
  const [groupMemberScopeChanged,setgroupMemberScopeChanged] = useState<IGroupMemberScopeChanged | undefined>();
  const [memberAddedToGroup,setmemberAddedToGroup] = useState<IMemberAddedToGroup | undefined>();

  useEffect(() => {
    CometChat.addGroupListener(
      uniqueId,
      new CometChat.GroupListener({
        onGroupMemberJoined: (
          message: CometChat.Action,
          joinedUser: CometChat.User,
          joinedGroup: CometChat.Group
        ) => {
          setgroupMemberJoined({
            message,
            joinedUser,
            joinedGroup,
          });
        },
        onGroupMemberLeft: (
          message: CometChat.Action,
          leftUser: CometChat.User,
          leftGroup: CometChat.Group
        ) => {
          setgroupMemberLeft({ message, leftUser, leftGroup });
        },
        onGroupMemberKicked: (
          message: CometChat.Action,
          kickedUser: CometChat.User,
          kickedBy: CometChat.User,
          kickedFrom: CometChat.Group
        ) => {
          setgroupMemberKicked({
            message,
            kickedUser,
            kickedBy,
            kickedFrom,
          });
        },
        onGroupMemberBanned: (
          message: CometChat.Action,
          bannedUser: CometChat.User,
          bannedBy: CometChat.User,
          bannedFrom: CometChat.Group
        ) => {
          setgroupMemberBanned({
            message,
            bannedUser,
            bannedBy,
            bannedFrom,
          });
        },
        onGroupMemberUnbanned: (
          message: CometChat.Action,
          unbannedUser: CometChat.User,
          unbannedBy: CometChat.User,
          unbannedFrom: CometChat.Group
        ) => {
          setgroupMemberUnbanned({
            message,
            unbannedUser,
            unbannedBy,
            unbannedFrom,
          });
        },
        onGroupMemberScopeChanged: (
          message: CometChat.Action,
          changedUser: CometChat.User,
          newScope: string,
          oldScope: string,
          changedGroup: CometChat.Group
        ) => {
          setgroupMemberScopeChanged({
            message,
            changedUser,
            newScope,
            oldScope,
            changedGroup,
          });
        },
        onMemberAddedToGroup: (
          message: CometChat.Action,
          userAdded: CometChat.User,
          addedby: CometChat.User,
          addedTo: CometChat.Group
        ) => {
          setmemberAddedToGroup({
            message,
            userAdded,
            addedby,
            addedTo,
          });
        },
      })
    );
  }, []);
  return {
    groupMemberJoined,
    groupMemberLeft,
    groupMemberKicked,
    groupMemberBanned,
    groupMemberUnbanned,
    groupMemberScopeChanged,
    memberAddedToGroup
  };
}
