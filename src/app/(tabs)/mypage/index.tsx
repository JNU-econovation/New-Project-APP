import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MyPageScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <WebViewWithInjected
          source={{ uri: "http://localhost:3000/my-page" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyPageScreen;
