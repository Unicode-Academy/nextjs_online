"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
const SOCKET_URL = "http://localhost:3001";
export default function DemoSocketIO() {
  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on("connect", () => {
      console.log("Client connected");
      socket.emit("message", "Hello from client");
    });
    socket.on("new-message", (data) => {
      console.log(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return <div>DemoSocketIO</div>;
}
