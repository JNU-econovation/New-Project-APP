import { COLORS } from "@/src/styles/colorPalette";
import {
  HeroSVG,
  HomeBlockSVG,
  HomeSVG,
  MapBlockSVG,
  MapSVG,
  MountainSVG,
  StoreSVG,
} from "@components/common/shared/ui/Icons";
import QueryProvider from "@context/query/provider";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <QueryProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.mainGreen,
          animation: "fade",
          tabBarStyle: {
            backgroundColor: COLORS.mainWhite,
          },
          sceneStyle: {
            backgroundColor: COLORS.mainWhite,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "홈",
            tabBarLabel: "홈",
            tabBarIcon: ({ focused }) =>
              focused ? <HomeBlockSVG /> : <HomeSVG />,
          }}
        />
        <Tabs.Screen
          name="sangyeol"
          options={{
            tabBarLabel: "산결",
            tabBarIcon: ({ focused }) =>
              focused ? <MountainSVG /> : <MountainSVG />,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            tabBarLabel: "지도",
            tabBarIcon: ({ focused }) =>
              focused ? <MapBlockSVG /> : <MapSVG />,
          }}
        />
        <Tabs.Screen
          name="store"
          options={{
            tabBarLabel: "스토어",
            tabBarIcon: ({ focused }) =>
              focused ? <StoreSVG /> : <StoreSVG />,
          }}
        />
        <Tabs.Screen
          name="mypage"
          options={{
            tabBarLabel: "마이",
            tabBarIcon: ({ focused }) => (focused ? <HeroSVG /> : <HeroSVG />),
          }}
        />
      </Tabs>
    </QueryProvider>
  );
}
