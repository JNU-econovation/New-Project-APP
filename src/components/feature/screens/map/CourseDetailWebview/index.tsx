import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import useGetCurrentPosition from "@hooks/feature/useGetCurrentPosition";
import { router } from "expo-router";

const CourseDetailWebview = () => {
  const { location } = useGetCurrentPosition();

  return (
    <WebViewWithInjected
      source={{
        uri: PATH_ROUTE.WEBVIEW.MAP_COURSE_DETAIL,
      }}
      onMessage={({ method, name, body }) => {
        if (name === "route-back" && method === "POST") router.back();
        if (name === "route-course-detail" && method === "POST") {
          router.replace("/(tabs)/map/course");
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

export default CourseDetailWebview;
