import { CometChatButton, CometChatSearch, getLocalizedString } from '@cometchat/chat-uikit-react';
import { CometChat } from '@cometchat/chat-sdk-javascript';

interface MessagesViewProps {
  /** The user to search messages for (used in one-on-one conversations) */
  user?: CometChat.User;
  /** The group to search messages in (used in group conversations) */
  group?: CometChat.Group;
  /** Callback function triggered when the search view is closed */
  onClose?: () => void;
  /** Callback function triggered when a message is clicked in search results */
  onMessageClicked?: (message: CometChat.BaseMessage) => void;
}

/**
 * CometChatSearchView component renders a search interface for messages.
 *
 * @param {MessagesViewProps} props - The props for the component.
 * @returns {JSX.Element} The rendered search view.
 */

const CometChatSearchView = (props: MessagesViewProps) => {
  const { user, group, onClose, onMessageClicked } = props;

  return (
    <div className="cometchat-search-view">
      <div className="cometchat-search-view__header">
        <div className="cometchat-search-view__title">{getLocalizedString('messages_search_title')}</div>
        <div className="cometchat-search-view__close-button">
          <CometChatButton 
            iconURL={"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+SWNvbnMvMjQvQ2xvc2U8L3RpdGxlPgogICAgPGcgaWQ9Ikljb25zIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgIDxnIGlkPSJJY29ucy8yNC9DbG9zZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS4wMDAwMDAsIDUuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIxNCIgeTI9IjE0IiBpZD0iUGF0aC05Ij48L2xpbmU+CiAgICAgICAgICAgICAgICA8bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIxNCIgeTI9IjE0IiBpZD0iUGF0aC05IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3LjAwMDAwMCwgNy4wMDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTcuMDAwMDAwLCAtNy4wMDAwMDApICI+PC9saW5lPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="} 
            onClick={onClose} 
          />
        </div>
      </div>
      <div className="cometchat-search-view__content">
        <CometChatSearch
          hideBackButton={true}
          uid={user?.getUid()}
          guid={group?.getGuid()}
          onBack={onClose}
          onMessageClicked={onMessageClicked}
          messagesRequestBuilder={new CometChat.MessagesRequestBuilder().setLimit(30)}
        />
      </div>
    </div>
  );
};

export default CometChatSearchView;
