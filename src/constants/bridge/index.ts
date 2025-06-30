import { Href } from "expo-router";

type PathToRoute = { [key: string]: Href };

const PATH_TO_ROUTE: PathToRoute = {
  "course-detail": "/(tabs)/map/course",
  "start-travel": "/travel",
  "manual-detail": "/(tabs)/home/safeManual/[manual]",
  "course-search": "/(tabs)/home/course/search",
  "my-info": "/(tabs)/mypage/myInfo",
  faq: "/(tabs)/mypage/faq",
  "travel-log": "/(tabs)/mypage/travelLog",
  "course-bookmark": "/(tabs)/mypage/courseBookmark",
  "notification-setting": "/(tabs)/mypage/notificationSetting",
  "change-password": "/(tabs)/mypage/changePassword",
  "check-terms": "/(tabs)/mypage/checkTerms",
  inquiry: "/(tabs)/mypage/inquiry",
  "mountain-course": "/(tabs)/home/course/[mountainName]",
} as const;

export default PATH_TO_ROUTE;
