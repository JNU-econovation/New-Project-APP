import LoginButton from "@components/feature/screens/Starter/LoginButton";
import StarterScreen from "@components/feature/screens/Starter/StarterScreen";
import { Text, View } from "react-native";

export default function Index() {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <StarterScreen />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>지도 페이지</Text>
      <LoginButton />
    </View>
  );
}
