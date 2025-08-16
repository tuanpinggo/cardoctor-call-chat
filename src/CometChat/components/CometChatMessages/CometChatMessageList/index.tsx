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

function formatBytes(bytes: number) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function formatFileType(fileType: string){
  if(fileType == "application/pdf") return "pdf"
  if(fileType == "application/msword") return "doc"
  return "docx"
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

  function convertFileIcon(fileType: string){
    if(fileType == "application/pdf") return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI/SURBVHgB1Ve/L2xBFP7m7L2bt7F5b98riO4hCgmFSkWEmmi1Qq3X06j8FXQWtR8lUWyIRiIhGiHBJn6sFXfGOWsb6y5zZ+9d8SWTmcyczPedM2fmngswjDH/uW1zuzXNwapwCreqDgrccmguitz6RcAqDyZqV83lJcz5OaKCenqAbNbWfEcEmA/k+/t4WVwEymVEBc3MIDU6CmQyNuZFCpsN8nkn8gqenqDZAZRKNtY5QhJgclsRyQiIICI5AZYiYhdgDg8RRYSHuAUcHOD6+Bjl9naklKp4KP2vkxNkp6aSFyDI8U24YRF3QQCPyT0ikO+H2jofgWppgRoYqLv+L53GXyYVchEhUQiDcwRofh7U2opgeRl6YyPU5rfnwdcaz9xiFyAR0Ht7APefIVONgKojwPkI9O4uSI7g6upLW1/yIG4Bpuq9OT21sld15t3fgYeHtw16e9EInAXQ2FjFe5qchOrogCvck7CvD8HCAtTICFJzczCcE1IHKL4ZenMTemvLah+nCBCTyhEoDr9qa4PhRCSuASQppZBJzc5a7xUpAnL1aHwcSsJ/dFQ5AsOeGhaj2XN5mFRnJ4KlJes9rQWIdzQ9/Xb/19cRrKy8W5comDoP0qf7WhtyWIVE7n0teSOwjoDmJ1cS7CVG8mgCHMJrg2Qrop8r4IsvXNwCirWT90NDKHE1Exdkr9vBwdA1+TPa5n64duHx4gLFQgFpavyU/K4u/OnuDlta+/afU+JK5UwG3PJoDoR4RziF+xXwDkgcKZ6uuwAAAABJRU5ErkJggg=="

    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgNEMwIDEuNzkwODYgMS43OTA4NiAwIDQgMEgyOEMzMC4yMDkxIDAgMzIgMS43OTA4NiAzMiA0VjI4QzMyIDMwLjIwOTEgMzAuMjA5MSAzMiAyOCAzMkg0QzEuNzkwODYgMzIgMCAzMC4yMDkxIDAgMjhWNFoiIGZpbGw9IndoaXRlIi8+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2lpXzE0MDAzXzEwMzk2NikiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcuMzMyNTUgMi42NjY5OUM2LjE1NDM0IDIuNjY2OTkgNS4xOTkyMiAzLjYyMjEyIDUuMTk5MjIgNC44MDAzMlYyNy4yMDAzQzUuMTk5MjIgMjguMzc4NSA2LjE1NDM1IDI5LjMzMzcgNy4zMzI1NSAyOS4zMzM3SDI0LjY2NTlDMjUuODQ0MSAyOS4zMzM3IDI2Ljc5OTIgMjguMzc4NSAyNi43OTkyIDI3LjIwMDNWOS4zMzM0TDIwLjEzMjggMi42NjY5OUg3LjMzMjU1WiIgZmlsbD0iIzQ4NzZGOSIvPgo8L2c+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIxX2RkXzE0MDAzXzEwMzk2NikiPgo8cGF0aCBkPSJNMTMuOTc4NCAyMi42NjYzTDE1Ljk4NjQgMTUuMzA1MkgxNi4wMjM0TDE4LjAxOSAyMi42NjYzSDE5LjE0TDIxLjY2NTQgMTMuODMzSDIwLjUzMkwxOC41OTggMjEuMjQzN0gxOC41NDg3TDE2LjU1MyAxMy44MzNIMTUuNDU2N0wxMy40NDg3IDIxLjI0MzdIMTMuMzk5NEwxMS40NjU0IDEzLjgzM0gxMC4zMzJMMTIuODU3NCAyMi42NjYzSDEzLjk3ODRaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxwYXRoIGQ9Ik0yNi4xNzQgOC43MDgwMUwyMC43NTc4IDguNzA4MDFMMjYuNzk5NSAxNC43NDk3TDI2Ljc5OTUgOS4zMzMwMUwyNi4xNzQgOC43MDgwMVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xNDAwM18xMDM5NjYpIi8+CjxwYXRoIGQ9Ik0yMi4yNjU1IDkuMzMzMDFMMjYuNzk4OCA5LjMzMzAxTDIwLjEzMjIgMi42NjYzNEwyMC4xMzIyIDcuMTk5NjdDMjAuMTMyMiA4LjM3Nzg4IDIxLjA4NzMgOS4zMzMwMSAyMi4yNjU1IDkuMzMzMDFaIiBmaWxsPSIjQjVDOEZDIi8+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2lpXzE0MDAzXzEwMzk2NiIgeD0iNS4xOTkyMiIgeT0iMi41MzM2NiIgd2lkdGg9IjIxLjU5OTYiIGhlaWdodD0iMjYuOTMzNyIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR5PSItMC4yNjY2NjciLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMC4wNjY2NjY3Ii8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMyAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QxX2lubmVyU2hhZG93XzE0MDAzXzEwMzk2NiIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR5PSIwLjI2NjY2NyIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIwLjA2NjY2NjciLz4KPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAxIDAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMC4zIDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9ImVmZmVjdDFfaW5uZXJTaGFkb3dfMTQwMDNfMTAzOTY2IiByZXN1bHQ9ImVmZmVjdDJfaW5uZXJTaGFkb3dfMTQwMDNfMTAzOTY2Ii8+CjwvZmlsdGVyPgo8ZmlsdGVyIGlkPSJmaWx0ZXIxX2RkXzE0MDAzXzEwMzk2NiIgeD0iMTAuMTk4NyIgeT0iMTMuNjk5NyIgd2lkdGg9IjEyLjUzNCIgaGVpZ2h0PSIxMC4yOTk3IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHg9IjAuNTMzMzMzIiBkeT0iMC44Ii8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuMjY2NjY3Ii8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjEgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18xNDAwM18xMDM5NjYiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldC8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjAuMDY2NjY2NyIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC40IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18xNDAwM18xMDM5NjYiIHJlc3VsdD0iZWZmZWN0Ml9kcm9wU2hhZG93XzE0MDAzXzEwMzk2NiIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDJfZHJvcFNoYWRvd18xNDAwM18xMDM5NjYiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xNDAwM18xMDM5NjYiIHgxPSIyMi4xMTIiIHkxPSI3LjM1Mzg0IiB4Mj0iMjguMTUzNiIgeTI9IjEzLjM5NTUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1vcGFjaXR5PSIwLjIiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K"
  }

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
