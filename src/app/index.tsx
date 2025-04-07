import LoginButton from "@components/feature/screens/Starter/LoginButton";
import StarterScreen from "@components/feature/screens/Starter/StarterScreen";
import { SplashScreen } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

export default function Index() {
  const isAuthenticated = false;

  const [appIsReady, setAppIsReady] = useState(false);
  console.log("appIsReady", appIsReady);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

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
