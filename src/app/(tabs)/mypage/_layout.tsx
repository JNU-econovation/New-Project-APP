import Stack from "expo-router/stack";

const _MypageLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="travelLog" />
      <Stack.Screen name="notificationSetting" />
      <Stack.Screen name="myInfo" />
      <Stack.Screen name="courseBookmark" />
      <Stack.Screen name="checkTerms" />
      <Stack.Screen name="changePassword" />
    </Stack>
  );
};

export default _MypageLayout;
