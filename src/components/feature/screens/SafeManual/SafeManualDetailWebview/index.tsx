import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { router, useLocalSearchParams } from "expo-router";

const SafeManualDetailWebview = () => {
  const { manual } = useLocalSearchParams();

  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.SAFE_MANUAL_DETAIL({
          manual: manual as string,
        }),
      }}
      onMessage={({ method, name }) => {
        if (name === "route-back" && method === "POST") {
          router.back();
        }
      }}
    />
  );
};

export default SafeManualDetailWebview;
