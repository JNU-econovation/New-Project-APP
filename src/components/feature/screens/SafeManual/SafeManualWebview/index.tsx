import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { router } from "expo-router";

const SafeManualWebview = () => {
  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.SAFE_MANUAL,
      }}
      onMessage={({ method, name, body }) => {
        if (name === "route-back" && method === "POST") {
          router.back();
        }
      }}
    />
  );
};

export default SafeManualWebview;
