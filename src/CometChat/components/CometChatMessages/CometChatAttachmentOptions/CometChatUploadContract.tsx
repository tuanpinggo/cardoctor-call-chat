import { CometChatButton } from "@cometchat/chat-uikit-react";
import { useEffect, useRef, useState } from "react";
import { UploadFileContractResult } from "../interface";
import { CometChat, Group } from "@cometchat/chat-sdk-javascript";
export const CometChatUploadContract = (
    handleUpload: ((file: File) => Promise<UploadFileContractResult>) | undefined, 
    group: Group | undefined,
    setKeyRef: React.Dispatch<React.SetStateAction<number>>
) => {
    const [file,setFile] = useState<File | undefined>()
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadFile = () => {
        inputRef.current?.click(); // mở file picker
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Kiểm tra định dạng
            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ];
            if (!allowedTypes.includes(selectedFile.type)) {
                alert("Chỉ được chọn file PDF, DOC hoặc DOCX");
                e.target.value = ""; // reset input
                return;
            }
            setFile(selectedFile);
        }
    };
    const sendCustomMessage = async (file: File) => {
        if(!group) return
        if(handleUpload == undefined) return
        const upload = await handleUpload(file)
        const thisFile = {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            fileUrl: upload.fileUrl
        }
        try {
            let customMessage = new CometChat.CustomMessage(
                group.getGuid(),
                CometChat.RECEIVER_TYPE.GROUP,
                "file_contract",
                thisFile
            );
            await CometChat.sendCustomMessage(customMessage)
            setKeyRef(pre => pre + 1)
        } catch (error) {
            console.log("🚀 ~ sendCustomMessage ~ error:", error)
        }
    }

    useEffect(()=>{
        if(!file) return
        sendCustomMessage(file)
    },[file])
    return(
        <>
            <CometChatButton
                iconURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxLjc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtdXAtaWNvbiBsdWNpZGUtZmlsZS11cCI+PHBhdGggZD0iTTE1IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY3WiIvPjxwYXRoIGQ9Ik0xNCAydjRhMiAyIDAgMCAwIDIgMmg0Ii8+PHBhdGggZD0iTTEyIDEydjYiLz48cGF0aCBkPSJtMTUgMTUtMy0zLTMgMyIvPjwvc3ZnPg=="
                onClick={handleUploadFile}
            />
            <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
            />
        </>
    )
};