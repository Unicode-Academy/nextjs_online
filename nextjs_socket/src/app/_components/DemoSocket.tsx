"use client";

import { useEffect, useState } from "react";
import EventEmitter from "../../utils/event";
const SOCKET_URL = "ws://localhost:8080";

export default function DemoSocket() {
  const [socket, setSocket] = useState<WebSocket>();
  const [emitter, setEmitter] = useState<EventEmitter>();
  const [value, setValue] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const ws = new WebSocket(SOCKET_URL);
    setSocket(ws);
    const eventEmitter = new EventEmitter(ws);
    setEmitter(eventEmitter);
    ws.addEventListener("message", (event) => {
      const { type, payload } = JSON.parse(event.data);
      eventEmitter.emitLocal(type, payload);
    });

    eventEmitter.on("send-message", (payload) => {
      const data = payload as string[];
      setMessages(data);
    });

    ws.onopen = () => {
      eventEmitter.emit("load-message");
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleClick = () => {
    if (!socket) {
      return;
    }
    emitter?.emit("send-message", value);
    setValue("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Vui lòng nhập..."
        onChange={handleChangeValue}
        value={value}
      />
      <button onClick={handleClick}>Click me</button>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}
