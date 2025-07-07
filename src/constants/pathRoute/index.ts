const webviewBaseUri = process.env.EXPO_PUBLIC_WEB_BASE_URI as string;

const WEBVIEW = {
  BASE_URL: webviewBaseUri,
  KAKAO_LOGIN: `${webviewBaseUri}/login`,
  EMAIL_AUTH: `${webviewBaseUri}/email-auth`,
  COURSE: `${webviewBaseUri}/course`,
  COURSE_SEARCH_RESULT: ({
    mountainName,
    sort = "my",
  }: {
    mountainName: string;
    sort?: string;
  }) => `${webviewBaseUri}/course/${mountainName}?sort=${sort}`,
  COURSE_DETAIL: "",
  MAP: `${webviewBaseUri}/map`,
  MAP_COURSE_SEARCH: `${webviewBaseUri}/map/course-search`,
  MAP_COURSE_DETAIL: `${webviewBaseUri}/map/course-detail`,
  MYPAGE: `${webviewBaseUri}/my-page`,
  SAFE_MANUAL: `${webviewBaseUri}/safe-manual`,
  SAFE_MANUAL_DETAIL: ({ manual }: { manual: string }) =>
    `${webviewBaseUri}/safe-manual/detail?manual=${manual}`,
  TRAVEL: `${webviewBaseUri}/travel`,
  COURSE_SEARCH: `${webviewBaseUri}/course/search`,

  MY_INFO: `${webviewBaseUri}/my-page/my-info`,
  // FAQ: `${webviewBaseUri}/customer-center?faq`,
  TRAVEL_LOG: `${webviewBaseUri}/my-page/travel-log`,
  COURSE_BOOKMARK: `${webviewBaseUri}/my-page/course-bookmark`,
  NOTIFICATION_SETTING: `${webviewBaseUri}/my-page/notification-setting`,
  CHANGE_PASSWORD: `${webviewBaseUri}/my-page/change-password`,
  CHECK_TERMS: `${webviewBaseUri}/my-page/check-terms`,
  CUSTOMER_CENTER: (tab: string) =>
    `${webviewBaseUri}/customer-center?tab=${tab}`,
  // INQUIRY: `${webviewBaseUri}/my-page/inquiry`,
} as const;

const REMOTE = {
  KAKAO_LOGIN: `https://accounts.kakao.com/login/`,
};

const PATH_ROUTE = {
  WEBVIEW,
  REMOTE,
} as const;

export default PATH_ROUTE;
