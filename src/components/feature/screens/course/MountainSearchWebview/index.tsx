import WebViewWithInjected from "@entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import { router } from "expo-router";

const MountainSearchWebview = () => {
  return (
    <WebViewWithInjected
      source={{ uri: PATH_ROUTE.WEBVIEW.COURSE }}
      loadingBar
    />
  );
};

export default MountainSearchWebview;
