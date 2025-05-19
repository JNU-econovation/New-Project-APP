import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";

const CourseScreen = () => {
  return <WebViewWithInjected source={{ uri: PATH_ROUTE.WEBVIEW.COURSE }} />;
};

export default CourseScreen;
