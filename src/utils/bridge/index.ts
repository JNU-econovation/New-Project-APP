import { RefObject } from "react";
import WebView from "react-native-webview";

export const postMessage = (
  ref: RefObject<WebView<{}> | null>,
  message: string,
) => {
  ref.current?.postMessage(message);
};
