import { AppContext } from "../../context/AppContext";
import { CometChatAvatar, CometChatButton, CometChatGroups } from "@cometchat/chat-uikit-react";
import { useContext, useState } from "react"
import { CometChat } from "@cometchat/chat-sdk-javascript";

const GetItemView = ({ group }: { group: CometChat.Group }) => {
    const { appState } = useContext(AppContext);

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const handleForwardMessage = async (group: CometChat.Group) => {

        setLoading(true)
        setDisabled(true)
        setSuccess(false)

        let newMessage;
        const currentUser = await CometChat.getLoggedInUser()
        const originalMessage = appState.forwardMessageContent
        if (!originalMessage?.getData()) return
        try {
            const messageData = originalMessage.getData()
            const messateType = originalMessage?.getType()
            if (
                messateType === CometChat.MESSAGE_TYPE.IMAGE ||
                messateType === CometChat.MESSAGE_TYPE.AUDIO ||
                messateType === CometChat.MESSAGE_TYPE.VIDEO ||
                messateType === CometChat.MESSAGE_TYPE.FILE
            ) {
                newMessage = new CometChat.MediaMessage(
                    group.getGuid(),
                    "",
                    messateType,
                    CometChat.RECEIVER_TYPE.GROUP
                )
                const attachment = new CometChat.Attachment(messageData.attachments[0]);
                newMessage.setAttachment(attachment)
            }

            if (messateType === CometChat.MESSAGE_TYPE.TEXT) {
                newMessage = new CometChat.TextMessage(
                    group.getGuid(),
                    messageData.text,
                    CometChat.RECEIVER_TYPE.GROUP
                );
            }

            newMessage?.setMetadata({
                forwarded: true,
                forwardedAt: new Date().getTime(),
                forwardedBy: currentUser.name,
                originalMessageId: originalMessage.getId(),
                originalSender: originalMessage.getSender().getName()
            })

            await CometChat.sendMessage(newMessage);
            setSuccess(true)
        } catch (error) {
            console.log("🚀 ~ handleForwardMessage ~ error:", error)
        }
        setLoading(false)
    }

    return (
        <div className="side-component-wrapper" style={{width: '100%'}}>
            <div 
                style={{
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    width: '100%'
                }}
            >
                <div 
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    <div>
                        <CometChatAvatar
                            image={group?.getIcon()}
                            name={group?.getName()}
                        />
                    </div>
                    <div 
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0
                        }}
                    >
                        <div style={{fontWeight: 600, fontSize: '14px'}}>{group.getName()}</div>
                        <div style={{fontWeight: 300, fontSize: '12px'}}>{group.getMembersCount()} thành viên</div>
                    </div>
                </div>
                <div className="group-list-item__title-wrapper">
                    <button 
                        disabled={disabled} 
                        style={{
                            padding: '5px',
                            border: '1px solid #eeeeee',
                            borderRadius: '5px'
                        }}
                        onClick={() => handleForwardMessage(group)}
                    >
                        {loading && 
                            <svg className="CometChatButtonLoading" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        }
                        {
                            success &&
                            <svg xmlns="http://www.w3.org/2000/svg" style={{color: '#3ad300'}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
                        }
                        {(!loading && !success) && 
                            <div style={{fontSize: '10px', fontWeight: 400}}>
                                Chuyển tiếp
                            </div>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export function ForwardMessageModal() {
    const { setAppState } = useContext(AppContext);

    const itemViewWrapper = (group: CometChat.Group) => {
        return <GetItemView group={group} />;
    };

    const handleClose = () => {
        setAppState({ type: 'UpdateShowForwardModal', payload: false })
        setAppState({ type: 'updateSideComponent', payload: { visible: false, type: '' } });
    }

    return (
        <div className="cometchat-search-view">
            <div className="cometchat-search-view__header">
                <div className="cometchat-search-view__title">
                    Chuyển tiếp tin nhắn
                </div>
                <div className="cometchat-search-view__close-button">
                    <CometChatButton 
                        iconURL={"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+SWNvbnMvMjQvQ2xvc2U8L3RpdGxlPgogICAgPGcgaWQ9Ikljb25zIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgIDxnIGlkPSJJY29ucy8yNC9DbG9zZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS4wMDAwMDAsIDUuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIxNCIgeTI9IjE0IiBpZD0iUGF0aC05Ij48L2xpbmU+CiAgICAgICAgICAgICAgICA8bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIxNCIgeTI9IjE0IiBpZD0iUGF0aC05IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3LjAwMDAwMCwgNy4wMDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTcuMDAwMDAwLCAtNy4wMDAwMDApICI+PC9saW5lPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="} 
                        onClick={handleClose}
                    />
                </div>
            </div>
            <div 
                className="cometchat-search-view__content"
            >
                <CometChatGroups
                    searchRequestBuilder={new CometChat.GroupsRequestBuilder()
                        .setLimit(100)
                    }
                    // onItemClick={handleForwardMessage}
                    showScrollbar={true}
                    itemView={itemViewWrapper}
                    headerView={<></>}
                />
            </div>
        </div>
    )
}