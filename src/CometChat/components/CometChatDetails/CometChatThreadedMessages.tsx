import {
  CometChatButton,
  CometChatMessageComposer,
  CometChatMessageList,
  CometChatTextHighlightFormatter,
  CometChatThreadHeader,
  CometChatUIKit,
  CometChatUserEvents,
  getLocalizedString,
} from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CallLog } from "@cometchat/calls-sdk-javascript";
import { useCometChatContext } from "../../context/CometChatContext";
import { convertFileIcon, formatBytes, formatFileType } from "../../func/message";

interface ThreadProps {
  message: CometChat.BaseMessage;
  requestBuilderState?: CometChat.MessagesRequestBuilder;
  selectedItem:
    | CometChat.User
    | CometChat.Group
    | CometChat.Conversation
    | CometChat.Call
    | CallLog
    | undefined;
  onClose?: () => void;
  showComposer?: boolean;
  onSubtitleClicked?: () => void;
  goToMessageId?: string;
  searchKeyword?: string;
}

function CustomCometChatThreadHeader({
  onSubtitleClicked,
  message,
  onClose,
  chatFeatures,
}: {
  onSubtitleClicked?: () => void;
  message: CometChat.BaseMessage;
  onClose?: () => void;
  chatFeatures: any;
}) {
  if (
    message.getCategory() === CometChat.CATEGORY_CUSTOM &&
    message.getType() === "file_contract"
  ) {
    const data = message.getData().customData;
    return (
      <div className="cometchat-threaded-message-header">
        <div className="cometchat">
          <div className="cometchat-thread-header">
            <div className="cometchat-thread-header__top-bar">
              <div className="cometchat-thread-header__top-bar-title-container">
                <div className="cometchat-thread-header__top-bar-title">
                  File Hợp đồng
                </div>
                <div className="cometchat-thread-header__top-bar-subtitle">
                  <div className="cometchat-thread-header__top-bar-subtitle-text cometchat-thread-header__top-bar-subtitle-text-clickable">
                    {message.getSender().getName()}
                  </div>
                </div>
              </div>
              <div className="cometchat-thread-header__top-bar-close">
                <div className="cometchat">
                  <CometChatButton
                      iconURL={"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+SWNvbnMvMjQvQ2xvc2U8L3RpdGxlPgogICAgPGcgaWQ9Ikljb25zIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgIDxnIGlkPSJJY29ucy8yNC9DbG9zZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS4wMDAwMDAsIDUuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIxNCIgeTI9IjE0IiBpZD0iUGF0aC05Ij48L2xpbmU+CiAgICAgICAgICAgICAgICA8bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIxNCIgeTI9IjE0IiBpZD0iUGF0aC05IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3LjAwMDAwMCwgNy4wMDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTcuMDAwMDAwLCAtNy4wMDAwMDApICI+PC9saW5lPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="} 
                      onClick={onClose}
                    />
                </div>
              </div>
            </div>
            <div className="cometchat-thread-header__body">
              <div className="cometchat-thread-header__message cometchat-thread-header__message-incoming cometchat-thread-header__message-small">
                <div
                  className="cometchat"
                  style={{
                    width: "100%",
                    height: "fit-content",
                  }}
                >
                  <div className="cometchat-message-bubble__wrapper">
                    <div
                      className="cometchat-message-bubble cometchat-message-bubble-incoming"
                      id="1508"
                    >
                      <div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            background: "inherit",
                          }}
                        >
                          <div className="cometchat-message-bubble__body-wrapper">
                            <div className="cometchat-message-bubble__body">
                              <div className="cometchat-message-bubble__body-content-view">
                                <div className="cometchat">
                                  <div className="cometchat-file-bubble cometchat-file-bubble-incoming">
                                    <div>
                                      <img
                                        className="cometchat-file-bubble__leading-view"
                                        src={convertFileIcon(data.fileType)} 
                                      />
                                      <div className="cometchat-file-bubble__body">
                                        <div className="cometchat-file-bubble__body-name">
                                          {data.fileName}
                                        </div>
                                        <div className="cometchat-file-bubble__body-details">
                                          {formatBytes(data.fileSize)} • {formatFileType(data.fileType)}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="cometchat-file-bubble__tail-view">
                                      <a href={data.fileUrl} className="cometchat-file-bubble__tail-view-download" target="_blank"/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cometchat-thread-header__reply-bar">
                <div className="cometchat-thread-header__reply-bar-count">
                  {message.getReplyCount()} Phản hồi
                </div>
                <div className="cometchat-thread-header__reply-bar-divider"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <CometChatThreadHeader
      onSubtitleClicked={onSubtitleClicked}
      parentMessage={message}
      onClose={onClose}
      hideReceipts={
        chatFeatures &&
        !chatFeatures?.coreMessagingExperience?.messageDeliveryAndReadReceipts
      }
      showScrollbar={true}
    />
  );
}

