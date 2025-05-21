import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
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
      onMessage={({ method, name, body }) => {
        if (name === "route-back" && method === "POST") router.back();
        if (name === "route-course-detail" && method === "POST") {
          router.replace("/(tabs)/map/course");
        }
      }}
    />
  );
};

export default MountainCourseWebview;
