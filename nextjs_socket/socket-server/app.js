import { WebSocketServer } from "ws";
const server = new WebSocketServer({
  port: 8080,
});
const messageArr = [];
server.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("message", (message) => {
    const data = JSON.parse(message);
    if (data.type === "send-message") {
      messageArr.push(data.payload);
      server.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            type: "send-message",
            payload: messageArr,
          })
        );
      });
    }

    if (data.type === "load-message") {
      socket.send(
        JSON.stringify({
          type: "send-message",
          payload: messageArr,
        })
      );
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
