import CourseDetailWebview from "@components/feature/screens/map/CourseDetailWebview";
import { SafeAreaView, StatusBar } from "react-native";

const CourseScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <CourseDetailWebview />
    </SafeAreaView>
  );
};

export default CourseScreen;
