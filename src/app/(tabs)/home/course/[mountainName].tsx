import MountainCourseWebview from "@components/feature/screens/course/MountainCourseWebview";
import { SafeAreaView } from "react-native";

const MountainCourseScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <MountainCourseWebview />
    </SafeAreaView>
  );
};

export default MountainCourseScreen;
