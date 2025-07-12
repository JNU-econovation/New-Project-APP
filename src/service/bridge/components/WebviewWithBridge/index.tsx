import Bridge from "@service/bridge";
import { WebviewBridgeMessage, WebviewHandshake } from "@service/bridge/types";
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
      const reqMessage = JSON.parse(
        event.nativeEvent.data,
      ) as WebviewBridgeMessage<ReqMessage>;

      const {
        _id,
        ack,
        flag: { syn },
        body,
      } = reqMessage;

      ack && Bridge.renderCallback(ack, reqMessage);

      // handshake
      // 웹으로부터 handshake sync 메시지 수신
      if (!isReady && syn === 1 && ack === null) {
        // Alert.alert("[app] handshake syn/ack received : " + _id);
        // 웹에서 syn을 보냈을 때, syn/ack을 보내준다.
        Bridge.createMessage(webViewRef, {
          syn: 1,
          ack: _id,
        }).send<WebviewHandshake>(({ ack, flag: { syn } }) => {
          // Alert.alert("[app] 끝끝!!!!!!!!!!!!!!!!!!!!!!!");
          console.log(
            `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]handshake end`,
          );
          if (!isReady && syn === 0 && ack !== null) {
            setIsReady(true);
            return;
          }
        });
        return;
      }

      if (!isReady) {
        console.warn(
          "[WebviewWithBridge] 웹부의 핸드쉐이크라 아직 완료되지 않았습니다. syn/ack 메시지를 확인해주세요.",
        );
        return;
      }

      // body가 있는 일반 요청 메시지 처리
      if (!body) return;

      middleware?.(body);

      // normal message
      if (onBridgeMessage) {
        const resMessage = onBridgeMessage(body);
        if (!resMessage)
          throw new Error(
            "전달받은 브리지에 대한 응답이 없습니다. onBridgeMessage를 확인해주세요.",
          );
        Bridge.createMessage(webViewRef, {
          ack: _id,
          body: resMessage,
        }).send();
      }
    },
    [onBridgeMessage, middleware],
  );

  return <WebView ref={webViewRef} onMessage={handleMessage} {...props} />;
};

export default WebviewWithBridge;
