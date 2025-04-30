import {
  DISABLED_PINCH_GESTURE,
  DISABLED_SCROLL,
  DISABLED_TEXT_SELECT,
  SET_VIEWPORT_RATE,
} from "@constants/webview";
import { forwardRef, useCallback } from "react";
import { NativeSyntheticEvent } from "react-native";
import WebView from "react-native-webview";
import type {
  WebViewMessage,
  WebViewSource,
} from "react-native-webview/lib/WebViewTypes";

type WebViewMessageEvent = NativeSyntheticEvent<WebViewMessage>;

interface WebViewWithInjectedProps {
  source: WebViewSource;
  onMessage?: (event: WebViewMessageEvent) => void;
}

const INJECTED_JAVASCRIPT = `${DISABLED_PINCH_GESTURE}${DISABLED_TEXT_SELECT}${DISABLED_SCROLL}${SET_VIEWPORT_RATE}`;

const WebViewWithInjected = forwardRef<WebView, WebViewWithInjectedProps>(
  ({ source, onMessage }, ref) => {
    const handleMessage = useCallback(
      (event: WebViewMessageEvent) => {
        if (onMessage) {
          onMessage(event);
        }
      },
      [onMessage],
    );

    return (
      <WebView
        source={source}
        ref={ref}
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