export const CometChatThreadedMessages = (props: ThreadProps) => {
  const {
    message,
    requestBuilderState,
    selectedItem,
    onClose = () => {},
    showComposer = false,
    onSubtitleClicked,
    goToMessageId,
    searchKeyword,
  } = props;
  const { chatFeatures } = useCometChatContext();

  function getFormatters() {
    const formatters = CometChatUIKit.getDataSource().getAllTextFormatters({});
    if (searchKeyword) {
      formatters.push(new CometChatTextHighlightFormatter(searchKeyword));
    }
    return formatters;
  }
  return (
    <div className="cometchat-threaded-message">
      <div className="cometchat-threaded-message-header">
        <CustomCometChatThreadHeader
          onSubtitleClicked={onSubtitleClicked}
          message={message}
          onClose={onClose}
          chatFeatures={chatFeatures}
        />
      </div>
      {requestBuilderState?.parentMessageId === message.getId() && (
        <>
          <div
            className="cometchat-threaded-message-list"
            key="threaded-message-list-wrapper"
          >
            <CometChatMessageList
              textFormatters={
                searchKeyword && searchKeyword.trim() !== ""
                  ? getFormatters()
                  : undefined
              }
              goToMessageId={goToMessageId}
              key="threaded-message-list-content"
              parentMessageId={message.getId()}
              user={
                (
                  selectedItem as CometChat.Conversation
                )?.getConversationType?.() === "user"
                  ? ((
                      selectedItem as CometChat.Conversation
                    )?.getConversationWith() as CometChat.User)
                  : (selectedItem as CometChat.User).getUid?.()
                    ? (selectedItem as CometChat.User)
                    : undefined
              }
              group={
                (
                  selectedItem as CometChat.Conversation
                )?.getConversationType?.() === "group"
                  ? ((
                      selectedItem as CometChat.Conversation
                    )?.getConversationWith() as CometChat.Group)
                  : (selectedItem as CometChat.Group).getGuid?.()
                    ? (selectedItem as CometChat.Group)
                    : undefined
              }
              messagesRequestBuilder={requestBuilderState}
              hideReplyInThreadOption={
                chatFeatures &&
                !chatFeatures?.coreMessagingExperience
                  ?.threadConversationAndReplies
              }
              hideTranslateMessageOption={
                chatFeatures &&
                !chatFeatures?.deeperUserEngagement?.messageTranslation
              }
              hideEditMessageOption={
                chatFeatures &&
                !chatFeatures?.coreMessagingExperience?.editMessage
              }
              hideDeleteMessageOption={
                chatFeatures &&
                !chatFeatures?.coreMessagingExperience?.deleteMessage
              }
              hideReactionOption={
                chatFeatures && !chatFeatures?.deeperUserEngagement?.reactions
              }
              hideMessagePrivatelyOption={
                chatFeatures &&
                !chatFeatures?.privateMessagingWithinGroups
                  ?.sendPrivateMessageToGroupMembers
              }
              hideReceipts={
                chatFeatures &&
                !chatFeatures?.coreMessagingExperience
                  ?.messageDeliveryAndReadReceipts
              }
              hideMessageInfoOption={
                chatFeatures &&
                !chatFeatures?.coreMessagingExperience
                  ?.messageDeliveryAndReadReceipts
              }
            />
          </div>
          {showComposer ? (
            <div className="cometchat-threaded-message-composer">
              <CometChatMessageComposer
                parentMessageId={message.getId()}
                user={
                  (
                    selectedItem as CometChat.Conversation
                  )?.getConversationType?.() === "user"
                    ? ((
                        selectedItem as CometChat.Conversation
                      )?.getConversationWith() as CometChat.User)
                    : (selectedItem as CometChat.User).getUid?.()
                      ? (selectedItem as CometChat.User)
                      : undefined
                }
                group={
                  (
                    selectedItem as CometChat.Conversation
                  )?.getConversationType?.() === "group"
                    ? ((
                        selectedItem as CometChat.Conversation
                      )?.getConversationWith() as CometChat.Group)
                    : (selectedItem as CometChat.Group).getGuid?.()
                      ? (selectedItem as CometChat.Group)
                      : undefined
                }
                disableMentions={!chatFeatures?.deeperUserEngagement?.mentions}
                disableTypingEvents={
                  chatFeatures &&
                  !chatFeatures?.coreMessagingExperience?.typingIndicator
                }
                hidePollsOption={
                  chatFeatures && !chatFeatures?.deeperUserEngagement?.polls
                }
                hideCollaborativeDocumentOption={
                  chatFeatures &&
                  !chatFeatures?.deeperUserEngagement?.collaborativeDocument
                }
                hideStickersButton={
                  chatFeatures && !chatFeatures?.deeperUserEngagement?.stickers
                }
                hideEmojiKeyboardButton={
                  chatFeatures && !chatFeatures?.deeperUserEngagement?.emojis
                }
                hideVoiceRecordingButton={
                  chatFeatures &&
                  !chatFeatures?.deeperUserEngagement?.voiceNotes
                }
                hideCollaborativeWhiteboardOption={
                  chatFeatures &&
                  !chatFeatures?.deeperUserEngagement?.collaborativeWhiteboard
                }
                hideVideoAttachmentOption={
                  chatFeatures &&
                  !chatFeatures?.coreMessagingExperience?.videoSharing
                }
                hideFileAttachmentOption={
                  chatFeatures &&
                  !chatFeatures?.coreMessagingExperience?.fileSharing
                }
                hideAudioAttachmentOption={
                  chatFeatures &&
                  !chatFeatures?.coreMessagingExperience?.audioSharing
                }
                hideImageAttachmentOption={
                  chatFeatures &&
                  !chatFeatures?.coreMessagingExperience?.photosSharing
                }
              />
            </div>
          ) : (
            <div
              className="message-composer-blocked"
              onClick={() => {
                let user: CometChat.User | null = null;

                if (selectedItem instanceof CometChat.User) {
                  user = selectedItem;
                } else if (
                  selectedItem instanceof CometChat.Conversation &&
                  selectedItem.getConversationType() ===
                    CometChat.RECEIVER_TYPE.USER &&
                  selectedItem.getConversationWith() instanceof CometChat.User
                ) {
                  user = selectedItem.getConversationWith() as CometChat.User;
                }
                if (user) {
                  CometChat.unblockUsers([user.getUid()]).then(() => {
                    user?.setBlockedByMe(false);
                    CometChatUserEvents.ccUserUnblocked.next(
                      user as CometChat.User
                    );
                  });
                }
              }}
            >
              <div className="message-composer-blocked__text">
                {getLocalizedString("cannot_send_to_blocked_user")}{" "}
                <span className="message-composer-blocked__text-unblock">
                  {" "}
                  {getLocalizedString("click_to_unblock")}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
