import {
  ChatConfigurator,
  CometChatActionsIcon,
  CometChatMessageList,
  CometChatMessageTemplate,
  CometChatUIKit,
  CometChatUIKitConstants,
} from "@cometchat/chat-uikit-react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { AppContext } from "../../../context/AppContext";
import { useContext } from "react";
import { convertFileIcon, formatBytes, formatFileType } from "../../../func/message";

interface Pros {
  user?: CometChat.User;
  group?: CometChat.Group;
  onThreadRepliesClick: (message: CometChat.BaseMessage) => void;
  goToMessageId: string | undefined;
  searchKeyword: string | undefined;
  getFormatters: any;
  chatFeatures: any;
  keyRef: number
}

export function CometChatMessageListCustom({
  user,
  group,
  onThreadRepliesClick,
  goToMessageId,
  searchKeyword,
  getFormatters,
  chatFeatures,
  keyRef
}: Pros) {
  
  const { setAppState } = useContext(AppContext);

  const getCustomFileContractOption =  (
    loggedInUser: CometChat.User,
    message: CometChat.BaseMessage,
    group?: CometChat.Group
  ) => {
    const defaultOptions: any =
      ChatConfigurator.getDataSource().getMessageOptions(
        loggedInUser,
        message,
        group
      );
    let options = []
    for(const option of defaultOptions){
      if(option.id !== "delete"){
        options.push(option)
      }
    }
    return options
  }

  const getCustomOptions = (
    loggedInUser: CometChat.User,
    message: CometChat.BaseMessage,
    group?: CometChat.Group
  ) => {
    const defaultOptions: any =
      ChatConfigurator.getDataSource().getMessageOptions(
        loggedInUser,
        message,
        group
      );
    const messateType = message.getType();
    if (
      messateType === CometChat.MESSAGE_TYPE.IMAGE ||
      messateType === CometChat.MESSAGE_TYPE.AUDIO ||
      messateType === CometChat.MESSAGE_TYPE.VIDEO ||
      messateType === CometChat.MESSAGE_TYPE.FILE ||
      messateType === CometChat.MESSAGE_TYPE.TEXT
    ) {
      const myView: any = new CometChatActionsIcon({
        id: "forward-message",
        title: "Chuyển tiếp",
        iconURL:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZvcndhcmQtaWNvbiBsdWNpZGUtZm9yd2FyZCI+PHBhdGggZD0ibTE1IDE3IDUtNS01LTUiLz48cGF0aCBkPSJNNCAxOHYtMmE0IDQgMCAwIDEgNC00aDEyIi8+PC9zdmc+",
        onClick: () => {
          setAppState({ type: "UpdateShowForwardModal", payload: true });
          setAppState({
            type: "UpdateForwardMessageContent",
            payload: message,
          });
          setAppState({
            type: "updateSideComponent",
            payload: { visible: true, type: "showForWardModal" },
          });
        },
      });
      defaultOptions.push(myView);
    }
    return defaultOptions;
  };

  const getContentView = (message: CometChat.BaseMessage) => {
    const messageData = message.getData()
      return (
        <div className="cometchat-message-bubble__body-wrapper">
          <div
            style={{
              display: 'block',
              paddingTop: '8px',
              fontSize: 10,
              fontWeight: 700,
              color: '#fff',
              paddingLeft: '10px',
              fontFamily: 'Mona Sans'
            }}
          >
            File hơp đồng
          </div>
          <div className="cometchat-message-bubble__body cometchat-message-bubble__file-message">
              <div className="cometchat-message-bubble__body-content-view">
                <div className="cometchat">
                    <div className="cometchat-file-bubble cometchat-file-bubble-outgoing">
                      <div>
                          <img 
                            className="cometchat-file-bubble__leading-view" 
                            src={convertFileIcon(messageData.customData.fileType)}
                          />
                          <div className="cometchat-file-bubble__body">
                            <div className="cometchat-file-bubble__body-name">
                              {messageData.customData.fileName}
                            </div>
                            <div className="cometchat-file-bubble__body-details"> 
                              {formatBytes(messageData.customData.fileSize)} • {formatFileType(messageData.customData.fileType)}
                            </div>
                          </div>
                      </div>
                      <div className="cometchat-file-bubble__tail-view">
                          <a href={messageData.customData.fileUrl} className="cometchat-file-bubble__tail-view-download" target="_blank"/>
                      </div>
                    </div>
                </div>
              </div>
              {/* <div className="cometchat-message-bubble__body-status-info-view">
                <div className="cometchat-message-bubble__status-info-view">
                    <div className="cometchat">
                      <div className="cometchat-date">
                        {timeAgo(message.getSentAt())}
                      </div>
                    </div>
                    <div className="cometchat-receipts cometchat-message-bubble__status-info-view-receipts cometchat-message-bubble__status-info-view-receipts-sent cometchat-receipts-sent">
                      <div className="cometchat-message-list__receipt"></div>
                    </div>
                </div>
              </div> */}
          </div>
        </div>
      );
    };

  const getTemplates = () => {
    const CUSTOM_MESSAGE_TYPE = "file_contract";
    let templates = ChatConfigurator.getDataSource().getAllMessageTemplates();
    templates.map((data) => {
      data.options = (
        loggedInUser: CometChat.User,
        message: CometChat.BaseMessage,
        group?: CometChat.Group
      ) => getCustomOptions(loggedInUser, message, group);
    });

    let customMessageTemplate = new CometChatMessageTemplate({
      type: CUSTOM_MESSAGE_TYPE,
      category: CometChatUIKitConstants.MessageCategory.custom,
      contentView: (message: CometChat.BaseMessage) => getContentView(message),
      options: (
        loggedInUser: CometChat.User,
        message: CometChat.BaseMessage,
        group?: CometChat.Group
      ) => getCustomFileContractOption(loggedInUser, message, group),
    });

    templates.push(customMessageTemplate)
    return templates;
  };

  const getMessageRequestBuilder = () => {
      const CUSTOM_MESSAGE_TYPE = "file_contract";
      let categories = CometChatUIKit.getDataSource().getAllMessageCategories();
      categories.push(CometChatUIKitConstants.MessageCategory.custom);
      let types = CometChatUIKit.getDataSource().getAllMessageTypes();
      types.push(CUSTOM_MESSAGE_TYPE);
      return new CometChat.MessagesRequestBuilder()
        .setCategories(categories)
        .setTypes(types)
        .hideReplies(true)
        .setLimit(30);
  };
  
  return (
    <CometChatMessageList
      key={`${group?.getGuid()}-${keyRef}`}
      user={user}
      group={group}
      onThreadRepliesClick={(message: CometChat.BaseMessage) =>
        onThreadRepliesClick(message)
      }
      goToMessageId={goToMessageId}
      textFormatters={
        searchKeyword && searchKeyword.trim() !== ""
          ? getFormatters()
          : undefined
      }
      showSmartReplies={chatFeatures && chatFeatures?.aiUserCopilot?.smartReply}
      showConversationStarters={
        chatFeatures && chatFeatures?.aiUserCopilot?.conversationStarter
      }
      smartRepliesDelayDuration={1000}
      hideReplyInThreadOption={
        chatFeatures &&
        !chatFeatures?.coreMessagingExperience?.threadConversationAndReplies
      }
      hideTranslateMessageOption={
        chatFeatures && !chatFeatures?.deeperUserEngagement?.messageTranslation
      }
      hideEditMessageOption={
        chatFeatures && !chatFeatures?.coreMessagingExperience?.editMessage
      }
      hideDeleteMessageOption={
        chatFeatures && !chatFeatures?.coreMessagingExperience?.deleteMessage
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
        !chatFeatures?.coreMessagingExperience?.messageDeliveryAndReadReceipts
      }
      hideMessageInfoOption={
        chatFeatures &&
        !chatFeatures?.coreMessagingExperience?.messageDeliveryAndReadReceipts
      }
      templates={getTemplates()}
      messagesRequestBuilder={getMessageRequestBuilder()}
    />
  );
}
