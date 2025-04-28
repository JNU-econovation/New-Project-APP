import { Stack } from "expo-router";
import ModalProvider from "@context/modal/provider";
import QueryProvider from "@context/query/provider";

export default function RootLayout() {
  return (
    <QueryProvider>
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
    </QueryProvider>
  );
}
