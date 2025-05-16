import StarterScreen from "@components/feature/screens/Starter/StarterScreen";
import {
  getValueFromSecureStore,
  removeValueFromSecureStore,
} from "@utils/secureStore";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

let isAuthenticated = true;

export default function Index() {
  const [loaded, error] = useFonts({
    "pretendard-black": require("@/assets/fonts/Pretendard-Black.otf"),
    "pretendard-bold": require("@/assets/fonts/Pretendard-Bold.otf"),
    "pretendard-extrabold": require("@/assets/fonts/Pretendard-ExtraBold.otf"),
    "pretendard-extralight": require("@/assets/fonts/Pretendard-ExtraLight.otf"),
    "pretendard-light": require("@/assets/fonts/Pretendard-Light.otf"),
    "pretendard-medium": require("@/assets/fonts/Pretendard-Medium.otf"),
    "pretendard-regular": require("@/assets/fonts/Pretendard-Regular.otf"),
    "pretendard-semibold": require("@/assets/fonts/Pretendard-SemiBold.otf"),
    "pretendard-thin": require("@/assets/fonts/Pretendard-Thin.otf"),
  });

  useEffect(() => {
    //TODO: 로그인 플로우를 확인하기 위한 임시 코드
    {
      removeValueFromSecureStore("accessToken");
      removeValueFromSecureStore("refreshToken");
    }

    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    const checkLogin = async () => {
      getValueFromSecureStore("accessToken").then((accessToken) => {
        if (accessToken) {
          isAuthenticated = true;
        }
      });
    };

    checkLogin();
  }, []);

  if (!loaded && !error) {
    return null;
  }

  if (isAuthenticated) return <Redirect href="/(tabs)/home" />;

  return <StarterScreen />;
}
