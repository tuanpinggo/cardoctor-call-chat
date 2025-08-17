import {
  CometChatMessageComposer,
  CometChatMessageHeader,
  CometChatTextHighlightFormatter,
  CometChatUIKit,
  getLocalizedString,
  CometChatUserEvents,
  CometChatButton,
} from '@cometchat/chat-uikit-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import { useCometChatContext } from '../../context/CometChatContext';
import { AppContext } from '../../context/AppContext';
import { CometChatUploadContract } from './CometChatAttachmentOptions';
import { CometChatMessageListCustom } from './CometChatMessageList';
import { UploadFileContractResult } from './interface';
interface MessagesViewProps {
  user?: CometChat.User;
  group?: CometChat.Group;
  onHeaderClicked: () => void;
  onThreadRepliesClick: (message: CometChat.BaseMessage) => void;
  onSearchClicked?: () => void;
  showComposer?: boolean;
  onBack?: () => void;
  goToMessageId?: string;
  searchKeyword?: string;
  handleUpload?: (file: File) => Promise<UploadFileContractResult>;
  titleView?: React.JSX.Element;
  enableUploadContract?: boolean;
  onBackListGroup?: () => void;
  showBackListGroupIcon?: boolean
}

export const CometChatMessages = (props: MessagesViewProps) => {
  const { chatFeatures, callFeatures, layoutFeatures } = useCometChatContext();
  const {handleUpload, titleView, enableUploadContract} = props
  const {
    user,
    group,
    onHeaderClicked,
    onThreadRepliesClick,
    showComposer,
    onSearchClicked = () => { },
    goToMessageId,
    searchKeyword,
    onBackListGroup,
    showBackListGroupIcon
  } = props;
  const [showComposerState, setShowComposerState] = useState<boolean | undefined>(showComposer);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { setAppState } = useContext(AppContext);

  const chatFeaturesRef = useRef(chatFeatures);
  useEffect(() => {
    chatFeaturesRef.current = chatFeatures;
    if (
      (group && chatFeaturesRef.current && !chatFeaturesRef.current.deeperUserEngagement?.groupInfo) ||
      (user && chatFeaturesRef.current && !chatFeaturesRef.current.deeperUserEngagement?.userInfo)
    ) {
      setAppState({ type: 'updateSideComponent', payload: { visible: false, type: '' } });
    }

    const iframe = document.getElementById('cometchat-frame') as HTMLIFrameElement;
    const iframeDoc = iframe?.contentDocument || iframe?.contentWindow?.document;
    const targetDiv =
      document.querySelector('.cometchat-messages-wrapper .cometchat-message-header .cometchat-list-item') ||
      iframeDoc?.querySelector('.cometchat-messages-wrapper .cometchat-message-header .cometchat-list-item');
    if (targetDiv) {
      if (
        (user && chatFeatures.deeperUserEngagement.userInfo) ||
        (group && chatFeatures.deeperUserEngagement.groupInfo)
      ) {
        (targetDiv as HTMLElement).style.cursor = 'pointer';
      } else {
        (targetDiv as HTMLElement).style.cursor = 'default';
      }
    }
  }, [chatFeatures, group, user, setAppState]);

  useEffect(() => {
    setShowComposerState(showComposer);
    if (user?.getHasBlockedMe?.()) {
      setShowComposerState(false);
    }
  }, [user, showComposer]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getFormatters() {
    const formatters = CometChatUIKit.getDataSource().getAllTextFormatters({});

    if (searchKeyword) {
      formatters.push(new CometChatTextHighlightFormatter(searchKeyword));
    }
    return formatters;
  }

  const determineVideoCallVisibility = () => {
    if (group) {
      // Check group-specific video call permission
      return !callFeatures?.voiceAndVideoCalling?.groupVideoConference;
    } else if (user) {
      // Check one-on-one video call permission
      return !callFeatures?.voiceAndVideoCalling?.oneOnOneVideoCalling;
    }
    return true; // Default to hiding if neither user nor group
  };

  const determineVoiceCallVisibility = () => {
    if (group) {
      // Check group-specific voice call permission
      return !callFeatures?.voiceAndVideoCalling?.groupVoiceConference;
    } else if (user) {
      // Check one-on-one voice call permission
      return !callFeatures?.voiceAndVideoCalling?.oneOnOneVoiceCalling;
    }
    return true; // Default to hiding if neither user nor group
  };

  const determineUserOrGroupInfoVisibility = () => {
    if (group) {
      return chatFeaturesRef.current && chatFeaturesRef.current.deeperUserEngagement?.groupInfo
        ? onHeaderClicked()
        : () => { };
    } else if (user) {
      return chatFeaturesRef.current && chatFeaturesRef.current.deeperUserEngagement?.userInfo
        ? onHeaderClicked()
        : () => { };
    }
  };

  const [keyRef,setKeyRef] = useState(1)

  return (
    <div className="cometchat-messages-wrapper">
      <div
        className={`cometchat-header-wrapper`}
      >
        <CometChatMessageHeader
          user={user}
          group={group}
          onBack={onBackListGroup}
          showBackButton={showBackListGroupIcon}
          showSearchOption={false}
          // onItemClick={determineUserOrGroupInfoVisibility}
          auxiliaryButtonView={
            <>
              <button
                onClick={onSearchClicked}
                style={{
                  cursor: "pointer"
                }}
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNlYXJjaC1pY29uIGx1Y2lkZS1zZWFyY2giPjxwYXRoIGQ9Im0yMSAyMS00LjM0LTQuMzQiLz48Y2lyY2xlIGN4PSIxMSIgY3k9IjExIiByPSI4Ii8+PC9zdmc+"
                />
              </button>
              <button
                onClick={determineUserOrGroupInfoVisibility}
                style={{
                  cursor: "pointer"
                }}
              >
                <img
                  src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWluZm8taWNvbiBsdWNpZGUtaW5mbyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cGF0aCBkPSJNMTIgMTZ2LTQiLz48cGF0aCBkPSJNMTIgOGguMDEiLz48L3N2Zz4='
                />
              </button>
            </>
          }
          hideVideoCallButton={determineVideoCallVisibility()}
          hideVoiceCallButton={determineVoiceCallVisibility()}
          showConversationSummaryButton={chatFeatures && chatFeatures?.aiUserCopilot?.conversationSummary}
          hideUserStatus={chatFeatures && !chatFeatures?.coreMessagingExperience?.userAndFriendsPresence}
          titleView={titleView}
        />
      </div>
      <div className="cometchat-message-list-wrapper">
        <CometChatMessageListCustom
          user={user}
          group={group}
          onThreadRepliesClick={onThreadRepliesClick}
          goToMessageId={goToMessageId}
          searchKeyword={searchKeyword}
          getFormatters={getFormatters}
          chatFeatures={chatFeatures}
          keyRef={keyRef}
        />
      </div>
      {showComposerState ? (
        <div className="cometchat-composer-wrapper">
          <CometChatMessageComposer
            user={user}
            group={group}
            disableMentions={!chatFeatures?.deeperUserEngagement?.mentions}
            disableTypingEvents={chatFeatures && !chatFeatures?.coreMessagingExperience?.typingIndicator}
            hidePollsOption={chatFeatures && !chatFeatures?.deeperUserEngagement?.polls}
            hideCollaborativeDocumentOption={chatFeatures && !chatFeatures?.deeperUserEngagement?.collaborativeDocument}
            hideStickersButton={chatFeatures && !chatFeatures?.deeperUserEngagement?.stickers}
            hideEmojiKeyboardButton={chatFeatures && !chatFeatures?.deeperUserEngagement?.emojis}
            hideVoiceRecordingButton={chatFeatures && !chatFeatures?.deeperUserEngagement?.voiceNotes}
            hideCollaborativeWhiteboardOption={
              chatFeatures && !chatFeatures?.deeperUserEngagement?.collaborativeWhiteboard
            }
            hideVideoAttachmentOption={chatFeatures && !chatFeatures?.coreMessagingExperience?.videoSharing}
            hideFileAttachmentOption={chatFeatures && !chatFeatures?.coreMessagingExperience?.fileSharing}
            hideAudioAttachmentOption={chatFeatures && !chatFeatures?.coreMessagingExperience?.audioSharing}
            hideImageAttachmentOption={chatFeatures && !chatFeatures?.coreMessagingExperience?.photosSharing}
            auxiliaryButtonView={
              enableUploadContract ? CometChatUploadContract(handleUpload, group, setKeyRef) : undefined
            }
          />
        </div>
      ) : (
        <div
          className="message-composer-blocked"
          onClick={() => {
            if (user) {
              CometChat.unblockUsers([user?.getUid()]).then(() => {
                user.setBlockedByMe(false);
                CometChatUserEvents.ccUserUnblocked.next(user);
              });
            }
          }}
        >
          <div className="message-composer-blocked__text">
            {getLocalizedString('cannot_send_to_blocked_user')}{' '}
            <span className="message-composer-blocked__text-unblock"> {getLocalizedString('click_to_unblock')}</span>
          </div>
        </div>
      )}
    </div>
  );
};
