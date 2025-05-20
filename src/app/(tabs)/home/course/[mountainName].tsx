import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native";

const MountainCourseScreen = () => {
  const { mountainName } = useLocalSearchParams() as {
    mountainName: string;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <WebViewWithInjected
        source={{
          uri: PATH_ROUTE.WEBVIEW.COURSE_SEARCH_RESULT({ mountainName }),
        }}
        onMessage={({ method, name }) => {
          if (name === "route-back" && method === "POST") router.back();
        }}
      />
    </SafeAreaView>
  );
};

export default MountainCourseScreen;
