import { useEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";

export function useCometChatRealTimeMessage(uniqueId: string = "UNIQUE_LISTENER_ID") {
  const [textMessageReceived,setTextMessageReceived] = useState<CometChat.TextMessage | undefined>();
  const [mediaMessageReceived,setMediaMessageReceived] = useState<CometChat.MediaMessage | undefined>();
  const [customMessageReceived,setCustomMessageReceived] = useState<CometChat.CustomMessage | undefined>();
  const [messageReceipt,setmessageReceipt] = useState<CometChat.MessageReceipt | undefined>();
  const [messagesRead,setmessagesRead] = useState<CometChat.MessageReceipt | undefined>();
  const [typingIndicator,settypingIndicator] = useState<CometChat.TypingIndicator | undefined>();
  const [typingEnded,settypingEnded] = useState<CometChat.TypingIndicator | undefined>();
  const [messageDeleted,setmessageDeleted] = useState<CometChat.BaseMessage | undefined>();
  const [messageEdited,setmessageEdited] = useState<CometChat.BaseMessage | undefined>();
  const [interactiveMessageReceived,setinteractiveMessageReceived] = useState<CometChat.InteractiveMessage | undefined>();
  const [interactiveMessageCompleted,setinteractiveMessageCompleted] = useState<CometChat.InteractionReceipt | undefined>();
  const [transientMessageReceived,settransientMessageReceived] = useState<CometChat.TransientMessage | undefined>();
  const [messageReactionAdded,setmessageReactionAdded] = useState<CometChat.ReactionEvent | undefined>();
  const [messageReactionRemoved,setmessageReactionRemoved] = useState<CometChat.ReactionEvent | undefined>();

  useEffect(() => {
    CometChat.addMessageListener(
      uniqueId,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage: CometChat.TextMessage) => {
          setTextMessageReceived(textMessage);
        },
        onMediaMessageReceived: (mediaMessage: CometChat.MediaMessage) => {
          setMediaMessageReceived(mediaMessage);
        },
        onCustomMessageReceived: (customMessage: CometChat.CustomMessage) => {
          setCustomMessageReceived(customMessage);
        },
        onMessagesDelivered: (messageReceipt: CometChat.MessageReceipt) => {
          setmessageReceipt(messageReceipt);
        },
        onMessagesRead: (messageReceipt: CometChat.MessageReceipt) => {
          setmessagesRead(messageReceipt);
        },
        onTypingStarted: (typingIndicator: CometChat.TypingIndicator) => {
          settypingIndicator(typingIndicator);
        },
        onTypingEnded: (typingIndicator: CometChat.TypingIndicator) => {
          settypingEnded(typingIndicator);
        },
        onMessageDeleted: (message: CometChat.BaseMessage) => {
          setmessageDeleted(message);
        },
        onMessageEdited: (message: CometChat.BaseMessage) => {
          setmessageEdited(message);
        },
        onInteractiveMessageReceived: (
          message: CometChat.InteractiveMessage
        ) => {
          setinteractiveMessageReceived(message);
        },
        onInteractionGoalCompleted: (receipt: CometChat.InteractionReceipt) => {
          setinteractiveMessageCompleted(receipt);
        },
        onTransientMessageReceived: (message: CometChat.TransientMessage) => {
          settransientMessageReceived(message);
        },
        onMessageReactionAdded: (reaction: CometChat.ReactionEvent) => {
          setmessageReactionAdded(reaction);
        },
        onMessageReactionRemoved: (reaction: CometChat.ReactionEvent) => {
          setmessageReactionRemoved(reaction);
        },
      })
    );
  }, []);
  return {
    textMessageReceived,
    mediaMessageReceived,
    customMessageReceived,
    messageReceipt,
    messagesRead,
    typingIndicator,
    typingEnded,
    messageDeleted,
    messageEdited,
    interactiveMessageReceived,
    interactiveMessageCompleted,
    transientMessageReceived,
    messageReactionAdded,
    messageReactionRemoved
  };
}
