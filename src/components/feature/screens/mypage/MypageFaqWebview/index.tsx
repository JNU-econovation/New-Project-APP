import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";

const MypageFaqWebview = () => {
  return <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.FAQ }} />;
};

export default MypageFaqWebview;
