"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
// const SOCKET_URL = "http://localhost:3000";
export default function SocketNamespace() {
  useEffect(() => {
    const socket = io({
      auth: {
        token: "123",
      },
    });
    console.log(socket);

    socket.on("connect", () => {
      console.log("Client Notification connected");
      socket.emit("send-notification", "Thông báo mới");
      socket.on("new-notification", (data) => {
        console.log(data);
      });
    });

    socket.on("connect_error", (err) => {
      console.log(err.message); // prints the message associated with the error
    });
  }, []);
  return <div>SocketNamespace</div>;
}
