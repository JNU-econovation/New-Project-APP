import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { SafeAreaView } from "react-native-safe-area-context";

const MyPageScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.MYPAGE }} />
    </SafeAreaView>
  );
};

export default MyPageScreen;
