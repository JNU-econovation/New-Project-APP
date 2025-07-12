import WebViewWithInjected from "@entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import { router } from "expo-router";

const TravelWebview = () => {
  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.TRAVEL,
      }}
    />
  );
};

export default TravelWebview;
