type Flag = 0 | 1;

export interface MessageEventResponseData<Data = unknown> {
  status: "success" | "error";
  name: string;
  data?: Data;
}

export interface MessageEventRequestData<Body = unknown> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  name: string;
  body?: Body;
}

export interface WebviewHandshake {
  name: "webview-handshake";
  flag: {
    syn: Flag;
    ack: Flag;
  };
}
