import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";

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
