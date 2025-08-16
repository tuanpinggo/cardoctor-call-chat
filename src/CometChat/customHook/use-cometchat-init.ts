import { useState, useEffect } from "react";
import {
  UIKitSettingsBuilder,
  CometChatUIKit,
  CalendarObject,
  CometChatLocalize,
} from "@cometchat/chat-uikit-react";
import Vi_vn from "../locales/vi/vi.json";
import En_us from "../locales/en-US/en-US.json";

interface ChatInitState {
  user: CometChat.User | null;
  loading: boolean;
}

interface IPros {
  appId: string;
  region: string;
  language?: "vi" | "en-US";
  authToken: string
}

export function useCallChatInit(props: IPros): ChatInitState {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const uiKitSettings = new UIKitSettingsBuilder()
      .setAppId(props.appId)
      .setRegion(props.region)
      .subscribePresenceForAllUsers()
      .build();

    CometChatUIKit.init(uiKitSettings)?.then(() => {
      CometChatLocalize.init({
        language: props.language || "vi-VN",
        fallbackLanguage: "en-US",
        translationsForLanguage: {
          "vi-VN": Vi_vn,
          "en-US": En_us,
        },
        disableAutoDetection: false,
        disableDateTimeLocalization: false,
        timezone: "Asia/Ho_Chi_Minh",
        calendarObject: new CalendarObject({
          today: "[Hôm nay lúc] hh:mm A",
          yesterday: "[Hôm qua lúc] hh:mm A",
          lastWeek: "[Tuần trước] dddd",
          otherDays: "DD MMM YYYY, hh:mm A",
          relativeTime: {
            minute: "%d phút trước",
            minutes: "%d phút trước",
            hour: "%d giờ trước",
            hours: "%d giờ trước",
          },
        }),
        missingKeyHandler: (key) => `🔍 Missing translation for: ${key}`,
      });
      CometChatUIKit.getLoggedinUser().then((user: CometChat.User | null) => {
        let currentUser = user
        if (!user) {
          CometChatUIKit.loginWithAuthToken(props.authToken).then((loggedUser: CometChat.User) => currentUser = loggedUser)
        }
        if (mounted) {
          setUser(currentUser)
          setLoading(false);
        }
      })
    })

    return () => {
      mounted = false;
    };
  }, []);

  return { user, loading };
}
