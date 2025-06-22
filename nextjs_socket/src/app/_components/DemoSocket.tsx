"use client";

export default function DemoSocket() {
  const ws = new WebSocket("ws://localhost:8080");
  ws.onopen = () => {
    console.log("Connected to server");
    ws.send("Hello from client");
  };
  ws.onmessage = (event) => {
    console.log(event.data);
  };
  ws.onclose = () => {
    console.log("Disconnected from server");
  };

  return <div>DemoSocket</div>;
}
