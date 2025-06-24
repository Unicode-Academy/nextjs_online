"use client";

import { useEffect, useState } from "react";
const SOCKET_URL = "ws://localhost:8080";
export default function DemoSocket() {
  const [socket, setSocket] = useState<WebSocket>();
  const [value, setValue] = useState<string>("");
  const [messages, setMessages] = useState([]);
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    const ws = new WebSocket(SOCKET_URL);
    setSocket(ws);

    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "send-message") {
        setMessages(data.payload);
      }
    });
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "load-message",
        })
      );
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleClick = () => {
    if (!socket) {
      return;
    }
    const data = {
      type: "send-message",
      payload: value,
    };
    socket.send(JSON.stringify(data));
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
