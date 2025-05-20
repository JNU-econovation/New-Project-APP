import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import { router } from "expo-router";

const MountainSearchWebview = () => {
  return (
    <WebViewWithInjected
      source={{ uri: PATH_ROUTE.WEBVIEW.COURSE }}
      onMessage={({ method, name, body }) => {
        if (name === "route-mountain-course" && method === "POST") {
          const { mountainName } = body as { mountainName: string };
          router.push(`/(tabs)/home/course/${mountainName}`);
        }
      }}
      loadingBar
    />
  );
};

export default MountainSearchWebview;
