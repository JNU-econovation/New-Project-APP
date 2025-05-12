import StarterScreen from "@components/feature/screens/Starter/StarterScreen";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const isAuthenticated = true;

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

  if (isAuthenticated) return <Redirect href="/(tabs)/home" />;

  return <StarterScreen />;
}
