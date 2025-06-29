type Flag = 0 | 1;

export interface WebviewHandshake {
  name: "webview-handshake";
  flag: {
    syn: Flag;
    ack: Flag;
  };
}
