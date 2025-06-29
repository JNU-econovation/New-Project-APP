import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@/src/model/webview";
import { COLORS } from "@/src/styles/colorPalette";
import {
  DISABLED_PINCH_GESTURE,
  DISABLED_SCROLL,
  DISABLED_TEXT_SELECT,
  SET_VIEWPORT_RATE,
} from "@constants/webview";
import WebviewWithBridge from "@service/webview/components/WebviewWithBridge";
import { getPathToRoute } from "@utils/bridge";
import { logMessageWithTime } from "@utils/log";
import { router } from "expo-router";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { Animated, View } from "react-native";
import WebView from "react-native-webview";
import type { WebViewSource } from "react-native-webview/lib/WebViewTypes";

interface WebViewWithInjectedProps {
  source: WebViewSource;
  onMessage?: (
    reqMessage: MessageEventRequestData,
  ) => MessageEventResponseData | void;
  onReadyToMessage?: () => void;
  loadingBar?: boolean;
}

const INJECTED_JAVASCRIPT = `${DISABLED_PINCH_GESTURE}${DISABLED_TEXT_SELECT}${DISABLED_SCROLL}${SET_VIEWPORT_RATE}`;

const WebViewWithInjected = forwardRef<WebView, WebViewWithInjectedProps>(
  ({ source, onMessage, onReadyToMessage, loadingBar = false }, ref) => {
    const webViewRef = useRef<WebView>(null);

    const progressAnim = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => webViewRef.current as WebView);

    const middleware = useCallback((reqMessage: MessageEventRequestData) => {
      logMessageWithTime(`WebView received: \n${JSON.stringify(reqMessage)}`);

      if (reqMessage.name === ("log-message" as string)) {
        console.log(reqMessage.body);
        return;
      }

      // 라우팅 메시지 처리
      if (
        reqMessage.name === ("route-to" as string) &&
        reqMessage.method === "POST"
      ) {
        const { path, routeType, params } = reqMessage.body as {
          path: string;
          routeType?: "replace" | "push";
          params?: Record<string, any>[];
        };

        routeType === "replace"
          ? router.replace(getPathToRoute({ path, params }))
          : router.push(getPathToRoute({ path, params }));

        // 동적 에러처리 필요

        return {
          name: "route-to",
          status: "success",
        };
      }
    }, []);

    return (
      <View style={{ flex: 1 }}>
        {loadingBar && (
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                height: 4,
                backgroundColor: COLORS.mainGreen,
                zIndex: 9999,
                width: "100%",
                borderBottomRightRadius: 2,
              },
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        )}

        <WebviewWithBridge<MessageEventRequestData, MessageEventResponseData>
          source={source}
          ref={webViewRef}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          onBridgeMessage={onMessage}
          onLoadProgress={({ nativeEvent }) => {
            progressAnim.setValue(nativeEvent.progress);
          }}
          onLoadEnd={() => {
            progressAnim.setValue(0);
          }}
          cacheEnabled
          cacheMode="LOAD_CACHE_ELSE_NETWORK"
          middleware={middleware}
          onReadyToMessage={onReadyToMessage}
        />
      </View>
    );
  },
);

export default WebViewWithInjected;
