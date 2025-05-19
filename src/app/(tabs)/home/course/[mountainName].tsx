import Text from "@components/common/shared/ui/Text";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const MountainCourseScreen = () => {
  const { mountainName } = useLocalSearchParams();

  return (
    <View>
      <Text>{mountainName}</Text>
    </View>
  );
};

export default MountainCourseScreen;
