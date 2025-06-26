import WebViewWithInjected from "@entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import { router } from "expo-router";

const TravelWebview = () => {
  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.TRAVEL,
      }}
      onMessage={({ method, name, body }) => {
        if (name === "route-back" && method === "POST") {
          router.back();
          return {
            name: "route-back",
            status: "success",
          };
        }
      }}
    />
  );
};

export default TravelWebview;
