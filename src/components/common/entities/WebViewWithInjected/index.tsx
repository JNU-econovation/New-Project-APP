import {
  DISABLED_PINCH_GESTURE,
  DISABLED_SCROLL,
  DISABLED_TEXT_SELECT,
  INJECT_TOKEN,
  SET_VIEWPORT_RATE,
} from "@constants/webview";
import {
  MessageEventRequestData,
  MessageEventResponseData,
} from "@model/webview";
import WebviewWithBridge from "@service/bridge/components/WebviewWithBridge";
import { useTokenStore } from "@store/secureStorage/useTokenStore/index";
import { COLORS } from "@styles/colorPalette";
import { getPathToRoute } from "@utils/bridge";
import { logMessageWithTime } from "@utils/log";
import { router, useNavigation } from "expo-router";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, BackHandler, View } from "react-native";
import WebView from "react-native-webview";
import type { WebViewSource } from "react-native-webview/lib/WebViewTypes";

type OnMessage = (
  reqMessage: MessageEventRequestData,
) => MessageEventResponseData | void;

type PromiseOnMessage = ({
  method,
  name,
}: MessageEventRequestData<unknown>) => Promise<MessageEventResponseData | void>;

interface WebViewWithInjectedProps {
  source: WebViewSource;
  onMessage?: OnMessage | PromiseOnMessage;
  onReadyToMessage?: () => void;
  loadingBar?: boolean;
}

const WebViewWithInjected = forwardRef<WebView, WebViewWithInjectedProps>(
  ({ source, onMessage, onReadyToMessage, loadingBar = false }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    const { accessToken, refreshToken } = useTokenStore();

    const INJECTED_JAVASCRIPT = useMemo(
      () =>
        `${DISABLED_PINCH_GESTURE}${DISABLED_TEXT_SELECT}${DISABLED_SCROLL}${SET_VIEWPORT_RATE}${INJECT_TOKEN(accessToken ?? "", refreshToken ?? "")}`,
      [accessToken, refreshToken],
    );

    useImperativeHandle(ref, () => webViewRef.current as WebView);

    // useEffect(() => {
    //   navigation.setOptions({
    //     gestureEnabled: !canGoBack,
    //   });
    // }, [navigation, canGoBack]);
    useEffect(() => {
      navigation.setOptions({
        gestureEnabled: false,
        swipeEnabled: false,
      });
    }, []);

    useEffect(() => {
      const backAction = () => {
        if (canGoBack) {
          webViewRef.current?.goBack();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction,
      );
      return () => {
        backHandler.remove();
      };
    }, [webViewRef, canGoBack]);

    // iOS 제스처 방지를 위한 추가 처리
    // const handleNavigationStateChange = useCallback((navState: any) => {
    //   setCanGoBack(navState.canGoBack);
    //   setCanGoForward(navState.canGoForward);
    // }, []);

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

      // 뒤로가기 메시지 처리
      if (reqMessage.name === "route-back" && reqMessage.method === "POST") {
        router.back();

        return {
          name: "route-back",
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
          cacheEnabled={false}
          cacheMode="LOAD_NO_CACHE"
          allowsLinkPreview={false}
          // cacheMode="LOAD_CACHE_ELSE_NETWORK"
          middleware={middleware}
          onReadyToMessage={onReadyToMessage}
          // 뒤로가기, 앞으로가기 기능
          // allowsBackForwardNavigationGestures={false}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
            setCanGoForward(navState.canGoForward);
          }}
        />
      </View>
    );
  },
);

export default WebViewWithInjected;
