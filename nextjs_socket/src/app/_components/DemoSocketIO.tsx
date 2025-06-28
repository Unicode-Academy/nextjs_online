"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
const SOCKET_URL = "http://localhost:3001";
export default function DemoSocketIO() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const handleClick = () => {
    if (!socket) {
      return;
    }
    socket.emit("send-message", value);
    setValue("");
  };
  const handleJoin = () => {
    if (!socket) {
      return;
    }
    if (isJoined) {
      socket.emit("leave");
      return;
    }
    socket.emit("join");
  };
  useEffect(() => {
    const socket = io(SOCKET_URL);
    setSocket(socket);
    socket.on("connect", () => {
      console.log("Client connected");
      socket.emit("load-message");
    });
    socket.on("new-message", (data) => {
      setMessages(data);
    });
    socket.on("joined", () => {
      setIsJoined(true);
    });
    socket.on("left", () => {
      setIsJoined(false);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <button onClick={handleJoin}>{isJoined ? "Leave" : "Join"}</button>
      <hr />
      <div>
        {messages.map((message, index) => (
          <h3 key={index}>{message}</h3>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleClick}>Gửi</button>
      </div>
    </div>
  );
}
