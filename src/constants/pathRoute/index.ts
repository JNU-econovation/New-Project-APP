const webviewBaseUri = process.env.EXPO_PUBLIC_WEB_BASE_URI;

const WEBVIEW = {
  BASE_URL: webviewBaseUri,
  LOGIN: `${webviewBaseUri}/login`,
  EMAIL_AUTH: `${webviewBaseUri}/email-auth`,
  COURSE: `${webviewBaseUri}/course`,
  COURSE_SEARCH_RESULT: ({
    mountainName,
    sort = "my",
  }: {
    mountainName: string;
    sort?: string;
  }) => `${webviewBaseUri}/course/${mountainName}?sort=${sort}`,
} as const;

const PATH_ROUTE = {
  WEBVIEW,
} as const;

export default PATH_ROUTE;
