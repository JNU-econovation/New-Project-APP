import ModalProvider from "@service/modal/provider";
import QueryProvider from "@service/query/provider";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

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
          <Stack.Screen
            name="travel"
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
