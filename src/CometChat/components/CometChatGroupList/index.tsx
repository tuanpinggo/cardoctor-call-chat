import { CometChatGroups } from "@cometchat/chat-uikit-react";
import { CometChat, Group } from '@cometchat/chat-sdk-javascript';
 
interface ICometChatListGroup {
    setGroup: React.Dispatch<React.SetStateAction<Group | undefined>>;
    limit?: number;
    tags?: string[];
    hideSearch?: boolean;
    headerView?: React.JSX.Element
    showScrollBar?: boolean
    loadingView?:React.JSX.Element
    emptyView?:React.JSX.Element
    errorView?:React.JSX.Element
}
 
export const CometChatListGroup = ({
    setGroup,
    limit=30,
    tags=[""],
    hideSearch=false,
    headerView,
    showScrollBar=false,
    loadingView,
    emptyView,
    errorView
}: ICometChatListGroup) => {
    return (
        <>
            <CometChatGroups
                hideSearch={hideSearch}
                groupsRequestBuilder={
                    new CometChat.GroupsRequestBuilder()
                    .joinedOnly(true)
                    .setLimit(limit)
                    .setTags(tags)
                }
                onItemClick={e => setGroup(e)}
                headerView={headerView}
                showScrollbar={showScrollBar}
                loadingView={loadingView}
                emptyView={emptyView}
                errorView={errorView}
            />
 
        </>
    );
}