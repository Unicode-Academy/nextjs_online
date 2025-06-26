export default class EventEmitter {
  events: { [key: string]: ((...args: unknown[]) => void)[] };
  socket: WebSocket;
  constructor(socket: WebSocket) {
    this.events = {};
    this.socket = socket;
  }

  on(event: string, callback: (...args: unknown[]) => void) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  off(event: string, callback: () => void) {
    if (!this.events[event]) {
      return;
    }
    this.events[event] = this.events[event].filter((fn) => fn !== callback);
  }

  emitLocal(event: string, ...args: unknown[]) {
    if (!this.events[event]) {
      return;
    }
    this.events[event].forEach((fn) => fn(...args));
  }
  emit(event: string, payload?: unknown) {
    this.socket.send(JSON.stringify({ type: event, payload }));
  }
}
