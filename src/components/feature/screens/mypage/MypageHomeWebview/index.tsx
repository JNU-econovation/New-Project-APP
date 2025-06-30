import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";

const MypageHomeWebview = () => {
  return <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.MYPAGE }} />;
};

export default MypageHomeWebview;
