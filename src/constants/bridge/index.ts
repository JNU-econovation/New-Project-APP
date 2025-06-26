import { Href } from "expo-router";

type PathToRoute = { [key: string]: Href };

const PATH_TO_ROUTE: PathToRoute = {
  "course-detail": "/(tabs)/map/course",
  "start-travel": "/travel",
  "mountain-course": "/(tabs)/map/course",
  "manual-detail": "/(tabs)/home/safeManual/[manual]",
} as const;

export default PATH_TO_ROUTE;
