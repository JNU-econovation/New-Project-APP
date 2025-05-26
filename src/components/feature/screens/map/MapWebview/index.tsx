import WebViewWithInjected from "@entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import { router } from "expo-router";
import useGetCurrentPosition from "@hooks/feature/useGetCurrentPosition";

const MapWebview = () => {
  const location = useGetCurrentPosition();

  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.MAP,
      }}
      onMessage={({ method, name, body }) => {
        if (name === "route-back" && method === "POST") {
          router.back();
          return {
            name: "route-back",
            status: "success",
          };
        }
        if (name === "get-current-position" && method === "GET") {
          return {
            name: "get-current-position",
            status: "success",
            data: location,
          };
        }
      }}
    />
  );
};

export default MapWebview;
