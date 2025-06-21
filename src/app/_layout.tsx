import { Stack } from "expo-router";
import ModalProvider from "@/src/service/modal/provider";
import QueryProvider from "@/src/service/query/provider";
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
              animation: "fade",
            }}
          />
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen
            name="loginModal"
            options={{
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="report"
            options={{
              animation: "fade",
              animationDuration: 100,
            }}
          />
        </Stack>
      </ModalProvider>
    </QueryProvider>
  );
}
