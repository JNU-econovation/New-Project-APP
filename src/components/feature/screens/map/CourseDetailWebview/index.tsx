import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
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
        if (name === "start-travel" && method === "POST") {
          router.push("/travel");
          return {
            name: "start-travel",
            status: "success",
          };
        }
      }}
    />
  );
};

export default CourseDetailWebview;
