type Flag = 0 | 1;

export type Method = "GET" | "POST" | "PUT" | "DELETE";
type Status = "success" | "error";

export interface MessageEventResponseData<Data = unknown> {
  status: Status;
  name: string;
  data?: Data;
}

export interface MessageEventRequestData<Body = unknown> {
  method: Method;
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
