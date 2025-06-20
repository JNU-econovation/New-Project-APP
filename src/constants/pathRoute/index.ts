const webviewBaseUri = process.env.EXPO_PUBLIC_WEB_BASE_URI;

const WEBVIEW = {
  BASE_URL: webviewBaseUri,
  KAKAO_LOGIN: `${webviewBaseUri}/login/kakao`,
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
} as const;

const PATH_ROUTE = {
  WEBVIEW,
} as const;

export default PATH_ROUTE;
