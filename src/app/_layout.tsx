import { LeftArrowBlackSVG } from "@components/common/shared/ui/Icons";
import { router, Stack } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "white",
        },
        headerShadowVisible: false,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <LeftArrowBlackSVG />
          </TouchableOpacity>
        ),
        headerTitle: () => <></>,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" options={{ headerShown: true }} />
    </Stack>
  );
}
