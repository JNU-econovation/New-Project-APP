import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { router, useLocalSearchParams } from "expo-router";

const MountainCourseWebview = () => {
  const { mountainName } = useLocalSearchParams() as {
    mountainName: string;
  };

  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.COURSE_SEARCH_RESULT({ mountainName }),
      }}
    />
  );
};

export default MountainCourseWebview;
