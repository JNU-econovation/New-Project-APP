import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import useTravelCourse from "@hooks/feature/travel/useTravelCourse";
// import useTravelWithCourse from "@hooks/feature/travel/useTravelWithCourse";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

const TravelWithCourseMapWebview = () => {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  // const { ref, startTravel } = useTravelWithCourse({
  const { ref, connect } = useTravelCourse({
    courseId: courseId ?? "1",
  });

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

export default TravelWithCourseMapWebview;
