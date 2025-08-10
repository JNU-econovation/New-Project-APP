import Socket from "./socket";

interface SocketBufferValue {
  socket: Socket;
}

class SocketBuffer {
  private socketBuffer: Record<string, SocketBufferValue> = {};

  public addSocket(url: string, socket: Socket) {
    if (this.socketBuffer[url]) {
      console.warn(`[SocketBuffer] Socket for ${url} already exists.`);
      return this.getSocket(url);
    }

    this.socketBuffer[url] = { socket };
    return socket;
  }

  public removeSocket(url: string) {
    delete this.socketBuffer[url];
  }

  public getSocket(url: string): Socket | null {
    return this.socketBuffer[url]?.socket || null;
  }

  public isAuthenticated(url: string): boolean {
    return this.socketBuffer[url]?.socket.isAuthenticated || false;
  }
}

export default SocketBuffer;
