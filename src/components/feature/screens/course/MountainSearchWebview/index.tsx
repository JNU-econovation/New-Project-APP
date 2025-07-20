import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { router } from "expo-router";

const MountainSearchWebview = () => {
  return (
    <WebViewWithInjected
      source={{ uri: PATH_ROUTE.WEBVIEW.MOUNTAIN }}
      loadingBar
      onMessage={({ method, name }) => {
        if (name === "start-travel" && method === "POST") {
          router.push("/travel");
          return {
            name: "start-travel",
            status: "success",
          };
        }
        return {
          name: "unknown",
          status: "error",
        };
      }}
    />
  );
};

export default MountainSearchWebview;
