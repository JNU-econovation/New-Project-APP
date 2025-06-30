import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";

const MypageInquiryWebview = () => {
  return <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.MYPAGE }} />;
};

export default MypageInquiryWebview;
