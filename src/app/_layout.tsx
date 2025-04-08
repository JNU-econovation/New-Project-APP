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
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require("@assets/images/Left_Arrow_button_black.png")}
              alt="logo"
              style={{ width: 41, height: 41 }}
            />
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
