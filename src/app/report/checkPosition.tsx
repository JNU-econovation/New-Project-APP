import Header from "@components/common/shared/ui/Header";
import Text from "@components/common/shared/ui/Text";
import { SafeAreaView } from "react-native";

const CheckPositionScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Text>지도 웹뷰 보여질 예정</Text>
    </SafeAreaView>
  );
};

export default CheckPositionScreen;
