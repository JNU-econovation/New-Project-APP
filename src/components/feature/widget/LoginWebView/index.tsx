import { requestKakaoBridge } from "@bridges/request-kakao";
import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import { setValueToSecureStore } from "@utils/secureStore";
import { useCallback, useRef } from "react";
import WebView from "react-native-webview";

interface KakaoTokens {
  accessToken: string;
  requestToken: string;
}

const LoginWebView = () => {
  const ref = useRef<WebView>(null);

  const requestKakaoLoginBridge = useCallback(() => {
    postMessage(ref, requestKakaoBridge());
  }, []);

  return (
    <WebViewWithInjected
      ref={ref}
      source={{ uri: PATH_ROUTE.WEBVIEW.LOGIN }}
      onReadyToMessage={requestKakaoLoginBridge}
      onMessage={({ method, name, body }) => {
        if (name === "request-kakao" && method === "PUT") {
          const { accessToken, requestToken } = body as KakaoTokens;
          setValueToSecureStore("accessToken", accessToken);
          setValueToSecureStore("requestToken", requestToken);
        }
      }}
    />
  );
};

export default LoginWebView;
