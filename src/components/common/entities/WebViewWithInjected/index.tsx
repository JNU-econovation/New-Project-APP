import { MessageEventRequestData, WebviewHandshake } from "@/src/model/webview";
import { COLORS } from "@/src/styles/colorPalette";
import {
  DISABLED_PINCH_GESTURE,
  DISABLED_SCROLL,
  DISABLED_TEXT_SELECT,
  SET_VIEWPORT_RATE,
} from "@constants/webview";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Animated, NativeSyntheticEvent, View } from "react-native";
import WebView from "react-native-webview";
import type {
  WebViewMessage,
  WebViewSource,
} from "react-native-webview/lib/WebViewTypes";

type WebViewMessageEvent = NativeSyntheticEvent<WebViewMessage>;

interface WebViewWithInjectedProps {
  source: WebViewSource;
  onMessage?: <Data>(reqMessage: MessageEventRequestData<Data>) => void;
  onReadyToMessage?: () => void;
  loadingBar?: boolean;
}

const INJECTED_JAVASCRIPT = `${DISABLED_PINCH_GESTURE}${DISABLED_TEXT_SELECT}${DISABLED_SCROLL}${SET_VIEWPORT_RATE}`;

const WebViewWithInjected = forwardRef<WebView, WebViewWithInjectedProps>(
  ({ source, onMessage, onReadyToMessage, loadingBar = false }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const [isReady, setIsReady] = useState(false);

    const progressAnim = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => webViewRef.current as WebView);

    useEffect(() => {
      if (isReady) onReadyToMessage?.();
    }, [isReady, onReadyToMessage]);

    const handleMessage = useCallback(
      (event: WebViewMessageEvent) => {
        const reqMessage = JSON.parse(
          event.nativeEvent.data,
        ) as MessageEventRequestData & WebviewHandshake;

        // handshake
        if (reqMessage.name === "webview-handshake") {
          const { syn, ack } = reqMessage.flag;

          // 웹으로부터 handshake sync 메시지 수신
          if (syn === 1 && ack === 0) {
            // 웹에서 syn을 보냈을 때, syn/ack을 보내준다.
            webViewRef.current?.postMessage(
              JSON.stringify({
                name: "webview-handshake",
                flag: { syn: 1, ack: 1 },
              }),
            );
            return;
          }
          // 웹에서 ack을 보냈을 때 비로소 통신이 가능한 상태가 된다.
          if (syn === 0 && ack === 1) {
            setIsReady(true);
            return;
          }
        }

        // normal message
        if (onMessage) onMessage(reqMessage);
      },
      [onMessage],
    );

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

        <WebView
          source={source}
          ref={webViewRef}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scalesPageToFit={false}
          javaScriptEnabled={true}
          scrollEnabled={false}
          onMessage={handleMessage}
          onLoadProgress={({ nativeEvent }) => {
            progressAnim.setValue(nativeEvent.progress);
          }}
          onLoadEnd={() => {
            progressAnim.setValue(0);
          }}
          cacheEnabled={false}
          cacheMode="LOAD_NO_CACHE"
        />
      </View>
    );
  },
);

export default WebViewWithInjected;
