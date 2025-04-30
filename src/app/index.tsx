import StarterScreen from "@components/feature/screens/Starter/StarterScreen";
import AppleLoginButton from "@components/feature/widget/AppleLoginButton";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

const isAuthenticated = false;

export default function Index() {
  // const [appIsReady, setAppIsReady] = useState(false);
  const [loaded, error] = useFonts({
    "pretendard-black": require("@/assets/fonts/Pretendard-Black.otf"),
    "pretendard-bold": require("@/assets/fonts/Pretendard-Bold.otf"),
    "pretendard-extrabold": require("@/assets/fonts/Pretendard-ExtraBold.otf"),
    "pretendard-extralight": require("@/assets/fonts/Pretendard-ExtraLight.otf"),
    "pretendard-light": require("@/assets/fonts/Pretendard-Light.otf"),
    "pretendard-medium": require("@/assets/fonts/Pretendard-Medium.otf"),
    "pretendard-semibold": require("@/assets/fonts/Pretendard-SemiBold.otf"),
    "pretendard-thin": require("@/assets/fonts/Pretendard-Thin.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (!isAuthenticated) {
    return <StarterScreen />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>지도 페이지</Text>
      <AppleLoginButton />
    </View>
  );
}
