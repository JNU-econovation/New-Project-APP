import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import useTravelWithCourse from "@hooks/feature/travel/useTravelWithCourse";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

const TravelMapWebview = () => {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const { ref, startTravel } = useTravelWithCourse({
    courseId: courseId ?? "1",
  });

  useEffect(() => {
    startTravel();
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

export default TravelMapWebview;
