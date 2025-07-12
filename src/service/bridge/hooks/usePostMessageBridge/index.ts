import Bridge from "@service/bridge";
import { useRef } from "react";
import WebView from "react-native-webview";

interface PostMessageProps<MessageType, ResponseType> {
  message: MessageType;
  onResponse?: (response: ResponseType) => void;
}

const usePostMessageBridge = () => {
  const ref = useRef<WebView<{
    postMessage: (message: string) => void;
  }> | null>(null);

  const postMessage = <ReqType, ResponseType>({
    message,
    onResponse,
  }: PostMessageProps<ReqType, ResponseType>) => {
    if (ref.current) {
      const newMessage = Bridge.createMessage<ReqType>(ref, {
        ack: null,
        body: message,
      });
      newMessage.send<ResponseType>((response) => {
        if (onResponse) return onResponse(response);
      });
    }
  };

  return {
    ref,
    postMessage,
  };
};

export default usePostMessageBridge;
