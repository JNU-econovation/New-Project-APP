import StarterScreen from "@components/feature/screens/Starter/StarterScreen";
import { Stack } from "expo-router";

export default function RootLayout() {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <StarterScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{}} />
    </Stack>
  );
}
