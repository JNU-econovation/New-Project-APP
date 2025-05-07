import { MessageEventRequestData, WebviewHandshake } from "@/src/model/webview";
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
import { NativeSyntheticEvent } from "react-native";
import WebView from "react-native-webview";
import type {
  WebViewMessage,
  WebViewSource,
} from "react-native-webview/lib/WebViewTypes";

type WebViewMessageEvent = NativeSyntheticEvent<WebViewMessage>;

interface WebViewWithInjectedProps {
  source: WebViewSource;
  onMessage?: (reqMessage: MessageEventRequestData) => void;
  onReadyToMessage?: () => void;
}

const INJECTED_JAVASCRIPT = `${DISABLED_PINCH_GESTURE}${DISABLED_TEXT_SELECT}${DISABLED_SCROLL}${SET_VIEWPORT_RATE}`;

const WebViewWithInjected = forwardRef<WebView, WebViewWithInjectedProps>(
  ({ source, onMessage, onReadyToMessage }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const [isReady, setIsReady] = useState(false);

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
      />
    );
  },
);

export default WebViewWithInjected;
