import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { ScreenContainer } from "react-native-screens";

const MyPageScreen = () => {
  return (
    <ScreenContainer>
      <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.MYPAGE }} />
    </ScreenContainer>
  );
};

export default MyPageScreen;
