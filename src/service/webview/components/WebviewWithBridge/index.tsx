import { WebviewHandshake } from "@service/webview/types";
import {
  ComponentProps,
  Ref,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import WebView from "react-native-webview";
import type { WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";

interface WebViewWithBridgeProps<ReqMessage, ResMessage>
  extends Omit<ComponentProps<typeof WebView>, "onMessage"> {
  onBridgeMessage?: (reqMessage: ReqMessage) => ResMessage | void;
  onReadyToMessage?: () => void;
  middleware?: (message: ReqMessage) => void;
  ref?: Ref<WebView>;
}

const WebviewWithBridge = <ReqMessage, ResMessage>({
  onBridgeMessage,
  onReadyToMessage,
  middleware,
  ref,
  ...props
}: WebViewWithBridgeProps<ReqMessage, ResMessage>) => {
  const [isReady, setIsReady] = useState(false);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (isReady) onReadyToMessage?.();
  }, [isReady, onReadyToMessage]);

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      const reqMessage = JSON.parse(event.nativeEvent.data) as ReqMessage &
        WebviewHandshake;

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

      middleware?.(reqMessage);

      // normal message
      if (onBridgeMessage) {
        const responseMessage = JSON.stringify(onBridgeMessage(reqMessage));
        if (!responseMessage) return;

        webViewRef.current?.postMessage(responseMessage);
      }
    },
    [onBridgeMessage, middleware],
  );

  return <WebView ref={webViewRef} onMessage={handleMessage} {...props} />;
};

export default WebviewWithBridge;
