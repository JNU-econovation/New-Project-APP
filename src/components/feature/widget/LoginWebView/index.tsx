import PATH_ROUTE from "@constants/pathRoute";
import WebViewWithInjected from "@entities/WebViewWithInjected";
import { setValueToSecureStore } from "@utils/secureStore";
import { useRef } from "react";
import WebView from "react-native-webview";

interface KakaoTokens {
  accessToken: string;
  requestToken: string;
}

const LoginWebView = () => {
  const ref = useRef<WebView>(null);

  return (
    <WebViewWithInjected
      ref={ref}
      source={{ uri: PATH_ROUTE.WEBVIEW.KAKAO_LOGIN }}
      onMessage={({ method, name, body }) => {
        if (name === "request-kakao" && method === "PUT") {
          const { accessToken, requestToken } = body as KakaoTokens;
          setValueToSecureStore("accessToken", accessToken);
          setValueToSecureStore("requestToken", requestToken);
        }
      }}
      loadingBar
    />
  );
};

export default LoginWebView;
