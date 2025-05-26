import { Stack } from "expo-router";
import ModalProvider from "@context/modal/provider";
import QueryProvider from "@context/query/provider";
import { StatusBar, View } from "react-native";

export default function RootLayout() {
  return (
    <QueryProvider>
      <ModalProvider>
        <StatusBar barStyle={"dark-content"} />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              animation: "fade",
            }}
          />
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen
            name="loginModal"
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack>
      </ModalProvider>
    </QueryProvider>
  );
}
