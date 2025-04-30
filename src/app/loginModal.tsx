import WebViewWithInjected from "@components/common/entities/WebViewWithInjected";
import PATH_ROUTE from "@constants/pathRoute";
import { useEffect, useRef } from "react";
import { View } from "react-native";

const LoginModalScreen = () => {
  const ref = useRef(null);

  const requestKakaoLoginBridge = {
    method: "POST",
    name: "request-kakao",
    body: {},
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.postMessage(JSON.stringify(requestKakaoLoginBridge));
    }
  }, []);

  return (
    <View style={{}}>
      <WebViewWithInjected
        ref={ref}
        source={{ uri: PATH_ROUTE.WEBVIEW.LOGIN }}
        onMessage={(event) => {
          console.log(event.nativeEvent.data);
        }}
      />
    </View>
  );
};

export default LoginModalScreen;
