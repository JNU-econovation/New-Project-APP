import { Stack } from "expo-router";
import ModalProvider from "@/src/context/modal/provider";

export default function RootLayout() {
  return (
    <ModalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
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
  );
}
