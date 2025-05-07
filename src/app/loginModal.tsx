import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import styled from "@emotion/native";
import { useCallback, useRef } from "react";
import WebView from "react-native-webview";
import { requestKakaoBridge } from "@bridges/request-kakao";
import { postMessage } from "@utils/bridge";

const LoginModalScreen = () => {
  const ref = useRef<WebView>(null);

  const requestKakaoLoginBridge = useCallback(() => {
    postMessage(ref, requestKakaoBridge());
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
