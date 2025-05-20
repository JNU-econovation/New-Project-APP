import MountainSearchWebview from "@components/feature/screens/course/MountainSearchWebview";
import { SafeAreaView } from "react-native";

const CourseScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <MountainSearchWebview />
    </SafeAreaView>
  );
};

export default CourseScreen;
