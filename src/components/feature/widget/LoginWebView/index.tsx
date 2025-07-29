import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { useTokenStore } from "@store/secureStorage/useTokenStore";
import { router } from "expo-router";
import { useRef } from "react";
import WebView from "react-native-webview";

const LoginWebView = () => {
  const ref = useRef<WebView>(null);

  const { setAccessToken, setRefreshToken, setAccessTokenExpiredTime } =
    useTokenStore();

  return (
    <WebViewWithInjected
      ref={ref}
      source={{ uri: PATH_ROUTE.WEBVIEW.KAKAO_LOGIN }}
      onMessage={({ method, name, body }) => {
        if (name === "put-token" && method === "POST") {
          const { accessToken, refreshToken, accessTokenExpiredTime } =
            body as {
              accessToken: string;
              refreshToken: string;
              accessTokenExpiredTime: number;
            };

          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          setAccessTokenExpiredTime(accessTokenExpiredTime);

          router.dismissAll();
          router.replace("/(tabs)/home");
        }
      }}
      loadingBar
    />
  );
};

export default LoginWebView;
