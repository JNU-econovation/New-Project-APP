import { RefObject } from "react";
import WebView from "react-native-webview";

export const postMessage = (ref: RefObject<WebView<{}>>, message: string) => {
  ref.current?.postMessage(message);
};
