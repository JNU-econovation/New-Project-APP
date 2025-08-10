import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import useTravelWithoutCourse from "@hooks/feature/travel/useTravelWithoutCourse";
import { useEffect } from "react";

const TravelWithoutCourseMapWebview = () => {
  const { ref, connect } = useTravelWithoutCourse();

  useEffect(() => {
    connect();
  }, []);

  return (
    <WebViewWithInjected
      ref={ref}
      source={{
        uri: PATH_ROUTE.WEBVIEW.TRAVEL,
      }}
    />
  );
};

export default TravelWithoutCourseMapWebview;
