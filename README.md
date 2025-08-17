# CarDoctor Call Chat

## 🚀 Tài liệu hướng dẫn sử dụng sdk

```bash
npm install cardoctor-call-chat
# or
yarn add cardoctor-call-chat
```
### Thêm CSS 
Thêm css vào Layout hoặc App.tsx để sử dụng toàn bộ css
```
import '@cometchat/chat-uikit-react/css-variables.css';
import 'cardoctor-comet-chat/dist/styles/CometChatApp.css'
```
#### I. Custom Hook

##### 1. useCallChatInit
###### Usage
Sử dụng để khởi tạo cometChat. Dùng 1 lần duy nhất cho toàn bộ ứng dụng
```
const {user, loading} = useCallChatInit({
    appId: "",
    region: "",
    authToken: ""
  })
 ```
###### Parameters 
```
appId: string;
region: string;
language?: "vi" | "en-US";
authToken: string
  ```
###### Return
```
user: CometChat.User | null;
loading: boolean;
```
##### 2. useGroupInfo
###### Usage
Sử dụng để lấy thông tin Group từ guid
```
const { loading,group} = useGroupInfo(guid)
 ```
###### Parameters 
```
guid: string
  ```
###### Return
```
group: CometChat.Group | undefined;
loading: boolean;
error: CometChat.CometChatException | undefined
```
#### II. Components
##### 1. CometChatProvider
###### Usage
Là provider bọc toàn bộ cometchat

##### 2. AppContextProvider
###### Usage
Là Context Provider bọc toàn bộ cometchat

```
<CometChatProvider>
	<AppContextProvider>
		{children}
	</AppContextProvider>
</CometChatProvider>
```
##### 3. CometChatListGroup
###### Usage
Là Component lấy danh sách các group chat theo nhu cầu

```
<CometChatListGroup
	setGroup={setGroup}
	limit={30}
	tags={[""]}
	hideSearch={true}
	headerView={<h2>abc</h2>}
/>
```

###### Parameters 
```
setGroup: React.Dispatch<React.SetStateAction<Group | undefined>>;
limit?: number;
tags?: string[];
hideSearch?: boolean;
headerView?: React.JSX.Element
```
Default Value
```
limit = 30
tags = [""]
hideSearch=false
headerView=null
```

##### 4. CometChatHome
###### Usage
Là Component hiển thị khung chat

```
<CometChatHome
	defaultGroup={group}
	handleUpload={async (file: File) => {}}
	enableUploadContract={true}
/>
```

###### Parameters 
```
defaultGroup: Group | undefined
handleUpload: ((file: File) => Promise<UploadFileContractResult>) | undefined
enableUploadContract: boolean | undefined
```