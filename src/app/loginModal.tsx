import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import styled from "@emotion/native";
import { useCallback, useRef } from "react";
import { Alert, TouchableWithoutFeedback, View } from "react-native";
import WebView from "react-native-webview";

const LoginModalScreen = () => {
  const ref = useRef<WebView>(null);

  const requestKakaoLoginBridge = useCallback(() => {
    console.log("[app] requestKakaoLoginBridge");
    ref.current?.postMessage(
      JSON.stringify({
        name: "request-kakao",
        method: "POST",
        body: {},
      }),
    );
  }, []);

  return (
    <Container>
      <WebViewWithInjected
        ref={ref}
        source={{ uri: PATH_ROUTE.WEBVIEW.LOGIN }}
        onReadyToMessage={requestKakaoLoginBridge}
        onMessage={(reqMessage) => {
          if (reqMessage.name === "request-kakao") {
            console.log("request-kakao", reqMessage);
          }
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
`;

export default LoginModalScreen;
