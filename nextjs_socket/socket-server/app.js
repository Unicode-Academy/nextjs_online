import { WebSocketServer } from "ws";
import { EventEmitter } from "events";
const eventEmitter = new EventEmitter();
const server = new WebSocketServer({
  port: 8080,
});
const emit = (socket, type, payload) => {
  socket.send(
    JSON.stringify({
      type,
      payload,
    })
  );
};
const messageArr = [];
server.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("message", (message) => {
    const { type, payload } = JSON.parse(message);
    console.log(type, payload);
    eventEmitter.emit(type, payload, socket);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

eventEmitter.on("send-message", (data) => {
  messageArr.push(data);
  server.clients.forEach((client) => {
    emit(client, "send-message", messageArr);
  });
});

eventEmitter.on("load-message", (data, socket) => {
  emit(socket, "send-message", messageArr);
});
